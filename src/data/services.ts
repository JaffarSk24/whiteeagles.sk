import serviceSlugs from './service-slugs.json';

export interface Service {
  id: string;
  titleKey: string;
  descKey: string;
  /** Price of one unit: an hour, unless `priceUnit` says otherwise. */
  priceRate: number;
  /** Upper end when the unit price is a range, e.g. 62.5-100€ a video. */
  priceRateMax?: number;
  priceUnit?: 'hour' | 'video';
  priceMin?: number;
  image?: string; // Placeholder prop
  detailsKey: string;
  guaranteeKey?: string;
  internalTitleKey?: string;
  internalDescKey?: string;
  seoTitleKey?: string;
  seoDescKey?: string;
  seoKeywordsKey?: string;
  /**
   * Sibling services worth reading next. Also how link weight moves between
   * them: webdev collects most of the incoming links from articles, so it
   * passes to the two services people actually order alongside a site.
   */
  related?: string[];
  /**
   * Done by a partner the client contracts and pays directly. The pages say
   * so in place of the company's payment methods, and structured data names
   * the company as the broker rather than the provider. The partner is not
   * named anywhere on the site.
   */
  partner?: boolean;
  /**
   * Published work shown on the service page in groups, each item linking to
   * the original post, with views per network. Paths and URLs live here and
   * not in the message files, which are serialised into the pages; titles
   * and labels are in `services.<id>.page.example_groups`, in the same order.
   */
  exampleGroups?: {
    key: string;
    items: {
      image: string;
      url: string;
      /** Short language badge on the cover, for versions of one video. */
      lang?: string;
      views: { network: 'TikTok' | 'Facebook' | 'Instagram'; count: number }[];
    }[];
  }[];
}

