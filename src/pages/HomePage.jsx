import { useEffect, useRef, useState } from 'react';
import { getTrending } from '../api/tmdb';
import { mapMovie } from '../lib/tmdbAdapter';
import { useSwipeNav } from '../lib/useSwipeNav';
import { StackedDeck } from '../components/StackedDeck';
import { MovieCard } from '../components/MovieCard';
import { addToWatchlist } from '../lib/storage';
import MovieModal from '../components/MovieModal';
import { NotifyAdded } from '../components/Toaster';
import { HeartButton } from '../components/HeartButton';
import { XButton } from '../components/XButton';
import { StateGate } from '../components/StateGate';

const SWIPED_KEY = 'cinSwipe_swiped_v1';
function loadSwiped() {
  try {
    const raw = sessionStorage.getItem(SWIPED_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}
function persistSwiped(set) {
  try {
    sessionStorage.setItem(SWIPED_KEY, JSON.stringify(Array.from(set)));
  } catch {}
}

export function HomePage() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('loading');
  const [modalMovie, setModalMovie] = useState(null);

  const seenIds = useRef(new Set());
  const swipedIds = useRef(loadSwiped());
  const pageRef = useRef(1);
  const loadingMore = useRef(false);

  async function fetchPage(page, { isFirst = false } = {}) {
    if (loadingMore.current) return;
    loadingMore.current = true;

    try {
      if (isFirst) setStatus('loading');
      const data = await getTrending({
        mediaType: 'all',
        timeWindow: 'week',
        page,
      });
      const mapped = (data?.results ?? [])
        .map(mapMovie)
        .filter(m => m.posterUrl);

      const unique = mapped.filter(
        m => !swipedIds.current.has(m.id) && !seenIds.current.has(m.id)
      );
      unique.forEach(m => seenIds.current.add(m.id));

      setMovies(prev => [...prev, ...unique]);
      if (isFirst) setStatus('ready');
    } catch (e) {
      console.error(e);
      if (isFirst) setStatus('error');
    } finally {
      loadingMore.current = false;
    }
  }

  useEffect(() => {
    fetchPage(pageRef.current, { isFirst: true });
  }, []);

  useEffect(() => {
    if (status !== 'ready') return;
    if (movies.length <= 5) {
      pageRef.current += 1;
      fetchPage(pageRef.current);
    }
  }, [movies.length, status]);

  const { current, index } = useSwipeNav(movies, { wrap: false });

  const visible = movies.slice(index, index + 3);

  const dropCurrent = () => {
    swipedIds.current.add(current.id);
    persistSwiped(swipedIds.current);
    setMovies(prev => prev.filter(m => m.id !== current.id));
  };

  const likeCurrent = () => {
    const movie = current;
    addToWatchlist(movie);
    NotifyAdded(movie);
    dropCurrent();
  };

  const dismissCurrent = () => {
    dropCurrent();
  };

  const openModal = movie => setModalMovie(movie);
  const closeModal = () => setModalMovie(null);

  return (
    <div className='page-center'>
      <StateGate
        status={status}
        loading={<p>Laddar trending…</p>}
        errorMessage='Oj! Kunde inte hämta trending just nu.'
        onRetry={() => fetchPage((pageRef.current = 1), { isFirst: true })}
      />

      {!current ? (
        <p>Inga filmer</p>
      ) : (
        <>
          <div className='swipe-wrap'>
            <StackedDeck
              items={visible}
              onSwipeLeft={dismissCurrent}
              onSwipeRight={likeCurrent}
              renderCard={m => <MovieCard movie={m} />}
            />

            {/* Kontrollpanel */}
            <div className='controls' role='group' aria-label='Kortkontroller'>
              <XButton onClick={dismissCurrent} data-cy='heart-btn' />
              <button
                onClick={() => openModal(current)}
                className='info-btn'
                aria-label='Mer info'
              >
                ℹ️
              </button>{' '}
              <HeartButton onClick={likeCurrent} data-cy='heart-btn' />
            </div>
          </div>

          {modalMovie && <MovieModal movie={modalMovie} onClose={closeModal} />}
        </>
      )}
    </div>
  );
}
