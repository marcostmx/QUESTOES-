import { describe, expect, it } from 'vitest';
import { Plantao, type Cor } from '../plantao';

const nivel: Cor[] = ['vermelho', 'laranja', 'amarelo', 'verde', 'azul'];

/** joga de forma ideal: tria todos com a cor certa e atende o mais grave */
function joga(p: Plantao, triar: (c: Cor) => Cor, ordem: 'gravidade' | 'chegada') {
  for (let guard = 0; guard < 200 && !p.acabou; guard++) {
    const t = p.aTriar[0];
    if (t) { p.triar(t.id, triar(t.cor)); continue; }
    const fila = [...p.fila].sort((a, b) => (ordem === 'gravidade' ? nivel.indexOf(a.cor) - nivel.indexOf(b.cor) : 0) || a.chegada - b.chegada);
    if (fila[0]) { p.atender(fila[0].id); continue; }
    p.aguardar(p.proximaChegada ?? 5);
  }
}

describe('plantão', () => {
  it('triagem correta e prioridade pela gravidade: nota alta e sem eventos', () => {
    const p = new Plantao();
    joga(p, c => c, 'gravidade');
    const r = p.resultado();
    expect(p.acabou).toBe(true);
    expect(r.nTri).toBe(10);
    expect(r.graves).toBe(0);
    expect(r.nota).toBeGreaterThanOrEqual(90);
  });

  it('subtriar todos como verde e atender por ordem de chegada derruba a nota', () => {
    const p = new Plantao();
    joga(p, () => 'verde', 'chegada');
    const r = p.resultado();
    expect(r.subtri).toBeGreaterThan(3);
    expect(r.nota).toBeLessThan(50);
  });
});

import { FICHAS_RESP } from '../plantao';
describe('plantão respiratório', () => {
  it('triagem correta e prioridade pela gravidade: nota alta', () => {
    const p = new Plantao(FICHAS_RESP);
    joga(p, c => c, 'gravidade');
    const r = p.resultado();
    expect(r.nTri).toBe(10);
    expect(r.graves).toBe(0);
    expect(r.nota).toBeGreaterThanOrEqual(90);
  });
});
