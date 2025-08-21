import { useEffect, useState } from "react";
import { getTrending } from "../api/tmdb";
import { mapMovie } from "../lib/tmdbAdapter";
import { useSwipeNav } from "../lib/useSwipeNav";
import { SwipeLayer } from "../components/SwipeLayer";
import { MovieCard } from "../components/MovieCard";

export function HomePage() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading");
  async function fetchTrending() {
    try {
      setStatus("loading");
      const data = await getTrending({
        mediaType: "all",
        timeWindow: "week",
        page: 1,
      });
      const mapped = (data?.results ?? [])
        .map(mapMovie)
        .filter((m) => m.posterUrl);
      setMovies(mapped);
      setStatus("ready");
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  }

  useEffect(() => {
    fetchTrending();
  }, []);

  const { current, prev, next } = useSwipeNav(movies, { wrap: true });

  if (status === "loading") return <div>Laddar trending…</div>;
  if (status === "error")
    return (
      <div className="error-card">
        <p>Oj! Kunde inte hämta trending just nu.</p>
        <button onClick={fetchTrending}>Försök igen</button>
      </div>
    );

  if (!current) return <p>Inga filmer</p>;

  return (
    <div className="page-center">
      <div className="swipe-wrap">
        <SwipeLayer onSwipeLeft={prev} onSwipeRight={next}>
          <MovieCard movie={current} />
        </SwipeLayer>

        <div className="arrow-overlay" aria-hidden>
          <span className="arrow left">⬅️</span>
          <span className="arrow right">➡️</span>
        </div>
      </div>
    </div>
  );
}
