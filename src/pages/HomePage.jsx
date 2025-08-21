import { mockData } from '../components/App';
import { mapMovie } from '../lib/tmdbAdapter';
import { MovieCard } from '../components/MovieCard';

export const HomePage = () => {
  const movies = mockData.map(mapMovie);

  return (
    <div>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
