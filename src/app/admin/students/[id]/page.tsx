import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import {
  User,
  GraduationCap,
  CreditCard,
  Receipt,
  CalendarCheck,
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
  IdCard,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowLeft,
  Printer,
  Bus,
  Home,
} from 'lucide-react';
import Link from 'next/link';
import { formatINR, formatDate, formatDateTime } from '@/lib/utils';

interface StudentProfileProps {
  params: { id: string };
}

export default async function StudentProfilePage({ params }: StudentProfileProps) {
  const student = await db.student.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      class: true,
      section: true,
      parent: true,
      transportRoute: true,
      enrollments: {
        include: { academicYear: true, class: true, section: true },
        orderBy: { enrolledAt: 'desc' },
      },
      studentFees: {
        include: { academicYear: true, items: { include: { feeCategory: true } } },
      },
      invoices: {
        include: { items: true, payments: { include: { receipt: true } } },
        orderBy: { createdAt: 'desc' },
      },
      payments: {
        include: { receipt: true, feeInvoice: true },
        orderBy: { paidAt: 'desc' },
      },
      attendances: {
        take: 30,
        orderBy: { date: 'desc' },
      },
      marks: {
        include: { exam: true, subject: true },
      },
      certificates: true,
    },
  });

  if (!student) {
    notFound();
  }

  const totalBilled = student.invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
  const totalPaid = student.invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const totalOutstanding = totalBilled - totalPaid;

  const totalAttendances = student.attendances.length;
  const presentCount = student.attendances.filter((a) => a.status === 'PRESENT').length;
  const attendanceRate = totalAttendances > 0 ? Math.round((presentCount / totalAttendances) * 100) : 95;

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
        {/* Back Link & Top Strip */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/students"
            className="text-xs font-bold text-slate-600 hover:text-brand-900 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Student Registry</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href={`/portal/admin/id-cards?studentId=${student.id}`}
              className="px-3.5 py-1.5 rounded-xl bg-gold-50 hover:bg-gold-100 text-gold-900 border border-gold-300 font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <IdCard className="w-3.5 h-3.5" />
              <span>Print Official ID Card</span>
            </Link>
          </div>
        </div>

        {/* Student Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="w-20 h-20 rounded-2xl bg-brand-950 text-gold-400 font-extrabold text-2xl flex items-center justify-center shadow-md border border-brand-800">
                {student.firstName[0]}{student.lastName[0]}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {student.status}
                  </span>
                  <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
                    {student.admissionNo}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-950">
                  {student.firstName} {student.lastName}
                </h1>
                <p className="text-xs text-slate-500">
                  Class: <strong className="text-slate-900">{student.class.name} - {student.section.name}</strong> | Roll No: <strong className="text-brand-900 font-mono">{student.rollNo}</strong> | Session: <strong className="text-slate-800">{student.session}</strong>
                </p>
              </div>
            </div>

            {/* Attendance & Dues Summary */}
            <div className="grid grid-cols-2 gap-3 text-center text-xs shrink-0 w-full sm:w-auto">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-0.5">
                <span className="text-[11px] font-bold text-emerald-800 uppercase">Attendance</span>
                <p className="text-2xl font-extrabold text-emerald-700">{attendanceRate}%</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-0.5">
                <span className="text-[11px] font-bold text-amber-800 uppercase">Due Balance</span>
                <p className="text-2xl font-extrabold text-amber-700">{formatINR(totalOutstanding)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Info: Personal Details & Parent/Guardian Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs">
          {/* Personal & Academic Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-brand-950 flex items-center gap-2 border-b border-slate-100 pb-3">
              <User className="w-4 h-4 text-brand-900" />
              Personal & Residential Particulars
            </h3>

            <div className="divide-y divide-slate-100 space-y-2 text-slate-700">
              <div className="flex justify-between pt-2">
                <span className="text-slate-400">Date of Birth:</span>
                <span className="font-semibold text-slate-900">{formatDate(student.dob)}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-400">Gender:</span>
                <span className="font-semibold text-slate-900">{student.gender}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-400">Blood Group:</span>
                <span className="font-bold text-red-700">{student.bloodGroup || 'B+'}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-400">Residential Status:</span>
                <span className="font-bold text-emerald-700">{student.isResidential ? 'Residential Hostel' : 'Day Scholar'}</span>
              </div>
              {student.hostelRoom && (
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">Hostel Allocation:</span>
                  <span className="font-semibold text-slate-900">{student.hostelRoom}</span>
                </div>
              )}
              {student.transportRoute && (
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">Bus Transport:</span>
                  <span className="font-semibold text-slate-900">{student.transportRoute.routeName} ({student.transportRoute.vehicleNo})</span>
                </div>
              )}
              <div className="flex justify-between pt-2">
                <span className="text-slate-400">Admission Date:</span>
                <span className="font-semibold text-slate-900">{formatDate(student.admissionDate)}</span>
              </div>
            </div>
          </div>

          {/* Parent & Guardian Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-brand-950 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Phone className="w-4 h-4 text-emerald-600" />
              Parent & Guardian Contact Information
            </h3>

            <div className="divide-y divide-slate-100 space-y-2 text-slate-700">
              <div className="flex justify-between pt-2">
                <span className="text-slate-400">Father&apos;s Name:</span>
                <span className="font-bold text-slate-900">{student.parent?.fatherName || 'Guardian'}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-400">Mother&apos;s Name:</span>
                <span className="font-semibold text-slate-900">{student.parent?.motherName || 'N/A'}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-400">Primary Contact Phone:</span>
                <span className="font-bold text-brand-900">{student.parent?.emergencyContact || '+91 9006326786'}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-400">Parent Occupation:</span>
                <span className="font-semibold text-slate-800">{student.parent?.occupation || 'Business / Agriculture'}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-slate-400">Residential Address:</span>
                <span className="font-medium text-slate-800 text-right max-w-xs">{student.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Invoices & Payment History Ledger */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-0 text-xs">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-extrabold text-base text-brand-950 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              Fee Invoices & Payments History
            </h3>
            <span className="text-xs text-slate-500 font-medium">Official Ledger</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Invoice No</th>
                  <th className="py-3 px-4">Particulars</th>
                  <th className="py-3 px-4">Total Fee</th>
                  <th className="py-3 px-4">Paid Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Receipt / Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {student.invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-900">{inv.invoiceNo}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{inv.title}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{formatINR(inv.totalAmount)}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700">{formatINR(inv.paidAmount)}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          inv.status === 'PAID'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {inv.payments?.[0]?.receipt ? (
                        <Link
                          href={`/verify/receipt/${inv.payments[0].receipt.receiptNo.replace(/\//g, '-')}`}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 inline-block text-[11px]"
                        >
                          View Receipt
                        </Link>
                      ) : (
                        <span className="text-slate-400">Payment Pending</span>
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
