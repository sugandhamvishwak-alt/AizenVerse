import React, { useEffect, useState } from 'react';
import { searchAnime } from './services/api';

export default function Home() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial anime batch on startup
    searchAnime('naruto').then((results) => {
      setAnimeList(results);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
        <p>Loading anime streams...</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-900 min-h-screen text-white">
      <h1 className="text-xl font-bold mb-4">AizenVerse</h1>
      <div className="grid grid-cols-2 gap-4">
        {animeList.map((anime) => (
          <div key={anime.id} className="bg-slate-800 rounded-lg overflow-hidden shadow-md p-2">
            <img 
              src={anime.image} 
              alt={anime.title} 
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="mt-2 text-sm font-semibold truncate">{anime.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
