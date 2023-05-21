const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;
const TRENDING_BASE_URL = `${API_BASE_URL}/trending/all/day?api_key=${API_KEY}`;
const SEARCH_BASE_URL = `${API_BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US`;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export {
  SEARCH_BASE_URL,
  TRENDING_BASE_URL,
  API_BASE_URL,
  API_KEY,
  IMAGE_BASE_URL,
};
