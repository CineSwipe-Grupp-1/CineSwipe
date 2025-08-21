import { useEffect, useRef, useState } from "react";
import { getTrending } from "../api/tmdb";
import { mapMovie } from "../lib/tmdbAdapter";
import { useSwipeNav } from "../lib/useSwipeNav";
import { StackedDeck } from "../components/StackedDeck";
import { MovieCard } from "../components/MovieCard";
import { addToWatchlist } from "../lib/storage";
import MovieModal from "../components/MovieModal";

// --- Session-persistens av swipes (så att kort inte kommer tillbaka när man lämnar sidan) ---
const SWIPED_KEY = "cinSwipe_swiped_v1";
function loadSwiped() {
  try {
    const raw = sessionStorage.getItem(SWIPED_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}
function persistSwiped(set) {
  try {
    sessionStorage.setItem(SWIPED_KEY, JSON.stringify(Array.from(set)));
  } catch {}
}

export function HomePage() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [modalMovie, setModalMovie] = useState(null);

  // För att undvika dubbletter och hålla koll på sida
  const seenIds = useRef(new Set());
  const swipedIds = useRef(loadSwiped());
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

      // 1) ta bort redan swipade (persistens mellan navigationer)
      // 2) ta bort dubbletter mellan sidor i samma session
      const unique = mapped.filter(
        (m) => !swipedIds.current.has(m.id) && !seenIds.current.has(m.id)
      );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prefetcha nästa sida när det är få kort kvar
  useEffect(() => {
    if (status !== "ready") return;
    if (movies.length <= 5) {
      pageRef.current += 1;
      fetchPage(pageRef.current);
    }
  }, [movies.length, status]);

  // Ingen wrap så vi inte loopar tillbaka
  const { current, index } = useSwipeNav(movies, { wrap: false });

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

  // Visa översta + två bakom
  const visible = movies.slice(index, index + 3);

  // När ett kort försvinner, markera id:t som swipat och spara i sessionStorage
  const dropCurrent = () => {
    swipedIds.current.add(current.id);
    persistSwiped(swipedIds.current);
    setMovies((prev) => prev.filter((m) => m.id !== current.id));
  };

  const likeCurrent = () => {
    addToWatchlist(current);
    dropCurrent();
  };

  const dismissCurrent = () => {
    dropCurrent();
  };

  const openModal = (movie) => setModalMovie(movie);
  const closeModal = () => setModalMovie(null);

  return (
    <div className="page-center">
      <div className="swipe-wrap" style={{ position: "relative" }}>
        <StackedDeck
          items={visible}
          onSwipeLeft={dismissCurrent}
          onSwipeRight={likeCurrent}
          renderCard={(m) => <MovieCard movie={m} />}
        />

        {/* PILAR – läggs ovanpå korten men med pointer-events: none så navbaren funkar */}
        <div
          className="arrow-overlay"
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 8px",
            pointerEvents: "none",
            zIndex: 10, // över korten, långt under navbarens 9999
          }}
        >
          <span
            className="arrow left"
            style={{ fontSize: "2rem", opacity: 0.8 }}
          >
            ⬅️
          </span>
          <span
            className="arrow right"
            style={{ fontSize: "2rem", opacity: 0.8 }}
          >
            ➡️
          </span>
        </div>

        {/* Info-knapp (valfritt) */}
        <button
          onClick={() => openModal(current)}
          className="info-btn"
          aria-label="Mer info"
          style={{
            position: "absolute",
            right: 12,
            bottom: 12,
            zIndex: 11,
          }}
        >
          ℹ️
        </button>
      </div>

      {modalMovie && <MovieModal movie={modalMovie} onClose={closeModal} />}
    </div>
  );
}
