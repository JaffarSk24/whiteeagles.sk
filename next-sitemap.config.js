/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://whiteeagles.sk",
  generateRobotsTxt: true,
  outDir: "./dist",
  // Static export puts files in /dist
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  alternateRefs: [
    {
      href: "https://whiteeagles.sk",
      hreflang: "sk",
    },
    {
      href: "https://whiteeagles.sk/en",
      hreflang: "en",
    },
    {
      href: "https://whiteeagles.sk/ru",
      hreflang: "ru",
    },
  ],
  // Exclude localized duplicates from sitemap (keep canonical SK only)
  exclude: ["/en/*", "/ru/*", "/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
  },
};

module.exports = config;
