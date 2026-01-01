export interface Service {
  id: string;
  titleKey: string;
  descKey: string;
  priceRate: number;
  priceMin?: number;
  image?: string; // Placeholder prop
  detailsKey: string;
}

export const services: Service[] = [
  {
    id: 'webdev',
    titleKey: 'services.webdev.title',
    descKey: 'services.webdev.desc',
    priceRate: 35,
    priceMin: 4000,
    image: '/assets/services/webdev.png',
    detailsKey: 'services.webdev.details'
  },
  {
    id: 'bugfix',
    titleKey: 'services.bugfix.title',
    descKey: 'services.bugfix.desc',
    priceRate: 35,
    image: '/assets/services/bugfix.png',
    detailsKey: 'services.bugfix.details'
  },
  {
    id: 'ads',
    titleKey: 'services.ads.title',
    descKey: 'services.ads.desc',
    priceRate: 25,
    priceMin: 1000,
    image: '/assets/services/ads.png',
    detailsKey: 'services.ads.details'
  },
  {
    id: 'analytics',
    titleKey: 'services.analytics.title',
    descKey: 'services.analytics.desc',
    priceRate: 25,
    priceMin: 500,
    image: '/assets/services/analytics.png',
    detailsKey: 'services.analytics.details'
  },
  {
    id: 'cookies',
    titleKey: 'services.cookies.title',
    descKey: 'services.cookies.desc',
    priceRate: 25,
    priceMin: 200,
    image: '/assets/services/cookies.png',
    detailsKey: 'services.cookies.details'
  },
  {
    id: 'telegram',
    titleKey: 'services.telegram.title',
    descKey: 'services.telegram.desc',
    priceRate: 25,
    priceMin: 500,
    image: '/assets/services/telegram.png',
    detailsKey: 'services.telegram.details'
  }
];
