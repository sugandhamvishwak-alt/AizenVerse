// src/services/api.js
const BASE_URL = 'https://api.consumet.org/anime/gogoanime'; // or your self-hosted Consumet instance

/**
 * Search anime by title
 */
export const searchAnime = async (query) => {
  try {
    const res = await fetch(`${BASE_URL}/${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to fetch search results');
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching anime:', error);
    return [];
  }
};

/**
 * Get detailed anime info including full episode list
 */
export const getAnimeDetails = async (animeId) => {
  try {
    const res = await fetch(`${BASE_URL}/info/${animeId}`);
    if (!res.ok) throw new Error('Failed to fetch anime details');
    return await res.json();
  } catch (error) {
    console.error('Error fetching anime info:', error);
    return null;
  }
};

/**
 * Get direct HLS (.m3u8) streaming sources for a specific episode
 */
export const getEpisodeSources = async (episodeId) => {
  try {
    const res = await fetch(`${BASE_URL}/watch/${episodeId}`);
    if (!res.ok) throw new Error('Failed to fetch streaming links');
    const data = await res.json();
    
    // Returns array of sources [{ url: "...", isM3U8: true, quality: "1080p" }, ...]
    return data;
  } catch (error) {
    console.error('Error fetching episode sources:', error);
    return null;
  }
};
