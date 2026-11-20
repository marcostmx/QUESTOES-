/* Regras do simulador OSCE: o que cada comando exige, achados revelados e correção. Sem dependências de UI. */
import { byId, CHECKLIST_AUTO, doSistema, OVERRIDES, POSTURAS, type Manobra, type Postura, type Sistema } from './maneuvers';

export interface Comando { texto: string; gabarito: string[] }
export interface ItemChecklist { sec: number; texto: string; pts: number }
export interface Estacao {
  id: string;
  n: number;
  rotulo: string;
  titulo?: string;
  tipo?: 'exame' | 'discussao';
  fonte?: string;
  checklist?: ItemChecklist[];
  sistema: Sistema;
  caso: string;
  achados: string;
  comandos: Comando[];
  pontoChave: string;
  paciente: { sexo: 'M' | 'F'; idade: number; fr: number; padrao: 'normal' | 'cheyne' | 'kussmaul' | 'taquipneia'; postura: Postura; dor: boolean };
  achadosPorManobra?: Record<string, string>;
}

export const SISTEMAS: { id: Sistema; nome: string }[] = [
  { id: 'abdome', nome: 'Abdome' },
  { id: 'cardiovascular', nome: 'Cardiovascular' },
  { id: 'respiratorio', nome: 'Respiratório' },
  { id: 'neurologico', nome: 'Neurológico' },
  { id: 'pele', nome: 'Ectoscopia' },
  { id: 'cabeca-pescoco', nome: 'Cabeça, pescoço e VIII par' },
  { id: 'dor-toracica', nome: 'Dor torácica' },
  { id: 'abdome-agudo', nome: 'Abdome agudo' },
  { id: 'urinario', nome: 'Sistema urinário' },
];
export const nomeSistema = (s: Sistema) => SISTEMAS.find(x => x.id === s)!.nome;

export const LEITURA_S = 60;
export const ESTACAO_S = 300;

const DEMONSTRA = /\b(demonstr|teste |avali|examin|realiz|localiz|execut|pesquis|delimit|posicion|mostr|prepar|inspecion|auscult|percorr|calcul)/i;
const VERBAL = /\b(verbaliz|interpret|descrev|descri[çc]|inform|defin|expliq|explica|cite|caracteriz|classifiq|nomei|indiq|identifiq|diferenci|integr|relacion|associ|compar|correlacion|apresent|aponte|justifiq|diga|qual|quais|calcul|localize a (les|hemis)|localize e identif|registr)/i;

/** Manobras que o comando pede (vazio = comando só verbal). */
export function manobrasDoComando(e: Estacao, i: number): string[] {
  const o = OVERRIDES[e.id]?.[i];
  if (o) return o;
  const t = e.comandos[i].texto;
  if (!DEMONSTRA.test(t)) return [];
  return doSistema(e.sistema).filter(m => m.rx?.test(t)).map(m => m.id);
}

/** O comando também pede resposta falada? */
export function temParteVerbal(e: Estacao, i: number): boolean {
  return manobrasDoComando(e, i).length === 0 || VERBAL.test(e.comandos[i].texto);
}

const DOR = /\bdor\b|parada .*inspira|desconforto/i;
const SEM_DOR = /indolor|sem dor|n[ãa]o h[áa] dor|sem desconforto/i;

/** Achado mostrado ao executar a manobra nesta estação. */
export function achado(e: Estacao, m: Manobra): { texto: string; alterado: boolean; dor: boolean } {
  const fixo = e.achadosPorManobra?.[m.id];
  if (fixo) return { texto: fixo, alterado: true, dor: DOR.test(fixo) && !SEM_DOR.test(fixo) };
  if (e.sistema === 'abdome') return { texto: m.normal, alterado: false, dor: false };
  const partes = e.achados.split(/;\s*|\s+•\s+|\.\s+(?=[A-ZÁÉÍÓÚ])/).map(s => s.trim().replace(/\.$/, '')).filter(Boolean);
  const hits = m.fk ? partes.filter(p => m.fk!.test(p)) : [];
  if (hits.length) {
    const texto = hits.join('; ') + '.';
    return { texto: texto[0].toUpperCase() + texto.slice(1), alterado: true, dor: DOR.test(texto) && !SEM_DOR.test(texto) };
  }
  return { texto: m.normal, alterado: false, dor: false };
}

