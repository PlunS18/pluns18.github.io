import React from 'react';
import { Award, Smartphone, Gauge, Cpu } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const MetricsBar: React.FC = () => {
  const { t } = useLanguage();

  const metrics = [
    {
      icon: <Award className="w-5 h-5 text-blue-400" />,
      number: t.metrics.m1.number,
      title: t.metrics.m1.title,
      subtitle: t.metrics.m1.subtitle
    },
    {
      icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
      number: t.metrics.m2.number,
      title: t.metrics.m2.title,
      subtitle: t.metrics.m2.subtitle
    },
    {
      icon: <Gauge className="w-5 h-5 text-emerald-400" />,
      number: t.metrics.m3.number,
      title: t.metrics.m3.title,
      subtitle: t.metrics.m3.subtitle
    },
    {
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      number: t.metrics.m4.number,
      title: t.metrics.m4.title,
      subtitle: t.metrics.m4.subtitle
    }
  ];

  return (
    <div className="py-6 border-y border-slate-800/80 bg-slate-950/40 backdrop-blur-md">
      <div className="container-max">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 md:p-5 flex flex-col justify-between border-slate-800 hover:border-cyan-500/40 transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/60">
                  {m.icon}
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500">
                  METRIC 0{idx + 1}
                </span>
              </div>
              <div>
                <div className="font-heading font-black text-2xl md:text-3xl text-white tracking-tight">
                  {m.number}
                </div>
                <div className="font-bold text-xs text-slate-200 mt-1">
                  {m.title}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  {m.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
