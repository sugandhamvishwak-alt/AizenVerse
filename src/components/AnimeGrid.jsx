import React from 'react';
import { AnimeCard } from './AnimeCard';

export const AnimeGrid = ({ items, isLoading, onSelectAnime }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 max-w-7xl mx-auto">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-cyan-950/20 rounded-xl border border-cyan-500/10 animate-pulse flex flex-col justify-end p-3">
            <div className="h-3 bg-cyan-950/50 rounded w-3/4 mb-2"></div>
            <div className="h-2 bg-cyan-950/40 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
        <span className="text-4xl mb-2">👾</span>
        <p className="text-sm font-mono text-cyan-600">NO ANIME SIGNAL FOUND</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 max-w-7xl mx-auto">
      {items.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} onSelect={onSelectAnime} />
      ))}
    </div>
  );
};
