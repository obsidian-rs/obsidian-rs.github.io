---
id: quick-start
title: Quick Start 
sidebar_label: Quick Start 
---

## Quick install guide
if you haven't installed [Rust](https://www.rust-lang.org/) yet, here is a quick guide which using rustup:
```bash
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
After Rust is installed, you can use cargo to generate a new project:
```bash
$ cargo new my-app
```
Go to `Cargo.toml` file, add `obsidian` and `tokio`:
```toml {10-11}
[package]
name = "my-app"
version = "0.1.0"
authors = ["XXX <xxx@email.com>"]
edition = "2018"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
obsidian = "0.2.0"
tokio = "0.2.16"
```
Go to `main.rs`, add these:
```rust
use obsidian::{App, context::Context};

#[tokio::main]
async fn main() {
    let mut app: App = App::new();
    let addr = ([127, 0, 0, 1], 3000).into();

    app.get("/", |ctx: Context| async { ctx.build("Hello World").ok() });

    app.listen(&addr, || {
        println!("server is listening to {}", &addr);
    }).await;
}
```

Go to terminal type this to start your server:
```bash
$ cargo run
```
