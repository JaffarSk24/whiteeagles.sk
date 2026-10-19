// Works out which pages this deploy actually changes, so the submission
// scripts announce those and nothing else.
//
// Until October 2026 every deploy sent the whole site (about 125 URLs) to
// Bing, IndexNow and Seznam. Bing's daily quota is 100 URLs, so the first
// deploy of the day used all of it on pages that had not changed, and the page
// that had changed was often cut off or arrived on a day with nothing left.
//
// Runs after the build and before rsync: each built page is compared with what
// the live site serves right now. A page that is new (404 live), different or
// unreachable counts as changed. The result goes to changed-urls.json in the
// workspace, never into dist/.
//
// The comparison ignores what changes on every build without the page
// changing: Next.js script tags and chunk links (they carry build hashes),
// class attributes and inline styles. Text, title, meta tags, links, images
// and JSON-LD all count.

const fs = require('fs');
const path = require('path');
const https = require('https');
const { HOST, collectUrls } = require('./submit_urls');

const DIST = path.join(__dirname, 'dist');
const OUT = path.join(__dirname, 'changed-urls.json');
const CONCURRENCY = 8;

function distPath(url) {
  const p = new URL(url).pathname;
  if (/\.[a-z0-9]+$/i.test(p)) return path.join(DIST, p);
  return path.join(DIST, p, 'index.html');
}

function normalize(text, isHtml) {
  if (!isHtml) return text.replace(/\s+/g, ' ').trim();
  return text
    .replace(/<script\b(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*\/_next\/[^>]*>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/\s(class|style)="[^"]*"/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function fetchLive(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'whiteeagles-deploy-diff' }, timeout: 15000 }, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', (e) => resolve({ status: 0, body: '', error: e.message }));
  });
}

async function check(url) {
  const file = distPath(url);
  if (!fs.existsSync(file)) return { url, changed: false, why: 'not in build' };
  const isHtml = file.endsWith('.html');
  const built = normalize(fs.readFileSync(file, 'utf8'), isHtml);
  const live = await fetchLive(url);
  if (live.status === 404) return { url, changed: true, why: 'new' };
  // The root answers 301 to /sk/ in nginx; there is no page there to announce.
  if (live.status >= 300 && live.status < 400) return { url, changed: false, why: 'redirect' };
  if (live.status !== 200) return { url, changed: true, why: `live ${live.status || live.error}` };
  return normalize(live.body, isHtml) === built ? { url, changed: false } : { url, changed: true, why: 'changed' };
}

async function main() {
  const urls = collectUrls();
  const results = [];
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    results.push(...(await Promise.all(urls.slice(i, i + CONCURRENCY).map(check))));
  }
  const changed = results.filter((r) => r.changed);
  fs.writeFileSync(OUT, JSON.stringify(changed.map((r) => r.url), null, 2));
  console.log(`🔎 ${changed.length} of ${urls.length} URLs on ${HOST} change with this deploy.`);
  for (const r of changed) console.log(`  ${r.why}: ${r.url}`);
}

main().catch((e) => {
  // No file means the submission scripts fall back to the full list, so a
  // failure here costs quota, not announcements.
  console.error('❌ Could not work out the changed URLs:', e.message);
  process.exit(1);
});
