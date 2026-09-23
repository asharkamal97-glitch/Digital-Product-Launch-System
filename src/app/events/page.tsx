import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Sparkles,
  Trophy,
  Users,
  ChevronRight,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: 'School Events & Calendar | Shabab Ashraf Residential School',
  description:
    'Discover upcoming and past annual school events, sports gala, science fairs, and celebrations at SARS Baghra Siwan.',
};

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: 'Annual Sports Extravaganza & Athletics Gala 2026',
      category: 'SPORTS',
      date: '2026-11-14',
      location: 'SARS Sports Grounds, Baghra',
      description:
        'Grand sports meet with track and field competitions, march past, inter-house football & cricket championships, and medal ceremony.',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Science, Technology & Robotics Innovation Fair',
      category: 'ACADEMIC',
      date: '2026-10-18',
      location: 'Central Laboratories & Auditorium',
      description:
        'Interactive STEM exhibits, robotic working prototypes, and art displays created by students from Class 6 to 10.',
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Parent-Teacher Academic Review Conference (Term 1)',
      category: 'ACADEMIC',
      date: '2026-09-30',
      location: 'Central Academic Block',
      description:
        'One-on-one parent-faculty sessions to discuss mid-term academic progress, behavioral development, and hostel wellbeing.',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-slate-50 min-h-screen">
        {/* Banner */}
        <div className="bg-brand-950 text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900 to-slate-950 opacity-90" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold border border-gold-400/30">
              <Calendar className="w-3.5 h-3.5" />
              Annual Events & Highlights
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              School Events & Celebrations
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Celebrating talent, sportsmanship, scientific inquiry, and cultural heritage at Shabab Ashraf Residential School.
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-brand-900/90 text-gold-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-sm border border-brand-700">
                      {ev.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(ev.date)}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {ev.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ev.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{ev.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href="/contact"
                    className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 text-brand-900 text-xs font-bold border border-slate-200 flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Event Enquiry</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
