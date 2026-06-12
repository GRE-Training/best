import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Clock, ListChecks } from 'lucide-react';
import { getLevel } from '../data/levels';
import { bankSize } from '../data/problemBank';
import { useProgressStore } from '../store/useProgressStore';
import { useQuizStore } from '../store/useQuizStore';
import { formatShortDate } from '../utils/formatting';
import Button from '../components/ui/Button';
import Pill from '../components/ui/Pill';
import Card from '../components/ui/Card';

export default function LevelIntro() {
  const navigate = useNavigate();
  const { id } = useParams();
  const level = getLevel(Number(id));
  const progress = useProgressStore((s) => s.progress);
  const startQuiz = useQuizStore((s) => s.start);

  if (!level || !progress) return null;

  const key = String(level.id);
  const bestScore = progress.levelScores[key];
  const lastAttempt = progress.history.find((h) => h.levelId === level.id && !h.practice);

  const begin = (mode: 'level' | 'practice') => {
    void startQuiz(level.id, mode);
    navigate('/quiz');
  };

  return (
    <div className="page mx-auto flex min-h-screen max-w-md flex-col px-5 pb-8 pt-6">
      <button
        onClick={() => navigate('/')}
        aria-label="Back to home"
        className="tap-feedback -ml-2 flex w-fit items-center gap-1 rounded-btn p-2 text-small text-ink-secondary"
      >
        <ChevronLeft size={18} />
        Back
      </button>

      <div className="mt-4 flex items-center gap-4">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full text-h2 text-white"
          style={{ background: level.color }}
          aria-hidden
        >
          {level.id}
        </span>
        <div>
          <h1 className="text-h1 text-ink">{level.name}</h1>
          <p className="text-small text-ink-secondary">{level.subtitle}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Pill color="blue">{level.greBand}</Pill>
        <Pill color="amber">Pass with {level.passThreshold}%</Pill>
      </div>

      <p className="mt-5 text-body text-ink-secondary">{level.description}</p>

      <div className="mt-5">
        <p className="text-label uppercase text-ink-secondary">Topics covered</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {level.topics.map((t) => (
            <Pill key={t} color="neutral">
              {t}
            </Pill>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4 text-small text-ink-secondary">
        <span className="flex items-center gap-1.5">
          <ListChecks size={15} aria-hidden /> {bankSize(level.id)} problems · 8 per session
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={15} aria-hidden /> ~15 minutes
        </span>
      </div>
      <p className="mt-2 text-small text-ink-tertiary">
        Each attempt draws a fresh random set, so you can retry without repeats.
      </p>

      {bestScore !== undefined && (
        <Card className="mt-5 flex items-center justify-between p-4">
          <div>
            <p className="text-label uppercase text-ink-secondary">Best score</p>
            {lastAttempt && (
              <p className="mt-1 text-small text-ink-tertiary">
                Last attempt {formatShortDate(lastAttempt.date)}
              </p>
            )}
          </div>
          <span className={`text-display ${bestScore >= level.passThreshold ? 'text-success' : 'text-ink'}`}>
            {bestScore}%
          </span>
        </Card>
      )}

      <div className="mt-auto space-y-3 pt-8">
        <Button full onClick={() => begin('level')}>
          Start Level
        </Button>
        <Button full variant="secondary" onClick={() => begin('practice')}>
          Practice Mode
        </Button>
      </div>
    </div>
  );
}
