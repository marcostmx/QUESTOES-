import { useMemo, useState } from 'react';
import { ArrowRight, Check, RotateCcw, X } from 'lucide-react';
import { ag, compensacao, deltaDelta, GASOS, NOME_ASSOC, NOME_DELTA, NOME_PRIMARIO, ph, primario, type Associado, type Delta, type Gaso, type Primario } from '../../casos/gaso';
import { casoHistory } from '../../casos/history';
import { xpCaso } from '../core/career';
import { href } from '../router';
import { Badge, Card, cx, PageHeader, Ring } from '../ui';

const num = (x: number, d = 0) => x.toFixed(d).replace('.', ',');
function embaralha<T>(a: T[]) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

type Passo = 'primario' | 'comp' | 'ag' | 'delta' | 'causa';
interface Pergunta { passo: Passo; titulo: string; opcoes: { id: string; nome: string }[]; certa: string; explica: string }

function perguntas(g: Gaso): Pergunta[] {
  const pr = primario(g);
  const comp = compensacao(g);
  const a = ag(g);
  const dd = deltaDelta(g);
  const ps: Pergunta[] = [
    {
      passo: 'primario', titulo: '1. Qual o distúrbio primário?',
      opcoes: (Object.keys(NOME_PRIMARIO) as Primario[]).map(id => ({ id, nome: NOME_PRIMARIO[id] })), certa: pr,
      explica: `pH ${num(ph(g.pco2, g.hco3), 2)} (${ph(g.pco2, g.hco3) < 7.35 ? 'acidemia' : ph(g.pco2, g.hco3) > 7.45 ? 'alcalemia' : 'normal'}). ${pr === 'normal' ? 'pH normal não exclui distúrbio: calcule o ânion gap.' : `O ${pr.includes('metabolica') ? 'HCO₃' : 'pCO₂'} se move na direção que explica o pH.`}`,
    },
  ];
  if (pr !== 'normal')
    ps.push({
      passo: 'comp', titulo: `2. A compensação é adequada? (${comp.variavel} esperado)`,
      opcoes: (Object.keys(NOME_ASSOC) as Associado[]).map(id => ({ id, nome: NOME_ASSOC[id] })), certa: comp.associado,
      explica: `${comp.variavel} esperado: ${comp.formula} → faixa ${num(comp.faixa[0], 1)}–${num(comp.faixa[1], 1)}. Medido: ${comp.variavel === 'pCO₂' ? g.pco2 : g.hco3}.`,
    });
  if (pr === 'acidose-metabolica' || pr === 'normal')
    ps.push({
      passo: 'ag', titulo: `${ps.length + 1}. Ânion gap`,
      opcoes: [{ id: 'normal', nome: 'Normal (≤ 12)' }, { id: 'elevado', nome: 'Elevado (> 12)' }], certa: a > 12 ? 'elevado' : 'normal',
      explica: `AG = Na − (Cl + HCO₃) = ${g.na} − (${g.cl} + ${g.hco3}) = ${a}.${a > 12 ? '' : ' Acidose hiperclorêmica: perdas intestinais ou renais de HCO₃.'}`,
    });
  if (dd)
    ps.push({
      passo: 'delta', titulo: `${ps.length + 1}. Delta-delta: há outro distúrbio metabólico?`,
      opcoes: (Object.keys(NOME_DELTA) as Delta[]).map(id => ({ id, nome: NOME_DELTA[id] })), certa: dd.tipo,
      explica: `Δ/Δ = (AG − 12) / (24 − HCO₃) = (${a} − 12) / (24 − ${g.hco3}) = ${dd.valor >= 99 ? '∞' : num(dd.valor, 1)}.`,
    });
  ps.push({
    passo: 'causa', titulo: `${ps.length + 1}. Causa mais provável`,
    opcoes: embaralha([g.causa, ...g.distratores]).map(n => ({ id: n, nome: n })), certa: g.causa, explica: g.explicacao,
  });
  return ps;
}

const RODADA = 5;

