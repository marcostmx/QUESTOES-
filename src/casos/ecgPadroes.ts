/**
 * Gerador de ECG de 12 derivações por padrão (10 s de traçado).
 * Cada padrão define os instantes das ondas P e dos QRS (o que permite BAV, FA, flutter etc.)
 * e modificações por derivação (supra, bloqueios de ramo, T apiculada).
 * É esquemático e didático: as proporções seguem o padrão clássico de cada diagnóstico.
 */

export const DERIVACOES = ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'] as const;
export type Lead = (typeof DERIVACOES)[number];

export interface Morf {
  p: number;
  r: number;
  s: number;
  /** segunda onda R (rSR' do BRD, entalhe do BRE) */
  r2?: number;
  st: number;
  t: number;
  /** largura da onda T (s) */
  tw?: number;
  /** infra do PR (pericardite) */
  pr?: number;
}

const NORMAL: Record<Lead, Morf> = {
  I: { p: 0.1, r: 0.9, s: 0.15, st: 0, t: 0.25 }, II: { p: 0.14, r: 1.2, s: 0.2, st: 0, t: 0.3 }, III: { p: 0.06, r: 0.5, s: 0.2, st: 0, t: 0.12 },
  aVR: { p: -0.1, r: -0.9, s: -0.1, st: 0, t: -0.22 }, aVL: { p: 0.04, r: 0.5, s: 0.25, st: 0, t: 0.12 }, aVF: { p: 0.1, r: 0.8, s: 0.15, st: 0, t: 0.2 },
  V1: { p: 0.06, r: 0.25, s: 1.0, st: 0, t: 0.08 }, V2: { p: 0.06, r: 0.45, s: 1.2, st: 0, t: 0.3 }, V3: { p: 0.06, r: 0.8, s: 0.8, st: 0, t: 0.35 },
  V4: { p: 0.07, r: 1.3, s: 0.4, st: 0, t: 0.38 }, V5: { p: 0.07, r: 1.3, s: 0.25, st: 0, t: 0.32 }, V6: { p: 0.07, r: 1.1, s: 0.15, st: 0, t: 0.26 },
};

interface Batida { q: number; w: number }
interface Plano { p: number[]; qrs: Batida[] }

export interface Padrao {
  id: string;
  nome: string;
  grupo: 'Ritmo' | 'Condução' | 'Isquemia' | 'Outros';
  fc: string;
  achados: string[];
  /** conduta/raciocínio em uma linha */
  pista: string;
  plano: () => Plano;
  mod?: (l: Lead, m: Morf) => Morf;
  /** linha de base (ondas F do flutter, f da FA) */
  base?: (l: Lead, t: number) => number;
  caos?: boolean;
}

/* ---------- geradores de ritmo ---------- */
const DUR = 10;
function sinusal(fc: number, pr = 0.16, w = 1): Plano {
  const rr = 60 / fc;
  const p: number[] = [], qrs: Batida[] = [];
  for (let t = 0.15; t < DUR + 0.5; t += rr) {
    p.push(t);
    qrs.push({ q: t + pr, w });
  }
  return { p, qrs };
}
function rnd(seed: number) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

/* ---------- forma de onda ---------- */
const g = (x: number, s: number) => Math.exp(-0.5 * (x / s) ** 2);

function complexo(m: Morf, tau: number, w: number) {
  let v = -0.07 * g(tau + 0.02 * w, 0.008 * w);
  v += m.r * g(tau, 0.01 * w);
  v -= m.s * g(tau - 0.024 * w, 0.011 * w);
  if (m.r2) v += m.r2 * g(tau - 0.05 * w, 0.012 * w);
  const ini = 0.03 + 0.03 * w, fim = 0.22 + 0.02 * w;
  if (m.st && tau > ini - 0.01 && tau < fim + 0.06) {
    const sub = Math.min(1, (tau - (ini - 0.01)) / 0.012);
    const desce = tau > fim ? Math.max(0, 1 - (tau - fim) / 0.06) : 1;
    v += m.st * sub * desce;
  }
  v += (m.t + m.st * 0.5) * g(tau - (0.25 + 0.04 * w), m.tw ?? 0.05);
  return v;
}

