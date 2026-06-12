import { useProgressStore } from '../store/useProgressStore';
import { LEVELS } from '../data/levels';
import { overallAccuracy } from '../utils/scoring';
import { formatMinutes } from '../utils/formatting';
import Card from '../components/ui/Card';
import Pill from '../components/ui/Pill';
import TopicChart from '../components/analytics/TopicChart';
import CalendarGrid from '../components/analytics/CalendarGrid';
import HistoryList from '../components/analytics/HistoryList';

export default function Analytics() {
  const progress = useProgressStore((s) => s.progress);
  if (!progress) return null;

  const stats = [
    { label: 'Questions', value: `${progress.totalAttempted}` },
    { label: 'Accuracy', value: `${overallAccuracy(progress)}%` },
    { label: 'Streak', value: `${progress.streakDays}d` },
    { label: 'Study time', value: formatMinutes(progress.totalTimeMinutes) },
  ];

  return (
    <div className="page mx-auto max-w-md px-5 pb-24 pt-8 lg:max-w-3xl">
      <h1 className="text-h1 text-ink">Analytics</h1>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4 text-center">
            <p className="text-h2 text-ink">{s.value}</p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.07em] text-ink-tertiary">
              {s.label}
            </p>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <p className="text-label uppercase text-ink-secondary">Accuracy by topic</p>
        <div className="mt-3">
          <TopicChart topicStats={progress.topicStats} />
        </div>
      </Card>

      <Card className="mt-4">
        <p className="text-label uppercase text-ink-secondary">Level progress</p>
        <ul className="mt-3 divide-y divide-border">
          {LEVELS.map((level) => {
            const key = String(level.id);
            const completed = !!progress.completedLevels[key];
            const unlocked = progress.unlockedLevels.includes(level.id);
            const best = progress.levelScores[key];
            const attempts = progress.levelAttempts[key] ?? 0;
            return (
              <li key={level.id} className="flex items-center gap-3 py-2.5">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white"
                  style={{ background: level.color, opacity: unlocked ? 1 : 0.35 }}
                  aria-hidden
                >
                  {level.id}
                </span>
                <span className="min-w-0 flex-1 truncate text-small text-ink">{level.name}</span>
                {completed ? (
                  <Pill color="green">Completed</Pill>
                ) : unlocked ? (
                  <Pill color="blue">In progress</Pill>
                ) : (
                  <Pill color="neutral">Locked</Pill>
                )}
                <span className="w-12 text-right text-small font-medium text-ink">
                  {best !== undefined ? `${best}%` : '—'}
                </span>
                <span className="w-14 text-right text-[11px] text-ink-tertiary">
                  {attempts} {attempts === 1 ? 'try' : 'tries'}
                </span>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card className="mt-4">
        <p className="text-label uppercase text-ink-secondary">Last 30 days</p>
        <div className="mt-4">
          <CalendarGrid history={progress.history} />
        </div>
      </Card>

      <Card className="mt-4">
        <p className="text-label uppercase text-ink-secondary">History</p>
        <div className="mt-2">
          <HistoryList history={progress.history} />
        </div>
      </Card>
    </div>
  );
}
