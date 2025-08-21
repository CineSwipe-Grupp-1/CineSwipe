import { useMemo, useState } from 'react';
import { shuffle } from './shuffle';

/**
 * @param {Array<any>} items  – t.ex. movies.map(mapMovie)
 * @param {{wrap?: boolean}} opts
 */
export function useSwipeDeck(items, opts = {}) {
  const { wrap = true } = opts;

  // 1) Frys ordningen en gång per items-ändring
  const deck = useMemo(() => shuffle(items), [items]);

  // 2) Pekare & valfria listor
  const [cursor, setCursor] = useState(0);
  const [likedIds, setLiked] = useState(() => new Set());
  const [dismissedIds, setDismissed] = useState(() => new Set());

  const current = deck.length ? deck[cursor] : null;

  // 3) Stegning
  function next() {
    if (!deck.length) return;
    if (wrap) setCursor(i => (i + 1) % deck.length);
    else setCursor(i => Math.min(deck.length - 1, i + 1));
  }
  function prev() {
    if (!deck.length) return;
    if (wrap) setCursor(i => (i - 1 + deck.length) % deck.length);
    else setCursor(i => Math.max(0, i - 1));
  }

  // 4) Domänhandlingar
  function like() {
    if (!current) return;
    setLiked(s => new Set(s).add(current.id));
    next();
  }
  function dismiss() {
    if (!current) return;
    setDismissed(s => new Set(s).add(current.id));
    next();
  }

  const canPrev = wrap ? deck.length > 1 : cursor > 0;
  const canNext = wrap ? deck.length > 1 : cursor < deck.length - 1;

  return {
    current,
    like,
    dismiss,
    prev,
    next,
    canPrev,
    canNext,
    likedIds,
    dismissedIds,
  };
}
