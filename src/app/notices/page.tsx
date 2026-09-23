'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Bell,
  Search,
  Filter,
  Calendar,
  AlertCircle,
  FileText,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function NoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/admin/notices')
      .then((res) => res.json())
      .then((data) => {
        if (data.notices) setNotices(data.notices);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    { label: 'All Notices', val: 'ALL' },
    { label: 'Admissions', val: 'ADMISSION' },
    { label: 'Fees & Accounts', val: 'FEE' },
    { label: 'Examinations', val: 'EXAM' },
    { label: 'Holidays', val: 'HOLIDAY' },
    { label: 'General', val: 'GENERAL' },
  ];

  const filtered = notices.filter((n) => {
    const matchCategory = selectedCategory === 'ALL' || n.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      <Navbar />
      <main className="bg-slate-50 min-h-screen">
        {/* Banner */}
        <div className="bg-brand-950 text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900 to-slate-950 opacity-90" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold border border-gold-400/30">
              <Bell className="w-3.5 h-3.5" />
              Official Circulars & Announcements
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              School Notice Board
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Stay up-to-date with official academic circulars, exam timetables, fee deadlines, and holiday announcements.
            </p>
          </div>
        </div>

        {/* Notices Content */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          {/* Filter & Search Bar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {categories.map((c) => (
                <button
                  key={c.val}
                  onClick={() => setSelectedCategory(c.val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                    selectedCategory === c.val
                      ? 'bg-brand-900 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notices..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white text-slate-800"
              />
            </div>
          </div>

          {/* Notice List */}
          {loading ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              <div className="w-6 h-6 border-2 border-brand-900 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              Loading latest circulars...
            </div>
          ) : filtered.length > 0 ? (
            <div className="space-y-4">
              {filtered.map((notice) => (
                <div
                  key={notice.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          notice.priority === 'HIGH' || notice.priority === 'URGENT'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-brand-100 text-brand-800'
                        }`}
                      >
                        {notice.category}
                      </span>
                      {notice.priority === 'HIGH' && (
                        <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          High Priority
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {formatDate(notice.publishDate)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
                    {notice.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {notice.content}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">
                      Target Audience: <strong className="text-slate-600">{notice.targetAudience}</strong>
                    </span>
                    <span className="font-semibold text-brand-900">
                      Official Notice • SARS Administration
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-2">
              <Bell className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-700">No notices found matching your criteria</p>
              <p className="text-xs text-slate-500">Try clearing filters or search terms.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
