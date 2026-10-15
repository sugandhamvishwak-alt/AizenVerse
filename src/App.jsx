import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { CatalogScreen } from './components/CatalogScreen';
import { ExtensionManagerScreen } from './components/ExtensionManagerScreen';
import { WatchScreen } from './components/WatchScreen';
import BottomNav from './components/BottomNav';

export default function App() {
  const [inWelcome, setInWelcome] = useState(true);
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedAnime, setSelectedAnime] = useState(null);

  if (inWelcome) {
    return <WelcomeScreen onStart={() => setInWelcome(false)} />;
  }

  const openAnime = (anime) => {
    setSelectedAnime(anime);
    setCurrentTab('watch');
  };

  return (
    <main className="app">
      {currentTab === 'home' && <CatalogScreen onSelectAnime={openAnime} />}
      {currentTab === 'search' && <CatalogScreen onSelectAnime={openAnime} />}
      {currentTab === 'library' && (
        <>
          <h2 className="title">Library</h2>
          <p className="sub">Your bookmarks will appear here.</p>
        </>
      )}
      {currentTab === 'downloads' && (
        <>
          <h2 className="title">Downloads</h2>
          <p className="sub">Your downloads will appear here.</p>
        </>
      )}
      {currentTab === 'settings' && <ExtensionManagerScreen />}
      {currentTab === 'watch' && selectedAnime && (
        <WatchScreen anime={selectedAnime} onBack={() => setCurrentTab('home')} />
      )}

      <BottomNav tab={currentTab} onChange={setCurrentTab} />
    </main>
  );
}
