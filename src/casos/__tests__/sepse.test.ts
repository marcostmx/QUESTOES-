import { describe, expect, it } from 'vitest';
import { SEPSE as S } from '../sepse';
import { avancar, debriefing, executar, novoEstado } from '../motor';

describe('caso vivo: pneumonia com choque séptico', () => {
  it('pacote da 1ª hora: estabiliza e nota 100', () => {
    const e = novoEstado(S);
    for (const id of ['monitor', 'oximetro', 'o2', 'acesso', 'lactato', 'hemocultura', 'atb', 'volume', 'exame', 'lab', 'nora']) expect(executar(S, e, id), id).toBe(true);
    avancar(S, e, 60 * 60);
    expect((e.v.pas + 2 * e.v.pad) / 3).toBeGreaterThanOrEqual(65);
    executar(S, e, 'lactato');
    executar(S, e, 'curb');
    executar(S, e, 'uti');
    const d = debriefing(S, e);
    expect(d.penal).toEqual([]);
    expect(d.nota).toBe(100);
  });

  it('sem antibiótico nem volume evolui para choque refratário e óbito', () => {
    const e = novoEstado(S);
    executar(S, e, 'monitor');
    avancar(S, e, 115 * 60);
    expect(e.fim?.motivo).toBe('obito');
  });

  it('amido e dopamina são penalizados', () => {
    const e = novoEstado(S);
    for (const id of ['acesso', 'amido', 'dopamina']) executar(S, e, id);
    expect(debriefing(S, e).penal.length).toBe(2);
  });
});
