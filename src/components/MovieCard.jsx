import { addToWatchlist } from "../lib/storage";

export const MovieCard = ({ movie }) => {
  const handleLike = () => {
    addToWatchlist(movie);
    alert(`${movie.title} tillagd i din watchlist!`);
  };

  return (
    <div>
      <img src={movie.posterUrl} alt={movie.title} />
      <h3>
        {movie.title} ({movie.year})
      </h3>
      <p>⭐ {movie.rating}</p>

      <button onClick={handleLike}>👍 Lägg till</button>
    </div>
  );
};
