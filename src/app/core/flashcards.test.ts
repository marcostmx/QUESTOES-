import { describe, expect, it } from 'vitest';
import type { Question } from '../../data/schema';
import { avaliar, cartaoDeFalha, cartaoDeQuestao, errouAlgumaVez, INTERVALOS, montarBaralho, vence } from './flashcards';

const q: Question = { id: 'x1', subject: 'propedeutica', exam: 'PR2', format: 'mcq', kind: 'conceitual', stem: 'Qual sinal indica colecistite?', options: ['Blumberg', 'Murphy', 'Rovsing'], answerIndex: 1, explanation: 'Murphy: parada da inspiração à palpação do ponto cístico.' } as unknown as Question;

describe('flashcards do que o aluno errou', () => {
  it('entram as questões erradas, não as sempre certas', () => {
    expect(errouAlgumaVez({ attempts: 2, correctCount: 1, updatedAt: 0 })).toBe(true);
    expect(errouAlgumaVez({ attempts: 2, correctCount: 2, lastResult: 'correct', updatedAt: 0 })).toBe(false);
    const b = montarBaralho(new Map([[q.id, q]]), { x1: { attempts: 1, correctCount: 0, lastResult: 'wrong', updatedAt: 0 } }, [], () => 'Propedêutica');
    expect(b).toHaveLength(1);
    expect(b[0].verso).toBe('B) Murphy');
  });
  it('gera cartão de manobra esquecida no OSCE', () => {
    const c = cartaoDeFalha('man:abd-murphy')!;
    expect(c.frente).toMatch(/Murphy/);
    expect(c.verso).toMatch(/^Normal:/);
    expect(cartaoDeFalha('xyz:qualquer')).toBeNull();
    const b = montarBaralho(new Map(), {}, [{ key: 'k', id: 'ABD-07', date: 0, nota: 50, pendentes: 0, falhas: ['man:abd-murphy', 'ab:higiene'] }], () => '');
    expect(b.map(x => x.id)).toEqual(['o:man:abd-murphy', 'o:ab:higiene']);
  });
  it('caixas de Leitner', () => {
    const t = 1_000_000;
    const a = avaliar(undefined, 'acertei', t);
    expect(a.caixa).toBe(1);
    expect(a.proxima).toBe(t + INTERVALOS[1]);
    expect(avaliar(a, 'errei', t).caixa).toBe(0);
    expect(vence(a, t)).toBe(false);
    expect(vence(undefined, t)).toBe(true);
    expect(cartaoDeQuestao(q, 'P').questaoId).toBe('x1');
  });
});
