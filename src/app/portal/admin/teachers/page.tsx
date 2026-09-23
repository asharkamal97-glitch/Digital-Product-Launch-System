'use client';

import React, { useState, useEffect } from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import {
  UserCheck,
  Plus,
  Mail,
  Phone,
  BookOpen,
  Award,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
} from 'lucide-react';

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    employeeId: 'SARS-T-006',
    designation: 'Faculty Educator',
    qualification: 'M.Sc., B.Ed.',
    subjectExpertise: 'Science & Mathematics',
  });

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/teachers');
      const data = await res.json();
      if (data.teachers) setTeachers(data.teachers);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);

    try {
      const res = await fetch('/api/admin/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add teacher');

      setMsg({ type: 'success', text: `Teacher ${formData.name} registered successfully!` });
      setShowAddModal(false);
      fetchTeachers();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <PortalLayout role="ADMIN">
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-950">Faculty & Staff Directory</h1>
            <p className="text-xs text-slate-500">
              Manage school educators, subject allocations, and staff user credentials.
            </p>
          </div>

          <button
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                employeeId: `SARS-T-00${teachers.length + 1}`,
              }));
              setShowAddModal(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs flex items-center gap-1.5 shadow"
          >
            <Plus className="w-3.5 h-3.5 text-gold-400" />
            Add Faculty Member
          </button>
        </div>

        {msg && (
          <div
            className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
              msg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
            <span>{msg.text}</span>
          </div>
        )}

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 py-12 text-center text-slate-500 text-sm">
              Loading faculty directory...
            </div>
          ) : (
            teachers.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-brand-900 text-gold-400 font-bold flex items-center justify-center text-base shadow">
                      {t.user.name[0]}
                    </div>
                    <span className="font-mono text-xs font-bold text-brand-900 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
                      {t.employeeId}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">{t.user.name}</h3>
                    <p className="text-xs font-semibold text-gold-700">{t.designation}</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <p className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-brand-900 shrink-0" />
                      <span>Subject: <strong className="text-slate-800">{t.subjectExpertise}</strong></span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-brand-900 shrink-0" />
                      <span>{t.qualification}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-brand-900 shrink-0" />
                      <span>{t.user.phone || '+91 9006326786'}</span>
                    </p>
                    <p className="flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-brand-900 shrink-0" />
                      <span>{t.user.email || 'teacher@sarssiwan.com'}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Username: <strong className="text-slate-700">{t.user.username}</strong></span>
                  <span className="text-emerald-700 font-bold">Active Staff</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Teacher Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-6 animate-fade-in my-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-brand-950">Add Faculty Member</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anand Prakash"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Employee ID *</label>
                    <input
                      type="text"
                      required
                      value={formData.employeeId}
                      onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-mono font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9835012345"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Subject Expertise *</label>
                  <input
                    type="text"
                    required
                    value={formData.subjectExpertise}
                    onChange={(e) => setFormData({ ...formData, subjectExpertise: e.target.value })}
                    placeholder="e.g. Mathematics, Physics, English"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Designation / Role</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold">Cancel</button>
                  <button type="submit" disabled={saving} className="px-5 py-2 rounded-xl bg-brand-900 text-white font-bold shadow">
                    {saving ? 'Saving...' : 'Register Teacher'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
