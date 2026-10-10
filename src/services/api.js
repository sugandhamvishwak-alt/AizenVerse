// Multi-provider Anime Scraper Service for AizenVerse

const PROVIDERS = [
  {
    name: 'Gogo-Mirror-1',
    baseUrl: 'https://api.consumet.org/anime/gogoanime'
  },
  {
    name: 'Gogo-Mirror-2',
    baseUrl: 'https://consumet-api-clone.vercel.app/anime/gogoanime'
  },
  {
    name: 'Ani-Aggregator',
    baseUrl: 'https://api.consumet.stream/anime/gogoanime'
  }
];

export const searchAnime = async (query) => {
  for (const provider of PROVIDERS) {
    try {
      const res = await fetch(`${provider.baseUrl}/${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          console.log(`Successfully fetched search from ${provider.name}`);
          return data.results;
        }
      }
    } catch (e) {
      console.warn(`Provider ${provider.name} search failed, trying next...`);
    }
  }
  return [];
};

export const getAnimeDetails = async (id) => {
  for (const provider of PROVIDERS) {
    try {
      const res = await fetch(`${provider.baseUrl}/info/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.episodes) {
          console.log(`Successfully fetched details from ${provider.name}`);
          return data;
        }
      }
    } catch (e) {
      console.warn(`Provider ${provider.name} details failed, trying next...`);
    }
  }
  return null;
};

export const getStreamUrl = async (episodeId) => {
  for (const provider of PROVIDERS) {
    try {
      const res = await fetch(`${provider.baseUrl}/watch/${episodeId}`);
      if (!res.ok) continue;

      const data = await res.json();
      if (data && data.sources && data.sources.length > 0) {
        // Find the best available stream stream source
        const source = 
          data.sources.find(s => s.quality === 'default') ||
          data.sources.find(s => s.quality === '1080p') ||
          data.sources.find(s => s.isM3U8) ||
          data.sources[0];

        if (source && source.url) {
          console.log(`Successfully fetched stream from ${provider.name}`);
          return {
            url: source.url,
            headers: data.headers || { Referer: 'https://gogoanime.cl/' }
          };
        }
      }
    } catch (e) {
      console.warn(`Provider ${provider.name} stream failed, trying next...`);
    }
  }
  return null;
};
