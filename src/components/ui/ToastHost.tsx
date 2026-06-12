import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';
import { useToastStore } from '../../store/useToastStore';

const icons = {
  success: <CheckCircle2 size={16} className="text-success" aria-hidden />,
  error: <XCircle size={16} className="text-error" aria-hidden />,
  info: <Info size={16} className="text-accent" aria-hidden />,
  warning: <AlertTriangle size={16} className="text-warning" aria-hidden />,
};

export default function ToastHost() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);
  if (!toasts.length) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-20 z-[60] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:bottom-auto sm:right-6 sm:top-6 sm:items-end"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => dismiss(t.id)}
          className="pointer-events-auto flex animate-toastIn items-center gap-2 rounded-btn border border-border bg-white px-4 py-3 text-small text-ink shadow-none"
          aria-label={`Dismiss: ${t.message}`}
        >
          {icons[t.type]}
          {t.message}
        </button>
      ))}
    </div>
  );
}
