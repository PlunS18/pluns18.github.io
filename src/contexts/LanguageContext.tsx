import React, { createContext, useContext, useState, useEffect } from 'react';
import { content } from '../content';
import { Language, TranslationSchema, LanguageContextType } from '../types/i18n';

const translations: Record<Language, TranslationSchema> = content;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('phuc_portfolio_lang');
        if (saved === 'vi' || saved === 'en') return saved;
      } catch {
        // Storage can be blocked; fall back to Vietnamese.
      }
      return 'vi';
    }
    return 'vi';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('phuc_portfolio_lang', lang);
      } catch {
        // Ignore blocked storage; the choice just won't persist.
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
      document.title = translations[language].meta.title;
    }
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
