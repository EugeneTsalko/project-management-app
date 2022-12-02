import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en/translation.json';
import ru from './ru/translation.json';

const languages = ['ru', 'en'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: languages,
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
  });

i18n.changeLanguage(window.localStorage.getItem('i18nextLng') || 'en');
