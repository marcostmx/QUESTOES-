import { useMemo, useRef, useState } from 'react';
import { ArrowLeft, Check, ListChecks, RotateCcw, X } from 'lucide-react';
import { xpCaso } from '../app/core/career';
import { href } from '../app/router';
import { Badge, Card, cx, Ring } from '../app/ui';
import { casoHistory } from './history';
import { Execucao, procPorId } from './procedimentos';

function embaralha<T>(a: T[]) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

export default function ProcedimentoRun({ id }: { id: string }) {
  const p = procPorId(id);
  const [chave, setChave] = useState(0);
  if (!p) return <div className="p-8">Procedimento não encontrado. <a className="text-accent" href={href('casos')}>Voltar</a></div>;
  return <Jogo key={chave} id={id} onRefazer={() => setChave(k => k + 1)} />;
}

function Jogo({ id, onRefazer }: { id: string; onRefazer: () => void }) {
  const ex = useRef(new Execucao(procPorId(id)!)).current;
  const [, render] = useState(0);
  const [aviso, setAviso] = useState<{ ok: boolean; texto: string } | null>(null);
  const salvo = useRef(false);
  const p = ex.p;
  const etapa = ex.etapa;
  const ops = useMemo(() => (etapa ? embaralha([etapa.certa, ...etapa.erradas.map(e => e.texto)]) : []), [etapa]);

  const escolher = (t: string) => {
    const anterior = ex.etapa;
    const r = ex.escolher(t);
    setAviso(r.ok ? { ok: true, texto: anterior.explicacao } : { ok: false, texto: r.porque ?? '' });
    render(n => n + 1);
  };

  if (ex.fim) {
    if (!salvo.current) {
      salvo.current = true;
      casoHistory.save({ key: `proc:${id}:${Date.now()}`, id: `proc-${id}`, date: Date.now(), nota: ex.nota, obito: false, minutos: 0 });
    }
    const cor = ex.nota >= 70 ? 'var(--good)' : ex.nota >= 50 ? 'var(--warn)' : 'var(--bad)';
    return (
      <div className="min-h-dvh bg-bg">
        <div className="mx-auto max-w-2xl px-4 pt-8 pb-16">
          <a href={href('casos')} className="mb-4 inline-flex items-center gap-1 text-[13px] text-ink-3"><ArrowLeft className="size-4" /> Casos</a>
          <div className="mb-6 flex items-center gap-5">
            <Ring value={ex.nota} size={92} stroke={8} color={cor}><span className="font-display text-[26px] font-semibold">{ex.nota}</span></Ring>
            <div>
              <p className="text-[12px] font-medium text-ink-3 uppercase">{p.tipo === 'exame' ? 'Interpretação concluída' : 'Procedimento concluído'}</p>
              <h1 className="font-display text-[24px] font-semibold">{p.titulo}</h1>
              <span className="mt-1 inline-block rounded-md bg-good-soft px-2 py-0.5 text-[12px] font-semibold text-good">+{xpCaso({ nota: ex.nota })} XP</span>
            </div>
          </div>
          <h2 className="mb-2 text-[15px] font-semibold">{p.tipo === 'exame' ? 'Respostas corretas' : 'Sequência correta'}</h2>
          <Card className="mb-6 divide-y divide-line">
            {p.etapas.map((e, k) => {
              const erros = ex.erros.filter(x => x.etapa === k);
              return (
                <div key={k} className="flex gap-3 p-3.5">
                  <span className={cx('mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold', erros.length ? 'bg-bad-soft text-bad' : 'bg-good text-white')}>{k + 1}</span>
                  <div className="min-w-0 text-[14px]">
                    <p className="font-medium">{e.certa}</p>
                    {erros.map(x => <p key={x.texto} className="mt-1 text-[13px] text-bad">Você escolheu: {x.texto} — {x.porque}</p>)}
                  </div>
                </div>
              );
            })}
          </Card>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={onRefazer} className="inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-[14px] font-semibold text-bg"><RotateCcw className="size-4" /> Refazer</button>
            <a href={href('casos')} className="inline-flex h-11 items-center rounded-xl border border-line px-5 text-[14px] font-semibold">Casos clínicos</a>
          </div>
          <p className="mt-6 text-[12px] text-ink-3">Fonte: {p.fonte}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-bg">
      <header className="flex items-center gap-2 border-b border-line px-3 py-2 sm:px-5">
        <a href={href('casos')} aria-label="Sair" className="rounded-lg p-2 text-ink-2 hover:bg-surface-2"><ArrowLeft className="size-5" /></a>
        <p className="min-w-0 flex-1 truncate text-[14px] font-semibold">{p.titulo}</p>
        <Badge>{ex.i + 1}/{p.etapas.length}</Badge>
      </header>
      <div className="mx-auto max-w-2xl px-4 py-5">
        <Card className="mb-4 p-4">
          <p className="mb-1 flex items-center gap-2 text-[12px] font-medium text-ink-3"><ListChecks className="size-4" /> Cenário</p>
          <p className="text-[15px]">{p.contexto}</p>
        </Card>
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-surface-3">
          <div className="h-full rounded-full bg-accent transition-[width]" style={{ width: `${(ex.i / p.etapas.length) * 100}%` }} />
        </div>
        <p className="mb-2 text-[16px] font-semibold">{etapa.pergunta}</p>
        <div className="grid gap-2">
          {ops.map(o => {
            const tentada = ex.tentadas.has(o);
            return (
              <button key={o} type="button" disabled={tentada} onClick={() => escolher(o)}
                className={cx('flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[14px] transition',
                  tentada ? 'border-bad bg-bad-soft text-bad' : 'border-line bg-surface hover:border-line-strong active:scale-[0.99]')}>
                <span className="flex-1">{o}</span>
                {tentada && <X className="size-4 shrink-0" />}
              </button>
            );
          })}
        </div>
        {aviso && (
          <p className={cx('mt-4 flex gap-2 rounded-xl px-3.5 py-3 text-[14px]', aviso.ok ? 'bg-good-soft text-good' : 'bg-bad-soft text-bad')}>
            {aviso.ok ? <Check className="mt-0.5 size-4 shrink-0" /> : <X className="mt-0.5 size-4 shrink-0" />}
            <span>{aviso.ok ? `Correto. ${aviso.texto}` : `${aviso.texto} (−8 pontos)`}</span>
          </p>
        )}
      </div>
    </div>
  );
}
