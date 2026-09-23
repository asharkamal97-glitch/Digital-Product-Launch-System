import React from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import { db } from '@/lib/db';
import {
  CreditCard,
  Receipt,
  Download,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { formatINR, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default async function AdminFeesPage() {
  const [feeStructures, invoices, payments] = await Promise.all([
    db.feeStructure.findMany({
      include: { class: true },
      orderBy: { class: { numericLevel: 'asc' } },
    }),
    db.feeInvoice.findMany({
      include: {
        student: { include: { class: true, section: true, parent: true } },
        items: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    }),
    db.payment.findMany({
      where: { status: 'SUCCESS' },
      include: {
        student: { include: { class: true } },
        feeInvoice: true,
      },
      orderBy: { paidAt: 'desc' },
      take: 20,
    }),
  ]);

  const totalCollected = invoices.reduce((acc, i) => acc + i.paidAmount, 0);
  const totalBilled = invoices.reduce((acc, i) => acc + i.totalAmount, 0);
  const totalDue = totalBilled - totalCollected;

  return (
    <PortalLayout role="ADMIN">
      <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-950">Fee Ledger & Accounts Management</h1>
            <p className="text-xs text-slate-500">
              Manage class fee structures, monitor invoice settlements, and track online payments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/pay-fees"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <CreditCard className="w-3.5 h-3.5" />
              Collect Online Fee
            </Link>
          </div>
        </div>

        {/* Revenue Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Billed Invoices</span>
            <p className="text-3xl font-extrabold text-brand-950">{formatINR(totalBilled)}</p>
            <p className="text-[11px] text-slate-400">Total invoice dues generated</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Collections</span>
            <p className="text-3xl font-extrabold text-emerald-700">{formatINR(totalCollected)}</p>
            <p className="text-[11px] text-emerald-600 font-semibold">Cleared through Razorpay & Cash</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Outstanding</span>
            <p className="text-3xl font-extrabold text-amber-700">{formatINR(totalDue)}</p>
            <p className="text-[11px] text-slate-400">Pending collections across terms</p>
          </div>
        </div>

        {/* Fee Structures by Class Table */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-brand-950">Standard Fee Structures by Class (2026-2027)</h3>
            <span className="text-xs text-slate-500 font-medium">CBSE Standard Rates in INR</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-4">Class</th>
                  <th className="py-2.5 px-4">Tuition Fee (Monthly)</th>
                  <th className="py-2.5 px-4">Admission Fee (One-Time)</th>
                  <th className="py-2.5 px-4">Computer & Smart Class</th>
                  <th className="py-2.5 px-4">Hostel / Residential</th>
                  <th className="py-2.5 px-4 text-right">Annual Composite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {feeStructures.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{f.class.name}</td>
                    <td className="py-2.5 px-4">{formatINR(f.tuitionFee)}/mo</td>
                    <td className="py-2.5 px-4">{formatINR(f.admissionFee)}</td>
                    <td className="py-2.5 px-4">{formatINR(f.computerFee)}/mo</td>
                    <td className="py-2.5 px-4">{formatINR(f.hostelFee)}/mo</td>
                    <td className="py-2.5 px-4 text-right font-bold text-brand-900">{formatINR(f.totalYearly)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoices Ledger Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-0">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-extrabold text-base text-brand-950">Student Fee Invoices Ledger</h3>
            <span className="text-xs text-slate-500">Latest 50 student invoices</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Invoice No</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Paid Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-brand-900">{inv.invoiceNo}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {inv.student.firstName} {inv.student.lastName}
                      <span className="block text-[10px] text-slate-400 font-mono">{inv.student.admissionNo}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{inv.student.class.name}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{formatINR(inv.totalAmount)}</td>
                    <td className="py-3 px-4 font-bold text-emerald-700">{formatINR(inv.paidAmount)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          inv.status === 'PAID'
                            ? 'bg-emerald-100 text-emerald-800'
                            : inv.status === 'PARTIAL'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500 font-medium">
                      {formatDate(inv.dueDate)}
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
