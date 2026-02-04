import { useEffect } from 'react';
import { GameBoard } from '@/features/GameBoard/GameBoard';
import { Toolbar } from '@/features/ToolBar/Toolbar';
import { GameResultModal } from '@/features/GameResult/GameResultModal';
import { useGameState } from '@/hooks/useGameState';

export function CachecoonApp() {
  const { state, dispatch } = useGameState();

  // 1) When exactly two are face-up, compare them
  useEffect(() => {
    if (state.flipped.length === 2) {
      dispatch({ type: 'CHECK_MATCH' });
    }
  }, [state.flipped.length, dispatch]);

  // 2) If mismatch (busy=true), hide them after 600ms
  useEffect(() => {
    if (state.busy && state.flipped.length === 2) {
      const t = setTimeout(() => {
        dispatch({ type: 'HIDE_MISMATCH' });
      }, 600);
      return () => clearTimeout(t);
    }
  }, [state.busy, state.flipped.length, dispatch]);

  return (
    <main className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">🦝 Cachecoon</h1>
      <Toolbar state={state} dispatch={dispatch} />
      <GameBoard state={state} dispatch={dispatch} />
      <GameResultModal state={state} dispatch={dispatch} />
    </main>
  );
}

export default CachecoonApp;