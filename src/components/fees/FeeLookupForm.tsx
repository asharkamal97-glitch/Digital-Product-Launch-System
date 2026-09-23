'use client';

import React, { useState } from 'react';
import {
  Search,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  ShieldCheck,
  Building,
  Sparkles,
  ArrowRight,
  Receipt as ReceiptIcon,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatINR, formatDate } from '@/lib/utils';
import ProfessionalReceiptModal from './ProfessionalReceiptModal';

export default function FeeLookupForm() {
  const [identifier, setIdentifier] = useState('SARS-2026-001');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [generatedReceipt, setGeneratedReceipt] = useState<any>(null);

  const sampleAdmissions = [
    { label: 'Aarav Singh (Class 10)', val: 'SARS-2026-001' },
    { label: 'Zainab Ansari (Class 10)', val: 'SARS-2026-002' },
    { label: 'Rohan Gupta (Class 9)', val: 'SARS-2026-003' },
    { label: 'Priya Yadav (Class 9)', val: 'SARS-2026-004' },
    { label: 'Aditya Mishra (Class 8)', val: 'SARS-2026-005' },
  ];

  const handleLookup = async (lookupId?: string) => {
    const idToSearch = (lookupId || identifier).trim();
    if (!idToSearch) {
      setError('Please enter a valid Admission Number, Roll Number, or Student ID');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/fees/lookup?identifier=${encodeURIComponent(idToSearch)}`);
      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.error || 'Student fee record not found');
      }

      setData(resData);
      if (resData.unpaidInvoices && resData.unpaidInvoices.length > 0) {
        setSelectedInvoiceId(resData.unpaidInvoices[0].id);
      } else {
        setSelectedInvoiceId(null);
      }
    } catch (err: any) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async (invoice: any) => {
    setIsPaying(true);
    setError(null);

    try {
      // 1. Create Gateway Order
      const dueAmount = invoice.totalAmount - invoice.paidAmount;
      const orderRes = await fetch('/api/fees/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: data.student.id,
          invoiceId: invoice.id,
          amount: dueAmount,
          paymentMethod: 'ONLINE_RAZORPAY',
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || 'Failed to initiate payment');

      // 2. Mock payment simulation (or live Razorpay checkout)
      const mockPaymentId = `pay_mock_${Date.now()}`;
      const mockSignature = `mock_sig_${Date.now()}`;

      // 3. Verify Payment on server
      const verifyRes = await fetch('/api/fees/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceId: invoice.id,
          studentId: data.student.id,
          amount: dueAmount,
          paymentMethod: 'Online Payment (Razorpay / UPI / NetBanking)',
          razorpay_order_id: orderData.order.id,
          razorpay_payment_id: mockPaymentId,
          razorpay_signature: mockSignature,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyData.error || 'Payment verification failed');

      // Trigger Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0F2851', '#D97706', '#059669', '#F59E0B'],
      });

      // Show Receipt Modal
      setGeneratedReceipt(verifyData.receipt);
      setReceiptModalOpen(true);

      // Refresh student fee data
      handleLookup(data.student.admissionNo);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Lookup Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="text-center space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Safe & Instant Online Payment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-950">
              Pay School & Hostel Fees
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Enter your student&apos;s Admission Number (e.g., SARS-2026-001) or Roll Number to view and pay outstanding dues.
            </p>
          </div>

          {/* Search Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLookup();
            }}
            className="flex flex-col sm:flex-row gap-2 pt-2"
          >
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter Admission No (e.g. SARS-2026-001) or Roll No"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-900 text-sm font-semibold uppercase tracking-wider text-brand-950 placeholder:normal-case placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 shadow-inner"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-7 py-3.5 rounded-2xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Find Student</span>
                  <ArrowRight className="w-4 h-4 text-gold-400" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Selector Chips */}
          <div className="pt-2">
            <p className="text-[11px] font-semibold text-slate-500 mb-2">
              Quick Demo Students (Click to test):
            </p>
            <div className="flex flex-wrap gap-2">
              {sampleAdmissions.map((sample) => (
                <button
                  key={sample.val}
                  type="button"
                  onClick={() => {
                    setIdentifier(sample.val);
                    handleLookup(sample.val);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      {/* Lookup Result Content */}
      {data && (
        <div className="space-y-6 animate-fade-in">
          {/* Verified Student Profile Summary Card */}
          <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-700/60">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 text-brand-950 flex items-center justify-center font-bold text-2xl shadow-lg border-2 border-white/20">
                  {data.student.firstName[0]}
                  {data.student.lastName[0]}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="text-xs font-bold bg-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/40 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Student Record
                    </span>
                    {data.student.isResidential && (
                      <span className="text-xs font-bold bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded-full border border-gold-400/30">
                        Hostel Resident
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-tight">
                    {data.student.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Class: <strong className="text-white">{data.student.className} - {data.student.sectionName}</strong> | Roll No: <strong className="text-white">{data.student.rollNo}</strong> | Adm No: <strong className="text-gold-300 font-mono">{data.student.admissionNo}</strong>
                  </p>
                  <p className="text-xs text-slate-300">
                    Parent/Guardian: {data.student.parentName} | Contact: {data.student.parentPhone}
                  </p>
                </div>
              </div>

              {/* Total Outstanding Counter */}
              <div className="bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/10 text-center sm:text-right shrink-0 w-full sm:w-auto">
                <p className="text-xs text-slate-300 font-medium uppercase tracking-wider">Total Outstanding Due</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-gold-400 mt-0.5">
                  {formatINR(data.summary.totalOutstanding)}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Session: {data.student.session || '2026-2027'}
                </p>
              </div>
            </div>
          </div>

          {/* Unpaid / Due Invoices Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-brand-950 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              Pending & Outstanding Invoices
            </h3>

            {data.unpaidInvoices && data.unpaidInvoices.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {data.unpaidInvoices.map((inv: any) => {
                  const due = inv.totalAmount - inv.paidAmount;
                  return (
                    <div
                      key={inv.id}
                      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                    >
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-sm text-brand-900">{inv.title}</span>
                          <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                            {inv.invoiceNo}
                          </span>
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                            Due: {formatDate(inv.dueDate)}
                          </span>
                        </div>

                        {/* Itemized Fee Chips */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                          {inv.items.map((item: any) => (
                            <div
                              key={item.id}
                              className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700"
                            >
                              <span className="text-[10px] text-slate-500 block truncate">{item.categoryName}</span>
                              <span className="font-bold text-slate-900">{formatINR(item.amount)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payment Action */}
                      <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider text-right">Payable Amount</p>
                          <p className="text-xl font-extrabold text-brand-900 text-right">{formatINR(due)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handlePay(inv)}
                          disabled={isPaying}
                          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                          {isPaying ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <CreditCard className="w-4 h-4" />
                              <span>Pay Now with UPI / Card</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900">All School Dues Are Clear!</h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  No outstanding fees are currently pending for this student. Thank you for your timely payments!
                </p>
              </div>
            )}
          </div>

          {/* Paid Invoices & Receipts History */}
          {data.paidInvoices && data.paidInvoices.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-extrabold text-brand-950 flex items-center gap-2">
                <ReceiptIcon className="w-5 h-5 text-emerald-600" />
                Fee Payment & Receipt History
              </h3>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Invoice / Term</th>
                        <th className="py-3 px-4">Amount Paid</th>
                        <th className="py-3 px-4">Receipt Number</th>
                        <th className="py-3 px-4">Payment Date</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.paidInvoices.map((inv: any) => {
                        const payment = inv.payments?.[0];
                        const receipt = payment?.receipt;
                        return (
                          <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-slate-800">
                              {inv.title}
                              <span className="block text-[10px] text-slate-400 font-mono">{inv.invoiceNo}</span>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-emerald-700">
                              {formatINR(inv.paidAmount)}
                            </td>
                            <td className="py-3.5 px-4 font-mono font-semibold text-brand-900">
                              {receipt?.receiptNo || 'SARS/REC/2026/1001'}
                            </td>
                            <td className="py-3.5 px-4 text-slate-600">
                              {formatDate(payment?.paidAt || inv.updatedAt)}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                type="button"
                                onClick={() => {
                                  setGeneratedReceipt({
                                    receiptNo: receipt?.receiptNo || 'SARS/REC/2026/1001',
                                    receiptDate: payment?.paidAt || new Date(),
                                    totalAmount: inv.paidAmount,
                                    paymentMethod: payment?.paymentMethod || 'Online (Razorpay / UPI)',
                                    verificationHash: receipt?.verificationHash || 'SARS-VERIFY-1001',
                                    studentDetails: {
                                      studentName: data.student.name,
                                      admissionNo: data.student.admissionNo,
                                      rollNo: data.student.rollNo,
                                      className: data.student.className,
                                      sectionName: data.student.sectionName,
                                      session: data.student.session,
                                      parentName: data.student.parentName,
                                      contact: data.student.parentPhone,
                                      address: data.student.address,
                                    },
                                    feeBreakdown: inv.items.map((it: any) => ({
                                      name: it.categoryName,
                                      amount: it.amount,
                                    })),
                                  });
                                  setReceiptModalOpen(true);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-900 font-bold border border-brand-200 transition-colors inline-flex items-center gap-1.5"
                              >
                                <ReceiptIcon className="w-3.5 h-3.5 text-brand-900" />
                                View Receipt
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Professional Receipt Modal */}
      <ProfessionalReceiptModal
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        receiptData={generatedReceipt}
      />
    </div>
  );
}
