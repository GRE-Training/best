import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  full?: boolean;
  children: ReactNode;
}

const styles: Record<string, string> = {
  primary: 'bg-accent text-white',
  secondary: 'bg-surface text-ink border border-border',
  ghost: 'bg-transparent text-ink-secondary',
  danger: 'bg-error-bg text-error border border-error/20',
};

export default function Button({
  variant = 'primary',
  full = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`tap-feedback rounded-btn px-6 py-3.5 text-[15px] font-medium disabled:opacity-40 ${styles[variant]} ${full ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
