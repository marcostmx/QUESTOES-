/**
 * Carreira: XP, níveis, conquistas, desafio do dia e sequência.
 * Tudo é derivado dos dados que já existem (dias de estudo, histórico do OSCE e simulados),
 * então funciona retroativamente e acompanha a sincronização entre aparelhos.
 */
import { addDays, toDateKey } from './srs';
import type { DayLog } from './study';

export interface CareerInput {
  days: Record<string, DayLog>;
  osce: { id: string; date: number; nota: number; modo?: 'prova' | 'treino' }[];
  exams: { date: number; grade: number; questions: number }[];
  today: string;
}

export const XP = {
  acerto: 10,
  erro: 3,
  osceBase: 20,
  /** multiplicador para estações feitas em modo prova */
  osceProva: 1.25,
  simuladoPorQuestao: 2,
  simuladoBonusNota: 10,
  desafio: 100,
};

export interface Rank {
  id: string;
  nome: string;
  min: number;
  sigla: string;
}

export const RANKS: Rank[] = [
  { id: 'calouro', nome: 'Interno I', sigla: 'I1', min: 0 },
  { id: 'interno2', nome: 'Interno II', sigla: 'I2', min: 300 },
  { id: 'interno3', nome: 'Interno III', sigla: 'I3', min: 800 },
  { id: 'r1', nome: 'Residente R1', sigla: 'R1', min: 1500 },
  { id: 'r2', nome: 'Residente R2', sigla: 'R2', min: 3000 },
  { id: 'r3', nome: 'Residente R3', sigla: 'R3', min: 5500 },
  { id: 'chefe', nome: 'Chefe de residência', sigla: 'CR', min: 9000 },
  { id: 'preceptor', nome: 'Preceptor', sigla: 'PR', min: 14000 },
  { id: 'professor', nome: 'Professor titular', sigla: 'PT', min: 22000 },
];

export function rankOf(xp: number) {
  let i = 0;
  while (i + 1 < RANKS.length && xp >= RANKS[i + 1].min) i++;
  const atual = RANKS[i];
  const prox = RANKS[i + 1] ?? null;
  const progresso = prox ? (xp - atual.min) / (prox.min - atual.min) : 1;
  return { atual, prox, progresso, indice: i, faltam: prox ? prox.min - xp : 0 };
}

/* ---------- desafio do dia ---------- */
export interface DesafioModelo {
  id: string;
  titulo: (n: number) => string;
  alvo: number;
  /** progresso no dia (0…alvo) */
  medir: (dia: DiaResumo) => number;
}

export interface DiaResumo {
  respondidas: number;
  acertos: number;
  osce: number;
  osceMelhor: number;
}

const DESAFIOS: DesafioModelo[] = [
  { id: 'responder-20', alvo: 20, titulo: n => `Responda ${n} questões hoje`, medir: d => d.respondidas },
  { id: 'acertar-15', alvo: 15, titulo: n => `Acerte ${n} questões hoje`, medir: d => d.acertos },
  { id: 'osce-1', alvo: 1, titulo: () => 'Faça uma estação de OSCE hoje', medir: d => d.osce },
  { id: 'osce-80', alvo: 80, titulo: () => 'Tire 80 ou mais numa estação de OSCE', medir: d => d.osceMelhor },
  { id: 'responder-40', alvo: 40, titulo: n => `Maratona: responda ${n} questões hoje`, medir: d => d.respondidas },
  { id: 'precisao', alvo: 20, titulo: n => `Acerte ${n} questões com 75% de aproveitamento`, medir: d => (d.respondidas && d.acertos / d.respondidas >= 0.75 ? d.acertos : Math.min(d.acertos, 19)) },
  { id: 'osce-2', alvo: 2, titulo: n => `Plantão duplo: faça ${n} estações de OSCE`, medir: d => d.osce },
];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export const desafioDoDia = (dia: string) => DESAFIOS[hash(`desafio:${dia}`) % DESAFIOS.length];

