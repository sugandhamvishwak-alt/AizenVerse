import { Routes, Route, Link } from 'react-router-dom';
import ExtensionsPage from './pages/ExtensionsPage';
import SettingsPage from './pages/SettingsPage';

export function App() {
  return (
    <div className="app-container">
      <nav className="navbar" style={{ display: 'flex', gap: '16px', padding: '16px', background: '#110a1f' }}>
        <Link to="/" style={{ color: '#c084fc', textDecoration: 'none' }}>Home</Link>
        <Link to="/extensions" style={{ color: '#c084fc', textDecoration: 'none' }}>Extensions</Link>
        <Link to="/settings" style={{ color: '#c084fc', textDecoration: 'none' }}>Settings</Link>
      </nav>

      <Routes>
        <Route path="/extensions" element={<ExtensionsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
