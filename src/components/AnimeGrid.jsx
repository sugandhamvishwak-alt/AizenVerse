import React, { useEffect, useState } from 'react';
import { getTrendingAnime } from '../services/animeMeta';

export const AnimeGrid = ({ onSelectAnime }) => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingAnime().then(data => {
      setAnimeList(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {animeList.map(anime => (
        <div 
          key={anime.id}
          onClick={() => onSelectAnime(anime)}
          className="bg-[#090d16] rounded-xl overflow-hidden border border-cyan-500/20 group cursor-pointer hover:border-cyan-400 transition-all shadow-lg"
        >
          {/* High-res Poster Image */}
          <div className="aspect-[3/4] w-full overflow-hidden relative">
            <img 
              src={anime.image} 
              alt={anime.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
              ★ {anime.score || 'N/A'}
            </div>
          </div>

          {/* Title & Info */}
          <div className="p-3 space-y-1">
            <h3 className="text-sm font-bold text-white truncate">{anime.title}</h3>
            <p className="text-[10px] font-mono text-cyan-400 truncate">
              {anime.genres.slice(0, 2).join(' • ')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
