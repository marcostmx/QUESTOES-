/**
 * Conteúdo protegido vindo do servidor (/api/conteudo): envia o token do usuário (o servidor decide o
 * que o plano libera) e guarda cada resposta no Cache do navegador para uso offline.
 */
import { idToken } from './sync';

const CACHE = 'conteudo-v1';

export async function obter<T>(url: string): Promise<T> {
  const tok = await idToken();
  try {
    const r = await fetch(url, { headers: tok ? { Authorization: `Bearer ${tok}` } : {}, cache: 'no-store' });
    if (!r.ok || !(r.headers.get('content-type') ?? '').includes('json')) throw new Error(`conteúdo ${r.status}`);
    const copia = r.clone();
    if ('caches' in window) void caches.open(CACHE).then(c => c.put(url, copia)).catch(() => undefined);
    return (await r.json()) as T;
  } catch (e) {
    const hit = 'caches' in window ? await caches.open(CACHE).then(c => c.match(url)).catch(() => undefined) : undefined;
    if (hit) return (await hit.json()) as T;
    throw e;
  }
}

