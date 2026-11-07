import { describe, expect, it } from 'vitest';
import { emptyStudy, isOpenError, mergeStudy, patchQuestion, recordAnswer, resetProgress, streak } from './study';
import { addDays } from './srs';

const today = '2026-11-07';

describe('recordAnswer', () => {
  it('registra acerto, diário e agenda revisão', () => {
    const d = recordAnswer(emptyStudy(), { id: 'q1', result: 'correct', selected: 2, now: 1, today });
    expect(d.questions.q1).toMatchObject({ attempts: 1, correctCount: 1, lastResult: 'correct', lastSelected: 2 });
    expect(d.questions.q1.srs?.due).toBe('2026-11-08');
    expect(d.days[today]).toEqual({ answered: 1, correct: 1 });
  });

  it('erro entra no caderno de erros; novo acerto mantém revisado como estava', () => {
    let d = recordAnswer(emptyStudy(), { id: 'q1', result: 'wrong', now: 1, today });
    expect(isOpenError(d.questions.q1)).toBe(true);
    d = patchQuestion(d, 'q1', { resolved: true }, 2);
    expect(isOpenError(d.questions.q1)).toBe(false);
    d = recordAnswer(d, { id: 'q1', result: 'wrong', now: 3, today });
    expect(isOpenError(d.questions.q1)).toBe(true);
  });

  it('chute errado marca a causa como chute', () => {
    const d = recordAnswer(emptyStudy(), { id: 'q1', result: 'wrong', guessed: true, now: 1, today });
    expect(d.questions.q1.cause).toBe('chute');
  });

  it('não altera o objeto original', () => {
    const base = emptyStudy();
    recordAnswer(base, { id: 'q1', result: 'correct', now: 1, today });
    expect(base.questions).toEqual({});
  });
});

describe('mergeStudy', () => {
  it('vence a versão mais recente de cada questão', () => {
    const a = patchQuestion(emptyStudy(), 'q1', { favorite: true }, 10);
    const b = patchQuestion(patchQuestion(emptyStudy(), 'q1', { favorite: false }, 20), 'q2', { note: 'x' }, 5);
    const m = mergeStudy(a, b);
    expect(m.questions.q1.favorite).toBe(false);
    expect(m.questions.q2.note).toBe('x');
    expect(mergeStudy(b, a).questions.q1.favorite).toBe(false);
  });

  it('no diário mantém o dia com mais respostas', () => {
    const a = { ...emptyStudy(), days: { [today]: { answered: 5, correct: 3 } } };
    const b = { ...emptyStudy(), days: { [today]: { answered: 2, correct: 2 }, '2026-11-06': { answered: 1, correct: 0 } } };
    expect(mergeStudy(a, b).days).toEqual({ [today]: { answered: 5, correct: 3 }, '2026-11-06': { answered: 1, correct: 0 } });
  });
});

describe('outros', () => {
  it('resetProgress parcial e total', () => {
    let d = recordAnswer(emptyStudy(), { id: 'a', result: 'correct', now: 1, today });
    d = recordAnswer(d, { id: 'b', result: 'correct', now: 1, today });
    expect(Object.keys(resetProgress(d, ['a']).questions)).toEqual(['b']);
    expect(resetProgress(d).questions).toEqual({});
  });

  it('streak conta dias seguidos até hoje ou ontem', () => {
    const days = { '2026-11-05': { answered: 1, correct: 1 }, '2026-11-06': { answered: 3, correct: 1 } };
    expect(streak(days, today, addDays)).toBe(2);
    expect(streak({ ...days, [today]: { answered: 1, correct: 0 } }, today, addDays)).toBe(3);
    expect(streak(days, '2026-11-09', addDays)).toBe(0);
  });
});
