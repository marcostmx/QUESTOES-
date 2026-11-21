/** Histórico local dos casos vivos concluídos (entra na Carreira). */
import { useSyncExternalStore } from 'react';
import { storage } from '../app/core/store';

export interface CasoRecord { key: string; id: string; date: number; nota: number; obito: boolean; minutos: number }

const KEY = 'pr.v2.casos';
let list: CasoRecord[] = storage.read<CasoRecord[]>(KEY) ?? [];
const listeners = new Set<() => void>();

export const casoHistory = {
  get: () => list,
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  save(r: CasoRecord) {
    list = [r, ...list.filter(x => x.key !== r.key)].slice(0, 300);
    storage.write(KEY, list);
    listeners.forEach(l => l());
  },
};

export const useCasoHistory = () => useSyncExternalStore(casoHistory.subscribe, casoHistory.get, casoHistory.get);
