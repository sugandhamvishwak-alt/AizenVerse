import React, { useCallback, useEffect, useState } from 'react';
import { AnimeCard } from './AnimeCard';
import { getTrendingAnime, searchAnimeMetadata } from '../services/animeMeta';

export const AnimeGrid = ({ onSelectAnime, query = '' }) => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  const loadAnime = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const results = query.trim()
        ? await searchAnimeMetadata(query)
        : await getTrendingAnime();
      setAnimeList(results);
    } catch (requestError) {
      console.error('Failed to load anime from Jikan:', requestError);
      setAnimeList([]);
      setError(requestError.message || 'Could not load anime right now. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [query, reloadKey]);

  useEffect(() => {
    loadAnime();
  }, [loadAnime]);

  if (loading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-3" role="status" aria-live="polite">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
        <p className="text-xs font-mono text-cyan-300">Loading anime…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto my-10 max-w-xl rounded-xl border border-amber-500/30 bg-amber-950/20 p-5 text-center" role="alert">
        <h3 className="font-semibold text-amber-200">Anime catalog unavailable</h3>
        <p className="mt-2 text-sm text-amber-100/80">{error}</p>
        <button
          type="button"
          onClick={() => setReloadKey((key) => key + 1)}
          className="mt-4 rounded-lg border border-amber-400/40 px-4 py-2 text-sm text-amber-100 hover:bg-amber-900/40"
        >
          Try again
        </button>
      </div>
    );
  }

  if (animeList.length === 0) {
    return <p className="py-16 text-center text-sm text-gray-400">No anime found. Try another title.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {animeList.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} onSelect={onSelectAnime} />
      ))}
    </div>
  );
};
