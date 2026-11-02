import React from 'react';
import type { Project } from '../content';
import { useLanguage } from '../hooks/useLanguage';
import { projectHref } from '../router';
import { ProjectCover } from './ProjectCover';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [featured, ...rest] = t.projectList;

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <h2 className="t-h2">{t.projects.heading}</h2>
        <p className="t-lead mt-3">{t.projects.intro}</p>

        <div className="mt-10 grid gap-7 md:grid-cols-2">
          {/* The flagship project gets a wide card with the cover beside the text */}
          <a
            href={projectHref(featured.slug)}
            className="group grid overflow-hidden rounded-[16px] border-[1.5px] border-ink bg-paper-raised text-ink no-underline shadow-[4px_4px_0_#1a2233] transition-transform hover:-translate-x-px hover:-translate-y-px md:col-span-2 md:grid-cols-[1.1fr_1fr]"
          >
            <ProjectCover project={featured} className="h-[300px] border-b-[1.5px] border-ink md:h-full md:min-h-[340px] md:border-b-0 md:border-r-[1.5px]" />
            <CardBody project={featured} open={t.projects.open} large />
          </a>

          {rest.map((p) => (
            <a
              key={p.slug}
              href={projectHref(p.slug)}
              className="group flex flex-col overflow-hidden rounded-[16px] border-[1.5px] border-ink bg-paper-raised text-ink no-underline shadow-[4px_4px_0_#1a2233] transition-transform hover:-translate-x-px hover:-translate-y-px"
            >
              <ProjectCover project={p} className="h-[220px] border-b-[1.5px] border-ink" />
              <CardBody project={p} open={t.projects.open} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const CardBody: React.FC<{ project: Project; open: string; large?: boolean }> = ({ project, open, large }) => (
  <div className={`flex flex-1 flex-col ${large ? 'p-7 md:p-9' : 'p-6'}`}>
    <p className="t-small">
      {project.company}, {project.period}
    </p>
    <h3 className={`${large ? 't-h2' : 't-h3'} mt-1.5`}>{project.name}</h3>
    <p className={`mt-2.5 text-ink-soft ${large ? 'text-[1.05rem]' : 'text-[0.95rem]'}`}>{project.tagline}</p>
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {project.stack.slice(0, large ? 6 : 4).map((s) => (
        <li key={s} className="chip">{s}</li>
      ))}
    </ul>
    <span className="hand mt-auto pt-5 text-[1.15rem] text-pen group-hover:underline">{open}</span>
  </div>
);
