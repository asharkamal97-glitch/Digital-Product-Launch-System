import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { db } from '@/lib/db';
import { TrendingUp, CreditCard, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
import { formatINR, formatDateTime } from '@/lib/utils';
import Link from 'next/link';

export default async function AdminPaymentsPage() {
  const payments = await db.payment.findMany({
    include: {
      student: { include: { class: true, section: true } },
      feeInvoice: true,
      receipt: true,
      transactions: true,
    },
    orderBy: { paidAt: 'desc' },
  });

  const totalRevenue = payments
    .filter((p) => p.status === 'SUCCESS')
    .reduce((acc, p) => acc + p.amount, 0);

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-950">Payment Transactions & Webhook Ledger</h1>
            <p className="text-xs text-slate-500">
              Verified online Razorpay, UPI, and cash transactions with immutable cryptographic records.
            </p>
          </div>
          <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200">
            Total Settled: {formatINR(totalRevenue)}
          </span>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Transaction ID / Ref</th>
                  <th className="py-3 px-4">Student Particulars</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Gateway Reference</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-900">
                      {p.transactionId}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {p.student.firstName} {p.student.lastName}
                      <span className="block text-[10px] text-slate-400 font-mono">{p.student.admissionNo}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{p.student.class.name}</td>
                    <td className="py-3.5 px-4 font-extrabold text-emerald-700 text-sm">{formatINR(p.amount)}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {p.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[10px] text-slate-500">
                      {p.gatewayPaymentId || 'N/A'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{formatDateTime(p.paidAt)}</td>
                    <td className="py-3.5 px-4 text-right">
                      {p.receipt ? (
                        <Link
                          href={`/verify/receipt/${p.receipt.receiptNo.replace(/\//g, '-')}`}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 inline-block text-[11px]"
                        >
                          View Receipt
                        </Link>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
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
