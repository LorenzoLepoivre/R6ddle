import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './translationEN.json';
import translationFR from './translationFR.json';

// Les ressources de traduction
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

i18n
  .use(initReactI18next) // Passez i18n instance à react-i18next.
  .init({
    resources,
    lng: 'en', // Langue par défaut
    fallbackLng: 'en', // Langue de secours

    interpolation: {
      escapeValue: false, // React échappe par défaut.
    },
  });

export default i18n;
