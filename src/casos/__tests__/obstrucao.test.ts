import { describe, expect, it } from 'vitest';
import { OBSTRUCAO as O } from '../obstrucao';
import { avancar, debriefing, executar, novoEstado } from '../motor';

describe('caso vivo: obstrução por bridas', () => {
  it('conservador com contraste: resolve, nota 100', () => {
    const e = novoEstado(O);
    for (const id of ['anamnese', 'exame', 'monitor', 'acesso', 'sng', 'hidratacao', 'analgesia', 'lab', 'rx', 'tc', 'cirurgiao', 'gastrografina']) expect(executar(O, e, id), id).toBe(true);
    avancar(O, e, 9 * 3600);
    expect(e.fx.resolvida).toBe(true);
    executar(O, e, 'internar');
    const d = debriefing(O, e);
    expect(d.penal).toEqual([]);
    expect(d.nota).toBe(100);
  });

  it('sem descompressão estrangula; cirurgia a tempo conta como conduta certa', () => {
    const e = novoEstado(O);
    avancar(O, e, 7 * 3600);
    expect(e.fx.estrangulou).toBeDefined();
    expect(executar(O, e, 'gastrografina')).toBe(false);
    executar(O, e, 'cirurgia');
    expect(debriefing(O, e).metas.find(m => m.m.id === 'conduta')!.ok).toBe(true);
  });

  it('procinético e laxante penalizados; sem cirurgia após estrangular, óbito', () => {
    const e = novoEstado(O);
    executar(O, e, 'procinetico');
    executar(O, e, 'laxante');
    expect(debriefing(O, e).penal.length).toBe(2);
    avancar(O, e, 15.9 * 3600);
    expect(e.fim?.motivo).toBe('obito');
  });
});
