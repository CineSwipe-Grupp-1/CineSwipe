// lib/useSwipeNav.js
import { useState } from 'react';

export function useSwipeNav(items, { wrap = true, startIndex = 0 } = {}) {
  const count = items?.length ?? 0;
  const [index, setIndex] = useState(() => {
    if (!count) return 0;
    return Math.min(Math.max(startIndex, 0), count - 1);
  });

  const current = count ? items[index] : null;

  const next = () => {
    if (!count) return;
    setIndex(i => (wrap ? (i + 1) % count : Math.min(count - 1, i + 1)));
  };

  const prev = () => {
    if (!count) return;
    setIndex(i => (wrap ? (i - 1 + count) % count : Math.max(0, i - 1)));
  };

  const canPrev = wrap ? count > 1 : index > 0;
  const canNext = wrap ? count > 1 : index < count - 1;

  return { current, index, prev, next, canPrev, canNext };
}
