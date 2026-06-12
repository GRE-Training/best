import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, TrendingUp, Flame } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useProgressStore } from '../store/useProgressStore';
import { useQuizStore } from '../store/useQuizStore';
import { LEVELS, getLevel } from '../data/levels';
import { estimateGreScore, overallAccuracy } from '../utils/scoring';
import { greeting, formatDate } from '../utils/formatting';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import LevelCard from '../components/LevelCard';

export default function Home() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const progress = useProgressStore((s) => s.progress);
  const quiz = useQuizStore();

  if (!user || !progress) return null;

  const score = estimateGreScore(progress);
  const accuracy = overallAccuracy(progress);
  const levelsDone = Object.keys(progress.completedLevels).length;
  const improving = progress.history.length >= 2 && progress.history[0].score > progress.history[1].score;

  const midLevel =
    quiz.levelId !== null && !quiz.finished && quiz.results.length > 0
      ? getLevel(quiz.levelId)
      : null;

  return (
    <div className="page mx-auto max-w-md px-5 pb-24 pt-8">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-h1 text-ink">{greeting(user.givenName)}</h1>
          <p className="mt-1 text-small text-ink-secondary">{formatDate(new Date())}</p>
        </div>
        <button
          onClick={() => navigate('/settings')}
          aria-label="Settings"
          className="tap-feedback rounded-full p-2 text-ink-secondary"
        >
          <SettingsIcon size={20} strokeWidth={1.75} />
        </button>
      </header>

      <Card className="mt-6">
        <p className="text-label uppercase text-ink-secondary">Estimated GRE Quant Score</p>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-display text-accent">~{score}</span>
          {improving && <TrendingUp size={20} className="mb-1.5 text-success" aria-label="Improving" />}
        </div>
        <ProgressBar className="mt-3" value={((score - 130) / 40) * 100} />
        <p className="mt-2 text-small text-ink-tertiary">Target: 163–167 for Harvard</p>
      </Card>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <Card className="p-4 text-center">
          <p className="text-h2 text-ink">{accuracy}%</p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.07em] text-ink-tertiary">Accuracy</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-h2 text-ink">{levelsDone}/7</p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.07em] text-ink-tertiary">Levels done</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="flex items-center justify-center gap-1 text-h2 text-ink">
            {progress.streakDays > 0 && <Flame size={16} className="text-warning" aria-hidden />}
            {progress.streakDays}
          </p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.07em] text-ink-tertiary">Day streak</p>
        </Card>
      </div>

      {midLevel && (
        <Card className="mt-6 border-l-4 border-l-accent">
          <p className="text-label uppercase text-ink-secondary">Continue where you left off</p>
          <p className="mt-2 text-h3 text-ink">
            Level {midLevel.id} · {midLevel.name}
          </p>
          <ProgressBar
            className="mt-3"
            value={(quiz.completedSteps() / Math.max(1, quiz.totalSteps())) * 100}
          />
          <Button full className="mt-4" onClick={() => navigate('/quiz')}>
            Resume
          </Button>
        </Card>
      )}

      <section className="mt-8">
        <p className="text-label uppercase text-ink-secondary">Your journey</p>
        <div className="mt-3 space-y-3">
          {LEVELS.map((level) => (
            <LevelCard
              key={level.id}
              level={level}
              progress={progress}
              onOpen={(id) => navigate(`/level/${id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
