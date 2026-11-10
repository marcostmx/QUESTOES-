/** Histórico local dos simulados entregues (nota por data), para acompanhar a evolução. */
import { useSyncExternalStore } from 'react';
import type { ExamId, SubjectId } from '../../data/schema';
import { storage } from './store';

export interface ExamRecord {
  id: string;
  exam: ExamId;
  title: string;
  subjects: SubjectId[];
  date: number;
  grade: number;
  questions: number;
  minutes?: number;
}

const KEY = 'pr.v2.exams';
let list: ExamRecord[] = storage.read<ExamRecord[]>(KEY) ?? [];
const listeners = new Set<() => void>();

export const examHistory = {
  get: () => list,
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  /** Grava (ou atualiza, ao corrigir discursivas) a nota de um simulado. */
  save(r: ExamRecord) {
    list = [r, ...list.filter(x => x.id !== r.id)].slice(0, 50);
    storage.write(KEY, list);
    listeners.forEach(l => l());
  },
};

export const useExamHistory = () => useSyncExternalStore(examHistory.subscribe, examHistory.get, examHistory.get);
