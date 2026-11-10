import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ClipboardCheck, Flame, Grid3x3, Keyboard, RotateCcw, Timer, Trophy, X } from 'lucide-react';
import type { ExamId } from '../../data/schema';
import { useBank } from '../core/bank';
import { canConfirm, examScore, sessionSummary, sessions, useSession, type Session, type SessionAnswer, type SessionKind, type StartOptions } from '../core/session';
import { useStudy } from '../core/store';
import { navigate } from '../router';
import { FavoriteButton, QuestionMeta, QuestionView, type QuestionHandlers } from '../question/QuestionView';
import { Bar, Button, cx, Dialog, Empty, IconButton, Loading, Ring } from '../ui';
import { excerpt, plural } from '../core/text';
import { subjectMeta } from '../subjects';
import { examHistory } from '../core/exams';

const RETURN_TO: Record<SessionKind, string> = { pratica: 'praticar', revisao: 'revisao', erros: 'erros', favoritos: 'favoritos', avulsa: '', simulado: 'simulado' };

export function startSession(kind: SessionKind, title: string, ids: string[], index = 0, exam?: ExamId, opts?: StartOptions) {
  sessions.start(kind, title, ids, index, exam, opts);
  navigate('sessao');
}

export default function SessionPage() {
  const session = useSession();
  const bank = useBank(session?.exam);

  if (!session)
    return (
      <div className="mx-auto max-w-lg px-4 py-20">
        <Empty icon={<Grid3x3 className="size-5" />} title="Nenhuma sessão em andamento" action={<Button variant="primary" to="praticar">Escolher questões</Button>}>
          Monte uma sessão em Praticar ou comece pela revisão do dia.
        </Empty>
      </div>
    );
  if (!bank.ready) return <Loading />;
  if (session.finishedAt) return session.kind === 'simulado' && session.mode === 'correcao' ? <ExamSummary session={session} /> : <Summary session={session} />;
  return <Runner session={session} />;
}

