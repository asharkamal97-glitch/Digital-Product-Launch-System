'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  Settings,
  Save,
  CheckCircle2,
  AlertCircle,
  Building,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Sparkles,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    name: 'Shabab Ashraf Residential School',
    shortName: 'SARS',
    tagline: 'Excellence in Education & Character Building',
    establishedYear: '2001',
    principalName: 'Dr. Shabab Ashraf',
    principalMessage: 'At SARS, we nurture intellect, ethical character, and discipline in an inspiring residential environment.',
    phone: '+91 9006326786',
    altPhone: '+91 7543073786, +91 7479600063',
    email: 'sars.baghra@gmail.com',
    altEmail: 'info@sarssiwan.com',
    address: 'Village Baghra, Post Khalishpur, Badli-Hasuwa Road',
    city: 'Siwan',
    state: 'Bihar',
    pincode: '841226',
    currentSession: '2026-27',
    lateFeePerDay: 10,
    receiptPrefix: 'SARS-2026-',
    facebookUrl: 'https://facebook.com/sarssiwan',
    youtubeUrl: 'https://youtube.com/@sarssiwan',
    instagramUrl: 'https://instagram.com/sarssiwan',
  });

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setSettings(data.settings);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update settings');

      setMsg('Institutional configuration and CMS settings updated successfully!');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-gold-700 uppercase tracking-widest">
            <Settings className="w-4 h-4" />
            <span>Master Institutional Configuration</span>
          </div>
          <h1 className="text-2xl font-extrabold text-brand-950">Website CMS & School Settings</h1>
          <p className="text-xs text-slate-500">
            Dynamically update school identity, contact information, leadership messages, and session defaults.
          </p>
        </div>

        {msg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{msg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-xs">
          {/* School Identity */}
          <div className="space-y-4">
            <h3 className="font-bold text-brand-950 text-sm border-b border-slate-100 pb-2">
              Institutional Branding & Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700">Official School Name *</label>
                <input
                  type="text"
                  required
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Short Name / Abbreviation</label>
                <input
                  type="text"
                  value={settings.shortName}
                  onChange={(e) => setSettings({ ...settings, shortName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Established Year</label>
                <input
                  type="text"
                  value={settings.establishedYear}
                  onChange={(e) => setSettings({ ...settings, establishedYear: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700">School Motto / Tagline</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Principal / Head Name</label>
                <input
                  type="text"
                  value={settings.principalName}
                  onChange={(e) => setSettings({ ...settings, principalName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700">Principal&apos;s Welcome Message</label>
                <textarea
                  rows={3}
                  value={settings.principalMessage}
                  onChange={(e) => setSettings({ ...settings, principalMessage: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-brand-950 text-sm border-b border-slate-100 pb-2">
              Helplines & Digital Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Primary Phone Number *</label>
                <input
                  type="text"
                  required
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Alternate Helpline Numbers</label>
                <input
                  type="text"
                  value={settings.altPhone}
                  onChange={(e) => setSettings({ ...settings, altPhone: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Primary Email *</label>
                <input
                  type="email"
                  required
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Secondary Email</label>
                <input
                  type="email"
                  value={settings.altEmail}
                  onChange={(e) => setSettings({ ...settings, altEmail: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Campus Address & Session Defaults */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-brand-950 text-sm border-b border-slate-100 pb-2">
              Campus Address & Session Defaults
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1 sm:col-span-3">
                <label className="font-bold text-slate-700">Street / Village Address</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">City / District</label>
                <input
                  type="text"
                  value={settings.city}
                  onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">State</label>
                <input
                  type="text"
                  value={settings.state}
                  onChange={(e) => setSettings({ ...settings, state: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">PIN Code</label>
                <input
                  type="text"
                  value={settings.pincode}
                  onChange={(e) => setSettings({ ...settings, pincode: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Current Academic Session</label>
                <input
                  type="text"
                  value={settings.currentSession}
                  onChange={(e) => setSettings({ ...settings, currentSession: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-bold text-brand-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Receipt Prefix</label>
                <input
                  type="text"
                  value={settings.receiptPrefix}
                  onChange={(e) => setSettings({ ...settings, receiptPrefix: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Late Fee Per Day (₹)</label>
                <input
                  type="number"
                  value={settings.lateFeePerDay}
                  onChange={(e) => setSettings({ ...settings, lateFeePerDay: parseFloat(e.target.value) })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-bold"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs flex items-center gap-2 shadow"
            >
              <Save className="w-4 h-4 text-gold-400" />
              <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
