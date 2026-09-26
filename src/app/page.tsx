'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmbientGlow from '@/components/AmbientGlow';
import LegalModal from '@/components/LegalModal';

import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import JourneySection from '@/components/JourneySection';
import SystemIntroSection from '@/components/SystemIntroSection';
import ProductLibrarySection from '@/components/ProductLibrarySection';
import ShowcaseSection from '@/components/ShowcaseSection';
import ReadyMadeSection from '@/components/ReadyMadeSection';
import AiResourcesSection from '@/components/AiResourcesSection';
import TrafficSystemSection from '@/components/TrafficSystemSection';
import SellingStrategySection from '@/components/SellingStrategySection';
import ValueStackSection from '@/components/ValueStackSection';
import LaunchHubSection from '@/components/LaunchHubSection';
import FaqSection from '@/components/FaqSection';
import FinalCtaSection from '@/components/FinalCtaSection';

export default function HomePage() {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms' | 'refund' | 'license' | 'disclaimer' | 'contact'>('privacy');

  const handleOpenLegal = (tab: 'privacy' | 'terms' | 'refund' | 'license' | 'disclaimer' | 'contact' = 'privacy') => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600/20 dark:selection:bg-indigo-600/40 selection:text-slate-900 dark:selection:text-white transition-colors duration-200">
      {/* Background ambient lighting effects */}
      <AmbientGlow />

      {/* Main Header / Navigation */}
      <Navbar onOpenLegal={handleOpenLegal} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Problem / Beginner Bottlenecks */}
        <ProblemSection />

        {/* 3. 7-Step Digital Product Launch Roadmap (LEARN → SELL) */}
        <JourneySection />

        {/* 4. Introduce the system ("We don't just give you files...") */}
        <SystemIntroSection />

        {/* 5. Show the actual product library (AI Agents, Courses, Products, Ebooks) */}
        <ProductLibrarySection />

        {/* 6. Real product showcase/mockup inspector */}
        <ShowcaseSection />

        {/* 7. Ready-made digital products & commercial licensing */}
        <ReadyMadeSection />

        {/* 8. AI resources (15K+ agents, custom GPTs, prompts) */}
        <AiResourcesSection />

        {/* 9. Traffic system (Zero ad spend organic distribution) */}
        <TrafficSystemSection />

        {/* 10. Selling strategy (PRODUCT → CHECKOUT pipeline) */}
        <SellingStrategySection />

        {/* 11. Full contents / value stack section */}
        <ValueStackSection />

        {/* 12. Google Drive "Launch Hub" Experience (00 to 08) */}
        <LaunchHubSection />

        {/* 13. FAQ */}
        <FaqSection />

        {/* 14. Final CTA */}
        <FinalCtaSection />
      </main>

      {/* Footer */}
      <Footer onOpenLegal={handleOpenLegal} />

      {/* Legal & Compliance Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalTab}
      />
    </div>
  );
}
