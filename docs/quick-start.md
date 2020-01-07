---
id: quick-start
title: Quick Start 
sidebar_label: Quick Start 
---

## Quick install guide
if you haven't installed [Rust](https://www.rust-lang.org/) yet, here is a quick guide which using rustup:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
After Rust is installed, you can use cargo to generate a new project:
```bash
cargo new my-app
```
Go to `Cargo.toml` file, add this line:
```toml {10}
[package]
name = "my-app"
version = "0.1.0"
authors = ["Gan Jun Kai <kuhn96@gmail.com>"]
edition = "2018"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
obsidian = "0.1.0-alpha.1"
```
Go to `main.rs`, add these:
```rust {1,4-11}
use obsidian::App;

fn main() {
  let mut app = App::new();
  let addr = ([127, 0, 0, 1], 3000).into();

  app.get("/", |_ctx| "Hello World");

  app.listen(&addr, || {
    println!("server is listening to {}", &addr);
  });
}
```

Go to terminal type this to start your server:
```bash
cargo run
```
