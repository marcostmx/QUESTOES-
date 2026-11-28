/**
 * Assinatura mensal via Mercado Pago (API de assinaturas / preapproval).
 *
 * Fluxo: o app (logado com Google/Firebase) chama POST /api/assinatura → o servidor cria a assinatura
 * no Mercado Pago com external_reference = uid e devolve o link de checkout (init_point). Depois do
 * pagamento, o Mercado Pago avisa em POST /api/mp/webhook e o usuário volta para o app; em ambos os casos
 * o servidor CONSULTA a assinatura na API do Mercado Pago (fonte da verdade) e grava o status em
 * Firestore `assinaturas/{uid}` (somente o servidor escreve; as regras negam acesso direto do cliente).
 *
 * Variáveis de ambiente (nunca no repositório):
 *   MP_ACCESS_TOKEN    token de produção (ou de teste) do Mercado Pago — obrigatório para vender
 *   MP_WEBHOOK_SECRET  assinatura secreta dos webhooks (opcional, recomendado)
 *   PRECO_MENSAL       valor em reais (padrão 29.90)
 *   APP_URL            endereço público do app (para o retorno do checkout)
 *   ADMIN_EMAILS       e-mails com acesso Premium vitalício, separados por vírgula (dono, professores)
 */
import crypto from 'crypto';
import express, { type Request, type Response } from 'express';
import firebaseConfig from '../firebase-applet-config.json';

const MP = 'https://api.mercadopago.com';
const env = (k: string) => process.env[k]?.trim() || '';
export const preco = () => Number(env('PRECO_MENSAL') || '29.90');
/** dias de teste grátis na primeira assinatura de cada conta (0 desliga) */
export const diasTeste = () => Number(env('DIAS_TESTE') || '7');
const vendasAtivas = () => !!env('MP_ACCESS_TOKEN');

type Status = 'pending' | 'authorized' | 'paused' | 'cancelled' | 'nenhuma';
export interface Assinatura {
  status: Status;
  premium: boolean;
  mpId?: string;
  proximaCobranca?: string | null;
  valor?: number;
  atualizadoEm?: string;
  /** já usou o teste grátis (uma vez por conta) */
  teveTeste?: boolean;
}

/** Teste grátis só para quem nunca assinou. */
export const elegivelTeste = (a: Assinatura | undefined) => diasTeste() > 0 && !a?.teveTeste && !a?.mpId;

/* ---------- Firebase Admin (carregado sob demanda) ---------- */
let adminP: Promise<{ auth: import('firebase-admin/auth').Auth; db: import('firebase-admin/firestore').Firestore }> | null = null;
function admin() {
  adminP ??= (async () => {
    const { initializeApp, getApps } = await import('firebase-admin/app');
    const { getAuth } = await import('firebase-admin/auth');
    const { getFirestore } = await import('firebase-admin/firestore');
    const app = getApps()[0] ?? initializeApp({ projectId: firebaseConfig.projectId });
    const db = firebaseConfig.firestoreDatabaseId ? getFirestore(app, firebaseConfig.firestoreDatabaseId) : getFirestore(app);
    return { auth: getAuth(app), db };
  })();
  return adminP;
}

async function usuario(req: Request) {
  const h = req.headers.authorization ?? '';
  const tok = h.startsWith('Bearer ') ? h.slice(7) : '';
  if (!tok) return null;
  try {
    const { auth } = await admin();
    const u = await auth.verifyIdToken(tok);
    return { uid: u.uid, email: (u.email ?? '').toLowerCase() };
  } catch {
    return null;
  }
}

const ehAdmin = (email: string) =>
  !!email && env('ADMIN_EMAILS').toLowerCase().split(/[,;\s]+/).filter(Boolean).includes(email);

