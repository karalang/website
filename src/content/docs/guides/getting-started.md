---
title: Getting Started
description: Install the Kāra toolchain and run your first program.
---

## Install

The Kāra compiler, `karac`, installs via Cargo:

```sh
cargo install karac
```

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
