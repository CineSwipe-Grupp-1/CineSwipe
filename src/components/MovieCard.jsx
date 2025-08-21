export const MovieCard = ({ movie }) => {
  return (
    <div>
      <img src={movie.posterUrl} alt={movie.title} />
      <h3>
        {movie.title} ({movie.year})
      </h3>
      <p>⭐ {movie.rating}</p>
    </div>
  );
};
