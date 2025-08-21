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
          <strong>Description:</strong>{" "}
          {movie.overview || "No description is available."}
        </p>
        <p>
          <strong>Rating:</strong> {movie.rating || "No rating available."}
        </p>
        <p>
          <strong>Year:</strong> {movie.year || "No year available."}
        </p>
        <p>
          <strong>Release Date:</strong>{" "}
          {movie.releaseDate || "No release date available."}
        </p>
      </div>
    </div>
  );
};

export default MovieModal;
