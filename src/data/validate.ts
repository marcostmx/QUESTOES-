import { EXAMS, LETTERS, SUBJECTS, type Question } from './schema';

const KINDS = new Set(['multipla-escolha', 'verdadeiro-falso', 'associacao', 'caso-clinico', 'discursiva']);
const ORIGINS = new Set(['prova', 'slide', 'inedita']);
const SUBJECT_IDS = new Set<string>(SUBJECTS.map(s => s.id));
const EXAM_IDS = new Set<string>(EXAMS.map(e => e.id));
const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();

export interface ValidationIssue {
  id: string;
  message: string;
}

const validIndex = (i: unknown, n: number) => Number.isInteger(i) && (i as number) >= 0 && (i as number) < n;

/** Valida um conjunto de questões e devolve a lista de problemas encontrados. */
export function validateQuestions(questions: Question[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const ids = new Set<string>();
  const contentKeys = new Map<string, string>();

  for (const q of questions) {
    const id = q?.id ?? '(sem id)';
    const fail = (message: string) => issues.push({ id, message });

    if (!q.id || !/^[a-z0-9]+-[a-z0-9]{6,}$/.test(q.id)) fail('id ausente ou fora do padrão "prefixo-hash"');
    if (ids.has(q.id)) fail('id duplicado');
    ids.add(q.id);

    if (!SUBJECT_IDS.has(q.subject)) fail(`disciplina desconhecida: ${q.subject}`);
    if (!EXAM_IDS.has(q.exam)) fail(`prova desconhecida: ${q.exam}`);
    const prefix = SUBJECTS.find(s => s.id === q.subject)?.prefix;
    if (prefix && !q.id?.startsWith(prefix + '-')) fail(`id deveria começar com "${prefix}-"`);
    if (!KINDS.has(q.kind)) fail(`kind inválido: ${q.kind}`);
    if (q.origin && !ORIGINS.has(q.origin)) fail(`origin inválido: ${q.origin}`);
    if (!q.stem?.trim()) fail('enunciado vazio');
    if (!q.explanation?.trim()) fail('gabarito/explicação vazio');

    const hasOptions = Array.isArray(q.options) && q.options.length > 0;
    const checkOptions = () => {
      if (!hasOptions || q.options!.length < 2 || q.options!.length > LETTERS.length) {
        fail('questão objetiva precisa de 2 a 6 alternativas');
        return false;
      }
      if (q.options!.some(o => !o?.trim())) fail('alternativa vazia');
      if (new Set(q.options!.map(norm)).size !== q.options!.length) fail('alternativas repetidas');
      if (q.options!.some(o => /^[A-F]\)\s/.test(o))) fail('alternativa ainda contém prefixo de letra');
      if (q.optionLabels && q.optionLabels.length !== q.options!.length) fail('optionLabels deve ter o mesmo tamanho de options');
      return true;
    };

    switch (q.format) {
      case 'mcq':
        if (checkOptions() && !validIndex(q.answerIndex, q.options!.length)) fail('answerIndex ausente ou fora do intervalo');
        break;
      case 'multi':
        if (checkOptions()) {
          const a = q.answerIndices;
          if (!Array.isArray(a) || a.length < 1) fail('answerIndices ausente');
          else if (a.some(i => !validIndex(i, q.options!.length))) fail('answerIndices fora do intervalo');
          else if (new Set(a).size !== a.length) fail('answerIndices repetidos');
        }
        break;
      case 'tf':
        if (!Array.isArray(q.statements) || q.statements.length < 2) fail('questão V/F precisa de pelo menos 2 itens');
        else {
          if (q.statements.some(s => !s?.trim())) fail('item V/F vazio');
          if (!Array.isArray(q.truth) || q.truth.length !== q.statements.length || q.truth.some(t => typeof t !== 'boolean'))
            fail('truth deve ter um booleano por item');
        }
        if (hasOptions) fail('questão V/F não deve ter alternativas');
        break;
      case 'open':
        if (hasOptions) fail('questão aberta não deve ter alternativas');
        break;
      default:
        fail(`format inválido: ${q.format}`);
    }

    const key = q.exam + '|' + q.subject + '|' + norm(q.stem ?? '') + '|' + JSON.stringify((q.options ?? q.statements ?? []).map(norm).sort());
    if (contentKeys.has(key)) fail(`conteúdo duplicado de ${contentKeys.get(key)}`);
    else contentKeys.set(key, q.id);
  }
  return issues;
}
