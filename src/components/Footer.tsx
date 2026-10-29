import React from 'react';
import { ArrowUp, Heart, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md text-xs text-slate-400">
      <div className="container-max flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand info */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="font-heading font-extrabold text-sm text-white flex items-center gap-2">
            <span>Lưu Trương Hoàng Phúc</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              2026
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Middle Mobile &amp; Web Developer • Tối ưu 60FPS • AI-Native Workflow
          </p>
        </div>

        {/* Design references */}
        <div className="text-center text-[11px] text-slate-500 flex flex-wrap items-center justify-center gap-2">
          <span>Xây dựng bằng ReactJS, Three.js WebGL &amp; TypeScript.</span>
          <span className="hidden md:inline">•</span>
          <span>Cảm hứng từ UI/UX Pro Max &amp; React Bits.</span>
        </div>

        {/* Back to top */}
        <div>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5 font-semibold text-xs"
            title="Lên đầu trang"
          >
            <span>Lên đầu</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
