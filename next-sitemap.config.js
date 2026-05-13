/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://whiteeagles.sk",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: "./dist",
  // Static export puts files in /dist
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  // Exclude server-sitemap if not used
  exclude: ["/server-sitemap.xml"],
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
