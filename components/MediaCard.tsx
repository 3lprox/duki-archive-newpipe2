import React from 'react';
import { MediaItem, MediaType, MediaCategory } from '../types';

interface MediaCardProps {
  item: MediaItem;
  onPlay: (item: MediaItem) => void;
  isActive: boolean;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, onPlay, isActive }) => {
  const categories = Array.isArray(item.category) ? item.category : [item.category];
  
  const isLostMedia = categories.includes(MediaCategory.LOST_MEDIA);
  const isOptimized = categories.includes(MediaCategory.OPTIMIZED);
  const isCRO = categories.includes(MediaCategory.CRO);
  const isDUKI = categories.includes(MediaCategory.DUKI);

  const getAccentColor = () => {
    if (isActive) return '#ffb4ab'; 
    if (isLostMedia) return '#ff5252'; 
    if (isCRO) return '#d0bcff'; 
    if (isDUKI) return '#ffffff'; 
    if (isOptimized) return '#00f2ff'; 
    return '#d0bcff'; 
  };

  const accent = getAccentColor();

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.url);
  };

  return (
    <div 
      onClick={() => onPlay(item)}
      className={`group relative flex flex-col gap-3 rounded-2xl p-4 transition-all duration-300 cursor-pointer border overflow-hidden ${
        isActive 
          ? 'bg-[#31111d] border-[#ffb4ab] shadow-[0_0_30px_rgba(255,180,171,0.2)] scale-[1.02]' 
          : 'bg-[#1a191e] border-white/5 hover:border-white/20 hover:bg-[#25232a] hover:-translate-y-2'
      }`}
    >
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 backdrop-blur-[3px]">
          <div className="bg-white/10 p-4 rounded-full border border-white/20 scale-75 group-hover:scale-100 transition-transform">
            <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
      </div>

      <div className="flex items-center justify-between z-10">
        <div 
          className="p-3 rounded-xl transition-all" 
          style={{ 
            backgroundColor: isActive ? accent : `${accent}15`,
            color: isActive ? '#31111d' : accent
          }}
        >
           {item.type === MediaType.VIDEO ? (
             <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c0 .55.45 1 1-1v-3.5l4 4v-11l-4 4z"/></svg>
           ) : (
             <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
           )}
        </div>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-30">
            <button onClick={handleCopy} title="Copiar Link" className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            </button>
        </div>
      </div>

      <div className="space-y-2 z-10">
        <h3 className={`text-[13px] md:text-[14px] font-black leading-snug line-clamp-2 transition-colors ${isActive ? 'text-white' : 'text-[#e6e1e5]'}`}>
          {item.name}
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat, idx) => (
            <span key={idx} className="text-[7px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border" style={{ color: accent, borderColor: `${accent}30`, backgroundColor: `${accent}05` }}>
              {cat}
            </span>
          ))}
          <span className="text-[7px] font-bold text-white/20 uppercase mono tracking-widest">{item.format}</span>
        </div>
      </div>

      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ffb4ab] overflow-hidden">
            <div className="h-full bg-white/60 animate-[loading_1.5s_linear_infinite]"></div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default MediaCard;