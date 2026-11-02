import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export const Facts: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section aria-label="Facts" className="border-y-[1.5px] border-ink bg-paper-raised">
      <dl className="wrap grid grid-cols-2 gap-x-6 gap-y-8 py-9 md:grid-cols-4">
        {t.facts.map((f) => (
          <div key={f.value} className="flex flex-col">
            <dt className="text-[1.6rem] font-bold leading-tight tracking-[-0.02em]">{f.value}</dt>
            <dd className="t-small mb-2.5 mt-1">{f.label}</dd>
            <div className="dim mt-auto" aria-hidden />
          </div>
        ))}
      </dl>
    </section>
  );
};
