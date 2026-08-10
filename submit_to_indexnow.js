const fs = require('fs');
const path = require('path');
const https = require('https');

const HOST = 'whiteeagles.sk';
// Not a secret: IndexNow works by publishing this very value as a file on the
// site, which is what proves ownership. Changing it means publishing the new
// file first - a key whose .txt answers 404 makes every submission fail.
const KEY = '4c042a1bf13f43d1a14dc6a5cc920873';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
// generate_sitemap.js writes public/sitemap.xml on prebuild, and the build
// copies it into dist/ afterwards. Reading the source keeps the list correct
// even when this runs without a build.
const SITEMAP_PATH = path.join(__dirname, 'public', 'sitemap.xml');

async function main() {
  // The sitemap itself is not a page and has no place in the list.
  const urls = [`https://${HOST}/`];

  if (fs.existsSync(SITEMAP_PATH)) {
    const content = fs.readFileSync(SITEMAP_PATH, 'utf-8');
    const matches = [...content.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    urls.push(...matches);
  } else {
    console.warn(`⚠️  Sitemap not found at ${SITEMAP_PATH}, submitting root URL only.`);
  }

  // Remove duplicates just in case
  const uniqueUrls = [...new Set(urls)];

  console.log(`Submitting ${uniqueUrls.length} URLs to IndexNow for ${HOST}...\n`);

  // A failed submission used to resolve quietly, so a broken key looked exactly
  // like a successful run. Exit non-zero instead and let the caller see it.
  try {
    await submitToIndexNow(uniqueUrls);
  } catch (error) {
    console.error('❌ Error during IndexNow submission:', error.message);
    process.exit(1);
  }
}

function submitToIndexNow(urls) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls
    });

    const options = {
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    console.log('Sending API request to IndexNow (api.indexnow.org)...');

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log(`Response code: ${res.statusCode}`);
        if (body) console.log(`Response body: ${body}`);

        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log('✅ IndexNow submission successful!');
          resolve();
        } else {
          reject(new Error(`IndexNow returned ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ IndexNow request error:', error.message);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

main().catch(console.error);
