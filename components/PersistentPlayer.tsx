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
  onPlaybackError?: (id: string) => void;
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
  setIsExpanded,
  onPlaybackError
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [cues, setCues] = useState<Cue[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  
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
        media.play().catch(err => {
          console.error("Playback failed:", err);
          if (item && onPlaybackError) onPlaybackError(item.id);
          setLoadError("Archivo no disponible. Purgando registro...");
        });
      }
    }
  };

  useEffect(() => {
    const media = item?.type === MediaType.VIDEO ? videoRef.current : audioRef.current;
    if (media) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const onTimeUpdate = () => setCurrentTime(media.currentTime);
      const onLoaded = () => {
        setDuration(media.duration);
        setLoadError(null);
      };
      
      const onError = (e: any) => {
        console.error("Media Error Event:", e);
        setIsPlaying(false);
        setLoadError("ERROR: El servidor devolvió 0 o link corrupto. Eliminando de la lista...");
        if (item && onPlaybackError) {
          // Esperamos para que el usuario vea el mensaje antes de que el card desaparezca
          setTimeout(() => onPlaybackError(item.id), 2000);
        }
      };

      media.addEventListener('play', handlePlay);
      media.addEventListener('pause', handlePause);
      media.addEventListener('timeupdate', onTimeUpdate);
      media.addEventListener('loadedmetadata', onLoaded);
      media.addEventListener('error', onError);

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
        media.removeEventListener('error', onError);
      };
    }
  }, [item?.id, activeUrl, isPlaying]);

  useEffect(() => {
    if (item) {
      setCurrentTime(0);
      setDuration(0);
      setLoadError(null);
      const media = item.type === MediaType.VIDEO ? videoRef.current : audioRef.current;
      if (media) {
        media.load();
      }
    }
  }, [item?.id, activeUrl]);

  if (!item) return null;
  const isVideo = item.type === MediaType.VIDEO;
  const currentMediaUrl = activeUrl || item.url;

  const getMimeType = (url: string) => {
    const ext = url.split('.').pop()?.split('?')[0].toLowerCase();
    switch(ext) {
      case 'mp4': return isVideo ? 'video/mp4' : 'audio/mp4';
      case 'm4a': return 'audio/mp4';
      case 'mov': return 'video/quicktime';
      case 'flac': return 'audio/flac';
      case 'opus': return 'audio/ogg; codecs=opus';
      case 'mp3': return 'audio/mpeg';
      default: return isVideo ? 'video/mp4' : 'audio/mpeg';
    }
  };

  return (
    <div className={`fixed inset-x-0 bottom-0 z-[100] transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isExpanded ? 'h-full' : 'h-16 md:h-20'}`}>
      <div className={`relative h-full w-full bg-[#0f0e13]/98 backdrop-blur-3xl flex flex-col overflow-hidden border-t border-white/5 shadow-2xl`}>
        
        {isExpanded ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden">
             
             {/* Efectos Ameri CRT */}
             <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/30 animate-[scanline_4s_linear_infinite]"></div>
             </div>

             {/* Monitor de Fallos Críticos */}
             {loadError && (
               <div className="absolute top-1/4 z-[110] bg-red-600/90 border border-white/20 p-8 rounded-[40px] backdrop-blur-3xl animate-pulse text-white text-center shadow-[0_0_100px_rgba(220,38,38,0.5)]">
                 <svg className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                 <p className="text-xl font-black uppercase tracking-widest leading-tight max-w-sm">{loadError}</p>
               </div>
             )}

             {/* UI Ameri Premium */}
             <div className="absolute top-8 inset-x-8 flex items-center justify-between z-50">
                <button onClick={() => setIsExpanded(false)} className="flex items-center gap-3 group">
                   <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-colors">
                      <svg className="h-5 w-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                   </div>
                   <div className="flex flex-col text-left">
                      <span className="text-[10px] font-black uppercase text-[#d0bcff] tracking-widest">Ameri Bio-Monitor</span>
                      <span className="text-[14px] font-black text-white uppercase truncate max-w-[200px]">{item.name}</span>
                   </div>
                </button>
                <div className="flex items-center gap-4">
                  <a href={currentMediaUrl} download className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-white/40 transition-all">
                     <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </a>
                  <button onClick={onClose} className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500/20 text-white/40 hover:text-red-500 transition-all">
                     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
             </div>

             <div className="w-full max-w-7xl h-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 z-10 px-4 pt-16">
                
                {!isPlaying && !loadError && (
                  <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md pointer-events-none">
                    <button 
                      onClick={togglePlayback}
                      className="h-64 w-64 md:h-96 md:w-96 rounded-full bg-[#d0bcff] text-[#381e72] shadow-[0_0_150px_rgba(208,188,255,0.6)] pointer-events-auto transition-all hover:scale-110 active:scale-90 flex flex-col items-center justify-center border-[12px] border-white/20 animate-pulse group"
                    >
                      <svg className="h-32 w-32 md:h-48 md:w-48 ml-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span className="text-xs md:text-sm font-black uppercase tracking-[0.8em] mt-6">AMERI UNLOCKED</span>
                    </button>
                  </div>
                )}

                {isVideo ? (
                  <div className="w-full h-full max-h-[75vh] bg-black rounded-[48px] overflow-hidden shadow-2xl border border-white/5 flex flex-col relative">
                    <video 
                      ref={videoRef} 
                      className="w-full h-full object-contain" 
                      controls={isPlaying} 
                      playsInline 
                      preload="auto"
                      key={currentMediaUrl}
                      crossOrigin="anonymous"
                    >
                      <source src={currentMediaUrl} type={getMimeType(currentMediaUrl)} />
                    </video>
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
                           
                           <div className="flex items-center justify-center gap-8">
                             <button onClick={togglePlayback} className="h-24 w-24 rounded-full bg-[#d0bcff] text-[#381e72] flex items-center justify-center shadow-[0_10px_50px_rgba(208,188,255,0.4)] active:scale-90 transition-all hover:scale-105 border-4 border-white/10">
                                {isPlaying ? <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg className="h-12 w-12 ml-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
                             </button>
                           </div>
                        </div>
                        <audio ref={audioRef} preload="auto" key={currentMediaUrl} crossOrigin="anonymous">
                           <source src={currentMediaUrl} type={getMimeType(currentMediaUrl)} />
                        </audio>
                     </div>
                     
                     <div className="flex-1 w-full h-[400px] md:h-[600px] relative">
                        <div className="absolute inset-0 border-l border-white/5 flex flex-col">
                           <div className="px-8 py-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                              <span className="text-[10px] font-black uppercase text-[#d0bcff] tracking-widest">Sincronización Cerebral</span>
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
                                   <span className="text-[10px] font-black uppercase tracking-widest">DATOS INSTRUMENTALES</span>
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
                  <p className="text-[9px] font-black text-[#d0bcff] uppercase tracking-widest opacity-40">{item.format} • {isPlaying ? 'SONANDO' : 'DETENIDO'}</p>
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
      `}} />
    </div>
  );
};

export default PersistentPlayer;