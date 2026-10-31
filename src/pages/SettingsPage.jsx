import React, { useState } from 'react';

export function SettingsPage() {
  const [profile, setProfile] = useState({ name: '', bio: '' });
  const [player, setPlayer] = useState({
    autoPlayNext: true,
    longPressSpeed: true,
    autoRotate: true,
    swipeToSeek: true,
    skipFillers: false,
  });
  const [subtitles, setSubtitles] = useState({ size: 16, color: '#FFFFFF' });

  return (
    <div style={{ padding: '16px', color: '#fff' }}>
      <h2 className="title">Settings</h2>

      {/* Profile Section */}
      <div className="card" style={{ marginBottom: '16px', padding: '16px', background: '#110a1f', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '10px' }}>Profile</h3>
        <input 
          className="search" 
          placeholder="User Name" 
          value={profile.name} 
          onChange={(e) => setProfile({ ...profile, name: e.target.value })} 
          style={{ width: '100%', padding: '10px', marginBottom: '10px', background: '#07040d', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }}
        />
        <input 
          className="search" 
          placeholder="Bio (Optional)" 
          value={profile.bio} 
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })} 
          style={{ width: '100%', padding: '10px', background: '#07040d', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }}
        />
      </div>

      {/* Player & Gestures Section */}
      <div className="card" style={{ marginBottom: '16px', padding: '16px', background: '#110a1f', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '10px' }}>Player & Gestures</h3>
        <label className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', cursor: 'pointer' }}>
          <span>Auto Play Next Episode</span>
          <input type="checkbox" checked={player.autoPlayNext} onChange={(e) => setPlayer({ ...player, autoPlayNext: e.target.checked })} />
        </label>
        <label className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', cursor: 'pointer' }}>
          <span>Long Press Speed Toggle</span>
          <input type="checkbox" checked={player.longPressSpeed} onChange={(e) => setPlayer({ ...player, longPressSpeed: e.target.checked })} />
        </label>
        <label className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', cursor: 'pointer' }}>
          <span>Auto Rotate</span>
          <input type="checkbox" checked={player.autoRotate} onChange={(e) => setPlayer({ ...player, autoRotate: e.target.checked })} />
        </label>
        <label className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', cursor: 'pointer' }}>
          <span>Swipe to Seek</span>
          <input type="checkbox" checked={player.swipeToSeek} onChange={(e) => setPlayer({ ...player, swipeToSeek: e.target.checked })} />
        </label>
        <label className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', cursor: 'pointer' }}>
          <span>Skip Filler Episodes</span>
          <input type="checkbox" checked={player.skipFillers} onChange={(e) => setPlayer({ ...player, skipFillers: e.target.checked })} />
        </label>
      </div>

      {/* Subtitle Settings Section */}
      <div className="card" style={{ padding: '16px', background: '#110a1f', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '10px' }}>Subtitle Settings</h3>
        <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <span>Font Size</span>
          <input 
            type="number" 
            className="search" 
            style={{ width: '80px', textAlign: 'center', padding: '6px', background: '#07040d', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }} 
            value={subtitles.size} 
            onChange={(e) => setSubtitles({ ...subtitles, size: Number(e.target.value) })} 
          />
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
