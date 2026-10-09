import React, { useState, useEffect } from 'react';
import { CyberPlayer } from './CyberPlayer';
import { getEpisodeSources } from '../services/api';

export const WatchScreen = ({ animeTitle, episodeList, currentEpisodeId, onEpisodeChange }) => {
  const [streamUrl, setStreamUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentEpIndex, setCurrentEpIndex] = useState(0);

  // Fetch episode stream source whenever currentEpisodeId changes
  useEffect(() => {
    if (!currentEpisodeId) return;

    const fetchStream = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const data = await getEpisodeSources(currentEpisodeId);

        if (data && data.sources && data.sources.length > 0) {
          // Find 1080p, 720p, or default source
          const bestSource = 
            data.sources.find(s => s.quality === '1080p') ||
            data.sources.find(s => s.quality === '720p') ||
            data.sources.find(s => s.quality === 'default') ||
            data.sources[0];

          setStreamUrl(bestSource.url);
        } else {
          setErrorMessage('No valid stream found for this episode.');
        }
      } catch (err) {
        console.error('Failed to load stream:', err);
        setErrorMessage('Failed to connect to video server.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStream();
  }, [currentEpisodeId]);

  // Handle Episode Controls (Prev/Next)
  const handleNext = () => {
    if (episodeList && currentEpIndex < episodeList.length - 1) {
      const nextIndex = currentEpIndex + 1;
      setCurrentEpIndex(nextIndex);
      if (onEpisodeChange) onEpisodeChange(episodeList[nextIndex].id);
    }
  };

  const handlePrev = () => {
    if (episodeList && currentEpIndex > 0) {
      const prevIndex = currentEpIndex - 1;
      setCurrentEpIndex(prevIndex);
      if (onEpisodeChange) onEpisodeChange(episodeList[prevIndex].id);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-4">
      {/* Loading Overlay */}
      {isLoading ? (
        <div className="w-full aspect-video bg-[#05070a] rounded-2xl border border-cyan-500/30 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-mono text-cyan-400">Fetching Stream URL...</span>
        </div>
      ) : errorMessage ? (
        /* Error Box */
        <div className="w-full aspect-video bg-[#05070a] rounded-2xl border border-rose-500/30 flex flex-col items-center justify-center gap-2 p-6 text-center">
          <p className="text-rose-400 text-sm font-semibold">{errorMessage}</p>
          <button 
            onClick={() => onEpisodeChange(currentEpisodeId)}
            className="mt-2 px-4 py-1.5 bg-rose-950 text-rose-300 border border-rose-500/40 rounded text-xs hover:bg-rose-900 transition"
          >
            Retry Stream
          </button>
        </div>
      ) : (
        /* Connected CyberPlayer */
        <CyberPlayer
          src={streamUrl}
          title={`${animeTitle} - Episode ${currentEpIndex + 1}`}
          onNextEpisode={episodeList && currentEpIndex < episodeList.length - 1 ? handleNext : null}
          onPrevEpisode={episodeList && currentEpIndex > 0 ? handlePrev : null}
        />
      )}
    </div>
  );
};
