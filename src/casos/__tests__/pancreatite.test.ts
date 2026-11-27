import { describe, expect, it } from 'vitest';
import { PANCREATITE as P } from '../pancreatite';
import { avancar, debriefing, executar, novoEstado } from '../motor';

describe('caso vivo: pancreatite aguda', () => {
  it('conduta ideal: nota 100', () => {
    const e = novoEstado(P);
    for (const id of ['exame', 'monitor', 'acesso', 'analgesia', 'antiemetico', 'moderada', 'lab', 'usg', 'etiologia']) expect(executar(P, e, id), id).toBe(true);
    avancar(P, e, 12 * 3600);
    executar(P, e, 'gravidade');
    expect(executar(P, e, 'dieta')).toBe(true);
    executar(P, e, 'colecistectomia');
    executar(P, e, 'internar');
    const d = debriefing(P, e);
    expect(d.penal).toEqual([]);
    expect(d.nota).toBe(100);
  });

  it('erros clássicos penalizados: hidratação agressiva, antibiótico, TC precoce, jejum prolongado, CPRE', () => {
    const e = novoEstado(P);
    for (const id of ['acesso', 'agressiva', 'imipenem', 'tc', 'jejumlongo', 'cpre']) executar(P, e, id);
    expect(debriefing(P, e).penal.length).toBe(5);
  });

  it('dieta bloqueada com dor intensa; sem hidratação piora', () => {
    const e = novoEstado(P);
    expect(executar(P, e, 'dieta')).toBe(false);
    avancar(P, e, 9 * 3600);
    expect(e.fx.piorou).toBe(true);
  });
});
