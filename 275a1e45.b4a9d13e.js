(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{125:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),u=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s({},t,{},e)),n},p=function(e){var t=u(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=u(n),d=a,m=p["".concat(i,".").concat(d)]||p[d]||b[d]||o;return n?r.a.createElement(m,s({ref:t},l,{components:n})):r.a.createElement(m,s({ref:t},l))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},98:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return l}));var a=n(1),r=(n(0),n(125));const o={id:"async-migrate",title:"How we migrate our framework into async/await",author:"Wai Pai Lee",author_title:"Co-author of Obsidian",author_url:"https://github.com/plwai",author_image_url:"https://avatars2.githubusercontent.com/u/9108726?s=460&v=4",tags:["obsidian","log"]},i={permalink:"/blog/async-migrate",source:"@site/blog/2020-01-09-async-migrate.md",description:"Firstly, congratulation on Rust lang achieving stable async/await syntax! As of the release, async/await is becoming the preferred way to do asynchronous programming instead of using Futures in Rust lang.\xa0",date:"2020-01-09T00:00:00.000Z",tags:[{label:"obsidian",permalink:"/blog/tags/obsidian"},{label:"log",permalink:"/blog/tags/log"}],title:"How we migrate our framework into async/await",nextItem:{title:"Welcome",permalink:"/blog/welcome"}},s=[],c={rightToc:s};function l({components:e,...t}){return Object(r.b)("wrapper",Object(a.a)({},c,t,{components:e,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Firstly, congratulation on Rust lang achieving stable async/await syntax! As of the release, async/await is becoming the preferred way to do asynchronous programming instead of using Futures in Rust lang.\xa0"),Object(r.b)("p",null,"In Obsidian Web Framework, we do the same move just like other libraries which enabling async/await syntax in order to provide a better development experience."),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"*Rust 1.40 is used in this article")),Object(r.b)("h1",{id:"in-case-you-dont-know-asyncawait-in-rust"},"In case you don't know async/await in\xa0Rust"),Object(r.b)("div",{align:"center"},Object(r.b)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/lJ3NC-R3gSI",frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:!0})),Object(r.b)("h1",{id:"why-asyncawait"},"Why async/await?"),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Code complexity")," \u200a- \u200aYou may design the code in the synchronous way.\xa0"),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Readability"),"\u200a - \u200aAvoid ",Object(r.b)("inlineCode",{parentName:"p"},"and_then")," and ",Object(r.b)("inlineCode",{parentName:"p"},"then")," chaining which making code hard to read.\xa0"),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Lifetime"),"\u200a - \u200aLifetime is following synchronous flow within ",Object(r.b)("inlineCode",{parentName:"p"},"async")," function."),Object(r.b)("p",null,"In Obsidian, we treat the developer's development experience as the first priority goal. Thus, migration to async/await enabled structure is definitely needed."),Object(r.b)("h1",{id:"changing-futures-to-asyncawait"},"Changing futures to async/await"),Object(r.b)("p",null,"The process is pretty simple for most of the cases. Basically, we just add async to the function and remove ",Object(r.b)("inlineCode",{parentName:"p"},"then"),"\xa0,",Object(r.b)("inlineCode",{parentName:"p"},"and_then")," and the dangerous ",Object(r.b)("inlineCode",{parentName:"p"},"wait")," to ",Object(r.b)("inlineCode",{parentName:"p"},"await"),". From the example below, it shows that the code is much cleaner and readable after using async/await."),Object(r.b)("p",null,"from"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-rust"}),"pub fn file(file_path: &str) -> ResponseResult {\n    tokio_fs::file::File::open(file_path.to_string())\n        .and_then(|file| {\n            let buf: Vec<u8> = Vec::new();\n            tokio_io::io::read_to_end(file, buf)\n                .and_then(|item| {\n                    Ok(Response::builder()\n                        .status(StatusCode::OK)\n                        .body(item.1.into())\n                        .unwrap())\n                })\n                .or_else(|_| {\n                    Ok(Response::builder()\n                        .status(StatusCode::INTERNAL_SERVER_ERROR)\n                        .body(Body::empty())\n                        .unwrap())\n                })\n        })\n        .or_else(|err| {\n            dbg!(&err);\n            Ok(Response::builder()\n                .status(StatusCode::NOT_FOUND)\n                .body(NOTFOUND.into())\n                .unwrap())\n        })\n        .wait()\n}\n")),Object(r.b)("p",null,"to"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-rust"}),"pub async fn file(file_path: &str) -> ResponseResult {\n    match fs::read(file_path.to_string()).await {\n        Ok(buf) => {\n            Ok(Response::builder()\n                .status(StatusCode::OK)\n                .body(buf.into())\n                .unwrap())\n        },\n        Err(err) => {\n            Ok(Response::builder()\n                .status(StatusCode::NOT_FOUND)\n                .body(NOTFOUND.into())\n                .unwrap())\n        },\n    }\n}\n")),Object(r.b)("h1",{id:"using-asyncawait-in-trait-and-closure"},"Using async/await in\xa0trait and closure"),Object(r.b)("p",null,"In current Rust version, the ",Object(r.b)("inlineCode",{parentName:"p"},"async")," syntax does not support trait function and closure yet. It will be supported in the future. So, we need to do it another way around which is like this."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-rust"}),"// trait\npub trait Middleware: Send + Sync + 'static {\n    fn handle<'a>(\n        &'a self,\n        context: Context,\n        ep_executor: EndpointExecutor<'a>,\n    ) -> std::pin::Pin<Box<dyn std::future::Future<Output = Response<Body>> + Send + 'a>>;\n}\n\nimpl Middleware for Logger {\n    fn handle<'a>(\n        &'a self,\n        context: Context,\n        ep_executor: EndpointExecutor<'a>,\n    ) -> std::pin::Pin<Box<dyn std::future::Future<Output = Response<Body>> + Send + 'a>> {\n        let run = move |_self: &Logger| async {\n            println!(\n                \"{} {} \\n{}\",\n                context.method(),\n                context.uri(),\n                context.headers().get(\"host\").unwrap().to_str().unwrap()\n            );\n\n            ep_executor.next(context).await\n        };\n\n        Box::pin(run(self))\n    }\n}\n\n// closure\nfn main() {\n    // A closure which return async block instead of using async closure\n    let closure = || async {\n        something().await\n    }\n}\n")),Object(r.b)("p",null,"It seems complicated for a trait but luckily Rust community create a crate to simplify this which is called as ",Object(r.b)("inlineCode",{parentName:"p"},"async-trait"),". By using this crate, we are able to use traits with asyncsyntax!"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-rust"}),"#[async_trait]\npub trait Middleware: Send + Sync + 'static {\n    async fn handle<'a>(\n        &'a self,\n        context: Context,\n        ep_executor: EndpointExecutor<'a>,\n    ) -> Response<Body>;\n}\n\n#[async_trait]\nimpl Middleware for Logger {\n    async fn handle<'a>(\n        &'a self,\n        context: Context,\n        ep_executor: EndpointExecutor<'a>,\n    ) -> Response<Body> {\n        println!(\n            \"{} {} \\n{}\",\n            context.method(),\n            context.uri(),\n            context.headers().get(\"host\").unwrap().to_str().unwrap()\n        );\n\n        ep_executor.next(context).await\n    }\n}\n")),Object(r.b)("p",null,"You may notice that this trait workaround method will result in a heap allocation per-function-call. So why do we use it? In Obsidian, we aim for delivering a better development experience. We believe that enabling await for traits like ",Object(r.b)("inlineCode",{parentName:"p"},"Middleware")," ease the development process. Besides that, we also trust the Rust community will enable the use of ",Object(r.b)("inlineCode",{parentName:"p"},"async"),"  in trait soon. \ud83d\ude00"),Object(r.b)("p",null,"For more information on the trade-off, visit ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://rust-lang.github.io/async-book/07_workarounds/06_async_in_traits.html"}),"Asynchronous Programming in Rust")," book."),Object(r.b)("h1",{id:"how-to-test-an-async-api"},"How to test an async API?"),Object(r.b)("p",null,"Sadly, now test function cannot use ",Object(r.b)("inlineCode",{parentName:"p"},"async")," syntax. Thus, we need to make it synchronous. In our framework, we use ",Object(r.b)("inlineCode",{parentName:"p"},"async-std")," task blocking feature to make it happen."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-rust"}),'#[test]\nfn test_form() -> Result<(), ObsidianError> {\n    task::block_on(async {\n        let params = HashMap::default();\n        let request = Request::new(Body::from("id=1&mode=edit"));\n\n        let mut ctx = Context::new(request, params);\n\n        let actual_result: FormResult = ctx.form().await?;\n        let expected_result = FormResult {\n            id: 1,\n            mode: "edit".to_string(),\n        };\n\n        assert_eq!(actual_result, expected_result);\n        Ok(())\n    })\n}\n')),Object(r.b)("h1",{id:"lifetime-issue"},"Lifetime issue"),Object(r.b)("p",null,"Although async/await seems perfect, it can be hard when dealing with ",Object(r.b)("inlineCode",{parentName:"p"},"self")," or struct outside of async block lifetime. In some cases, the developer might want to call an async implementation within the same struct. In this case, the compiler will not let you go. For instance:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-rust"}),"let service = make_service_fn(|_| {\n    let server_clone = app_server.clone();\n    async {\n        Ok::<_, hyper::Error>(service_fn(move |req| {\n            let server_clone = server_clone.clone();\n            async move { Ok::<_, hyper::Error>(server_clone.resolve_endpoint(req).await) }\n        }))\n    }\n});\n")),Object(r.b)("p",null,"The simplest way will be simply cloning the struct before async block call which is used above. However, the system will have the scalability issue. In Obsidian, the clone method decreased performance by ~25% with the sample of 1 endpoint router and 20 endpoint router. So, we decided to go for another approach by moving out the usage of ",Object(r.b)("inlineCode",{parentName:"p"},"self")," into synchronous part and move its ownership into the async block for the async process."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-rust"}),"\nlet service = make_service_fn(|_| {\n    let server_clone = app_server.clone();\n    async {\n        Ok::<_, hyper::Error>(service_fn(move |req| {\n            let route_value = server_clone.router.search_route(req.uri().path());\n            AppServer::resolve_endpoint(req, route_value)\n        }))\n    }\n});\n")),Object(r.b)("h1",{id:"about-obsidian"},"About Obsidian"),Object(r.b)("p",null,Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/obsidian-rs/obsidian"}),"Obsidian")," is a web development framework built in Rust which vision to lower down the learning curve of web development in Rust without losing the advantage of it. Currently, Obsidian is under active development and we expected to release v0.2 in this couple of months."))}l.isMDXComponent=!0}}]);