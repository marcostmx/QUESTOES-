import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, BookOpen, Check, RotateCcw, X } from 'lucide-react';
import { casoHistory } from '../../casos/history';
import { desenharRx, PADROES_RX, type PadraoRx } from '../../casos/rx';
import { xpCaso } from '../core/career';
import { href } from '../router';
import { Badge, Card, Chip, cx, PageHeader, Ring } from '../ui';

function embaralha<T>(a: T[]) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function Filme({ id }: { id: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) desenharRx(ref.current, id);
  }, [id]);
  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl border border-line bg-black">
      <canvas ref={ref} width={600} height={680} className="block w-full" aria-label="Radiografia de tórax esquemática" />
    </div>
  );
}

export default function RxPage() {
  const [modo, setModo] = useState<'quiz' | 'atlas'>('quiz');
  return (
    <>
      <PageHeader eyebrow="Respiratório · Exames" title="Radiografia de tórax" actions={
        <div className="flex gap-2">
          <Chip active={modo === 'quiz'} onClick={() => setModo('quiz')}>Quiz</Chip>
          <Chip active={modo === 'atlas'} onClick={() => setModo('atlas')}>Atlas</Chip>
        </div>
      }>
        Imagens esquemáticas desenhadas para o jogo. O lado direito do paciente fica à esquerda da tela (marcador D).
      </PageHeader>
      {modo === 'quiz' ? <Quiz /> : <Atlas />}
    </>
  );
}

const RODADA = 6;
function Quiz() {
  const [seed, setSeed] = useState(0);
  const fila = useMemo(() => embaralha(PADROES_RX).slice(0, RODADA), [seed]);
  const [i, setI] = useState(0);
  const [esc, setEsc] = useState<string | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [fim, setFim] = useState(false);
  const atual = fila[i];
  const ops = useMemo(() => embaralha([atual, ...embaralha(PADROES_RX.filter(p => p.id !== atual.id)).slice(0, 3)]), [atual]);

  if (fim) {
    const nota = Math.round((acertos / fila.length) * 100);
    return (
      <Card className="flex flex-col items-center gap-4 p-8 text-center">
        <Ring value={nota} size={96} stroke={8} color={nota >= 70 ? 'var(--good)' : nota >= 50 ? 'var(--warn)' : 'var(--bad)'}>
          <span className="font-display text-[22px] font-semibold">{acertos}/{fila.length}</span>
        </Ring>
        <Badge tone="good">+{xpCaso({ nota })} XP</Badge>
        <div className="flex gap-2">
          <button type="button" onClick={() => { setSeed(s => s + 1); setI(0); setEsc(null); setAcertos(0); setFim(false); }} className="inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-[14px] font-semibold text-bg"><RotateCcw className="size-4" /> Nova rodada</button>
          <a href={href('casos')} className="inline-flex h-11 items-center rounded-xl border border-line px-5 text-[14px] font-semibold">Casos clínicos</a>
        </div>
      </Card>
    );
  }
  const acertou = esc === atual.id;
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        <p className="mb-2 text-[13px] text-ink-2">Radiografia {i + 1} de {fila.length} · {acertos} acerto{acertos === 1 ? '' : 's'}</p>
        <Filme id={atual.id} />
      </div>
      <div>
        <p className="mb-2 text-[15px] font-semibold">Qual o principal achado?</p>
        <div className="grid gap-2">
          {ops.map(o => (
            <button key={o.id} type="button" disabled={!!esc} onClick={() => { setEsc(o.id); if (o.id === atual.id) setAcertos(a => a + 1); }}
              className={cx('flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[14px] font-medium',
                !esc && 'border-line bg-surface hover:border-line-strong',
                esc && o.id === atual.id && 'border-good bg-good-soft text-good',
                esc && o.id === esc && o.id !== atual.id && 'border-bad bg-bad-soft text-bad',
                esc && o.id !== atual.id && o.id !== esc && 'border-line opacity-60')}>
              <span className="flex-1">{o.nome}</span>
              {esc && o.id === atual.id && <Check className="size-5" />}
              {esc && o.id === esc && o.id !== atual.id && <X className="size-5" />}
            </button>
          ))}
        </div>
        {esc && (
          <Card className={cx('mt-4 p-4', acertou ? 'border-good' : 'border-bad')}>
            <Explica p={atual} />
            <button type="button" onClick={() => { if (i + 1 >= fila.length) { casoHistory.save({ key: `rx:${Date.now()}`, id: 'rx-torax', date: Date.now(), nota: Math.round((acertos / fila.length) * 100), obito: false, minutos: 0 }); setFim(true); } else { setI(i + 1); setEsc(null); } }}
              className="mt-3 inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-[14px] font-semibold text-bg">
              {i + 1 >= fila.length ? 'Ver resultado' : 'Próxima'} <ArrowRight className="size-4" />
            </button>
          </Card>
        )}
      </div>
    </div>
  );
}

function Explica({ p }: { p: PadraoRx }) {
  return (
    <>
      <p className="text-[15px] font-semibold">{p.nome}</p>
      <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[14px] text-ink-2">{p.achados.map(a => <li key={a}>{a}</li>)}</ul>
      <p className="mt-2 text-[14px]"><b>Conduta:</b> {p.pista}</p>
    </>
  );
}

function Atlas() {
  const [sel, setSel] = useState(PADROES_RX[0].id);
  const p = PADROES_RX.find(x => x.id === sel)!;
  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2">{PADROES_RX.map(x => <Chip key={x.id} active={x.id === sel} onClick={() => setSel(x.id)}>{x.nome}</Chip>)}</div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Filme id={sel} />
        <Card className="p-4">
          <p className="mb-1 flex items-center gap-2 text-[13px] text-ink-3"><BookOpen className="size-4" /> Atlas</p>
          <Explica p={p} />
        </Card>
      </div>
    </>
  );
}
