// Uso: npm run validate
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { validateQuestions } from '../src/data/validate';
import type { Question } from '../src/data/schema';

const dir = join(import.meta.dirname, '..', 'src', 'data', 'questions');
const all: Question[] = [];
for (const file of readdirSync(dir).filter(f => f.endsWith('.json'))) {
  const items = JSON.parse(readFileSync(join(dir, file), 'utf8')) as Question[];
  const mcq = items.filter(q => q.format === 'mcq').length;
  console.log(`${file.padEnd(24)} ${String(items.length).padStart(4)} questões  (${mcq} objetivas, ${items.length - mcq} abertas)`);
  all.push(...items);
}

const issues = validateQuestions(all);
if (issues.length) {
  for (const i of issues) console.error(`✗ ${i.id}: ${i.message}`);
  console.error(`\n${issues.length} problema(s) em ${all.length} questões.`);
  process.exit(1);
}
console.log(`\n✓ ${all.length} questões válidas.`);
