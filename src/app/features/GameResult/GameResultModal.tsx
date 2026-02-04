import type { GameState, GameDispatch } from '@/types/game';
import { useEffect, useRef } from 'react';
import { useGameTimer } from '@/hooks/useGameTimer';

type Props = { state: GameState; dispatch: GameDispatch };

export function GameResultModal({ state, dispatch }: Props) {
  const totalPairs = state.deck.length / 2;
  const isWin = totalPairs > 0 && state.matchedPairs === totalPairs;

  // Freeze timer at final value via the hook (it reads startedAt/endedAt)
  const secs = useGameTimer(state);

  // Basic focus management: focus modal on open, restore on close
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isWin) return;
    const prev = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => prev?.focus();
  }, [isWin]);

  if (!isWin) return null;

  const onPlayAgain = () => dispatch({ type: 'RESET' });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="presentation"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-title"
        tabIndex={-1}
        className="relative z-10 w-[92%] max-w-sm rounded-2xl bg-white text-gray-900 p-6 shadow-2xl outline-none
                   dark:bg-gray-900 dark:text-gray-100"
      >
        <h2 id="result-title" className="text-xl font-bold mb-3">
          🎉 You won!
        </h2>

        <div className="space-y-1.5 mb-5 text-sm sm:text-base">
          <p>
            Pairs matched:{' '}
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {state.matchedPairs}
            </span>
            <span className="opacity-70"> / {totalPairs}</span>
          </p>
          <p>
            Moves:{' '}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {state.moves}
            </span>
          </p>
          <p>
            Time:{' '}
            <span className="font-semibold text-amber-600 dark:text-amber-400">
              {secs}s
            </span>
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onPlayAgain}
            className="inline-flex items-center justify-center rounded-lg px-4 py-2
                       bg-gray-900 text-white hover:bg-gray-800 active:bg-black transition
                       dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Play again
          </button>

          <button
            onClick={() => dispatch({ type: 'RESET' })}
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 border
                       border-gray-300 text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition
                       dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}