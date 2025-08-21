import React from "react";
import "../styles/WatchlistPage.css";
import { mockData } from "../components/App"; 

export function WatchlistPage() {
  // Take only the first 4 movies
  const movies = mockData.slice(0, 4);

  return (
    <div className="watchlist-page">
      <h2>My Watchlist</h2>
      <div className="watchlist-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card-list">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p className="release-date">Release: {movie.release_date}</p>
              <p className="overview">{movie.overview}</p>
              <p className="rating">
                ⭐ {movie.vote_average} / {movie.vote_count} votes
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
