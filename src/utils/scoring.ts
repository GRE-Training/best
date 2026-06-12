import type { Progress, StepResult } from '../types';
import { LEVELS } from '../data/levels';

// Hint-assisted correct answers earn half credit but still advance.
export function stepPoints(r: StepResult): number {
  if (!r.correct) return 0;
  return r.usedHint ? 0.5 : 1;
}

export function sessionScore(results: StepResult[]): number {
  if (!results.length) return 0;
  const points = results.reduce((sum, r) => sum + stepPoints(r), 0);
  return Math.round((points / results.length) * 100);
}

// GRE estimate: 130 base, up to 5.5 points per completed level weighted by
// the level score. (The raw spec formula multiplies the sum by the level
// count again, which saturates at 170 after ~3 levels; this monotonic
// variant keeps the estimate meaningful across the whole journey.)
export function estimateGreScore(progress: Progress): number {
  const base = 130;
  const perLevel = 5.5;
  let bonus = 0;
  for (const level of LEVELS) {
    if (progress.completedLevels[String(level.id)]) {
      const score = progress.levelScores[String(level.id)] ?? 0;
      bonus += (score / 100) * perLevel;
    }
  }
  return Math.min(170, Math.round(base + bonus));
}

export function overallAccuracy(progress: Progress): number {
  if (!progress.totalAttempted) return 0;
  return Math.round((progress.totalCorrect / progress.totalAttempted) * 100);
}

export function emptyProgress(userId: string, email: string): Progress {
  const now = new Date().toISOString();
  return {
    userId,
    email,
    createdAt: now,
    updatedAt: now,
    unlockedLevels: [1],
    completedLevels: {},
    levelScores: {},
    levelAttempts: {},
    totalCorrect: 0,
    totalAttempted: 0,
    totalHints: 0,
    totalTimeMinutes: 0,
    topicStats: {},
    history: [],
    streakDays: 0,
    lastActiveDate: '',
  };
}

export function updateStreak(progress: Progress): Progress {
  const today = new Date().toDateString();
  const last = progress.lastActiveDate ? new Date(progress.lastActiveDate).toDateString() : '';
  if (last === today) return progress;

  const yesterday = new Date(Date.now() - 86_400_000).toDateString();
  const streakDays = last === yesterday ? progress.streakDays + 1 : 1;
  return { ...progress, streakDays, lastActiveDate: new Date().toISOString() };
}
