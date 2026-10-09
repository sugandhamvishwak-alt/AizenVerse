import React, { useState } from 'react';
import { CyberPlayer } from './components/CyberPlayer';

export default function App() {
  // Sample test streams
  const testStreams = [
    {
      title: "Mux Test Stream (HLS)",
      url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
    },
    {
      title: "Big Buck Bunny (HLS)",
      url: "https://multiplatform-f.akamaihd.net/i/multi/will/bbb/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,720p_1500,1080p_2500,.f4v.csmil/master.m3u8"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#05070a] text-white p-6 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold text-cyan-400 tracking-wide">AizenVerse Video Pipeline</h1>
      
      <CyberPlayer 
        src={testStreams[currentIndex].url}
        title={testStreams[currentIndex].title}
        onNextEpisode={() => setCurrentIndex((prev) => (prev + 1) % testStreams.length)}
        onPrevEpisode={() => setCurrentIndex((prev) => (prev - 1 + testStreams.length) % testStreams.length)}
      />
    </div>
  );
}
