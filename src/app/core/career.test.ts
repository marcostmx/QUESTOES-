import { describe, expect, it } from 'vitest';
import { carreira, desafioDoDia, rankOf, RANKS, XP } from './career';

const d = (y: number, m: number, day: number, h = 12) => new Date(y, m - 1, day, h).getTime();

describe('carreira', () => {
  it('começa em Interno I sem XP', () => {
    const k = carreira({ days: {}, osce: [], exams: [], today: '2026-11-21' });
    expect(k.xp).toBe(0);
    expect(k.rank.atual.id).toBe(RANKS[0].id);
    expect(k.conquistas.every(c => !c.feita)).toBe(true);
  });

  it('soma XP de questões, OSCE e simulados', () => {
    const k = carreira({
      days: { '2026-11-20': { answered: 10, correct: 7 } },
      osce: [{ id: 'A', date: d(2026, 11, 20), nota: 80, modo: 'prova' }],
      exams: [{ date: d(2026, 11, 19), grade: 7.5, questions: 20 }],
      today: '2026-11-21',
    });
    expect(k.partes.questoes).toBe(7 * XP.acerto + 3 * XP.erro);
    expect(k.partes.osce).toBe(Math.round((XP.osceBase + 80) * XP.osceProva));
    expect(k.partes.simulados).toBe(20 * XP.simuladoPorQuestao + 75);
  });

  it('conta sequência com OSCE ou questões e o recorde', () => {
    const k = carreira({
      days: { '2026-11-18': { answered: 1, correct: 1 }, '2026-11-19': { answered: 2, correct: 0 }, '2026-11-15': { answered: 1, correct: 1 } },
      osce: [{ id: 'A', date: d(2026, 11, 20), nota: 50 }],
      exams: [],
      today: '2026-11-21',
    });
    expect(k.totais.sequencia).toBe(3); // 18, 19, 20 (hoje ainda sem estudo)
    expect(k.totais.melhorSequencia).toBe(3);
  });

  it('desafio do dia é estável por data e dá bônus ao ser cumprido', () => {
    const dia = '2026-11-21';
    expect(desafioDoDia(dia).id).toBe(desafioDoDia(dia).id);
    const k = carreira({ days: { [dia]: { answered: 60, correct: 50 } }, osce: [{ id: 'X', date: d(2026, 11, 21), nota: 95 }, { id: 'Y', date: d(2026, 11, 21), nota: 90 }], exams: [], today: dia });
    expect(k.desafio.feito).toBe(true);
    expect(k.partes.desafios).toBe(XP.desafio);
    expect(k.xpHoje).toBe(k.xp);
  });

  it('níveis em ordem crescente', () => {
    for (let i = 1; i < RANKS.length; i++) expect(RANKS[i].min).toBeGreaterThan(RANKS[i - 1].min);
    expect(rankOf(RANKS[3].min).atual.id).toBe(RANKS[3].id);
    expect(rankOf(1e9).prox).toBeNull();
  });
});
