import React, { useState } from 'react';

export const Navbar = ({ onSearch, selectedFilter, onSelectFilter }) => {
  const [query, setQuery] = useState('');

  const filters = ['Trending', 'Popular', 'Recent', 'Movies'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#05070a]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo / Header */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse"></span>
          <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500 font-mono">
            AIZEN<span className="text-white">VERSE</span>
          </h1>
        </div>

        {/* Neon Search Input */}
        <form onSubmit={handleSubmit} className="w-full md:w-96 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anime, movies, OVAs..."
            className="w-full bg-[#090d16] text-sm text-cyan-100 placeholder-cyan-700/60 pl-10 pr-4 py-2 rounded-xl border border-cyan-500/30 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all"
          />
          <svg 
            className="w-4 h-4 text-cyan-500 absolute left-3.5 top-1/2 -translate-y-1/2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </form>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onSelectFilter(filter)}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-all border whitespace-nowrap ${
                selectedFilter === filter
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                  : 'bg-gray-900/50 text-gray-400 border-gray-800 hover:text-cyan-300 hover:border-cyan-500/40'
              }`}
            >
              #{filter}
            </button>
          ))}
        </div>

      </div>
    </header>
  );
};
