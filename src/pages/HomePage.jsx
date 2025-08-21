import { useMemo } from 'react';
import { mockData } from '../components/App';
import { mapMovie } from '../lib/tmdbAdapter';
import { useSwipeDeck } from '../lib/useSwipeDeck';
import { SwipeLayer } from '../components/SwipeLayer';
import { MovieCard } from '../components/MovieCard';
import { SideArrows } from '../components/SideArrows';

export function HomePage() {
  const movies = useMemo(() => mockData.map(mapMovie), []);
  const { current, like, dismiss, prev, next, canPrev, canNext } = useSwipeDeck(
    movies,
    { wrap: true }
  );

  if (!current) return <p>Tom kortlek</p>;

  return (
    <div className='deck'>
      <SideArrows
        onLeft={dismiss}
        onRight={like}
        canLeft={canPrev}
        canRight={canNext}
      />
      <SwipeLayer onSwipeLeft={dismiss} onSwipeRight={like}>
        <MovieCard movie={current} />
      </SwipeLayer>
    </div>
  );
}
