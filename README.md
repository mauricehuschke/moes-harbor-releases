<p align="center"><img src="assets/icon-128.png" alt="Moe's Harbor icon" width="128" height="128"></p>

# Moe's Harbor

A desktop workspace for your applications, projects and tools. Applications
are **Vessels**: independently managed plugins that cooperate through explicit
contracts. **Harbor** is the Moe's Harbor Plugin Store.

This is the official public distribution repository. The application source
repository is private. No GitHub account is required to download a public release.

## Downloads

**The first public release is being prepared. No installer is published yet.**
Windows x64 is the first delivery target. Linux and macOS releases and native
qualification remain pending. The website is currently a separate preview.

The following permanent links will work after the first stable release:

- [Latest release and release notes](https://github.com/mauricehuschke/moes-harbor-releases/releases/latest)
- [Latest Windows x64 installer](https://github.com/mauricehuschke/moes-harbor-releases/releases/latest/download/hybro-setup-win32-x64.exe)
- [Latest SHA-256 checksums](https://github.com/mauricehuschke/moes-harbor-releases/releases/latest/download/SHA256SUMS.txt)
- [All published releases](https://github.com/mauricehuschke/moes-harbor-releases/releases)

The compatibility filename still contains `hybro`; the application is Moe's
Harbor. Installed executable paths remain stable. Always check release notes
and the matching version's checksums. A checksum detects changed bytes;
Windows signatures and TUF metadata establish publisher/release trust.

<!-- latest:start -->
No published stable release or release checksums yet.
<!-- latest:end -->

## License and use

Moe's Harbor is **proprietary freeware**, free for private, educational,
professional and commercial use under the [Freeware License 1.0](LICENSE).
No account or subscription is required for the core application. Use is at
your own risk to the extent legally permitted; mandatory rights and liability
remain unaffected. There is no voluntary warranty or support commitment.
Vessels and included third-party components retain their own licenses.

## Current preparation evidence

These are **local qualification bytes, not a public release**. The installer
predates the Freeware License and has no production Windows signature. It must
be rebuilt, signed and qualified before publication; its final hash will differ.

| Local artifact | SHA-256 |
| --- | --- |
| Unsigned Windows setup, 161,266,124 bytes | `e3516baf7690bd68a3ebe1b84ee1cc55e1140ac05ceefe5073eba2e27e416717` |
| Associated 149-file package inventory | `1903c147d722c28d401b0a02be909f32d8d975d7f19951b1156efedf9f1d1cbc` |
| Display icon, `assets/icon-128.png` | `8e204b5aa7aa4930585112944831dc854b614679bbe9f092fcaf7af7dd257e51` |
| Favicon, `assets/favicon.ico` | `7ae0b76150a32b07e53d4313791220f94d90b7c32d132f7d4cf6408e9bcd1e11` |

See [asset checksums](assets/SHA256SUMS.txt) for the complete branding inventory.

## Website and update integration

[Integration settings](integration/README.md) define the public download and
metadata locations for the Lovable website and the desktop client. Signing
keys are managed separately. Until a production trust root and valid signed
catalog exist, verified downloads, installation links and repository import
remain unavailable. This repository's display metadata is not a trust root.

Maintainers: follow [manual release publication](docs/RELEASING.md), then run
`node scripts/refresh-latest.mjs` to update the exact version and SHA table from
the published release. No GitHub Actions are used.
