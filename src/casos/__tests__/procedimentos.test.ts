import { describe, expect, it } from 'vitest';
import { Execucao, PROCEDIMENTOS } from '../procedimentos';

describe('procedimentos passo a passo', () => {
  it('opções únicas por etapa e sequência correta dá 100', () => {
    for (const p of PROCEDIMENTOS) {
      for (const e of p.etapas) {
        const t = [e.certa, ...e.erradas.map(x => x.texto)];
        expect(new Set(t).size, `${p.id}: ${e.pergunta}`).toBe(t.length);
        expect(e.erradas.length).toBeGreaterThan(0);
      }
      const x = new Execucao(p);
      for (const e of p.etapas) expect(x.escolher(e.certa).ok).toBe(true);
      expect(x.fim).toBe(true);
      expect(x.nota).toBe(100);
    }
  });

  it('erro custa pontos uma vez e explica o porquê', () => {
    const x = new Execucao(PROCEDIMENTOS[0]);
    const w = x.etapa.erradas[0];
    expect(x.escolher(w.texto)).toEqual({ ok: false, porque: w.porque });
    x.escolher(w.texto);
    expect(x.erros.length).toBe(1);
    expect(x.nota).toBe(92);
  });
});
