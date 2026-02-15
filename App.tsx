import React, { useState, useMemo, useEffect } from 'react';
import { ARCHIVE_ITEMS } from './constants';
import { MediaItem, MediaType, MediaCategory } from './types';
import TopBar from './components/TopBar';
import NavigationRail from './components/NavigationRail';
import MediaCard from './components/MediaCard';
import PersistentPlayer from './components/PersistentPlayer';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MediaCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrack, setCurrentTrack] = useState<MediaItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlay = (item: MediaItem) => {
    if (currentTrack?.id === item.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(item);
      setIsPlaying(true);
    }
  };

  const filteredItems = useMemo(() => {
    return ARCHIVE_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase();
      return matchesCategory && (item.name.toLowerCase().includes(q) || item.format.toLowerCase().includes(q));
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden selection:bg-[#d0bcff] selection:text-[#381e72]">
      <TopBar searchQuery={searchQuery} onSearch={setSearchQuery} />
      
      <div className="flex flex-1 relative">
        <div className="hidden md:block sticky top-[72px] h-[calc(100vh-72px)] z-30">
          <NavigationRail activeType={activeCategory as any} onTypeChange={(t) => setActiveCategory(t as any)} />
        </div>

        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0f0e13]/90 backdrop-blur-3xl border-t border-white/5 pb-safe">
           <NavigationRail activeType={activeCategory as any} onTypeChange={(t) => setActiveCategory(t as any)} />
        </div>
        
        <main className={`flex-1 p-6 md:p-10 transition-all ${currentTrack ? 'pb-32' : 'pb-24'}`}>
          <div className="mx-auto max-w-[1600px]">
            
            {/* AVISO DE CATBOX BLOCKING */}
            <div className="mb-8 animate-[entry_0.6s_ease-out] relative group">
               <div className="absolute -inset-1 bg-red-500/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
               <div className="relative flex items-center gap-4 bg-red-500/10 border border-red-500/30 p-4 rounded-3xl backdrop-blur-md">
                  <div className="flex-shrink-0 h-10 w-10 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-400 animate-pulse">
                     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                     </svg>
                  </div>
                  <div>
                     <h3 className="text-red-400 font-black text-[10px] uppercase tracking-[0.3em] mb-1">Alerta de Red</h3>
                     <p className="text-white/80 text-xs font-bold leading-relaxed">
                        Catbox está bloqueando enlaces sin razón aparente. Si un archivo no carga o marca error, es debido a restricciones del servidor externo.
                     </p>
                  </div>
               </div>
            </div>

            <header className="mb-12 animate-[entry_0.8s_ease-out]">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#d0bcff] font-black uppercase text-[10px] tracking-[0.6em]">
                    <span className="h-[2px] w-12 bg-gradient-to-r from-[#d0bcff] to-transparent"></span>
                    Ameri Archive Ultra V4.1
                  </div>
                  <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white leading-none">
                    {activeCategory === 'all' ? 'Ameri Database' : activeCategory}
                  </h2>
                </div>
                <div className="flex items-center gap-6 bg-white/5 px-8 py-4 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
                   <div className="flex flex-col items-end">
                      <span className="text-lg font-black text-[#d0bcff] leading-none">{filteredItems.length}</span>
                      <span className="text-[8px] font-black opacity-40 uppercase tracking-[0.4em] mt-1">Archivos</span>
                   </div>
                   <div className="h-10 w-[1px] bg-white/10"></div>
                   <div className="flex flex-col items-end">
                      <span className="text-[8px] font-black text-green-400 uppercase tracking-[0.4em] animate-pulse">Stable</span>
                      <span className="text-[8px] font-black opacity-40 uppercase tracking-[0.4em] mt-1">Status</span>
                   </div>
                </div>
              </div>
            </header>

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 stagger-in">
                {filteredItems.map((item, idx) => (
                  <div key={item.id} style={{ animationDelay: `${idx * 0.03}s` }}>
                    <MediaCard 
                        item={item} 
                        onPlay={handlePlay} 
                        isActive={currentTrack?.id === item.id && isPlaying}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-48 opacity-20">
                <div className="h-24 w-24 mb-6 border-2 border-[#d0bcff] rounded-full border-dashed animate-spin duration-[10s]"></div>
                <p className="text-[12px] font-black uppercase tracking-[0.8em] text-white">Base de datos vacía</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <PersistentPlayer 
        item={currentTrack} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying}
        onClose={() => { setCurrentTrack(null); setIsPlaying(false); }}
      />
    </div>
  );
};

export default App;