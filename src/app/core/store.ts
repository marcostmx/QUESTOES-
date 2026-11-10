/**
 * Store global do progresso: estado imutável + persistência no navegador.
 * Componentes leem com `useStudy()` e alteram via `study.*`.
 */
import { useSyncExternalStore } from 'react';
import { CURRENT_EXAM, EXAMS, type ExamId } from '../../data/schema';
import { toDateKey } from './srs';
import {
  emptyStudy, mergeStudy, patchQuestion, recordAnswer, resetProgress,
  type QuestionState, type Result, type StudyData,
} from './study';

const KEY = 'pr1.v2.study';
const LEGACY_PREFIX = 'pr1_';

type Listener = () => void;

function safeRead<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function safeWrite(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* armazenamento indisponível (aba anônima, cota) — segue só em memória */
  }
}

/** Remove chaves do app antigo (progresso indexado por posição, incompatível). */
function dropLegacyKeys() {
  try {
    const old = Object.keys(localStorage).filter(k => k.startsWith(LEGACY_PREFIX));
    old.forEach(k => localStorage.removeItem(k));
  } catch { /* ignore */ }
}

function load(): StudyData {
  const saved = safeRead<StudyData>(KEY);
  if (saved?.version === 2) return { ...emptyStudy(), ...saved };
  dropLegacyKeys();
  return emptyStudy();
}

let state: StudyData = load();
const listeners = new Set<Listener>();
const changeHooks = new Set<(s: StudyData) => void>();

function set(next: StudyData, { persist = true, notifyHooks = true } = {}) {
  state = next;
  if (persist) safeWrite(KEY, state);
  listeners.forEach(l => l());
  if (notifyHooks) changeHooks.forEach(h => h(state));
}

export const today = () => toDateKey(new Date());

export const study = {
  get: () => state,
  subscribe(l: Listener) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  /** Chamado a cada alteração local (usado pela sincronização). */
  onLocalChange(h: (s: StudyData) => void) {
    changeHooks.add(h);
    return () => changeHooks.delete(h);
  },
  answer(id: string, result: Result, opts: { selected?: number; guessed?: boolean } = {}) {
    set(recordAnswer(state, { id, result, ...opts, now: Date.now(), today: today() }));
  },
  toggleFavorite(id: string) {
    set(patchQuestion(state, id, { favorite: !state.questions[id]?.favorite }, Date.now()));
  },
  patch(id: string, patch: Parameters<typeof patchQuestion>[2]) {
    set(patchQuestion(state, id, patch, Date.now()));
  },
  reset(ids?: Iterable<string>) {
    set(resetProgress(state, ids));
  },
  /** Mescla dados vindos da nuvem sem disparar novo envio. */
  mergeRemote(remote: StudyData) {
    set(mergeStudy(state, remote), { notifyHooks: false });
  },
  replace(next: StudyData) {
    set({ ...emptyStudy(), ...next, version: 2 });
  },
};

export function useStudy(): StudyData {
  return useSyncExternalStore(study.subscribe, study.get, study.get);
}

export function useQuestionState(id: string | undefined): QuestionState | undefined {
  const s = useStudy();
  return id ? s.questions[id] : undefined;
}

/* ---------- Preferências ---------- */

export type ThemePref = 'system' | 'light' | 'dark';
export interface Prefs {
  theme: ThemePref;
  /** Prova exibida no app (padrão: a prova atual). */
  exam: ExamId;
  /** Meta de questões por dia. */
  dailyGoal: number;
  /** Data de cada prova (AAAA-MM-DD), para o plano de estudo. */
  examDates?: Partial<Record<ExamId, string>>;
}
const PREFS_KEY = 'pr1.v2.prefs';
// A prova escolhida vale só para a visita atual: o app sempre abre na prova atual.
let prefs: Prefs = { theme: 'system', dailyGoal: 20, ...(safeRead<Partial<Prefs>>(PREFS_KEY) ?? {}), exam: CURRENT_EXAM };
const prefListeners = new Set<Listener>();

export const preferences = {
  get: () => prefs,
  subscribe(l: Listener) {
    prefListeners.add(l);
    return () => prefListeners.delete(l);
  },
  set(patch: Partial<Prefs>) {
    prefs = { ...prefs, ...patch };
    if (patch.exam && !EXAMS.some(e => e.id === patch.exam)) prefs.exam = CURRENT_EXAM;
    safeWrite(PREFS_KEY, { theme: prefs.theme, dailyGoal: prefs.dailyGoal, examDates: prefs.examDates });
    prefListeners.forEach(l => l());
  },
};

export function usePrefs(): Prefs {
  return useSyncExternalStore(preferences.subscribe, preferences.get, preferences.get);
}

export const storage = { read: safeRead, write: safeWrite };
