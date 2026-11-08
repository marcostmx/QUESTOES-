import { useMemo } from 'react';
import { Crosshair, Play } from 'lucide-react';
import type { Bank } from '../core/bank';
import { weakSession, weakTopics } from '../core/session';
import { today, useStudy } from '../core/store';
import { subjectMeta } from '../subjects';
import { Bar, Button, Card } from '../ui';
import { startSession } from '../pages/SessionPage';

/** Temas de menor acerto da prova ativa, com botão para treinar. */
export function WeakSpots({ bank, compact }: { bank: Bank; compact?: boolean }) {
  const data = useStudy();
  const topics = useMemo(() => weakTopics(bank.all, data, { limit: compact ? 3 : 5 }), [bank, data, compact]);
  if (!topics.length) return null;

  const train = () => {
    const list = weakSession(bank.all, data, today());
    startSession('pratica', 'Treino dos pontos fracos', list.map(q => q.id));
  };

  return (
    <Card className="mb-10 p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-bad-soft text-bad">
            <Crosshair className="size-5" />
          </span>
          <div>
            <h2 className="font-semibold">Pontos fracos</h2>
            <p className="text-[13px] text-ink-2">Temas com menos de 70% de acerto. O treino mistura seus erros, revisões e questões novas deles.</p>
          </div>
        </div>
        <Button variant="primary" icon={<Play className="size-4 fill-current" />} onClick={train}>
          Treinar
        </Button>
      </div>
      <ul className="flex flex-col gap-3">
        {topics.map(t => {
          const s = subjectMeta(t.subject);
          const pct = Math.round(t.rate * 100);
          return (
            <li key={t.subject + (t.topic ?? '')} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5">
              <span className="flex min-w-0 items-center gap-2 text-[14px]">
                <span className="size-2 shrink-0 rounded-full" style={{ background: s?.color }} />
                <span className="truncate">
                  {t.topic ?? s?.name}
                  {t.topic && <span className="text-ink-3"> · {s?.short}</span>}
                </span>
              </span>
              <span className="tabular text-[13px] font-semibold text-bad">
                {pct}% <span className="font-normal text-ink-3">de {t.attempts}</span>
              </span>
              <Bar value={t.rate} color="var(--bad)" className="col-span-2" />
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
