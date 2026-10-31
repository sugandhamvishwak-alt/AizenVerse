import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ALL_PROVIDERS } from '../services/providers';

export function WatchScreen() {
  const { episodeId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [streamUrl, setStreamUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  // Audio / Subtitle / Quality State
  const [category, setCategory] = useState('sub'); // 'sub' | 'dub'
  const [audioLang, setAudioLang] = useState('Japanese');
  const [subLang, setSubLang] = useState('English');
  const [quality, setQuality] = useState('1080p');
  const [speed, setSpeed] = useState(1);

  // Simulated available options from provider
  const audioLanguages = category === 'dub' ? ['English', 'Hindi', 'Tamil', 'Telugu'] : ['Japanese'];
  const subtitleLanguages = ['Off', 'English', 'Hindi', 'Spanish', 'French'];
  const qualities = ['360p', '480p', '720p', '1080p', 'Auto'];
  const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  useEffect(() => {
    async function loadStream() {
      try {
        setLoading(true);
        const activeProvider = ALL_PROVIDERS[0];
        const url = await activeProvider.getStreamUrl(decodeURIComponent(episodeId));
        setStreamUrl(url || '');
      } catch (err) {
        console.error('Failed to resolve stream link:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStream();
  }, [episodeId, category, audioLang, quality]);

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
  };

  const handleSkip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  return (
    <div style={{ padding: '16px', color: '#fff', maxWidth: '900px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: 'none', border: 'none', color: '#c084fc', cursor: 'pointer', marginBottom: '12px', fontSize: '16px' }}
      >
        ← Back to Details
      </button>

      {/* Main Video Container */}
      <div style={{ position: 'relative', width: '100%', background: '#000', borderRadius: '12px', overflow: 'hidden' }}>
        
        {/* Lock Overlay Button */}
        <button
          onClick={() => setIsLocked(!isLocked)}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 10,
            padding: '8px 12px',
            borderRadius: '6px',
            background: isLocked ? '#ef4444' : 'rgba(0, 0, 0, 0.6)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isLocked ? '🔒 Locked' : '🔓 Lock Screen'}
        </button>

        {loading ? (
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Fetching video stream...
          </div>
        ) : (
          <div style={{ position: 'relative', pointerEvents: isLocked ? 'none' : 'auto' }}>
            <video
              ref={videoRef}
              src={streamUrl}
              controls={!isLocked}
              autoPlay
              style={{ width: '100%', height: 'auto', maxHeight: '500px', display: 'block' }}
            />
          </div>
        )}
      </div>

      {/* Video Player Controls & Settings */}
      {!isLocked && (
        <div style={{ marginTop: '20px', background: '#110a1f', padding: '16px', borderRadius: '12px', border: '1px solid #1e1b4b' }}>
          
          {/* Quick Skip Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <button onClick={() => handleSkip(-10)} style={btnStyle}>⏪ -10s</button>
            <button onClick={() => handleSkip(10)} style={btnStyle}>⏩ +10s</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            
            {/* Sub/Dub & Audio Selector */}
            <div>
              <label style={labelStyle}>Audio Type</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <button 
                  onClick={() => { setCategory('sub'); setAudioLang('Japanese'); }}
                  style={{ ...btnStyle, background: category === 'sub' ? '#c084fc' : '#1e1b4b', color: category === 'sub' ? '#000' : '#fff' }}
                >
                  SUB
                </button>
                <button 
                  onClick={() => { setCategory('dub'); setAudioLang('English'); }}
                  style={{ ...btnStyle, background: category === 'dub' ? '#c084fc' : '#1e1b4b', color: category === 'dub' ? '#000' : '#fff' }}
                >
                  DUB
                </button>
              </div>

              {category === 'dub' && (
                <select value={audioLang} onChange={(e) => setAudioLang(e.target.value)} style={selectStyle}>
                  {audioLanguages.map((lang) => (
                    <option key={lang} value={lang}>{lang} Audio</option>
                  ))}
                </select>
              )}
            </div>

            {/* Subtitles Selector */}
            <div>
              <label style={labelStyle}>Subtitles</label>
              <select value={subLang} onChange={(e) => setSubLang(e.target.value)} style={selectStyle}>
                {subtitleLanguages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {/* Video Quality */}
            <div>
              <label style={labelStyle}>Quality</label>
              <select value={quality} onChange={(e) => setQuality(e.target.value)} style={selectStyle}>
                {qualities.map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>

            {/* Playback Speed */}
            <div>
              <label style={labelStyle}>Speed ({speed}x)</label>
              <select value={speed} onChange={(e) => handleSpeedChange(Number(e.target.value))} style={selectStyle}>
                {speeds.map((s) => (
                  <option key={s} value={s}>{s}x</option>
                ))}
              </select>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  flex: 1,
  padding: '8px 12px',
  borderRadius: '6px',
  background: '#1e1b4b',
  border: '1px solid #334155',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  color: '#94a3b8',
  marginBottom: '6px',
  fontWeight: '600'
};

const selectStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '6px',
  background: '#07040d',
  border: '1px solid #334155',
  color: '#fff',
  outline: 'none'
};

export default WatchScreen;
