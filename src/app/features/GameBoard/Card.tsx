import type { Card as CardType, GameDispatch } from '@/types/game';

type Props = { card: CardType; dispatch: GameDispatch };

export function Card({ card, dispatch }: Props) {
  const onClick = () => {
    if (card.isFlipped || card.isMatched) return;
    dispatch({ type: 'FLIP_CARD', payload: { id: card.id } });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={card.isFlipped || card.isMatched}
      aria-pressed={card.isFlipped}
      aria-disabled={card.isMatched}
      className={`w-16 h-16 rounded-xl border flex items-center justify-center text-2xl
        transition-transform select-none
        ${card.isMatched ? 'bg-green-300' : card.isFlipped ? 'bg-white' : 'bg-gray-300 hover:-translate-y-0.5 active:translate-y-0'}
      `}
    >
      <span className="pointer-events-none">
        {card.isFlipped || card.isMatched ? card.icon : '❓'}
      </span>
    </button>
  );
}