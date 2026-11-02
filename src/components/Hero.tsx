import React, { useEffect, useRef, useState } from 'react';
import { Download } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { PlanModel } from './PlanModel';

export const CV_URL = './Luu_Truong_Hoang_Phuc_Portfolio.pdf';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const m = t.hero.model;
  const [mode, setMode] = useState<'plan' | '3d'>('plan');
  const touched = useRef(false);

  // The page's one orchestrated moment: the plan rises into 3D shortly after load.
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!touched.current) setMode('3d');
    }, 900);
    return () => window.clearTimeout(id);
  }, []);

  const choose = (next: 'plan' | '3d') => {
    touched.current = true;
    setMode(next);
  };

  return (
    <section id="top" className="wrap grid items-center gap-12 pb-16 pt-12 md:pt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:pb-24">
      <div>
        <p className="hand text-[1.6rem] text-pen">{t.hero.hello}</p>
        <h1 className="t-display mt-3">
          <span className="marker">{t.hero.role}</span>
        </h1>
        <p className="mt-5 max-w-[26em] text-[1.4rem] font-semibold leading-snug tracking-[-0.01em]">
          {t.hero.headline}
        </p>
        <p className="t-lead mt-5">{t.hero.lead}</p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#projects" className="btn btn-ink">{t.hero.ctaWork}</a>
          <a href={CV_URL} download className="btn">
            <Download size={18} strokeWidth={2} aria-hidden />
            {t.hero.ctaCv}
          </a>
        </div>

        <p className="hand mt-8 inline-block border-b-2 border-dashed border-pen pb-0.5 text-[1.15rem] text-ink-soft">
          {t.hero.available}
        </p>
      </div>

      {/* Drafting sheet holding the live model */}
      <figure className="relative aspect-[1/1.08] w-full overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-paper-raised shadow-[5px_5px_0_#1a2233]">
        <PlanModel mode={mode} roomLabels={m.rooms} decimal={m.decimal} ariaLabel={m.label} />

        <div className="absolute left-4 top-4 flex rounded-full border-[1.5px] border-ink bg-paper-raised p-1 text-sm font-semibold" role="group">
          {(['plan', '3d'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => choose(key)}
              aria-pressed={mode === key}
              className={`min-w-[64px] rounded-full px-3 py-1.5 transition-colors ${mode === key ? 'bg-ink text-paper-raised' : 'text-ink-soft hover:text-ink'}`}
            >
              {key === 'plan' ? m.plan : m.model3d}
            </button>
          ))}
        </div>

        <div className="pointer-events-none absolute right-5 top-4 hidden items-start gap-1 text-pen sm:flex" aria-hidden>
          <span className="hand mt-5 text-[1.15rem]">{m.hint}</span>
          <svg width="46" height="40" viewBox="0 0 46 40" fill="none">
            <path d="M6 30 C 10 10, 30 4, 40 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M34 15 L 40 16 L 41 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Title block, as on a real drawing sheet */}
        <figcaption className="pointer-events-none absolute bottom-0 right-0 grid grid-cols-[auto_auto] border-l-[1.5px] border-t-[1.5px] border-ink bg-paper-raised text-[0.66rem] leading-tight sm:text-[0.78rem]">
          <span className="border-b border-r border-ink px-3 py-1.5 font-semibold">HomeCheck</span>
          <span className="border-b border-ink px-3 py-1.5">{m.sheetTitle}</span>
          <span className="border-r border-ink px-3 py-1.5 text-ink-soft">{m.sheetScale}</span>
          <span className="px-3 py-1.5 text-ink-soft">{m.sheetBy}</span>
        </figcaption>
      </figure>
    </section>
  );
};
