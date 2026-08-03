const fs = require('fs');

const baseUrl = 'https://whiteeagles.sk';
const locales = ['sk', 'en', 'ru'];
const defaultLocale = 'sk';

const posts = [
  'otkryt-sro-v-slovakii',
  'zivnost-alebo-sro',
  'website-cost-2026',
  'wordpress-vs-custom-website',
  'nastavenie-google-analytics-4',
  'cookie-lista-2026-povinnosti',
  'google-ads-small-business',
  'seo-audit-check-website'
];
const services = [
  'webdev',
  'bugfix',
  'ads',
  'analytics',
  'cookies',
  'telegram'
];

// Paths relative to the locale root, without leading or trailing slashes.
// The site is built with `trailingSlash: true`, so every generated <loc> must
// end with a slash to match the canonical URL exactly - otherwise each sitemap
// entry costs Google an extra 301 hop.
const paths = [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  // The free audit is the entry offer and the target of a whole cluster of
  // Slovak queries, so it ranks above the individual service pages.
  { path: 'seo-audit', changefreq: 'monthly', priority: '0.9' },
  { path: 'blog', changefreq: 'weekly', priority: '0.8' },
  ...services.map((s) => ({ path: `service/${s}`, changefreq: 'monthly', priority: '0.8' })),
  ...posts.map((p) => ({ path: `blog/${p}`, changefreq: 'monthly', priority: '0.7' }))
];

const lastmod = new Date().toISOString().split('T')[0];

const urlFor = (locale, path) =>
  path === '' ? `${baseUrl}/${locale}/` : `${baseUrl}/${locale}/${path}/`;

// The English blog is served with noindex - it drew 41% of the domain's
// impressions and no clicks, from countries the business does not serve. A
// noindexed URL has no place in a sitemap, and no place in anyone's hreflang.
const isBlog = (path) => path === 'blog' || path.startsWith('blog/');
const isIndexed = (locale, path) => !(locale === 'en' && isBlog(path));

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

let count = 0;
locales.forEach((locale) => {
  paths.forEach(({ path, changefreq, priority }) => {
    if (!isIndexed(locale, path)) return;
    count++;
    xml += `  <url>\n`;
    xml += `    <loc>${urlFor(locale, path)}</loc>\n`;
    // Declare every indexed language version of this page plus x-default, so
    // Google serves the right locale instead of picking one and dropping the
    // others.
    locales
      .filter((alt) => isIndexed(alt, path))
      .forEach((alt) => {
        xml += `    <xhtml:link rel="alternate" hreflang="${alt}" href="${urlFor(alt, path)}"/>\n`;
      });
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(defaultLocale, path)}"/>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  });
});

xml += `</urlset>\n`;

fs.writeFileSync('public/sitemap.xml', xml);
console.log(`Generated sitemap.xml with ${count} URLs (English blog excluded: noindex).`);
