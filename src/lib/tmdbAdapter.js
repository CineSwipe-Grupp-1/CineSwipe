const IMAGE_BASE = "https://image.tmdb.org/t/p/";

export function buildPosterUrl(path, size = "w500") {
  return path ? `${IMAGE_BASE}${size}${path}` : null;
}

export function mapMovie(movie) {
  const rd = movie.release_date ?? movie.first_air_date ?? null;
  return {
    id: movie.id,
    title: movie.title ?? movie.name ?? "untitled",
    year: rd?.slice(0, 4),
    releaseDate: movie.release_date ?? null,
    posterUrl: buildPosterUrl(movie.poster_path, "w500"),
    rating:
      typeof movie.vote_average === "number"
        ? Number(movie.vote_average.toFixed(1))
        : null,
    overview: movie.overview ?? "",
    language: movie.original_language,
  };
}
