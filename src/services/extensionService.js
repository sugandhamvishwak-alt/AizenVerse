// Extension service: fetch repo manifests, and save repos / installed extensions.
const REPOS_KEY = 'aizenverse_repos';
const INSTALLED_KEY = 'aizenverse_installed';

// Add default repos you are allowed to use, e.g. { name: 'My Repo', url: 'https://.../repo.json' }
export const DEFAULT_REPOS = [];

const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} while loading ${url}`);
  return res.json();
}

export function normalizePlugin(p, repo) {
  return {
    id: p.internalName || p.name,
    name: p.name || 'Unnamed',
    description: p.description || 'No description provided.',
    iconUrl: p.iconUrl || p.image || '',
    lang: (p.language || p.lang || 'en').toLowerCase(),
    version: p.version || 1,
    url: p.url || p.downloadUrl || '',
    repoName: repo?.name || '',
    repoUrl: repo?.url || '',
  };
}

// Supports: { pluginLists: [url, ...] }, { plugins: [...] }, { extensions: [...] } or a plain array.
export async function fetchRepoManifest(url) {
  const manifest = await fetchJson(url);
  let list = [];
  if (Array.isArray(manifest?.pluginLists)) {
    const lists = await Promise.all(manifest.pluginLists.map((u) => fetchJson(u).catch(() => [])));
    list = lists.flat();
  } else {
    list = manifest?.plugins || manifest?.extensions || manifest;
  }
  if (!Array.isArray(list)) throw new Error('Invalid repository format.');
  const repo = { name: manifest?.name || url, url };
  return { repo, plugins: list.map((p) => normalizePlugin(p, repo)) };
}

// ---- Saved repositories ----
export const getRepos = () => read(REPOS_KEY, DEFAULT_REPOS);

export async function addRepo(url) {
  const clean = url.trim();
  if (!clean) throw new Error('Paste a repository URL first.');
  const repos = getRepos();
  if (repos.some((r) => r.url === clean)) throw new Error('This repository is already added.');
  const { repo } = await fetchRepoManifest(clean); // validates before saving
  write(REPOS_KEY, [...repos, repo]);
  return getRepos();
}

export function removeRepo(url) {
  write(REPOS_KEY, getRepos().filter((r) => r.url !== url));
  return getRepos();
}

export async function loadAllPlugins() {
  const results = await Promise.allSettled(getRepos().map((r) => fetchRepoManifest(r.url)));
  const seen = new Set();
  return results
    .filter((r) => r.status === 'fulfilled')
    .flatMap((r) => r.value.plugins)
    .filter((p) => (seen.has(p.id) ? false : seen.add(p.id)));
}

// ---- Installed extensions (saves the plugin info; see note below) ----
export const getInstalled = () => read(INSTALLED_KEY, []);
export const isInstalled = (id) => getInstalled().some((p) => p.id === id);

export function installExtension(plugin) {
  if (!isInstalled(plugin.id)) write(INSTALLED_KEY, [...getInstalled(), plugin]);
  return getInstalled();
}

export function removeExtension(id) {
  write(INSTALLED_KEY, getInstalled().filter((p) => p.id !== id));
  return getInstalled();
}
