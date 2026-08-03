const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Service account antigravity-reader@white-eagles-and-co.iam.gserviceaccount.com,
// added to Search Console with full permissions. Override with GOOGLE_KEY_FILE.
const KEY_FILE = process.env.GOOGLE_KEY_FILE
  || '/Users/kirill 1/Desktop/White Eagles & Co./GA4/white-eagles-and-co-091a74c854c1.json';
const SITEMAP_URL = 'https://whiteeagles.sk/sitemap.xml';
// The property is a Domain property, so the API expects the sc-domain: form.
const SITE_URL = 'sc-domain:whiteeagles.sk';

async function main() {
  if (!fs.existsSync(KEY_FILE)) {
    console.error(`Key file not found: ${KEY_FILE}`);
    return;
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: [
      'https://www.googleapis.com/auth/indexing',
      'https://www.googleapis.com/auth/webmasters'
    ],
  });

  const authClient = await auth.getClient();
  
  // 1. Submit Sitemap via Search Console API
  const searchconsole = google.webmasters({ version: 'v3', auth: authClient });
  try {
    console.log(`Submitting sitemap: ${SITEMAP_URL}...`);
    await searchconsole.sitemaps.submit({
      siteUrl: SITE_URL,
      feedpath: SITEMAP_URL,
    });
    console.log('✅ Sitemap submitted successfully!');
  } catch (error) {
    console.error('❌ Error submitting sitemap. (Ensure the service account is an Owner in GSC)', error.message);
  }

  // 2. Extract URLs from local sitemap
  const sitemapPath = path.join(__dirname, 'dist', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error(`Local sitemap not found at ${sitemapPath}`);
    return;
  }
  
  const content = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = [...content.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  
  console.log(`Found ${urls.length} URLs in sitemap to submit for indexing.`);

  // Google's Indexing API is deliberately not called here. It officially
  // supports only JobPosting and BroadcastEvent pages; for ordinary pages it
  // answers "Permission denied. Failed to verify the URL ownership" even for a
  // verified owner, and when it does accept a URL it is ignored anyway.
  // Discovery for this site happens through the sitemap above and IndexNow below.

  // 4. Submit to IndexNow (Bing, Seznam, Yandex, etc.)
  try {
    await submitToIndexNow(urls);
  } catch (error) {
    console.error('❌ Error during IndexNow submission:', error.message);
  }
}

function submitToIndexNow(urls) {
  const https = require('https');
  return new Promise((resolve) => {
    const data = JSON.stringify({
      host: 'whiteeagles.sk',
      key: '4c042a1bf13f43d1a14dc6a5cc920873',
      keyLocation: 'https://whiteeagles.sk/4c042a1bf13f43d1a14dc6a5cc920873.txt',
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

    console.log('Submitting URLs to IndexNow (Bing/Seznam/Yandex)...');

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log('✅ IndexNow submission successful!');
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
