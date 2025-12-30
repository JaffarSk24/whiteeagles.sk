export interface PortfolioItem {
  id: string;
  url: string;
  title: string;
  descKey: string;
  image?: string;
  useOgImage?: boolean;
}

export const portfolio: PortfolioItem[] = [
  {
    id: 'biliardovna',
    url: 'https://biliardovna.sk',
    title: 'Biliardovňa',
    descKey: 'portfolio.biliardovna.desc',
    image: '/assets/portfolio-biliardovna.png'
  },
  {
    id: 'top-kobka',
    url: 'https://top-kobka.sk',
    title: 'TOP KOBKA',
    descKey: 'portfolio.topkobka.desc',
    image: '/assets/portfolio-topkobka.png'
  },
  {
    id: 'studio-krasy',
    url: 'https://studio-krasy.sk',
    title: 'Krása štúdio "OK"',
    descKey: 'portfolio.studiokrasy.desc',
    image: '/assets/portfolio-studiokrasy.png'
  },
  {
    id: 'top-sklad',
    url: 'https://top-sklad.sk',
    title: 'TOP SKLAD',
    descKey: 'portfolio.topsklad.desc',
    image: '/assets/portfolio-topsklad.png'
  },
  {
    id: 'bodabo',
    url: 'https://bodabo.ru',
    title: 'BODA BODA',
    descKey: 'portfolio.bodabo.desc',
    image: '/assets/portfolio-bodabo.png'
  }
];
