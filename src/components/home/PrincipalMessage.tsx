import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Quote, Award, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export default function PrincipalMessage() {
  return (
    <section id="principal" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portrait & Credentials */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-900 to-gold-500 rounded-3xl opacity-20 blur-xl"></div>
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 border-4 border-white shadow-2xl">
                {/* Fallback image with educator graphic */}
                <div className="h-96 sm:h-[420px] bg-gradient-to-br from-brand-950 via-brand-900 to-slate-900 flex flex-col items-center justify-center p-8 text-center text-white relative">
                  <div className="w-28 h-28 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center mb-4 shadow-lg">
                    <Award className="w-14 h-14 text-gold-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Dr. S. Ashraf
                  </h3>
                  <p className="text-xs text-gold-300 font-semibold uppercase tracking-wider mt-1">
                    Founder & Principal
                  </p>
                  <p className="text-xs text-slate-300 mt-2 max-w-xs">
                    Ph.D., M.Ed. — Over 25 Years of Dedication to Modern Education in Bihar
                  </p>
                  <div className="mt-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[11px] font-medium border border-white/15">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    <span>Serving Siwan Since 2001</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inspiring Message */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-600 bg-gold-50 px-3 py-1 rounded-md border border-gold-200">
                <Quote className="w-3.5 h-3.5" />
                Leadership Vision
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
                &ldquo;True Education Inspires Character, Discipline, and Unstoppable Curiosity.&rdquo;
              </h2>
            </div>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                When we established <strong>Shabab Ashraf Residential School (SARS)</strong> in 2001 in Baghra, Siwan, our vision was clear: to build an institution where academic rigor blends seamlessly with moral integrity and modern scientific aptitude.
              </p>
              <p>
                In today&apos;s fast-evolving world, rote learning is no longer enough. We focus on concept mastery through interactive smart classrooms, hands-on science and computer laboratories, and a structured residential environment that builds independence, mutual respect, and leadership qualities.
              </p>
              <p>
                Whether in our CBSE-oriented classrooms, our sports arena, or our hostel dining halls, every student at SARS receives the personal mentorship required to achieve their fullest potential.
              </p>
            </div>

            {/* Core Leadership Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-800">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Individual Student Mentorship</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Disciplined & Safe Residential Hostel</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Value & Ethics Grounded Learning</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Board Exam Guidance</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-900 hover:text-brand-700 group"
              >
                Read Full School History & Vision
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
