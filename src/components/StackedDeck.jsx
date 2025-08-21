import "../styles/StackedDeck.css";
import { SwipeLayer } from "./SwipeLayer";

export function StackedDeck({ items, renderCard, onSwipeLeft, onSwipeRight }) {
  const visible = items.slice(0, 3);

  return (
    <div className="deck">
      {visible.map((item, i) => {
        const depth = i;
        const style = {
          transform: `translateY(${depth * 14}px) scale(${1 - depth * 0.06})`,
          opacity: 1 - depth * 0.08,
          zIndex: 3 - depth,
        };

        if (i === 0) {
          return (
            <div key={item.id} className="deck-card top" style={style}>
              <SwipeLayer onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight}>
                {renderCard(item)}
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
    </div>
  );
}
