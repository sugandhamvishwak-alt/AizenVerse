import { BaseProvider } from './baseProvider';

export class HiAnimeProvider extends BaseProvider {
  constructor() {
    super('HiAnime', 'en', 'anime');
    this.baseUrl = 'https://api.consumet.org/anime/zoro';
  }

  async search(query) {
    try {
      const res = await fetch(`${this.baseUrl}/${encodeURIComponent(query)}`);
      const data = await res.json();
      return data.results || [];
    } catch {
      return [];
    }
  }

  async getDetails(id) {
    try {
      const res = await fetch(`${this.baseUrl}/info?id=${id}`);
      return await res.json();
    } catch {
      return null;
    }
  }

  async getStreamUrl(episodeId) {
    try {
      const res = await fetch(`${this.baseUrl}/watch?episodeId=${episodeId}`);
      const data = await res.json();
      return data.sources?.find((s) => s.quality === 'auto')?.url || data.sources?.[0]?.url;
    } catch {
      return null;
    }
  }
}
