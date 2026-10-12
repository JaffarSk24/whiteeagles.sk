import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// The raw next-intl helpers. Import from ./navigation instead: it re-exports
// these with Link swapped for the intent-prefetching version.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