/* ---------- conquistas ---------- */
export interface Totais {
  respondidas: number;
  acertos: number;
  melhorDia: number;
  sequencia: number;
  melhorSequencia: number;
  osce: number;
  osceDistintas: number;
  osceMelhor: number;
  osceProva: number;
  simulados: number;
  simuladoMelhor: number;
  desafios: number;
}

export interface Conquista {
  id: string;
  titulo: string;
  descricao: string;
  /** progresso atual e alvo, para mostrar barra nas que faltam */
  medir: (t: Totais) => [number, number];
}

export const CONQUISTAS: Conquista[] = [
  { id: 'primeira', titulo: 'Primeiro atendimento', descricao: 'Responda sua primeira questão', medir: t => [t.respondidas, 1] },
  { id: 'cem', titulo: 'Centena', descricao: 'Responda 100 questões', medir: t => [t.respondidas, 100] },
  { id: 'quinhentas', titulo: 'Plantonista', descricao: 'Responda 500 questões', medir: t => [t.respondidas, 500] },
  { id: 'mil', titulo: 'Mil horas de voo', descricao: 'Responda 1.000 questões', medir: t => [t.respondidas, 1000] },
  { id: 'dia50', titulo: 'Mão firme', descricao: 'Acerte 50 questões num só dia', medir: t => [t.melhorDia, 50] },
  { id: 'seq3', titulo: 'Rotina', descricao: 'Estude 3 dias seguidos', medir: t => [t.melhorSequencia, 3] },
  { id: 'seq7', titulo: 'Semana completa', descricao: 'Estude 7 dias seguidos', medir: t => [t.melhorSequencia, 7] },
  { id: 'seq30', titulo: 'Residência', descricao: 'Estude 30 dias seguidos', medir: t => [t.melhorSequencia, 30] },
  { id: 'osce1', titulo: 'Primeira estação', descricao: 'Conclua uma estação de OSCE', medir: t => [t.osce, 1] },
  { id: 'osce90', titulo: 'Exame impecável', descricao: 'Tire 90 ou mais numa estação de OSCE', medir: t => [t.osceMelhor, 90] },
  { id: 'osce10', titulo: 'Circuito completo', descricao: 'Conclua 10 estações diferentes', medir: t => [t.osceDistintas, 10] },
  { id: 'osce50', titulo: 'Examinador nato', descricao: 'Conclua 50 estações diferentes', medir: t => [t.osceDistintas, 50] },
  { id: 'prova', titulo: 'Sob avaliação', descricao: 'Faça 5 estações em modo prova', medir: t => [t.osceProva, 5] },
  { id: 'simulado', titulo: 'Dia de prova', descricao: 'Entregue um simulado', medir: t => [t.simulados, 1] },
  { id: 'simulado8', titulo: 'Aprovado com folga', descricao: 'Tire 8 ou mais num simulado', medir: t => [Math.floor(t.simuladoMelhor * 10), 80] },
  { id: 'desafio1', titulo: 'Desafio aceito', descricao: 'Complete um desafio do dia', medir: t => [t.desafios, 1] },
  { id: 'desafio10', titulo: 'Colecionador de desafios', descricao: 'Complete 10 desafios do dia', medir: t => [t.desafios, 10] },
];

/* ---------- cálculo ---------- */
export interface Carreira {
  xp: number;
  xpHoje: number;
  partes: { questoes: number; osce: number; simulados: number; desafios: number };
  rank: ReturnType<typeof rankOf>;
  totais: Totais;
  desafio: { modelo: DesafioModelo; titulo: string; progresso: number; alvo: number; feito: boolean };
  conquistas: { c: Conquista; feita: boolean; atual: number; alvo: number }[];
  /** últimos 14 dias: estudou? */
  semanas: { dia: string; ativo: boolean; desafio: boolean }[];
}

const xpOsce = (r: CareerInput['osce'][number]) => Math.round((XP.osceBase + r.nota) * (r.modo === 'prova' ? XP.osceProva : 1));
const xpSimulado = (e: CareerInput['exams'][number]) => e.questions * XP.simuladoPorQuestao + Math.round(e.grade * XP.simuladoBonusNota);

