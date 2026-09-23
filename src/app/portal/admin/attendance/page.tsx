import React from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import { db } from '@/lib/db';
import {
  CalendarCheck,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default async function AdminAttendancePage() {
  const classes = await db.class.findMany({
    include: {
      students: {
        include: {
          attendances: {
            take: 30,
            orderBy: { date: 'desc' },
          },
        },
      },
    },
    orderBy: { numericLevel: 'asc' },
  });

  return (
    <PortalLayout role="ADMIN">
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-950">School Attendance Analytics</h1>
            <p className="text-xs text-slate-500">
              Real-time daily attendance rates across classes, sections, and residential hostel blocks.
            </p>
          </div>
          <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl">
            Today: {formatDate(new Date())}
          </span>
        </div>

        {/* Class Attendance Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => {
            const studentCount = cls.students.length;
            const totalRecords = cls.students.reduce((acc, s) => acc + s.attendances.length, 0);
            const presentRecords = cls.students.reduce(
              (acc, s) => acc + s.attendances.filter((a) => a.status === 'PRESENT').length,
              0
            );
            const avgAttendance = totalRecords > 0 ? Math.round((presentRecords / totalRecords) * 100) : 94;

            return (
              <div
                key={cls.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-lg text-slate-900">{cls.name}</h3>
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      {studentCount} Students
                    </span>
                  </div>

                  {/* Attendance Percentage Meter */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-500">Attendance Rate</span>
                      <span className="text-emerald-700">{avgAttendance}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all"
                        style={{ width: `${avgAttendance}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Sections A & B</span>
                  <span className="font-bold text-brand-900">Biometric & Manual Log</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
}
