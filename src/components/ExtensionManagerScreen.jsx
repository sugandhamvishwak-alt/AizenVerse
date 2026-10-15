import React, { useEffect, useState } from 'react';
import CloudstreamRepoImporter from '../services/CloudstreamRepoImporter';

const KEY = 'aizenverse_repos';
const loadRepos = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
};

export function ExtensionManagerScreen() {
  const [repos, setRepos] = useState(loadRepos);
  const [plugins, setPlugins] = useState({});   // repo url -> plugin list
  const [status, setStatus] = useState({});     // repo url -> loading | ok | error
  const [expanded, setExpanded] = useState(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(repos));
  }, [repos]);

  const loadRepo = async (r) => {
    setStatus((s) => ({ ...s, [r.url]: 'loading' }));
    try {
      // Safe dynamic method call depending on importer export structure
      const fetchFn = CloudstreamRepoImporter.importRepository || CloudstreamRepoImporter.parseCloudstreamRepo || CloudstreamRepoImporter;
      const list = await fetchFn(r.url);
      setPlugins((p) => ({ ...p, [r.url]: Array.isArray(list) ? list : [] }));
      setStatus((s) => ({ ...s, [r.url]: 'ok' }));
    } catch {
      setStatus((s) => ({ ...s, [r.url]: 'error' }));
    }
  };

  useEffect(() => {
    repos.forEach((r) => {
      if (!status[r.url]) loadRepo(r);
    });
  }, [repos]);

  const addRepo = () => {
    const u = url.trim();
    if (!u || repos.some((r) => r.url === u)) return;
    setRepos([...repos, { name: name.trim() || 'Repository', url: u }]);
    setName(''); setUrl(''); setOpen(false);
  };

  const removeRepo = (r) => {
    setRepos(repos.filter((x) => x.url !== r.url));
    setPlugins((p) => {
      const copy = { ...p };
      delete copy[r.url];
      return copy;
    });
    setStatus((s) => {
      const copy = { ...s };
      delete copy[r.url];
      return copy;
    });
  };

  const available = Object.values(plugins).reduce((n, l) => n + (Array.isArray(l) ? l.length : 0), 0);
  const failed = Object.values(status).filter((s) => s === 'error').length;

  return (
    <div style={{ padding: '16px', color: '#ffffff' }}>
      <h2 className="title">Extensions</h2>
      <p className="sub" style={{ color: '#94a3b8', fontSize: '13px' }}>Repositories: {repos.length}</p>

      {repos.map((r) => (
        <div className="card" key={r.url} style={{ marginBottom: '12px', padding: '12px', background: '#110a1f', borderRadius: '8px' }}>
          <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ minWidth: 0, flex: 1, cursor: 'pointer' }} onClick={() => setExpanded(expanded === r.url ? null : r.url)}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>{r.name}</h3>
              <p style={{ margin: '4px 0', fontSize: '11px', color: '#94a3b8', wordBreak: 'break-all' }}>{r.url}</p>
              <p style={{ marginTop: '6px', fontSize: '12px', color: '#c084fc' }}>
                {status[r.url] === 'loading' && 'Loading…'}
                {status[r.url] === 'ok' && `${plugins[r.url]?.length || 0} extensions · tap to view`}
                {status[r.url] === 'error' && 'Could not load this repository'}
              </p>
            </div>
            <button 
              className="icon-btn" 
              aria-label="Remove" 
              onClick={(e) => { e.stopPropagation(); removeRepo(r); }}
              style={{ background: 'none', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '4px', padding: '6px 10px', fontSize: '11px', cursor: 'pointer' }}
            >
              DELETE
            </button>
          </div>
          {expanded === r.url && plugins[r.url] && (
            <div style={{ marginTop: '12px', borderTop: '1px solid #1e1b4b', paddingTop: '8px' }}>
              {plugins[r.url].map((p, idx) => (
                <p key={p.id || p.name || idx} style={{ padding: '4px 0', fontSize: '12px', color: '#cbd5e1' }}>
                  {p.name} · v{p.version || 1} · {p.lang || 'en'}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="stats" style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0' }}>
        <div className="stat"><b>{repos.length}</b> <span>REPOS</span></div>
        <div className="stat"><b>{available}</b> <span>AVAILABLE</span></div>
        <div className="stat"><b>{failed}</b> <span>FAILED</span></div>
      </div>

      <button className="btn ghost" style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid #c084fc', color: '#c084fc', borderRadius: '6px', fontWeight: 'bold' }} onClick={() => setOpen(true)}>
        + ADD REPOSITORY
      </button>

      {open && (
        <div className="sheet-bg" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }} onClick={() => setOpen(false)}>
          <div className="sheet" style={{ background: '#110a1f', padding: '20px', borderRadius: '12px', width: '90%', maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Add repository</h3>
            <input className="search" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', background: '#07040d', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }} />
            <input className="search" placeholder="Repository URL" value={url} onChange={(e) => setUrl(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '16px', background: '#07040d', border: '1px solid #334155', color: '#fff', borderRadius: '6px' }} />
            <div className="row" style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn ghost" onClick={() => setOpen(false)} style={{ padding: '8px 16px', background: 'transparent', color: '#94a3b8', border: 'none' }}>CANCEL</button>
              <button className="btn" onClick={addRepo} style={{ padding: '8px 16px', background: '#c084fc', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>ADD</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
