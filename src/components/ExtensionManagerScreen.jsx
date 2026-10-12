import React, { useState, useEffect } from 'react';
import { parseCloudstreamRepo } from '../services/CloudstreamRepoImporter';

export const ExtensionManagerScreen = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [extensions, setExtensions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [installedExtensions, setInstalledExtensions] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('aizenverse_installed_extensions');
    if (saved) {
      setInstalledExtensions(JSON.parse(saved));
    }
  }, []);

  const handleAddRepository = async (e) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;

    setLoading(true);
    setError('');

    try {
      const parsedExtensions = await parseCloudstreamRepo(repoUrl.trim());
      setExtensions(parsedExtensions);
    } catch (err) {
      setError(err.message || 'Failed to load repository.');
    } finally {
      setLoading(false);
    }
  };

  const toggleInstall = (extension) => {
    let updated;
    const isInstalled = installedExtensions.some(ext => ext.id === extension.id);
    
    if (isInstalled) {
      updated = installedExtensions.filter(ext => ext.id !== extension.id);
    } else {
      updated = [...installedExtensions, extension];
    }
    
    setInstalledExtensions(updated);
    localStorage.setItem('aizenverse_installed_extensions', JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 text-white">
      <div className="bg-[#090d16] p-5 rounded-xl border border-cyan-500/30">
        <h2 className="text-xl font-bold text-cyan-400 mb-2">Extension Repositories</h2>
        <p className="text-xs text-gray-400 mb-4">
          Add a Cloudstream-compatible repository URL to load providers dynamically.
        </p>

        <form onSubmit={handleAddRepository} className="flex gap-2">
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://raw.githubusercontent.com/.../repo.json"
            className="flex-1 bg-black/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-950/60 border border-cyan-400/50 px-4 py-2 text-sm text-cyan-200 rounded-lg hover:bg-cyan-900/60 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Add Repo'}
          </button>
        </form>

        {error && <p className="text-red-400 text-xs mt-2 font-mono">{error}</p>}
      </div>

      {extensions.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-mono text-cyan-300">Discovered Extensions ({extensions.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {extensions.map((ext) => {
              const isInstalled = installedExtensions.some(i => i.id === ext.id);
              return (
                <div key={ext.id} className="bg-[#090d16] p-4 rounded-xl border border-cyan-500/20 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-white">{ext.name}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded border border-cyan-500/30">
                        v{ext.version}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{ext.description}</p>
                    <p className="text-[10px] font-mono text-cyan-600 mt-2">Author: {ext.author}</p>
                  </div>
                  <button
                    onClick={() => toggleInstall(ext)}
                    className={`w-full py-1.5 text-xs font-mono rounded border transition ${
                      isInstalled 
                        ? 'bg-red-950/40 border-red-500/40 text-red-300 hover:bg-red-900/40' 
                        : 'bg-cyan-950/50 border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/50'
                    }`}
                  >
                    {isInstalled ? 'UNINSTALL' : 'INSTALL EXTENSION'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
