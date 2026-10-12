import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === "production" ? { output: "export" as const } : {}),
  distDir: "./dist",
  // Styles go into each page as <style> instead of separate CSS files. Without
  // this, a <Link> in the header that enters the viewport prefetched the
  // linked route together with its stylesheet, and Chrome warned on every
  // page that the preloaded CSS (the blog's, the client carousel's) went
  // unused. Measured with mobile Lighthouse on 12 Oct 2026: first paint a
  // little faster, LCP unchanged, about 15 KB more gzipped HTML per page.
  experimental: { inlineCss: true },
  trailingSlash: true,
  // Custom image loader for static export
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
};

export default withNextIntl(nextConfig);
