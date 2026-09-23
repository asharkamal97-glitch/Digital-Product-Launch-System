'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Sparkles, Camera, Image as ImageIcon, Filter } from 'lucide-react';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const galleryItems = [
    {
      id: 1,
      title: 'Grand Academic Main Block & Courtyard',
      category: 'CAMPUS',
      imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
      caption: 'The serene and secure Baghra Siwan campus building.',
    },
    {
      id: 2,
      title: 'Interactive Smart Digital Class in Session',
      category: 'ACADEMICS',
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
      caption: 'Students engaging in multimedia visual learning.',
    },
    {
      id: 3,
      title: 'Science & Chemistry Experiments Laboratory',
      category: 'ACADEMICS',
      imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
      caption: 'Hands-on practical exploration under mentor supervision.',
    },
    {
      id: 4,
      title: 'Annual Inter-House Football Championship',
      category: 'SPORTS',
      imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
      caption: 'Fostering teamwork, speed, and sportsmanship.',
    },
    {
      id: 5,
      title: 'District Republic Day Parade Contingent',
      category: 'EVENTS',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      caption: 'SARS students marching with pride in Siwan district celebrations.',
    },
    {
      id: 6,
      title: 'Science & Robotics Model Fair',
      category: 'EVENTS',
      imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
      caption: 'Innovative student working models and STEM projects.',
    },
    {
      id: 7,
      title: 'Residential Hostel Common Block & Study Hall',
      category: 'CAMPUS',
      imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
      caption: 'Structured evening prep and comfortable living quarters.',
    },
    {
      id: 8,
      title: 'School Library & Quiet Reading Zone',
      category: 'CAMPUS',
      imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
      caption: 'Extensive repository of reference books and periodicals.',
    },
  ];

  const categories = [
    { label: 'All Photos', val: 'ALL' },
    { label: 'Campus & Facilities', val: 'CAMPUS' },
    { label: 'Academics & Labs', val: 'ACADEMICS' },
    { label: 'Sports & Athletics', val: 'SPORTS' },
    { label: 'Events & Functions', val: 'EVENTS' },
  ];

  const filtered =
    selectedCategory === 'ALL'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <>
      <Navbar />
      <main className="bg-slate-50 min-h-screen">
        {/* Banner */}
        <div className="bg-brand-950 text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900 to-slate-950 opacity-90" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold border border-gold-400/30">
              <Camera className="w-3.5 h-3.5" />
              Life at SARS Siwan
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Photo & Event Gallery
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Glimpses of academic milestones, sports achievements, Republic Day parades, cultural fests, and vibrant campus life.
            </p>
          </div>
        </div>

        {/* Filter Bar & Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Filter Chips */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.val}
                onClick={() => setSelectedCategory(cat.val)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === cat.val
                    ? 'bg-brand-900 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Photo Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <span className="absolute top-3 left-3 bg-brand-900/90 text-gold-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-sm border border-brand-700">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-900 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.caption}
                  </p>
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
