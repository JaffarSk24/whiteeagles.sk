// Typed navigation helpers - use these instead of next/link and next/navigation
// to ensure locale is always included in URLs. Link prefetches on intent, see
// IntentLink.tsx.
export { redirect, usePathname, useRouter, getPathname } from "./baseNavigation";
export { Link } from "./IntentLink";
