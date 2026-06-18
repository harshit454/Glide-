import React from 'react';

interface GlideLogoProps {
  className?: string;
  logoOnly?: boolean;
}

export function GlideLogo({ className = '', logoOnly = false }: GlideLogoProps) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="relative w-16 h-20 flex items-center justify-center">
        {/* Pin Shape */}
        <svg
          viewBox="0 0 24 30"
          className="w-full h-full text-blue-600 drop-shadow-sm"
          fill="currentColor"
        >
          <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 18 12 18s12-9 12-18c0-6.63-5.37-12-12-12z" />
        </svg>
        {/* White G */}
        <span className="absolute top-[22%] text-white text-3xl font-bold tracking-tighter select-none">G</span>
      </div>
      {!logoOnly && (
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 -mt-2">Glide</h1>
      )}
    </div>
  );
}