const fs = require('fs');

const baseUrl = 'https://whiteeagles.sk';
const locales = ['sk', 'en', 'ru'];
const posts = [
  'website-cost-2026',
  'wordpress-vs-custom-website',
  'nastavenie-google-analytics-4',
  'cookie-lista-2026-povinnosti'
];
const services = [
  'webdev',
  'bugfix',
  'ads',
  'analytics',
  'cookies',
  'telegram'
];
const pages = [
  '',
  'blog'
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

locales.forEach(locale => {
  // Static pages
  pages.forEach(page => {
    const url = page === '' ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}/${page}`;
    const priority = page === '' ? '1.0' : '0.8';
    xml += `  <url>\n    <loc>${url}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
  });

  // Services
  services.forEach(service => {
    xml += `  <url>\n    <loc>${baseUrl}/${locale}/service/${service}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  // Blog posts
  posts.forEach(post => {
    xml += `  <url>\n    <loc>${baseUrl}/${locale}/blog/${post}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });
});

xml += `</urlset>`;

fs.writeFileSync('public/sitemap.xml', xml);
console.log('✅ Generated sitemap.xml with ' + ((pages.length + services.length + posts.length) * locales.length) + ' URLs.');
