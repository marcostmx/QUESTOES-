import { describe, expect, it } from 'vitest';
import { MEGACODE as M } from '../megacode';
import { avancar, debriefing, executar, novoEstado } from '../motor';

const ciclo = (e: ReturnType<typeof novoEstado>) => {
  executar(M, e, 'rcp');
  avancar(M, e, 2 * 60 - 10);
  executar(M, e, 'checar');
};

describe('megacode ACLS', () => {
  it('conduta ideal: FV → AESP → RCE com nota 100', () => {
    const e = novoEstado(M);
    executar(M, e, 'rcp');
    executar(M, e, 'checar');
    executar(M, e, 'choque');
    executar(M, e, 'rcp');
    executar(M, e, 'acesso');
    avancar(M, e, 2 * 60 - 60);
    executar(M, e, 'checar');
    executar(M, e, 'choque');
    executar(M, e, 'rcp');
    executar(M, e, 'adrenalina');
    executar(M, e, 'via');
    executar(M, e, 'hst');
    avancar(M, e, 2 * 60 - 120);
    executar(M, e, 'checar');
    executar(M, e, 'choque');
    executar(M, e, 'rcp');
    executar(M, e, 'amiodarona');
    executar(M, e, 'gaso');
    avancar(M, e, 2 * 60 - 40);
    executar(M, e, 'checar');
    expect(e.fx.aespEm).toBeDefined();
    executar(M, e, 'rcp');
    executar(M, e, 'adrenalina');
    executar(M, e, 'calcio');
    executar(M, e, 'bic');
    executar(M, e, 'insulina');
    avancar(M, e, 2 * 60 - 80);
    executar(M, e, 'checar');
    expect(e.v.pulso).toBe(true);
    executar(M, e, 'pos');
    executar(M, e, 'uti');
    const d = debriefing(M, e);
    expect(d.penal.map(p => `${p.t} ${p.texto}`)).toEqual([]);
    expect(d.nota).toBe(100);
  });

  it('sem tratar a causa a AESP persiste e termina em óbito', () => {
    const e = novoEstado(M);
    for (let i = 0; i < 3; i++) {
      ciclo(e);
      executar(M, e, 'choque');
    }
    executar(M, e, 'acesso');
    executar(M, e, 'amiodarona');
    for (let i = 0; i < 15 && !e.fim; i++) ciclo(e);
    expect(e.v.pulso).toBe(false);
    expect(e.fim?.motivo).toBe('obito');
  });

  it('choque em AESP é penalizado', () => {
    const e = novoEstado(M);
    for (let i = 0; i < 3; i++) {
      ciclo(e);
      executar(M, e, 'choque');
    }
    executar(M, e, 'rcp');
    executar(M, e, 'acesso');
    executar(M, e, 'amiodarona');
    ciclo(e);
    executar(M, e, 'choque');
    expect(e.penal.some(p => /não chocável/.test(p.texto))).toBe(true);
  });
});
