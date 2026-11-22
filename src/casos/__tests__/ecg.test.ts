import { describe, expect, it } from 'vitest';
import { DERIVACOES, PADROES, padraoPorId, preparar, valor } from '../ecgPadroes';

describe('padrões de ECG', () => {
  it('ids únicos e traçados finitos em todas as derivações', () => {
    expect(new Set(PADROES.map(p => p.id)).size).toBe(PADROES.length);
    for (const p of PADROES) {
      const c = preparar(p);
      for (const l of DERIVACOES) for (let t = 0; t < 10; t += 0.05) expect(Number.isFinite(valor(p, l, t, c)), `${p.id} ${l}`).toBe(true);
    }
  });

  it('BAV: Wenckebach e Mobitz II bloqueiam P; BAV total dissocia', () => {
    const m1 = padraoPorId('mobitz1').plano();
    expect(m1.p.length).toBeGreaterThan(m1.qrs.length);
    const m2 = padraoPorId('mobitz2').plano();
    expect(m2.p.length).toBeGreaterThan(m2.qrs.length);
    const t = padraoPorId('bavt').plano();
    expect(t.p.length).toBeGreaterThan(t.qrs.length * 2 - 1);
  });

  it('FC aproximada coerente com o rótulo', () => {
    const fc = (id: string) => {
      const q = padraoPorId(id).plano().qrs.filter(b => b.q < 10);
      return ((q.length - 1) / (q[q.length - 1].q - q[0].q)) * 60;
    };
    expect(fc('flutter')).toBeCloseTo(150, -1);
    expect(fc('tv')).toBeGreaterThan(150);
    expect(fc('bradi-sinusal')).toBeLessThan(50);
  });

  it('IAM inferior tem supra em III e recíproco em aVL; QRS largo nos bloqueios de ramo', () => {
    const inf = preparar(padraoPorId('iam-inferior'));
    expect(inf.morf.III.st).toBeGreaterThan(0.3);
    expect(inf.morf.aVL.st).toBeLessThan(0);
    expect(padraoPorId('bre').plano().qrs[0].w).toBeGreaterThan(2);
  });
});
