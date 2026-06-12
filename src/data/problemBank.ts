import type { Problem } from '../types';
import { SEED_PROBLEMS } from './seedProblems';
import { EXTRA_PROBLEMS_1_TO_3 } from './problemsExtra1to3';
import { EXTRA_PROBLEMS_4_TO_5 } from './problemsExtra4to5';
import { EXTRA_PROBLEMS_6_TO_7 } from './problemsExtra6to7';
import { LEVEL1_BATCH2 } from './problemsLevel1Batch2';
import { LEVEL2_BATCH2, LEVEL3_BATCH2 } from './problemsLevel2to3Batch2';
import { LEVEL4_BATCH2, LEVEL5_BATCH2, LEVEL6_BATCH2, LEVEL7_BATCH2 } from './problemsLevel4to7Batch2';

// Complete problem bank — 192 problems across 7 levels.
// Level 1: 36 problems  Level 2: 30  Level 3: 30
// Level 4: 24           Level 5: 24  Level 6: 24  Level 7: 20
export const PROBLEMS: Problem[] = [
  ...SEED_PROBLEMS,
  ...EXTRA_PROBLEMS_1_TO_3,
  ...EXTRA_PROBLEMS_4_TO_5,
  ...EXTRA_PROBLEMS_6_TO_7,
  ...LEVEL1_BATCH2,
  ...LEVEL2_BATCH2,
  ...LEVEL3_BATCH2,
  ...LEVEL4_BATCH2,
  ...LEVEL5_BATCH2,
  ...LEVEL6_BATCH2,
  ...LEVEL7_BATCH2,
];

export function problemsForLevel(levelId: number): Problem[] {
  return PROBLEMS.filter((p) => p.level === levelId);
}

export function bankSize(levelId: number): number {
  return problemsForLevel(levelId).length;
}

export function totalStepsForLevel(levelId: number): number {
  return problemsForLevel(levelId).reduce((sum, p) => sum + p.steps.length, 0);
}