/* ---------- Estado da tentativa ---------- */
export type Abertura = 'higiene' | 'apresentar' | 'explicar' | 'consentimento' | 'privacidade' | 'dor';
export type Fechamento = 'agradecer' | 'higieneFinal';

export interface Execucao { id: string; t: number; postura: Postura; lado: 'direito' | 'esquerdo' | null; ok: boolean }
export interface Tentativa {
  abertura: Partial<Record<Abertura, number>>; // segundos desde o início da estação
  fechamento: Partial<Record<Fechamento, number>>;
  postura: Postura;
  posturas: { postura: Postura; t: number }[];
  execs: Execucao[];
  respostas: Record<number, string>;
}

export const novaTentativa = (e: Estacao): Tentativa => ({
  abertura: {}, fechamento: {}, postura: e.paciente.postura, posturas: [], execs: [], respostas: {},
});

export const nomePostura = (p: Postura) => POSTURAS.find(x => x.id === p)!.nome;

/* ---------- Correção ---------- */
export type Status = 'fez' | 'parcial' | 'nao';
export interface Item {
  grupo: 'Abertura' | 'Técnica' | 'Comandos' | 'Encerramento';
  label: string;
  status: Status | null; // null = autoavaliação pendente
  detalhe?: string;
  peso: number;
  comando?: number;
  auto?: boolean;
  /** chave da autoavaliação (itens não automáticos) */
  chave?: number;
}

const pts = (s: Status | null) => (s === 'fez' ? 1 : s === 'parcial' ? 0.5 : 0);

/** Status da parte prática de um comando, a partir das manobras executadas. */
export function statusPratico(e: Estacao, t: Tentativa, i: number): { status: Status; feitas: string[]; faltam: string[]; posicaoErrada: string[] } {
  const req = manobrasDoComando(e, i);
  const feitas: string[] = [];
  const faltam: string[] = [];
  const posicaoErrada: string[] = [];
  for (const id of req) {
    if (id.startsWith('pos-')) {
      const alvo = id.slice(4) as Postura;
      (t.posturas.some(p => p.postura === alvo) || (t.postura === alvo && t.execs.length > 0) ? feitas : faltam).push(id);
      continue;
    }
    const ex = t.execs.filter(x => x.id === id);
    if (!ex.length) faltam.push(id);
    else {
      feitas.push(id);
      if (!ex.some(x => x.ok)) posicaoErrada.push(id);
    }
  }
  const status: Status = !req.length ? 'nao' : faltam.length === req.length ? 'nao' : faltam.length || posicaoErrada.length ? 'parcial' : 'fez';
  return { status, feitas, faltam, posicaoErrada };
}

export const nomeManobra = (id: string) => (id.startsWith('pos-') ? `Posicionar: ${nomePostura(id.slice(4) as Postura)}` : byId.get(id)?.nome ?? id);

const ORDEM = ['insp', 'ausc', 'perc', 'palp'] as const;

