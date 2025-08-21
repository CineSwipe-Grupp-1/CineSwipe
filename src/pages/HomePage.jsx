import { useMemo } from 'react';
import { mockData } from '../components/App';
import { mapMovie } from '../lib/tmdbAdapter';
import { MovieCard } from '../components/MovieCard';
import { pickOne } from '../lib/shuffle';

export const HomePage = () => {
  const movies = mockData.map(mapMovie);
  const current = useMemo(() => pickOne(movies), [movies]);

  return <div>{current && <MovieCard movie={current} />}</div>;
};
