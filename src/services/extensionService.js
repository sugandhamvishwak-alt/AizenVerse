// Extension service: fetch repo manifests, and save repos / installed extensions.
const REPOS_KEY = 'aizenverse_repos';
const INSTALLED_KEY = 'aizenverse_installed';

// Pre-configured default repositories for English and Hindi anime content
export const DEFAULT_REPOS = [
  {
    name: 'Phisher Anime Extensions',
    url: 'https://raw.githubusercontent.com/phisher98/cloudstream-extensions-phisher/builds/repo.json'
  }
];

const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
