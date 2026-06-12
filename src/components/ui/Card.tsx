import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Card({ className = '', children, ...rest }: CardProps) {
  return (
    <div className={`rounded-card border border-border bg-white p-5 ${className}`} {...rest}>
      {children}
    </div>
  );
}
