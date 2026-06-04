const fs = require('fs');
const path = require('path');
const https = require('https');

const HOST = 'whiteeagles.sk';
const KEY = '4c042a1bf13f43d1a14dc6a5cc920873';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = path.join(__dirname, 'dist', 'sitemap.xml');

async function main() {
  const urls = [
    `https://${HOST}/`,
    `https://${HOST}/sitemap.xml`
  ];

  if (fs.existsSync(SITEMAP_PATH)) {
    const content = fs.readFileSync(SITEMAP_PATH, 'utf-8');
    const matches = [...content.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    urls.push(...matches);
  }

  // Remove duplicates just in case
  const uniqueUrls = [...new Set(urls)];

  console.log(`Submitting ${uniqueUrls.length} URLs to IndexNow for ${HOST}...\n`);

  try {
    await submitToIndexNow(uniqueUrls);
  } catch (error) {
    console.error('❌ Error during IndexNow submission:', error.message);
  }
}

function submitToIndexNow(urls) {
  return new Promise((resolve) => {
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
        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log('✅ IndexNow submission successful!');
          console.log(`Response code: ${res.statusCode} (${res.statusCode === 200 ? 'OK' : 'Accepted'})`);
        } else {
          console.error(`❌ IndexNow submission failed with status code: ${res.statusCode}`);
          console.error(`Response body: ${body}`);
        }
        resolve();
      });
    });

    req.on('error', (error) => {
      console.error('❌ IndexNow request error:', error.message);
      resolve();
    });

    req.write(data);
    req.end();
  });
}

main().catch(console.error);
