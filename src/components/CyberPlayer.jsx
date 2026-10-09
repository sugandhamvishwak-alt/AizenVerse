import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const CyberPlayer = ({ 
  src = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", // Default test HLS stream
  poster = "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200",
  title = "Bleach: Thousand-Year Blood War - Episode 1",
  onNextEpisode,
  onPrevEpisode
}) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [qualities, setQualities] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState('Auto');
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  // Initialize Video.js Player
  useEffect(() => {
    if (!videoRef.current) return;

    // Player Options
    const videoJsOptions = {
      autoplay: false,
      controls: false, // We use custom cyber overlay controls
      responsive: true,
      fluid: true,
      sources: [{
        src: src,
        type: 'application/x-mpegURL'
      }]
    };

    const player = videojs(videoRef.current, videoJsOptions, () => {
      console.log('Video.js player ready');
    });

    playerRef.current = player;

    // Event Listeners
    player.on('play', () => setIsPlaying(true));
    player.on('pause', () => setIsPlaying(false));
    player.on('timeupdate', () => setCurrentTime(player.currentTime()));
    player.on('loadedmetadata', () => setDuration(player.duration()));
    player.on('waiting', () => setIsBuffering(true));
    player.on('playing', () => setIsBuffering(false));
    player.on('volumechange', () => {
      setVolume(player.volume());
      setIsMuted(player.muted());
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, []);

  // Handle Source Updates (when changing episodes/streams)
  useEffect(() => {
    const player = playerRef.current;
    if (player && src) {
      player.src({ src: src, type: 'application/x-mpegURL' });
      player.load();
    }
  }, [src]);

  // Handle Control Overlay Hiding
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3500);
  };

  // Player Control Functions
  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pause();
    } else {
      playerRef.current.play();
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (playerRef.current) {
      playerRef.current.currentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (playerRef.current) {
      playerRef.current.volume(newVol);
      playerRef.current.muted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      const mutedState = !isMuted;
      playerRef.current.muted(mutedState);
      setIsMuted(mutedState);
    }
  };

  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (playerRef.current.isFullscreen()) {
        playerRef.current.exitFullscreen();
      } else {
        playerRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden bg-[#05070a] border border-cyan-500/30 shadow-[0_0_25px_rgba(34,211,238,0.15)] group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Container */}
      <div data-vjs-player className="relative w-full aspect-video">
        <video ref={videoRef} className="video-js vjs-big-play-centered w-full h-full" poster={poster} />
      </div>

      {/* Buffering Indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#22d3ee]"></div>
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Buffering HLS...</span>
          </div>
        </div>
      )}

      {/* Overlay Controls */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 flex flex-col justify-between p-4 transition-opacity duration-300 z-10 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wide truncate max-w-md">{title}</h3>
          </div>
          <span className="px-2 py-1 text-[10px] font-mono tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 rounded">
            HLS / M3U8
          </span>
        </div>

        {/* Center Play/Pause Touch Trigger */}
        <button 
          onClick={togglePlay}
          className="self-center p-4 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 hover:bg-cyan-500/40 hover:scale-110 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
        >
          {isPlaying ? (
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg className="w-8 h-8 fill-current translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>

        {/* Bottom Controls Bar */}
        <div className="flex flex-col gap-2">
          
          {/* Progress Seek Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-400">{formatTime(currentTime)}</span>
            <input 
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-fuchsia-400 transition-colors"
            />
            <span className="text-xs font-mono text-gray-400">{formatTime(duration)}</span>
          </div>

          {/* Controls Actions */}
          <div className="flex items-center justify-between pt-1">
            
            {/* Left Controls: Play, Prev/Next Episode, Volume */}
            <div className="flex items-center gap-3">
              <button onClick={togglePlay} className="text-gray-300 hover:text-cyan-400 transition">
                {isPlaying ? (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                ) : (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>

              {onPrevEpisode && (
                <button onClick={onPrevEpisode} className="text-gray-400 hover:text-white transition" title="Previous Episode">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                </button>
              )}

              {onNextEpisode && (
                <button onClick={onNextEpisode} className="text-gray-400 hover:text-white transition" title="Next Episode">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                </button>
              )}

              {/* Volume Slider */}
              <div className="flex items-center gap-2 group/vol">
                <button onClick={toggleMute} className="text-gray-400 hover:text-cyan-400 transition">
                  {isMuted || volume === 0 ? (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
                  ) : (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
                  )}
                </button>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.05" 
                  value={isMuted ? 0 : volume} 
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-gray-700 rounded appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>

            {/* Right Controls: Fullscreen */}
            <div className="flex items-center gap-3">
              <button onClick={toggleFullscreen} className="text-gray-400 hover:text-cyan-400 transition">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
