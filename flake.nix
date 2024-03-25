{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";

    # prociono-font = {
    #   url = "github:theleagueof/prociono";
    #   flake = false;
    # };

    # fanwood-font = {
    #   url = "github:theleagueof/fanwood";
    #   flake = false;
    # };
  };

  outputs = { self, nixpkgs, flake-utils, # prociono-font, fanwood-font,
    ... }@inputs:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };

        # mkFont = (name: src:
        #   pkgs.stdenvNoCC.mkDerivation {
        #     inherit name src;

        #    installPhase = ''
        #       mkdir -p $out/
        #       find \( -name \*.otf -o -name \*.ttf \) -exec cp -r {} $out/ \;
        #     '';
        #   });

        # prociono = mkFont "prociono" prociono-font;
        # fanwood = mkFont "fanwood" fanwood-font;

      in with pkgs; {
        devShells.default = mkShell {
          buildInputs = [
            pkgs.nodejs
            pkgs.nodePackages.pnpm

            pkgs.nodePackages.typescript
            pkgs.nodePackages.typescript-language-server

            # fanwood
            # prociono
          ];
        };
      });
}
