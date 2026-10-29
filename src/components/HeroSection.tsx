import React from 'react';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';
import { ArrowRight, Sparkles, FileDown, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../hooks/useLanguage';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="about" className="pt-28 md:pt-36 pb-16 relative overflow-hidden">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Intro & Value Proposition */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{t.hero.statusLive}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold backdrop-blur-md shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>{t.hero.statusAi}</span>
              </div>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white leading-tight shiny-text">
                {t.hero.name}
              </h1>
              <p className="font-heading font-bold text-lg sm:text-xl md:text-2xl cyber-gradient mt-1">
                {t.hero.title}
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.hero.description}
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-1">
              {t.hero.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-colors text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Call To Action Group */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <span>{t.hero.ctaProjects}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="./Luu_Truong_Hoang_Phuc_Portfolio.pdf"
                download="Luu_Truong_Hoang_Phuc_Portfolio.pdf"
                onClick={triggerConfetti}
                className="px-5 py-3 rounded-xl glass-panel border-slate-700/80 hover:border-cyan-400/50 text-slate-200 font-semibold text-sm flex items-center gap-2 transition-all hover:bg-slate-900"
              >
                <FileDown className="w-4 h-4 text-cyan-400" />
                <span>{t.hero.ctaDownload}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive 3D Smartphone Device */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <ThreeHeroCanvas />
          </div>

        </div>
      </div>
    </section>
  );
};
