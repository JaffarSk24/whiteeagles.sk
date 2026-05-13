import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Typed navigation helpers — use these instead of next/link and next/navigation
// to ensure locale is always included in URLs
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
