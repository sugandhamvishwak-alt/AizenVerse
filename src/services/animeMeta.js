// Read-only anime catalog and poster metadata from Jikan (MyAnimeList).
const BASE_URL = 'https://api.jikan.moe/v4';

async function requestAnimeData(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    let detail = '';
    try {
      const body = await response.json();
      detail = body?.message || body?.error || '';
    } catch {
      // The API may return a non-JSON error body.
    }

    if (response.status === 429) {
      throw new Error('Jikan rate limit reached (HTTP 429). Wait briefly, then try again.');
    }

    throw new Error(`Jikan request failed (HTTP ${response.status})${detail ? `: ${detail}` : ''}.`);
  }

  const payload = await response.json();
  if (!Array.isArray(payload?.data)) {
    throw new Error('Jikan returned an unexpected response. Please retry in a moment.');
  }
  return payload.data;
}

function normalizeAnime(anime) {
  return {
    id: anime.mal_id,
    title: anime.title_english || anime.title || anime.title_japanese || 'Untitled anime',
    image:
      anime.images?.webp?.large_image_url ||
      anime.images?.jpg?.large_image_url ||
      anime.images?.webp?.image_url ||
      anime.images?.jpg?.image_url ||
      null,
    synopsis: anime.synopsis || '',
    score: anime.score ?? null,
    episodes: anime.episodes ?? null,
    genres: Array.isArray(anime.genres) ? anime.genres.map((genre) => genre.name) : [],
  };
}

export const getTrendingAnime = async () => {
  const data = await requestAnimeData('/top/anime?limit=24');
  return data.map(normalizeAnime);
};

export const searchAnimeMetadata = async (query) => {
  const cleanQuery = query.trim();
  if (!cleanQuery) return getTrendingAnime();

  const data = await requestAnimeData(`/anime?q=${encodeURIComponent(cleanQuery)}&limit=24`);
  return data.map(normalizeAnime);
};
