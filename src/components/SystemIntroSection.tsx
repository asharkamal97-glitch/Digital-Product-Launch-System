'use client';

import React from 'react';
import { Brain, Cpu, Rocket, Target, ArrowRight } from 'lucide-react';
import GlassCard from './GlassCard';

export default function SystemIntroSection() {
  const pillars = [
    {
      icon: Brain,
      title: "Strategic Education",
      subtitle: "The Business Blueprint",
      description: "Learn digital product economics, pricing science, niche validation, and customer psychology so you build something people genuinely want.",
      color: "indigo",
    },
    {
      icon: Cpu,
      title: "Ready-Made Assets",
      subtitle: "Commercial-Ready Products",
      description: "Skip months of product creation with 500+ customizable Canva templates, digital planners, and workbooks ready to adapt.",
      color: "cyan",
    },
    {
      icon: Rocket,
      title: "AI Leverage & Agents",
      subtitle: "10x Output Multiplier",
      description: "15,000+ AI prompt blueprints, custom GPT workflows, and automation templates to write copy, create scripts, and handle customer flows.",
      color: "purple",
    },
    {
      icon: Target,
      title: "Organic Traffic Engine",
      subtitle: "Zero Ad Spend Distribution",
      description: "10,000+ high-retention reels, viral hook formulas, and DM automation blueprints designed to pull targeted buyers directly to your page.",
      color: "emerald",
    }
  ];

  return (
    <section className="relative py-20 md:py-28 border-t border-white/5 bg-dark-900/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Quote Banner */}
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-br from-indigo-950/60 via-dark-850 to-purple-950/40 border border-indigo-500/20 shadow-2xl mb-20 text-center overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase font-semibold">
              OUR CORE PHILOSOPHY
            </span>
            <blockquote className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
              &ldquo;We don&apos;t just give you files.{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                We teach you what to do with them.
              </span>&rdquo;
            </blockquote>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
              The Digital Product Launch System bridges the gap between having raw digital resources and possessing the exact strategic roadmap to package, distribute, and monetize them ethically.
            </p>
          </div>
        </div>

        {/* 4 Architecture Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <GlassCard
                key={idx}
                className="p-6 space-y-4"
                glowColor={item.color as any}
              >
                <div className="h-12 w-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-indigo-400">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    {item.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </GlassCard>
            );
          })}
        </div>

        {/* Quick Transition CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-dark-850 border border-white/10 gap-4">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-white">
              Ready to see the entire product library?
            </h4>
            <p className="text-xs text-slate-400">
              Browse the exact counts, modules, and Google Drive breakdown.
            </p>
          </div>

          <a
            href="#pillars"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white border border-white/10 transition-colors"
          >
            <span>Explore Product Library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
