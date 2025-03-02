+++

title = "Nix Expression"
description = "Represents any value or construct that can be defined using the Nix language"
date = 2025-02-28

[taxonomies]
tags = ["tech", "nix"]

+++

Represents any *value* or *construct* that can be defined using the [Nix language](@/tech/nix-lang.md).

## Arithmetic

```nix
0 + 1  # 1
10 - 1 # 9
4 * 2  # 8
8 / 2  # 4
```

## Boolean operations

```nix
true || false # true

5 == 5 # true
```

## Structured data representation (sets/attributes)

```nix
({ a = 1; b = 2; }.a) # 1
```
