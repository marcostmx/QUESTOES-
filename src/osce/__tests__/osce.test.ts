import { describe, expect, it } from 'vitest';
import data from '../../data/osce/stations.json';
import { achado, corrigir, manobrasDoComando, novaTentativa, temParteVerbal, type Estacao, type Status } from '../engine';
import { byId, POSTURAS } from '../maneuvers';

const ESTACOES = data as unknown as Estacao[];

describe('estações OSCE', () => {
  it('tem as 80 estações dos quatro sistemas, com comandos e gabarito', () => {
    expect(ESTACOES).toHaveLength(80);
    for (const e of ESTACOES) {
      expect(e.comandos.length).toBeGreaterThan(1);
      for (const c of e.comandos) expect(c.gabarito.length).toBeGreaterThan(0);
    }
  });

  it('todo comando exige manobras válidas ou é verbal', () => {
    for (const e of ESTACOES)
      e.comandos.forEach((_, i) => {
        const req = manobrasDoComando(e, i);
        for (const id of req) {
          if (id.startsWith('pos-')) expect(POSTURAS.map(p => p.id)).toContain(id.slice(4));
          else expect(byId.get(id)?.sis, `${e.id} ${id}`).toBe(e.sistema);
        }
        if (!req.length) expect(temParteVerbal(e, i)).toBe(true);
      });
  });

  it('exame completo e respostas completas dão 100', () => {
    for (const e of ESTACOES) {
      const t = novaTentativa(e);
      t.abertura = { higiene: 1, apresentar: 2, explicar: 3, consentimento: 4, dor: 5 };
      let s = 10;
      e.comandos.forEach((_, i) => {
        for (const id of manobrasDoComando(e, i)) {
          if (id.startsWith('pos-')) {
            t.posturas.push({ postura: id.slice(4) as never, t: s++ });
            continue;
          }
          const m = byId.get(id)!;
          const postura = m.postura?.[0] ?? t.postura;
          t.execs.push({ id, t: s++, postura, lado: 'direito', ok: true });
        }
      });
      t.fechamento = { agradecer: 90, higieneFinal: 91 };
      const notas: Record<number, Status> = {};
      e.comandos.forEach((_, i) => (notas[i] = 'fez'));
      const r = corrigir(e, t, notas);
      expect(r.nota, e.id).toBe(100);
      expect(r.pendentes).toBe(0);
    }
  });

  it('não fazer nada zera a nota e manobras exigidas mostram achado', () => {
    const e = ESTACOES.find(x => x.id === 'ABD-07')!;
    expect(corrigir(e, novaTentativa(e), {}).nota).toBe(0);
    const a = achado(e, byId.get('abd-murphy')!);
    expect(a.alterado).toBe(true);
    expect(a.dor).toBe(true);
    expect(achado(e, byId.get('abd-traube')!).alterado).toBe(false);
  });
});
