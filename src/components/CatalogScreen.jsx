import React, { useState } from 'react';

export const CatalogScreen = ({ onSelectAnime }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      // Search logic trigger
      setResults([]);
      setError('No extension active. Please add a repository under Settings.');
    } catch (err) {
      setError(err.message || 'Failed to fetch catalog.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search anime..."
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: '#110a1f',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '12px',
            color: '#ffffff',
            fontSize: '13px',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 20px',
            backgroundColor: '#9333ea',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          {loading ? '...' : 'SEARCH'}
        </button>
      </form>

      {error && (
        <div style={{
          backgroundColor: '#110a1f',
          border: '1px solid rgba(168, 85, 247, 0.25)',
          borderRadius: '14px',
          padding: '20px',
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0, lineHeight: '1.5' }}>{error}</p>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '12px',
        marginTop: '16px'
      }}>
        {results.map((anime, idx) => (
          <div
            key={idx}
            onClick={() => onSelectAnime && onSelectAnime(anime)}
            style={{
              backgroundColor: '#110a1f',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
          >
            <div style={{ height: '160px', backgroundColor: '#07040d' }}>
              {anime.poster && <img src={anime.poster} alt={anime.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </div>
            <div style={{ padding: '8px' }}>
              <h4 style={{ margin: 0, fontSize: '11px', color: '#e2e8f0', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {anime.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogScreen;
