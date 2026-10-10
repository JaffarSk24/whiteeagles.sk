// Refreshes src/data/app-releases.json from GitHub before every build, so the
// download buttons on /apps/ point at the newest release of each app without
// anyone editing the site. The file is committed: when GitHub is unreachable
// or rate-limits the build runner, the previous data stays and the build goes
// on, which beats a page with no buttons.
//
// Only the assets a visitor can install are kept. Checksum files, blockmaps
// and the zip archives the in-app updater uses stay out of the page.
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'src', 'data', 'app-releases.json');
const APPS = ['WE-Budget', 'WE-Time-Tracker'];

// Which asset serves which platform. The names are set by electron-builder
// in each app's package.json (artifactName), so they are stable.
const PLATFORMS = [
  { key: 'macArm', test: (n) => /-mac-(arm64|universal)\.dmg$/.test(n) },
  { key: 'macIntel', test: (n) => /-mac-(x64|universal)\.dmg$/.test(n) },
  { key: 'windows', test: (n) => /-win-x64\.exe$/.test(n) },
];

const fetchJson = async (url) => {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'whiteeagles.sk build',
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`${url} answered ${res.status}`);
  return res.json();
};

(async () => {
  const previous = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
  const next = { ...previous };
  let changed = 0;
  for (const repo of APPS) {
    try {
      const rel = await fetchJson(`https://api.github.com/repos/JaffarSk24/${repo}/releases/latest`);
      const assets = {};
      for (const p of PLATFORMS) {
        const a = rel.assets.find((x) => p.test(x.name));
        if (a) assets[p.key] = { name: a.name, url: a.browser_download_url, size: a.size };
      }
      if (!assets.windows || !assets.macArm) throw new Error(`release ${rel.tag_name} lacks a Windows or Mac build`);
      const entry = {
        version: rel.tag_name.replace(/^v/, ''),
        publishedAt: rel.published_at.slice(0, 10),
        page: rel.html_url,
        assets,
      };
      if (JSON.stringify(entry) !== JSON.stringify(previous[repo])) changed++;
      next[repo] = entry;
      console.log(`[app-releases] ${repo} ${entry.version} (${entry.publishedAt})`);
    } catch (e) {
      console.warn(`[app-releases] ${repo}: ${e.message}; keeping the committed data`);
    }
  }
  if (changed) fs.writeFileSync(OUT, JSON.stringify(next, null, 2) + '\n');
  console.log(`[app-releases] ${changed ? changed + ' app(s) updated' : 'no change'}`);
})();
