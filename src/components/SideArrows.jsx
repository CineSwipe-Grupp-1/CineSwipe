// SideArrows.jsx
// Enkel wrapper som lägger pilar på sidorna om sitt innehåll.
// Använd: <SideArrows onLeft={dismiss} onRight={like}><MovieCard .../></SideArrows>

export function SideArrows({
  onLeft,
  onRight,
  canLeft = true,
  canRight = true,
  children,
  className = '',
  leftLabel = 'Dissa (vänster)',
  rightLabel = 'Gilla (höger)',
}) {
  return (
    <div
      className={`side-arrows-wrap ${className}`}
      role='group'
      aria-label='Kortnavigering'
    >
      <button
        type='button'
        className='arrow-btn arrow-left'
        onClick={onLeft}
        disabled={!canLeft}
        aria-label={leftLabel}
      >
        {/* Emoji nu – byt till SVG-ikon senare */}
        <span aria-hidden>⬅️</span>
      </button>

      <div className='side-arrows-content'>{children}</div>

      <button
        type='button'
        className='arrow-btn arrow-right'
        onClick={onRight}
        disabled={!canRight}
        aria-label={rightLabel}
      >
        <span aria-hidden>➡️</span>
      </button>
    </div>
  );
}
