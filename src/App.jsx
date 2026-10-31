import { Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import DetailsScreen from './pages/DetailsScreen';
import WatchScreen from './pages/WatchScreen';
import ExtensionsPage from './pages/ExtensionsPage';
import SettingsPage from './pages/SettingsPage';

export function App() {
  return (
    <div className="app-container" style={{ background: '#07040d', minHeight: '100vh' }}>
      <nav className="navbar" style={{ display: 'flex', gap: '16px', padding: '16px', background: '#110a1f' }}>
        <Link to="/" style={{ color: '#c084fc', textDecoration: 'none', fontWeight: 'bold' }}>AizenVerse</Link>
        <Link to="/extensions" style={{ color: '#94a3b8', textDecoration: 'none' }}>Extensions</Link>
        <Link to="/settings" style={{ color: '#94a3b8', textDecoration: 'none' }}>Settings</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/details/:id" element={<DetailsScreen />} />
        <Route path="/watch/:episodeId" element={<WatchScreen />} />
        <Route path="/extensions" element={<ExtensionsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
