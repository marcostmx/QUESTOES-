/**
 * Flashcards gerados do que o aluno errou: questões erradas (ou parcialmente certas) e falhas
 * do OSCE (manobra esquecida, posição errada, abertura/fechamento, PA). Repetição espaçada simples
 * (caixas de Leitner) guardada neste aparelho.
 */
import { useSyncExternalStore } from 'react';
import { storage } from './store';
import type { Question } from '../../data/schema';
import { LETTERS } from '../../data/schema';
import { nomePostura } from '../../osce/engine';
import { rotulo } from '../../osce/erros';
import type { OsceRecord } from '../../osce/history';
import { byId as manobraPorId } from '../../osce/maneuvers';
import type { QuestionState } from './study';

export type OrigemCartao = 'questao' | 'osce';
export interface Cartao { id: string; origem: OrigemCartao; titulo: string; frente: string; verso: string; extra?: string; questaoId?: string }
export interface EstadoCartao { caixa: number; proxima: number; vistos: number }
export type Nota = 'errei' | 'dificil' | 'acertei';

const MIN = 60_000;
const DIA = 86_400_000;
/** intervalo por caixa (caixa 0 = reaprender) */
export const INTERVALOS = [10 * MIN, 1 * DIA, 3 * DIA, 7 * DIA, 14 * DIA, 30 * DIA];

const corta = (s: string, n: number) => (s.length > n ? s.slice(0, n).replace(/\s+\S*$/, '') + '…' : s);
const limpa = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/[*_`#>]/g, '').replace(/\s+/g, ' ').trim();

export function respostaCerta(q: Question): string {
  const op = q.options ?? [];
  const L = (i: number) => q.optionLabels?.[i] ?? LETTERS[i];
  if (q.format === 'mcq' && q.answerIndex != null) return `${L(q.answerIndex)}) ${op[q.answerIndex]}`;
  if (q.format === 'multi' && q.answerIndices) return q.answerIndices.map(i => `${L(i)}) ${op[i]}`).join('\n');
  if (q.format === 'tf' && q.statements && q.truth) return q.statements.map((s, i) => `${q.truth![i] ? 'V' : 'F'} · ${s}`).join('\n');
  return '';
}

/** questão entra no baralho se já foi errada ou parcialmente certa alguma vez */
export const errouAlgumaVez = (s: QuestionState | undefined) => !!s && s.attempts > 0 && (s.correctCount < s.attempts || s.lastResult === 'partial');

export function cartaoDeQuestao(q: Question, nomeMateria: string): Cartao {
  return {
    id: 'q:' + q.id,
    origem: 'questao',
    titulo: nomeMateria + (q.topic ? ` · ${q.topic}` : ''),
    frente: corta(limpa(q.stem), 420),
    verso: respostaCerta(q) || corta(limpa(q.explanation), 400),
    extra: respostaCerta(q) ? corta(limpa(q.explanation), 500) : undefined,
    questaoId: q.id,
  };
}

/** Cartão para uma falha do OSCE (tags geradas por falhas() no motor). */
export function cartaoDeFalha(tag: string): Cartao | null {
  const [tipo, ...r] = tag.split(':');
  const v = r.join(':');
  const m = manobraPorId.get(v);
  if ((tipo === 'man' || tipo === 'pos') && m) {
    const post = m.postura?.length ? `Posição: ${m.postura.map(nomePostura).join(' ou ')}.` : '';
    if (tipo === 'pos') return { id: 'o:' + tag, origem: 'osce', titulo: 'OSCE · posição', frente: `Em que posição o paciente deve estar para: ${m.nome}?`, verso: post || 'Sem posição obrigatória.', extra: m.dica };
    return {
      id: 'o:' + tag,
      origem: 'osce',
      titulo: 'OSCE · manobra esquecida',
      frente: `Você deixou de fazer: ${m.nome}. ${m.dica ? 'Como se faz e qual' : 'Qual'} o achado normal?`,
      verso: `Normal: ${m.normal}`,
      extra: [m.dica && `Como fazer: ${m.dica}`, post].filter(Boolean).join(' ') || undefined,
    };
  }
  if (tipo === 'ab') return { id: 'o:' + tag, origem: 'osce', titulo: 'OSCE · abertura e fechamento', frente: 'Que etapa da abertura ou do fechamento da estação você deixou de fazer?', verso: rotulo(tag), extra: 'Sequência: higienizar as mãos, apresentar-se, explicar, pedir consentimento, garantir privacidade, perguntar sobre dor; no fim, agradecer.' };
  if (tipo === 'pa') return { id: 'o:' + tag, origem: 'osce', titulo: 'OSCE · aferição da PA', frente: 'Que ponto da aferição da PA você errou?', verso: rotulo(tag), extra: 'PAS = 1º som (fase I de Korotkoff); PAD = desaparecimento do som (fase V). Classifique pela média de duas medidas.' };
  if (tipo === 'verb') return { id: 'o:' + tag, origem: 'osce', titulo: 'OSCE · respostas faladas', frente: `O que o avaliador espera ouvir depois de cada manobra (${v})?`, verso: 'Diga o achado em voz alta, com a limitação: "sem alterações à inspeção estática", "Murphy negativo" etc.', extra: rotulo(tag) };
  return null;
}

export function montarBaralho(qs: Map<string, Question>, estado: Record<string, QuestionState>, osce: OsceRecord[], nomeMateria: (id: string) => string): Cartao[] {
  const cartoes: Cartao[] = [];
  for (const [id, s] of Object.entries(estado)) {
    if (!errouAlgumaVez(s)) continue;
    const q = qs.get(id);
    if (q) cartoes.push(cartaoDeQuestao(q, nomeMateria(q.subject)));
  }
  const tags = new Set(osce.filter(h => h.falhas).slice(0, 60).flatMap(h => h.falhas!));
  for (const t of tags) {
    const c = cartaoDeFalha(t);
    if (c) cartoes.push(c);
  }
  return cartoes;
}

export const vence = (e: EstadoCartao | undefined, agora: number) => !e || e.proxima <= agora;

export function avaliar(e: EstadoCartao | undefined, nota: Nota, agora: number): EstadoCartao {
  const caixa = nota === 'errei' ? 0 : nota === 'dificil' ? Math.max(1, Math.min(e?.caixa ?? 1, 2)) : Math.min(INTERVALOS.length - 1, (e?.caixa ?? 0) + 1);
  return { caixa, proxima: agora + INTERVALOS[caixa], vistos: (e?.vistos ?? 0) + 1 };
}

/* ---------- estado salvo neste aparelho ---------- */

const CHAVE = 'pr.v2.flash';
let estados: Record<string, EstadoCartao> = storage.read<Record<string, EstadoCartao>>(CHAVE) ?? {};
const ouvintes = new Set<() => void>();
export const flashStore = {
  get: () => estados,
  subscribe(l: () => void) {
    ouvintes.add(l);
    return () => ouvintes.delete(l);
  },
  marcar(id: string, nota: Nota, agora = Date.now()) {
    estados = { ...estados, [id]: avaliar(estados[id], nota, agora) };
    storage.write(CHAVE, estados);
    ouvintes.forEach(l => l());
  },
};
export const useFlashEstados = () => useSyncExternalStore(flashStore.subscribe, flashStore.get, flashStore.get);
