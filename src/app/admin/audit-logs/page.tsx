import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { db } from '@/lib/db';
import { ShieldAlert, ShieldCheck, User, Clock, FileText } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

export default async function AdminAuditLogsPage() {
  const auditLogs = await db.auditLog.findMany({
    orderBy: { timestamp: 'desc' },
    take: 50,
  });

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2.5 py-0.5 rounded border border-red-200">
                Security & Compliance
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-brand-950 mt-1">
              Immutable System Audit Logs
            </h1>
            <p className="text-xs text-slate-500">
              Cryptographically timestamped action logs tracking authentication, fee alterations, admissions, and financial updates.
            </p>
          </div>

          <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3.5 py-2 rounded-xl border border-slate-200">
            {auditLogs.length} Events Logged
          </span>
        </div>

        {/* Audit Logs Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Event Timestamp</th>
                  <th className="py-3 px-4">User / Operator</th>
                  <th className="py-3 px-4">Action Code</th>
                  <th className="py-3 px-4">Entity Type</th>
                  <th className="py-3 px-4">Action Particulars</th>
                  <th className="py-3 px-4 text-right">IP Origin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {formatDateTime(log.timestamp)}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {log.userName}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 font-mono">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-600">
                      {log.entity || 'SYSTEM'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 max-w-md truncate">
                      {log.details}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-400 text-[10px]">
                      {log.ipAddress || '127.0.0.1'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
