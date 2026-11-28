/**
 * Treino em dupla do OSCE: sala com código, dois celulares. O avaliador vê caso, achados e checklist e
 * marca os itens; o examinando vê só o enunciado, o cronômetro e os achados que o avaliador revelar.
 * Estado em Firestore `salas/{codigo}` (só o servidor lê e escreve); os celulares consultam a cada segundo.
 */
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import express, { type Request, type Response } from 'express';
import { osceGratis } from '../src/app/core/acesso';
import { acessoPremium, admin, usuario } from './assinatura';

export type Papel = 'avaliador' | 'examinando';
export type Fase = 'espera' | 'leitura' | 'estacao' | 'fim';
export type Marca = 'feito' | 'parcial' | 'nao';
export interface Sala {
  codigo: string;
  criador: string;
  expira: number;
  membros: Record<string, { nome: string; papel: Papel }>;
  estacaoId: string | null;
  rodada: number;
  fase: Fase;
  faseDesde: number;
  marcas: Record<string, Marca>;
  revelados: string[];
  nota: number | null;
  versao: number;
}

interface Item { texto: string; pts: number; parcial?: string }
interface EstacaoFull {
  id: string; rotulo: string; sistema: string; titulo?: string; caso: string; achados: string; pontoChave: string; vitais?: string;
  comandos: { texto: string; gabarito: string[] }[]; checklist?: Item[]; achadosPorManobra?: Record<string, string>;
}

const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
export const novoCodigo = () => Array.from(crypto.randomBytes(5), b => ALFABETO[b % ALFABETO.length]).join('');
export const codigoValido = (c: string) => /^[A-HJ-NP-Z2-9]{5}$/.test(c);
const DURACAO = 4 * 3600 * 1000;

const OSCE = process.env.CONTEUDO_OSCE || path.join(process.cwd(), 'src/data/osce/stations.json');
let estacoes: Map<string, EstacaoFull> | null = null;
const estacao = (id: string | null) => {
  if (!id) return undefined;
  estacoes ??= new Map((JSON.parse(fs.readFileSync(OSCE, 'utf8')) as EstacaoFull[]).map(e => [e.id, e]));
  return estacoes.get(id);
};

/** itens avaliados: o checklist oficial, ou um item por comando (com o gabarito como referência) */
export function itensDe(e: EstacaoFull): Item[] {
  if (e.checklist?.length) return e.checklist.map(i => ({ texto: i.texto, pts: i.pts, parcial: i.parcial }));
  const n = e.comandos.length || 1;
  return e.comandos.map(c => ({ texto: c.texto, pts: Math.round((10 / n) * 100) / 100, parcial: c.gabarito.join(' · ') || undefined }));
}

export function notaDe(itens: Item[], marcas: Record<string, Marca>): number {
  const total = itens.reduce((a, i) => a + i.pts, 0) || 1;
  const feito = itens.reduce((a, i, k) => a + (marcas[k] === 'feito' ? i.pts : marcas[k] === 'parcial' ? i.pts / 2 : 0), 0);
  return Math.round((feito / total) * 100);
}

/** o que cada papel pode ver */
export function vista(s: Sala, uid: string, agora = Date.now()) {
  const papel = s.membros[uid]?.papel ?? null;
  const e = estacao(s.estacaoId);
  const itens = e ? itensDe(e) : [];
  const fim = s.fase === 'fim';
  const ver = papel === 'avaliador' || fim;
  return {
    codigo: s.codigo,
    versao: s.versao,
    agora,
    papel,
    membros: Object.entries(s.membros).map(([id, m]) => ({ eu: id === uid, nome: m.nome, papel: m.papel })),
    fase: s.fase,
    faseDesde: s.faseDesde,
    rodada: s.rodada,
    revelados: s.revelados,
    nota: fim ? s.nota : null,
    estacao: e
      ? {
          id: e.id, rotulo: e.rotulo, sistema: e.sistema, titulo: e.titulo, caso: e.caso, vitais: e.vitais,
          comandos: e.comandos.map(c => c.texto),
          ...(papel === 'avaliador' ? { achados: e.achados, achadosPorManobra: e.achadosPorManobra ?? {}, pontoChave: e.pontoChave } : {}),
          ...(fim ? { pontoChave: e.pontoChave } : {}),
        }
      : null,
    itens: ver ? itens : [],
    marcas: ver ? s.marcas : {},
  };
}

