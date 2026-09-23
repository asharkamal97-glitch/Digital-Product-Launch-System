import React from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import { db } from '@/lib/db';
import {
  Receipt,
  CreditCard,
  Download,
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
} from 'lucide-react';
import { formatINR, formatDate, formatDateTime } from '@/lib/utils';
import Link from 'next/link';

export default async function AccountantDashboardPage() {
  const [invoices, payments, students] = await Promise.all([
    db.feeInvoice.findMany({
      include: {
        student: { include: { class: true, section: true, parent: true } },
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    db.payment.findMany({
      where: { status: 'SUCCESS' },
      include: {
        student: { include: { class: true } },
        feeInvoice: true,
        receipt: true,
      },
      orderBy: { paidAt: 'desc' },
      take: 20,
    }),
    db.student.findMany({
      include: {
        class: true,
        invoices: true,
      },
    }),
  ]);

  const totalCollected = invoices.reduce((acc, i) => acc + i.paidAmount, 0);
  const totalBilled = invoices.reduce((acc, i) => acc + i.totalAmount, 0);
  const totalDue = totalBilled - totalCollected;

  return (
    <PortalLayout role="ACCOUNTANT">
      <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-950">Accounts & Fee Collection Desk</h1>
            <p className="text-xs text-slate-500">
              Manage fee receipts, reconcile online Razorpay transactions, and track defaulter reports.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/pay-fees"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow"
            >
              <CreditCard className="w-4 h-4" />
              Collect / Settle Student Fee
            </Link>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Billed Invoices</span>
            <p className="text-3xl font-extrabold text-brand-950">{formatINR(totalBilled)}</p>
            <p className="text-[11px] text-slate-400">Total institutional receivables</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Verified Collections</span>
            <p className="text-3xl font-extrabold text-emerald-700">{formatINR(totalCollected)}</p>
            <p className="text-[11px] text-emerald-600 font-semibold">Total settled in bank accounts</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Term Dues</span>
            <p className="text-3xl font-extrabold text-amber-700">{formatINR(totalDue)}</p>
            <p className="text-[11px] text-slate-400">Total outstanding balance</p>
          </div>
        </div>

        {/* Recent Transactions & Payments Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-0">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-extrabold text-base text-brand-950">Settled Payments & Digital Receipts</h3>
            <span className="text-xs text-slate-500">Live electronic payment records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Receipt No</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Amount Paid</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-900">
                      {p.receipt?.receiptNo || 'SARS/REC/2026/1001'}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {p.student.firstName} {p.student.lastName}
                      <span className="block text-[10px] text-slate-400 font-mono">{p.student.admissionNo}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">{p.student.class.name}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700">{formatINR(p.amount)}</td>
                    <td className="py-3.5 px-4 text-slate-600">{p.paymentMethod}</td>
                    <td className="py-3.5 px-4 text-slate-500">{formatDateTime(p.paidAt)}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/verify/receipt/${(p.receipt?.receiptNo || 'SARS-REC-2026-1001').replace(/\//g, '-')}`}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 inline-block text-[11px]"
                      >
                        Verify QR
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
