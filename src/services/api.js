// Stream/search adapter for an authorized anime provider that implements the
// Consumet-compatible route and response shape. Configure the base URL with
// VITE_ANIME_STREAM_API_BASE; do not put private API secrets in VITE_* variables.
const API_BASE = import.meta.env.VITE_ANIME_STREAM_API_BASE?.trim().replace(/\/+$/, '');

function getProviderBase() {
  if (!API_BASE) {
    throw new Error(
      'No authorized streaming API is configured. Set VITE_ANIME_STREAM_API_BASE to a provider backend you are permitted to use.'
    );
  }
  return `${API_BASE}/anime/gogoanime`;
}

async function requestProvider(path) {
  const response = await fetch(`${getProviderBase()}${path}`);
  if (!response.ok) {
    throw new Error(`Configured anime provider returned HTTP ${response.status} for ${path}.`);
  }
  return response.json();
}

export const searchAnime = async (query) => {
  const data = await requestProvider(`/${encodeURIComponent(query)}`);
  return Array.isArray(data?.results) ? data.results : [];
};

export const getAnimeDetails = async (id) => {
  const data = await requestProvider(`/info/${encodeURIComponent(id)}`);
  return data && Array.isArray(data.episodes) ? data : null;
};

export const getStreamUrl = async (episodeId) => {
  const data = await requestProvider(`/watch/${encodeURIComponent(episodeId)}`);
  if (!Array.isArray(data?.sources) || data.sources.length === 0) return null;

  const source =
    data.sources.find((item) => item.quality === 'default') ||
    data.sources.find((item) => item.quality === '1080p') ||
    data.sources.find((item) => item.isM3U8) ||
    data.sources[0];

  if (!source?.url) return null;
  return {
    url: source.url,
    headers: data.headers || {},
  };
};
