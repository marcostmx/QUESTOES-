/**
 * Carregamento do banco de questões. Cada arquivo (prova × disciplina) é um
 * chunk separado; as questões de uma prova só são baixadas quando ela é aberta.
 */
import { useEffect, useMemo, useSyncExternalStore } from 'react';
import { CURRENT_EXAM, EXAMS, SUBJECTS, type ExamId, type Question, type SubjectId } from '../../data/schema';
import { usePrefs } from './store';

const files = import.meta.glob<Question[]>('../../data/questions/*/*.json', { import: 'default' });

const filesOf = (exam: ExamId) => Object.entries(files).filter(([path]) => path.split('/').at(-2) === exam.toLowerCase());

export interface Bank {
  ready: boolean;
  exam: ExamId;
  /** Questões da prova ativa. */
  all: Question[];
  bySubject: Record<SubjectId, Question[]>;
  /** Disciplinas que têm questões nesta prova, na ordem padrão. */
  subjects: SubjectId[];
  /** Todas as questões já carregadas, de qualquer prova. */
  byId: Map<string, Question>;
}

const loaded = new Map<ExamId, Question[]>();
const loading = new Map<ExamId, Promise<Question[]>>();
const byId = new Map<string, Question>();
let version = 0;
const listeners = new Set<() => void>();

export function loadExam(exam: ExamId): Promise<Question[]> {
  let p = loading.get(exam);
  if (!p) {
    p = Promise.all(filesOf(exam).map(([, load]) => load())).then(lists => {
      // ordem estável: a das disciplinas em SUBJECTS
      const all = lists.flat().sort((a, b) => SUBJECTS.findIndex(s => s.id === a.subject) - SUBJECTS.findIndex(s => s.id === b.subject));
      loaded.set(exam, all);
      all.forEach(q => byId.set(q.id, q));
      version++;
      listeners.forEach(l => l());
      return all;
    });
    p.catch(() => loading.delete(exam));
    loading.set(exam, p);
  }
  return p;
}

export const loadAllExams = () => Promise.all(EXAMS.map(e => loadExam(e.id)));

/** Número de questões por prova (disponível sem baixar o conteúdo). */
export const examFileCount = (exam: ExamId) => filesOf(exam).length;

const cache = new Map<string, Bank>();
function snapshot(exam: ExamId): Bank {
  const key = `${exam}:${version}`;
  let b = cache.get(key);
  if (!b) {
    const all = loaded.get(exam) ?? [];
    const bySubject = Object.fromEntries(SUBJECTS.map(s => [s.id, [] as Question[]])) as unknown as Record<SubjectId, Question[]>;
    all.forEach(q => bySubject[q.subject].push(q));
    b = { ready: loaded.has(exam), exam, all, bySubject, subjects: SUBJECTS.map(s => s.id).filter(id => bySubject[id].length), byId };
    cache.set(key, b);
  }
  return b;
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** Hook: banco da prova indicada (ou da prova ativa nas preferências). */
export function useBank(examOverride?: ExamId): Bank {
  const { exam: prefExam } = usePrefs();
  const exam = examOverride ?? prefExam ?? CURRENT_EXAM;
  useEffect(() => {
    void loadExam(exam);
  }, [exam]);
  const v = useSyncExternalStore(subscribe, () => version, () => version);
  return useMemo(() => snapshot(exam), [exam, v]);
}

/** Hook: busca uma questão pelo id em qualquer prova (carrega as outras se preciso). */
export function useQuestionById(id: string | undefined): { ready: boolean; question?: Question } {
  const v = useSyncExternalStore(subscribe, () => version, () => version);
  const q = id ? byId.get(id) : undefined;
  const allLoaded = EXAMS.every(e => loaded.has(e.id));
  useEffect(() => {
    if (id && !q) void loadAllExams();
  }, [id, q]);
  return useMemo(() => ({ ready: !!q || allLoaded, question: q }), [q, allLoaded, v]);
}

/** Temas disponíveis numa lista de questões (campo `topic`). */
export function topicsOf(questions: Question[]): string[] {
  return [...new Set(questions.map(q => q.topic).filter((t): t is string => !!t))];
}
