import React, { useState } from 'react';

interface TopBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const TopBar: React.FC<TopBarProps> = ({ onSearch, searchQuery }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <div className="w-full flex flex-col bg-[#1c1b1f] z-[100] relative">
      {/* Banner de Problemas Técnicos */}
      <div className="w-full bg-red-900/40 border-b border-red-500/20 px-4 py-2">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-red-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-[11px] font-black uppercase tracking-widest text-red-200">
              Estamos teniendo problemas con el proveedor
            </span>
          </div>
          <button 
            onClick={() => setShowMoreInfo(!showMoreInfo)}
            className="text-[10px] font-black uppercase tracking-widest bg-red-500/20 hover:bg-red-500/40 text-red-100 px-3 py-1 rounded-full border border-red-500/30 transition-all active:scale-95"
          >
            {showMoreInfo ? 'Cerrar' : 'Más información'}
          </button>
        </div>
        
        {/* Información Detallada Expandible */}
        {showMoreInfo && (
          <div className="max-w-[800px] mx-auto mt-3 p-4 bg-black/40 rounded-2xl border border-red-500/20 animate-in slide-in-from-top-2 duration-300">
            <p className="text-[11px] leading-relaxed text-red-100/80 font-medium uppercase tracking-wider text-center">
              Estamos teniendo problemas con el volumen de archivo, ya que estamos extrayendo de Drive varias cosas y reintegrándolas en Catbox y puede no funcionar correctamente, el servidor está devolviendo 0 (sin archivo) o corrupto, algo que no toleraré que pase de nuevo.
            </p>
          </div>
        )}
      </div>

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