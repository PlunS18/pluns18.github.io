import React, { useState } from 'react';
import { Terminal, Sparkles, CheckCircle2, Copy, Check } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const AiTerminalExperience: React.FC = () => {
  const { t, language } = useLanguage();
  const scenarios = t.aiTerminal.scenarios;
  const [selectedId, setSelectedId] = useState<string>(scenarios[0].id);
  const [copied, setCopied] = useState(false);

  const selectedScenario = scenarios.find((s) => s.id === selectedId) || scenarios[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedScenario.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-native" className="py-20 relative">
      <div className="container-max">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="neon-badge ai mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{t.aiTerminal.badge}</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white">
              {t.aiTerminal.title}
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mt-1">
              {t.aiTerminal.subtitle}
            </p>
          </div>
        </div>

        {/* Terminal Container */}
        <div className="rounded-2xl overflow-hidden border border-purple-500/30 bg-slate-950 shadow-2xl">
          
          {/* Terminal Window Header Bar */}
          <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <span className="ml-2 font-mono text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                <span>phuc-macbook-pro ~ zsh (ai-workflow)</span>
              </span>
            </div>

            {/* Scenario Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {scenarios.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedId(sc.id)}
                  className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                    selectedScenario.id === sc.id
                      ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sc.name}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-xs sm:text-sm bg-slate-950/90 text-slate-200 min-h-[220px] flex flex-col justify-between">
            
            {/* Command Line Prompt */}
            <div>
              <div className="flex items-center justify-between text-slate-400 pb-2 mb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">➜</span>
                  <span className="text-purple-400 font-semibold">~/engineering/homecheck</span>
                  <span className="text-emerald-400 font-bold">git:(main)</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  title={t.aiTerminal.copyCommand}
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t.aiTerminal.copied : (language === 'vi' ? 'Sao chép' : 'Copy')}</span>
                </button>
              </div>

              {/* Typed command */}
              <div className="text-slate-100 font-bold flex items-center gap-2 mb-4">
                <span className="text-purple-400">$</span>
                <span className="text-cyan-300">{selectedScenario.command}</span>
              </div>

              {/* Output lines */}
              <div className="space-y-2 text-slate-300">
                {selectedScenario.output.map((line, idx) => (
                  <div key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Status Indicator */}
            <div className="pt-4 mt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Claude 3.7 Sonnet &amp; Cursor Agent Active</span>
              </div>
              <div>
                <span>Type-Safe • Zero Security Leakage</span>
              </div>
            </div>

          </div>

        </div>

        {/* Advantage Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl glass-panel border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-white">
                {language === 'vi' ? 'Tăng tốc độ Phát triển 2-3x' : '2-3x Development Velocity'}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                {language === 'vi'
                  ? 'Khai thác AI để sinh cấu trúc boilerplate, tạo mock data và hỗ trợ viết unit test nhanh chóng.'
                  : 'Leveraging AI for rapid boilerplate generation, mock data, and unit test scaffolding.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl glass-panel border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-white">
                {language === 'vi' ? 'Tư duy Phản biện Khắt khe' : 'Critical Code Review & QA'}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                {language === 'vi'
                  ? 'Luôn rà soát độc lập từng dòng code, phát hiện các corner case và tối ưu thuật toán trước khi merge.'
                  : 'Always rigorously reviewing code, handling subtle edge cases and optimizing algorithmic complexity.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl glass-panel border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-white">
                {language === 'vi' ? 'Bảo mật & Type-Safety' : 'Strict Security & Type-Safety'}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                {language === 'vi'
                  ? 'Tuyệt đối không rò rỉ secret key hoặc dữ liệu nhạy cảm vào context AI, tuân thủ Clean Architecture.'
                  : 'Zero secret key or sensitive data leakage into AI context, strictly enforcing Clean Architecture.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
