
import React, { useRef, useState, useEffect } from 'react';
import { MediaItem, MediaType } from '../types';

interface PlayerOverlayProps {
  item: MediaItem;
  onClose: () => void;
}

interface Cue {
  start: number;
  end: number;
  text: string;
}

const PlayerOverlay: React.FC<PlayerOverlayProps> = ({ item, onClose }) => {
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [cues, setCues] = useState<Cue[]>([]);
  const [currentCue, setCurrentCue] = useState<string | null>(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const onTimeUpdate = () => {
      const time = media.currentTime;
      setCurrentTime(time);
      if (cues.length > 0) {
        const cue = cues.find(c => time >= c.start && time <= c.end);
        setCurrentCue(cue ? cue.text : null);
      }
    };
    const onLoadedMetadata = () => setDuration(media.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    media.addEventListener('timeupdate', onTimeUpdate);
    media.addEventListener('loadedmetadata', onLoadedMetadata);
    media.addEventListener('play', onPlay);
    media.addEventListener('pause', onPause);

    return () => {
      media.removeEventListener('timeupdate', onTimeUpdate);
      media.removeEventListener('loadedmetadata', onLoadedMetadata);
      media.removeEventListener('play', onPlay);
      media.removeEventListener('pause', onPause);
    };
  }, [cues]);

  useEffect(() => {
    if (!item.subtitleUrl) {
      setCues([]);
      setCurrentCue(null);
      return;
    }

    fetch(item.subtitleUrl)
      .then(res => res.text())
      .then(text => {
        const parsedCues: Cue[] = [];
        const blocks = text.trim().split(/\n\s*\n/);
        blocks.forEach(block => {
          const lines = block.split('\n');
          if (lines.length >= 3) {
            const timeRange = lines[1].split(' --> ');
            if (timeRange.length === 2) {
              const start = parseSRTTime(timeRange[0]);
              const end = parseSRTTime(timeRange[1]);
              const cueText = lines.slice(2).join('\n').replace(/<[^>]*>/g, '');
              parsedCues.push({ start, end, text: cueText });
            }
          }
        });
        setCues(parsedCues);
      })
      .catch(err => console.error("Subtitle load error:", err));
  }, [item.subtitleUrl]);

  const parseSRTTime = (timeStr: string) => {
    const parts = timeStr.trim().replace(',', '.').split(':');
    if (parts.length !== 3) return 0;
    return (parseFloat(parts[0]) * 3600) + (parseFloat(parts[1]) * 60) + parseFloat(parts[2]);
  };

  const togglePlay = () => {
    if (mediaRef.current?.paused) mediaRef.current.play();
    else mediaRef.current?.pause();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (mediaRef.current) mediaRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    if (mediaRef.current) mediaRef.current.volume = v;
    setVolume(v);
    setIsMuted(v === 0);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl transition-all duration-500">
      <div className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[48px] bg-[#1c1b1f] border border-white/5 shadow-[0_0_100px_rgba(103,80,164,0.3)]">
        
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-8 text-white bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-4">
            <div className={`spinning-flower text-[#d0bcff] ${!isPlaying && 'pause-anim'}`}>
              <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2L14.5,9H22L16,13.5L18.5,20.5L12,16L5.5,20.5L8,13.5L2,9H9.5L12,2Z" /></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d0bcff] animate-pulse">Reproduciendo</span>
              <h2 className="md3-font text-2xl font-bold truncate max-w-xs sm:max-w-lg">{item.name}</h2>
            </div>
          </div>
          <button onClick={onClose} className="group rounded-full p-3 bg-white/5 hover:bg-[#ffdad6] hover:text-[#410002] transition-all duration-300">
            <svg className="h-8 w-8 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col md:flex-row items-center justify-center bg-[#1c1b1f] relative overflow-hidden">
          
          {/* Animated Background Glow */}
          <div className={`absolute h-96 w-96 bg-[#6750a4]/20 rounded-full blur-[120px] transition-all duration-1000 ${isPlaying ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}`}></div>

          {item.type === MediaType.VIDEO ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <video 
                ref={mediaRef as React.RefObject<HTMLVideoElement>}
                src={item.url}
                className="max-h-full w-full object-contain z-10"
                autoPlay
              />
              {currentCue && (
                <div className="absolute bottom-32 left-0 right-0 text-center pointer-events-none px-6 z-20 fade-in-up">
                  <div className="inline-block bg-black/80 backdrop-blur-md px-8 py-4 rounded-[28px] text-white text-2xl sm:text-4xl font-black shadow-2xl border border-white/10 scale-110">
                    {currentCue}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-around gap-12 p-12 w-full h-full z-10">
              
              {/* Cover Art / Visualizer */}
              <div className="flex flex-col items-center gap-8">
                <div className="relative group float-anim">
                  <div className={`absolute -inset-8 rounded-[60px] bg-[#6750a4]/30 blur-3xl transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}></div>
                  <div className={`relative h-64 w-64 sm:h-80 sm:w-80 rounded-[60px] bg-[#6750a4] flex items-center justify-center shadow-2xl overflow-hidden transition-all duration-700 ${isPlaying ? 'scale-105 rotate-2' : 'scale-95'}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <svg className={`h-32 w-32 text-white drop-shadow-2xl ${isPlaying ? 'animate-bounce' : ''}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-white text-3xl font-black tracking-tight">{item.name}</h3>
                  <div className="mt-4 flex gap-2 justify-center">
                     <span className="bg-[#d0bcff] text-[#381e72] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{item.format}</span>
                     <span className="bg-white/5 text-[#cac4d0] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/10">{item.size || 'AMERI HQ'}</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Lyrics Scroll */}
              {item.subtitleUrl && (
                <div className="flex-1 max-w-lg bg-black/30 backdrop-blur-sm rounded-[40px] p-8 h-[500px] overflow-y-auto border border-white/5 shadow-inner space-y-8 scroll-smooth no-scrollbar">
                  <div className="text-center pb-40 pt-20">
                    {cues.length > 0 ? cues.map((cue, idx) => {
                      const isCurrent = currentTime >= cue.start && currentTime <= cue.end;
                      return (
                        <p 
                          key={idx} 
                          className={`text-2xl sm:text-3xl py-4 transition-all duration-500 cursor-default ${isCurrent ? 'text-white font-black scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] opacity-100' : 'text-white/20 font-medium scale-90 blur-[1px]'}`}
                        >
                          {cue.text}
                        </p>
                      );
                    }) : (
                      <div className="py-20 flex flex-col items-center gap-4 text-white/20">
                        <div className="spinning-flower h-12 w-12 border-4 border-t-[#d0bcff] rounded-full"></div>
                        <p className="font-bold uppercase tracking-widest text-xs">Sincronizando Letras...</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} src={item.url} autoPlay />
            </div>
          )}
        </div>

        {/* Player Controls Bar */}
        <div className="bg-[#2b2930] p-8 sm:p-12 z-20 relative">
          <div className="flex items-center gap-6 mb-8 group">
            <span className="text-[11px] font-black text-[#d0bcff] w-12">{formatTime(currentTime)}</span>
            <div className="relative flex-1">
               <input 
                type="range" min="0" max={duration || 0} step="0.01" value={currentTime} onChange={handleSeek}
                className="h-2 w-full appearance-none rounded-full bg-white/10 accent-[#d0bcff] cursor-pointer hover:accent-white transition-all"
               />
            </div>
            <span className="text-[11px] font-black text-[#d0bcff] w-12 text-right">{formatTime(duration)}</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-10">
            {/* Main Action Group */}
            <div className="flex items-center gap-12 mx-auto sm:mx-0">
               <button className="text-[#cac4d0] hover:text-white hover:scale-125 transition-all">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6L18 6v12z"/></svg>
               </button>
               <button 
                onClick={togglePlay}
                className="flex h-20 w-20 items-center justify-center rounded-[32px] bg-[#d0bcff] text-[#381e72] shadow-[0_10px_30px_rgba(208,188,255,0.4)] transition-all hover:scale-110 active:scale-90 hover:rotate-3 pulse-button"
               >
                 {isPlaying ? (
                    <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                 ) : (
                    <svg className="h-10 w-10 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 )}
               </button>
               <button className="text-[#cac4d0] hover:text-white hover:scale-125 transition-all">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
               </button>
            </div>

            {/* Volume & Details */}
            <div className="flex items-center gap-8 w-full sm:w-auto">
               <div className="flex items-center gap-4 bg-black/40 px-6 py-3 rounded-full flex-1 sm:flex-none">
                  <button onClick={() => { if(mediaRef.current) mediaRef.current.muted = !isMuted; setIsMuted(!isMuted); }} className="text-[#d0bcff] hover:scale-110 transition-transform">
                    {isMuted || volume === 0 ? (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1V10a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                    ) : (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M12 5l-4.707 4.707H4a1 1 0 00-1 1v4a1 1 0 001 1h3.293L12 19V5z" /></svg>
                    )}
                  </button>
                  <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolume} className="h-1 flex-1 sm:w-32 accent-[#d0bcff] cursor-pointer" />
               </div>
               <a href={item.url} target="_blank" rel="noreferrer" className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6750a4] text-white hover:bg-[#4f378b] transition-all hover:-translate-y-1 shadow-lg group">
                 <svg className="h-6 w-6 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
               </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerOverlay;
