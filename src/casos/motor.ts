/**
 * Motor de caso vivo: relógio de jogo, sinais vitais que evoluem, condutas que gastam tempo,
 * exames com resultado depois de um intervalo, metas com prazo e debriefing.
 * Cada caso define suas condutas, a fisiologia (tick) e as metas.
 */

export type Ritmo = 'sinusal' | 'supra' | 'riva' | 'fv' | 'tv' | 'assistolia' | 'fa' | 'bradi' | 'mp';

export interface Vitais {
  fc: number;
  pas: number;
  pad: number;
  fr: number;
  spo2: number;
  temp: number;
  /** dor de 0 a 10 */
  dor: number;
  ritmo: Ritmo;
  /** tem pulso central? */
  pulso: boolean;
}

export type Grupo = 'Avaliação' | 'Monitorização' | 'Exames' | 'Medicações' | 'Procedimentos' | 'Decisão';
export const GRUPOS: Grupo[] = ['Avaliação', 'Monitorização', 'Exames', 'Medicações', 'Procedimentos', 'Decisão'];

export interface Registro {
  t: number;
  texto: string;
  tipo: 'acao' | 'evento' | 'alerta' | 'resultado' | 'fala';
}

export interface Resultado {
  id: string;
  titulo: string;
  texto: string;
  t: number;
  /** desenho opcional (ex.: ECG) */
  figura?: string;
}

export interface Estado {
  /** segundos de jogo desde a chegada */
  t: number;
  v: Vitais;
  /** quando cada conduta foi feita pela primeira vez (s) */
  feito: Record<string, number>;
  /** quantas vezes cada conduta foi feita */
  vezes: Record<string, number>;
  fx: Record<string, number | boolean | string>;
  log: Registro[];
  resultados: Resultado[];
  pendentes: (Resultado & { pronto: number })[];
  penal: { texto: string; pts: number; t: number }[];
  monitorado: boolean;
  /** frase atual do paciente/estado clínico */
  quadro: string;
  fim?: { motivo: 'transferido' | 'alta' | 'obito' | 'tempo' | 'internado'; texto: string; t: number };
}

export interface Acao {
  id: string;
  rotulo: string;
  grupo: Grupo;
  /** segundos de jogo que a conduta consome */
  dur: number;
  detalhe?: string;
  repetivel?: boolean;
  /** motivo para estar indisponível (ou null) */
  bloqueio?: (e: Estado) => string | null;
  /** some da lista quando devolve false */
  visivel?: (e: Estado) => boolean;
  fazer: (e: Estado, c: Ctx) => void;
}

export interface Meta {
  id: string;
  texto: string;
  peso: number;
  /** null = não se aplica neste desfecho (não conta) */
  avaliar: (e: Estado) => { ok: boolean; nota?: string } | null;
  dica: string;
}

export interface Caso {
  id: string;
  sistema: 'cardiovascular' | 'respiratorio' | 'abdome' | 'neurologico' | 'renal' | 'trauma';
  titulo: string;
  subtitulo: string;
  local: string;
  paciente: { nome: string; idade: number; sexo: 'M' | 'F'; peso: number };
  chegada: string[];
  triagem: Partial<Vitais>;
  inicial: Vitais;
  acoes: Acao[];
  metas: Meta[];
  /** fisiologia: chamada a cada passo de jogo */
  tick: (e: Estado, dt: number, c: Ctx) => void;
  /** tempo máximo (s) antes de encerrar */
  limite: number;
  /** segundos de jogo por segundo real (padrão 4) */
  velocidade?: number;
  /** pontos de ensino exibidos no debriefing */
  ensino: string[];
}

/** Ferramentas que o caso usa para alterar o estado */
export interface Ctx {
  log: (texto: string, tipo?: Registro['tipo']) => void;
  resultado: (r: Omit<Resultado, 't'>, atraso?: number) => void;
  penalizar: (texto: string, pts: number) => void;
  encerrar: (motivo: NonNullable<Estado['fim']>['motivo'], texto: string) => void;
}

export function novoEstado(c: Caso): Estado {
  return {
    t: 0,
    v: { ...c.inicial },
    feito: {},
    vezes: {},
    fx: {},
    log: [{ t: 0, texto: c.chegada.join(' '), tipo: 'evento' }],
    resultados: [],
    pendentes: [],
    penal: [],
    monitorado: false,
    quadro: '',
  };
}

