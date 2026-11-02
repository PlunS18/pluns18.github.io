import { useEffect, useState } from 'react';

// Hash routing keeps the site a static bundle that works on GitHub Pages / Vercel
// without rewrite rules. "#/projects/<slug>" is a detail page; any other hash is a
// section id on the home page.
export type Route = { name: 'home'; section?: string } | { name: 'project'; slug: string };

const PROJECT_PREFIX = '/projects/';

const parse = (): Route => {
  const hash = window.location.hash.replace(/^#/, '');
  if (hash.startsWith(PROJECT_PREFIX)) {
    return { name: 'project', slug: decodeURIComponent(hash.slice(PROJECT_PREFIX.length)) };
  }
  return { name: 'home', section: hash || undefined };
};

export const projectHref = (slug: string) => `#${PROJECT_PREFIX}${slug}`;

export const useRoute = (): Route => {
  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
};
