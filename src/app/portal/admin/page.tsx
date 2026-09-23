import React from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import { db } from '@/lib/db';
import {
  Users,
  UserCheck,
  CreditCard,
  CalendarCheck,
  FileText,
  Bell,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Receipt,
  IdCard,
  FileSpreadsheet,
} from 'lucide-react';
import Link from 'next/link';
import { formatINR, formatDate, formatDateTime } from '@/lib/utils';

export default async function AdminDashboardPage() {
  // Fetch Metrics from SQLite / Prisma
  const [
    studentCount,
    teacherCount,
    classCount,
    admissionCount,
    noticeCount,
    payments,
    invoices,
    recentStudents,
  ] = await Promise.all([
    db.student.count(),
    db.teacher.count(),
    db.class.count(),
    db.admissionApplication.count(),
    db.notice.count(),
    db.payment.findMany({
      where: { status: 'SUCCESS' },
      include: { student: { include: { class: true } } },
      orderBy: { paidAt: 'desc' },
      take: 5,
    }),
    db.feeInvoice.findMany(),
    db.student.findMany({
      include: { class: true, section: true, parent: true },
      orderBy: { admissionDate: 'desc' },
      take: 5,
    }),
  ]);

  const totalCollected = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const totalBilled = invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
  const totalPending = totalBilled - totalCollected;

  return (
    <PortalLayout role="ADMIN">
      <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
        {/* Top Welcome Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-2.5 py-0.5 rounded border border-gold-200">
                Institutional Control Center
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Session 2026-2027
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight">
              School Administrator Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Shabab Ashraf Residential School, Baghra, Siwan. Manage admissions, fee collections, students, and academic operations.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/portal/admin/students"
              className="px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs shadow-sm transition-all"
            >
              + Add Student
            </Link>
            <Link
              href="/portal/admin/notices"
              className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold text-xs shadow-sm transition-all"
            >
              + Publish Notice
            </Link>
          </div>
        </div>

        {/* 4-Card KPI Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Enrolled Students</span>
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-900 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-brand-950">{studentCount}</p>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Across {classCount} Classes (Nursery - 10)
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Fee Collected</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-emerald-700">{formatINR(totalCollected)}</p>
            <p className="text-[11px] text-slate-500">
              Verified online & offline collections
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Outstanding Dues</span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Receipt className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-amber-700">{formatINR(totalPending)}</p>
            <p className="text-[11px] text-slate-500">
              Pending across upcoming terms
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Online Applications</span>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-purple-900">{admissionCount}</p>
            <p className="text-[11px] text-purple-700 font-semibold">
              Session 2026-27 Registrations
            </p>
          </div>
        </div>

        {/* Quick ERP Shortcuts Grid */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-brand-950">Administrative Quick Tools</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <Link
              href="/portal/admin/students"
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-900 hover:shadow-md transition-all text-center space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-900 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <p className="font-bold text-slate-900">Student Profiles</p>
            </Link>

            <Link
              href="/portal/admin/id-cards"
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-900 hover:shadow-md transition-all text-center space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <IdCard className="w-5 h-5" />
              </div>
              <p className="font-bold text-slate-900">ID Cards Batch</p>
            </Link>

            <Link
              href="/portal/admin/certificates"
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-900 hover:shadow-md transition-all text-center space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <p className="font-bold text-slate-900">Certificates (TC)</p>
            </Link>

            <Link
              href="/portal/admin/fees"
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-900 hover:shadow-md transition-all text-center space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <CreditCard className="w-5 h-5" />
              </div>
              <p className="font-bold text-slate-900">Fee Ledgers</p>
            </Link>

            <Link
              href="/portal/admin/admissions"
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-900 hover:shadow-md transition-all text-center space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <p className="font-bold text-slate-900">Admissions</p>
            </Link>

            <Link
              href="/portal/admin/audit-logs"
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-900 hover:shadow-md transition-all text-center space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="font-bold text-slate-900">Audit Trail</p>
            </Link>
          </div>
        </div>

        {/* 2-Column Tables: Recent Payments & Recent Students */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Payments */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-brand-950 flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-600" />
                Recent Fee Payments
              </h3>
              <Link href="/portal/admin/fees" className="text-xs font-bold text-brand-900 hover:underline">
                View All Payments
              </Link>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {payments.map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900">{p.student.firstName} {p.student.lastName}</p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {p.student.admissionNo} • {p.student.class.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-700">{formatINR(p.amount)}</p>
                    <p className="text-[10px] text-slate-400">{formatDate(p.paidAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Admitted Students */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-brand-950 flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-900" />
                Recently Registered Students
              </h3>
              <Link href="/portal/admin/students" className="text-xs font-bold text-brand-900 hover:underline">
                View All Directory
              </Link>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {recentStudents.map((s) => (
                <div key={s.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900">{s.firstName} {s.lastName}</p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {s.admissionNo} • {s.class.name}-{s.section.name} (Roll: {s.rollNo})
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {s.isResidential ? 'Hostel' : 'Day Scholar'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
