import type { ProblemSet } from '../../types';
import { PROBLEMS } from '../problemBank';

export const DAILY_WARMUP: ProblemSet = {
  id: 'daily-warmup',
  name: 'Daily Warmup',
  description: 'A quick drill covering foundations and core math — perfect for building a daily practice habit.',
  icon: '☀️',
  tags: ['quick', 'foundations', 'core math'],
  targetBand: 'GRE 130–151',
  problems: PROBLEMS.filter((p) => p.level <= 2 && p.difficulty <= 3),
};
