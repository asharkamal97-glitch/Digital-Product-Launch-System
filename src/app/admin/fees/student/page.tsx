import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { db } from '@/lib/db';
import { CreditCard, DollarSign, Search, Filter, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatINR, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default async function AdminStudentFeesPage() {
  const studentFees = await db.studentFee.findMany({
    include: {
      student: { include: { class: true, section: true, parent: true } },
      academicYear: true,
      invoices: true,
    },
    orderBy: { student: { class: { numericLevel: 'asc' } } },
  });

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-950">Student Fee Allocation & Adjustments</h1>
            <p className="text-xs text-slate-500">
              Manage student fee ledgers, special scholarship concessions, discounts, and payment settlements.
            </p>
          </div>
          <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200">
            {studentFees.length} Fee Accounts Active
          </span>
        </div>

        {/* Student Fee Ledger Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Student Particulars</th>
                  <th className="py-3 px-4">Class & Section</th>
                  <th className="py-3 px-4">Total Fee</th>
                  <th className="py-3 px-4">Discount</th>
                  <th className="py-3 px-4">Final Amount</th>
                  <th className="py-3 px-4">Paid Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {studentFees.map((sf) => {
                  const pending = sf.finalAmount - sf.paidAmount;
                  return (
                    <tr key={sf.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand-950 text-gold-400 font-bold flex items-center justify-center text-xs">
                            {sf.student.firstName[0]}
                          </div>
                          <div>
                            <Link href={`/admin/students/${sf.student.id}`} className="font-bold text-slate-900 hover:text-brand-900">
                              {sf.student.firstName} {sf.student.lastName}
                            </Link>
                            <p className="font-mono text-[10px] text-slate-400">{sf.student.admissionNo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {sf.student.class.name} - {sf.student.section.name}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{formatINR(sf.totalAmount)}</td>
                      <td className="py-3.5 px-4 font-semibold text-amber-700">{formatINR(sf.discount)}</td>
                      <td className="py-3.5 px-4 font-bold text-brand-900">{formatINR(sf.finalAmount)}</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-700">{formatINR(sf.paidAmount)}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            sf.status === 'PAID'
                              ? 'bg-emerald-100 text-emerald-800'
                              : sf.status === 'PARTIAL'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {sf.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/admin/students/${sf.student.id}`}
                          className="px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-900 font-bold border border-brand-200"
                        >
                          Manage Fee
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
