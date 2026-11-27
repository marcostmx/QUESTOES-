import { describe, expect, it } from 'vitest';
import { COLANGITE as C } from '../colangite';
import { avancar, debriefing, executar, novoEstado } from '../motor';

describe('caso vivo: colangite grave', () => {
  it('antibiótico, suporte e CPRE: nota 100', () => {
    const e = novoEstado(C);
    for (const id of ['exame', 'monitor', 'oximetro', 'o2', 'acesso', 'hemocultura', 'atb', 'volume', 'nora', 'lab', 'usg', 'analgesia']) expect(executar(C, e, id), id).toBe(true);
    avancar(C, e, 20 * 60);
    executar(C, e, 'tokyo');
    expect(executar(C, e, 'cpre')).toBe(true);
    avancar(C, e, 30 * 60);
    executar(C, e, 'uti');
    const d = debriefing(C, e);
    expect(d.penal).toEqual([]);
    expect(d.nota).toBe(100);
    expect((e.v.pas + 2 * e.v.pad) / 3).toBeGreaterThanOrEqual(65);
  });

  it('só antibiótico, sem drenagem, volta a piorar e morre', () => {
    const e = novoEstado(C);
    for (const id of ['acesso', 'atb']) executar(C, e, id);
    avancar(C, e, 175 * 60);
    expect(e.fim?.motivo).toBe('obito');
  });

  it('colecistectomia na fase aguda é penalizada', () => {
    const e = novoEstado(C);
    executar(C, e, 'cirurgia');
    expect(debriefing(C, e).penal.length).toBe(1);
  });
});
