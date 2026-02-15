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
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCC, setShowCC] = useState(true);
  const [cues, setCues] = useState<Cue[]>([]);
  const [currentCue, setCurrentCue] = useState<string | null>(null);

  useEffect(() => {
    if (!item) return;
    const media = item.type === MediaType.VIDEO ? videoRef.current : audioRef.current;
    if (media) {
      media.pause();
      media.load();
      if (isPlaying) {
        media.play().catch(e => {
          if (e.name !== 'AbortError') setIsPlaying(false);
        });
      }
    }
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;
    const media = item.type === MediaType.VIDEO ? videoRef.current : audioRef.current;
    if (media) {
      if (isPlaying) media.play().catch(() => {});
      else media.pause();
    }
  }, [isPlaying, isExpanded]);

  useEffect(() => {
    if (!item?.subtitleUrl) {
      setCues([]);
      setCurrentCue(null);
      return;
    }
    fetch(item.subtitleUrl)
      .then(res => res.ok ? res.text() : "")
      .then(text => {
        if (!text) return;
        const parsed: Cue[] = [];
        text.split(/\n\s*\n/).forEach(block => {
          const lines = block.split('\n').filter(l => l.trim());
          if (lines.length >= 2) {
            const timeLine = lines.find(l => l.includes(' --> '));
            if (timeLine) {
              const [s, e] = timeLine.split(' --> ');
              const parse = (t: string) => {
                const p = t.trim().replace(',', '.').split(':');
                return (parseFloat(p[0]) * 3600) + (parseFloat(p[1]) * 60) + parseFloat(p[2]);
              };
              parsed.push({ start: parse(s), end: parse(e), text: lines.slice(lines.indexOf(timeLine)+1).join(' ') });
            }
          }
        });
        setCues(parsed);
      }).catch(() => {});
  }, [item?.subtitleUrl]);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLMediaElement>) => {
    const media = e.currentTarget;
    if (isNaN(media.duration)) return;
    setCurrentTime(media.currentTime);
    setProgress((media.currentTime / media.duration) * 100);
    setDuration(media.duration);
    const cue = cues.find(c => media.currentTime >= c.start && media.currentTime <= c.end);
    setCurrentCue(cue ? cue.text : null);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    const m = isVideo ? videoRef.current : audioRef.current;
    if (m) m.volume = v;
  };

  if (!item) return null;
  const isVideo = item.type === MediaType.VIDEO;

  return (
    <div className={`fixed inset-x-0 bottom-0 z-[100] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isExpanded ? 'h-full' : 'h-16 md:h-20'}`}>
      
      {!isVideo && <audio ref={audioRef} src={item.url} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)} className="hidden" />}

      <div className={`relative h-full w-full bg-[#0f0e13]/95 backdrop-blur-3xl flex flex-col overflow-hidden transition-all ${!isExpanded && 'border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.6)]'}`}>
        
        {!isExpanded && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-20">
            <div className="h-full bg-[#ffb4ab] shadow-[0_0_15px_#ffb4ab] transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        )}

        {isExpanded ? (
          <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden p-4 md:p-8 gap-6">
            <div className="flex-1 flex flex-col items-center justify-center min-h-0 bg-black/40 rounded-[40px] border border-white/10 relative overflow-hidden group">
               {isVideo ? (
                 <div className="w-full h-full flex items-center justify-center relative">
                   <video 
                     ref={videoRef}
                     src={item.url}
                     onTimeUpdate={handleTimeUpdate}
                     onEnded={() => setIsPlaying(false)}
                     className="max-h-full max-w-full rounded-2xl shadow-2xl z-10"
                     playsInline
                     onClick={() => setIsPlaying(!isPlaying)}
                   />
                   {currentCue && showCC && (
                     <div className="absolute bottom-10 left-0 right-0 px-8 text-center pointer-events-none z-20">
                       <span className="inline-block bg-black/80 backdrop-blur-xl px-10 py-3 rounded-full text-white text-lg md:text-3xl font-black border border-[#d0bcff]/40 shadow-2xl animate-pulse">
                         {currentCue}
                       </span>
                     </div>
                   )}
                 </div>
               ) : (
                 <div className="text-center flex flex-col items-center gap-12">
                   {/* Espectro Dinámico */}
                   <div className="flex items-end gap-1.5 h-48 w-80 justify-center">
                      {[...Array(20)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-2 rounded-full transition-all duration-200"
                          style={{ 
                            height: isPlaying ? `${Math.random() * 80 + 20}%` : '6px',
                            backgroundColor: i % 2 === 0 ? '#d0bcff' : '#ffb4ab',
                            animation: isPlaying ? `bar-bounce ${0.4 + Math.random() * 0.6}s infinite alternate` : 'none',
                            boxShadow: isPlaying ? '0 0 15px currentColor' : 'none'
                          }}
                        />
                      ))}
                   </div>
                   
                   <div className="relative">
                      <div className={`absolute -inset-16 bg-[#d0bcff]/20 blur-[100px] transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}></div>
                      <div className={`relative h-56 w-56 rounded-[64px] bg-gradient-to-br from-[#d0bcff]/20 to-[#ffb4ab]/10 flex items-center justify-center border border-white/10 z-10 shadow-2xl transition-transform duration-1000 ${isPlaying ? 'rotate-6 scale-110' : ''}`}>
                         <svg className={`h-24 w-24 text-[#d0bcff] drop-shadow-2xl`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                      </div>
                   </div>

                   <div className="z-10 px-4">
                      <h2 className="text-2xl md:text-5xl font-black text-white tracking-tighter mb-4">{item.name}</h2>
                      <div className="flex gap-4 justify-center">
                         <span className="text-[10px] font-black uppercase tracking-[0.5em] px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[#d0bcff]">{item.category}</span>
                         <span className="text-[10px] font-black uppercase tracking-[0.5em] px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/40">{item.format}</span>
                      </div>
                   </div>
                 </div>
               )}
            </div>

            <div className="w-full md:w-[380px] flex flex-col h-full bg-black/30 rounded-[40px] border border-white/5 overflow-hidden backdrop-blur-md">
               <div className="px-8 py-5 border-b border-white/10 flex justify-between items-center bg-white/5">
                  <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20">Ameri Sync Center</span>
                  {item.subtitleUrl && (
                    <button onClick={() => setShowCC(!showCC)} className={`text-[10px] font-black px-4 py-1.5 rounded-full border transition-all ${showCC ? 'bg-[#d0bcff] text-[#381e72]' : 'text-white/30 border-white/10'}`}>CC ACTIVE</button>
                  )}
               </div>
               <div ref={lyricsContainerRef} className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-8 mask-fade-y scroll-smooth">
                  {cues.length > 0 ? (
                    cues.map((cue, i) => (
                      <p key={i} className={`text-xl md:text-3xl font-bold transition-all duration-500 text-center md:text-left ${currentTime >= cue.start && currentTime <= cue.end ? 'text-white scale-105 opacity-100 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]' : 'text-white/5 scale-95 blur-[1px]'}`}>
                        {cue.text}
                      </p>
                    ))
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-white/10 text-center">
                       <div className="animate-pulse h-16 w-16 mb-6 opacity-20">
                          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-[0.8em] italic">{item.subtitleUrl ? 'Descifrando Ameri...' : 'Instrumental Mode'}</span>
                    </div>
                  )}
               </div>
            </div>
          </div>
        ) : (
          /* Mini Player Rediseñado */
          <div className="h-full px-6 md:px-12 flex items-center justify-between group cursor-pointer" onClick={() => setIsExpanded(true)}>
             <div className="flex items-center gap-6 min-w-0">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-[#d0bcff] border border-white/5 flex-shrink-0 transition-all group-hover:scale-110 ${isPlaying ? 'bg-[#d0bcff]/20 border-[#d0bcff]/40 shadow-[0_0_20px_rgba(208,188,255,0.2)]' : 'bg-white/5'}`}>
                   {isVideo ? <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c0 .55.45 1 1-1v-3.5l4 4v-11l-4 4z"/></svg> : <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>}
                </div>
                <div className="truncate">
                   <p className="text-sm font-black text-white truncate leading-none mb-1.5 group-hover:text-[#d0bcff] transition-colors uppercase tracking-tight">{item.name}</p>
                   <div className="flex items-center gap-3">
                      <span className="text-[8px] font-black uppercase text-[#d0bcff] tracking-[0.4em] opacity-60">{item.category}</span>
                      {isPlaying && <div className="flex gap-1 items-end h-3"><div className="w-0.5 h-full bg-[#d0bcff] animate-[bar-mini_0.5s_infinite]"></div><div className="w-0.5 h-1/2 bg-[#ffb4ab] animate-[bar-mini_0.7s_infinite_0.1s]"></div><div className="w-0.5 h-3/4 bg-[#d0bcff] animate-[bar-mini_0.6s_infinite_0.2s]"></div></div>}
                   </div>
                </div>
             </div>
             <div className="flex items-center gap-4" onClick={e => e.stopPropagation()}>
                <button onClick={() => setIsPlaying(!isPlaying)} className="h-12 w-12 rounded-full bg-[#d0bcff] text-[#381e72] flex items-center justify-center active:scale-90 transition-all shadow-xl hover:shadow-[#d0bcff]/20">
                  {isPlaying ? <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg className="h-6 w-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
                </button>
             </div>
          </div>
        )}

        {isExpanded && (
          <div className="bg-[#0f0e13] p-6 md:p-10 border-t border-white/5 backdrop-blur-3xl shadow-[0_-20px_100px_rgba(0,0,0,1)]">
            <div className="max-w-5xl mx-auto">
               <div className="flex items-center gap-6 mb-8">
                  <span className="text-xs font-black text-white/30 mono">{Math.floor(currentTime/60)}:{(Math.floor(currentTime%60)).toString().padStart(2, '0')}</span>
                  <div className="flex-1 relative h-8 flex items-center group">
                    <input type="range" min="0" max={duration || 100} value={currentTime} onChange={e => {
                      const m = isVideo ? videoRef.current : audioRef.current;
                      if (m) m.currentTime = parseFloat(e.target.value);
                    }} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-[#d0bcff] cursor-pointer group-hover:h-2.5 transition-all" />
                  </div>
                  <span className="text-xs font-black text-white/30 mono">{Math.floor(duration/60)}:{(Math.floor(duration%60)).toString().padStart(2, '0')}</span>
               </div>
               
               <div className="flex items-center justify-between">
                  <div className="flex gap-6 items-center">
                     <button onClick={onClose} title="Borrar de la cola" className="p-4 text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-3xl transition-all active:scale-90"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                     <div className="hidden md:flex items-center gap-4 bg-white/5 px-6 py-3 rounded-full border border-white/10 group">
                        <svg className="h-5 w-5 text-[#d0bcff] opacity-40 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolume} className="w-24 h-1 bg-white/10 appearance-none accent-[#d0bcff] cursor-pointer rounded-full" />
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-10">
                     <button className="text-white/20 hover:text-white transition-all hover:scale-125 active:scale-90"><svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6L18 6v12z"/></svg></button>
                     <button onClick={() => setIsPlaying(!isPlaying)} className="h-20 w-20 rounded-[32px] bg-[#d0bcff] text-[#381e72] flex items-center justify-center shadow-[0_0_50px_rgba(208,188,255,0.4)] active:scale-95 transition-all hover:rotate-3 hover:scale-110">
                        {isPlaying ? <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg className="h-10 w-10 ml-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
                     </button>
                     <button className="text-white/20 hover:text-white transition-all hover:scale-125 active:scale-90"><svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg></button>
                  </div>

                  <div className="flex gap-4">
                     <a href={item.url} target="_blank" download title="Descargar" className="p-4 text-white/20 hover:text-[#d0bcff] hover:bg-[#d0bcff]/10 rounded-3xl transition-all active:scale-90"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg></a>
                     <button onClick={() => setIsExpanded(false)} className="p-4 text-white/20 hover:text-white hover:bg-white/10 rounded-3xl transition-all active:scale-90">
                        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                     </button>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bar-bounce { to { height: 10%; opacity: 0.1; } }
        @keyframes bar-mini { 0%, 100% { height: 5px; } 50% { height: 10px; } }
        .mask-fade-y { mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      ` }} />
    </div>
  );
};

export default PersistentPlayer;