import ReactNative from 'react-native';
import I18n from 'react-native-i18n';

// Import all locales
import en from '../../locales/en.json';
import kh from '../../locales/kh.json';
import { AppReloadService } from '../services/app-reload.service';
import { AppStorage } from '../services/app-storage.service';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  kh
};


I18n.defaultLocale = "kh";
I18n.locale = "kh";

const currentLocale = I18n.currentLocale();
console.log(currentLocale);

// The method we'll use instead of a regular string
export function i18n(name, params = {}) {
  return I18n.t(name, params);
};

export const switchLanguage = (lang) => {
  I18n.locale = lang;
  AppStorage.setLocal(lang);
};

export default I18n;