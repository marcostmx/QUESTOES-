/**
 * Índice público das estações de OSCE: só o necessário para listas, trilha e revisão de erros.
 * O conteúdo de cada estação (caso, achados, comandos, checklist, falas) vem do servidor
 * (/api/conteudo/osce/:id) conforme o plano. Gerado de stations.json por `npm run indice-osce`.
 */
import type { Estacao } from './engine';
import { manobrasDoComando } from './engine';

export interface EstacaoIndice {
  id: string;
  n: number;
  rotulo: string;
  sistema: Estacao['sistema'];
  tipo?: Estacao['tipo'];
  extra?: boolean;
  checklist?: boolean;
  pa?: boolean;
  /** manobras pedidas nos comandos (para sugerir estação na revisão de erros) */
  manobras: string[];
}

export function gerarIndice(estacoes: Estacao[]): EstacaoIndice[] {
  return estacoes.map(e => ({
    id: e.id,
    n: e.n,
    rotulo: e.rotulo,
    sistema: e.sistema,
    ...(e.tipo ? { tipo: e.tipo } : {}),
    ...(e.extra ? { extra: true } : {}),
    ...(e.checklist ? { checklist: true } : {}),
    ...(e.pa ? { pa: true } : {}),
    manobras: [...new Set(e.comandos.flatMap((_, i) => manobrasDoComando(e, i)))],
  }));
}
