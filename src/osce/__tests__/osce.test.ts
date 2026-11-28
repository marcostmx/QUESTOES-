import { describe, expect, it } from 'vitest';
import data from '../../data/osce/stations.json';
import { achado, anamnese, cobertura, corrigir, falhas, paEsperada, sugestoes, manobrasDoComando, novaTentativa, temParteVerbal, type Estacao, type Status } from '../engine';
import { byId, POSTURAS } from '../maneuvers';

const ESTACOES = data as unknown as Estacao[];

describe('estações OSCE', () => {
  it('tem as 230 estações (cadernos, material de estudo, simulado de 100 e estações do jogo), com comandos e gabarito', () => {
    expect(ESTACOES).toHaveLength(230);
    expect(new Set(ESTACOES.map(e => e.id)).size).toBe(230);
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
      expect(q.length).toBeGreaterThanOrEqual(2);
      for (const p of q) expect(p.resposta.length).toBeGreaterThan(1);
    }
    const r1 = anamnese(ESTACOES.find(x => x.id === 'URI-R1')!).find(p => p.id === 'medicacoes')!;
    expect(r1.resposta).toMatch(/enalapril/);
  });

  it('resposta falada: gabarito coberto vira sugestão de nota', () => {
    expect(cobertura('é uma estenose aórtica com sopro ejetivo irradiado para carótidas', 'Estenose aórtica')).toBe(1);
    expect(cobertura('não sei', 'Estenose aórtica')).toBe(0);
    const e = ESTACOES.find(x => x.id === 'SIM-CV-003')!;
    const t = novaTentativa(e);
    t.respostas[3] = 'Estenose aórtica: sopro ejetivo aórtico irradiado para o pescoço, frêmito e pulso parvus et tardus; confirmar com ecocardiograma';
    const sug = sugestoes(e, t);
    expect(Object.values(sug)).toContain('fez');
  });

  it('erros da tentativa viram etiquetas para a revisão', () => {
    const e = ESTACOES.find(x => x.id === 'ABD-07')!;
    const t = novaTentativa(e);
    const tags = falhas(e, t, corrigir(e, t, {}).itens);
    expect(tags).toContain('man:abd-murphy');
    expect(tags.some(x => x.startsWith('ab:'))).toBe(true);
  });

  it('ausculta: o som segue o achado da estação', async () => {
    const { somDaManobra } = await import('../ausculta');
    const ea = somDaManobra('cv-ao', 'Sopro sistólico aórtico IV/VI; frêmito na região aórtica.');
    expect(ea?.tipo === 'cardiaca' && ea.c.sopro).toEqual({ tipo: 'ejetivo', grau: 4 });
    const em = somDaManobra('cv-pachon', 'Ruflar de baixa frequência no foco mitral, com estalido de abertura após B2.');
    expect(em?.tipo === 'cardiaca' && em.c.sopro?.tipo).toBe('ruflar');
    expect(em?.tipo === 'cardiaca' && em.c.estalido).toBe(true);
    const cons = somDaManobra('resp-ausc', 'FTV aumentado, submacicez, respiração de tonalidade brônquica e estertores finos; expansibilidade reduzida');
    expect(cons?.tipo === 'pulmonar' && cons.p).toMatchObject({ base: 'bronquico', finos: true, sibilos: false });
    const ileo = somDaManobra('aa-ausc', 'Ruídos hidroaéreos abolidos.');
    expect(ileo?.tipo === 'abdominal' && ileo.a.rha).toBe('abolidos');
    const hcm = somDaManobra('cv-valsalva', 'O sopro aumenta na fase de esforço.', 76, 16, 'Sopro sistólico III/VI na borda esternal esquerda');
    expect(hcm?.tipo === 'cardiaca' && hcm.c.sopro?.grau).toBe(4);
    expect(somDaManobra('abd-murphy', 'qualquer coisa')).toBeNull();
  });
});

import indice from '../../data/osce/indice.json';
import { gerarIndice } from '../indice';
describe('índice público do OSCE', () => {
  it('está em dia com stations.json (rode npm run indice-osce)', () => {
    expect(indice).toEqual(JSON.parse(JSON.stringify(gerarIndice(data as unknown as Estacao[]))));
  });
});
