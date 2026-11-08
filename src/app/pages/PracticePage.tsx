import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Layers, Play, Shuffle } from 'lucide-react';
import { isObjective, type QuestionKind, type QuestionOrigin, type SubjectId } from '../../data/schema';
import { topicsOf, useBank } from '../core/bank';
import { defaultFilter, filterQuestions, useSession, type PracticeFilter, type StatusFilter } from '../core/session';
import { isDue } from '../core/srs';
import { isAnswered, isOpenError } from '../core/study';
import { today, useStudy } from '../core/store';
import { plural } from '../core/text';
import { href } from '../router';
import { KIND_LABEL, ORIGIN_LABEL, activeSubjects, subjectMeta } from '../subjects';
import { Bar, Button, Card, Chip, cx, Empty, Loading, PageHeader } from '../ui';
import { startSession } from './SessionPage';
import { WeakSpots } from '../components/WeakSpots';

export default function PracticePage({ subject }: { subject?: string }) {
  if (!subject) return <SubjectPicker />;
  const subjects: SubjectId[] = subject === 'todas' ? [] : subjectMeta(subject) ? [subject as SubjectId] : [];
  return <BuilderForExam subject={subject} subjects={subjects} />;
}

export function ResumeBanner() {
  const s = useSession();
  if (!s || s.finishedAt) return null;
  const answered = s.questionIds.filter(id => s.answers[id]?.result).length;
  return (
    <a href={href('sessao')} className="group mb-8 flex items-center gap-4 rounded-2xl border border-accent/30 bg-accent-soft px-5 py-4 transition hover:border-accent">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-ink">
        <Play className="size-4 fill-current" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] text-accent">Sessão em andamento · {s.exam}</span>
        <span className="block truncate font-semibold text-ink">{s.title}</span>
      </span>
      <span className="tabular hidden text-[13px] text-ink-2 sm:block">
        {answered}/{s.questionIds.length}
      </span>
      <ArrowRight className="size-5 text-accent transition group-hover:translate-x-0.5" />
    </a>
  );
}

function SubjectPicker() {
  const bank = useBank();
  const data = useStudy();
  if (!bank.ready) return <Loading />;

  return (
    <>
      <PageHeader eyebrow={`Praticar · ${bank.exam}`} title="O que vamos estudar?">
        Escolha uma disciplina para montar a sessão com filtros por situação, formato e tema.
      </PageHeader>
      <ResumeBanner />
      <WeakSpots bank={bank} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {activeSubjects(bank).map(s => {
          const qs = bank.bySubject[s.id];
          const answered = qs.filter(q => isAnswered(data.questions[q.id])).length;
          const att = qs.reduce((a, q) => a + (data.questions[q.id]?.attempts ?? 0), 0);
          const cor = qs.reduce((a, q) => a + (data.questions[q.id]?.correctCount ?? 0), 0);
          return (
            <a key={s.id} href={href(`praticar/${s.id}`)} className="group">
              <Card className="flex h-full flex-col p-5 transition group-hover:border-line-strong group-hover:shadow-card">
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl" style={{ background: `color-mix(in srgb, ${s.color} 14%, transparent)`, color: s.color }}>
                    <s.icon className="size-5" />
                  </span>
                  <ArrowRight className="size-4 text-ink-3 transition group-hover:translate-x-0.5 group-hover:text-ink" />
                </div>
                <h3 className="font-display text-xl font-semibold">{s.name}</h3>
                <p className="mt-1 mb-5 text-[13.5px] leading-snug text-ink-2">{s.blurb}</p>
                <div className="mt-auto">
                  <div className="tabular mb-2 flex justify-between text-[12.5px] text-ink-3">
                    <span>
                      {answered} de {qs.length} feitas
                    </span>
                    {att > 0 && <span>{Math.round((cor / att) * 100)}% de acerto</span>}
                  </div>
                  <Bar value={qs.length ? answered / qs.length : 0} color={s.color} />
                </div>
              </Card>
            </a>
          );
        })}
        <a href={href('praticar/todas')} className="group">
          <Card className="flex h-full flex-col justify-between border-dashed bg-transparent p-5 transition group-hover:border-line-strong group-hover:bg-surface">
            <span className="flex size-10 items-center justify-center rounded-xl bg-surface-2 text-ink-2">
              <Layers className="size-5" />
            </span>
            <div className="mt-6">
              <h3 className="font-display text-xl font-semibold">Todas as disciplinas</h3>
              <p className="mt-1 text-[13.5px] text-ink-2">{plural(bank.all.length, 'questão', 'questões')} misturadas, com os mesmos filtros.</p>
            </div>
          </Card>
        </a>
      </div>
    </>
  );
}

