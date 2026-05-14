/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://whiteeagles.sk",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: "./dist",
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    "/server-sitemap.xml",
    "*/terms*",
    "*/privacy*",
    "*/cookies*",
    // Exclude root redirect pages (they are JS redirects, not real content)
    "/",
    "/blog",
    "/blog/*",
  ],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: "*",
        allow: ["/", "/*/service/cookies"],
        disallow: [
          "/api/",
          "/*/terms",
          "/*/privacy",
          "/*/cookies",
        ],
      },
    ],
  },
};

module.exports = config;
