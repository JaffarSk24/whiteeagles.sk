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
    detailsKey: 'services.webdev.details'
  },
  {
    id: 'bugfix',
    titleKey: 'services.bugfix.title',
    descKey: 'services.bugfix.desc',
    priceRate: 35,
    detailsKey: 'services.bugfix.details'
  },
  {
    id: 'ads',
    titleKey: 'services.ads.title',
    descKey: 'services.ads.desc',
    priceRate: 25,
    priceMin: 1000,
    detailsKey: 'services.ads.details'
  },
  {
    id: 'analytics',
    titleKey: 'services.analytics.title',
    descKey: 'services.analytics.desc',
    priceRate: 25,
    priceMin: 500,
    detailsKey: 'services.analytics.details'
  },
  {
    id: 'cookies',
    titleKey: 'services.cookies.title',
    descKey: 'services.cookies.desc',
    priceRate: 25,
    priceMin: 200,
    detailsKey: 'services.cookies.details'
  },
  {
    id: 'telegram',
    titleKey: 'services.telegram.title',
    descKey: 'services.telegram.desc',
    priceRate: 25,
    priceMin: 500,
    detailsKey: 'services.telegram.details'
  }
];
