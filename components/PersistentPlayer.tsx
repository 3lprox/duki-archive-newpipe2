import React, { useRef, useState, useEffect } from 'react';
import { MediaItem, MediaType } from '../types';

interface PersistentPlayerProps {
  item: MediaItem | null;
  activeUrl?: string;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  onClose: () => void;
  isExpanded: boolean;
  setIsExpanded: (val: boolean) => void;
}

interface Cue {
  start: number;
  end: number;
  text: string;
}

const PersistentPlayer: React.FC<PersistentPlayerProps> = ({ 
  item, 
  activeUrl, 
  isPlaying, 
  setIsPlaying, 
  onClose,
  isExpanded,
  setIsExpanded
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
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

  const togglePlayback = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const media = item?.type === MediaType.VIDEO ? videoRef.current : audioRef.current;
    if (media) {
      if (isPlaying) {
        media.pause();
      } else {
        media.play().catch(console.error);
      }
    }
  };

  useEffect(() => {
    const media = item?.type === MediaType.VIDEO ? videoRef.current : audioRef.current;
    if (media) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const onTimeUpdate = () => setCurrentTime(media.currentTime);
      const onLoaded = () => setDuration(media.duration);

      media.addEventListener('play', handlePlay);
      media.addEventListener('pause', handlePause);
      media.addEventListener('timeupdate', onTimeUpdate);
      media.addEventListener('loadedmetadata', onLoaded);

      if (isPlaying) {
        media.play().catch(() => setIsPlaying(false));
      } else {
        media.pause();
      }

      return () => {
        media.removeEventListener('play', handlePlay);
        media.removeEventListener('pause', handlePause);
        media.removeEventListener('timeupdate', onTimeUpdate);
        media.removeEventListener('loadedmetadata', onLoaded);
      };
    }
  }, [item?.id, activeUrl, isPlaying]);

  useEffect(() => {
    if (item) {
      setCurrentTime(0);
      setDuration(0);
      const media = item.type === MediaType.VIDEO ? videoRef.current : audioRef.current;
      if (media) {
        media.load();
      }
    }
  }, [item?.id, activeUrl]);

  if (!item) return null;
  const isVideo = item.type === MediaType.VIDEO;
  const currentMediaUrl = activeUrl || item.url;

  return (
    <div className={`fixed inset-x-0 bottom-0 z-[100] transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isExpanded ? 'h-full' : 'h-16 md:h-20'}`}>
      <div className={`relative h-full w-full bg-[#0f0e13]/98 backdrop-blur-3xl flex flex-col overflow-hidden border-t border-white/5 shadow-2xl`}>
        
        {isExpanded ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden">
             
             <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/30 animate-[scanline_4s_linear_infinite]"></div>
             </div>

             <div className="absolute top-8 inset-x-8 flex items-center justify-between z-50">
                <button onClick={() => setIsExpanded(false)} className="flex items-center gap-3 group">
                   <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-colors">
                      <svg className="h-5 w-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                   </div>
                   <div className="flex flex-col text-left">
                      <span className="text-[10px] font-black uppercase text-[#d0bcff] tracking-widest">Monitor</span>
                      <span className="text-[14px] font-black text-white uppercase truncate max-w-[200px]">{item.name}</span>
                   </div>
                </button>
                <button onClick={onClose} className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500/20 text-white/40 hover:text-red-500 transition-all">
                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
             </div>

             <div className="w-full max-w-7xl h-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 z-10 px-4 pt-16">
                
                {/* BOTÓN GIGANTE DE REPRODUCCIÓN (SOLO SI NO ESTÁ SONANDO) */}
                {!isPlaying && (
                  <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm group pointer-events-none">
                    <button 
                      onClick={togglePlayback}
                      className="h-56 w-56 md:h-80 md:w-80 rounded-full bg-[#d0bcff] text-[#381e72] shadow-[0_0_100px_rgba(208,188,255,0.4)] pointer-events-auto transition-all hover:scale-110 active:scale-90 flex flex-col items-center justify-center border-8 border-white/20 animate-pulse"
                    >
                      <svg className="h-24 w-24 md:h-40 md:w-40 ml-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] mt-4">REPRODUCIR</span>
                    </button>
                  </div>
                )}

                {isVideo ? (
                  <div className="w-full h-full max-h-[80vh] bg-black rounded-[40px] overflow-hidden shadow-2xl border border-white/5 flex flex-col relative">
                    <video 
                      ref={videoRef} 
                      src={currentMediaUrl} 
                      className="w-full h-full object-contain" 
                      controls={isPlaying} 
                      playsInline 
                    />
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row items-center gap-16 w-full h-full">
                     <div className="flex flex-col items-center gap-10 w-full md:w-[45%]">
                        <div className="relative h-64 w-64 md:h-[450px] md:w-[450px] flex items-center justify-center">
                           <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_30s_linear_infinite]"></div>
                           <div className={`relative h-48 w-48 md:h-80 md:w-80 rounded-full bg-[#1a191e] border border-white/10 flex items-center justify-center shadow-[0_0_80px_rgba(208,188,255,0.1)] overflow-hidden`}>
                              <div className={`h-40 w-40 md:h-64 md:w-64 rounded-full border-4 border-dashed border-[#d0bcff]/20 flex items-center justify-center ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`}>
                                  <svg className="h-20 w-20 md:h-32 md:w-32 text-[#d0bcff]/40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                              </div>
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] p-6 text-center">
                                 <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.9] drop-shadow-2xl">{item.name}</h2>
                              </div>
                           </div>
                        </div>
                        <div className="w-full flex flex-col gap-6 max-w-md">
                           <div className="flex items-center gap-6">
                              <span className="text-[12px] mono text-white/30 w-12">{Math.floor(currentTime/60)}:{(Math.floor(currentTime%60)).toString().padStart(2,'0')}</span>
                              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden group cursor-pointer relative">
                                 <div className="absolute h-full bg-[#d0bcff]" style={{ width: `${(currentTime/duration)*100}%` }}></div>
                                 <input type="range" min="0" max={duration || 0} step="0.1" value={currentTime} onChange={(e) => { if(audioRef.current) audioRef.current.currentTime = parseFloat(e.target.value); }} className="absolute inset-0 opacity-0 cursor-pointer" />
                              </div>
                              <span className="text-[12px] mono text-white/30 w-12">{Math.floor(duration/60) || 0}:{(Math.floor(duration%60) || 0).toString().padStart(2,'0')}</span>
                           </div>
                           <button onClick={togglePlayback} className="h-24 w-24 mx-auto rounded-full bg-[#d0bcff] text-[#381e72] flex items-center justify-center shadow-[0_10px_50px_rgba(208,188,255,0.4)] active:scale-90 transition-all hover:scale-105 border-4 border-white/10">
                              {isPlaying ? <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg className="h-12 w-12 ml-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
                           </button>
                        </div>
                        <audio ref={audioRef} src={currentMediaUrl} hidden />
                     </div>
                     <div className="flex-1 w-full h-[400px] md:h-[600px] relative">
                        <div className="absolute inset-0 border-l border-white/5 flex flex-col">
                           <div className="px-8 py-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                              <span className="text-[10px] font-black uppercase text-[#d0bcff] tracking-widest">Letras</span>
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
                                   <span className="text-[10px] font-black uppercase tracking-widest">Sin letras</span>
                                </div>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
                )}
             </div>
          </div>
        ) : (
          <div className="h-full px-6 md:px-12 flex items-center justify-between group cursor-pointer" onClick={() => setIsExpanded(true)}>
            <div className="flex items-center gap-5 min-w-0">
               <div className={`h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#d0bcff]/40 transition-colors ${isPlaying ? 'bg-[#d0bcff]/10 text-[#d0bcff] animate-pulse shadow-[0_0_15px_rgba(208,188,255,0.2)]' : ''}`}>
                  {isVideo ? <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c0 .55.45 1 1-1v-3.5l4 4v-11l-4 4z"/></svg> : <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>}
               </div>
               <div className="truncate">
                  <p className="text-[14px] font-black text-white uppercase truncate tracking-tight">{item.name}</p>
                  <p className="text-[9px] font-black text-[#d0bcff] uppercase tracking-widest opacity-40">{item.format} • {isPlaying ? 'Sonando' : 'Pausa'}</p>
               </div>
            </div>
            <div className="flex items-center gap-4" onClick={e => e.stopPropagation()}>
               <button onClick={togglePlayback} className="h-11 w-11 rounded-full bg-[#d0bcff] text-[#381e72] flex items-center justify-center shadow-lg active:scale-90 transition-all">
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
        @keyframes scanline { 0% { transform: translateY(-100vh); } 100% { transform: translateY(100vh); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        video::-webkit-media-controls-panel {
          background-image: linear-gradient(transparent, rgba(15, 14, 19, 0.8));
        }
      `}} />
    </div>
  );
};

export default PersistentPlayer;