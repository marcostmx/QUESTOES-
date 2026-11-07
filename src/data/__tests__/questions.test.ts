import { describe, expect, it } from 'vitest';
import { validateQuestions } from '../validate';
import type { Question } from '../schema';
import { SUBJECTS } from '../schema';

const banks = import.meta.glob<Question[]>('../questions/*.json', { eager: true, import: 'default' });

describe('banco de questões', () => {
  it('tem um arquivo por disciplina', () => {
    const files = Object.keys(banks).map(p => p.split('/').pop()!.replace('.json', '')).sort();
    expect(files).toEqual(SUBJECTS.map(s => s.id).sort());
  });

  for (const [path, questions] of Object.entries(banks)) {
    it(`${path.split('/').pop()} é válido`, () => {
      expect(validateQuestions(questions)).toEqual([]);
    });
  }

  it('não há ids repetidos entre disciplinas', () => {
    const all = Object.values(banks).flat();
    expect(validateQuestions(all)).toEqual([]);
  });
});

describe('validateQuestions', () => {
  const base: Question = {
    id: 'bc-abcdef12', subject: 'bases-cirurgicas', format: 'mcq', kind: 'multipla-escolha',
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
});
