/**
 * Interpretação de gasometria arterial passo a passo (lógica pura).
 * 1) distúrbio primário  2) compensação esperada  3) ânion gap  4) delta-delta  5) causa.
 * Regras usadas:
 *  - acidose metabólica: pCO₂ esperado = 1,5 × HCO₃ + 8 (± 2) (Winter)
 *  - alcalose metabólica: pCO₂ esperado = 0,7 × HCO₃ + 21 (± 2)
 *  - acidose respiratória: HCO₃ sobe 1 (aguda) ou 3,5 (crônica) a cada 10 de pCO₂ acima de 40
 *  - alcalose respiratória: HCO₃ cai 2 (aguda) ou 5 (crônica) a cada 10 de pCO₂ abaixo de 40
 *  - ânion gap = Na − (Cl + HCO₃), normal 8–12; delta-delta = (AG − 12) / (24 − HCO₃)
 */

export type Primario = 'acidose-metabolica' | 'alcalose-metabolica' | 'acidose-respiratoria' | 'alcalose-respiratoria' | 'normal';
export const NOME_PRIMARIO: Record<Primario, string> = {
  'acidose-metabolica': 'Acidose metabólica',
  'alcalose-metabolica': 'Alcalose metabólica',
  'acidose-respiratoria': 'Acidose respiratória',
  'alcalose-respiratoria': 'Alcalose respiratória',
  normal: 'pH normal',
};

export type Associado = 'nenhum' | 'acidose-respiratoria' | 'alcalose-respiratoria' | 'acidose-metabolica' | 'alcalose-metabolica';
export const NOME_ASSOC: Record<Associado, string> = {
  nenhum: 'Compensação adequada (distúrbio simples)',
  'acidose-respiratoria': 'Acidose respiratória associada',
  'alcalose-respiratoria': 'Alcalose respiratória associada',
  'acidose-metabolica': 'Acidose metabólica associada',
  'alcalose-metabolica': 'Alcalose metabólica associada',
};

export interface Gaso {
  id: string;
  contexto: string;
  pco2: number;
  hco3: number;
  na: number;
  cl: number;
  po2: number;
  /** para distúrbio respiratório: agudo ou crônico */
  tempo?: 'agudo' | 'cronico';
  causa: string;
  distratores: string[];
  explicacao: string;
}

export const ph = (pco2: number, hco3: number) => 6.1 + Math.log10(hco3 / (0.03 * pco2));
export const ag = (g: Gaso) => g.na - (g.cl + g.hco3);

export function primario(g: Gaso): Primario {
  const p = ph(g.pco2, g.hco3);
  if (p < 7.35) return g.hco3 < 22 && (g.pco2 <= 45 || 24 - g.hco3 > (g.pco2 - 40) / 2) ? 'acidose-metabolica' : 'acidose-respiratoria';
  if (p > 7.45) return g.hco3 > 26 && (g.pco2 >= 35 || g.hco3 - 24 > (40 - g.pco2) / 2) ? 'alcalose-metabolica' : 'alcalose-respiratoria';
  return 'normal';
}

