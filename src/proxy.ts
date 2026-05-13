import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// next-intl proxy (renamed from middleware in Next.js 16)
// Handles locale detection and redirects in dev mode
// In production static export this file is ignored
function proxy(request: Request) {
  return createMiddleware(routing)(request as any);
}

export default proxy;

export const config = {
  // Match all pathnames except internals and static files
  matcher: [
    // Match root
    "/",
    // Match all pathnames with a locale prefix
    "/(sk|en|ru)/:path*",
    // Match all pathnames without a locale prefix (but not _next, api, public assets)
    "/((?!_next|api|.*\\..*).+)",
  ],
};
