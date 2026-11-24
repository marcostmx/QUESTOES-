import { describe, expect, it } from 'vitest';
import { DPOC as D } from '../dpoc';
import { avancar, debriefing, executar, novoEstado } from '../motor';

describe('caso vivo: DPOC exacerbada', () => {
  it('conduta ideal: VNI corrige a acidose, nota 100', () => {
    const e = novoEstado(D);
    for (const id of ['oximetro', 'venturi', 'monitor', 'gaso', 'bronco', 'corticoide', 'atb', 'vni', 'acesso', 'exame', 'rx']) expect(executar(D, e, id), id).toBe(true);
    avancar(D, e, 50 * 60);
    expect((e.fx.pco2 as number)).toBeLessThan(55);
    executar(D, e, 'gaso');
    executar(D, e, 'internar');
    const d = debriefing(D, e);
    expect(d.penal).toEqual([]);
    expect(d.nota).toBe(100);
  });

  it('O₂ em alto fluxo sem VNI leva à narcose e parada', () => {
    const e = novoEstado(D);
    executar(D, e, 'reservatorio');
    avancar(D, e, 80 * 60);
    expect(e.fx.rebaixado).toBeDefined();
    expect(e.fim?.motivo).toBe('obito');
  });
});
