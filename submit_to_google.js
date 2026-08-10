const { google } = require('googleapis');
const fs = require('fs');

// Service account antigravity-reader@white-eagles-and-co.iam.gserviceaccount.com,
// added to Search Console with full permissions. Override with GOOGLE_KEY_FILE
// - which is how CI passes it, writing the secret to a temporary file.
const KEY_FILE = process.env.GOOGLE_KEY_FILE
  || '/Users/kirill 1/Desktop/White Eagles & Co./GA4/white-eagles-and-co-091a74c854c1.json';
const SITEMAP_URL = 'https://whiteeagles.sk/sitemap.xml';
// The property is a Domain property, so the API expects the sc-domain: form.
const SITE_URL = 'sc-domain:whiteeagles.sk';

// This script talks to Google and nothing else. It used to carry its own copy
// of the IndexNow call, with the key written out a second time - two places to
// change and one of them certain to be forgotten. IndexNow lives in
// submit_to_indexnow.js, which owns the key.
//
// Google's Indexing API is deliberately not called at all: it officially
// supports only JobPosting and BroadcastEvent pages, and for an ordinary page
// it answers "Permission denied. Failed to verify the URL ownership" even to a
// verified owner. There is no API that asks Google to index a normal page -
// the sitemap is the whole mechanism.
async function main() {
  if (!fs.existsSync(KEY_FILE)) {
    console.error(`❌ Key file not found: ${KEY_FILE}`);
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });

  const searchconsole = google.webmasters({ version: 'v3', auth: await auth.getClient() });

  try {
    console.log(`Submitting sitemap: ${SITEMAP_URL}...`);
    await searchconsole.sitemaps.submit({ siteUrl: SITE_URL, feedpath: SITEMAP_URL });
    console.log('✅ Sitemap submitted successfully!');
  } catch (error) {
    console.error('❌ Error submitting sitemap. (Ensure the service account is an Owner in GSC)', error.message);
    process.exit(1);
  }

  // Read the entry back, so the log says whether Google actually fetched the
  // file and what it made of it. "Submitted" on its own proves only that the
  // request was accepted.
  try {
    const { data } = await searchconsole.sitemaps.get({ siteUrl: SITE_URL, feedpath: SITEMAP_URL });
    const web = (data.contents || []).find((c) => c.type === 'web') || {};
    console.log(`   last downloaded: ${data.lastDownloaded || 'not yet'}`);
    console.log(`   URLs submitted:  ${web.submitted || '?'}`);
    console.log(`   warnings/errors: ${data.warnings || 0} / ${data.errors || 0}`);
  } catch (error) {
    console.warn('⚠️  Could not read the sitemap status back:', error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
