import { useRef, useState } from 'react';
import { Cloud, CloudOff, Download, LogOut, RefreshCw, Trash2, Upload } from 'lucide-react';
import { useBank } from '../core/bank';
import type { StudyData } from '../core/study';
import { preferences, study, usePrefs, useStudy, type ThemePref } from '../core/store';
import { login, logout, syncNow, useSync } from '../core/sync';
import { activeSubjects } from '../subjects';
import { Button, Card, cx, Dialog, PageHeader, Section, Spinner, toast } from '../ui';

export default function AccountPage() {
  const sync = useSync();
  const prefs = usePrefs();
  const data = useStudy();
  const bank = useBank();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{ label: string; ids?: string[] } | null>(null);
  const file = useRef<HTMLInputElement>(null);

  const doLogin = async () => {
    setBusy(true);
    setErr(await login());
    setBusy(false);
  };

  const exportBackup = () => {
    const blob = new Blob([JSON.stringify({ app: 'estudo-pr1', exportedAt: new Date().toISOString(), data }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `estudo-pr1-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importBackup = async (f: File) => {
    try {
      const parsed = JSON.parse(await f.text());
      const d: StudyData = parsed?.data ?? parsed;
      if (d?.version !== 2 || typeof d.questions !== 'object') throw new Error('formato');
      study.mergeRemote(d);
      study.replace(study.get()); // salva e agenda envio para a nuvem
      toast('Backup importado e mesclado');
    } catch {
      toast('Arquivo inválido — use um backup exportado por esta versão do app');
    }
  };

  const answered = Object.values(data.questions).filter(s => s.attempts > 0).length;

  return (
    <>
      <PageHeader eyebrow="Conta" title="Conta e dados" />

      <Section title="Sincronização">
        <Card className="p-5 sm:p-6">
          {!sync.ready ? (
            <div className="flex items-center gap-3 text-sm text-ink-2">
              <Spinner /> Verificando login…
            </div>
          ) : sync.user ? (
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                {sync.user.photo ? (
                  <img src={sync.user.photo} alt="" className="size-12 rounded-full" referrerPolicy="no-referrer" />
                ) : (
                  <span className="flex size-12 items-center justify-center rounded-full bg-accent-soft text-lg font-semibold text-accent">{sync.user.name[0]}</span>
                )}
                <div className="min-w-0">
                  <p className="truncate font-semibold">{sync.user.name}</p>
                  <p className="truncate text-[13px] text-ink-3">{sync.user.email}</p>
                  <p className={cx('mt-1 flex items-center gap-1.5 text-[12.5px]', sync.status === 'error' ? 'text-bad' : 'text-ink-2')}>
                    {sync.status === 'error' || sync.status === 'offline' ? <CloudOff className="size-3.5" /> : <Cloud className="size-3.5" />}
                    {sync.status === 'syncing'
                      ? 'Sincronizando…'
                      : sync.status === 'offline'
                        ? 'Sem conexão — os dados ficam salvos aqui e sobem depois'
                        : sync.status === 'error'
                          ? 'Falha ao sincronizar'
                          : sync.lastSync
                            ? `Sincronizado às ${new Date(sync.lastSync).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
                            : 'Conectado'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" icon={<RefreshCw className={cx('size-3.5', sync.status === 'syncing' && 'animate-spin')} />} onClick={() => syncNow()}>
                  Sincronizar
                </Button>
                <Button size="sm" variant="ghost" icon={<LogOut className="size-3.5" />} onClick={() => logout()}>
                  Sair
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">Entre para salvar na nuvem</p>
                <p className="mt-1 max-w-md text-[14px] text-ink-2">Sem login, seu progresso fica só neste navegador. Com a conta Google ele acompanha você no celular e no computador.</p>
              </div>
              <Button variant="primary" onClick={doLogin} disabled={busy}>
                {busy ? <Spinner className="size-4 border-white/40 border-t-white" /> : <GoogleMark />}
                Entrar com Google
              </Button>
            </div>
          )}
          {(err || (sync.status === 'error' && sync.error)) && <p className="mt-4 rounded-xl bg-bad-soft px-3 py-2 text-[13px] text-bad">{err ?? sync.error}</p>}
        </Card>
      </Section>

      <Section title="Aparência">
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-surface-2 p-1 sm:max-w-sm">
          {(
            [
              ['system', 'Sistema'],
              ['light', 'Claro'],
              ['dark', 'Escuro'],
            ] as [ThemePref, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => preferences.set({ theme: id })}
              className={cx('h-10 rounded-lg text-[14px] font-medium transition', prefs.theme === id ? 'bg-surface text-ink shadow-card' : 'text-ink-2 hover:text-ink')}
            >
              {label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Backup">
        <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="max-w-md text-[14px] text-ink-2">Baixe um arquivo com todo o seu progresso ({answered} questões respondidas) ou importe um backup anterior — os dados são mesclados, nada é perdido.</p>
          <div className="flex gap-2">
            <Button size="sm" icon={<Download className="size-3.5" />} onClick={exportBackup}>
              Exportar
            </Button>
            <Button size="sm" icon={<Upload className="size-3.5" />} onClick={() => file.current?.click()}>
              Importar
            </Button>
            <input
              ref={file}
              type="file"
              accept="application/json,.json"
              hidden
              onChange={e => {
                const f = e.target.files?.[0];
                if (f) void importBackup(f);
                e.target.value = '';
              }}
            />
          </div>
        </Card>
      </Section>

      <Section title={`Zerar progresso da ${bank.exam}`}>
        <Card className="divide-y divide-line">
          {activeSubjects(bank).map(s => {
            const ids = bank.bySubject[s.id].map(q => q.id);
            const n = ids.filter(id => data.questions[id]).length;
            return (
              <div key={s.id} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                <span className="size-2.5 rounded-full" style={{ background: s.color }} />
                <span className="flex-1 text-[14px]">{s.name}</span>
                <span className="tabular text-[12.5px] text-ink-3">{n} com progresso</span>
                <Button size="sm" variant="ghost" disabled={!n} onClick={() => setConfirm({ label: s.name, ids })}>
                  Zerar
                </Button>
              </div>
            );
          })}
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <span className="text-[14px] font-medium text-bad">Tudo, de todas as provas (inclui favoritos, notas e histórico)</span>
            <Button size="sm" variant="danger" icon={<Trash2 className="size-3.5" />} onClick={() => setConfirm({ label: 'todas as disciplinas' })}>
              Zerar tudo
            </Button>
          </div>
        </Card>
      </Section>

      <p className="text-[12.5px] text-ink-3">
        Estudo PR · {bank.exam}: {bank.all.length} questões em {activeSubjects(bank).length} disciplinas.
      </p>

      <Dialog open={!!confirm} onClose={() => setConfirm(null)} title="Zerar progresso?">
        <div className="p-5">
          <p className="text-[14.5px] text-ink-2">
            Isso apaga respostas, revisões, favoritos e anotações de <strong className="text-ink">{confirm?.label}</strong>
            {sync.user ? ' neste e nos outros dispositivos conectados' : ''}. Não dá para desfazer — exporte um backup antes, se quiser.
          </p>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setConfirm(null)}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                study.reset(confirm?.ids);
                setConfirm(null);
                toast('Progresso zerado');
              }}
            >
              Zerar
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path fill="#fff" d="M21.35 11.1H12v2.98h5.38c-.23 1.4-1.66 4.1-5.38 4.1-3.24 0-5.88-2.68-5.88-5.98S8.76 6.22 12 6.22c1.84 0 3.08.79 3.78 1.46l2.58-2.48C16.7 3.66 14.56 2.7 12 2.7 6.87 2.7 2.7 6.87 2.7 12s4.17 9.3 9.3 9.3c5.37 0 8.93-3.77 8.93-9.09 0-.61-.07-1.08-.16-1.11Z" />
    </svg>
  );
}
