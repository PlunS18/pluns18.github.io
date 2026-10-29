import vi from '../locales/vi.json';

export type Language = 'vi' | 'en';
export type TranslationSchema = typeof vi;

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationSchema;
}
