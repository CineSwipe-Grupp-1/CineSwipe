export function XButton({
  onClick,
  className = '',
  'aria-label': ariaLabel = 'Avvisa film',
  ...props
}) {
  return (
    <button
      type='button'
      className={`x-button ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      title={ariaLabel}
      {...props}
    >
      ✕
    </button>
  );
}
