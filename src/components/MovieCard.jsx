import { addToWatchlist } from '../lib/storage';

export const MovieCard = ({ movie }) => {
  const handleLike = () => {
    addToWatchlist(movie);
    alert(`${movie.title} tillagd i din watchlist!`);
  };

  return (
    <div>
      <img
        src={movie.posterUrl}
        alt={movie.title}
        draggable={false}
        onDragStart={e => e.preventDefault()}
      />
      <br></br>

      <button onClick={handleLike}>👍 Lägg till</button>
    </div>
  );
};
