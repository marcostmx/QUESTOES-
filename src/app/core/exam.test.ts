import { describe, expect, it } from 'vitest';
import type { Question } from '../../data/schema';
import { apportion, buildExam, examScore, type Session } from './session';
import { emptyStudy } from './study';

const q = (id: string, extra: Partial<Question> = {}): Question => ({
  id, subject: 'farmacologia', exam: 'PR2', format: 'mcq', kind: 'multipla-escolha', stem: id,
  options: ['a', 'b'], answerIndex: 0, explanation: 'x', ...extra,
});

describe('apportion', () => {
  it('divide pelo método dos maiores restos e soma o total', () => {
    expect(apportion([3, 1], 8)).toEqual([6, 2]);
    expect(apportion([1, 1, 1], 10).reduce((a, b) => a + b)).toBe(10);
    expect(apportion([0, 0], 5)).toEqual([0, 0]);
  });
});

describe('buildExam', () => {
  // provas antigas: tema A cai 3x mais que B; 1 de 4 é discursiva
  const bank: Question[] = [
    ...Array.from({ length: 3 }, (_, i) => q(`pa${i}`, { topic: 'A', origin: 'prova' })),
    q('pb0', { topic: 'B', origin: 'prova', format: 'open', kind: 'discursiva', options: undefined, answerIndex: undefined }),
    ...Array.from({ length: 30 }, (_, i) => q(`a${i}`, { topic: 'A', origin: 'inedita' })),
    ...Array.from({ length: 30 }, (_, i) => q(`b${i}`, { topic: 'B', origin: 'inedita' })),
    ...Array.from({ length: 10 }, (_, i) => q(`o${i}`, { topic: 'B', origin: 'inedita', format: 'open', kind: 'discursiva', options: undefined, answerIndex: undefined })),
    ...Array.from({ length: 10 }, (_, i) => q(`bc${i}`, { subject: 'bases-cirurgicas' })),
  ];

  it('respeita tamanho, disciplinas e fração de discursivas (no fim)', () => {
    const exam = buildExam(bank, emptyStudy(), { subjects: ['farmacologia'], size: 20, includeOpen: true });
    expect(exam).toHaveLength(20);
    expect(new Set(exam.map(x => x.id)).size).toBe(20);
    expect(exam.every(x => x.subject === 'farmacologia')).toBe(true);
    const opens = exam.filter(x => x.format === 'open');
    expect(opens).toHaveLength(5);
    expect(exam.slice(-5).every(x => x.format === 'open')).toBe(true);
  });

  it('segue a proporção de temas das provas', () => {
    const exam = buildExam(bank, emptyStudy(), { subjects: ['farmacologia'], size: 20, includeOpen: false });
    expect(exam.filter(x => x.format === 'open')).toHaveLength(0);
    expect(exam.filter(x => x.topic === 'A').length).toBeGreaterThan(exam.filter(x => x.topic === 'B').length);
  });

  it('divide entre as disciplinas', () => {
    const exam = buildExam(bank, emptyStudy(), { subjects: ['farmacologia', 'bases-cirurgicas'], size: 10, includeOpen: false });
    expect(exam.filter(x => x.subject === 'bases-cirurgicas')).toHaveLength(5);
  });
});

describe('examScore', () => {
  it('nota de 0 a 10, parcial vale meio e discursiva sem autoavaliação fica de fora', () => {
    const qs = [q('1'), q('2'), q('3'), q('4', { format: 'open' })];
    const s: Session = {
      id: 's', kind: 'simulado', exam: 'PR2', title: 't', questionIds: qs.map(x => x.id), index: 0, createdAt: 0, mode: 'correcao',
      answers: { 1: { result: 'correct' }, 2: { result: 'partial' }, 3: { result: 'wrong', blank: true }, 4: { text: 'x', revealed: true } },
    };
    const sc = examScore(s, new Map(qs.map(x => [x.id, x])));
    expect(sc.grade).toBeCloseTo(5);
    expect(sc.blank).toBe(1);
    expect(sc.open).toBe(1);
  });
});
