+++

title = "Topological Sorting"
description = "A key concept in graph theory used for organizing dependencies, such as package installations in Linux."
date = 2025-02-28

[taxonomies]
tags = ["tech", "algorithms"]

+++

Topological sorting is a method used to order tasks or dependencies so that each one comes only after the things it depends on.  
<br />

It applies to directed acyclic graphs (*DAGs*), which are structures where dependencies flow in one direction without cycle. This is useful in package management, task scheduling, and more.  
<br />

## How Topological Sorting Works

Imagine you're installing software that depends on other programs to work. You need to install those dependencies first before the main package.  
<br />

There are two main ways to do this:

- **Kahn’s Algorithm (Breadth-First Approach):** Start with packages that have no dependencies, install them, then move to packages that depend on them.
- **Depth-First Search (DFS) Approach:** Visit each package’s dependencies first, then install the package itself. This naturally leads to the correct order.

If a cycle exists (e.g., two packages depend on each other), topological sorting isn't possible, and an error is reported.

## Apt

The Debian package manager, `apt`, uses topological sorting to resolve dependencies. Suppose you want to install `ffmpeg`, which requires `libx264` (a video encoding library). `libx264`, in turn, depends on `libc6`, a core system library. The dependency tree looks like this:  
<br />

```lisp
    ffmpeg
      |
   libx264
      |
    libc6
```

### Installation Order

To install `ffmpeg`, `apt` first checks what it depends on and installs in this order:

- Install `libc6` (it has no further dependencies).
- Install `libx264` (now its dependency, `libc6`, is available).
- Install `ffmpeg` (since everything it needs is now installed).

This ensures that every package is available when another package needs it.

### Handling Dependency Cycles

Sometimes, dependencies form a cycle, like if `package-A` depends on `package-B`, but `package-B` also depends on `package-A`. This is impossible to resolve automatically, so `apt` will show an error. Users must either remove one of the conflicting packages or find an alternative that avoids the cycle.  
<br />

Topological sorting makes sure package managers install things in the right order and warn users when something is wrong, keeping systems stable and functional.
