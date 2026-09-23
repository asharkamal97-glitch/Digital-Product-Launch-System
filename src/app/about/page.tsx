import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PrincipalMessage from '@/components/home/PrincipalMessage';
import Link from 'next/link';
import {
  GraduationCap,
  Target,
  Compass,
  History,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const metadata = {
  title: 'About Us | Shabab Ashraf Residential School',
  description:
    'Learn about the rich history, visionary leadership, educational philosophy, and mission of Shabab Ashraf Residential School, established in 2001 in Baghra, Siwan, Bihar.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        {/* Hero Banner */}
        <div className="bg-brand-950 text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900 to-slate-950 opacity-90" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold border border-gold-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Established 2001 • Baghra, Siwan
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              About Shabab Ashraf Residential School
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Over two decades of dedicated service in shaping resilient, intellectually vibrant, and ethically sound future leaders.
            </p>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <section id="vision" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center border border-brand-200 shadow-inner">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-extrabold text-brand-950">Our Vision</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                To be the benchmark residential institution in Bihar, fostering an inclusive ecosystem where academic brilliance, moral integrity, scientific temperament, and physical vitality empower every child to excel in an interconnected global society.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pt-2 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Cultivating critical inquiry and scientific reasoning
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Inculcating deep ethical values and social responsibility
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Equipping students with modern digital and STEM fluencies
                </li>
              </ul>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200 shadow-inner">
                <Compass className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-extrabold text-brand-950">Our Mission</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                To deliver comprehensive, student-centered education through modern pedagogical methods, individualized mentorship, experiential laboratory learning, and disciplined hostel life that respects every student&apos;s unique talents and cultural heritage.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pt-2 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Maintaining high academic and examination standards
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Providing a secure, nurturing, and disciplined residential hostel
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Fostering physical fitness, sportsmanship, and artistic expression
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section id="history" className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
                  Institutional Journey
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-950">
                  Our Story & Legacy Since 2001
                </h2>
                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Shabab Ashraf Residential School was founded in 2001 in Village Baghra, Post Khalishpur, Siwan, with a modest enrollment and a grand dream: to bring quality English-medium education to families in and around Siwan Sadar.
                  </p>
                  <p>
                    Over the past two decades, the campus has grown into a comprehensive educational facility with dedicated smart classrooms, Physics, Chemistry, and Biology laboratories, high-speed computer labs, and modern residential hostel blocks accommodating students from across Bihar.
                  </p>
                  <p>
                    Today, SARS alumni serve in engineering, medical, administrative, defense, and entrepreneurial fields across India, carrying forward the values instilled during their formative years at Baghra.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-brand-50 border border-brand-100 text-center space-y-2">
                    <p className="text-3xl font-extrabold text-brand-900">2001</p>
                    <p className="text-xs font-semibold text-slate-700">Foundation Year</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-gold-50 border border-gold-100 text-center space-y-2">
                    <p className="text-3xl font-extrabold text-gold-700">1000+</p>
                    <p className="text-xs font-semibold text-slate-700">Active Students</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 text-center space-y-2">
                    <p className="text-3xl font-extrabold text-emerald-700">100%</p>
                    <p className="text-xs font-semibold text-slate-700">CBSE Pattern Pass Rate</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-purple-50 border border-purple-100 text-center space-y-2">
                    <p className="text-3xl font-extrabold text-purple-700">25+</p>
                    <p className="text-xs font-semibold text-slate-700">Expert Educators</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Principal Message Component */}
        <PrincipalMessage />

        {/* Rules & Regulations Section */}
        <section id="rules" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Disciplinary Code
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-950">
                School & Hostel Rules & Regulations
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                To maintain an atmosphere of mutual respect, safety, and focused study, all students and guardians are expected to follow these guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
              <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-brand-900 text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  General & Academic Discipline
                </h4>
                <ul className="space-y-2 list-disc pl-4">
                  <li>Regularity and punctual attendance (minimum 75% mandatory for exam eligibility).</li>
                  <li>Proper school uniform, clean identity badge, and neat appearance at all times.</li>
                  <li>Careful handling of school laboratory equipment, library books, and computer stations.</li>
                  <li>Mobile phones and unauthorized electronic gadgets are strictly prohibited for students on campus.</li>
                </ul>
              </div>

              <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-brand-900 text-base flex items-center gap-2">
                  <Award className="w-5 h-5 text-gold-600" />
                  Residential Hostel Code
                </h4>
                <ul className="space-y-2 list-disc pl-4">
                  <li>Adherence to scheduled morning rising, dining, evening self-study prep, and lights-out hours.</li>
                  <li>Cleanliness and personal tidiness in dormitories and common washrooms.</li>
                  <li>Guardian visits are permitted only during authorized weekend visiting hours.</li>
                  <li>Zero tolerance for ragging or misconduct; fosters a brotherhood and sisterhood among all residents.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
