import React from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import {
  Users,
  CreditCard,
  CalendarCheck,
  Award,
  CheckCircle2,
  AlertCircle,
  Receipt,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { formatINR, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default async function ParentDashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  // Find Parent Profile with Children
  const parent = await db.parent.findFirst({
    where: {
      OR: [
        { userId: session.userId },
        { user: { username: 'parent.arun' } }, // Demo fallback
      ],
    },
    include: {
      children: {
        include: {
          class: true,
          section: true,
          invoices: {
            include: { items: true },
            orderBy: { createdAt: 'desc' },
          },
          attendances: {
            take: 30,
            orderBy: { date: 'desc' },
          },
          marks: {
            include: { subject: true, exam: true },
          },
        },
      },
    },
  });

  const children = parent?.children || [];

  return (
    <PortalLayout role="PARENT">
      <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
        {/* Parent Welcome Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Parent & Guardian Workspace
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-950 mt-1">
              Welcome, {parent?.fatherName || 'Parent / Guardian'}
            </h1>
            <p className="text-xs text-slate-500">
              Monitor academic milestones, daily attendance, homework tasks, and fee settlements for your enrolled children.
            </p>
          </div>

          <Link
            href="/pay-fees"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay Children Fees</span>
          </Link>
        </div>

        {/* Children Roster Cards */}
        <div className="space-y-6">
          <h2 className="text-lg font-extrabold text-brand-950 flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-900" />
            Enrolled Children Profiles ({children.length})
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {children.map((child) => {
              const unpaidInvoices = child.invoices.filter((i) => i.status === 'UNPAID' || i.status === 'PARTIAL');
              const totalDue = unpaidInvoices.reduce((acc, i) => acc + (i.totalAmount - i.paidAmount), 0);
              const presentDays = child.attendances.filter((a) => a.status === 'PRESENT').length;
              const attendanceRate = child.attendances.length > 0 ? Math.round((presentDays / child.attendances.length) * 100) : 95;

              return (
                <div
                  key={child.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 flex flex-col justify-between"
                >
                  {/* Child Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-brand-900 text-gold-400 font-bold flex items-center justify-center text-lg shadow">
                        {child.firstName[0]}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-lg text-slate-900">
                          {child.firstName} {child.lastName}
                        </h3>
                        <p className="text-xs text-slate-500">
                          Class: <strong className="text-brand-900">{child.class.name} - {child.section.name}</strong> | Roll: <strong>{child.rollNo}</strong>
                        </p>
                      </div>
                    </div>

                    <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {child.admissionNo}
                    </span>
                  </div>

                  {/* 2-Box Summary (Attendance & Dues) */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-slate-500 font-medium">Attendance Rate</span>
                      <p className="text-2xl font-extrabold text-emerald-700">{attendanceRate}%</p>
                      <span className="text-[10px] text-slate-400">Past 30 School Days</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-slate-500 font-medium">Pending Dues</span>
                      <p className="text-2xl font-extrabold text-amber-700">{formatINR(totalDue)}</p>
                      <span className="text-[10px] text-slate-400">Quarterly Composite</span>
                    </div>
                  </div>

                  {/* Academic Results Preview */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Latest Exam Performance</h4>
                    <div className="divide-y divide-slate-100 text-xs">
                      {child.marks.slice(0, 3).map((m) => (
                        <div key={m.id} className="py-2 flex items-center justify-between">
                          <span className="font-medium text-slate-800">{m.subject.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{m.marksObtained} / 100</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">{m.grade}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                    <Link
                      href={`/pay-fees`}
                      className="w-full py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs text-center shadow transition-all block"
                    >
                      View & Pay Fees for {child.firstName}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
