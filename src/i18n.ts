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
      order: ["querystring", "localStorage", "navigator", "htmlTag"], // Added querystring for testing
      caches: ["localStorage"],
      lookupQuerystring: "lng",
    },
    load: "languageOnly", // Support ru-RU -> ru mapping
  });

export default i18n;
