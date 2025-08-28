import { addToWatchlist } from '../lib/storage';

export const MovieCard = ({ movie }) => {
  const title = movie?.title || movie?.name || 'Okänd titel';
  const year = movie?.year ? ` (${movie.year})` : '';
  const handleLike = () => {
    addToWatchlist(movie);
    alert(`${title} tillagd i din filmlista!`);
  };

  return (
    <section className='movie-card'>
      {movie.posterUrl ? (
        <img
          src={movie.posterUrl}
          alt={`Poster för ${title}${year}`}
          loading='lazy'
          decoding='async'
          width={300} // hjälp layouten (valfritt, men bra)
          height={450} // hjälp layouten
          draggable={false}
          onDragStart={e => e.preventDefault()}
        />
      ) : (
        <img
          src='/placeholder-poster.svg'
          alt={`Ingen poster tillgänglig för ${title}${year}`}
          loading='lazy'
          decoding='async'
          width={300}
          height={450}
          draggable={false}
        />
      )}
      <br />
    </section>
  );
};
