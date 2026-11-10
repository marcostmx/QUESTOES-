import { useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, ClipboardList, Pencil } from 'lucide-react';
import type { Bank } from '../core/bank';
import { studyPlan, todayBlock } from '../core/plan';
import { preferences, today, usePrefs, useStudy } from '../core/store';
import { plural } from '../core/text';
import { href } from '../router';
import { subjectMeta } from '../subjects';
import { Bar, Button, Card } from '../ui';
import { startSession } from '../pages/SessionPage';

/** Questões por sessão do bloco (dá para fazer o bloco em partes ao longo do dia). */
const BLOCK = 30;

/** Plano até a prova: data da prova → questões novas por dia e o bloco de hoje. */
export function PlanCard({ bank }: { bank: Bank }) {
  const prefs = usePrefs();
  const data = useStudy();
  const t = today();
  const date = prefs.examDates?.[bank.exam];
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(date ?? '');
  const plan = useMemo(() => (date ? studyPlan(bank.all, data, t, date) : null), [bank, data, t, date]);

  const save = () => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(draft)) return;
    preferences.set({ examDates: { ...prefs.examDates, [bank.exam]: draft } });
    setEditing(false);
  };

  if (!plan || editing)
    return (
      <Card className="mb-10 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <CalendarDays className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">Quando é a {bank.exam}?</p>
          <p className="text-[13.5px] text-ink-2">Com a data, o app divide as questões que faltam pelos dias até a prova e monta o bloco de cada dia.</p>
        </div>
        <form
          className="flex items-center gap-2"
          onSubmit={e => {
            e.preventDefault();
            save();
          }}
        >
          <input
            type="date"
            value={draft}
            min={t}
            onChange={e => setDraft(e.target.value)}
            aria-label={`Data da ${bank.exam}`}
            className="h-11 rounded-xl border border-line bg-surface px-3 text-[14px] outline-none focus:border-accent"
          />
          <Button variant="primary" type="submit" disabled={!draft}>
            Salvar
          </Button>
        </form>
      </Card>
    );

  const when = new Date(date + 'T12:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
  const left = plan.daysLeft;

  if (left < 0)
    return (
      <Card className="mb-10 flex items-center gap-4 p-5 sm:p-6">
        <CalendarDays className="size-5 text-ink-3" />
        <p className="flex-1 text-[14px] text-ink-2">A {bank.exam} foi em {when}. Atualize a data se ela mudou.</p>
        <Button size="sm" onClick={() => setEditing(true)}>
          Alterar
        </Button>
      </Card>
    );

  const finalStretch = left <= 2;
  const doneShare = bank.all.length ? 1 - plan.fresh / bank.all.length : 0;

  return (
    <Card className="mb-10 p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-[13px] font-medium text-ink-3">
            <CalendarDays className="size-4" /> Plano até a {bank.exam} · {when}
          </p>
          <p className="font-display mt-2 text-3xl font-semibold">{left === 0 ? 'A prova é hoje.' : left === 1 ? 'A prova é amanhã.' : `Faltam ${left} dias.`}</p>
        </div>
        <button type="button" onClick={() => { setDraft(date ?? ''); setEditing(true); }} className="flex size-9 items-center justify-center rounded-lg text-ink-3 hover:bg-surface-2 hover:text-ink" aria-label="Alterar data da prova">
          <Pencil className="size-4" />
        </button>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <Bar value={doneShare} className="flex-1" />
        <span className="tabular shrink-0 text-[13px] text-ink-2">
          {bank.all.length - plan.fresh}/{bank.all.length} feitas
        </span>
      </div>

      {finalStretch || plan.fresh === 0 ? (
        <>
          <p className="mb-4 text-[14.5px] text-ink-2">
            {plan.fresh === 0 ? 'Você já fez todas as questões do banco. ' : 'Reta final: '}
            agora o melhor uso do tempo é revisar os erros e fazer simulados.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" to="simulado" icon={<ClipboardList className="size-4" />}>
              Fazer um simulado
            </Button>
            <Button to="erros">Caderno de erros</Button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-3 text-[14.5px] text-ink-2">
            Para terminar o banco até a véspera: <strong className="text-ink">{plural(plan.perDay, 'questão nova', 'questões novas')} por dia</strong>
            {plan.doneToday > 0 && <> · {plan.doneToday} feitas hoje</>}.
          </p>
          <div className="mb-5 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-ink-3">
            {plan.subjects.filter(s => s.fresh).map(s => {
              const m = subjectMeta(s.subject);
              return (
                <span key={s.subject} className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full" style={{ background: m?.color }} />
                  {m?.short} {s.fresh} pendentes{s.rate !== null && s.rate < 0.7 ? ' · reforçar' : ''}
                </span>
              );
            })}
          </div>
          {plan.leftToday > 0 ? (
            <Button
              variant="primary"
              onClick={() => startSession('pratica', `Bloco do dia · ${bank.exam}`, todayBlock(bank.all, data, plan, Math.min(plan.leftToday, BLOCK)).map(q => q.id))}
            >
              {plan.leftToday > BLOCK ? `Fazer as próximas ${BLOCK} de ${plan.leftToday}` : `Fazer o bloco de hoje (${plan.leftToday})`} <ArrowRight className="size-4" />
            </Button>
          ) : (
            <p className="text-[14px] font-medium text-good">
              Bloco de hoje concluído. Se sobrar tempo, faça a revisão do dia ou um <a className="underline" href={href('simulado')}>simulado</a>.
            </p>
          )}
        </>
      )}
    </Card>
  );
}
