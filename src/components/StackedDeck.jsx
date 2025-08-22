import "../styles/StackedDeck.css";
import { SwipeLayer } from "./SwipeLayer";

export function StackedDeck({
  items,
  renderCard,
  onSwipeLeft,
  onSwipeRight,
  showArrows = true,
}) {
  const visible = items.slice(0, 3);

  const layers = [
    { scale: 0.92, y: 0, x: 0, rot: 0, z: 30, opacity: 1.0 },
    { scale: 0.82, y: 22, x: -10, rot: -2, z: 20, opacity: 0.92 },
    { scale: 0.74, y: 42, x: 10, rot: 2, z: 10, opacity: 0.85 },
  ];

  return (
    <div className="deck">
      {visible.map((item, i) => {
        const L = layers[i] ?? layers[layers.length - 1];
        const style = {
          transform: `translate(${L.x}px, ${L.y}px) scale(${L.scale}) rotate(${L.rot}deg)`,
          opacity: L.opacity,
          zIndex: L.z,
        };

        if (i === 0) {
          return (
            <div key={item.id} className="deck-card top" style={style}>
              <SwipeLayer onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
                <div className="card-shell">{renderCard(item)}</div>
              </SwipeLayer>
            </div>
          );
        }

        return (
          <div
            key={item.id}
            className="deck-card behind"
            style={style}
            aria-hidden="true"
          >
            <div className="card-shell">{renderCard(item)}</div>
          </div>
        );
      })}

      {showArrows && (
        <div className="arrow-overlay" aria-hidden>
          <span className="arrow left">⬅️</span>
          <span className="arrow right">➡️</span>
        </div>
      )}
    </div>
  );
}
