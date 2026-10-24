export class CloudstreamRepoImporter {
  static async importRepository(url) {
    try {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url.trim())}`;
      let response = await fetch(proxyUrl);
      if (!response.ok) {
        response = await fetch(url.trim());
      }
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const repoData = await response.json();
      let extractedPlugins = [];

      if (Array.isArray(repoData)) {
        extractedPlugins = repoData;
      } else if (Array.isArray(repoData.plugins)) {
        extractedPlugins = repoData.plugins;
      }

      if (Array.isArray(repoData.pluginLists)) {
        for (const listUrl of repoData.pluginLists) {
          try {
            const listProxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(listUrl.trim())}`;
            const listRes = await fetch(listProxy);
            if (listRes.ok) {
              const listData = await listRes.json();
              if (Array.isArray(listData)) {
                extractedPlugins.push(...listData);
              }
            }
          } catch (e) {
            console.warn("Failed fetching plugin list:", listUrl);
          }
        }
      }

      const existing = JSON.parse(localStorage.getItem('aizenverse_installed_extensions') || '[]');
      const merged = [...existing];

      extractedPlugins.forEach(p => {
        if (p && p.name && !merged.some(item => item.name === p.name)) {
          merged.push(p);
        }
      });

      localStorage.setItem('aizenverse_installed_extensions', JSON.stringify(merged));
      return merged;
    } catch (err) {
      console.error("Error importing repository:", err);
      throw err;
    }
  }
}

export default CloudstreamRepoImporter;
