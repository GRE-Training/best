import type { ProblemSet } from '../../types';
import { PROBLEMS } from '../problemBank';

export const CORE_GRE_MIX: ProblemSet = {
  id: 'core-gre-mix',
  name: 'GRE Core Mix',
  description: 'A representative sample across every tested area — the closest thing to a real GRE Quant section.',
  icon: '📊',
  tags: ['mixed', 'all topics', 'GRE-realistic'],
  targetBand: 'GRE 149–162',
  problems: PROBLEMS.filter((p) => p.level >= 2 && p.level <= 6 && p.difficulty >= 2 && p.difficulty <= 4),
};