export function carreira(inp: CareerInput): Carreira {
  const porDia = new Map<string, DiaResumo>();
  const dia = (k: string) => {
    let d = porDia.get(k);
    if (!d) porDia.set(k, (d = { respondidas: 0, acertos: 0, osce: 0, osceMelhor: 0 }));
    return d;
  };
  for (const [k, l] of Object.entries(inp.days)) {
    const d = dia(k);
    d.respondidas += l.answered;
    d.acertos += l.correct;
  }
  for (const r of inp.osce) {
    const d = dia(toDateKey(new Date(r.date)));
    d.osce++;
    d.osceMelhor = Math.max(d.osceMelhor, r.nota);
  }

  let questoes = 0, desafios = 0, nDesafios = 0, xpHoje = 0;
  for (const [k, d] of porDia) {
    const q = d.acertos * XP.acerto + Math.max(0, d.respondidas - d.acertos) * XP.erro;
    questoes += q;
    const m = desafioDoDia(k);
    const ok = m.medir(d) >= m.alvo;
    if (ok) {
      desafios += XP.desafio;
      nDesafios++;
    }
    if (k === inp.today) xpHoje += q + (ok ? XP.desafio : 0);
  }
  let osce = 0;
  for (const r of inp.osce) {
    const x = xpOsce(r);
    osce += x;
    if (toDateKey(new Date(r.date)) === inp.today) xpHoje += x;
  }
  let simulados = 0;
  for (const e of inp.exams) {
    const x = xpSimulado(e);
    simulados += x;
    if (toDateKey(new Date(e.date)) === inp.today) xpHoje += x;
  }
  const xp = questoes + osce + simulados + desafios;

  // sequências (dia ativo = respondeu questão ou fez OSCE)
  const ativo = (k: string) => {
    const d = porDia.get(k);
    return !!d && (d.respondidas > 0 || d.osce > 0);
  };
  let cursor = ativo(inp.today) ? inp.today : addDays(inp.today, -1);
  let sequencia = 0;
  while (ativo(cursor)) {
    sequencia++;
    cursor = addDays(cursor, -1);
  }
  const chaves = [...porDia.keys()].filter(ativo).sort();
  let melhorSequencia = 0, run = 0, ant = '';
  for (const k of chaves) {
    run = ant && addDays(ant, 1) === k ? run + 1 : 1;
    melhorSequencia = Math.max(melhorSequencia, run);
    ant = k;
  }

  const totais: Totais = {
    respondidas: [...porDia.values()].reduce((a, d) => a + d.respondidas, 0),
    acertos: [...porDia.values()].reduce((a, d) => a + d.acertos, 0),
    melhorDia: Math.max(0, ...[...porDia.values()].map(d => d.acertos)),
    sequencia,
    melhorSequencia,
    osce: inp.osce.length,
    osceDistintas: new Set(inp.osce.map(r => r.id)).size,
    osceMelhor: Math.max(0, ...inp.osce.map(r => r.nota)),
    osceProva: inp.osce.filter(r => r.modo === 'prova').length,
    simulados: inp.exams.length,
    simuladoMelhor: Math.max(0, ...inp.exams.map(e => e.grade)),
    desafios: nDesafios,
  };

  const modelo = desafioDoDia(inp.today);
  const hoje = porDia.get(inp.today) ?? { respondidas: 0, acertos: 0, osce: 0, osceMelhor: 0 };
  const progresso = Math.min(modelo.alvo, modelo.medir(hoje));

  return {
    xp,
    xpHoje,
    partes: { questoes, osce, simulados, desafios },
    rank: rankOf(xp),
    totais,
    desafio: { modelo, titulo: modelo.titulo(modelo.alvo), progresso, alvo: modelo.alvo, feito: progresso >= modelo.alvo },
    conquistas: CONQUISTAS.map(c => {
      const [atual, alvo] = c.medir(totais);
      return { c, feita: atual >= alvo, atual: Math.min(atual, alvo), alvo };
    }),
    semanas: Array.from({ length: 14 }, (_, i) => {
      const k = addDays(inp.today, i - 13);
      const d = porDia.get(k);
      const m = desafioDoDia(k);
      return { dia: k, ativo: ativo(k), desafio: !!d && m.medir(d) >= m.alvo };
    }),
  };
}
