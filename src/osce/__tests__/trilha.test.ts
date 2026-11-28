import { describe, expect, it } from 'vitest';
import data from '../../data/osce/stations.json';
import type { Estacao } from '../engine';
import type { OsceRecord } from '../history';
import { proxima, resumo, ritmo, statusDe, trilha } from '../trilha';

const E = data as unknown as Estacao[];
const DIA = 86400000;
const rec = (id: string, nota: number, date: number): OsceRecord => ({ key: id + date, id, nota, date, pendentes: 0 });

describe('trilha OSCE', () => {
  it('cobre todas as estações praticáveis, começando pela PA', () => {
    const m = trilha(E, []);
    expect(m[0].sistema).toBe('pressao');
    expect(resumo(m).total).toBe(E.filter(e => e.tipo !== 'discussao').length);
  });
  it('domínio pede duas notas ≥ 70 e volta para revisão após 14 dias', () => {
    const agora = Date.now();
    expect(statusDe('X', [rec('X', 80, agora)], agora).status).toBe('treinando');
    expect(statusDe('X', [rec('X', 80, agora), rec('X', 75, agora)], agora).status).toBe('dominada');
    expect(statusDe('X', [rec('X', 80, agora - 20 * DIA), rec('X', 75, agora - 20 * DIA)], agora).status).toBe('revisar');
  });
  it('recomenda a primeira estação nova e respeita o plano', () => {
    const m = trilha(E, []);
    const p = proxima(m)!;
    expect(p.sistema).toBe('pressao');
    expect(proxima(m, () => false)!.bloqueada).toBe(true);
  });
  it('prioriza revisão vencida', () => {
    const agora = Date.now();
    const id = E.find(e => e.sistema === 'neurologico' && e.tipo !== 'discussao')!.id;
    const m = trilha(E, [rec(id, 90, agora - 30 * DIA), rec(id, 90, agora - 30 * DIA)], agora);
    expect(proxima(m)!.id).toBe(id);
  });
  it('ritmo até a prova', () => {
    const m = trilha(E, []);
    const d = new Date(Date.now() + 10 * DIA).toISOString().slice(0, 10);
    const r = ritmo(m, d)!;
    expect(r.dias).toBeGreaterThan(8);
    expect(r.porDia).toBeGreaterThan(0);
  });
});
