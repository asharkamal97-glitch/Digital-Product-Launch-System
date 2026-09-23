'use client';

import React, { useState, useEffect } from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import {
  IdCard,
  Printer,
  GraduationCap,
  Sparkles,
  QrCode as QrIcon,
  Phone,
  MapPin,
  ShieldCheck,
  Search,
} from 'lucide-react';

export default function AdminIDCardsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/students')
      .then((res) => res.json())
      .then((data) => {
        if (data.students) setStudents(data.students);
        if (data.classes) setClasses(data.classes);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    selectedClass === 'ALL'
      ? students
      : students.filter((s) => s.classId === selectedClass);

  return (
    <PortalLayout role="ADMIN">
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        {/* Header (No Print) */}
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-950">Student ID Card Generator</h1>
            <p className="text-xs text-slate-500">
              Generate and print official student identity cards with barcodes, QR codes, and emergency contact details.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800"
            >
              <option value="ALL">All Classes (Print Batch)</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs flex items-center gap-2 shadow"
            >
              <Printer className="w-4 h-4 text-gold-400" />
              <span>Print ID Cards</span>
            </button>
          </div>
        </div>

        {/* Printable ID Cards Grid */}
        <div className="print-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 py-12 text-center text-slate-500 text-sm">
              Loading student ID cards...
            </div>
          ) : (
            filtered.map((st) => (
              <div
                key={st.id}
                className="w-full max-w-sm mx-auto bg-white rounded-2xl overflow-hidden border-2 border-brand-900 shadow-md flex flex-col justify-between"
                style={{ pageBreakInside: 'avoid' }}
              >
                {/* ID Card Top Header */}
                <div className="bg-brand-900 text-white p-3.5 text-center border-b-2 border-gold-500 relative">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-lg bg-gold-500 text-brand-950 flex items-center justify-center font-bold text-xs shadow-inner">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <span className="font-extrabold text-xs tracking-wider text-white uppercase">
                      SARS Siwan
                    </span>
                  </div>
                  <h3 className="text-[11px] font-black tracking-tight text-gold-300 uppercase leading-none">
                    Shabab Ashraf Residential School
                  </h3>
                  <p className="text-[9px] text-slate-300 mt-0.5">
                    Baghra, Post Khalishpur, Siwan, Bihar - 841226
                  </p>
                </div>

                {/* ID Card Body */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    {/* Student Photo Placeholder */}
                    <div className="w-20 h-24 rounded-xl bg-slate-100 border-2 border-slate-300 flex flex-col items-center justify-center text-brand-900 shrink-0 font-bold shadow-inner">
                      <div className="w-10 h-10 rounded-full bg-brand-900 text-gold-400 flex items-center justify-center text-sm mb-1">
                        {st.firstName[0]}
                      </div>
                      <span className="text-[9px] text-slate-400 uppercase font-mono">SARS-PHOTO</span>
                    </div>

                    {/* Particulars */}
                    <div className="space-y-1 text-xs">
                      <p className="font-extrabold text-sm text-brand-950 leading-tight">
                        {st.firstName} {st.lastName}
                      </p>
                      <div className="text-[11px] space-y-0.5 text-slate-700">
                        <p><span className="text-slate-400">Class:</span> <strong className="text-slate-900">{st.class.name} - {st.section.name}</strong></p>
                        <p><span className="text-slate-400">Roll No:</span> <strong className="text-brand-900">{st.rollNo}</strong></p>
                        <p><span className="text-slate-400">Adm No:</span> <strong className="font-mono text-brand-900">{st.admissionNo}</strong></p>
                        <p><span className="text-slate-400">Blood:</span> <strong className="text-red-700">{st.bloodGroup || 'B+'}</strong></p>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Details Strip */}
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[10px] space-y-1 text-slate-700">
                    <p className="truncate">
                      <span className="text-slate-400">Parent:</span> {st.parent?.fatherName || 'Guardian'}
                    </p>
                    <p className="flex items-center justify-between">
                      <span><span className="text-slate-400">Emergency:</span> {st.parent?.emergencyContact || '+91 9006326786'}</span>
                      <span className="font-bold text-emerald-700">{st.isResidential ? 'Hostel' : 'Day Scholar'}</span>
                    </p>
                  </div>
                </div>

                {/* ID Card Footer with QR & Signature */}
                <div className="bg-slate-100 p-2.5 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-500">
                  <div className="flex items-center gap-1.5 font-mono">
                    <QrIcon className="w-5 h-5 text-brand-900" />
                    <span>SARS-ID-2026</span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif italic font-bold text-brand-900 block text-[10px]">Principal</span>
                    <span>Valid: 2026-2027</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
