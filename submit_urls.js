const fs = require('fs');
const path = require('path');

const HOST = 'whiteeagles.sk';

// generate_sitemap.js writes public/sitemap.xml on prebuild and the build
// copies it into dist/ afterwards. Reading the source keeps the list correct
// even when a submission script runs without a build.
const SITEMAP_PATH = path.join(__dirname, 'public', 'sitemap.xml');

// The summaries written for AI assistants. They are deliberately absent from
// the sitemap: a sitemap lists pages you want in the search index, and these
// are plain-text restatements of the site's own content - indexing them would
// put thin duplicates in front of the pages they describe. Google agrees on
// its own, and reports /llms.txt as "crawled - currently not indexed".
//
// They do change, though, and a ping is precisely the signal for "this URL
// changed". Without this list they would only ever be submitted by hand, so
// every rewrite would go unannounced.
const AI_FILES = [
  'llms.txt',
  'llms-full.txt',
  'llms-sk.txt',
  'llms-full-sk.txt',
  'llms-ru.txt',
  'llms-full-ru.txt',
];

// robots.txt is deliberately not here. Search engines refetch it on their own
// schedule - over the logged period it was taken 1,234 times without anyone
// asking - and Seznam's reindex API rejects it with 422 because it reindexes
// documents, not directives.

function sitemapUrls() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.warn(`⚠️  Sitemap not found at ${SITEMAP_PATH}, submitting the root URL only.`);
    return [];
  }
  const content = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  return [...content.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

// The sitemap file itself is not a page and has no place in the list.
function collectUrls({ includeAiFiles = true } = {}) {
  const urls = [`https://${HOST}/`, ...sitemapUrls()];
  if (includeAiFiles) urls.push(...AI_FILES.map((f) => `https://${HOST}/${f}`));
  return [...new Set(urls)];
}

module.exports = { HOST, AI_FILES, SITEMAP_PATH, collectUrls };
