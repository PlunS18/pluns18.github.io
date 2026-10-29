import React from 'react';
import { Smartphone, Layers, Cpu, Globe, Database, Terminal, Shield, Zap } from 'lucide-react';

const TECH_ITEMS = [
  { name: 'React Native', note: 'Hermes Engine 60FPS', icon: Smartphone, color: 'text-cyan-400' },
  { name: 'Three.js', note: '3D WebGL PBR', icon: Layers, color: 'text-indigo-400' },
  { name: 'Next.js 14', note: 'App Router & SSR', icon: Globe, color: 'text-blue-400' },
  { name: 'TypeScript', note: 'Strict Type-Safety', icon: Terminal, color: 'text-sky-400' },
  { name: 'Expo & EAS', note: 'OTA & Native Build', icon: Zap, color: 'text-emerald-400' },
  { name: 'Offline-First', note: 'SQLite & MMKV Sync', icon: Database, color: 'text-amber-400' },
  { name: 'NestJS & BullMQ', note: 'Async Task Queue', icon: Cpu, color: 'text-purple-400' },
  { name: 'Cursor & Claude', note: 'AI-Native Workflow', icon: Shield, color: 'text-pink-400' },
  { name: 'Tailwind CSS', note: 'Modern UI/UX Pro', icon: Layers, color: 'text-teal-400' }
];

export const TechMarquee: React.FC = () => {
  return (
    <div className="w-full py-8 border-y border-slate-800/80 bg-slate-950/60 backdrop-blur-md relative overflow-hidden">
      <div className="container-max mb-3 flex items-center justify-between text-xs text-slate-400 font-mono">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>PRODUCTION-READY TECH STACK</span>
        </span>
        <span className="hidden sm:inline text-slate-500">
          React Bits • Infinite Motion Stream
        </span>
      </div>

      <div className="marquee-container">
        <div className="marquee-track">
          {/* Repeat list twice for seamless loop */}
          {[...TECH_ITEMS, ...TECH_ITEMS].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex-shrink-0 shadow-lg group cursor-default"
              >
                <div className={`p-1.5 rounded-lg bg-slate-950 border border-slate-800 ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {item.note}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
