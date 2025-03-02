+++

title = "Nix Flakes"
description = "An experimental feature that defines policies for managing dependencies between expressions."
date = 2025-02-28

[taxonomies]
tags = ["tech", "nix"]

+++

## Quid sunt?
> *A Latin phrase* meaning “What are they?”  

<br />

An experimental[^1] feature that defines *policies* for *managing dependencies* between [expressions](@/tech/nix-expression.md) by *automatically managing* their *references/versions*, whilst providing a *new command-line interface* for managing the aforementioned.  
<br />

It works by creating a *source tree* (think, Git repository), with a `flake.nix` at the root, ensuring that the builds are *fully reproducible*, thanks to the *locked dependencies* and the *isolated environments*.

## Examples

<br />

```nix
{
 description = "A simple script that sums two numbers";
 inputs.utils.url = "github:numtide/flake-utils";

 outputs = {self, nixpkgs, utils}:
  utils.lib.eachDefaultSystem(system:
   let
    pkgs = import nixpkgs {inherit system;};
    name = "sum2";
   in rec {
    defaultPackage = packages.sum2;
    packages.sum2 = pkgs.writeShellScriptBin name ''
     echo $(($1 + $2))
    '';
   }
  );
}
```

<br />

```sh
$ nix shell
$ sum2 1 2
3
```

<br />

```nix
{
  description = "A development shell for Python programs";
  inputs.utils.url = "github:numtide/flake-utils";

  outputs = {
    self,
    nixpkgs,
    utils,
  }:
    utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {inherit system;};
      in
        with pkgs; {
          devShell = mkShell {
            name = "python-dev-shell";

            buildInputs = [
              python3
              python3Packages.virtualenv
            ];

            shellHook = ''
              echo "Welcome to the Python development shell\n"

              python --version
              virtualenv --version
            '';
          };
        }
    );
}
```

<br />

```sh
$ nix develop
Welcome to the Python development shell

Python 3.11.9
virtualenv 20.25.3 from /nix/store/.../virtualenv/__init__.py
```
<br />

---

[^1]: As of 2024/06/26, prone to change in the future.
