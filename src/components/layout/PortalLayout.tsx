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
  ChevronRight,
  Printer,
  FileSpreadsheet,
  Clock,
  IdCard,
} from 'lucide-react';

interface PortalLayoutProps {
  children: React.ReactNode;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'ACCOUNTANT' | 'TEACHER' | 'STUDENT' | 'PARENT';
  userTitle?: string;
}

export default function PortalLayout({ children, role, userTitle }: PortalLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
        } else {
          router.push('/login');
        }
      })
      .catch(() => router.push('/login'));
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const adminNav = [
    { name: 'Overview Dashboard', href: '/portal/admin', icon: LayoutDashboard },
    { name: 'Student Management', href: '/portal/admin/students', icon: Users },
    { name: 'Teacher Directory', href: '/portal/admin/teachers', icon: UserCheck },
    { name: 'Admissions Desk', href: '/portal/admin/admissions', icon: FileText },
    { name: 'Fee & Invoices', href: '/portal/admin/fees', icon: CreditCard },
    { name: 'Attendance Reports', href: '/portal/admin/attendance', icon: CalendarCheck },
    { name: 'Examinations & Marks', href: '/portal/admin/examinations', icon: Award },
    { name: 'Student ID Cards', href: '/portal/admin/id-cards', icon: IdCard },
    { name: 'Certificates Generator', href: '/portal/admin/certificates', icon: FileSpreadsheet },
    { name: 'Notice Board', href: '/portal/admin/notices', icon: Bell },
    { name: 'Transport Fleet', href: '/portal/admin/transport', icon: Bus },
    { name: 'School Settings', href: '/portal/admin/settings', icon: Settings },
    { name: 'Audit Logs', href: '/portal/admin/audit-logs', icon: ShieldAlert },
  ];

  const teacherNav = [
    { name: 'Teacher Dashboard', href: '/portal/teacher', icon: LayoutDashboard },
    { name: 'Mark Class Attendance', href: '/portal/teacher?tab=attendance', icon: CalendarCheck },
    { name: 'Assignments & Homework', href: '/portal/teacher?tab=homework', icon: BookOpen },
    { name: 'Enter Exam Marks', href: '/portal/teacher?tab=marks', icon: Award },
    { name: 'School Notices', href: '/notices', icon: Bell },
  ];

  const studentNav = [
    { name: 'Student Dashboard', href: '/portal/student', icon: LayoutDashboard },
    { name: 'Fee Invoices & Pay', href: '/pay-fees', icon: CreditCard },
    { name: 'My Attendance', href: '/portal/student?tab=attendance', icon: CalendarCheck },
    { name: 'Exam Results', href: '/portal/student?tab=results', icon: Award },
    { name: 'Class Timetable', href: '/portal/student?tab=timetable', icon: Clock },
    { name: 'Homework & Downloads', href: '/portal/student?tab=homework', icon: BookOpen },
    { name: 'School Notices', href: '/notices', icon: Bell },
  ];

  const parentNav = [
    { name: 'Parent Dashboard', href: '/portal/parent', icon: LayoutDashboard },
    { name: 'Pay Children Fees', href: '/pay-fees', icon: CreditCard },
    { name: 'Children Attendance', href: '/portal/parent?tab=attendance', icon: CalendarCheck },
    { name: 'Report Cards', href: '/portal/parent?tab=results', icon: Award },
    { name: 'Circulars & Notices', href: '/notices', icon: Bell },
  ];

  const accountantNav = [
    { name: 'Accounts Dashboard', href: '/portal/accountant', icon: LayoutDashboard },
    { name: 'Fee Invoices & Dues', href: '/portal/admin/fees', icon: CreditCard },
    { name: 'Collect Online Fees', href: '/pay-fees', icon: Receipt },
    { name: 'Student Directory', href: '/portal/admin/students', icon: Users },
    { name: 'Audit Logs', href: '/portal/admin/audit-logs', icon: ShieldAlert },
  ];

  const currentNav =
    role === 'SUPER_ADMIN' || role === 'ADMIN'
      ? adminNav
      : role === 'ACCOUNTANT'
      ? accountantNav
      : role === 'TEACHER'
      ? teacherNav
      : role === 'PARENT'
      ? parentNav
      : studentNav;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800 antialiased">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-brand-950 text-white border-r border-brand-900 shrink-0 select-none">
        {/* Sidebar Brand Header */}
        <div className="p-5 border-b border-brand-900/80 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gold-500 text-brand-950 flex items-center justify-center font-bold shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-base text-white tracking-tight">SARS Siwan</span>
              <p className="text-[10px] text-gold-300 font-medium">Management ERP</p>
            </div>
          </Link>
        </div>

        {/* Role Badge */}
        <div className="px-5 py-3 bg-brand-900/50 border-b border-brand-900/60 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Active Role:</span>
          <span className="font-bold text-gold-400 uppercase tracking-wider text-[11px]">
            {role.replace(/_/g, ' ')}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar text-xs font-medium">
          {currentNav.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gold-500 text-brand-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:bg-brand-900 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-950' : 'text-gold-400'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer with Logout */}
        <div className="p-4 border-t border-brand-900/80 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-800 text-gold-400 font-bold text-xs flex items-center justify-center border border-gold-400/30">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Authenticated User'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.username || ''}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl bg-red-900/30 hover:bg-red-900/60 text-red-300 border border-red-800/40 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header Bar */}
        <header className="md:hidden bg-brand-950 text-white px-4 py-3.5 flex items-center justify-between border-b border-brand-900 shadow-md">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gold-500 text-brand-950 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-sm text-white">SARS Portal</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-brand-900 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-brand-950 text-white px-4 py-4 space-y-1.5 border-b border-brand-900 animate-fade-in text-xs font-medium">
            {currentNav.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${
                    pathname === link.href ? 'bg-gold-500 text-brand-950 font-bold' : 'text-slate-300 hover:bg-brand-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-gold-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-brand-900">
              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl bg-red-900/40 text-red-300 font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Top Content Toolbar */}
        <div className="bg-white border-b border-slate-200 px-6 py-3.5 hidden md:flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-brand-900 font-semibold">SARS Main</Link>
            <span>/</span>
            <span className="font-bold text-brand-950 capitalize">{role.toLowerCase().replace(/_/g, ' ')} Portal</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
            >
              Public Website
            </Link>
            <Link
              href="/pay-fees"
              className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs border border-emerald-200"
            >
              Quick Pay Fees
            </Link>
          </div>
        </div>

        {/* Body Render */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
