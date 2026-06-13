import type { ProblemSet } from '../../types';
import { DAILY_WARMUP } from './set.daily-warmup';
import { CORE_GRE_MIX } from './set.core-gre-mix';
import { WORD_PROBLEMS_INTENSIVE } from './set.word-problems-intensive';
import { GEOMETRY_SPRINT } from './set.geometry-sprint';

// Add one import + one array entry here to ship a new set. Nothing else changes.
export const PROBLEM_SETS: ProblemSet[] = [
  DAILY_WARMUP,
  CORE_GRE_MIX,
  WORD_PROBLEMS_INTENSIVE,
  GEOMETRY_SPRINT,
];
