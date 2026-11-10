import { useMemo, useState } from 'react';
import { ClipboardList, Play, Timer } from 'lucide-react';
import type { SubjectId } from '../../data/schema';
import { useBank } from '../core/bank';
import { useExamHistory } from '../core/exams';
import { apportion, buildExam } from '../core/session';
import { useStudy } from '../core/store';
import { plural } from '../core/text';
import { activeSubjects, subjectMeta } from '../subjects';
import { Button, Card, Chip, Empty, Loading, PageHeader, Section } from '../ui';
import { ResumeBanner } from './PracticePage';
import { startSession } from './SessionPage';

const SIZES = [10, 20, 30, 40, 60];
/** Minutos por questão; 0 = sem cronômetro. */
const PACES = [
  { id: 1.5, label: '1,5 min/questão' },
  { id: 2, label: '2 min/questão' },
  { id: 3, label: '3 min/questão' },
  { id: 0, label: 'Sem tempo' },
];

export default function ExamPage() {
  const bank = useBank();
  const data = useStudy();
  const history = useExamHistory();
  const [subjects, setSubjects] = useState<SubjectId[]>([]);
  const [size, setSize] = useState(20);
  const [pace, setPace] = useState(2);
  const [includeOpen, setIncludeOpen] = useState(true);

  const subjectsList = activeSubjects(bank);
  const chosen = subjects.length ? subjects : subjectsList.map(s => s.id);
  const pool = useMemo(() => bank.all.filter(q => chosen.includes(q.subject)), [bank, chosen.join()]);

  /** Prévia: quantas questões de cada tema (proporção das provas antigas). */
  const preview = useMemo(() => {
    const per = apportion(chosen.map(() => 1), size);
    return chosen.map((sid, i) => {
      const qs = pool.filter(q => q.subject === sid);
      const real = qs.filter(q => q.origin === 'prova');
      const ref = real.length ? real : qs;
      const topics = [...new Set(qs.map(q => q.topic ?? ''))];
      const n = Math.min(per[i], qs.length);
      const alloc = apportion(topics.map(t => ref.filter(q => (q.topic ?? '') === t).length || 0.5), n);
      return { sid, n, topics: topics.map((t, j) => ({ t, n: alloc[j] })).filter(x => x.n > 0).sort((a, b) => b.n - a.n) };
    });
  }, [pool, size, chosen.join()]);

  if (!bank.ready) return <Loading />;
  if (!bank.all.length)
    return (
      <Empty icon={<ClipboardList className="size-5" />} title="Sem questões nesta prova">
        Troque a prova no seletor do menu.
      </Empty>
    );

  const minutes = pace ? Math.round(size * pace) : 0;
  const start = () => {
    const qs = buildExam(bank.all, data, { subjects: chosen, size, includeOpen });
    const names = subjects.length === 1 ? subjectMeta(subjects[0])?.name : subjects.length ? subjects.map(s => subjectMeta(s)?.short).join(' + ') : 'Todas as disciplinas';
    startSession('simulado', `Simulado · ${names}`, qs.map(q => q.id), 0, bank.exam, { mode: 'prova', minutes: minutes || undefined });
  };
  const toggle = (id: SubjectId) => setSubjects(l => (l.includes(id) ? l.filter(x => x !== id) : [...l, id]));
  const mine = history.filter(h => h.exam === bank.exam);

  return (
    <>
      <PageHeader eyebrow={`Simulado · ${bank.exam}`} title="Prova de treino">
        Questões sorteadas na mesma proporção de temas das provas antigas, com cronômetro e sem gabarito até entregar. No fim, nota de 0 a 10 e correção questão a questão.
      </PageHeader>
      <ResumeBanner />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Card className="space-y-7 p-5 sm:p-6">
          <div>
            <h3 className="mb-3 text-[14px] font-semibold">Disciplinas</h3>
            <div className="flex flex-wrap gap-2">
              <Chip active={!subjects.length} onClick={() => setSubjects([])}>
                Todas
              </Chip>
              {subjectsList.map(s => (
                <Chip key={s.id} active={subjects.includes(s.id)} color={s.color} onClick={() => toggle(s.id)} count={bank.bySubject[s.id].length}>
                  {s.name}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-[14px] font-semibold">Número de questões</h3>
            <div className="flex flex-wrap gap-2">
              {SIZES.map(n => (
                <Chip key={n} active={size === n} onClick={() => setSize(n)}>
                  {n}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-[14px] font-semibold">Tempo</h3>
            <div className="flex flex-wrap gap-2">
              {PACES.map(p => (
                <Chip key={p.id} active={pace === p.id} onClick={() => setPace(p.id)}>
                  {p.label}
                </Chip>
              ))}
            </div>
          </div>
          <label className="flex cursor-pointer items-center gap-3 text-[14px] select-none">
            <input type="checkbox" checked={includeOpen} onChange={e => setIncludeOpen(e.target.checked)} className="size-4 accent-[var(--accent)]" />
            <span>
              Incluir discursivas <span className="text-ink-3">— na mesma fração das provas; você corrige comparando com a resposta esperada</span>
            </span>
          </label>
          <div className="flex flex-wrap items-center gap-3 border-t border-line pt-5">
            <Button variant="primary" size="lg" icon={<Play className="size-4 fill-current" />} onClick={start} disabled={!pool.length}>
              Começar simulado
            </Button>
            <span className="flex items-center gap-1.5 text-[14px] text-ink-2">
              <Timer className="size-4" />
              {minutes ? `${minutes} minutos` : 'sem cronômetro'} · {plural(size, 'questão', 'questões')}
            </span>
          </div>
        </Card>

        <div className="space-y-6">
          <Section title="Distribuição">
            <Card className="space-y-4 p-5">
              {preview.map(p => {
                const m = subjectMeta(p.sid);
                return (
                  <div key={p.sid}>
                    <p className="mb-1.5 flex justify-between text-[13.5px] font-semibold">
                      <span style={{ color: m?.color }}>{m?.name}</span>
                      <span className="tabular text-ink-2">{p.n}</span>
                    </p>
                    <ul className="space-y-0.5 text-[13px] text-ink-2">
                      {p.topics.map(t => (
                        <li key={t.t} className="tabular flex justify-between gap-3">
                          <span className="truncate">{t.t || 'Sem tema'}</span>
                          <span>{t.n}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </Card>
          </Section>
          {mine.length > 0 && (
            <Section title="Seus simulados">
              <Card className="divide-y divide-line">
                {mine.slice(0, 8).map(h => (
                  <div key={h.id} className="flex items-center justify-between gap-3 px-4 py-3 text-[13.5px]">
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{h.title.replace(/^Simulado · /, '')}</span>
                      <span className="text-[12px] text-ink-3">
                        {new Date(h.date).toLocaleDateString('pt-BR')} · {plural(h.questions, 'questão', 'questões')}
                      </span>
                    </span>
                    <span className={`font-display tabular text-xl font-semibold ${h.grade >= 7 ? 'text-good' : h.grade >= 5 ? 'text-warn' : 'text-bad'}`}>{h.grade.toFixed(1).replace('.', ',')}</span>
                  </div>
                ))}
              </Card>
            </Section>
          )}
        </div>
      </div>
    </>
  );
}
