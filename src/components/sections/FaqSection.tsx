'use client';

import React, { useState } from 'react';
import { siteConfig, FaqItem } from '@/config/siteConfig';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Content', 'Traffic', 'Access', 'Licensing'];

  const filteredFaqs = selectedCategory === 'All'
    ? siteConfig.faqs
    : siteConfig.faqs.filter((faq) => faq.category === selectedCategory);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-20 md:py-28 border-t border-white/5 bg-dark-900/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium">
            <HelpCircle className="w-3.5 h-3.5" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            Clear, Transparent Answers
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about the system, licensing, Google Drive access, and deliverables.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-glow-sm'
                  : 'bg-dark-850 text-slate-400 border border-white/5 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <GlassCard
                key={idx}
                className="overflow-hidden border-white/10"
                glowColor="indigo"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-indigo-400 font-semibold">
                      Q{idx + 1}.
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>

        {/* Support Note */}
        <div className="mt-12 text-center text-xs text-slate-400">
          Have a specific question not covered here? Reach out directly to{' '}
          <a
            href={`mailto:${siteConfig.links.supportEmail}`}
            className="text-indigo-400 hover:text-indigo-300 underline font-mono"
          >
            {siteConfig.links.supportEmail}
          </a>
        </div>
      </div>
    </section>
  );
}
