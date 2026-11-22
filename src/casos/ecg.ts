/** Desenho de ECG em canvas: traçado do monitor (varredura) e ECG de 12 derivações. */
import type { Ritmo } from './motor';
import { desenharPadrao, padraoPorId } from './ecgPadroes';

const g = (x: number, mu: number, s: number) => Math.exp(-0.5 * ((x - mu) / s) ** 2);

export interface Derivacao {
  r: number;
  s: number;
  st: number;
  /** onda T (positiva/negativa) */
  t: number;
  p?: number;
}

/** Um batimento sinusal (fase 0..1 do intervalo RR) */
export function batimento(f: number, d: Derivacao = { r: 1.1, s: 0.25, st: 0, t: 0.3 }) {
  const p = (d.p ?? 0.12) * g(f, 0.1, 0.025);
  const q = -0.08 * g(f, 0.205, 0.008);
  const r = d.r * g(f, 0.225, 0.009);
  const s = -d.s * g(f, 0.245, 0.01);
  // ST: platô entre o fim do QRS e a T
  const stOn = f > 0.255 && f < 0.42 ? d.st * Math.min(1, (f - 0.255) / 0.015) : 0;
  const t = (d.t + d.st * 0.6) * g(f, 0.43, 0.045);
  return p + q + r + s + stOn + t;
}

/** Amostra do traçado do monitor no tempo absoluto tt (s) */
export function amostra(ritmo: Ritmo, tt: number, fc: number): number {
  const rr = 60 / Math.max(20, fc || 60);
  const f = (tt % rr) / rr;
  switch (ritmo) {
    case 'supra':
      return batimento(f, { r: 1.0, s: 0.2, st: 0.32, t: 0.32 });
    case 'riva': {
      const rr2 = 60 / 78;
      const h = (tt % rr2) / rr2;
      return 0.9 * g(h, 0.2, 0.035) - 0.35 * g(h, 0.27, 0.03) - 0.3 * g(h, 0.48, 0.07);
    }
    case 'fv':
      return 0.45 * Math.sin(2 * Math.PI * 4.4 * tt) + 0.3 * Math.sin(2 * Math.PI * 6.3 * tt + 1.3) + 0.18 * Math.sin(2 * Math.PI * 2.1 * tt + 0.4);
    case 'tv': {
      const h = (tt % 0.33) / 0.33;
      return 1.1 * Math.sin(2 * Math.PI * h) * g(h, 0.4, 0.3);
    }
    case 'assistolia':
      return 0.02 * Math.sin(tt * 3);
    case 'fa': {
      const irr = 0.55 + 0.4 * Math.abs(Math.sin(Math.floor(tt / 0.7) * 12.9898));
      const h = (tt % irr) / irr;
      return batimento(h, { r: 1.1, s: 0.25, st: 0, t: 0.25, p: 0 }) + 0.05 * Math.sin(2 * Math.PI * 7 * tt);
    }
    default:
      return batimento(f);
  }
}

/* ---------- 12 derivações ---------- */
const NORMAL: Record<string, Derivacao> = {
  I: { r: 0.9, s: 0.15, st: 0, t: 0.25 }, II: { r: 1.2, s: 0.2, st: 0, t: 0.3 }, III: { r: 0.5, s: 0.2, st: 0, t: 0.12 },
  aVR: { r: -0.9, s: -0.1, st: 0, t: -0.22, p: -0.1 }, aVL: { r: 0.5, s: 0.25, st: 0, t: 0.12 }, aVF: { r: 0.8, s: 0.15, st: 0, t: 0.2 },
  V1: { r: 0.25, s: 1.0, st: 0, t: 0.08 }, V2: { r: 0.45, s: 1.2, st: 0, t: 0.3 }, V3: { r: 0.8, s: 0.8, st: 0, t: 0.35 },
  V4: { r: 1.3, s: 0.4, st: 0, t: 0.38 }, V5: { r: 1.3, s: 0.25, st: 0, t: 0.32 }, V6: { r: 1.1, s: 0.15, st: 0, t: 0.26 },
};

const SUPRA_ANT: Record<string, number> = { I: 0.2, aVL: 0.25, V1: 0.2, V2: 0.42, V3: 0.48, V4: 0.38, V5: 0.22, V6: 0.06, II: -0.1, III: -0.22, aVF: -0.16, aVR: -0.06 };

export function derivacoes(figura: string): Record<string, Derivacao> {
  const out: Record<string, Derivacao> = {};
  for (const [k, d] of Object.entries(NORMAL)) {
    const st = SUPRA_ANT[k] ?? 0;
    if (figura === 'ecg-supra-anterior') out[k] = { ...d, st, r: /V[1-3]/.test(k) ? d.r * 0.5 : d.r };
    else if (figura === 'ecg-reperfundido') out[k] = { ...d, st: st * 0.25, t: /V[1-4]|I$|aVL/.test(k) && st > 0 ? -0.25 : d.t, r: /V[1-3]/.test(k) ? d.r * 0.4 : d.r };
    else out[k] = d;
  }
  return out;
}

/** Desenha o ECG de 12 derivações de uma figura de caso ou de um padrão do catálogo */
export function desenhaECG12(cv: HTMLCanvasElement, figura: string) {
  const id = figura === 'ecg-supra-anterior' ? 'iam-anterior' : figura;
  if (figura === 'ecg-reperfundido') {
    const base = padraoPorId('iam-anterior');
    desenharPadrao(cv, {
      ...base,
      id: 'reperfundido',
      plano: () => ({ p: base.plano().p, qrs: base.plano().qrs }),
      mod: (l, m) => {
        const x = base.mod!(l, m);
        return { ...x, st: x.st * 0.25, t: x.st > 0.1 ? -0.25 : x.t };
      },
    });
    return;
  }
  desenharPadrao(cv, padraoPorId(id) ?? padraoPorId('normal'));
}
