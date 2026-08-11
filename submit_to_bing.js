const https = require('https');

const HOST = 'whiteeagles.sk';
const SITE_URL = `https://${HOST}`;

// Bing Webmaster API key (Settings -> API access -> Generate).
//
// It comes from the environment, never from this file: the repository is
// public, so a key written here is a key handed to everyone who opens it. In
// CI it arrives as the BING_API_KEY secret; to run the script by hand, put it
// in front of the command:
//
//   BING_API_KEY=... node submit_to_bing.js
//
// Note this is a real credential, unlike the IndexNow key in
// submit_to_indexnow.js - that one is published as a file on the site on
// purpose, and hard-coding it is correct.
const BING_API_KEY = process.env.BING_API_KEY;

const { collectUrls } = require('./submit_urls');

async function main() {
  if (!BING_API_KEY) {
    console.error('❌ BING_API_KEY is not set - nothing submitted.');
    console.error('   CI: add it under Settings -> Secrets and variables -> Actions.');
    process.exit(1);
  }

  console.log('📊 Checking Bing URL submission quota...\n');
  let daily = null;
  try {
    const quota = await getQuota();
    daily = Number(quota.DailyQuota);
    console.log(`  Daily quota remaining: ${quota.DailyQuota}`);
    console.log(`  Monthly quota remaining: ${quota.MonthlyQuota}\n`);
  } catch (error) {
    console.error('⚠️  Could not check quota:', error.message);
  }

  // Sitemap pages plus the llms files - see submit_urls.js.
  let uniqueUrls = collectUrls();

  // The daily quota is 100 URLs and the sitemap holds 86, so a second deploy on
  // the same day would otherwise fail on quota rather than on anything real.
  // Trim to what is left and say exactly what was dropped - a silent cut reads
  // as "everything was submitted".
  if (Number.isFinite(daily) && daily < uniqueUrls.length) {
    const dropped = uniqueUrls.length - daily;
    if (daily <= 0) {
      console.warn('⚠️  Daily quota is exhausted - nothing submitted this run.');
      return;
    }
    // The sitemap is written locale by locale, Slovak first, so the head of the
    // list is the language that matters most here.
    console.warn(`⚠️  Quota allows ${daily} of ${uniqueUrls.length} URLs; dropping the last ${dropped}.`);
    uniqueUrls = uniqueUrls.slice(0, daily);
  }

  console.log(`📤 Submitting ${uniqueUrls.length} URLs to Bing Webmaster API (SubmitUrlBatch)...\n`);

  try {
    await submitUrlBatch(uniqueUrls);
  } catch (error) {
    console.error('❌ Error during Bing submission:', error.message);
    process.exit(1);
  }
}

function getQuota() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'ssl.bing.com',
      port: 443,
      path: `/webmaster/api.svc/json/GetUrlSubmissionQuota?apikey=${BING_API_KEY}&siteUrl=${encodeURIComponent(SITE_URL)}`,
      method: 'GET'
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const parsed = JSON.parse(body);
            resolve(parsed.d || parsed);
          } catch {
            reject(new Error(`Invalid JSON response: ${body}`));
          }
        } else {
          // The key is in the query string, so it would end up in the log.
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

function submitUrlBatch(urls) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ siteUrl: SITE_URL, urlList: urls });

    const options = {
      hostname: 'ssl.bing.com',
      port: 443,
      path: `/webmaster/api.svc/json/SubmitUrlbatch?apikey=${BING_API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    console.log('🔄 Sending SubmitUrlBatch to Bing Webmaster API...');

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        console.log(`Response code: ${res.statusCode}`);
        if (body) console.log(`Response body: ${body}`);

        if (res.statusCode === 200) {
          console.log('✅ Bing SubmitUrlBatch successful!');
          resolve();
        } else {
          reject(new Error(`Bing returned ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.end(data);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
