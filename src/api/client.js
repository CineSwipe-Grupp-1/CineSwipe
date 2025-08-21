const TMDB_BASE = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;

function buildUrl(path, params = {}) {
  const url = new URL(`${TMDB_BASE}${path}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "sv-SE");
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  });
  return url.toString();
}

export async function fetchJson(path, params) {
  const res = await fetch(buildUrl(path, params));
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  return res.json();
}
