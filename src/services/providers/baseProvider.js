// src/services/providers/baseProvider.js

export class BaseProvider {
  constructor(name, lang, type = 'anime') {
    this.name = name;
    this.lang = lang;
    this.type = type;
  }

  // Search for media by title
  async search(query) {
    throw new Error('search() not implemented');
  }

  // Get episode/chapter details
  async getDetails(mediaId) {
    throw new Error('getDetails() not implemented');
  }

  // Get direct stream URLs (.m3u8 / .mp4)
  async getStreamUrl(episodeId) {
    throw new Error('getStreamUrl() not implemented');
  }
}
