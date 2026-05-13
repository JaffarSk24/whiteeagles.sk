interface GAEventParams {
  [key: string]: any;
}

export const trackGAEvent = (eventName: string, params?: GAEventParams) => {
  if (typeof window !== 'undefined') {
    // Push directly to dataLayer for Google Tag Manager compatibility
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: eventName, ...params });
    
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[GA4 Dev] Event tracked via dataLayer: ${eventName}`, params);
    }
  }
};
