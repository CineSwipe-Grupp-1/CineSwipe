import { addToWatchlist } from "../lib/storage";

export const MovieCard = ({ movie }) => {
  const handleLike = () => {
    addToWatchlist(movie);
    alert(`${movie.title} tillagd i din watchlist!`);
  };

  return (
    <section>
      <img
        src={movie.posterUrl}
        alt={movie.title}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      />

      <br></br>
    </section>
  );
};
