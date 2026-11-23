import { describe, expect, it } from 'vitest';
import { EAP } from '../eap';
import { avancar, debriefing, executar, novoEstado } from '../motor';

describe('caso vivo: edema agudo de pulmão', () => {
  it('conduta ideal: melhora sem intubação e nota 100', () => {
    const e = novoEstado(EAP);
    for (const id of ['sentar', 'monitor', 'oximetro', 'nitratoSL', 'acesso', 'vni', 'tridil', 'furosemida', 'exame', 'anamnese', 'ecg', 'lab', 'imagem']) expect(executar(EAP, e, id), id).toBe(true);
    avancar(EAP, e, 10 * 60);
    expect(e.v.spo2).toBeGreaterThan(92);
    expect(e.fx.rebaixada).toBeUndefined();
    executar(EAP, e, 'uti');
    const d = debriefing(EAP, e);
    expect(d.penal).toEqual([]);
    expect(d.nota).toBe(100);
  });

  it('sem VNI nem vasodilatador a paciente rebaixa e, sem intubação, para', () => {
    const e = novoEstado(EAP);
    executar(EAP, e, 'monitor');
    avancar(EAP, e, 30 * 60);
    expect(e.fx.rebaixada).toBe(true);
    expect(e.fim?.motivo).toBe('obito');
  });

  it('soro, morfina e betabloqueador são penalizados', () => {
    const e = novoEstado(EAP);
    for (const id of ['acesso', 'soro', 'morfina', 'metoprolol']) executar(EAP, e, id);
    expect(debriefing(EAP, e).penal.length).toBe(3);
  });
});
