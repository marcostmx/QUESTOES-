/**
 * Carregamento do banco de questões. Cada arquivo (prova × disciplina) é um
 * chunk separado; as questões de uma prova só são baixadas quando ela é aberta.
 */
import { useEffect, useMemo, useSyncExternalStore } from 'react';
import { CURRENT_EXAM, EXAMS, SUBJECTS, type ExamId, type Question, type SubjectId } from '../../data/schema';
import { usePrefs } from './store';
import { obter } from './conteudo';

/*
 * As questões não vão mais no pacote do app: vêm de /api/conteudo conforme o plano (Premium recebe o banco
 * todo; o grátis, a amostra de inéditas). Cada resposta fica guardada no Cache do navegador para uso offline.
 */
interface ItemIndice { arquivo: string; total: number; liberadas: number; provas: number }
interface Indice { premium: boolean; indice: Record<string, ItemIndice[]> }

let indiceP: Promise<Indice> | null = null;
let indiceAtual: Indice | null = null;
const obterIndice = () => {
  indiceP ??= obter<Indice>('/api/conteudo/indice').then(i => (indiceAtual = i));
  indiceP.catch(() => (indiceP = null));
  return indiceP;
};

export interface Bank {
  ready: boolean;
  exam: ExamId;
  /** Questões da prova ativa. */
  all: Question[];
  bySubject: Record<SubjectId, Question[]>;
  /** Disciplinas que têm questões nesta prova, na ordem padrão. */
  subjects: SubjectId[];
  /** Todas as questões já carregadas, de qualquer prova. */
  byId: Map<string, Question>;
  /** Questões que existem mas só o Premium recebe, por disciplina (e quantas são de provas). */
  travadas: Partial<Record<SubjectId, { total: number; provas: number }>>;
}

const loaded = new Map<ExamId, Question[]>();
const loading = new Map<ExamId, Promise<Question[]>>();
const byId = new Map<string, Question>();
let version = 0;
const listeners = new Set<() => void>();

export function loadExam(exam: ExamId): Promise<Question[]> {
  let p = loading.get(exam);
  if (!p) {
    p = obterIndice()
      .then(ind => Promise.all((ind.indice[exam.toLowerCase()] ?? []).map(f => obter<Question[]>(`/api/conteudo/questoes/${exam.toLowerCase()}/${f.arquivo}`))))
      .then(lists => {
        // ordem estável: a das disciplinas em SUBJECTS
        const all = lists.flat().sort((a, b) => SUBJECTS.findIndex(s => s.id === a.subject) - SUBJECTS.findIndex(s => s.id === b.subject));
        loaded.set(exam, all);
        all.forEach(q => byId.set(q.id, q));
        version++;
        listeners.forEach(l => l());
        return all;
      });
    p.catch(() => loading.delete(exam));
    loading.set(exam, p);
  }
  return p;
}

export const loadAllExams = () => Promise.all(EXAMS.map(e => loadExam(e.id)));

/** Recarrega o banco (login, logout ou mudança de plano): o servidor devolve o conteúdo do novo plano. */
export function recarregarBanco() {
  const abertas = [...loaded.keys()];
  indiceP = null;
  loading.clear();
  loaded.clear();
  byId.clear();
  version++;
  listeners.forEach(l => l());
  abertas.forEach(e => void loadExam(e));
}

const cache = new Map<string, Bank>();
function snapshot(exam: ExamId): Bank {
  const key = `${exam}:${version}`;
  let b = cache.get(key);
  if (!b) {
    const all = loaded.get(exam) ?? [];
    const bySubject = Object.fromEntries(SUBJECTS.map(s => [s.id, [] as Question[]])) as unknown as Record<SubjectId, Question[]>;
    all.forEach(q => bySubject[q.subject].push(q));
    const travadas: Bank['travadas'] = {};
    for (const f of indiceAtual?.indice[exam.toLowerCase()] ?? []) {
      const t = f.total - f.liberadas;
      if (t > 0) travadas[f.arquivo as SubjectId] = { total: t, provas: indiceAtual?.premium ? 0 : f.provas };
    }
    b = { ready: loaded.has(exam), exam, all, bySubject, subjects: SUBJECTS.map(s => s.id).filter(id => bySubject[id].length || travadas[id]), byId, travadas };
    cache.set(key, b);
  }
  return b;
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** Hook: banco da prova indicada (ou da prova ativa nas preferências). */
export function useBank(examOverride?: ExamId): Bank {
  const { exam: prefExam } = usePrefs();
  const exam = examOverride ?? prefExam ?? CURRENT_EXAM;
  useEffect(() => {
    void loadExam(exam);
  }, [exam]);
  const v = useSyncExternalStore(subscribe, () => version, () => version);
  return useMemo(() => snapshot(exam), [exam, v]);
}

/** Hook: busca uma questão pelo id em qualquer prova (carrega as outras se preciso). */
export function useQuestionById(id: string | undefined): { ready: boolean; question?: Question } {
  const v = useSyncExternalStore(subscribe, () => version, () => version);
  const q = id ? byId.get(id) : undefined;
  const allLoaded = EXAMS.every(e => loaded.has(e.id));
  useEffect(() => {
    if (id && !q) void loadAllExams();
  }, [id, q]);
  return useMemo(() => ({ ready: !!q || allLoaded, question: q }), [q, allLoaded, v]);
}

/** Temas disponíveis numa lista de questões (campo `topic`). */
export function topicsOf(questions: Question[]): string[] {
  return [...new Set(questions.map(q => q.topic).filter((t): t is string => !!t))];
}
