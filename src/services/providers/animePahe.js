import { BaseProvider } from './baseProvider';

export class AnimePaheProvider extends BaseProvider {
  constructor() {
    super('AnimePahe', 'en', 'anime');
    this.baseUrl = 'https://api.consumet.org/anime/animepahe';
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
      return data.sources?.[0]?.url || null;
    } catch {
      return null;
    }
  }
}
