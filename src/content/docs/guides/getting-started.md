---
title: Getting Started
description: Install the Kāra toolchain and run your first program.
---

## Install a prebuilt binary

Development-preview builds of `karac` are published on the
[releases page](https://github.com/karalang/kara/releases). Each release
carries self-contained bundles (no LLVM or Rust required on your machine) for:

- Linux x86_64 (`x86_64-linux`)
- Linux ARM64 (`aarch64-linux`)
- macOS Apple silicon (`aarch64-macos`)

Download the newest tarball for your platform, then:

```sh
tar xzf karac-*.tar.gz
export PATH="$PWD/karac-<version>-<platform>/bin:$PATH"
karac --version
```

The layout is relocatable — `karac` finds its runtime libraries relative to
its own location, so the unpacked directory can live anywhere. Add the
`export PATH` line to your shell profile to make it stick.

On macOS, Gatekeeper quarantines downloaded binaries; clear it once after
unpacking:

```sh
xattr -dr com.apple.quarantine karac-<version>-<platform>
```

`karac run` (JIT) works out of the box. `karac build` (native binaries)
additionally needs a C linker — `build-essential` on Debian/Ubuntu, Xcode
Command Line Tools on macOS. WebAssembly targets (`--target=wasm_*`) are not
bundled in the preview; build from source for those.

These are pre-v1 preview builds: expect breakage, and report issues with the
exact `karac --version` string — its `+g<sha>` suffix pins the commit the
binary was built from.

## Build from source

Alternatively, build `karac` yourself. You'll need a
[Rust toolchain](https://rustup.rs) and, for native compilation, LLVM 18.

```sh
git clone https://github.com/karalang/kara
cd kara
cargo build --release --features llvm
# Runtime archives for `karac build` — lean first, then full (order matters:
# both emit the same canonical filename).
cargo rustc -p karac-runtime --release --no-default-features --features net --crate-type staticlib
cp target/release/libkarac_runtime.a target/release/libkarac_runtime_min.a
cargo rustc -p karac-runtime --release --crate-type staticlib
```

The compiler is at `target/release/karac`; add it to your `PATH`. See the
[repository README](https://github.com/karalang/kara#getting-started) for the
full recipe, including the WebAssembly runtime archives.

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
