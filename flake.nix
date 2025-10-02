{
  description = "My Awesome Desktop Shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    ags,
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
    pname = "hyprshell";
    entry = "app.tsx";
    scripts = import ./scripts.nix {inherit pkgs;};

    astalPackages = with ags.packages.${system}; [
      io
      astal4
      tray
      mpris
      apps
      hyprland
      bluetooth
      network
      wireplumber
      notifd
    ];

    extraBuildInputs = with pkgs; [
      kooha
      grimblast
      hyprpicker
      btop
      impala
      wiremix
      blueberry
      libgtop
      scripts.screenshot
    ];

    extraPackages =
      astalPackages
      ++ extraBuildInputs
      ++ [
        pkgs.libadwaita
        pkgs.libsoup_3
      ];
  in {
    packages.${system} = {
      default = pkgs.stdenv.mkDerivation {
        name = pname;
        src = ./.;

        nativeBuildInputs = with pkgs; [
          wrapGAppsHook
          gobject-introspection
          ags.packages.${system}.default
        ];

        buildInputs = extraPackages ++ [pkgs.gjs];

        installPhase = ''
          runHook preInstall

          mkdir -p $out/bin
          mkdir -p $out/share
          cp -r * $out/share
          ags bundle ${entry} $out/bin/${pname} -d "SRC='$out/share'"

          runHook postInstall
        '';
      };
    };

    devShells.${system} = {
      default = pkgs.mkShell {
        buildInputs =
          [
            (ags.packages.${system}.default.override {
              inherit extraPackages;
            })
          ]
          ++ extraBuildInputs;
      };
    };
  };
}
