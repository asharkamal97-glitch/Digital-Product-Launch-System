import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  Calendar,
  CreditCard,
  Building,
  Printer,
  FileCheck,
} from 'lucide-react';
import { formatINR, formatDateTime } from '@/lib/utils';
import Link from 'next/link';

interface VerifyReceiptProps {
  params: {
    id: string;
  };
}

export default async function VerifyReceiptPage({ params }: VerifyReceiptProps) {
  const receiptId = decodeURIComponent(params.id).replace(/-/g, '/');

  // Lookup Receipt
  const receipt = await db.receipt.findFirst({
    where: {
      OR: [
        { receiptNo: { equals: params.id } },
        { receiptNo: { equals: decodeURIComponent(params.id) } },
        { receiptNo: { equals: receiptId } },
        { receiptNo: { contains: params.id } },
        { verificationHash: { equals: params.id } },
      ],
    },
    include: {
      payment: true,
      student: {
        include: { class: true, section: true },
      },
    },
  });

  if (!receipt) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] flex items-center justify-center p-6 bg-slate-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 text-center space-y-4 shadow-lg">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Receipt Not Found</h2>
            <p className="text-xs text-slate-500">
              The receipt identifier &ldquo;{params.id}&rdquo; could not be verified in the SARS official ledger.
            </p>
            <Link
              href="/"
              className="inline-block px-5 py-2.5 rounded-xl bg-brand-900 text-white font-bold text-xs"
            >
              Return Home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const studentDetails = JSON.parse(receipt.studentDetailsJson || '{}');
  const feeBreakdown = JSON.parse(receipt.feeBreakdownJson || '[]');

  return (
    <>
      <Navbar />
      <main className="bg-slate-50 py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Verification Shield Header */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner border-2 border-emerald-300">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Official Authenticity Verified
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-950">
                Shabab Ashraf Residential School
              </h1>
              <p className="text-xs text-slate-500">
                Official Electronic Fee Receipt Record • SARS Siwan ERP
              </p>
            </div>

            {/* Receipt Summary Details */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2.5">
                <span className="text-slate-500 font-medium">Receipt Number:</span>
                <span className="font-bold text-brand-900 font-mono">{receipt.receiptNo}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2.5">
                <span className="text-slate-500 font-medium">Student Name:</span>
                <span className="font-bold text-slate-900">{studentDetails.studentName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2.5">
                <span className="text-slate-500 font-medium">Class & Section:</span>
                <span className="font-bold text-slate-900">{studentDetails.className} - {studentDetails.sectionName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2.5">
                <span className="text-slate-500 font-medium">Admission Number:</span>
                <span className="font-mono font-bold text-slate-900">{studentDetails.admissionNo}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2.5">
                <span className="text-slate-500 font-medium">Payment Timestamp:</span>
                <span className="font-semibold text-slate-800">{formatDateTime(receipt.receiptDate)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2.5">
                <span className="text-slate-500 font-medium">Payment Method:</span>
                <span className="font-semibold text-slate-800">{receipt.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 font-bold uppercase">Total Amount Paid:</span>
                <span className="font-extrabold text-emerald-700 text-base">{formatINR(receipt.totalAmount)}</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500">
              Verification Hash: <span className="font-mono font-bold text-brand-900">{receipt.verificationHash}</span>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <Link
                href="/pay-fees"
                className="px-5 py-2.5 rounded-xl bg-brand-900 text-white font-bold text-xs shadow"
              >
                Pay Another Fee
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
