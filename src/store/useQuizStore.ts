import { create } from 'zustand';
import type { Problem, QuizMode, StepResult } from '../types';
import { fetchProblems } from '../services/sheets';
import { useAuthStore } from './useAuthStore';

type StepPhase = 'answering' | 'feedback';

interface QuizState {
  levelId: number | null;
  mode: QuizMode;
  problems: Problem[];
  loading: boolean;
  loadError: boolean;

  problemIndex: number;
  stepIndex: number;
  phase: StepPhase;
  chosenIndex: number | null;
  hintShown: boolean;
  results: StepResult[]; // flat, in answer order
  perTopic: Record<string, StepResult[]>;
  startedAt: number;
  finished: boolean;
  focusMode: boolean;

  start: (levelId: number, mode: QuizMode) => Promise<void>;
  choose: (index: number) => void;
  showHint: () => void;
  continueNext: () => void;
  toggleFocus: () => void;
  reset: () => void;

  totalSteps: () => number;
  completedSteps: () => number;
}

const initial = {
  levelId: null as number | null,
  mode: 'level' as QuizMode,
  problems: [] as Problem[],
  loading: false,
  loadError: false,
  problemIndex: 0,
  stepIndex: 0,
  phase: 'answering' as StepPhase,
  chosenIndex: null as number | null,
  hintShown: false,
  results: [] as StepResult[],
  perTopic: {} as Record<string, StepResult[]>,
  startedAt: 0,
  finished: false,
  focusMode: false,
};

export const useQuizStore = create<QuizState>((set, get) => ({
  ...initial,

  start: async (levelId, mode) => {
    set({ ...initial, levelId, mode, loading: true, startedAt: Date.now() });
    try {
      const token = useAuthStore.getState().accessToken;
      const problems = await fetchProblems(token, levelId);
      if (!problems.length) throw new Error('no problems');
      set({ problems, loading: false });
    } catch {
      set({ loading: false, loadError: true });
    }
  },

  choose: (index) => {
    const s = get();
    if (s.phase !== 'answering' || s.finished) return;
    const problem = s.problems[s.problemIndex];
    const step = problem.steps[s.stepIndex];
    const result: StepResult = {
      correct: index === step.correctIndex,
      usedHint: s.hintShown,
      chosenIndex: index,
    };
    set({
      phase: 'feedback',
      chosenIndex: index,
      results: [...s.results, result],
      perTopic: {
        ...s.perTopic,
        [problem.topic]: [...(s.perTopic[problem.topic] ?? []), result],
      },
    });
  },

  showHint: () => set({ hintShown: true }),

  continueNext: () => {
    const s = get();
    const problem = s.problems[s.problemIndex];
    if (s.stepIndex + 1 < problem.steps.length) {
      set({ stepIndex: s.stepIndex + 1, phase: 'answering', chosenIndex: null, hintShown: false });
    } else if (s.problemIndex + 1 < s.problems.length) {
      set({
        problemIndex: s.problemIndex + 1,
        stepIndex: 0,
        phase: 'answering',
        chosenIndex: null,
        hintShown: false,
      });
    } else {
      set({ finished: true });
    }
  },

  toggleFocus: () => set((s) => ({ focusMode: !s.focusMode })),

  reset: () => set({ ...initial }),

  totalSteps: () => get().problems.reduce((sum, p) => sum + p.steps.length, 0),
  completedSteps: () => get().results.length,
}));
