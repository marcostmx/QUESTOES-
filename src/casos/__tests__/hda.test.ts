import { describe, expect, it } from 'vitest';
import { HDA as H } from '../hda';
import { avancar, debriefing, executar, novoEstado } from '../motor';

describe('caso vivo: HDA varicosa', () => {
  it('conduta ideal: estabiliza, liga as varizes e nota 100', () => {
    const e = novoEstado(H);
    for (const id of ['monitor', 'oximetro', 'acesso', 'terlipressina', 'ceftriaxona', 'cristaloide', 'sangue', 'ibp', 'lab', 'exame', 'cristaloide', 'sangue']) expect(executar(H, e, id), id).toBe(true);
    avancar(H, e, 10 * 60);
    executar(H, e, 'escore');
    expect(executar(H, e, 'eda')).toBe(true);
    avancar(H, e, 10 * 60);
    expect(e.v.pas).toBeGreaterThan(90);
    executar(H, e, 'uti');
    const d = debriefing(H, e);
    expect(d.penal.map(p => p.texto)).toEqual([]);
    expect(d.nota).toBe(100);
  });

  it('sem tratamento evolui para choque e óbito', () => {
    const e = novoEstado(H);
    executar(H, e, 'monitor');
    avancar(H, e, 100 * 60);
    expect(e.fim?.motivo).toBe('obito');
  });

  it('endoscopia bloqueada com a PA baixa; volume excessivo e betabloqueador penalizados', () => {
    const e = novoEstado(H);
    expect(executar(H, e, 'eda')).toBe(false);
    executar(H, e, 'acesso');
    for (let i = 0; i < 5; i++) executar(H, e, 'cristaloide');
    executar(H, e, 'propranolol');
    expect(debriefing(H, e).penal.length).toBe(2);
  });
});
