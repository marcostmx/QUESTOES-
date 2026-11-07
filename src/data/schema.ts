/**
 * Formato canônico de uma questão do banco.
 *
 * Os arquivos em `src/data/questions/<prova>/<disciplina>.json` são a fonte da verdade.
 * O campo `id` é estável: nunca o altere depois de publicado, pois o
 * progresso, a revisão espaçada e os favoritos do aluno apontam para ele.
 */

export const SUBJECTS = [
  { id: 'fisiopatologia', name: 'Fisiopatologia', short: 'Fisio', prefix: 'fis' },
  { id: 'farmacologia', name: 'Farmacologia', short: 'Farmaco', prefix: 'far' },
  { id: 'propedeutica', name: 'Propedêutica', short: 'Prope', prefix: 'pro' },
  { id: 'bases-cirurgicas', name: 'Bases Cirúrgicas', short: 'BC', prefix: 'bc' },
  { id: 'gis2', name: 'Epidemiologia II', short: 'GIS 2', prefix: 'gis' },
  { id: 'iesc-iv', name: 'IESC IV', short: 'IESC', prefix: 'iesc' },
] as const;

export type SubjectId = (typeof SUBJECTS)[number]['id'];

/** Provas do semestre. A primeira da lista é a prova atual (padrão do app). */
export const EXAMS = [
  { id: 'PR2', label: 'PR2', hint: 'prova atual' },
  { id: 'PR1', label: 'PR1', hint: 'já realizada' },
] as const;

export type ExamId = (typeof EXAMS)[number]['id'];
export const CURRENT_EXAM: ExamId = EXAMS[0].id;

/**
 * Formato de resposta:
 *  - mcq:   uma alternativa correta (`options` + `answerIndex`)
 *  - multi: mais de uma alternativa correta (`options` + `answerIndices`)
 *  - tf:    julgar cada item (`statements` + `truth`); `tfStyle: 'check'` = "marque os corretos"
 *  - open:  resposta escrita, com autoavaliação
 */
export type QuestionFormat = 'mcq' | 'multi' | 'tf' | 'open';

/** Estilo da questão, usado para filtros e rótulos. */
export type QuestionKind =
  | 'multipla-escolha'
  | 'verdadeiro-falso'
  | 'associacao'
  | 'caso-clinico'
  | 'discursiva';

/** De onde a questão veio. */
export type QuestionOrigin = 'prova' | 'slide' | 'inedita';

export interface Question {
  /** Identificador estável, ex.: `bc-3f9a2c1d`. */
  id: string;
  subject: SubjectId;
  exam: ExamId;
  format: QuestionFormat;
  kind: QuestionKind;
  /** Tema/módulo dentro da disciplina, quando conhecido. */
  topic?: string;
  subtopic?: string;
  /** Enunciado (texto puro com quebras de linha / Markdown leve). */
  stem: string;
  /** Imagem do enunciado (URL ou data URI). */
  image?: string;
  /** Alternativas sem o prefixo de letra ("A) "); a letra vem da posição. */
  options?: string[];
  /** Letras exibidas, quando não seguem A, B, C… (ex.: prova sem a alternativa A). */
  optionLabels?: string[];
  /** Índice (0-based) da alternativa correta — format 'mcq'. */
  answerIndex?: number;
  /** Índices das alternativas corretas — format 'multi'. */
  answerIndices?: number[];
  /** Itens a julgar — format 'tf'. */
  statements?: string[];
  /** Gabarito de cada item (true = verdadeiro / deve ser marcado) — format 'tf'. */
  truth?: boolean[];
  tfStyle?: 'vf' | 'check';
  /** Gabarito comentado / resposta esperada (Markdown leve). */
  explanation: string;
  /** Origem: prova antiga, lista, slide, etc. */
  source?: string;
  origin?: QuestionOrigin;
  /** Código da questão no material original (ex.: FARM-001). */
  ref?: string;
  /** HTML ilustrativo (tabelas/figuras) exibido junto ao enunciado. */
  graphicsHtml?: string;
}

export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'] as const;

export const isObjective = (q: Pick<Question, 'format'>) => q.format !== 'open';

export const optionLabel = (q: Pick<Question, 'optionLabels'>, i: number) => q.optionLabels?.[i] ?? LETTERS[i];
