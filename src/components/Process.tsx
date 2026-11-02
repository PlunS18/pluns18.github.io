import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export const Process: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="process" className="section rule-top">
      <div className="wrap">
        <h2 className="t-h2">{t.process.heading}</h2>
        <ol className="mt-12 grid gap-y-10 md:grid-cols-5 md:gap-x-6">
          {t.process.steps.map((step, i) => (
            <li key={step.title} className="relative">
              <span className="hand flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-ink bg-paper-raised text-[1.35rem]">
                {i + 1}
              </span>
              {i < t.process.steps.length - 1 && (
                <span aria-hidden className="absolute left-14 right-0 top-[22px] hidden border-t-[1.5px] border-dashed border-ink-faint md:block" />
              )}
              <h3 className="mt-4 text-[1.05rem] font-semibold">{step.title}</h3>
              <p className="t-small mt-1.5">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
