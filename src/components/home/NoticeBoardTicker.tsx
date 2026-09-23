'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, ChevronRight, AlertCircle, Calendar } from 'lucide-react';

interface NoticeItem {
  id: string;
  title: string;
  category: string;
  priority: string;
  publishDate: string;
}

export default function NoticeBoardTicker() {
  const [notices, setNotices] = useState<NoticeItem[]>([
    {
      id: '1',
      title: 'Online Admissions Open for Academic Session 2026-2027 (Nursery to Class 10)',
      category: 'ADMISSION',
      priority: 'HIGH',
      publishDate: '2026-08-15',
    },
    {
      id: '2',
      title: 'Quarter 2 Fee Payment Portal is live. Pay online before Sep 15 to avoid late fees.',
      category: 'FEE',
      priority: 'HIGH',
      publishDate: '2026-08-20',
    },
    {
      id: '3',
      title: 'Annual Sports Extravaganza & March Past scheduled for November 14, 2026.',
      category: 'GENERAL',
      priority: 'NORMAL',
      publishDate: '2026-08-22',
    },
  ]);

  useEffect(() => {
    fetch('/api/admin/notices')
      .then((res) => res.json())
      .then((data) => {
        if (data.notices && data.notices.length > 0) {
          setNotices(data.notices);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-amber-500/10 border-y border-amber-500/20 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Ticker Label */}
        <div className="flex items-center gap-2 text-brand-900 font-bold shrink-0">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-600"></span>
          </span>
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Bell className="w-3.5 h-3.5 text-amber-600" />
            Official Announcements:
          </span>
        </div>

        {/* Notice Items Marquee / List */}
        <div className="overflow-hidden whitespace-nowrap flex-1 px-2 text-slate-800 font-medium">
          <div className="inline-flex items-center gap-6 animate-fade-in">
            {notices.map((n, idx) => (
              <Link
                key={n.id || idx}
                href="/notices"
                className="hover:text-brand-900 hover:underline inline-flex items-center gap-2"
              >
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    n.priority === 'HIGH'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-brand-100 text-brand-800'
                  }`}
                >
                  {n.category}
                </span>
                <span>{n.title}</span>
                {idx < notices.length - 1 && <span className="text-slate-300">|</span>}
              </Link>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <Link
          href="/notices"
          className="text-brand-900 font-bold hover:underline shrink-0 flex items-center gap-1 text-[11px]"
        >
          View All Notices
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
