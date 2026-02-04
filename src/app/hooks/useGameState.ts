import { useReducer } from 'react';
import { generateDeck } from '@/utils/generateDeck';
import type { GameState, GameAction } from '@/types/game';

const initialState: GameState = {
  deck: generateDeck(),
  flipped: [],
  moves: 0,
  matchedPairs: 0,
  busy: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  // dev trace
  if (import.meta.env.DEV) console.log('🎯', action.type, { flipped: state.flipped, moves: state.moves, busy: state.busy });

  switch (action.type) {
    case 'RESET': {
      return { ...initialState, deck: generateDeck() };
    }

    case 'FLIP_CARD': {
      const id = action.payload.id;

      // Guards
      if (state.busy) return state;
      const target = state.deck.find(c => c.id === id);
      if (!target) return state;
      if (target.isMatched) return state;
      if (state.flipped.includes(id)) return state;
      if (state.flipped.length === 2) return state;

      // Flip immutably
      const deck = state.deck.map(c => c.id === id ? { ...c, isFlipped: true } : c);

      // Push id; count a move on the second flip
      const flipped = [...state.flipped, id];
      const moves = flipped.length === 2 ? state.moves + 1 : state.moves;

      const startedAt = state.startedAt ?? Date.now();
      return { ...state, deck, flipped, moves, startedAt };
    }

    case 'CHECK_MATCH': {
      if (state.flipped.length !== 2) return state;

      const [aId, bId] = state.flipped;
      const a = state.deck.find(c => c.id === aId);
      const b = state.deck.find(c => c.id === bId);
      if (!a || !b) return state;

      if (a.icon === b.icon) {
        const deck = state.deck.map(c =>
          (c.id === aId || c.id === bId) ? { ...c, isMatched: true } : c
        );
        const matchedPairs = state.matchedPairs + 1;
        const allPairs = deck.length / 2;
        const endedAt = matchedPairs === allPairs ? Date.now() : state.endedAt;
        // Clear flipped because match is resolved
        return { ...state, deck, flipped: [], matchedPairs, endedAt };
      }

      // Mismatch: keep the two ids in flipped, lock input
      return { ...state, busy: true };
    }

    case 'HIDE_MISMATCH': {
      // Flip both back down and unlock
      if (state.flipped.length !== 2) return { ...state, busy: false };
      const [aId, bId] = state.flipped;
      const deck = state.deck.map(c =>
        (c.id === aId || c.id === bId) ? { ...c, isFlipped: false } : c
      );
      return { ...state, deck, flipped: [], busy: false };
    }

    case 'WIN': {
      return { ...state, endedAt: Date.now() };
    }

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return { state, dispatch };
}