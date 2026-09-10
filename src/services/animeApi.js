const CONSUMET_API = 'https://api.consumet.org/anime/gogoanime';

export async function fetchCleanStream(animeSlug, episodeNum) {
  try {
    const episodeId = `${animeSlug}-episode-${episodeNum}`;
    const res = await fetch(`${CONSUMET_API}/watch/${episodeId}`);
    if (!res.ok) throw new Error('Failed to fetch episode details');
    
    const data = await res.json();
    
    // Select native .m3u8 stream link directly to eliminate iframe ads
    const cleanStream = data.sources?.find(
      (s) => s.isM3U8 || s.quality === 'default' || s.quality === '1080p'
    ) || data.sources?.[0];

    return cleanStream?.url || null;
  } catch (err) {
    console.error('Ad-free extraction error:', err);
    return null;
  }
}
