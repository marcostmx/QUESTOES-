/**
 * Formato canônico de uma questão do banco.
 *
 * Os arquivos em `src/data/questions/*.json` são a fonte da verdade.
 * O campo `id` é estável: nunca o altere depois de publicado, pois o
 * progresso, a revisão espaçada e os favoritos do aluno apontam para ele.
 */

export const SUBJECTS = [
  { id: 'fisiopatologia', name: 'Fisiopatologia', short: 'Fisio', prefix: 'fis' },
  { id: 'farmacologia', name: 'Farmacologia', short: 'Farmaco', prefix: 'far' },
  { id: 'propedeutica', name: 'Propedêutica', short: 'Prope', prefix: 'pro' },
  { id: 'bases-cirurgicas', name: 'Bases Cirúrgicas', short: 'BC', prefix: 'bc' },
  { id: 'iesc-iv', name: 'IESC IV', short: 'IESC', prefix: 'iesc' },
] as const;

export type SubjectId = (typeof SUBJECTS)[number]['id'];

/** Formato de resposta: alternativa única ou resposta escrita. */
export type QuestionFormat = 'mcq' | 'open';

/** Estilo da questão, usado para filtros e rótulos. */
export type QuestionKind =
  | 'multipla-escolha'
  | 'verdadeiro-falso'
  | 'associacao'
  | 'caso-clinico'
  | 'discursiva';

export interface Question {
  /** Identificador estável, ex.: `bc-3f9a2c1d`. */
  id: string;
  subject: SubjectId;
  format: QuestionFormat;
  kind: QuestionKind;
  /** Tema/módulo dentro da disciplina, quando conhecido. */
  topic?: string;
  /** Enunciado (texto puro com quebras de linha). */
  stem: string;
  /** Alternativas sem o prefixo de letra ("A) "); a letra vem da posição. */
  options?: string[];
  /** Índice (0-based) da alternativa correta. Obrigatório quando format = 'mcq'. */
  answerIndex?: number;
  /** Gabarito comentado / resposta esperada (Markdown leve). */
  explanation: string;
  /** Origem: prova antiga, lista, etc. */
  source?: string;
  /** HTML ilustrativo (tabelas/figuras) exibido junto ao enunciado. */
  graphicsHtml?: string;
}

export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'] as const;