/** Valor (mV) da derivação no instante t */
export function valor(pd: Padrao, l: Lead, t: number, cache = preparar(pd)): number {
  if (pd.caos) {
    const k = DERIVACOES.indexOf(l) + 1;
    return (0.45 * Math.sin(2 * Math.PI * 4.6 * t + k) + 0.3 * Math.sin(2 * Math.PI * 6.7 * t + 2 * k) + 0.2 * Math.sin(2 * Math.PI * 2.3 * t + k * 0.7)) * (0.7 + 0.3 * Math.sin(t * 0.9 + k));
  }
  const m = cache.morf[l];
  let v = pd.base?.(l, t) ?? 0;
  for (const pt of cache.plano.p) {
    const d = t - pt;
    if (d > -0.08 && d < 0.12) v += m.p * g(d, 0.025) + (m.pr ? -m.pr * (d > 0.05 && d < 0.12 ? 1 : 0) : 0);
  }
  for (const b of cache.plano.qrs) {
    const tau = t - b.q;
    if (tau > -0.1 && tau < 0.6) v += complexo(m, tau, b.w);
  }
  return v;
}

export function preparar(pd: Padrao) {
  const morf = {} as Record<Lead, Morf>;
  for (const l of DERIVACOES) morf[l] = pd.mod ? pd.mod(l, { ...NORMAL[l] }) : NORMAL[l];
  return { plano: pd.plano(), morf };
}

/* ---------- catálogo ---------- */
const supra = (mapa: Partial<Record<Lead, number>>, reduzR: Lead[] = []) => (l: Lead, m: Morf): Morf => ({
  ...m,
  st: mapa[l] ?? 0,
  r: reduzR.includes(l) ? m.r * 0.45 : m.r,
});