async function mp<T>(caminho: string, init?: RequestInit): Promise<T> {
  const r = await fetch(MP + caminho, {
    ...init,
    headers: { Authorization: `Bearer ${env('MP_ACCESS_TOKEN')}`, 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  });
  const j = (await r.json().catch(() => ({}))) as T & { message?: string };
  if (!r.ok) throw new Error(`Mercado Pago ${r.status}: ${j.message ?? 'erro'}`);
  return j;
}

interface Preapproval {
  id: string;
  status: Status;
  external_reference?: string;
  next_payment_date?: string;
  init_point?: string;
  date_created?: string;
  auto_recurring?: { transaction_amount?: number };
}

/** Premium enquanto autorizada; pausada/cancelada perde o acesso. */
export const ehPremium = (s: Status) => s === 'authorized';

async function salvar(uid: string, p: Preapproval): Promise<Assinatura> {
  const a: Assinatura = {
    status: p.status,
    premium: ehPremium(p.status),
    mpId: p.id,
    proximaCobranca: p.next_payment_date ?? null,
    valor: p.auto_recurring?.transaction_amount,
    atualizadoEm: new Date().toISOString(),
  };
  const { db } = await admin();
  await db.collection('assinaturas').doc(uid).set(a, { merge: true });
  return a;
}

/** Consulta no Mercado Pago a assinatura mais relevante do usuário (autorizada > mais recente). */
async function sincronizar(uid: string): Promise<Assinatura | null> {
  const r = await mp<{ results: Preapproval[] }>(`/preapproval/search?external_reference=${encodeURIComponent(uid)}&limit=20`);
  const lista = r.results ?? [];
  if (!lista.length) return null;
  const melhor = lista.find(p => p.status === 'authorized') ?? lista.sort((a, b) => (b.date_created ?? '').localeCompare(a.date_created ?? ''))[0];
  return salvar(uid, melhor);
}

/** Confere a assinatura x-signature do webhook (HMAC-SHA256 do manifesto id/request-id/ts). */
export function webhookValido(secret: string, dataId: string, requestId: string, assinatura: string) {
  const partes = Object.fromEntries(assinatura.split(',').map(p => p.split('=').map(s => s.trim()) as [string, string]));
  if (!partes.ts || !partes.v1) return false;
  const id = /^[a-z0-9]+$/i.test(dataId) ? dataId.toLowerCase() : dataId;
  const manifesto = `id:${id};request-id:${requestId};ts:${partes.ts};`;
  const esperado = crypto.createHmac('sha256', secret).update(manifesto).digest('hex');
  return esperado.length === partes.v1.length && crypto.timingSafeEqual(Buffer.from(esperado), Buffer.from(partes.v1));
}

export function rotasAssinatura() {
  const r = express.Router();
  r.use(express.json({ limit: '50kb' }));

  // estado do usuário (sync=1 força consulta ao Mercado Pago, usado na volta do checkout)
  r.get('/api/assinatura', async (req: Request, res: Response) => {
    if (!vendasAtivas()) return res.json({ vendas: false, premium: true, status: 'nenhuma', preco: preco(), diasTeste: diasTeste() });
    const u = await usuario(req);
    if (!u) return res.json({ vendas: true, premium: false, status: 'nenhuma', preco: preco(), diasTeste: diasTeste(), logado: false });
    if (ehAdmin(u.email)) return res.json({ vendas: true, premium: true, status: 'authorized', admin: true, preco: preco(), logado: true });
    try {
      const { db } = await admin();
      let a = (await db.collection('assinaturas').doc(u.uid).get()).data() as Assinatura | undefined;
      if (req.query.sync === '1' || !a) a = (await sincronizar(u.uid)) ?? a;
      res.json({ vendas: true, logado: true, preco: preco(), diasTeste: elegivelTeste(a) ? diasTeste() : 0, ...(a ?? { status: 'nenhuma', premium: false }) });
    } catch (e) {
      console.error('assinatura', e);
      res.status(502).json({ erro: 'Não foi possível consultar a assinatura agora.' });
    }
  });

  // cria a assinatura e devolve o link do checkout do Mercado Pago
  r.post('/api/assinatura', async (req: Request, res: Response) => {
    if (!vendasAtivas()) return res.status(503).json({ erro: 'Pagamentos ainda não configurados.' });
    const u = await usuario(req);
    if (!u) return res.status(401).json({ erro: 'Entre com sua conta Google para assinar.' });
    const base = env('APP_URL') || `${req.protocol}://${req.get('host')}`;
    try {
      const { db } = await admin();
      const ref = db.collection('assinaturas').doc(u.uid);
      let atual = (await ref.get()).data() as Assinatura | undefined;
      if (!atual) atual = (await sincronizar(u.uid)) ?? undefined; // assinou antes por outro caminho?
      const teste = elegivelTeste(atual);
      const p = await mp<Preapproval>('/preapproval', {
        method: 'POST',
        body: JSON.stringify({
          reason: 'Estudo PR Premium — OSCE e 4º período',
          external_reference: u.uid,
          payer_email: u.email,
          back_url: `${base}/#/planos?retorno=1`,
          status: 'pending',
          auto_recurring: {
            frequency: 1,
            frequency_type: 'months',
            transaction_amount: preco(),
            currency_id: 'BRL',
            ...(teste ? { free_trial: { frequency: diasTeste(), frequency_type: 'days' } } : {}),
          },
        }),
      });
      if (teste) await ref.set({ teveTeste: true }, { merge: true });
      res.json({ url: p.init_point });
    } catch (e) {
      console.error('criar assinatura', e);
      res.status(502).json({ erro: 'O Mercado Pago não respondeu. Tente de novo em instantes.' });
    }
  });

  r.post('/api/assinatura/cancelar', async (req: Request, res: Response) => {
    if (!vendasAtivas()) return res.status(503).json({ erro: 'Pagamentos ainda não configurados.' });
    const u = await usuario(req);
    if (!u) return res.status(401).json({ erro: 'Entre com sua conta.' });
    try {
      const { db } = await admin();
      const a = (await db.collection('assinaturas').doc(u.uid).get()).data() as Assinatura | undefined;
      if (!a?.mpId) return res.status(404).json({ erro: 'Nenhuma assinatura encontrada.' });
      const p = await mp<Preapproval>(`/preapproval/${a.mpId}`, { method: 'PUT', body: JSON.stringify({ status: 'cancelled' }) });
      res.json(await salvar(u.uid, p));
    } catch (e) {
      console.error('cancelar', e);
      res.status(502).json({ erro: 'Não foi possível cancelar agora.' });
    }
  });

  // notificações do Mercado Pago: só disparam uma nova consulta (o status vem sempre da API)
  r.post('/api/mp/webhook', async (req: Request, res: Response) => {
    const dataId = String(req.query['data.id'] ?? req.body?.data?.id ?? '');
    const tipo = String(req.query.type ?? req.body?.type ?? req.query.topic ?? '');
    const secret = env('MP_WEBHOOK_SECRET');
    if (secret && !webhookValido(secret, dataId, String(req.headers['x-request-id'] ?? ''), String(req.headers['x-signature'] ?? ''))) {
      return res.status(401).end();
    }
    res.status(200).end(); // responde logo; o processamento segue
    if (!vendasAtivas() || !dataId) return;
    try {
      if (tipo === 'subscription_preapproval') {
        const p = await mp<Preapproval>(`/preapproval/${encodeURIComponent(dataId)}`);
        if (p.external_reference) await salvar(p.external_reference, p);
      } else if (tipo === 'subscription_authorized_payment') {
        const pag = await mp<{ preapproval_id?: string }>(`/authorized_payments/${encodeURIComponent(dataId)}`);
        if (pag.preapproval_id) {
          const p = await mp<Preapproval>(`/preapproval/${pag.preapproval_id}`);
          if (p.external_reference) await salvar(p.external_reference, p);
        }
      }
    } catch (e) {
      console.error('webhook', e);
    }
  });
  return r;
}
