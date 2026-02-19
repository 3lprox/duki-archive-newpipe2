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

  const filteredItems = useMemo(() => {
    if (activeCategory === 'legal') return [];
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
          <NavigationRail activeType={activeCategory} onTypeChange={setActiveCategory} />
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
                    {activeCategory === 'all' ? 'The Vault' : activeCategory === 'legal' ? 'Cosas Aburridas' : (activeCategory === MediaCategory.FREE ? 'Free / Release' : activeCategory)}
                  </h2>
                </div>
                
                {activeCategory !== 'legal' && (
                  <div className="inline-flex items-center gap-4 bg-white/5 px-6 py-4 rounded-[28px] border border-white/10 shadow-2xl">
                     <div className="text-right">
                        <span className="text-2xl font-black text-[#d0bcff] block leading-none">{filteredItems.length}</span>
                        <span className="text-[8px] font-black opacity-30 uppercase tracking-[0.4em]">Archivos</span>
                     </div>
                  </div>
                )}
              </div>
            </header>

            {activeCategory === 'legal' ? (
              <div className="max-w-3xl mx-auto space-y-12 animate-in slide-in-from-bottom-8 duration-700 pb-20">
                <div className="p-8 md:p-12 rounded-[40px] bg-[#1c1b1f] border border-white/5 shadow-2xl space-y-10">
                  <section className="space-y-4">
                    <h3 className="text-[#d0bcff] font-black uppercase text-xs tracking-[0.3em]">Misión del Proyecto</h3>
                    <p className="text-lg text-white/70 leading-relaxed font-medium">
                      Este sitio web es un proyecto sin fines de lucro creado por y para fans con el único objetivo de preservar el legado musical y la evolución artística de Mauro Ezequiel Lombardo (Duki).
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-[#d0bcff] font-black uppercase text-xs tracking-[0.3em]">Derechos de Autor</h3>
                    <p className="text-white/60 leading-relaxed">
                      Todo el material audiovisual y fonográfico pertenece a sus respectivos autores, productores y sellos discográficos (SSJ Records / Dale Play Records). No reclamamos propiedad sobre ninguno de los archivos aquí alojados.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-[#d0bcff] font-black uppercase text-xs tracking-[0.3em]">Uso No Comercial</h3>
                    <p className="text-white/60 leading-relaxed">
                      Este sitio no genera ingresos, no contiene publicidad invasiva y no vende acceso al contenido.
                    </p>
                  </section>

                  <section className="space-y-4 p-6 rounded-3xl bg-red-500/5 border border-red-500/10">
                    <h3 className="text-red-400 font-black uppercase text-xs tracking-[0.3em]">Peticiones de Retiro</h3>
                    <p className="text-white/60 leading-relaxed">
                      Respetamos la voluntad del artista y su equipo legal. Si eres el titular de los derechos y deseas que algún archivo sea eliminado, por favor contáctanos a <a href="mailto:duki-archive-newpipe@protonmail.com" className="text-red-400 hover:underline">duki-archive-newpipe@protonmail.com</a> y procederemos a la baja inmediata de los enlaces.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-[#d0bcff] font-black uppercase text-xs tracking-[0.3em]">Apoyamos al artista</h3>
                    <p className="text-white/60 leading-relaxed italic">
                      Si te gusta la música, escúchala en plataformas oficiales y compra entradas para sus shows.
                    </p>
                  </section>
                </div>
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 stagger-in">
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
                <p className="text-xs font-black uppercase tracking-[1em] text-white">Vacio</p>
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