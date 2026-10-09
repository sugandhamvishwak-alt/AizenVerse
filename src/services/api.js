import React, { useState } from 'react';
import { WatchScreen } from './components/WatchScreen';

export default function App() {
  // Test Episode List Structure
  const sampleEpisodes = [
    { id: 'bleach-episode-1', number: 1 },
    { id: 'bleach-episode-2', number: 2 }
  ];

  const [activeEpisodeId, setActiveEpisodeId] = useState(sampleEpisodes[0].id);

  return (
    <div className="min-h-screen bg-[#05070a] text-white p-6">
      <h1 className="text-xl font-bold text-cyan-400 mb-6 text-center">AizenVerse Streaming Demo</h1>
      
      <WatchScreen
        animeTitle="Bleach"
        episodeList={sampleEpisodes}
        currentEpisodeId={activeEpisodeId}
        onEpisodeChange={(newEpId) => setActiveEpisodeId(newEpId)}
      />
    </div>
  );
}
