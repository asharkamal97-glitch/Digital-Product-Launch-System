import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { db } from '@/lib/db';
import { ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

interface VerifyCertProps {
  params: {
    id: string;
  };
}

export default async function VerifyCertificatePage({ params }: VerifyCertProps) {
  const certId = decodeURIComponent(params.id).replace(/-/g, '/');

  const cert = await db.certificate.findFirst({
    where: {
      OR: [
        { certificateNo: { equals: certId } },
        { certificateNo: { contains: params.id } },
        { verificationHash: { equals: params.id } },
      ],
    },
    include: {
      student: {
        include: { class: true, section: true },
      },
    },
  });

  if (!cert) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] flex items-center justify-center p-6 bg-slate-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 text-center space-y-4 shadow-lg">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Certificate Not Found</h2>
            <p className="text-xs text-slate-500">
              The certificate reference &ldquo;{params.id}&rdquo; is not registered or valid.
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

  const content = JSON.parse(cert.contentJson || '{}');

  return (
    <>
      <Navbar />
      <main className="bg-slate-50 py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner border-2 border-amber-300">
              <Award className="w-12 h-12" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Official Institutional Certificate Verified
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-950">
                Shabab Ashraf Residential School
              </h1>
              <p className="text-xs text-slate-500">
                Official {cert.type} Certificate Record
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2.5">
                <span className="text-slate-500 font-medium">Certificate Number:</span>
                <span className="font-bold text-brand-900 font-mono">{cert.certificateNo}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2.5">
                <span className="text-slate-500 font-medium">Student Name:</span>
                <span className="font-bold text-slate-900">{content.studentName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2.5">
                <span className="text-slate-500 font-medium">Admission No:</span>
                <span className="font-mono font-bold text-slate-900">{content.admissionNo}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2.5">
                <span className="text-slate-500 font-medium">Class:</span>
                <span className="font-bold text-slate-900">{content.className}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2.5">
                <span className="text-slate-500 font-medium">Issue Date:</span>
                <span className="font-semibold text-slate-800">{formatDate(cert.issueDate)}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 font-medium">Purpose / Details:</span>
                <span className="font-semibold text-slate-900 text-right">{content.purpose}</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500">
              Verification Hash: <span className="font-mono font-bold text-brand-900">{cert.verificationHash}</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
