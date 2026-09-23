import React from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import { db } from '@/lib/db';
import { Bus, MapPin, Phone, Users, Plus, ShieldCheck } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default async function AdminTransportPage() {
  const routes = await db.transportRoute.findMany({
    include: {
      students: {
        include: { class: true, section: true },
      },
    },
  });

  return (
    <PortalLayout role="ADMIN">
      <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-950">Transport Fleet & Bus Routes</h1>
            <p className="text-xs text-slate-500">
              Manage school bus coverage, assigned pickup stops across Siwan, and student passenger allocations.
            </p>
          </div>
          <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200">
            GPS-Tracking Ready Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {routes.map((r) => {
            const stops = JSON.parse(r.pickupPointsJson || '[]');
            return (
              <div
                key={r.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                      <Bus className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">{r.routeName}</h3>
                      <p className="font-mono text-xs text-brand-900 font-bold">{r.vehicleNo}</p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-700 text-sm">
                    {formatINR(r.monthlyFee)}/mo
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase">Driver Name:</span>
                    <strong className="text-slate-800 font-bold">{r.driverName}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase">Driver Phone:</span>
                    <strong className="text-slate-800 font-bold">{r.driverPhone}</strong>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-600" />
                    Pickup Stoppages & Route Path:
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {stops.map((stop: string, sIdx: number) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
                      >
                        {sIdx + 1}. {stop}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-brand-900">
                    <Users className="w-4 h-4" />
                    {r.students.length} Allocated Students
                  </span>
                  <span className="text-emerald-700 font-bold">Active Route</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
}
