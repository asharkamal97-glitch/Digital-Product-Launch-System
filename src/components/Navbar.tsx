'use client';

import React, { useState, useEffect } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { Layers, ArrowRight, Menu, X, FolderLock } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

interface NavbarProps {
  onOpenLegal?: (tab?: 'privacy' | 'terms' | 'refund' | 'license' | 'disclaimer' | 'contact') => void;
}

export default function Navbar({ onOpenLegal = () => {} }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-dark-950/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] shadow-sm dark:shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 p-[1px] shadow-sm dark:shadow-glow-sm">
              <div className="h-full w-full rounded-xl bg-white dark:bg-dark-950 flex items-center justify-center">
                <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white uppercase font-display">
                  Digital Product
                </span>
                <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  SYSTEM
                </span>
              </div>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400 tracking-wider font-mono">
                LAUNCH ARCHITECTURE
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-600 dark:text-slate-300">
            <a href="#journey" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              The Journey
            </a>
            <a href="#pillars" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Pillars
            </a>
            <a href="#showcase" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Inside Look
            </a>
            <a href="#launch-hub" className="hover:text-cyan-600 dark:hover:text-white transition-colors flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-semibold">
              <FolderLock className="w-3.5 h-3.5" />
              Launch Hub
            </a>
            <a href="#traffic" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Traffic Method
            </a>
            <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* CTA & Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-600 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
              <span>Drive Hub v2.6 Active</span>
            </div>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            <a
              href={siteConfig.links.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-medium text-xs text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-sm hover:shadow-md dark:shadow-glow-sm dark:hover:shadow-glow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                <span>{siteConfig.ctas.navbarCta}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle & Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <a
              href={siteConfig.links.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-blue-600 dark:bg-indigo-600 font-sans"
            >
              Get System
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pt-2 pb-6 bg-white/95 dark:bg-dark-900/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 space-y-3 shadow-lg dark:shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
            <a
              href="#journey"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-lg bg-slate-50 dark:bg-dark-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/5 font-medium"
            >
              The 7-Step Journey
            </a>
            <a
              href="#pillars"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-lg bg-slate-50 dark:bg-dark-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/5 font-medium"
            >
              Product Library
            </a>
            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-lg bg-slate-50 dark:bg-dark-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/5 font-medium"
            >
              Inside Look
            </a>
            <a
              href="#launch-hub"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-lg bg-slate-50 dark:bg-dark-800 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20 font-medium"
            >
              Drive Launch Hub
            </a>
            <a
              href="#traffic"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-lg bg-slate-50 dark:bg-dark-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/5 font-medium"
            >
              Organic Traffic
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-lg bg-slate-50 dark:bg-dark-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/5 font-medium"
            >
              FAQ
            </a>
          </div>

          <div className="pt-2">
            <a
              href={siteConfig.links.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-xs shadow-md dark:shadow-glow-sm"
            >
              <span>{siteConfig.ctas.navbarCta} — ${siteConfig.pricing.salePrice}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
