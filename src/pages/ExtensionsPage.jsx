import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addRepo, getRepos, removeRepo, loadAllPlugins,
  getInstalled, installExtension, removeExtension,
} from '../services/extensionService';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'Hindi Dub' },
];

export function ExtensionsPage() {
  const [repos, setRepos] = useState(getRepos);
  const [plugins, setPlugins] = useState([]);
  const [installed, setInstalled] = useState(() => getInstalled().map((p) => p.id));
  const [filter, setFilter] = useState('all');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    setPlugins(await loadAllPlugins());
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleAdd = async () => {
    setError('');
    setLoading(true);
    try {
      setRepos(await addRepo(url));
      setUrl('');
      await refresh();
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const handleRemoveRepo = async (repoUrl) => {
    setRepos(removeRepo(repoUrl));
    await refresh();
  };

  const toggle = (plugin) => {
    const list = installed.includes(plugin.id) ? removeExtension(plugin.id) : installExtension(plugin);
    setInstalled(list.map((p) => p.id));
  };

  const visible = useMemo(
    () => plugins.filter((p) => filter === 'all' || p.lang.startsWith(filter)),
    [plugins, filter]
  );

  return (
    <>
      <h2 className="title">Extensions</h2>
      <p className="sub">Repositories: {repos.length} · Available: {plugins.length}</p>

      <div className="row" style={{ marginBottom: 10 }}>
        <input
          className="search"
          placeholder="Paste repo.json URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="btn" onClick={handleAdd} disabled={loading}>ADD</button>
      </div>
      {error && <p className="sub" style={{ color: '#ff6b6b' }}>{error}</p>}

      {repos.map((r) => (
        <div className="card" key={r.url}>
          <div className="row">
            <div style={{ minWidth: 0 }}><h3>{r.name}</h3><p>{r.url}</p></div>
            <button className="btn ghost" style={{ height: 40, padding: '0 14px' }} onClick={() => handleRemoveRepo(r.url)}>DELETE</button>
          </div>
        </div>
      ))}

      <div style={{ display: 'flex', gap: 8, margin: '16px 0', flexWrap: 'wrap' }}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`chip ${filter === f.id ? 'active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading && <p className="sub">Loading…</p>}
      {!loading && visible.length === 0 && <p className="sub">No extensions to show. Add a repository above.</p>}

      {visible.map((p) => {
        const isOn = installed.includes(p.id);
        return (
          <div className="card" key={p.id}>
            <div className="row">
              <div style={{ display: 'flex', gap: 12, minWidth: 0, flex: 1 }}>
                {p.iconUrl ? (
                  <img src={p.iconUrl} alt="" width="44" height="44" style={{ borderRadius: 10, objectFit: 'cover' }}
                       onError={(e) => (e.currentTarget.style.display = 'none')} />
                ) : null}
                <div style={{ minWidth: 0 }}>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <span className="chip" style={{ display: 'inline-block', marginTop: 8, padding: '4px 10px', fontSize: 11 }}>
                    {p.lang.toUpperCase()}
                  </span>
                </div>
              </div>
              <button className={isOn ? 'btn ghost' : 'btn'} style={{ height: 40, padding: '0 14px' }} onClick={() => toggle(p)}>
                {isOn ? 'REMOVE' : 'INSTALL'}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ExtensionsPage;
