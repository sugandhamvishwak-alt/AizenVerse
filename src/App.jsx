import React, { useState } from 'react';
import { ExtensionManagerScreen } from './components/ExtensionManagerScreen';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');

  return (
    <main className="min-h-screen bg-[#05070a] text-white flex flex-col">
      <header className="sticky top-0 z-30 border-b border-cyan-500/20 bg-[#05070a]/95 px-4 py-3 backdrop-blur flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-mono text-xl font-bold tracking-wider text-cyan-400 cursor-pointer" onClick={() => setCurrentTab('home')}>
            AIZEN<span className="text-white">VERSE</span>
          </h1>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 rounded">
            SHELL v1.0
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-3 py-1.5 text-xs font-mono rounded border transition ${
              currentTab === 'home'
                ? 'bg-cyan-950 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                : 'bg-transparent border-cyan-500/20 text-gray-400 hover:text-white'
            }`}
          >
            HOME
          </button>
          <button
            onClick={() => setCurrentTab('extensions')}
            className={`px-3 py-1.5 text-xs font-mono rounded border transition ${
              currentTab === 'extensions'
                ? 'bg-cyan-950 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                : 'bg-transparent border-cyan-500/20 text-gray-400 hover:text-white'
            }`}
          >
            EXTENSIONS
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center">
        {currentTab === 'extensions' && <ExtensionManagerScreen />}

        {currentTab === 'home' && (
          <div className="max-w-4xl mx-auto p-6 text-center space-y-6">
            <div className="bg-[#090d16] border border-cyan-500/20 rounded-2xl p-8 space-y-4 shadow-xl">
              <div className="w-16 h-16 bg-cyan-950/50 border border-cyan-500/40 rounded-full flex items-center justify-center mx-auto text-cyan-400 text-2xl font-mono">
                ⚡
              </div>
              <h2 className="text-lg font-bold text-white">No Extension Repositories Linked</h2>
              <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                AizenVerse is operating as a clean extension shell. Head over to the Extensions tab and link a Cloudstream-compatible repository to begin.
              </p>
              <button
                onClick={() => setCurrentTab('extensions')}
                className="px-6 py-2.5 bg-cyan-950/60 border border-cyan-400/50 text-cyan-200 text-xs font-mono rounded-xl hover:bg-cyan-900/60 transition shadow-[0_0_15px_rgba(34,211,238,0.15)]"
              >
                + ADD REPOSITORY
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
