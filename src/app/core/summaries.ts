/** Resumos de 1 página por tema (src/data/summaries/<prova>/<disciplina>.json → { tema: markdown }). */
import { useEffect, useState } from 'react';
import type { ExamId, SubjectId } from '../../data/schema';

const files = import.meta.glob<Record<string, string>>('../../data/summaries/*/*.json', { import: 'default' });
const cache = new Map<string, Record<string, string>>();

const keyOf = (exam: ExamId, subject: SubjectId) => `../../data/summaries/${exam.toLowerCase()}/${subject}.json`;

export const hasSummaryFile = (exam: ExamId, subject: SubjectId) => keyOf(exam, subject) in files;

/** Resumo do tema, ou null se não houver (undefined enquanto carrega). */
export function useSummary(exam: ExamId, subject: SubjectId, topic: string | undefined): string | null | undefined {
  const key = keyOf(exam, subject);
  const [map, setMap] = useState(() => cache.get(key));
  useEffect(() => {
    if (cache.has(key)) return setMap(cache.get(key));
    const load = files[key];
    if (!load) return setMap({});
    let alive = true;
    load().then(m => {
      cache.set(key, m);
      if (alive) setMap(m);
    });
    return () => {
      alive = false;
    };
  }, [key]);
  if (!topic) return null;
  if (!map) return undefined;
  return map[topic] ?? null;
}
