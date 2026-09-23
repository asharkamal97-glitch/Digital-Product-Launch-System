'use client';

import React from 'react';
import { siteConfig } from '@/config/siteConfig';
import { Bot, GraduationCap, Film, PackageCheck, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import GlassCard from './GlassCard';

export default function ProductLibrarySection() {
  const iconMap: Record<string, any> = {
    Bot: Bot,
    GraduationCap: GraduationCap,
    Film: Film,
    PackageCheck: PackageCheck,
    BookOpen: BookOpen,
  };

  return (
    <section id="pillars" className="relative py-20 md:py-28 border-t border-white/5 bg-dark-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium">
            <Layers className="w-3.5 h-3.5" />
            CORE ASSET LIBRARY
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            The Complete Product Library
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Everything is organized into structured, searchable cloud hubs. All counts are 100% verified and continuously maintained.
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.productLibrary.map((item, idx) => {
            const IconComponent = iconMap[item.iconName] || Layers;
            return (
              <GlassCard
                key={item.id}
                className={`p-6 sm:p-7 space-y-5 flex flex-col justify-between ${
                  idx === 0 ? 'lg:col-span-2' : ''
                }`}
                glowColor="indigo"
              >
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                      {item.count}
                    </span>
                  </div>

                  {/* Title & Highlight */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {item.label}
                    </h3>
                    <span className="text-xs font-mono text-cyan-400 font-medium block mt-1">
                      ✦ {item.highlight}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom tag */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Full Commercial Rights
                  </span>
                  <span>Drive Ready</span>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Dynamic Verification Note */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-slate-500">
            * All counts are verified in the live Google Drive Master Directory and updated monthly at zero additional fee.
          </p>
        </div>
      </div>
    </section>
  );
}