/** compensação esperada e distúrbio associado */
export function compensacao(g: Gaso): { faixa: [number, number]; variavel: 'pCO₂' | 'HCO₃'; formula: string; associado: Associado } {
  const pr = primario(g);
  const r = (x: number) => Math.round(x * 10) / 10;
  if (pr === 'acidose-metabolica') {
    const e = 1.5 * g.hco3 + 8;
    const f: [number, number] = [r(e - 2), r(e + 2)];
    return { faixa: f, variavel: 'pCO₂', formula: `1,5 × ${g.hco3} + 8 = ${r(e)} ± 2`, associado: g.pco2 > f[1] ? 'acidose-respiratoria' : g.pco2 < f[0] ? 'alcalose-respiratoria' : 'nenhum' };
  }
  if (pr === 'alcalose-metabolica') {
    const e = 0.7 * g.hco3 + 21;
    const f: [number, number] = [r(e - 2), r(e + 2)];
    return { faixa: f, variavel: 'pCO₂', formula: `0,7 × ${g.hco3} + 21 = ${r(e)} ± 2`, associado: g.pco2 > f[1] ? 'acidose-respiratoria' : g.pco2 < f[0] ? 'alcalose-respiratoria' : 'nenhum' };
  }
  if (pr === 'acidose-respiratoria') {
    const k = g.tempo === 'cronico' ? 3.5 : 1;
    const e = 24 + (k * (g.pco2 - 40)) / 10;
    const f: [number, number] = [r(e - 2), r(e + 2)];
    return { faixa: f, variavel: 'HCO₃', formula: `24 + ${String(k).replace('.', ',')} × (${g.pco2} − 40)/10 = ${r(e)} ± 2 (${g.tempo === 'cronico' ? 'crônica' : 'aguda'})`, associado: g.hco3 > f[1] ? 'alcalose-metabolica' : g.hco3 < f[0] ? 'acidose-metabolica' : 'nenhum' };
  }
  if (pr === 'alcalose-respiratoria') {
    const k = g.tempo === 'cronico' ? 5 : 2;
    const e = 24 - (k * (40 - g.pco2)) / 10;
    const f: [number, number] = [r(e - 2), r(e + 2)];
    return { faixa: f, variavel: 'HCO₃', formula: `24 − ${k} × (40 − ${g.pco2})/10 = ${r(e)} ± 2 (${g.tempo === 'cronico' ? 'crônica' : 'aguda'})`, associado: g.hco3 > f[1] ? 'alcalose-metabolica' : g.hco3 < f[0] ? 'acidose-metabolica' : 'nenhum' };
  }
  return { faixa: [35, 45], variavel: 'pCO₂', formula: 'pH normal: procure distúrbio misto pelo ânion gap', associado: 'nenhum' };
}

export type Delta = 'puro' | 'mais-ag-normal' | 'mais-alcalose';
export const NOME_DELTA: Record<Delta, string> = {
  puro: 'Acidose com AG elevado isolada (Δ/Δ 1–2)',
  'mais-ag-normal': 'Associada a acidose com AG normal (Δ/Δ < 1)',
  'mais-alcalose': 'Associada a alcalose metabólica (Δ/Δ > 2)',
};

export function deltaDelta(g: Gaso): { valor: number; tipo: Delta } | null {
  const a = ag(g);
  if (a <= 12) return null;
  const dHco3 = 24 - g.hco3;
  const valor = dHco3 <= 0 ? 99 : (a - 12) / dHco3;
  return { valor: Math.round(valor * 10) / 10, tipo: valor < 1 ? 'mais-ag-normal' : valor > 2 ? 'mais-alcalose' : 'puro' };
}

