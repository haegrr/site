{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixpkgs-unstable";
  };

  outputs =
    { self, nixpkgs, ... }:
    let
      forAllSystems =
        f: with nixpkgs.lib; genAttrs systems.flakeExposed (system: f nixpkgs.legacyPackages.${system});
    in
    {
      formatter = forAllSystems (pkgs: pkgs.nixfmt);
      devShell = forAllSystems (pkgs: pkgs.callPackage ./shell.nix {});
    };
}
