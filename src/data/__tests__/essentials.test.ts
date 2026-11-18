import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import pr2 from '../essentials/pr2.json';

describe('treinos essenciais', () => {
  for (const [subject, set] of Object.entries(pr2)) {
    it(`${subject}: todos os IDs existem no banco e não se repetem`, () => {
      const bank = JSON.parse(readFileSync(join(__dirname, '..', 'questions', 'pr2', `${subject}.json`), 'utf8')) as { id: string; topic?: string }[];
      const byId = new Map(bank.map(q => [q.id, q]));
      const ids = set.groups.flatMap(g => g.ids);
      expect(new Set(ids).size).toBe(ids.length);
      for (const g of set.groups) for (const id of g.ids) {
        expect(byId.has(id), id).toBe(true);
        expect(byId.get(id)!.topic, id).toBe(g.topic);
      }
    });
  }
});
