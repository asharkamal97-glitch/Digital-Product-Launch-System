'use client';

import React, { useState } from 'react';
import { BookOpen, CheckSquare, Sparkles, Layout, Video, Users, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

export default function JourneySection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps = [
    {
      id: "learn",
      stage: "STAGE 01",
      name: "LEARN",
      title: "Master Digital Product Mechanics",
      icon: BookOpen,
      tag: "Foundational Strategy",
      description: "Understand unit economics, digital distribution models, pricing psychology, and the fundamental differences between low-ticket and mid-ticket digital offers.",
      deliverables: [
        "Digital Product Economics Masterclass (Video)",
        "Offer Viability & Niche Selection Framework",
        "Beginner Tech Stack Blueprint (Stan / Whop / Gumroad)",
        "Zero-Ad-Spend Business Model Breakdown"
      ],
      outcome: "You understand exactly how digital products make sales without guessing or getting overwhelmed."
    },
    {
      id: "choose",
      stage: "STAGE 02",
      name: "CHOOSE",
      title: "Select Your High-Demand Niche & Product",
      icon: CheckSquare,
      tag: "Product Selection",
      description: "Pick a validated product category from our 500+ ready-made library or outline a custom guide using pre-validated market demand templates.",
      deliverables: [
        "High-Margin Niche Demand Matrix",
        "500+ Ready-Made Product Catalog with Commercial Rights",
        "Canva Templates & Ebook Selection Directory",
        "Competition & Audience Validation Checklist"
      ],
      outcome: "You lock in a specific, high-demand product ready to adapt for your target buyers."
    },
    {
      id: "prepare",
      stage: "STAGE 03",
      name: "PREPARE",
      title: "Rebrand & Customize Your Assets",
      icon: Sparkles,
      tag: "Asset Preparation",
      description: "Customize your chosen template in Canva in under an hour. Add your unique angle, colors, and branding using our AI prompt blueprints.",
      deliverables: [
        "1-Click Canva Template Duplication Links",
        "AI Rebranding & Tone Customization Prompts",
        "High-Resolution 3D Mockup Generator Templates",
        "Commercial License Verification Documentation"
      ],
      outcome: "You hold a polished, professional digital product ready to deliver to paying customers."
    },
    {
      id: "build",
      stage: "STAGE 04",
      name: "BUILD",
      title: "Set Up Your High-Converting Sales Page",
      icon: Layout,
      tag: "Page Architecture",
      description: "Deploy a proven, frictionless sales page structure. Use pre-tested copy frameworks and checkout configurations that maximize conversions.",
      deliverables: [
        "Plug-and-Play Sales Page Wireframes & Copy Blocks",
        "Stan Store / Whop / Gumroad Direct Setup Guide",
        "Frictionless Mobile Checkout Checklist",
        "Automated Digital File Delivery Setup"
      ],
      outcome: "Your automated sales page is live, accepts payments, and instantly delivers the files."
    },
    {
      id: "post",
      stage: "STAGE 05",
      name: "POST",
      title: "Deploy High-Retention Short-Form Content",
      icon: Video,
      tag: "Content Deployment",
      description: "Skip filming awkward videos. Select from 10,000+ ready-to-post HD reels, pair them with viral hooks, and schedule your posts effortlessly.",
      deliverables: [
        "10,000+ HD/4K Faceless & Aesthetic Video Vault",
        "1,000+ Viral Hook & Retention Script Swipe File",
        "Plug-and-Play High-Converting Captions",
        "30-Day Batch Content Calendar & Scheduler Template"
      ],
      outcome: "You maintain a consistent, high-end social media presence without spending hours filming."
    },
    {
      id: "attract",
      stage: "STAGE 06",
      name: "ATTRACT",
      title: "Capture Targeted Organic Viewers",
      icon: Users,
      tag: "Organic Traffic",
      description: "Leverage social media algorithms (Instagram Reels, TikTok, YouTube Shorts, X) to turn organic viewers into leads using free lead magnets.",
      deliverables: [
        "Comment-to-DM Freebie Funnel Automation Blueprint",
        "Algorithmic Watch-Time & Save-Trigger Frameworks",
        "Organic Profile Optimization & Bio Formulas",
        "Keyword-Driven Search Optimization Strategy"
      ],
      outcome: "Targeted prospective buyers click your profile link and enter your sales ecosystem daily."
    },
    {
      id: "sell",
      stage: "STAGE 07",
      name: "SELL",
      title: "Convert Attention Into Lifetime Customers",
      icon: ShoppingBag,
      tag: "Conversion & Scale",
      description: "Nurture prospective buyers with automated email sequences, order bumps, and clear value presentation to close sales on autopilot.",
      deliverables: [
        "7-Part Automated Email Nurture Sequence",
        "Order Bump & Upsell Conversion Triggers",
        "Abandoned Checkout Recovery Templates",
        "Customer Retention & Review Gathering Workflow"
      ],
      outcome: "A repeatable, automated digital product system that functions seamlessly 24/7."
    }
  ];

  const current = steps[activeStepIndex];

  return (
    <section id="journey" className="relative py-20 md:py-28 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-dark-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 dark:bg-indigo-500/10 border border-blue-500/20 dark:border-indigo-500/20 text-blue-600 dark:text-indigo-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            THE SYSTEM ROADMAP
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            The Complete 7-Stage Customer Journey
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            From complete beginner to launching your own branded digital product. Click through each stage to explore the exact strategy and resources included.
          </p>
        </div>

        {/* Interactive Step Bar */}
        <div className="relative mb-10 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex items-center justify-between min-w-[700px] border-b border-slate-200 dark:border-white/10 pb-6 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStepIndex === idx;
              const isPassed = activeStepIndex > idx;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className="flex flex-col items-center gap-2 group relative z-10 focus:outline-none"
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 font-mono text-xs font-bold ${
                      isActive
                        ? 'bg-blue-600 dark:bg-indigo-600 text-white shadow-md dark:shadow-glow-md ring-2 ring-blue-400 dark:ring-indigo-400 scale-110'
                        : isPassed
                        ? 'bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                        : 'bg-white dark:bg-dark-850 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 group-hover:border-blue-400 dark:group-hover:border-indigo-500/40 group-hover:text-slate-900 dark:group-hover:text-white shadow-sm dark:shadow-none'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <span
                    className={`text-[11px] font-mono tracking-wider transition-colors ${
                      isActive ? 'text-blue-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
                    }`}
                  >
                    {step.name}
                  </span>

                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute left-[calc(100%+0.5rem)] top-5 w-[calc(100%-2rem)] h-px bg-slate-200 dark:bg-white/10 -z-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Showcase Card */}
        <GlassCard className="p-6 sm:p-8 md:p-10 border-blue-500/20 dark:border-indigo-500/30" glowColor="indigo">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-blue-500/10 dark:bg-indigo-500/10 border border-blue-500/20 dark:border-indigo-500/30 text-blue-600 dark:text-indigo-400 text-xs font-mono font-bold">
                  {current.stage} • {current.name}
                </span>
                <span className="px-3 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-mono">
                  {current.tag}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {current.title}
                </h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* Deliverables List */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-semibold">
                  What You Get in This Stage:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-dark-850/80 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-200 shadow-sm dark:shadow-none"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card / Outcome Box */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-white/10 space-y-6 shadow-sm dark:shadow-none">
              <div className="space-y-3">
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-semibold">
                  Target Milestone Result
                </span>
                <p className="text-sm font-medium text-slate-900 dark:text-white leading-relaxed">
                  &ldquo;{current.outcome}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
                  className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  ← Previous Stage
                </button>

                <button
                  onClick={() => setActiveStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
