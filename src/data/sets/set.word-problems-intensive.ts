import type { ProblemSet } from '../../types';
import { PROBLEMS } from '../problemBank';

const APPLIED_TOPICS = new Set([
  'Percentages',
  'Ratios',
  'Rates',
  'Word problems',
  'Work & rates',
  'Mixtures',
]);

export const WORD_PROBLEMS_INTENSIVE: ProblemSet = {
  id: 'word-problems-intensive',
  name: 'Word Problems Intensive',
  description: "Deep practice on GRE's most feared category — turning language into solvable equations.",
  icon: '📝',
  tags: ['word problems', 'rates', 'mixtures'],
  targetBand: 'GRE 149–158',
  problems: PROBLEMS.filter((p) => APPLIED_TOPICS.has(p.topic)),
};
