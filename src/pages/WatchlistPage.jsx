import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/WatchlistPage.css';
import {
  clearWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from '../lib/storage';
import MovieModal from '../components/MovieModal';

export function WatchlistPage() {
  const [movies, setMovies] = useState([]);
  const [modalMovie, setModalMovie] = useState(null);

  const openModal = movie => setModalMovie(movie);
  const closeModal = () => setModalMovie(null);

  useEffect(() => {
    setMovies(getWatchlist());
  }, []);

  const handleRemove = id => {
    removeFromWatchlist(id);
    setMovies(getWatchlist());
  };

  const handleClear = () => {
    clearWatchlist();
    setMovies([]);
  };

  // ✅ Head alltid med – även i tomt-läge
  const Head = (
    <>
      <title>CineSwipe – Din watchlist</title>
      <meta
        name='description'
        content='Se alla filmer du gillat och planerar att titta på.'
      />
      <link rel='canonical' href='http://localhost:5173/watchlist' />
      <meta property='og:url' content='http://localhost:5173/watchlist' />
      <meta property='og:title' content='CineSwipe – Din watchlist' />
      <meta
        property='og:description'
        content='Se alla filmer du gillat och planerar att titta på.'
      />
    </>
  );

  if (!movies || movies.length === 0) {
    return (
      <div className='watchlist-page' data-cy='watchlist-page'>
        {Head}
        <h1>Min filmlista</h1>
        <p>Din lista är tom 👀</p>
        <p>
          Gå till <Link to='/'>Home</Link> och lägg till filmer genom att swipa
          höger eller trycka “Lägg till”.
        </p>
      </div>
    );
  }

  return (
    <div className='watchlist-page'>
      {Head}
      <div className='watchlist-header'>
        <h1>Min filmlista</h1>
        <div className='header-div'>
          <button className='remove-btn' onClick={() => handleClear()}>
            ❌ Rensa Filmer
          </button>
          <span className='watchlist-count'>{movies.length} filmer</span>
        </div>
      </div>

      <div className='watchlist-container'>
        {movies.map(movie => (
          <div key={movie.id} className='movie-card-list'>
            {movie.posterUrl ? (
              <img
                src={movie.posterUrl}
                alt={'Poster för ' + movie.title}
                className='movie-poster'
                loading='lazy'
              />
            ) : (
              <div className='movie-poster placeholder'>Ingen bild</div>
            )}

            <div className='movie-info'>
              <h2 className='movie-title'>
                {movie.title} {movie.year ? `(${movie.year})` : ''}
              </h2>

              {movie.releaseDate && (
                <p className='release-date'>Släppt: {movie.releaseDate}</p>
              )}

              {movie.overview && <p className='overview'>{movie.overview}</p>}

              {typeof movie.rating === 'number' && (
                <p className='rating'>⭐ {movie.rating}</p>
              )}

              <div className='actions'>
                <button
                  className='remove-btn'
                  onClick={() => handleRemove(movie.id)}
                  aria-label={`Ta bort ${movie.title} från watchlist`}
                >
                  ❌ Ta bort
                </button>
                <button
                  onClick={() => openModal(movie)}
                  className='info-btn'
                  aria-label='Mer info'
                >
                  ℹ️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modalMovie && <MovieModal movie={modalMovie} onClose={closeModal} />}
    </div>
  );
}
