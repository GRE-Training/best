import type { Problem } from '../types';
import { SEED_PROBLEMS } from './seedProblems';
import { EXTRA_PROBLEMS_1_TO_3 } from './problemsExtra1to3';
import { EXTRA_PROBLEMS_4_TO_5 } from './problemsExtra4to5';
import { EXTRA_PROBLEMS_6_TO_7 } from './problemsExtra6to7';

// The complete built-in bank: 84 problems across 7 levels, with step
// counts that vary by the natural depth of each problem (2–5 steps).
export const PROBLEMS: Problem[] = [
  ...SEED_PROBLEMS,
  ...EXTRA_PROBLEMS_1_TO_3,
  ...EXTRA_PROBLEMS_4_TO_5,
  ...EXTRA_PROBLEMS_6_TO_7,
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
