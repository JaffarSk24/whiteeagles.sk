interface GAEventParams {
  [key: string]: any;
}

/**
 * Sends an event to GA4 and to the Tag Manager dataLayer.
 *
 * The dataLayer push alone is not enough: it only reaches GA4 if the GTM
 * container has a matching GA4 Event tag, and container GTM-KK389G5B has
 * none - it only holds Conversion Linker, the cookie banner and Consent Mode.
 * Every event pushed here was therefore silently dropped before ever reaching
 * the property.
 *
 * gtag.js is loaded directly in the locale layout, so calling gtag() sends the
 * event straight to G-31E4MKB8QX. The dataLayer push is kept so triggers can
 * still be built in GTM later without touching this file again.
 */
export const trackGAEvent = (eventName: string, params?: GAEventParams) => {
  if (typeof window === 'undefined') return;

  const w = window as any;

  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: eventName, ...params });

  if (typeof w.gtag === 'function') {
    w.gtag('event', eventName, params || {});
  }

  if (process.env.NODE_ENV === 'development') {
    console.debug(`[GA4] ${eventName}`, params, `gtag: ${typeof w.gtag === 'function'}`);
  }
};
