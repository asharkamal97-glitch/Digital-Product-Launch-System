import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  ShieldCheck,
  UserCog,
  CheckCircle2,
  XCircle,
  Key,
  Users,
  CreditCard,
  Layers,
  FileText,
  Settings,
  Bell,
  Image as ImageIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function RolesPermissionsPage() {
  const roles = [
    {
      role: 'SUPER_ADMIN',
      title: 'Super Administrator',
      desc: 'Complete unfettered access across all institutional modules, database settings, and staff credentials.',
      color: 'bg-red-50 text-red-700 border-red-200',
      badge: 'bg-red-600 text-white',
    },
    {
      role: 'ADMIN',
      title: 'School Administrator',
      desc: 'Day-to-day administrative authority over students, classes, admissions, and certificates.',
      color: 'bg-gold-50 text-gold-700 border-gold-200',
      badge: 'bg-gold-600 text-white',
    },
    {
      role: 'ACCOUNTANT',
      title: 'Accounts & Finance Officer',
      desc: 'Authority over fee structures, offline collections, student ledgers, payment transactions, and receipts.',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badge: 'bg-emerald-600 text-white',
    },
    {
      role: 'ADMISSION_STAFF',
      title: 'Admission Desk Officer',
      desc: 'Authority to review registrations, verify applicant documents, and update admission review statuses.',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      badge: 'bg-blue-600 text-white',
    },
    {
      role: 'TEACHER',
      title: 'Faculty / Educator',
      desc: 'Academic access to mark daily attendance, enter exam marks, and assign homework.',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      badge: 'bg-purple-600 text-white',
    },
  ];

  const permissionMatrix = [
    {
      module: 'Fee Structure & Pricing',
      permissions: [
        { code: 'fees.structure.view', label: 'View Fee Schedules', roles: ['SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT'] },
        { code: 'fees.structure.create', label: 'Create Class Fee Structures', roles: ['SUPER_ADMIN', 'ACCOUNTANT'] },
        { code: 'fees.structure.edit', label: 'Edit Amounts & Fee Heads', roles: ['SUPER_ADMIN', 'ACCOUNTANT'] },
        { code: 'fees.structure.delete', label: 'Deactivate / Delete Structures', roles: ['SUPER_ADMIN'] },
      ],
    },
    {
      module: 'Fee Collection & Finance',
      permissions: [
        { code: 'fees.collect.offline', label: 'Collect Cash / Manual Fees', roles: ['SUPER_ADMIN', 'ACCOUNTANT'] },
        { code: 'fees.receipts.issue', label: 'Issue Official QR Receipts', roles: ['SUPER_ADMIN', 'ACCOUNTANT'] },
        { code: 'fees.discounts.apply', label: 'Apply Scholarships & Concessions', roles: ['SUPER_ADMIN', 'ACCOUNTANT'] },
        { code: 'fees.reports.view', label: 'View Revenue & Defaulters Ledgers', roles: ['SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT'] },
      ],
    },
    {
      module: 'Student Directory & Records',
      permissions: [
        { code: 'students.view', label: 'View Student Registry & 360° Profiles', roles: ['SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT', 'TEACHER', 'ADMISSION_STAFF'] },
        { code: 'students.create', label: 'Register New Enrolled Student', roles: ['SUPER_ADMIN', 'ADMIN', 'ADMISSION_STAFF'] },
        { code: 'students.edit', label: 'Edit Student Particulars', roles: ['SUPER_ADMIN', 'ADMIN'] },
        { code: 'students.promote', label: 'Batch Promote to Next Session', roles: ['SUPER_ADMIN', 'ADMIN'] },
      ],
    },
    {
      module: 'Admissions Desk',
      permissions: [
        { code: 'admissions.view', label: 'View Online Applications', roles: ['SUPER_ADMIN', 'ADMIN', 'ADMISSION_STAFF'] },
        { code: 'admissions.verify', label: 'Verify Uploaded Documents', roles: ['SUPER_ADMIN', 'ADMIN', 'ADMISSION_STAFF'] },
        { code: 'admissions.approve', label: 'Approve / Admit Student', roles: ['SUPER_ADMIN', 'ADMIN', 'ADMISSION_STAFF'] },
      ],
    },
    {
      module: 'Staff & Security Settings',
      permissions: [
        { code: 'staff.manage', label: 'Manage Staff Logins & Roles', roles: ['SUPER_ADMIN'] },
        { code: 'staff.password_reset', label: 'Reset Employee Passwords', roles: ['SUPER_ADMIN', 'ADMIN'] },
        { code: 'audit_logs.view', label: 'Audit System & Financial Logs', roles: ['SUPER_ADMIN', 'ADMIN'] },
        { code: 'cms.settings.edit', label: 'Modify Website Brand & Helplines', roles: ['SUPER_ADMIN', 'ADMIN'] },
      ],
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl mx-auto animate-fade-in text-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                Security & RBAC Architecture
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-brand-950 mt-1">
              Roles & Server-Enforced Permissions
            </h1>
            <p className="text-xs text-slate-500">
              Institutional security matrix defining role hierarchies and server-side authorization guards (`src/lib/rbac.ts`).
            </p>
          </div>
        </div>

        {/* Roles Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((r) => (
            <div
              key={r.role}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold ${r.badge}`}>
                    {r.role}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="font-extrabold text-base text-brand-950">{r.title}</h3>
                <p className="text-xs text-slate-500">{r.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Guard: Active</span>
                <span className="text-emerald-600 font-bold">● Server Enforced</span>
              </div>
            </div>
          ))}
        </div>

        {/* Permission Matrix Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-0">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-brand-950">Detailed Role Permission Matrix</h3>
            <span className="text-xs text-slate-500">Immutable server authorization rules</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Permission Name & Key</th>
                  <th className="py-3 px-3 text-center">Super Admin</th>
                  <th className="py-3 px-3 text-center">School Admin</th>
                  <th className="py-3 px-3 text-center">Accountant</th>
                  <th className="py-3 px-3 text-center">Admission Staff</th>
                  <th className="py-3 px-3 text-center">Teacher</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {permissionMatrix.map((grp) => (
                  <React.Fragment key={grp.module}>
                    <tr className="bg-slate-50/60">
                      <td colSpan={6} className="py-2.5 px-4 font-black text-brand-950 uppercase tracking-wider text-[10px] bg-slate-100/50">
                        {grp.module}
                      </td>
                    </tr>
                    {grp.permissions.map((p) => (
                      <tr key={p.code} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900">{p.label}</p>
                          <span className="font-mono text-[10px] text-slate-400">{p.code}</span>
                        </td>

                        <td className="py-3 px-3 text-center">
                          {p.roles.includes('SUPER_ADMIN') ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                          ) : (
                            <XCircle className="w-4 h-4 text-slate-300 mx-auto" />
                          )}
                        </td>

                        <td className="py-3 px-3 text-center">
                          {p.roles.includes('ADMIN') ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                          ) : (
                            <XCircle className="w-4 h-4 text-slate-300 mx-auto" />
                          )}
                        </td>

                        <td className="py-3 px-3 text-center">
                          {p.roles.includes('ACCOUNTANT') ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                          ) : (
                            <XCircle className="w-4 h-4 text-slate-300 mx-auto" />
                          )}
                        </td>

                        <td className="py-3 px-3 text-center">
                          {p.roles.includes('ADMISSION_STAFF') ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                          ) : (
                            <XCircle className="w-4 h-4 text-slate-300 mx-auto" />
                          )}
                        </td>

                        <td className="py-3 px-3 text-center">
                          {p.roles.includes('TEACHER') ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                          ) : (
                            <XCircle className="w-4 h-4 text-slate-300 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
