import React from 'react';
import { Download, Mail, MessageCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { CV_URL } from './Hero';

const PHONE = '0888 244 212';
const ZALO = 'https://zalo.me/0888244212';
const EMAIL = 'hoangphucplun@gmail.com';
const LINKEDIN = 'https://linkedin.com/in/phuc-luu';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <>
      <section id="contact" className="wrap pb-20 pt-4">
        <div className="rounded-[18px] border-2 border-dashed border-ink bg-paper-raised px-6 py-12 text-center md:px-12">
          <h2 className="t-h2 mx-auto max-w-[20em]">{c.heading}</h2>
          <p className="t-lead mx-auto mt-4">{c.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={ZALO} target="_blank" rel="noreferrer" className="btn btn-ink">
              <MessageCircle size={18} aria-hidden />
              {c.zalo}
            </a>
            <a href={`mailto:${EMAIL}`} className="btn">
              <Mail size={18} aria-hidden />
              {c.email}
            </a>
            <a href={CV_URL} download className="btn">
              <Download size={18} aria-hidden />
              {c.cv}
            </a>
          </div>
          <dl className="mx-auto mt-10 grid max-w-[44em] gap-4 text-[0.95rem] sm:grid-cols-3">
            <div>
              <dt className="t-small">{c.phoneLabel}</dt>
              <dd className="font-semibold"><a href="tel:0888244212">{PHONE}</a></dd>
            </div>
            <div>
              <dt className="t-small">{c.emailLabel}</dt>
              <dd className="break-all font-semibold"><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
            </div>
            <div>
              <dt className="t-small">{c.locationLabel}</dt>
              <dd className="font-semibold">{c.location}</dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className="border-t-[1.5px] border-ink">
        <svg className="block h-4 w-full text-ink-faint" viewBox="0 0 1200 16" preserveAspectRatio="none" aria-hidden>
          <path d="M0 8 Q 25 0 50 8 T 100 8 T 150 8 T 200 8 T 250 8 T 300 8 T 350 8 T 400 8 T 450 8 T 500 8 T 550 8 T 600 8 T 650 8 T 700 8 T 750 8 T 800 8 T 850 8 T 900 8 T 950 8 T 1000 8 T 1050 8 T 1100 8 T 1150 8 T 1200 8" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-ink-soft">
          <p>© {new Date().getFullYear()} {t.footer.line}</p>
          <div className="flex gap-5 font-medium">
            <a href={ZALO} target="_blank" rel="noreferrer" className="hover:text-ink">Zalo</a>
            <a href={`mailto:${EMAIL}`} className="hover:text-ink">Email</a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="hover:text-ink">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  );
};
