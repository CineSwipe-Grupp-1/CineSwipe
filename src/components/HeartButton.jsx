export function HeartButton({ onClick, ...props }) {
  return (
    <button
      type="button"
      className="heart-button"
      aria-label="Lägg till i watchlist"
      data-cy="heart-btn"
      onClick={onClick}
      {...props}
    >
      ❤️
    </button>
  );
}
