// pages/HomePage.jsx
import { useMemo } from 'react';
import { mockData } from '../components/App';
import { mapMovie } from '../lib/tmdbAdapter';
import { useSwipeNav } from '../lib/useSwipeNav';
import { SwipeLayer } from '../components/SwipeLayer';
import { MovieCard } from '../components/MovieCard';

export function HomePage() {
  const movies = useMemo(() => mockData.map(mapMovie), []);
  const { current, prev, next } = useSwipeNav(movies, { wrap: true });

  if (!current) return <p>Inga filmer</p>;

  return (
    <div className='page-center'>
      <div className='swipe-wrap'>
        <SwipeLayer onSwipeLeft={prev} onSwipeRight={next}>
          <MovieCard movie={current} />
        </SwipeLayer>

        <div className='arrow-overlay' aria-hidden>
          <span className='arrow left'>⬅️</span>
          <span className='arrow right'>➡️</span>
        </div>
      </div>
    </div>
  );
}
