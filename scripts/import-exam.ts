/**
 * Importa arquivos de questões no formato "questoes_prN.json" (meta + questoes[])
 * para o banco canônico em src/data/questions/<prova>/<disciplina>.json.
 *
 * Uso: npx tsx scripts/import-exam.ts PR2 content/pr2/*.json
 *
 * Todos os arquivos da prova devem ser passados juntos: o banco da prova é
 * regerado a partir deles (o arquivo original da prova + os lotes de questões
 * inéditas, cada um em seu próprio arquivo).
 *
 * Os IDs são derivados do conteúdo (prova + enunciado + alternativas/itens), então
 * reimportar o mesmo arquivo mantém os IDs — e o progresso dos alunos. Se uma
 * questão já importada for corrigida (mesmo `id` no arquivo de origem), o ID
 * publicado é mantido, para não perder o progresso de quem já a respondeu.
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { SUBJECTS, type ExamId, type Question, type SubjectId } from '../src/data/schema';
import { validateQuestions } from '../src/data/validate';

interface RawAlt { letra: string; texto: string }
interface RawQuestion {
  id: string;
  materia: string;
  prova?: string;
  tema?: string | null;
  subtema?: string | null;
  tipo: 'objetiva' | 'multipla' | 'itens_vf' | 'discursiva';
  origem?: string;
  fonte?: string;
  enunciado: string;
  imagem?: string | null;
  alternativas?: RawAlt[];
  gabarito?: string[] | null;
  gabarito_texto?: string;
  gabarito_oficial?: string | null;
  comentario?: string | null;
  resposta_modelo?: string | null;
}

const [examArg, ...files] = process.argv.slice(2);
if (!examArg || !files.length || !/^PR\d$/i.test(examArg)) {
  console.error('Uso: npx tsx scripts/import-exam.ts PR2 content/pr2/*.json');
  process.exit(1);
}
const exam = examArg.toUpperCase() as ExamId;
const sources = files.map(f => ({ file: f, data: JSON.parse(readFileSync(f, 'utf8')) as { meta?: { titulo?: string }; questoes: RawQuestion[] } }));
const raw = { questoes: sources.flatMap(s => s.data.questoes) };

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
const clean = (s: string) => s.replace(/ /g, ' ').replace(/[ \t]+\n/g, '\n').trim();

function subjectOf(materia: string): SubjectId {
  const m = norm(materia);
  if (m.startsWith('farmaco')) return 'farmacologia';
  if (m.includes('epidemio') || m.includes('gis')) return 'gis2';
  if (m.startsWith('bases')) return 'bases-cirurgicas';
  if (m.startsWith('proped')) return 'propedeutica';
  if (m.startsWith('fisiopato')) return 'fisiopatologia';
  if (m.includes('iesc')) return 'iesc-iv';
  throw new Error(`matéria desconhecida: ${materia}`);
}

const ORIGIN: Record<string, Question['origin']> = { 'prova/banco': 'prova', 'slide do professor': 'slide', 'inédita': 'inedita' };

/** Separa os itens de uma questão V/F: "( ) item", linhas "I. item" ou alternativas "( ) item". */
function splitStatements(q: RawQuestion): { stem: string; statements: string[] } {
  const strip = (s: string) => clean(s.replace(/^\(\s*\)\s*\.?\s*/, ''));
  if (q.alternativas?.length) return { stem: clean(q.enunciado), statements: q.alternativas.map(a => strip(a.texto)) };
  const parens = q.enunciado.split(/\(\s*\)/);
  if (parens.length > 2) return { stem: clean(parens[0]), statements: parens.slice(1).map(s => clean(s)).filter(Boolean) };
  const roman = q.enunciado.split(/(?:^|\n)\s*(?:VIII|VII|VI|IV|V|III|II|I)\s*[.)\-–]\s+/);
  if (roman.length > 2) return { stem: clean(roman[0]), statements: roman.slice(1).map(s => clean(s)).filter(Boolean) };
  throw new Error(`${q.id}: não foi possível separar os itens V/F`);
}

function explanationOf(q: RawQuestion): string {
  const parts: string[] = [];
  if (q.tipo === 'discursiva') {
    if (q.resposta_modelo) parts.push(clean(q.resposta_modelo));
    if (q.comentario) parts.push(clean(q.comentario));
  } else {
    if (q.gabarito_texto) parts.push(`**Gabarito: ${q.gabarito_texto}**`);
    if (q.comentario) parts.push(clean(q.comentario));
  }
  if (q.gabarito_oficial) parts.push(`**Gabarito oficial:** ${clean(q.gabarito_oficial)}`);
  return parts.join('\n\n');
}

const warnings: string[] = [];
const out = new Map<SubjectId, Question[]>();
const prefixOf = (s: SubjectId) => SUBJECTS.find(x => x.id === s)!.prefix;
const usedIds = new Set<string>();

/** IDs já publicados, por disciplina + id do arquivo de origem (ref). */
const previousIds = new Map<string, string>();
for (const s of SUBJECTS) {
  const file = join(import.meta.dirname, '..', 'src', 'data', 'questions', exam.toLowerCase(), `${s.id}.json`);
  if (!existsSync(file)) continue;
  for (const q of JSON.parse(readFileSync(file, 'utf8')) as Question[]) if (q.ref) previousIds.set(`${s.id}|${q.ref}`, q.id);
}

