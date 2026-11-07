import { useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useBank } from '../core/bank';
import type { SessionAnswer } from '../core/session';
import { study, useStudy } from '../core/store';
import { back } from '../router';
import { FavoriteButton, QuestionMeta, QuestionView } from '../question/QuestionView';
import { Button, Empty, Loading } from '../ui';

/** Uma questão avulsa (vinda da busca, do caderno de erros ou dos favoritos). */
export default function QuestionPage({ id }: { id?: string }) {
  const bank = useBank();
  const data = useStudy();
  const [a, setA] = useState<SessionAnswer>({});

  if (!bank.ready) return <Loading />;
  const q = id ? bank.byId.get(id) : undefined;
  if (!q)
    return (
      <Empty icon={<ArrowLeft className="size-5" />} title="Questão não encontrada" action={<Button to="busca">Buscar questões</Button>}>
        O link pode estar desatualizado.
      </Empty>
    );

  const patch = (p: Partial<SessionAnswer>) => setA(prev => ({ ...prev, ...p }));
  const state = data.questions[q.id];

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
      <div className="mb-5">
        <QuestionMeta q={q} state={state} hideHistory={!!a.result} />
      </div>
      <QuestionView
        key={q.id}
        q={q}
        answer={a}
        state={state}
        h={{
          onSelect: i => !a.result && patch({ selected: i, eliminated: (a.eliminated ?? []).filter(x => x !== i) }),
          onEliminate: i => {
            if (a.result) return;
            const s = new Set(a.eliminated ?? []);
            s.has(i) ? s.delete(i) : s.add(i);
            patch({ eliminated: [...s], selected: a.selected === i ? undefined : a.selected });
          },
          onConfirm: () => {
            if (a.selected === undefined || a.result) return;
            const result = a.selected === q.answerIndex ? 'correct' : 'wrong';
            study.answer(q.id, result, { selected: a.selected, guessed: a.guessed });
            patch({ result, revealed: true });
          },
          onReveal: () => {
            if (q.format === 'mcq' && !a.result) {
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
