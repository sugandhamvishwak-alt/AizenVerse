import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { CatalogScreen } from './components/CatalogScreen';
import { ExtensionManagerScreen } from './components/ExtensionManagerScreen';
import { WatchScreen } from './components/WatchScreen';

export default function App() {
  const [inWelcome, setInWelcome] = useState(true);
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedAnime, setSelectedAnime] = useState(null);

  if (inWelcome) {
    return <WelcomeScreen onStart={() => setInWelcome(false)} />;
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#07040d', color: '#ffffff', position: 'relative' }}>
      <div style={{ paddingBottom: '75px' }}>
        {currentTab === 'home' && (
          <CatalogScreen onSelectAnime={(anime) => { setSelectedAnime(anime); setCurrentTab('watch'); }} />
        )}
        {currentTab === 'search' && (
          <CatalogScreen onSelectAnime={(anime) => { setSelectedAnime(anime); setCurrentTab('watch'); }} />
        )}
        {currentTab === 'library' && (
          <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>Library / Bookmarks</div>
        )}
        {currentTab === 'downloads' && (
          <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>Downloads Manager</div>
        )}
        {currentTab === 'settings' && <ExtensionManagerScreen />}
        {currentTab === 'watch' && selectedAnime && (
          <WatchScreen anime={selectedAnime} onBack={() => setCurrentTab('home')} />
        )}
      </div>

      {/* Cloudstream-Style Clean Bottom Navigation */}
      <nav style={styles.navBar}>
        <button onClick={() => setCurrentTab('home')} style={{ ...styles.navItem, color: currentTab === 'home' ? '#c084fc' : '#64748b' }}>
          Home
        </button>
        <button onClick={() => setCurrentTab('search')} style={{ ...styles.navItem, color: currentTab === 'search' ? '#c084fc' : '#64748b' }}>
          Search
        </button>
        <button onClick={() => setCurrentTab('library')} style={{ ...styles.navItem, color: currentTab === 'library' ? '#c084fc' : '#64748b' }}>
          Library
        </button>
        <button onClick={() => setCurrentTab('downloads')} style={{ ...styles.navItem, color: currentTab === 'downloads' ? '#c084fc' : '#64748b' }}>
          Downloads
        </button>
        <button onClick={() => setCurrentTab('settings')} style={{ ...styles.navItem, color: currentTab === 'settings' ? '#c084fc' : '#64748b' }}>
          Settings
        </button>
      </nav>
    </main>
  );
}

const styles = {
  navBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60px',
    backgroundColor: '#110a1f',
    borderTop: '1px solid rgba(168, 85, 247, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 50
  },
  navItem: {
    background: 'none',
    border: 'none',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '8px'
  }
};
