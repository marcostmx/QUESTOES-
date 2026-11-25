import { describe, expect, it } from 'vitest';
import { ag, compensacao, deltaDelta, GASOS, ph, primario } from '../gaso';

const g = (id: string) => GASOS.find(x => x.id === id)!;

describe('gasometria passo a passo', () => {
  it('distúrbio primário de cada caso', () => {
    expect(primario(g('cad'))).toBe('acidose-metabolica');
    expect(primario(g('diarreia'))).toBe('acidose-metabolica');
    expect(primario(g('vomitos'))).toBe('alcalose-metabolica');
    expect(primario(g('opioide'))).toBe('acidose-respiratoria');
    expect(primario(g('dpoc'))).toBe('acidose-respiratoria');
    expect(primario(g('ansiedade'))).toBe('alcalose-respiratoria');
    expect(primario(g('misto-resp'))).toBe('acidose-metabolica');
    expect(primario(g('misto-alc'))).toBe('normal');
  });

  it('compensação, ânion gap e delta-delta', () => {
    for (const id of ['cad', 'diarreia', 'vomitos', 'opioide', 'dpoc', 'ansiedade', 'lactica']) expect(compensacao(g(id)).associado, id).toBe('nenhum');
    expect(compensacao(g('misto-resp')).associado).toBe('acidose-respiratoria');
    expect(ag(g('diarreia'))).toBeLessThanOrEqual(12);
    expect(ag(g('cad'))).toBeGreaterThan(20);
    expect(deltaDelta(g('cad'))!.tipo).toBe('puro');
    expect(deltaDelta(g('misto-alc'))!.tipo).toBe('mais-alcalose');
    expect(deltaDelta(g('diarreia'))).toBeNull();
  });

  it('pH coerente (Henderson-Hasselbalch) e causa única entre as opções', () => {
    expect(ph(40, 24)).toBeCloseTo(7.4, 2);
    for (const x of GASOS) expect(new Set([x.causa, ...x.distratores]).size).toBe(4);
  });
});
