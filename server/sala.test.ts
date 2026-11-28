import { describe, expect, it } from 'vitest';
import { aplicar, codigoValido, novoCodigo, vista, type Sala } from './sala';

const base = (): Sala => ({
  codigo: 'ABCDE', criador: 'a', expira: Date.now() + 1e6,
  membros: { a: { nome: 'Ana', papel: 'avaliador' }, b: { nome: 'Bia', papel: 'examinando' } },
  estacaoId: null, rodada: 0, fase: 'espera', faseDesde: 0, marcas: {}, revelados: [], nota: null, versao: 1,
});
const ok = (r: Sala | string) => {
  if (typeof r === 'string') throw new Error(r);
  return r;
};

describe('treino em dupla', () => {
  it('código de sala', () => {
    for (let i = 0; i < 50; i++) expect(codigoValido(novoCodigo())).toBe(true);
    expect(codigoValido('AB1DE')).toBe(false);
  });
  it('só o avaliador escolhe estação, controla o tempo e marca', () => {
    expect(aplicar(base(), 'b', { tipo: 'estacao', id: 'ABD-01' })).toMatch(/avaliador/);
    expect(aplicar(base(), 'x', { tipo: 'trocar' })).toMatch(/não está/);
    let s = ok(aplicar(base(), 'a', { tipo: 'estacao', id: 'ABD-01' }));
    expect(s.rodada).toBe(1);
    s = ok(aplicar(s, 'a', { tipo: 'fase', fase: 'estacao' }));
    expect(aplicar(s, 'a', { tipo: 'trocar' })).toMatch(/entre as estações/);
    expect(aplicar(s, 'b', { tipo: 'marcar', i: 0, marca: 'feito' })).toMatch(/avaliador/);
    s = ok(aplicar(s, 'a', { tipo: 'marcar', i: 0, marca: 'feito' }));
    s = ok(aplicar(s, 'a', { tipo: 'marcar', i: 1, marca: 'parcial' }));
    s = ok(aplicar(s, 'a', { tipo: 'fase', fase: 'fim' }));
    expect(s.nota).toBe(38); // 4 comandos: 1 + 0,5 de 4
    s = ok(aplicar(s, 'b', { tipo: 'trocar' }));
    expect(s.membros.b.papel).toBe('avaliador');
  });
  it('o examinando não vê achados nem checklist antes do fim', () => {
    let s = ok(aplicar(base(), 'a', { tipo: 'estacao', id: 'NEURO-F1' }));
    s = ok(aplicar(s, 'a', { tipo: 'revelar', texto: 'Força grau 4 à direita' }));
    const ex = vista(s, 'b');
    expect(ex.itens).toHaveLength(0);
    expect(ex.estacao && 'achados' in ex.estacao).toBe(false);
    expect(ex.revelados).toEqual(['Força grau 4 à direita']);
    const av = vista(s, 'a');
    expect(av.itens).toHaveLength(12);
    expect(av.estacao && 'achados' in av.estacao).toBe(true);
    s = ok(aplicar(s, 'a', { tipo: 'fase', fase: 'fim' }));
    expect(vista(s, 'b').itens).toHaveLength(12);
    expect(vista(s, 'b').nota).toBe(0);
  });
});
