// Run hourly by .github/workflows/app-releases.yml. Asks GitHub for the latest
// release of each free app and checks that the live /apps/ page already links
// to it. When it does not, the workflow redeploys the site, and the build
// (fetch_app_releases.js in prebuild) bakes the new links and versions into
// the HTML and the SoftwareApplication markup.
//
// It compares against the live page, not the committed app-releases.json, so
// nothing has to be committed back to the repository, and a deploy that
// failed is simply retried an hour later.
const fs = require('fs');

const APPS = ['WE-Budget', 'WE-Time-Tracker'];
const PAGE = 'https://whiteeagles.sk/en/apps/';

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'whiteeagles.sk release check',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

const setOutput = (stale) => {
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `stale=${stale}\n`);
};

(async () => {
  const page = await fetch(PAGE, { headers: { 'User-Agent': 'whiteeagles.sk release check' } });
  if (!page.ok) {
    // The site being down is not a reason to redeploy it from here.
    console.warn(`[app-releases] ${PAGE} answered ${page.status}; skipping`);
    return setOutput(false);
  }
  const html = await page.text();

  let stale = false;
  for (const repo of APPS) {
    const res = await fetch(`https://api.github.com/repos/JaffarSk24/${repo}/releases/latest`, { headers });
    if (!res.ok) {
      console.warn(`[app-releases] ${repo}: GitHub answered ${res.status}; skipping`);
      continue;
    }
    const rel = await res.json();
    const exe = rel.assets.find((a) => /-win-x64\.exe$/.test(a.name));
    // Builds are uploaded one by one; wait until the Windows installer is
    // there, or the deploy would bake a release without it.
    if (!exe) {
      console.log(`[app-releases] ${repo} ${rel.tag_name}: builds still uploading`);
      continue;
    }
    const live = html.includes(exe.browser_download_url);
    console.log(`[app-releases] ${repo} ${rel.tag_name}: ${live ? 'on the site' : 'not on the site yet'}`);
    if (!live) stale = true;
  }
  setOutput(stale);
})().catch((e) => {
  console.warn(`[app-releases] ${e.message}`);
  setOutput(false);
});
