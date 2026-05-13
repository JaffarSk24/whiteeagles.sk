const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const KEY_FILE = '/Users/kirill 1/Downloads/lofty-digit-484218-m9-a07bb910f4d8.json';
const SITEMAP_URL = 'https://whiteeagles.sk/sitemap.xml';
const SITE_URL = 'https://whiteeagles.sk/';

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

  // 3. Submit URLs to Indexing API
  const indexing = google.indexing({ version: 'v3', auth: authClient });
  let successCount = 0;
  
  for (const url of urls) {
    try {
      await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED'
        }
      });
      successCount++;
    } catch (error) {
      if (error.message.includes('403')) {
        console.error(`❌ Permission denied for Indexing API on ${url}. Is the service account verified as an Owner?`);
        break; // Stop trying if we have a permission error
      } else {
        console.error(`❌ Failed to submit ${url}: ${error.message}`);
      }
    }
  }
  
  console.log(`✅ Indexing API submission complete. Submitted ${successCount} out of ${urls.length} URLs.`);
}

main().catch(console.error);
