import { tr } from './tr.js';
import { en } from './en.js';

const langMap = { tr, en };

export const getLocale = () => {
  const savedLang = localStorage.getItem('lang');
  const lang = savedLang || document.documentElement.lang || 'tr';
  return langMap[lang] || tr;
};
