import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { db } from '@/lib/db';
import {
  BarChart3,
  TrendingUp,
  CreditCard,
  Receipt,
  DollarSign,
  PieChart,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { formatINR, formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function FinancialReportsPage() {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [
    allPayments,
    todayPayments,
    allInvoices,
    classes,
    feeCategories,
  ] = await Promise.all([
    db.payment.findMany({
      where: { status: 'SUCCESS' },
      include: {
        student: {
          include: { class: true },
        },
      },
      orderBy: { paidAt: 'desc' },
    }),
    db.payment.findMany({
      where: {
        status: 'SUCCESS',
        paidAt: { gte: todayStart },
      },
    }),
    db.feeInvoice.findMany({
      include: {
        student: {
          include: { class: true },
        },
      },
    }),
    db.class.findMany({
      include: {
        students: {
          include: {
            studentFees: true,
          },
        },
      },
      orderBy: { numericLevel: 'asc' },
    }),
    db.feeCategory.findMany(),
  ]);

  // Aggregations
  const totalCollected = allPayments.reduce((acc, p) => acc + p.amount, 0);
  const todayCollected = todayPayments.reduce((acc, p) => acc + p.amount, 0);
  const totalBilled = allInvoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
  const totalOutstanding = Math.max(0, totalBilled - totalCollected);
  const collectionRate = totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0;

  // Breakdown by Payment Method
  const methodMap: Record<string, number> = {};
  allPayments.forEach((p) => {
    const method = p.paymentMethod || 'OTHER';
    methodMap[method] = (methodMap[method] || 0) + p.amount;
  });

  // Breakdown by Class
  const classBreakdown = classes.map((cls) => {
    const classPayments = allPayments.filter((p) => p.student.class.id === cls.id);
    const collected = classPayments.reduce((acc, p) => acc + p.amount, 0);
    const studentCount = cls.students.length;
    const billed = cls.students.reduce((acc, s) => {
      const fees = s.studentFees.reduce((fAcc, f) => fAcc + f.finalAmount, 0);
      return acc + fees;
    }, 0);
    const outstanding = Math.max(0, billed - collected);

    return {
      name: cls.name,
      studentCount,
      billed,
      collected,
      outstanding,
      rate: billed > 0 ? Math.round((collected / billed) * 100) : 0,
    };
  });

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl mx-auto animate-fade-in text-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                Institutional Financial Intelligence
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-brand-950 mt-1">
              Fee Collections & Revenue Reports
            </h1>
            <p className="text-xs text-slate-500">
              Audit institutional revenue, method distribution, today's collections, and class-wise fee realization rates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200">
              Session: <strong className="text-brand-900">2026-27</strong>
            </span>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">Today's Collections</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-emerald-700 tracking-tight">{formatINR(todayCollected)}</p>
            <p className="text-[10px] text-slate-400 font-medium">{todayPayments.length} transactions processed today</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">Total Realized Revenue</span>
              <div className="w-8 h-8 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-brand-950 tracking-tight">{formatINR(totalCollected)}</p>
            <p className="text-[10px] text-slate-400 font-medium">{allPayments.length} lifetime receipts</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">Total Billed Demand</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Receipt className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900 tracking-tight">{formatINR(totalBilled)}</p>
            <p className="text-[10px] text-slate-400 font-medium">{allInvoices.length} student invoices generated</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">Realization Rate</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-purple-900 tracking-tight">{collectionRate}%</p>
            <p className="text-[10px] text-red-500 font-bold">Pending Dues: {formatINR(totalOutstanding)}</p>
          </div>
        </div>

        {/* Payment Methods Distribution */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-brand-950">Payment Channels & Methods Distribution</h3>
            <span className="text-xs text-slate-400">Total Settled Value</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(methodMap).map(([method, amount]) => {
              const pct = totalCollected > 0 ? Math.round((amount / totalCollected) * 100) : 0;
              return (
                <div key={method} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-600 uppercase text-[10px] block truncate">
                    {method.replace(/_/g, ' ')}
                  </span>
                  <p className="text-lg font-black text-brand-950">{formatINR(amount)}</p>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gold-500 h-full rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{pct}% of total collections</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Class-wise Realization Matrix */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-0">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-brand-950">Class-wise Revenue Realization Matrix</h3>
            <span className="text-xs text-slate-500">Breakdown by academic standard</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Class Level</th>
                  <th className="py-3 px-4">Enrolled Students</th>
                  <th className="py-3 px-4">Billed Demand</th>
                  <th className="py-3 px-4">Collected</th>
                  <th className="py-3 px-4">Outstanding Due</th>
                  <th className="py-3 px-4">Recovery %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {classBreakdown.map((row) => (
                  <tr key={row.name} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{row.name}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{row.studentCount} Students</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{formatINR(row.billed)}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700">{formatINR(row.collected)}</td>
                    <td className="py-3.5 px-4 font-semibold text-red-600">{formatINR(row.outstanding)}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                          <div
                            className={`h-full rounded-full ${
                              row.rate >= 80 ? 'bg-emerald-500' : row.rate >= 50 ? 'bg-gold-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${row.rate}%` }}
                          />
                        </div>
                        <span className="font-bold font-mono text-slate-700">{row.rate}%</span>
                      </div>
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
