import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // All supported locales
  locales: ["sk", "en", "ru"],
  // Default locale (Slovak for Hetzner/SEO)
  defaultLocale: "sk",
  // Locale prefix: 'always' is REQUIRED for Next.js Static Export without middleware
  localePrefix: "always",
});
