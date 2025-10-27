import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import en from "../public/locales/en/translation.json";
import ar from "../public/locales/ar/translation.json";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: "ar",
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false,
    },
  });
