import { useRef, useState } from 'react';

export function SwipeLayer({ children, onSwipeLeft, onSwipeRight, threshold = 80 }) {
  const startX = useRef(0);
  const [dx, setDx] = useState(0);

  function onPointerDown(e) {
    e.currentTarget.setPointerCapture(e.pointerId);
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  }
  function onPointerMove(e) {
    if (startX.current === 0) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    setDx(x - startX.current);
  }
  function onPointerUp() {
    if (Math.abs(dx) > threshold) {
      dx > 0 ? onSwipeRight?.() : onSwipeLeft?.();
    }
    // reset (snap back)
    startX.current = 0;
    setDx(0);
  }

  // enkel visuell feedback när man drar
  const style = {
    transform: `translateX(${dx}px) rotate(${dx * 0.05}deg)`,
    transition: startX.current ? 'none' : 'transform 150ms ease',
    touchAction: 'pan-y', // tillåt vertikal scroll
    willChange: 'transform',
  };

  return (
    <div
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {children}
    </div>
  );
}