export const services: Service[] = [
  {
    id: 'webdev',
    related: ['ads', 'analytics'],
    titleKey: 'services.webdev.title',
    descKey: 'services.webdev.desc',
    priceRate: 35,
    priceMin: 1500,
    image: '/assets/services/webdev.webp',
    detailsKey: 'services.webdev.details',
    // The heading carries the city for the geo query; the short label on the
    // home page card stays as it was.
    internalTitleKey: 'services.webdev.internal_title',
    internalDescKey: 'services.webdev.internal_desc',
    guaranteeKey: 'services.webdev.guarantee',
    seoTitleKey: 'services.webdev.seo_title',
    seoDescKey: 'services.webdev.seo_desc',
    seoKeywordsKey: 'services.webdev.seo_keywords'
  },
  {
    id: 'bugfix',
    related: ['webdev', 'ads', 'analytics'],
    titleKey: 'services.bugfix.title',
    descKey: 'services.bugfix.desc',
    priceRate: 35,
    image: '/assets/services/bugfix.webp',
    detailsKey: 'services.bugfix.details',
    // The page targets "oprava webstranky" / "oprava wordpress webstranky",
    // which already sit at positions 13-17 with nothing addressing them.
    internalTitleKey: 'services.bugfix.internal_title',
    internalDescKey: 'services.bugfix.internal_desc',
    seoTitleKey: 'services.bugfix.seo_title',
    seoDescKey: 'services.bugfix.seo_desc',
    seoKeywordsKey: 'services.bugfix.seo_keywords'
  },
  {
    id: 'ads',
    related: ['analytics', 'video', 'cookies'],
    titleKey: 'services.ads.title',
    descKey: 'services.ads.desc',
    priceRate: 25,
    priceMin: 1000,
    image: '/assets/services/ads.webp',
    detailsKey: 'services.ads.details',
    internalTitleKey: 'services.ads.internal_title',
    internalDescKey: 'services.ads.internal_desc',
    seoTitleKey: 'services.ads.seo_title',
    seoDescKey: 'services.ads.seo_desc',
    seoKeywordsKey: 'services.ads.seo_keywords'
  },
  {
    id: 'analytics',
    related: ['ads', 'cookies'],
    titleKey: 'services.analytics.title',
    descKey: 'services.analytics.desc',
    priceRate: 25,
    priceMin: 500,
    image: '/assets/services/analytics.webp',
    detailsKey: 'services.analytics.details',
    guaranteeKey: 'services.analytics.guarantee',
    internalTitleKey: 'services.analytics.internal_title',
    internalDescKey: 'services.analytics.internal_desc',
    seoTitleKey: 'services.analytics.seo_title',
    seoDescKey: 'services.analytics.seo_desc',
    seoKeywordsKey: 'services.analytics.seo_keywords'
  },
  {
    id: 'cookies',
    related: ['analytics', 'ads'],
    titleKey: 'services.cookies.title',
    descKey: 'services.cookies.desc',
    priceRate: 25,
    priceMin: 200,
    image: '/assets/services/cookies.webp',
    detailsKey: 'services.cookies.details',
    internalTitleKey: 'services.cookies.internal_title',
    internalDescKey: 'services.cookies.internal_desc',
    seoTitleKey: 'services.cookies.seo_title',
    seoDescKey: 'services.cookies.seo_desc',
    seoKeywordsKey: 'services.cookies.seo_keywords'
  },
  {
    id: 'telegram',
    related: ['webdev', 'analytics'],
    titleKey: 'services.telegram.title',
    descKey: 'services.telegram.desc',
    priceRate: 25,
    priceMin: 500,
    image: '/assets/services/telegram.webp',
    detailsKey: 'services.telegram.details',
    guaranteeKey: 'services.telegram.guarantee',
    internalTitleKey: 'services.telegram.internal_title',
    internalDescKey: 'services.telegram.internal_desc',
    seoTitleKey: 'services.telegram.seo_title',
    seoDescKey: 'services.telegram.seo_desc',
    seoKeywordsKey: 'services.telegram.seo_keywords'
  },
  {
    // Short vertical videos for TikTok, Reels and Shorts, made by a partner
    // the owner goes to client meetings with. The partner contracts and is
    // paid directly; the owner runs the ads that show the videos.
    id: 'video',
    partner: true,
    related: ['ads', 'webdev'],
    titleKey: 'services.video.title',
    descKey: 'services.video.desc',
    priceRate: 62.5,
    priceRateMax: 100,
    priceUnit: 'video',
    priceMin: 350,
    image: '/assets/services/video.webp',
    detailsKey: 'services.video.details',
    internalTitleKey: 'services.video.internal_title',
    internalDescKey: 'services.video.internal_desc',
    seoTitleKey: 'services.video.seo_title',
    seoDescKey: 'services.video.seo_desc',
    seoKeywordsKey: 'services.video.seo_keywords',
    // RAM service reels by the partner, figures of 15 Oct 2026: TikTok from
    // the public video pages, Facebook and Instagram from the page's own
    // statistics. Views only: the reels also ran in the client's earlier ad
    // campaign, so clicks would credit the video with what the ads did.
    // The Slovak version of the first video and the August video were also
    // posted on Facebook (and the August one on Instagram).
    exampleGroups: [
      {
        key: 'voices',
        items: [
          { lang: 'SK', image: '/assets/services/video-ex-sk.webp', url: 'https://www.tiktok.com/@ramservice_bratislava/video/7687701632603245846', views: [{ network: 'TikTok', count: 92900 }, { network: 'Facebook', count: 23597 }] },
          { lang: 'UA', image: '/assets/services/video-ex-ua.webp', url: 'https://www.tiktok.com/@ramservice_bratislava/video/7687702543119437059', views: [{ network: 'TikTok', count: 98900 }] },
          { lang: 'RU', image: '/assets/services/video-ex-ru.webp', url: 'https://www.tiktok.com/@ramservice_bratislava/video/7687703152623127830', views: [{ network: 'TikTok', count: 137900 }] },
          { lang: 'EN', image: '/assets/services/video-ex-en.webp', url: 'https://www.tiktok.com/@ramservice_bratislava/video/7687703566869482774', views: [{ network: 'TikTok', count: 58800 }] },
        ],
      },
      {
        key: 'more',
        items: [
          { image: '/assets/services/video-ex-repair.webp', url: 'https://www.tiktok.com/@ramservice_bratislava/video/7685047371801185558', views: [{ network: 'TikTok', count: 200900 }] },
          { image: '/assets/services/video-ex-mission.webp', url: 'https://www.tiktok.com/@ramservice_bratislava/video/7676200127450713366', views: [{ network: 'TikTok', count: 44200 }, { network: 'Facebook', count: 11071 }, { network: 'Instagram', count: 323 }] },
        ],
      },
    ],
  }
];

/**
 * The unit price as shown to people: "25€", or "62,5-100€" for a range, with
 * the decimal comma in Slovak and Russian.
 */
export const formatRate = (service: Service, locale: string): string => {
  const num = (n: number) => (locale === 'en' ? String(n) : String(n).replace('.', ','));
  return service.priceRateMax
    ? `${num(service.priceRate)}-${num(service.priceRateMax)}€`
    : `${num(service.priceRate)}€`;
};

/**
 * The URL segment of a service in one language. Most services use their id in
 * every language; `service-slugs.json` lists the exceptions. It is a JSON file
 * because generate_sitemap.js, which is plain Node, reads the same list.
 *
 * The Russian advertising page moved from /ru/service/ads/ to
 * /ru/service/reklama-google-ads/ on 5 Oct 2026: in seven weeks Googlebot never
 * fetched the old address on its own (only the inspection tool did), so it was
 * given a new one that Google treats as new. nginx answers the old address with
 * a 301 to the new one.
 */
export const serviceSlug = (service: Service | string, locale: string): string => {
  const id = typeof service === 'string' ? service : service.id;
  const slugs = (serviceSlugs as Record<string, Partial<Record<string, string>>>)[id];
  return slugs?.[locale] ?? id;
};

/** The service a URL segment stands for in a given language. */
export const serviceBySlug = (slug: string, locale: string): Service | undefined =>
  services.find((s) => serviceSlug(s, locale) === slug);
