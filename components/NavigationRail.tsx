import React from 'react';
import { MediaType } from '../types';

interface NavigationRailProps {
  activeType: MediaType | 'all';
  onTypeChange: (type: MediaType | 'all') => void;
}

const NavigationRail: React.FC<NavigationRailProps> = ({ activeType, onTypeChange }) => {
  const items = [
    { id: 'all', label: 'Todo', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    )},
    { id: MediaType.VIDEO, label: 'Videos', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )},
    { id: MediaType.AUDIO, label: 'Audios', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
      </svg>
    )},
    { id: 'form', label: 'Enviar', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ), isExternal: true, url: 'https://duki-archive-newpipe-form.base44.app/' },
  ];

  return (
    <nav className="flex md:flex-col items-center justify-around md:justify-start gap-4 p-2 md:p-6 bg-[#1c1b1f] md:w-24 h-full border-r border-white/5">
      {items.map((item) => {
        const isActive = activeType === item.id;
        
        if (item.isExternal) {
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 transition-all duration-300 w-full group"
            >
              <div className="h-8 md:h-12 w-12 md:w-full flex items-center justify-center rounded-[20px] transition-all duration-300 text-[#ffb4ab]/50 group-hover:bg-[#ffb4ab]/10 group-hover:text-[#ffb4ab]">
                {item.icon}
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase transition-colors text-[#938f99] group-hover:text-[#ffb4ab]">
                {item.label}
              </span>
            </a>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => onTypeChange(item.id as any)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 w-full group`}
          >
            <div className={`h-8 md:h-12 w-12 md:w-full flex items-center justify-center rounded-[20px] transition-all duration-300 ${isActive ? 'bg-[#d0bcff] text-[#381e72] shadow-[0_0_15px_rgba(208,188,255,0.4)]' : 'text-[#938f99] group-hover:bg-white/5'}`}>
              {item.icon}
            </div>
            <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${isActive ? 'text-white' : 'text-[#938f99]'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default NavigationRail;