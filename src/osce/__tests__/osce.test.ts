import { describe, expect, it } from 'vitest';
import data from '../../data/osce/stations.json';
import { achado, anamnese, corrigir, paEsperada, manobrasDoComando, novaTentativa, temParteVerbal, type Estacao, type Status } from '../engine';
import { byId, POSTURAS } from '../maneuvers';

const ESTACOES = data as unknown as Estacao[];

describe('estações OSCE', () => {
  it('tem as 120 estações (80 dos cadernos + 40 do material de estudo), com comandos e gabarito', () => {
    expect(ESTACOES).toHaveLength(120);
    expect(new Set(ESTACOES.map(e => e.id)).size).toBe(120);
    for (const e of ESTACOES) {
      expect(e.comandos.length).toBeGreaterThan(1);
      if (e.checklist) expect(e.checklist.reduce((a, x) => a + x.pts, 0)).toBeCloseTo(10);
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
      t.abertura = { higiene: 1, apresentar: 2, explicar: 3, consentimento: 4, privacidade: 5, dor: 6 };
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
      if (e.pa) {
        t.medidas = e.pa.leituras.map((l, k) => ({ braco: l.braco, pas: l.pas, pad: l.pad, t: 50 + k }));
        const esp = paEsperada(e.pa);
        t.registro = { pas: esp.pas, pad: esp.pad, classe: e.pa.classe, orto: e.pa.ortostatica ? 'sim' : undefined };
      }
      t.fechamento = { agradecer: 90, higieneFinal: 91 };
      const notas: Record<number, Status> = {};
      for (const it of corrigir(e, t, {}).itens) if (it.chave != null) notas[it.chave] = 'fez';
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

  it('PA: registrar a fase IV como PAD é marcado como erro', () => {
    const e = ESTACOES.find(x => x.id === 'PA-1')!;
    const t = novaTentativa(e);
    t.registro = { pas: 148, pad: 100, classe: 'HA estágio 1' };
    const pad = corrigir(e, t, {}).itens.find(i => i.label.startsWith('PAD'))!;
    expect(pad.status).toBe('nao');
    expect(pad.detalhe).toMatch(/fase IV/);
    t.registro.pad = 94;
    expect(corrigir(e, t, {}).itens.find(i => i.label.startsWith('PAD'))!.status).toBe('fez');
  });

  it('anamnese responde só com o que está no caso', () => {
    for (const e of ESTACOES) {
      const q = anamnese(e);
      expect(q).toHaveLength(6);
      for (const p of q) expect(p.resposta.length).toBeGreaterThan(3);
    }
    const r1 = anamnese(ESTACOES.find(x => x.id === 'URI-R1')!).find(p => p.id === 'medicacoes')!;
    expect(r1.resposta).toMatch(/enalapril/);
  });
});