/** aplica uma ação (puro, para testar); devolve a sala nova ou uma mensagem de erro */
export function aplicar(s: Sala, uid: string, a: { tipo: string; [k: string]: unknown }, agora = Date.now()): Sala | string {
  const papel = s.membros[uid]?.papel;
  if (!papel) return 'Você não está nesta sala.';
  const n: Sala = { ...s, marcas: { ...s.marcas }, revelados: [...s.revelados], membros: { ...s.membros }, versao: s.versao + 1 };
  switch (a.tipo) {
    case 'trocar':
      if (s.fase === 'leitura' || s.fase === 'estacao') return 'Troque os papéis entre as estações.';
      for (const [id, m] of Object.entries(n.membros)) n.membros[id] = { ...m, papel: m.papel === 'avaliador' ? 'examinando' : 'avaliador' };
      return n;
    case 'estacao': {
      if (papel !== 'avaliador') return 'Só o avaliador escolhe a estação.';
      if (s.fase === 'leitura' || s.fase === 'estacao') return 'Encerre a estação atual primeiro.';
      const id = String(a.id ?? '');
      if (!estacao(id)) return 'Estação não encontrada.';
      return { ...n, estacaoId: id, rodada: s.rodada + 1, fase: 'espera', faseDesde: agora, marcas: {}, revelados: [], nota: null };
    }
    case 'fase': {
      if (papel !== 'avaliador') return 'Só o avaliador controla o tempo.';
      const f = a.fase as Fase;
      if (!s.estacaoId) return 'Escolha a estação.';
      if (!['leitura', 'estacao', 'fim'].includes(f)) return 'Fase inválida.';
      const e = estacao(s.estacaoId)!;
      return { ...n, fase: f, faseDesde: agora, nota: f === 'fim' ? notaDe(itensDe(e), n.marcas) : null };
    }
    case 'marcar': {
      if (papel !== 'avaliador') return 'Só o avaliador marca o checklist.';
      const i = Number(a.i);
      const m = a.marca as Marca | null;
      const e = estacao(s.estacaoId);
      if (!e || !Number.isInteger(i) || i < 0 || i >= itensDe(e).length) return 'Item inválido.';
      if (m == null) delete n.marcas[i];
      else if (['feito', 'parcial', 'nao'].includes(m)) n.marcas[i] = m;
      else return 'Marca inválida.';
      if (s.fase === 'fim') n.nota = notaDe(itensDe(e), n.marcas);
      return n;
    }
    case 'revelar': {
      if (papel !== 'avaliador') return 'Só o avaliador revela achados.';
      const t = String(a.texto ?? '').trim().slice(0, 400);
      if (!t) return 'Achado vazio.';
      n.revelados.push(t);
      n.revelados = n.revelados.slice(-30);
      return n;
    }
  }
  return 'Ação desconhecida.';
}

/* ---------- rotas ---------- */
const cache = new Map<string, { s: Sala; ate: number }>();
async function ler(codigo: string): Promise<Sala | null> {
  const c = cache.get(codigo);
  if (c && c.ate > Date.now()) return c.s;
  const { db } = await admin();
  const s = ((await db.collection('salas').doc(codigo).get()).data() as Sala | undefined) ?? null;
  if (s) cache.set(codigo, { s, ate: Date.now() + 600 });
  return s && s.expira > Date.now() ? s : null;
}
async function alterar(codigo: string, f: (s: Sala) => Sala | string): Promise<Sala | string> {
  const { db } = await admin();
  const ref = db.collection('salas').doc(codigo);
  const r = await db.runTransaction(async tx => {
    const s = (await tx.get(ref)).data() as Sala | undefined;
    if (!s || s.expira < Date.now()) return 'Sala não encontrada ou expirada.';
    const n = f(s);
    if (typeof n !== 'string') tx.set(ref, n);
    return n;
  });
  if (typeof r !== 'string') cache.set(codigo, { s: r, ate: Date.now() + 600 });
  return r;
}

