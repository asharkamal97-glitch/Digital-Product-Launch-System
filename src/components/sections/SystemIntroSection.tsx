'use client';

import React from 'react';
import { Brain, Cpu, Rocket, Target, ArrowRight } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

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
      description: "15,000+ AI prompt blueprints, custom GPT workflows, and automation templates to write copy, create content, and handle customer flows.",
      color: "purple",
    },
    {
      icon: Target,
      title: "Organic Traffic Engine",
      subtitle: "Zero Ad Spend Distribution",
      description: "High-retention hook formulas, caption copywriting frameworks, and organic distribution playbooks designed to pull targeted buyers to your page.",
      color: "emerald",
    }
  ];

  return (
    <section className="relative py-20 md:py-28 border-t border-slate-200 dark:border-white/5 bg-slate-100/60 dark:bg-dark-900/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Quote Banner */}
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-indigo-950/60 dark:via-dark-850 dark:to-purple-950/40 border border-slate-200 dark:border-indigo-500/20 shadow-lg dark:shadow-2xl mb-20 text-center overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-blue-500/10 dark:bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono text-blue-600 dark:text-indigo-400 tracking-widest uppercase font-semibold">
              OUR CORE PHILOSOPHY
            </span>
            <blockquote className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight font-display">
              &ldquo;We don&apos;t just give you files.{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-300 dark:to-cyan-400 bg-clip-text text-transparent">
                We teach you what to do with them.
              </span>&rdquo;
            </blockquote>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
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
                <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-indigo-400">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    {item.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </GlassCard>
            );
          })}
        </div>

        {/* Quick Transition CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-white dark:bg-dark-850 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none gap-4">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Ready to see the entire product library?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Browse the exact counts, modules, and Google Drive breakdown.
            </p>
          </div>

          <a
            href="#pillars"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/15 text-xs font-semibold text-white border border-slate-800 dark:border-white/10 transition-colors shadow-sm"
          >
            <span>Explore Product Library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
