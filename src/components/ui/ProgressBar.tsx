interface ProgressBarProps {
  value: number; // 0–100
  color?: string;
  className?: string;
}

export default function ProgressBar({ value, color = '#0066FF', className = '' }: ProgressBarProps) {
  return (
    <div
      className={`h-1 w-full overflow-hidden rounded-[2px] bg-border ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-[2px]"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: color,
          transition: 'width 600ms cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'width',
        }}
      />
    </div>
  );
}
