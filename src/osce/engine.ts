/* Regras do simulador OSCE: o que cada comando exige, achados revelados e correção. Sem dependências de UI. */
import { byId, CHECKLIST_AUTO, doSistema, OVERRIDES, POSTURAS, type Manobra, type Postura, type Sistema } from './maneuvers';

export interface Comando {
  texto: string;
  gabarito: string[];
  /** tipo da tarefa no simulado de 100 (EXAME, INTERPRETAÇÃO, DIAGNÓSTICO...) */
  tipo?: string;
  /** texto extra para reconhecer a manobra (rótulo e técnica do caderno do avaliador) */
  busca?: string;
  criterios?: string;
  erros?: string;
  /** achado informado pelo avaliador nesta tarefa */
  achado?: string;
}
export interface ItemChecklist { sec: number; texto: string; pts: number; parcial?: string }
export interface LeituraPA { braco: 'D' | 'E'; pas: number; pad: number; fase4: number }
export interface CenarioPA { circunferencia: number; manguito: 'adulto' | 'obeso'; leituras: LeituraPA[]; classe: string; ortostatica?: boolean; arritmia?: boolean }
export const CLASSES_PA = ['PA normal', 'Pré-hipertensão', 'HA estágio 1', 'HA estágio 2', 'HA estágio 3'];
export interface Estacao {
  id: string;
  n: number;
  rotulo: string;
  titulo?: string;
  tipo?: 'exame' | 'discussao';
  fonte?: string;
  extra?: boolean;
  checklist?: ItemChecklist[];
  sistema: Sistema;
  caso: string;
  achados: string;
  comandos: Comando[];
  pontoChave: string;
  paciente: { sexo: 'M' | 'F'; idade: number; fr: number; padrao: 'normal' | 'cheyne' | 'kussmaul' | 'taquipneia'; postura: Postura; dor: boolean };
  achadosPorManobra?: Record<string, string>;
  pa?: CenarioPA;
  falas?: { tema: string; resposta: string }[];
  pacienteSimulado?: string;
  vitais?: string;
  nivel?: string;
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
  { id: 'pressao', nome: 'Aferição da PA' },
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
  const c = e.comandos[i];
  if (c.tipo) {
    if (c.tipo !== 'EXAME') return [];
    const alvo = `${c.texto} ${c.busca ?? ''}`;
    return doSistema(e.sistema).filter(m => m.rx?.test(alvo)).map(m => m.id);
  }
  const t = c.texto;
  if (!DEMONSTRA.test(t)) return [];
  return doSistema(e.sistema).filter(m => m.rx?.test(t)).map(m => m.id);
}

/** O comando também pede resposta falada? */
export function temParteVerbal(e: Estacao, i: number): boolean {
  const c = e.comandos[i];
  if (c.tipo && c.tipo !== 'EXAME') return true;
  return manobrasDoComando(e, i).length === 0 || VERBAL.test(c.texto);
}

const DOR = /\bdor\b|parada .*inspira|desconforto/i;
const SEM_DOR = /indolor|sem dor|n[ãa]o h[áa] dor|sem desconforto/i;

/** Achado mostrado ao executar a manobra nesta estação. */
export function achado(e: Estacao, m: Manobra): { texto: string; alterado: boolean; dor: boolean } {
  if (e.pa) {
    const pa = e.pa;
    if (m.id === 'pa-circunferencia')
      return { texto: `Circunferência do braço: ${pa.circunferencia} cm → ${pa.manguito === 'obeso' ? 'manguito de obeso (grande); o adulto padrão superestimaria a PA' : 'manguito adulto padrão'}.`, alterado: pa.manguito === 'obeso', dor: false };
    if (m.id === 'pa-palpatoria')
      return { texto: `O pulso radial desaparece em cerca de ${Math.round((Math.max(...pa.leituras.map(l => l.pas)) + 4) / 2) * 2} mmHg (estimativa da PAS).`, alterado: true, dor: false };
  }
  const daTarefa = e.comandos.find((c, i) => c.achado && manobrasDoComando(e, i).includes(m.id))?.achado;
  if (daTarefa) return { texto: daTarefa, alterado: true, dor: DOR.test(daTarefa) && !SEM_DOR.test(daTarefa) };
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
  /** aferição da PA */
  braco?: 'D' | 'E';
  medidas: { braco: 'D' | 'E'; pas: number | null; pad: number | null; t: number }[];
  registro: { pas?: number; pad?: number; classe?: string; orto?: 'sim' | 'nao' };
}

