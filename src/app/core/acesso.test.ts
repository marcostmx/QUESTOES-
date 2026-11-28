import { describe, expect, it } from 'vitest';
import data from '../../data/osce/indice.json';
import { liberadoGratis, LIMITE_QUESTOES_DIA, osceGratis, pode } from './acesso';

describe('plano grátis × Premium', () => {
  const estacoes = data as unknown as { id: string; sistema: string; tipo?: string }[];
  it('libera 2 estações por sistema e bloqueia o resto', () => {
    const porSis = new Map<string, number>();
    for (const e of estacoes) if (osceGratis(e.id)) porSis.set(e.sistema, (porSis.get(e.sistema) ?? 0) + 1);
    for (const n of porSis.values()) expect(n).toBeLessThanOrEqual(2);
    expect(estacoes.filter(e => osceGratis(e.id)).length).toBeLessThan(30);
  });
  it('circuito e prova completa só no Premium', () => {
    const id = estacoes.find(e => osceGratis(e.id))!.id;
    expect(liberadoGratis({ tipo: 'osce', id })).toBe(true);
    expect(liberadoGratis({ tipo: 'osce', id, circuito: true })).toBe(false);
    expect(pode(true, { tipo: 'osce', id, circuito: true })).toBe(true);
  });
  it('limite diário de questões', () => {
    expect(liberadoGratis({ tipo: 'questoes', respondidasHoje: LIMITE_QUESTOES_DIA - 1 })).toBe(true);
    expect(liberadoGratis({ tipo: 'questoes', respondidasHoje: LIMITE_QUESTOES_DIA })).toBe(false);
  });
  it('casos, plantão e simulado', () => {
    expect(liberadoGratis({ tipo: 'caso', id: 'iam-supra-anterior' })).toBe(true);
    expect(liberadoGratis({ tipo: 'caso', id: 'megacode-acls' })).toBe(false);
    expect(liberadoGratis({ tipo: 'plantao' })).toBe(false);
    expect(liberadoGratis({ tipo: 'simulado' })).toBe(false);
  });
});
