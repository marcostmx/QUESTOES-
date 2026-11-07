/** Roteador mínimo baseado em hash (#/rota) — funciona em qualquer hospedagem estática. */
import { useSyncExternalStore } from 'react';

export interface Route {
  path: string;
  parts: string[];
  query: URLSearchParams;
}

function parse(): Route {
  const raw = location.hash.replace(/^#\/?/, '');
  const [path, qs = ''] = raw.split('?');
  const clean = decodeURIComponent(path).replace(/\/+$/, '');
  return { path: clean, parts: clean ? clean.split('/') : [], query: new URLSearchParams(qs) };
}

let route = parse();
const listeners = new Set<() => void>();
window.addEventListener('hashchange', () => {
  route = parse();
  listeners.forEach(l => l());
  window.scrollTo({ top: 0 });
});

export function useRoute(): Route {
  return useSyncExternalStore(
    l => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => route,
    () => route,
  );
}

export const href = (path: string) => '#/' + path.replace(/^\//, '');

export function navigate(path: string, { replace = false } = {}) {
  const target = href(path);
  if (replace) {
    history.replaceState(null, '', target);
    route = parse();
    listeners.forEach(l => l());
  } else if (location.hash !== target) {
    location.hash = target;
  }
}

export function back(fallback = '') {
  if (history.length > 1) history.back();
  else navigate(fallback);
}
