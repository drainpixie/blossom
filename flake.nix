{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {inherit system;};
      buildInputs = builtins.attrValues {
        inherit
          (pkgs.nodePackages)
          nodejs
          pnpm
          ;
      };
    in {
      devShells.default = let
        np = let
          gum = "${pkgs.gum}/bin/gum";
        in
          pkgs.writeShellScriptBin "np" ''
              pushd src/posts > /dev/null || exit

              last_file=$(ls *.md 2>/dev/null | sort | tail -n 1)
              if [[ -z "$last_file" ]]; then
                next_number="0001"
              else
                last_number=$(basename "$last_file" .md)
                next_number=$(printf "%04d" $((10#$last_number + 1)))
              fi

              title=$(${gum} input --placeholder "Enter title")
              tags=$(${gum} input --placeholder "Enter tags (comma-separated)")
              description=$(${gum} input --placeholder "Enter description")

              date=$(date +"%d/%m — %Y")
              formatted_tags=$(echo "$tags" | awk -F, '{for(i=1;i<=NF;i++) print "- " $i}' | sed 's/^ *//;s/ *$//')

              if ${gum} confirm "Create post ''${next_number}.md with the provided information?"; then
                cat <<EOF > "''${next_number}.md"
            ---
            pin: false

            title: $title
            date: $date
            tags:
            $formatted_tags

            description: $description
            todo: true
            ---
            EOF

                ${gum} style --foreground 2 "Post created as ''${next_number}.md"
              else
                ${gum} style --foreground 1 "Post creation cancelled."
              fi

              popd > /dev/null
          '';
      in
        pkgs.mkShell {
          inherit buildInputs;
          packages = [np];
        };
    });
}
