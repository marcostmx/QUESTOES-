/** Desenho de ECG em canvas: traçado do monitor (varredura) e ECG de 12 derivações. */
import type { Ritmo } from './motor';

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

/** Desenha o ECG de 12 derivações (25 mm/s, 10 mm/mV) num canvas */
export function desenhaECG12(cv: HTMLCanvasElement, figura: string, fc = 100) {
  const W = cv.width, H = cv.height;
  const c = cv.getContext('2d')!;
  c.fillStyle = '#fff8f6';
  c.fillRect(0, 0, W, H);
  const mm = W / 260; // 260 mm de largura (10 s + margens)
  c.lineWidth = 1;
  for (let x = 0; x <= W; x += mm) {
    const i = Math.round(x / mm);
    c.strokeStyle = i % 5 ? 'rgba(232,140,140,0.25)' : 'rgba(220,90,90,0.5)';
    c.beginPath();
    c.moveTo(x, 0);
    c.lineTo(x, H);
    c.stroke();
  }
  for (let y = 0; y <= H; y += mm) {
    const i = Math.round(y / mm);
    c.strokeStyle = i % 5 ? 'rgba(232,140,140,0.25)' : 'rgba(220,90,90,0.5)';
    c.beginPath();
    c.moveTo(0, y);
    c.lineTo(W, y);
    c.stroke();
  }
  const ds = derivacoes(figura);
  const linhas = [['I', 'aVR', 'V1', 'V4'], ['II', 'aVL', 'V2', 'V5'], ['III', 'aVF', 'V3', 'V6']];
  const rr = 60 / fc;
  const alturaLinha = H / 4;
  const colW = (W - 10 * mm) / 4;
  c.strokeStyle = '#111';
  c.lineWidth = Math.max(1.2, mm * 0.28);
  c.font = `600 ${Math.round(mm * 3.2)}px system-ui, sans-serif`;
  c.fillStyle = '#111';
  const traco = (d: Derivacao, x0: number, y0: number, w: number, t0: number) => {
    c.beginPath();
    for (let px = 0; px <= w; px += 1) {
      const t = t0 + px / mm / 25;
      const v = batimento((t % rr) / rr, d);
      const y = y0 - v * 10 * mm;
      px ? c.lineTo(x0 + px, y) : c.moveTo(x0 + px, y);
    }
    c.stroke();
  };
  // pulso de calibração
  const cal = (y0: number) => {
    c.beginPath();
    c.moveTo(1 * mm, y0);
    c.lineTo(2 * mm, y0);
    c.lineTo(2 * mm, y0 - 10 * mm);
    c.lineTo(7 * mm, y0 - 10 * mm);
    c.lineTo(7 * mm, y0);
    c.lineTo(8 * mm, y0);
    c.stroke();
  };
  linhas.forEach((ls, i) => {
    const y0 = alturaLinha * (i + 0.62);
    cal(y0);
    ls.forEach((nome, j) => {
      const x0 = 9 * mm + j * colW;
      traco(ds[nome], x0, y0, colW - mm, j * 2.5);
      c.fillText(nome, x0 + mm, y0 - 12 * mm);
      if (j) {
        c.beginPath();
        c.moveTo(x0, y0 - 3 * mm);
        c.lineTo(x0, y0 + 3 * mm);
        c.stroke();
      }
    });
  });
  const y0 = alturaLinha * 3.62;
  cal(y0);
  traco(ds.II, 9 * mm, y0, W - 10 * mm, 0);
  c.fillText('II', 10 * mm, y0 - 12 * mm);
}
