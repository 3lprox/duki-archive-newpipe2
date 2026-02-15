import React from 'react';

interface TopBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const TopBar: React.FC<TopBarProps> = ({ onSearch, searchQuery }) => {
  return (
    <div className="sticky top-0 z-50 w-full flex flex-col transition-all duration-300">
      <div className="w-full bg-[#1c1b1f]/95 backdrop-blur-xl px-6 py-4 border-b border-white/5">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="spinning-flower text-[#d0bcff]">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2L14.5,9H22L16,13.5L18.5,20.5L12,16L5.5,20.5L8,13.5L2,9H9.5L12,2Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="md3-font text-lg font-black tracking-tighter text-[#e6e1e5] hidden md:block">
                DUKI <span className="text-[#d0bcff]">ARCHIVE</span>
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ffb4ab] animate-pulse"></span>
                <span className="text-[8px] font-black text-[#ffb4ab] uppercase tracking-[0.2em]">Ameri Sinc Center</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-1 items-center gap-3 rounded-2xl bg-[#2b2930] px-5 py-2.5 transition-all focus-within:bg-[#1c1b1f] focus-within:ring-1 focus-within:ring-[#d0bcff]/50 md:max-w-xl shadow-inner border border-white/5">
            <svg className="h-5 w-5 text-[#938f99]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar rastro en Ameri..."
              className="w-full bg-transparent outline-none text-[#e6e1e5] placeholder-[#938f99] text-sm font-bold"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://duki-archive-newpipe-form.base44.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 bg-[#d0bcff]/10 hover:bg-[#d0bcff]/20 px-4 py-2 rounded-2xl border border-[#d0bcff]/20 transition-all active:scale-95 group"
            >
              <svg className="h-4 w-4 text-[#d0bcff] group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-[9px] font-black text-[#d0bcff] uppercase tracking-widest whitespace-nowrap">Sugerir Archivo</span>
            </a>

            <div className="h-11 w-11 rounded-2xl bg-[#d0bcff] flex items-center justify-center text-[#381e72] shadow-lg flex-shrink-0 group relative overflow-hidden">
               <span className="text-[10px] font-black z-10">AMR</span>
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;