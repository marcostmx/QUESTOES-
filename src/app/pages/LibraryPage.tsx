import { useMemo, useState, useSyncExternalStore } from 'react';
import { BookOpen, Check, ExternalLink, FileImage, FileText, Library, Presentation, Search } from 'lucide-react';
import materialsRaw from '../../data/materials.json';
import { storage } from '../core/store';
import { fold, plural } from '../core/text';
import { subjectMeta, SUBJECT_LIST } from '../subjects';
import { Badge, Button, Card, Chip, cx, Dialog, Empty, PageHeader } from '../ui';

interface Material {
  id: string;
  name: string;
  subject: string;
  kind: 'apostila' | 'prova' | 'lista' | 'slide' | 'gabarito' | 'resumo' | 'outro';
  folder: string;
  mimeType: string;
  exam?: string;
}

const materials = materialsRaw as Material[];

const KIND: Record<Material['kind'], string> = {
  apostila: 'Apostila',
  prova: 'Prova antiga',
  lista: 'Lista',
  slide: 'Slides',
  gabarito: 'Gabarito',
  resumo: 'Resumo',
  outro: 'Outro',
};

const OTHER_SUBJECTS: Record<string, { name: string; color: string }> = {
  gis2: { name: 'GIS 2', color: 'var(--s-gis2)' },
  '': { name: 'Geral', color: 'var(--ink-3)' },
};
const subjectInfo = (id: string) => subjectMeta(id) ?? OTHER_SUBJECTS[id] ?? OTHER_SUBJECTS[''];

/* Marcação "lido" por material, guardada no navegador. */
const READ_KEY = 'pr1.v2.library.read';
let read = new Set<string>(storage.read<string[]>(READ_KEY) ?? []);
const readListeners = new Set<() => void>();
const toggleRead = (id: string) => {
  read = new Set(read);
  read.has(id) ? read.delete(id) : read.add(id);
  storage.write(READ_KEY, [...read]);
  readListeners.forEach(l => l());
};
const useRead = () =>
  useSyncExternalStore(
    l => {
      readListeners.add(l);
      return () => readListeners.delete(l);
    },
    () => read,
  );

const prettyName = (n: string) => n.replace(/\.(pdf|png|jpe?g|pptx?)$/i, '').replace(/[_]+/g, ' ').replace(/\s*\(\d+\)$/, '').trim();

function FileIcon({ m }: { m: Material }) {
  const Icon = m.mimeType.startsWith('image/') ? FileImage : m.kind === 'slide' || m.mimeType.includes('presentation') ? Presentation : m.kind === 'apostila' ? BookOpen : FileText;
  return <Icon className="size-[18px]" />;
}

