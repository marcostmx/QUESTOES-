import crypto from 'crypto';
import { describe, expect, it } from 'vitest';
import { ehPremium, elegivelTeste, resumoAdmin, webhookValido } from './assinatura';

describe('assinatura Mercado Pago', () => {
  it('valida a assinatura x-signature do webhook', () => {
    const secret = 'segredo-teste';
    const ts = '1700000000';
    const v1 = crypto.createHmac('sha256', secret).update(`id:abc123;request-id:req-1;ts:${ts};`).digest('hex');
    expect(webhookValido(secret, 'ABC123', 'req-1', `ts=${ts},v1=${v1}`)).toBe(true);
    expect(webhookValido(secret, 'abc123', 'req-2', `ts=${ts},v1=${v1}`)).toBe(false);
    expect(webhookValido(secret, 'abc123', 'req-1', 'lixo')).toBe(false);
  });
  it('só assinatura autorizada dá Premium', () => {
    expect(ehPremium('authorized')).toBe(true);
    for (const s of ['pending', 'paused', 'cancelled', 'nenhuma'] as const) expect(ehPremium(s)).toBe(false);
  });
  it('teste grátis só na primeira vez', () => {
    expect(elegivelTeste(undefined)).toBe(true);
    expect(elegivelTeste({ status: 'cancelled', premium: false, mpId: 'x' })).toBe(false);
    expect(elegivelTeste({ status: 'nenhuma', premium: false, teveTeste: true })).toBe(false);
  });
  it('resumo do painel: ativos, teste, receita e conversão', () => {
    const agora = Date.parse('2026-11-28T12:00:00Z');
    const dia = (n: number) => new Date(agora - n * 86400000).toISOString();
    const r = resumoAdmin([
      { uid: 'a', a: { status: 'authorized', premium: true, teveTeste: true, criadoEm: dia(2), atualizadoEm: dia(2) } },
      { uid: 'b', a: { status: 'authorized', premium: true, teveTeste: true, criadoEm: dia(40), atualizadoEm: dia(10) } },
      { uid: 'c', a: { status: 'authorized', premium: true, criadoEm: dia(60) } },
      { uid: 'd', a: { status: 'cancelled', premium: false, canceladoEm: dia(5), criadoEm: dia(50) } },
      { uid: 'e', a: { status: 'pending', premium: false, criadoEm: dia(1) } },
    ], 29.9, 100, agora);
    expect(r.ativos).toBe(3);
    expect(r.emTeste).toBe(1);
    expect(r.receitaMensal).toBe(59.8);
    expect(r.cancelados30d).toBe(1);
    expect(r.novos30d).toBe(2);
    expect(r.conversao).toBe(3);
    expect(r.recentes[0].uid).toBe('e');
  });
});
