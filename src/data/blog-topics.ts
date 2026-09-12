/**
 * Which section of the blog an article belongs to.
 *
 * Thirty-four articles in one undifferentiated grid is a wall: a reader who
 * came for a broken site has to read past everything about VAT registration to
 * find it. The grouping is keyed by the article `key` from the front matter -
 * the identifier shared by all three language versions - so a Slovak, Russian
 * and English article land in the same section without the mapping being
 * repeated per language.
 */
export type BlogTopic = 'website' | 'repair' | 'ads' | 'analytics' | 'business' | 'law';

/** The order the sections appear in on the listing page. */
export const BLOG_TOPIC_ORDER: BlogTopic[] = [
  'website',
  'repair',
  'ads',
  'analytics',
  'business',
  'law',
];

export const BLOG_TOPICS: Record<string, BlogTopic> = {
  // Building a site: what to build, what it costs, who to build it with.
  'digital-start': 'website',
  'restaurant-website': 'website',
  'client-portal': 'website',
  'free-website-builders': 'website',
  'website-cost': 'website',
  'wordpress-vs-custom': 'website',
  'online-booking': 'website',
  'online-shop': 'website',
  'offshore-website': 'website',
  'slovak-language-site': 'website',
  'choosing-contractor': 'website',
  'chatbot': 'website',
  'website-traffic': 'website',

  // An existing site that is broken, slow or unattended.
  'hacked-wordpress': 'repair',
  'slow-wordpress': 'repair',
  'wordpress-maintenance': 'repair',
  'wordpress-repair': 'repair',

  'ads-pricing': 'ads',
  'ads-google-vs-meta': 'ads',
  'google-ads-start': 'ads',
  'ads-no-leads': 'ads',

  'ga4-setup': 'analytics',
  'ga4-audit': 'analytics',
  'server-side-gtm': 'analytics',
  'seo-audit': 'analytics',

  // Running a company here - the questions that come before the website.
  'open-sro': 'business',
  'zivnost-or-sro': 'business',
  'vat-registration': 'business',
  'ekasa': 'business',
  'sk-domain': 'business',
  'card-payments': 'business',

  // What the law requires a site to show or ask for.
  'cookie-banner': 'law',
  'gdpr-small-business': 'law',
  'website-details': 'law',
};

/**
 * An article whose key is not listed yet still has to appear somewhere; the
 * general section is the safe home for it.
 */
export function topicForKey(key: string): BlogTopic {
  return BLOG_TOPICS[key] ?? 'website';
}
