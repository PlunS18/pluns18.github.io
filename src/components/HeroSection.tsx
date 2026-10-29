import React from 'react';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';
import { ArrowRight, Sparkles, Smartphone, Globe, Terminal, FileDown, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const HeroSection: React.FC = () => {
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
            <div className="flex flex-wrap items-center gap-2">
              <div className="neon-badge live">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Sẵn sàng nhận việc Middle Level</span>
              </div>
              <div className="neon-badge ai">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>AI-Native Engineering (Cursor, Claude)</span>
              </div>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white leading-tight shiny-text">
                Lưu Trương Hoàng Phúc
              </h1>
              <p className="font-heading font-bold text-lg sm:text-xl md:text-2xl cyber-gradient mt-1">
                Middle Mobile &amp; Web Developer
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Hơn <strong className="text-cyan-400">3 năm kinh nghiệm thực chiến</strong> làm chủ hệ sinh thái đa nền tảng: <strong className="text-white">React Native (iOS &amp; Android)</strong>, <strong className="text-white">Next.js 14 / React</strong>, và <strong className="text-white">Three.js WebGL</strong>.
              <br /><br />
              Đã trực tiếp kiến trúc và phát hành 2 ứng dụng production lên <strong>App Store &amp; Google Play</strong>. Chủ động ứng dụng sâu các công cụ AI (Claude Code, Cursor) để tăng tốc độ phát triển gấp 2-3 lần với tiêu chuẩn Type-safety và bảo mật khắt khe.
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-2 gap-3 py-1">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>React Native • Expo • Hermes 60FPS</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Next.js 14 App Router • Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Offline-First (SQLite/MMKV) • Sync Engine</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Three.js 3D WebGL • Canvas 2D CAD</span>
              </div>
            </div>

            {/* Call To Action Group */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <span>Xem Dự án Thực chiến</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="./Luu_Truong_Hoang_Phuc_Portfolio.pdf"
                download="Luu_Truong_Hoang_Phuc_Portfolio.pdf"
                onClick={triggerConfetti}
                className="px-5 py-3 rounded-xl glass-panel border-slate-700/80 hover:border-cyan-400/50 text-slate-200 font-semibold text-sm flex items-center gap-2 transition-all hover:bg-slate-900"
              >
                <FileDown className="w-4 h-4 text-cyan-400" />
                <span>Tải Portfolio PDF (1.66MB)</span>
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
