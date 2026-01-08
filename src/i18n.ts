import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enCalls from "./locales/en.json";
import skCalls from "./locales/sk.json";
import ruCalls from "./locales/ru.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enCalls },
      sk: { translation: skCalls },
      ru: { translation: ruCalls },
    },
    supportedLngs: ["sk", "en", "ru"],
    fallbackLng: "sk", // Default to Slovak based on user context
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["querystring", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupQuerystring: "lng",
    },
    // Custom logic to force 'sk' for bots (Googlebot, etc.) to ensure correct indexing
    // This runs before the detector if we intervene, or we can rely on detection options if available.
    // Since i18next doesn't have a simple 'botDetector', we will handle this by checking navigator.userAgent
    // If bot, we simply set the initial language to 'sk' if detection fails or override it.
    // However, the cleanest way is often to inject a custom detector.
    // For simplicity, we will assume standard detection works for users, but for SEO we want 'sk' content.
    // Actually, 'navigator' detection matches the bot's headers.
    // We will REMOVE 'navigator' from detection if it's a bot, or explicitly set lang.
  });

// Force SK for bots
const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(userAgent);
if (isBot) {
  i18n.changeLanguage('sk');
}

export default i18n;
