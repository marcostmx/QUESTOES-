import { useMemo, useState } from 'react';
import { ChevronDown, Play, Target } from 'lucide-react';
import type { ExamId, SubjectId } from '../../data/schema';
import { essentialIds, essentialsOf } from '../core/essentials';
import { isAnswered, isOpenError } from '../core/study';
import { useStudy } from '../core/store';
import { Bar, Button, Card, cx } from '../ui';
import { startSession } from '../pages/SessionPage';

/** Cartão do treino essencial de uma disciplina (se houver um curado para ela). */
export function EssentialCard({ exam, subject }: { exam: ExamId; subject: SubjectId }) {
  const set = essentialsOf(exam, subject);
  const data = useStudy();
  const [open, setOpen] = useState(false);
  const stats = useMemo(() => {
    if (!set) return null;
    const ids = essentialIds(set);
    const done = ids.filter(id => isAnswered(data.questions[id])).length;
    const pending = ids.filter(id => !isAnswered(data.questions[id]) || isOpenError(data.questions[id]));
    const att = ids.reduce((a, id) => a + (data.questions[id]?.attempts ?? 0), 0);
    const cor = ids.reduce((a, id) => a + (data.questions[id]?.correctCount ?? 0), 0);
    return { ids, done, pending, rate: att ? cor / att : null };
  }, [set, data]);
  if (!set || !stats) return null;

  return (
    <Card className="mb-8 overflow-hidden border-accent/30">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-ink">
          <Target className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl font-semibold">{set.title}</p>
          <p className="mt-0.5 text-[13.5px] text-ink-2">
            {stats.ids.length} questões de alto rendimento, em vez de todas · {stats.done}/{stats.ids.length} feitas
            {stats.rate !== null && <> · {Math.round(stats.rate * 100)}% de acerto</>}
          </p>
          <Bar value={stats.done / stats.ids.length} className="mt-2.5 max-w-sm" />
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button variant="primary" icon={<Play className="size-4 fill-current" />} onClick={() => startSession('pratica', set.title, stats.ids)}>
            Começar
          </Button>
          {stats.pending.length > 0 && stats.pending.length < stats.ids.length && (
            <Button onClick={() => startSession('pratica', `${set.title} · pendentes`, stats.pending)}>Só pendentes ({stats.pending.length})</Button>
          )}
        </div>
      </div>
      <button type="button" onClick={() => setOpen(o => !o)} className="flex w-full items-center justify-between border-t border-line px-5 py-2.5 text-left text-[13px] font-medium text-ink-2 hover:bg-surface-2 sm:px-6">
        Por que essas questões
        <ChevronDown className={cx('size-4 transition', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="space-y-3 border-t border-line px-5 py-4 text-[13.5px] sm:px-6">
          <p className="text-ink-2">{set.summary}</p>
          <ul className="space-y-1.5">
            {set.groups.map(g => (
              <li key={g.topic} className="flex flex-wrap justify-between gap-x-4">
                <span className="font-medium">
                  {g.topic} <span className="tabular text-ink-3">· {g.ids.length}</span>
                </span>
                <span className="text-ink-3">{g.why}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
