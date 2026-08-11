const https = require('https');

const KEY = '9631c2e7ad2c0af432d401329816cbd9e80689d5';
const { collectUrls } = require('./submit_urls');

async function main() {
  // This endpoint reindexes documents, so it takes pages and the llms files
  // but not sitemap.xml or robots.txt - both used to be in this list and both
  // came back 422.
  const uniqueUrls = collectUrls();

  console.log(`Starting reindexing for ${uniqueUrls.length} URLs in Seznam...\n`);

  for (const url of uniqueUrls) {
    await reindexUrl(url);
  }

  console.log('\nAll URLs processed!');
}

function reindexUrl(url) {
  return new Promise((resolve) => {
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = `https://reporter.seznam.cz/wm-api/web/document/reindex?key=${KEY}&url=${encodedUrl}`;

    console.log(`reindex: ${url}`);

    const req = https.request(apiUrl, { method: 'POST' }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log(`[HTTP ${res.statusCode}] Response: ${body.trim()}`);
        resolve();
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Request error for ${url}:`, error.message);
      resolve();
    });

    req.end();
  });
}

main().catch(console.error);
