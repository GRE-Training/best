import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-sm animate-slideUp rounded-card bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-h2 text-ink">{title}</h2>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
