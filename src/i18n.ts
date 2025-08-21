// src/i18n.js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Language files
import translationEN from './locales/en/translation.json'
import translationFR from './locales/fr/translation.json'

const resources = {
  en: { translation: translationEN },
  fr: { translation: translationFR }
}

i18n
  .use(LanguageDetector) // Automatically detect user language
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes
    }
  })

export default i18n
