import { useMemo, useState } from 'react';
import { Bookmark, BookmarkX, Play } from 'lucide-react';
import type { SubjectId } from '../../data/schema';
import { useBank } from '../core/bank';
import { study, useStudy } from '../core/store';
import { QuestionList } from '../question/QuestionList';
import { SUBJECT_LIST } from '../subjects';
import { Button, Chip, Empty, IconButton, Loading, PageHeader } from '../ui';
import { startSession } from './SessionPage';

export default function FavoritesPage() {
  const bank = useBank();
  const data = useStudy();
  const [subject, setSubject] = useState<SubjectId | null>(null);
  const base = useMemo(() => bank.all.filter(q => data.questions[q.id]?.favorite), [bank, data]);
  const list = subject ? base.filter(q => q.subject === subject) : base;

  if (!bank.ready) return <Loading />;

  return (
    <>
      <PageHeader
        eyebrow="Favoritos"
        title="Questões salvas"
        actions={
          list.length > 0 ? (
            <Button variant="primary" icon={<Play className="size-4 fill-current" />} onClick={() => startSession('favoritos', 'Favoritas', list.map(q => q.id))}>
              Praticar {list.length}
            </Button>
          ) : undefined
        }
      >
        Salve questões importantes com o marcador durante o estudo para encontrá-las aqui.
      </PageHeader>

      {base.length > 0 && (
        <div className="scrollbar-none -mx-4 mb-6 flex gap-2 overflow-x-auto px-4">
          <Chip active={!subject} onClick={() => setSubject(null)} count={base.length}>
            Todas
          </Chip>
          {SUBJECT_LIST.map(s => {
            const n = base.filter(q => q.subject === s.id).length;
            return n ? (
              <Chip key={s.id} color={s.color} active={subject === s.id} onClick={() => setSubject(subject === s.id ? null : s.id)} count={n}>
                {s.short}
              </Chip>
            ) : null;
          })}
        </div>
      )}

      {list.length ? (
        <QuestionList
          items={list}
          states={data.questions}
          aside={q => (
            <IconButton label="Remover dos favoritos" onClick={() => study.toggleFavorite(q.id)}>
              <BookmarkX className="size-4" />
            </IconButton>
          )}
        />
      ) : (
        <Empty icon={<Bookmark className="size-5" />} title="Nenhuma questão salva">
          Toque no marcador no canto da questão para guardá-la aqui.
        </Empty>
      )}
    </>
  );
}
