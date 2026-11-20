/** Histórico local das estações OSCE treinadas. */
import { useSyncExternalStore } from 'react';
import { storage } from '../app/core/store';

export interface OsceRecord { key: string; id: string; date: number; nota: number; pendentes: number; modo?: 'prova' | 'treino'; circuito?: string; falhas?: string[] }

const KEY = 'pr.v2.osce';
let list: OsceRecord[] = storage.read<OsceRecord[]>(KEY) ?? [];
const listeners = new Set<() => void>();

export const osceHistory = {
  get: () => list,
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  save(r: OsceRecord) {
    list = [r, ...list.filter(x => x.key !== r.key)].slice(0, 300);
    storage.write(KEY, list);
    listeners.forEach(l => l());
  },
};

export const useOsceHistory = () => useSyncExternalStore(osceHistory.subscribe, osceHistory.get, osceHistory.get);

export function melhores(l: OsceRecord[]) {
  const m = new Map<string, number>();
  for (const r of l) m.set(r.id, Math.max(m.get(r.id) ?? 0, r.nota));
  return m;
}
