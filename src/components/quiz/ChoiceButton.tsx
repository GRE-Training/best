import MathText from '../MathText';

interface ChoiceButtonProps {
  letter: string;
  text: string;
  state: 'idle' | 'correct' | 'wrong' | 'dim';
  disabled: boolean;
  onClick: () => void;
}

export default function ChoiceButton({ letter, text, state, disabled, onClick }: ChoiceButtonProps) {
  const frame =
    state === 'correct'
      ? 'border-success bg-success-bg'
      : state === 'wrong'
        ? 'border-error bg-error-bg'
        : state === 'dim'
          ? 'border-border bg-white opacity-50'
          : 'border-border bg-white hover:border-accent hover:bg-accent-bg';

  const badge =
    state === 'correct'
      ? 'border-success bg-success text-white'
      : state === 'wrong'
        ? 'border-error bg-error text-white'
        : 'border-border bg-white text-ink-secondary';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={`Choice ${letter}: ${text.replace(/\$/g, '')}`}
      className={`tap-feedback flex w-full items-center gap-3 rounded-btn border-[1.5px] px-4 py-3.5 text-left transition-colors duration-200 ${frame}`}
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-small font-medium ${badge}`}
        aria-hidden
      >
        {letter}
      </span>
      <MathText text={text} className="text-body text-ink" />
    </button>
  );
}
