'use client';

import React, { useState, useEffect } from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import {
  FileSpreadsheet,
  Printer,
  Plus,
  Award,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  QrCode as QrIcon,
  ShieldCheck,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [activeCert, setActiveCert] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    studentId: '',
    type: 'BONAFIDE',
    purpose: 'Official documentation and passport verification',
    remarks: 'Bearing exemplary moral character and academic diligence.',
  });

  const [generating, setGenerating] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const [certRes, stRes] = await Promise.all([
        fetch('/api/admin/certificates'),
        fetch('/api/admin/students'),
      ]);
      const certData = await certRes.json();
      const stData = await stRes.json();

      if (certData.certificates) setCertificates(certData.certificates);
      if (stData.students) {
        setStudents(stData.students);
        if (stData.students.length > 0 && !formData.studentId) {
          setFormData((prev) => ({ ...prev, studentId: stData.students[0].id }));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setMsg(null);

    try {
      const res = await fetch('/api/admin/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate certificate');

      setMsg(`Certificate ${data.certificate.certificateNo} issued successfully!`);
      setShowGenerateModal(false);
      setActiveCert(data.certificate);
      fetchCertificates();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <PortalLayout role="ADMIN">
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-950">Official Certificate Generator</h1>
            <p className="text-xs text-slate-500">
              Issue Bonafide Certificates, Transfer Certificates (TC), and Character Certificates with dynamic QR authenticity.
            </p>
          </div>

          <button
            onClick={() => setShowGenerateModal(true)}
            className="px-5 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs flex items-center gap-2 shadow"
          >
            <Plus className="w-3.5 h-3.5 text-gold-400" />
            Issue New Certificate
          </button>
        </div>

        {msg && (
          <div className="no-print p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{msg}</span>
          </div>
        )}

        {/* Certificate Display / Printable Preview Modal */}
        {activeCert && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
              <div className="no-print bg-brand-900 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-gold-400" />
                  <span className="font-bold text-sm">Official School Certificate Preview</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold text-xs shadow"
                  >
                    <Printer className="w-3.5 h-3.5 inline mr-1" />
                    Print Certificate
                  </button>
                  <button onClick={() => setActiveCert(null)} className="p-1.5 rounded-lg text-slate-300 hover:text-white">✕</button>
                </div>
              </div>

              {/* Printable Certificate Template */}
              <div className="print-container p-10 sm:p-14 text-slate-800 bg-white border-8 border-brand-900 m-4 rounded-2xl relative">
                {/* School Header */}
                <div className="text-center border-b-2 border-gold-500 pb-6 mb-8 space-y-1">
                  <div className="w-16 h-16 rounded-2xl bg-brand-900 text-gold-400 flex items-center justify-center mx-auto mb-2 font-bold shadow-md">
                    <GraduationCap className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-brand-900 tracking-tight uppercase">
                    Shabab Ashraf Residential School
                  </h2>
                  <p className="text-xs font-bold text-gold-700 tracking-widest uppercase">
                    Village Baghra, Post Khalishpur, Siwan, Bihar - 841226 • Estd. 2001
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Affiliated to CBSE Pattern • Helpline: +91 9006326786
                  </p>
                </div>

                {/* Certificate Title Badge */}
                <div className="text-center mb-8">
                  <span className="inline-block px-6 py-2 rounded-full bg-brand-900 text-white font-extrabold text-sm sm:text-base tracking-widest uppercase shadow-md border-2 border-gold-400">
                    {activeCert.type.replace(/_/g, ' ')} CERTIFICATE
                  </span>
                  <p className="text-xs font-mono font-bold text-slate-500 mt-2">
                    Ref No: {activeCert.certificateNo}
                  </p>
                </div>

                {/* Body Paragraph */}
                {(() => {
                  const content = JSON.parse(activeCert.contentJson || '{}');
                  return (
                    <div className="space-y-6 text-sm sm:text-base leading-loose text-slate-700 text-justify">
                      <p>
                        This is to certify that <strong className="text-brand-950 font-bold border-b border-dotted border-slate-600 px-2">{content.studentName}</strong>, 
                        son/daughter of <strong className="text-brand-950 font-bold border-b border-dotted border-slate-600 px-2">{content.fatherName}</strong>, 
                        bearing Admission Number <strong className="font-mono text-brand-950 font-bold px-1">{content.admissionNo}</strong> and 
                        Roll Number <strong className="text-brand-950 font-bold px-1">{content.rollNo}</strong>, is / was a bonafide student of 
                        <strong className="text-brand-950 font-bold px-1">{content.className}</strong> at Shabab Ashraf Residential School, Baghra, Siwan during the academic session 
                        <strong className="text-brand-950 font-bold px-1">{content.session || '2026-2027'}</strong>.
                      </p>

                      <p>
                        To the best of our school records, his/her date of birth is <strong className="text-brand-950 font-bold px-1">{formatDate(content.dob)}</strong>. 
                        He/She bears an exemplary moral character and has shown sincere academic conduct.
                      </p>

                      <p>
                        Purpose of Certificate: <strong className="text-slate-900">{content.purpose}</strong>. We wish him/her all success in future academic endeavors.
                      </p>
                    </div>
                  );
                })()}

                {/* Seal & Signatures */}
                <div className="mt-14 pt-8 border-t border-slate-300 grid grid-cols-2 gap-8 items-end text-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <QrIcon className="w-6 h-6 text-brand-900" />
                      <div>
                        <span className="font-bold text-brand-900 block text-[10px]">QR Verified Document</span>
                        <span className="font-mono text-[9px] text-slate-400">{activeCert.verificationHash}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400">Date of Issue: {formatDate(activeCert.issueDate)}</p>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="h-12 flex items-end justify-end">
                      <span className="font-serif italic font-bold text-brand-900 text-base">Dr. S. Ashraf</span>
                    </div>
                    <p className="font-bold text-slate-900 border-t border-slate-300 pt-1">Principal / Head of Institution</p>
                    <p className="text-[10px] text-slate-500">Shabab Ashraf Residential School</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Issued Certificates List */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Certificate No</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Issue Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      Loading issued certificates...
                    </td>
                  </tr>
                ) : certificates.length > 0 ? (
                  certificates.map((cert) => {
                    const content = JSON.parse(cert.contentJson || '{}');
                    return (
                      <tr key={cert.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-brand-900">
                          {cert.certificateNo}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {content.studentName || cert.student.firstName}
                          <span className="block text-[10px] text-slate-400 font-mono">{cert.student.admissionNo}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            {cert.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          {formatDate(cert.issueDate)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setActiveCert(cert)}
                            className="px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-900 font-bold border border-brand-200 inline-flex items-center gap-1"
                          >
                            <Printer className="w-3 h-3" />
                            Print Certificate
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No certificates generated yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Generate Modal */}
        {showGenerateModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-6 animate-fade-in my-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-brand-950">Issue Student Certificate</h3>
                <button onClick={() => setShowGenerateModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
              </div>

              <form onSubmit={handleGenerate} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Select Student *</label>
                  <select
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.firstName} {s.lastName} ({s.admissionNo} - {s.class.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Certificate Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                  >
                    <option value="BONAFIDE">Bonafide Certificate</option>
                    <option value="TRANSFER">Transfer Certificate (TC)</option>
                    <option value="CHARACTER">Character Certificate</option>
                    <option value="ACHIEVEMENT">Achievement Certificate</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Purpose / Application For *</label>
                  <input
                    type="text"
                    required
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    placeholder="e.g. Higher studies admission, Passport verification"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                  <button type="button" onClick={() => setShowGenerateModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold">Cancel</button>
                  <button type="submit" disabled={generating} className="px-5 py-2 rounded-xl bg-brand-900 text-white font-bold shadow">
                    {generating ? 'Generating...' : 'Issue Certificate'}
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
