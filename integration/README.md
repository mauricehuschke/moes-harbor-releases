# Website and desktop connection

Status: preparation only. No public application release, production TUF root
or signed catalog exists. The separate Lovable website need not be published
to configure these locations or test the unavailable state.

`release-source.json` is deployment planning data, **not** an importable desktop
connection. Never import its null root or invent a replacement trust root.

| Server setting | Value |
| --- | --- |
| `TUF_METADATA_URL` | `https://raw.githubusercontent.com/mauricehuschke/moes-harbor-releases/main/metadata/` |
| `TUF_TARGETS_URL` | `https://github.com/mauricehuschke/moes-harbor-releases/releases/download/` |
| `TUF_CATALOG_BASE_URL` | `https://raw.githubusercontent.com/mauricehuschke/moes-harbor-releases/main/catalog/` |
| `TUF_CATALOG_TARGET` | `catalog.json` |
| `TUF_ROOT_JSON` | Pending: reviewed, signed **public** bootstrap root |
| `HARBOR_REPOSITORY_ID` | Pending: desktop-compatible identity derived from that root and these locations |

These URLs and the public root are not private keys. Never place a private TUF
key, certificate private key or GitHub token in the browser, this repository or
a chat. TUF signs the release authorization (including sizes and hashes);
Authenticode signs Windows executables. Neither is a user license key.

The desktop identity is SHA-256 of UTF-8 JSON with recursively sorted object
keys for `{ metadataUrl, targetsUrl, root, catalogBaseUrl }`. Normalize HTTPS
base URLs first and omit `catalogBaseUrl` when it equals `targetsUrl`. Preserve
array order. Title and schemaVersion are not identity fields. Retain bootstrap
identity across reviewed signed root rotation; never reset rollback history by
substituting the rotated root as a new repository. Bind cached website catalogs
to this identity; an old catalog must not become trusted under new endpoints.

Catalog entries follow [catalog.schema.json](catalog.schema.json), copied from
the desktop authority. A release normally contains both `application` and
`installer` items with id `hybro`. Their uniqueness key includes **kind**, id,
version, platform and architecture; target paths must also be unique. Human
names are Moe's Harbor / Vessels; serialized kind `plugin` and `hybro://` links
remain compatibility interfaces.

Use immutable versioned targets such as `v0.1.0/hybro-setup-win32-x64.exe` and
`v0.1.0/hybro-0.1.0-win32-x64.tgz`. Set the reviewed TUF root's
`consistent_snapshot` to false for these unprefixed GitHub asset names.
Latest aliases are human convenience links, never a trusted update decision.

The website validates TUF freshness, signatures, lengths, hashes and rollback
state before displaying installable items; it does not sign releases. Missing
trust, unavailable metadata, identity mismatch or expired metadata means
downloads remain unavailable. Until configured, `/connection/harbor.json`
returns an unavailable response, not a placeholder connection. Use a maintained
standard TUF implementation and qualify interoperability before enabling real
downloads. A working preview alone is not production TUF acceptance.

## License presentation

Link to the [exact Freeware License](../LICENSE). Describe the application as
free for personal and professional/commercial use, without a mandatory account.
Do not describe it as open source or promise exclusion of all statutory
liability. Preserve separately applicable third-party/Vessel licenses. Present
the terms before download/installation. Publisher legal identity, website legal
notices and privacy disclosures remain deployment inputs, not invented text.
