import React, { useState, useEffect } from 'react';
import { CyberPlayer } from './CyberPlayer';
import { getStreamUrl } from '../services/api';

export const WatchScreen = ({ animeTitle, episodeList, currentEpisodeId, onEpisodeChange }) => {
  const [streamData, setStreamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [debugLog, setDebugLog] = useState('Initializing...');

  useEffect(() => {
    let isMounted = true;
    const fetchStream = async () => {
      setLoading(true);
      setDebugLog(`Fetching episode ID: ${currentEpisodeId}...`);
      
      try {
        const result = await getStreamUrl(currentEpisodeId);
        if (isMounted) {
          if (result && result.url) {
            setDebugLog(`Success! URL found.`);
            setStreamData(result);
          } else {
            setDebugLog(`API returned null for ID: ${currentEpisodeId}`);
          }
        }
      } catch (err) {
        if (isMounted) {
          setDebugLog(`Error: ${err.message}`);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (currentEpisodeId) {
      fetchStream();
    }

    return () => { isMounted = false; };
  }, [currentEpisodeId]);

  const currentEpIndex = episodeList.findIndex(e => e.id === currentEpisodeId);
  const currentEp = episodeList[currentEpIndex];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      {/* Player or Error/Debug View */}
      {loading ? (
        <div className="w-full aspect-video bg-[#090d16] rounded-xl border border-cyan-500/20 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-mono text-cyan-400 animate-pulse">CONNECTING TO STREAM...</p>
        </div>
      ) : streamData ? (
        <CyberPlayer streamData={streamData} onError={() => setDebugLog("Video.js playback failed to load stream source.")} />
      ) : (
        <div className="w-full aspect-video bg-[#090d16] rounded-xl border border-red-500/30 flex flex-col items-center justify-center p-6 text-center space-y-2">
          <span className="text-3xl">⚠️</span>
          <p className="text-sm font-mono text-red-400">UNABLE TO LOAD VIDEO STREAM</p>
          {/* Debug text printed on screen */}
          <p className="text-xs font-mono text-cyan-300 bg-black/50 p-2 rounded border border-cyan-500/20 max-w-md break-all">
            {debugLog}
          </p>
        </div>
      )}

      {/* Episode Navigation Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#090d16] p-4 rounded-xl border border-cyan-500/20">
        <div>
          <h2 className="text-lg font-bold text-white">{animeTitle}</h2>
          <p className="text-xs font-mono text-cyan-400">
            {currentEp ? `Episode ${currentEp.number}` : 'Episode View'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentEpIndex <= 0}
            onClick={() => onEpisodeChange(episodeList[currentEpIndex - 1].id)}
            className="px-3 py-1.5 text-xs font-mono bg-cyan-950/50 text-cyan-300 border border-cyan-500/30 rounded disabled:opacity-40 hover:bg-cyan-900/50 transition"
          >
            ← PREV EP
          </button>
          <button
            disabled={currentEpIndex >= episodeList.length - 1}
            onClick={() => onEpisodeChange(episodeList[currentEpIndex + 1].id)}
            className="px-3 py-1.5 text-xs font-mono bg-cyan-950/50 text-cyan-300 border border-cyan-500/30 rounded disabled:opacity-40 hover:bg-cyan-900/50 transition"
          >
            NEXT EP →
          </button>
        </div>
      </div>
    </div>
  );
};
