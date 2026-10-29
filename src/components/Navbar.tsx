import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Download, Sparkles, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const handleDownloadPortfolio = () => {
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.15 }
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300">
      <div className="container-max">
        <div className="glass-panel px-4 py-3 flex items-center justify-between border-cyan-500/20 bg-slate-950/75 shadow-xl">
          {/* Brand Logo & Avatar */}
          <a href="#" className="flex items-center gap-3 group text-decoration-none">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-400/60 shadow-lg shadow-cyan-500/20">
                <img
                  src="./assets/candidate_clean.png"
                  alt="Lưu Trương Hoàng Phúc"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 beacon-dot" title={t.nav.statusAvailable}></div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-sm text-slate-100 flex items-center gap-1.5">
                <span>{t.nav.brandTitle}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                  {t.nav.devBadge}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                {t.nav.jobTitle}
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#about" className="hover:text-cyan-400 transition-colors">
              {t.nav.overview}
            </a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">
              {t.nav.projects}
            </a>
            <a href="#three-engine" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <span>{t.nav.engine3d}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            </a>
            <a href="#tech-matrix" className="hover:text-cyan-400 transition-colors">
              {t.nav.skills}
            </a>
            <a href="#ai-native" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>{t.nav.aiWorkflow}</span>
            </a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">
              {t.nav.contact}
            </a>
          </nav>

          {/* Action Hub & Language Switcher */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Segmented Toggle */}
            <div className="flex items-center bg-slate-900/90 rounded-xl p-0.5 border border-slate-800 text-[11px] font-bold shadow-inner">
              <button
                id="btn-lang-vi"
                onClick={() => setLanguage('vi')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  language === 'vi'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Tiếng Việt"
              >
                🇻🇳 VI
              </button>
              <button
                id="btn-lang-en"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="English"
              >
                🇬🇧 EN
              </button>
            </div>

            {/* Download PDF Button */}
            <a
              href="./Luu_Truong_Hoang_Phuc_Portfolio.pdf"
              download="Luu_Truong_Hoang_Phuc_Portfolio.pdf"
              onClick={handleDownloadPortfolio}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.nav.downloadPdf}</span>
            </a>
          </div>

          {/* Mobile Right Controls: Language + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex items-center bg-slate-900/90 rounded-lg p-0.5 border border-slate-800 text-[10px] font-bold">
              <button
                onClick={() => setLanguage('vi')}
                className={`px-2 py-0.5 rounded transition-all ${
                  language === 'vi' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'
                }`}
              >
                VI
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded transition-all ${
                  language === 'en' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 glass-panel bg-slate-950/95 border-slate-800 flex flex-col gap-3 shadow-2xl">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-900 text-sm font-semibold text-slate-200"
            >
              {t.nav.overview}
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-900 text-sm font-semibold text-slate-200"
            >
              {t.nav.projects}
            </a>
            <a
              href="#three-engine"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-900 text-sm font-semibold text-slate-200"
            >
              {t.nav.engine3d}
            </a>
            <a
              href="#tech-matrix"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-900 text-sm font-semibold text-slate-200"
            >
              {t.nav.skills}
            </a>
            <a
              href="#ai-native"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-900 text-sm font-semibold text-slate-200"
            >
              {t.nav.aiWorkflow}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-900 text-sm font-semibold text-slate-200"
            >
              {t.nav.contact}
            </a>
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <a
                href="./Luu_Truong_Hoang_Phuc_Portfolio.pdf"
                download="Luu_Truong_Hoang_Phuc_Portfolio.pdf"
                onClick={handleDownloadPortfolio}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{t.nav.downloadPdf} (1.66MB)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
