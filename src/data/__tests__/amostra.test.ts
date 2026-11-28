import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { questaoGratis } from '../amostra';

const dir = path.join(__dirname, '../questions');
const todas = fs.readdirSync(dir).flatMap(e => fs.readdirSync(path.join(dir, e)).filter(f => f.endsWith('.json')).flatMap(f => JSON.parse(fs.readFileSync(path.join(dir, e, f), 'utf8')) as { id: string; origin?: string }[]));

describe('amostra do plano grátis', () => {
  it('nunca libera questão de prova anterior, slide ou sem origem', () => {
    expect(todas.filter(q => q.origin !== 'inedita').some(questaoGratis)).toBe(false);
  });
  it('libera cerca de 1 em 5 inéditas', () => {
    const ined = todas.filter(q => q.origin === 'inedita');
    const frac = ined.filter(questaoGratis).length / ined.length;
    expect(frac).toBeGreaterThan(0.12);
    expect(frac).toBeLessThan(0.28);
  });
});