export const novaTentativa = (e: Estacao): Tentativa => ({
  abertura: {}, fechamento: {}, postura: e.paciente.postura, posturas: [], execs: [], respostas: {}, braco: e.pa?.leituras[0].braco, medidas: [], registro: {},
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

  if (e.pa) itens.push(...itensPA(e, t));

  itens.push({ grupo: 'Encerramento', label: 'Agradeceu e informou o fim do exame', auto: true, peso: 0.5, status: t.fechamento.agradecer != null ? 'fez' : 'nao' });
  itens.push({ grupo: 'Encerramento', label: 'Higienizou as mãos ao final', auto: true, peso: 0.5,
    status: t.fechamento.higieneFinal != null ? 'fez' : 'nao' });

  const total = itens.reduce((s, x) => s + x.peso, 0);
  const got = itens.reduce((s, x) => s + x.peso * pts(x.status), 0);
  return { itens, nota: Math.round((got / total) * 100), pendentes: itens.filter(x => x.status === null).length };
}

/** Valor esperado no registro da PA (média em arritmia; braço de maior valor na avaliação inicial). */
export function paEsperada(pa: CenarioPA): { pas: number; pad: number; fase4: number } {
  if (pa.arritmia) {
    const m = (k: 'pas' | 'pad' | 'fase4') => Math.round(pa.leituras.reduce((a, l) => a + l[k], 0) / pa.leituras.length);
    return { pas: m('pas'), pad: m('pad'), fase4: m('fase4') };
  }
  return [...pa.leituras].sort((a, b) => b.pas - a.pas)[0];
}

const ORDEM_PA = ['pa-preparo', 'pa-repouso', 'pa-braco', 'pa-circunferencia', 'pa-manguito', 'pa-palpatoria', 'pa-esteto', 'pa-insuflar', 'pa-ausculta'];

function itensPA(e: Estacao, t: Tentativa): Item[] {
  const pa = e.pa!;
  const itens: Item[] = [];
  const first = (id: string) => t.execs.find(x => x.id === id)?.t;
  const mede = e.comandos.some((_, i) => manobrasDoComando(e, i).includes('pa-ausculta'));
  if (mede) {
    const palp = first('pa-palpatoria');
    const ausc = first('pa-ausculta');
    itens.push({ grupo: 'Técnica', label: 'Fez a estimativa palpatória antes da ausculta', auto: true, peso: 1,
      status: palp != null && ausc != null && palp < ausc ? 'fez' : palp != null ? 'parcial' : 'nao' });
    const seq = ORDEM_PA.map(first).filter((x): x is number => x != null);
    let ok = seq.length >= 2;
    for (let i = 1; i < seq.length; i++) if (seq[i] < seq[i - 1]) ok = false;
    itens.push({ grupo: 'Técnica', label: 'Seguiu a ordem: preparo → braço → manguito → palpatória → estetoscópio → insuflar → ausculta', auto: true, peso: 1,
      status: ok ? 'fez' : seq.length >= 2 ? 'parcial' : 'nao' });
    const esp = paEsperada(pa);
    const r = t.registro;
    itens.push({ grupo: 'Comandos', label: `PAS registrada (fase I): ${r.pas ?? '—'} mmHg`, auto: true, peso: 1,
      status: r.pas != null && r.pas <= esp.pas + 2 && r.pas >= esp.pas - 6 ? 'fez' : 'nao', detalhe: `Esperado: ${esp.pas} mmHg${pa.arritmia ? ' (média de 3 medidas na FA)' : pa.leituras.length > 1 ? ' (braço de maior valor)' : ''}.` });
    const fase4 = r.pad != null && r.pad >= esp.fase4 - 3;
    itens.push({ grupo: 'Comandos', label: `PAD registrada (fase V): ${r.pad ?? '—'} mmHg`, auto: true, peso: 1,
      status: r.pad != null && r.pad <= esp.pad + 2 && r.pad >= esp.pad - 6 && !fase4 ? 'fez' : 'nao',
      detalhe: fase4 ? `Você registrou o abafamento (fase IV). A PAD é o desaparecimento: ${esp.pad} mmHg.` : `Esperado: ${esp.pad} mmHg.` });
    if (pa.arritmia) {
      const n = t.medidas.length;
      itens.push({ grupo: 'Técnica', label: 'Fez 3 medidas por causa da arritmia', auto: true, peso: 0.5, status: n >= 3 ? 'fez' : n === 2 ? 'parcial' : 'nao' });
    }
    if (pa.leituras.length > 1 && !pa.arritmia) {
      const bracos = new Set(t.medidas.map(m => m.braco));
      itens.push({ grupo: 'Técnica', label: 'Mediu nos dois braços', auto: true, peso: 0.5, status: bracos.size >= 2 ? 'fez' : 'nao' });
    }
  }
  itens.push({ grupo: 'Comandos', label: `Classificação: ${t.registro.classe ?? '—'}`, auto: true, peso: 1,
    status: t.registro.classe === pa.classe ? 'fez' : 'nao', detalhe: `Esperado: ${pa.classe} (pelo maior valor entre PAS e PAD).` });
  if (pa.ortostatica)
    itens.push({ grupo: 'Comandos', label: `Hipotensão ortostática: ${t.registro.orto === 'sim' ? 'presente' : t.registro.orto === 'nao' ? 'ausente' : '—'}`, auto: true, peso: 1,
      status: t.registro.orto === 'sim' ? 'fez' : 'nao', detalhe: 'Queda da PAS de 136 para 110 mmHg (≥ 20) = presente.' });
  return itens;
}

/** Itens de abertura citados no texto do checklist (higiene, apresentação, explicação...). */
function aberturaDoItem(txt: string): Abertura[] {
  const ks: Abertura[] = [];
  if (/higien/i.test(txt)) ks.push('higiene');
  if (/apresent|identific/i.test(txt)) ks.push('apresentar');
  if (/expli/i.test(txt)) ks.push('explicar');
  if (/permiss|consent/i.test(txt)) ks.push('consentimento');
  if (/privacid/i.test(txt)) ks.push('privacidade');
  if (/\bdor\b/i.test(txt)) ks.push('dor');
  return ks.length ? ks : ['higiene', 'apresentar', 'explicar', 'consentimento'];
}

/** Nas estações com checklist sem mapa manual: o 1º item de cada tarefa de exame é corrigido pelas manobras. */
function mapaAutomatico(e: Estacao): Record<number, string[]> {
  const m: Record<number, string[]> = {};
  const vistos = new Set<number>();
  e.checklist!.forEach((it, idx) => {
    if (it.sec < 1 || vistos.has(it.sec)) return;
    vistos.add(it.sec);
    const ids = manobrasDoComando(e, it.sec - 1);
    if (ids.length) m[idx] = ids;
  });
  return m;
}

/** Estações com checklist oficial do avaliador (pontos do material). */
function corrigirChecklist(e: Estacao, t: Tentativa, auto: Record<number, Status | null>) {
  const mapa = CHECKLIST_AUTO[e.id] ?? mapaAutomatico(e);
  const itens: Item[] = e.checklist!.map((it, idx) => {
    const grupo: Item['grupo'] = it.sec === 0 ? 'Abertura' : it.sec === -1 ? 'Encerramento' : 'Comandos';
    const base = { grupo, label: it.texto, peso: it.pts, comando: it.sec > 0 ? it.sec - 1 : undefined };
    if (it.sec === 0) {
      const ks = aberturaDoItem(it.texto);
      const n = ks.filter(k => t.abertura[k] != null).length;
      return { ...base, auto: true, status: (n === ks.length ? 'fez' : n > 0 ? 'parcial' : 'nao') as Status, detalhe: n < ks.length ? it.parcial && `Parcial quando: ${it.parcial}.` : undefined };
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
    return { ...base, chave: 1000 + idx, status: auto[1000 + idx] ?? null, detalhe: it.parcial ? `Parcial quando: ${it.parcial}.` : undefined };
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

/* ---------- Anamnese (roteiro fixo a partir do caso) ---------- */
const NAO_SEI = 'Sem informação no caso — o paciente não sabe informar.';
const EXCLUI = /exame|achados|equipe|dever[áa]|objetivo|esta[çc][ãa]o|inspe[çc][ãa]o|palpa[çc][ãa]o|ausculta|percuss|foi percebid|observa-se|em observa|avalia[çc][ãa]o|hemodinamicamente|^est[áa] (?!internad)|conversa|responde [àa]s perguntas|voc[êe]|examinador|avaliador|pede que|distingue|^(PA|FC|FR|SpO|Glasgow|Press[ãa]o arterial|Frequ[êe]ncia|Temperatura)\b|^\d+ ?mmHg|sinais vitais|^(h[áa] |ao |um aparelho|durante|na observa)|^(irregular|glicemia)/i;
const VITAIS = /[,;]?\s*(e\s+)?(temperatura|press[ãa]o arterial|frequ[êe]ncia (card[íi]aca|respirat[óo]ria)|PA|FC|FR|SpO₂?|T)\s*(de\s*)?[\d,./×x ]+\s*(°C|mmHg|bpm|irpm|%)?/gi;
const SINTOMA = /dor|febre|fotofobia|frac[oa]s?|boca torta|palavra|tontura|cefaleia|falta de ar|dispneia|tosse|tremor|fraqueza|mancha|caro[çc]o|incha|aumento|cansa|plenitude|saciedade|abaulamento|equimose|ferida|vis[ãa]o|ouvido|vertigem|gira|urina|pinta|bolha|ard[êe]ncia|desconforto|peso|distens|sono|queda|dificuldade|v[ôo]mit|n[áa]usea|apetite|ic?ter|chiado|palpita|desmaio|formigamento|esquec|engasg|fala|escrita|letra|volume/i;
const ANTEC = /hipertens|diab[ée]t|\bHAS\b|\bDM\b|\bFA\b|comorbid|cirurgi|operad|doen[çc]a|insufici|c[âa]ncer|anticoag|vacina|internad|cardiopat|asm|DPOC/i;
const MEDIC = /\b(usa|uso|faz uso|toma|em uso|medica[çc]|enalapril|diclofenaco|metoclopramida|levodopa|anlodipino|hidroclorotiazida|anti-hipertens|AINE|rem[ée]dio)/i;
const NEGA = /^(nega|sem )|\bnega\b|\bn[ãa]o (relata|h[áa]|houve|apresenta)/i;
const HABITO = /fuma|tabag|[áa]lcool|etilis|trabalh|estudante|agricultor|mora |rep[úu]blica|caf[ée]|profiss|exerc[íi]cio|corrida|dieta|bebendo/i;

function clausulas(caso: string): string[] {
  return caso
    .split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚ“"])/)
    .flatMap(f => f.split(/;\s*|\s*•\s*|,\s+(?=(?:e\s+)?(?:chega|apresenta|refere|relata|procura|queixa|acorda|nota|percebeu|notou)\b)/))
    .map(s => s.replace(VITAIS, '').trim().replace(/[.;,]+$/, ''))
    .filter(s => s.length > 3 && !EXCLUI.test(s));
}

/** Limpa a cláusula do caso para servir de resposta (sem reescrever em 1ª pessoa, para não distorcer o caso). */
function limpa(f: string): string {
  const t = f.replace(/^[A-ZÁÉÍÓÚ][a-záéíóúãõç]+( [A-ZÁÉÍÓÚ][a-záéíóúãõç]+)?,\s*\d+\s*anos,?\s*/u, '').replace(/^(Um|Uma)\s+[^,]{0,40}?\d+\s+anos,?\s*(com\s+)?/i, '').replace(/^(Paciente|Homem|Mulher)\s*(de\s*)?,?\s*\d+\s*anos,?\s*/i, '').replace(/^e\s+/i, '').trim();
  return t ? t[0].toUpperCase() + t.slice(1) + '.' : '';
}

export interface Pergunta { id: string; pergunta: string; resposta: string }

/** Respostas do paciente, tiradas só do caso (quando o caso não traz a informação, ele diz que não sabe). */
export function anamnese(e: Estacao): Pergunta[] {
  if (e.falas?.length) {
    const cs0 = clausulas(e.caso);
    return [
      { id: 'queixa', pergunta: 'O que traz o(a) senhor(a) aqui hoje?', resposta: cs0.map(limpa).find(x => x.length > 3) ?? NAO_SEI },
      ...e.falas.map((f, i) => ({ id: `f${i}`, pergunta: `Perguntar sobre ${f.tema}`, resposta: f.resposta })),
    ];
  }
  const cs = clausulas(e.caso);
  const grupos: Record<'antec' | 'medic' | 'nega' | 'habito' | 'sint', string[]> = { antec: [], medic: [], nega: [], habito: [], sint: [] };
  for (const c of cs) {
    if (NEGA.test(c)) grupos.nega.push(c);
    else if (MEDIC.test(c)) grupos.medic.push(c);
    else if (ANTEC.test(c) && !SINTOMA.test(c)) grupos.antec.push(c);
    else if (HABITO.test(c) && !SINTOMA.test(c)) grupos.habito.push(c);
    else if (SINTOMA.test(c)) grupos.sint.push(c);
    else if (ANTEC.test(c)) grupos.antec.push(c);
    else grupos.habito.push(c);
  }
  const r = (l: string[], n = 2) => {
    const t = l.map(limpa).filter(x => x.length > 3).slice(0, n).join(' ');
    return t || NAO_SEI;
  };
  return [
    { id: 'queixa', pergunta: 'O que traz o(a) senhor(a) aqui hoje?', resposta: grupos.sint.length ? r(grupos.sint, 1) : r(cs, 1) },
    { id: 'historia', pergunta: 'Me conte mais: quando começou, como é, o que piora ou melhora?', resposta: r(grupos.sint.slice(1), 3) },
    { id: 'nega', pergunta: 'Teve febre, vômitos, trauma ou outra coisa?', resposta: r(grupos.nega, 3) },
    { id: 'antecedentes', pergunta: 'Tem alguma doença ou já fez cirurgia?', resposta: r(grupos.antec) },
    { id: 'medicacoes', pergunta: 'Usa algum remédio?', resposta: r(grupos.medic) },
    { id: 'habitos', pergunta: 'Fuma, bebe? Com o que trabalha?', resposta: r(grupos.habito) },
  ];
}

/* ---------- Respostas faladas: quanto do gabarito apareceu na resposta ---------- */
const STOP = new Set('para pela pelo pelos pelas como com sem uma umas uns que porque quando onde entre sobre mais menos muito pouco este esta isso essa esse aquele aquela deve pode ser sua seu suas seus pois apenas também tambem ainda depois antes outro outra cada qual quais neste nesta nesse nessa desde'.split(' '));
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9/≥≤ ]+/g, ' ');
function termos(s: string): string[] {
  const out = new Set<string>();
  for (const w of norm(s).split(/\s+/)) {
    if (!w) continue;
    if (/^\d/.test(w)) out.add(w);
    else if (w.length >= 4 && !STOP.has(w)) out.add(w.slice(0, 5));
  }
  return [...out];
}

/** Proporção dos termos do item do gabarito que aparecem na resposta (0 a 1). */
export function cobertura(resposta: string, alvo: string): number {
  const a = termos(alvo);
  if (!a.length || !resposta.trim()) return 0;
  const r = new Set(termos(resposta));
  return a.filter(x => r.has(x)).length / a.length;
}

export const statusCobertura = (c: number): Status => (c >= 0.55 ? 'fez' : c >= 0.25 ? 'parcial' : 'nao');

/** Sugestão de autoavaliação a partir do que foi escrito/ditado (o estudante confirma). */
export function sugestoes(e: Estacao, t: Tentativa): Record<number, Status> {
  const out: Record<number, Status> = {};
  if (e.checklist) {
    e.checklist.forEach((it, idx) => {
      const r = it.sec > 0 ? t.respostas[it.sec - 1] : undefined;
      if (r?.trim()) out[1000 + idx] = statusCobertura(cobertura(r, it.texto));
    });
    return out;
  }
  e.comandos.forEach((c, i) => {
    const r = t.respostas[i];
    if (!r?.trim() || !temParteVerbal(e, i) || !c.gabarito.length) return;
    const cs = c.gabarito.map(g => cobertura(r, g));
    out[i] = statusCobertura(cs.reduce((a, b) => a + b, 0) / cs.length);
  });
  return out;
}

/* ---------- Erros por tentativa (para a revisão dos erros) ---------- */
export function falhas(e: Estacao, t: Tentativa, itens: Item[]): string[] {
  const tags = new Set<string>();
  for (const it of itens) {
    if (it.status !== 'nao' && it.status !== 'parcial') continue;
    if (it.grupo === 'Abertura' || it.grupo === 'Encerramento') continue;
    else if (it.grupo === 'Técnica') tags.add('tec:' + it.label.replace(/:.*$/, ''));
    else if (it.chave != null) tags.add('verb:' + e.sistema);
  }
  // abertura e encerramento: etiquetas padronizadas (iguais em todas as estações)
  const primeiroToque = t.execs.length ? Math.min(...t.execs.map(x => x.t)) : Infinity;
  for (const k of ['higiene', 'apresentar', 'explicar', 'consentimento', 'privacidade', 'dor'] as Abertura[]) {
    const v = t.abertura[k];
    if (v == null || v > primeiroToque) tags.add('ab:' + k);
  }
  if (t.fechamento.agradecer == null) tags.add('ab:agradecer');
  e.comandos.forEach((_, i) => {
    if (!manobrasDoComando(e, i).length) return;
    const sp = statusPratico(e, t, i);
    sp.faltam.forEach(id => tags.add('man:' + id));
    sp.posicaoErrada.forEach(id => tags.add('pos:' + id));
  });
  if (e.pa) {
    for (const it of itens) {
      if (it.status === 'fez') continue;
      if (it.label.startsWith('PAD')) tags.add(it.detalhe?.includes('fase IV') ? 'pa:fase4' : 'pa:pad');
      else if (it.label.startsWith('PAS')) tags.add('pa:pas');
      else if (it.label.startsWith('Classificação')) tags.add('pa:classe');
    }
  }
  return [...tags];
}
