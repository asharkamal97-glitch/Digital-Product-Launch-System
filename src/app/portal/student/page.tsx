import React from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import {
  GraduationCap,
  CreditCard,
  Award,
  CalendarCheck,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  Receipt,
  QrCode as QrIcon,
} from 'lucide-react';
import { formatINR, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default async function StudentDashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  // Find Student Profile
  const student = await db.student.findFirst({
    where: {
      OR: [
        { userId: session.userId },
        { admissionNo: 'SARS-2026-001' }, // Demo fallback
      ],
    },
    include: {
      class: true,
      section: true,
      parent: true,
      invoices: {
        include: { items: true },
        orderBy: { createdAt: 'desc' },
      },
      attendances: {
        take: 30,
        orderBy: { date: 'desc' },
      },
      marks: {
        include: { exam: true, subject: true },
      },
    },
  });

  if (!student) {
    return (
      <PortalLayout role="STUDENT">
        <div className="p-8 bg-white rounded-3xl text-center">Student record not linked.</div>
      </PortalLayout>
    );
  }

  const homeworks = await db.homework.findMany({
    where: { classId: student.classId },
    orderBy: { dueDate: 'desc' },
    take: 5,
  });

  const totalAttendances = student.attendances.length;
  const presentCount = student.attendances.filter((a) => a.status === 'PRESENT').length;
  const attendanceRate = totalAttendances > 0 ? Math.round((presentCount / totalAttendances) * 100) : 95;

  return (
    <PortalLayout role="STUDENT">
      <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
        {/* Student Profile Card */}
        <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-700">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 text-brand-950 flex items-center justify-center font-bold text-2xl shadow-lg border-2 border-white/20">
                {student.firstName[0]}{student.lastName[0]}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="text-xs font-bold bg-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/40">
                    Active Student
                  </span>
                  {student.isResidential && (
                    <span className="text-xs font-bold bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded-full border border-gold-400/30">
                      Hostel Resident ({student.hostelRoom || 'Block-A'})
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {student.firstName} {student.lastName}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  Class: <strong className="text-white">{student.class.name} - {student.section.name}</strong> | Roll No: <strong className="text-white">{student.rollNo}</strong> | Adm No: <strong className="text-gold-300 font-mono">{student.admissionNo}</strong>
                </p>
                <p className="text-xs text-slate-300">
                  Guardian: {student.parent?.fatherName || 'Guardian'} • Session {student.session}
                </p>
              </div>
            </div>

            <div className="text-center sm:text-right space-y-1 bg-black/30 p-4 rounded-2xl border border-white/10 shrink-0">
              <span className="text-xs text-slate-300 font-medium uppercase">Attendance Rate</span>
              <p className="text-3xl font-extrabold text-gold-400">{attendanceRate}%</p>
              <p className="text-[10px] text-emerald-400 font-semibold">Exemplary Regularity</p>
            </div>
          </div>
        </div>

        {/* 3-Card Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fee Status Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">School Fees</span>
                <CreditCard className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Term Dues & Invoices</h3>
              <p className="text-xs text-slate-600">
                View itemized quarterly tuition, smart class, and hostel fee receipts.
              </p>
            </div>

            <Link
              href="/pay-fees"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center shadow transition-all block"
            >
              Pay Online / Get Receipt
            </Link>
          </div>

          {/* Academic Report Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Academic Progress</span>
                <Award className="w-5 h-5 text-gold-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Exam Results & Grades</h3>
              <p className="text-xs text-slate-600">
                Check terminal assessment scorecards, subject percentages, and teacher remarks.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-bold text-brand-900">
              <span>{student.marks.length} Subjects Evaluated</span>
              <span className="text-emerald-700">Passed Term 1</span>
            </div>
          </div>

          {/* Daily Schedule Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Curriculum</span>
                <Clock className="w-5 h-5 text-brand-900" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Timetable & Prep Hours</h3>
              <p className="text-xs text-slate-600">
                Class routine: 8:00 AM – 2:00 PM | Hostel Evening Prep: 6:00 PM – 8:30 PM.
              </p>
            </div>

            <span className="text-xs font-bold text-slate-500 bg-slate-100 p-2 rounded-xl text-center block">
              6 Periods Daily • Science & Computer Labs
            </span>
          </div>
        </div>

        {/* 2-Column: Homework Assignments & Exam Marks Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Homework List */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-brand-950 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-900" />
              Active Homework & Assignments
            </h3>

            <div className="divide-y divide-slate-100 text-xs">
              {homeworks.length > 0 ? (
                homeworks.map((hw) => (
                  <div key={hw.id} className="py-3.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900">{hw.title}</h4>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        Due: {formatDate(hw.dueDate)}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{hw.description}</p>
                  </div>
                ))
              ) : (
                <p className="py-6 text-center text-slate-400">No pending assignments!</p>
              )}
            </div>
          </div>

          {/* Exam Marks */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-brand-950 flex items-center gap-2">
              <Award className="w-4 h-4 text-gold-600" />
              Terminal Examination Scorecard
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-3">Subject</th>
                    <th className="py-2.5 px-3">Marks Obtained</th>
                    <th className="py-2.5 px-3 text-right">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {student.marks.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{m.subject.name}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-800">{m.marksObtained} / 100</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          {m.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
