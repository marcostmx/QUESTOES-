import { memo, useMemo, useState } from 'react';
import { Bookmark, BookmarkCheck, Check, CircleHelp, Eye, EyeOff, Minus, NotebookPen, Square, SquareCheck, Strikethrough, TriangleAlert, X } from 'lucide-react';
import { optionLabel, type Question } from '../../data/schema';
import { canConfirm, tfScore, type SessionAnswer } from '../core/session';
import { ERROR_CAUSES, type QuestionState, type Result } from '../core/study';
import { study } from '../core/store';
import { renderMarkdown } from '../core/text';
import { KIND_LABEL, subjectMeta } from '../subjects';
import { Badge, Button, cx, SubjectTag } from '../ui';
import { TopicSummaryButton } from '../components/TopicSummary';

export interface QuestionHandlers {
  onSelect: (i: number) => void;
  onTogglePick: (i: number) => void;
  onJudge: (item: number, value: boolean | null) => void;
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
    <div className="scrollbar-none -mx-1 flex min-w-0 items-center gap-x-3 gap-y-2 overflow-x-auto px-1 whitespace-nowrap sm:flex-wrap sm:whitespace-normal">
      {number && <span className="tabular font-mono text-[12px] font-medium text-ink-3">{number}</span>}
      {s && <SubjectTag name={s.name} color={s.color} />}
      <Badge>{q.format === 'multi' ? 'Mais de uma correta' : KIND_LABEL[q.kind]}</Badge>
      {q.topic && <Badge>{q.topic}</Badge>}
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
      <h3 className="mb-3 text-[12px] font-semibold tracking-wide text-ink-3 uppercase">{q.format === 'open' ? 'Resposta esperada' : 'Gabarito comentado'}</h3>
      <Rich text={q.explanation} className="prose-sm" />
      {q.source && <p className="mt-4 border-t border-line pt-3 text-[12.5px] text-ink-3">Fonte: {q.source}</p>}
      <TopicSummaryButton exam={q.exam} subject={q.subject} topic={q.topic} className="mt-3 -ml-2" />
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

/** Aviso para questões que não vieram de prova do professor. */
export function OriginNotice({ q }: { q: Question }) {
  if (q.origin === 'prova') return null;
  const where = q.source?.replace(/^Inédita\s*·\s*/i, '');
  const text =
    q.origin === 'inedita'
      ? `Questão não original: elaborada a partir dos materiais da disciplina${where ? ` (${where})` : ''}. Não caiu em prova do professor.`
      : q.origin === 'slide'
        ? `Questão não original: baseada no slide da aula${where ? ` (${where.replace(/^Slide da aula\s*·\s*/i, '')})` : ''}. Não caiu em prova do professor.`
        : 'Origem não confirmada: esta questão pode não ter caído em prova do professor.';
  return (
    <p role="note" className="mb-5 flex items-start gap-2.5 rounded-xl border border-warn/35 bg-warn-soft px-3.5 py-2.5 text-[13px] leading-snug text-ink-2">
      <TriangleAlert className="mt-px size-4 shrink-0 text-warn" />
      <span>{text}</span>
    </p>
  );
}

export function QuestionView({
  q,
  answer = {},
  state,
  h,
  footerConfirm,
  examMode,
}: {
  q: Question;
  answer?: SessionAnswer;
  state?: QuestionState;
  h: QuestionHandlers;
  /** No celular, o botão "Responder" fica no rodapé fixo da sessão. */
  footerConfirm?: boolean;
  /** Simulado em andamento: só marcar; sem confirmar nem ver gabarito. */
  examMode?: boolean;
}) {
  const done = !!answer.result;

  return (
    <article>
      <OriginNotice q={q} />
      <div className="text-[1.125rem] leading-[1.72] font-[450] sm:text-[1.1875rem]">
        <Rich text={q.stem} className="text-[inherit] leading-[inherit]" />
      </div>
      {q.image && (
        <figure className="mt-5 overflow-hidden rounded-2xl border border-line bg-white">
          <img src={q.image} alt="Imagem da questão" className="mx-auto max-h-[60vh] w-auto object-contain" loading="lazy" />
        </figure>
      )}
      {q.graphicsHtml && <div className="q-graphics" dangerouslySetInnerHTML={{ __html: q.graphicsHtml }} />}

      {q.format === 'open' ? (
        <OpenAnswer q={q} answer={answer} h={h} examMode={examMode} />
      ) : examMode ? (
        q.format === 'tf' ? <Statements q={q} answer={answer} h={h} /> : <Options q={q} answer={answer} h={h} />
      ) : (
        <>
          {q.format === 'tf' ? <Statements q={q} answer={answer} h={h} /> : <Options q={q} answer={answer} h={h} />}
          {!done ? (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className={footerConfirm ? 'hidden sm:contents' : 'contents'}>
                <Button variant="primary" size="lg" disabled={!canConfirm(q, answer)} onClick={h.onConfirm}>
                  Responder
                </Button>
              </span>
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
      )}

      {answer.blank && (
        <p className="mt-4 rounded-xl bg-surface-2 px-3 py-2 text-[14px] text-ink-2">Você deixou esta questão em branco no simulado.</p>
      )}
      {answer.revealed && <Explanation q={q} />}
      {done && answer.result !== 'correct' && !answer.blank && <CausePicker id={q.id} state={state} key={q.id} />}
    </article>
  );
}

/* ---------- Alternativas (uma ou várias corretas) ---------- */

function Options({ q, answer, h }: { q: Question; answer: SessionAnswer; h: QuestionHandlers }) {
  const done = !!answer.result;
  const multi = q.format === 'multi';
  const eliminated = new Set(answer.eliminated ?? []);
  const correct = new Set(multi ? q.answerIndices : [q.answerIndex]);
  const chosen = new Set(multi ? answer.picked : answer.selected !== undefined ? [answer.selected] : []);

  return (
    <>
      {multi && !done && <p className="mt-6 -mb-3 text-[13px] font-medium text-accent">Marque todas as alternativas corretas.</p>}
      <ol className="mt-7 flex flex-col gap-2.5" aria-label="Alternativas">
        {(q.options ?? []).map((opt, i) => {
          const isSel = chosen.has(i);
          const isAns = correct.has(i);
          const isElim = eliminated.has(i);
          const tone = done ? (isAns ? (isSel || !multi ? 'good' : 'missed') : isSel ? 'bad' : 'dim') : isSel ? 'sel' : isElim ? 'elim' : 'idle';
          return (
            <li key={i} className="group relative flex items-stretch gap-2">
              <button
                type="button"
                disabled={done}
                onClick={() => (multi ? h.onTogglePick(i) : h.onSelect(i))}
                aria-pressed={isSel}
                className={cx(
                  'flex min-h-14 flex-1 items-start gap-3.5 rounded-2xl border px-4 py-3.5 text-left text-[15.5px] leading-relaxed transition disabled:cursor-default',
                  tone === 'idle' && 'border-line bg-surface hover:border-line-strong hover:shadow-card',
                  tone === 'sel' && 'border-accent bg-accent-soft shadow-card ring-1 ring-accent',
                  tone === 'elim' && 'border-line bg-transparent text-ink-3',
                  tone === 'good' && 'border-good bg-good-soft ring-1 ring-good',
                  tone === 'good' && isSel && 'animate-pop',
                  tone === 'missed' && 'border-dashed border-good bg-surface',
                  tone === 'bad' && 'border-bad bg-bad-soft ring-1 ring-bad',
                  tone === 'dim' && 'border-line bg-surface opacity-60',
                )}
              >
                <span
                  className={cx(
                    'mt-px flex size-7 shrink-0 items-center justify-center font-mono text-[13px] font-semibold',
                    multi ? 'rounded-md' : 'rounded-lg',
                    tone === 'sel' ? 'bg-accent text-accent-ink' : tone === 'good' ? 'bg-good text-white' : tone === 'bad' ? 'bg-bad text-white' : tone === 'missed' ? 'border border-good text-good' : 'bg-surface-2 text-ink-2',
                  )}
                >
                  {tone === 'good' ? <Check className="size-4" /> : tone === 'bad' ? <X className="size-4" /> : optionLabel(q, i)}
                </span>
                <span className={cx('min-w-0 pt-0.5', isElim && !done && 'line-through decoration-ink-3/70')}>
                  {opt}
                  {tone === 'missed' && <span className="mt-1 block text-[12.5px] font-medium text-good">Também era correta</span>}
                </span>
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
    </>
  );
}

/* ---------- Itens V/F ou "marque os corretos" ---------- */

function Statements({ q, answer, h }: { q: Question; answer: SessionAnswer; h: QuestionHandlers }) {
  const done = !!answer.result;
  const check = q.tfStyle === 'check';
  return (
    <>
      <p className="mt-6 -mb-3 text-[13px] font-medium text-accent">{check ? 'Marque os itens corretos.' : 'Julgue cada item como verdadeiro (V) ou falso (F).'}</p>
      <ol className="mt-7 flex flex-col gap-2.5" aria-label="Itens">
        {(q.statements ?? []).map((st, i) => {
          const v = answer.judged?.[i] ?? (check && done ? false : null);
          const truth = q.truth?.[i];
          const right = done && v === truth;
          return (
            <li
              key={i}
              className={cx(
                'flex items-start gap-3 rounded-2xl border px-3.5 py-3 transition sm:items-center sm:px-4 sm:py-3.5',
                !done && 'border-line bg-surface',
                done && (right ? 'border-good/60 bg-good-soft' : 'border-bad/60 bg-bad-soft'),
              )}
            >
              <span className="flex min-w-0 flex-1 gap-2.5 text-[15px] leading-relaxed sm:gap-3 sm:text-[15.5px]">
                <span className="tabular mt-0.5 w-5 shrink-0 font-mono text-[13px] font-semibold text-ink-3">{i + 1}</span>
                <span className="min-w-0">
                  {st}
                  {done && !right && (
                    <span className="mt-1 block text-[12.5px] font-semibold text-bad">
                      {check ? (truth ? 'Este item devia ser marcado.' : 'Este item não devia ser marcado.') : `Gabarito: ${truth ? 'Verdadeiro' : 'Falso'}`}
                    </span>
                  )}
                </span>
              </span>
              {check ? (
                <button
                  type="button"
                  disabled={done}
                  onClick={() => h.onJudge(i, v ? null : true)}
                  aria-pressed={!!v}
                  aria-label={`Marcar item ${i + 1}`}
                  className={cx('flex h-9 shrink-0 items-center gap-2 rounded-xl px-2.5 text-[13px] font-medium transition sm:h-10 sm:px-3', v ? 'bg-accent text-accent-ink' : 'border border-line-strong text-ink-2 hover:text-ink')}
                >
                  {v ? <SquareCheck className="size-4" /> : <Square className="size-4" />}
                  <span className="hidden sm:inline">{v ? 'Marcado' : 'Marcar'}</span>
                </button>
              ) : (
                <div className="flex shrink-0 gap-1 sm:gap-1.5" role="group" aria-label={`Item ${i + 1}`}>
                  {([true, false] as const).map(val => (
                    <button
                      key={String(val)}
                      type="button"
                      disabled={done}
                      onClick={() => h.onJudge(i, v === val ? null : val)}
                      aria-pressed={v === val}
                      className={cx(
                        'h-9 w-9 rounded-lg font-mono text-[14px] font-semibold transition disabled:cursor-default sm:h-10 sm:w-11 sm:rounded-xl',
                        v === val ? (done ? (right ? 'bg-good text-white' : 'bg-bad text-white') : 'bg-accent text-accent-ink') : 'border border-line-strong text-ink-2 hover:text-ink',
                      )}
                    >
                      {val ? 'V' : 'F'}
                    </button>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}

const BANNER = {
  good: { box: 'bg-good-soft text-good', dot: 'bg-good' },
  warn: { box: 'bg-warn-soft text-warn', dot: 'bg-warn' },
  bad: { box: 'bg-bad-soft text-bad', dot: 'bg-bad' },
} as const;

function ResultBanner({ q, answer }: { q: Question; answer: SessionAnswer }) {
  const r = answer.result;
  const tone = r === 'correct' ? 'good' : r === 'partial' ? 'warn' : 'bad';
  let text: string;
  if (q.format === 'tf') {
    const { right, total } = tfScore(q, answer);
    const untouched = !answer.judged?.some(v => v !== null && v !== undefined);
    text = untouched ? 'Sem resposta. Veja o gabarito de cada item acima.' : `${right} de ${total} itens certos.`;
  } else if (q.format === 'multi') {
    const letters = (q.answerIndices ?? []).map(i => optionLabel(q, i)).join(', ');
    text = r === 'correct' ? 'Resposta correta.' : r === 'partial' ? `Faltou marcar alguma. Corretas: ${letters}.` : `Incorreta. Corretas: ${letters}.`;
  } else {
    const skipped = answer.selected === undefined;
    const letter = optionLabel(q, q.answerIndex!);
    text = r === 'correct' ? (answer.guessed ? 'Acertou — mas no chute. Ela volta logo para revisão.' : 'Resposta correta.') : skipped ? `Sem resposta. A correta é a ${letter}.` : `Incorreta. A correta é a ${letter}.`;
  }
  return (
    <div className={cx('animate-rise mt-6 flex items-center gap-3 rounded-2xl px-4 py-3.5', BANNER[tone].box, r === 'correct' && 'animate-glow')} role="status">
      <span className={cx('flex size-8 shrink-0 items-center justify-center rounded-full text-white', BANNER[tone].dot)}>{r === 'correct' ? <Check className="size-4" /> : r === 'partial' ? <Minus className="size-4" /> : <X className="size-4" />}</span>
      <p className="text-[15px] font-semibold">{text}</p>
    </div>
  );
}

function OpenAnswer({ q, answer, h, examMode }: { q: Question; answer: SessionAnswer; h: QuestionHandlers; examMode?: boolean }) {
  const done = !!answer.result;
  return (
    <div className="mt-7">
      <label className="mb-2 block text-[13px] font-medium text-ink-2" htmlFor={`ans-${q.id}`}>
        Sua resposta <span className="font-normal text-ink-3">{examMode ? '— a resposta esperada aparece na correção' : '— escreva antes de conferir (opcional)'}</span>
      </label>
      <textarea
        id={`ans-${q.id}`}
        value={answer.text ?? ''}
        onChange={e => h.onText(e.target.value)}
        readOnly={answer.revealed}
        rows={6}
        placeholder="Organize o raciocínio: mecanismo, achados, conclusão…"
        className="w-full resize-y rounded-2xl border border-line bg-surface px-4 py-3 text-[15.5px] leading-relaxed outline-none placeholder:text-ink-3 read-only:bg-surface-2 focus:border-accent"
      />
      {examMode ? null : !answer.revealed ? (
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
            <Button variant="danger" onClick={() => h.onSelfGrade('wrong')}>
              Errei
            </Button>
            <Button className="border-transparent! bg-warn-soft! text-warn!" onClick={() => h.onSelfGrade('partial')}>
              Parcial
            </Button>
            <Button variant="good" onClick={() => h.onSelfGrade('correct')}>
              Acertei
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={cx(
            'mt-4 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-[14px] font-medium',
            answer.result === 'correct' ? 'bg-good-soft text-good' : answer.result === 'partial' ? 'bg-warn-soft text-warn' : 'bg-bad-soft text-bad',
          )}
        >
          {answer.result === 'correct' ? <Check className="size-4" /> : answer.result === 'partial' ? <EyeOff className="size-4" /> : <X className="size-4" />}
          Você marcou: {answer.result === 'correct' ? 'acertei' : answer.result === 'partial' ? 'parcial' : 'errei'}
        </div>
      )}
    </div>
  );
}
