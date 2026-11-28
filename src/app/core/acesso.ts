/**
 * O que é grátis e o que é Premium. Regras puras (testáveis); a verificação do plano vem de assinatura.ts.
 * Grátis: 2 estações de OSCE por sistema, 2 casos vivos, 1 procedimento, RCP, ECG/gaso/RX de treino e
 * amostra de questões inéditas (filtrada no servidor, src/data/amostra.ts) com 20 por dia. Premium: tudo (OSCE completo, prova OSCE simulada, circuito, plantões, casos,
 * procedimentos, questões ilimitadas e simulados).
 */
import data from '../../data/osce/stations.json';

export const LIMITE_QUESTOES_DIA = 20;
export const CASOS_GRATIS = new Set(['iam-supra-anterior', 'asma-grave']);
export const PROCEDIMENTOS_GRATIS = new Set(['oxigenio']);
const OSCE_POR_SISTEMA = 2;

const OSCE_GRATIS = (() => {
  const n = new Map<string, number>();
  const s = new Set<string>();
  for (const e of data as unknown as { id: string; sistema: string; tipo?: string }[]) {
    if (e.tipo === 'discussao') continue;
    const k = n.get(e.sistema) ?? 0;
    if (k < OSCE_POR_SISTEMA) s.add(e.id);
    n.set(e.sistema, k + 1);
  }
  return s;
})();

export type Recurso =
  | { tipo: 'osce'; id: string; circuito?: boolean }
  | { tipo: 'caso'; id: string }
  | { tipo: 'procedimento'; id: string }
  | { tipo: 'plantao' }
  | { tipo: 'simulado' }
  | { tipo: 'questoes'; respondidasHoje: number };

export const osceGratis = (id: string) => OSCE_GRATIS.has(id);

/** true quando o recurso está liberado no plano grátis. */
export function liberadoGratis(r: Recurso): boolean {
  switch (r.tipo) {
    case 'osce':
      // prova completa e circuito são Premium; estação avulsa grátis só nas selecionadas
      return !r.circuito && osceGratis(r.id);
    case 'caso': return CASOS_GRATIS.has(r.id);
    case 'procedimento': return PROCEDIMENTOS_GRATIS.has(r.id);
    case 'plantao': return false;
    case 'simulado': return false;
    case 'questoes': return r.respondidasHoje < LIMITE_QUESTOES_DIA;
  }
}

export const pode = (premium: boolean, r: Recurso) => premium || liberadoGratis(r);
