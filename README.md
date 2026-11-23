<p align="center"><img src="assets/icon-128.png" alt="Moe's Harbor icon" width="128" height="128"></p>

# Moe's Harbor

A desktop workspace for your applications, projects and tools. Applications
are **Vessels**: independently managed plugins that cooperate through explicit
contracts. **Harbor** is the Moe's Harbor Plugin Store.

This is the official public distribution repository. The application source
repository is private. No GitHub account is required to download a public release.

## Downloads

**Current channel: manual preview.** Availability and exact checksums are shown below.
Downloads in this stage use GitHub HTTPS and SHA-256, without TUF. The first
preview is unsigned; Windows may warn or block it. TUF and production signing
remain required before broad general availability of the installer and Vessels.
Windows x64 is the first delivery target. Linux and macOS releases and native
qualification remain pending. The website is currently a separate preview.

The following permanent links follow the latest published manual preview:

- [Latest release and release notes](https://github.com/mauricehuschke/moes-harbor-releases/releases/latest)
- [Latest Windows x64 installer](https://github.com/mauricehuschke/moes-harbor-releases/releases/latest/download/hybro-setup-win32-x64.exe)
- [Latest SHA-256 checksums](https://github.com/mauricehuschke/moes-harbor-releases/releases/latest/download/SHA256SUMS.txt)
- [All published releases](https://github.com/mauricehuschke/moes-harbor-releases/releases)

The compatibility filename still contains `hybro`; the application is Moe's
Harbor. Installed executable paths remain stable. Always check release notes
and the matching version's checksums. A checksum detects changed bytes;
Windows signatures and TUF metadata establish publisher/release trust.

<!-- latest:start -->
**Latest manual preview: [v0.1.0](https://github.com/mauricehuschke/moes-harbor-releases/releases/tag/v0.1.0)**

Manual installation only; no TUF verification. This preview is not general availability.

These checksums belong to this exact version; the Latest link may advance.

| Asset | Bytes | SHA-256 |
| --- | ---: | --- |
| [hybro-setup-win32-x64.exe](https://github.com/mauricehuschke/moes-harbor-releases/releases/download/v0.1.0/hybro-setup-win32-x64.exe) | 161268441 | `49d95dfba3755740f23beb3f229d32bb866d5c49da5a23fe6c83c68961aaf88e` |
| [hybro-0.1.0-win32-x64.tgz](https://github.com/mauricehuschke/moes-harbor-releases/releases/download/v0.1.0/hybro-0.1.0-win32-x64.tgz) | 165654364 | `ddc38fb2c38d60b5d72ad90a7e5017a9dbbcc50be9b6d2f74e25651d9b83cd41` |
<!-- latest:end -->

## License and use

Moe's Harbor is **proprietary freeware**, free for private, educational,
professional and commercial use under the [Freeware License 1.0](LICENSE).
No account or subscription is required for the core application. Use is at
your own risk to the extent legally permitted; mandatory rights and liability
remain unaffected. There is no voluntary warranty or support commitment.
Vessels and included third-party components retain their own licenses.

## Branding checksums

The version table above describes the current download's exact bytes.
Older local qualification builds are not download candidates.

| Asset | SHA-256 |
| --- | --- |
| Display icon, assets/icon-128.png | 8e204b5aa7aa4930585112944831dc854b614679bbe9f092fcaf7af7dd257e51 |
| Favicon, assets/favicon.ico | 7ae0b76150a32b07e53d4313791220f94d90b7c32d132f7d4cf6408e9bcd1e11 |

See [asset checksums](assets/SHA256SUMS.txt) for the complete branding inventory.

## Website and update integration

[Integration settings](integration/README.md) define the public download and
metadata locations for the Lovable website and the desktop client. Signing
keys are managed separately. Direct manual-preview downloads use the published latest.json display record.
TUF-backed automatic updates, installation links and repository import remain
unavailable until a reviewed production trust root and valid signed catalog exist. This repository's display metadata is not a trust root.

Maintainers: follow [manual release publication](docs/RELEASING.md), then run
`node scripts/refresh-latest.mjs` to update the exact version and SHA table from
the published release. No GitHub Actions are used.
