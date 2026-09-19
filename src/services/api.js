const API_BASE_URL = "https://api.consumet.org/anime/gogoanime";
export const searchAnime = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching anime:", error);
    return [];
  }
};

export const getAnimeInfo = async (animeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/info/${animeId}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching anime info:", error);
    return null;
  }
};

export const getEpisodeStream = async (episodeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/watch/${episodeId}`);
    const data = await response.json();
    return data.sources || [];
  } catch (error) {
    console.error("Error fetching stream sources:", error);
    return [];
  }
};
