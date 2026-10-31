import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ALL_PROVIDERS } from '../services/providers';

export function DetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimeDetails() {
      try {
        setLoading(true);
        const activeProvider = ALL_PROVIDERS[0]; // HiAnime by default
        const data = await activeProvider.getDetails(decodeURIComponent(id));
        setDetails(data);
      } catch (err) {
        console.error('Failed to load anime details:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnimeDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '20px', color: '#fff', textAlign: 'center' }}>
        Loading episode details...
      </div>
    );
  }

  if (!details) {
    return (
      <div style={{ padding: '20px', color: '#fff', textAlign: 'center' }}>
        Failed to load details. Try going back.
      </div>
    );
  }

  const title = typeof details.title === 'string' 
    ? details.title 
    : details.title?.userPreferred || details.title?.romaji || 'Anime Details';

  return (
    <div style={{ padding: '16px', color: '#fff', maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ 
          background: 'none', 
          border: 'none', 
          color: '#c084fc', 
          cursor: 'pointer', 
          marginBottom: '16px',
          fontSize: '16px' 
        }}
      >
        ← Back
      </button>

      {/* Banner / Poster Header */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <img 
          src={details.image} 
          alt={title} 
          style={{ width: '150px', borderRadius: '8px', objectFit: 'cover' }} 
        />
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h2 style={{ marginTop: 0, color: '#f8fafc' }}>{title}</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>
            {details.description ? details.description.replace(/<[^>]*>?/gm, '') : 'No description available.'}
          </p>
        </div>
      </div>

      {/* Episode Grid */}
      <h3 style={{ borderBottom: '1px solid #1e1b4b', paddingBottom: '8px' }}>Episodes</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '10px', marginTop: '12px' }}>
        {details.episodes && details.episodes.length > 0 ? (
          details.episodes.map((ep) => (
            <button
              key={ep.id}
              onClick={() => navigate(`/watch/${encodeURIComponent(ep.id)}`)}
              style={{
                padding: '10px',
                background: '#110a1f',
                border: '1px solid #334155',
                borderRadius: '6px',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Ep {ep.number || ep.title}
            </button>
          ))
        ) : (
          <p style={{ color: '#94a3b8' }}>No episodes found for this entry.</p>
        )}
      </div>
    </div>
  );
}

export default DetailsScreen;
