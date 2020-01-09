---
id: async-migrate
title: How we migrate our framework into async/await
author: Wai Pai Lee
author_title: Co-author of Obsidian
author_url: https://github.com/plwai
author_image_url: https://avatars2.githubusercontent.com/u/9108726?s=460&v=4
tags: [obsidian, log]
---

Firstly, congratulation on Rust lang achieving stable async/await syntax! As of the release, async/await is becoming the preferred way to do asynchronous programming instead of using Futures in Rust lang. 

In Obsidian Web Framework, we do the same move just like other libraries which enabling async/await syntax in order to provide a better development experience.

_*Rust 1.40 is used in this article_

<!--truncate-->

# In case you don't know async/await in Rust

<div align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/lJ3NC-R3gSI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

# Why async/await?

__Code complexity__  -  You may design the code in the synchronous way. 

__Readability__  -  Avoid `and_then` and `then` chaining which making code hard to read. 

__Lifetime__  -  Lifetime is following synchronous flow within `async` function.

In Obsidian, we treat the developer's development experience as the first priority goal. Thus, migration to async/await enabled structure is definitely needed.

# Changing futures to async/await

The process is pretty simple for most of the cases. Basically, we just add async to the function and remove `then` ,`and_then` and the dangerous `wait` to `await`. From the example below, it shows that the code is much cleaner and readable after using async/await.

from

```rust
pub fn file(file_path: &str) -> ResponseResult {
    tokio_fs::file::File::open(file_path.to_string())
        .and_then(|file| {
            let buf: Vec<u8> = Vec::new();
            tokio_io::io::read_to_end(file, buf)
                .and_then(|item| {
                    Ok(Response::builder()
                        .status(StatusCode::OK)
                        .body(item.1.into())
                        .unwrap())
                })
                .or_else(|_| {
                    Ok(Response::builder()
                        .status(StatusCode::INTERNAL_SERVER_ERROR)
                        .body(Body::empty())
                        .unwrap())
                })
        })
        .or_else(|err| {
            dbg!(&err);
            Ok(Response::builder()
                .status(StatusCode::NOT_FOUND)
                .body(NOTFOUND.into())
                .unwrap())
        })
        .wait()
}
```

to

```rust
pub async fn file(file_path: &str) -> ResponseResult {
    match fs::read(file_path.to_string()).await {
        Ok(buf) => {
            Ok(Response::builder()
                .status(StatusCode::OK)
                .body(buf.into())
                .unwrap())
        },
        Err(err) => {
            Ok(Response::builder()
                .status(StatusCode::NOT_FOUND)
                .body(NOTFOUND.into())
                .unwrap())
        },
    }
}
```

# Using async/await in trait and closure

In current Rust version, the `async` syntax does not support trait function and closure yet. It will be supported in the future. So, we need to do it another way around which is like this.

```rust
// trait
pub trait Middleware: Send + Sync + 'static {
    fn handle<'a>(
        &'a self,
        context: Context,
        ep_executor: EndpointExecutor<'a>,
    ) -> std::pin::Pin<Box<dyn std::future::Future<Output = Response<Body>> + Send + 'a>>;
}

impl Middleware for Logger {
    fn handle<'a>(
        &'a self,
        context: Context,
        ep_executor: EndpointExecutor<'a>,
    ) -> std::pin::Pin<Box<dyn std::future::Future<Output = Response<Body>> + Send + 'a>> {
        let run = move |_self: &Logger| async {
            println!(
                "{} {} \n{}",
                context.method(),
                context.uri(),
                context.headers().get("host").unwrap().to_str().unwrap()
            );

            ep_executor.next(context).await
        };

        Box::pin(run(self))
    }
}

// closure
fn main() {
    // A closure which return async block instead of using async closure
    let closure = || async {
        something().await
    }
}
```

It seems complicated for a trait but luckily Rust community create a crate to simplify this which is called as `async-trait`. By using this crate, we are able to use traits with asyncsyntax!

```rust
#[async_trait]
pub trait Middleware: Send + Sync + 'static {
    async fn handle<'a>(
        &'a self,
        context: Context,
        ep_executor: EndpointExecutor<'a>,
    ) -> Response<Body>;
}

#[async_trait]
impl Middleware for Logger {
    async fn handle<'a>(
        &'a self,
        context: Context,
        ep_executor: EndpointExecutor<'a>,
    ) -> Response<Body> {
        println!(
            "{} {} \n{}",
            context.method(),
            context.uri(),
            context.headers().get("host").unwrap().to_str().unwrap()
        );

        ep_executor.next(context).await
    }
}
```

You may notice that this trait workaround method will result in a heap allocation per-function-call. So why do we use it? In Obsidian, we aim for delivering a better development experience. We believe that enabling await for traits like `Middleware` ease the development process. Besides that, we also trust the Rust community will enable the use of `async`  in trait soon. 😀

For more information on the trade-off, visit [Asynchronous Programming in Rust](https://rust-lang.github.io/async-book/07_workarounds/06_async_in_traits.html) book.

# How to test an async API?

Sadly, now test function cannot use `async` syntax. Thus, we need to make it synchronous. In our framework, we use `async-std` task blocking feature to make it happen.

```rust
#[test]
fn test_form() -> Result<(), ObsidianError> {
    task::block_on(async {
        let params = HashMap::default();
        let request = Request::new(Body::from("id=1&mode=edit"));

        let mut ctx = Context::new(request, params);

        let actual_result: FormResult = ctx.form().await?;
        let expected_result = FormResult {
            id: 1,
            mode: "edit".to_string(),
        };

        assert_eq!(actual_result, expected_result);
        Ok(())
    })
}
```

# Lifetime issue

Although async/await seems perfect, it can be hard when dealing with `self` or struct outside of async block lifetime. In some cases, the developer might want to call an async implementation within the same struct. In this case, the compiler will not let you go. For instance:

```rust
let service = make_service_fn(|_| {
    let server_clone = app_server.clone();
    async {
        Ok::<_, hyper::Error>(service_fn(move |req| {
            let server_clone = server_clone.clone();
            async move { Ok::<_, hyper::Error>(server_clone.resolve_endpoint(req).await) }
        }))
    }
});
```

The simplest way will be simply cloning the struct before async block call which is used above. However, the system will have the scalability issue. In Obsidian, the clone method decreased performance by ~25% with the sample of 1 endpoint router and 20 endpoint router. So, we decided to go for another approach by moving out the usage of `self` into synchronous part and move its ownership into the async block for the async process.

```rust

let service = make_service_fn(|_| {
    let server_clone = app_server.clone();
    async {
        Ok::<_, hyper::Error>(service_fn(move |req| {
            let route_value = server_clone.router.search_route(req.uri().path());
            AppServer::resolve_endpoint(req, route_value)
        }))
    }
});
```

# About Obsidian

[Obsidian](https://github.com/obsidian-rs/obsidian) is a web development framework built in Rust which vision to lower down the learning curve of web development in Rust without losing the advantage of it. Currently, Obsidian is under active development and we expected to release v0.2 in this couple of months.
