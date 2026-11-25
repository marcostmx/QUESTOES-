import { describe, expect, it } from 'vitest';
import { PADROES_RX, rxPorId } from '../rx';

describe('radiografia de tórax', () => {
  it('padrões únicos com achados e conduta', () => {
    expect(new Set(PADROES_RX.map(p => p.id)).size).toBe(PADROES_RX.length);
    for (const p of PADROES_RX) {
      expect(p.achados.length).toBeGreaterThan(0);
      expect(p.pista.length).toBeGreaterThan(10);
    }
    expect(rxPorId('derrame').nome).toMatch(/Derrame/);
  });
});
