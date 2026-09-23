'use client';

import React from 'react';
import { Radio, Eye, MessageCircle, Share2, Search, ShieldCheck } from 'lucide-react';
import GlassCard from './GlassCard';

export default function TrafficSystemSection() {
  const trafficEngines = [
    {
      title: "Algorithmic Short-Form Distribution",
      desc: "How short-form recommendation engines categorize your content, calculate retention velocity, and distribute vertical videos to non-followers without ad spend.",
      icon: Eye,
      tag: "ORGANIC REACH",
    },
    {
      title: "Comment-to-DM Lead Magnet Automation",
      desc: "Turn viewers into qualified email subscribers and buyers automatically using keyword-triggered DM bots that deliver free starter guides on autopilot.",
      icon: MessageCircle,
      tag: "CONVERSION FLOW",
    },
    {
      title: "Search & Profile SEO Optimization",
      desc: "Optimize your profile bio, handle, and video descriptions so prospects searching for your niche find your store at the exact moment they want a solution.",
      icon: Search,
      tag: "INTENT TRAFFIC",
    },
    {
      title: "AI-Assisted Content Repurposing",
      desc: "Create one core idea, and use our AI agent workflows to turn it into 5 reels, 3 carousel scripts, 2 newsletter emails, and 10 social threads effortlessly.",
      icon: Share2,
      tag: "REPURPOSING",
    }
  ];

  return (
    <section id="traffic" className="relative py-20 md:py-28 border-t border-white/5 bg-dark-900/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
            <Radio className="w-3.5 h-3.5" />
            ZERO AD SPEND METHODOLOGY
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            YOU HAVE THE PRODUCT.{' '}
            <span className="block mt-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              NOW LEARN HOW TO GET ATTENTION.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Having a great product is useless if nobody sees it. Learn repeatable, organic distribution and AI-assisted traffic frameworks without spending thousands on risky paid ads.
          </p>
        </div>

        {/* 4 Traffic Engines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {trafficEngines.map((item, idx) => {
            const Icon = item.icon;
            return (
              <GlassCard key={idx} className="p-6 sm:p-8 space-y-4" glowColor="emerald">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold tracking-wider">
                    {item.tag}
                  </span>
                  <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
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

        {/* Realistic Expectations Notice */}
        <div className="max-w-4xl mx-auto p-4 sm:p-5 rounded-xl bg-dark-950 border border-white/10 flex items-center gap-3 text-xs text-slate-400">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>
            <strong>Honest Strategy Commitment:</strong> We do not guarantee overnight viral fame or artificial view counts. Organic distribution requires consistent posting, relevant messaging, and continuous testing of hooks.
          </span>
        </div>
      </div>
    </section>
  );
}
