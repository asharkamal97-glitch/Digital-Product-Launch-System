'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Monitor,
  FlaskConical,
  Library,
  Home,
  Bus,
  Trophy,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function FacilitiesCarousel() {
  const [activeTab, setActiveTab] = useState(0);

  const facilities = [
    {
      title: 'Smart Classrooms',
      icon: Monitor,
      subtitle: 'Audio-Visual Interactive Learning',
      description:
        'Every classroom is equipped with interactive digital smart boards, multimedia curriculum resources, high-lumen projectors, and ergonomic student seating to make learning engaging and visual.',
      features: ['Interactive Smart Boards', 'High-Speed Internet', 'Ergonomic Furniture', 'Natural Airflow & Lighting'],
      color: 'from-blue-600 to-indigo-700',
    },
    {
      title: 'Science & Computer Labs',
      icon: FlaskConical,
      subtitle: 'Practical Hands-on Exploration',
      description:
        'Fully equipped laboratories for Physics, Chemistry, Biology, and Computer Science where students perform practical experiments and learn coding, digital skills, and robotics under faculty guidance.',
      features: ['Dedicated Workstations', 'Modern Lab Apparatus', 'Safety Equipment & First Aid', 'Robotics & STEM kits'],
      color: 'from-amber-600 to-gold-600',
    },
    {
      title: 'Hostel & Residential Wing',
      icon: Home,
      subtitle: 'Safe, Homely & Disciplined Living',
      description:
        'Our on-campus hostel provides comfortable dormitories, 24x7 pastoral care by resident wardens, hygienic and nutritious dining, evening supervised prep studies, and recreational lounges.',
      features: ['24x7 Resident Wardens', 'Hygienic Dining & Mess', 'Structured Prep Hours', '24x7 CCTV & Security'],
      color: 'from-emerald-600 to-teal-700',
    },
    {
      title: 'Modern School Library',
      icon: Library,
      subtitle: 'Thousands of Books & Journals',
      description:
        'A tranquil reading space boasting thousands of academic references, NCERT & CBSE guides, encyclopedias, children’s literature, periodicals, and digital research archives.',
      features: ['3,000+ Book Titles', 'Daily Newspapers & Periodicals', 'Digital Reference Corner', 'Quiet Study Desks'],
      color: 'from-purple-600 to-indigo-800',
    },
    {
      title: 'Transport Fleet with Siwan Routes',
      icon: Bus,
      subtitle: 'GPS-Ready Safe Commute',
      description:
        'Dedicated school bus fleet covering Siwan town, Baghra, Khalishpur, Bhatwalia, Badli, Hasuwa, and surrounding rural sectors with trained drivers, attendants, and first-aid provisions.',
      features: ['Siwan Town & Sadar Coverage', 'Trained Drivers & Conductors', 'Speed Governors & First Aid', 'Assigned Route Management'],
      color: 'from-orange-600 to-amber-700',
    },
    {
      title: 'Sports & Athletics Complex',
      icon: Trophy,
      subtitle: 'Physical Fitness & Sportsmanship',
      description:
        'Expansive grounds for Football, Cricket, Volleyball, Badminton courts, and Annual Athletics Meets that inculcate discipline, teamwork, resilience, and physical fitness.',
      features: ['Full Football & Cricket Field', 'Badminton Courts', 'Annual Athletics Gala', 'Professional Physical Trainers'],
      color: 'from-rose-600 to-pink-700',
    },
  ];

  const current = facilities[activeTab];

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
              Campus Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight">
              World-Class Facilities for Holistic Growth
            </h2>
          </div>
          <Link
            href="/facilities"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-900 hover:text-brand-700 group shrink-0"
          >
            Explore All Campus Facilities
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-brand-900 text-white border-brand-900 shadow-md scale-105'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-slate-500'}`} />
                {fac.title}
              </button>
            );
          })}
        </div>

        {/* Active Facility Display Card */}
        <div className="rounded-3xl bg-slate-900 text-white overflow-hidden shadow-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
          {/* Left Side: Information */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                {current.subtitle}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {current.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {current.features.map((feat, fIdx) => (
                <div
                  key={fIdx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 font-medium"
                >
                  <div className="w-2 h-2 rounded-full bg-gold-400"></div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/facilities"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold text-xs shadow-md transition-all"
              >
                Learn More About {current.title}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Side: Visual Graphic Box */}
          <div className={`lg:col-span-5 bg-gradient-to-br ${current.color} p-10 flex flex-col items-center justify-center text-center text-white relative overflow-hidden`}>
            <div className="w-32 h-32 rounded-3xl bg-white/10 border-2 border-white/20 flex items-center justify-center mb-6 shadow-2xl backdrop-blur-md">
              {React.createElement(current.icon, { className: 'w-16 h-16 text-white' })}
            </div>
            <h4 className="text-xl font-bold text-white tracking-tight mb-2">
              SARS {current.title}
            </h4>
            <p className="text-xs text-white/80 max-w-xs">
              Designed according to modern safety standards and CBSE infrastructural guidelines in Baghra, Siwan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
