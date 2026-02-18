import React from 'react';
import { MediaItem, MediaType, MediaCategory } from '../types';

interface MediaCardProps {
  item: MediaItem;
  onPlay: (item: MediaItem, customUrl?: string) => void;
  isActive: boolean;
  currentUrl?: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, onPlay, isActive, currentUrl }) => {
  const categories = Array.isArray(item.category) ? item.category : [item.category];
  const allSources = item.mirrors ? [item.url, ...item.mirrors] : [item.url];

  return (
    <div 
      className={`group relative flex items-center gap-4 rounded-[24px] px-5 py-3 transition-all duration-300 border overflow-hidden ${
        isActive 
          ? 'bg-[#2b2930] border-[#d0bcff] shadow-[0_10px_30px_rgba(208,188,255,0.1)] scale-[1.02]' 
          : 'bg-[#1c1b1f] border-white/5 hover:border-white/10 hover:bg-[#25232a]'
      }`}
    >
      {/* EL ICONO ES EL REPRODUCTOR */}
      <button 
        onClick={(e) => { e.stopPropagation(); onPlay(item); }}
        className={`h-12 w-12 flex-shrink-0 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${
          isActive 
            ? 'bg-[#d0bcff] text-[#381e72] rotate-12' 
            : 'bg-white/5 text-[#d0bcff] group-hover:bg-[#d0bcff] group-hover:text-[#381e72]'
        }`}
      >
        {isActive ? (
          <div className="flex gap-1 items-end h-4">
            <div className="w-1 h-full bg-[#381e72] animate-[bar-mini_0.5s_infinite]"></div>
            <div className="w-1 h-1/2 bg-[#381e72] animate-[bar-mini_0.7s_infinite_0.1s]"></div>
            <div className="w-1 h-3/4 bg-[#381e72] animate-[bar-mini_0.6s_infinite_0.2s]"></div>
          </div>
        ) : (
          item.type === MediaType.VIDEO ? (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c0 .55.45 1 1-1v-3.5l4 4v-11l-4 4z"/></svg>
          ) : (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
          )
        )}
      </button>

      <div className="flex-1 min-w-0 flex flex-col">
        <h3 className={`text-[13px] font-black uppercase truncate tracking-tight transition-colors ${isActive ? 'text-white' : 'text-white/70'}`}>
          {item.name}
        </h3>
        
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
           {/* Botones de instancia/enlace si hay varios */}
           {allSources.length > 1 && (
             <div className="flex items-center gap-1 mr-2">
               {allSources.map((src, idx) => (
                 <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); onPlay(item, src); }}
                  className={`text-[8px] font-black px-2 py-1 rounded-md border transition-all ${
                    currentUrl === src && isActive
                    ? 'bg-[#d0bcff] border-[#d0bcff] text-[#381e72]'
                    : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/30'
                  }`}
                 >
                   {idx + 1} ENLACE
                 </button>
               ))}
             </div>
           )}

           <span className="text-[8px] font-black uppercase tracking-widest text-[#d0bcff]/60">
             {categories[0]}
           </span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bar-mini { 0%, 100% { height: 4px; } 50% { height: 14px; } }
      `}} />
    </div>
  );
};

export default MediaCard;