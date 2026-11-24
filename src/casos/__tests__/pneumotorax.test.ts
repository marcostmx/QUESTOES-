import { describe, expect, it } from 'vitest';
import { PNEUMOTORAX as P } from '../pneumotorax';
import { avancar, debriefing, executar, novoEstado } from '../motor';

describe('caso vivo: pneumotórax hipertensivo', () => {
  it('conduta ideal: descomprime, drena e nota 100', () => {
    const e = novoEstado(P);
    for (const id of ['abcde', 'o2', 'monitor', 'oximetro', 'descompD', 'acesso', 'analgesia', 'dreno', 'efast']) expect(executar(P, e, id), id).toBe(true);
    avancar(P, e, 10 * 60);
    expect(e.v.pulso).toBe(true);
    expect(e.v.spo2).toBeGreaterThan(93);
    executar(P, e, 'centro');
    const d = debriefing(P, e);
    expect(d.penal).toEqual([]);
    expect(d.nota).toBe(100);
  });

  it('sem descompressão para em AESP e morre', () => {
    const e = novoEstado(P);
    executar(P, e, 'monitor');
    avancar(P, e, 20 * 60);
    expect(e.fim?.motivo).toBe('obito');
  });

  it('só a agulha, sem dreno: recidiva da tensão', () => {
    const e = novoEstado(P);
    executar(P, e, 'descompD');
    avancar(P, e, 10 * 60);
    expect(e.fx.recidiva).toBe(true);
  });

  it('RX antes, lado errado e ventilação positiva antes de descomprimir são penalizados', () => {
    const e = novoEstado(P);
    for (const id of ['rx', 'descompE', 'iot']) executar(P, e, id);
    expect(debriefing(P, e).penal.length).toBe(3);
  });
});
