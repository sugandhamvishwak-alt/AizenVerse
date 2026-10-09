import React, { useState } from 'react';

export default function AizenVerseUI() {
  const [activeTab, setActiveTab] = useState('home');
  const [showEpisodesDrawer, setShowEpisodesDrawer] = useState(false);

  return (
    <div className="min-h-screen bg-black text-[#f3ece0] font-['Work_Sans',sans-serif] pb-24 relative overflow-hidden select-none">
      
      {/* --- HERO / FEATURED BANNER --- */}
      <section className="relative h-[440px] rounded-[28px] border-2 border-[#ff2e93] bg-gradient-to-br from-[#00c2ff] via-[#7b2ff7] to-[#ff2e93] overflow-hidden p-5 flex flex-col justify-end shadow-[0_0_25px_rgba(255,46,147,0.3)]">
        
        {/* Status Indicators */}
        <div className="absolute top-4 right-5 flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <span className="w-5 h-1.5 rounded-full bg-[#e23a2e]" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
        </div>

        {/* Content Details */}
        <div className="space-y-2 z-10">
          <span className="inline-block font-['JetBrains_Mono',monospace] text-xs font-semibold text-[#39ffb0] bg-black/70 border border-[#39ffb0] px-2.5 py-1 rounded-lg tracking-wider">
            STUDIO MAPPA
          </span>

          <h1 className="font-['Anton',sans-serif] text-4xl text-[#fff3a8] tracking-wide leading-none uppercase">
            Witch Hat Atelier
          </h1>

          <div className="font-['JetBrains_Mono',monospace] text-xs text-[#d8d0c4] flex items-center gap-2">
            <span className="text-[#ffd60a]">★ 8.5</span>
            <span>2026</span>
            <span>·</span>
            <span>ONA</span>
          </div>

          {/* Call to Actions */}
          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => setShowEpisodesDrawer(true)}
              className="flex-1 h-12 bg-gradient-to-r from-[#ff3d3d] to-[#ff9f0a] text-white font-['JetBrains_Mono',monospace] text-sm font-bold tracking-widest rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              ▶ WATCH NOW
            </button>
            <button className="flex-1 h-12 border-2 border-[#39ffb0] bg-black/60 text-[#39ffb0] font-['JetBrains_Mono',monospace] text-sm font-bold tracking-widest rounded-lg hover:bg-[#39ffb0]/10 active:scale-95 transition-all">
              + WATCHLIST
            </button>
          </div>
        </div>

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
      </section>

      {/* --- CONTINUE WATCHING SECTION --- */}
      <section className="mt-8 px-1">
        <div className="flex justify-between items-baseline border-b-2 border-[#ff9f0a] pb-2">
          <h2 className="font-['Anton',sans-serif] text-2xl text-[#ffd60a] tracking-wide uppercase">
            CONTINUE WATCHING
          </h2>
          <button className="font-['JetBrains_Mono',monospace] text-xs text-[#ff2e93] tracking-widest hover:underline">
            SEE ALL
          </button>
        </div>

        {/* Episode Card */}
        <div className="mt-4 flex gap-3 p-3 border-2 border-[#ff9f0a] rounded-2xl bg-[#0d0d0d] items-center shadow-[0_0_15px_rgba(255,159,10,0.15)]">
          <div className="w-18 h-24 rounded-xl bg-gradient-to-br from-[#ff3d3d] via-[#7b2ff7] to-[#00c2ff] shrink-0" />
          <div className="flex-1 space-y-1">
            <h3 className="font-['Anton',sans-serif] text-xl text-[#ff9f0a]">Bleach</h3>
            <p className="font-['JetBrains_Mono',monospace] text-xs text-[#00e5ff]">
              E145 · Continue 145/366
            </p>
            {/* Gradient Progress Bar */}
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden mt-2">
              <div className="w-[76%] h-full bg-gradient-to-r from-[#ff3d3d] to-[#ffd60a] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* --- BOTTOM DRAWER: EPISODES OVERLAY --- */}
      {showEpisodesDrawer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col justify-end">
          <div className="bg-[#0a0a0a] border-t-2 border-[#7b2ff7] rounded-t-[28px] p-5 relative animate-in slide-in-from-bottom duration-300">
            {/* Drawer Handle */}
            <div className="w-20 h-1.5 rounded-full bg-[#7b2ff7] mx-auto mb-4" />

            <div className="flex justify-between items-center mb-4">
              <h2 className="font-['Anton',sans-serif] text-2xl text-[#ffd60a] uppercase">Episodes</h2>
              <button 
                onClick={() => setShowEpisodesDrawer(false)}
                className="font-['JetBrains_Mono',monospace] text-sm text-[#ff2e93] font-bold"
              >
                CLOSE [X]
              </button>
            </div>

            {/* Range Pills */}
            <div className="flex gap-2 font-['JetBrains_Mono',monospace] text-xs overflow-x-auto pb-3">
              <span className="px-3 py-2 rounded-lg border border-[#00e5ff] text-[#00e5ff] shrink-0">1-50</span>
              <span className="px-3 py-2 rounded-lg border border-[#39ffb0] text-[#39ffb0] shrink-0">51-100</span>
              <span className="px-3 py-2 rounded-lg bg-gradient-to-r from-[#ff3d3d] to-[#ff9f0a] text-white font-bold shrink-0">101-150</span>
              <span className="px-3 py-2 rounded-lg border border-[#ffd60a] text-[#ffd60a] shrink-0">151-200</span>
            </div>

            {/* Episode Grid */}
            <div className="grid grid-cols-3 gap-2.5 mt-2">
              {[101, 102, 103, 104, 105, 106].map((num, i) => {
                const colors = ['border-[#00e5ff] text-[#00e5ff]', 'border-[#39ffb0] text-[#39ffb0]', 'border-[#ffd60a] text-[#ffd60a]', 'border-[#ff9f0a] text-[#ff9f0a]', 'border-[#ff2e93] text-[#ff2e93]', 'border-[#b388ff] text-[#b388ff]'];
                return (
                  <button 
                    key={num}
                    className={`h-20 rounded-xl border-2 bg-black flex items-center justify-center font-['Anton',sans-serif] text-2xl ${colors[i % colors.length]} hover:scale-105 transition-transform`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* --- FIXED BOTTOM NAVIGATION --- */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-black border-t-2 border-[#7b2ff7] flex justify-around items-center font-['JetBrains_Mono',monospace] text-[10px] tracking-wider z-40">
        {[
          { id: 'home', label: 'HOME', color: 'text-[#ff3d3d]' },
          { id: 'search', label: 'SEARCH', color: 'text-[#39ffb0]' },
          { id: 'mylist', label: 'MY LIST', color: 'text-[#ffd60a]' },
          { id: 'profile', label: 'PROFILE', color: 'text-[#ff2e93]' }
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === item.id ? 'scale-110 font-bold' : 'opacity-60'}`}
          >
            <span className={`text-base ${item.color}`}>●</span>
            <span className={item.color}>{item.label}</span>
          </button>
        ))}
      </nav>

    </div>
  );
}
