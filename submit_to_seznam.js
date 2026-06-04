const fs = require('fs');
const path = require('path');
const https = require('https');

const KEY = '9631c2e7ad2c0af432d401329816cbd9e80689d5';
const SITEMAP_PATH = path.join(__dirname, 'dist', 'sitemap.xml');

async function main() {
  const urls = [
    'https://whiteeagles.sk/',
    'https://whiteeagles.sk/sitemap.xml'
  ];

  if (fs.existsSync(SITEMAP_PATH)) {
    const content = fs.readFileSync(SITEMAP_PATH, 'utf-8');
    const matches = [...content.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    urls.push(...matches);
  }

  // Remove duplicates just in case
  const uniqueUrls = [...new Set(urls)];

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
