import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { LEVELS } from '../data/levels';
import { useProgressStore } from '../store/useProgressStore';
import LevelCard from '../components/LevelCard';

// Train tab: jump straight into any unlocked level.
export default function Train() {
  const navigate = useNavigate();
  const progress = useProgressStore((s) => s.progress);
  if (!progress) return null;

  const unlocked = LEVELS.filter((l) => progress.unlockedLevels.includes(l.id));

  return (
    <div className="page mx-auto max-w-md px-5 pb-24 pt-8">
      <h1 className="flex items-center gap-2 text-h1 text-ink">
        <Zap size={22} className="text-accent" aria-hidden />
        Train
      </h1>
      <p className="mt-1 text-small text-ink-secondary">
        Pick a level — use Practice Mode to drill without the pass gate.
      </p>

      <div className="mt-6 space-y-3">
        {unlocked.map((level) => (
          <LevelCard
            key={level.id}
            level={level}
            progress={progress}
            onOpen={(id) => navigate(`/level/${id}`)}
          />
        ))}
      </div>
    </div>
  );
}
