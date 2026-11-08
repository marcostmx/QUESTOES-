import { useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { isObjective } from '../../data/schema';
import { useQuestionById } from '../core/bank';
import { canConfirm, gradeAnswer, type SessionAnswer } from '../core/session';
import { study, useStudy } from '../core/store';
import { back } from '../router';
import { FavoriteButton, QuestionMeta, QuestionView } from '../question/QuestionView';
import { Badge, Button, Empty, Loading } from '../ui';

/** Uma questão avulsa (vinda da busca, do caderno de erros ou dos favoritos). */
export default function QuestionPage({ id }: { id?: string }) {
  const { ready, question: q } = useQuestionById(id);
  const data = useStudy();
  const [a, setA] = useState<SessionAnswer>({});

  if (!q && !ready) return <Loading />;
  if (!q)
    return (
      <Empty icon={<ArrowLeft className="size-5" />} title="Questão não encontrada" action={<Button to="busca">Buscar questões</Button>}>
        O link pode estar desatualizado.
      </Empty>
    );

  const patch = (p: Partial<SessionAnswer>) => setA(prev => ({ ...prev, ...p }));
  const state = data.questions[q.id];
  const total = q.statements?.length ?? 0;

  return (
    <div className="mx-auto max-w-[820px]">
      <div className="mb-6 flex items-center justify-between gap-3">
        <button type="button" onClick={() => back('busca')} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-3 hover:text-ink">
          <ArrowLeft className="size-4" /> Voltar
        </button>
        <div className="flex items-center gap-1">
          {a.result && (
            <Button size="sm" variant="ghost" icon={<RotateCcw className="size-3.5" />} onClick={() => setA({})}>
              Refazer
            </Button>
          )}
          <FavoriteButton id={q.id} state={state} />
        </div>
      </div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Badge tone="neutral" className="font-mono">{q.exam}</Badge>
        <QuestionMeta q={q} state={state} hideHistory={!!a.result} />
      </div>
      <QuestionView
        key={q.id}
        q={q}
        answer={a}
        state={state}
        h={{
          onSelect: i => !a.result && patch({ selected: i, eliminated: (a.eliminated ?? []).filter(x => x !== i) }),
          onTogglePick: i => {
            if (a.result) return;
            const s = new Set(a.picked ?? []);
            s.has(i) ? s.delete(i) : s.add(i);
            patch({ picked: [...s].sort((x, y) => x - y), eliminated: (a.eliminated ?? []).filter(x => x !== i) });
          },
          onJudge: (i, v) => {
            if (a.result) return;
            const j = Array.from({ length: total }, (_, k) => a.judged?.[k] ?? null);
            j[i] = v;
            patch({ judged: j });
          },
          onEliminate: i => {
            if (a.result) return;
            const s = new Set(a.eliminated ?? []);
            s.has(i) ? s.delete(i) : s.add(i);
            patch({ eliminated: [...s], selected: a.selected === i ? undefined : a.selected, picked: a.picked?.filter(x => x !== i) });
          },
          onConfirm: () => {
            if (a.result || !canConfirm(q, a)) return;
            const result = gradeAnswer(q, a);
            study.answer(q.id, result, { selected: q.format === 'mcq' ? a.selected : undefined, guessed: a.guessed });
            patch({ result, revealed: true });
          },
          onReveal: () => {
            if (isObjective(q) && !a.result) {
              study.answer(q.id, 'wrong', {});
              patch({ revealed: true, result: 'wrong' });
            } else patch({ revealed: true });
          },
          onSelfGrade: r => {
            if (a.result) return;
            study.answer(q.id, r, {});
            patch({ result: r });
          },
          onText: t => patch({ text: t }),
          onGuessed: g => patch({ guessed: g }),
        }}
      />
    </div>
  );
}
