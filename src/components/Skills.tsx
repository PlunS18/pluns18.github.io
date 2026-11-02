import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export const Skills: React.FC = () => {
  const { t } = useLanguage();
  const s = t.skills;

  return (
    <section id="skills" className="section rule-top bg-paper-raised/70">
      <div className="wrap">
        <h2 className="t-h2">{s.heading}</h2>
        <p className="t-lead mt-3">{s.intro}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {s.groups.map((g) => (
            <article key={g.title} className="rounded-[14px] border-[1.5px] border-ink bg-paper-raised p-6 shadow-[3px_3px_0_#1a2233]">
              <h3 className="t-h3">{g.title}</h3>
              <dl className="mt-4 space-y-4 text-[0.95rem]">
                <div>
                  <dt className="font-semibold">{s.groupsLabel.tools}</dt>
                  <dd className="mt-1 text-ink-soft">{g.tools}</dd>
                </div>
                <div>
                  <dt className="font-semibold">{s.groupsLabel.usedIn}</dt>
                  <dd className="mt-1 text-ink-soft">{g.usedIn}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <div className="mt-8 max-w-[46em] rounded-[14px] border-[1.5px] border-dashed border-pen px-6 py-5">
          <h3 className="hand text-[1.35rem] text-pen">{s.aiTitle}</h3>
          <p className="mt-1 text-[0.98rem] text-ink-soft">{s.aiBody}</p>
        </div>
      </div>
    </section>
  );
};
