'use client';

import React from 'react';
import { Film, Zap, Calendar, MessageSquare } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

export default function ContentLibrarySection() {
  const contentHighlights = [
    {
      title: "10,000+ HD/4K Short-Form Clips",
      desc: "Curated aesthetic, luxury, cyberpunk, nature, and faceless lifestyle clips optimized for vertical 9:16 mobile feeds.",
      icon: Film,
    },
    {
      title: "1,000+ Viral Hook Swipe Files",
      desc: "High-retention 3-second opening lines engineered to stop the scroll on Instagram Reels, TikTok, and YouTube Shorts.",
      icon: Zap,
    },
    {
      title: "High-Converting Caption Scripts",
      desc: "Pre-written captions structured with the PAS (Problem-Agitate-Solve) formula with clear call-to-action triggers.",
      icon: MessageSquare,
    },
    {
      title: "30-Day Batch Posting Calendar",
      desc: "A systematic posting schedule blueprint that removes daily stress and organizes high-impact content in advance.",
      icon: Calendar,
    }
  ];

  return (
    <section className="relative py-20 md:py-28 border-t border-slate-200 dark:border-white/5 bg-slate-100/60 dark:bg-dark-900/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-medium">
            <Film className="w-3.5 h-3.5" />
            CONTENT ENGINE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            10,000+ Ready-to-Post Reels & Viral Content Vault
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Never sit in front of a camera wondering what to film. Plug into a massive vault of high-aesthetic vertical videos, viral hooks, and caption scripts designed for maximum retention.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contentHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <GlassCard key={idx} className="p-6 space-y-4" glowColor="cyan">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </GlassCard>
            );
          })}
        </div>

        {/* Sample Hook Anatomy Box */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-white dark:bg-dark-950 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">
              ANATOMY OF A HIGH-CONVERTING ORGANIC REEL
            </span>
            <span className="text-xs font-mono text-slate-500">FORMAT: 9:16 VERTICAL</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-white/5 space-y-1.5">
              <span className="text-blue-600 dark:text-indigo-400 font-mono font-bold block">01. 3-SEC HOOK</span>
              <p className="text-slate-700 dark:text-slate-300">&ldquo;Stop spending 40 hours creating products from scratch. Do this instead...&rdquo;</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-white/5 space-y-1.5">
              <span className="text-purple-600 dark:text-purple-400 font-mono font-bold block">02. 7-SEC VALUE</span>
              <p className="text-slate-700 dark:text-slate-300">Show the clean 3-step customization workflow with aesthetic B-roll background footage.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-white/5 space-y-1.5">
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold block">03. 2-SEC CALL TO ACTION</span>
              <p className="text-slate-700 dark:text-slate-300">&ldquo;Comment &lsquo;LAUNCH&rsquo; and I&apos;ll send you the exact free starter blueprint.&rdquo;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
