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
    // Exclude root redirect pages (they are JS redirects, not real content)
    "/",
    "/blog",
    "/blog/*",
  ],
  // Use transform to filter out legal pages while keeping /service/cookies
  transform: async (config, path) => {
    // Exclude legal pages: /xx/terms, /xx/privacy, /xx/cookies (but NOT /xx/service/cookies)
    if (
      /^\/[a-z]{2}\/(terms|privacy|cookies)\/?$/.test(path)
    ) {
      return null;
    }

    // Default transform
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
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
