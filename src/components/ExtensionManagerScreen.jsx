import React, { useState, useEffect } from 'react';
import CloudstreamRepoImporter from '../services/CloudstreamRepoImporter';

export const ExtensionManagerScreen = () => {
  const [repos, setRepos] = useState([]);
  const [repoUrl, setRepoUrl] = useState('');
  const [repoName, setRepoName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRepositories();
  }, []);

  const loadRepositories = () => {
    try {
      const saved = localStorage.getItem('aizenverse_repositories');
      setRepos(saved ? JSON.parse(saved) : [
        { name: 'Cloudstream providers repository', url: 'https://raw.githubusercontent.com/recloudstream/providers/master/repository.json' },
        { name: 'Mega repository', url: 'https://raw.githubusercontent.com/self-signed/repos/master/repository.json' }
      ]);
    } catch (e) {
      setRepos([]);
    }
  };

  const handleAddRepo = async (e) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;

    setLoading(true);
    setError('');

    try {
      const newRepo = {
        name: repoName.trim() || 'Custom Repository',
        url: repoUrl.trim()
      };
      const updated = [...repos, newRepo];
      setRepos(updated);
      localStorage.setItem('aizenverse_repositories', JSON.stringify(updated));

      if (CloudstreamRepoImporter?.importRepository) {
        await CloudstreamRepoImporter.importRepository(newRepo.url);
      }

      setRepoUrl('');
      setRepoName('');
      setShowAddModal(false);
    } catch (err) {
      setError(err.message || 'Failed to add repository.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveRepo = (index) => {
    const updated = repos.filter((_, i) => i !== index);
    setRepos(updated);
    localStorage.setItem('aizenverse_repositories', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', paddingBottom: '90px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#f3e8ff' }}>Extensions</h2>
        <span style={{ fontSize: '12px', color: '#c084fc' }}>Repositories: {repos.length}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {repos.map((repo, idx) => (
          <div key={idx} style={{
            backgroundColor: '#110a1f',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            borderRadius: '14px',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ overflow: 'hidden', flex: 1, marginRight: '12px' }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#f3e8ff', fontWeight: 'bold' }}>{repo.name}</h4>
              <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{repo.url}</p>
            </div>
            <button
              onClick={() => handleRemoveRepo(idx)}
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div style={{ position: 'fixed', bottom: '80px', right: '20px', zIndex: 40 }}>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            backgroundColor: '#9333ea',
            color: '#ffffff',
            padding: '14px 22px',
            borderRadius: '50px',
            fontWeight: 'bold',
            fontSize: '13px',
            border: 'none',
            boxShadow: '0 0 20px rgba(147, 51, 234, 0.4)',
            cursor: 'pointer'
          }}
        >
          + Add repository
        </button>
      </div>

      {showAddModal && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 100
        }}>
          <div style={{
            backgroundColor: '#110a1f', border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '16px', padding: '20px', width: '100%', maxWidth: '380px'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#ffffff' }}>Add Repository</h3>
            <form onSubmit={handleAddRepo} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                placeholder="Repository Name (Optional)"
                style={{
                  padding: '12px', backgroundColor: '#07040d', border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '10px', color: '#ffffff', fontSize: '12px', outline: 'none'
                }}
              />
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="Repository URL"
                required
                style={{
                  padding: '12px', backgroundColor: '#07040d', border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '10px', color: '#ffffff', fontSize: '12px', outline: 'none'
                }}
              />
              {error && <p style={{ color: '#f87171', fontSize: '12px', margin: 0 }}>{error}</p>}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '10px 16px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '12px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px', backgroundColor: '#9333ea', color: '#ffffff',
                    border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer'
                  }}
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtensionManagerScreen;
