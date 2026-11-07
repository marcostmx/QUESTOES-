/**
 * Revisão espaçada (variante do SM-2, com granularidade de dias).
 *
 * Cada resposta vira uma nota:
 *  - again: errou            → volta amanhã e a facilidade cai
 *  - hard:  acertou chutando / resposta parcial → intervalo cresce pouco
 *  - good:  acertou          → intervalo multiplicado pela facilidade
 *  - easy:  acertou com folga → intervalo cresce mais rápido
 */

export type Grade = 'again' | 'hard' | 'good' | 'easy';

export interface SrsState {
  /** Revisões bem-sucedidas seguidas. */
  reps: number;
  /** Intervalo atual em dias. */
  interval: number;
  /** Fator de facilidade (1.3 – 3.0). */
  ease: number;
  /** Quantas vezes a questão foi esquecida. */
  lapses: number;
  /** Próxima revisão, formato YYYY-MM-DD (data local). */
  due: string;
}

export const MIN_EASE = 1.3;
export const MAX_EASE = 3.0;
export const START_EASE = 2.5;
export const MAX_INTERVAL = 180;

const pad = (n: number) => String(n).padStart(2, '0');

export function toDateKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function addDays(dateKey: string, days: number): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  return toDateKey(new Date(y, m - 1, d + days));
}

export function daysBetween(fromKey: string, toKey: string): number {
  const [y1, m1, d1] = fromKey.split('-').map(Number);
  const [y2, m2, d2] = toKey.split('-').map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86_400_000);
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Calcula o novo estado de revisão a partir do anterior (ou nenhum) e da nota. */
export function schedule(prev: SrsState | undefined, grade: Grade, today: string): SrsState {
  const reps = prev?.reps ?? 0;
  const interval = prev?.interval ?? 0;
  let ease = prev?.ease ?? START_EASE;
  let lapses = prev?.lapses ?? 0;
  let nextInterval: number;
  let nextReps: number;

  switch (grade) {
    case 'again':
      ease -= 0.2;
      lapses += prev ? 1 : 0;
      nextReps = 0;
      nextInterval = 1;
      break;
    case 'hard':
      ease -= 0.15;
      nextReps = reps + 1;
      nextInterval = reps === 0 ? 1 : Math.max(interval + 1, Math.round(interval * 1.2));
      break;
    case 'good':
      nextReps = reps + 1;
      nextInterval = reps === 0 ? 1 : reps === 1 ? 3 : Math.max(interval + 1, Math.round(interval * ease));
      break;
    case 'easy':
      ease += 0.15;
      nextReps = reps + 1;
      nextInterval = reps === 0 ? 4 : Math.max(interval + 2, Math.round(interval * ease * 1.3));
      break;
  }

  ease = Math.round(clamp(ease, MIN_EASE, MAX_EASE) * 100) / 100;
  nextInterval = clamp(nextInterval, 1, MAX_INTERVAL);
  return { reps: nextReps, interval: nextInterval, ease, lapses, due: addDays(today, nextInterval) };
}

export function isDue(state: SrsState | undefined, today: string): boolean {
  return !!state && state.due <= today;
}
