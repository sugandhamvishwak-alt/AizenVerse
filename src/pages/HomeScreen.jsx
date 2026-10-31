import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALL_PROVIDERS } from '../services/providers';

export function HomeScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load default trending / initial list on mount
  useEffect(() => {
    handleSearch('Bleach');
  }, []);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const activeProvider = ALL_PROVIDERS[0]; // HiAnime by default
      const data = await activeProvider.search(searchTerm);
      setResults(data || []);
    } catch (err) {
      console.error('Failed to search anime:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <div style={{ padding: '16px', color: '#fff', minHeight: '100vh', background: '#07040d' }}>
      {/* Search Header */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search anime (e.g. Bleach, Naruto)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #334155',
            background: '#110a1f',
            color: '#fff',
            outline: 'none'
          }}
        />
        <button
          onClick={() => handleSearch(query)}
          style={{
            padding: '12px 20px',
            borderRadius: '8px',
            background: '#c084fc',
            color: '#000',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
      </div>

      {/* Grid Display */}
      <h3 style={{ marginBottom: '14px', color: '#cbd5e1' }}>
        {loading ? 'Searching...' : 'Explore Anime'}
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '16px'
        }}
      >
        {results.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/details/${encodeURIComponent(item.id)}`)}
            style={{
              background: '#110a1f',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid #1e1b4b',
              transition: 'transform 0.2s'
            }}
          >
            <img
              src={item.image}
              alt={item.title?.userPreferred || item.title}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '10px' }}>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {typeof item.title === 'string' ? item.title : item.title?.userPreferred || item.title?.romaji}
              </p>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                {item.type || 'Anime'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
