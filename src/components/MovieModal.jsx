import "../styles/Modal.css";

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  console.log(movie);

  return (
    <div className="movie-modal-overlay" onClick={onClose}>
      <div className="movie-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="movie-modal-close"
          onClick={onClose}
          aria-label="close modal"
        >
          ×
        </button>
        <h2>{movie.title}</h2>
        <img
          className="movie-modal-poster"
          src={movie.posterUrl}
          alt={movie.title}
        />
        <p>
          <strong>Beskrivning:</strong>{" "}
          {movie.overview || "Ingen beskrivning tillgänglig"}
        </p>
        <p>
          <strong>Betygssättning:</strong>{" "}
          {movie.rating || "Ingen betygssättning tillgänglig"}
        </p>
        <p>
          <strong>År:</strong> {movie.year || "Inget år tillgängligt"}
        </p>
        <p>
          <strong>Släppt Datum:</strong>{" "}
          {movie.releaseDate || "Inget releasdatum tillgängligt"}
        </p>
      </div>
    </div>
  );
};

export default MovieModal;
