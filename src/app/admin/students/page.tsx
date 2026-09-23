'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  Users,
  Search,
  Plus,
  Download,
  Upload,
  Filter,
  CheckCircle2,
  AlertCircle,
  IdCard,
  Edit,
  Eye,
  Trash2,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for Adding Student
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male',
    dob: '2015-05-15',
    classId: '',
    sectionId: '',
    rollNo: '',
    admissionNo: '',
    fatherName: '',
    phone: '',
    address: 'Siwan, Bihar',
    isResidential: true,
  });

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/students?search=${encodeURIComponent(search)}&classId=${selectedClass}`);
      const data = await res.json();
      if (data.students) setStudents(data.students);
      if (data.classes) {
        setClasses(data.classes);
        if (!formData.classId && data.classes.length > 0) {
          setFormData((prev) => ({
            ...prev,
            classId: data.classes[0].id,
            sectionId: data.classes[0].sections?.[0]?.id || '',
          }));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [selectedClass]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStudents();
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);

    try {
      const res = await fetch('/api/admin/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create student');

      setMsg({ type: 'success', text: `Student ${formData.firstName} registered successfully!` });
      setShowAddModal(false);
      fetchStudents();
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const exportCSV = () => {
    const headers = ['Admission No', 'Roll No', 'Name', 'Class', 'Section', 'Gender', 'Father Name', 'Phone', 'Hostel', 'Status'];
    const rows = students.map((s) => [
      s.admissionNo,
      s.rollNo,
      `"${s.firstName} ${s.lastName}"`,
      s.class.name,
      s.section.name,
      s.gender,
      `"${s.parent?.fatherName || 'N/A'}"`,
      s.parent?.emergencyContact || 'N/A',
      s.isResidential ? 'Residential' : 'Day Scholar',
      s.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SARS_Students_Export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-950">Student Management System</h1>
            <p className="text-xs text-slate-500">
              Complete student registry, profile details, academic records, fee ledgers, and ID generation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={exportCSV}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
            <button
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  admissionNo: `SARS-2026-${String(students.length + 101).padStart(3, '0')}`,
                  rollNo: String(students.length + 1).padStart(2, '0'),
                }));
                setShowAddModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <Plus className="w-3.5 h-3.5 text-gold-400" />
              Add New Student
            </button>
          </div>
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

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Name, Roll, Admission No..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white"
            />
          </form>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 text-xs">
            <span className="text-slate-500 font-semibold shrink-0">Filter Class:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800"
            >
              <option value="ALL">All Classes (Nursery - 10)</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Student Particulars</th>
                  <th className="py-3 px-4">Class & Section</th>
                  <th className="py-3 px-4">Roll No</th>
                  <th className="py-3 px-4">Parent / Guardian</th>
                  <th className="py-3 px-4">Hostel / Mode</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      Loading student roster...
                    </td>
                  </tr>
                ) : students.length > 0 ? (
                  students.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand-900 text-gold-400 font-bold flex items-center justify-center text-xs shadow-sm">
                            {st.firstName[0]}
                          </div>
                          <div>
                            <Link href={`/admin/students/${st.id}`} className="font-bold text-brand-950 hover:text-brand-700">
                              {st.firstName} {st.lastName}
                            </Link>
                            <p className="font-mono text-[10px] text-slate-400">{st.admissionNo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {st.class.name} - {st.section.name}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-brand-900 font-mono">
                        {st.rollNo}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-medium text-slate-800">{st.parent?.fatherName || 'Guardian'}</p>
                        <p className="text-[10px] text-slate-400">{st.parent?.emergencyContact || '-'}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            st.isResidential ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {st.isResidential ? 'Residential' : 'Day Scholar'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {st.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <Link
                          href={`/admin/students/${st.id}`}
                          className="px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-900 font-bold border border-brand-200 inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          View Profile
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No student records found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Student Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-6 animate-fade-in my-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-brand-950">Register New Student</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="e.g. Sameer"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="e.g. Khan"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Admission Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.admissionNo}
                      onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })}
                      placeholder="SARS-2026-XXX"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 uppercase font-mono font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Roll Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.rollNo}
                      onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                      placeholder="01"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Class *</label>
                    <select
                      value={formData.classId}
                      onChange={(e) => {
                        const cls = classes.find((c) => c.id === e.target.value);
                        setFormData({
                          ...formData,
                          classId: e.target.value,
                          sectionId: cls?.sections?.[0]?.id || '',
                        });
                      }}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                    >
                      {classes.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Residential Mode *</label>
                    <select
                      value={formData.isResidential ? 'true' : 'false'}
                      onChange={(e) => setFormData({ ...formData, isResidential: e.target.value === 'true' })}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                    >
                      <option value="true">Residential Hostel</option>
                      <option value="false">Day Scholar</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Father / Guardian Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fatherName}
                      onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                      placeholder="Father's full name"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Parent Phone *</label>
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

                <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-brand-900 text-white font-bold shadow"
                  >
                    {saving ? 'Creating...' : 'Save & Register Student'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
