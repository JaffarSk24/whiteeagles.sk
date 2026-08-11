const https = require('https');

// Seznam Webmaster API key. It comes from the environment, never from this
// file: the repository is public, and a key written here is a key handed to
// everyone who opens it - it lets anyone request a recrawl of this domain.
// In CI it arrives as the SEZNAM_API_KEY secret; to run the script by hand:
//
//   SEZNAM_API_KEY=... node submit_to_seznam.js
const KEY = process.env.SEZNAM_API_KEY;
const { collectUrls } = require('./submit_urls');

async function main() {
  if (!KEY) {
    console.error('❌ SEZNAM_API_KEY is not set - nothing submitted.');
    console.error('   CI: add it under Settings -> Secrets and variables -> Actions.');
    process.exit(1);
  }

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
