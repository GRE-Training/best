import { create } from 'zustand';
import type { Progress, SessionRecord, StepResult } from '../types';
import { LEVELS, getLevel } from '../data/levels';
import { emptyProgress, sessionScore, stepPoints, updateStreak } from '../utils/scoring';
import { loadProgress, saveProgressWithRetry } from '../services/drive';
import { useAuthStore } from './useAuthStore';
import { toast } from './useToastStore';

interface ProgressState {
  progress: Progress | null;
  loading: boolean;
  init: () => Promise<void>;
  recordSession: (args: {
    levelId: number;
    results: StepResult[];
    topics: string[];
    perTopic: Record<string, StepResult[]>;
    durationSeconds: number;
    practice: boolean;
  }) => { score: number; passed: boolean; unlockedNext: boolean };
  resetAll: () => void;
  exportJson: () => string;
}

const localKey = (userId: string) => `gre-progress:${userId}`;

let saveTimer: ReturnType<typeof setTimeout> | null = null;

function persist(progress: Progress) {
  localStorage.setItem(localKey(progress.userId), JSON.stringify(progress));

  // Debounced (2s) Drive sync, per spec.
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    const { accessToken, user } = useAuthStore.getState();
    if (!accessToken || !user || user.demo) return;
    const ok = await saveProgressWithRetry(accessToken, user.id, progress);
    if (!ok) toast('warning', 'Progress not saved');
  }, 2000);
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: null,
  loading: true,

  init: async () => {
    const { user, accessToken } = useAuthStore.getState();
    if (!user) return;
    set({ loading: true });

    let progress: Progress | null = null;

    if (accessToken && !user.demo) {
      try {
        progress = await loadProgress(accessToken, user.id);
      } catch {
        // offline or Drive error — fall back to the local copy
      }
    }
    if (!progress) {
      try {
        const raw = localStorage.getItem(localKey(user.id));
        if (raw) progress = JSON.parse(raw);
      } catch {
        progress = null;
      }
    }
    if (!progress) progress = emptyProgress(user.id, user.email);

    set({ progress, loading: false });
  },

  recordSession: ({ levelId, results, topics, perTopic, durationSeconds, practice }) => {
    const state = get();
    if (!state.progress) return { score: 0, passed: false, unlockedNext: false };

    const level = getLevel(levelId);
    const score = sessionScore(results);
    const passed = !practice && !!level && score >= level.passThreshold;

    let progress: Progress = { ...state.progress };
    const key = String(levelId);

    // Aggregate counters
    const correct = results.filter((r) => r.correct).length;
    const hints = results.filter((r) => r.usedHint).length;
    progress.totalAttempted += results.length;
    progress.totalCorrect += correct;
    progress.totalHints += hints;
    progress.totalTimeMinutes += durationSeconds / 60;

    // Per-topic stats (correctness weighted by hint usage, matching scoring)
    progress.topicStats = { ...progress.topicStats };
    for (const [topic, topicResults] of Object.entries(perTopic)) {
      const prev = progress.topicStats[topic] ?? { correct: 0, attempted: 0, hints: 0 };
      progress.topicStats[topic] = {
        correct: prev.correct + topicResults.reduce((s, r) => s + stepPoints(r), 0),
        attempted: prev.attempted + topicResults.length,
        hints: prev.hints + topicResults.filter((r) => r.usedHint).length,
      };
    }

    // Level bookkeeping (real attempts only)
    let unlockedNext = false;
    if (!practice) {
      progress.levelAttempts = {
        ...progress.levelAttempts,
        [key]: (progress.levelAttempts[key] ?? 0) + 1,
      };
      progress.levelScores = {
        ...progress.levelScores,
        [key]: Math.max(progress.levelScores[key] ?? 0, score),
      };
      if (passed) {
        progress.completedLevels = { ...progress.completedLevels, [key]: true };
        const next = levelId + 1;
        if (next <= LEVELS.length && !progress.unlockedLevels.includes(next)) {
          progress.unlockedLevels = [...progress.unlockedLevels, next];
          unlockedNext = true;
        }
      }
    }

    const record: SessionRecord = {
      date: new Date().toISOString(),
      levelId,
      topic: topics.join(', '),
      score,
      correct,
      attempted: results.length,
      hints,
      durationSeconds,
      ...(practice ? { practice: true } : {}),
    };
    progress.history = [record, ...progress.history];

    progress = updateStreak(progress);
    progress.updatedAt = new Date().toISOString();

    set({ progress });
    persist(progress);
    return { score, passed, unlockedNext };
  },

  resetAll: () => {
    const { user } = useAuthStore.getState();
    if (!user) return;
    const fresh = emptyProgress(user.id, user.email);
    set({ progress: fresh });
    persist(fresh);
  },

  exportJson: () => JSON.stringify(get().progress, null, 2),
}));
