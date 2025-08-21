import { mockData } from '../components/App';
import { mapMovie } from '../lib/tmdbAdapter';

export const HomePage = () => {
  useEffect(() => {
    let mounted = true;
    async function load() {
      setStatus('loading');
      try {
        if (USE_MOCK) {
          const ui = mockData.map(mapMovie);
          if (mounted) {
            setMovies(ui);
            setStatus('success');
          }
          return;
        }
        const data = await getTrendingMovies(1); // ← OBS: siffra, inte objekt
        const ui = (data.results ?? []).map(mapMovie);
        if (mounted) {
          setMovies(ui);
          setStatus('success');
        }
      } catch (e) {
        console.error(e);
        const ui = mockData.map(mapMovie); // fallback
        if (mounted) {
          setMovies(ui);
          setStatus('success');
        }
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [mockData]);

  return (
    <div>
      {movies.map(m => (
        <div key={m.id}>
          <img src={m.posterUrl} alt={m.title} />
          <h3>
            {m.title} ({m.year})
          </h3>
          <p>⭐ {m.rating}</p>
        </div>
      ))}
    </div>
  );
};
