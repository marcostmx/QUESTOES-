import { describe, expect, it } from 'vitest';
import { BRADI } from '../bradi';
import { avancar, debriefing, executar, novoEstado } from '../motor';

describe('caso vivo: bradicardia instável', () => {
  it('conduta ideal: nota 100 e estabilização', () => {
    const e = novoEstado(BRADI);
    for (const id of ['monitor', 'oximetro', 'acesso', 'exame', 'o2', 'atropina', 'ecg', 'analgesia', 'mp', 'anamnese', 'lab']) expect(executar(BRADI, e, id), id).toBe(true);
    avancar(BRADI, e, 3 * 60);
    expect(e.v.fc).toBeGreaterThan(65);
    expect(e.v.pas).toBeGreaterThan(100);
    executar(BRADI, e, 'transvenoso');
    const d = debriefing(BRADI, e);
    expect(e.fim?.motivo).toBe('internado');
    expect(d.penal).toEqual([]);
    expect(d.nota).toBe(100);
  });

  it('sem cronotropismo a paciente para e morre', () => {
    const e = novoEstado(BRADI);
    executar(BRADI, e, 'monitor');
    avancar(BRADI, e, 25 * 60);
    expect(e.fim?.motivo).toBe('obito');
  });

  it('adenosina e amiodarona são penalizadas; atropina tem dose máxima', () => {
    const e = novoEstado(BRADI);
    for (const id of ['acesso', 'adenosina', 'amiodarona', 'atropina', 'atropina', 'atropina']) executar(BRADI, e, id);
    expect(executar(BRADI, e, 'atropina')).toBe(false);
    expect(debriefing(BRADI, e).penal.length).toBe(2);
  });
});
