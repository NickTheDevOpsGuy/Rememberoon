import type { Card } from '@/types/game';

// Tiny MVP: 8 icons → 16 cards (pairs). Change/expand later.
const ICONS = ['🦝','🍪','🧤','🔦','🗑️','♻️','🌙','🧰'];

export function generateDeck(): Card[] {
  const pairs = ICONS.flatMap((icon, i) => ([
    { id: `${i}-A`, icon, isFlipped: false, isMatched: false },
    { id: `${i}-B`, icon, isFlipped: false, isMatched: false },
  ]));
  // Fisher–Yates shuffle
  for (let j = pairs.length - 1; j > 0; j--) {
    const k = Math.floor(Math.random() * (j + 1));
    [pairs[j], pairs[k]] = [pairs[k], pairs[j]];
  }
  return pairs;
}