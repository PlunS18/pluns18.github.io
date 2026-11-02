import React, { useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { useRoute } from './router';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Facts } from './components/Facts';
import { Projects } from './components/Projects';
import { ProjectDetail } from './components/ProjectDetail';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Process } from './components/Process';
import { Contact } from './components/Contact';

// Home flow: who I am → numbers → projects → experience → skills → how I work → contact.
// A project link swaps the main area for that project's detail page.
export const App: React.FC = () => {
  const route = useRoute();
  const slug = route.name === 'project' ? route.slug : undefined;
  const section = route.name === 'home' ? route.section : undefined;

  useEffect(() => {
    if (slug) {
      window.scrollTo(0, 0);
    } else if (section) {
      // Coming back from a detail page the section only exists after this render
      document.getElementById(section)?.scrollIntoView();
    }
  }, [slug, section]);

  return (
    <LanguageProvider>
      <Header />
      <main>
        {route.name === 'project' ? (
          <ProjectDetail slug={route.slug} />
        ) : (
          <>
            <Hero />
            <Facts />
            <Projects />
            <Experience />
            <Skills />
            <Process />
          </>
        )}
        <Contact />
      </main>
    </LanguageProvider>
  );
};

export default App;
