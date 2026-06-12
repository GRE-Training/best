import type { ReactNode } from 'react';

interface PillProps {
  children: ReactNode;
  color?: 'blue' | 'green' | 'red' | 'amber' | 'neutral';
  className?: string;
}

const colors: Record<string, string> = {
  blue: 'bg-accent-bg text-accent',
  green: 'bg-success-bg text-success',
  red: 'bg-error-bg text-error',
  amber: 'bg-warning-bg text-warning',
  neutral: 'bg-surface text-ink-secondary',
};

export default function Pill({ children, color = 'neutral', className = '' }: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-[11px] font-medium ${colors[color]} ${className}`}
    >
      {children}
    </span>
  );
}
