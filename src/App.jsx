import React, { useState } from 'react';

const FEATURED_ANIME = {
  title: "CYBERPUNK: EDGERUNNERS",
  tag: "NEON / ACTION",
  rating: "9.5",
  episodes: "10 EPS",
  desc: "A street kid trying to survive in a technology and body modification-obsessed city of the future.",
  banner: "https://images.alphacoders.com/128/1281861.jpg"
};

const ANIME_FEED = [
  { id: '1', title: 'BLEACH: TYBW', initial: 'B', ep: 'EP 26', rating: '9.1', image: 'https://cdn.myanimelist.net/images/anime/1764/126627.jpg', color: 'border-cyan-400 text-cyan-400' },
  { id: '2', title: 'JUJUTSU KAISEN', initial: 'J', ep: 'EP 18', rating: '8.8', image: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg', color: 'border-fuchsia-400 text-fuchsia-400' },
  { id: '3', title: 'SOLO LEVELING', initial: 'S', ep: 'EP 12', rating: '8.5', image: 'https://cdn.myanimelist.net/images/anime/1258/135930.jpg', color: 'border-yellow-400 text-yellow-400' },
  { id: '4', title: 'CHAINSAW MAN', initial: 'C', ep: 'EP 12', rating: '8.7', image: 'https://cdn.myanimelist.net/images/anime/1806/126216.jpg', color: 'border-rose-500 text-rose-500' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-100 font-mono pb-24 relative overflow-hidden select-none">
      
      {/* Background Cyberpunk Grid & Neon Atmospheric Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[320px] bg-[linear-gradient(to_bottom,rgba(6,182,212,0.15)_0%,rgba(217,70,239,0.1)_50%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />

      {/* Hero Intro Header (Direct Layout Adaptation from Reference) */}
      <header className="pt-8 pb-6 px-4 flex flex-col items-center justify-center border-b border-cyan-500/20 bg-[#05070a]/80 backdrop-blur-md relative z-10">
        
        {/* Inverted Triangle Logo with Glowing Cyan / Fuchsia Borders */}
        <div className="relative mb-4 group">
          <div className="w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-t-[54px] border-t-white drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
          <div className="absolute -top-[58px] -left-[36px] w-0 h-0 border-l-[36px] border-l-transparent border-r-[36px] border-r-transparent border-t-[60px] border-t-cyan-400 opacity-40 blur-sm pointer-events-none" />
        </div>

        {/* Clean High-Contrast Branding */}
        <h1 className="text-3xl font-black tracking-widest text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          AIZENVERSE
        </h1>
        
        {/* Subtitle Lines matching reference */}
        <p className="text-sm tracking-wider text-cyan-400 mt-1 font-sans font-bold">
          デスクトップ
        </p>
        <p className="text-[10px] tracking-widest text-slate-400 uppercase mt-0.5">
          DESKTOP WALLPAPER / RES: 1920X1080
        </p>
      </header>

      <main className="px-4 mt-6 relative z-10 space-y-6">

        {/* Featured Hero Banner */}
        <section className="relative w-full h-[220px] rounded-xl overflow-hidden border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <img 
            src={FEATURED_ANIME.banner} 
            alt={FEATURED_ANIME.title}
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-[#05070a]/40 to-transparent" />

          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
            <div>
              <span className="text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-400 px-2 py-0.5 rounded uppercase">
                {FEATURED_ANIME.tag}
              </span>
              <h2 className="text-base font-bold text-white mt-1 uppercase tracking-tight">
                {FEATURED_ANIME.title}
              </h2>
            </div>
            <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              ▶ WATCH
            </button>
          </div>
        </section>

        {/* Cyber Feed Header */}
        <section className="space-y-3">
          <div className="flex justify-between items-center px-1 border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
              // MEDIA_INDEX
            </h3>
            <span className="text-[10px] text-fuchsia-400">SORT: RECENT</span>
          </div>

          {/* 2-Column Cyber Grid */}
          <div className="grid grid-cols-2 gap-3">
            {ANIME_FEED.map((anime) => (
              <div 
                key={anime.id}
                className="relative bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-lg p-2 hover:border-cyan-400 transition-all group"
              >
                <div className="relative aspect-[3/4] rounded overflow-hidden bg-slate-950 mb-2">
                  <img 
                    src={anime.image} 
                    alt={anime.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {/* Minimalist Border Letter Badge */}
                  <div className={`absolute top-1.5 left-1.5 w-5 h-5 bg-black/80 border ${anime.color} text-[10px] font-bold flex items-center justify-center rounded`}>
                    {anime.initial}
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-200 truncate">{anime.title}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{anime.ep}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Cyberpunk Navigation Bar (HOME, SEARCH, MY LIST, PROFILE) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#05070a]/90 backdrop-blur-xl border-t border-cyan-500/30 px-4 py-2.5 flex justify-around items-center">
        {[
          { id: 'home', label: 'HOME', icon: '🏠' },
          { id: 'search', label: 'SEARCH', icon: '🔍' },
          { id: 'mylist', label: 'MY LIST', icon: '📋' },
          { id: 'profile', label: 'PROFILE', icon: '👤' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 transition-all ${
                isActive ? 'text-cyan-400 scale-105' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span className={`text-[9px] tracking-widest ${isActive ? 'font-bold text-cyan-300 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]' : 'font-normal'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}
