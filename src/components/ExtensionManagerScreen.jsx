import { useEffect, useState } from 'react';
import { parseCloudstreamRepo } from '../services/CloudstreamRepoImporter';

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
      const list = await parseCloudstreamRepo(r.url);
      setPlugins((p) => ({ ...p, [r.url]: list }));
      setStatus((s) => ({ ...s, [r.url]: 'ok' }));
    } catch {
      setStatus((s) => ({ ...s, [r.url]: 'error' }));
    }
  };

  useEffect(() => {
    repos.forEach((r) => { if (!status[r.url]) loadRepo(r); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repos]);

  const addRepo = () => {
    const u = url.trim();
    if (!u || repos.some((r) => r.url === u)) return;
    setRepos([...repos, { name: name.trim() || 'Repository', url: u }]);
    setName(''); setUrl(''); setOpen(false);
  };

  const removeRepo = (r) => setRepos(repos.filter((x) => x.url !== r.url));

  const available = Object.values(plugins).reduce((n, l) => n + l.length, 0);
  const failed = Object.values(status).filter((s) => s === 'error').length;

  return (
    <>
      <h2 className="title">Extensions</h2>
      <p className="sub">Repositories: {repos.length}</p>

      {repos.map((r) => (
        <div className="card" key={r.url}>
          <div className="row">
            <div style={{ minWidth: 0, flex: 1 }} onClick={() => setExpanded(expanded === r.url ? null : r.url)}>
              <h3>{r.name}</h3>
              <p>{r.url}</p>
              <p style={{ marginTop: 6 }}>
                {status[r.url] === 'loading' && 'Loading…'}
                {status[r.url] === 'ok' && `${plugins[r.url].length} extensions · tap to view`}
                {status[r.url] === 'error' && 'Could not load this repository'}
              </p>
            </div>
            <button className="icon-btn" aria-label="Remove" onClick={() => removeRepo(r)}>🗑</button>
          </div>
          {expanded === r.url && plugins[r.url] && (
            <div style={{ marginTop: 12 }}>
              {plugins[r.url].map((p) => (
                <p key={p.id} style={{ padding: '4px 0' }}>{p.name} · v{p.version} · {p.lang}</p>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="stats">
        <div className="stat"><b>{repos.length}</b><span>REPOS</span></div>
        <div className="stat"><b>{available}</b><span>AVAILABLE</span></div>
        <div className="stat"><b>{failed}</b><span>FAILED</span></div>
      </div>

      <button className="btn ghost" style={{ width: '100%' }} onClick={() => setOpen(true)}>+ ADD REPOSITORY</button>

      {open && (
        <div className="sheet-bg" onClick={() => setOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <h3>Add repository</h3>
            <input className="search" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ marginBottom: 10 }} />
            <input className="search" placeholder="Repository URL" value={url} onChange={(e) => setUrl(e.target.value)} />
            <div className="row">
              <button className="btn ghost" onClick={() => setOpen(false)}>CANCEL</button>
              <button className="btn" onClick={addRepo}>ADD</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
