import { describe, expect, it } from 'vitest';
import { Rcp } from '../rcp';

/** comprime n vezes a f/min a partir de t; devolve o novo t */
function comprime(r: Rcp, t: number, n: number, f = 110) {
  for (let i = 0; i < n; i++) {
    r.comprimir(t);
    t += 60 / f;
  }
  return t;
}
function ciclo30x2(r: Rcp, t: number, f = 110) {
  t = comprime(r, t, 30, f);
  r.ventilar(t + 1);
  r.ventilar(t + 2);
  return t + 3;
}

describe('RCP', () => {
  it('RCP de alta qualidade até o retorno da circulação: nota 100', () => {
    const r = new Rcp();
    let t = 0;
    r.iniciar(t);
    while (!r.analiseDevida) t = ciclo30x2(r, t);
    expect(r.analisar(t)).toBe(true);
    expect(r.ritmo).toBe('fv');
    r.carregar(t + 1); r.afastar(t + 2); r.chocar(t + 3);
    t += 3.5;
    while (r.t < r.proximaAnalise) t = ciclo30x2(r, t);
    r.analisar(t); r.carregar(t + 1); r.afastar(t + 2); r.chocar(t + 3);
    t += 3.5;
    r.darAdrenalina(t);
    while (r.t < r.proximaAnalise) t = ciclo30x2(r, t);
    r.analisar(t);
    expect(r.fase).toBe('pulso');
    r.checarPulso(t + 2);
    const res = r.resultado();
    expect(r.fase).toBe('fim');
    expect(res.metas.every(m => m.ok)).toBe(true);
    expect(res.nota).toBe(100);
  });

  it('compressões lentas e pausa longa derrubam a nota', () => {
    const r = new Rcp();
    r.iniciar(0);
    let t = comprime(r, 0, 30, 80);
    r.ventilar(t + 6); r.ventilar(t + 12);
    t = comprime(r, t + 14, 30, 80);
    const res = r.resultado();
    expect(res.metas[0].ok).toBe(false);
    expect(res.metas[2].ok).toBe(false);
    expect(res.nota).toBeLessThan(50);
  });

  it('choque sem "afastem-se" e adrenalina antes do 2º choque são erros', () => {
    const r = new Rcp();
    r.iniciar(0);
    r.darAdrenalina(1);
    let t = 0;
    while (!r.analiseDevida) t = ciclo30x2(r, t);
    r.analisar(t); r.carregar(t + 1); r.chocar(t + 2);
    expect(r.eventos.filter(e => e.tipo === 'erro').length).toBe(2);
  });
});
