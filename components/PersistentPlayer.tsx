import React, { useRef, useState, useEffect } from 'react';
import { MediaItem, MediaType } from '../types';

interface PersistentPlayerProps {
  item: MediaItem | null;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  onClose: () => void;
}

interface Cue {
  start: number;
  end: number;
  text: string;
}

const PersistentPlayer: React.FC<PersistentPlayerProps> = ({ item, isPlaying, setIsPlaying, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [cues, setCues] = useState<Cue[]>([]);
  
  const parseSRTTime = (timeStr: string) => {
    const parts = timeStr.trim().replace(',', '.').split(':');
    if (parts.length !== 3) return 0;
    return (parseFloat(parts[0]) * 3600) + (parseFloat(parts[1]) * 60) + parseFloat(parts[2]);
  };

  useEffect(() => {
    if (!item?.subtitleUrl) {
      setCues([]);
      return;
    }
    fetch(item.subtitleUrl)
      .then(res => res.text())
      .then(text => {
        const parsed: Cue[] = [];
        const blocks = text.trim().split(/\n\s*\n/);
        blocks.forEach(block => {
          const lines = block.split('\n');
          if (lines.length >= 3) {
            const timeRange = lines[1].split(' --> ');
            if (timeRange.length === 2) {
              parsed.push({
                start: parseSRTTime(timeRange[0]),
                end: parseSRTTime(timeRange[1]),
                text: lines.slice(2).join(' ').replace(/<[^>]*>/g, '')
              });
            }
          }
        });
        setCues(parsed);
      })
      .catch(() => setCues([]));
  }, [item?.id, item?.subtitleUrl]);

  useEffect(() => {
    if (!item) return;
    const media = item.type === MediaType.VIDEO ? videoRef.current : audioRef.current;
    if (media) {
      if (isPlaying) {
        media.play().catch(() => setIsPlaying(false));
      } else {
        media.pause();
      }
      const onTimeUpdate = () => setCurrentTime(media.currentTime);
      const onLoaded = () => setDuration(media.duration);
      media.addEventListener('timeupdate', onTimeUpdate);
      media.addEventListener('loadedmetadata', onLoaded);
      return () => {
        media.removeEventListener('timeupdate', onTimeUpdate);
        media.removeEventListener('loadedmetadata', onLoaded);
      };
    }
  }, [isPlaying, item?.id, item?.type]);

  useEffect(() => {
    if (item) {
      setCurrentTime(0);
      setDuration(0);
      const media = item.type === MediaType.VIDEO ? videoRef.current : audioRef.current;
      if (media) {
        media.load();
        if (isPlaying) media.play().catch(() => {});
      }
    }
  }, [item?.id]);

  if (!item) return null;
  const isVideo = item.type === MediaType.VIDEO;

  return (
    <div className={`fixed inset-x-0 bottom-0 z-[100] transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isExpanded ? 'h-full' : 'h-16 md:h-20'}`}>
      <div className={`relative h-full w-full bg-[#0f0e13]/98 backdrop-blur-3xl flex flex-col overflow-hidden border-t border-white/5`}>
        
        {isExpanded ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden">
             
             {/* Fondo */}
             <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/30 animate-[scanline_4s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#d0bcff]/5 blur-[200px] rounded-full"></div>
             </div>

             {/* Header */}
             <div className="absolute top-8 inset-x-8 flex items-center justify-between z-50">
                <button onClick={() => setIsExpanded(false)} className="flex items-center gap-3 group">
                   <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-colors">
                      <svg className="h-5 w-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                   </div>
                   <div className="flex flex-col text-left">
                      <span className="text-[10px] font-black uppercase text-[#d0bcff] tracking-widest">Monitor</span>
                      <span className="text-[8px] font-black uppercase text-white/20 tracking-widest">Duki Archive</span>
                   </div>
                </button>

                <div className="flex items-center gap-6">
                   <a href="mailto:archive@duki.ameri" className="text-[10px] font-black uppercase text-white/30 hover:text-[#d0bcff] tracking-widest transition-colors">Correo</a>
                   <a href="https://duki-archive-newpipe-form.base44.app/" target="_blank" className="bg-[#d0bcff] text-[#381e72] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">Sugerencias</a>
                </div>
             </div>

             <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-12 md:gap-20 z-10 px-4">
                {isVideo ? (
                  <div className="w-full aspect-video bg-black rounded-[40px] overflow-hidden shadow-2xl border border-white/5 flex flex-col">
                    <video ref={videoRef} src={item.url} className="w-full flex-1" controls autoPlay={isPlaying} playsInline />
                    <div className="bg-[#1c1b1f] p-6 flex items-center justify-between border-t border-white/5">
                       <h2 className="text-xl font-black text-white uppercase tracking-tight">{item.name}</h2>
                       <span className="text-[10px] font-black text-[#d0bcff] uppercase opacity-40">Video Activo</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row items-center gap-16 w-full h-full">
                     
                     {/* Lado Izquierdo: Visualizador */}
                     <div className="flex flex-col items-center gap-10 w-full md:w-[45%]">
                        <div className="relative h-64 w-64 md:h-[450px] md:w-[450px] flex items-center justify-center">
                           <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_30s_linear_infinite]"></div>
                           <div className="absolute inset-8 border border-dashed border-[#d0bcff]/10 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
                           
                           <div className={`relative h-48 w-48 md:h-80 md:w-80 rounded-full bg-[#1a191e] border border-white/10 flex items-center justify-center shadow-[0_0_80px_rgba(208,188,255,0.1)] overflow-hidden`}>
                              <div className={`h-40 w-40 md:h-64 md:w-64 rounded-full border-4 border-dashed border-[#d0bcff]/20 flex items-center justify-center ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`}>
                                  <svg className="h-20 w-20 md:h-32 md:w-32 text-[#d0bcff]/40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                              </div>
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] p-6 text-center">
                                 <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.9] drop-shadow-2xl">{item.name}</h2>
                              </div>
                           </div>
                        </div>

                        {/* Controles */}
                        <div className="w-full flex flex-col gap-6 max-w-md">
                           <div className="flex items-center gap-6">
                              <span className="text-[12px] mono text-white/30 w-12">{Math.floor(currentTime/60)}:{(Math.floor(currentTime%60)).toString().padStart(2,'0')}</span>
                              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden group cursor-pointer relative">
                                 <div className="absolute h-full bg-[#d0bcff]" style={{ width: `${(currentTime/duration)*100}%` }}></div>
                                 <input type="range" min="0" max={duration || 0} step="0.1" value={currentTime} onChange={(e) => { if(audioRef.current) audioRef.current.currentTime = parseFloat(e.target.value); }} className="absolute inset-0 opacity-0 cursor-pointer" />
                              </div>
                              <span className="text-[12px] mono text-white/30 w-12">{Math.floor(duration/60) || 0}:{(Math.floor(duration%60) || 0).toString().padStart(2,'0')}</span>
                           </div>
                           <button onClick={() => setIsPlaying(!isPlaying)} className="h-20 w-20 mx-auto rounded-full bg-[#d0bcff] text-[#381e72] flex items-center justify-center shadow-[0_10px_40px_rgba(208,188,255,0.3)] active:scale-90 transition-all">
                              {isPlaying ? <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg className="h-10 w-10 ml-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
                           </button>
                        </div>
                        <audio ref={audioRef} src={item.url} hidden />
                     </div>

                     {/* Lado Derecho: Letras */}
                     <div className="flex-1 w-full h-[400px] md:h-[600px] relative">
                        <div className="absolute inset-0 border-l border-white/5 flex flex-col">
                           <div className="px-8 py-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                              <span className="text-[10px] font-black uppercase text-[#d0bcff] tracking-widest">Letras</span>
                              <span className="text-[8px] font-black text-white/20 uppercase">Sincronizado</span>
                           </div>
                           <div className="flex-1 overflow-y-auto no-scrollbar px-8 py-10 relative">
                              {cues.length > 0 ? (
                                <div className="space-y-8 pt-32 pb-60 text-left">
                                  {cues.map((cue, idx) => {
                                      const isCurrent = currentTime >= cue.start && currentTime <= cue.end;
                                      return (
                                        <p key={idx} className={`text-2xl md:text-4xl font-black transition-all duration-300 uppercase leading-tight ${isCurrent ? 'text-white scale-105' : 'text-white/10 scale-95 blur-[1px]'}`}>
                                            {cue.text}
                                        </p>
                                      );
                                  })}
                                </div>
                              ) : (
                                <div className="h-full flex flex-col items-center justify-center text-white/5">
                                   <span className="text-[10px] font-black uppercase tracking-widest">Sin letras disponibles</span>
                                </div>
                              )}
                              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0f0e13] via-transparent to-[#0f0e13]"></div>
                           </div>
                        </div>
                     </div>
                  </div>
                )}
             </div>
          </div>
        ) : (
          /* MINI PLAYER */
          <div className="h-full px-6 md:px-12 flex items-center justify-between group cursor-pointer" onClick={() => setIsExpanded(true)}>
            <div className="flex items-center gap-5 min-w-0">
               <div className={`h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#d0bcff]/40 transition-colors ${isPlaying ? 'bg-[#d0bcff]/10 text-[#d0bcff] animate-pulse' : ''}`}>
                  {isVideo ? <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c0 .55.45 1 1-1v-3.5l4 4v-11l-4 4z"/></svg> : <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>}
               </div>
               <div className="truncate">
                  <p className="text-[14px] font-black text-white uppercase truncate tracking-tight">{item.name}</p>
                  <p className="text-[9px] font-black text-[#d0bcff] uppercase tracking-widest opacity-40">{item.format}</p>
               </div>
            </div>
            <div className="flex items-center gap-4" onClick={e => e.stopPropagation()}>
               <button onClick={() => setIsPlaying(!isPlaying)} className="h-11 w-11 rounded-full bg-[#d0bcff] text-[#381e72] flex items-center justify-center shadow-lg active:scale-90 transition-all">
                  {isPlaying ? <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
               </button>
               <button onClick={onClose} className="h-11 w-11 rounded-full text-white/10 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanline {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default PersistentPlayer;