export const PADROES: Padrao[] = [
  {
    id: 'normal', nome: 'Ritmo sinusal normal', grupo: 'Ritmo', fc: '75 bpm',
    achados: ['Onda P positiva em DI, DII e aVF, antes de cada QRS', 'PR de 160 ms (normal: 120–200 ms)', 'QRS estreito, ST isoelétrico, eixo normal'],
    pista: 'Sempre laude na ordem: ritmo, FC, eixo, PR, QRS, ST-T.',
    plano: () => sinusal(75),
  },
  {
    id: 'taqui-sinusal', nome: 'Taquicardia sinusal', grupo: 'Ritmo', fc: '125 bpm',
    achados: ['Ritmo sinusal (P antes de cada QRS, positiva em DII)', 'FC acima de 100 bpm', 'QRS estreito'],
    pista: 'Procure a causa: dor, febre, hipovolemia, anemia, TEP, ansiedade.',
    plano: () => sinusal(125, 0.14),
  },
  {
    id: 'bradi-sinusal', nome: 'Bradicardia sinusal', grupo: 'Ritmo', fc: '45 bpm',
    achados: ['Ritmo sinusal', 'FC abaixo de 50 bpm', 'PR normal e constante'],
    pista: 'Trate só se houver instabilidade: atropina, depois marca-passo ou dopamina/adrenalina.',
    plano: () => sinusal(45, 0.18),
  },
  {
    id: 'fa', nome: 'Fibrilação atrial', grupo: 'Ritmo', fc: '~110 bpm, irregular',
    achados: ['Ausência de onda P', 'Linha de base com ondas f irregulares', 'Intervalos RR irregularmente irregulares'],
    pista: 'Instável: cardioversão elétrica sincronizada. Estável: controle de FC e avaliar anticoagulação (CHA₂DS₂-VASc).',
    plano: () => {
      const r = rnd(7);
      const qrs: Batida[] = [];
      for (let t = 0.2; t < DUR + 0.5; t += 0.38 + r() * 0.5) qrs.push({ q: t, w: 1 });
      return { p: [], qrs };
    },
    mod: (_l, m) => ({ ...m, p: 0 }),
    base: (l, t) => (l === 'V1' || l === 'II' || l === 'III' || l === 'aVF' ? 0.06 : 0.03) * (Math.sin(2 * Math.PI * 6.1 * t) + 0.7 * Math.sin(2 * Math.PI * 7.9 * t + 1) + 0.5 * Math.sin(2 * Math.PI * 5.3 * t + 2)),
  },
  {
    id: 'flutter', nome: 'Flutter atrial 2:1', grupo: 'Ritmo', fc: '150 bpm',
    achados: ['Ondas F em "dente de serra" a 300/min, melhores em DII, DIII e aVF', 'Condução 2:1: FC ventricular fixa em ~150 bpm', 'QRS estreito'],
    pista: 'FC regular de 150 bpm com QRS estreito: pense em flutter 2:1.',
    plano: () => {
      const qrs: Batida[] = [];
      for (let t = 0.3; t < DUR + 0.5; t += 0.4) qrs.push({ q: t, w: 1 });
      return { p: [], qrs };
    },
    mod: (_l, m) => ({ ...m, p: 0 }),
    base: (l, t) => {
      const f = (t / 0.2) % 1;
      const serra = f < 0.25 ? -f / 0.25 : -1 + (f - 0.25) / 0.75;
      const amp = l === 'II' || l === 'III' || l === 'aVF' ? 0.32 : l === 'V1' ? -0.16 : l === 'aVR' ? -0.14 : 0.06;
      return amp * (serra + 0.5);
    },
  },
  {
    id: 'tsv', nome: 'Taquicardia supraventricular (TRN)', grupo: 'Ritmo', fc: '180 bpm',
    achados: ['Taquicardia regular de QRS estreito', 'Ondas P não visíveis (escondidas no QRS)', 'FC entre 150 e 250 bpm'],
    pista: 'Estável: manobra vagal e adenosina. Instável: cardioversão sincronizada.',
    plano: () => {
      const qrs: Batida[] = [];
      for (let t = 0.2; t < DUR + 0.5; t += 60 / 180) qrs.push({ q: t, w: 1 });
      return { p: [], qrs };
    },
    mod: (_l, m) => ({ ...m, p: 0, t: m.t * 0.7 }),
  },
  {
    id: 'tv', nome: 'Taquicardia ventricular monomórfica', grupo: 'Ritmo', fc: '170 bpm',
    achados: ['Taquicardia regular de QRS largo (> 120 ms)', 'Complexos iguais entre si (monomórfica)', 'Sem ondas P relacionadas aos QRS'],
    pista: 'QRS largo e taquicardia: trate como TV. Sem pulso: desfibrilar. Instável com pulso: cardioversão sincronizada.',
    plano: () => {
      const qrs: Batida[] = [];
      for (let t = 0.2; t < DUR + 0.5; t += 60 / 170) qrs.push({ q: t, w: 3.2 });
      return { p: [], qrs };
    },
    mod: (l, m) => {
      const pos = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'aVR', 'III', 'aVF', 'II'].includes(l);
      return { ...m, p: 0, r: pos ? 1.3 : 0.2, s: pos ? 0.1 : 1.1, t: pos ? -0.35 : 0.3, tw: 0.07 };
    },
  },
  {
    id: 'fv', nome: 'Fibrilação ventricular', grupo: 'Ritmo', fc: 'não mensurável',
    achados: ['Atividade elétrica caótica, sem QRS identificáveis', 'Amplitude e frequência variáveis', 'Paciente sem pulso'],
    pista: 'Ritmo chocável: desfibrilação imediata e RCP de alta qualidade.',
    plano: () => ({ p: [], qrs: [] }),
    caos: true,
  },
  {
    id: 'bav1', nome: 'BAV de 1º grau', grupo: 'Condução', fc: '70 bpm',
    achados: ['Toda P é seguida de QRS', 'PR prolongado e constante (> 200 ms; aqui ~320 ms)', 'QRS estreito'],
    pista: 'Geralmente benigno; revise drogas que lentificam o nó AV.',
    plano: () => sinusal(70, 0.32),
  },
  {
    id: 'mobitz1', nome: 'BAV de 2º grau Mobitz I (Wenckebach)', grupo: 'Condução', fc: '~65 bpm',
    achados: ['PR aumenta progressivamente', 'Até uma P não ser conduzida (P sem QRS)', 'Batimentos agrupados; QRS estreito'],
    pista: 'Bloqueio nodal, em geral benigno. Trate se sintomático.',
    plano: () => {
      const p: number[] = [], qrs: Batida[] = [];
      const prs = [0.18, 0.28, 0.36, null];
      let i = 0;
      for (let t = 0.15; t < DUR + 0.5; t += 0.72, i++) {
        p.push(t);
        const pr = prs[i % 4];
        if (pr !== null) qrs.push({ q: t + pr, w: 1 });
      }
      return { p, qrs };
    },
  },
  {
    id: 'mobitz2', nome: 'BAV de 2º grau Mobitz II', grupo: 'Condução', fc: '~55 bpm',
    achados: ['PR constante nos batimentos conduzidos', 'P bloqueadas de forma súbita (sem alargamento prévio do PR)', 'QRS frequentemente largo (bloqueio infra-hissiano)'],
    pista: 'Risco de evoluir para BAV total: indica marca-passo.',
    plano: () => {
      const p: number[] = [], qrs: Batida[] = [];
      let i = 0;
      for (let t = 0.15; t < DUR + 0.5; t += 0.72, i++) {
        p.push(t);
        if (i % 3 !== 2) qrs.push({ q: t + 0.18, w: 1.7 });
      }
      return { p, qrs };
    },
  },
  {
    id: 'bavt', nome: 'BAV total (3º grau)', grupo: 'Condução', fc: 'ventrículos ~38 bpm',
    achados: ['Ondas P regulares (~90/min) sem relação com os QRS', 'QRS regulares e lentos (ritmo de escape)', 'Dissociação atrioventricular'],
    pista: 'Instável: atropina (pouco eficaz), marca-passo transcutâneo e depois definitivo.',
    plano: () => {
      const p: number[] = [], qrs: Batida[] = [];
      for (let t = 0.1; t < DUR + 0.5; t += 60 / 90) p.push(t);
      for (let t = 0.55; t < DUR + 0.5; t += 60 / 38) qrs.push({ q: t, w: 2 });
      return { p, qrs };
    },
    mod: (_l, m) => ({ ...m, p: m.p * 1.7 }),
  },
  {
    id: 'brd', nome: 'Bloqueio de ramo direito', grupo: 'Condução', fc: '75 bpm',
    achados: ['QRS ≥ 120 ms', 'rSR\' ("orelha de coelho") em V1–V2', 'S larga e empastada em DI e V6; T invertida em V1–V3'],
    pista: 'Pode ser normal; se novo, pense em TEP ou isquemia.',
    plano: () => sinusal(75, 0.16, 1.5),
    mod: (l, m) => {
      if (l === 'V1' || l === 'V2') return { ...m, r: 0.3, s: 0.35, r2: 0.9, t: -0.2 };
      if (l === 'V3') return { ...m, t: -0.12 };
      if (l === 'I' || l === 'V6' || l === 'V5' || l === 'aVL') return { ...m, s: 0.45 };
      return m;
    },
  },
  {
    id: 'bre', nome: 'Bloqueio de ramo esquerdo', grupo: 'Condução', fc: '75 bpm',
    achados: ['QRS ≥ 120 ms', 'V1 com QS ou rS profundo e largo', 'R alargada e entalhada em DI, aVL, V5 e V6, sem q septal; T discordante'],
    pista: 'BRE novo com dor torácica: trate como equivalente de IAM com supra (critérios de Sgarbossa).',
    plano: () => sinusal(75, 0.16, 2.3),
    mod: (l, m) => {
      if (l === 'V1' || l === 'V2' || l === 'V3') return { ...m, r: 0.08, s: l === 'V3' ? 1.2 : 1.6, t: 0.35 };
      if (l === 'I' || l === 'aVL' || l === 'V5' || l === 'V6') return { ...m, r: 1.0, r2: 0.8, s: 0, t: -0.3 };
      return m;
    },
  },
  {
    id: 'iam-anterior', nome: 'IAM com supra de ST anterior', grupo: 'Isquemia', fc: '100 bpm',
    achados: ['Supra de ST de V1 a V5, DI e aVL', 'Infra de ST recíproco em DII, DIII e aVF', 'Território da artéria descendente anterior'],
    pista: 'Reperfusão: angioplastia primária em até 90–120 min ou fibrinólise em até 30 min.',
    plano: () => sinusal(100),
    mod: supra({ I: 0.2, aVL: 0.25, V1: 0.2, V2: 0.42, V3: 0.48, V4: 0.38, V5: 0.22, V6: 0.06, II: -0.1, III: -0.22, aVF: -0.16, aVR: -0.06 }, ['V1', 'V2', 'V3']),
  },
  {
    id: 'iam-inferior', nome: 'IAM com supra de ST inferior', grupo: 'Isquemia', fc: '62 bpm',
    achados: ['Supra de ST em DII, DIII e aVF (maior em DIII)', 'Infra de ST recíproco em DI e aVL', 'Território da coronária direita (ou circunflexa)'],
    pista: 'Faça V3R e V4R (IAM de VD): evite nitrato e dê volume se hipotenso.',
    plano: () => sinusal(62),
    mod: supra({ II: 0.3, III: 0.4, aVF: 0.34, I: -0.12, aVL: -0.24, aVR: -0.08, V1: -0.04, V2: -0.08 }, ['III', 'aVF']),
  },
  {
    id: 'hipercalemia', nome: 'Hipercalemia', grupo: 'Outros', fc: '72 bpm',
    achados: ['Ondas T altas, apiculadas e de base estreita ("em tenda")', 'P achatada', 'Com K mais alto: QRS alarga, PR prolonga, até padrão sinusoidal'],
    pista: 'Gluconato de cálcio para estabilizar a membrana, depois insulina com glicose, β2 e remoção do potássio.',
    plano: () => sinusal(72, 0.2, 1.2),
    mod: (l, m) => ({ ...m, p: m.p * 0.4, t: l === 'aVR' ? -0.4 : l === 'III' || l === 'aVL' ? m.t * 2 : Math.max(0.6, m.t * 3), tw: 0.032 }),
  },
  {
    id: 'pericardite', nome: 'Pericardite aguda', grupo: 'Outros', fc: '98 bpm',
    achados: ['Supra de ST difuso, côncavo, em várias paredes', 'Infra do segmento PR (e supra do PR em aVR)', 'Sem imagem recíproca (exceto aVR e V1)'],
    pista: 'Dor pleurítica que melhora sentado: AINE + colchicina.',
    plano: () => sinusal(98),
    mod: (l, m) => (l === 'aVR' ? { ...m, st: -0.15, pr: -0.06 } : l === 'V1' ? { ...m, st: 0 } : { ...m, st: 0.16, pr: 0.06 }),
  },
];

