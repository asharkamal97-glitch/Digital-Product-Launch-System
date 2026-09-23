import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { db } from '@/lib/db';
import { UserCheck, Phone, Mail, MapPin, Users, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default async function AdminParentsPage() {
  const parents = await db.parent.findMany({
    include: {
      user: true,
      children: {
        include: { class: true, section: true },
      },
    },
    orderBy: { fatherName: 'asc' },
  });

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-950">Parents & Guardians Directory</h1>
            <p className="text-xs text-slate-500">
              Manage parent accounts, primary phone contacts, and associated student wards.
            </p>
          </div>
          <span className="text-xs font-bold bg-brand-50 text-brand-900 px-3 py-1.5 rounded-xl border border-brand-200">
            Total Guardians: {parents.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parents.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-base shadow-sm">
                    {p.fatherName[0]}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">{p.fatherName}</h3>
                    <p className="text-xs text-slate-500 font-medium">{p.motherName ? `Mother: ${p.motherName}` : 'Parent/Guardian'}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-2">
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-brand-900 shrink-0" />
                    <strong className="text-slate-800">{p.emergencyContact}</strong>
                  </p>
                  <p className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-brand-900 shrink-0" />
                    <span>{p.user.email || `${p.user.username}@gmail.com`}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-900 shrink-0" />
                    <span className="truncate">{p.address}</span>
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Enrolled Children ({p.children.length}):</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.children.map((c) => (
                      <Link
                        key={c.id}
                        href={`/admin/students/${c.id}`}
                        className="px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-900 text-[11px] font-semibold border border-brand-200 transition-colors"
                      >
                        {c.firstName} ({c.class.name})
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Username: <strong className="text-slate-700">{p.user.username}</strong></span>
                <span className="text-emerald-700 font-bold">Portal Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
