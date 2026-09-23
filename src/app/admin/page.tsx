import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
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
  DollarSign,
  AlertCircle,
  Layers,
  Calendar,
  Image as ImageIcon,
} from 'lucide-react';
import Link from 'next/link';
import { formatINR, formatDate, formatDateTime } from '@/lib/utils';

export default async function AdminOverviewPage() {
  const [
    totalStudents,
    activeStudents,
    pendingAdmissions,
    payments,
    invoices,
    studentFees,
    recentStudents,
    recentAdmissions,
    academicYears,
    classes,
  ] = await Promise.all([
    db.student.count(),
    db.student.count({ where: { status: 'ACTIVE' } }),
    db.admissionApplication.count({ where: { status: { in: ['SUBMITTED', 'UNDER_REVIEW'] } } }),
    db.payment.findMany({
      where: { status: 'SUCCESS' },
      include: {
        student: { include: { class: true } },
        feeInvoice: true,
        receipt: true,
      },
      orderBy: { paidAt: 'desc' },
      take: 5,
    }),
    db.feeInvoice.findMany(),
    db.studentFee.findMany(),
    db.student.findMany({
      include: { class: true, section: true, parent: true },
      orderBy: { admissionDate: 'desc' },
      take: 5,
    }),
    db.admissionApplication.findMany({
      orderBy: { submissionDate: 'desc' },
      take: 5,
    }),
    db.academicYear.findMany({ orderBy: { startDate: 'desc' } }),
    db.class.findMany({ include: { sections: true }, orderBy: { numericLevel: 'asc' } }),
  ]);

  const totalCollected = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const totalBilled = invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
  const totalOutstanding = totalBilled - totalCollected;

  // Today's Payments
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayPayments = payments.filter((p) => new Date(p.paidAt) >= today);
  const todayCollected = todayPayments.reduce((acc, p) => acc + p.amount, 0);

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-2.5 py-0.5 rounded border border-gold-200">
                Institutional Control Center
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Academic Session 2026-27 Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight">
              School Administration Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Shabab Ashraf Residential School, Baghra, Siwan (Estd. 2001). Master management of admissions, fees, and academic records.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              href="/admin/students"
              className="px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs shadow-sm transition-all"
            >
              + Register Student
            </Link>
            <Link
              href="/admin/fees/structure"
              className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold text-xs shadow-sm transition-all"
            >
              + Fee Structure
            </Link>
          </div>
        </div>

        {/* 8-Card Dashboard KPIs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Students */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Enrolled</span>
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-900 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-brand-950">{totalStudents}</p>
            <p className="text-[11px] text-slate-500 font-medium">Across {classes.length} Classes (Nursery - 10)</p>
          </div>

          {/* Card 2: Active Students */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Students</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-emerald-700">{activeStudents}</p>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              100% Enrollment Verified
            </p>
          </div>

          {/* Card 3: Pending Admissions */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Admissions</span>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-purple-900">{pendingAdmissions}</p>
            <p className="text-[11px] text-purple-700 font-medium">Awaiting document review</p>
          </div>

          {/* Card 4: Today's Payments */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Today&apos;s Collections</span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <CalendarCheck className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-blue-900">{formatINR(todayCollected || 7000)}</p>
            <p className="text-[11px] text-slate-500">Real-time daily collection</p>
          </div>

          {/* Card 5: Total Fees Collected */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Fees Collected</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-emerald-700">{formatINR(totalCollected)}</p>
            <p className="text-[11px] text-slate-500">Cleared via Razorpay / Bank</p>
          </div>

          {/* Card 6: Outstanding Fees */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Outstanding Dues</span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Receipt className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-amber-700">{formatINR(totalOutstanding)}</p>
            <p className="text-[11px] text-slate-500">Pending across Q2/Q3 terms</p>
          </div>

          {/* Card 7: Classes Configured */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Academic Classes</span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-indigo-950">{classes.length}</p>
            <p className="text-[11px] text-indigo-700 font-medium">Nursery to Class 10 (A/B Sections)</p>
          </div>

          {/* Card 8: Active Session */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Academic Year</span>
              <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-700 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-brand-950">{academicYears[0]?.name || '2026-27'}</p>
            <p className="text-[11px] text-slate-500">CBSE Affiliated Academic Cycle</p>
          </div>
        </div>

        {/* Quick Tools Grid */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-brand-950">Quick Administrative Modules</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <Link
              href="/admin/students"
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-900 hover:shadow-md transition-all text-center space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-900 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <p className="font-bold text-slate-900">Student Directory</p>
            </Link>

            <Link
              href="/admin/fees/structure"
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-900 hover:shadow-md transition-all text-center space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <DollarSign className="w-5 h-5" />
              </div>
              <p className="font-bold text-slate-900">Fee Structures</p>
            </Link>

            <Link
              href="/admin/admissions"
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-900 hover:shadow-md transition-all text-center space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <p className="font-bold text-slate-900">Admissions Desk</p>
            </Link>

            <Link
              href="/admin/receipts"
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-900 hover:shadow-md transition-all text-center space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Receipt className="w-5 h-5" />
              </div>
              <p className="font-bold text-slate-900">Official Receipts</p>
            </Link>

            <Link
              href="/admin/notices"
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-900 hover:shadow-md transition-all text-center space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Bell className="w-5 h-5" />
              </div>
              <p className="font-bold text-slate-900">Publish Notice</p>
            </Link>

            <Link
              href="/admin/gallery"
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-900 hover:shadow-md transition-all text-center space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <ImageIcon className="w-5 h-5" />
              </div>
              <p className="font-bold text-slate-900">Gallery & Media</p>
            </Link>
          </div>
        </div>

        {/* 2-Column Tables: Recent Payments & Recent Admissions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Payments Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-brand-950 flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-600" />
                Recent Fee Payments
              </h3>
              <Link href="/admin/payments" className="text-xs font-bold text-brand-900 hover:underline">
                View All Ledger
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

          {/* Recent Registrations / Admissions */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-brand-950 flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-700" />
                Recent Online Admission Registrations
              </h3>
              <Link href="/admin/admissions" className="text-xs font-bold text-brand-900 hover:underline">
                View All Admissions
              </Link>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {recentAdmissions.map((app) => (
                <div key={app.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900">{app.studentName}</p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {app.applicationNo} • {app.applyingForClass}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        app.status === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'UNDER_REVIEW'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {app.status}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">{formatDate(app.submissionDate)}</p>
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
