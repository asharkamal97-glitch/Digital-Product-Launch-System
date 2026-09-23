'use client';

import React, { useState, useEffect } from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import {
  FileText,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Phone,
  Mail,
  User,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminAdmissionsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [updating, setUpdating] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/admissions?status=${selectedStatus}`);
      const data = await res.json();
      if (data.applications) setApplications(data.applications);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [selectedStatus]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setUpdating(true);
    setMsg(null);
    try {
      const res = await fetch('/api/admin/admissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus, remarks }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update');

      setMsg(`Application ${data.application.applicationNo} updated to ${newStatus}`);
      setSelectedApp(null);
      fetchApplications();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <PortalLayout role="ADMIN">
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-950">Online Admission Applications</h1>
            <p className="text-xs text-slate-500">
              Review incoming student registrations, update verification status, and shortlist candidates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="SHORTLISTED">Shortlisted</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {msg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{msg}</span>
          </div>
        )}

        {/* Applications List Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Application ID</th>
                  <th className="py-3 px-4">Applicant Student</th>
                  <th className="py-3 px-4">Class Applying</th>
                  <th className="py-3 px-4">Father / Contact</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      Loading admission applications...
                    </td>
                  </tr>
                ) : applications.length > 0 ? (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-900">
                        {app.applicationNo}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{app.studentName}</p>
                        <p className="text-[10px] text-slate-400">{app.gender}</p>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {app.applyingForClass}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-800">{app.fatherName}</p>
                        <p className="text-[10px] text-slate-400">{app.parentPhone}</p>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {formatDate(app.submissionDate)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            app.status === 'APPROVED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : app.status === 'REJECTED'
                              ? 'bg-red-100 text-red-800'
                              : app.status === 'UNDER_REVIEW'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {app.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setRemarks(app.remarks || '');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-900 font-bold border border-brand-200"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No applications found for this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Review Modal */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-6 animate-fade-in my-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-brand-950">Application Review</h3>
                  <p className="text-xs font-mono text-slate-500">{selectedApp.applicationNo}</p>
                </div>
                <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <p><span className="text-slate-500">Applicant:</span> <strong className="text-slate-900">{selectedApp.studentName}</strong> ({selectedApp.gender}, DOB: {formatDate(selectedApp.dob)})</p>
                <p><span className="text-slate-500">Class:</span> <strong className="text-brand-900">{selectedApp.applyingForClass}</strong></p>
                <p><span className="text-slate-500">Parent:</span> {selectedApp.fatherName} & {selectedApp.motherName}</p>
                <p><span className="text-slate-500">Phone:</span> {selectedApp.parentPhone}</p>
                <p><span className="text-slate-500">Address:</span> {selectedApp.address}</p>
                <p><span className="text-slate-500">Residential Mode:</span> <strong className="text-emerald-700">{selectedApp.isResidential ? 'Hostel' : 'Day Scholar'}</strong></p>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-slate-700">Official Remarks & Notes</label>
                <textarea
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="e.g. Documents verified. Entrance test cleared."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs"
                />
              </div>

              <div className="pt-2 flex flex-wrap gap-2 justify-end border-t border-slate-100 text-xs font-bold">
                <button
                  type="button"
                  disabled={updating}
                  onClick={() => handleStatusUpdate(selectedApp.id, 'UNDER_REVIEW')}
                  className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900"
                >
                  Mark Under Review
                </button>
                <button
                  type="button"
                  disabled={updating}
                  onClick={() => handleStatusUpdate(selectedApp.id, 'REJECTED')}
                  className="px-3.5 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-800"
                >
                  Reject
                </button>
                <button
                  type="button"
                  disabled={updating}
                  onClick={() => handleStatusUpdate(selectedApp.id, 'APPROVED')}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow"
                >
                  Approve Admission
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
