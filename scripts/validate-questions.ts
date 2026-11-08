// Uso: npm run validate
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { validateQuestions } from '../src/data/validate';
import type { Question } from '../src/data/schema';

const root = join(import.meta.dirname, '..', 'src', 'data', 'questions');
const all: Question[] = [];
let mismatch = 0;

for (const exam of readdirSync(root).filter(d => statSync(join(root, d)).isDirectory()).sort().reverse()) {
  console.log(exam.toUpperCase());
  for (const file of readdirSync(join(root, exam)).filter(f => f.endsWith('.json')).sort()) {
    const items = JSON.parse(readFileSync(join(root, exam, file), 'utf8')) as Question[];
    const subject = file.replace('.json', '');
    for (const q of items) {
      if (q.subject !== subject || q.exam?.toLowerCase() !== exam) {
        console.error(`✗ ${q.id}: está em ${exam}/${file} mas declara ${q.exam}/${q.subject}`);
        mismatch++;
      }
    }
    const by = items.reduce<Record<string, number>>((a, q) => ((a[q.format] = (a[q.format] ?? 0) + 1), a), {});
    console.log(`  ${file.padEnd(24)} ${String(items.length).padStart(4)} questões  ${JSON.stringify(by)}`);
    all.push(...items);
  }
}

const issues = validateQuestions(all);
if (issues.length || mismatch) {
  for (const i of issues) console.error(`✗ ${i.id}: ${i.message}`);
  console.error(`\n${issues.length + mismatch} problema(s) em ${all.length} questões.`);
  process.exit(1);
}
console.log(`\n✓ ${all.length} questões válidas.`);
