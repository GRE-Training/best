import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Clock, Lightbulb, ListChecks, Sparkles } from 'lucide-react';
import { useQuizStore } from '../store/useQuizStore';
import { getLevel } from '../data/levels';
import { stepPoints } from '../utils/scoring';
import { formatDuration } from '../utils/formatting';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Confetti from '../components/quiz/Confetti';
import TopicChart from '../components/analytics/TopicChart';
import type { TopicStat } from '../types';

interface Outcome {
  score: number;
  passed: boolean;
  unlockedNext: boolean;
}

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const quiz = useQuizStore();
  const outcome = (location.state as Outcome | null) ?? { score: 0, passed: false, unlockedNext: false };

  const level = quiz.levelId !== null ? getLevel(quiz.levelId) : null;
  if (!level || !quiz.results.length) {
    navigate('/', { replace: true });
    return null;
  }

  const nextLevel = getLevel(level.id + 1);
  const correct = quiz.results.filter((r) => r.correct).length;
  const hints = quiz.results.filter((r) => r.usedHint).length;
  const duration = Math.round((Date.now() - quiz.startedAt) / 1000);
  const practice = quiz.mode === 'practice';

  // Session-local topic stats for the chart
  const sessionTopicStats: Record<string, TopicStat> = {};
  for (const [topic, results] of Object.entries(quiz.perTopic)) {
    sessionTopicStats[topic] = {
      correct: results.reduce((s, r) => s + stepPoints(r), 0),
      attempted: results.length,
      hints: results.filter((r) => r.usedHint).length,
    };
  }

  const retry = () => {
    void quiz.start(level.id, quiz.mode);
    navigate('/quiz', { replace: true });
  };

  const done = () => {
    quiz.reset();
    navigate('/', { replace: true });
  };

  return (
    <div className="page relative mx-auto flex min-h-screen max-w-md flex-col px-5 pb-8 pt-16">
      {outcome.passed && <Confetti />}

      <div className="text-center">
        <p className="text-label uppercase text-ink-secondary">
          Level {level.id} · {level.name}
          {practice ? ' · Practice' : ''}
        </p>
        <p className={`mt-3 text-[64px] font-semibold leading-none ${outcome.passed || practice ? 'text-accent' : 'text-error'}`}>
          {outcome.score}%
        </p>
        <p className={`mt-3 text-h2 ${outcome.passed ? 'text-success' : practice ? 'text-ink-secondary' : 'text-error'}`}>
          {practice ? 'Practice complete' : outcome.passed ? 'Passed ✓' : 'Try again'}
        </p>
        {!practice && !outcome.passed && (
          <p className="mt-1 text-small text-ink-tertiary">You need {level.passThreshold}% to pass</p>
        )}
      </div>

      {outcome.unlockedNext && nextLevel && (
        <Card className="mt-6 animate-unlockPop border-accent bg-accent-bg text-center">
          <Sparkles size={20} className="mx-auto text-accent" aria-hidden />
          <p className="mt-2 text-h2 text-accent">Level {nextLevel.id} unlocked!</p>
          <p className="mt-1 text-small text-ink-secondary">
            {nextLevel.name} · {nextLevel.greBand}
          </p>
        </Card>
      )}

      <div className="mt-6 grid grid-cols-4 gap-2">
        {[
          { icon: Check, label: 'Correct', value: `${correct}` },
          { icon: ListChecks, label: 'Steps', value: `${quiz.results.length}` },
          { icon: Lightbulb, label: 'Hints', value: `${hints}` },
          { icon: Clock, label: 'Time', value: formatDuration(duration) },
        ].map(({ icon: Icon, label, value }) => (
          <Card key={label} className="p-3 text-center">
            <Icon size={15} className="mx-auto text-ink-tertiary" aria-hidden />
            <p className="mt-1.5 text-h3 text-ink">{value}</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.07em] text-ink-tertiary">{label}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <p className="text-label uppercase text-ink-secondary">Accuracy by topic</p>
        <div className="mt-3">
          <TopicChart topicStats={sessionTopicStats} />
        </div>
      </Card>

      <div className="mt-auto flex gap-3 pt-8">
        <Button variant="secondary" full onClick={retry}>
          Retry Level
        </Button>
        <Button full onClick={done}>
          Back to Levels
        </Button>
      </div>
    </div>
  );
}
