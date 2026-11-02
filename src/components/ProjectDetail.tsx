import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { projectHref } from '../router';
import { ProjectCover } from './ProjectCover';

export const ProjectDetail: React.FC<{ slug: string }> = ({ slug }) => {
  const { t } = useLanguage();
  const L = t.projects.labels;
  const index = t.projectList.findIndex((p) => p.slug === slug);
  const project = t.projectList[index];

  if (!project) {
    return (
      <section className="wrap section">
        <p className="t-lead">{t.projects.notFound}</p>
        <a href="#projects" className="btn mt-6">{t.projects.back}</a>
      </section>
    );
  }

  const next = t.projectList[(index + 1) % t.projectList.length];
  const meta = [
    { label: L.role, value: project.role },
    { label: L.period, value: `${project.company}, ${project.period}` },
    { label: L.platforms, value: project.platforms },
    { label: L.status, value: project.status },
  ];

  return (
    <article className="pb-20">
      <header className="wrap pt-10 md:pt-14">
        <a href="#projects" className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-ink-soft hover:text-ink">
          <ArrowLeft size={18} aria-hidden />
          {t.projects.back}
        </a>

        <p className="hand mt-8 text-[1.35rem] text-pen">{project.company}</p>
        <h1 className="t-display mt-2 max-w-[18em]">{project.name}</h1>
        <p className="t-lead mt-5 max-w-[38em]">{project.tagline}</p>

        {/* Facts laid out like a drawing's title block */}
        <dl className="mt-10 grid overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-paper-raised sm:grid-cols-2 lg:grid-cols-4">
          {meta.map((m, i) => (
            <div
              key={m.label}
              className={`px-5 py-4 ${i > 0 ? 'border-t border-ink/25 sm:border-t-0' : ''} ${i % 2 === 1 ? 'sm:border-l sm:border-ink/25' : ''} ${i > 1 ? 'sm:border-t sm:border-ink/25 lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l lg:border-ink/25' : ''}`}
            >
              <dt className="t-small">{m.label}</dt>
              <dd className="mt-0.5 font-semibold">{m.value}</dd>
            </div>
          ))}
        </dl>

        {project.links.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-3">
            {project.links.map((l, i) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={`btn btn-sm ${i === 0 ? 'btn-ink' : ''}`}>
                {l.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {project.screens.length > 0 ? (
        <section className="wrap mt-14" aria-label={L.screens}>
          <div className="strip">
            {project.screens.map((s) => (
              <figure key={s.src} className="m-0">
                <div className="phone">
                  <img src={s.src} alt={s.caption} loading="lazy" width={780} height={1696} />
                </div>
                <figcaption className="hand mt-3 text-center text-[1.05rem] leading-snug text-ink-soft">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : (
        <div className="wrap mt-14">
          <ProjectCover project={project} className="h-[200px] rounded-[16px] border-[1.5px] border-ink md:h-[240px]" />
        </div>
      )}

      <div className="wrap mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <section>
          <h2 className="t-h3">{L.context}</h2>
          <p className="mt-3 text-[1.02rem] text-ink-soft">{project.context}</p>

          <h2 className="t-h3 mt-10">{L.stack}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="chip">{s}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="t-h3">{L.work}</h2>
          <div className="mt-5 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {project.work.map((w) => (
              <div key={w.title} className="border-l-[3px] border-pen pl-5">
                <h3 className="text-[1.02rem] font-semibold">{w.title}</h3>
                <p className="t-small mt-1.5 text-[0.95rem] leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {project.flow && (
        <section className="wrap mt-16">
          <h2 className="t-h3">{project.flow.heading}</h2>
          <ol className="mt-6 flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
            {project.flow.steps.map((step, i) => (
              <li key={step} className="flex items-center md:flex-1 md:flex-col md:items-stretch">
                <div className="flex w-full items-center md:flex-row">
                  <span className="flex min-h-[64px] w-full items-center gap-3 rounded-[12px] border-[1.5px] border-ink bg-paper-raised px-4 py-3 text-[0.92rem] font-medium">
                    <span className="hand text-[1.2rem] text-pen">{i + 1}</span>
                    {step}
                  </span>
                  {i < project.flow!.steps.length - 1 && (
                    <svg className="mx-1 hidden h-4 w-6 shrink-0 text-ink md:block" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                      <path d="M2 8 H21 M16 3 L21 8 L16 13" />
                    </svg>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {project.slug === 'homecheck-backend' && (
        <section className="wrap mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h2 className="t-h3">{L.system}</h2>
            <p className="hand text-[1.05rem] text-ink-soft">{L.systemNote}</p>
          </div>
          <div className="mt-5 overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-paper-raised">
            <table className="w-full border-collapse text-left text-[0.95rem]">
              <tbody>
                {t.system.map((row) => (
                  <tr key={row.name} className="border-b border-ink/20 last:border-b-0 max-md:flex max-md:flex-col max-md:py-3">
                    <th scope="row" className="whitespace-nowrap px-5 py-3 align-top font-semibold max-md:pb-0">{row.name}</th>
                    <td className="px-5 py-3 align-top text-ink-soft max-md:py-1">{row.does}</td>
                    <td className="px-5 py-3 align-top text-[0.85rem] text-pen max-md:pt-0">{row.stack}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <nav className="wrap mt-20" aria-label={t.projects.next}>
        <a
          href={projectHref(next.slug)}
          className="group flex flex-wrap items-center justify-between gap-4 rounded-[16px] border-2 border-dashed border-ink bg-paper-raised px-6 py-7 text-ink no-underline md:px-9"
        >
          <span>
            <span className="t-small block">{t.projects.next}</span>
            <span className="t-h2 mt-1 block">{next.name}</span>
          </span>
          <span className="hand text-[1.2rem] text-pen group-hover:underline">{t.projects.open}</span>
        </a>
      </nav>
    </article>
  );
};
