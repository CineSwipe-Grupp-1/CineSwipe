import { useEffect, useRef } from 'react';
import '../styles/Modal.css';

const MovieModal = ({ movie, onClose }) => {
  const closeRef = useRef(null);
  if (!movie) return null;

  console.log(movie);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className='movie-modal-overlay'
      role='dialog'
      aria-modal='true'
      aria-labelledby='movie-modal-title'
      onClick={onClose}
    >
      <div
        className='movie-modal-content'
        role='document'
        onClick={e => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          className='movie-modal-close'
          type='button'
          title='Stäng modal'
          onClick={onClose}
          aria-label='Stäng modal'
        >
          ×
        </button>
        <h2 id='movie-modal-title'>{movie.title}</h2>
        <img
          className='movie-modal-poster'
          src={movie.posterUrl}
          alt={`Poster för ${movie.title}${
            movie.year ? ` (${movie.year})` : ''
          }`}
          loading='lazy'
          decoding='async'
        />
        <p>
          <strong>Beskrivning:</strong>{' '}
          {movie.overview || 'Ingen beskrivning tillgänglig'}
        </p>
        <p>
          <strong>Betygssättning:</strong>{' '}
          {movie.rating || 'Ingen betygssättning tillgänglig'}
        </p>
        <p>
          <strong>År:</strong> {movie.year || 'Inget år tillgängligt'}
        </p>
        <p>
          <strong>Släppt Datum:</strong>{' '}
          {movie.releaseDate || 'Inget releasdatum tillgängligt'}
        </p>
      </div>
    </div>
  );
};

export default MovieModal;
