import React from 'react';

interface TopBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const TopBar: React.FC<TopBarProps> = ({ onSearch, searchQuery }) => {
  return (
    <div className="w-full flex flex-col bg-[#0f0e13] z-[100] relative">
      <div className="w-full bg-[#1c1b1f]/80 backdrop-blur-3xl px-4 md:px-8 py-3 md:py-4 border-b border-white/5">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 md:gap-4 group cursor-pointer shrink-0" onClick={() => window.location.reload()}>
            <div className="spinning-flower text-[#d0bcff]">
              <svg className="h-7 w-7 md:h-8 md:w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2L14.5,9H22L16,13.5L18.5,20.5L12,16L5.5,20.5L8,13.5L2,9H9.5L12,2Z" />
              </svg>
            </div>
            <div className="hidden sm:flex flex-col">
              <h1 className="text-sm md:text-lg font-black tracking-tighter text-[#e6e1e5] uppercase">
                Duki <span className="text-[#d0bcff]">Archive</span>
              </h1>
              <div className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-[#d0bcff] animate-pulse"></span>
                <span className="text-[7px] font-black text-[#938f99] uppercase tracking-[0.3em]">Ameri Premium Live</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex items-center gap-3 rounded-[16px] md:rounded-[20px] bg-[#2b2930] px-3 md:px-5 py-2 md:py-3 transition-all focus-within:ring-2 focus-within:ring-[#d0bcff]/30 md:max-w-xl border border-white/5 shadow-inner">
            <svg className="h-4 w-4 text-[#938f99]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rastrear en el archivo..."
              className="w-full bg-transparent outline-none text-[#e6e1e5] placeholder-[#938f99] text-xs md:text-sm font-bold uppercase tracking-tight"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Formulario Sugerencias */}
            <a 
              href="https://duki-archive-newpipe-form.base44.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 bg-[#d0bcff]/10 hover:bg-[#d0bcff]/20 px-4 py-2.5 rounded-[16px] border border-[#d0bcff]/20 transition-all active:scale-95"
            >
              <svg className="h-4 w-4 text-[#d0bcff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-[9px] font-black text-[#d0bcff] uppercase tracking-widest">Aportar</span>
            </a>

            {/* Correo Contacto */}
            <a 
              href="mailto:archive@duki.ameri"
              className="hidden sm:flex h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-[#2b2930] items-center justify-center text-[#938f99] hover:text-[#d0bcff] border border-white/5 transition-colors"
            >
               <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
               </svg>
            </a>

            <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-[#d0bcff] flex items-center justify-center text-[#381e72] shadow-xl flex-shrink-0 relative overflow-hidden group">
               <span className="text-[10px] md:text-xs font-black z-10">AMR</span>
               <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;