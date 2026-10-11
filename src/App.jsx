import React, { useState } from 'react';
import { AnimeGrid } from './components/AnimeGrid';

export default function App() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [selectedAnime, setSelectedAnime] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();
    setSubmittedQuery(query.trim());
    setSelectedAnime(null);
  };

  return (
    <main className="min-h-screen bg-[#05070a] text-white">
      <header className="sticky top-0 z-30 border-b border-cyan-500/20 bg-[#05070a]/95 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-mono text-2xl font-bold tracking-wider text-cyan-400">
              AIZEN<span className="text-white">VERSE</span>
            </h1>
            <p className="mt-1 text-xs text-gray-400">Discover anime</p>
          </div>
          <form onSubmit={handleSearch} className="flex w-full gap-2 sm:max-w-md">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search anime titles..."
              aria-label="Search anime titles"
              className="min-w-0 flex-1 rounded-lg border border-cyan-500/30 bg-[#090d16] px-3 py-2 text-sm text-cyan-100 placeholder-cyan-700/70 outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="rounded-lg border border-cyan-400/50 bg-cyan-950/60 px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-900/60"
            >
              Search
            </button>
          </form>
        </div>
      </header>

      <section className="mx-auto max-w-7xl p-4 sm:p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            {submittedQuery ? `Results for “${submittedQuery}”` : 'Top anime'}
          </h2>
          <p className="mt-1 text-xs text-gray-500">Catalog and poster data provided by Jikan / MyAnimeList.</p>
        </div>

        <AnimeGrid query={submittedQuery} onSelectAnime={setSelectedAnime} />

        {selectedAnime && (
          <aside className="mt-6 rounded-xl border border-cyan-500/25 bg-[#090d16] p-5" aria-live="polite">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-cyan-200">{selectedAnime.title}</h3>
                <p className="mt-1 text-xs text-gray-400">
                  Score: {selectedAnime.score ?? 'N/A'} · Episodes: {selectedAnime.episodes ?? 'Unknown'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAnime(null)}
                className="rounded border border-gray-700 px-3 py-1 text-xs text-gray-300 hover:border-cyan-400"
              >
                Close
              </button>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-300">
              {selectedAnime.synopsis || 'No synopsis is available for this title.'}
            </p>
          </aside>
        )}
      </section>
    </main>
  );
}
