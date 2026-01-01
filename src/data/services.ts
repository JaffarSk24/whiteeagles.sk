export interface Service {
  id: string;
  titleKey: string;
  descKey: string;
  priceRate: number;
  priceMin?: number;
  image?: string; // Placeholder prop
  detailsKey: string;
  guaranteeKey?: string;
  internalTitleKey?: string;
  internalDescKey?: string;
  seoTitleKey?: string;
  seoDescKey?: string;
  seoKeywordsKey?: string;
}

export const services: Service[] = [
  {
    id: 'webdev',
    titleKey: 'services.webdev.title',
    descKey: 'services.webdev.desc',
    priceRate: 35,
    priceMin: 4000,
    image: '/assets/services/webdev.png',
    detailsKey: 'services.webdev.details',
    guaranteeKey: 'services.webdev.guarantee',
    seoTitleKey: 'services.webdev.seo_title',
    seoDescKey: 'services.webdev.seo_desc',
    seoKeywordsKey: 'services.webdev.seo_keywords'
  },
  {
    id: 'bugfix',
    titleKey: 'services.bugfix.title',
    descKey: 'services.bugfix.desc',
    priceRate: 35,
    image: '/assets/services/bugfix.png',
    detailsKey: 'services.bugfix.details',
    seoTitleKey: 'services.bugfix.seo_title',
    seoDescKey: 'services.bugfix.seo_desc',
    seoKeywordsKey: 'services.bugfix.seo_keywords'
  },
  {
    id: 'ads',
    titleKey: 'services.ads.title',
    descKey: 'services.ads.desc',
    priceRate: 25,
    priceMin: 1000,
    image: '/assets/services/ads.png',
    detailsKey: 'services.ads.details',
    internalTitleKey: 'services.ads.internal_title',
    internalDescKey: 'services.ads.internal_desc',
    seoTitleKey: 'services.ads.seo_title',
    seoDescKey: 'services.ads.seo_desc',
    seoKeywordsKey: 'services.ads.seo_keywords'
  },
  {
    id: 'analytics',
    titleKey: 'services.analytics.title',
    descKey: 'services.analytics.desc',
    priceRate: 25,
    priceMin: 500,
    image: '/assets/services/analytics.png',
    detailsKey: 'services.analytics.details',
    guaranteeKey: 'services.analytics.guarantee',
    seoTitleKey: 'services.analytics.seo_title',
    seoDescKey: 'services.analytics.seo_desc',
    seoKeywordsKey: 'services.analytics.seo_keywords'
  },
  {
    id: 'cookies',
    titleKey: 'services.cookies.title',
    descKey: 'services.cookies.desc',
    priceRate: 25,
    priceMin: 200,
    image: '/assets/services/cookies.png',
    detailsKey: 'services.cookies.details',
    internalTitleKey: 'services.cookies.internal_title',
    internalDescKey: 'services.cookies.internal_desc',
    seoTitleKey: 'services.cookies.seo_title',
    seoDescKey: 'services.cookies.seo_desc',
    seoKeywordsKey: 'services.cookies.seo_keywords'
  },
  {
    id: 'telegram',
    titleKey: 'services.telegram.title',
    descKey: 'services.telegram.desc',
    priceRate: 25,
    priceMin: 500,
    image: '/assets/services/telegram.png',
    detailsKey: 'services.telegram.details',
    guaranteeKey: 'services.telegram.guarantee',
    internalTitleKey: 'services.telegram.internal_title',
    internalDescKey: 'services.telegram.internal_desc',
    seoTitleKey: 'services.telegram.seo_title',
    seoDescKey: 'services.telegram.seo_desc',
    seoKeywordsKey: 'services.telegram.seo_keywords'
  }
];