export default function LibraryPage() {
  const readSet = useRead();
  const [subject, setSubject] = useState<string | null>(null);
  const [kind, setKind] = useState<Material['kind'] | null>(null);
  const [q, setQ] = useState('');
  const [hideImages, setHideImages] = useState(true);
  const [open, setOpen] = useState<Material | null>(null);

  const subjects = useMemo(() => {
    const ids = [...new Set(materials.map(m => m.subject))];
    const order = [...SUBJECT_LIST.map(s => s.id as string), 'gis2', ''];
    return ids.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }, []);

  const base = materials.filter(m => !hideImages || !m.mimeType.startsWith('image/'));
  const list = base.filter(m => (!subject || m.subject === subject) && (!kind || m.kind === kind) && (!q.trim() || fold(m.name + ' ' + m.folder).includes(fold(q.trim()))));
  const groups = useMemo(() => {
    const g = new Map<string, Material[]>();
    for (const m of list) g.set(m.folder, [...(g.get(m.folder) ?? []), m]);
    return [...g.entries()];
  }, [list]);
  const images = materials.filter(m => m.mimeType.startsWith('image/')).length;

  return (
    <>
      <PageHeader eyebrow="Biblioteca" title="Materiais do semestre">
        Apostilas, slides, provas antigas e resumos da pasta do Drive da turma — abra direto aqui, sem sair do app.
      </PageHeader>

      <div className="relative mb-4">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-3" />
        <input
          type="search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Filtrar por nome ou pasta"
          className="h-11 w-full rounded-xl border border-line bg-surface pr-4 pl-10 text-[15px] outline-none placeholder:text-ink-3 focus:border-accent sm:max-w-md"
        />
      </div>
      <div className="mb-3 flex flex-col gap-2">
        <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4">
          <Chip active={!subject} onClick={() => setSubject(null)}>
            Todas
          </Chip>
          {subjects.map(id => {
            const info = subjectInfo(id);
            return (
              <Chip key={id || 'geral'} color={info.color} active={subject === id} onClick={() => setSubject(subject === id ? null : id)} count={base.filter(m => m.subject === id).length}>
                {'short' in info ? (info as any).short : info.name}
              </Chip>
            );
          })}
        </div>
        <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4">
          {(Object.keys(KIND) as Material['kind'][])
            .filter(k => base.some(m => m.kind === k))
            .map(k => (
              <Chip key={k} active={kind === k} onClick={() => setKind(kind === k ? null : k)}>
                {KIND[k]}
              </Chip>
            ))}
          {images > 0 && (
            <>
              <span className="mx-1 w-px shrink-0 bg-line" />
              <Chip active={!hideImages} onClick={() => setHideImages(!hideImages)} count={images}>
                Páginas escaneadas
              </Chip>
            </>
          )}
        </div>
      </div>
      <p className="mb-6 text-[13px] text-ink-3">
        {plural(list.length, 'arquivo', 'arquivos')} · {[...readSet].filter(id => list.some(m => m.id === id)).length} lidos
      </p>

      {groups.length ? (
        <div className="flex flex-col gap-8">
          {groups.map(([folder, items]) => (
            <section key={folder}>
              <h2 className="mb-2.5 text-[12px] font-semibold tracking-wide text-ink-3 uppercase">{folder.replace(/\s*\/\s*/g, ' › ')}</h2>
              <Card className="divide-y divide-line">
                {items.map(m => {
                  const info = subjectInfo(m.subject);
                  const isRead = readSet.has(m.id);
                  return (
                    <div key={m.id} className="flex items-center gap-3 px-3 py-2.5 sm:px-4">
                      <button type="button" onClick={() => setOpen(m)} className="group flex min-w-0 flex-1 items-center gap-3 rounded-xl py-1 text-left">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl" style={{ background: `color-mix(in srgb, ${info.color} 13%, transparent)`, color: info.color }}>
                          <FileIcon m={m} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={cx('block truncate text-[14.5px] font-medium group-hover:text-accent', isRead && 'text-ink-2')}>{prettyName(m.name)}</span>
                          <span className="mt-0.5 flex items-center gap-2 text-[12px] text-ink-3">
                            {KIND[m.kind]}
                            {m.exam && <Badge>{m.exam}</Badge>}
                          </span>
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleRead(m.id)}
                        aria-pressed={isRead}
                        title={isRead ? 'Marcar como não lido' : 'Marcar como lido'}
                        className={cx('flex size-8 shrink-0 items-center justify-center rounded-full border transition', isRead ? 'border-good bg-good text-white' : 'border-line-strong text-transparent hover:text-ink-3')}
                      >
                        <Check className="size-4" />
                      </button>
                    </div>
                  );
                })}
              </Card>
            </section>
          ))}
        </div>
      ) : (
        <Empty icon={<Library className="size-5" />} title="Nenhum material encontrado">
          Ajuste os filtros ou a busca.
        </Empty>
      )}

      <Dialog open={!!open} onClose={() => setOpen(null)} title={open ? prettyName(open.name) : ''} wide>
        {open && (
          <div className="flex flex-col">
            <iframe title={open.name} src={`https://drive.google.com/file/d/${open.id}/preview`} className="h-[70vh] w-full bg-surface-2" allow="autoplay" />
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-3">
              <Button
                size="sm"
                variant={readSet.has(open.id) ? 'good' : 'secondary'}
                icon={<Check className="size-3.5" />}
                onClick={() => toggleRead(open.id)}
              >
                {readSet.has(open.id) ? 'Lido' : 'Marcar como lido'}
              </Button>
              <a
                href={`https://drive.google.com/file/d/${open.id}/view`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium text-accent hover:bg-accent-soft"
              >
                Abrir no Google Drive <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}
