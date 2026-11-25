import { describe, expect, it } from 'vitest';
import { TEP as T } from '../tep';
import { avancar, debriefing, executar, novoEstado } from '../motor';

describe('caso vivo: TEP', () => {
  it('anticoagula, confirma, trombolisa no choque: nota 100', () => {
    const e = novoEstado(T);
    for (const id of ['monitor', 'oximetro', 'o2', 'wells', 'acesso', 'heparina', 'ecg', 'lab', 'anamnese']) expect(executar(T, e, id), id).toBe(true);
    avancar(T, e, 17 * 60 - e.t);
    expect(e.fx.choqueEm).toBeDefined();
    executar(T, e, 'eco');
    executar(T, e, 'nora');
    executar(T, e, 'alteplase');
    avancar(T, e, 15 * 60);
    expect(e.fx.lisado).toBe(true);
    executar(T, e, 'uti');
    const d = debriefing(T, e);
    expect(d.penal).toEqual([]);
    expect(d.nota).toBe(100);
  });

  it('sem trombólise no choque evolui para parada e óbito', () => {
    const e = novoEstado(T);
    executar(T, e, 'monitor');
    avancar(T, e, 60 * 60);
    expect(e.fim?.motivo).toBe('obito');
  });

  it('volume excessivo, D-dímero e trombólise na paciente estável são penalizados', () => {
    const e = novoEstado(T);
    for (const id of ['acesso', 'ddimero', 'soro2l', 'alteplase']) executar(T, e, id);
    expect(debriefing(T, e).penal.length).toBeGreaterThanOrEqual(3);
  });
});