export function corrigir(e: Estacao, t: Tentativa, auto: Record<number, Status | null>): { itens: Item[]; nota: number; pendentes: number } {
  if (e.checklist) return corrigirChecklist(e, t, auto);
  const itens: Item[] = [];
  const primeiroToque = t.execs.length ? Math.min(...t.execs.map(x => x.t)) : Infinity;
  const h = t.abertura.higiene;
  itens.push({ grupo: 'Abertura', label: 'Higienizou as mãos antes de tocar o paciente', auto: true, peso: 1,
    status: h == null ? 'nao' : h <= primeiroToque ? 'fez' : 'parcial', detalhe: h != null && h > primeiroToque ? 'Higienizou depois de começar o exame.' : undefined });
  const ab: [Abertura, string][] = [['apresentar', 'Apresentou-se e confirmou o nome do paciente'], ['explicar', 'Explicou o exame'], ['consentimento', 'Pediu consentimento'], ['privacidade', 'Garantiu privacidade e expôs só o necessário'], ['dor', 'Perguntou sobre dor antes de examinar']];
  for (const [k, label] of ab) {
    const v = t.abertura[k];
    itens.push({ grupo: 'Abertura', label, auto: true, peso: k === 'dor' ? 0.5 : 0.5, status: v == null ? 'nao' : v <= primeiroToque ? 'fez' : 'parcial' });
  }

  // Técnica
  if (t.execs.length) {
    const fisicas = t.execs.filter(x => byId.get(x.id)?.regiao !== 'geral');
    if ((e.sistema === 'abdome' || e.sistema === 'cardiovascular' || e.sistema === 'abdome-agudo') && fisicas.length) {
      const dir = fisicas.filter(x => x.lado === 'direito').length / fisicas.length;
      itens.push({ grupo: 'Técnica', label: 'Examinou pelo lado direito do paciente', auto: true, peso: 0.5, status: dir >= 0.8 ? 'fez' : dir >= 0.4 ? 'parcial' : 'nao' });
    }
    const errados = t.execs.filter(x => !x.ok);
    itens.push({ grupo: 'Técnica', label: 'Paciente na posição correta para cada manobra', auto: true, peso: 1,
      status: errados.length === 0 ? 'fez' : errados.length <= 1 ? 'parcial' : 'nao',
      detalhe: errados.length ? `Fora da posição: ${[...new Set(errados.map(x => nomeManobra(x.id)))].join(', ')}.` : undefined });
    if (e.sistema === 'abdome' || e.sistema === 'abdome-agudo') {
      const etapas = t.execs.map(x => byId.get(x.id)).filter(m => m?.regiao === 'abdome' && m.etapa).map(m => ORDEM.indexOf(m!.etapa!));
      const distintas = new Set(etapas);
      if (distintas.size >= 2) {
        let ok = true;
        for (let i = 1; i < etapas.length; i++) if (etapas[i] < etapas[i - 1] && etapas[i] <= 1 && etapas[i - 1] >= 2) ok = false;
        itens.push({ grupo: 'Técnica', label: 'Respeitou a sequência inspeção → ausculta → percussão → palpação', auto: true, peso: 1, status: ok ? 'fez' : 'nao',
          detalhe: ok ? undefined : 'Auscultou ou inspecionou depois de percutir/palpar.' });
      }
    }
  }

  // Comandos
  e.comandos.forEach((c, i) => {
    const req = manobrasDoComando(e, i);
    const verbal = temParteVerbal(e, i);
    if (req.length) {
      const sp = statusPratico(e, t, i);
      const det: string[] = [];
      if (sp.faltam.length) det.push(`Faltou: ${sp.faltam.map(nomeManobra).join(', ')}.`);
      if (sp.posicaoErrada.length) det.push(`Posição inadequada: ${sp.posicaoErrada.map(nomeManobra).join(', ')}.`);
      itens.push({ grupo: 'Comandos', label: `${i + 1}. Execução`, comando: i, auto: true, peso: verbal ? 1 : 2, status: sp.status, detalhe: det.join(' ') || undefined });
    }
    if (verbal) itens.push({ grupo: 'Comandos', label: `${i + 1}. Resposta`, comando: i, chave: i, peso: req.length ? 1 : 2, status: auto[i] ?? null });
  });

  itens.push({ grupo: 'Encerramento', label: 'Agradeceu e informou o fim do exame', auto: true, peso: 0.5, status: t.fechamento.agradecer != null ? 'fez' : 'nao' });
  itens.push({ grupo: 'Encerramento', label: 'Higienizou as mãos ao final', auto: true, peso: 0.5,
    status: t.fechamento.higieneFinal != null ? 'fez' : 'nao' });

  const total = itens.reduce((s, x) => s + x.peso, 0);
  const got = itens.reduce((s, x) => s + x.peso * pts(x.status), 0);
  return { itens, nota: Math.round((got / total) * 100), pendentes: itens.filter(x => x.status === null).length };
}

