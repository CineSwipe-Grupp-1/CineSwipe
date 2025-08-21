import { useEffect, useMemo, useState } from "react";
import { getTrending } from "../api/tmdb";
import { mapMovie } from "../lib/tmdbAdapter";
import { MovieCard } from "../components/MovieCard";
import { pickOne } from "../lib/shuffle";

export const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let alive = true;
    (async () => {
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
        if (alive) {
          setMovies(mapped);
          setStatus("ready");
        }
      } catch (e) {
        console.error(e);
        if (alive) setStatus("error");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const current = useMemo(() => pickOne(movies), [movies]);

  if (status === "loading") return <div>Laddar trending…</div>;
  if (status === "error")
    return (
      <div className="error-card">
        <p>Oj! Kunde inte hämta trending just nu.</p>
        <button onClick={() => location.reload()}>Försök igen</button>
      </div>
    );

  return <div>{current && <MovieCard movie={current} />}</div>;
};
