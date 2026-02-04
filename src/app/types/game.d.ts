export interface Card {
  id: string;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  deck: Card[];
  flipped: string[];
  moves: number;
  matchedPairs: number;
  busy: boolean;
  startedAt?: number;
  endedAt?: number;
}

export type GameAction =
  | { type: 'RESET' }
  | { type: 'FLIP_CARD'; payload: { id: string } }
  | { type: 'CHECK_MATCH' }
  | { type: 'HIDE_MISMATCH' }
  | { type: 'WIN' };

export type GameDispatch = (action: GameAction) => void;
