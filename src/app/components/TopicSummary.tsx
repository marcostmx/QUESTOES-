import { useMemo, useState } from 'react';
import { BookOpenText } from 'lucide-react';
import type { ExamId, SubjectId } from '../../data/schema';
import { hasSummaryFile, useSummary } from '../core/summaries';
import { renderMarkdown } from '../core/text';
import { Button, cx, Dialog } from '../ui';

/** Botão "Resumo do tema" que abre o resumo de 1 página num diálogo. */
export function TopicSummaryButton({ exam, subject, topic, className, size = 'sm', label }: { exam: ExamId; subject: SubjectId; topic?: string; className?: string; size?: 'sm' | 'md'; label?: string }) {
  if (!topic || !hasSummaryFile(exam, subject)) return null;
  return <Inner exam={exam} subject={subject} topic={topic} className={className} size={size} label={label} />;
}

function Inner({ exam, subject, topic, className, size, label }: { exam: ExamId; subject: SubjectId; topic: string; className?: string; size: 'sm' | 'md'; label?: string }) {
  const [open, setOpen] = useState(false);
  const text = useSummary(exam, subject, topic);
  const html = useMemo(() => (text ? renderMarkdown(text) : ''), [text]);
  if (text === null) return null;
  return (
    <>
      <Button size={size} variant="ghost" className={cx('text-accent', className)} icon={<BookOpenText className="size-4" />} onClick={() => setOpen(true)} disabled={!text}>
        {label ?? 'Resumo do tema'}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} title={`Resumo · ${topic}`} wide>
        <div className="prose-q prose-summary px-5 py-5 sm:px-8 sm:py-7" dangerouslySetInnerHTML={{ __html: html }} />
      </Dialog>
    </>
  );
}
