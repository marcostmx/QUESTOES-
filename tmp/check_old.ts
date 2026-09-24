import { q1 } from './src/q1';
import { q2 } from './src/q2';
import { q3 } from './src/q3';
import { q4 } from './src/q4';

const allOld = [...q1, ...q2, ...q3, ...q4];
allOld.forEach((q, idx) => {
  console.log(`[OLD ${idx + 1}] (${q.type}) ${q.text.slice(0, 90).replace(/\n/g, ' ')}`);
});
