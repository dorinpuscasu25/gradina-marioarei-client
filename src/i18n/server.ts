import { translations, type Language } from './translations';
import type { Translator } from './types';

export const SUPPORTED_LANGUAGES: Language[] = ['ro', 'ru', 'en'];

export function isLanguage(value: string): value is Language {
  return SUPPORTED_LANGUAGES.includes(value as Language);
}

export function createTranslator(lang: Language): Translator {
  return (path: string) => {
    const keys = path.split('.');
    let current: any = translations[lang];

    for (const key of keys) {
      if (current?.[key] === undefined) {
        return path;
      }
      current = current[key];
    }

    return current;
  };
}
