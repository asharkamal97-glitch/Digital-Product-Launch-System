import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FacilitiesCarousel from '@/components/home/FacilitiesCarousel';
import Link from 'next/link';
import {
  Monitor,
  FlaskConical,
  Library,
  Home,
  Bus,
  Trophy,
  ShieldCheck,
  Sparkles,
  Utensils,
  HeartPulse,
  Video,
} from 'lucide-react';

export const metadata = {
  title: 'Campus Infrastructure & Facilities | Shabab Ashraf Residential School',
  description:
    'Explore the modern campus facilities at SARS Baghra Siwan: smart digital classrooms, science & computer labs, residential hostels, library, sports fields, and transport fleet.',
};

export default function FacilitiesPage() {
  const facilityCards = [
    {
      title: 'Digital Smart Classrooms',
      icon: Monitor,
      desc: 'Interactive touch boards, high-definition audio-visual systems, and digital educational modules mapped to CBSE syllabus.',
    },
    {
      title: 'Science & Chemistry Labs',
      icon: FlaskConical,
      desc: 'Fully outfitted Physics, Chemistry, and Biology laboratories equipped with modern apparatus and student safety gear.',
    },
    {
      title: 'Computer & Coding Workstations',
      icon: Monitor,
      desc: 'High-speed internet-connected computers providing foundational computer literacy, programming, and IT curriculum.',
    },
    {
      title: 'Residential Hostels & Dorms',
      icon: Home,
      desc: 'Spacious, well-ventilated dormitories with round-the-clock wardens, dedicated study hours, and disciplined living.',
    },
    {
      title: 'Hygienic Mess & Pure Drinking Water',
      icon: Utensils,
      desc: 'Nutritious, vegetarian and non-vegetarian balanced meals cooked in a clean kitchen with RO purified drinking water.',
    },
    {
      title: 'Medical & Emergency Care',
      icon: HeartPulse,
      desc: 'On-campus first-aid infirmary with trained attendants and prompt tie-up with prominent Siwan medical centers.',
    },
    {
      title: '24x7 CCTV Campus Security',
      icon: Video,
      desc: 'Comprehensive CCTV surveillance across all corridors, entry gates, dining halls, and campus grounds for complete student safety.',
    },
    {
      title: 'Transport Fleet in Siwan Sadar',
      icon: Bus,
      desc: 'Safe, punctual buses connecting Baghra, Khalishpur, Bhatwalia, Badli, Hasuwa, and central Siwan points.',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-slate-50">
        {/* Banner */}
        <div className="bg-brand-950 text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900 to-slate-950 opacity-90" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold border border-gold-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Modern Campus Infrastructure
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Campus Facilities & Living
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              A serene, well-equipped campus in Baghra, Siwan designed to foster academic immersion, safety, and physical wellness.
            </p>
          </div>
        </div>

        {/* Carousel Showcase */}
        <FacilitiesCarousel />

        {/* Detailed Grid of Campus Amenities */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
              Infrastructure Details
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-950">
              Complete Campus Amenities Overview
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilityCards.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center border border-brand-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{f.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
