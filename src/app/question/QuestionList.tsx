import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import type { Question } from '../../data/schema';
import type { QuestionState } from '../core/study';
import { excerpt } from '../core/text';
import { href } from '../router';
import { KIND_LABEL, subjectMeta } from '../subjects';
import { Badge } from '../ui';

export function StatusBadge({ s }: { s?: QuestionState }) {
  if (!s?.lastResult) return null;
  if (s.lastResult === 'correct') return <Badge tone="good">Acertou</Badge>;
  if (s.lastResult === 'partial') return <Badge tone="warn">Parcial</Badge>;
  return <Badge tone="bad">Errou</Badge>;
}

export function QuestionList({
  items,
  states,
  extra,
  aside,
  highlight,
}: {
  items: Question[];
  states: Record<string, QuestionState>;
  extra?: (q: Question, s?: QuestionState) => ReactNode;
  /** Ações à direita, fora do link (botões). */
  aside?: (q: Question, s?: QuestionState) => ReactNode;
  highlight?: (text: string) => ReactNode;
}) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
      {items.map(q => {
        const subj = subjectMeta(q.subject);
        const s = states[q.id];
        const text = excerpt(q.stem, 220);
        return (
          <li key={q.id} className="flex items-stretch">
            <a href={href(`questao/${q.id}`)} className="group flex min-w-0 flex-1 items-start gap-4 px-4 py-4 transition hover:bg-surface-2 sm:px-5">
              <span className="mt-[7px] size-2 shrink-0 rounded-full" style={{ background: subj?.color }} />
              <span className="min-w-0 flex-1">
                <span className="mb-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] text-ink-3">
                  <span className="font-medium text-ink-2">{subj?.name}</span>
                  <span>{KIND_LABEL[q.kind]}</span>
                  {q.topic && <span className="truncate">· {q.topic}</span>}
                  <StatusBadge s={s} />
                </span>
                <span className="block text-[14.5px] leading-relaxed text-ink">{highlight ? highlight(text) : text}</span>
                {extra?.(q, s)}
              </span>
              <ChevronRight className="mt-1 size-4 shrink-0 text-ink-3 transition group-hover:translate-x-0.5 group-hover:text-ink" />
            </a>
            {aside && <div className="flex shrink-0 items-center pr-3">{aside(q, s)}</div>}
          </li>
        );
      })}
    </ul>
  );
}
