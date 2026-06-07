---
title: Getting Started
description: Install the Kāra toolchain and run your first program.
---

## Install

The Kāra compiler, `karac`, is not published to crates.io yet — build it from
source. You'll need a [Rust toolchain](https://rustup.rs) and, for native
compilation, LLVM 18.

```sh
git clone https://github.com/karalang/kara
cd kara
cargo build --release --features llvm
cargo build -p karac-runtime --release   # runtime library for native builds
```

The compiler is at `target/release/karac`; add it to your `PATH`.

## Hello, world

Create `hello.kara`:

```
fn main() {
    println("Hello, world!");
}
```

Build and run it:

```sh
karac run hello.kara
```

Or compile a native binary:

```sh
karac build hello.kara
./hello
```

## Next steps

Full language documentation is in progress. Until then:

- Browse the [Kāra repository](https://github.com/karalang/kara)
- See real programs and benchmarks in [kara-katas](https://github.com/karalang/kara-katas)
