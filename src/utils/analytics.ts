interface GAEventParams {
  [key: string]: any;
}

export const trackGAEvent = (eventName: string, params?: GAEventParams) => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, params);
  } else if (import.meta.env.DEV) {
    console.debug(`[GA4 Dev] Event tracked: ${eventName}`, params);
  }
};
