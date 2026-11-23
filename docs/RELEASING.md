# Manual release publication (no GitHub Actions)

The first public release is pending. The Freeware License is selected; Windows
code-signing identity and reviewed production TUF authority remain required.
Do not publish unsigned local qualification artifacts.

1. In the private source repository, prepare a clean, reviewed build with the
   root `LICENSE` copied into the package as `HYBRO-LICENSE.txt`. The existing
   installed qualification build does not contain the newly selected license.
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
