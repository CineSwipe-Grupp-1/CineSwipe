import { useEffect, useState } from "react";
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

  const likeCurrent = () => {
    addToWatchlist(current);
    next();
  };
  const dismissCurrent = () => next();

  const closeModal = () => {
    setModalMovie(null);
  };

  const openModal = (movie) => {
    setModalMovie(movie);
  };

  return (
    <div className="page-center">
      <div className="swipe-wrap">
        <SwipeLayer onSwipeLeft={dismissCurrent} onSwipeRight={likeCurrent}>
          <MovieCard
            movie={current}

            /* onLike={likeCurrent} (senare) */
          />
        </SwipeLayer>

        <button
          onClick={() => openModal(current)}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 10,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "50%",
            width: 40,
            height: 40,
            fontSize: 20,
            cursor: "pointer",
          }}
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
