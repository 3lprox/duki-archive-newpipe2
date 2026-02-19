import React from 'react';

interface TopBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const TopBar: React.FC<TopBarProps> = ({ onSearch, searchQuery }) => {
  return (
    <div className="w-full flex flex-col bg-[#1c1b1f] z-[100] relative">
      <div className="w-full px-4 md:px-6 h-16 md:h-20 flex items-center justify-between border-b border-white/5 shadow-md">
        <div className="mx-auto w-full max-w-[1600px] flex items-center justify-between gap-4">
          
          {/* Brand Icon (Isotype Only) */}
          <div className="flex items-center shrink-0" onClick={() => window.location.reload()}>
            <div className="text-[#d0bcff] cursor-pointer hover:scale-110 transition-transform p-2">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2L14.5,9H22L16,13.5L18.5,20.5L12,16L5.5,20.5L8,13.5L2,9H9.5L12,2Z" />
              </svg>
            </div>
          </div>
          
          {/* Search Bar - MD3 Surface Container High */}
          <div className="flex-1 flex items-center gap-4 rounded-full bg-[#2b2930] px-4 md:px-6 h-12 md:max-w-xl transition-all focus-within:ring-2 focus-within:ring-[#d0bcff] border border-transparent shadow-inner">
            <svg className="h-5 w-5 text-[#938f99]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar en el archivo..."
              className="w-full bg-transparent outline-none text-[#e6e1e5] placeholder-[#938f99] text-sm font-medium"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Email Icon Button */}
            <a 
              href="mailto:duki-archive-newpipe@protonmail.com"
              className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center text-[#938f99] hover:text-[#d0bcff] hover:bg-white/5 rounded-full transition-all active:scale-90"
              title="Contacto"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>

            {/* Aportar - MD3 Extended FAB style */}
            <a 
              href="https://duki-archive-newpipe-form.base44.app/" 
              target="_blank" 
              rel="noreferrer"
              className="hidden md:flex items-center gap-3 bg-[#d0bcff] text-[#381e72] px-8 h-14 rounded-[28px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 group"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm font-bold uppercase tracking-widest">Aportar</span>
            </a>
            
            {/* User Avatar */}
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#381e72] border-2 border-[#d0bcff] flex items-center justify-center text-[#d0bcff] shadow-md flex-shrink-0">
               <span className="text-[12px] font-black">AMR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;