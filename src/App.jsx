import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
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
    <main style={{ minHeight: '100vh', backgroundColor: '#07040d', color: '#ffffff' }}>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '18px', color: '#c084fc' }}>AizenVerse Main Shell</h2>
        {/* Main Shell Content */}
      </div>
    </main>
  );
}
