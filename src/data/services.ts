export interface Service {
  id: string;
  titleKey: string;
  descKey: string;
  priceRate: number;
  priceMin?: number;
  image?: string;
  detailsKey: string;
}

export const services: Service[] = [
  {
    id: 'analytics',
    titleKey: 'services.analytics.title',
    descKey: 'services.analytics.desc',
    priceRate: 25,
    priceMin: 500,
    detailsKey: 'services.analytics.details'
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
    id: 'cookies',
    titleKey: 'services.cookies.title',
    descKey: 'services.cookies.desc',
    priceRate: 25,
    priceMin: 200,
    detailsKey: 'services.cookies.details'
  }
];
