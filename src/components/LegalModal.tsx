'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { X, Shield, FileText, RefreshCw, CheckSquare, AlertTriangle, Mail } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms' | 'refund' | 'license' | 'disclaimer' | 'contact';
}

export default function LegalModal({
  isOpen,
  onClose,
  initialTab = 'privacy',
}: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'refund' | 'license' | 'disclaimer' | 'contact'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[88vh] flex flex-col rounded-2xl bg-dark-900 border border-white/10 shadow-2xl shadow-black/80 z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-dark-850">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">System Compliance & Transparency</h3>
              <p className="text-xs text-slate-400">Legal disclosures, usage terms & licensing specifications</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-dark-950 px-6 overflow-x-auto no-scrollbar gap-2 py-2">
          {[
            { id: 'privacy', label: 'Privacy Policy', icon: Shield },
            { id: 'terms', label: 'Terms of Service', icon: FileText },
            { id: 'refund', label: 'Refund Policy', icon: RefreshCw },
            { id: 'license', label: 'License & Rights', icon: CheckSquare },
            { id: 'disclaimer', label: 'Disclaimer', icon: AlertTriangle },
            { id: 'contact', label: 'Support & Contact', icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 whitespace-nowrap px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 text-sm text-slate-300 leading-relaxed space-y-4">
          {activeTab === 'privacy' && (
            <div className="whitespace-pre-line font-mono text-xs sm:text-sm bg-dark-950/80 p-5 rounded-xl border border-white/5 text-slate-300">
              {siteConfig.legal.privacyPolicy}
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="whitespace-pre-line font-mono text-xs sm:text-sm bg-dark-950/80 p-5 rounded-xl border border-white/5 text-slate-300">
              {siteConfig.legal.termsOfService}
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="whitespace-pre-line font-mono text-xs sm:text-sm bg-dark-950/80 p-5 rounded-xl border border-white/5 text-slate-300">
              {siteConfig.legal.refundPolicy}
            </div>
          )}

          {activeTab === 'license' && (
            <div className="whitespace-pre-line font-mono text-xs sm:text-sm bg-dark-950/80 p-5 rounded-xl border border-white/5 text-slate-300">
              {siteConfig.legal.licenseUsageRights}
            </div>
          )}

          {activeTab === 'disclaimer' && (
            <div className="whitespace-pre-line font-mono text-xs sm:text-sm bg-dark-950/80 p-5 rounded-xl border border-white/5 text-slate-300">
              {siteConfig.legal.earningsDisclaimer}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="bg-dark-950/80 p-6 rounded-xl border border-white/5 space-y-6">
              <div>
                <h4 className="text-base font-semibold text-white mb-1">Direct Support Channel</h4>
                <p className="text-slate-400 text-xs">Have questions before purchasing or need assistance with your Google Drive access? Reach out directly.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-dark-850 border border-white/10">
                  <span className="text-xs text-indigo-400 font-mono">SUPPORT EMAIL</span>
                  <p className="text-sm font-semibold text-white mt-1">{siteConfig.links.supportEmail}</p>
                  <p className="text-xs text-slate-400 mt-1">Average response time: &lt; 24 hours</p>
                </div>

                <div className="p-4 rounded-lg bg-dark-850 border border-white/10">
                  <span className="text-xs text-cyan-400 font-mono">INSTANT ACCESS CHECK</span>
                  <p className="text-sm font-semibold text-white mt-1">Automatic Drive Onboarding</p>
                  <p className="text-xs text-slate-400 mt-1">Direct link generated upon checkout</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200">
                💡 Tip: To update this support email address or add your Discord/Telegram community link, simply edit the values in <code className="bg-dark-900 px-1 py-0.5 rounded text-indigo-300">src/config/siteConfig.ts</code>.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 px-6 py-3 bg-dark-850 flex items-center justify-between text-xs text-slate-400">
          <span>Digital Product Launch System • Verification & Compliance</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
