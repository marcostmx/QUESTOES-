/**
 * Estado da assinatura Premium no app. A fonte da verdade é o servidor (/api/assinatura), que consulta
 * o Mercado Pago. Guarda uma cópia local por 3 dias para funcionar offline.
 * Sem servidor de pagamentos configurado (vendas = false), tudo fica liberado.
 */
import { useEffect, useSyncExternalStore } from 'react';
import { idToken, login, useSync } from './sync';
import { recarregarBanco } from './bank';

export interface EstadoAssinatura {
  carregando: boolean;
  vendas: boolean;
  premium: boolean;
  status: 'pending' | 'authorized' | 'paused' | 'cancelled' | 'nenhuma';
  preco: number;
  /** dias de teste grátis oferecidos a esta conta (0 = já usou) */
  diasTeste?: number;
  proximaCobranca?: string | null;
  admin?: boolean;
  erro?: string;
}

const CHAVE = 'assinatura-v1';
const GRACA = 3 * 24 * 3600 * 1000;
const PRECO_PADRAO = 29.9;

function doCache(): EstadoAssinatura {
  try {
    const c = JSON.parse(localStorage.getItem(CHAVE) ?? 'null') as (EstadoAssinatura & { ate: number }) | null;
    if (c) return { ...c, carregando: true, premium: c.premium && c.ate > Date.now() };
  } catch { /* sem armazenamento */ }
  return { carregando: true, vendas: false, premium: true, status: 'nenhuma', preco: PRECO_PADRAO };
}

let estado: EstadoAssinatura = doCache();
const ouvintes = new Set<() => void>();
const definir = (p: Partial<EstadoAssinatura>) => {
  const antes = estado.premium || !estado.vendas;
  estado = { ...estado, ...p };
  // o plano mudou: o servidor passa a entregar outro conteúdo
  if (!estado.carregando && antes !== (estado.premium || !estado.vendas)) recarregarBanco();
  try {
    localStorage.setItem(CHAVE, JSON.stringify({ ...estado, ate: Date.now() + GRACA }));
  } catch { /* sem armazenamento */ }
  ouvintes.forEach(l => l());
};

async function chamar(caminho: string, init?: RequestInit) {
  const tok = await idToken();
  const r = await fetch(caminho, { ...init, headers: { 'Content-Type': 'application/json', ...(tok ? { Authorization: `Bearer ${tok}` } : {}) } });
  const tipo = r.headers.get('content-type') ?? '';
  if (!tipo.includes('json')) return { semServidor: true as const };
  return { r, j: await r.json() };
}

/** Atualiza o estado; sync = true força consulta ao Mercado Pago (volta do checkout). */
export async function carregarAssinatura(sync = false) {
  try {
    const res = await chamar('/api/assinatura' + (sync ? '?sync=1' : ''));
    if ('semServidor' in res) return definir({ carregando: false, vendas: false, premium: true });
    if (!res.r.ok) return definir({ carregando: false, erro: res.j?.erro });
    definir({ carregando: false, erro: undefined, proximaCobranca: null, admin: false, ...res.j });
  } catch {
    // offline: mantém o que estava em cache (com prazo de graça)
    definir({ carregando: false });
  }
}

/** Abre o checkout do Mercado Pago (faz login antes, se preciso). Devolve mensagem de erro, se houver. */
export async function assinar(): Promise<string | null> {
  if (!(await idToken())) {
    const e = await login();
    if (e) return e;
  }
  try {
    const res = await chamar('/api/assinatura', { method: 'POST' });
    if ('semServidor' in res) return 'Pagamentos indisponíveis nesta versão do app.';
    if (!res.r.ok || !res.j?.url) return res.j?.erro ?? 'Não foi possível abrir o pagamento.';
    location.href = res.j.url;
    return null;
  } catch {
    return 'Sem conexão com a internet.';
  }
}

export async function cancelarAssinatura(): Promise<string | null> {
  try {
    const res = await chamar('/api/assinatura/cancelar', { method: 'POST' });
    if ('semServidor' in res) return 'Indisponível.';
    if (!res.r.ok) return res.j?.erro ?? 'Não foi possível cancelar.';
    await carregarAssinatura();
    return null;
  } catch {
    return 'Sem conexão com a internet.';
  }
}

let ultimoUid: string | null | undefined;
/** Estado reativo; recarrega quando o usuário entra ou sai. */
export function useAssinatura(): EstadoAssinatura {
  const { user, ready } = useSync();
  const uid = user?.uid ?? null;
  useEffect(() => {
    if (!ready || uid === ultimoUid) return;
    ultimoUid = uid;
    void carregarAssinatura();
  }, [uid, ready]);
  return useSyncExternalStore(
    l => {
      ouvintes.add(l);
      return () => ouvintes.delete(l);
    },
    () => estado,
    () => estado,
  );
}

export const precoBRL = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
