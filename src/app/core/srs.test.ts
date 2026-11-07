import { describe, expect, it } from 'vitest';
import { addDays, daysBetween, isDue, schedule, START_EASE, MIN_EASE } from './srs';

const today = '2026-11-07';

describe('schedule', () => {
  it('primeira resposta correta agenda para amanhã', () => {
    const s = schedule(undefined, 'good', today);
    expect(s).toMatchObject({ reps: 1, interval: 1, ease: START_EASE, lapses: 0, due: '2026-11-08' });
  });

  it('acertos seguidos aumentam o intervalo: 1 → 3 → ~8 dias', () => {
    const a = schedule(undefined, 'good', today);
    const b = schedule(a, 'good', a.due);
    const c = schedule(b, 'good', b.due);
    expect([a.interval, b.interval, c.interval]).toEqual([1, 3, 8]);
    expect(c.due).toBe(addDays(b.due, 8));
  });

  it('erro zera a sequência, conta lapso e reduz a facilidade', () => {
    const b = schedule(schedule(undefined, 'good', today), 'good', today);
    const fail = schedule(b, 'again', today);
    expect(fail).toMatchObject({ reps: 0, interval: 1, lapses: 1, due: '2026-11-08' });
    expect(fail.ease).toBeCloseTo(START_EASE - 0.2);
  });

  it('erro na primeira tentativa não conta como lapso', () => {
    expect(schedule(undefined, 'again', today).lapses).toBe(0);
  });

  it('facilidade nunca cai abaixo do mínimo', () => {
    let s = schedule(undefined, 'again', today);
    for (let i = 0; i < 20; i++) s = schedule(s, 'again', today);
    expect(s.ease).toBe(MIN_EASE);
  });

  it('"difícil" cresce menos que "bom", que cresce menos que "fácil"', () => {
    const base = schedule(schedule(undefined, 'good', today), 'good', today); // intervalo 3
    const h = schedule(base, 'hard', today).interval;
    const g = schedule(base, 'good', today).interval;
    const e = schedule(base, 'easy', today).interval;
    expect(h).toBeLessThan(g);
    expect(g).toBeLessThan(e);
  });

  it('intervalo tem teto de 180 dias', () => {
    let s = schedule(undefined, 'easy', today);
    for (let i = 0; i < 15; i++) s = schedule(s, 'easy', today);
    expect(s.interval).toBe(180);
  });
});

describe('datas', () => {
  it('addDays atravessa meses e anos', () => {
    expect(addDays('2026-12-30', 3)).toBe('2027-01-02');
    expect(addDays('2026-02-28', 1)).toBe('2026-03-01');
  });

  it('daysBetween', () => {
    expect(daysBetween('2026-11-07', '2026-11-10')).toBe(3);
    expect(daysBetween('2026-11-10', '2026-11-07')).toBe(-3);
  });

  it('isDue', () => {
    const s = schedule(undefined, 'good', today);
    expect(isDue(s, today)).toBe(false);
    expect(isDue(s, s.due)).toBe(true);
    expect(isDue(undefined, today)).toBe(false);
  });
});
