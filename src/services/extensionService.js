// src/services/extensionService.js

export const getRepos = async () => {
  try {
    // Add your fetching or API logic here, or return your repository data
    const response = await fetch('https://api.github.com/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching repos:', error);
    return [];
  }
};
