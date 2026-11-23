import { describe, expect, it } from 'vitest';
import { DISSECCAO as D } from '../disseccao';
import { avancar, debriefing, executar, novoEstado } from '../motor';

describe('caso vivo: dissecção de aorta', () => {
  it('conduta ideal: controle em minutos e cirurgia, nota 100', () => {
    const e = novoEstado(D);
    for (const id of ['monitor', 'oximetro', 'acesso', 'exame', 'ecg', 'analgesia', 'esmolol', 'nitroprussiato', 'labs']) expect(executar(D, e, id), id).toBe(true);
    avancar(D, e, 6 * 60);
    expect(e.fx.controle).toBeDefined();
    executar(D, e, 'angiotc');
    executar(D, e, 'cirurgia');
    const d = debriefing(D, e);
    expect(d.penal).toEqual([]);
    expect(d.nota).toBe(100);
  });

  it('fibrinolítico leva a tamponamento e óbito', () => {
    const e = novoEstado(D);
    executar(D, e, 'acesso');
    executar(D, e, 'fibrinolise');
    avancar(D, e, 12 * 60);
    expect(e.fim?.motivo).toBe('obito');
  });

  it('vasodilatador antes do betabloqueador e AAS são penalizados', () => {
    const e = novoEstado(D);
    for (const id of ['acesso', 'nitroprussiato', 'aas']) executar(D, e, id);
    expect(debriefing(D, e).penal.length).toBe(2);
  });
});
