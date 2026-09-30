import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const cyberPlayerStyle = `
  .video-js.vjs-cyber .vjs-big-play-button {
    background: transparent !important;
    border: 2px solid #22d3ee !important;
    border-radius: 8px;
    top: 50%; left: 50%; transform: translate(-50%, -50%);
    box-shadow: 0 0 12px #22d3ee;
  }
  .video-js.vjs-cyber .vjs-big-play-button .vjs-icon-placeholder:before {
    color: #22d3ee;
  }
  .video-js.vjs-cyber .vjs-control-bar {
    background: rgba(5, 7, 10, 0.85) !important;
    backdrop-filter: blur(8px);
    border-top: 1px solid rgba(34, 211, 238, 0.3);
  }
  .video-js.vjs-cyber .vjs-play-progress {
    background: linear-gradient(90deg, #22d3ee 0%, #d946ef 100%) !important;
  }
`;

export function CyberPlayer({ streamUrl }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById('cyber-player-css')) {
      const styleTag = document.createElement('style');
      styleTag.id = 'cyber-player-css';
      styleTag.innerHTML = cyberPlayerStyle;
      document.head.appendChild(styleTag);
    }

    if (videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        className: 'vjs-cyber',
        aspectRatio: '16:9',
        sources: [{
          src: streamUrl,
          type: streamUrl.endsWith('.m3u8') ? 'application/x-mpegURL' : 'video/mp4'
        }]
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [streamUrl]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
}
