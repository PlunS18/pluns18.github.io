import type { Content } from '../content';

export type Language = 'vi' | 'en';
export type TranslationSchema = Content;

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationSchema;
}
