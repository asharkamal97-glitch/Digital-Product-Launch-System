'use client';

import React from 'react';
import { siteConfig } from '@/config/siteConfig';
import { Check, ShieldCheck, ArrowRight, Sparkles, FolderLock, Zap, Lock } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function ValueStackSection() {
  const valueItems = [
    {
      title: "The Complete 7-Stage Digital Product Video Curriculum",
      desc: "Step-by-step masterclasses covering strategy, niche validation, store setup, organic traffic, and offer psychology.",
      value: "$497",
    },
    {
      title: "15,000+ AI Agents, Automation Workflows & Prompts",
      desc: "Custom GPT configurations, Claude prompts, Make/n8n workflows, and Midjourney image prompt parameters.",
      value: "$350",
    },
    {
      title: "10,000+ Ready-to-Post HD/4K Short-Form Reels Vault",
      desc: "Faceless, luxury, tech, and aesthetic vertical 9:16 clips paired with 1,000+ viral hook scripts.",
      value: "$450",
    },
    {
      title: "500+ Commercial Ready-Made Digital Products",
      desc: "Editable Canva templates, Notion workspace hubs, and PDF planners with full commercial licensing.",
      value: "$597",
    },
    {
      title: "1,000+ Comprehensive Skill Video Courses",
      desc: "Masterclasses on copywriting, funnel design, graphic branding, email systems, and audience growth.",
      value: "$850",
    },
    {
      title: "High-Converting Sales Page Templates & Swipe Files",
      desc: "Plug-and-play Stan Store, Whop, and Gumroad wireframes with pre-tested headline and copy blocks.",
      value: "$250",
    },
    {
      title: "Master Notion Digital Product Launch OS Hub",
      desc: "Interactive command center dashboard to track products, schedule content, and monitor sales pipelines.",
      value: "$197",
    },
    {
      title: "Lifetime Google Drive Master Cloud Access & Updates",
      desc: "Instant access to all 9 categorized folders with regular monthly asset additions and zero recurring fees.",
      value: "$397",
    },
  ];

  return (
    <section id="checkout" className="relative py-20 md:py-28 border-t border-white/5 bg-dark-900/90 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            THE COMPLETE VALUE STACK
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Everything You Need in One Unified System
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            No monthly subscriptions. No hidden up-sells. You get lifetime access to the complete strategic education, asset library, and Google Drive Launch Hub.
          </p>
        </div>

        {/* Pricing & Value Comparison Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-indigo-500 via-purple-500/30 to-white/10 shadow-2xl shadow-indigo-950/50">
            <div className="rounded-3xl bg-dark-950 p-6 sm:p-10 md:p-12 space-y-8">
              {/* Stack items */}
              <div className="space-y-4">
                <span className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider block">
                  WHAT&apos;S INCLUDED IN THE LAUNCH SYSTEM:
                </span>

                <div className="divide-y divide-white/5">
                  {valueItems.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-500 line-through flex-shrink-0">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Box */}
              <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-dark-900/60 p-6 sm:p-8 rounded-2xl border border-white/5">
                <div className="space-y-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <span className="text-3xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
                      ${siteConfig.pricing.salePrice}
                    </span>
                    <span className="text-lg text-slate-500 line-through font-mono">
                      ${siteConfig.pricing.regularPrice}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                      ONE-TIME
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    {siteConfig.pricing.billingType}
                  </p>
                </div>

                <a
                  href={siteConfig.links.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>{siteConfig.ctas.heroPrimary}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono pt-2">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" /> Commercial License Included
                </span>
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <FolderLock className="w-4 h-4" /> Instant Google Drive Delivery
                </span>
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Zap className="w-4 h-4" /> Verified Lifetime Updates
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
