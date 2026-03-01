import type { Language } from './translations';

export type Translator = (key: string) => any;

export type I18nProps = {
  lang: Language;
  t: Translator;
};
