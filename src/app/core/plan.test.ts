import { describe, expect, it } from 'vitest';
import type { Question } from '../../data/schema';
import { daysBetween, studyPlan, todayBlock } from './plan';
import { emptyStudy, recordAnswer } from './study';

const q = (id: string, subject: Question['subject'] = 'farmacologia'): Question => ({
  id, subject, exam: 'PR2', format: 'mcq', kind: 'multipla-escolha', stem: id, options: ['a', 'b'], answerIndex: 0, explanation: 'x',
});
const bank = [...Array.from({ length: 40 }, (_, i) => q(`f${i}`)), ...Array.from({ length: 20 }, (_, i) => q(`b${i}`, 'bases-cirurgicas'))];

describe('plano até a prova', () => {
  it('conta os dias corretamente', () => {
    expect(daysBetween('2026-11-10', '2026-11-20')).toBe(10);
    expect(daysBetween('2026-11-30', '2026-12-01')).toBe(1);
  });

  it('divide as pendentes até a véspera', () => {
    const p = studyPlan(bank, emptyStudy(), '2026-11-10', '2026-11-16'); // 5 dias de estudo
    expect(p.daysLeft).toBe(6);
    expect(p.perDay).toBe(12);
    expect(p.leftToday).toBe(12);
  });

  it('a meta do dia não muda depois de responder', () => {
    let d = emptyStudy();
    const before = studyPlan(bank, d, '2026-11-10', '2026-11-16');
    for (let i = 0; i < 5; i++) d = recordAnswer(d, { id: `f${i}`, result: 'correct', now: Date.parse('2026-11-10T12:00:00'), today: '2026-11-10' });
    const after = studyPlan(bank, d, '2026-11-10', '2026-11-16');
    expect(after.perDay).toBe(before.perDay);
    expect(after.leftToday).toBe(before.perDay - after.doneToday);
  });

  it('o bloco do dia tem só questões novas, sem repetir', () => {
    const p = studyPlan(bank, emptyStudy(), '2026-11-10', '2026-11-16');
    const b = todayBlock(bank, emptyStudy(), p);
    expect(b).toHaveLength(12);
    expect(new Set(b.map(x => x.id)).size).toBe(12);
    expect(b.filter(x => x.subject === 'farmacologia').length).toBe(8);
  });
});
