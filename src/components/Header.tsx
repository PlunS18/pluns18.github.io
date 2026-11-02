import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-30 border-b-[1.5px] border-ink bg-paper/95 backdrop-blur-sm">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#top" className="hand text-[1.6rem] leading-none text-ink no-underline">
          Hoàng Phúc
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 text-[0.95rem] font-medium md:flex">
          <a href="#projects" className="text-ink-soft hover:text-ink">{t.nav.work}</a>
          <a href="#experience" className="text-ink-soft hover:text-ink">{t.nav.experience}</a>
          <a href="#skills" className="text-ink-soft hover:text-ink">{t.nav.skills}</a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center text-sm font-semibold" role="group" aria-label={t.nav.switchTo}>
            {(['vi', 'en'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                aria-pressed={language === lang}
                className={`h-9 w-9 rounded-full ${language === lang ? 'bg-ink text-paper-raised' : 'text-ink-soft hover:text-ink'}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="#contact" className="btn btn-ink btn-sm">
            {t.nav.contact}
          </a>
        </div>
      </div>
    </header>
  );
};
