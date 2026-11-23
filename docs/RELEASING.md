# Manual release publication (no GitHub Actions)

## Current owner-approved stage: manual preview

The 2026-11-23 owner decision permits a locally qualified manual Windows preview without TUF or production code signing. The clean build must include the selected license and exact Windows acceptance evidence. Use the private preparation mode manual-preview, not qualification-only output. Publish the exact installer, application archive and SHA256SUMS.txt, clearly labelled Manual preview / unsigned / no TUF. Use a normal versioned GitHub release designated latest to preserve the requested latest links; this GitHub label is not a general-availability claim. Refresh latest.json/README after checking public asset bytes. All production/TUF steps below remain mandatory before broad installer/Vessel availability.

Website changes are made directly through mauricehuschke/moes-harbor-webseite. No billable Lovable requests, website deployment or Actions.

### Manual preview checklist

1. Build the clean licensed package and offline installer, retaining the fixed executable paths. Run Windows acceptance against those exact final bytes and preserve the existing profile.
2. Prepare with mode manual-preview and the actual license/evidence. Only these reviewed artifacts are eligible; qualification-only output stays private.
3. Create a draft release and upload exactly the installer, application archive and SHA256SUMS.txt. Match every uploaded size and GitHub SHA-256 digest to the local artifact. Never upload candidate receipts, profiles, maintenance files, private source or keys.
4. Publish the reviewed manual preview and mark it latest. Keep the title and notes explicit about unsigned Windows binaries, no TUF and no general availability. Never overwrite a published version.
5. Download public bytes without credentials, compare hashes, then run node scripts/refresh-latest.mjs and node --test tests/*.test.mjs. Merge the exact latest.json and README checksum table through a PR.
6. Merge the website adapter through its own PR. Its server reads latest.json automatically; no TUF secrets or operator catalog synchronization are needed for this manual path. Check the real versioned download link and preserved unavailable TUF connection state. Website deployment remains separate.

## Future production workflow: before broad availability

The Freeware License is selected. A reviewed Windows code-signing identity and production TUF authority remain required for this later stage. Do not treat the manual preview as production acceptance.

1. In the private source repository, prepare a clean, reviewed build with the
   root `LICENSE` copied into the package as `HYBRO-LICENSE.txt`. Always verify that the exact package contains the selected license.
   Preserve the user's fixed executable paths and installed profile; do not
   overwrite an owned installation during packaging.
2. Sign the app and native adapter, build the offline setup, sign setup, and
   run the required Windows checks against those exact final bytes. Use the
   existing release preparation/publication commands and retain their receipts.
   Record actual publisher identity and code-signing certificate; never invent
   them. Keep third-party license notices in the distribution.
3. Choose a new immutable stable tag `vMAJOR.MINOR.PATCH`. Prepare assets
   `hybro-setup-win32-x64.exe`, `hybro-MAJOR.MINOR.PATCH-win32-x64.tgz` and
   `SHA256SUMS.txt`. Compute lowercase SHA-256 **after** signing. The checksum
   file has exactly one line per binary asset: `<64 hex>  <asset name>`.
   Upload reviewed public artifacts only; no private source snapshots, local
   profiles, credentials, keys, maintenance state or development caches.
4. Create a draft release, upload these exact assets and inspect download
   bytes and release notes. A draft is not anonymous delivery. Publish the
   reviewed stable release and designate it latest. Never replace the bytes of
   an already published version. GitHub's automatically generated source
   archives contain only this public metadata repository, not application code.
5. Publish the reviewed standard TUF metadata and catalog through a PR in this
   repository. Immutable artifacts must be publicly available first. Retain
   versioned roots and any versioned metadata required by the chosen TUF
   policy; write targets/catalog, snapshot and timestamp coherently, with
   timestamp last. Root keys stay offline; website hosting never receives
   private signing keys. Raw GitHub caches can temporarily be inconsistent;
   clients must reject/retry safely, never bypass validation. A CDN can replace
   this host later only through a reviewed connection/identity migration.
6. Run `node scripts/refresh-latest.mjs`. It reads GitHub's latest stable
   release, checks the checksum asset against GitHub's actual asset digests,
   and updates `latest.json` plus the README SHA table. It uploads nothing,
   executes no downloaded file and signs nothing. If GitHub digests are absent
   or disagree, it fails without updating those files. Run
   `node --test tests/*.test.mjs`, review the changes, and merge through a PR.
   The permanent latest download URL follows GitHub; the README table names an
   exact version so it never silently attributes an old hash to a new installer.
7. Configure Lovable's reviewed public root and matching repository identity,
   then use the operator catalog check. Verify the actual preview download,
   license, Windows signature, TUF import, update and rollback behavior before
   calling the complete public delivery path accepted. Website deployment is
   a separate action.

For signing-key setup, decide who holds the offline root keys, backups and
recovery instructions, and who may sign routine targets/snapshot/timestamp
updates. Use the existing TUF tooling and explicit owner review. No production
keys are generated or accepted automatically by this repository.

`latest.json`, SHA tables and `SHA256SUMS.txt` are display/integrity aids; they
are not the signed release authority. Public asset bytes must also match their
TUF target metadata and the selected publisher's Windows signature.
