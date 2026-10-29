import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MetricsBar } from './components/MetricsBar';
import { ProjectsSection } from './components/ProjectsSection';
import { TechMatrixBento } from './components/TechMatrixBento';
import { AiTerminalExperience } from './components/AiTerminalExperience';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-white">
      {/* Floating Glassmorphic Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Interactive 3D Smartphone Device */}
        <HeroSection />

        {/* 4-Card Bento Metrics */}
        <MetricsBar />

        {/* Flagship Projects & 3D Interactive Engine */}
        <ProjectsSection />

        {/* Technical Matrix Spotlight Bento Grid */}
        <TechMatrixBento />

        {/* AI-Native Engineering Terminal Simulation */}
        <AiTerminalExperience />

        {/* Direct Contact & PDF Download Hub */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
