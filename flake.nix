{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    utils,
    ...
  }:
    utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {inherit system;};
      buildInputs = builtins.attrValues {
        inherit (pkgs) zola;
      };
    in {
      devShells.default =
        pkgs.mkShell {
          inherit buildInputs;
        };
    });
}
