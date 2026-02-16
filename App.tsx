import React, { useState, useMemo } from 'react';
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
    <div className="h-full flex flex-col bg-[#0f0e13] overflow-hidden">
      <TopBar searchQuery={searchQuery} onSearch={setSearchQuery} />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Navigation - Sidebar on desktop */}
        <aside className="hidden md:flex h-full border-r border-white/5 bg-[#0f0e13] z-30">
          <NavigationRail activeType={activeCategory as any} onTypeChange={(t) => setActiveCategory(t as any)} />
        </aside>

        {/* Main Content Area - This handles its own scroll */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#0f0e13] relative">
          
          <div className={`px-4 md:px-10 py-8 transition-all duration-500 ${currentTrack ? 'pb-44' : 'pb-32'}`}>
            <header className="mb-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[#d0bcff] font-black uppercase text-[10px] tracking-[0.6em]">
                    <span className="h-[2px] w-8 bg-[#d0bcff]"></span>
                    Ameri Archive Monitor V4.4
                  </div>
                  <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none">
                    {activeCategory === 'all' ? 'The Vault' : activeCategory}
                  </h2>
                </div>
                
                <div className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-[24px] border border-white/10 shadow-2xl backdrop-blur-md">
                   <div className="text-right">
                      <span className="text-xl font-black text-[#d0bcff] block leading-none">{filteredItems.length}</span>
                      <span className="text-[8px] font-black opacity-30 uppercase tracking-[0.3em]">Entries</span>
                   </div>
                   <div className="h-8 w-[1px] bg-white/10"></div>
                   <div className="text-right">
                      <span className="text-[8px] font-black text-green-400 uppercase tracking-[0.2em] block">Online</span>
                      <span className="text-[8px] font-black opacity-30 uppercase tracking-[0.3em]">Status</span>
                   </div>
                </div>
              </div>
            </header>

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 stagger-in">
                {filteredItems.map((item, idx) => (
                  <div key={item.id} style={{ animationDelay: `${idx * 0.02}s` }}>
                    <MediaCard 
                        item={item} 
                        onPlay={handlePlay} 
                        isActive={currentTrack?.id === item.id && isPlaying}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 opacity-10">
                <div className="h-24 w-24 mb-6 border-4 border-white/20 rounded-full border-dashed animate-spin"></div>
                <p className="text-xs font-black uppercase tracking-[1em] text-white">Empty Archive</p>
              </div>
            )}
          </div>
        </main>

        {/* Mobile Navigation - Bottom Bar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-[#0f0e13]/95 backdrop-blur-3xl border-t border-white/5 pb-safe">
          <NavigationRail activeType={activeCategory as any} onTypeChange={(t) => setActiveCategory(t as any)} />
        </nav>
      </div>

      <PersistentPlayer 
        item={currentTrack} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying}
        onClose={() => { setCurrentTrack(null); setIsPlaying(false); }}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f0e13; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(208,188,255,0.2); }
      `}} />
    </div>
  );
};

export default App;