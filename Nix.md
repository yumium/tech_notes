# Nix

Nix is a purely functional package manager.

With Nix we want to make environments reproducible. Example nix shell script

```bash
#!/usr/bin/env nix-shell
#! nix-shell -i bash --pure
#! nix-shell -p bash cacert curl jq python3Packages.xmljson
#! nix-shell -I nixpkgs=https://github.com/NixOS/nixpkgs/archive/2a601aafdc5605a5133a2ca506a34a3a73377247.tar.gz

curl https://github.com/NixOS/nixpkgs/releases.atom | xml2json | jq .

# First line uses nix-shell
# Second line specifies to run bash but with --pure, so ignore current installed packages
# Third line installs the required packages
# Fourth line specifies the specific Nixpkgs repo, so we get same package versions everywhere
```

Example custom package

```bash
# icat.nix
{
  stdenv,
  fetchFromGitHub,
  imlib2,
  xorg,
}:

stdenv.mkDerivation {
  # every package must specify name and version number
  pname = "icat";
  version = "v0.5";

  # where the src is for the package
  src = fetchFromGitHub {
    owner = "atextor";
    repo = "icat";
    rev = "v0.5";
    sha256 = "0wyy2ksxp95vnh71ybj1bbmqd5ggp13x3mk37pzr99ljs9awy8ka";
  };

  buildInputs = [ imlib2 xorg.libX11 ];

  installPhase = ''
    mkdir -p $out/bin
    cp icat $out/bin
  '';
}
```

NixOS takes Nix to configure entire system (packages to be installed, services to run, other settings and options). Example linux nix file

```bash
{ config, pkgs, ... }:
{
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;

  services.xserver.enable = true;

  services.xserver.displayManager.gdm.enable = true;
  services.xserver.desktopManager.gnome.enable = true;

  users.users.alice = {
    isNormalUser = true;
    extraGroups = [ "wheel" ];
    initialPassword = "test";
  };

  system.stateVersion = "24.05";
}
```

### How Nix works

Nix packages are stored in `/nix/store/`, example

```
/nix/store/b6gvzjyb2pg0kjfwrjmg1vfhh54ad73z-firefox-33.1/
```

`b6gvzjy...` is the hash of all dependencies of the package

- The hash allows multiple versions of the same package exist. This reduces breaking of existing applications when another application requires newer version of a dependency, it just installs the new version alongside the old one.
- All dependencies are complete DAGs. Patial DAG means it implicitly assumes package version in your machines, which may not be present in another machine
- Supports many users. If both user have access to same package, they're not installed twice. But a package only available to one user cannot be accessed by another user
- As upgrading does not overwrite, upgrades are atomic. And so is rolling back
- Has a garbage collector that uninstalled unused packages (unused packages are not deleted straight away as you may want to roll back)
- Dependencies built from Nix expressions (describe other packages, sources, build script, environment variables etc.). These are also functions so different variable on same function give different build (and different Nix hash)
- Deployment tries to find pre-built binary from `cache.nixos.org` first, if not found directly builds from source (which can take long time)


### How Nix OS works

- Extends Nix to system config files as well
- All OS files in `/bin`, `/lib`, `/usr` etc. are stored in `/nix/store`. This allows multiple versions to exist. NixOS does have `/etc` but most files in there are symlinks to files in `/nix/store`
- Having multiple versions allows atomic upgrade/rollback, reproducibility, testing new builds etc.

