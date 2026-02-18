import React, { useState, useMemo } from 'react';
import { ARCHIVE_ITEMS } from './constants';
import { MediaItem, MediaType, MediaCategory } from './types';
import TopBar from './components/TopBar';
import NavigationRail from './components/NavigationRail';
import MediaCard from './components/MediaCard';
import PersistentPlayer from './components/PersistentPlayer';
import LandingGate from './components/LandingGate';

const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeCategory, setActiveCategory] = useState<MediaCategory | MediaType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrack, setCurrentTrack] = useState<MediaItem | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleInitialEnter = () => {
    setHasEntered(true);
  };

  const handlePlay = (item: MediaItem, customUrl?: string) => {
    const urlToUse = customUrl || item.url;
    
    if (currentTrack?.id === item.id) {
      if (customUrl && currentUrl !== customUrl) {
        setCurrentUrl(customUrl);
        setIsPlaying(false); 
      } else {
        setIsPlaying(!isPlaying);
      }
    } else {
      setCurrentTrack(item);
      setCurrentUrl(urlToUse);
      setIsPlaying(false); 
      setIsExpanded(true); // Abrimos el reproductor expandido con el botón gigante al seleccionar nueva canción
    }
  };

  const filteredItems = useMemo(() => {
    return ARCHIVE_ITEMS.filter((item) => {
      const itemCategories = Array.isArray(item.category) ? item.category : [item.category];
      const matchesCategory = activeCategory === 'all' || 
        itemCategories.includes(activeCategory as MediaCategory) || 
        ((item.type as string) === (activeCategory as string));
      
      const q = searchQuery.toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(q) || item.format.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  if (!hasEntered) {
    return <LandingGate onEnter={handleInitialEnter} />;
  }

  return (
    <div className="h-full flex flex-col bg-[#0f0e13] overflow-hidden animate-in fade-in duration-1000">
      <TopBar searchQuery={searchQuery} onSearch={setSearchQuery} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <aside className="hidden md:flex h-full border-r border-white/5 bg-[#1c1b1f] z-30">
          <NavigationRail activeType={activeCategory as any} onTypeChange={(t) => setActiveCategory(t as any)} />
        </aside>

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#0f0e13] relative">
          
          <div className={`px-4 md:px-10 py-8 transition-all duration-500 ${currentTrack ? 'pb-56' : 'pb-32'}`}>
            <header className="mb-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[#d0bcff] font-black uppercase text-[10px] tracking-[0.6em]">
                    <span className="h-[2px] w-8 bg-[#d0bcff]"></span>
                    Archivo de Duki
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none">
                    {activeCategory === 'all' ? 'The Vault' : activeCategory}
                  </h2>
                </div>
                
                <div className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-[24px] border border-white/10 shadow-2xl backdrop-blur-md">
                   <div className="text-right">
                      <span className="text-xl font-black text-[#d0bcff] block leading-none">{filteredItems.length}</span>
                      <span className="text-[8px] font-black opacity-30 uppercase tracking-[0.3em]">Archivos</span>
                   </div>
                </div>
              </div>
            </header>

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 stagger-in">
                {filteredItems.map((item, idx) => (
                  <div key={item.id} style={{ animationDelay: `${idx * 0.01}s` }}>
                    <MediaCard 
                        item={item} 
                        onPlay={handlePlay} 
                        isActive={currentTrack?.id === item.id}
                        currentUrl={currentUrl}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 opacity-10">
                <div className="h-24 w-24 mb-6 border-4 border-white/20 rounded-full border-dashed animate-spin"></div>
                <p className="text-xs font-black uppercase tracking-[1em] text-white">Archivo Vacío</p>
              </div>
            )}

            <footer className="mt-20 pb-10 border-t border-white/5 pt-12 flex flex-col items-center">
              <div className="flex flex-col items-center gap-4 text-white/20">
                <div className="text-center">
                   <span className="text-[9px] font-black uppercase tracking-[0.6em] block mb-1">Duki Archive © 2025</span>
                </div>
              </div>
            </footer>
          </div>
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-[#1c1b1f]/95 backdrop-blur-3xl border-t border-white/5 pb-safe">
          <NavigationRail activeType={activeCategory as any} onTypeChange={(t) => setActiveCategory(t as any)} />
        </nav>
      </div>

      <PersistentPlayer 
        item={currentTrack} 
        activeUrl={currentUrl}
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying}
        onClose={() => { setCurrentTrack(null); setIsPlaying(false); }}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f0e13; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(208,188,255,0.2); }
      `}} />
    </div>
  );
};

export default App;