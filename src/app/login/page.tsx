'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  GraduationCap,
  Lock,
  User,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') || 'admin';

  const [username, setUsername] = useState('superadmin');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const demoAccounts = [
    { label: 'Super Admin', user: 'superadmin', pass: 'admin123', role: 'SUPER_ADMIN', desc: 'Full System Control' },
    { label: 'School Admin', user: 'admin', pass: 'admin123', role: 'ADMIN', desc: 'Students, Admissions & Staff' },
    { label: 'Accountant', user: 'accountant', pass: 'admin123', role: 'ACCOUNTANT', desc: 'Fee Ledgers & Reports' },
    { label: 'Teacher', user: 'teacher.vikram', pass: 'teacher123', role: 'TEACHER', desc: 'Attendance & Marks' },
    { label: 'Student', user: 'sars2026001', pass: 'student123', role: 'STUDENT', desc: 'Grades, Timetable & Dues' },
    { label: 'Parent', user: 'parent.arun', pass: 'parent123', role: 'PARENT', desc: 'Multi-Child Monitor & Pay' },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push(data.redirectUrl || '/portal/admin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (acc: typeof demoAccounts[0]) => {
    setUsername(acc.user);
    setPassword(acc.pass);
    setError(null);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 space-y-6">
      <div className="text-center space-y-1">
        <div className="w-12 h-12 rounded-2xl bg-brand-900 text-gold-400 flex items-center justify-center mx-auto mb-2 shadow">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-brand-950">Portal Login</h2>
        <p className="text-xs text-slate-500">
          Sign in with your Student ID, Admission No, or Staff credentials.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4 text-xs">
        <div className="space-y-1">
          <label className="font-bold text-slate-700">Username / ID / Admission No</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. superadmin, teacher.vikram, sars2026001"
              className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs font-medium"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-700">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white text-slate-900 text-xs font-medium"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </>
          )}
        </button>
      </form>

      {/* Quick 1-Click Demo Login Selector */}
      <div className="pt-3 border-t border-slate-100 space-y-2.5">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">
          Quick 1-Click Demo Role Accounts
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {demoAccounts.map((acc) => (
            <button
              key={acc.user}
              type="button"
              onClick={() => handleQuickFill(acc)}
              className={`p-2 rounded-xl text-left border transition-all ${
                username === acc.user
                  ? 'bg-brand-50 border-brand-900 text-brand-950 font-bold shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <p className="font-bold text-[11px] truncate">{acc.label}</p>
              <p className="text-[9px] text-slate-500 truncate">{acc.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-slate-950 flex flex-col justify-between text-slate-800 p-4 sm:p-6">
      {/* Top Bar with School Link */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gold-500 text-brand-950 flex items-center justify-center font-bold shadow group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-tight">SARS Siwan</span>
            <p className="text-[10px] text-gold-300">Shabab Ashraf Residential School</p>
          </div>
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          ← Return to Public Website
        </Link>
      </div>

      {/* Main Login Box with Suspense */}
      <div className="max-w-md w-full mx-auto my-8">
        <Suspense fallback={<div className="p-8 text-center text-white">Loading login portal...</div>}>
          <LoginForm />
        </Suspense>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-400 py-4">
        © {new Date().getFullYear()} Shabab Ashraf Residential School ERP Portal. Baghra, Siwan, Bihar.
      </div>
    </div>
  );
}
