import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/WatchlistPage.css";
import {
  clearWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../lib/storage";
import MovieModal from "../components/MovieModal";

export function WatchlistPage() {
  const [movies, setMovies] = useState([]);
  const [modalMovie, setModalMovie] = useState(null);

  const openModal = (movie) => setModalMovie(movie);
  const closeModal = () => setModalMovie(null);

  useEffect(() => {
    setMovies(getWatchlist());
  }, []);

  const handleRemove = (id) => {
    removeFromWatchlist(id);
    setMovies(getWatchlist());
  };

  const handleClear = () => {
    clearWatchlist();
    setMovies([]);
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
        <div className="header-div">
          <button className="remove-btn" onClick={() => handleClear()}>
            ❌ Rensa Filmer
          </button>
          <span className="watchlist-count">{movies.length} filmer</span>
        </div>
      </div>

      <div className="watchlist-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card-list">
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
                <button
                  onClick={() => openModal(movie)}
                  className="info-btn"
                  aria-label="Mer info"
                >
                  ℹ️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modalMovie && <MovieModal movie={modalMovie} onClose={closeModal} />}
    </div>
  );
}
