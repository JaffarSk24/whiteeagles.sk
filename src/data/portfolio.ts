export interface PortfolioItem {
  id: string;
  url: string;
  title: string;
  descKey: string;
  image?: string;
}

export const portfolio: PortfolioItem[] = [
  {
    id: 'biliardovna',
    url: 'https://biliardovna.sk',
    title: 'Biliardovna.sk',
    descKey: 'portfolio.biliardovna.desc'
  },
  {
    id: 'studio-krasy',
    url: 'https://studio-krasy.sk',
    title: 'Studio-krasy.sk',
    descKey: 'portfolio.studiokrasy.desc'
  },
  {
    id: 'top-kobka',
    url: 'https://top-kobka.sk',
    title: 'Top-kobka.sk',
    descKey: 'portfolio.topkobka.desc'
  },
  {
    id: 'top-sklad',
    url: 'https://top-sklad.sk',
    title: 'Top-sklad.sk',
    descKey: 'portfolio.topsklad.desc'
  },
  {
    id: 'bodabo',
    url: 'https://bodabo.ru',
    title: 'Bodabo.ru',
    descKey: 'portfolio.bodabo.desc'
  }
];
