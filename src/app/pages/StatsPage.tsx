import { useMemo, useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { Bar as RBar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Question, QuestionKind } from '../../data/schema';
import { topicsOf, useBank } from '../core/bank';
import { addDays } from '../core/srs';
import { isAnswered, isOpenError, streak, type QuestionState } from '../core/study';
import { today, useStudy } from '../core/store';
import { KIND_LABEL, SUBJECT_LIST } from '../subjects';
import { plural } from '../core/text';
import { Bar, Card, cx, Empty, Loading, PageHeader, Section } from '../ui';

interface Agg {
  total: number;
  answered: number;
  attempts: number;
  correct: number;
  errors: number;
}

function aggregate(qs: Question[], states: Record<string, QuestionState>): Agg {
  const a: Agg = { total: qs.length, answered: 0, attempts: 0, correct: 0, errors: 0 };
  for (const q of qs) {
    const s = states[q.id];
    if (!s) continue;
    if (isAnswered(s)) a.answered++;
    a.attempts += s.attempts;
    a.correct += s.correctCount;
    if (isOpenError(s)) a.errors++;
  }
  return a;
}

const pct = (a: Agg) => (a.attempts ? Math.round((a.correct / a.attempts) * 100) : null);
const toneFor = (p: number | null) => (p === null ? 'text-ink-3' : p >= 70 ? 'text-good' : p >= 50 ? 'text-warn' : 'text-bad');

export default function StatsPage() {
  const bank = useBank();
  const data = useStudy();
  const [range, setRange] = useState<14 | 30 | 90>(30);
  const t = today();

  const s = useMemo(() => {
    const overall = aggregate(bank.all, data.questions);
    const bySubject = SUBJECT_LIST.map(m => ({ m, a: aggregate(bank.bySubject[m.id], data.questions) }));
    const kinds = [...new Set(bank.all.map(q => q.kind))] as QuestionKind[];
    const byKind = kinds.map(k => ({ k, a: aggregate(bank.all.filter(q => q.kind === k), data.questions) }));
    const byTopic = topicsOf(bank.all).map(tp => ({ tp, a: aggregate(bank.all.filter(q => q.topic === tp), data.questions) }));
    const days = Array.from({ length: range }, (_, i) => {
      const k = addDays(t, i - range + 1);
      const d = data.days[k];
      return { key: k, label: k.slice(8) + '/' + k.slice(5, 7), certas: d?.correct ?? 0, erradas: (d?.answered ?? 0) - (d?.correct ?? 0) };
    });
    const activeDays = Object.values(data.days).filter(d => d.answered).length;
    return { overall, bySubject, byKind, byTopic, days, activeDays, streak: streak(data.days, t, addDays) };
  }, [bank, data, range, t]);

  if (!bank.ready) return <Loading />;
  if (!s.overall.attempts)
    return (
      <>
        <PageHeader eyebrow="Estatísticas" title="Seu desempenho" />
        <Empty icon={<BarChart3 className="size-5" />} title="Ainda sem dados">
          Responda algumas questões para ver seu desempenho por disciplina, estilo e tema.
        </Empty>
      </>
    );

  const p = pct(s.overall);

  return (
    <>
      <PageHeader eyebrow="Estatísticas" title="Seu desempenho" />

      <div className="mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Taxa de acerto" value={p === null ? '—' : `${p}%`} tone={toneFor(p)} sub={`${s.overall.correct} de ${s.overall.attempts} respostas`} />
        <Kpi label="Questões feitas" value={s.overall.answered} sub={`de ${s.overall.total} no banco`} />
        <Kpi label="Erros pendentes" value={s.overall.errors} sub="no caderno de erros" />
        <Kpi label="Sequência" value={`${s.streak}d`} sub={`${plural(s.activeDays, 'dia', 'dias')} de estudo no total`} />
      </div>

      <Section
        title="Respostas por dia"
        action={
          <div className="flex gap-1 rounded-lg bg-surface-2 p-0.5">
            {([14, 30, 90] as const).map(r => (
              <button key={r} type="button" onClick={() => setRange(r)} className={cx('tabular h-7 rounded-md px-2.5 text-[12px] font-medium', range === r ? 'bg-surface text-ink shadow-card' : 'text-ink-2')}>
                {r}d
              </button>
            ))}
          </div>
        }
      >
        <Card className="p-4 pt-6">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={s.days} margin={{ left: -24, right: 4 }}>
                <CartesianGrid vertical={false} stroke="var(--line)" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: 'var(--ink-3)', fontSize: 11 }} interval="preserveStartEnd" minTickGap={16} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: 'var(--ink-3)', fontSize: 11 }} />
                <Tooltip
                  cursor={{ fill: 'var(--surface-2)' }}
                  contentStyle={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, fontSize: 13, color: 'var(--ink)' }}
                  labelStyle={{ color: 'var(--ink-2)', marginBottom: 4 }}
                />
                <RBar dataKey="certas" stackId="a" fill="var(--good)" name="Certas" />
                <RBar dataKey="erradas" stackId="a" fill="var(--bad)" name="Erradas" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </Section>

      <Section title="Por disciplina">
        <Card className="divide-y divide-line">
          {s.bySubject.map(({ m, a }) => {
            const pp = pct(a);
            return (
              <div key={m.id} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-4 py-4 sm:grid-cols-[200px_1fr_80px_80px] sm:px-5">
                <span className="flex items-center gap-2.5 font-medium">
                  <span className="size-2.5 rounded-full" style={{ background: m.color }} />
                  {m.name}
                </span>
                <span className={cx('tabular text-right text-[15px] font-semibold sm:order-3', toneFor(pp))}>{pp === null ? '—' : `${pp}%`}</span>
                <span className="col-span-2 sm:order-2 sm:col-span-1">
                  <Bar value={a.total ? a.answered / a.total : 0} color={m.color} />
                  <span className="tabular mt-1 block text-[12px] text-ink-3">
                    {a.answered}/{a.total} feitas
                  </span>
                </span>
                <span className="tabular hidden text-right text-[13px] text-ink-3 sm:order-4 sm:block">{plural(a.errors, 'erro', 'erros')}</span>
              </div>
            );
          })}
        </Card>
      </Section>

      <div className="grid gap-x-6 lg:grid-cols-2">
        <Section title="Por estilo de questão">
          <RateList rows={s.byKind.map(({ k, a }) => ({ key: k, label: KIND_LABEL[k], a }))} />
        </Section>
        {s.byTopic.length > 0 && (
          <Section title="Por tema">
            <RateList rows={s.byTopic.map(({ tp, a }) => ({ key: tp, label: tp, a }))} />
          </Section>
        )}
      </div>
    </>
  );
}

function Kpi({ label, value, sub, tone }: { label: string; value: string | number; sub?: string; tone?: string }) {
  return (
    <Card className="p-5">
      <p className="text-[12.5px] text-ink-3">{label}</p>
      <p className={cx('font-display tabular mt-1 text-[2rem] leading-tight font-semibold', tone)}>{value}</p>
      {sub && <p className="mt-0.5 text-[12px] text-ink-3">{sub}</p>}
    </Card>
  );
}

function RateList({ rows }: { rows: { key: string; label: string; a: Agg }[] }) {
  return (
    <Card className="divide-y divide-line">
      {rows.map(({ key, label, a }) => {
        const p = pct(a);
        return (
          <div key={key} className="flex items-center gap-4 px-4 py-3 sm:px-5">
            <span className="min-w-0 flex-1 truncate text-[14px]">{label}</span>
            <span className="tabular text-[12px] text-ink-3">{a.attempts} resp.</span>
            <span className={cx('tabular w-12 text-right text-[14px] font-semibold', toneFor(p))}>{p === null ? '—' : `${p}%`}</span>
          </div>
        );
      })}
    </Card>
  );
}