/** Estações com checklist oficial do avaliador (pontos do material). */
function corrigirChecklist(e: Estacao, t: Tentativa, auto: Record<number, Status | null>) {
  const mapa = CHECKLIST_AUTO[e.id] ?? {};
  const itens: Item[] = e.checklist!.map((it, idx) => {
    const grupo: Item['grupo'] = it.sec === 0 ? 'Abertura' : it.sec === -1 ? 'Encerramento' : 'Comandos';
    const base = { grupo, label: it.texto, peso: it.pts, comando: it.sec > 0 ? it.sec - 1 : undefined };
    if (it.sec === 0) {
      const n = (['higiene', 'apresentar', 'explicar', 'consentimento'] as Abertura[]).filter(k => t.abertura[k] != null).length;
      return { ...base, auto: true, status: (n === 4 ? 'fez' : n >= 2 ? 'parcial' : 'nao') as Status };
    }
    if (it.sec === -1) return { ...base, auto: true, status: (t.fechamento.agradecer != null ? 'fez' : 'nao') as Status };
    const ids = mapa[idx];
    if (ids) {
      const feitos = ids.map(id => {
        if (id.startsWith('pos-')) {
          const alvo = id.slice(4) as Postura;
          return t.posturas.some(p => p.postura === alvo) || (e.paciente.postura === alvo && t.execs.length > 0) ? 2 : 0;
        }
        const ex = t.execs.filter(x => x.id === id);
        return ex.some(x => x.ok) ? 2 : ex.length ? 1 : 0;
      });
      const st: Status = feitos.every(f => f === 2) ? 'fez' : feitos.some(f => f > 0) ? 'parcial' : 'nao';
      return { ...base, auto: true, status: st, detalhe: st === 'parcial' ? 'Manobra feita fora da posição adequada ou incompleta.' : undefined };
    }
    return { ...base, chave: 1000 + idx, status: auto[1000 + idx] ?? null };
  });
  const total = itens.reduce((s, x) => s + x.peso, 0);
  const got = itens.reduce((s, x) => s + x.peso * pts(x.status), 0);
  return { itens, nota: Math.round((got / total) * 100), pendentes: itens.filter(x => x.status === null).length };
}

/** Fala do paciente (roteiro fixo). */
export function fala(e: Estacao, acao: Abertura | Fechamento | 'queixa'): string {
  const p = e.paciente;
  const dr = 'doutor(a)';
  switch (acao) {
    case 'apresentar': return `Muito prazer, ${dr}. Sim, sou eu mesm${p.sexo === 'F' ? 'a' : 'o'}, tenho ${p.idade} anos.`;
    case 'explicar': return 'Entendi. Pode me avisar o que vai fazendo?';
    case 'consentimento': return 'Pode sim, fique à vontade.';
    case 'privacidade': return 'Obrigado(a) por fechar a cortina.';
    case 'dor': {
      if (!p.dor) return 'Agora não estou sentindo dor.';
      const m = e.caso.match(/dor (?:abdominal )?(?:intensa |contínua |irradiada )?(?:em|no|na|nas|nos) ([^,.;]+)/i);
      return m ? `Sim, sinto dor ${m[0].replace(/^dor /i, '').replace(/ há .*$/, '')}. Por favor, deixe essa parte por último.` : 'Sim, estou com um pouco de dor. Vá com cuidado, por favor.';
    }
    case 'queixa': {
      const s = e.caso.split(/(?<=\.)\s/)[0];
      return s.replace(/^(Um|Uma|O|A) (homem|mulher|paciente|adolescente|jovem)[^,]*?(anos|anos de idade),?\s*/i, '').replace(/^Paciente de \d+ anos,?\s*/i, '');
    }
    case 'agradecer': return 'Eu que agradeço, obrigado(a)!';
    case 'higiene':
    case 'higieneFinal': return '';
  }
}
