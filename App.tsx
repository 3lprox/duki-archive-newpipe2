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
  const [activeCategory, setActiveCategory] = useState<MediaCategory | MediaType | 'all' | 'legal'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrack, setCurrentTrack] = useState<MediaItem | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [brokenItemIds, setBrokenItemIds] = useState<Set<string>>(new Set());
  
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
      setIsExpanded(true); 
    }
  };

  const handlePlaybackError = (id: string) => {
    setBrokenItemIds(prev => new Set(prev).add(id));
    if (currentTrack?.id === id) {
      setCurrentTrack(null);
      setIsPlaying(false);
      setIsExpanded(false);
    }
  };

  const filteredItems = useMemo(() => {
    if (activeCategory === 'legal') return [];
    return ARCHIVE_ITEMS.filter((item) => {
      if (brokenItemIds.has(item.id)) return false;
      
      const itemCategories = Array.isArray(item.category) ? item.category : [item.category];
      const matchesCategory = activeCategory === 'all' || 
        itemCategories.includes(activeCategory as MediaCategory) || 
        ((item.type as string) === (activeCategory as string));
      
      const q = searchQuery.toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(q) || item.format.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, brokenItemIds]);

  if (!hasEntered) {
    return <LandingGate onEnter={handleInitialEnter} />;
  }

  return (
    <div className="h-full flex flex-col bg-[#0f0e13] overflow-hidden animate-in fade-in duration-1000">
      <TopBar searchQuery={searchQuery} onSearch={setSearchQuery} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <aside className="hidden md:flex h-full border-r border-white/5 bg-[#1c1b1f] z-30">
          <NavigationRail activeType={activeCategory} onTypeChange={setActiveCategory} />
        </aside>

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#0f0e13] relative">
          
          <div className={`px-4 md:px-10 py-8 transition-all duration-500 ${currentTrack ? 'pb-56' : 'pb-32'}`}>
            <header className="mb-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[#d0bcff] font-black uppercase text-[10px] tracking-[0.6em]">
                    <span className="h-[2px] w-8 bg-[#d0bcff]"></span>
                    Ameri Archive Global
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none">
                    {activeCategory === 'all' ? 'The Vault' : 
                     activeCategory === MediaCategory.PLAYLIST ? 'Playlists' :
                     activeCategory === MediaCategory.LEAKED ? 'Filtradas' :
                     activeCategory === 'legal' ? 'Información' : activeCategory}
                  </h2>
                </div>
                
                {activeCategory !== 'legal' && (
                  <div className="inline-flex items-center gap-6 bg-white/5 px-8 py-5 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl">
                     <div className="text-right">
                        <span className="text-3xl font-black text-[#d0bcff] block leading-none">{filteredItems.length}</span>
                        <span className="text-[9px] font-black opacity-30 uppercase tracking-[0.4em]">Archivos Totales</span>
                     </div>
                  </div>
                )}
              </div>
            </header>

            {activeCategory === 'legal' ? (
              <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-8 duration-700 pb-20">
                <div className="p-8 md:p-12 rounded-[40px] bg-[#1c1b1f] border border-white/5 shadow-2xl space-y-10">
                  
                  <section className="space-y-6">
                    <h3 className="text-[#d0bcff] font-black uppercase text-xs tracking-[0.3em]">Descarga de Responsabilidad</h3>
                    <div className="space-y-4 text-white/70 leading-relaxed font-medium">
                      <p>
                        Este sitio web es un proyecto recreativo sin fines de lucro, desarrollado por fans para la preservación de la obra de Mauro Ezequiel Lombardo (Duki). 
                      </p>
                      <p>
                        No alojamos archivos físicos en servidores propios; el contenido se sirve a través de enlaces externos recopilados de la comunidad (Catbox, Discord, etc.). No reclamamos propiedad sobre el material auditivo o visual.
                      </p>
                      <p className="p-4 bg-white/5 border-l-4 border-[#d0bcff] rounded-r-xl">
                        Si eres el titular de los derechos y deseas que algún archivo sea retirado de esta base de datos, por favor contáctanos vía email para proceder a su eliminación inmediata de la interfaz.
                      </p>
                    </div>
                  </section>

                  <section className="space-y-6">
                    <h3 className="text-[#d0bcff] font-black uppercase text-xs tracking-[0.3em]">Contacto Directo</h3>
                    <div className="flex flex-col gap-4">
                       <a 
                        href="mailto:duki-archive-newpipe@protonmail.com" 
                        className="group flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-[#d0bcff]/10 hover:border-[#d0bcff]/30 transition-all active:scale-95"
                       >
                          <div className="h-12 w-12 rounded-full bg-[#d0bcff] text-[#381e72] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                             <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[10px] font-black uppercase text-[#d0bcff] tracking-widest">Email Principal</span>
                             <span className="text-lg font-black text-white">duki-archive-newpipe@protonmail.com</span>
                          </div>
                       </a>
                    </div>
                  </section>

                  <section className="space-y-4 p-6 rounded-3xl bg-red-500/5 border border-red-500/10">
                    <h3 className="text-red-400 font-black uppercase text-xs tracking-[0.3em]">Monitor de Enlaces (Automático)</h3>
                    <p className="text-white/60 leading-relaxed text-sm">
                      El sistema Ameri-Scan vigila activamente los 239 archivos. Si un servidor gratuito (Discord/Catbox) devuelve error 404 o link caducado, el ítem se purga automáticamente de tu vista para garantizar la calidad del archivo.
                    </p>
                    <div className="flex gap-4 mt-2">
                       <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-[10px] font-bold">FALLOS: {brokenItemIds.size}</span>
                       <span className="px-3 py-1 bg-[#d0bcff]/10 text-[#d0bcff] rounded-full text-[10px] font-bold">TOTAL: {ARCHIVE_ITEMS.length}</span>
                    </div>
                  </section>

                </div>
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 stagger-in">
                {filteredItems.map((item, idx) => (
                  <div key={item.id} style={{ animationDelay: `${idx * 0.001}s` }}>
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
                <p className="text-xs font-black uppercase tracking-[1em] text-white">Sincronizando 239 archivos...</p>
              </div>
            )}
          </div>
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-[#1c1b1f]/95 backdrop-blur-3xl border-t border-white/5 pb-safe">
          <NavigationRail activeType={activeCategory} onTypeChange={setActiveCategory} />
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
        onPlaybackError={handlePlaybackError}
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