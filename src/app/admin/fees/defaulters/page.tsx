import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { db } from '@/lib/db';
import {
  ShieldAlert,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  ArrowUpRight,
  CreditCard,
  User,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import { formatINR, formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function FeeDefaultersPage({
  searchParams,
}: {
  searchParams: { classId?: string; minDue?: string };
}) {
  const selectedClassId = searchParams.classId || 'ALL';
  const minDue = parseFloat(searchParams.minDue || '0');

  const [classes, studentFees] = await Promise.all([
    db.class.findMany({
      include: { sections: true },
      orderBy: { numericLevel: 'asc' },
    }),
    db.studentFee.findMany({
      where: {
        status: { in: ['UNPAID', 'PARTIAL', 'OVERDUE'] },
        ...(selectedClassId !== 'ALL'
          ? { student: { classId: selectedClassId } }
          : {}),
      },
      include: {
        student: {
          include: {
            class: true,
            section: true,
            parent: true,
          },
        },
        academicYear: true,
      },
      orderBy: { finalAmount: 'desc' },
    }),
  ]);

  // Filter by outstanding amount > minDue
  const defaulters = studentFees
    .map((sf) => {
      const outstanding = sf.finalAmount - sf.paidAmount;
      const daysOverdue = Math.max(
        0,
        Math.floor(
          (Date.now() - new Date(sf.dueDate).getTime()) / (1000 * 60 * 60 * 24)
        )
      );
      return {
        ...sf,
        outstanding,
        daysOverdue,
      };
    })
    .filter((d) => d.outstanding > minDue);

  const totalOutstanding = defaulters.reduce(
    (acc, d) => acc + d.outstanding,
    0
  );

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in text-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2.5 py-0.5 rounded border border-red-200">
                Accounts & Collections Watchlist
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-brand-950 mt-1">
              Outstanding Fee Defaulters
            </h1>
            <p className="text-xs text-slate-500">
              Track overdue student fee invoices, days past due date, and emergency parent contacts for follow-up.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-4 text-xs">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-red-600 uppercase font-bold block">Total Overdue Dues</span>
              <strong className="text-lg font-black text-red-950">{formatINR(totalOutstanding)}</strong>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-slate-700">Filter by Class:</span>
            <div className="flex flex-wrap gap-1.5">
              <Link
                href="/admin/fees/defaulters"
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                  selectedClassId === 'ALL'
                    ? 'bg-brand-950 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Classes ({studentFees.length})
              </Link>
              {classes.map((cls) => (
                <Link
                  key={cls.id}
                  href={`/admin/fees/defaulters?classId=${cls.id}`}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                    selectedClassId === cls.id
                      ? 'bg-brand-950 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cls.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="text-slate-500 font-medium">
            Found <strong>{defaulters.length}</strong> students with pending dues
          </div>
        </div>

        {/* Defaulters Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Student Particulars</th>
                  <th className="py-3 px-4">Class & Section</th>
                  <th className="py-3 px-4">Guardian Contact</th>
                  <th className="py-3 px-4">Billed Amount</th>
                  <th className="py-3 px-4">Paid</th>
                  <th className="py-3 px-4">Outstanding Due</th>
                  <th className="py-3 px-4">Days Overdue</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {defaulters.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      No fee defaulters found for the selected class criteria.
                    </td>
                  </tr>
                ) : (
                  defaulters.map((d) => (
                    <tr key={d.id} className="hover:bg-red-50/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                            {d.student.firstName[0]}
                          </div>
                          <div>
                            <Link
                              href={`/admin/students/${d.student.id}`}
                              className="font-bold text-slate-900 hover:text-brand-900 block hover:underline"
                            >
                              {d.student.firstName} {d.student.lastName}
                            </Link>
                            <span className="font-mono text-[10px] text-slate-400">
                              {d.student.admissionNo} · Roll #{d.student.rollNo}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {d.student.class.name} ({d.student.section.name})
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900 leading-tight">
                          {d.student.parent?.fatherName || 'Parent / Guardian'}
                        </p>
                        <p className="font-mono text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Phone className="w-2.5 h-2.5 text-slate-400" />
                          {d.student.parent?.emergencyContact || '+91 9006326786'}
                        </p>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        {formatINR(d.finalAmount)}
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-emerald-700">
                        {formatINR(d.paidAmount)}
                      </td>

                      <td className="py-3.5 px-4">
                        <strong className="text-red-600 font-extrabold text-sm">
                          {formatINR(d.outstanding)}
                        </strong>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-lg font-bold text-[10px] ${
                            d.daysOverdue > 60
                              ? 'bg-red-100 text-red-800'
                              : d.daysOverdue > 30
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {d.daysOverdue} Days Past Due
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/admin/fees/collect?admissionNo=${d.student.admissionNo}`}
                          className="px-3 py-1.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold text-xs inline-flex items-center gap-1 shadow-sm transition-transform hover:scale-105"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Collect</span>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
