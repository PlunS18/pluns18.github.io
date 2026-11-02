import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { projectHref } from '../router';

export const Experience: React.FC = () => {
  const { t } = useLanguage();
  const e = t.experience;
  const nameOf = (slug: string) => t.projectList.find((p) => p.slug === slug)?.name ?? slug;

  return (
    <section id="experience" className="section rule-top">
      <div className="wrap">
        <h2 className="t-h2">{e.heading}</h2>

        <ol className="mt-10 border-l-[1.5px] border-ink">
          {e.jobs.map((job) => (
            <li key={job.company} className="relative pb-10 pl-7 last:pb-2 md:grid md:grid-cols-[200px_1fr] md:gap-10 md:pl-10">
              <span aria-hidden className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-[1.5px] border-ink bg-marker" />
              <p className="t-small font-medium text-ink">{job.period}</p>
              <div>
                <h3 className="t-h3 mt-1 md:mt-0">
                  {job.role}, {job.company}
                </h3>
                <p className="mt-2 max-w-[40em] text-ink-soft">{job.summary}</p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                  {job.projects.map((slug) => (
                    <li key={slug}>
                      <a href={projectHref(slug)} className="link-pen text-[0.95rem]">{nameOf(slug)}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-1 rounded-[14px] border-[1.5px] border-dashed border-ink-faint px-6 py-4">
          <span className="hand text-[1.15rem] text-pen">{e.educationLabel}</span>
          <span className="font-semibold">{e.education.degree}</span>
          <span className="text-ink-soft">{e.education.school}</span>
          <span className="t-small">{e.education.period}</span>
        </div>
      </div>
    </section>
  );
};
