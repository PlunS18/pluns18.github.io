import React, { useRef } from 'react';
import { Smartphone, Globe, Server, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface TechItem {
  name: string;
  level: string;
  isKey?: boolean;
}

interface CategoryCard {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  borderGlow: string;
  badgeColor: string;
  skills: TechItem[];
  highlightNote: string;
}

export const TechMatrixBento: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t, language } = useLanguage();

  // React Bits Spotlight Card effect (tracks mouse coords within the card)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const categories: CategoryCard[] = [
    {
      title: t.skills.cardMobile.title,
      subtitle: t.skills.cardMobile.subtitle,
      icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
      borderGlow: 'rgba(56, 189, 248, 0.4)',
      badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10',
      highlightNote: t.skills.cardMobile.highlight,
      skills: [
        { name: 'React Native', level: t.skills.levels.expert, isKey: true },
        { name: 'Expo & EAS', level: t.skills.levels.proficient, isKey: true },
        { name: 'TypeScript', level: t.skills.levels.proficient, isKey: true },
        { name: 'Hermes Engine', level: '60FPS' },
        { name: 'Reanimated 3', level: 'Worklets' },
        { name: 'Zustand / Redux', level: 'State Management' },
        { name: 'Xcode / Gradle', level: 'Native Config' },
        { name: 'Offline-First', level: 'SQLite/MMKV', isKey: true },
        { name: 'CodePush (OTA)', level: 'RevoPush' }
      ]
    },
    {
      title: t.skills.cardWeb.title,
      subtitle: t.skills.cardWeb.subtitle,
      icon: <Globe className="w-5 h-5 text-indigo-400" />,
      borderGlow: 'rgba(99, 102, 241, 0.4)',
      badgeColor: 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10',
      highlightNote: t.skills.cardWeb.highlight,
      skills: [
        { name: 'Next.js 14 (App Router)', level: t.skills.levels.proficient, isKey: true },
        { name: 'React.js', level: t.skills.levels.proficient, isKey: true },
        { name: 'Three.js (WebGL)', level: t.skills.levels.practical, isKey: true },
        { name: 'HTML5 Canvas 2D', level: 'CAD Drafting' },
        { name: 'Tailwind CSS', level: 'Modern UI/UX' },
        { name: 'Server Components', level: 'High Velocity' },
        { name: 'Responsive 100%', level: 'Cross-Device' },
        { name: 'Performance Tuning', level: 'Lighthouse 95+' }
      ]
    },
    {
      title: t.skills.cardBackend.title,
      subtitle: t.skills.cardBackend.subtitle,
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      borderGlow: 'rgba(16, 185, 129, 0.4)',
      badgeColor: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
      highlightNote: t.skills.cardBackend.highlight,
      skills: [
        { name: 'NestJS', level: t.skills.levels.solid, isKey: true },
        { name: 'RESTful & GraphQL APIs', level: t.skills.levels.integration, isKey: true },
        { name: 'Node.js & Express', level: t.skills.levels.practical, isKey: true },
        { name: 'WebSockets (WsGateway / Client)', level: t.skills.levels.practical, isKey: true },
        { name: 'Redis & BullMQ Queues', level: t.skills.levels.solid, isKey: true },
        { name: 'PostgreSQL & Prisma / TypeORM', level: t.skills.levels.practical },
        { name: 'Postman & Swagger API Docs', level: t.skills.levels.practical },
        { name: 'FCM Push Notifications', level: t.skills.levels.practical }
      ]
    },
    {
      title: t.skills.cardAi.title,
      subtitle: t.skills.cardAi.subtitle,
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      borderGlow: 'rgba(168, 85, 247, 0.4)',
      badgeColor: 'border-purple-500/30 text-purple-300 bg-purple-500/10',
      highlightNote: t.skills.cardAi.highlight,
      skills: [
        { name: 'Cursor AI', level: t.skills.levels.daily, isKey: true },
        { name: 'Claude Code', level: t.skills.levels.daily, isKey: true },
        { name: 'Codex / Copilot', level: 'Accelerate' },
        { name: 'Git / GitHub Actions', level: 'CI/CD Flow' },
        { name: 'Docker', level: 'Container Basic' },
        { name: 'App Store Connect', level: 'Production Release' },
        { name: 'Google Play Console', level: 'Production Release' },
        { name: 'Type-Safe Architecture', level: 'Zod & Strict TS' }
      ]
    }
  ];

  return (
    <section id="tech-matrix" className="py-20 bg-slate-950/60 relative">
      <div className="container-max">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="neon-badge ai mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>{t.skills.badge}</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white">
            {t.skills.title}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              className="spotlight-card p-6 md:p-8 flex flex-col justify-between relative group"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 150px) var(--mouse-y, 150px), ${cat.borderGlow.replace('0.4', '0.08')}, transparent 80%), rgba(15, 23, 42, 0.6)`
              }}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 shadow-inner">
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-white">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Highlight callout */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 mb-5 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{cat.highlightNote}</span>
                </div>

                {/* Skills Tag Cloud */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all ${
                        skill.isKey
                          ? `${cat.badgeColor} shadow-sm font-bold`
                          : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span>{skill.name}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-950/80 text-slate-400 font-mono">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom footer */}
              <div className="pt-5 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>VERIFIED SKILL</span>
                <span>PRODUCTION READY</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
