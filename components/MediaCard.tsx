import React from 'react';
import { MediaItem, MediaType, MediaCategory } from '../types';

interface MediaCardProps {
  item: MediaItem;
  onPlay: (item: MediaItem) => void;
  isActive: boolean;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, onPlay, isActive }) => {
  const categories = Array.isArray(item.category) ? item.category : [item.category];
  
  const isLeaked = categories.includes(MediaCategory.LEAKED);
  const isCRO = categories.includes(MediaCategory.CRO);
  const isLost = categories.includes(MediaCategory.LOST_MEDIA);

  const getAccentColor = () => {
    if (isActive) return '#ffb4ab';
    if (isLeaked) return '#ffd600';
    if (isCRO) return '#d0bcff';
    if (isLost) return '#ff5252';
    return '#ffffff';
  };

  const accent = getAccentColor();

  return (
    <div 
      onClick={() => onPlay(item)}
      className={`group relative flex items-center gap-4 rounded-full px-5 py-3 transition-all duration-300 cursor-pointer border overflow-hidden ${
        isActive 
          ? 'bg-[#31111d] border-[#ffb4ab] shadow-[0_5px_15px_rgba(255,180,171,0.15)] scale-[1.02]' 
          : 'bg-[#1c1b1f] border-white/5 hover:border-white/10 hover:bg-[#25232a]'
      }`}
    >
      {/* Visual Indicator (Pill Icon) */}
      <div className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-[#ffb4ab] text-[#381e72] rotate-12' : 'bg-white/5 text-white/20 group-hover:bg-white/10'}`}>
        {isActive ? (
          <div className="flex gap-1 items-end h-3">
            <div className="w-0.5 h-full bg-[#381e72] animate-[bar-mini_0.5s_infinite]"></div>
            <div className="w-0.5 h-1/2 bg-[#381e72] animate-[bar-mini_0.7s_infinite_0.1s]"></div>
            <div className="w-0.5 h-3/4 bg-[#381e72] animate-[bar-mini_0.6s_infinite_0.2s]"></div>
          </div>
        ) : (
          item.type === MediaType.VIDEO ? (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c0 .55.45 1 1-1v-3.5l4 4v-11l-4 4z"/></svg>
          ) : (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
          )
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <h3 className={`text-[12px] font-black uppercase truncate tracking-tight transition-colors ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
          {item.name}
        </h3>
        <div className="flex items-center gap-2 mt-0.5">
           <span className="text-[7px] font-black uppercase tracking-widest opacity-40" style={{ color: isActive ? '#ffb4ab' : '#d0bcff' }}>
             {categories[0]}
           </span>
           <span className="h-0.5 w-0.5 rounded-full bg-white/10"></span>
           <span className="text-[7px] font-bold text-white/10 uppercase mono">{item.format}</span>
        </div>
      </div>

      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#ffb4ab]/20"></div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bar-mini { 0%, 100% { height: 4px; } 50% { height: 10px; } }
      `}} />
    </div>
  );
};

export default MediaCard;