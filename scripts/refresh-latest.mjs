import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const repository = 'mauricehuschke/moes-harbor-releases';
const origin = 'https://github.com/' + repository;
const maxBytes = 1_000_000;

export function parseChecksums(text) {
  const records = new Map();
  for (const line of text.trim().split(/\r?\n/)) {
    const match = /^([a-f0-9]{64})  ([A-Za-z0-9][A-Za-z0-9._-]{0,199})$/.exec(line);
    if (!match || records.has(match[2])) throw new Error('Invalid or duplicate checksum line.');
    records.set(match[2], match[1]);
  }
  return records;
}

export function releaseRecord(release, checksums) {
  if (!release || release.draft !== false || release.prerelease !== false ||
      !/^v[0-9]+\.[0-9]+\.[0-9]+$/.test(release.tag_name) ||
      release.html_url !== origin + '/releases/tag/' + release.tag_name ||
      !Number.isFinite(Date.parse(release.published_at)) || !Array.isArray(release.assets)) {
    throw new Error('Expected the published stable release from the configured repository.');
  }
  const version = release.tag_name.slice(1);
  const expected = ['hybro-setup-win32-x64.exe', 'hybro-' + version + '-win32-x64.tgz'];
  const sums = parseChecksums(checksums);
  if (sums.size !== expected.length || [...sums.keys()].some(name => !expected.includes(name))) {
    throw new Error('Checksum file must describe exactly the two release binaries.');
  }
  const names = release.assets.map(asset => asset.name);
  if (new Set(names).size !== names.length) throw new Error('Duplicate release asset.');
  const assets = expected.map(name => {
    const asset = release.assets.find(item => item.name === name);
    const sha256 = sums.get(name);
    const url = origin + '/releases/download/' + release.tag_name + '/' + name;
    if (!asset || asset.state !== 'uploaded' || asset.browser_download_url !== url ||
        !Number.isSafeInteger(asset.size) || asset.size < 1 || asset.size > 5_368_709_120 ||
        asset.digest !== 'sha256:' + sha256) throw new Error('Missing asset or GitHub/checksum digest mismatch: ' + name);
    return { name, size: asset.size, sha256, url };
  });
  return { schemaVersion: 1, status: 'PUBLISHED', latest: {
    version, tag: release.tag_name, releaseUrl: release.html_url,
    publishedAt: release.published_at, assets
  } };
}

export function renderLatest(record) {
  if (record.latest === null) return 'No published stable release or release checksums yet.';
  const latest = record.latest;
  return [
    '**Published stable version: [' + latest.tag + '](' + latest.releaseUrl + ')**',
    '',
    'These checksums belong to this exact version; the Latest link may advance.',
    '',
    '| Asset | Bytes | SHA-256 |',
    '| --- | ---: | --- |',
    ...latest.assets.map(asset => '| [' + asset.name + '](' + asset.url + ') | ' + asset.size + ' | `' + asset.sha256 + '` |')
  ].join('\n');
}

export function updateReadme(readme, record) {
  const start = '<!-- latest:start -->', end = '<!-- latest:end -->';
  if (readme.split(start).length !== 2 || readme.split(end).length !== 2 || readme.indexOf(start) >= readme.indexOf(end)) {
    throw new Error('README must contain exactly one ordered latest block.');
  }
  return readme.slice(0, readme.indexOf(start) + start.length) + '\n' + renderLatest(record) + '\n' +
    readme.slice(readme.indexOf(end));
}

async function fetchText(url, allowNotFound = false) {
  const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'Moes-Harbor-release-metadata' },
    signal: AbortSignal.timeout(60_000) });
  const final = new URL(response.url);
  if (final.protocol !== 'https:' || !['api.github.com', 'github.com', 'release-assets.githubusercontent.com', 'objects.githubusercontent.com'].includes(final.hostname)) {
    throw new Error('Unexpected release download destination.');
  }
  if (allowNotFound && response.status === 404) return null;
  if (!response.ok || Number(response.headers.get('content-length') ?? 0) > maxBytes) throw new Error('Release metadata unavailable or too large: ' + response.status);
  const chunks = []; let size = 0;
  for await (const chunk of response.body) {
    size += chunk.length;
    if (size > maxBytes) throw new Error('Release metadata exceeds limit.');
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

async function main() {
  const directory = fileURLToPath(new URL('../', import.meta.url));
  const json = await fetchText('https://api.github.com/repos/' + repository + '/releases/latest', true);
  if (json === null) {
    console.log('No published stable release. Existing README and latest.json were left unchanged.');
    return;
  }
  const release = JSON.parse(json);
  if (!/^v[0-9]+\.[0-9]+\.[0-9]+$/.test(release.tag_name) || !Array.isArray(release.assets)) throw new Error('Invalid release response.');
  const checksumUrl = origin + '/releases/download/' + release.tag_name + '/SHA256SUMS.txt';
  const checksumAssets = release.assets.filter(asset => asset.name === 'SHA256SUMS.txt');
  if (checksumAssets.length !== 1 || checksumAssets[0].browser_download_url !== checksumUrl ||
      checksumAssets[0].state !== 'uploaded' || checksumAssets[0].size < 1 || checksumAssets[0].size > maxBytes) {
    throw new Error('Published checksum asset missing or invalid.');
  }
  const record = releaseRecord(release, await fetchText(checksumUrl));
  const readmePath = path.join(directory, 'README.md');
  const readme = updateReadme(await fs.readFile(readmePath, 'utf8'), record);
  // All network, digest and template validation completes before either write.
  // Review both files together in the publication PR; this command never publishes.
  await fs.writeFile(path.join(directory, 'latest.json'), JSON.stringify(record, null, 2) + '\n');
  await fs.writeFile(readmePath, readme);
  console.log('Updated display metadata for ' + record.latest.tag + '. TUF remains the release authority.');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
