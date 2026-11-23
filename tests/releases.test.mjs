import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { releaseRecord, updateReadme, parseChecksums } from '../scripts/refresh-latest.mjs';

const base = 'https://github.com/mauricehuschke/moes-harbor-releases';
function fixture() {
  const assets = ['hybro-setup-win32-x64.exe', 'hybro-1.2.3-win32-x64.tgz'].map((name, i) => ({
    name, size: 100 + i, state: 'uploaded', digest: 'sha256:' + String(i + 1).repeat(64),
    browser_download_url: base + '/releases/download/v1.2.3/' + name
  }));
  return { release: { draft: false, prerelease: false, tag_name: 'v1.2.3',
    html_url: base + '/releases/tag/v1.2.3', published_at: '2026-11-23T12:00:00Z', assets },
    sums: assets.map(asset => asset.digest.slice(7) + '  ' + asset.name).join('\n') + '\n' };
}
test('published binaries bind exact version, size and GitHub digest to the README', () => {
  const { release, sums } = fixture();
  const record = releaseRecord(release, sums);
  assert.equal(record.distribution, 'manual-preview');
  assert.equal(record.verification, 'sha256');
  const result = updateReadme('Before\n<!-- latest:start -->\nPending\n<!-- latest:end -->\nAfter', record);
  assert.match(result, /v1.2.3/);
  assert.match(result, /not general availability/);
  assert.match(result, /releases\/download\/v1.2.3\/hybro-setup/);
  assert.ok(result.includes('1'.repeat(64)));
  assert.ok(result.startsWith('Before\n') && result.endsWith('\nAfter'));
});
test('unsigned display metadata cannot hide digest mismatch or wrong release identity', () => {
  for (const change of [
    release => { release.draft = true; }, release => { release.prerelease = true; },
    release => { release.tag_name = 'v1.2.3-rc1'; },
    release => { release.assets[0].digest = null; },
    release => { release.assets[0].digest = 'sha256:' + 'f'.repeat(64); },
    release => { release.assets[0].browser_download_url = 'https://example.com/file.exe'; },
    release => { release.assets[0].size = 0; },
    release => { release.assets.push(release.assets[0]); },
    release => { release.html_url = 'https://example.com/release'; }
  ]) {
    const { release, sums } = fixture(); change(release);
    assert.throws(() => releaseRecord(release, sums));
  }
});
test('malformed, duplicate and surplus checksums or malformed README refuse update', () => {
  const { release, sums } = fixture();
  assert.throws(() => parseChecksums(sums + sums));
  assert.throws(() => parseChecksums('abcd  installer.exe'));
  assert.throws(() => releaseRecord(release, sums + 'a'.repeat(64) + '  foreign.exe\n'));
  assert.throws(() => updateReadme('no markers', releaseRecord(release, sums)));
  assert.throws(() => updateReadme('<!-- latest:end --><!-- latest:start -->', releaseRecord(release, sums)));
});
test('checked-in branding hashes and prepared status describe real files', () => {
  const root = new URL('../', import.meta.url);
  const manifest = parseChecksums(fs.readFileSync(new URL('assets/SHA256SUMS.txt', root), 'utf8'));
  for (const [name, expected] of manifest) {
    assert.equal(createHash('sha256').update(fs.readFileSync(new URL('assets/' + name, root))).digest('hex'), expected);
  }
  const latest = JSON.parse(fs.readFileSync(new URL('latest.json', root), 'utf8'));
  const readme = fs.readFileSync(new URL('README.md', root), 'utf8');
  assert.equal(updateReadme(readme, latest), readme);
  const source = JSON.parse(fs.readFileSync(new URL('integration/release-source.json', root), 'utf8'));
  assert.equal(source.repository, 'mauricehuschke/moes-harbor-releases');
});
