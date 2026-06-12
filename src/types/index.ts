export interface Step {
  label: string;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  why: string;
}

export interface Problem {
  id: string;
  level: number; // 1–7
  topic: string;
  difficulty: number; // 1–5
  questionText: string;
  answer: string;
  hint: string;
  steps: Step[];
}

export interface LevelDef {
  id: number; // 1–7
  name: string;
  subtitle: string;
  greBand: string;
  passThreshold: number; // percent
  color: string;
  problemCount: number;
  description: string;
  topics: string[];
}

export interface TopicStat {
  correct: number;
  attempted: number;
  hints: number;
}

export interface SessionRecord {
  date: string;
  levelId: number;
  topic: string;
  score: number;
  correct: number;
  attempted: number;
  hints: number;
  durationSeconds: number;
  practice?: boolean;
}

export interface Progress {
  userId: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  unlockedLevels: number[];
  completedLevels: Record<string, boolean>;
  levelScores: Record<string, number>;
  levelAttempts: Record<string, number>;
  totalCorrect: number;
  totalAttempted: number;
  totalHints: number;
  totalTimeMinutes: number;
  topicStats: Record<string, TopicStat>;
  history: SessionRecord[];
  streakDays: number;
  lastActiveDate: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  givenName: string;
  picture?: string;
  demo?: boolean;
}

export type QuizMode = 'level' | 'practice';

export interface StepResult {
  correct: boolean;
  usedHint: boolean;
  chosenIndex: number;
}
