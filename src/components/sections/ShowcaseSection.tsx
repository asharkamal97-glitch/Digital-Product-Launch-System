'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { Folder, Eye, Film, Bot, GraduationCap, Sparkles } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

export default function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState<'drive' | 'courses' | 'reels' | 'agents' | 'canva'>('drive');

  const showcaseTabs = [
    { id: 'drive', label: 'Drive File Hub', icon: Folder },
    { id: 'courses', label: '1,000+ Video Courses', icon: GraduationCap },
    { id: 'reels', label: '10K Reels Vault', icon: Film },
    { id: 'agents', label: '15K AI Agents', icon: Bot },
    { id: 'canva', label: 'Canva Ready Products', icon: Sparkles },
  ];

  return (
    <section id="showcase" className="relative py-20 md:py-28 border-t border-slate-200 dark:border-white/5 bg-slate-100/70 dark:bg-dark-900/90 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
            <Eye className="w-3.5 h-3.5" />
            TRANSPARENT SYSTEM SHOWCASE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display uppercase">
            DON&apos;T TAKE OUR WORD FOR IT.{' '}
            <span className="block mt-1 bg-gradient-to-r from-emerald-600 via-blue-600 to-indigo-600 dark:from-emerald-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
              SEE WHAT&apos;S INSIDE.
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            No fake testimonials. No fabricated revenue screenshots. We let the genuine depth and quality of the system speak for itself.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2 no-scrollbar">
          <div className="inline-flex p-1.5 rounded-xl bg-slate-200/80 dark:bg-dark-950 border border-slate-300 dark:border-white/10 gap-1.5 shadow-sm">
            {showcaseTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-sm font-semibold dark:bg-indigo-600 dark:text-white dark:shadow-glow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Mockup Container */}
        <div className="max-w-5xl mx-auto">
          <GlassCard className="p-4 sm:p-6 md:p-8 border-blue-500/20 dark:border-indigo-500/20 overflow-hidden" glowColor="cyan">
            {/* Mockup Window Top */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-white/10 text-xs font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-slate-700 dark:text-slate-300">verified_library_explorer.app</span>
              </div>
              <span className="hidden sm:inline text-blue-600 dark:text-indigo-400 font-semibold">STATUS: VERIFIED CLOUD DELIVERY</span>
            </div>

            {/* Dynamic Content based on Active Tab */}
            {activeTab === 'drive' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Folder className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    Google Drive Master Root Directory
                  </h4>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">9 Core Folders • 00 to 08</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {siteConfig.driveStructure.map((folder) => (
                    <div
                      key={folder.id}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-850/80 border border-slate-200 dark:border-white/5 hover:border-blue-300 dark:hover:border-indigo-500/30 transition-all space-y-2 shadow-sm dark:shadow-none"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-blue-600 dark:text-indigo-400 font-semibold">{folder.folderName}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">{folder.fileCount}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200">{folder.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    1,000+ Video Courses & Strategy Modules
                  </h4>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Step-by-Step Video Curriculum</span>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 dark:bg-dark-950/80 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm dark:shadow-none">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-lg">
                      ✦
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white">Master Strategy Curriculum</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Structured video training covering digital product economics, store setups, and organic scaling</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-white dark:bg-dark-850 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 shadow-sm dark:shadow-none">
                      <span className="text-blue-600 dark:text-indigo-400 font-mono block mb-1 font-semibold">01. ECONOMICS & NICHE</span>
                      Pricing strategy, offer validation, and unit economics.
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-dark-850 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 shadow-sm dark:shadow-none">
                      <span className="text-cyan-600 dark:text-cyan-400 font-mono block mb-1 font-semibold">02. PAGE ARCHITECTURE</span>
                      High-converting wireframes, hooks, and checkout flows.
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-dark-850 border border-slate-200 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 shadow-sm dark:shadow-none">
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono block mb-1 font-semibold">03. ORGANIC REACH</span>
                      Short-form algorithm playbooks and distribution.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reels' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Film className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    10,000+ Ready-to-Post Reels Video Vault
                  </h4>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">HD / 4K Vertical 9:16</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Luxury & Aesthetic", count: "2,500+ Clips", tag: "High Status" },
                    { label: "Tech & Cyberpunk", count: "2,000+ Clips", tag: "Modern Edge" },
                    { label: "Faceless Lifestyle", count: "3,500+ Clips", tag: "Universal" },
                    { label: "Productivity & Mindset", count: "2,000+ Clips", tag: "Educational" },
                  ].map((cat, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-white/5 space-y-1 shadow-sm dark:shadow-none">
                      <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase font-semibold">{cat.tag}</span>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">{cat.label}</h5>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{cat.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'agents' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Bot className="w-4 h-4 text-blue-600 dark:text-indigo-400" />
                    15,000+ AI Agents & Automation Blueprints
                  </h4>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Claude • ChatGPT • Midjourney</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-white/5 space-y-1.5 shadow-sm dark:shadow-none">
                    <span className="text-[10px] font-mono text-blue-600 dark:text-indigo-400 uppercase font-semibold">COPYWRITING AGENTS</span>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">Direct-Response Sales Copy</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">Prompts engineered to write high-conversion headlines, hooks, and email sequences.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-white/5 space-y-1.5 shadow-sm dark:shadow-none">
                    <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 uppercase font-semibold">RESEARCH AGENTS</span>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">Niche & Competitor Analysis</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">Scans market gaps, reviews, and customer objections in under 3 minutes.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-white/5 space-y-1.5 shadow-sm dark:shadow-none">
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-semibold">AUTOMATION FLOWS</span>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">Make / n8n / Zapier Flows</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">Pre-built JSON recipes to automate customer onboarding and content distribution.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'canva' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    500+ Commercial Ready-Made Products
                  </h4>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Direct Canva Template Links</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-white/5 space-y-1 shadow-sm dark:shadow-none">
                    <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase font-semibold">DIGITAL PLANNERS</span>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">Life & Business Workbooks</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">100+ fully editable hyperlinked planners for iPad and Goodnotes.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-white/5 space-y-1 shadow-sm dark:shadow-none">
                    <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase font-semibold">GUIDES & EBOOKS</span>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">Formatted PDF & Docx Books</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">Rebrandable guides on mindset, financial habits, and productivity.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-850 border border-slate-200 dark:border-white/5 space-y-1 shadow-sm dark:shadow-none">
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-semibold">SOCIAL MEDIA KITS</span>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">Post & Carousel Templates</h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">Cohesive brand suites for Instagram, Pinterest, and LinkedIn.</p>
                  </div>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
