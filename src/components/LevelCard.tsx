import { Lock, Play, Check } from 'lucide-react';
import type { LevelDef, Progress } from '../types';
import Pill from './ui/Pill';
import ProgressBar from './ui/ProgressBar';

interface LevelCardProps {
  level: LevelDef;
  progress: Progress;
  onOpen: (id: number) => void;
}

export default function LevelCard({ level, progress, onOpen }: LevelCardProps) {
  const key = String(level.id);
  const unlocked = progress.unlockedLevels.includes(level.id);
  const completed = !!progress.completedLevels[key];
  const bestScore = progress.levelScores[key];

  const accent = completed
    ? 'border-l-4 border-l-success'
    : unlocked
      ? 'border-l-4 border-l-accent'
      : '';

  return (
    <button
      onClick={() => unlocked && onOpen(level.id)}
      disabled={!unlocked}
      aria-label={`Level ${level.id}: ${level.name}${unlocked ? '' : ' (locked)'}`}
      className={`tap-feedback w-full rounded-card border border-border bg-white p-5 text-left ${accent} ${
        unlocked ? '' : 'opacity-40'
      }`}
    >
      <div className="flex items-center gap-4">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-semibold text-white"
          style={{ background: level.color }}
          aria-hidden
        >
          {level.id}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="text-h3 text-ink">{level.name}</span>
            <Pill color="neutral">{level.greBand}</Pill>
          </span>
          <span className="mt-0.5 block truncate text-small text-ink-secondary">
            {level.subtitle}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2 text-ink-tertiary">
          {bestScore !== undefined && (
            <span className={`text-h3 ${completed ? 'text-success' : 'text-ink'}`}>
              {bestScore}%
            </span>
          )}
          {completed ? (
            <Check size={18} className="text-success" aria-hidden />
          ) : unlocked ? (
            <Play size={18} className="text-accent" aria-hidden />
          ) : (
            <Lock size={16} aria-hidden />
          )}
        </span>
      </div>
      {unlocked && (
        <ProgressBar
          className="mt-3"
          value={bestScore !== undefined ? Math.min(100, (bestScore / level.passThreshold) * 100) : 0}
          color={completed ? '#00875A' : '#0066FF'}
        />
      )}
    </button>
  );
}
