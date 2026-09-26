'use client';

import React from 'react';
import { siteConfig } from '@/config/siteConfig';
import { ArrowRight, Lock, ShieldCheck, Sparkles, FolderLock, Zap } from 'lucide-react';

export default function FinalCtaSection() {
  return (
    <section className="relative py-24 md:py-32 bg-slate-50 dark:bg-dark-950 border-t border-slate-200 dark:border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 dark:from-indigo-900/20 via-transparent to-transparent -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-blue-600/5 dark:bg-indigo-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-none">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-indigo-400" />
          <span className="text-xs font-mono font-medium tracking-wide text-blue-700 dark:text-indigo-300 uppercase">
            Instant Access • Zero Recurring Fees
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight font-display">
          READY TO BUILD YOUR{' '}
          <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-indigo-400 dark:via-purple-300 dark:to-cyan-400 bg-clip-text text-transparent">
            DIGITAL PRODUCT SYSTEM?
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {siteConfig.ctas.finalSubtext}
        </p>

        {/* Pricing + Action CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href={siteConfig.links.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md hover:shadow-xl dark:shadow-glow-lg dark:hover:shadow-glow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Lock className="w-4 h-4" />
            <span>{siteConfig.ctas.finalCta} — ${siteConfig.pricing.salePrice}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Value Micro Checklist */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-mono text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" /> Full Commercial Rights
          </span>
          <span className="flex items-center gap-1.5 text-blue-600 dark:text-cyan-400 font-medium">
            <FolderLock className="w-4 h-4" /> Direct Google Drive Link
          </span>
          <span className="flex items-center gap-1.5 text-purple-600 dark:text-indigo-400 font-medium">
            <Zap className="w-4 h-4" /> 15K+ AI Agents & Automation Stack
          </span>
        </div>
      </div>
    </section>
  );
}
