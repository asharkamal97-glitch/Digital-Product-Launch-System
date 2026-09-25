'use client';

import React, { useState } from 'react';
import { Package, Layout, Video, Users, Gift, CreditCard } from 'lucide-react';
import GlassCard from './GlassCard';

export default function SellingStrategySection() {
  const [activePipelineIndex, setActivePipelineIndex] = useState(0);

  const pipelineStages = [
    {
      id: "product",
      num: "01",
      name: "PRODUCT",
      icon: Package,
      headline: "Validated, High-Utility Asset",
      description: "A specific solution that solves a painful problem or saves the customer 10+ hours. Pre-packaged into editable Canva, template, or PDF formats.",
      keyRule: "Never build something nobody is already searching for.",
    },
    {
      id: "page",
      num: "02",
      name: "PAGE",
      icon: Layout,
      headline: "Frictionless Sales Architecture",
      description: "A fast-loading, mobile-first sales page that clearly states the transformation, lists tangible deliverables, and removes buying friction.",
      keyRule: "Clear beats clever. State the exact outcome in the top 3 seconds.",
    },
    {
      id: "content",
      num: "03",
      name: "CONTENT",
      icon: Video,
      headline: "Scroll-Stopping Short Form",
      description: "High-retention aesthetic and faceless vertical reels paired with targeted 3-second hooks that speak directly to your target audience.",
      keyRule: "Retention is king. Hook them immediately and deliver high-density value.",
    },
    {
      id: "traffic",
      num: "04",
      name: "TRAFFIC",
      icon: Users,
      headline: "Organic Algorithm Funnel",
      description: "Viewers who watch your reels click your profile link or comment a trigger keyword to receive an automated free starter guide in their DMs.",
      keyRule: "Never ask for the sale in the first 5 seconds; build curiosity first.",
    },
    {
      id: "offer",
      num: "05",
      name: "OFFER",
      icon: Gift,
      headline: "Irresistible Value Stack",
      description: "Combine the core product with complementary bonuses, templates, and email nurture sequences that make the decision a no-brainer.",
      keyRule: "Make the perceived value 5x higher than the asking price.",
    },
    {
      id: "checkout",
      num: "06",
      name: "CHECKOUT",
      icon: CreditCard,
      headline: "Automated Instant Delivery",
      description: "Secure payment gateway with 1-click Apple Pay/Google Pay/Card checkout, followed by immediate Google Drive and email access.",
      keyRule: "Every extra form field drops conversion by 10%. Keep checkout fast.",
    }
  ];

  const currentStage = pipelineStages[activePipelineIndex];

  return (
    <section id="selling" className="relative py-20 md:py-28 border-t border-white/5 bg-dark-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium">
            <CreditCard className="w-3.5 h-3.5" />
            CONVERSION ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            The 6-Part Selling Pipeline
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Selling digital products is not luck. It is an engineered 6-stage pipeline that systematically guides a stranger from scrolling on social media to completing checkout.
          </p>
        </div>

        {/* Pipeline Stepper Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {pipelineStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = activePipelineIndex === idx;

            return (
              <button
                key={stage.id}
                onClick={() => setActivePipelineIndex(idx)}
                className={`p-4 rounded-xl text-left transition-all duration-300 relative ${
                  isActive
                    ? 'bg-indigo-600/20 border border-indigo-500 text-white shadow-glow-sm scale-[1.03]'
                    : 'bg-dark-850/80 border border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-indigo-400">{stage.num}</span>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold font-mono tracking-wider">{stage.name}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <GlassCard className="p-6 sm:p-8 border-indigo-500/30 max-w-4xl mx-auto" glowColor="indigo">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                {React.createElement(currentStage.icon, { className: "w-5 h-5" })}
              </div>
              <div>
                <span className="text-[11px] font-mono text-indigo-400">STAGE {currentStage.num} OF 06</span>
                <h3 className="text-lg font-bold text-white">{currentStage.headline}</h3>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              Pipeline Component: {currentStage.name}
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {currentStage.description}
          </p>

          <div className="mt-4 p-3.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 flex items-center gap-2">
            <span className="font-mono font-bold text-indigo-400 uppercase">Core Principle:</span>
            <span>{currentStage.keyRule}</span>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
