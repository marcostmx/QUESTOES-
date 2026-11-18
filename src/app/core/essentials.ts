/**
 * Treinos essenciais: o menor conjunto de questões de uma disciplina com maior
 * rendimento para a prova (o que mais caiu + o que o professor enfatizou),
 * curado à mão em src/data/essentials/<prova>.json.
 */
import type { ExamId, SubjectId } from '../../data/schema';
import pr2 from '../../data/essentials/pr2.json';

export interface EssentialGroup {
  topic: string;
  /** Por que o tema entrou (frequência nas provas, ênfase do professor). */
  why: string;
  ids: string[];
}
export interface EssentialSet {
  title: string;
  summary: string;
  groups: EssentialGroup[];
}

const SETS: Partial<Record<ExamId, Partial<Record<SubjectId, EssentialSet>>>> = {
  PR2: pr2 as Partial<Record<SubjectId, EssentialSet>>,
};

export function essentialsOf(exam: ExamId, subject: SubjectId): EssentialSet | null {
  return SETS[exam]?.[subject] ?? null;
}

export const essentialIds = (set: EssentialSet) => set.groups.flatMap(g => g.ids);
