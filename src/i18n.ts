import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { deCommon } from "./translations/de/common";
import { enCommon } from "./translations/en/common";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    fallbackLng: "de",
    fallbackNS: ["common"],
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    resources: {
      de: {
        common: deCommon,
      },
      en: {
        common: enCommon,
      },
    },
  });

export default i18n;
