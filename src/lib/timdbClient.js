const BASE = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_API_KEY;

async function fetchJson(path, params = {}) {
  const url = new URL(`${BASE}${path}`);
  url.search = new URLSearchParams({
    api_key: API_KEY,
    language: 'sv-SE',
    include_adult: 'false',
    ...params,
  });

  const res = await fetch(url);
  if (!res.ok) throw new Error('TMDB error ' + res.status);
  return res.json();
}

export async function getTrendingMovies(page = 1) {
  return fetchJson('/trending/movie/week', { page });
}
