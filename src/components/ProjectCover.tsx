import React from 'react';
import type { Project, Sketch } from '../content';

// Ink sketches for projects that have no screenshots
const SKETCHES: Record<Sketch, React.ReactNode> = {
  tree: (
    <>
      <rect x="135" y="22" width="50" height="26" rx="6" />
      <path d="M160 48 V62 M90 62 H230 M90 62 V76 M230 62 V76" />
      <rect x="65" y="76" width="50" height="26" rx="6" />
      <rect x="205" y="76" width="50" height="26" rx="6" />
      <path d="M90 102 V116 M50 116 H130 M50 116 V130 M130 116 V130 M230 102 V130" />
      <rect x="25" y="130" width="50" height="26" rx="6" />
      <rect x="105" y="130" width="50" height="26" rx="6" />
      <rect x="205" y="130" width="50" height="26" rx="6" />
    </>
  ),
  queue: (
    <>
      <rect x="18" y="74" width="62" height="44" rx="8" />
      <path d="M80 96 H108 M102 90 l6 6 -6 6" />
      <rect x="110" y="66" width="22" height="60" rx="4" />
      <rect x="136" y="66" width="22" height="60" rx="4" />
      <rect x="162" y="66" width="22" height="60" rx="4" strokeDasharray="4 4" />
      <path d="M186 96 H212 M206 90 l6 6 -6 6" />
      <circle cx="244" cy="96" r="28" />
      <path d="M244 80 V96 L254 104" />
      <path d="M272 96 H292 M286 90 l6 6 -6 6" />
      <path d="M296 84 a8 8 0 0 1 16 0 v12 l4 6 h-24 l4 -6 z M300 108 a4 4 0 0 0 8 0" />
    </>
  ),
  browser: (
    <>
      <rect x="30" y="22" width="260" height="156" rx="10" />
      <path d="M30 46 H290" />
      <circle cx="46" cy="34" r="3.5" />
      <circle cx="58" cy="34" r="3.5" />
      <circle cx="70" cy="34" r="3.5" />
      <path d="M92 46 V178" />
      <path d="M44 62 H78 M44 76 H72 M44 90 H76 M44 104 H70" />
      <path d="M106 62 H276 M106 84 H276 M106 106 H276 M106 128 H276 M106 150 H276" strokeOpacity="0.55" />
      <path d="M150 62 V164 M210 62 V164" strokeOpacity="0.55" />
    </>
  ),
  form: (
    <>
      <rect x="30" y="22" width="260" height="156" rx="10" />
      <path d="M30 46 H290" />
      <rect x="52" y="62" width="216" height="20" rx="5" />
      <rect x="52" y="92" width="150" height="20" rx="5" />
      <rect x="52" y="122" width="100" height="20" rx="5" />
      <rect x="218" y="124" width="34" height="16" rx="8" />
      <circle cx="244" cy="132" r="6" />
      <path d="M52 158 H120" strokeWidth="5" />
      <path d="M212 98 l6 6 12 -12" />
    </>
  ),
};

export const ProjectCover: React.FC<{ project: Project; className?: string }> = ({ project, className = '' }) => {
  const phones = project.screens.slice(0, 3);

  return (
    <div className={`sheet relative overflow-hidden ${className}`} aria-hidden>
      {phones.length > 0 ? (
        <div className="absolute inset-x-0 top-6 flex justify-center">
          {phones.map((s, i) => (
            <div
              key={s.src}
              className="phone w-[30%] max-w-[150px] shrink-0"
              style={{
                transform: `rotate(${(i - (phones.length - 1) / 2) * 6}deg) translateY(${i === 1 ? 0 : 14}px)`,
                marginLeft: i ? '-6%' : 0,
                zIndex: i === 1 ? 2 : 1,
              }}
            >
              <img src={s.src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      ) : (
        <svg
          viewBox="0 0 320 200"
          className="absolute inset-0 m-auto h-[78%] w-[86%] text-pen"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {project.sketch && SKETCHES[project.sketch]}
        </svg>
      )}
    </div>
  );
};
