export function HeartButton({
  onClick,
  className = '',
  'aria-label': ariaLabel = 'Lägg till i watchlist',
  ...props
}) {
  return (
    <button
      type='button'
      className={`heart-button ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      title={ariaLabel}
      {...props}
    >
      ❤️
    </button>
  );
}
