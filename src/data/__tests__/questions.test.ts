import { describe, expect, it } from 'vitest';
import { validateQuestions } from '../validate';
import type { Question } from '../schema';
import { EXAMS, SUBJECTS } from '../schema';

const banks = import.meta.glob<Question[]>('../questions/*/*.json', { eager: true, import: 'default' });
const entries = Object.entries(banks).map(([path, qs]) => {
  const [exam, file] = path.split('/').slice(-2);
  return { exam, subject: file.replace('.json', ''), qs };
});

describe('banco de questões', () => {
  it('só usa provas e disciplinas conhecidas', () => {
    for (const e of entries) {
      expect(EXAMS.map(x => x.id.toLowerCase())).toContain(e.exam);
      expect(SUBJECTS.map(s => s.id as string)).toContain(e.subject);
    }
  });

  it('a prova atual tem questões', () => {
    expect(entries.filter(e => e.exam === EXAMS[0].id.toLowerCase()).reduce((n, e) => n + e.qs.length, 0)).toBeGreaterThan(0);
  });

  for (const e of entries) {
    it(`${e.exam}/${e.subject} é válido e está no arquivo certo`, () => {
      expect(validateQuestions(e.qs)).toEqual([]);
      for (const q of e.qs) {
        expect(q.subject).toBe(e.subject);
        expect(q.exam.toLowerCase()).toBe(e.exam);
      }
    });
  }

  it('não há ids repetidos entre arquivos', () => {
    expect(validateQuestions(entries.flatMap(e => e.qs))).toEqual([]);
  });
});

describe('validateQuestions', () => {
  const base: Question = {
    id: 'bc-abcdef12', subject: 'bases-cirurgicas', exam: 'PR2', format: 'mcq', kind: 'multipla-escolha',
    stem: 'Pergunta?', options: ['Um', 'Dois'], answerIndex: 0, explanation: 'Porque sim.',
  };

  it('aceita uma questão correta', () => {
    expect(validateQuestions([base])).toEqual([]);
  });

  it('rejeita answerIndex fora do intervalo', () => {
    expect(validateQuestions([{ ...base, answerIndex: 5 }])[0].message).toMatch(/answerIndex/);
  });

  it('rejeita alternativas com prefixo de letra', () => {
    expect(validateQuestions([{ ...base, options: ['A) Um', 'B) Dois'] }]).length).toBeGreaterThan(0);
  });

  it('detecta duplicatas mesmo com alternativas embaralhadas', () => {
    const dup = { ...base, id: 'bc-00000000', options: ['Dois', 'Um'], answerIndex: 1 };
    expect(validateQuestions([base, dup]).some(i => /duplicado/.test(i.message))).toBe(true);
  });

  it('a mesma questão pode existir em provas diferentes', () => {
    expect(validateQuestions([base, { ...base, id: 'bc-00000001', exam: 'PR1' }])).toEqual([]);
  });

  it('valida várias corretas', () => {
    const multi: Question = { ...base, format: 'multi', answerIndex: undefined, answerIndices: [0, 1] };
    expect(validateQuestions([multi])).toEqual([]);
    expect(validateQuestions([{ ...multi, answerIndices: [0, 7] }])[0].message).toMatch(/answerIndices/);
  });

  it('valida V/F por item', () => {
    const tf: Question = { ...base, format: 'tf', options: undefined, answerIndex: undefined, statements: ['a', 'b'], truth: [true, false] };
    expect(validateQuestions([tf])).toEqual([]);
    expect(validateQuestions([{ ...tf, truth: [true] }])[0].message).toMatch(/truth/);
  });

  it('rejeita prova desconhecida', () => {
    expect(validateQuestions([{ ...base, exam: 'PR9' as any }])[0].message).toMatch(/prova/);
  });
});
