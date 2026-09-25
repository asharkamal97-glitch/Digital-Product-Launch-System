'use client';

import React from 'react';
import { Edit3, Check, X, ShieldCheck, Sparkles, Palette, Copy } from 'lucide-react';
import GlassCard from './GlassCard';

export default function ReadyMadeSection() {
  const customizationSteps = [
    {
      step: "01",
      title: "1-Click Duplicate",
      desc: "Open any of the 500+ Canva templates and design assets directly into your own free or pro account.",
      icon: Copy,
    },
    {
      step: "02",
      title: "Rebrand & Refine",
      desc: "Apply your brand colors, customize headers, and use our AI prompts to fine-tune copy in under 60 minutes.",
      icon: Palette,
    },
    {
      step: "03",
      title: "Export & List",
      desc: "Download high-res PDFs or publish your Stan Store or Whop product link with your checkout attached.",
      icon: Sparkles,
    }
  ];

  return (
    <section className="relative py-20 md:py-28 border-t border-white/5 bg-dark-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-medium">
            <Edit3 className="w-3.5 h-3.5" />
            TURNKEY DIGITAL ASSETS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            DON&apos;T SPEND WEEKS STARTING FROM A BLANK PAGE.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Starting from scratch is where most creators lose momentum. We give you commercial-ready templates and products that you can rebrand, customize, and deliver under your own brand name.
          </p>
        </div>

        {/* 3 Steps Customization Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {customizationSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <GlassCard key={idx} className="p-6 space-y-4" glowColor="amber">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    STEP {item.step}
                  </span>
                  <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </GlassCard>
            );
          })}
        </div>

        {/* Commercial Licensing Transparency Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-dark-900 border border-white/10 space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Commercial License & Usage Rights Transparency
              </h3>
              <p className="text-xs text-slate-400">
                Clear rules to protect both creators and our platform.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5 font-mono">
                <Check className="w-4 h-4" /> WHAT YOU ARE ALLOWED TO DO:
              </span>
              <ul className="space-y-1.5 text-slate-300">
                <li>✓ Customize and sell derivative digital products to end customers.</li>
                <li>✓ Rebrand Canva templates, worksheets, and digital guides.</li>
                <li>✓ Use reels, hooks, and captions to build organic social followings.</li>
                <li>✓ Keep 100% of the profits from your individual product sales.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 space-y-2">
              <span className="text-red-400 font-bold flex items-center gap-1.5 font-mono">
                <X className="w-4 h-4" /> WHAT IS STRICTLY PROHIBITED:
              </span>
              <ul className="space-y-1.5 text-slate-300">
                <li>✗ Reselling the master Google Drive link or raw backend access.</li>
                <li>✗ Selling this complete launch system wholesale as a competing bundle.</li>
                <li>✗ Redistributing raw video course masterclasses without modification.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
