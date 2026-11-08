import { useMemo } from 'react';
import { ArrowRight, CalendarClock, Flame, History, NotebookPen, Sparkles } from 'lucide-react';
import { CURRENT_EXAM, EXAMS } from '../../data/schema';
import { useBank } from '../core/bank';
import { dueQueue, shuffle } from '../core/session';
import { addDays } from '../core/srs';
import { isAnswered, isOpenError, streak } from '../core/study';
import { preferences, today, usePrefs, useStudy } from '../core/store';
import { useSync } from '../core/sync';
import { plural } from '../core/text';
import { href } from '../router';
import { activeSubjects } from '../subjects';
import { Bar, Card, cx, Loading, Section } from '../ui';
import { ResumeBanner } from './PracticePage';
import { WeakSpots } from '../components/WeakSpots';
import { startSession } from './SessionPage';

function greeting() {
  const h = new Date().getHours();
  return h < 5 ? 'Boa madrugada' : h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
}

const WEEKDAY = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export default function HomePage() {
  const bank = useBank();
  const data = useStudy();
  const sync = useSync();
  const { dailyGoal } = usePrefs();
  const t = today();

  const stats = useMemo(() => {
    const due = dueQueue(bank.all, data, t);
    const errors = bank.all.filter(q => isOpenError(data.questions[q.id]));
    const fresh = bank.all.filter(q => !isAnswered(data.questions[q.id]));
    const week = Array.from({ length: 7 }, (_, i) => {
      const k = addDays(t, i - 6);
      const [y, m, d] = k.split('-').map(Number);
      return { key: k, label: WEEKDAY[new Date(y, m - 1, d).getDay()], n: data.days[k]?.answered ?? 0 };
    });
    const nextDue = Object.values(data.questions).map(s => s.srs?.due).filter((d): d is string => !!d && d > t).sort()[0];
    return { due, errors, fresh, week, nextDue, streak: streak(data.days, t, addDays), todayN: data.days[t]?.answered ?? 0 };
  }, [bank, data, t]);

  if (!bank.ready) return <Loading />;

  const name = sync.user?.name.split(' ')[0];
  const dateLabel = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const maxWeek = Math.max(1, ...stats.week.map(w => w.n));
  const bySubjectDue = activeSubjects(bank).map(s => ({ s, n: stats.due.filter(q => q.subject === s.id).length })).filter(x => x.n);

  return (
    <>
      <header className="mb-8 sm:mb-10">
        <p className="mb-1.5 text-[13px] font-medium text-ink-3 first-letter:uppercase">{dateLabel}</p>
        <h1 className="font-display text-[2.25rem] leading-[1.05] font-semibold sm:text-[3rem]">
          {greeting()}
          {name ? `, ${name}` : ''}.
        </h1>
      </header>

      {bank.exam !== CURRENT_EXAM && (
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-warn/40 bg-warn-soft px-5 py-4 sm:flex-row sm:items-center">
          <History className="size-5 shrink-0 text-warn" />
          <p className="flex-1 text-[14.5px] text-ink">
            Você está nas questões da <strong>{bank.exam}</strong>, prova já realizada. Revisões, erros e estatísticas abaixo são só desta prova.
          </p>
          <button type="button" onClick={() => preferences.set({ exam: CURRENT_EXAM })} className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-ink px-3.5 text-[13px] font-semibold text-bg">
            Voltar para a {CURRENT_EXAM} <ArrowRight className="size-3.5" />
          </button>
        </div>
      )}

      <ResumeBanner />

      <div className="mb-10 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <Card className="relative overflow-hidden bg-ink p-6 text-bg sm:p-7">
          <div className="flex items-center gap-2 text-[13px] font-medium opacity-70">
            <CalendarClock className="size-4" /> Revisão do dia
          </div>
          {stats.due.length ? (
            <>
              <p className="font-display tabular mt-4 text-6xl font-semibold">{stats.due.length}</p>
              <p className="mt-1 text-[15px] opacity-75">{stats.due.length === 1 ? 'questão voltou para revisão' : 'questões voltaram para revisão'}</p>
              {bySubjectDue.length > 1 && (
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] opacity-70">
                  {bySubjectDue.map(({ s, n }) => (
                    <span key={s.id} className="flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full" style={{ background: s.color }} />
                      {s.short} {n}
                    </span>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => startSession('revisao', 'Revisão do dia', stats.due.map(q => q.id))}
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-bg px-5 text-[14px] font-semibold text-ink transition hover:opacity-90"
              >
                Revisar agora <ArrowRight className="size-4" />
              </button>
            </>
          ) : (
            <>
              <p className="font-display mt-4 text-3xl font-semibold">Tudo em dia.</p>
              <p className="mt-2 max-w-sm text-[14.5px] opacity-75">
                {stats.nextDue
                  ? `Nenhuma questão para revisar hoje. A próxima revisão é ${stats.nextDue === addDays(t, 1) ? 'amanhã' : 'em ' + new Date(stats.nextDue + 'T12:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}.`
                  : 'Responda questões e elas voltam aqui no momento certo para você não esquecer.'}
              </p>
              <a href={href('praticar')} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-bg px-5 text-[14px] font-semibold text-ink transition hover:opacity-90">
                Praticar <ArrowRight className="size-4" />
              </a>
            </>
          )}
        </Card>

        <Card className="flex flex-col p-6 sm:p-7">
          <div className="flex items-center gap-2 text-[13px] font-medium text-ink-3">
            <Flame className={cx('size-4', stats.streak > 0 && 'text-warn')} /> Constância
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display tabular text-5xl font-semibold">{stats.streak}</span>
            <span className="text-[15px] text-ink-2">{stats.streak === 1 ? 'dia seguido' : 'dias seguidos'}</span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <Bar value={stats.todayN / Math.max(1, dailyGoal)} color={stats.todayN >= dailyGoal ? 'var(--good)' : 'var(--accent)'} className="flex-1" />
            <span className="tabular shrink-0 text-[13px] text-ink-2">
              {stats.todayN}/{dailyGoal} hoje{stats.todayN >= dailyGoal ? ' ✓' : ''}
            </span>
          </div>
          <div className="mt-auto flex items-end justify-between gap-2 pt-6" aria-label="Questões por dia nos últimos 7 dias">
            {stats.week.map(w => (
              <div key={w.key} className="flex flex-1 flex-col items-center gap-1.5" title={`${w.n} em ${w.key}`}>
                <div className="flex h-16 w-full max-w-7 items-end overflow-hidden rounded-md bg-surface-2">
                  <div className={cx('w-full rounded-md', w.key === t ? 'bg-accent' : 'bg-ink-3/50')} style={{ height: `${(w.n / maxWeek) * 100}%` }} />
                </div>
                <span className={cx('text-[11px]', w.key === t ? 'font-semibold text-ink' : 'text-ink-3')}>{w.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mb-10 grid gap-3 sm:grid-cols-2">
        <QuickAction
          icon={<Sparkles className="size-5" />}
          title="10 questões novas"
          text={stats.fresh.length ? `Sorteadas entre as ${stats.fresh.length} que você ainda não fez.` : 'Você já fez todas as questões do banco!'}
          disabled={!stats.fresh.length}
          onClick={() => startSession('pratica', 'Questões novas', shuffle(stats.fresh).slice(0, 10).map(q => q.id))}
        />
        <QuickAction
          icon={<NotebookPen className="size-5" />}
          title="Refazer erros"
          text={stats.errors.length ? `${plural(stats.errors.length, 'questão', 'questões')} no caderno de erros.` : 'Nenhum erro pendente no caderno.'}
          disabled={!stats.errors.length}
          onClick={() => startSession('erros', 'Caderno de erros', stats.errors.map(q => q.id))}
        />
      </div>

      <WeakSpots bank={bank} compact />

      <Section title={`Disciplinas da ${bank.exam}`} action={<a href={href('praticar')} className="text-[13px] font-medium text-accent hover:underline">Montar sessão</a>}>
        <Card className="divide-y divide-line">
          {activeSubjects(bank).map(s => {
            const qs = bank.bySubject[s.id];
            const done = qs.filter(q => isAnswered(data.questions[q.id])).length;
            return (
              <a key={s.id} href={href(`praticar/${s.id}`)} className="group flex items-center gap-4 px-4 py-4 transition first:rounded-t-2xl last:rounded-b-2xl hover:bg-surface-2 sm:px-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl" style={{ background: `color-mix(in srgb, ${s.color} 14%, transparent)`, color: s.color }}>
                  <s.icon className="size-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="truncate font-medium">{s.name}</span>
                    <span className="tabular shrink-0 text-[12.5px] text-ink-3">
                      {done}/{qs.length}
                    </span>
                  </span>
                  <Bar value={qs.length ? done / qs.length : 0} color={s.color} className="mt-2" />
                </span>
                <ArrowRight className="size-4 shrink-0 text-ink-3 transition group-hover:translate-x-0.5 group-hover:text-ink" />
              </a>
            );
          })}
        </Card>
      </Section>

      {bank.exam === CURRENT_EXAM && (
        <Section title="Provas anteriores">
          <div className="grid gap-3 sm:grid-cols-2">
            {EXAMS.filter(e => e.id !== CURRENT_EXAM).map(e => (
              <button
                key={e.id}
                type="button"
                onClick={() => {
                  preferences.set({ exam: e.id });
                  window.scrollTo({ top: 0 });
                }}
                className="group flex items-center gap-4 rounded-2xl border border-dashed border-line-strong px-5 py-4 text-left transition hover:border-solid hover:bg-surface"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 font-mono text-[13px] font-semibold text-ink-2">{e.label}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">Questões da {e.label}</span>
                  <span className="block text-[13px] text-ink-2">Prova {e.hint} — continuam disponíveis para revisar.</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-ink-3 transition group-hover:translate-x-0.5 group-hover:text-ink" />
              </button>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

function QuickAction({ icon, title, text, onClick, disabled }: { icon: React.ReactNode; title: string; text: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 text-left transition hover:border-line-strong hover:shadow-card disabled:opacity-55 disabled:hover:border-line disabled:hover:shadow-none"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="mt-0.5 block text-[13.5px] text-ink-2">{text}</span>
      </span>
      <ArrowRight className="mt-2.5 size-4 shrink-0 text-ink-3 transition group-hover:translate-x-0.5 group-hover:text-ink" />
    </button>
  );
}


