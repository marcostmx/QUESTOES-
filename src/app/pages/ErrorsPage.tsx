import { useMemo, useState } from 'react';
import { Check, NotebookPen, Play, RotateCcw } from 'lucide-react';
import type { SubjectId } from '../../data/schema';
import { useBank } from '../core/bank';
import { ERROR_CAUSES, isOpenError, type ErrorCause } from '../core/study';
import { study, useStudy } from '../core/store';
import { QuestionList } from '../question/QuestionList';
import { SUBJECT_LIST } from '../subjects';
import { Badge, Button, Chip, Empty, IconButton, Loading, PageHeader, toast } from '../ui';
import { startSession } from './SessionPage';

export default function ErrorsPage() {
  const bank = useBank();
  const data = useStudy();
  const [subject, setSubject] = useState<SubjectId | null>(null);
  const [cause, setCause] = useState<ErrorCause | 'sem' | null>(null);
  const [showResolved, setShowResolved] = useState(false);

  const base = useMemo(
    () =>
      bank.all
        .filter(q => {
          const s = data.questions[q.id];
          return showResolved ? !!s?.resolved && s.lastResult !== 'correct' : isOpenError(s);
        })
        .sort((a, b) => (data.questions[b.id]?.lastAt ?? 0) - (data.questions[a.id]?.lastAt ?? 0)),
    [bank, data, showResolved],
  );
  const list = base.filter(q => (!subject || q.subject === subject) && (!cause || (cause === 'sem' ? !data.questions[q.id]?.cause : data.questions[q.id]?.cause === cause)));

  if (!bank.ready) return <Loading />;
  const causeLabel = (c?: ErrorCause) => ERROR_CAUSES.find(x => x.id === c)?.label;

  return (
    <>
      <PageHeader
        eyebrow="Caderno de erros"
        title="Seus erros"
        actions={
          list.length > 0 && !showResolved ? (
            <Button variant="primary" icon={<Play className="size-4 fill-current" />} onClick={() => startSession('erros', 'Caderno de erros', list.map(q => q.id))}>
              Refazer {list.length}
            </Button>
          ) : undefined
        }
      >
        Toda questão errada ou parcial entra aqui. Marque a causa para enxergar padrões e dê baixa quando dominar o assunto.
      </PageHeader>

      <div className="mb-3 flex flex-wrap gap-2">
        <Chip active={!showResolved} onClick={() => setShowResolved(false)}>
          Pendentes
        </Chip>
        <Chip active={showResolved} onClick={() => setShowResolved(true)}>
          Revisados
        </Chip>
      </div>

      {base.length > 0 && (
        <div className="mb-6 flex flex-col gap-3 border-y border-line py-4">
          <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4">
            <Chip active={!subject} onClick={() => setSubject(null)} count={base.length}>
              Todas
            </Chip>
            {SUBJECT_LIST.map(s => {
              const n = base.filter(q => q.subject === s.id).length;
              return n ? (
                <Chip key={s.id} color={s.color} active={subject === s.id} onClick={() => setSubject(subject === s.id ? null : s.id)} count={n}>
                  {s.short}
                </Chip>
              ) : null;
            })}
          </div>
          <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4">
            {[...ERROR_CAUSES, { id: 'sem' as const, label: 'Sem causa' }].map(c => {
              const n = base.filter(q => (c.id === 'sem' ? !data.questions[q.id]?.cause : data.questions[q.id]?.cause === c.id)).length;
              return n ? (
                <Chip key={c.id} active={cause === c.id} onClick={() => setCause(cause === c.id ? null : c.id)} count={n}>
                  {c.label}
                </Chip>
              ) : null;
            })}
          </div>
        </div>
      )}

      {list.length ? (
        <QuestionList
          items={list}
          states={data.questions}
          extra={(_, s) =>
            s?.cause || s?.note ? (
              <span className="mt-2 flex flex-col gap-1.5">
                {s.cause && <Badge tone="accent" className="self-start">{causeLabel(s.cause)}</Badge>}
                {s.note && <span className="block border-l-2 border-line-strong pl-3 text-[13px] text-ink-2 italic">{s.note}</span>}
              </span>
            ) : null
          }
          aside={q =>
            showResolved ? (
              <IconButton label="Voltar para pendentes" onClick={() => study.patch(q.id, { resolved: false })}>
                <RotateCcw className="size-4" />
              </IconButton>
            ) : (
              <IconButton
                label="Marcar como revisado"
                onClick={() => {
                  study.patch(q.id, { resolved: true });
                  toast('Marcado como revisado');
                }}
              >
                <Check className="size-4" />
              </IconButton>
            )
          }
        />
      ) : (
        <Empty icon={<NotebookPen className="size-5" />} title={showResolved ? 'Nenhum erro revisado' : 'Nenhum erro pendente'}>
          {showResolved ? 'Os erros que você der baixa aparecem aqui.' : 'Quando errar uma questão, ela aparece aqui com a causa e suas anotações.'}
        </Empty>
      )}
    </>
  );
}
