const STORAGE_KEY = "cinSwipe_watchlist";

export function getWatchlist() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addToWatchlist(movie) {
  const current = getWatchlist();
  const exists = current.some((m) => m.id === movie.id);
  if (!exists) {
    const updated = [...current, movie];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
}

export function removeFromWatchlist(id) {
  const current = getWatchlist();
  const updated = current.filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