export default function GasometriaPage() {
  const [seed, setSeed] = useState(0);
  const fila = useMemo(() => embaralha(GASOS).slice(0, RODADA), [seed]);
  const [i, setI] = useState(0);
  const [k, setK] = useState(0);
  const [resp, setResp] = useState<string | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [total, setTotal] = useState(0);
  const [fim, setFim] = useState(false);
  const g = fila[i];
  const ps = useMemo(() => perguntas(g), [g]);
  const p = ps[k];

  const responder = (id: string) => {
    if (resp) return;
    setResp(id);
    setTotal(t => t + 1);
    if (id === p.certa) setAcertos(a => a + 1);
  };
  const seguir = () => {
    setResp(null);
    if (k + 1 < ps.length) return setK(k + 1);
    if (i + 1 < fila.length) {
      setI(i + 1);
      setK(0);
      return;
    }
    const nota = Math.round((acertos / Math.max(1, total)) * 100);
    casoHistory.save({ key: `gaso:${Date.now()}`, id: 'gasometria', date: Date.now(), nota, obito: false, minutos: 0 });
    setFim(true);
  };
  const reiniciar = () => {
    setSeed(s => s + 1);
    setI(0);
    setK(0);
    setResp(null);
    setAcertos(0);
    setTotal(0);
    setFim(false);
  };

  if (fim) {
    const nota = Math.round((acertos / Math.max(1, total)) * 100);
    return (
      <>
        <PageHeader eyebrow="Respiratório · Exames" title="Gasometria arterial" />
        <Card className="flex flex-col items-center gap-4 p-8 text-center">
          <Ring value={nota} size={96} stroke={8} color={nota >= 70 ? 'var(--good)' : nota >= 50 ? 'var(--warn)' : 'var(--bad)'}>
            <span className="font-display text-[22px] font-semibold">{acertos}/{total}</span>
          </Ring>
          <p className="font-display text-[22px] font-semibold">{nota >= 80 ? 'Interpretação de mestre!' : nota >= 50 ? 'Bom caminho.' : 'Vale revisar as fórmulas.'}</p>
          <Badge tone="good">+{xpCaso({ nota })} XP</Badge>
          <div className="flex gap-2">
            <button type="button" onClick={reiniciar} className="inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-[14px] font-semibold text-bg"><RotateCcw className="size-4" /> Nova rodada</button>
            <a href={href('casos')} className="inline-flex h-11 items-center rounded-xl border border-line px-5 text-[14px] font-semibold">Casos clínicos</a>
          </div>
        </Card>
      </>
    );
  }

  const valor = (rotulo: string, v: string, un: string, ref: string) => (
    <div className="rounded-xl bg-surface-2 px-3 py-2">
      <p className="text-[11px] text-ink-3">{rotulo} <span className="opacity-70">({ref})</span></p>
      <p className="tabular font-mono text-[19px] font-semibold">{v} <span className="text-[12px] font-normal text-ink-3">{un}</span></p>
    </div>
  );

  return (
    <>
      <PageHeader eyebrow="Respiratório · Exames" title="Gasometria arterial">
        Interprete em ordem: distúrbio primário, compensação, ânion gap, delta-delta e causa. Cada acerto vale XP.
      </PageHeader>
      <div className="mb-3 flex items-center justify-between text-[13px] text-ink-2">
        <span>Gasometria {i + 1} de {fila.length}</span>
        <span className="tabular">{acertos}/{total} acertos</span>
      </div>
      <Card className="mb-4 p-4">
        <p className="text-[15px]">{g.contexto}</p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {valor('pH', num(ph(g.pco2, g.hco3), 2), '', '7,35–7,45')}
          {valor('pCO₂', String(g.pco2), 'mmHg', '35–45')}
          {valor('HCO₃', String(g.hco3), 'mEq/L', '22–26')}
          {valor('pO₂', String(g.po2), 'mmHg', '80–100')}
          {valor('Na', String(g.na), 'mEq/L', '135–145')}
          {valor('Cl', String(g.cl), 'mEq/L', '98–106')}
        </div>
      </Card>
      <p className="mb-2 text-[15px] font-semibold">{p.titulo}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {p.opcoes.map(o => (
          <button key={o.id} type="button" onClick={() => responder(o.id)} disabled={!!resp}
            className={cx('flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[14px] font-medium transition',
              !resp && 'border-line bg-surface hover:border-line-strong active:scale-[0.99]',
              resp && o.id === p.certa && 'border-good bg-good-soft text-good',
              resp && o.id === resp && o.id !== p.certa && 'border-bad bg-bad-soft text-bad',
              resp && o.id !== p.certa && o.id !== resp && 'border-line opacity-60')}>
            <span className="flex-1">{o.nome}</span>
            {resp && o.id === p.certa && <Check className="size-5" />}
            {resp && o.id === resp && o.id !== p.certa && <X className="size-5" />}
          </button>
        ))}
      </div>
      {resp && (
        <Card className={cx('mt-4 p-4', resp === p.certa ? 'border-good' : 'border-bad')}>
          <p className="text-[14px]">{p.explica}</p>
          <button type="button" onClick={seguir} className="mt-3 inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-[14px] font-semibold text-bg">
            {k + 1 < ps.length ? 'Próximo passo' : i + 1 < fila.length ? 'Próxima gasometria' : 'Ver resultado'} <ArrowRight className="size-4" />
          </button>
        </Card>
      )}
    </>
  );
}
