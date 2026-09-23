import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { db } from '@/lib/db';
import { Layers, Users, Plus, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default async function AdminClassesPage() {
  const classes = await db.class.findMany({
    include: {
      sections: true,
      students: { include: { parent: true } },
      subjects: true,
      feeStructures: true,
    },
    orderBy: { numericLevel: 'asc' },
  });

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-950">Classes & Sections Management</h1>
            <p className="text-xs text-slate-500">
              Configure standard classes, sections (A, B, C), student capacities, and subject allocations.
            </p>
          </div>
          <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200">
            {classes.length} Classes Configured
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900">{cls.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">Level {cls.numericLevel} • CBSE Standard</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-brand-50 text-brand-900 font-bold font-mono text-xs border border-brand-200">
                    {cls.students.length} Students
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Sections Active:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {cls.sections.map((sec) => (
                      <div key={sec.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <span className="font-bold text-brand-900">Section {sec.name}</span>
                        <span className="text-[10px] text-slate-500">Cap: {sec.capacity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <p className="flex items-center gap-1.5 font-medium">
                    <BookOpen className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span>{cls.subjects.length} Allocated Academic Subjects</span>
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <Link
                  href={`/admin/students?classId=${cls.id}`}
                  className="font-bold text-brand-900 hover:text-brand-700"
                >
                  View Class Roster →
                </Link>
                <Link
                  href="/admin/fees/structure"
                  className="text-emerald-700 font-bold hover:underline"
                >
                  Fee Structure
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
