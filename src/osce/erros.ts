/* Revisão dos erros do OSCE: agrega as falhas das últimas tentativas e sugere a estação que treina cada uma. */
import data from '../data/osce/stations.json';
import { manobrasDoComando, nomeManobra, nomeSistema, type Estacao } from './engine';
import type { OsceRecord } from './history';
import type { Sistema } from './maneuvers';

const ESTACOES = data as unknown as Estacao[];

export interface ErroFrequente { tag: string; label: string; n: number; tentativas: number; estacao?: string }

const PA: Record<string, string> = {
  'pa:fase4': 'PAD registrada no abafamento (fase IV) em vez do desaparecimento',
  'pa:pad': 'PAD registrada errada',
  'pa:pas': 'PAS registrada errada',
  'pa:classe': 'Classificação da PA',
};

const AB: Record<string, string> = {
  higiene: 'Higienizar as mãos antes de tocar o paciente', apresentar: 'Apresentar-se e confirmar o nome', explicar: 'Explicar o exame',
  consentimento: 'Pedir consentimento', privacidade: 'Garantir privacidade', dor: 'Perguntar sobre dor antes de examinar', agradecer: 'Agradecer e encerrar',
};

export function rotulo(tag: string): string {
  const [tipo, ...r] = tag.split(':');
  const v = r.join(':');
  if (tipo === 'man') return `Faltou a manobra: ${nomeManobra(v)}`;
  if (tipo === 'pos') return `Posição errada em: ${nomeManobra(v)}`;
  if (tipo === 'verb') return `Respostas verbais em ${nomeSistema(v as Sistema)}`;
  if (tipo === 'pa') return PA[tag] ?? v;
  if (tipo === 'ab') return AB[v] ?? v;
  return v;
}

/** Estação para treinar o erro (prioriza as de nota mais baixa). */
function estacaoPara(tag: string, best: Map<string, number>): string | undefined {
  const [tipo, ...r] = tag.split(':');
  const v = r.join(':');
  let cand: Estacao[] = [];
  if (tipo === 'man' || tipo === 'pos') cand = ESTACOES.filter(e => e.comandos.some((_, i) => manobrasDoComando(e, i).includes(v)));
  else if (tipo === 'verb') cand = ESTACOES.filter(e => e.sistema === v);
  else if (tipo === 'pa') cand = ESTACOES.filter(e => e.pa);
  else cand = ESTACOES.filter(e => e.tipo !== 'discussao');
  if (!cand.length) return undefined;
  const nota = (e: Estacao) => best.get(e.id) ?? -1;
  cand.sort((a, b) => nota(a) - nota(b) || Math.random() - 0.5);
  return cand[0].id;
}

export function errosFrequentes(hist: OsceRecord[], best: Map<string, number>, limite = 8): ErroFrequente[] {
  const recentes = hist.filter(h => h.falhas).slice(0, 40);
  const cont = new Map<string, number>();
  for (const h of recentes) for (const f of h.falhas!) cont.set(f, (cont.get(f) ?? 0) + 1);
  return [...cont.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limite)
    .map(([tag, n]) => ({ tag, label: rotulo(tag), n, tentativas: recentes.length, estacao: estacaoPara(tag, best) }));
}

/** Estações já feitas com nota abaixo de 70, da pior para a melhor. */
export function paraRefazer(best: Map<string, number>, limite = 6) {
  return [...best.entries()].filter(([, n]) => n < 70).sort((a, b) => a[1] - b[1]).slice(0, limite)
    .map(([id, n]) => ({ e: ESTACOES.find(x => x.id === id)!, n })).filter(x => x.e);
}
