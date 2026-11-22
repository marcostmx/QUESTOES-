import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowRight, BookOpen, Check, RotateCcw, X } from 'lucide-react';
import { PADROES, desenharPadrao, type Padrao } from '../../casos/ecgPadroes';
import { storage } from '../core/store';
import { href } from '../router';
import { Badge, Card, Chip, cx, PageHeader, Ring, Section } from '../ui';

/* ---------- histórico das rodadas (entra na Carreira) ---------- */
export interface EcgRecord { date: number; acertos: number; total: number }
const KEY = 'pr.v2.ecg';
let lista: EcgRecord[] = storage.read<EcgRecord[]>(KEY) ?? [];
const ouvintes = new Set<() => void>();
export const ecgHistory = {
  get: () => lista,
  subscribe(l: () => void) {
    ouvintes.add(l);
    return () => ouvintes.delete(l);
  },
  save(r: EcgRecord) {
    lista = [r, ...lista].slice(0, 200);
    storage.write(KEY, lista);
    ouvintes.forEach(l => l());
  },
};
export const useEcgHistory = () => useSyncExternalStore(ecgHistory.subscribe, ecgHistory.get, ecgHistory.get);

const RODADA = 8;
function embaralha<T>(a: T[]) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

export function Ecg12Canvas({ padrao }: { padrao: Padrao }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) desenharPadrao(ref.current, padrao);
  }, [padrao]);
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-[#fff8f6]">
      <canvas ref={ref} width={1310} height={560} className="block w-full min-w-[660px]" aria-label="Eletrocardiograma de 12 derivações" />
    </div>
  );
}

function opcoes(certo: Padrao): Padrao[] {
  const mesmoGrupo = PADROES.filter(p => p.id !== certo.id && p.grupo === certo.grupo);
  const outros = PADROES.filter(p => p.id !== certo.id && p.grupo !== certo.grupo);
  return embaralha([certo, ...embaralha(mesmoGrupo).slice(0, 2), ...embaralha(outros)].slice(0, 4));
}

export default function EcgPage() {
  const [modo, setModo] = useState<'quiz' | 'atlas'>('quiz');
  return (
    <>
      <PageHeader eyebrow="Cardiovascular · Exames" title="Treino de ECG" actions={
        <div className="flex gap-2">
          <Chip active={modo === 'quiz'} onClick={() => setModo('quiz')}>Quiz</Chip>
          <Chip active={modo === 'atlas'} onClick={() => setModo('atlas')}>Atlas</Chip>
        </div>
      }>
        Laude como na prova: ritmo, frequência, eixo, PR, QRS e ST-T. Cada acerto vale XP na Carreira.
      </PageHeader>
      {modo === 'quiz' ? <Quiz /> : <Atlas />}
    </>
  );
}

