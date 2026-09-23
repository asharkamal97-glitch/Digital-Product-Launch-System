import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { db } from '@/lib/db';
import { Receipt, Search, Printer, CheckCircle2, QrCode as QrIcon, ShieldCheck } from 'lucide-react';
import { formatINR, formatDate, formatDateTime } from '@/lib/utils';
import Link from 'next/link';

export default async function AdminReceiptsPage() {
  const receipts = await db.receipt.findMany({
    include: {
      student: { include: { class: true, section: true, parent: true } },
      payment: true,
    },
    orderBy: { receiptDate: 'desc' },
  });

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-950">Official Fee Receipts Registry</h1>
            <p className="text-xs text-slate-500">
              Immutable electronic receipts with unique serial numbers, itemized fee breakdowns, and tamper-proof QR seals.
            </p>
          </div>
          <span className="text-xs font-bold bg-gold-50 text-gold-900 border border-gold-300 px-3 py-1.5 rounded-xl">
            {receipts.length} Official Receipts Issued
          </span>
        </div>

        {/* Receipts Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Receipt Serial No</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Class & Roll</th>
                  <th className="py-3 px-4">Total Amount Paid</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Issue Date</th>
                  <th className="py-3 px-4 text-right">Verification & Print</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {receipts.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-900">
                      {r.receiptNo}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {r.student.firstName} {r.student.lastName}
                      <span className="block text-[10px] text-slate-400 font-mono">{r.student.admissionNo}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {r.student.class.name} - {r.student.section.name} (Roll: {r.student.rollNo})
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-emerald-700 text-sm">
                      {formatINR(r.totalAmount)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {r.paymentMethod}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {formatDate(r.receiptDate)}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <Link
                        href={`/verify/receipt/${r.receiptNo.replace(/\//g, '-')}`}
                        className="px-3 py-1.5 rounded-lg bg-brand-900 hover:bg-brand-800 text-white font-bold inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <Printer className="w-3 h-3 text-gold-400" />
                        Print / PDF
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
