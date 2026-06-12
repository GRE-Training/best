import { useState } from 'react';
import type { SessionRecord } from '../../types';
import { getLevel } from '../../data/levels';
import { formatShortDate } from '../../utils/formatting';
import Pill from '../ui/Pill';
import Button from '../ui/Button';

const PAGE = 10;

export default function HistoryList({ history }: { history: SessionRecord[] }) {
  const [shown, setShown] = useState(PAGE);

  if (!history.length) {
    return (
      <div className="py-8 text-center">
        <svg viewBox="0 0 64 64" className="mx-auto mb-3 h-14 w-14" aria-hidden>
          <rect x="12" y="16" width="40" height="36" rx="6" fill="#F5F5F5" stroke="#E8E8E8" />
          <line x1="20" y1="28" x2="44" y2="28" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="36" x2="38" y2="36" stroke="#D0D0D0" strokeWidth="2" strokeLinecap="round" />
          <circle cx="32" cy="12" r="4" fill="#EBF2FF" stroke="#0066FF" />
        </svg>
        <p className="text-small text-ink-secondary">No sessions yet — your training log will appear here.</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="divide-y divide-border">
        {history.slice(0, shown).map((h, i) => {
          const level = getLevel(h.levelId);
          const passed = !h.practice && level && h.score >= level.passThreshold;
          return (
            <li key={`${h.date}-${i}`} className="flex items-center gap-3 py-3">
              <span className="w-14 shrink-0 text-small text-ink-tertiary">
                {formatShortDate(h.date)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-small text-ink">
                  {level ? `L${level.id} · ${level.name}` : `Level ${h.levelId}`}
                </span>
                <span className="block truncate text-[11px] text-ink-tertiary">{h.topic}</span>
              </span>
              <span className="text-small font-medium text-ink">{h.score}%</span>
              {h.practice ? (
                <Pill color="blue">Practice</Pill>
              ) : passed ? (
                <Pill color="green">Pass</Pill>
              ) : (
                <Pill color="red">Fail</Pill>
              )}
            </li>
          );
        })}
      </ul>
      {shown < history.length && (
        <Button variant="secondary" full className="mt-2" onClick={() => setShown(shown + PAGE)}>
          Load more
        </Button>
      )}
    </div>
  );
}
