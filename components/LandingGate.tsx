import React, { useState } from 'react';

interface LandingGateProps {
  onEnter: () => void;
}

const LandingGate: React.FC<LandingGateProps> = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(onEnter, 800);
  };

  return (
    <div className={`fixed inset-0 z-[1000] flex items-center justify-center bg-[#0f0e13] transition-all duration-1000 ${isExiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d0bcff]/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ffb4ab]/5 blur-[120px] rounded-full animate-pulse delay-700"></div>

      <div className="relative z-10 w-full max-w-md px-8 flex flex-col items-center text-center">
        
        {/* Branding Icon */}
        <div className="mb-10 spinning-flower text-[#d0bcff]">
          <svg className="h-16 w-16 md:h-20 md:w-20 drop-shadow-[0_0_20px_rgba(208,188,255,0.4)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2L14.5,9H22L16,13.5L18.5,20.5L12,16L5.5,20.5L8,13.5L2,9H9.5L12,2Z" />
          </svg>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
          Duki <span className="text-[#d0bcff]">Archive</span>
        </h1>
        
        <p className="text-[#938f99] font-black uppercase text-[10px] tracking-[0.4em] mb-12">
          Ameri Premium Monitor System
        </p>

        <div className="w-full p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl mb-10">
           <div className="flex flex-col gap-4 text-left">
              <div className="flex items-start gap-3">
                 <div className="h-4 w-4 mt-1 rounded-full border border-green-500/40 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                 </div>
                 <p className="text-[10px] mono text-white/40 leading-relaxed">
                    Al acceder, confirmas que eres un humano real y que el acceso se realiza bajo términos legales de preservación de cultura.
                 </p>
              </div>
              <div className="h-[1px] w-full bg-white/5"></div>
              <div className="flex items-start gap-3">
                 <svg className="h-4 w-4 mt-1 text-[#d0bcff] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                 </svg>
                 <p className="text-[10px] mono text-white/40 leading-relaxed uppercase tracking-tighter">
                    BOT DETECTION ACTIVE: NO SCRAPING ALLOWED.
                 </p>
              </div>
           </div>
        </div>

        <button
          onClick={handleEnter}
          className="group relative w-full overflow-hidden rounded-[24px] bg-[#d0bcff] px-12 py-5 text-[#381e72] shadow-2xl transition-all hover:scale-[1.05] active:scale-95"
        >
          <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform"></div>
          <span className="relative z-10 text-lg font-black uppercase tracking-[0.2em]">Entrar</span>
        </button>

        <p className="mt-12 text-[8px] font-black text-white/10 uppercase tracking-[1em]">
          DISCOFAN © 2025
        </p>
      </div>
    </div>
  );
};

export default LandingGate;