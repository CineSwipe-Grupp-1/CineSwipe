import { useEffect, useRef, useState } from "react";
import { getTrending } from "../api/tmdb";
import { mapMovie } from "../lib/tmdbAdapter";
import { useSwipeNav } from "../lib/useSwipeNav";
import { SwipeLayer } from "../components/SwipeLayer";
import { MovieCard } from "../components/MovieCard";
import { addToWatchlist } from "../lib/storage";
import MovieModal from "../components/MovieModal";

export function HomePage() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading");
  const [modalMovie, setModalMovie] = useState(null);
  const seenIds = useRef(new Set());
  const pageRef = useRef(1);
  const loadingMore = useRef(false);

  async function fetchPage(page, { isFirst = false } = {}) {
    if (loadingMore.current) return;
    loadingMore.current = true;
    try {
      if (isFirst) setStatus("loading");
      const data = await getTrending({
        mediaType: "all",
        timeWindow: "week",
        page,
      });

      const mapped = (data?.results ?? [])
        .map(mapMovie)
        .filter((m) => m.posterUrl);

      const unique = mapped.filter((m) => !seenIds.current.has(m.id));
      unique.forEach((m) => seenIds.current.add(m.id));

      setMovies((prev) => [...prev, ...unique]);

      if (isFirst) setStatus("ready");
    } catch (e) {
      console.error(e);
      if (isFirst) setStatus("error");
    } finally {
      loadingMore.current = false;
    }
  }

  useEffect(() => {
    fetchPage(pageRef.current, { isFirst: true });
  }, []);

  useEffect(() => {
    if (status !== "ready") return;
    if (movies.length <= 5) {
      pageRef.current += 1;
      fetchPage(pageRef.current);
    }
  }, [movies.length, status]);

  const { current } = useSwipeNav(movies, { wrap: false });

  if (status === "loading") return <div>Laddar trending…</div>;
  if (status === "error")
    return (
      <div className="error-card">
        <p>Oj! Kunde inte hämta trending just nu.</p>
        <button
          onClick={() => fetchPage((pageRef.current = 1), { isFirst: true })}
        >
          Försök igen
        </button>
      </div>
    );

  if (!current) return <p>Inga filmer</p>;

  const dropCurrent = () => {
    setMovies((prev) => prev.filter((m) => m.id !== current.id));
  };

  const likeCurrent = () => {
    addToWatchlist(current);
    dropCurrent();
  };

  const dismissCurrent = () => {
    dropCurrent();
  };

  const closeModal = () => setModalMovie(null);
  const openModal = (movie) => setModalMovie(movie);

  return (
    <div className="page-center">
      <div className="swipe-wrap">
        <SwipeLayer onSwipeLeft={dismissCurrent} onSwipeRight={likeCurrent}>
          <MovieCard movie={current} />
        </SwipeLayer>

        <button
          onClick={() => openModal(current)}
          className="info-btn"
          aria-label="Mer info"
        >
          ℹ️
        </button>

        <div className="arrow-overlay" aria-hidden>
          <span className="arrow left">⬅️</span>
          <span className="arrow right">➡️</span>
        </div>
      </div>

      {modalMovie && <MovieModal movie={modalMovie} onClose={closeModal} />}
    </div>
  );
}
