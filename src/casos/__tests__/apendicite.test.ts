import { describe, expect, it } from 'vitest';
import { APENDICITE as A } from '../apendicite';
import { avancar, debriefing, executar, novoEstado } from '../motor';

describe('caso vivo: apendicite', () => {
  it('conduta ideal: opera antes de perfurar, nota 100', () => {
    const e = novoEstado(A);
    for (const id of ['anamnese', 'exame', 'monitor', 'acesso', 'analgesia', 'jejum', 'lab', 'usg']) expect(executar(A, e, id), id).toBe(true);
    avancar(A, e, 20 * 60);
    executar(A, e, 'alvarado');
    executar(A, e, 'atb');
    executar(A, e, 'cirurgia');
    const d = debriefing(A, e);
    expect(e.fx.perfurou).toBeUndefined();
    expect(d.penal).toEqual([]);
    expect(d.nota).toBe(100);
  });

  it('demora perfura; alta com antiespasmódico e segurar analgesia são penalizados', () => {
    const e = novoEstado(A);
    avancar(A, e, 5 * 3600);
    expect(e.fx.perfurou).toBeDefined();
    const f = novoEstado(A);
    executar(A, f, 'segurar');
    executar(A, f, 'buscopan');
    expect(debriefing(A, f).penal.length).toBe(2);
    expect(f.fim?.motivo).toBe('alta');
  });
});
