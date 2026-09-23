'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Sparkles,
  CheckCircle2,
  FileText,
  Search,
  Upload,
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  ShieldCheck,
  Printer,
  Calendar,
  AlertCircle,
  ArrowRight,
  Clock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatDate } from '@/lib/utils';

export default function AdmissionsPage() {
  const [activeTab, setActiveTab] = useState<'apply' | 'track' | 'guidelines'>('apply');

  // Form State
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: '',
    gender: 'Male',
    dob: '2016-05-15',
    applyingForClass: 'Class 5',
    isResidential: true,
    fatherName: '',
    motherName: '',
    parentPhone: '',
    parentEmail: '',
    address: '',
    previousSchool: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedApp, setSubmittedApp] = useState<any>(null);

  // Tracker State
  const [trackAppNo, setTrackAppNo] = useState('SARS-ADM-2026-1001');
  const [tracking, setTracking] = useState(false);
  const [trackError, setTrackError] = useState<string | null>(null);
  const [trackResult, setTrackResult] = useState<any>(null);

  const classesList = [
    'Nursery',
    'LKG',
    'UKG',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9',
    'Class 10',
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/admissions/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });

      setSubmittedApp(data.application);
      setStep(4); // Success step
    } catch (err: any) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackAppNo.trim()) return;

    setTracking(true);
    setTrackError(null);
    setTrackResult(null);

    try {
      const res = await fetch(`/api/admissions/track?applicationNo=${encodeURIComponent(trackAppNo.trim())}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Application not found');
      setTrackResult(data.application);
    } catch (err: any) {
      setTrackError(err.message);
    } finally {
      setTracking(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-slate-50 min-h-screen">
        {/* Top Header Banner */}
        <div className="bg-brand-950 text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900 to-slate-950 opacity-90" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold border border-gold-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Admissions Open 2026-2027 • Nursery to Class 10
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Online Admission System
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Apply online in minutes, upload student credentials, receive your application number, and track status in real-time.
            </p>

            {/* Tab Navigation Pill Bar */}
            <div className="pt-4 flex items-center justify-center gap-2">
              <button
                onClick={() => setActiveTab('apply')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'apply'
                    ? 'bg-gold-500 text-brand-950 shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Apply Online Form
              </button>
              <button
                onClick={() => setActiveTab('track')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'track'
                    ? 'bg-gold-500 text-brand-950 shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Track Application Status
              </button>
              <button
                onClick={() => setActiveTab('guidelines')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'guidelines'
                    ? 'bg-gold-500 text-brand-950 shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Admission Criteria & Docs
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* TAB 1: ONLINE APPLICATION FORM */}
          {activeTab === 'apply' && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 animate-fade-in">
              {/* Step Tracker */}
              {step < 4 && (
                <div className="border-b border-slate-200 pb-6">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 max-w-lg mx-auto">
                    <div className={`flex items-center gap-2 ${step >= 1 ? 'text-brand-900' : ''}`}>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-brand-900 text-white' : 'bg-slate-100'}`}>1</span>
                      <span>Student Info</span>
                    </div>
                    <div className={`flex items-center gap-2 ${step >= 2 ? 'text-brand-900' : ''}`}>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-brand-900 text-white' : 'bg-slate-100'}`}>2</span>
                      <span>Parents Info</span>
                    </div>
                    <div className={`flex items-center gap-2 ${step >= 3 ? 'text-brand-900' : ''}`}>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-brand-900 text-white' : 'bg-slate-100'}`}>3</span>
                      <span>Review & Submit</span>
                    </div>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* STEP 1: STUDENT INFO */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-brand-950">Step 1: Student Information</h3>
                    <p className="text-xs text-slate-500">Enter personal and academic details of the applicant.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-bold text-slate-700">Full Student Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.studentName}
                        onChange={(e) => handleInputChange('studentName', e.target.value)}
                        placeholder="e.g. Mohammad Reyan"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Gender *</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs font-medium"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Date of Birth *</label>
                      <input
                        type="date"
                        required
                        value={formData.dob}
                        onChange={(e) => handleInputChange('dob', e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Applying for Class *</label>
                      <select
                        value={formData.applyingForClass}
                        onChange={(e) => handleInputChange('applyingForClass', e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs font-medium"
                      >
                        {classesList.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Admission Mode *</label>
                      <select
                        value={formData.isResidential ? 'true' : 'false'}
                        onChange={(e) => handleInputChange('isResidential', e.target.value === 'true')}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs font-medium"
                      >
                        <option value="true">Residential (Hostel Facility Required)</option>
                        <option value="false">Day Scholar (Local Commute / Bus)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.studentName.trim()) {
                          setSubmitError('Please enter student full name');
                          return;
                        }
                        setSubmitError(null);
                        setStep(2);
                      }}
                      className="px-6 py-3 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs flex items-center gap-2 shadow"
                    >
                      Next: Parent Details
                      <ArrowRight className="w-4 h-4 text-gold-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PARENT INFO */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-brand-950">Step 2: Parent & Contact Details</h3>
                    <p className="text-xs text-slate-500">Provide contact information for official communication.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Father&apos;s Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fatherName}
                        onChange={(e) => handleInputChange('fatherName', e.target.value)}
                        placeholder="e.g. Tariq Anwar"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Mother&apos;s Full Name</label>
                      <input
                        type="text"
                        value={formData.motherName}
                        onChange={(e) => handleInputChange('motherName', e.target.value)}
                        placeholder="e.g. Shabana Parveen"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Primary Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.parentPhone}
                        onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                        placeholder="e.g. +91 9835012345"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Parent Email (Optional)</label>
                      <input
                        type="email"
                        value={formData.parentEmail}
                        onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                        placeholder="parent@example.com"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-bold text-slate-700">Residential Address *</label>
                      <textarea
                        rows={2}
                        required
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Village / Town, Post Office, Police Station, District, PIN Code"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-bold text-slate-700">Previous School Attended (If any)</label>
                      <input
                        type="text"
                        value={formData.previousSchool}
                        onChange={(e) => handleInputChange('previousSchool', e.target.value)}
                        placeholder="School Name & City"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.fatherName.trim() || !formData.parentPhone.trim() || !formData.address.trim()) {
                          setSubmitError('Please fill in father name, phone number, and address');
                          return;
                        }
                        setSubmitError(null);
                        setStep(3);
                      }}
                      className="px-6 py-3 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs flex items-center gap-2 shadow"
                    >
                      Next: Review Application
                      <ArrowRight className="w-4 h-4 text-gold-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: REVIEW & SUBMIT */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-brand-950">Step 3: Review & Submit Application</h3>
                    <p className="text-xs text-slate-500">Please verify all information before final submission.</p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-2 border-b border-slate-200 pb-3">
                      <div>
                        <span className="text-slate-500 block">Applicant Name:</span>
                        <span className="font-bold text-slate-900">{formData.studentName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Class Applying For:</span>
                        <span className="font-bold text-brand-900">{formData.applyingForClass}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Gender & DOB:</span>
                        <span className="font-semibold text-slate-800">{formData.gender} ({formData.dob})</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Hostel Preference:</span>
                        <span className="font-semibold text-slate-800">{formData.isResidential ? 'Residential Hostel' : 'Day Scholar'}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-500 block">Father / Guardian:</span>
                        <span className="font-bold text-slate-900">{formData.fatherName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Contact Phone:</span>
                        <span className="font-bold text-slate-900">{formData.parentPhone}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-500 block">Address:</span>
                        <span className="font-semibold text-slate-800">{formData.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      By submitting this form, you confirm the veracity of the provided details. After submission, an application number will be issued for tracking and campus verification.
                    </span>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleApplySubmit}
                      disabled={submitting}
                      className="px-8 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold text-xs flex items-center gap-2 shadow-lg disabled:opacity-50"
                    >
                      {submitting ? (
                        <div className="w-4 h-4 border-2 border-brand-900 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Submit Online Application</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: SUCCESS ACKNOWLEDGMENT */}
              {step === 4 && submittedApp && (
                <div className="text-center space-y-6 py-6 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                      Application Successfully Submitted!
                    </span>
                    <h3 className="text-2xl font-extrabold text-brand-950">
                      Welcome to SARS Siwan
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                      Your admission application for <strong>{submittedApp.studentName}</strong> ({submittedApp.applyingForClass}) has been registered in the SARS admission database.
                    </p>
                  </div>

                  {/* Generated Application No Badge */}
                  <div className="p-6 rounded-3xl bg-brand-900 text-white max-w-md mx-auto space-y-2 shadow-xl border border-brand-800">
                    <p className="text-xs text-gold-300 font-semibold uppercase tracking-wider">Your Official Application Number</p>
                    <p className="text-2xl sm:text-3xl font-mono font-extrabold text-white tracking-wider">
                      {submittedApp.applicationNo}
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Please note this number for document verification and admission status tracking.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <button
                      onClick={() => window.print()}
                      className="px-6 py-3 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs flex items-center gap-2 shadow"
                    >
                      <Printer className="w-4 h-4 text-gold-400" />
                      Print Application Acknowledgment
                    </button>

                    <button
                      onClick={() => {
                        setTrackAppNo(submittedApp.applicationNo);
                        setActiveTab('track');
                      }}
                      className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                    >
                      Track Application Status
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: APPLICATION STATUS TRACKER */}
          {activeTab === 'track' && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 animate-fade-in">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-900 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                  Real-Time Application Status
                </span>
                <h3 className="text-2xl font-extrabold text-brand-950">Track Admission Progress</h3>
                <p className="text-xs text-slate-500">
                  Enter your assigned Application Number (e.g., SARS-ADM-2026-1001) to check review status.
                </p>
              </div>

              <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto pt-2">
                <input
                  type="text"
                  value={trackAppNo}
                  onChange={(e) => setTrackAppNo(e.target.value)}
                  placeholder="Enter Application No (e.g. SARS-ADM-2026-1001)"
                  className="flex-1 p-3.5 rounded-2xl bg-slate-50 border border-slate-300 font-mono text-xs sm:text-sm font-bold uppercase text-brand-950 focus:bg-white focus:ring-2 focus:ring-brand-900"
                />
                <button
                  type="submit"
                  disabled={tracking}
                  className="px-6 py-3.5 rounded-2xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                >
                  {tracking ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4 text-gold-400" />
                      <span>Check Status</span>
                    </>
                  )}
                </button>
              </form>

              {trackError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 max-w-xl mx-auto">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{trackError}</span>
                </div>
              )}

              {trackResult && (
                <div className="max-w-xl mx-auto bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <p className="text-[10px] text-slate-500 font-mono">Application #{trackResult.applicationNo}</p>
                      <h4 className="text-base font-bold text-slate-900">{trackResult.studentName}</h4>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        trackResult.status === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : trackResult.status === 'UNDER_REVIEW'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}
                    >
                      {trackResult.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block">Class Applied:</span>
                      <span className="font-bold text-brand-900">{trackResult.applyingForClass}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Submission Date:</span>
                      <span className="font-semibold text-slate-800">{formatDate(trackResult.submissionDate)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Father / Guardian:</span>
                      <span className="font-semibold text-slate-800">{trackResult.fatherName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Preference:</span>
                      <span className="font-semibold text-slate-800">{trackResult.isResidential ? 'Residential Hostel' : 'Day Scholar'}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-brand-900 block">Administrative Remarks:</span>
                    <p>{trackResult.remarks}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: GUIDELINES & CRITERIA */}
          {activeTab === 'guidelines' && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 animate-fade-in">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
                  Admission Policy
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-950">
                  Eligibility Criteria & Mandatory Documents
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-brand-900 text-base flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Age Criteria (As of March 31, 2026)
                  </h4>
                  <ul className="space-y-1.5 list-disc pl-4 text-xs">
                    <li><strong>Nursery:</strong> 3+ Years</li>
                    <li><strong>LKG / UKG:</strong> 4+ to 5+ Years</li>
                    <li><strong>Class 1:</strong> 6+ Years</li>
                    <li><strong>Classes 2 to 10:</strong> Based on previous academic transfer certificate</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-bold text-brand-900 text-base flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gold-600" />
                    Documents for Physical Verification
                  </h4>
                  <ul className="space-y-1.5 list-disc pl-4 text-xs">
                    <li>Birth Certificate issued by Municipal Authority / Gram Panchayat</li>
                    <li>Transfer Certificate (TC) from previous recognized school (Class 2 onwards)</li>
                    <li>4 Passport size photographs of the student and 2 of parents</li>
                    <li>Aadhaar Card copy of student and parents</li>
                    <li>Previous class marks sheet/report card</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
