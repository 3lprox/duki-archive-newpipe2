import React from 'react';
import { MediaType, MediaCategory } from '../types';

interface NavigationRailProps {
  activeType: MediaType | MediaCategory | 'all' | 'legal';
  onTypeChange: (type: MediaType | MediaCategory | 'all' | 'legal') => void;
}

const NavigationRail: React.FC<NavigationRailProps> = ({ activeType, onTypeChange }) => {
  const items = [
    { id: 'all', label: 'Todo', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    )},
    { id: MediaCategory.LEAKED, label: 'Leaks', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )},
    { id: MediaCategory.FREE, label: 'Free', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )},
    { id: MediaCategory.DUKI, label: 'Duki', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )},
    { id: MediaCategory.CRO, label: 'C.R.O', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )},
    { id: 'legal', label: 'Info', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
  ];

  return (
    <nav className="flex md:flex-col items-center justify-around md:justify-start gap-2 md:gap-6 p-2 md:pt-8 bg-[#1c1b1f] md:w-[96px] h-full border-r border-white/5 z-50">
      {items.map((item) => {
        const isActive = activeType === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onTypeChange(item.id as any)}
            className="flex flex-col items-center gap-1.5 w-full group relative"
          >
            {/* MD3 Active Indicator Pill */}
            <div className={`relative h-8 w-14 md:h-8 md:w-16 flex items-center justify-center rounded-full transition-all duration-200 ${isActive ? 'bg-[#d0bcff] text-[#381e72]' : 'text-[#938f99] hover:bg-white/5'}`}>
               <div className={`absolute inset-0 bg-[#d0bcff]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full`}></div>
               {item.icon}
            </div>
            
            <span className={`text-[11px] font-medium tracking-tight transition-colors ${isActive ? 'text-[#d0bcff]' : 'text-[#938f99]'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default NavigationRail;