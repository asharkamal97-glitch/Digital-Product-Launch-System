'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  showLabels?: boolean;
}

export default function ThemeToggle({ className = '', showLabels = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === 'dark' : true;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark mode"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`
        relative inline-flex items-center gap-2 p-1.5 rounded-full
        bg-slate-200/80 hover:bg-slate-300/80 dark:bg-white/[0.08] dark:hover:bg-white/[0.14]
        border border-slate-300 dark:border-white/10
        text-slate-700 dark:text-slate-300
        transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
        ${className}
      `}
    >
      <div className="relative flex items-center justify-center h-6 w-6 rounded-full transition-transform duration-300">
        {/* Animated Icon Pill */}
        <span
          className={`
            absolute inset-0 rounded-full bg-white dark:bg-dark-800 shadow-sm
            transition-transform duration-300 ease-out
          `}
        />
        <div className="relative z-10 flex items-center justify-center">
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-indigo-400 transition-transform duration-300 rotate-0" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-500 transition-transform duration-300 rotate-0" />
          )}
        </div>
      </div>

      {showLabels && (
        <span className="text-xs font-mono font-medium pr-2 text-slate-700 dark:text-slate-300 select-none">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
}
