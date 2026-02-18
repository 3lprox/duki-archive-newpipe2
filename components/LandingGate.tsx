import React, { useState } from 'react';

interface LandingGateProps {
  onEnter: () => void;
}

const LandingGate: React.FC<LandingGateProps> = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    // Desbloqueo de audio para navegadores
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    setIsExiting(true);
    setTimeout(onEnter, 600);
  };

  return (
    <div className={`fixed inset-0 z-[1000] flex items-center justify-center bg-[#0f0e13] transition-all duration-700 ${isExiting ? 'opacity-0 scale-125 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Efectos Ameri */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d0bcff]/5 blur-[120px] rounded-full animate-pulse"></div>
      
      <div className="relative z-10 w-full max-w-md px-8 flex flex-col items-center text-center">
        
        <div className="mb-12 spinning-flower text-[#d0bcff]/20">
          <svg className="h-24 w-24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2L14.5,9H22L16,13.5L18.5,20.5L12,16L5.5,20.5L8,13.5L2,9H9.5L12,2Z" />
          </svg>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
          Duki <span className="text-[#d0bcff]">Archive</span>
        </h1>
        
        <p className="text-[#938f99] font-black uppercase text-[10px] tracking-[0.5em] mb-20">
          Ameri Premium Monitoring
        </p>

        {/* BOTÓN ENTRAR (Simple y Elegante) */}
        <button
          onClick={handleEnter}
          className="group relative px-16 py-5 rounded-full border border-[#d0bcff]/30 text-[#d0bcff] transition-all hover:bg-[#d0bcff] hover:text-[#381e72] hover:border-[#d0bcff] hover:scale-105 active:scale-95 flex items-center justify-center overflow-hidden"
        >
          <span className="relative z-10 text-[12px] font-black uppercase tracking-[0.6em]">Entrar</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>

        <p className="mt-20 text-[8px] font-black text-white/10 uppercase tracking-[1.5em]">
          ARCHIVO ESTRELLA DESBLOQUEADO
        </p>
      </div>
    </div>
  );
};

export default LandingGate;