'use client';

import React from 'react';
import { XCircle } from 'lucide-react';
import GlassCard from './GlassCard';

export default function ProblemSection() {
  const beginnerPains = [
    {
      title: "“What Should I Even Sell?”",
      pain: "Spending weeks in analysis paralysis wondering which niche is actually profitable or trying to create an entire product from scratch.",
      solution: "Tested niche selection matrix + 500+ commercial-ready products you can adapt and launch in hours.",
    },
    {
      title: "“I Don't Know How Digital Products Work”",
      pain: "Assuming you need complex software, expensive developers, or complicated tech stacks just to deliver a file.",
      solution: "Step-by-step video blueprint showing digital product mechanics, delivery automation, and zero-code stores.",
    },
    {
      title: "“I Don't Know How to Build a High-Converting Page”",
      pain: "Staring at a blank page on Stan Store, Whop, or Gumroad with no idea how to write compelling copy or structure an offer.",
      solution: "Pre-written landing page copywriting frameworks, layout wireframes, and plug-and-play store templates.",
    },
    {
      title: "“What Kind of Content Should I Post?”",
      pain: "Wasting hours filming awkward videos or struggling to create reels that get zero reach and zero engagement.",
      solution: "10,000+ HD aesthetic & faceless reels library paired with 1,000+ viral hooks and caption scripts.",
    },
    {
      title: "“How Do I Use AI Without Getting Overwhelmed?”",
      pain: "Using basic generic prompts that generate robotic, useless text that nobody buys.",
      solution: "15,000+ pre-engineered AI prompt blueprints, custom GPT agent configurations, and automated workflows.",
    },
    {
      title: "“How Do I Get Traffic Without Paid Ads?”",
      pain: "Burning money on ads or posting into the void with zero organic views, clicks, or profile visits.",
      solution: "Proven algorithmic organic distribution playbooks that attract buyers without spending a single dollar on ads.",
    }
  ];

  return (
    <section className="relative py-20 md:py-28 border-t border-white/5 bg-dark-900/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-medium">
            <XCircle className="w-3.5 h-3.5" />
            THE BEGINNER BOTTLENECK
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Why 95% of Beginners Fail Before Their First Sale
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Most people buy a 50GB zip file of random templates, download it to their desktop, feel completely overwhelmed, and never take action. You don&apos;t need more chaotic files — you need clarity.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beginnerPains.map((item, idx) => (
            <GlassCard key={idx} className="p-6 space-y-4" glowColor="purple">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-400 font-semibold">
                  BARRIER 0{idx + 1}
                </span>
                <span className="h-6 w-6 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-xs">
                  ✕
                </span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">
                {item.title}
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/15 text-slate-300">
                  <span className="text-red-400 font-semibold block mb-0.5">The Trap:</span>
                  {item.pain}
                </div>

                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-slate-200">
                  <span className="text-emerald-400 font-semibold block mb-0.5">The System Fix:</span>
                  {item.solution}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Transition Bridge */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Transforming Chaos into a Clear Execution Pipeline
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-indigo-500 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
