// src/services/api.js

const API_PROVIDERS = [
  'https://api.consumet.org/anime/gogoanime',
  'https://consumet-api-clone.vercel.app/anime/gogoanime',
  'https://c.pkamer.com/anime/gogoanime'
];

export const searchAnime = async (query) => {
  for (const baseUrl of API_PROVIDERS) {
    try {
      const res = await fetch(`${baseUrl}/${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) return data.results;
      }
    } catch (e) {
      console.warn(`Search failed on ${baseUrl}`);
    }
  }
  return [];
};

export const getAnimeDetails = async (id) => {
  for (const baseUrl of API_PROVIDERS) {
    try {
      const res = await fetch(`${baseUrl}/info/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.episodes) return data;
      }
    } catch (e) {
      console.warn(`Info fetch failed on ${baseUrl}`);
    }
  }
  return null;
};

export const getStreamUrl = async (episodeId) => {
  for (const baseUrl of API_PROVIDERS) {
    try {
      // Try default watch endpoint
      let res = await fetch(`${baseUrl}/watch/${episodeId}`);
      if (!res.ok) continue;

      let data = await res.json();
      
      if (data && data.sources && data.sources.length > 0) {
        // Pick the best available quality (default, 1080p, or first source)
        const source = 
          data.sources.find(s => s.quality === 'default') ||
          data.sources.find(s => s.quality === '1080p') ||
          data.sources[0];

        if (source && source.url) {
          return {
            url: source.url,
            headers: data.headers || { Referer: 'https://gogoanime.cl/' }
          };
        }
      }
    } catch (e) {
      console.warn(`Stream fetch failed on ${baseUrl}`);
    }
  }
  return null;
};