export function rotasSala() {
  const r = express.Router();
  r.use('/api/sala', express.json({ limit: '10kb' }));

  r.post('/api/sala', async (req: Request, res: Response) => {
    const u = await usuario(req);
    if (!u) return res.status(401).json({ erro: 'Entre com sua conta Google para criar a sala.' });
    try {
      const { db } = await admin();
      for (let k = 0; k < 5; k++) {
        const codigo = novoCodigo();
        const ref = db.collection('salas').doc(codigo);
        const s: Sala = { codigo, criador: u.uid, expira: Date.now() + DURACAO, membros: { [u.uid]: { nome: u.nome, papel: 'avaliador' } }, estacaoId: null, rodada: 0, fase: 'espera', faseDesde: Date.now(), marcas: {}, revelados: [], nota: null, versao: 1 };
        const ok = await db.runTransaction(async tx => {
          const atual = (await tx.get(ref)).data() as Sala | undefined;
          if (atual && atual.expira > Date.now()) return false;
          tx.set(ref, s);
          return true;
        });
        if (ok) return res.json(vista(s, u.uid));
      }
      res.status(503).json({ erro: 'Tente de novo.' });
    } catch (e) {
      console.error('sala', e);
      res.status(502).json({ erro: 'Não foi possível criar a sala.' });
    }
  });

  r.post('/api/sala/:codigo/entrar', async (req: Request, res: Response) => {
    const codigo = req.params.codigo.toUpperCase();
    if (!codigoValido(codigo)) return res.status(400).json({ erro: 'Código inválido.' });
    const u = await usuario(req);
    if (!u) return res.status(401).json({ erro: 'Entre com sua conta Google para participar.' });
    try {
      const s = await alterar(codigo, s => {
        if (s.membros[u.uid]) return { ...s, membros: { ...s.membros, [u.uid]: { ...s.membros[u.uid], nome: u.nome } }, versao: s.versao + 1 };
        const ms = Object.values(s.membros);
        if (ms.length >= 2) return 'A sala já tem dois participantes.';
        const papel: Papel = ms.some(m => m.papel === 'examinando') ? 'avaliador' : 'examinando';
        return { ...s, membros: { ...s.membros, [u.uid]: { nome: u.nome, papel } }, versao: s.versao + 1 };
      });
      if (typeof s === 'string') return res.status(409).json({ erro: s });
      res.json(vista(s, u.uid));
    } catch (e) {
      console.error('entrar', e);
      res.status(502).json({ erro: 'Não foi possível entrar.' });
    }
  });

  r.get('/api/sala/:codigo', async (req: Request, res: Response) => {
    const codigo = req.params.codigo.toUpperCase();
    if (!codigoValido(codigo)) return res.status(400).json({ erro: 'Código inválido.' });
    const u = await usuario(req);
    if (!u) return res.status(401).json({ erro: 'Entre com sua conta.' });
    try {
      const s = await ler(codigo);
      if (!s) return res.status(404).json({ erro: 'Sala não encontrada ou expirada.' });
      res.setHeader('Cache-Control', 'no-store');
      if (Number(req.query.v) === s.versao) return res.json({ igual: true, agora: Date.now() });
      res.json(vista(s, u.uid));
    } catch (e) {
      console.error('ler sala', e);
      res.status(502).json({ erro: 'Falha ao ler a sala.' });
    }
  });

  r.post('/api/sala/:codigo/acao', async (req: Request, res: Response) => {
    const codigo = req.params.codigo.toUpperCase();
    if (!codigoValido(codigo)) return res.status(400).json({ erro: 'Código inválido.' });
    const u = await usuario(req);
    if (!u) return res.status(401).json({ erro: 'Entre com sua conta.' });
    const a = req.body as { tipo: string; id?: string };
    // estação Premium exige que quem escolhe seja assinante
    if (a?.tipo === 'estacao' && a.id && !osceGratis(String(a.id)) && !(await acessoPremium(req))) return res.status(403).json({ erro: 'Esta estação é Premium.' });
    try {
      const s = await alterar(codigo, s => aplicar(s, u.uid, a));
      if (typeof s === 'string') return res.status(409).json({ erro: s });
      res.json(vista(s, u.uid));
    } catch (e) {
      console.error('acao sala', e);
      res.status(502).json({ erro: 'Falha ao atualizar a sala.' });
    }
  });
  return r;
}
