'use client';

import React, { useRef } from 'react';
import {
  X,
  Printer,
  Download,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  QrCode as QrIcon,
} from 'lucide-react';
import { formatINR, formatDateTime } from '@/lib/utils';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiptData: {
    receiptNo: string;
    paymentId?: string;
    receiptDate: string | Date;
    totalAmount: number;
    paymentMethod: string;
    verificationHash: string;
    studentDetails: {
      studentName: string;
      admissionNo: string;
      rollNo: string;
      className: string;
      sectionName: string;
      session?: string;
      parentName: string;
      contact?: string;
      address?: string;
    };
    feeBreakdown: {
      name: string;
      amount: number;
    }[];
  } | null;
}

export default function ProfessionalReceiptModal({
  isOpen,
  onClose,
  receiptData,
}: ReceiptModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !receiptData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Action Header (Excluded from Print) */}
        <div className="no-print bg-brand-900 text-white px-6 py-4 flex items-center justify-between border-b border-brand-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold-400" />
            <h3 className="font-bold text-sm sm:text-base">Official Electronic Fee Receipt</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold text-xs shadow transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Printable Receipt Content */}
        <div ref={printRef} className="print-container p-8 sm:p-10 text-slate-800 bg-white">
          {/* School Header */}
          <div className="border-b-2 border-brand-900 pb-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-900 text-gold-400 flex items-center justify-center font-bold text-2xl border-2 border-gold-400 shadow-md">
                  <GraduationCap className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-brand-900 tracking-tight leading-tight">
                    SHABAB ASHRAF RESIDENTIAL SCHOOL
                  </h1>
                  <p className="text-xs font-bold text-gold-700 tracking-wider uppercase">
                    Excellence in Education & Character Building • Estd. 2001
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Village Baghra, Post Khalishpur, Badli-Hasuwa Road, Siwan, Bihar - 841226
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Helpline: +91 9006326786 | Email: sars.baghra@gmail.com | Web: www.sarssiwan.com
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-center sm:text-right shrink-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  PAID & VERIFIED
                </div>
                <p className="text-[10px] text-slate-500 font-mono mt-1">
                  Receipt #{receiptData.receiptNo}
                </p>
              </div>
            </div>
          </div>

          {/* Receipt Info Sub-strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs mb-6 font-medium">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Receipt No:</span>
              <span className="font-bold text-brand-900 font-mono">{receiptData.receiptNo}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Payment Date:</span>
              <span className="font-semibold text-slate-800">{formatDateTime(receiptData.receiptDate)}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Payment Mode:</span>
              <span className="font-semibold text-slate-800">{receiptData.paymentMethod}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Session:</span>
              <span className="font-semibold text-slate-800">{receiptData.studentDetails.session || '2026-2027'}</span>
            </div>
          </div>

          {/* Student & Parent Info Table */}
          <div className="rounded-xl border border-slate-200 overflow-hidden mb-6 text-xs">
            <div className="bg-slate-100 px-4 py-2 font-bold text-brand-950 uppercase tracking-wider text-[11px]">
              Student & Parent Particulars
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Student Full Name:</span>
                <span className="font-bold text-slate-900">{receiptData.studentDetails.studentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Admission Number:</span>
                <span className="font-bold text-brand-900 font-mono">{receiptData.studentDetails.admissionNo}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Class & Section:</span>
                <span className="font-bold text-slate-900">{receiptData.studentDetails.className} - {receiptData.studentDetails.sectionName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Roll Number:</span>
                <span className="font-bold text-slate-900">{receiptData.studentDetails.rollNo}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Parent / Guardian:</span>
                <span className="font-semibold text-slate-900">{receiptData.studentDetails.parentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Contact Phone:</span>
                <span className="font-semibold text-slate-900">{receiptData.studentDetails.contact || '+91 9006326786'}</span>
              </div>
            </div>
          </div>

          {/* Fee Itemization Table */}
          <div className="rounded-xl border border-slate-200 overflow-hidden mb-6 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-900 text-white font-bold">
                  <th className="py-2.5 px-4 w-12 text-center">#</th>
                  <th className="py-2.5 px-4">Fee Category / Description</th>
                  <th className="py-2.5 px-4 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {receiptData.feeBreakdown.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="py-2.5 px-4 text-center text-slate-500">{idx + 1}</td>
                    <td className="py-2.5 px-4 font-medium text-slate-800">{item.name}</td>
                    <td className="py-2.5 px-4 text-right font-semibold text-slate-900">
                      {formatINR(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-amber-500/10 border-t-2 border-brand-900 font-bold text-sm">
                  <td colSpan={2} className="py-3 px-4 text-brand-900 text-right uppercase">
                    Total Amount Received:
                  </td>
                  <td className="py-3 px-4 text-right text-brand-900 text-base font-extrabold">
                    {formatINR(receiptData.totalAmount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer & QR Verification */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
            <div className="sm:col-span-8 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
                  <QrIcon className="w-8 h-8 text-brand-900" />
                </div>
                <div className="text-[11px] text-slate-600">
                  <p className="font-bold text-brand-900">Digital Authenticity Verification</p>
                  <p className="font-mono text-[10px] text-slate-500">
                    Hash: {receiptData.verificationHash}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Scan or visit <span className="font-semibold text-brand-900">sarssiwan.com/verify</span> to authenticate.
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 italic">
                * This is a computer-generated official receipt issued by Shabab Ashraf Residential School ERP system. No physical signature required.
              </p>
            </div>

            <div className="sm:col-span-4 text-center sm:text-right space-y-1">
              <div className="h-12 flex items-end justify-center sm:justify-end">
                <span className="font-serif italic font-bold text-brand-900 text-sm">
                  SARS Accounts Dept.
                </span>
              </div>
              <div className="border-t border-slate-300 pt-1">
                <p className="text-[11px] font-bold text-slate-800">Authorized Signatory</p>
                <p className="text-[10px] text-slate-500">SARS Baghra, Siwan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer (Excluded from Print) */}
        <div className="no-print bg-slate-100 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-slate-600">
            A confirmation copy has been logged to the student&apos;s digital account.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold flex items-center gap-1.5 shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Receipt
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 font-bold border border-slate-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
