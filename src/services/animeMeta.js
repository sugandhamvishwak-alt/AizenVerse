// Service to fetch rich anime title cards and metadata from MyAnimeList (via Jikan API)

const BASE_URL = 'https://api.jikan.moe/v4';

// Fetch trending/top anime for the home screen grid & carousel
export const getTrendingAnime = async () => {
  try {
    const response = await fetch(`${BASE_URL}/top/anime?limit=10`);
    const data = await response.json();
    
    // Map to clean structure for your UI components
    return data.data.map(anime => ({
      id: anime.mal_id,
      title: anime.title_english || anime.title,
      image: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
      synopsis: anime.synopsis,
      score: anime.score,
      episodes: anime.episodes,
      genres: anime.genres.map(g => g.name)
    }));
  } catch (error) {
    console.error("Failed to fetch trending anime:", error);
    return [];
  }
};

// Search anime by name for your search screen
export const searchAnimeMetadata = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=15`);
    const data = await response.json();
    
    return data.data.map(anime => ({
      id: anime.mal_id,
      title: anime.title_english || anime.title,
      image: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
      synopsis: anime.synopsis,
      score: anime.score,
      episodes: anime.episodes,
      genres: anime.genres.map(g => g.name)
    }));
  } catch (error) {
    console.error("Failed to search anime metadata:", error);
    return [];
  }
};
