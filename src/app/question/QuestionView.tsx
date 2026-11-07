import { memo, useMemo, useState } from 'react';
import { Bookmark, BookmarkCheck, Check, CircleHelp, Eye, EyeOff, NotebookPen, Strikethrough, X } from 'lucide-react';
import { LETTERS, type Question } from '../../data/schema';
import type { SessionAnswer } from '../core/session';
import { ERROR_CAUSES, type QuestionState, type Result } from '../core/study';
import { study } from '../core/store';
import { renderMarkdown } from '../core/text';
import { KIND_LABEL, subjectMeta } from '../subjects';
import { Badge, Button, cx, SubjectTag } from '../ui';

export interface QuestionHandlers {
  onSelect: (i: number) => void;
  onEliminate: (i: number) => void;
  onConfirm: () => void;
  onReveal: () => void;
  onSelfGrade: (r: Result) => void;
  onText: (t: string) => void;
  onGuessed: (g: boolean) => void;
}

const Rich = memo(function Rich({ text, className }: { text: string; className?: string }) {
  const html = useMemo(() => renderMarkdown(text, { allowHtml: true }), [text]);
  return <div className={cx('prose-q', className)} dangerouslySetInnerHTML={{ __html: html }} />;
});

export function QuestionMeta({ q, state, number, hideHistory }: { q: Question; state?: QuestionState; number?: string; hideHistory?: boolean }) {
  const s = subjectMeta(q.subject);
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {number && <span className="tabular font-mono text-[12px] font-medium text-ink-3">{number}</span>}
      {s && <SubjectTag name={s.name} color={s.color} />}
      <Badge>{KIND_LABEL[q.kind]}</Badge>
      {q.topic && <Badge>{q.topic}</Badge>}
      {q.source && <Badge tone="warn">{q.source}</Badge>}
      {state?.attempts && !hideHistory ? (
        <span className="text-[12px] text-ink-3">
          {state.correctCount}/{state.attempts} acertos antes
        </span>
      ) : null}
    </div>
  );
}

