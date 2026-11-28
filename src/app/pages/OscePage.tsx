/* OSCE: escolha da estação (sem revelar o subtema), modos, circuito e histórico. */
import { Cadeado } from '../components/Premium';
import { useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, ClipboardCheck, Gamepad2, Hand, ListChecks, MousePointerClick, RotateCcw, Route as RouteIcon, Shuffle, Timer } from 'lucide-react';
import data from '../../data/osce/stations.json';
import { REGRAS_GERAIS } from '../../osce/colas';
import { nomeSistema, SISTEMAS, type Estacao } from '../../osce/engine';
import { melhores, useOsceHistory } from '../../osce/history';
import { errosFrequentes, paraRefazer } from '../../osce/erros';
import type { Sistema } from '../../osce/maneuvers';
import { storage } from '../core/store';
import { href } from '../router';
import { Badge, Bar, Button, Card, Chip, cx, Dialog, PageHeader, Section } from '../ui';

const ESTACOES = data as unknown as Estacao[];
const PRINCIPAIS: Sistema[] = ['abdome', 'cardiovascular', 'respiratorio', 'neurologico'];
type Modo = 'prova' | 'treino';
const MODO_KEY = 'pr.v2.osce.modo';
const VISUAL_KEY = 'pr.v2.osce.visual';
type Visual = 'blocos' | 'clinico';

const sorteia = <T,>(l: T[]) => l[Math.floor(Math.random() * l.length)];
type Fonte = 'todas' | 'cadernos' | 'material' | 'simulado' | 'jogo';
const fonteDe = (e: Estacao): Exclude<Fonte, 'todas'> => (e.id.startsWith('JOGO-') ? 'jogo' : e.id.startsWith('SIM-') ? 'simulado' : e.extra ? 'material' : 'cadernos');
const FONTES: { id: Fonte; nome: string }[] = [
  { id: 'todas', nome: 'Todas as fontes' }, { id: 'cadernos', nome: 'Cadernos da monitoria' }, { id: 'material', nome: 'Material de estudo' }, { id: 'simulado', nome: 'Simulado 100' }, { id: 'jogo', nome: 'Estações do jogo' },
];
const SIS_PROVA: Sistema[] = ['abdome', 'cardiovascular', 'respiratorio', 'neurologico', 'pressao'];

