'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  CreditCard,
  ChevronRight,
  ShieldCheck,
  Award,
  Users,
  Building,
  CheckCircle2,
} from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-950 text-white min-h-[640px] lg:min-h-[720px] flex items-center">
      {/* Background Layer with Dark Gradient & Ambient Light Orbs */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-slate-950 opacity-95" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Subtle Pattern Grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300 text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Estd. 2001 • Celebrating 25+ Years of Academic Leadership</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Nurturing Minds,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-amber-200">
                Building Character
              </span>
              , Inspiring Excellence
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Welcome to <strong className="text-white font-semibold">Shabab Ashraf Residential School (SARS)</strong>, Baghra, Siwan. A modern co-educational institution providing holistic CBSE-pattern education from Nursery to Class 10 with digital smart classes, science laboratories, and disciplined residential hostel care.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>CBSE Pattern Curriculum</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Smart Digital Classes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Safe Residential Hostels</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Science & Computer Labs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Transport Fleet in Siwan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Board Pass Rate</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold text-sm shadow-xl shadow-gold-500/20 transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                Apply for Admission 2026-27
              </Link>

              <Link
                href="/pay-fees"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all hover:scale-105"
              >
                <CreditCard className="w-4 h-4" />
                Pay School Fees Online
              </Link>

              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/20 transition-all backdrop-blur-sm"
              >
                Explore SARS
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Card Shell */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-brand-900/90 to-brand-950 border border-brand-700/60 p-6 shadow-2xl backdrop-blur-xl">
                {/* School Crest Badge */}
                <div className="flex items-center justify-between border-b border-brand-800 pb-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gold-500 text-brand-950 flex items-center justify-center font-bold shadow-md">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg text-white">SARS Siwan</h3>
                      <p className="text-xs text-gold-300 font-medium">Baghra, Khalishpur, Bihar</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    Active Session
                  </span>
                </div>

                {/* Admission & Quick Pay Highlight Box */}
                <div className="space-y-3.5 mb-5">
                  <div className="p-3.5 rounded-2xl bg-brand-800/60 border border-brand-700/60 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Academic Session</p>
                      <p className="text-sm font-bold text-white">2026 – 2027 Admissions</p>
                    </div>
                    <Link
                      href="/admissions"
                      className="px-3 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold text-xs"
                    >
                      Apply Now
                    </Link>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-700/40 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-emerald-300 font-medium">Instant Online Payment</p>
                      <p className="text-sm font-bold text-white">Pay with Roll / Admission No</p>
                    </div>
                    <Link
                      href="/pay-fees"
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs"
                    >
                      Quick Pay
                    </Link>
                  </div>
                </div>

                {/* Portal Access Quick Select */}
                <div className="pt-4 border-t border-brand-800">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                    Authorized Portals
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/login?role=student"
                      className="p-2.5 rounded-xl bg-brand-900/80 hover:bg-brand-800 text-center border border-brand-700/50 transition-colors"
                    >
                      <p className="text-xs font-bold text-white">Student Portal</p>
                      <p className="text-[10px] text-slate-400">Grades & Timetable</p>
                    </Link>
                    <Link
                      href="/login?role=parent"
                      className="p-2.5 rounded-xl bg-brand-900/80 hover:bg-brand-800 text-center border border-brand-700/50 transition-colors"
                    >
                      <p className="text-xs font-bold text-white">Parent Portal</p>
                      <p className="text-[10px] text-slate-400">Attendance & Fees</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Key Metric Counters */}
        <div className="mt-16 pt-10 border-t border-brand-800/70 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-gold-400 tracking-tight">2001</p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Year Established</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">1,000+</p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Enrolled Students</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-gold-400 tracking-tight">100%</p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Board Results Success</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">25+</p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">Dedicated Faculty</p>
          </div>
        </div>
      </div>
    </section>
  );
}
