import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AnimeGrid } from './components/AnimeGrid';
import { WatchScreen } from './components/WatchScreen';
import { searchAnime, getAnimeDetails } from './services/api';

export default function App() {
  const [currentView, setCurrentView] = useState('grid'); // 'grid' | 'watch'
  const [selectedFilter, setSelectedFilter] = useState('Trending');
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Active Watch State
  const [activeAnime, setActiveAnime] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [activeEpisodeId, setActiveEpisodeId] = useState(null);

  // Load Initial Anime List on Mount
  useEffect(() => {
    handleSearch('bleach');
  }, []);

  // Handle Search Input
  const handleSearch = async (query) => {
    setIsLoading(true);
    setCurrentView('grid');
    const results = await searchAnime(query);
    setAnimeList(results);
    setIsLoading(false);
  };

  // Handle Selecting an Anime from the Grid
  const handleSelectAnime = async (anime) => {
    setIsLoading(true);
    const details = await getAnimeDetails(anime.id);
    
    if (details && details.episodes && details.episodes.length > 0) {
      setActiveAnime(details);
      setEpisodes(details.episodes);
      setActiveEpisodeId(details.episodes[0].id);
      setCurrentView('watch');
    } else {
      alert("No episodes found for this anime.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-cyan-50 font-sans selection:bg-cyan-500 selection:text-black">
      <Navbar 
        onSearch={handleSearch} 
        selectedFilter={selectedFilter}
        onSelectFilter={(filter) => {
          setSelectedFilter(filter);
          handleSearch(filter.toLowerCase());
        }}
      />

      <main className="py-4">
        {currentView === 'watch' && activeAnime ? (
          <div>
            <button 
              onClick={() => setCurrentView('grid')}
              className="ml-4 mb-4 px-3 py-1 text-xs font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-950/30 rounded hover:bg-cyan-950 transition flex items-center gap-2"
            >
              ← BACK TO DISCOVERY
            </button>
            <WatchScreen
              animeTitle={activeAnime.title}
              episodeList={episodes}
              currentEpisodeId={activeEpisodeId}
              onEpisodeChange={(epId) => setActiveEpisodeId(epId)}
            />
          </div>
        ) : (
          <AnimeGrid 
            items={animeList} 
            isLoading={isLoading} 
            onSelectAnime={handleSelectAnime} 
          />
        )}
      </main>
    </div>
  );
}
