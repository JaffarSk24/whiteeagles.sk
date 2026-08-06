const fs = require('fs');

const baseUrl = 'https://whiteeagles.sk';
const locales = ['sk', 'en', 'ru'];
const defaultLocale = 'sk';

// Read the articles that actually exist per locale instead of keeping a hand
// written list that drifts. A slug present for one language but not another
// then simply does not appear in that language's sitemap.
const path = require('path');
const contentDir = path.join(__dirname, 'src', 'content', 'blog');
const casesDir = path.join(__dirname, 'src', 'content', 'cases');

const slugsIn = (dir) => {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .sort();
};

const postsFor = (locale) => slugsIn(path.join(contentDir, locale));

// Article front matter may carry `key:` - a stable id shared by every language
// version. It is what allows each language its own slug: without it two
// versions can only be paired when the file names match.
const matter = require('gray-matter');
const keyOf = (dir, locale, slug) => {
  const file = path.join(dir, locale, `${slug}.md`);
  if (!fs.existsSync(file)) return slug;
  const { data } = matter(fs.readFileSync(file, 'utf8'));
  return typeof data.key === 'string' && data.key ? data.key : slug;
};
const slugForKey = (dir, locale, key) =>
  slugsIn(path.join(dir, locale)).find((s) => keyOf(dir, locale, s) === key) || null;
const casesFor = (locale) => slugsIn(path.join(casesDir, locale));
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
const pathsFor = (locale) => [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  // The free audit is the entry offer and the target of a whole cluster of
  // Slovak queries, so it ranks above the individual service pages.
  { path: 'seo-audit', changefreq: 'monthly', priority: '0.9' },
  { path: 'blog', changefreq: 'weekly', priority: '0.8' },
  { path: 'portfolio', changefreq: 'monthly', priority: '0.8' },
  ...services.map((s) => ({ path: `service/${s}`, changefreq: 'monthly', priority: '0.8' })),
  ...casesFor(locale).map((c) => ({ path: `case/${c}`, changefreq: 'yearly', priority: '0.7' })),
  ...postsFor(locale).map((p) => ({ path: `blog/${p}`, changefreq: 'monthly', priority: '0.7' }))
];

const lastmod = new Date().toISOString().split('T')[0];

const urlFor = (locale, path) =>
  path === '' ? `${baseUrl}/${locale}/` : `${baseUrl}/${locale}/${path}/`;

// The English blog is served with noindex - it drew 41% of the domain's
// impressions and no clicks, from countries the business does not serve. A
// noindexed URL has no place in a sitemap, and no place in anyone's hreflang.
const isBlog = (path) => path === 'blog' || path.startsWith('blog/');
// Case studies exist in Slovak and Russian only, so the English portfolio page
// is a bare link list and carries noindex - same treatment as the English blog.
const isCase = (path) => path === 'portfolio' || path.startsWith('case/');
const isIndexed = (locale, path) => !(locale === 'en' && (isBlog(path) || isCase(path)));

// An article translated into only some languages must not be declared as an
// alternate for the ones where it does not exist.
const existsIn = (locale, p) => {
  if (p.startsWith('blog/')) return altPath(locale, p) !== null;
  if (p.startsWith('case/')) return casesFor(locale).includes(p.slice('case/'.length));
  return true;
};

// The same page in another language - which may live at a different slug.
const altPath = (locale, p) => {
  if (!p.startsWith('blog/')) return p;
  const slug = p.slice('blog/'.length);
  const key = keyOf(contentDir, defaultLocale, slug) === slug
    ? keyOf(contentDir, 'ru', slug) === slug
      ? keyOf(contentDir, 'en', slug)
      : keyOf(contentDir, 'ru', slug)
    : keyOf(contentDir, defaultLocale, slug);
  const alt = slugForKey(contentDir, locale, key);
  return alt ? `blog/${alt}` : null;
};

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

let count = 0;
locales.forEach((locale) => {
  pathsFor(locale).forEach(({ path, changefreq, priority }) => {
    if (!isIndexed(locale, path)) return;
    count++;
    xml += `  <url>\n`;
    xml += `    <loc>${urlFor(locale, path)}</loc>\n`;
    // Declare every indexed language version of this page plus x-default, so
    // Google serves the right locale instead of picking one and dropping the
    // others.
    locales
      .filter((alt) => isIndexed(alt, path) && existsIn(alt, path))
      .forEach((alt) => {
        xml += `    <xhtml:link rel="alternate" hreflang="${alt}" href="${urlFor(alt, altPath(alt, path))}"/>\n`;
      });
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(defaultLocale, altPath(defaultLocale, path) || path)}"/>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  });
});

xml += `</urlset>\n`;

fs.writeFileSync('public/sitemap.xml', xml);
console.log(`Generated sitemap.xml with ${count} URLs (English blog and cases excluded: noindex).`);