export const padraoPorId = (id: string) => PADROES.find(p => p.id === id)!;

/* ---------- desenho ---------- */
export function desenharPadrao(cv: HTMLCanvasElement, pd: Padrao) {
  const W = cv.width, H = cv.height;
  const c = cv.getContext('2d')!;
  c.fillStyle = '#fff8f6';
  c.fillRect(0, 0, W, H);
  const mm = W / 262;
  for (let i = 0; i * mm <= Math.max(W, H); i++) {
    c.strokeStyle = i % 5 ? 'rgba(232,140,140,0.25)' : 'rgba(220,90,90,0.5)';
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(i * mm, 0);
    c.lineTo(i * mm, H);
    c.moveTo(0, i * mm);
    c.lineTo(W, i * mm);
    c.stroke();
  }
  const cache = preparar(pd);
  const x0 = 9 * mm;
  const larg = W - x0 - mm;
  const colW = larg / 4;
  const linhaH = H / 4;
  c.strokeStyle = '#111';
  c.fillStyle = '#111';
  c.lineWidth = Math.max(1.2, mm * 0.28);
  c.font = `600 ${Math.round(mm * 3.2)}px system-ui, sans-serif`;
  const traco = (l: Lead, xa: number, y0: number, w: number, t0: number) => {
    c.beginPath();
    for (let px = 0; px <= w; px++) {
      const t = t0 + px / mm / 25;
      const y = y0 - valor(pd, l, t, cache) * 10 * mm;
      px ? c.lineTo(xa + px, y) : c.moveTo(xa + px, y);
    }
    c.stroke();
  };
  const cal = (y0: number) => {
    c.beginPath();
    c.moveTo(mm, y0);
    c.lineTo(2 * mm, y0);
    c.lineTo(2 * mm, y0 - 10 * mm);
    c.lineTo(7 * mm, y0 - 10 * mm);
    c.lineTo(7 * mm, y0);
    c.lineTo(8 * mm, y0);
    c.stroke();
  };
  const grade: Lead[][] = [['I', 'aVR', 'V1', 'V4'], ['II', 'aVL', 'V2', 'V5'], ['III', 'aVF', 'V3', 'V6']];
  grade.forEach((ls, i) => {
    const y0 = linhaH * (i + 0.62);
    cal(y0);
    ls.forEach((l, j) => {
      const xa = x0 + j * colW;
      traco(l, xa, y0, colW - 2, j * 2.5);
      c.fillText(l, xa + mm, y0 - 12 * mm);
      if (j) {
        c.beginPath();
        c.moveTo(xa, y0 - 3 * mm);
        c.lineTo(xa, y0 + 3 * mm);
        c.stroke();
      }
    });
  });
  const y0 = linhaH * 3.62;
  cal(y0);
  traco('II', x0, y0, larg, 0);
  c.fillText('II', x0 + mm, y0 - 12 * mm);
}
