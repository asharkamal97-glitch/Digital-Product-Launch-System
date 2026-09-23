'use client';

import React, { useState } from 'react';
import { siteConfig, DriveFolderItem } from '@/config/siteConfig';
import { Folder, FolderOpen, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react';

export default function LaunchHubSection() {
  const [selectedFolderId, setSelectedFolderId] = useState<string>("00");

  const currentFolder: DriveFolderItem =
    siteConfig.driveStructure.find((f) => f.id === selectedFolderId) ||
    siteConfig.driveStructure[0];

  return (
    <section id="launch-hub" className="relative py-20 md:py-28 border-t border-white/5 bg-dark-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium">
            <FolderOpen className="w-3.5 h-3.5" />
            BUYER ONBOARDING EXPERIENCE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            The Private &ldquo;Launch Hub&rdquo; Architecture
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            No messy, disorganized file dumps. We structured the entire system into a clean 9-folder Launch Hub on Google Drive with a dedicated &ldquo;00_START_HERE&rdquo; onboarding guide.
          </p>
        </div>

        {/* Interactive Hub Workspace UI */}
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl bg-dark-900 border border-white/10 shadow-2xl overflow-hidden">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-dark-950 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                <span className="ml-2 text-slate-400 hidden sm:inline">Google Drive / Master_Launch_Hub /</span>
                <span className="text-cyan-400 font-bold">{currentFolder.folderName}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </span>
              </div>
            </div>

            {/* Split Screen Layout: Folder Sidebar & Folder Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
              {/* Left Sidebar: Folder Nav */}
              <div className="lg:col-span-5 border-r border-white/10 bg-dark-950/60 p-4 space-y-1.5 overflow-y-auto max-h-[600px]">
                <div className="px-3 py-2 text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>9 MASTER DIRECTORIES</span>
                  <span>SELECT TO PREVIEW</span>
                </div>

                {siteConfig.driveStructure.map((folder) => {
                  const isSelected = selectedFolderId === folder.id;
                  return (
                    <button
                      key={folder.id}
                      onClick={() => setSelectedFolderId(folder.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between text-xs group ${
                        isSelected
                          ? 'bg-indigo-600/20 border border-indigo-500/40 text-white shadow-sm'
                          : 'bg-dark-850/40 border border-transparent text-slate-400 hover:bg-dark-800 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {isSelected ? (
                          <FolderOpen className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        ) : (
                          <Folder className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                        )}
                        <div className="truncate">
                          <span className="font-mono font-semibold block text-slate-200 group-hover:text-white">
                            {folder.folderName}
                          </span>
                          <span className="text-[10px] text-slate-500 block truncate">
                            {folder.title}
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 transition-transform flex-shrink-0 ${
                          isSelected ? 'text-indigo-400 translate-x-0.5' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right Pane: Folder Content Preview */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 bg-dark-900/90 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Folder Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-xs font-mono text-cyan-400 font-semibold block mb-1">
                        {currentFolder.badge}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
                        {currentFolder.folderName}
                      </h3>
                      <p className="text-sm font-medium text-slate-300 mt-1">
                        {currentFolder.title}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="px-2.5 py-1 rounded-md bg-dark-800 border border-white/10 text-xs font-mono text-slate-300 block">
                        {currentFolder.fileCount}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {currentFolder.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                      Curated Assets & Key Deliverables Inside:
                    </span>
                    <div className="space-y-2">
                      {currentFolder.highlights.map((highlight, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-center gap-2.5 p-3 rounded-lg bg-dark-850 border border-white/5 text-xs text-slate-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Included Deliverable Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {currentFolder.keyDeliverables.map((deliv, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                      >
                        ✦ {deliv}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Onboarding Note */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
                  <span>Delivered instantly upon purchase via Google Drive</span>
                  <a
                    href={siteConfig.links.checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <span>Get Access to Launch Hub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
