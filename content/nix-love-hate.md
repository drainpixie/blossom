+++
title = "Why My Love–Hate Relationship with Nix Continues"
description = "A rant about why I hate Nix. Did I mention I love Nix?222"
date = 2024-06-10

[taxonomies] 
tags = ["nix", "rant"]
+++

## Lost in the Weeds

Nix may sound like Unix, but it offers a unique set of tools designed
for package and environment management, with *consistency* and
*reproducibility* at its core.

- Building and managing packages and systems
- Managing software environments, systems, and configurations
- Ensuring *consistency* and *reproducibility* across all the
aforementioned

If you’re looking for more than a surface-level intro to Nix, besides
[rants](https://news.ycombinator.com/item?id=23251895) on YCombinator,
[Alexander Bantyev](https://github.com/balsoft) did a really good job at
[explaining it in layman’s terms](https://serokell.io/blog/what-is-nix).

### What Does This Mean

In practice, the power of being able to recreate an environment within
seconds anywhere Nix runs is immense.\
<br>

These environments are all *isolated* and *reproducible*, which ensures
*conflict-free portability* through a single source of truth — a simple
configuration file that tells Nix how something is built. Here’s a vague
example showing Nix in practice:\
<br>

``` nix
{
  description = "A simple script that sums two numbers";
  inputs.utils.url = "github:numtide/flake-utils";

  outputs =
    {
      self,
      nixpkgs,
      utils,
    }:
    utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
        name = "sum";
      in
      rec {
        defaultPackage = packages.sum;
        packages.sum = pkgs.writeShellScriptBin name ''
            echo $(($1 + $2))
        '';
      }
    );
}
```

### Sounds Sweet

What’s the catch? It sounds too good to be true — and it isn’t; if you
don’t count *complexity* and *lack of adoption*.\
<br>

Nix is fundamentally different from mainline distros due to how it is
engineered, such as the lack of
[FHS](https://refspecs.linuxfoundation.org/FHS_3.0/fhs-3.0.pdf)
compliance and the necessity of doing everything *declaratively*, making
things tricky.\
<br>

> Note that doing things *imperatively* isn’t impossible; it’s just
> heavily frowned upon as it goes against the whole point of Nix and is
> incredibly *error-prone*.

<br>

The language can often be *confusing* or, worse, produce “impossible” to
debug errors, like the infamous *infinite recursion encountered*.\
<br>

Getting something that isn’t already packaged working can be a
nightmare.\
<br>

Dealing with *functional programming purists* can be challenging; but at
least, [there is no war in Ba Sing
Se](https://github.com/KFearsoff/nix-drama-explained).

## Quid ergo?

> *A Latin phrase* meaning “So what?”

<br>

Nothing, really. It just wanted to share its experience.\
Overall, it is *enamoured* with Nix but also *repulsed*; it is a sort of
paradoxical toxic relationship.\
<br>

Despite the pain it can bring, it truly believes that Nix is a glimpse
into the *future* of package management — and it hopes it becomes more
accessible to accelerate that future.
