import { Card } from './Card';
import type { GameState, GameDispatch } from '@/types/game';

type Props = { state: GameState; dispatch: GameDispatch };

export function GameBoard({ state, dispatch }: Props) {
  return (
    <section className="grid grid-cols-4 gap-3 mt-4">
      {state.deck.map(card => (
        <Card key={card.id} card={card} dispatch={dispatch} />
      ))}
    </section>
  );
}