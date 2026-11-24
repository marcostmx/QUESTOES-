import { describe, expect, it } from 'vitest';
import { ASMA as A } from '../asma';
import { avancar, debriefing, executar, novoEstado } from '../motor';

describe('caso vivo: asma grave', () => {
  it('conduta ideal: melhora e nota 100', () => {
    const e = novoEstado(A);
    for (const id of ['exame', 'oximetro', 'o2', 'saba', 'ipratropio', 'pfe', 'monitor', 'corticoide', 'acesso', 'gaso']) expect(executar(A, e, id), id).toBe(true);
    avancar(A, e, 20 * 60 - e.t);
    executar(A, e, 'saba');
    executar(A, e, 'magnesio');
    avancar(A, e, 40 * 60 - e.t);
    executar(A, e, 'saba');
    avancar(A, e, 10 * 60);
    expect(e.v.spo2).toBeGreaterThan(93);
    executar(A, e, 'internar');
    const d = debriefing(A, e);
    expect(d.penal).toEqual([]);
    expect(d.nota).toBe(100);
  });

  it('sem broncodilatador evolui para tórax silencioso e parada', () => {
    const e = novoEstado(A);
    executar(A, e, 'monitor');
    avancar(A, e, 70 * 60);
    expect(e.fx.rebaixada).toBeDefined();
    expect(e.fim?.motivo).toBe('obito');
  });

  it('SABA respeita o intervalo; sedativo e alta precoce são penalizados', () => {
    const e = novoEstado(A);
    executar(A, e, 'saba');
    expect(executar(A, e, 'saba')).toBe(false);
    executar(A, e, 'diazepam');
    executar(A, e, 'alta');
    expect(debriefing(A, e).penal.length).toBe(2);
  });
});
