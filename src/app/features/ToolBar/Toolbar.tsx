import type { GameState, GameDispatch } from '@/types/game';
import { useGameTimer } from '@/hooks/useGameTimer';

type Props = { state: GameState; dispatch: GameDispatch };

export function Toolbar({ state, dispatch }: Props) {
  const secs = useGameTimer(state);

  // derive total pairs from deck length
  const totalPairs = state.deck.length / 2;

  return (
    <div className="flex flex-wrap gap-6 mb-4 items-center justify-center text-sm sm:text-base">
      <span>🕹️ Moves: {state.moves}</span>
      <span>⏱️ Time: {secs}s</span>
      <span>💚 Matches: {state.matchedPairs}/{totalPairs}</span> {/* 👈 new */}
      <button
        onClick={() => dispatch({ type: 'RESET' })}
        className="border px-2 py-1 rounded hover:bg-gray-100 transition"
      >
        Reset
      </button>
    </div>
  );
}