import { useEffect, useState } from 'react';
import type { GameState } from '@/types/game';

export function useGameTimer(state: GameState) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // no game yet
    if (!state.startedAt) {
      setSeconds(0);
      return;
    }

    // game finished: freeze final time
    if (state.endedAt) {
      setSeconds(Math.round((state.endedAt - state.startedAt) / 1000));
      return;
    }

    // game running: tick
    const tick = () =>
      setSeconds(Math.round((Date.now() - state.startedAt!) / 1000));

    tick(); // immediate update on mount
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [state.startedAt, state.endedAt]);

  return seconds;
}