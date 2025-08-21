import { mockData } from '../components/App';
import { mapMovie } from '../lib/tmdbAdapter';

export const HomePage = () => {
  const movies = mockData.map(mapMovie);

  return (
    <div>
      {movies.map(movie => (
        <div key={movie.id}>
          <img src={movie.posterUrl} alt={movie.title} />
          <h3>
            {movie.title} ({movie.year})
          </h3>
          <p>⭐ {movie.rating}</p>
        </div>
      ))}
    </div>
  );
};
