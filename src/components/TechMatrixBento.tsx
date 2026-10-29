import React, { useRef } from 'react';
import { Smartphone, Globe, Server, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

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
      title: 'Mobile Engineering',
      subtitle: 'Kiến trúc Ứng dụng Di động Đa nền tảng',
      icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
      borderGlow: 'rgba(56, 189, 248, 0.4)',
      badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10',
      highlightNote: 'Hermes Engine Bytecode compilation & Reanimated worklets đạt 60FPS mượt mà.',
      skills: [
        { name: 'React Native', level: 'Chuyên sâu', isKey: true },
        { name: 'Expo', level: 'Thành thạo', isKey: true },
        { name: 'TypeScript', level: 'Nền tảng', isKey: true },
        { name: 'Hermes Engine', level: 'Tối ưu' },
        { name: 'Reanimated 3', level: '60FPS' },
        { name: 'Zustand / Redux', level: 'State' },
        { name: 'Xcode / Gradle', level: 'Native build' },
        { name: 'Offline-First', level: 'SQLite/MMKV', isKey: true },
        { name: 'CodePush (OTA)', level: 'RevoPush' }
      ]
    },
    {
      title: 'Web & 3D Spatial',
      subtitle: 'Nền tảng Web Hiện đại & Không gian 3D',
      icon: <Globe className="w-5 h-5 text-indigo-400" />,
      borderGlow: 'rgba(99, 102, 241, 0.4)',
      badgeColor: 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10',
      highlightNote: 'SSR / SSG tối ưu hóa SEO với Next.js 14 và render Three.js WebGL trong Worker ngầm.',
      skills: [
        { name: 'Next.js 14 (App Router)', level: 'Chuyên sâu', isKey: true },
        { name: 'React.js', level: 'Thành thạo', isKey: true },
        { name: 'Three.js (WebGL)', level: 'Thực chiến', isKey: true },
        { name: 'HTML5 Canvas 2D', level: 'Dựng CAD' },
        { name: 'Tailwind CSS', level: 'Tối ưu UI' },
        { name: 'Server Components', level: 'Tốc độ' },
        { name: 'Responsive 100%', level: 'Đa thiết bị' },
        { name: 'Performance Tuning', level: 'Lighthouse 95+' }
      ]
    },
    {
      title: 'Backend & Distributed',
      subtitle: 'Hệ thống Bất đồng bộ & Real-time',
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      borderGlow: 'rgba(16, 185, 129, 0.4)',
      badgeColor: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
      highlightNote: 'Xếp hàng BullMQ + Redis cho các tác vụ nặng tránh nghẽn luồng và WsGateway cộng tác.',
      skills: [
        { name: 'Node.js', level: 'Chuyên sâu', isKey: true },
        { name: 'NestJS', level: 'Thành thạo', isKey: true },
        { name: 'BullMQ & Redis', level: 'Task Queue', isKey: true },
        { name: 'WebSockets (WsGateway)', level: 'Real-time' },
        { name: 'PostgreSQL', level: 'Schema / Index' },
        { name: 'RESTful APIs', level: 'Chuẩn REST' },
        { name: 'FCM Push Notifications', level: 'Tự động' },
        { name: 'Database Normalization', level: '3NF' }
      ]
    },
    {
      title: 'AI-Native & Tooling',
      subtitle: 'Quy trình Kỹ nghệ Tăng tốc bằng AI',
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      borderGlow: 'rgba(168, 85, 247, 0.4)',
      badgeColor: 'border-purple-500/30 text-purple-300 bg-purple-500/10',
      highlightNote: 'Ứng dụng Claude Code & Cursor tăng tốc 2-3x nhưng giữ kỷ luật Type-safety tuyệt đối.',
      skills: [
        { name: 'Cursor AI', level: 'Hằng ngày', isKey: true },
        { name: 'Claude Code', level: 'Architecture', isKey: true },
        { name: 'Codex / Copilot', level: 'Tăng tốc' },
        { name: 'Git / GitHub Actions', level: 'CI/CD' },
        { name: 'Docker', level: 'Container' },
        { name: 'App Store Connect', level: 'Release' },
        { name: 'Google Play Console', level: 'Release' },
        { name: 'Type-Safe Architecture', level: 'An toàn' }
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
            <span>Kỹ năng &amp; Nền tảng Công nghệ</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white">
            Technical Matrix &amp; Kiến trúc
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Tổng hợp các công nghệ cốt lõi được ứng dụng để phát triển sản phẩm chịu tải thực tế, tối ưu trải nghiệm và duy trì mã nguồn sạch.
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
