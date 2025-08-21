//Gör base‑URL och storlek konfigurerbar så man kan byta storlek på olika sidor:
const IMAGE_BASE = 'https://image.tmdb.org/t/p/';

export function buildPosterUrl(path, size = 'w500') {
  return path ? `${IMAGE_BASE}${size}${path}` : null;
}

// Den här adapterfunktionen mapMovie: översätter "rådata" från TMDB API till ett enklare, UI-vänligt format.
export function mapMovie(movie) {
  //TMDB kan ge first_air_date för serier, säkrar upp för detta här:
  const rd = movie.release_date ?? movie.first_air_date ?? null;
  return {
    id: movie.id,
    title: movie.title ?? movie.name ?? 'untitled',
    year: rd?.slice(0, 4),
    releaseDate: movie.release_date,
    posterUrl: buildPosterUrl(movie.poster_path, 'w500'),
    rating: Number(movie.vote_average.toFixed(1)),
    overview: movie.overview ?? '',
    language: movie.original_language,
  };
}