for (const r of raw.questoes) {
  const subject = subjectOf(r.materia);
  const base: Partial<Question> = { subject, exam };
  let q: Question;

  if (r.tipo === 'itens_vf') {
    const { stem, statements } = splitStatements(r);
    const g = r.gabarito ?? [];
    let truth: boolean[];
    let tfStyle: Question['tfStyle'] = 'vf';
    if (g.length === statements.length && g.every(x => /^[VF]$/i.test(x))) {
      truth = g.map(x => x.toUpperCase() === 'V');
    } else {
      // "marque apenas os corretos": o gabarito lista os textos dos itens certos
      const wanted = g.map(norm);
      truth = statements.map(s => wanted.some(w => norm(s).startsWith(w) || w.startsWith(norm(s))));
      tfStyle = 'check';
      if (truth.filter(Boolean).length !== g.length) warnings.push(`${r.id}: gabarito "marque os corretos" não bateu com os itens`);
    }
    q = { ...base, format: 'tf', kind: 'verdadeiro-falso', stem, statements, truth, tfStyle } as Question;
  } else if (r.tipo === 'discursiva' || (r.alternativas?.length ?? 0) < 2) {
    if (r.tipo !== 'discursiva') warnings.push(`${r.id}: só ${r.alternativas?.length ?? 0} alternativa(s) — importada como discursiva`);
    const stem = clean(r.enunciado) + (r.tipo !== 'discursiva' && r.alternativas?.length ? '\n\n' + r.alternativas.map(a => `${a.letra}) ${a.texto}`).join('\n') : '');
    q = { ...base, format: 'open', kind: 'discursiva', stem } as Question;
  } else {
    const alts = r.alternativas!;
    const letters = alts.map(a => a.letra.toUpperCase());
    const options = alts.map(a => clean(a.texto));
    const standard = letters.every((l, i) => l === 'ABCDEF'[i]);
    const idx = (l: string) => letters.indexOf(l.toUpperCase());
    const g = (r.gabarito ?? []).map(idx);
    if (!g.length || g.some(i => i < 0)) throw new Error(`${r.id}: gabarito ${r.gabarito} não corresponde às alternativas ${letters}`);
    q = {
      ...base,
      format: r.tipo === 'multipla' || g.length > 1 ? 'multi' : 'mcq',
      kind: 'multipla-escolha',
      stem: clean(r.enunciado),
      options,
      ...(standard ? {} : { optionLabels: letters }),
      ...(g.length > 1 || r.tipo === 'multipla' ? { answerIndices: g } : { answerIndex: g[0] }),
    } as Question;
  }

  const content = q.options ?? q.statements ?? [];
  const kept = previousIds.get(`${subject}|${r.id}`);
  let id = kept && !usedIds.has(kept) ? kept : prefixOf(subject) + '-' + createHash('sha1').update(exam + '|' + norm(q.stem) + JSON.stringify(content.map(norm))).digest('hex').slice(0, 8);
  while (usedIds.has(id)) id = prefixOf(subject) + '-' + createHash('sha1').update(id).digest('hex').slice(0, 8);
  usedIds.add(id);

  const final: Question = {
    id,
    subject,
    exam,
    format: q.format,
    kind: q.kind,
    ...(r.tema ? { topic: clean(r.tema) } : {}),
    ...(r.subtema ? { subtopic: clean(r.subtema) } : {}),
    stem: q.stem,
    ...(r.imagem ? { image: r.imagem } : {}),
    ...(q.options ? { options: q.options } : {}),
    ...(q.optionLabels ? { optionLabels: q.optionLabels } : {}),
    ...(q.answerIndex !== undefined ? { answerIndex: q.answerIndex } : {}),
    ...(q.answerIndices ? { answerIndices: q.answerIndices } : {}),
    ...(q.statements ? { statements: q.statements, truth: q.truth, tfStyle: q.tfStyle } : {}),
    explanation: explanationOf(r),
    ...(r.fonte?.trim() ? { source: clean(r.fonte) } : {}),
    ...(r.origem && ORIGIN[r.origem] ? { origin: ORIGIN[r.origem] } : {}),
    ref: r.id,
  };
  out.set(subject, [...(out.get(subject) ?? []), final]);
}

const all = [...out.values()].flat();
const issues = validateQuestions(all);
if (issues.length) {
  issues.forEach(i => console.error(`✗ ${i.id}: ${i.message}`));
  process.exit(1);
}

const dir = join(import.meta.dirname, '..', 'src', 'data', 'questions', exam.toLowerCase());
mkdirSync(dir, { recursive: true });
for (const [subject, list] of out) writeFileSync(join(dir, `${subject}.json`), JSON.stringify(list, null, 2) + '\n');

for (const s of sources) console.log(`${s.data.meta?.titulo ?? s.file}: ${s.data.questoes.length} questões`);
console.log(`→ ${dir}`);
for (const [subject, list] of out) {
  const by = list.reduce<Record<string, number>>((a, q) => ((a[q.format] = (a[q.format] ?? 0) + 1), a), {});
  console.log(`  ${subject.padEnd(18)} ${String(list.length).padStart(4)}  ${JSON.stringify(by)}`);
}
console.log(`  total ${all.length}`);
warnings.forEach(w => console.warn(`⚠ ${w}`));
