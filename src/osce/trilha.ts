/**
 * Trilha OSCE do 4º período: módulos por sistema numa ordem do básico ao complexo, estado de cada
 * estação (nova, treinando, dominada, revisar) e a próxima estação recomendada.
 * Domínio = duas tentativas com nota ≥ 70. Estação dominada há mais de 14 dias volta para revisão
 * (repetição espaçada, como nas plataformas de OSCE).
 */
import type { Estacao } from './engine';
import type { OsceRecord } from './history';
import type { Sistema } from './maneuvers';

export const NOTA_DOMINIO = 70;
export const TENTATIVAS_DOMINIO = 2;
export const REVISAR_DIAS = 14;
const DIA = 24 * 3600 * 1000;

/** ordem da trilha: habilidades básicas → sistemas → síndromes */
export const ORDEM_TRILHA: { sistema: Sistema; porque: string }[] = [
  { sistema: 'pressao', porque: 'Base de toda estação: sinais vitais e técnica da PA.' },
  { sistema: 'pele', porque: 'Ectoscopia: o que se vê antes de tocar.' },
  { sistema: 'cabeca-pescoco', porque: 'Linfonodos, tireoide e VIII par.' },
  { sistema: 'cardiovascular', porque: 'Pulsos, ictus, focos e sopros.' },
  { sistema: 'respiratorio', porque: 'Inspeção, palpação, percussão e ausculta.' },
  { sistema: 'abdome', porque: 'Sequência inspeção → ausculta → percussão → palpação.' },
  { sistema: 'urinario', porque: 'Giordano, globo vesical e rins.' },
  { sistema: 'neurologico', porque: 'O maior bloco da prova: nervos, força, reflexos, cerebelo.' },
  { sistema: 'dor-toracica', porque: 'Integração: raciocínio a partir da queixa.' },
  { sistema: 'abdome-agudo', porque: 'Integração: sinais de irritação peritoneal.' },
];

export type StatusEstacao = 'nova' | 'treinando' | 'dominada' | 'revisar';
export interface InfoEstacao { id: string; status: StatusEstacao; melhor: number | null; tentativas: number; ultima: number | null }
export interface Modulo {
  sistema: Sistema;
  porque: string;
  estacoes: InfoEstacao[];
  dominadas: number;
  emTreino: number;
  /** 0–100: parcela de estações dominadas */
  pct: number;
}

export function statusDe(id: string, hist: OsceRecord[], agora = Date.now()): InfoEstacao {
  const t = hist.filter(r => r.id === id);
  if (!t.length) return { id, status: 'nova', melhor: null, tentativas: 0, ultima: null };
  const melhor = Math.max(...t.map(r => r.nota));
  const ultima = Math.max(...t.map(r => r.date));
  const boas = t.filter(r => r.nota >= NOTA_DOMINIO).length;
  let status: StatusEstacao = boas >= TENTATIVAS_DOMINIO ? 'dominada' : 'treinando';
  if (status === 'dominada' && agora - ultima > REVISAR_DIAS * DIA) status = 'revisar';
  return { id, status, melhor, tentativas: t.length, ultima };
}

export const praticavel = (e: Estacao) => e.tipo !== 'discussao';

export function trilha(estacoes: Estacao[], hist: OsceRecord[], agora = Date.now()): Modulo[] {
  return ORDEM_TRILHA.map(({ sistema, porque }) => {
    const est = estacoes.filter(e => e.sistema === sistema && praticavel(e)).map(e => statusDe(e.id, hist, agora));
    const dominadas = est.filter(x => x.status === 'dominada').length;
    const emTreino = est.filter(x => x.status === 'treinando' || x.status === 'revisar').length;
    return { sistema, porque, estacoes: est, dominadas, emTreino, pct: est.length ? Math.round((dominadas / est.length) * 100) : 0 };
  }).filter(m => m.estacoes.length);
}

export function resumo(mods: Modulo[]) {
  const total = mods.reduce((a, m) => a + m.estacoes.length, 0);
  const dominadas = mods.reduce((a, m) => a + m.dominadas, 0);
  const revisar = mods.reduce((a, m) => a + m.estacoes.filter(x => x.status === 'revisar').length, 0);
  return { total, dominadas, revisar, pct: total ? Math.round((dominadas / total) * 100) : 0 };
}

/**
 * Próxima estação: 1) revisão vencida mais antiga; 2) no primeiro módulo não concluído, a estação em
 * treino com pior nota; 3) a primeira nova. `liberada` filtra o que o plano permite (o grátis só
 * recebe recomendação de estações grátis; se acabarem, recomenda a primeira bloqueada).
 */
export function proxima(mods: Modulo[], liberada: (id: string) => boolean = () => true): { id: string; sistema: Sistema; motivo: string; bloqueada: boolean } | null {
  const todas = mods.flatMap(m => m.estacoes.map(x => ({ ...x, sistema: m.sistema })));
  const rev = todas.filter(x => x.status === 'revisar' && liberada(x.id)).sort((a, b) => (a.ultima ?? 0) - (b.ultima ?? 0))[0];
  if (rev) return { id: rev.id, sistema: rev.sistema, motivo: 'Revisão: dominada há mais de 14 dias', bloqueada: false };
  let primeiraBloqueada: { id: string; sistema: Sistema } | null = null;
  for (const m of mods) {
    if (m.dominadas === m.estacoes.length) continue;
    const treino = m.estacoes.filter(x => x.status === 'treinando').sort((a, b) => (a.melhor ?? 0) - (b.melhor ?? 0));
    const t = treino.find(x => liberada(x.id));
    if (t) return { id: t.id, sistema: m.sistema, motivo: `Ainda não dominada (melhor nota ${t.melhor}%)`, bloqueada: false };
    const nova = m.estacoes.find(x => x.status === 'nova' && liberada(x.id));
    if (nova) return { id: nova.id, sistema: m.sistema, motivo: 'Próxima estação nova da trilha', bloqueada: false };
    const bl = m.estacoes.find(x => x.status !== 'dominada');
    if (bl && !primeiraBloqueada) primeiraBloqueada = { id: bl.id, sistema: m.sistema };
  }
  return primeiraBloqueada ? { ...primeiraBloqueada, motivo: 'Continue a trilha com o Premium', bloqueada: true } : null;
}

/** Ritmo até a prova: estações por dia para dominar o que falta (cada domínio pede 2 tentativas). */
export function ritmo(mods: Modulo[], dataProva: string | undefined, agora = Date.now()) {
  if (!dataProva) return null;
  const dias = Math.ceil((new Date(dataProva + 'T23:59:59').getTime() - agora) / DIA);
  if (dias <= 0) return { dias: 0, porDia: 0 };
  const faltam = mods.reduce((a, m) => a + m.estacoes.filter(x => x.status !== 'dominada').reduce((b, x) => b + Math.max(1, TENTATIVAS_DOMINIO - (x.melhor != null && x.melhor >= NOTA_DOMINIO ? 1 : 0)), 0), 0);
  return { dias, porDia: Math.ceil(faltam / dias) };
}
