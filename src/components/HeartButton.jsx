<<<<<<< HEAD
export function HeartButton({ onClick, ...props }) {
  return (
    <button
      type="button"
      className="heart-button"
      aria-label="Lägg till i watchlist"
      data-cy="heart-btn"
      onClick={onClick}
      {...props}
=======
import './../styles/HeartButton.css';

export function HeartButton({ onClick }) {
  return (
    <button
      className='heart-button'
      onClick={onClick}
      aria-label='Add to Watchlist'
>>>>>>> 08a56e67b345fafe884db57a9e5af453a4505bc8
    >
      ❤️
    </button>
  );
}
