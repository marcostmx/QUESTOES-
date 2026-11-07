import { describe, expect, it } from 'vitest';
import type { Question } from '../../data/schema';
import { defaultFilter, dueQueue, filterQuestions, shuffle } from './session';
import { emptyStudy, patchQuestion, recordAnswer } from './study';

const q = (id: string, extra: Partial<Question> = {}): Question => ({
  id, subject: 'farmacologia', format: 'mcq', kind: 'multipla-escolha', stem: id,
  options: ['a', 'b'], answerIndex: 0, explanation: 'x', ...extra,
});

const all = [
  q('far-1'),
  q('far-2', { format: 'open', kind: 'discursiva', options: undefined, answerIndex: undefined }),
  q('bc-1', { subject: 'bases-cirurgicas' }),
  q('iesc-1', { subject: 'iesc-iv', topic: 'Módulo 1' }),
];
const today = '2026-11-07';

describe('filterQuestions', () => {
  it('sem filtros devolve tudo na ordem do banco', () => {
    expect(filterQuestions(all, emptyStudy(), defaultFilter(), today).map(x => x.id)).toEqual(['far-1', 'far-2', 'bc-1', 'iesc-1']);
  });

  it('filtra por disciplina, formato e tema', () => {
    const f = defaultFilter(['farmacologia']);
    expect(filterQuestions(all, emptyStudy(), f, today).map(x => x.id)).toEqual(['far-1', 'far-2']);
    expect(filterQuestions(all, emptyStudy(), { ...f, formats: ['open'] }, today).map(x => x.id)).toEqual(['far-2']);
    expect(filterQuestions(all, emptyStudy(), { ...defaultFilter(), topics: ['Módulo 1'] }, today).map(x => x.id)).toEqual(['iesc-1']);
  });

  it('filtra por situação', () => {
    let d = recordAnswer(emptyStudy(), { id: 'far-1', result: 'wrong', now: 1, today: '2026-11-01' });
    d = patchQuestion(d, 'bc-1', { favorite: true }, 1);
    const run = (status: any) => filterQuestions(all, d, { ...defaultFilter(), status }, today).map(x => x.id);
    expect(run('nao-respondidas')).toEqual(['far-2', 'bc-1', 'iesc-1']);
    expect(run('erradas')).toEqual(['far-1']);
    expect(run('favoritas')).toEqual(['bc-1']);
    expect(run('revisar-hoje')).toEqual(['far-1']);
  });

  it('limita a quantidade e embaralha sem perder itens', () => {
    expect(filterQuestions(all, emptyStudy(), { ...defaultFilter(), limit: 2 }, today)).toHaveLength(2);
    const shuffled = filterQuestions(all, emptyStudy(), { ...defaultFilter(), order: 'aleatoria' }, today, () => 0);
    expect(shuffled.map(x => x.id).sort()).toEqual(all.map(x => x.id).sort());
  });
});

describe('dueQueue', () => {
  it('ordena pelas mais atrasadas', () => {
    let d = recordAnswer(emptyStudy(), { id: 'bc-1', result: 'wrong', now: 1, today: '2026-11-05' });
    d = recordAnswer(d, { id: 'far-1', result: 'wrong', now: 1, today: '2026-11-01' });
    expect(dueQueue(all, d, today).map(x => x.id)).toEqual(['far-1', 'bc-1']);
    expect(dueQueue(all, d, today, 'bases-cirurgicas').map(x => x.id)).toEqual(['bc-1']);
  });
});

describe('shuffle', () => {
  it('é uma permutação', () => {
    const a = [1, 2, 3, 4, 5];
    expect(shuffle(a).sort()).toEqual(a);
  });
});
