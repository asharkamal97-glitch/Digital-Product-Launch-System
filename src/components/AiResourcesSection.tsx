'use client';

import React from 'react';
import { Bot, Terminal, Sparkles, Workflow } from 'lucide-react';
import GlassCard from './GlassCard';

export default function AiResourcesSection() {
  const aiStacks = [
    {
      category: "CUSTOM GPTS & AGENT PERSONAS",
      title: "Specialized Digital Business Agents",
      desc: "Pre-prompted agent system prompts that turn ChatGPT & Claude into full-time copywriters, offer architects, and market researchers.",
      icon: Bot,
      tags: ["ChatGPT Plus", "Claude 3.5 Sonnet", "DeepSeek"],
    },
    {
      category: "DIRECT-RESPONSE COPYWRITING",
      title: "5,000+ Conversion Prompt Blueprints",
      desc: "Engineered prompt sequences for writing high-converting headlines, sales pages, email newsletters, and video hooks.",
      icon: Terminal,
      tags: ["Sales Copy", "Emails", "Landing Pages"],
    },
    {
      category: "AUTOMATION WORKFLOW RECIPES",
      title: "Make.com & n8n Automation Blueprints",
      desc: "Downloadable JSON recipes to automate customer welcome emails, file delivery, Notion database updates, and social scheduling.",
      icon: Workflow,
      tags: ["Make.com", "n8n", "Webhooks"],
    },
    {
      category: "AI IMAGE & ASSET PROMPTS",
      title: "3,000+ Midjourney & DALL-E Formulas",
      desc: "Precise parameter formulas for generating ultra-realistic 3D product mockups, aesthetic backgrounds, and modern digital illustrations.",
      icon: Sparkles,
      tags: ["Midjourney v6", "DALL-E 3", "Photorealistic"],
    }
  ];

  return (
    <section className="relative py-20 md:py-28 border-t border-white/5 bg-dark-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-medium">
            <Bot className="w-3.5 h-3.5" />
            AI MULTIPLIER STACK
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            15,000+ AI Agents, Automation Blueprints & Prompts
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Stop using vague, one-sentence prompts. We provide battle-tested AI workflows and agent architectures that act like an entire in-house marketing team.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {aiStacks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <GlassCard key={idx} className="p-6 sm:p-8 space-y-5" glowColor="purple">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider font-semibold">
                    {item.category}
                  </span>
                  <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-dark-850 border border-white/10 text-[11px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Code Snippet Box */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-dark-900 border border-white/10 p-5 sm:p-6 font-mono text-xs text-slate-300 space-y-3">
          <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-white/5">
            <span>SAMPLE_AGENT_BLUEPRINT.prompt</span>
            <span className="text-purple-400">ROLE: LEAD_COPYWRITER_AGENT</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            &ldquo;Act as a direct-response digital product copywriter. Analyze the target customer avatar, extract top 3 core objections, and write a high-retention 3-part sales page outline featuringPAS framing, social proof anchors, and frictionless CTAs...&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
