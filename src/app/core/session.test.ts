import { describe, expect, it } from 'vitest';
import type { Question } from '../../data/schema';
import { canConfirm, defaultFilter, dueQueue, filterQuestions, gradeAnswer, shuffle, tfScore, weakSession, weakTopics } from './session';
import { emptyStudy, patchQuestion, recordAnswer } from './study';

const q = (id: string, extra: Partial<Question> = {}): Question => ({
  id, subject: 'farmacologia', exam: 'PR2', format: 'mcq', kind: 'multipla-escolha', stem: id,
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
    expect(filterQuestions(all, emptyStudy(), { ...f, formats: ['aberta'] }, today).map(x => x.id)).toEqual(['far-2']);
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

describe('gradeAnswer', () => {
  const mcq = q('far-9');
  const multi = q('far-8', { format: 'multi', options: ['a', 'b', 'c', 'd'], answerIndex: undefined, answerIndices: [1, 3] });
  const tf = q('far-7', { format: 'tf', options: undefined, answerIndex: undefined, statements: ['1', '2', '3', '4', '5'], truth: [true, true, false, false, true] });
  const check = { ...tf, tfStyle: 'check' as const };

  it('alternativa única', () => {
    expect(gradeAnswer(mcq, { selected: 0 })).toBe('correct');
    expect(gradeAnswer(mcq, { selected: 1 })).toBe('wrong');
    expect(canConfirm(mcq, {})).toBe(false);
  });

  it('várias corretas: exata, parcial e errada', () => {
    expect(gradeAnswer(multi, { picked: [1, 3] })).toBe('correct');
    expect(gradeAnswer(multi, { picked: [3] })).toBe('partial');
    expect(gradeAnswer(multi, { picked: [1, 2, 3] })).toBe('wrong');
    expect(canConfirm(multi, { picked: [] })).toBe(false);
  });

  it('V/F por item', () => {
    expect(gradeAnswer(tf, { judged: [true, true, false, false, true] })).toBe('correct');
    expect(gradeAnswer(tf, { judged: [true, true, false, true, false] })).toBe('partial'); // 3/5
    expect(gradeAnswer(tf, { judged: [false, false, true, true, true] })).toBe('wrong');
    expect(canConfirm(tf, { judged: [true, true, false, null, true] })).toBe(false);
    expect(canConfirm(tf, { judged: [true, true, false, false, true] })).toBe(true);
  });

  it('"marque os corretos": item não marcado conta como falso', () => {
    expect(tfScore(check, { judged: [true, true, null, null, true] })).toEqual({ right: 5, total: 5 });
    expect(gradeAnswer(check, { judged: [true, true, null, null, true] })).toBe('correct');
    expect(canConfirm(check, { judged: [] })).toBe(false);
  });
});

describe('filtro de origem', () => {
  it('filtra por origem', () => {
    const list = [q('far-1', { origin: 'inedita' }), q('far-2', { origin: 'prova' })];
    expect(filterQuestions(list, emptyStudy(), { ...defaultFilter(), origins: ['inedita'] }, today).map(x => x.id)).toEqual(['far-1']);
    expect(filterQuestions(list, emptyStudy(), { ...defaultFilter(), formats: ['objetiva'] }, today)).toHaveLength(2);
  });
});

describe('pontos fracos', () => {
  const qs = [
    ...[1, 2, 3, 4].map(i => q(`far-a${i}`, { topic: 'Opioides' })),
    ...[1, 2, 3, 4].map(i => q(`far-b${i}`, { topic: 'AINEs' })),
    ...[1, 2].map(i => q(`far-c${i}`, { topic: 'Corticoides' })),
  ];
  let d = emptyStudy();
  const ans = (id: string, result: 'correct' | 'wrong') => (d = recordAnswer(d, { id, result, now: 1, today: '2026-11-01' }));
  ans('far-a1', 'wrong'); ans('far-a2', 'wrong'); ans('far-a3', 'correct'); // Opioides 1/3
  ans('far-b1', 'correct'); ans('far-b2', 'correct'); ans('far-b3', 'wrong'); // AINEs 2/3
  ans('far-c1', 'wrong'); // Corticoides: poucas respostas

  it('lista temas fracos do pior para o melhor, ignorando os com poucas respostas', () => {
    expect(weakTopics(qs, d).map(t => [t.topic, Math.round(t.rate * 100)])).toEqual([
      ['Opioides', 33],
      ['AINEs', 67],
    ]);
  });

  it('monta a sessão com erros primeiro e alterna os temas', () => {
    const s = weakSession(qs, d, today, 10, () => 0.5).map(x => x.id);
    expect(s.slice(0, 2).sort()).toEqual(['far-a1', 'far-b3']); // um erro de cada tema
    expect(s).toContain('far-b1'); // acertada, mas com revisão vencida
    expect(s).toContain('far-a4'); // ainda não feita, de um tema fraco
    expect(s.every(id => !id.startsWith('far-c'))).toBe(true);
  });

  it('sem dados suficientes não há sessão', () => {
    expect(weakSession(qs, emptyStudy(), today)).toEqual([]);
  });
});
