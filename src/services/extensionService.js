// src/services/extensionService.js

export const getRepos = async () => {
  try {
    const saved = localStorage.getItem('extension_repos');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error getting repos:', error);
    return [];
  }
};

export const addRepo = async (url) => {
  const repos = await getRepos();
  if (!repos.includes(url)) {
    repos.push(url);
    localStorage.setItem('extension_repos', JSON.stringify(repos));
  }
  return repos;
};

export const removeRepo = async (url) => {
  let repos = await getRepos();
  repos = repos.filter(r => r !== url);
  localStorage.setItem('extension_repos', JSON.stringify(repos));
  return repos;
};

export const getInstalled = async () => {
  try {
    const saved = localStorage.getItem('installed_extensions');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error getting installed extensions:', error);
    return [];
  }
};

export const installExtension = async (extension) => {
  const installed = await getInstalled();
  if (!installed.some(e => e.id === extension.id)) {
    installed.push(extension);
    localStorage.setItem('installed_extensions', JSON.stringify(installed));
  }
  return installed;
};

export const removeExtension = async (id) => {
  let installed = await getInstalled();
  installed = installed.filter(e => e.id !== id);
  localStorage.setItem('installed_extensions', JSON.stringify(installed));
  return installed;
};

export const loadAllPlugins = async () => {
  const installed = await getInstalled();
  return installed;
};
