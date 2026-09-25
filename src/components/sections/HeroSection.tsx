'use client';

import React from 'react';
import { siteConfig } from '@/config/siteConfig';
import { ArrowRight, Sparkles, FolderLock, ShieldCheck, CheckCircle2, Layers, Bot, Film, BookOpen, GraduationCap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-inner-light">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 dark:bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-indigo-500" />
            </span>
            <span className="text-xs font-mono font-medium tracking-wide text-blue-700 dark:text-indigo-300">
              COMPLETE DIGITAL PRODUCT LAUNCH SYSTEM
            </span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/10 dark:bg-indigo-500/20 text-blue-700 dark:text-indigo-300 font-semibold border border-blue-500/20 dark:border-indigo-500/30">
              V2.6
            </span>
          </div>
        </div>

        {/* Big Editorial Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] font-display">
            YOU DON&apos;T NEED ANOTHER COURSE.{' '}
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-300 dark:to-cyan-400 bg-clip-text text-transparent">
              YOU NEED A SYSTEM.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Learn how digital products work — then use ready-made resources, content, AI tools and traffic strategies to start building your own digital-product business.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={siteConfig.links.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md hover:shadow-lg dark:shadow-glow-md dark:hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{siteConfig.ctas.heroPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#launch-hub"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none transition-all duration-300 hover:text-slate-900 dark:hover:text-white"
            >
              <FolderLock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{siteConfig.ctas.heroSecondary}</span>
            </a>
          </div>

          {/* Value Pills / Proof Transparency */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 text-xs font-mono text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Zero Fake Scarcity / Honest System
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Direct Google Drive Launch Hub
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              Complete Commercial Usage Rights
            </span>
          </div>
        </div>

        {/* Hero System Preview Dashboard Card */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="relative rounded-2xl p-1 bg-gradient-to-b from-blue-500/20 via-indigo-500/10 to-slate-200 dark:from-indigo-500/30 dark:via-purple-500/10 dark:to-white/5 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-indigo-950/40">
            <div className="rounded-2xl bg-white dark:bg-dark-900/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-dark-950/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 dark:bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 dark:bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
                    System Architecture Hub • Google Drive Master v2.6
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                    Verified Library Active
                  </span>
                </div>
              </div>

              {/* Window Body: 5 Interactive Pillars */}
              <div className="p-4 sm:p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-850/90 border border-slate-200 dark:border-white/5 hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-all group">
                    <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-white font-mono">{siteConfig.productCounts.aiAgentsAndAutomations}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">AI Agents & Prompts</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-850/90 border border-purple-200 dark:border-purple-500/30 transition-all group">
                    <div className="h-8 w-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-white font-mono">{siteConfig.productCounts.coursesAndMasterclasses}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Video Courses</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-850/90 border border-slate-200 dark:border-white/5 hover:border-cyan-300 dark:hover:border-cyan-500/30 transition-all group">
                    <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-2">
                      <Film className="w-4 h-4" />
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-white font-mono">{siteConfig.productCounts.readyToPostReels}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Ready Reels</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-850/90 border border-slate-200 dark:border-white/5 hover:border-amber-300 dark:hover:border-amber-500/30 transition-all group">
                    <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-white font-mono">{siteConfig.productCounts.readyMadeDigitalProducts}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Ready Products</div>
                  </div>

                  <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-slate-50 dark:bg-dark-850/90 border border-slate-200 dark:border-white/5 hover:border-emerald-300 dark:hover:border-emerald-500/30 transition-all group">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-white font-mono">{siteConfig.productCounts.ebooksAndPlaybooks}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Ebooks & Guides</div>
                  </div>
                </div>

                {/* Micro Core Message Banner */}
                <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-gradient-to-r dark:from-indigo-950/50 dark:via-dark-800 dark:to-purple-950/40 border border-slate-200 dark:border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-indigo-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                      <strong>Core Framework:</strong> &ldquo;We don&apos;t just give you files. We teach you what to do with them.&rdquo;
                    </span>
                  </div>
                  <a
                    href="#journey"
                    className="text-xs font-semibold text-blue-600 dark:text-indigo-300 hover:text-blue-800 dark:hover:text-white flex items-center gap-1 flex-shrink-0 transition-colors"
                  >
                    <span>Explore the 7-Step Journey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
