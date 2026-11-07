/**
 * Sessões de estudo: montagem da fila de questões (filtros) e o estado
 * de cada resposta dentro da sessão. A sessão ativa fica salva no
 * navegador para o aluno retomar de onde parou.
 */
import { useSyncExternalStore } from 'react';
import type { Question, QuestionFormat, QuestionKind, SubjectId } from '../../data/schema';
import { isDue } from './srs';
import { isAnswered, isOpenError, type Result, type StudyData } from './study';
import { storage, study, today } from './store';

/* ---------- Filtros ---------- */

export type StatusFilter = 'todas' | 'nao-respondidas' | 'erradas' | 'favoritas' | 'revisar-hoje';

export interface PracticeFilter {
  subjects: SubjectId[];
  status: StatusFilter;
  formats: QuestionFormat[];
  kinds: QuestionKind[];
  topics: string[];
  order: 'banco' | 'aleatoria';
  limit: number | null;
}

export const defaultFilter = (subjects: SubjectId[] = []): PracticeFilter => ({
  subjects,
  status: 'todas',
  formats: [],
  kinds: [],
  topics: [],
  order: 'banco',
  limit: null,
});

export function shuffle<T>(arr: T[], rand: () => number = Math.random): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function filterQuestions(
  all: Question[],
  data: StudyData,
  f: PracticeFilter,
  todayKey: string,
  rand?: () => number,
): Question[] {
  const subj = new Set(f.subjects);
  const formats = new Set(f.formats);
  const kinds = new Set(f.kinds);
  const topics = new Set(f.topics);
  let list = all.filter(q => {
    if (subj.size && !subj.has(q.subject)) return false;
    if (formats.size && !formats.has(q.format)) return false;
    if (kinds.size && !kinds.has(q.kind)) return false;
    if (topics.size && !(q.topic && topics.has(q.topic))) return false;
    const s = data.questions[q.id];
    switch (f.status) {
      case 'nao-respondidas': return !isAnswered(s);
      case 'erradas': return isOpenError(s);
      case 'favoritas': return !!s?.favorite;
      case 'revisar-hoje': return isDue(s?.srs, todayKey);
      default: return true;
    }
  });
  if (f.order === 'aleatoria') list = shuffle(list, rand);
  if (f.limit && f.limit > 0) list = list.slice(0, f.limit);
  return list;
}

/** Fila de revisão do dia: atrasadas primeiro (mais antigas antes). */
export function dueQueue(all: Question[], data: StudyData, todayKey: string, subject?: SubjectId): Question[] {
  return all
    .filter(q => (!subject || q.subject === subject) && isDue(data.questions[q.id]?.srs, todayKey))
    .sort((a, b) => data.questions[a.id]!.srs!.due.localeCompare(data.questions[b.id]!.srs!.due));
}

/* ---------- Sessão ---------- */

export type SessionKind = 'pratica' | 'revisao' | 'erros' | 'favoritos' | 'avulsa';

export interface SessionAnswer {
  selected?: number;
  eliminated?: number[];
  /** Resposta escrita (questões abertas). */
  text?: string;
  guessed?: boolean;
  /** Gabarito visível. */
  revealed?: boolean;
  /** Resultado registrado (só uma vez por questão na sessão). */
  result?: Result;
}

export interface Session {
  id: string;
  kind: SessionKind;
  title: string;
  questionIds: string[];
  index: number;
  answers: Record<string, SessionAnswer>;
  createdAt: number;
  finishedAt?: number;
}

const KEY = 'pr1.v2.session';
let current: Session | null = storage.read<Session>(KEY);
const listeners = new Set<() => void>();

function set(next: Session | null) {
  current = next;
  storage.write(KEY, current);
  listeners.forEach(l => l());
}

function patchAnswer(id: string, patch: Partial<SessionAnswer>) {
  if (!current) return;
  set({ ...current, answers: { ...current.answers, [id]: { ...current.answers[id], ...patch } } });
}

export const sessions = {
  get: () => current,
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  start(kind: SessionKind, title: string, questionIds: string[], index = 0) {
    set({ id: crypto.randomUUID?.() ?? String(Date.now()), kind, title, questionIds, index, answers: {}, createdAt: Date.now() });
  },
  go(index: number) {
    if (!current) return;
    set({ ...current, index: Math.max(0, Math.min(current.questionIds.length - 1, index)) });
  },
  select(id: string, option: number) {
    if (current?.answers[id]?.result) return;
    const elim = (current?.answers[id]?.eliminated ?? []).filter(i => i !== option);
    patchAnswer(id, { selected: option, eliminated: elim });
  },
  toggleEliminate(id: string, option: number) {
    const a = current?.answers[id];
    if (a?.result) return;
    const elim = new Set(a?.eliminated ?? []);
    elim.has(option) ? elim.delete(option) : elim.add(option);
    patchAnswer(id, { eliminated: [...elim], selected: a?.selected === option ? undefined : a?.selected });
  },
  setGuessed(id: string, guessed: boolean) {
    patchAnswer(id, { guessed });
  },
  setText(id: string, text: string) {
    patchAnswer(id, { text });
  },
  /** Confirma a alternativa de uma questão objetiva. */
  confirm(q: Question) {
    const a = current?.answers[q.id];
    if (!a || a.selected === undefined || a.result) return;
    const result: Result = a.selected === q.answerIndex ? 'correct' : 'wrong';
    study.answer(q.id, result, { selected: a.selected, guessed: a.guessed });
    patchAnswer(q.id, { result, revealed: true });
  },
  /** Mostra o gabarito sem responder (objetiva: conta como erro). */
  reveal(q: Question) {
    const a = current?.answers[q.id];
    if (a?.revealed) return;
    if (q.format === 'mcq' && !a?.result) {
      study.answer(q.id, 'wrong', { guessed: false });
      patchAnswer(q.id, { revealed: true, result: 'wrong' });
    } else {
      patchAnswer(q.id, { revealed: true });
    }
  },
  /** Autoavaliação de questão aberta. */
  selfGrade(q: Question, result: Result) {
    if (current?.answers[q.id]?.result) return;
    study.answer(q.id, result, {});
    patchAnswer(q.id, { result, revealed: true });
  },
  finish() {
    if (current) set({ ...current, finishedAt: Date.now() });
  },
  discard() {
    set(null);
  },
};

export function useSession(): Session | null {
  return useSyncExternalStore(sessions.subscribe, sessions.get, sessions.get);
}

export function sessionSummary(s: Session) {
  const results = s.questionIds.map(id => s.answers[id]?.result);
  const answered = results.filter(Boolean).length;
  const correct = results.filter(r => r === 'correct').length;
  const partial = results.filter(r => r === 'partial').length;
  const wrong = results.filter(r => r === 'wrong').length;
  return { total: s.questionIds.length, answered, correct, partial, wrong };
}

export { today };