const STATUS: { id: StatusFilter; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'nao-respondidas', label: 'Não feitas' },
  { id: 'erradas', label: 'Erradas' },
  { id: 'revisar-hoje', label: 'Revisar hoje' },
  { id: 'favoritas', label: 'Favoritas' },
];
const LIMITS = [10, 20, 40, null] as const;

function toggle<T>(list: T[], v: T): T[] {
  return list.includes(v) ? list.filter(x => x !== v) : [...list, v];
}

/** Recria o formulário ao trocar de prova (temas e contagens mudam). */
function BuilderForExam({ subject, subjects }: { subject: string; subjects: SubjectId[] }) {
  const bank = useBank();
  if (bank.ready && subjects.length === 1 && !bank.bySubject[subjects[0]].length) {
    const meta = subjectMeta(subjects[0]);
    return (
      <Empty icon={<Layers className="size-5" />} title={`${meta?.name ?? 'Esta disciplina'} não tem questões na ${bank.exam}`} action={<Button to="praticar">Ver disciplinas</Button>}>
        Troque a prova no seletor do menu para ver as questões de outra prova.
      </Empty>
    );
  }
  return <Builder key={`${subject}:${bank.exam}`} subjects={subjects} />;
}

function Builder({ subjects }: { subjects: SubjectId[] }) {
  const bank = useBank();
  const data = useStudy();
  const [f, setF] = useState<PracticeFilter>(() => ({ ...defaultFilter(subjects), limit: 20 }));
  const t = today();
  const meta = subjects.length === 1 ? subjectMeta(subjects[0]) : undefined;

  const pool = useMemo(() => (subjects.length ? bank.all.filter(q => subjects.includes(q.subject)) : bank.all), [bank, subjects]);
  const counts = useMemo(() => {
    const c = { todas: pool.length, 'nao-respondidas': 0, erradas: 0, 'revisar-hoje': 0, favoritas: 0 } as Record<StatusFilter, number>;
    const kinds: Partial<Record<QuestionKind, number>> = {};
    const origins: Partial<Record<QuestionOrigin, number>> = {};
    let mcq = 0;
    for (const q of pool) {
      const s = data.questions[q.id];
      if (!isAnswered(s)) c['nao-respondidas']++;
      if (isOpenError(s)) c.erradas++;
      if (isDue(s?.srs, t)) c['revisar-hoje']++;
      if (s?.favorite) c.favoritas++;
      kinds[q.kind] = (kinds[q.kind] ?? 0) + 1;
      if (isObjective(q)) mcq++;
      if (q.origin) origins[q.origin] = (origins[q.origin] ?? 0) + 1;
    }
    return { status: c, kinds, origins, mcq, open: pool.length - mcq };
  }, [pool, data, t]);
  const topics = useMemo(() => topicsOf(pool), [pool]);

  const all = useMemo(() => filterQuestions(bank.all, data, { ...f, order: 'banco', limit: null }, t), [bank, data, f, t]);
  const size = f.limit ? Math.min(f.limit, all.length) : all.length;

  if (!bank.ready) return <Loading />;

  const title = meta ? meta.name : 'Todas as disciplinas';
  const start = () => {
    const list = filterQuestions(bank.all, data, f, t);
    const label = STATUS.find(s => s.id === f.status)!.label;
    startSession('pratica', f.status === 'todas' ? title : `${title} · ${label}`, list.map(q => q.id));
  };

  return (
    <>
      <a href={href('praticar')} className="mb-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-3 hover:text-ink">
        <ArrowLeft className="size-4" /> Disciplinas
      </a>
      <PageHeader eyebrow={`Montar sessão · ${bank.exam}`} title={title}>
        {meta?.blurb ?? `Questões de todas as disciplinas da ${bank.exam}.`}
      </PageHeader>
      <ResumeBanner />

      <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:gap-10">
        <div className="flex flex-col gap-8">
          <Group label="Situação">
            {STATUS.map(s => (
              <Chip key={s.id} active={f.status === s.id} onClick={() => setF({ ...f, status: s.id })} count={counts.status[s.id]}>
                {s.label}
              </Chip>
            ))}
          </Group>
          <Group label="Formato" hint="Nenhum marcado = todos">
            <Chip active={f.formats.includes('objetiva')} onClick={() => setF({ ...f, formats: toggle(f.formats, 'objetiva') })} count={counts.mcq}>
              Objetivas
            </Chip>
            <Chip active={f.formats.includes('aberta')} onClick={() => setF({ ...f, formats: toggle(f.formats, 'aberta') })} count={counts.open}>
              Abertas
            </Chip>
          </Group>
          {Object.keys(counts.origins).length > 1 && (
            <Group label="Origem" hint="Nenhuma marcada = todas">
              {(Object.entries(counts.origins) as [QuestionOrigin, number][]).map(([o, n]) => (
                <Chip key={o} active={f.origins.includes(o)} onClick={() => setF({ ...f, origins: toggle(f.origins, o) })} count={n}>
                  {ORIGIN_LABEL[o]}
                </Chip>
              ))}
            </Group>
          )}
          {Object.keys(counts.kinds).length > 1 && (
            <Group label="Estilo" hint="Nenhum marcado = todos">
              {(Object.entries(counts.kinds) as [QuestionKind, number][]).map(([k, n]) => (
                <Chip key={k} active={f.kinds.includes(k)} onClick={() => setF({ ...f, kinds: toggle(f.kinds, k) })} count={n}>
                  {KIND_LABEL[k]}
                </Chip>
              ))}
            </Group>
          )}
          {topics.length > 0 && (
            <Group label="Tema">
              {topics.map(tp => (
                <Chip key={tp} active={f.topics.includes(tp)} onClick={() => setF({ ...f, topics: toggle(f.topics, tp) })} count={pool.filter(q => q.topic === tp).length}>
                  {tp}
                </Chip>
              ))}
            </Group>
          )}
          {!subjects.length && (
            <Group label="Disciplinas" hint="Nenhuma marcada = todas">
              {activeSubjects(bank).map(s => (
                <Chip key={s.id} color={s.color} active={f.subjects.includes(s.id)} onClick={() => setF({ ...f, subjects: toggle(f.subjects, s.id) })} count={bank.bySubject[s.id].length}>
                  {s.short}
                </Chip>
              ))}
            </Group>
          )}
        </div>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <Card className="p-5">
            <p className="mb-2 text-[13px] font-medium text-ink-2">Quantidade</p>
            <div className="mb-5 grid grid-cols-4 gap-1 rounded-xl bg-surface-2 p-1">
              {LIMITS.map(l => (
                <button
                  key={String(l)}
                  type="button"
                  onClick={() => setF({ ...f, limit: l })}
                  className={cx('tabular h-9 rounded-lg text-[13px] font-medium transition', f.limit === l ? 'bg-surface text-ink shadow-card' : 'text-ink-2 hover:text-ink')}
                >
                  {l ?? 'Todas'}
                </button>
              ))}
            </div>
            <p className="mb-2 text-[13px] font-medium text-ink-2">Ordem</p>
            <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-surface-2 p-1">
              {(['banco', 'aleatoria'] as const).map(o => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setF({ ...f, order: o })}
                  className={cx('flex h-9 items-center justify-center gap-1.5 rounded-lg text-[13px] font-medium transition', f.order === o ? 'bg-surface text-ink shadow-card' : 'text-ink-2 hover:text-ink')}
                >
                  {o === 'aleatoria' && <Shuffle className="size-3.5" />}
                  {o === 'banco' ? 'Do banco' : 'Aleatória'}
                </button>
              ))}
            </div>
            <div className="mb-4 flex items-baseline justify-between border-t border-line pt-4">
              <span className="text-[13px] text-ink-2">Na sessão</span>
              <span className="font-display tabular text-3xl font-semibold">{size}</span>
            </div>
            <Button variant="primary" size="lg" className="w-full" disabled={size === 0} onClick={start} icon={<Play className="size-4 fill-current" />}>
              Começar
            </Button>
            {size === 0 && <p className="mt-3 text-center text-[13px] text-ink-3">Nenhuma questão com esses filtros.</p>}
          </Card>
        </aside>
      </div>
    </>
  );
}

function Group({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 flex items-baseline gap-2 text-[14px] font-semibold">
        {label}
        {hint && <span className="text-[12px] font-normal text-ink-3">{hint}</span>}
      </legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}
