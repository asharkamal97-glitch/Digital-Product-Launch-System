'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  UserCheck,
  CreditCard,
  Receipt,
  CalendarCheck,
  Award,
  BookOpen,
  FileText,
  Bell,
  Bus,
  Settings,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  Sparkles,
  Calendar,
  Layers,
  FileSpreadsheet,
  Image as ImageIcon,
  DollarSign,
  TrendingUp,
  Sliders,
  FolderTree,
  UserCog,
  BarChart3,
  ExternalLink,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          const role = data.user.role;
          if (['SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT', 'ADMISSION_STAFF'].includes(role)) {
            setUser(data.user);
          } else {
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const navGroups = [
    {
      group: 'Main',
      links: [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      ],
    },
    {
      group: 'Academics',
      links: [
        { name: 'Academic Years', href: '/admin/academic-years', icon: Calendar },
        { name: 'Classes & Sections', href: '/admin/classes', icon: Layers },
        { name: 'Subjects', href: '/admin/subjects', icon: BookOpen },
        { name: 'Timetable', href: '/portal/admin/timetable', icon: CalendarCheck },
        { name: 'Student Promotion', href: '/admin/academic-years/promotion', icon: Sparkles },
      ],
    },
    {
      group: 'Students',
      links: [
        { name: 'All Students', href: '/admin/students', icon: Users },
        { name: 'Parents & Guardians', href: '/admin/parents', icon: UserCheck },
        { name: 'Student Enrollment', href: '/admin/students/enrollment', icon: FolderTree },
      ],
    },
    {
      group: 'Fees & Finance',
      links: [
        { name: 'Fee Structure', href: '/admin/fees/structure', icon: DollarSign },
        { name: 'Fee Categories', href: '/admin/fees/categories', icon: Sliders },
        { name: 'Student Fees', href: '/admin/fees/student', icon: CreditCard },
        { name: 'Collect Fee (Offline)', href: '/admin/fees/collect', icon: TrendingUp },
        { name: 'Payment Transactions', href: '/admin/payments', icon: FileSpreadsheet },
        { name: 'Official Receipts', href: '/admin/receipts', icon: Receipt },
        { name: 'Fee Defaulters', href: '/admin/fees/defaulters', icon: ShieldAlert },
        { name: 'Financial Reports', href: '/admin/reports/finance', icon: BarChart3 },
      ],
    },
    {
      group: 'Admissions',
      links: [
        { name: 'Admission Applications', href: '/admin/admissions', icon: FileText },
        { name: 'New Registration Desk', href: '/admission', icon: ExternalLink },
      ],
    },
    {
      group: 'Staff & Faculty',
      links: [
        { name: 'Staff Directory', href: '/admin/staff', icon: UserCog },
        { name: 'Roles & Permissions', href: '/admin/settings/roles', icon: Settings },
      ],
    },
    {
      group: 'Communication',
      links: [
        { name: 'Notice Circulars', href: '/admin/notices', icon: Bell },
        { name: 'Photo Gallery CMS', href: '/admin/gallery', icon: ImageIcon },
        { name: 'Campus Events', href: '/events', icon: Calendar },
      ],
    },
    {
      group: 'System & Security',
      links: [
        { name: 'School CMS Settings', href: '/admin/settings', icon: Settings },
        { name: 'Security Audit Logs', href: '/admin/audit-logs', icon: ShieldAlert },
      ],
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-xs">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
          <p className="font-bold text-slate-400">Verifying Administrative Access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800 antialiased font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-brand-950 text-white border-r border-brand-900 shrink-0 select-none shadow-2xl">
        {/* Brand Header */}
        <div className="p-5 border-b border-brand-900/80 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gold-500 text-brand-950 flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-black text-base text-white tracking-tight leading-none block">SARS Admin</span>
              <p className="text-[10px] text-gold-400 font-semibold tracking-wider uppercase mt-0.5">Management Portal</p>
            </div>
          </Link>
        </div>

        {/* User Role Card */}
        <div className="px-5 py-3 bg-brand-900/40 border-b border-brand-900/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-7 h-7 rounded-lg bg-gold-500/20 border border-gold-400/40 text-gold-400 font-bold flex items-center justify-center text-xs shrink-0">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-white text-xs truncate leading-tight">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-slate-400 font-mono truncate">{user?.role?.replace(/_/g, ' ')}</p>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" title="Session Active" />
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto no-scrollbar text-xs">
          {navGroups.map((grp, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <p className="px-3 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                {grp.group}
              </p>
              <div className="space-y-0.5">
                {grp.links.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all font-semibold ${
                        isActive
                          ? 'bg-gold-500 text-brand-950 font-bold shadow-md scale-[1.02]'
                          : 'text-slate-300 hover:bg-brand-900/80 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-950' : 'text-gold-400'}`} />
                      <span className="truncate">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-brand-900/80 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full py-2 px-3 rounded-xl bg-brand-900 hover:bg-brand-800 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-brand-800"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
            <span>View Public Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header Bar */}
        <header className="md:hidden bg-brand-950 text-white px-4 py-3.5 flex items-center justify-between border-b border-brand-900 shadow-md">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gold-500 text-brand-950 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-sm text-white">SARS Admin</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-brand-900 text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-brand-950 text-white px-4 py-4 space-y-4 border-b border-brand-900 animate-fade-in text-xs max-h-[80vh] overflow-y-auto">
            {navGroups.map((grp, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{grp.group}</p>
                {grp.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl font-semibold ${
                      pathname === link.href ? 'bg-gold-500 text-brand-950 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <link.icon className="w-4 h-4 text-gold-400" />
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
            ))}
            <button
              onClick={handleLogout}
              className="w-full py-2.5 rounded-xl bg-red-900/60 text-red-300 font-bold flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        )}

        {/* Top Content Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-3 hidden md:flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/admin" className="hover:text-brand-900 font-bold text-brand-950">SARS Admin</Link>
            <span>/</span>
            <span className="capitalize text-slate-600 font-semibold">{pathname.replace('/admin/', '').replace(/-/g, ' ') || 'Dashboard'}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              Academic Session: <strong className="text-brand-900">2026-27</strong>
            </span>
            <Link
              href="/fees/pay"
              target="_blank"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs border border-emerald-200 flex items-center gap-1.5 transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>Public Fee Desk</span>
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/80">
          {children}
        </main>
      </div>
    </div>
  );
}
