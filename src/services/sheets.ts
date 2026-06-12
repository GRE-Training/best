import type { Problem, Step } from '../types';
import { SEED_PROBLEMS } from '../data/seedProblems';
import { cacheGet, cacheSet } from '../utils/cache';

const SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';
const SPREADSHEET_ID: string = import.meta.env.VITE_SPREADSHEET_ID ?? '';

export const SHEETS_CONFIGURED = SPREADSHEET_ID.length > 0;

/**
 * Load the problems for a level. Resolution order:
 *  1. fresh localStorage cache (<24h)
 *  2. Google Sheet (when configured and a token is available)
 *  3. stale cache (offline fallback)
 *  4. bundled seed bank
 */
export async function fetchProblems(
  accessToken: string | null,
  levelId: number,
  forceRefresh = false,
): Promise<Problem[]> {
  const cacheKey = `problems:${levelId}`;

  if (!forceRefresh) {
    const cached = cacheGet<Problem[]>(cacheKey);
    if (cached?.length) return cached;
  }

  if (SHEETS_CONFIGURED && accessToken) {
    try {
      const res = await fetch(
        `${SHEETS_API}/${SPREADSHEET_ID}/values/${encodeURIComponent('problems!A:AZ')}`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      if (!res.ok) throw new Error(`Sheets API ${res.status}`);
      const data = await res.json();
      const problems = parseProblems(data.values ?? [], levelId);
      if (problems.length) {
        cacheSet(cacheKey, problems);
        return problems;
      }
    } catch {
      const stale = cacheGet<Problem[]>(cacheKey, true);
      if (stale?.length) return stale;
      // fall through to seed bank
    }
  }

  return SEED_PROBLEMS.filter((p) => p.level === levelId);
}

function parseProblems(rows: string[][], levelId: number): Problem[] {
  if (rows.length < 2) return [];
  const headers = rows[0];
  const col = (name: string) => headers.indexOf(name);

  return rows
    .slice(1)
    .filter((row) => parseInt(row[col('level')] ?? '', 10) === levelId)
    .map((row) => parseProblemRow(row, col))
    .filter((p): p is Problem => p !== null);
}

function parseProblemRow(row: string[], col: (name: string) => number): Problem | null {
  const get = (name: string) => row[col(name)] ?? '';
  const stepCount = parseInt(get('step_count'), 10);
  if (!get('id') || !stepCount) return null;

  const steps: Step[] = [];
  for (let n = 1; n <= stepCount; n++) {
    const choices = get(`step${n}_choices`).split('|').map((c) => c.trim());
    if (choices.length < 2) continue;
    steps.push({
      label: get(`step${n}_label`),
      question: get(`step${n}_question`),
      choices,
      correctIndex: parseInt(get(`step${n}_correct_index`), 10) || 0,
      explanation: get(`step${n}_explanation`),
      why: get(`step${n}_why`),
    });
  }
  if (!steps.length) return null;

  return {
    id: get('id'),
    level: parseInt(get('level'), 10),
    topic: get('topic'),
    difficulty: parseInt(get('difficulty'), 10) || 1,
    questionText: get('question_text'),
    answer: get('answer'),
    hint: get('hint'),
    steps,
  };
}
