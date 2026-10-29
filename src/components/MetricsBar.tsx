import React from 'react';
import { Award, Smartphone, Gauge, Cpu } from 'lucide-react';

export const MetricsBar: React.FC = () => {
  const metrics = [
    {
      icon: <Award className="w-5 h-5 text-blue-400" />,
      number: '3+ Năm',
      title: 'Kinh nghiệm Thực chiến',
      subtitle: 'Phát triển chuyên sâu React Native & Next.js'
    },
    {
      icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
      number: '02 Apps',
      title: 'Đã lên App Store & Google Play',
      subtitle: 'HomeCheck & Thầy AI (vận hành production)'
    },
    {
      icon: <Gauge className="w-5 h-5 text-emerald-400" />,
      number: '60 FPS',
      title: 'Tối ưu Hiệu năng Đồ họa',
      subtitle: 'Hermes Engine, Worklets & Three.js WebGL'
    },
    {
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      number: 'AI-Native',
      title: 'Cursor, Claude Code, Codex',
      subtitle: 'Tăng tốc 2-3x năng suất, Type-safe tuyệt đối'
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
