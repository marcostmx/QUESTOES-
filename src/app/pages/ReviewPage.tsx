import { useMemo } from 'react';
import { CalendarCheck, Play } from 'lucide-react';
import { useBank } from '../core/bank';
import { dueQueue } from '../core/session';
import { addDays } from '../core/srs';
import { today, useStudy } from '../core/store';
import { plural } from '../core/text';
import { activeSubjects } from '../subjects';
import { Button, Card, cx, Empty, Loading, PageHeader, Section } from '../ui';
import { startSession } from './SessionPage';

export default function ReviewPage() {
  const bank = useBank();
  const data = useStudy();
  const t = today();

  const info = useMemo(() => {
    const due = dueQueue(bank.all, data, t);
    const tracked = bank.all.filter(q => data.questions[q.id]?.srs);
    const days = Array.from({ length: 14 }, (_, i) => {
      const k = addDays(t, i + 1);
      return { key: k, n: tracked.filter(q => data.questions[q.id]!.srs!.due === k).length };
    });
    const mature = tracked.filter(q => data.questions[q.id]!.srs!.interval >= 21).length;
    return { due, tracked: tracked.length, days, mature };
  }, [bank, data, t]);

  if (!bank.ready) return <Loading />;
  const max = Math.max(1, ...info.days.map(d => d.n));

  return (
    <>
      <PageHeader eyebrow={`Revisão espaçada · ${bank.exam}`} title="Revisão">
        Cada questão respondida volta no intervalo certo: erros voltam amanhã, acertos espaçam cada vez mais. Chutes e respostas parciais voltam mais cedo.
      </PageHeader>

      {info.due.length ? (
        <Card className="mb-10 p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display tabular text-5xl font-semibold">{info.due.length}</p>
              <p className="text-[14.5px] text-ink-2">para revisar hoje</p>
            </div>
            <Button variant="primary" size="lg" icon={<Play className="size-4 fill-current" />} onClick={() => startSession('revisao', 'Revisão do dia', info.due.map(q => q.id))}>
              Revisar tudo
            </Button>
          </div>
          <div className="mt-6 grid gap-2 border-t border-line pt-5 sm:grid-cols-2 lg:grid-cols-3">
            {activeSubjects(bank).map(s => {
              const list = info.due.filter(q => q.subject === s.id);
              if (!list.length) return null;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => startSession('revisao', `Revisão · ${s.name}`, list.map(q => q.id))}
                  className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-left transition hover:border-line-strong hover:bg-surface-2"
                >
                  <span className="size-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="flex-1 text-[14px] font-medium">{s.name}</span>
                  <span className="tabular text-[13px] text-ink-2">{list.length}</span>
                </button>
              );
            })}
          </div>
        </Card>
      ) : (
        <div className="mb-10">
          <Empty icon={<CalendarCheck className="size-5" />} title={info.tracked ? 'Nada para revisar hoje' : 'Sua agenda de revisão está vazia'} action={<Button variant="primary" to="praticar">Praticar</Button>}>
            {info.tracked ? 'Você está em dia. As próximas revisões aparecem na agenda abaixo.' : 'Responda algumas questões — elas entram aqui automaticamente.'}
          </Empty>
        </div>
      )}

      {info.tracked > 0 && (
        <>
          <Section title="Próximos 14 dias">
            <Card className="p-5">
              <div className="flex h-36 items-end gap-1.5 sm:gap-2.5">
                {info.days.map((d, i) => {
                  const [y, m, dd] = d.key.split('-').map(Number);
                  const date = new Date(y, m - 1, dd);
                  return (
                    <div key={d.key} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5" title={`${plural(d.n, 'questão', 'questões')} em ${date.toLocaleDateString('pt-BR')}`}>
                      <span className="tabular text-[11px] text-ink-3">{d.n || ''}</span>
                      <div className={cx('w-full max-w-8 rounded-md', d.n ? 'bg-accent' : 'bg-surface-3')} style={{ height: d.n ? `${Math.max(8, (d.n / max) * 100)}%` : '4px', opacity: i === 0 ? 1 : 0.85 }} />
                      <span className="tabular text-[11px] text-ink-3">{dd}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </Section>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Card className="p-5">
              <p className="text-[12.5px] text-ink-3">Em revisão</p>
              <p className="font-display tabular text-3xl font-semibold">{info.tracked}</p>
            </Card>
            <Card className="p-5">
              <p className="text-[12.5px] text-ink-3">Consolidadas</p>
              <p className="font-display tabular text-3xl font-semibold">{info.mature}</p>
              <p className="text-[12px] text-ink-3">intervalo ≥ 21 dias</p>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
