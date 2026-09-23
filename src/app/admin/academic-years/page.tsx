import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { db } from '@/lib/db';
import { Calendar, CheckCircle2, TrendingUp, Sparkles, Layers, Users, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default async function AdminAcademicYearsPage() {
  const academicYears = await db.academicYear.findMany({
    include: {
      enrollments: { include: { class: true } },
      feeStructures: true,
      studentFees: true,
    },
    orderBy: { startDate: 'desc' },
  });

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-950">Academic Years & Student Sessions</h1>
            <p className="text-xs text-slate-500">
              Manage annual academic cycles, switch active session, and handle multi-year student promotions.
            </p>
          </div>
          <span className="text-xs font-bold bg-gold-50 text-gold-900 border border-gold-300 px-3 py-1.5 rounded-xl">
            Active: 2026-27
          </span>
        </div>

        {/* Academic Years List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {academicYears.map((ay) => (
            <div
              key={ay.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-950 text-gold-400 font-extrabold flex items-center justify-center text-lg shadow">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xl text-brand-950">Session {ay.name}</h3>
                      <p className="text-xs text-slate-500">
                        {formatDate(ay.startDate)} – {formatDate(ay.endDate)}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      ay.isCurrent
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {ay.isCurrent ? 'Current Session' : ay.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Enrollments</span>
                    <p className="text-lg font-extrabold text-brand-900">{ay.enrollments.length}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Fee Structures</span>
                    <p className="text-lg font-extrabold text-emerald-700">{ay.feeStructures.length}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Fee Ledgers</span>
                    <p className="text-lg font-extrabold text-purple-700">{ay.studentFees.length}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Multi-year Historical Record Retained</span>
                <span className="text-emerald-700 font-bold">Immutable Audit</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
