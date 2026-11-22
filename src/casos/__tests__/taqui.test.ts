import { describe, expect, it } from 'vitest';
import { TAQUI } from '../taqui';
import { avancar, debriefing, executar, novoEstado } from '../motor';

describe('caso vivo: taquicardia instável', () => {
  it('conduta ideal: nota 100', () => {
    const e = novoEstado(TAQUI);
    for (const id of ['exame', 'monitor', 'oximetro', 'acesso', 'o2', 'ecg', 'sedacao', 'cardioversao', 'amiodarona', 'lab', 'repor', 'anamnese']) expect(executar(TAQUI, e, id), id).toBe(true);
    expect(e.v.ritmo).toBe('sinusal');
    avancar(TAQUI, e, 120);
    executar(TAQUI, e, 'uti');
    const d = debriefing(TAQUI, e);
    expect(d.penal).toEqual([]);
    expect(d.nota).toBe(100);
  });

  it('choque não sincronizado com pulso gera FV; desfibrilar então reverte', () => {
    const e = novoEstado(TAQUI);
    executar(TAQUI, e, 'monitor');
    executar(TAQUI, e, 'desfibrilar');
    expect(e.v.ritmo).toBe('fv');
    executar(TAQUI, e, 'desfibrilar');
    expect(e.v.pulso).toBe(true);
  });

  it('sem cardioversão perde o pulso e morre', () => {
    const e = novoEstado(TAQUI);
    executar(TAQUI, e, 'monitor');
    avancar(TAQUI, e, 20 * 60);
    expect(e.fim?.motivo).toBe('obito');
  });
});
