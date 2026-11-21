import { describe, expect, it } from 'vitest';
import { IAM } from '../iam';
import { avancar, debriefing, executar, novoEstado } from '../motor';
import { amostra, derivacoes } from '../ecg';

const roda = (ids: string[], esperarAte?: number) => {
  const e = novoEstado(IAM);
  for (const id of ids) expect(executar(IAM, e, id), id).toBe(true);
  if (esperarAte) avancar(IAM, e, esperarAte - e.t);
  return e;
};

describe('caso vivo: IAM com supra', () => {
  it('conduta ideal: nota 100, reperfusão e transferência', () => {
    const e = roda(['monitor', 'oximetro', 'acesso', 'ecg', 'aas', 'anamnese', 'clopidogrel', 'enoxaparina', 'tnk']);
    avancar(IAM, e, 22 * 60);
    expect(e.fx.reperfusao).toBe(true);
    expect(e.fx.fvInicio).toBeUndefined();
    expect(executar(IAM, e, 'transferir')).toBe(true);
    const d = debriefing(IAM, e);
    expect(e.fim?.motivo).toBe('transferido');
    expect(d.penal).toEqual([]);
    expect(d.nota).toBe(100);
  });

  it('sem reperfusão o paciente faz FV e morre sem choque', () => {
    const e = roda(['monitor']);
    avancar(IAM, e, 40 * 60);
    expect(e.fx.fvInicio).toBeDefined();
    expect(e.fim?.motivo).toBe('obito');
    expect(debriefing(IAM, e).nota).toBeLessThanOrEqual(30);
  });

  it('choque precoce na FV recupera a circulação', () => {
    const e = roda(['monitor']);
    avancar(IAM, e, 17 * 60 + 30);
    expect(e.v.ritmo).toBe('fv');
    executar(IAM, e, 'choque');
    expect(e.v.pulso).toBe(true);
  });

  it('penaliza O2 sem hipoxemia, betabloqueador IV e transferência tardia sem fibrinólise', () => {
    const e = roda(['monitor', 'oximetro', 'acesso', 'o2', 'metoprolol', 'icp']);
    const d = debriefing(IAM, e);
    expect(d.penal.length).toBe(3);
    expect(e.fim?.motivo).toBe('transferido');
    expect(d.nota).toBeLessThan(40);
  });

  it('fibrinólise exige ECG e acesso', () => {
    const e = novoEstado(IAM);
    expect(executar(IAM, e, 'tnk')).toBe(false);
  });

  it('ECG: supra anterior tem ST elevado em V2 e recíproco em DIII; traçados são finitos', () => {
    const d = derivacoes('ecg-supra-anterior');
    expect(d.V2.st).toBeGreaterThan(0.3);
    expect(d.III.st).toBeLessThan(0);
    for (const r of ['sinusal', 'supra', 'riva', 'fv', 'tv', 'assistolia', 'fa'] as const)
      for (let t = 0; t < 3; t += 0.01) expect(Number.isFinite(amostra(r, t, 90))).toBe(true);
  });
});