export const GASOS: Gaso[] = [
  {
    id: 'cad', contexto: 'Jovem de 19 anos, diabético tipo 1, com poliúria, vômitos e respiração profunda e rápida. Glicemia 486.',
    pco2: 19, hco3: 7, na: 134, cl: 98, po2: 104, causa: 'Cetoacidose diabética',
    distratores: ['Acidose lática por hipoperfusão', 'Diarreia aguda', 'Intoxicação por salicilato'],
    explicacao: 'Acidose metabólica com ânion gap elevado, compensada (respiração de Kussmaul), em diabético com hiperglicemia: cetoacidose.',
  },
  {
    id: 'diarreia', contexto: 'Mulher de 30 anos com diarreia aquosa volumosa há 3 dias. Sem vômitos.',
    pco2: 28, hco3: 13, na: 138, cl: 115, po2: 96, causa: 'Perda intestinal de bicarbonato (diarreia)',
    distratores: ['Cetoacidose alcoólica', 'Insuficiência renal aguda com uremia', 'Acidose lática'],
    explicacao: 'Acidose metabólica com ânion gap normal (hiperclorêmica): perda de bicarbonato pelo intestino.',
  },
  {
    id: 'vomitos', contexto: 'Homem de 45 anos com vômitos incoercíveis há 4 dias por estenose pilórica.',
    pco2: 48, hco3: 38, na: 136, cl: 86, po2: 82, causa: 'Perda de ácido gástrico (vômitos)',
    distratores: ['Hiperaldosteronismo primário', 'Hiperventilação por ansiedade', 'DPOC retentor crônico'],
    explicacao: 'Alcalose metabólica com hipocloremia e compensação respiratória adequada: perda de HCl gástrico.',
  },
  {
    id: 'opioide', contexto: 'Homem de 28 anos encontrado sonolento, com miose puntiforme e FR 6 irpm.', tempo: 'agudo',
    pco2: 70, hco3: 27, na: 140, cl: 103, po2: 58, causa: 'Hipoventilação aguda por intoxicação por opioide',
    distratores: ['DPOC estável', 'Crise de asma leve', 'Cetoacidose'],
    explicacao: 'Acidose respiratória aguda: o HCO₃ subiu só ~1 por 10 de pCO₂ (sem tempo de compensação renal). Naloxona e suporte ventilatório.',
  },
  {
    id: 'dpoc', contexto: 'Homem de 70 anos com DPOC grave, em consulta de rotina, estável.', tempo: 'cronico',
    pco2: 62, hco3: 32, na: 140, cl: 97, po2: 58, causa: 'Hipoventilação crônica do DPOC (retentor de CO₂)',
    distratores: ['Intoxicação por opioide', 'Vômitos', 'Crise de ansiedade'],
    explicacao: 'Acidose respiratória crônica compensada: HCO₃ subiu ~3,5 por 10 de pCO₂ e o pH está quase normal.',
  },
  {
    id: 'ansiedade', contexto: 'Mulher de 22 anos com formigamento nas mãos e ao redor da boca após discussão, FR 34.', tempo: 'agudo',
    pco2: 25, hco3: 21, na: 139, cl: 104, po2: 108, causa: 'Hiperventilação por crise de ansiedade',
    distratores: ['TEP (sempre considerar!)', 'Vômitos', 'Cetoacidose'],
    explicacao: 'Alcalose respiratória aguda com compensação adequada. Diagnóstico de exclusão: afaste TEP, sepse e hipoxemia.',
  },
  {
    id: 'lactica', contexto: 'Homem de 66 anos em choque séptico por pneumonia, PA 80/45.',
    pco2: 24, hco3: 10, na: 140, cl: 104, po2: 70, causa: 'Acidose lática por hipoperfusão (choque)',
    distratores: ['Cetoacidose diabética', 'Diarreia', 'Acidose tubular renal'],
    explicacao: 'Acidose metabólica com ânion gap elevado em paciente chocado: acidose lática.',
  },
  {
    id: 'misto-resp', contexto: 'Paciente após parada cardiorrespiratória, ainda sem via aérea avançada.',
    pco2: 55, hco3: 15, na: 140, cl: 100, po2: 62, causa: 'Acidose lática + hipoventilação (distúrbio misto)',
    distratores: ['Cetoacidose isolada', 'Diarreia isolada', 'DPOC estável'],
    explicacao: 'Acidose metabólica com AG elevado e pCO₂ muito acima do esperado (Winter): acidose respiratória associada.',
  },
  {
    id: 'misto-alc', contexto: 'Alcoolista com vômitos há 5 dias e jejum prolongado. pH "normal".',
    pco2: 40, hco3: 24, na: 140, cl: 95, po2: 92, causa: 'Cetoacidose alcoólica + alcalose por vômitos',
    distratores: ['Gasometria normal', 'Hiperventilação', 'Diarreia'],
    explicacao: 'pH e HCO₃ normais escondem dois distúrbios: AG 21 (acidose com AG elevado) e Δ/Δ alto (alcalose metabólica por vômitos). Sempre calcule o AG!',
  },
];
