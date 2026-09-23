'use client';

import React from 'react';

export default function AmbientGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Top primary glow orb */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-25 animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(139, 92, 246, 0.4) 50%, transparent 80%)'
        }}
      />

      {/* Cyan secondary side glow orb */}
      <div 
        className="absolute top-[45%] -left-48 w-[500px] h-[500px] rounded-full blur-[150px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, rgba(59, 130, 246, 0.3) 60%, transparent 80%)'
        }}
      />

      {/* Amber/Violet bottom glow orb */}
      <div 
        className="absolute bottom-20 -right-48 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.7) 0%, rgba(245, 158, 11, 0.3) 60%, transparent 80%)'
        }}
      />

      {/* Cyber Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80" />
    </div>
  );
}
