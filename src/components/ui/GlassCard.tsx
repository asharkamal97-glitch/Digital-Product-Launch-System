'use client';

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'indigo' | 'cyan' | 'purple' | 'amber' | 'emerald' | 'none';
  interactive?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = '',
  glowColor = 'indigo',
  interactive = false,
  onClick,
}: GlassCardProps) {
  const glowStyles = {
    indigo: 'hover:border-indigo-500/40 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.25)]',
    cyan: 'hover:border-cyan-500/40 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.25)]',
    purple: 'hover:border-purple-500/40 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.25)]',
    amber: 'hover:border-amber-500/40 hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.25)]',
    emerald: 'hover:border-emerald-500/40 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.25)]',
    none: '',
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-2xl border border-white/[0.08] bg-slate-900/60 
        backdrop-blur-xl transition-all duration-300
        ${interactive ? `cursor-pointer hover:-translate-y-1 ${glowStyles[glowColor]}` : ''}
        ${className}
      `}
    >
      {/* Subtle top edge highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-2xl pointer-events-none" />
      {children}
    </div>
  );
}