export default function OscePage() {
  const [sis, setSis] = useState<Sistema | 'todos'>('todos');
  const [fonte, setFonte] = useState<Fonte>('todas');
  const [cfg, setCfg] = useState(false);
  const [nProva, setNProva] = useState(6);
  const [sisProva, setSisProva] = useState<Sistema[]>(SIS_PROVA);
  const [troca, setTroca] = useState(60);
  const [modo, setModoState] = useState<Modo>(() => storage.read<Modo>(MODO_KEY) ?? 'prova');
  const setModo = (m: Modo) => {
    setModoState(m);
    storage.write(MODO_KEY, m);
  };
  const [visual, setVisualState] = useState<Visual>(() => storage.read<Visual>(VISUAL_KEY) ?? 'blocos');
  const setVisual = (v: Visual) => {
    setVisualState(v);
    storage.write(VISUAL_KEY, v);
  };
  const hist = useOsceHistory();
  const best = useMemo(() => melhores(hist), [hist]);
  const lista = ESTACOES.filter(e => (sis === 'todos' || e.sistema === sis) && (fonte === 'todas' || fonteDe(e) === fonte));
  const erros = useMemo(() => errosFrequentes(hist, best), [hist, best]);
  const refazer = useMemo(() => paraRefazer(best), [best]);
  const iniciarProva = () => {
    // distribui as estações entre os sistemas escolhidos, priorizando as menos treinadas
    const ids: string[] = [];
    for (let k = 0; k < nProva; k++) {
      const s = sisProva[k % sisProva.length];
      const ex = ESTACOES.filter(e => e.sistema === s && e.tipo !== 'discussao' && !ids.includes(e.id));
      const novas = ex.filter(e => !best.has(e.id));
      ids.push(sorteia(novas.length ? novas : ex).id);
    }
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    location.hash = href(`osce/${ids[0]}`) + `?modo=prova&c=${ids.join(',')}&i=0&t=${Date.now()}&x=1&tr=${troca}`;
  };
  const feitas = lista.filter(e => best.has(e.id)).length;
  const q = (extra = '') => `?modo=${modo}${extra}`;

  const aleatoria = () => {
    const exames = lista.filter(e => e.tipo !== 'discussao');
    const pool = exames.filter(e => !best.has(e.id));
    const e = sorteia(pool.length ? pool : exames);
    location.hash = href(`osce/${e.id}`) + q();
  };
  const circuito = () => {
    // uma estação de cada sistema principal, priorizando as menos treinadas
    const ids = PRINCIPAIS.map(s => {
      const ex = ESTACOES.filter(e => e.sistema === s && e.tipo !== 'discussao');
      const novas = ex.filter(e => !best.has(e.id));
      return sorteia(novas.length ? novas : ex).id;
    });
    location.hash = href(`osce/${ids[0]}`) + q(`&c=${ids.join(',')}&i=0&t=${Date.now()}`);
  };

  const porSistema = SISTEMAS.map(s => {
    const est = ESTACOES.filter(e => e.sistema === s.id);
    const notas = est.map(e => best.get(e.id)).filter((x): x is number => x != null);
    return { ...s, total: est.length, feitas: notas.length, media: notas.length ? Math.round(notas.reduce((a, b) => a + b, 0) / notas.length) : null };
  });

  return (
    <div>
      <PageHeader
        eyebrow="Prova prática"
        title="Simulador OSCE"
        actions={
          <div className="flex flex-wrap gap-2">
            <Button icon={<ClipboardCheck className="size-4" />} onClick={() => setCfg(true)}>Prova completa</Button>
            <Button icon={<RouteIcon className="size-4" />} onClick={circuito}>Circuito de 4</Button>
            <Button variant="primary" icon={<Shuffle className="size-4" />} onClick={aleatoria}>Estação aleatória</Button>
          </div>
        }
      >
        Entre na sala, examine o paciente em 3D e seja avaliado pelo checklist da estação. São {ESTACOES.length} estações, dos cadernos de treino e do material de estudo.
      </PageHeader>

      <div className="mb-6 grid gap-3 lg:grid-cols-[1fr_1.2fr]">
        <Card className="p-5">
          <div className="mb-3 text-[13px] font-semibold text-ink-3 uppercase">Modo</div>
          <div role="radiogroup" className="grid grid-cols-2 gap-2">
            {([
              ['prova', 'Prova', '1 min de leitura + 5 min, sem dicas, avaliador só dá o achado com a manobra certa'],
              ['treino', 'Treino', 'Sem limite de tempo, dicas nas manobras e progresso de cada comando'],
            ] as const).map(([id, nome, desc]) => (
              <button key={id} type="button" role="radio" aria-checked={modo === id} onClick={() => setModo(id)}
                className={cx('rounded-xl border p-3 text-left transition', modo === id ? 'border-accent bg-accent-soft' : 'border-line hover:border-line-strong')}>
                <span className={cx('block text-[15px] font-semibold', modo === id && 'text-accent')}>{nome}</span>
                <span className="block text-[12.5px] text-ink-2">{desc}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 mb-1 text-[13px] font-semibold text-ink-3 uppercase">Visual</div>
          <div role="radiogroup" className="grid grid-cols-2 gap-2">
            {([['blocos', 'Blocos', 'Estilo jogo, leve em qualquer celular'], ['clinico', 'Clínico', 'Formas arredondadas e sala hospitalar']] as const).map(([id, nome, desc]) => (
              <button key={id} type="button" role="radio" aria-checked={visual === id} onClick={() => setVisual(id)}
                className={cx('rounded-xl border p-3 text-left transition', visual === id ? 'border-accent bg-accent-soft' : 'border-line hover:border-line-strong')}>
                <span className={cx('block text-[14px] font-semibold', visual === id && 'text-accent')}>{nome}</span>
                <span className="block text-[12px] text-ink-2">{desc}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-2.5 text-[13px] text-ink-2">
            <p className="flex gap-2.5"><Timer className="mt-0.5 size-4 shrink-0 text-accent" />{REGRAS_GERAIS.tempo}</p>
            <p className="flex gap-2.5"><Hand className="mt-0.5 size-4 shrink-0 text-accent" />{REGRAS_GERAIS.abertura}</p>
            <p className="flex gap-2.5"><MousePointerClick className="mt-0.5 size-4 shrink-0 text-accent" />Visão em primeira pessoa: arraste para olhar, ande com WASD ou o joystick e toque no corpo do paciente para escolher a manobra.</p>
          </div>
        </Card>
        <Card className="p-5">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-ink-3 uppercase"><ListChecks className="size-4" />Seu desempenho por sistema</div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {porSistema.map(s => (
              <button key={s.id} type="button" onClick={() => setSis(s.id)} className="text-left">
                <div className="mb-1 flex items-baseline justify-between gap-2 text-[13px]">
                  <span className="font-medium">{s.nome}</span>
                  <span className="tabular text-ink-3">{s.media != null ? `${s.media}% · ` : ''}{s.feitas}/{s.total}</span>
                </div>
                <Bar value={s.media ?? 0} color={s.media == null ? 'var(--line)' : s.media >= 70 ? 'var(--good)' : s.media >= 50 ? 'var(--warn)' : 'var(--bad)'} />
              </button>
            ))}
          </div>
          <p className="mt-4 rounded-xl bg-surface-2 px-3 py-2 text-[12.5px] text-ink-2"><b>Regra de ouro:</b> {REGRAS_GERAIS.ouro}</p>
        </Card>
      </div>

      {(erros.length > 0 || refazer.length > 0) && (
        <Section title="Revisão dos seus erros" className="mb-6">
          <div className="grid gap-3 lg:grid-cols-2">
            {erros.length > 0 && (
              <Card className="p-4">
                <div className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-ink-3 uppercase"><AlertTriangle className="size-4 text-warn" /> O que mais se repete</div>
                <ul className="divide-y divide-line">
                  {erros.map(x => (
                    <li key={x.tag} className="flex items-center gap-3 py-2">
                      <span className="min-w-0 flex-1 text-[13.5px] leading-snug">{x.label}<span className="block text-[11.5px] text-ink-3">em {x.n} de {x.tentativas} tentativas</span></span>
                      {x.estacao && <a href={href(`osce/${x.estacao}`) + q()} className="inline-flex h-9 shrink-0 items-center gap-1 rounded-full border border-line px-3 text-[12.5px] font-semibold text-accent hover:border-accent">Treinar <ArrowRight className="size-3.5" /></a>}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            {refazer.length > 0 && (
              <Card className="p-4">
                <div className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-ink-3 uppercase"><RotateCcw className="size-4 text-accent" /> Estações para refazer</div>
                <ul className="divide-y divide-line">
                  {refazer.map(({ e, n }) => (
                    <li key={e.id}>
                      <a href={href(`osce/${e.id}`) + q()} className="flex items-center gap-3 py-2 text-[13.5px] hover:text-accent">
                        <span className="flex-1">Estação {e.rotulo} · {nomeSistema(e.sistema)}</span>
                        <Badge tone={n >= 50 ? 'warn' : 'bad'}>{n}%</Badge>
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </Section>
      )}

      <div className="mb-2 flex flex-wrap gap-2">
        {FONTES.map(f => (
          <button key={f.id} type="button" onClick={() => setFonte(f.id)}
            className={cx('rounded-full px-3 py-1.5 text-[12.5px] font-medium transition', fonte === f.id ? 'bg-ink text-bg' : 'bg-surface-2 text-ink-2 hover:text-ink')}>
            {f.nome}
          </button>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <Chip active={sis === 'todos'} onClick={() => setSis('todos')} count={ESTACOES.length}>Todos</Chip>
        {SISTEMAS.map(s => (
          <Chip key={s.id} active={sis === s.id} onClick={() => setSis(s.id)} count={ESTACOES.filter(e => e.sistema === s.id).length}>{s.nome}</Chip>
        ))}
      </div>

      <Section title={`Estações · ${feitas}/${lista.length} treinadas`}>
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 lg:grid-cols-5">
          {lista.map(e => {
            const b = best.get(e.id);
            return (
              <a
                key={e.id}
                href={href(`osce/${e.id}`) + q()}
                className="group flex flex-col gap-1.5 rounded-2xl border border-line bg-surface p-2.5 transition hover:border-line-strong hover:shadow-card active:scale-[0.98] sm:gap-2 sm:p-3.5"
              >
                <span className="flex items-center justify-between">
                  <span className="flex h-9 min-w-9 items-center justify-center rounded-[10px] bg-surface-2 px-1.5 font-mono text-[14px] font-semibold text-ink group-hover:bg-accent-soft group-hover:text-accent">
                    {e.rotulo}
                  </span>
                  {b != null && <Badge tone={b >= 70 ? 'good' : b >= 50 ? 'warn' : 'bad'}>{b}%</Badge>}
                </span>
                <Cadeado recurso={{ tipo: 'osce', id: e.id }} />
                <span className="hidden text-[13.5px] font-medium sm:block">Estação {e.rotulo}</span>
                <span className="text-[11.5px] leading-tight text-ink-3 sm:text-[12px]">{nomeSistema(e.sistema)}</span>
                {(e.checklist || e.tipo === 'discussao') && (
                  <span className={cx('w-fit rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold', e.checklist ? 'bg-good-soft text-good' : 'bg-surface-2 text-ink-2')}>
                    {e.checklist ? 'Checklist' : 'Discussão'}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </Section>

      <Dialog open={cfg} onClose={() => setCfg(false)} title="Prova OSCE completa">
        <div className="space-y-4 p-5">
          <p className="text-[13.5px] text-ink-2">Rodízio cronometrado como na prova: 1 min de leitura + 5 min por estação, sem correção entre elas. No fim, relatório por sistema.</p>
          <div>
            <div className="mb-1.5 text-[13px] font-semibold">Número de estações</div>
            <div className="grid grid-cols-4 gap-2">
              {[4, 6, 8, 10].map(n => (
                <button key={n} type="button" onClick={() => setNProva(n)} className={cx('h-11 rounded-xl border text-[15px] font-semibold', nProva === n ? 'border-accent bg-accent-soft text-accent' : 'border-line')}>{n}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-[13px] font-semibold">Sistemas</div>
            <div className="flex flex-wrap gap-2">
              {SIS_PROVA.map(s => (
                <Chip key={s} active={sisProva.includes(s)} onClick={() => setSisProva(l => (l.includes(s) ? (l.length > 1 ? l.filter(x => x !== s) : l) : [...l, s]))}>{nomeSistema(s)}</Chip>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-[13px] font-semibold">Troca entre estações</div>
            <div className="grid grid-cols-3 gap-2">
              {[[15, '15 s'], [60, '1 min'], [0, 'sem pausa']].map(([v, l]) => (
                <button key={v} type="button" onClick={() => setTroca(v as number)} className={cx('h-11 rounded-xl border text-[14px] font-medium', troca === v ? 'border-accent bg-accent-soft text-accent' : 'border-line')}>{l}</button>
              ))}
            </div>
          </div>
          <Button variant="primary" size="lg" className="w-full" onClick={iniciarProva}>Começar a prova ({nProva} estações · ~{nProva * 6 + Math.round(((nProva - 1) * troca) / 60)} min)</Button>
        </div>
      </Dialog>

      {hist.length > 0 && (
        <Section title="Últimas tentativas" className="mt-8">
          <Card className="divide-y divide-line">
            {hist.slice(0, 8).map(r => {
              const e = ESTACOES.find(x => x.id === r.id);
              return (
                <a key={r.key} href={href(`osce/${r.id}`) + q()} className="flex items-center gap-3 px-4 py-3 text-[14px] hover:bg-surface-2">
                  <Gamepad2 className="size-4 text-ink-3" />
                  <span className="flex-1">Estação {e?.rotulo} · {e ? nomeSistema(e.sistema) : ''}{r.modo === 'treino' ? ' · treino' : ''}</span>
                  <span className="text-[12px] text-ink-3">{new Date(r.date).toLocaleDateString('pt-BR')}</span>
                  <span className={cx('tabular w-12 text-right font-semibold', r.nota >= 70 ? 'text-good' : r.nota >= 50 ? 'text-warn' : 'text-bad')}>{r.nota}%</span>
                </a>
              );
            })}
          </Card>
        </Section>
      )}
    </div>
  );
}
