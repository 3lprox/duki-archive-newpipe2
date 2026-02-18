import React from 'react';
import { MediaType, MediaCategory } from '../types';

interface NavigationRailProps {
  activeType: MediaType | MediaCategory | 'all';
  onTypeChange: (type: MediaType | MediaCategory | 'all') => void;
}

const NavigationRail: React.FC<NavigationRailProps> = ({ activeType, onTypeChange }) => {
  const items = [
    { id: 'all', label: 'Todo', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    )},
    { id: MediaCategory.DUKI, label: 'Duki', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L14.5 9H22L16,13.5L18.5,20.5L12,16L5.5,20.5L8,13.5L2,9H9.5L12,2Z" />
      </svg>
    )},
    { id: MediaCategory.FREE, label: 'Free', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )},
    { id: MediaCategory.LEAKED, label: 'Filtradas', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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
  ];

  return (
    <nav className="flex md:flex-col items-center justify-around md:justify-start gap-4 p-2 md:p-6 bg-[#1c1b1f] md:w-24 h-full border-r border-white/5 overflow-y-auto no-scrollbar">
      {items.map((item) => {
        const isActive = activeType === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onTypeChange(item.id as any)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 w-full group shrink-0`}
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