function ctx(e: Estado): Ctx {
  return {
    log: (texto, tipo = 'evento') => e.log.push({ t: e.t, texto, tipo }),
    resultado: (r, atraso = 0) => {
      if (atraso <= 0) {
        e.resultados.push({ ...r, t: e.t });
        e.log.push({ t: e.t, texto: `${r.titulo}: resultado disponível`, tipo: 'resultado' });
      } else e.pendentes.push({ ...r, t: e.t, pronto: e.t + atraso });
    },
    penalizar: (texto, pts) => {
      if (e.penal.some(p => p.texto === texto)) return;
      e.penal.push({ texto, pts, t: e.t });
      e.log.push({ t: e.t, texto, tipo: 'alerta' });
    },
    encerrar: (motivo, texto) => {
      if (!e.fim) e.fim = { motivo, texto, t: e.t };
    },
  };
}

const PASSO = 1; // s de jogo por passo de fisiologia

/** Avança o relógio de jogo (fisiologia, resultados pendentes, limite). */
export function avancar(c: Caso, e: Estado, segundos: number) {
  const k = ctx(e);
  let resto = segundos;
  while (resto > 0 && !e.fim) {
    const dt = Math.min(PASSO, resto);
    e.t += dt;
    resto -= dt;
    c.tick(e, dt, k);
    for (const p of [...e.pendentes]) {
      if (p.pronto <= e.t) {
        e.pendentes = e.pendentes.filter(x => x !== p);
        const { pronto: _p, ...r } = p;
        e.resultados.push({ ...r, t: e.t });
        e.log.push({ t: e.t, texto: `${r.titulo}: resultado disponível`, tipo: 'resultado' });
      }
    }
    if (e.t >= c.limite) k.encerrar('tempo', 'O tempo do caso acabou.');
  }
}

export function bloqueio(e: Estado, a: Acao): string | null {
  if (e.fim) return 'Caso encerrado';
  if (!a.repetivel && e.feito[a.id] !== undefined) return 'Já feito';
  return a.bloqueio?.(e) ?? null;
}

/** Executa uma conduta: registra, aplica o efeito e avança o tempo que ela consome. */
export function executar(c: Caso, e: Estado, id: string) {
  const a = c.acoes.find(x => x.id === id);
  if (!a || bloqueio(e, a)) return false;
  e.log.push({ t: e.t, texto: a.rotulo, tipo: 'acao' });
  if (e.feito[a.id] === undefined) e.feito[a.id] = e.t;
  e.vezes[a.id] = (e.vezes[a.id] ?? 0) + 1;
  a.fazer(e, ctx(e));
  avancar(c, e, a.dur);
  return true;
}

export interface Debriefing {
  nota: number;
  metas: { m: Meta; ok: boolean; nota?: string }[];
  penal: Estado['penal'];
  obito: boolean;
}

export function debriefing(c: Caso, e: Estado): Debriefing {
  const metas = c.metas.map(m => ({ m, r: m.avaliar(e) })).filter(x => x.r).map(x => ({ m: x.m, ok: x.r!.ok, nota: x.r!.nota }));
  const total = metas.reduce((a, x) => a + x.m.peso, 0) || 1;
  const ganho = metas.reduce((a, x) => a + (x.ok ? x.m.peso : 0), 0);
  const menos = e.penal.reduce((a, p) => a + p.pts, 0);
  const obito = e.fim?.motivo === 'obito';
  let nota = Math.round((ganho / total) * 100) - menos;
  if (obito) nota = Math.min(nota, 30);
  return { nota: Math.max(0, Math.min(100, nota)), metas, penal: e.penal, obito };
}

/** mm:ss do relógio de jogo */
export const relogio = (s: number) => {
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const ss = String(Math.floor(s % 60)).padStart(2, '0');
  return s >= 3600 ? `${Math.floor(s / 3600)}h${mm}` : `${mm}:${ss}`;
};

/** aproxima x de alvo com constante de tempo tau (s) */
export const aproxima = (x: number, alvo: number, dt: number, tau: number) => x + (alvo - x) * (1 - Math.exp(-dt / tau));
