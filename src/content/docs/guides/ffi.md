---
title: FFI & Interop
description: Call C from Kāra, and build Kāra libraries that C and Rust link like any other.
---

Kāra is designed to be **additive**: drop it into an existing codebase rather
than replace one. That means the C boundary works in both directions.

## Calling C from Kāra

Declare foreign functions in an `unsafe extern "C"` block and call them inside
`unsafe`:

```
/// # Safety
/// `sqrt` is pure math from libm; `strlen` reads only the NUL-terminated
/// bytes behind the pointer, which `c"..."` literals guarantee.
unsafe extern "C" {
    fn sqrt(x: f64) -> f64;
    fn strlen(s: *const u8) -> usize;
}

fn main() {
    // Safety: finite input; sqrt has no preconditions.
    let root = unsafe { sqrt(2.0) };
    println(root);                        // 1.4142135623730951
    let msg = c"hello from C land";
    // Safety: msg is a static NUL-terminated literal.
    let n = unsafe { strlen(msg.as_ptr()) };
    println(n as i64);                    // 17
}
```

This runs identically under `karac run` (the JIT resolves symbols in-process)
and `karac build` (the binary links them from libc/libm). The essentials:

- **`unsafe` is explicit, twice** — the extern block and every call site. The
  compiler can't verify foreign code, so each carries a `# Safety` /
  `// Safety:` comment stating the trust contract; a lint warns when missing.
- **C strings cross as `*const u8`** — a `c"..."` literal (`ref CStr`,
  NUL-terminated, zero-copy) hands C a pointer via `.as_ptr()`.
- **Effects still apply** — an extern fn that touches the world declares it,
  e.g. `fn puts(s: *const u8) -> i32 with writes(Console);`. Foreign code
  doesn't dodge the effect system.

## Building a Kāra library for C or Rust

The other direction: write a kernel in Kāra, export it with `pub extern "C"
fn`, and build a linkable artifact with a generated header —

```
pub extern "C" fn fib(n: i64) -> i64 {
    if n < 2 { return n; }
    let mut a = 0;
    let mut b = 1;
    let mut i = 2;
    while i <= n {
        let c = a + b;
        a = b;
        b = c;
        i = i + 1;
    }
    b
}
```

```sh
karac build kernel.kara --crate-type staticlib   # libkernel.a + libkernel.h
karac build kernel.kara --crate-type cdylib      # libkernel.so + libkernel.h
```

The `.a` is thick — it bundles the Kāra runtime, so a C program links it and
runs with **no Kāra toolchain installed**. `#[repr(C)]` structs cross the
boundary by value, and the generated header carries the exact signatures.

## The full walkthrough

The Kāra Book chapter
[FFI and Interop: Kāra as a Library](/book/ch18-interop.html) takes one kernel
from `.kara` source into both a C host and a Rust host side by side — layout
rules, ownership across the boundary, effects at the boundary, and the runtime
lifecycle calls. The worked example lives in the compiler repo under
[`examples/interop/`](https://github.com/karalang/kara/tree/main/examples/interop).
