// components/SwipeLayer.jsx
import { useRef, useState } from 'react';

export function SwipeLayer({
  children,
  onSwipeLeft,
  onSwipeRight,
  threshold = 80,
}) {
  const startX = useRef(null);
  const [dx, setDx] = useState(0);

  function onPointerDown(e) {
    e.currentTarget.setPointerCapture(e.pointerId);
    startX.current = e.clientX;
  }
  function onPointerMove(e) {
    if (startX.current == null) return;
    setDx(e.clientX - startX.current);
  }
  function onPointerUp() {
    if (Math.abs(dx) > threshold) {
      dx > 0 ? onSwipeRight?.() : onSwipeLeft?.();
    }
    startX.current = null;
    setDx(0);
  }

  const style = {
    transform: `translateX(${dx}px)`,
    transition: startX.current == null ? 'transform 150ms ease' : 'none',
    touchAction: 'pan-y',
    userSelect: 'none',
    willChange: 'transform',
  };

  return (
    <div
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDragStart={e => e.preventDefault()}
    >
      {children}
    </div>
  );
}
