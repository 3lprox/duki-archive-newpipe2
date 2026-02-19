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
          
          <div className="flex items-center group cursor-pointer shrink-0" onClick={() => window.location.reload()}>
            <div className="text-[#d0bcff]">
              <svg className="h-6 w-6 md:h-7 md:w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2L14.5,9H22L16,13.5L18.5,20.5L12,16L5.5,20.5L8,13.5L2,9H9.5L12,2Z" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1 flex items-center gap-3 rounded-full bg-[#2b2930] px-4 md:px-6 py-2 md:py-2.5 transition-all focus-within:ring-2 focus-within:ring-[#d0bcff]/30 md:max-w-xl border border-white/5 shadow-inner">
            <svg className="h-4 w-4 text-[#938f99]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rastrear en el archivo..."
              className="w-full bg-transparent outline-none text-[#e6e1e5] placeholder-[#938f99] text-[10px] md:text-xs font-black uppercase tracking-widest"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2 md:gap-4">
               {/* BOTÓN DE CORREO - RESTAURADO Y FUNCIONAL */}
               <a 
                href="mailto:duki-archive-newpipe@protonmail.com"
                className="p-2.5 text-[#938f99] hover:text-[#d0bcff] hover:bg-white/5 rounded-full transition-all active:scale-90"
                title="Contacto"
               >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
               </a>

               {/* BOTÓN APORTAR GRANDE */}
               <a 
                href="https://duki-archive-newpipe-form.base44.app/" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 bg-[#d0bcff] text-[#381e72] px-5 md:px-8 py-2.5 md:py-3 rounded-full shadow-[0_10px_20px_rgba(208,188,255,0.3)] hover:shadow-[0_15px_30px_rgba(208,188,255,0.5)] transition-all active:scale-95 group"
               >
                  <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-[11px] md:text-sm font-black uppercase tracking-[0.2em]">Aportar</span>
               </a>
            </div>
            
            <div className="h-9 w-9 md:h-12 md:w-12 rounded-full bg-[#d0bcff] flex items-center justify-center text-[#381e72] shadow-xl flex-shrink-0 border-2 border-white/20">
               <span className="text-[10px] md:text-xs font-black">AMR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;