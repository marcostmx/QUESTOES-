/**
 * Modelo de dados do progresso do aluno e operações puras sobre ele.
 * Tudo é indexado pelo `id` estável da questão.
 */
import { schedule, type Grade, type SrsState } from './srs';

export type Result = 'correct' | 'partial' | 'wrong';

export type ErrorCause = 'nao-sabia' | 'confundiu' | 'interpretacao' | 'desatencao' | 'chute';

export const ERROR_CAUSES: { id: ErrorCause; label: string }[] = [
  { id: 'nao-sabia', label: 'Não sabia o conteúdo' },
  { id: 'confundiu', label: 'Confundi conceitos' },
  { id: 'interpretacao', label: 'Interpretei errado' },
  { id: 'desatencao', label: 'Desatenção' },
  { id: 'chute', label: 'Chutei' },
];

export interface QuestionState {
  attempts: number;
  correctCount: number;
  lastResult?: Result;
  /** Data/hora (ms) da última resposta. */
  lastAt?: number;
  /** Alternativa marcada na última resposta (objetivas). */
  lastSelected?: number;
  /** Última resposta foi marcada como chute. */
  guessed?: boolean;
  srs?: SrsState;
  favorite?: boolean;
  note?: string;
  cause?: ErrorCause;
  /** Erro marcado como revisado no caderno de erros. */
  resolved?: boolean;
  /** Última modificação (ms) — usado para mesclar dispositivos. */
  updatedAt: number;
}

export interface DayLog {
  answered: number;
  correct: number;
}

export interface StudyData {
  version: 2;
  questions: Record<string, QuestionState>;
  days: Record<string, DayLog>;
}

export const emptyStudy = (): StudyData => ({ version: 2, questions: {}, days: {} });

const blank = (now: number): QuestionState => ({ attempts: 0, correctCount: 0, updatedAt: now });

export interface AnswerInput {
  id: string;
  result: Result;
  selected?: number;
  guessed?: boolean;
  now: number;
  today: string;
}

export function gradeFor(result: Result, guessed?: boolean): Grade {
  if (result === 'wrong') return 'again';
  if (result === 'partial' || guessed) return 'hard';
  return 'good';
}

/** Registra uma resposta: contadores, revisão espaçada e diário. */
export function recordAnswer(data: StudyData, a: AnswerInput): StudyData {
  const prev = data.questions[a.id] ?? blank(a.now);
  const isCorrect = a.result === 'correct';
  const next: QuestionState = {
    ...prev,
    attempts: prev.attempts + 1,
    correctCount: prev.correctCount + (isCorrect ? 1 : 0),
    lastResult: a.result,
    lastAt: a.now,
    lastSelected: a.selected,
    guessed: !!a.guessed,
    srs: schedule(prev.srs, gradeFor(a.result, a.guessed), a.today),
    // um novo erro reabre o item no caderno de erros
    resolved: a.result === 'correct' ? prev.resolved : false,
    cause: a.guessed && a.result !== 'correct' ? 'chute' : prev.cause,
    updatedAt: a.now,
  };
  const day = data.days[a.today] ?? { answered: 0, correct: 0 };
  return {
    ...data,
    questions: { ...data.questions, [a.id]: next },
    days: { ...data.days, [a.today]: { answered: day.answered + 1, correct: day.correct + (isCorrect ? 1 : 0) } },
  };
}

/** Altera campos editáveis pelo aluno (favorito, nota, causa, resolvido). */
export function patchQuestion(
  data: StudyData,
  id: string,
  patch: Partial<Pick<QuestionState, 'favorite' | 'note' | 'cause' | 'resolved'>>,
  now: number,
): StudyData {
  const prev = data.questions[id] ?? blank(now);
  return { ...data, questions: { ...data.questions, [id]: { ...prev, ...patch, updatedAt: now } } };
}

/** Remove todo o progresso das questões indicadas (ou de tudo, se omitido). */
export function resetProgress(data: StudyData, ids?: Iterable<string>): StudyData {
  if (!ids) return emptyStudy();
  const questions = { ...data.questions };
  for (const id of ids) delete questions[id];
  return { ...data, questions };
}

/**
 * Mescla dados de dois dispositivos: por questão vence a versão mais recente;
 * no diário vence o dia com mais respostas registradas.
 */
export function mergeStudy(a: StudyData, b: StudyData): StudyData {
  const questions: Record<string, QuestionState> = { ...a.questions };
  for (const [id, qb] of Object.entries(b.questions ?? {})) {
    const qa = questions[id];
    if (!qa || (qb.updatedAt ?? 0) > (qa.updatedAt ?? 0)) questions[id] = qb;
  }
  const days: Record<string, DayLog> = { ...a.days };
  for (const [k, db] of Object.entries(b.days ?? {})) {
    const da = days[k];
    if (!da || db.answered > da.answered) days[k] = db;
  }
  return { version: 2, questions, days };
}

/** Sequência de dias consecutivos com pelo menos uma resposta, terminando hoje ou ontem. */
export function streak(days: Record<string, DayLog>, today: string, addDays: (k: string, n: number) => string): number {
  let cursor = days[today]?.answered ? today : addDays(today, -1);
  let count = 0;
  while (days[cursor]?.answered) {
    count++;
    cursor = addDays(cursor, -1);
  }
  return count;
}

/** Está no caderno de erros? */
export const isOpenError = (s: QuestionState | undefined) =>
  !!s && (s.lastResult === 'wrong' || s.lastResult === 'partial') && !s.resolved;

export const isAnswered = (s: QuestionState | undefined) => !!s && s.attempts > 0;
