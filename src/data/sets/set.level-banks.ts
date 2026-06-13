import type { ProblemSet } from '../../types';
import { PROBLEMS } from '../problemBank';

export const LEVEL1_BANK: ProblemSet = {
  id: 'level-1-bank',
  name: 'Foundation Bank',
  description: 'All 36 Foundation problems — arithmetic, fractions and number sense. No pass/fail pressure.',
  icon: '🔢',
  tags: ['level 1', 'foundations', 'arithmetic'],
  targetBand: 'GRE 130–140',
  problems: PROBLEMS.filter((p) => p.level === 1),
};

export const LEVEL2_BANK: ProblemSet = {
  id: 'level-2-bank',
  name: 'Core Math Bank',
  description: 'All 30 Core Math problems — percentages, ratios and rates. Practice freely without scoring.',
  icon: '📈',
  tags: ['level 2', 'percentages', 'ratios'],
  targetBand: 'GRE 141–148',
  problems: PROBLEMS.filter((p) => p.level === 2),
};

export const LEVEL3_BANK: ProblemSet = {
  id: 'level-3-bank',
  name: 'Word Problems Bank',
  description: 'All 30 Word Problems — work, mixtures and ages. Drill the translation skill until it is automatic.',
  icon: '📖',
  tags: ['level 3', 'word problems', 'mixtures'],
  targetBand: 'GRE 149–154',
  problems: PROBLEMS.filter((p) => p.level === 3),
};

export const LEVEL4_BANK: ProblemSet = {
  id: 'level-4-bank',
  name: 'Geometry Bank',
  description: 'All 24 Geometry problems — lines, triangles, circles and solids. Every formula the GRE tests.',
  icon: '🔷',
  tags: ['level 4', 'geometry', 'triangles'],
  targetBand: 'GRE 155–158',
  problems: PROBLEMS.filter((p) => p.level === 4),
};

export const LEVEL5_BANK: ProblemSet = {
  id: 'level-5-bank',
  name: 'Algebra Bank',
  description: 'All 24 Advanced Algebra problems — exponents, quadratics and functions.',
  icon: '✏️',
  tags: ['level 5', 'algebra', 'quadratics'],
  targetBand: 'GRE 159–162',
  problems: PROBLEMS.filter((p) => p.level === 5),
};

export const LEVEL6_BANK: ProblemSet = {
  id: 'level-6-bank',
  name: 'Data & Stats Bank',
  description: 'All 24 Data & Statistics problems — probability, standard deviation and data interpretation.',
  icon: '🎲',
  tags: ['level 6', 'statistics', 'probability'],
  targetBand: 'GRE 163–166',
  problems: PROBLEMS.filter((p) => p.level === 6),
};

export const LEVEL7_BANK: ProblemSet = {
  id: 'level-7-bank',
  name: 'Harvard Bank',
  description: 'All 20 Harvard-level problems — the hardest 10% of GRE Quant. Multi-concept, no shortcuts.',
  icon: '🏆',
  tags: ['level 7', 'harvard', 'advanced'],
  targetBand: 'GRE 167–170',
  problems: PROBLEMS.filter((p) => p.level === 7),
};
