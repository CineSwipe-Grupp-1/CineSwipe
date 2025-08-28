import { fetchJson } from './client';

export async function getTrending({
  page = 1,
  mediaType = 'all',
  timeWindow = 'week',
} = {}) {
  // Endast i development, trigga fel med ?forceError för att testa felhantering i UI:et
  // I browsern lägg till ?forceError i URL:en (http://localhost:5173/?forceError)
  if (
    import.meta.env.DEV &&
    new URLSearchParams(window.location.search).has('forceError')
  ) {
    throw new Error('Testfel: forced');
  }

  return fetchJson(`/trending/${mediaType}/${timeWindow}`, { page });
}
