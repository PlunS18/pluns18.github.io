import React, { useState, useRef } from 'react';
import { ThreeRoomViewer } from './ThreeRoomViewer';
import { Smartphone, Cpu, CheckCircle2, Sparkles, Box, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const ProjectsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'mobile' | 'web' | '3d'>('all');
  const { t, language } = useLanguage();
  const rectMap = useRef<WeakMap<HTMLElement, { width: number; height: number; left: number; top: number }>>(new WeakMap());

  // React Bits 3D Tilt Card Effect Handler (cached rect avoids getBoundingClientRect layout reflow on every move)
  const handleTiltEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    rectMap.current.set(card, {
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top
    });
  };

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    let data = rectMap.current.get(card);
    if (!data) {
      const rect = card.getBoundingClientRect();
      data = { width: rect.width, height: rect.height, left: rect.left, top: rect.top };
      rectMap.current.set(card, data);
    }
    const x = e.clientX - data.left;
    const y = e.clientY - data.top;
    const centerX = data.width / 2;
    const centerY = data.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.006, 1.006, 1.006)`;
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container-max">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="neon-badge mb-2">
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.projects.badge}</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white">
              {t.projects.title}
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mt-1">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'vi' ? 'Tất cả' : 'All'}
            </button>
            <button
              onClick={() => setActiveTab('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'mobile'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mobile Apps
            </button>
            <button
              onClick={() => setActiveTab('web')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'web'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Web Platforms
            </button>
            <button
              onClick={() => setActiveTab('3d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === '3d'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3D Three.js
            </button>
          </div>
        </div>

        {/* =========================================================================
            PROJECT 1: FLAGSHIP HOMECHECK ECOSYSTEM (HIGH-RES WEB ASSETS)
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'mobile' || activeTab === 'web') && (
          <div
            onMouseEnter={handleTiltEnter}
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            className="spotlight-card p-6 md:p-8 mb-10 border-cyan-500/30 bg-slate-900/60 shadow-2xl transition-transform duration-200 ease-out"
          >
            {/* Project Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-cyan-500/40 p-1 bg-slate-950 flex-shrink-0 shadow-lg shadow-cyan-500/20">
                  <img
                    src="./assets/logo-homecheck.png"
                    alt="HomeCheck Logo"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-heading font-black text-xl md:text-2xl text-white">
                      {t.projects.p1.title}
                    </h3>
                    <span className="neon-badge live">Production Live</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">
                      iOS • Android • Web
                    </span>
                  </div>
                  <p className="text-xs text-cyan-400 font-medium">
                    {t.projects.p1.role} • (04/2024 – {language === 'vi' ? 'Hiện tại' : 'Present'})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://myhomecheck.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-950/80 hover:bg-cyan-950/50 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs font-bold flex items-center gap-2 transition-all shadow-md group cursor-pointer"
                >
                  <span>myhomecheck.ai</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Project Description & Architecture Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
              
              {/* Left Column: Architectural Bullets */}
              <div className="lg:col-span-7 space-y-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t.projects.p1.desc}
                </p>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 rounded bg-cyan-500/10 text-cyan-400 mt-0.5">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white">{t.projects.p1.sol1Title}</div>
                        <p className="text-xs text-slate-400 mt-1">
                          {t.projects.p1.sol1Desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 rounded bg-cyan-500/10 text-cyan-400 mt-0.5">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white">{t.projects.p1.sol2Title}</div>
                        <p className="text-xs text-slate-400 mt-1">
                          {t.projects.p1.sol2Desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 rounded bg-cyan-500/10 text-cyan-400 mt-0.5">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white">{t.projects.p1.sol3Title}</div>
                        <p className="text-xs text-slate-400 mt-1">
                          {t.projects.p1.sol3Desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tech Stack Pills - Honest and Accurate Front-end/Mobile stack */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {[
                    'React Native',
                    'Expo',
                    'TypeScript',
                    'Next.js 14',
                    'Three.js WebGL',
                    'HTML5 Canvas 2D',
                    'Zustand',
                    'NestJS Architecture',
                    'RESTful API & WsClient',
                    'BullMQ & Redis Queue',
                    'CodePush (OTA)'
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 text-[11px] font-semibold border border-slate-700/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: High-Res Official Web Asset Showcase */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-1 group hover:border-cyan-500/50 transition-all shadow-lg">
                    <div className="h-52 overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center">
                      <img
                        src="./assets/hc_web_hero_design.webp"
                        alt={t.projects.p1.card1Title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <div className="text-[11px] font-bold text-slate-200">{t.projects.p1.card1Title}</div>
                      <div className="text-[10px] text-cyan-400 font-mono">{t.projects.p1.card1Subtitle}</div>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-1 group hover:border-cyan-500/50 transition-all shadow-lg">
                    <div className="h-52 overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center">
                      <img
                        src="./assets/hc_web_satellite_measure.webp"
                        alt={t.projects.p1.card2Title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <div className="text-[11px] font-bold text-slate-200">{t.projects.p1.card2Title}</div>
                      <div className="text-[10px] text-cyan-400 font-mono">{t.projects.p1.card2Subtitle}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-1 group hover:border-cyan-500/50 transition-all shadow-lg">
                    <div className="h-32 overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center">
                      <img
                        src="./assets/hc_web_cad_digitize.webp"
                        alt={t.projects.p1.card3Title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-1.5 text-center">
                      <div className="text-[10px] font-bold text-slate-200">{t.projects.p1.card3Title}</div>
                      <div className="text-[9px] text-cyan-400 font-mono">{t.projects.p1.card3Subtitle}</div>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-1 group hover:border-cyan-500/50 transition-all shadow-lg">
                    <div className="h-32 overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center">
                      <img
                        src="./assets/hc_web_fengshui_analysis.webp"
                        alt={t.projects.p1.card4Title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-1.5 text-center">
                      <div className="text-[10px] font-bold text-slate-200">{t.projects.p1.card4Title}</div>
                      <div className="text-[9px] text-amber-400 font-mono">{t.projects.p1.card4Subtitle}</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            INTERACTIVE 3D ENGINE SHOWCASE (THREE.JS VILLA ARCHITECTURE)
            ========================================================================= */}
        {(activeTab === 'all' || activeTab === '3d') && (
          <div id="three-engine" className="mb-10">
            <ThreeRoomViewer />
          </div>
        )}

        {/* =========================================================================
            PROJECT 2 & 3: THẦY AI & WEB 3D CAD ENGINE
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(activeTab === 'all' || activeTab === 'mobile') && (
            <div
              onMouseEnter={handleTiltEnter}
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              className="spotlight-card p-6 border-slate-800 bg-slate-900/50 flex flex-col justify-between transition-transform duration-200 ease-out"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">
                    AI
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                      App Store &amp; Google Play
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      React Native • Redux
                    </span>
                  </div>
                </div>

                <h4 className="font-heading font-black text-lg text-white mb-1">
                  {t.projects.p2.title}
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  {t.projects.p2.role} • (09/2023 – 04/2024)
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {t.projects.p2.desc}
                </p>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span><strong>{t.projects.p2.sol1Title}:</strong> {t.projects.p2.sol1Desc}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span><strong>{t.projects.p2.sol2Title}:</strong> {t.projects.p2.sol2Desc}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-slate-800/80">
                {['React Native', 'TypeScript', 'Audio Streaming', 'LaTeX Math', 'Redux', 'SDLC'].map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'web') && (
            <div
              onMouseEnter={handleTiltEnter}
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              className="spotlight-card p-6 border-slate-800 bg-slate-900/50 flex flex-col justify-between transition-transform duration-200 ease-out"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-500/30">
                    CAD
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                      WebGL &amp; Canvas
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      Three.js • Next.js 14
                    </span>
                  </div>
                </div>

                <h4 className="font-heading font-black text-lg text-white mb-1">
                  {t.projects.p3.title}
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  {t.projects.p3.role} • Web Platform
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {t.projects.p3.desc}
                </p>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>{t.projects.p3.sol1Title}:</strong> {t.projects.p3.sol1Desc}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong>{t.projects.p3.sol2Title}:</strong> {t.projects.p3.sol2Desc}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-slate-800/80">
                {['HTML5 Canvas 2D', 'Three.js (WebGL)', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vector Snapping'].map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
