export const parseCloudstreamRepo = async (repoUrl) => {
  try {
    const response = await fetch(repoUrl);
    if (!response.ok) throw new Error(`Failed to fetch repo: HTTP ${response.status}`);
    
    const repoData = await response.json();
    const plugins = repoData.plugins || repoData.extensions || repoData;
    
    if (!Array.isArray(plugins)) {
      throw new Error("Invalid repository format: Expected an array of plugins.");
    }

    return plugins.map(plugin => ({
      id: plugin.internalName || plugin.name,
      name: plugin.name,
      author: plugin.author || 'Unknown',
      version: plugin.version || '1.0.0',
      description: plugin.description || 'No description provided.',
      iconUrl: plugin.iconUrl || plugin.image || '',
      downloadUrl: plugin.url || plugin.downloadUrl || '',
      lang: plugin.lang || 'en',
    }));
  } catch (error) {
    console.error("Error parsing Cloudstream repository:", error);
    throw error;
  }
};
