import i18n, { use } from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import ru from './assets/locales/ru.json';
import en from './assets/locales/en.json';

use(detector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: ru,
      },
      en: {
        translation: en,
      },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    saveMissing: true,
    load: 'languageOnly',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