export function FavoriteButton({ id, state }: { id: string; state?: QuestionState }) {
  const fav = !!state?.favorite;
  return (
    <button
      type="button"
      onClick={() => study.toggleFavorite(id)}
      aria-pressed={fav}
      title={fav ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
      className={cx('inline-flex size-9 items-center justify-center rounded-lg transition hover:bg-surface-2', fav ? 'text-accent' : 'text-ink-3 hover:text-ink')}
    >
      {fav ? <BookmarkCheck className="size-[18px]" /> : <Bookmark className="size-[18px]" />}
    </button>
  );
}

function Explanation({ q }: { q: Question }) {
  return (
    <section className="animate-rise mt-6 rounded-2xl border border-line bg-surface p-5 sm:p-6" aria-label="Gabarito comentado">
      <h3 className="mb-3 text-[12px] font-semibold tracking-wide text-ink-3 uppercase">{q.format === 'mcq' ? 'Gabarito comentado' : 'Resposta esperada'}</h3>
      <Rich text={q.explanation} className="prose-sm" />
    </section>
  );
}

function CausePicker({ id, state }: { id: string; state?: QuestionState }) {
  const [note, setNote] = useState(state?.note ?? '');
  return (
    <div className="animate-rise mt-4 rounded-2xl bg-surface-2 p-4">
      <p className="mb-2.5 flex items-center gap-2 text-[13px] font-medium text-ink-2">
        <NotebookPen className="size-4" /> Por que errou? Vai para o caderno de erros.
      </p>
      <div className="flex flex-wrap gap-2">
        {ERROR_CAUSES.map(c => (
          <button
            key={c.id}
            type="button"
            onClick={() => study.patch(id, { cause: state?.cause === c.id ? undefined : c.id })}
            className={cx(
              'h-8 rounded-full border px-3 text-[13px] transition',
              state?.cause === c.id ? 'border-ink bg-ink text-bg' : 'border-line-strong bg-surface text-ink-2 hover:text-ink',
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        onBlur={() => note !== (state?.note ?? '') && study.patch(id, { note })}
        placeholder="Anotação para revisar depois (opcional)"
        rows={2}
        className="mt-3 w-full resize-y rounded-xl border border-line bg-surface px-3 py-2 text-sm outline-none placeholder:text-ink-3 focus:border-accent"
      />
    </div>
  );
}

export function QuestionView({ q, answer = {}, state, h }: { q: Question; answer?: SessionAnswer; state?: QuestionState; h: QuestionHandlers }) {
  const done = !!answer.result;
  const eliminated = new Set(answer.eliminated ?? []);

  return (
    <article>
      <div className="font-[450] text-[1.125rem] leading-[1.72] sm:text-[1.1875rem]">
        <Rich text={q.stem} className="text-[inherit] leading-[inherit]" />
      </div>
      {q.graphicsHtml && <div className="q-graphics" dangerouslySetInnerHTML={{ __html: q.graphicsHtml }} />}

      {q.format === 'mcq' && q.options ? (
        <>
          <ol className="mt-7 flex flex-col gap-2.5" aria-label="Alternativas">
            {q.options.map((opt, i) => {
              const isSel = answer.selected === i;
              const isAns = q.answerIndex === i;
              const isElim = eliminated.has(i);
              const tone = done ? (isAns ? 'good' : isSel ? 'bad' : 'dim') : isSel ? 'sel' : isElim ? 'elim' : 'idle';
              return (
                <li key={i} className="group relative flex items-stretch gap-2">
                  <button
                    type="button"
                    disabled={done}
                    onClick={() => h.onSelect(i)}
                    aria-pressed={isSel}
                    className={cx(
                      'flex min-h-14 flex-1 items-start gap-3.5 rounded-2xl border px-4 py-3.5 text-left text-[15.5px] leading-relaxed transition disabled:cursor-default',
                      tone === 'idle' && 'border-line bg-surface hover:border-line-strong hover:shadow-card',
                      tone === 'sel' && 'border-accent bg-accent-soft shadow-card ring-1 ring-accent',
                      tone === 'elim' && 'border-line bg-transparent text-ink-3',
                      tone === 'good' && 'border-good bg-good-soft ring-1 ring-good',
                      tone === 'bad' && 'border-bad bg-bad-soft ring-1 ring-bad',
                      tone === 'dim' && 'border-line bg-surface opacity-60',
                    )}
                  >
                    <span
                      className={cx(
                        'mt-px flex size-7 shrink-0 items-center justify-center rounded-lg font-mono text-[13px] font-semibold',
                        tone === 'sel' ? 'bg-accent text-accent-ink' : tone === 'good' ? 'bg-good text-white' : tone === 'bad' ? 'bg-bad text-white' : 'bg-surface-2 text-ink-2',
                      )}
                    >
                      {tone === 'good' ? <Check className="size-4" /> : tone === 'bad' ? <X className="size-4" /> : LETTERS[i]}
                    </span>
                    <span className={cx('min-w-0 pt-0.5', isElim && !done && 'line-through decoration-ink-3/70')}>{opt}</span>
                  </button>
                  {!done && (
                    <button
                      type="button"
                      onClick={() => h.onEliminate(i)}
                      aria-pressed={isElim}
                      title={isElim ? 'Restaurar alternativa' : 'Eliminar alternativa'}
                      className={cx(
                        'flex w-10 shrink-0 items-center justify-center rounded-xl transition',
                        isElim ? 'bg-surface-2 text-ink' : 'text-ink-3 opacity-100 hover:bg-surface-2 hover:text-ink sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100',
                      )}
                    >
                      <Strikethrough className="size-4" />
                    </button>
                  )}
                </li>
              );
            })}
          </ol>

          {!done ? (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg" disabled={answer.selected === undefined} onClick={h.onConfirm}>
                Responder
              </Button>
              <label className="flex h-12 cursor-pointer items-center gap-2 rounded-xl px-2 text-[14px] text-ink-2 select-none">
                <input type="checkbox" checked={!!answer.guessed} onChange={e => h.onGuessed(e.target.checked)} className="size-4 accent-[var(--accent)]" />
                Estou chutando
              </label>
              <Button variant="ghost" className="ml-auto" icon={<Eye className="size-4" />} onClick={h.onReveal}>
                Ver gabarito
              </Button>
            </div>
          ) : (
            <ResultBanner q={q} answer={answer} />
          )}
        </>
      ) : (
        <OpenAnswer q={q} answer={answer} h={h} />
      )}

      {answer.revealed && <Explanation q={q} />}
      {done && answer.result !== 'correct' && <CausePicker id={q.id} state={state} key={q.id} />}
    </article>
  );
}

function ResultBanner({ q, answer }: { q: Question; answer: SessionAnswer }) {
  const ok = answer.result === 'correct';
  const skipped = answer.selected === undefined;
  return (
    <div className={cx('animate-rise mt-6 flex items-center gap-3 rounded-2xl px-4 py-3.5', ok ? 'bg-good-soft text-good' : 'bg-bad-soft text-bad')} role="status">
      <span className={cx('flex size-8 items-center justify-center rounded-full text-white', ok ? 'bg-good' : 'bg-bad')}>{ok ? <Check className="size-4" /> : <X className="size-4" />}</span>
      <p className="text-[15px] font-semibold">
        {ok ? (answer.guessed ? 'Acertou — mas no chute. Ela volta logo para revisão.' : 'Resposta correta.') : skipped ? `Sem resposta. A correta é a ${LETTERS[q.answerIndex!]}.` : `Incorreta. A correta é a ${LETTERS[q.answerIndex!]}.`}
      </p>
    </div>
  );
}

function OpenAnswer({ q, answer, h }: { q: Question; answer: SessionAnswer; h: QuestionHandlers }) {
  const done = !!answer.result;
  return (
    <div className="mt-7">
      <label className="mb-2 block text-[13px] font-medium text-ink-2" htmlFor={`ans-${q.id}`}>
        Sua resposta <span className="font-normal text-ink-3">— escreva antes de conferir (opcional)</span>
      </label>
      <textarea
        id={`ans-${q.id}`}
        value={answer.text ?? ''}
        onChange={e => h.onText(e.target.value)}
        readOnly={answer.revealed}
        rows={6}
        placeholder="Organize o raciocínio: mecanismo, achados, conclusão…"
        className="w-full resize-y rounded-2xl border border-line bg-surface px-4 py-3 text-[15.5px] leading-relaxed outline-none placeholder:text-ink-3 focus:border-accent read-only:bg-surface-2"
      />
      {!answer.revealed ? (
        <div className="mt-4">
          <Button variant="primary" size="lg" icon={<Eye className="size-4" />} onClick={h.onReveal}>
            Ver resposta esperada
          </Button>
        </div>
      ) : !done ? (
        <div className="animate-rise mt-6 rounded-2xl border border-line bg-surface p-4">
          <p className="mb-3 flex items-center gap-2 text-[14px] font-medium">
            <CircleHelp className="size-4 text-ink-3" /> Compare com o gabarito abaixo. Como foi?
          </p>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="danger" onClick={() => h.onSelfGrade('wrong')}>Errei</Button>
            <Button className="bg-warn-soft! text-warn! border-transparent!" onClick={() => h.onSelfGrade('partial')}>Parcial</Button>
            <Button variant="good" onClick={() => h.onSelfGrade('correct')}>Acertei</Button>
          </div>
        </div>
      ) : (
        <div className={cx('mt-4 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-[14px] font-medium', answer.result === 'correct' ? 'bg-good-soft text-good' : answer.result === 'partial' ? 'bg-warn-soft text-warn' : 'bg-bad-soft text-bad')}>
          {answer.result === 'correct' ? <Check className="size-4" /> : answer.result === 'partial' ? <EyeOff className="size-4" /> : <X className="size-4" />}
          Você marcou: {answer.result === 'correct' ? 'acertei' : answer.result === 'partial' ? 'parcial' : 'errei'}
        </div>
      )}
    </div>
  );
}
