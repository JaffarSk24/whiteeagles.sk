"use client";

import { useState, type ComponentProps } from "react";
import { Link as BaseLink } from "./baseNavigation";

type LinkProps = ComponentProps<typeof BaseLink>;

// A link that prefetches its page when the visitor shows intent - pointer
// over it, a finger on it, keyboard focus - instead of as soon as it scrolls
// into view. The pattern is the one the Next.js docs give for hover prefetch.
//
// Viewport prefetching fetched every linked page while the current one was
// still loading, and with each page came React's preload hints for its
// images. Scrolling the blog index downloaded the cover of every article, and
// Chrome logged each unused one as a console warning. Navigation is as quick
// as before for the page the visitor actually goes to: it starts loading the
// moment the pointer reaches the link.
export function Link({ prefetch, onMouseEnter, onTouchStart, onFocus, ...props }: LinkProps) {
  const [intent, setIntent] = useState(false);

  return (
    <BaseLink
      {...props}
      prefetch={prefetch === false || !intent ? false : (prefetch ?? null)}
      onMouseEnter={(e) => {
        setIntent(true);
        onMouseEnter?.(e);
      }}
      onTouchStart={(e) => {
        setIntent(true);
        onTouchStart?.(e);
      }}
      onFocus={(e) => {
        setIntent(true);
        onFocus?.(e);
      }}
    />
  );
}
