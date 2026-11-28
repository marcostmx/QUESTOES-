import crypto from 'crypto';
import { describe, expect, it } from 'vitest';
import { ehPremium, elegivelTeste, webhookValido } from './assinatura';

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
});
