'use client';

import React from 'react';
import { siteConfig } from '@/config/siteConfig';
import { Layers, ShieldCheck, Mail, Lock, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenLegal?: (tab?: 'privacy' | 'terms' | 'refund' | 'license' | 'disclaimer' | 'contact') => void;
}

export default function Footer({ onOpenLegal = () => {} }: FooterProps) {
  return (
    <footer className="relative border-t border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-dark-950 pt-16 pb-12 overflow-hidden transition-colors">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/40 dark:via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-[1px] shadow-sm">
                <div className="h-full w-full rounded-xl bg-white dark:bg-dark-950 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-blue-600 dark:text-indigo-400" />
                </div>
              </div>
              <div>
                <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white uppercase font-display">
                  Digital Product Launch System
                </span>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  EDUCATION • ASSETS • ORGANIC TRAFFIC
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              We don&apos;t just give you files. We teach you what to do with them. An end-to-end framework combining strategic education, customizable assets, AI workflows, and organic traffic distribution.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-600 dark:text-slate-400 font-mono">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Instant Drive Access
              </span>
              <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-medium">
                <Lock className="w-3.5 h-3.5" /> SSL Encrypted Checkout
              </span>
              <span className="flex items-center gap-1 text-blue-600 dark:text-indigo-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> Commercial Rights
              </span>
            </div>
          </div>

          {/* Core Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-mono">
              System Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a href="#journey" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  The 7-Step Journey
                </a>
              </li>
              <li>
                <a href="#pillars" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Product Library
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Verified Showcase
                </a>
              </li>
              <li>
                <a href="#launch-hub" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium">
                  Google Drive Launch Hub
                </a>
              </li>
              <li>
                <a href="#traffic" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Organic Traffic Architecture
                </a>
              </li>
              <li>
                <a href="#selling" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  6-Part Selling Pipeline
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-mono">
              Compliance & Rights
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('refund')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                >
                  Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('license')}
                  className="text-blue-600 dark:text-indigo-400 hover:text-blue-700 dark:hover:text-indigo-300 transition-colors text-left font-medium"
                >
                  Commercial License Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('disclaimer')}
                  className="text-amber-600 dark:text-amber-400 hover:underline transition-colors text-left"
                >
                  Earnings & Results Disclaimer
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-mono">
              Support & Inquiries
            </h4>
            <div className="p-3.5 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/5 space-y-2 shadow-sm dark:shadow-none">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Direct Support:</span>
              <a
                href={`mailto:${siteConfig.links.supportEmail}`}
                className="text-xs font-semibold text-blue-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5 break-all"
              >
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                {siteConfig.links.supportEmail}
              </a>
              <p className="text-[10px] text-slate-500">
                Responses delivered within 24h on business days.
              </p>
            </div>
            <button
              onClick={() => onOpenLegal('contact')}
              className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors font-medium"
            >
              <span>View support guidelines</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 space-y-4 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong className="text-slate-700 dark:text-slate-400">DISCLAIMER:</strong> Digital Product Launch System is an educational training system and digital asset library. We do not make claims of guaranteed income, guaranteed traffic, or effortless overnight success. Your individual commercial results depend on your effort, market niche, execution, and offering.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-white/5 text-slate-500 text-xs">
            <p>© {new Date().getFullYear()} Digital Product Launch System. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => onOpenLegal('license')} className="hover:text-slate-800 dark:hover:text-slate-300">License</button>
              <span>•</span>
              <button onClick={() => onOpenLegal('terms')} className="hover:text-slate-800 dark:hover:text-slate-300">Terms</button>
              <span>•</span>
              <button onClick={() => onOpenLegal('privacy')} className="hover:text-slate-800 dark:hover:text-slate-300">Privacy</button>
              <span>•</span>
              <button onClick={() => onOpenLegal('disclaimer')} className="hover:text-slate-800 dark:hover:text-slate-300">Disclaimer</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
