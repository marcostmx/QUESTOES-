import { LETTERS, SUBJECTS, type Question } from './schema';

const KINDS = new Set(['multipla-escolha', 'verdadeiro-falso', 'associacao', 'caso-clinico', 'discursiva']);
const SUBJECT_IDS = new Set<string>(SUBJECTS.map(s => s.id));
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();

export interface ValidationIssue {
  id: string;
  message: string;
}

/** Valida um conjunto de questões e devolve a lista de problemas encontrados. */
export function validateQuestions(questions: Question[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const ids = new Set<string>();
  const contentKeys = new Map<string, string>();

  for (const q of questions) {
    const id = q?.id ?? '(sem id)';
    const fail = (message: string) => issues.push({ id, message });

    if (!q.id || !/^[a-z]+-[a-z0-9]{6,}$/.test(q.id)) fail('id ausente ou fora do padrão "prefixo-hash"');
    if (ids.has(q.id)) fail('id duplicado');
    ids.add(q.id);

    if (!SUBJECT_IDS.has(q.subject)) fail(`disciplina desconhecida: ${q.subject}`);
    const prefix = SUBJECTS.find(s => s.id === q.subject)?.prefix;
    if (prefix && !q.id?.startsWith(prefix + '-')) fail(`id deveria começar com "${prefix}-"`);
    if (!KINDS.has(q.kind)) fail(`kind inválido: ${q.kind}`);
    if (!q.stem?.trim()) fail('enunciado vazio');
    if (!q.explanation?.trim()) fail('gabarito/explicação vazio');

    if (q.format === 'mcq') {
      if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > LETTERS.length) {
        fail('questão objetiva precisa de 2 a 6 alternativas');
      } else {
        if (q.options.some(o => !o?.trim())) fail('alternativa vazia');
        if (new Set(q.options.map(norm)).size !== q.options.length) fail('alternativas repetidas');
        if (q.options.some(o => /^[A-F]\)\s/.test(o))) fail('alternativa ainda contém prefixo de letra');
        if (!Number.isInteger(q.answerIndex) || q.answerIndex! < 0 || q.answerIndex! >= q.options.length) {
          fail('answerIndex ausente ou fora do intervalo');
        }
      }
    } else if (q.format === 'open') {
      if (q.options?.length) fail('questão aberta não deve ter alternativas');
    } else {
      fail(`format inválido: ${q.format}`);
    }

    const key = q.subject + '|' + norm(q.stem ?? '') + '|' + JSON.stringify((q.options ?? []).map(norm).sort());
    if (contentKeys.has(key)) fail(`conteúdo duplicado de ${contentKeys.get(key)}`);
    else contentKeys.set(key, q.id);
  }
  return issues;
}
