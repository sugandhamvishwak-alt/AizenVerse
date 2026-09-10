import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer({ streamUrl, loading }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!streamUrl || !videoRef.current) return;

    const video = videoRef.current;
    let hls;

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [streamUrl]);

  return (
    <div className="video-frame">
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <p>Extracting ad-free HLS stream...</p>
        </div>
      ) : streamUrl ? (
        <video 
          ref={videoRef} 
          controls 
          autoPlay 
          playsInline
          controlsList="nodownload"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      ) : (
        <p>Unable to load video stream.</p>
      )}
    </div>
  );
}