function Runner({ session }: { session: Session }) {
  const bank = useBank(session.exam);
  const data = useStudy();
  const [mapOpen, setMapOpen] = useState(false);
  const [keysOpen, setKeysOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const examMode = session.mode === 'prova';
  const topRef = useRef<HTMLDivElement>(null);

  const ids = session.questionIds;
  const q = bank.byId.get(ids[session.index]);
  const answer = q ? session.answers[q.id] ?? {} : {};
  const summary = sessionSummary(session);
  const isLast = session.index === ids.length - 1;
  const exit = () => navigate(RETURN_TO[session.kind]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ block: 'start' });
  }, [session.index]);

  const h: QuestionHandlers | null = q
    ? {
        onSelect: i => sessions.select(q.id, i),
        onTogglePick: i => sessions.togglePick(q.id, i),
        onJudge: (i, v) => sessions.judge(q.id, i, v, q.statements?.length ?? 0),
        onEliminate: i => sessions.toggleEliminate(q.id, i),
        onConfirm: () => sessions.confirm(q),
        onReveal: () => sessions.reveal(q),
        onSelfGrade: r => sessions.selfGrade(q, r),
        onText: t => sessions.setText(q.id, t),
        onGuessed: g => sessions.setGuessed(q.id, g),
      }
    : null;

  const submit = () => sessions.submitExam(bank.byId);
  const finishOrSubmit = () => (examMode ? setSubmitOpen(true) : sessions.finish());
  const next = () => (isLast ? finishOrSubmit() : sessions.go(session.index + 1));
  const filled = ids.filter(id => {
    const qq = bank.byId.get(id);
    const a = session.answers[id];
    return qq && a && (qq.format === 'open' ? !!a.text?.trim() : canConfirm(qq, a));
  }).length;

  // Atalhos de teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!q || !h || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      const typing = t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || (t instanceof HTMLInputElement && !['checkbox', 'radio', 'button'].includes(t.type));
      if (typing) {
        if (e.key === 'Escape') t.blur();
        return;
      }
      const k = e.key.toLowerCase();
      const n = q.options?.length ?? 0;
      const letter = 'abcdef'.indexOf(k);
      const digit = '123456'.indexOf(k);
      const idx = letter >= 0 ? letter : digit;
      if ((q.format === 'mcq' || q.format === 'multi') && idx >= 0 && idx < n) {
        e.preventDefault();
        e.shiftKey ? h.onEliminate(idx) : q.format === 'multi' ? h.onTogglePick(idx) : h.onSelect(idx);
      } else if (e.key === 'Enter' && examMode) {
        e.preventDefault();
        next();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (q.format !== 'open' && !answer.result && canConfirm(q, answer)) h.onConfirm();
        else if (answer.result) next();
        else if (q.format === 'open' && !answer.revealed) h.onReveal();
      } else if (e.key === 'ArrowRight') {
        if (!isLast) sessions.go(session.index + 1);
      } else if (e.key === 'ArrowLeft') {
        sessions.go(session.index - 1);
      } else if (k === 'g' && !answer.revealed) {
        h.onReveal();
      } else if (k === 'm') {
        setMapOpen(o => !o);
      } else if (e.key === '?') {
        setKeysOpen(o => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const progress = (examMode ? filled : summary.answered) / ids.length;
  // acertos seguidos até a questão atual (na ordem da sessão)
  let run = 0;
  for (let i = session.index; i >= 0; i--) {
    const r = session.answers[ids[i]]?.result;
    if (!r) continue;
    if (r !== 'correct') break;
    run++;
  }

  return (
    <div className="min-h-dvh bg-bg">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-[880px] items-center gap-2 px-3 sm:px-6">
          <IconButton label="Sair da sessão (o progresso fica salvo)" onClick={exit}>
            <X className="size-5" />
          </IconButton>
          <div className="min-w-0 flex-1 px-1">
            <p className="truncate text-[14px] font-semibold">
              <span className="mr-1.5 rounded bg-surface-2 px-1.5 py-px font-mono text-[11px] text-ink-2">{session.exam}</span>
              {session.title}
            </p>
            {examMode ? (
              <p className="tabular text-[12px] text-ink-3">
                Questão {session.index + 1} de {ids.length}
                <span className="mx-1.5">·</span>
                {filled} respondidas
              </p>
            ) : (
            <p className="tabular text-[12px] text-ink-3">
              Questão {session.index + 1} de {ids.length}
              <span className="mx-1.5">·</span>
              <span className="text-good">{summary.correct} certas</span>
              {summary.wrong + summary.partial > 0 && (
                <>
                  <span className="mx-1.5">·</span>
                  <span className="text-bad">{summary.wrong + summary.partial} erradas</span>
                </>
              )}
              {run >= 3 && (
                <span key={run} className="animate-pop ml-2 inline-flex items-center gap-1 rounded-full bg-warn-soft px-2 font-semibold text-warn">
                  <Flame className="size-3" /> {run} seguidas
                </span>
              )}
            </p>
            )}
          </div>
          {examMode && session.endsAt && <Countdown endsAt={session.endsAt} onEnd={submit} />}
          <IconButton label="Atalhos de teclado" onClick={() => setKeysOpen(true)} className="hidden sm:inline-flex">
            <Keyboard className="size-[18px]" />
          </IconButton>
          <Button size="sm" icon={<Grid3x3 className="size-4" />} onClick={() => setMapOpen(true)}>
            <span className="hidden sm:inline">Mapa</span>
          </Button>
        </div>
        <Bar value={progress} className="h-[3px] rounded-none" />
      </header>

      <div ref={topRef} className="scroll-mt-20" />
      <main className="mx-auto max-w-[880px] px-4 pt-7 pb-36 sm:px-6 sm:pt-10">
        {q && h ? (
          <div key={q.id} className="animate-rise">
            <div className="mb-5 flex items-start justify-between gap-3">
              <QuestionMeta q={q} state={data.questions[q.id]} number={`#${session.index + 1}`} hideHistory={!!answer.result || examMode} />
              <FavoriteButton id={q.id} state={data.questions[q.id]} />
            </div>
            <QuestionView q={q} answer={answer} state={data.questions[q.id]} h={h} footerConfirm examMode={examMode} />
          </div>
        ) : (
          <Empty icon={<X className="size-5" />} title="Questão não encontrada">
            Ela pode ter sido removida do banco. Avance para a próxima.
          </Empty>
        )}
      </main>

      <footer className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/90 backdrop-blur-lg">
        <div className="mx-auto flex h-[68px] max-w-[880px] items-center justify-between gap-3 px-4 sm:px-6">
          <Button variant="ghost" icon={<ArrowLeft className="size-4" />} disabled={session.index === 0} onClick={() => sessions.go(session.index - 1)}>
            <span className="hidden sm:inline">Anterior</span>
          </Button>
          {examMode ? (
            isLast ? (
              <Button variant="primary" onClick={() => setSubmitOpen(true)} icon={<ClipboardCheck className="size-4" />}>
                Entregar
              </Button>
            ) : (
              <Button variant="primary" onClick={next}>
                Próxima
                <ArrowRight className="size-4" />
              </Button>
            )
          ) : null}
          {!examMode && q && h && q.format !== 'open' && !answer.result ? (
            <div className="flex items-center gap-2 sm:hidden">
              <Button variant="ghost" onClick={next}>
                Pular
              </Button>
              <Button variant="primary" disabled={!canConfirm(q, answer)} onClick={h.onConfirm}>
                Responder
              </Button>
            </div>
          ) : null}
          <div className={examMode ? 'hidden' : q && q.format !== 'open' && !answer.result ? 'hidden sm:block' : undefined}>
            {isLast ? (
              <Button variant="primary" onClick={() => sessions.finish()} icon={<Trophy className="size-4" />}>
                Finalizar
              </Button>
            ) : (
              <Button variant={answer.result ? 'primary' : 'secondary'} onClick={next}>
                {answer.result ? 'Próxima' : 'Pular'}
                <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </footer>

      <Dialog open={mapOpen} onClose={() => setMapOpen(false)} title="Mapa da sessão">
        <div className="p-5">
          <div className="mb-4 flex flex-wrap gap-4 text-[12px] text-ink-2">
            {examMode ? (
              <Legend className="bg-accent" label="Respondida" />
            ) : (
              <>
                <Legend className="bg-good" label="Certa" />
                <Legend className="bg-warn" label="Parcial" />
                <Legend className="bg-bad" label="Errada" />
              </>
            )}
            <Legend className="border border-line-strong bg-surface" label="Sem resposta" />
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(44px,1fr))] gap-2">
            {ids.map((id, i) => {
              const r = examMode ? (isFilled(bank.byId.get(id), session.answers[id]) ? 'filled' : undefined) : session.answers[id]?.result;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    sessions.go(i);
                    setMapOpen(false);
                  }}
                  aria-current={i === session.index}
                  className={cx(
                    'tabular h-11 rounded-xl font-mono text-[13px] font-medium transition',
                    r === 'filled' ? 'bg-accent text-accent-ink' : r === 'correct' ? 'bg-good text-white' : r === 'wrong' ? 'bg-bad text-white' : r === 'partial' ? 'bg-warn text-white' : 'border border-line bg-surface text-ink-2 hover:border-line-strong',
                    i === session.index && 'ring-2 ring-accent ring-offset-2 ring-offset-surface',
                  )}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="mt-5 flex justify-end">
            <Button
              variant="primary"
              onClick={() => {
                setMapOpen(false);
                finishOrSubmit();
              }}
            >
              {examMode ? 'Entregar simulado' : 'Encerrar e ver resultado'}
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog open={submitOpen} onClose={() => setSubmitOpen(false)} title="Entregar o simulado?">
        <div className="p-5">
          <p className="text-[15px] text-ink-2">
            Você respondeu {filled} de {ids.length} questões.
            {filled < ids.length && ` ${plural(ids.length - filled, 'questão ficará', 'questões ficarão')} em branco e ${ids.length - filled === 1 ? 'conta' : 'contam'} como erro.`}
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setSubmitOpen(false)}>
              Continuar a prova
            </Button>
            <Button variant="primary" icon={<ClipboardCheck className="size-4" />} onClick={submit}>
              Entregar
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog open={keysOpen} onClose={() => setKeysOpen(false)} title="Atalhos de teclado">
        <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 p-5 text-[14px]">
          {[
            ['A–E ou 1–5', 'Marcar alternativa'],
            ['Shift + letra', 'Eliminar alternativa'],
            ['Enter', 'Responder / próxima'],
            ['G', 'Ver gabarito'],
            ['← →', 'Navegar'],
            ['M', 'Mapa da sessão'],
          ].map(([k, v]) => (
            <div key={k} className="contents">
              <dt>
                <kbd className="rounded-md border border-line-strong bg-surface-2 px-2 py-0.5 font-mono text-[12px]">{k}</kbd>
              </dt>
              <dd className="text-ink-2">{v}</dd>
            </div>
          ))}
        </dl>
      </Dialog>
    </div>
  );
}

function isFilled(q: Parameters<typeof canConfirm>[0] | undefined, a: SessionAnswer | undefined) {
  if (!q || !a) return false;
  return q.format === 'open' ? !!a.text?.trim() : canConfirm(q, a);
}

/** Cronômetro regressivo do simulado; entrega sozinho quando o tempo acaba. */
function Countdown({ endsAt, onEnd }: { endsAt: number; onEnd: () => void }) {
  const [now, setNow] = useState(Date.now());
  const ended = useRef(false);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = Math.max(0, endsAt - now);
  useEffect(() => {
    if (left === 0 && !ended.current) {
      ended.current = true;
      onEnd();
    }
  }, [left, onEnd]);
  const m = Math.floor(left / 60_000);
  const sec = Math.floor((left % 60_000) / 1000);
  const low = left < 5 * 60_000;
  return (
    <span
      className={cx('tabular inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[13px] font-semibold', low ? 'bg-bad-soft text-bad' : 'bg-surface-2 text-ink-2')}
      aria-label="Tempo restante"
    >
      <Timer className="size-3.5" />
      {String(m).padStart(2, '0')}:{String(sec).padStart(2, '0')}
    </span>
  );
}

function ExamSummary({ session }: { session: Session }) {
  const bank = useBank(session.exam);
  const sc = examScore(session, bank.byId);
  const missed = session.questionIds.filter(id => ['wrong', 'partial'].includes(session.answers[id]?.result ?? ''));
  const spent = session.finishedAt && session.createdAt ? Math.round((session.finishedAt - session.createdAt) / 60_000) : null;
  useEffect(() => {
    examHistory.save({
      id: session.id,
      exam: session.exam,
      title: session.title,
      subjects: [...sc.bySubject.keys()],
      date: session.finishedAt ?? Date.now(),
      grade: sc.grade,
      questions: session.questionIds.length,
      minutes: session.minutes,
    });
  }, [session.id, sc.grade]);
  const tone = sc.grade >= 7 ? 'var(--good)' : sc.grade >= 5 ? 'var(--warn)' : 'var(--bad)';
  return (
    <div className="min-h-dvh bg-bg">
      <main className="animate-rise mx-auto max-w-2xl px-4 py-10 sm:py-16">
        <p className="mb-2 text-[13px] font-medium text-ink-3">
          {session.exam} · {session.title}
        </p>
        <h1 className="font-display mb-8 text-4xl font-semibold sm:text-5xl">{sc.grade >= 7 ? 'Aprovado neste simulado.' : sc.grade >= 5 ? 'Quase lá.' : 'Hora de revisar a base.'}</h1>

        <div className="mb-6 flex flex-col items-center gap-6 rounded-3xl border border-line bg-surface p-6 sm:flex-row sm:p-8">
          <Ring value={sc.grade / 10} size={128} stroke={10} color={tone}>
            <span className="text-center">
              <span className="font-display tabular block text-3xl font-semibold">{sc.grade.toFixed(1).replace('.', ',')}</span>
              <span className="block text-[11px] text-ink-3">nota (0–10)</span>
            </span>
          </Ring>
          <dl className="grid flex-1 grid-cols-2 gap-4 text-center sm:text-left">
            <Stat label="Pontos" value={`${String(sc.points).replace('.', ',')}/${sc.graded}`} />
            <Stat label="Em branco" value={sc.blank} />
            <Stat label="Tempo" value={spent !== null ? `${spent} min` : '—'} />
            <Stat label="Discursivas a corrigir" value={sc.open} tone={sc.open ? 'text-warn' : undefined} />
          </dl>
        </div>

        {sc.bySubject.size > 1 && (
          <ul className="mb-6 space-y-3 rounded-2xl border border-line bg-surface p-5">
            {[...sc.bySubject].map(([sid, g]) => {
              const m = subjectMeta(sid);
              return (
                <li key={sid}>
                  <div className="tabular mb-1.5 flex justify-between text-[13.5px]">
                    <span className="font-medium">{m?.name ?? sid}</span>
                    <span className="text-ink-2">{((g.points / (g.total || 1)) * 10).toFixed(1).replace('.', ',')}</span>
                  </div>
                  <Bar value={g.points / (g.total || 1)} color={m?.color} />
                </li>
              );
            })}
          </ul>
        )}

        {sc.open > 0 && (
          <p className="mb-6 rounded-2xl bg-warn-soft px-4 py-3 text-[14px] text-warn">
            A nota ainda não inclui {sc.open === 1 ? 'a discursiva' : `as ${sc.open} discursivas`}. Abra a correção, compare sua resposta com a esperada e marque como foi.
          </p>
        )}

        <div className="mb-10 flex flex-wrap gap-2">
          <Button variant="primary" icon={<ClipboardCheck className="size-4" />} onClick={() => sessions.review(0)}>
            Ver correção
          </Button>
          {missed.length > 0 && (
            <Button icon={<RotateCcw className="size-4" />} onClick={() => startSession('erros', `Refazer erros · ${session.title}`, missed, 0, session.exam)}>
              Refazer {plural(missed.length, 'erro', 'erros')}
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={() => {
              sessions.discard();
              navigate('simulado');
            }}
          >
            Concluir
          </Button>
        </div>
      </main>
    </div>
  );
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cx('size-3 rounded', className)} />
      {label}
    </span>
  );
}

function Summary({ session }: { session: Session }) {
  const bank = useBank(session.exam);
  const s = sessionSummary(session);
  const rate = s.answered ? s.correct / s.answered : 0;
  const missed = useMemo(
    () => session.questionIds.filter(id => ['wrong', 'partial'].includes(session.answers[id]?.result ?? '')),
    [session],
  );
  const unanswered = session.questionIds.filter(id => !session.answers[id]?.result);
  const verdict = s.answered === 0 ? 'Sessão encerrada' : rate >= 0.85 ? 'Excelente.' : rate >= 0.65 ? 'Bom trabalho.' : rate >= 0.4 ? 'Dá para melhorar.' : 'Hora de revisar a base.';

  return (
    <div className="min-h-dvh bg-bg">
      <main className="animate-rise mx-auto max-w-2xl px-4 py-10 sm:py-16">
        <p className="mb-2 text-[13px] font-medium text-ink-3">
          {session.exam} · {session.title}
        </p>
        <h1 className="font-display mb-8 text-4xl font-semibold sm:text-5xl">{verdict}</h1>

        <div className="mb-8 flex flex-col items-center gap-6 rounded-3xl border border-line bg-surface p-6 sm:flex-row sm:p-8">
          <Ring value={rate} size={128} stroke={10} color={rate >= 0.65 ? 'var(--good)' : rate >= 0.4 ? 'var(--warn)' : 'var(--bad)'}>
            <span className="text-center">
              <span className="font-display tabular block text-3xl font-semibold">{Math.round(rate * 100)}%</span>
              <span className="block text-[11px] text-ink-3">de acerto</span>
            </span>
          </Ring>
          <dl className="grid flex-1 grid-cols-2 gap-4 text-center sm:text-left">
            <Stat label="Respondidas" value={`${s.answered}/${s.total}`} />
            <Stat label="Certas" value={s.correct} tone="text-good" />
            <Stat label="Erradas" value={s.wrong} tone="text-bad" />
            <Stat label="Parciais" value={s.partial} tone="text-warn" />
          </dl>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {missed.length > 0 && (
            <Button variant="primary" icon={<RotateCcw className="size-4" />} onClick={() => startSession('erros', `Refazer erros · ${session.title}`, missed, 0, session.exam)}>
              Refazer {plural(missed.length, 'erro', 'erros')}
            </Button>
          )}
          {unanswered.length > 0 && (
            <Button onClick={() => startSession(session.kind, session.title, unanswered, 0, session.exam)}>Continuar as {unanswered.length} sem resposta</Button>
          )}
          <Button
            variant="ghost"
            onClick={() => {
              sessions.discard();
              navigate(RETURN_TO[session.kind]);
            }}
          >
            Concluir
          </Button>
        </div>

        {missed.length > 0 && (
          <section>
            <h2 className="mb-3 text-[15px] font-semibold">Para revisar</h2>
            <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
              {missed.map(id => {
                const q = bank.byId.get(id);
                if (!q) return null;
                const subj = subjectMeta(q.subject);
                return (
                  <li key={id}>
                    <a href={`#/questao/${id}`} className="flex w-full items-start gap-3 px-4 py-3.5 text-left hover:bg-surface-2">
                      <span className="mt-1.5 size-2 shrink-0 rounded-full" style={{ background: subj?.color }} />
                      <span className="text-[14px] text-ink-2">{excerpt(q.stem, 140)}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string | number; tone?: string }) {
  return (
    <div>
      <dt className="text-[12px] text-ink-3">{label}</dt>
      <dd className={cx('font-display tabular text-2xl font-semibold', tone)}>{value}</dd>
    </div>
  );
}
