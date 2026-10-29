import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md text-xs text-slate-400">
      <div className="container-max flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand info */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="font-heading font-extrabold text-sm text-white flex items-center gap-2">
            <span>{t.hero.name}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              2026
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {t.footer.available} • Three.js WebGL • AI-Native
          </p>
        </div>

        {/* Design references */}
        <div className="text-center text-[11px] text-slate-500 flex flex-wrap items-center justify-center gap-2">
          <span>{t.footer.rights}</span>
        </div>

        {/* Back to top */}
        <div>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5 font-semibold text-xs cursor-pointer"
            title={language === 'vi' ? 'Lên đầu trang' : 'Back to top'}
          >
            <span>{language === 'vi' ? 'Lên đầu trang' : 'Top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
