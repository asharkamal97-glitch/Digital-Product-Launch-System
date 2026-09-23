import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { db } from '@/lib/db';
import { BarChart3, TrendingUp, DollarSign, Users, Download, Receipt, AlertCircle } from 'lucide-react';
import { formatINR } from '@/lib/utils';
import Link from 'next/link';

export default async function AdminReportsPage() {
  const [invoices, students, classes] = await Promise.all([
    db.feeInvoice.findMany({
      include: { student: { include: { class: true, parent: true } }, items: true },
    }),
    db.student.findMany({
      include: { class: true, section: true, parent: true, invoices: true },
    }),
    db.class.findMany({
      include: { students: true },
      orderBy: { numericLevel: 'asc' },
    }),
  ]);

  const totalBilled = invoices.reduce((acc, i) => acc + i.totalAmount, 0);
  const totalCollected = invoices.reduce((acc, i) => acc + i.paidAmount, 0);
  const totalOutstanding = totalBilled - totalCollected;

  // Defaulters list (students with unpaid invoices)
  const defaulters = students
    .map((s) => {
      const unpaid = s.invoices.filter((i) => i.status === 'UNPAID' || i.status === 'PARTIAL');
      const due = unpaid.reduce((acc, i) => acc + (i.totalAmount - i.paidAmount), 0);
      return { student: s, dueCount: unpaid.length, totalDue: due };
    })
    .filter((d) => d.totalDue > 0)
    .sort((a, b) => b.totalDue - a.totalDue);

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                Institutional Analytics & Intelligence
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-950 mt-1">
              Financial & Academic Reports
            </h1>
            <p className="text-xs text-slate-500">
              Aggregated collection summaries, fee reconciliation metrics, and class enrollment reports.
            </p>
          </div>

          <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3.5 py-2 rounded-xl border border-slate-200">
            Session: 2026-27
          </span>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Billed Invoices</span>
            <p className="text-3xl font-extrabold text-brand-950">{formatINR(totalBilled)}</p>
            <p className="text-[11px] text-slate-400">Total invoice dues generated</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Verified Collections</span>
            <p className="text-3xl font-extrabold text-emerald-700">{formatINR(totalCollected)}</p>
            <p className="text-[11px] text-emerald-600 font-semibold">Cleared via Razorpay / Bank</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Outstanding Balance</span>
            <p className="text-3xl font-extrabold text-amber-700">{formatINR(totalOutstanding)}</p>
            <p className="text-[11px] text-slate-400">Across upcoming quarter terms</p>
          </div>
        </div>

        {/* 2-Column: Class Enrollment Matrix & Defaulter Watchlist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Class Enrollment Breakdown */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-brand-950 flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-900" />
              Enrollment Distribution by Class
            </h3>

            <div className="divide-y divide-slate-100 text-xs">
              {classes.map((cls) => {
                const count = cls.students.length;
                const percentage = Math.round((count / (students.length || 1)) * 100);
                return (
                  <div key={cls.id} className="py-2.5 flex items-center justify-between gap-4">
                    <span className="font-bold text-slate-900 w-24">{cls.name}</span>
                    <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-900 h-full rounded-full" style={{ width: `${Math.max(percentage * 5, 8)}%` }} />
                    </div>
                    <span className="font-bold text-slate-700 w-16 text-right">{count} Students</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pending Fee Watchlist */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-brand-950 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Outstanding Fee Defaulters Watchlist
            </h3>

            <div className="divide-y divide-slate-100 text-xs">
              {defaulters.slice(0, 8).map((d) => (
                <div key={d.student.id} className="py-2.5 flex items-center justify-between gap-4">
                  <div>
                    <Link href={`/admin/students/${d.student.id}`} className="font-bold text-slate-900 hover:text-brand-900">
                      {d.student.firstName} {d.student.lastName}
                    </Link>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {d.student.admissionNo} • {d.student.class.name} • Contact: {d.student.parent?.emergencyContact || '-'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-amber-700">{formatINR(d.totalDue)}</p>
                    <p className="text-[10px] text-slate-400">{d.dueCount} Term Due</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
