import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/WatchlistPage.css";
import { getWatchlist, removeFromWatchlist } from "../lib/storage";

export function WatchlistPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(getWatchlist());
  }, []);

  const handleRemove = (id) => {
    removeFromWatchlist(id);
    setMovies(getWatchlist());
  };

  if (!movies || movies.length === 0) {
    return (
      <div className="watchlist-page">
        <h2>My Watchlist</h2>
        <p>Din lista är tom 👀</p>
        <p>
          Gå till <Link to="/HomePage">Home</Link> och lägg till filmer genom
          att swipa höger eller trycka “Lägg till”.
        </p>
      </div>
    );
  }

  return (
    <div className="watchlist-page">
      <div className="watchlist-header">
        <h2>My Watchlist</h2>
        <span className="watchlist-count">{movies.length} filmer</span>
      </div>

      <div className="watchlist-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            {movie.posterUrl ? (
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="movie-poster"
                loading="lazy"
              />
            ) : (
              <div className="movie-poster placeholder">Ingen bild</div>
            )}

            <div className="movie-info">
              <h3 className="movie-title">
                {movie.title} {movie.year ? `(${movie.year})` : ""}
              </h3>

              {movie.releaseDate && (
                <p className="release-date">Release: {movie.releaseDate}</p>
              )}

              {movie.overview && <p className="overview">{movie.overview}</p>}

              {typeof movie.rating === "number" && (
                <p className="rating">⭐ {movie.rating}</p>
              )}

              <div className="actions">
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(movie.id)}
                  aria-label={`Ta bort ${movie.title} från watchlist`}
                >
                  ❌ Ta bort
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
