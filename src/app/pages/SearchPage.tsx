import { useDeferredValue, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Search, X } from 'lucide-react';
import type { SubjectId } from '../../data/schema';
import { useBank } from '../core/bank';
import { useStudy } from '../core/store';
import { fold, plural } from '../core/text';
import { navigate, useRoute } from '../router';
import { QuestionList } from '../question/QuestionList';
import { activeSubjects } from '../subjects';
import { Chip, Empty, Loading, PageHeader } from '../ui';

const LIMIT = 60;

export default function SearchPage() {
  const bank = useBank();
  const data = useStudy();
  const route = useRoute();
  const [q, setQ] = useState(route.query.get('q') ?? '');
  const [subject, setSubject] = useState<SubjectId | null>(null);
  const [inAnswers, setInAnswers] = useState(false);
  const deferred = useDeferredValue(q);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => input.current?.focus(), []);
  useEffect(() => {
    const id = setTimeout(() => navigate(deferred.trim() ? `busca?q=${encodeURIComponent(deferred.trim())}` : 'busca', { replace: true }), 300);
    return () => clearTimeout(id);
  }, [deferred]);

  const index = useMemo(
    () => bank.all.map(x => ({ q: x, main: fold([x.stem, ...(x.options ?? []), ...(x.statements ?? []), x.topic, x.subtopic, x.source, x.ref].filter(Boolean).join(' ')), expl: fold(x.explanation) })),
    [bank],
  );

  const terms = useMemo(() => fold(deferred).split(/\s+/).filter(t => t.length > 1), [deferred]);
  const results = useMemo(() => {
    if (!terms.length) return [];
    return index
      .filter(e => (!subject || e.q.subject === subject) && terms.every(t => e.main.includes(t) || (inAnswers && e.expl.includes(t))))
      .map(e => e.q);
  }, [index, terms, subject, inAnswers]);

  const highlight = (text: string): ReactNode => {
    if (!terms.length) return text;
    const folded = fold(text);
    const marks: [number, number][] = [];
    for (const t of terms) {
      let i = folded.indexOf(t);
      while (i >= 0) {
        marks.push([i, i + t.length]);
        i = folded.indexOf(t, i + t.length);
      }
    }
    if (!marks.length) return text;
    marks.sort((a, b) => a[0] - b[0]);
    const out: ReactNode[] = [];
    let pos = 0;
    marks.forEach(([s, e], k) => {
      if (s < pos) return;
      out.push(text.slice(pos, s), <mark key={k} className="rounded bg-warn-soft px-0.5 text-ink">{text.slice(s, e)}</mark>);
      pos = e;
    });
    out.push(text.slice(pos));
    return out;
  };

  return (
    <>
      <PageHeader eyebrow={`Busca · ${bank.exam}`} title="Encontrar questões" />
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-3" />
        <input
          ref={input}
          type="text"
          inputMode="search"
          enterKeyHint="search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Ex.: estenose aórtica, antagonista competitivo, SOAP…"
          className="h-14 w-full rounded-2xl border border-line bg-surface pr-12 pl-12 text-[16px] shadow-card outline-none placeholder:text-ink-3 focus:border-accent"
          aria-label="Buscar no banco de questões"
        />
        {q && (
          <button type="button" aria-label="Limpar" onClick={() => setQ('')} className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-ink-3 hover:bg-surface-2">
            <X className="size-4" />
          </button>
        )}
      </div>
      <div className="scrollbar-none -mx-4 mb-6 flex gap-2 overflow-x-auto px-4">
        <Chip active={!subject} onClick={() => setSubject(null)}>
          Todas
        </Chip>
        {activeSubjects(bank).map(s => (
          <Chip key={s.id} color={s.color} active={subject === s.id} onClick={() => setSubject(subject === s.id ? null : s.id)}>
            {s.short}
          </Chip>
        ))}
        <span className="mx-1 w-px shrink-0 bg-line" />
        <Chip active={inAnswers} onClick={() => setInAnswers(!inAnswers)}>
          Incluir gabaritos
        </Chip>
      </div>

      {!bank.ready ? (
        <Loading />
      ) : !terms.length ? (
        <p className="text-[14px] text-ink-3">Busque em {plural(bank.all.length, 'questão', 'questões')} — enunciados, alternativas e temas. Acentos são ignorados.</p>
      ) : results.length ? (
        <>
          <p className="mb-3 text-[13px] text-ink-3">
            {plural(results.length, 'resultado', 'resultados')}
            {results.length > LIMIT && ` · mostrando os primeiros ${LIMIT}`}
          </p>
          <QuestionList items={results.slice(0, LIMIT)} states={data.questions} highlight={highlight} />
        </>
      ) : (
        <Empty icon={<Search className="size-5" />} title="Nada encontrado">
          Tente outras palavras{inAnswers ? '' : ' ou inclua os gabaritos na busca'}.
        </Empty>
      )}
    </>
  );
}
