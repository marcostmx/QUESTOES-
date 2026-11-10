/**
 * Plano até a prova: distribui as questões ainda não feitas pelos dias que faltam,
 * reservando o último dia para revisão e simulado, e monta o bloco do dia
 * priorizando as disciplinas com pior acerto e mais questões pendentes.
 */
import type { Question, SubjectId } from '../../data/schema';
import { apportion, shuffle } from './session';
import { isAnswered, type StudyData } from './study';

export interface StudyPlan {
  /** Dias até a prova (0 = hoje). */
  daysLeft: number;
  fresh: number;
  /** Questões novas por dia para terminar o banco até a véspera. */
  perDay: number;
  /** Já feitas hoje (novas ou não). */
  doneToday: number;
  /** Ainda faltam hoje. */
  leftToday: number;
  subjects: { subject: SubjectId; fresh: number; rate: number | null }[];
}

export function daysBetween(from: string, to: string): number {
  const a = Date.UTC(+from.slice(0, 4), +from.slice(5, 7) - 1, +from.slice(8, 10));
  const b = Date.UTC(+to.slice(0, 4), +to.slice(5, 7) - 1, +to.slice(8, 10));
  return Math.round((b - a) / 86_400_000);
}

export function studyPlan(all: Question[], data: StudyData, todayKey: string, examDate: string): StudyPlan {
  const daysLeft = daysBetween(todayKey, examDate);
  const fresh = all.filter(q => !isAnswered(data.questions[q.id]));
  // conta os dias de estudo até a véspera (o dia da prova não entra); hoje conta
  const studyDays = Math.max(1, daysLeft - 1);
  const doneToday = data.days[todayKey]?.answered ?? 0;
  // o ritmo considera o que já foi feito hoje, para a meta não mudar ao longo do dia
  const perDay = daysLeft <= 0 ? 0 : Math.ceil((fresh.length + doneToday) / studyDays);
  const bySubject = new Map<SubjectId, { fresh: number; att: number; cor: number }>();
  for (const q of all) {
    const g = bySubject.get(q.subject) ?? { fresh: 0, att: 0, cor: 0 };
    const s = data.questions[q.id];
    if (!isAnswered(s)) g.fresh++;
    g.att += s?.attempts ?? 0;
    g.cor += s?.correctCount ?? 0;
    bySubject.set(q.subject, g);
  }
  const subjects = [...bySubject]
    .map(([subject, g]) => ({ subject, fresh: g.fresh, rate: g.att ? g.cor / g.att : null }))
    .sort((a, b) => b.fresh - a.fresh);
  return { daysLeft, fresh: fresh.length, perDay, doneToday, leftToday: Math.max(0, perDay - doneToday), subjects };
}

/**
 * Bloco de questões novas do dia: divide entre as disciplinas pelo número de
 * pendentes, com peso maior (×1,5) para as de acerto abaixo de 70%.
 */
export function todayBlock(all: Question[], data: StudyData, plan: StudyPlan, size = plan.leftToday, rand: () => number = Math.random): Question[] {
  if (size <= 0) return [];
  const subs = plan.subjects.filter(s => s.fresh > 0);
  const weights = subs.map(s => s.fresh * (s.rate !== null && s.rate < 0.7 ? 1.5 : 1));
  const alloc = apportion(weights, Math.min(size, plan.fresh));
  const out: Question[] = [];
  subs.forEach((s, i) => {
    const pool = all.filter(q => q.subject === s.subject && !isAnswered(data.questions[q.id]));
    out.push(...shuffle(pool, rand).slice(0, alloc[i]));
  });
  return shuffle(out, rand);
}
