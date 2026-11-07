/**
 * Carregamento do banco de questões. Cada disciplina é um chunk separado,
 * baixado sob demanda e mantido em cache.
 */
import { useEffect, useSyncExternalStore } from 'react';
import { SUBJECTS, type Question, type SubjectId } from '../../data/schema';

const loaders = import.meta.glob<Question[]>('../../data/questions/*.json', { import: 'default' });

const loaderFor = (id: SubjectId) => loaders[`../../data/questions/${id}.json`];

export interface Bank {
  ready: boolean;
  all: Question[];
  byId: Map<string, Question>;
  bySubject: Record<SubjectId, Question[]>;
}

const emptyBySubject = () =>
  Object.fromEntries(SUBJECTS.map(s => [s.id, [] as Question[]])) as unknown as Record<SubjectId, Question[]>;

let bank: Bank = { ready: false, all: [], byId: new Map(), bySubject: emptyBySubject() };
let loading: Promise<Bank> | null = null;
const listeners = new Set<() => void>();

export function loadBank(): Promise<Bank> {
  if (!loading) {
    loading = Promise.all(SUBJECTS.map(s => loaderFor(s.id)())).then(lists => {
      const bySubject = emptyBySubject();
      SUBJECTS.forEach((s, i) => (bySubject[s.id] = lists[i]));
      const all = lists.flat();
      bank = { ready: true, all, byId: new Map(all.map(q => [q.id, q])), bySubject };
      listeners.forEach(l => l());
      return bank;
    });
    loading.catch(() => (loading = null));
  }
  return loading;
}

export function getBank() {
  return bank;
}

/** Hook: devolve o banco (vazio até carregar) e dispara o carregamento. */
export function useBank(): Bank {
  useEffect(() => {
    void loadBank();
  }, []);
  return useSyncExternalStore(
    l => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => bank,
    () => bank,
  );
}

/** Temas disponíveis numa lista de questões (campo `topic`). */
export function topicsOf(questions: Question[]): string[] {
  return [...new Set(questions.map(q => q.topic).filter((t): t is string => !!t))];
}