function Quiz() {
  const [seed, setSeed] = useState(0);
  const fila = useMemo(() => embaralha(PADROES).slice(0, RODADA), [seed]);
  const [i, setI] = useState(0);
  const [escolha, setEscolha] = useState<string | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [fim, setFim] = useState(false);
  const atual = fila[i];
  const ops = useMemo(() => opcoes(atual), [atual]);

  const responder = (id: string) => {
    if (escolha) return;
    setEscolha(id);
    if (id === atual.id) setAcertos(a => a + 1);
  };
  const proxima = () => {
    if (i + 1 >= fila.length) {
      ecgHistory.save({ date: Date.now(), acertos, total: fila.length });
      setFim(true);
      return;
    }
    setI(i + 1);
    setEscolha(null);
  };
  const reiniciar = () => {
    setSeed(s => s + 1);
    setI(0);
    setEscolha(null);
    setAcertos(0);
    setFim(false);
  };

  if (fim) {
    const pct = Math.round((acertos / fila.length) * 100);
    return (
      <Card className="flex flex-col items-center gap-4 p-8 text-center">
        <Ring value={pct} size={96} stroke={8} color={pct >= 70 ? 'var(--good)' : pct >= 50 ? 'var(--warn)' : 'var(--bad)'}>
          <span className="font-display text-[24px] font-semibold">{acertos}/{fila.length}</span>
        </Ring>
        <p className="font-display text-[22px] font-semibold">{pct >= 75 ? 'Ótima leitura!' : pct >= 50 ? 'Bom caminho.' : 'Vale revisar o atlas.'}</p>
        <Badge tone="good">+{acertos * 5} XP</Badge>
        <div className="flex gap-2">
          <button type="button" onClick={reiniciar} className="inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-[14px] font-semibold text-bg"><RotateCcw className="size-4" /> Nova rodada</button>
          <a href={href('casos')} className="inline-flex h-11 items-center rounded-xl border border-line px-5 text-[14px] font-semibold">Casos clínicos</a>
        </div>
      </Card>
    );
  }

  const acertou = escolha === atual.id;
  return (
    <>
      <div className="mb-3 flex items-center justify-between text-[13px] text-ink-2">
        <span>ECG {i + 1} de {fila.length}</span>
        <span className="tabular">{acertos} acerto{acertos === 1 ? '' : 's'}</span>
      </div>
      <Ecg12Canvas padrao={atual} />
      <p className="mt-2 text-[12px] text-ink-3">25 mm/s · 10 mm/mV · role para o lado no celular</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {ops.map(o => (
          <button key={o.id} type="button" onClick={() => responder(o.id)} disabled={!!escolha}
            className={cx('flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-[15px] font-medium transition',
              !escolha && 'border-line bg-surface hover:border-line-strong active:scale-[0.99]',
              escolha && o.id === atual.id && 'border-good bg-good-soft text-good',
              escolha && o.id === escolha && o.id !== atual.id && 'border-bad bg-bad-soft text-bad',
              escolha && o.id !== atual.id && o.id !== escolha && 'border-line opacity-60')}>
            <span className="flex-1">{o.nome}</span>
            {escolha && o.id === atual.id && <Check className="size-5" />}
            {escolha && o.id === escolha && o.id !== atual.id && <X className="size-5" />}
          </button>
        ))}
      </div>
      {escolha && (
        <Card className={cx('mt-4 p-4', acertou ? 'border-good' : 'border-bad')}>
          <p className="text-[15px] font-semibold">{acertou ? 'Correto: ' : 'Resposta: '}{atual.nome} <span className="font-normal text-ink-3">· FC {atual.fc}</span></p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] text-ink-2">
            {atual.achados.map(a => <li key={a}>{a}</li>)}
          </ul>
          <p className="mt-2 text-[14px]"><b>Conduta:</b> {atual.pista}</p>
          <button type="button" onClick={proxima} className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-[14px] font-semibold text-bg">
            {i + 1 >= fila.length ? 'Ver resultado' : 'Próximo ECG'} <ArrowRight className="size-4" />
          </button>
        </Card>
      )}
    </>
  );
}

function Atlas() {
  const [sel, setSel] = useState(PADROES[0].id);
  const p = PADROES.find(x => x.id === sel)!;
  const grupos = [...new Set(PADROES.map(x => x.grupo))];
  return (
    <>
      {grupos.map(gr => (
        <Section key={gr} title={gr} className="mb-4">
          <div className="flex flex-wrap gap-2">
            {PADROES.filter(x => x.grupo === gr).map(x => <Chip key={x.id} active={x.id === sel} onClick={() => setSel(x.id)}>{x.nome}</Chip>)}
          </div>
        </Section>
      ))}
      <Ecg12Canvas padrao={p} />
      <Card className="mt-4 p-4">
        <p className="flex items-center gap-2 text-[16px] font-semibold"><BookOpen className="size-4" /> {p.nome} <span className="font-normal text-ink-3">· FC {p.fc}</span></p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] text-ink-2">
          {p.achados.map(a => <li key={a}>{a}</li>)}
        </ul>
        <p className="mt-2 text-[14px]"><b>Conduta:</b> {p.pista}</p>
      </Card>
    </>
  );
}
