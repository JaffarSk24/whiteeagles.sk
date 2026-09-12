// The share image differs per language: the Russian card carries the Russian
// value proposition, the Slovak and English cards their own. Pages without an
// image of their own (home, blog index, portfolio, audit) use this one.
export const OG_IMAGE_BY_LOCALE: Record<string, string> = {
  sk: "/assets/snippetSK.png",
  en: "/assets/snippetEN.png",
  ru: "/assets/snippet.png",
};

export function ogImageFor(locale: string) {
  return OG_IMAGE_BY_LOCALE[locale] ?? OG_IMAGE_BY_LOCALE.sk;
}
