'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Building,
  Navigation,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'ADMISSION',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit enquiry');

      setSuccessMsg(data.message || 'Your enquiry has been received. Our team will contact you shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: 'ADMISSION',
        message: '',
      });
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-slate-50 min-h-screen">
        {/* Banner */}
        <div className="bg-brand-950 text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900 to-slate-950 opacity-90" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold border border-gold-400/30">
              <Mail className="w-3.5 h-3.5" />
              We Are Here to Help
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Contact & Enquiries
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
              Get in touch with the admissions office or administrative team of Shabab Ashraf Residential School, Baghra, Siwan.
            </p>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Campus Info & Visiting Hours */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
                  Campus Address
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-950">
                  Reach Out to Us
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We welcome prospective parents and visitors for campus tours and admission consultations.
                </p>
              </div>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-brand-900 text-gold-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">School Campus Location</h4>
                    <p className="text-slate-600 mt-1">
                      Village Baghra, Post Khalishpur, (Near Suta Factory, Badli-Hasuwa Road), Siwan Sadar, Bihar - 841226
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-700 text-white shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Official Helplines</h4>
                    <p className="text-slate-800 font-semibold mt-1">
                      +91 9006326786 / +91 7543073786 / +91 7479600063
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-600 text-white shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Email Address</h4>
                    <p className="text-slate-800 font-semibold mt-1">
                      sars.baghra@gmail.com / info@sarssiwan.com
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-purple-700 text-white shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Administrative Office Timings</h4>
                    <p className="text-slate-600 mt-1">
                      Monday to Saturday: 8:00 AM – 3:30 PM (Sunday Closed)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="https://maps.google.com/?q=Shabab+Ashraf+Residential+School+Baghra+Siwan+Bihar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Navigation className="w-4 h-4 text-gold-400" />
                  Open Campus in Google Maps
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                    Online Helpdesk
                  </span>
                  <h3 className="text-2xl font-extrabold text-brand-950">
                    Send an Enquiry
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill out the form below and our counselor will get back to you promptly.
                  </p>
                </div>

                {successMsg && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {errorMsg && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-fade-in">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rajesh Kumar"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Contact Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 9835012345"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Email Address (Optional)</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Enquiry Category *</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs font-medium"
                      >
                        <option value="ADMISSION">Admission & Registration</option>
                        <option value="HOSTEL">Hostel & Residential Facilities</option>
                        <option value="TRANSPORT">Transport & Bus Routes</option>
                        <option value="GENERAL">General Office Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Your Message / Query *</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share class details, residential preference, or any specific questions..."
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-2xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-gold-400" />
                        <span>Submit Enquiry</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
