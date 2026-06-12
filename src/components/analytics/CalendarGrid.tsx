import type { SessionRecord } from '../../types';

// 30-day study grid — pure CSS grid, 7 columns, no library.
export default function CalendarGrid({ history }: { history: SessionRecord[] }) {
  const studied = new Set(history.map((h) => new Date(h.date).toDateString()));
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d;
  });

  return (
    <div className="grid grid-cols-7 gap-2" role="img" aria-label="Study activity, last 30 days">
      {days.map((d) => {
        const active = studied.has(d.toDateString());
        const today = d.toDateString() === new Date().toDateString();
        return (
          <div key={d.toISOString()} className="flex flex-col items-center gap-1">
            <span
              className={`h-6 w-6 rounded-full ${
                active ? 'bg-accent' : 'border border-border bg-white'
              } ${today ? 'ring-2 ring-accent-bg' : ''}`}
              title={d.toLocaleDateString()}
            />
            <span className="text-[9px] text-ink-tertiary">{d.getDate()}</span>
          </div>
        );
      })}
    </div>
  );
}
