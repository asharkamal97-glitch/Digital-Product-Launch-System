'use client';

import React from 'react';
import { siteConfig } from '@/config/siteConfig';
import { ArrowRight, Lock, ShieldCheck, Sparkles, FolderLock, Zap } from 'lucide-react';

export default function FinalCtaSection() {
  return (
    <section className="relative py-24 md:py-32 bg-dark-950 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-900/20 via-dark-950 to-dark-950 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-xs font-mono font-medium tracking-wide text-indigo-300 uppercase">
            Instant Access • Zero Recurring Fees
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight font-display">
          READY TO BUILD YOUR{' '}
          <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            DIGITAL PRODUCT SYSTEM?
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {siteConfig.ctas.finalSubtext}
        </p>

        {/* Pricing + Action CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href={siteConfig.links.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 shadow-glow-lg hover:shadow-glow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Lock className="w-4 h-4" />
            <span>{siteConfig.ctas.finalCta} — ${siteConfig.pricing.salePrice}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Value Micro Checklist */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" /> Full Commercial Rights
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400">
            <FolderLock className="w-4 h-4" /> Direct Google Drive Link
          </span>
          <span className="flex items-center gap-1.5 text-indigo-400">
            <Zap className="w-4 h-4" /> 15K+ AI Agents & 10K+ Reels
          </span>
        </div>
      </div>
    </section>
  );
}
