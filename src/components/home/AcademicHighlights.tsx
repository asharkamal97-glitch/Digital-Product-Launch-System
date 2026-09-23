import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Cpu,
  Home,
  Trophy,
  Users2,
  ShieldCheck,
  CheckCircle,
  ArrowUpRight,
} from 'lucide-react';

export default function AcademicHighlights() {
  const highlights = [
    {
      icon: BookOpen,
      title: 'CBSE Pattern Comprehensive Curriculum',
      description:
        'Structured pedagogical framework from Nursery to Class 10 focusing on conceptual clarity, language proficiency, and analytical reasoning.',
      color: 'from-blue-500/10 to-brand-500/10 text-brand-700',
      badge: 'Nursery – Class 10',
    },
    {
      icon: Cpu,
      title: 'Smart Digital Classrooms & STEM Labs',
      description:
        'Interactive audio-visual learning boards, fully equipped Physics, Chemistry, Biology laboratories, and modern computer coding workstations.',
      color: 'from-amber-500/10 to-gold-500/10 text-gold-700',
      badge: 'High-Tech Labs',
    },
    {
      icon: Home,
      title: 'Disciplined Residential Hostel Facility',
      description:
        'Safe, well-ventilated dormitories with round-the-clock pastoral supervision, hygienic nutritional meals, daily evening study hours, and medical care.',
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-700',
      badge: '24x7 Pastoral Care',
    },
    {
      icon: Trophy,
      title: 'Sports & Athletic Excellence',
      description:
        'Expansive grounds for Football, Cricket, Badminton, Volleyball, and Track & Field events with experienced coaches.',
      color: 'from-purple-500/10 to-indigo-500/10 text-purple-700',
      badge: 'Inter-School Champions',
    },
    {
      icon: Users2,
      title: 'Experienced & Caring Subject Faculty',
      description:
        'Dedicated team of post-graduate, B.Ed. qualified educators committed to individualized attention and continuous evaluation.',
      color: 'from-rose-500/10 to-pink-500/10 text-rose-700',
      badge: '1:20 Teacher Ratio',
    },
    {
      icon: ShieldCheck,
      title: 'Character Building & Cultural Development',
      description:
        'Debates, elocution, moral science, science exhibitions, and national festival celebrations that build confident, responsible citizens.',
      color: 'from-cyan-500/10 to-sky-500/10 text-cyan-700',
      badge: 'Holistic Personality',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
            Why Choose SARS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight">
            Academic Highlights & Institutional Pillars
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Discover why parents across Siwan and neighboring districts trust Shabab Ashraf Residential School for their children&apos;s holistic development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-900 transition-colors mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-900">
                  <span>Explore Curriculum</span>
                  <ArrowUpRight className="w-4 h-4 text-gold-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold text-white">
              Ready to enroll your child for Academic Year 2026-2027?
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm">
              Entrance assessment and registration forms are available online and on campus.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admissions"
              className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold text-xs shadow-md transition-all"
            >
              Fill Admission Form
            </Link>
            <Link
              href="/contact"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all"
            >
              Contact Office
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
