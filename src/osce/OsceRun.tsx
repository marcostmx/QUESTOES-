/* Estação OSCE imersiva: corredor → leitura (1 min) → sala (5 min) → checklist. */
import { Component, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  ArrowLeft, BedDouble, BookOpen, Check, Volume2, VolumeX, Gauge, ListChecks, MessagesSquare, ChevronDown, ClipboardList, Droplets, Expand, Flag, Hand, HeartHandshake, Info, Lock, MessageCircle, RotateCcw, ShieldCheck, Smile, Stethoscope, X,
} from 'lucide-react';
import data from '../data/osce/stations.json';
import { href } from '../app/router';
import { Badge, Button, cx, Ring, toast } from '../app/ui';
import {
  achado, anamnese, CLASSES_PA, cobertura, corrigir, ESTACAO_S, falhas, statusCobertura, sugestoes, fala, LEITURA_S, manobrasDoComando, nomePostura, nomeSistema, novaTentativa, statusPratico, temParteVerbal,
  type Abertura, type Estacao, type LeituraPA, type Status, type Tentativa,
} from './engine';
import { xpOsce } from '../app/core/career';
import { osceHistory, useOsceHistory } from './history';
import { COLAS } from './colas';
import { doSistema, POSTURAS, REGIOES, type Manobra, type Postura, type Regiao } from './maneuvers';
import { World, webglOk, type Alvo, type Proximidade } from './scene';
import { sfx } from './sfx';
import { Manometro } from './Manometro';
import { Joystick } from './Joystick';
import { Microfone } from './Microfone';
import { padraoMotor } from './motor';
import { somDaManobra, type Som } from './ausculta';
import { AuscultaCard } from './AuscultaCard';
import { voz } from './voz';
import { achadosVisuais, vitais } from './visual';
import { storage } from '../app/core/store';

const ESTACOES = data as unknown as Estacao[];
const TOQUE = typeof matchMedia !== 'undefined' && matchMedia('(pointer: coarse)').matches;
type Fase = 'leitura' | 'estacao' | 'resultado' | 'troca';
interface Log { key: number; nome: string; texto: string; alterado: boolean; aviso?: string; fala?: boolean }

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, Math.floor(s % 60))).padStart(2, '0')}`;

class Boundary extends Component<{ onError: () => void; children: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() {
    return { err: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.err ? null : this.props.children;
  }
}

/** Canvas único e persistente; se o WebGL falhar, a estação continua em modo 2D. */
function Palco({ e, worldRef, onAlvo, onHover, onProx, onFail }: {
  e: Estacao;
  worldRef: React.MutableRefObject<World | null>;
  onAlvo: (a: Alvo) => void;
  onHover: (a: Alvo | null) => void;
  onProx: (p: Proximidade) => void;
  onFail: () => void;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const cbs = useRef({ onAlvo, onHover, onProx });
  cbs.current = { onAlvo, onHover, onProx };
  useEffect(() => {
    if (!ref.current) return;
    let w: World | null = null;
    try {
      w = new World(ref.current, {
        sexo: e.paciente.sexo, fr: e.paciente.fr, padrao: e.paciente.padrao, postura: e.paciente.postura, numero: e.rotulo, motor: padraoMotor(e), ...visual(e), estilo: storage.read<'blocos' | 'clinico'>('pr.v2.osce.visual') ?? 'blocos',
        onClick: a => cbs.current.onAlvo(a),
        onHover: a => cbs.current.onHover(a),
        onProx: p => cbs.current.onProx(p),
      });
      worldRef.current = w;
    } catch {
      onFail();
    }
    return () => {
      w?.dispose();
      worldRef.current = null;
    };
  }, [e, worldRef, onFail]);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full touch-none" />;
}

function visual(e: Estacao) {
  const achados = achadosVisuais(e);
  const tem = (...t: string[]) => achados.some(a => t.includes(a.tipo));
  return {
    achados,
    vitais: vitais(e),
    expor: {
      abdome: e.sistema === 'abdome' || e.sistema === 'abdome-agudo' || tem('cullen', 'grey-turner', 'globoso', 'colateral', 'hernia', 'massa'),
      torax: tem('tonel', 'pectus', 'vesiculas') || (e.paciente.sexo === 'M' && ['respiratorio', 'cardiovascular', 'dor-toracica'].includes(e.sistema)),
    },
  };
}

const REGIAO_CLIQUE: Record<Regiao, Regiao[]> = {
  cabeca: ['cabeca'], torax: ['torax', 'dorso'], dorso: ['dorso', 'torax'], abdome: ['abdome'], mmss: ['mmss'], mmii: ['mmii'], geral: ['geral'],
};

export type Modo = 'prova' | 'treino';
export interface Circuito { ids: string[]; i: number; inicio: string; prova?: boolean; troca?: number }

export default function OsceRun({ id, query }: { id: string; query: URLSearchParams }) {
  const e = useMemo(() => ESTACOES.find(x => x.id === id), [id]);
  if (id === 'relatorio') return <Relatorio chave={query.get('t') ?? ''} />;
  if (!e) return <div className="p-10 text-center">Estação não encontrada. <a className="text-accent underline" href={href('osce')}>Voltar</a></div>;
  const modo: Modo = query.get('modo') === 'treino' ? 'treino' : 'prova';
  const c = query.get('c');
  const circuito: Circuito | null = c ? { ids: c.split(','), i: Number(query.get('i') ?? 0), inicio: query.get('t') ?? '', prova: query.get('x') === '1', troca: Number(query.get('tr') ?? 60) } : null;
  return <Run key={id + query.toString()} e={e} modo={modo} circuito={circuito} />;
}

function Run({ e, modo, circuito }: { e: Estacao; modo: Modo; circuito: Circuito | null }) {
  const treino = modo === 'treino';
  const worldRef = useRef<World | null>(null);
  const [fallback, setFallback] = useState(() => !webglOk());
  const [fase, setFase] = useState<Fase>('leitura');
  const [fim, setFim] = useState(() => Date.now() + LEITURA_S * 1000);
  const [agora, setAgora] = useState(Date.now());
  const inicio = useRef(0);
  const [t, setT] = useState<Tentativa>(() => novaTentativa(e));
  const tRef = useRef(t);
  tRef.current = t;
  const [prox, setProx] = useState<Proximidade>({ pertoPaciente: false, pertoPia: false, lado: null, dentro: false });
  const proxRef = useRef(prox);
  proxRef.current = fallback ? { pertoPaciente: true, pertoPia: true, lado: 'direito', dentro: true } : prox;
  const [menu, setMenu] = useState<Regiao[] | null>(null);
  const [posMenu, setPosMenu] = useState(false);
  const [aberturaMenu, setAberturaMenu] = useState(false);
  const [falarMenu, setFalarMenu] = useState(false);
  const [perguntadas, setPerguntadas] = useState<Set<string>>(new Set());
  const [mano, setMano] = useState<{ leitura: LeituraPA; inicio: number; braco: 'D' | 'E' } | null>(null);
  const [ocultaUltimo, setOcultaUltimo] = useState(0);
  const [ausculta, setAusculta] = useState<{ som: Som; titulo: string; key: number } | null>(null);
  const fecharAusculta = useCallback(() => setAusculta(null), []);
  const contextoSom = useMemo(() => [e.achados, ...e.comandos.map(c => c.achado ?? '')].join('. '), [e]);
  const vit = useMemo(() => vitais(e), [e]);
  const perguntas = useMemo(() => anamnese(e), [e]);
  const [painel, setPainel] = useState(false);
  const [hover, setHover] = useState<Alvo | null>(null);
  const [log, setLog] = useState<Log[]>([]);
  const logRef = useRef(log);
  logRef.current = log;
  const [fala_, setFala] = useState<{ txt: string; key: number } | null>(null);
  const bubble = useRef<HTMLDivElement>(null);
  const [notas, setNotas] = useState<Record<number, Status | null>>({});
  const attemptKey = useRef(`${e.id}-${Date.now()}`);
  const avisou = useRef(false);

  const restante = Math.max(0, (fim - agora) / 1000);
  const sec = () => (Date.now() - inicio.current) / 1000;

  /* ----- relógio ----- */
  useEffect(() => {
    if (fase === 'resultado') return;
    const iv = setInterval(() => setAgora(Date.now()), 250);
    return () => clearInterval(iv);
  }, [fase]);

  const entrar = useCallback(() => {
    worldRef.current?.openDoor();
    inicio.current = Date.now();
    setFim(Date.now() + ESTACAO_S * 1000);
    setFase('estacao');
    setPainel(false);
    sfx.bell();
    toast(treino ? 'Modo treino: sem limite de tempo.' : 'A porta abriu — você tem 5 minutos.');
  }, []);

  const encerrar = useCallback(() => {
    setMenu(null);
    setPosMenu(false);
    sfx.bell();
    const sug = sugestoes(e, tRef.current);
    setNotas(n => ({ ...sug, ...n }));
    if (circuito?.prova) {
      // prova completa: guarda a tentativa e segue para a troca de estação, sem correção
      const tt = tRef.current;
      const r = corrigir(e, tt, sug);
      osceHistory.save({ key: attemptKey.current, id: e.id, date: Date.now(), nota: r.nota, pendentes: r.pendentes, modo, circuito: circuito.inicio, falhas: falhas(e, tt, r.itens) });
      const k = PROVA_KEY + circuito.inicio;
      const lista = storage.read<ProvaEntrada[]>(k) ?? [];
      storage.write(k, [...lista.filter(x => x.key !== attemptKey.current), { key: attemptKey.current, id: e.id, t: tt, log: logRef.current, notas: sug }]);
      setFase('troca');
      return;
    }
    setFase('resultado');
  }, [e, circuito, modo]);

  useEffect(() => {
    if (fase === 'leitura' && restante <= 0) entrar();
    if (fase === 'estacao' && !treino) {
      if (restante <= 60 && !avisou.current) {
        avisou.current = true;
        sfx.beep();
        toast('Falta 1 minuto.');
      }
      if (restante <= 0) encerrar();
    }
  }, [restante, fase, entrar, encerrar, treino]);

  /* ----- balão de fala acompanha a cabeça do paciente ----- */
  useEffect(() => {
    if (!fala_) return;
    let raf = 0;
    const tick = () => {
      const p = worldRef.current?.headScreen();
      if (bubble.current) {
        if (p) {
          bubble.current.style.left = `${p.x}px`;
          bubble.current.style.top = `${p.y}px`;
        } else {
          bubble.current.style.left = '50%';
          bubble.current.style.top = '30%';
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    const to = setTimeout(() => setFala(null), 3800);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(to);
    };
  }, [fala_]);
  const diz = (txt: string) => {
    if (!txt) return;
    setFala({ txt, key: Date.now() });
    voz.falar(txt, e.paciente.sexo, e.paciente.idade);
  };
  const [vozOn, setVozOn] = useState(voz.ligada);
  useEffect(() => () => voz.parar(), []);

  /* ----- tela cheia ----- */
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (/INPUT|TEXTAREA/.test((ev.target as HTMLElement).tagName)) return;
      if (ev.key.toLowerCase() === 'f') {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.().catch(() => {});
      }
      if (ev.key === 'Escape') {
        setMenu(null);
        setPosMenu(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ----- ações ----- */
  const naSala = () => {
    if (fase !== 'estacao') {
      toast(fase === 'leitura' ? 'Aguarde a porta abrir (ou toque em "Entrar na sala").' : 'Estação encerrada.');
      return false;
    }
    if (!proxRef.current.dentro) {
      toast('Entre na sala primeiro.');
      return false;
    }
    return true;
  };

  const higienizar = () => {
    if (!naSala()) return;
    const go = () => {
      sfx.water();
      worldRef.current?.gesture();
      setT(s => {
        if (s.abertura.higiene == null) return { ...s, abertura: { ...s.abertura, higiene: sec() } };
        if (s.execs.length) return { ...s, fechamento: { ...s.fechamento, higieneFinal: sec() } };
        return s;
      });
      toast('Mãos higienizadas.');
    };
    if (proxRef.current.pertoPia) go();
    else {
      toast('Indo até a pia…');
      worldRef.current?.walkTo('pia', go);
    }
  };

  const abrir = (k: Exclude<Abertura, 'higiene'>) => {
    if (!naSala()) return;
    setT(s => (s.abertura[k] != null ? s : { ...s, abertura: { ...s.abertura, [k]: sec() } }));
    worldRef.current?.gesture();
    if (k === 'privacidade') worldRef.current?.fecharCortina();
    diz(fala(e, k));
  };

  const agradecer = () => {
    if (!naSala()) return;
    setT(s => ({ ...s, fechamento: { ...s.fechamento, agradecer: sec() } }));
    diz(fala(e, 'agradecer'));
  };

  const posicionar = (p: Postura) => {
    setPosMenu(false);
    if (!naSala()) return;
    worldRef.current?.setPosture(p);
    setT(s => ({ ...s, postura: p, posturas: [...s.posturas, { postura: p, t: sec() }] }));
    diz(p === 'pe' ? 'Certo, vou ficar em pé.' : p === 'sentado' ? 'Pronto, sentei.' : 'Assim está bom?');
  };

  const executar = (m: Manobra) => {
    const s = tRef.current;
    const ok = !m.postura || m.postura.includes(s.postura);
    const exec = { id: m.id, t: sec(), postura: s.postura, lado: proxRef.current.lado, ok };
    setT(x => ({ ...x, execs: [...x.execs, exec] }));
    sfx.tap();
    const anim = achado(e, m);
    worldRef.current?.examinar(m.id, m.regiao, ok && anim.dor);
    if (e.pa && ok && m.id === 'pa-outro-braco') {
      const novo = s.braco === 'D' ? 'E' : 'D';
      setT(x => ({ ...x, braco: novo }));
      setLog(l => [{ key: Date.now(), nome: m.nome, texto: `Manguito agora no braço ${novo === 'D' ? 'direito' : 'esquerdo'}.`, alterado: false }, ...l]);
      return;
    }
    if (e.pa && ok && m.id === 'pa-ausculta') {
      const pa = e.pa;
      const leitura = pa.arritmia ? pa.leituras[s.medidas.length % pa.leituras.length] : pa.leituras.find(l => l.braco === s.braco) ?? pa.leituras[0];
      const palp = s.execs.some(x => x.id === 'pa-palpatoria') && s.execs.some(x => x.id === 'pa-insuflar');
      const max = Math.max(...pa.leituras.map(l => l.pas));
      const inicio = palp ? Math.round((max + 28) / 2) * 2 : 160;
      if (!palp) toast(treino ? 'Sem estimativa palpatória: você insuflou só até 160 mmHg.' : 'Insuflado até 160 mmHg.');
      setMano({ leitura, inicio, braco: s.braco ?? leitura.braco });
      return;
    }
    const a = achado(e, m);
    const aviso = ok ? undefined : treino
      ? `Paciente em "${nomePostura(s.postura)}". Posição adequada: ${m.postura!.map(nomePostura).join(' ou ')}.`
      : 'Técnica/posição inadequada — reposicione e repita.';
    // regra do avaliador: só informa o achado se a manobra foi feita corretamente
    const texto = ok ? a.texto : 'Avaliador: “sem achados”.';
    const som = ok ? somDaManobra(m.id, a.texto, vit.fc, e.paciente.fr, contextoSom, e.paciente.sexo === 'F') : null;
    setAusculta(som ? { som, titulo: m.nome, key: Date.now() } : null);
    setLog(l => [{ key: Date.now(), nome: m.nome, texto, alterado: ok && a.alterado, aviso }, ...l]);
    if (ok && a.dor) diz('Ai! Aí dói, doutor(a)!');
    if (aviso) toast(treino ? 'Atenção à posição do paciente.' : 'Avaliador: sem achados.');
  };

  const perguntar = (id: string) => {
    if (!naSala()) return;
    const q = perguntas.find(x => x.id === id)!;
    setPerguntadas(p => new Set(p).add(id));
    setLog(l => [{ key: Date.now(), nome: q.pergunta, texto: q.resposta, alterado: false, fala: true }, ...l]);
    diz(q.resposta.length > 140 ? q.resposta.slice(0, 137) + '…' : q.resposta);
  };

  const registrarMedida = (pas: number | null, pad: number | null) => {
    const m = mano!;
    setMano(null);
    setT(x => {
      const medidas = [...x.medidas, { braco: m.braco, pas, pad, t: sec() }];
      const validas = medidas.filter(y => y.pas != null && y.pad != null);
      let reg = x.registro;
      if (e.pa?.arritmia && validas.length) {
        const avg = (k: 'pas' | 'pad') => Math.round(validas.reduce((a, y) => a + (y[k] as number), 0) / validas.length);
        reg = { ...reg, pas: avg('pas'), pad: avg('pad') };
      } else if (validas.length) {
        const maior = [...validas].sort((a, b) => (b.pas as number) - (a.pas as number))[0];
        reg = { ...reg, pas: maior.pas as number, pad: maior.pad as number };
      }
      return { ...x, medidas, registro: reg };
    });
    setLog(l => [{ key: Date.now(), nome: `Medida no braço ${m.braco === 'D' ? 'direito' : 'esquerdo'}`, texto: `Você marcou: PAS ${pas ?? '—'} / PAD ${pad ?? '—'} mmHg.`, alterado: false }, ...l]);
  };

  const manobra = (m: Manobra) => {
    setMenu(null);
    if (!naSala()) return;
    if (proxRef.current.pertoPaciente || m.regiao === 'geral') executar(m);
    else {
      toast('Indo até o paciente…');
      worldRef.current?.walkTo('paciente', () => executar(m));
    }
  };

  const onAlvo = useCallback((a: Alvo) => {
    if (a.kind === 'porta') {
      if (fase === 'leitura') setPainel(true);
      return;
    }
    if (a.kind === 'pia') return higienizar();
    if (a.kind === 'avaliador') {
      diz('');
      toast('Avaliador: quando terminar, use "Finalizar". Responda os comandos verbais em Tarefas.');
      return;
    }
    if (!naSala()) return;
    setMenu(REGIAO_CLIQUE[a.regiao]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase]);

  const onFail = useCallback(() => setFallback(true), []);

  /* ----- resultado ----- */
  const res = useMemo(() => (fase === 'resultado' ? corrigir(e, t, notas) : null), [fase, e, t, notas]);
  useEffect(() => {
    if (!res) return;
    osceHistory.save({ key: attemptKey.current, id: e.id, date: Date.now(), nota: res.nota, pendentes: res.pendentes, modo, circuito: circuito?.inicio || undefined, falhas: falhas(e, t, res.itens) });
  }, [res, e.id, modo, circuito]);

  const refazer = () => {
    location.hash = href(`osce/${e.id}`) + `?modo=${modo}&r=${Date.now()}`;
  };
  const proxima = () => {
    if (circuito && circuito.i + 1 < circuito.ids.length) {
      location.hash = href(`osce/${circuito.ids[circuito.i + 1]}`) + `?modo=${modo}&c=${circuito.ids.join(',')}&i=${circuito.i + 1}&t=${circuito.inicio}`;
      return;
    }
    const mesmos = ESTACOES.filter(x => x.sistema === e.sistema);
    const n = mesmos[(mesmos.findIndex(x => x.id === e.id) + 1) % mesmos.length];
    location.hash = href(`osce/${n.id}`) + `?modo=${modo}`;
  };

  const manobrasSis = useMemo(() => doSistema(e.sistema), [e.sistema]);
  const regioesSis = useMemo(() => (Object.keys(REGIOES) as Regiao[]).filter(r => manobrasSis.some(m => m.regiao === r)), [manobrasSis]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#bfe3f5] text-ink select-none">
      {!fallback ? (
        <Boundary onError={onFail}>
          <Palco e={e} worldRef={worldRef} onAlvo={onAlvo} onHover={setHover} onProx={setProx} onFail={onFail} />
        </Boundary>
      ) : (
        <Fallback2D e={e} onRegiao={r => naSala() && setMenu(REGIAO_CLIQUE[r])} postura={t.postura} />
      )}

      {/* topo */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          <a href={href('osce')} className="flex size-10 items-center justify-center rounded-xl bg-white/90 text-ink shadow-card backdrop-blur hover:bg-white" aria-label="Sair">
            <ArrowLeft className="size-5" />
          </a>
          <div className="max-w-[34vw] rounded-xl bg-white/90 px-2.5 py-1.5 shadow-card backdrop-blur sm:max-w-none sm:px-3">
            <div className="truncate text-[11px] font-medium text-ink-3 uppercase">Estação {e.rotulo} · {nomeSistema(e.sistema)}{circuito ? ` · circuito ${circuito.i + 1}/${circuito.ids.length}` : ''}</div>
            <div className="text-[13px] font-semibold">{fase === 'leitura' ? 'Leitura do caso' : fase === 'estacao' ? (treino ? 'Treino livre' : 'Execução') : 'Correção'}</div>
          </div>
        </div>
        {fase !== 'resultado' && (
          <div className={cx('pointer-events-auto rounded-2xl px-3 py-1.5 font-mono text-[18px] font-bold shadow-card backdrop-blur tabular sm:px-4 sm:py-2 sm:text-[22px]',
            fase === 'estacao' && !treino && restante <= 60 ? 'animate-pulse bg-bad text-white' : 'bg-white/90 text-ink')}>
            {fase === 'estacao' && treino ? fmt((agora - inicio.current) / 1000) : fmt(restante)}
          </div>
        )}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          {fase !== 'resultado' && (
            <Button size="sm" aria-label="Tarefas" className="bg-white/90 shadow-card" icon={<ClipboardList className="size-4" />} onClick={() => setPainel(p => !p)}><span className="hidden sm:inline">Tarefas</span></Button>
          )}
          {voz.suportada() && (
            <button type="button" aria-label={vozOn ? 'Desligar a voz do paciente' : 'Ligar a voz do paciente'} title={vozOn ? 'Voz do paciente: ligada' : 'Voz do paciente: desligada'}
              onClick={() => setVozOn(voz.alternar())} className="flex size-9 items-center justify-center rounded-lg bg-white/90 shadow-card">
              {vozOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            </button>
          )}
          <button type="button" aria-label="Tela cheia (F)" title="Tela cheia (F)" onClick={() => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.().catch(() => {}))}
            className="hidden size-9 items-center justify-center rounded-lg bg-white/90 shadow-card sm:flex">
            <Expand className="size-4" />
          </button>
        </div>
      </div>

      {/* leitura: cartaz da porta */}
      {fase === 'leitura' && (
        <div className="absolute inset-x-0 top-20 bottom-0 overflow-y-auto px-3 pb-6">
          <div className="animate-rise mx-auto max-w-2xl rounded-3xl border-4 border-[#1f2a44] bg-[#fffdf6] p-5 shadow-pop sm:p-7">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="rounded-lg bg-[#1f2a44] px-3 py-1 font-mono text-[13px] font-bold text-white">ESTAÇÃO {e.rotulo}</span>
              <span className="text-[12px] text-ink-3">{treino ? 'Modo treino · sem limite de tempo' : '1 min de leitura · 5 min de estação'}</span>
            </div>
            {e.tipo === 'discussao' && (
              <p className="mb-3 rounded-xl bg-accent-soft px-3 py-2 text-[13px] text-accent">Estação de discussão: o exame já está descrito no caso. Entre, cumprimente o paciente e responda os comandos ao avaliador em “Tarefas”.</p>
            )}
            {e.checklist && <p className="mb-3 rounded-xl bg-good-soft px-3 py-2 text-[13px] text-good">Estação com checklist oficial do avaliador (10 pontos). O achado só é informado se a manobra for feita corretamente.</p>}
            <h2 className="mb-1.5 text-[13px] font-semibold tracking-wide text-ink-3 uppercase">Caso clínico</h2>
            <p className="text-[15px] leading-relaxed">{e.caso}</p>
            {e.vitais && <p className="mt-2 rounded-xl bg-surface-2 px-3 py-2 font-mono text-[12.5px] text-ink-2">{e.vitais}</p>}
            <h2 className="mt-4 mb-1.5 text-[13px] font-semibold tracking-wide text-ink-3 uppercase">Comandos</h2>
            <ol className="space-y-1.5">
              {e.comandos.map((c, i) => (
                <li key={i} className="flex gap-2.5 text-[14.5px] leading-snug">
                  <span className="font-mono font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span>{c.tipo && <b className="mr-1.5 rounded bg-surface-2 px-1.5 py-0.5 text-[10.5px] font-bold tracking-wide text-ink-3">{c.tipo}</b>}{c.texto}</span>
                </li>
              ))}
            </ol>
            <div className="sticky bottom-0 -mx-5 mt-5 flex justify-end bg-gradient-to-t from-[#fffdf6] via-[#fffdf6] to-transparent px-5 pt-4 pb-1 sm:static sm:mx-0 sm:bg-none sm:p-0">
              <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={entrar}>Entrar na sala</Button>
            </div>
          </div>
        </div>
      )}

      {/* dica de mira */}
      {fase === 'estacao' && hover && (
        <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 rounded-full bg-ink/85 px-3 py-1 text-[12.5px] font-medium text-bg">
          {hover.kind === 'paciente' ? `Examinar: ${REGIOES[hover.regiao]}` : hover.kind === 'pia' ? 'Higienizar as mãos' : hover.kind === 'avaliador' ? 'Avaliador' : 'Porta'}
        </div>
      )}

      {/* balão de fala */}
      {fala_ && (
        <div ref={bubble} key={fala_.key} className="pointer-events-none fixed z-30 max-w-[260px] -translate-x-1/2 -translate-y-full rounded-2xl border-2 border-ink bg-white px-3 py-2 text-[13.5px] font-medium shadow-pop">
          {fala_.txt}
          <span className="absolute -bottom-2 left-1/2 size-3 -translate-x-1/2 rotate-45 border-r-2 border-b-2 border-ink bg-white" />
        </div>
      )}

      {/* joystick (celular) */}
      {fase === 'estacao' && TOQUE && !fallback && (
        <div className="pointer-events-none absolute bottom-[104px] left-3 z-10">
          <Joystick onMove={(x, y) => { if (worldRef.current) worldRef.current.joy = { x, y }; }} />
        </div>
      )}

      {/* barra de ações */}
      {fase === 'estacao' && (
        <div className="safe-bottom absolute inset-x-0 bottom-0 p-2 sm:p-3">
          {/* celular: poucos botões grandes, o resto em folhas */}
          <div className="mx-auto grid max-w-md touch-manipulation grid-cols-5 gap-1 rounded-2xl bg-white/95 p-1.5 shadow-pop backdrop-blur sm:hidden">
            <Acao icon={<ListChecks />} label="Abertura" done={(['higiene', 'apresentar', 'explicar', 'consentimento', 'privacidade', 'dor'] as const).every(k => t.abertura[k] != null)} onClick={() => naSala() && setAberturaMenu(true)} />
            <Acao icon={<MessagesSquare />} label="Perguntar" onClick={() => naSala() && setFalarMenu(true)} />
            <Acao icon={<BedDouble />} label="Posição" onClick={() => naSala() && setPosMenu(true)} />
            <Acao icon={<Stethoscope />} label="Examinar" onClick={() => naSala() && setMenu(['geral'])} />
            <Acao icon={<Flag />} label="Finalizar" tone="bad" onClick={() => { if (confirm('Finalizar a estação agora?')) encerrar(); }} />
          </div>
          {/* computador/tablet: tudo à mão */}
          <div className="mx-auto hidden max-w-5xl gap-1.5 overflow-x-auto rounded-2xl bg-white/92 p-1.5 shadow-pop backdrop-blur sm:flex">
            <Acao icon={<Droplets />} label="Higienizar" done={t.abertura.higiene != null} onClick={higienizar} />
            <Acao icon={<Smile />} label="Apresentar-se" done={t.abertura.apresentar != null} onClick={() => abrir('apresentar')} />
            <Acao icon={<MessageCircle />} label="Explicar" done={t.abertura.explicar != null} onClick={() => abrir('explicar')} />
            <Acao icon={<ShieldCheck />} label="Consentimento" done={t.abertura.consentimento != null} onClick={() => abrir('consentimento')} />
            <Acao icon={<Lock />} label="Privacidade" done={t.abertura.privacidade != null} onClick={() => abrir('privacidade')} />
            <Acao icon={<Hand />} label="Perguntar dor" done={t.abertura.dor != null} onClick={() => abrir('dor')} />
            <Acao icon={<MessagesSquare />} label="Anamnese" onClick={() => naSala() && setFalarMenu(true)} />
            <Acao icon={<BedDouble />} label="Posicionar" onClick={() => naSala() && setPosMenu(true)} />
            <Acao icon={<Stethoscope />} label="Manobras" onClick={() => naSala() && setMenu(['geral'])} />
            <Acao icon={<HeartHandshake />} label="Agradecer" done={t.fechamento.agradecer != null} onClick={agradecer} />
            <Acao icon={<Flag />} label="Finalizar" tone="bad" onClick={() => { if (confirm('Finalizar a estação agora?')) encerrar(); }} />
          </div>
          <div className="mt-1 text-center text-[11px] font-medium text-ink/70 sm:mt-1.5 sm:text-[11.5px]">
            {fallback ? 'Modo 2D' : TOQUE ? 'Joystick para andar · arraste a tela para olhar · toque no paciente para examinar' : 'WASD para andar · arraste o mouse para olhar · clique no paciente para examinar · F tela cheia'}
            {!fallback && prox.dentro && prox.lado && ` · à ${prox.lado === 'direito' ? 'direita' : 'esquerda'} do paciente`}
          </div>
        </div>
      )}

      {/* abertura (celular) */}
      {aberturaMenu && (
        <Folha titulo="Abertura e encerramento" onClose={() => setAberturaMenu(false)}>
          <p className="px-4 pt-3 text-[12.5px] text-ink-3">HIAE-CPD: faça antes de tocar o paciente. Ao final, agradeça e higienize de novo.</p>
          <div className="grid grid-cols-2 gap-2 p-3">
            {([
              ['higiene', 'Higienizar as mãos', <Droplets key="h" />, () => { setAberturaMenu(false); higienizar(); }],
              ['apresentar', 'Apresentar-se e confirmar o nome', <Smile key="a" />, () => abrir('apresentar')],
              ['explicar', 'Explicar o exame', <MessageCircle key="e" />, () => abrir('explicar')],
              ['consentimento', 'Pedir consentimento', <ShieldCheck key="c" />, () => abrir('consentimento')],
              ['privacidade', 'Privacidade / expor só o necessário', <Lock key="p" />, () => abrir('privacidade')],
              ['dor', 'Perguntar sobre dor', <Hand key="d" />, () => abrir('dor')],
            ] as const).map(([k, label, icon, fn]) => (
              <button key={k} type="button" onClick={fn}
                className={cx('flex min-h-14 items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-[13.5px] font-medium [&>svg]:size-5 [&>svg]:shrink-0', t.abertura[k] != null ? 'border-good bg-good-soft text-good' : 'border-line')}>
                {icon}{label}{t.abertura[k] != null && <Check className="ml-auto !size-4" />}
              </button>
            ))}
            <button type="button" onClick={() => { setAberturaMenu(false); agradecer(); }}
              className={cx('col-span-2 flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 text-[13.5px] font-medium', t.fechamento.agradecer != null ? 'border-good bg-good-soft text-good' : 'border-line')}>
              <HeartHandshake className="size-5" /> Agradecer e encerrar o exame
            </button>
          </div>
        </Folha>
      )}

      {/* anamnese */}
      {falarMenu && (
        <Folha titulo="Perguntar ao paciente" onClose={() => setFalarMenu(false)}>
          <p className="px-4 pt-3 text-[12.5px] text-ink-3">O paciente responde só com o que está no caso (roteiro fixo).</p>
          <div className="grid gap-1.5 p-3">
            {perguntas.map(q => (
              <button key={q.id} type="button" onClick={() => { setFalarMenu(false); perguntar(q.id); }}
                className="flex min-h-12 items-center gap-3 rounded-xl border border-line px-3 py-2.5 text-left text-[14px] hover:border-accent">
                <MessagesSquare className="size-4 shrink-0 text-ink-3" />
                <span className="flex-1">{q.pergunta}</span>
                {perguntadas.has(q.id) && <Check className="size-4 text-good" />}
              </button>
            ))}
          </div>
        </Folha>
      )}

      {/* estetoscópio */}
      {ausculta && fase === 'estacao' && (
        <AuscultaCard key={ausculta.key} som={ausculta.som} titulo={ausculta.titulo} mostrarFase={treino} onClose={fecharAusculta} />
      )}

      {/* esfigmomanômetro */}
      {mano && (
        <Manometro leitura={mano.leitura} inicio={mano.inicio} braco={mano.braco} irregular={e.pa?.arritmia} onDone={registrarMedida} onClose={() => setMano(null)} />
      )}

      {/* posições */}
      {posMenu && (
        <Folha titulo="Posicionar o paciente" onClose={() => setPosMenu(false)}>
          <p className="px-4 pt-3 text-[13px] text-ink-3">Agora: <b className="text-ink">{nomePostura(t.postura)}</b></p>
          <div className="grid gap-1.5 p-3 sm:grid-cols-2">
            {POSTURAS.map(p => (
              <button key={p.id} type="button" onClick={() => posicionar(p.id)}
                className={cx('rounded-xl border px-3 py-3 text-left text-[14px] transition hover:border-accent', t.postura === p.id ? 'border-accent bg-accent-soft font-semibold' : 'border-line')}>
                {p.nome}
              </button>
            ))}
          </div>
        </Folha>
      )}

      {/* manobras */}
      {menu && (
        <MenuManobras dicasPermitidas={treino} regioesSis={regioesSis} inicial={menu} manobras={manobrasSis} feitas={new Set(t.execs.map(x => x.id))} onPick={manobra} onClose={() => setMenu(null)} />
      )}

      {/* painel de tarefas e achados */}
      {painel && fase !== 'resultado' && (
        <aside className="animate-rise absolute inset-x-0 top-14 bottom-0 z-40 flex flex-col overflow-hidden rounded-t-3xl border border-line bg-surface shadow-pop sm:inset-x-auto sm:top-16 sm:right-2 sm:bottom-24 sm:z-20 sm:w-[420px] sm:rounded-2xl">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <span className="text-[14px] font-semibold">Tarefas da estação</span>
            <button type="button" aria-label="Fechar" onClick={() => setPainel(false)} className="flex size-8 items-center justify-center rounded-lg hover:bg-surface-2"><X className="size-4" /></button>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            <details className="rounded-xl bg-surface-2 p-3 text-[13.5px] leading-relaxed">
              <summary className="cursor-pointer font-medium">Caso clínico</summary>
              <p className="mt-2">{e.caso}</p>
              {e.vitais && <p className="mt-2 font-mono text-[12px] text-ink-2">{e.vitais}</p>}
            </details>
            {e.comandos.map((c, i) => (
              <div key={i}>
                <p className="text-[14px] leading-snug"><b className="font-mono text-accent">{String(i + 1).padStart(2, '0')}</b> {c.texto}</p>
                {treino && manobrasDoComando(e, i).length > 0 && (() => {
                  const sp = statusPratico(e, t, i);
                  const n = manobrasDoComando(e, i).length;
                  return (
                    <p className={cx('mt-1 text-[12px] font-medium', sp.status === 'fez' ? 'text-good' : sp.status === 'parcial' ? 'text-warn' : 'text-ink-3')}>
                      {sp.status === 'fez' ? '✓ Exame deste comando concluído' : `Exame: ${n - sp.faltam.length}/${n} manobra(s) feita(s)`}
                      {sp.posicaoErrada.length > 0 && ' · refaça na posição correta'}
                    </p>
                  );
                })()}
                {temParteVerbal(e, i) && (
                  <>
                    <textarea
                      value={t.respostas[i] ?? ''}
                      onChange={ev => { const v = ev.target.value; setT(s => ({ ...s, respostas: { ...s.respostas, [i]: v } })); }}
                      placeholder="Fale ou escreva o que você diria ao avaliador…"
                      rows={2}
                      className="mt-1.5 w-full resize-y rounded-xl border border-line bg-bg px-3 py-2 text-[14px] outline-none focus:border-accent"
                    />
                    <Microfone className="mt-1" onTexto={tr => setT(s => ({ ...s, respostas: { ...s.respostas, [i]: ((s.respostas[i] ?? '') + ' ' + tr).trim() } }))} />
                  </>
                )}
              </div>
            ))}
            {e.pa && (
              <div className="rounded-xl border border-accent/40 bg-accent-soft/40 p-3">
                <h3 className="mb-2 flex items-center gap-2 text-[13px] font-semibold"><Gauge className="size-4 text-accent" /> Registro da PA</h3>
                {t.medidas.length > 0 && (
                  <ul className="mb-2 space-y-0.5 text-[12.5px] text-ink-2">
                    {t.medidas.map((m, k) => <li key={k}>Medida {k + 1} · braço {m.braco}: {m.pas ?? '—'}/{m.pad ?? '—'} mmHg</li>)}
                  </ul>
                )}
                <div className="grid grid-cols-2 gap-2">
                  {(['pas', 'pad'] as const).map(k => (
                    <label key={k} className="text-[12px] font-medium text-ink-2">{k.toUpperCase()} (mmHg)
                      <input type="number" inputMode="numeric" value={t.registro[k] ?? ''} onChange={ev => { const v = ev.target.value === '' ? undefined : Number(ev.target.value); setT(x => ({ ...x, registro: { ...x.registro, [k]: v } })); }}
                        className="mt-1 h-11 w-full rounded-xl border border-line bg-bg px-3 text-[16px] outline-none focus:border-accent" />
                    </label>
                  ))}
                </div>
                <label className="mt-2 block text-[12px] font-medium text-ink-2">Classificação
                  <select value={t.registro.classe ?? ''} onChange={ev => { const v = ev.target.value || undefined; setT(x => ({ ...x, registro: { ...x.registro, classe: v } })); }}
                    className="mt-1 h-11 w-full rounded-xl border border-line bg-bg px-3 text-[15px] outline-none focus:border-accent">
                    <option value="">Escolha…</option>
                    {CLASSES_PA.map(c => <option key={c}>{c}</option>)}
                  </select>
                </label>
                {e.pa.ortostatica && (
                  <div className="mt-2 text-[12px] font-medium text-ink-2">Hipotensão ortostática?
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      {(['sim', 'nao'] as const).map(o => (
                        <button key={o} type="button" onClick={() => setT(x => ({ ...x, registro: { ...x.registro, orto: o } }))}
                          className={cx('h-10 rounded-xl border text-[14px]', t.registro.orto === o ? 'border-accent bg-accent-soft font-semibold text-accent' : 'border-line')}>{o === 'sim' ? 'Presente' : 'Ausente'}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {log.length > 0 && (
              <div>
                <h3 className="mb-2 text-[12px] font-semibold tracking-wide text-ink-3 uppercase">Achados e respostas</h3>
                <AchadosLista log={log} />
              </div>
            )}
          </div>
        </aside>
      )}

      {/* último achado */}
      {fase === 'estacao' && log[0] && !painel && ocultaUltimo !== log[0].key && (
        <button type="button" key={log[0].key} onClick={() => setOcultaUltimo(log[0].key)} aria-label="Fechar achado"
          className="animate-rise absolute top-[68px] right-2 left-2 z-10 rounded-2xl border border-line bg-surface/95 p-3 text-left shadow-pop backdrop-blur sm:top-20 sm:left-auto sm:w-[340px]">
          <div className="mb-0.5 flex items-center gap-2 text-[12px] font-semibold text-ink-3">{log[0].fala ? <MessagesSquare className="size-3.5" /> : <Stethoscope className="size-3.5" />}<span className="flex-1">{log[0].nome}</span><X className="size-3.5" /></div>
          <p className="text-[13.5px] leading-snug">{log[0].texto}</p>
          {log[0].aviso && <p className="mt-1 text-[12px] font-medium text-warn">{log[0].aviso}</p>}
        </button>
      )}

      {fase === 'troca' && circuito && <Troca circuito={circuito} modo={modo} />}

      {res && (
        <Resultado e={e} t={t} res={res} circuito={circuito} log={log} notas={notas} setNota={(i, s) => setNotas(n => ({ ...n, [i]: s }))} onRefazer={refazer} onProxima={proxima} />
      )}
    </div>
  );
}

function Acao({ icon, label, onClick, done, tone }: { icon: ReactNode; label: string; onClick: () => void; done?: boolean; tone?: 'bad' }) {
  return (
    <button type="button" onClick={onClick}
      className={cx('relative flex min-h-14 min-w-0 shrink-0 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[11px] sm:min-w-[76px] sm:px-2 sm:text-[11.5px] font-semibold transition active:scale-95 [&>svg]:size-5',
        tone === 'bad' ? 'text-bad hover:bg-bad-soft' : 'text-ink hover:bg-surface-2', done && 'bg-good-soft text-good')}>
      {icon}
      {label}
      {done && <Check className="absolute top-1 right-1 !size-3.5" />}
    </button>
  );
}

function Folha({ titulo, onClose, children }: { titulo: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="absolute inset-0 z-40 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="animate-rise safe-bottom relative max-h-[80vh] w-full overflow-hidden rounded-t-3xl border border-line bg-surface shadow-pop sm:max-w-xl sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <span className="text-[15px] font-semibold">{titulo}</span>
          <button type="button" aria-label="Fechar" onClick={onClose} className="flex size-8 items-center justify-center rounded-lg hover:bg-surface-2"><X className="size-4" /></button>
        </div>
        <div className="max-h-[calc(80vh-56px)] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function MenuManobras({ dicasPermitidas, regioesSis, inicial, manobras, feitas, onPick, onClose }: {
  dicasPermitidas: boolean;
  regioesSis: Regiao[]; inicial: Regiao[]; manobras: Manobra[]; feitas: Set<string>; onPick: (m: Manobra) => void; onClose: () => void;
}) {
  const [sel, setSel] = useState<Regiao | 'todas'>(inicial[0] === 'geral' ? 'todas' : inicial.find(r => regioesSis.includes(r)) ?? 'todas');
  const [dicas, setDicas] = useState(dicasPermitidas);
  const lista = manobras.filter(m => sel === 'todas' || m.regiao === sel || (sel === inicial[0] && inicial.includes(m.regiao)));
  return (
    <Folha titulo="Escolha a manobra" onClose={onClose}>
      <div className="flex flex-wrap gap-1.5 border-b border-line px-3 py-2.5">
        {(['todas', ...regioesSis] as const).map(r => (
          <button key={r} type="button" onClick={() => setSel(r)}
            className={cx('rounded-full border px-3 py-1 text-[12.5px] font-medium', sel === r ? 'border-accent bg-accent-soft text-accent' : 'border-line text-ink-2')}>
            {r === 'todas' ? 'Todas' : REGIOES[r]}
          </button>
        ))}
        {dicasPermitidas && (
          <label className="ml-auto flex items-center gap-1.5 text-[12px] text-ink-3">
            <input type="checkbox" checked={dicas} onChange={ev => setDicas(ev.target.checked)} /> dicas
          </label>
        )}
      </div>
      <div className="grid gap-1 p-2">
        {lista.map(m => (
          <button key={m.id} type="button" onClick={() => onPick(m)}
            className="flex min-h-12 items-start gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-surface-2 active:bg-surface-2">
            <Stethoscope className="mt-0.5 size-4 shrink-0 text-ink-3" />
            <span className="flex-1">
              <span className="block text-[14px] font-medium">{m.nome}</span>
              {dicas && m.dica && <span className="block text-[12.5px] text-ink-3">{m.dica}</span>}
            </span>
            {feitas.has(m.id) && <Check className="size-4 text-good" />}
          </button>
        ))}
        {!lista.length && <p className="p-4 text-center text-[13px] text-ink-3">Nenhuma manobra nesta região.</p>}
      </div>
    </Folha>
  );
}

function AchadosLista({ log }: { log: Log[] }) {
  return (
    <ul className="space-y-2">
      {log.map(l => (
        <li key={l.key} className="rounded-xl border border-line p-2.5">
          <div className="text-[12px] font-semibold text-ink-3">{l.nome}</div>
          <div className="text-[13.5px] leading-snug">{l.texto}</div>
          {l.aviso && <div className="mt-1 text-[12px] text-warn">{l.aviso}</div>}
        </li>
      ))}
    </ul>
  );
}

/** Modo sem 3D: silhueta clicável. */
function Fallback2D({ e, onRegiao, postura }: { e: Estacao; onRegiao: (r: Regiao) => void; postura: Postura }) {
  const parte = (r: Regiao, label: string, cls: string) => (
    <button type="button" onClick={() => onRegiao(r)} className={cx('rounded-lg border-2 border-[#1f2a44] bg-[#9ccbe8] text-[12px] font-semibold hover:bg-[#c2e2f5]', cls)}>{label}</button>
  );
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pt-16 pb-36">
      <p className="text-[13px] text-ink-2">Paciente {e.paciente.sexo === 'F' ? 'feminina' : 'masculino'}, {e.paciente.idade} anos — {nomePostura(postura)}</p>
      {parte('cabeca', 'Cabeça', 'h-14 w-14 rounded-2xl bg-[#f1c27d]')}
      <div className="flex gap-1.5">
        {parte('mmss', 'MSD', 'h-32 w-10')}
        <div className="flex flex-col gap-1.5">{parte('torax', 'Tórax', 'h-16 w-28')}{parte('abdome', 'Abdome', 'h-16 w-28')}</div>
        {parte('mmss', 'MSE', 'h-32 w-10')}
      </div>
      {parte('mmii', 'Membros inferiores', 'h-28 w-28')}
    </div>
  );
}

function Resultado({ e, t, res, log, notas, setNota, onRefazer, onProxima, circuito, embutido }: {
  e: Estacao; t: Tentativa; res: ReturnType<typeof corrigir>; log: Log[]; circuito: Circuito | null;
  notas: Record<number, Status | null>; setNota: (i: number, s: Status) => void; onRefazer?: () => void; onProxima?: () => void; embutido?: boolean;
}) {
  const grupos = ['Abertura', 'Técnica', 'Encerramento'] as const;
  const cor = res.nota >= 70 ? 'var(--good)' : res.nota >= 50 ? 'var(--warn)' : 'var(--bad)';
  const hist = useOsceHistory();
  const ultimo = circuito && circuito.i + 1 >= circuito.ids.length;
  const doCircuito = circuito ? hist.filter(r => r.circuito === circuito.inicio) : [];
  const cola = COLAS[e.sistema];
  const pts = (x: number) => x.toLocaleString('pt-BR', { minimumFractionDigits: x % 1 ? 1 : 0, maximumFractionDigits: 2 });
  const Nota = ({ chave }: { chave: number }) => (
    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
      <span className="mr-1 text-[12.5px] text-ink-3">Você disse?</span>
      {(['fez', 'parcial', 'nao'] as Status[]).map(st => (
        <button key={st} type="button" onClick={() => setNota(chave, st)}
          className={cx('rounded-full border px-3 py-1 text-[12.5px] font-semibold', notas[chave] === st
            ? st === 'fez' ? 'border-good bg-good text-white' : st === 'parcial' ? 'border-warn bg-warn text-white' : 'border-bad bg-bad text-white'
            : 'border-line text-ink-2 hover:border-line-strong')}>
          {st === 'fez' ? 'Completo' : st === 'parcial' ? 'Parcial' : 'Não disse'}
        </button>
      ))}
    </div>
  );
  return (
    <div className={embutido ? '' : 'absolute inset-0 z-50 overflow-y-auto bg-bg'}>
      <div className={embutido ? '' : 'mx-auto max-w-3xl px-4 pt-20 pb-16'}>
        <div className="mb-6 flex items-center gap-5">
          <Ring value={res.nota} size={92} stroke={8} color={cor}>
            <span className="font-display text-[26px] font-semibold">{res.nota}</span>
          </Ring>
          <div>
            <div className="text-[12px] font-medium text-ink-3 uppercase">Estação {e.rotulo} · {nomeSistema(e.sistema)}{e.titulo ? ` · ${e.titulo}` : ''}</div>
            <h1 className="font-display text-[26px] font-semibold">Checklist do avaliador</h1>
            {res.pendentes > 0 ? (
              <p className="text-[13.5px] text-warn">Autoavalie {res.pendentes} item(ns) abaixo para fechar a nota.</p>
            ) : (
              <p className="text-[13.5px] text-ink-2">
                Nota salva no seu histórico.{' '}
                {(() => {
                  const r = hist.find(x => x.id === e.id);
                  return r ? <a href="#/carreira" className="ml-1 rounded-md bg-good-soft px-2 py-0.5 text-[12px] font-semibold text-good">+{xpOsce(r)} XP</a> : null;
                })()}
              </p>
            )}
            {e.fonte && <p className="text-[12px] text-ink-3">Fonte: {e.fonte}</p>}
          </div>
        </div>

        {ultimo && doCircuito.length > 0 && (
          <div className="mb-6 rounded-2xl border border-accent/30 bg-accent-soft p-4">
            <div className="text-[13px] font-semibold text-accent">Circuito concluído</div>
            <div className="font-display text-[28px] font-semibold">{Math.round(doCircuito.reduce((a, r) => a + r.nota, 0) / doCircuito.length)}% <span className="text-[14px] font-normal text-ink-2">de média em {doCircuito.length} estações</span></div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {[...doCircuito].reverse().map(r => {
                const x = ESTACOES.find(y => y.id === r.id);
                return <Badge key={r.key} tone={r.nota >= 70 ? 'good' : r.nota >= 50 ? 'warn' : 'bad'}>{x ? `${x.rotulo} ${nomeSistema(x.sistema)}` : r.id}: {r.nota}%</Badge>;
              })}
            </div>
          </div>
        )}

        {onRefazer && <div className="mb-6 flex flex-wrap gap-2">
          <Button variant="primary" icon={<RotateCcw className="size-4" />} onClick={onRefazer}>Refazer</Button>
          <Button onClick={onProxima}>{circuito && !ultimo ? `Próxima do circuito (${circuito.i + 2}/${circuito.ids.length})` : 'Próxima estação'}</Button>
          <Button variant="ghost" to="osce">Todas as estações</Button>
        </div>}

        {e.pacienteSimulado && <p className="mb-5 rounded-2xl bg-surface-2 px-4 py-3 text-[13px] text-ink-2"><b>Paciente simulado:</b> {e.pacienteSimulado}</p>}

        {grupos.map(g => {
          const its = res.itens.filter(x => x.grupo === g);
          if (!its.length) return null;
          return (
            <section key={g} className="mb-5">
              <h2 className="mb-2 text-[12px] font-semibold tracking-wide text-ink-3 uppercase">{g}</h2>
              <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
                {its.map((x, i) => (
                  <div key={i}>
                    <Linha label={x.label} status={x.status} detalhe={x.detalhe} pts={e.checklist ? pts(x.peso) : undefined} />
                    {x.chave != null && <div className="px-4 pb-3"><Nota chave={x.chave} /></div>}
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <section className="mb-5">
          <h2 className="mb-2 text-[12px] font-semibold tracking-wide text-ink-3 uppercase">Comandos</h2>
          <div className="space-y-3">
            {e.comandos.map((c, i) => {
              const its = res.itens.filter(x => x.comando === i);
              const req = manobrasDoComando(e, i);
              return (
                <div key={i} className="rounded-2xl border border-line bg-surface p-4">
                  <p className="mb-2 text-[14.5px] font-medium leading-snug"><span className="font-mono text-accent">{String(i + 1).padStart(2, '0')}</span> {c.texto}</p>
                  {t.respostas[i] && <p className="mb-2 rounded-xl border border-dashed border-line px-3 py-2 text-[13px] text-ink-2"><b>Sua resposta:</b> {t.respostas[i]}</p>}
                  {(c.criterios || c.erros) && (
                    <div className="mb-2 space-y-1 text-[12.5px] leading-snug">
                      {c.criterios && <p><b className="text-good">Critérios mínimos:</b> {c.criterios}</p>}
                      {c.erros && <p><b className="text-bad">Erros comuns:</b> {c.erros}</p>}
                    </div>
                  )}
                  {e.checklist ? (
                    <div className="divide-y divide-line">
                      {its.map((x, k) => (
                        <div key={k} className="py-2">
                          <Linha label={x.label} status={x.status} detalhe={x.detalhe} pts={pts(x.peso)} compact />
                          {x.chave != null && t.respostas[i] && <Coberto r={t.respostas[i]} alvo={x.label} />}
                          {x.chave != null && <Nota chave={x.chave} />}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {its.filter(x => x.auto).map((x, k) => <Linha key={k} label={`Execução${req.length ? ` (${req.length} manobra${req.length > 1 ? 's' : ''})` : ''}`} status={x.status} detalhe={x.detalhe} compact />)}
                      <details className="mt-2 rounded-xl bg-surface-2 p-3" open={temParteVerbal(e, i)}>
                        <summary className="cursor-pointer text-[13px] font-semibold">Gabarito</summary>
                        <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[13.5px] leading-snug">
                          {c.gabarito.map((g, k) => <li key={k}>{g}{t.respostas[i] && temParteVerbal(e, i) && <Coberto r={t.respostas[i]} alvo={g} inline />}</li>)}
                        </ul>
                      </details>
                      {its.filter(x => x.chave != null).map(x => <Nota key={x.chave} chave={x.chave!} />)}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {e.pontoChave && (
          <div className="mb-5 flex gap-3 rounded-2xl border border-accent/30 bg-accent-soft p-4 text-[14px]">
            <Info className="mt-0.5 size-5 shrink-0 text-accent" />
            <p><b>Ponto-chave:</b> {e.pontoChave}</p>
          </div>
        )}

        <details className="mb-5 rounded-2xl border border-line bg-surface p-4">
          <summary className="flex cursor-pointer items-center gap-2 text-[14px] font-semibold">Achados que você encontrou ({log.length}) <ChevronDown className="size-4" /></summary>
          <div className="mt-3">{log.length ? <AchadosLista log={log} /> : <p className="text-[13px] text-ink-3">Nenhuma manobra executada.</p>}</div>
          {e.achados && <p className="mt-3 text-[13px] text-ink-2"><b>Achados simulados da estação:</b> {e.achados}</p>}
        </details>

        {cola && (
          <details className="rounded-2xl border border-line bg-surface p-4">
            <summary className="flex cursor-pointer items-center gap-2 text-[14px] font-semibold"><BookOpen className="size-4 text-accent" /> Revisão rápida: {cola.titulo}</summary>
            <div className="mt-3 space-y-3 text-[13.5px] leading-snug">
              {cola.tabela && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[12.5px]">
                    <thead><tr>{cola.tabela[0].map((h, k) => <th key={k} className="border-b border-line px-2 py-1.5 font-semibold">{h}</th>)}</tr></thead>
                    <tbody>{cola.tabela.slice(1).map((r, k) => <tr key={k}>{r.map((c, j) => <td key={j} className="border-b border-line px-2 py-1.5">{c}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              )}
              {cola.pontos.map((x, k) => <p key={k}>• {x}</p>)}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}

/** Marca se o item do gabarito apareceu na resposta falada/escrita. */
function Coberto({ r, alvo, inline }: { r: string; alvo: string; inline?: boolean }) {
  const st = statusCobertura(cobertura(r, alvo));
  const txt = st === 'fez' ? '✓ na sua resposta' : st === 'parcial' ? '~ em parte' : '✗ não apareceu';
  return <span className={cx('text-[11.5px] font-semibold', inline ? 'ml-1.5' : 'mt-0.5 block', st === 'fez' ? 'text-good' : st === 'parcial' ? 'text-warn' : 'text-bad')}>{txt}</span>;
}

/* ---------- Prova completa: troca de estação e relatório ---------- */
const PROVA_KEY = 'pr.v2.osce.prova.';
interface ProvaEntrada { key: string; id: string; t: Tentativa; log: Log[]; notas: Record<number, Status | null> }

function Troca({ circuito, modo }: { circuito: Circuito; modo: Modo }) {
  const ultimo = circuito.i + 1 >= circuito.ids.length;
  const [falta, setFalta] = useState(ultimo ? 0 : circuito.troca ?? 60);
  const ir = useCallback(() => {
    if (ultimo) location.hash = href('osce/relatorio') + `?t=${circuito.inicio}`;
    else location.hash = href(`osce/${circuito.ids[circuito.i + 1]}`) + `?modo=${modo}&c=${circuito.ids.join(',')}&i=${circuito.i + 1}&t=${circuito.inicio}&x=1&tr=${circuito.troca ?? 60}`;
  }, [circuito, modo, ultimo]);
  useEffect(() => {
    if (falta <= 0) {
      ir();
      return;
    }
    const to = setTimeout(() => setFalta(f => f - 1), 1000);
    if (falta === 5) sfx.beep();
    return () => clearTimeout(to);
  }, [falta, ir]);
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#1f2a44]/95 p-6 text-center text-white">
      <div>
        <div className="text-[13px] font-semibold tracking-wide text-white/70 uppercase">Prova OSCE · estação {circuito.i + 1} de {circuito.ids.length} concluída</div>
        <div className="font-display mt-2 text-[34px] font-semibold">{ultimo ? 'Fim da prova' : 'Troca de estação'}</div>
        {!ultimo && <div className="mt-4 font-mono text-[64px] font-bold tabular">{falta}s</div>}
        <p className="mx-auto mt-2 max-w-sm text-[14px] text-white/80">{ultimo ? 'Abrindo o relatório…' : 'A correção sai só no fim, como na prova. Respire e vá para a próxima porta.'}</p>
        {!ultimo && <Button className="mt-5" onClick={ir}>Ir agora</Button>}
      </div>
    </div>
  );
}

function Relatorio({ chave }: { chave: string }) {
  const k = PROVA_KEY + chave;
  const [lista, setLista] = useState<ProvaEntrada[]>(() => storage.read<ProvaEntrada[]>(k) ?? []);
  const [aberta, setAberta] = useState<string | null>(null);
  const setNota = (key: string, i: number, st: Status) => {
    const nova = lista.map(x => (x.key === key ? { ...x, notas: { ...x.notas, [i]: st } } : x));
    setLista(nova);
    storage.write(k, nova);
    const x = nova.find(y => y.key === key)!;
    const e = ESTACOES.find(y => y.id === x.id)!;
    const r = corrigir(e, x.t, x.notas);
    osceHistory.save({ key, id: e.id, date: Date.now(), nota: r.nota, pendentes: r.pendentes, modo: 'prova', circuito: chave, falhas: falhas(e, x.t, r.itens) });
  };
  const linhas = lista.map(x => {
    const e = ESTACOES.find(y => y.id === x.id)!;
    return { x, e, r: corrigir(e, x.t, x.notas) };
  });
  if (!linhas.length) return <div className="p-10 text-center">Relatório não encontrado. <a className="text-accent underline" href={href('osce')}>Voltar</a></div>;
  const media = Math.round(linhas.reduce((a, l) => a + l.r.nota, 0) / linhas.length);
  const porSis = [...new Set(linhas.map(l => l.e.sistema))].map(s => {
    const ls = linhas.filter(l => l.e.sistema === s);
    return { s, n: Math.round(ls.reduce((a, l) => a + l.r.nota, 0) / ls.length) };
  });
  const pend = linhas.reduce((a, l) => a + l.r.pendentes, 0);
  return (
    <div className="fixed inset-0 overflow-y-auto bg-bg">
      <div className="mx-auto max-w-3xl px-4 pt-6 pb-16">
        <a href={href('osce')} className="mb-4 inline-flex items-center gap-2 text-[14px] text-ink-2 hover:text-ink"><ArrowLeft className="size-4" /> Simulador OSCE</a>
        <div className="mb-6 flex items-center gap-5">
          <Ring value={media} size={96} stroke={8} color={media >= 70 ? 'var(--good)' : media >= 50 ? 'var(--warn)' : 'var(--bad)'}>
            <span className="font-display text-[28px] font-semibold">{media}</span>
          </Ring>
          <div>
            <div className="text-[12px] font-medium text-ink-3 uppercase">Prova OSCE completa · {linhas.length} estações</div>
            <h1 className="font-display text-[26px] font-semibold">Relatório da prova</h1>
            {pend > 0 ? <p className="text-[13.5px] text-warn">Abra cada estação e confirme {pend} resposta(s) verbal(is) para fechar a nota.</p> : <p className="text-[13.5px] text-ink-2">Todas as respostas avaliadas.</p>}
          </div>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {porSis.map(p => (
            <div key={p.s} className="rounded-2xl border border-line bg-surface p-3">
              <div className="text-[12px] text-ink-3">{nomeSistema(p.s)}</div>
              <div className={cx('font-display text-[24px] font-semibold', p.n >= 70 ? 'text-good' : p.n >= 50 ? 'text-warn' : 'text-bad')}>{p.n}%</div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {linhas.map(({ x, e, r }, n) => (
            <div key={x.key} className="rounded-2xl border border-line bg-surface">
              <button type="button" onClick={() => setAberta(a => (a === x.key ? null : x.key))} className="flex w-full items-center gap-3 px-4 py-3 text-left">
                <span className="font-mono text-[13px] text-ink-3">{n + 1}</span>
                <span className="flex-1">
                  <span className="block text-[14.5px] font-medium">Estação {e.rotulo} · {nomeSistema(e.sistema)}</span>
                  <span className="block text-[12.5px] text-ink-3">{e.titulo ?? ''}{r.pendentes ? ` · ${r.pendentes} para avaliar` : ''}</span>
                </span>
                <span className={cx('tabular font-semibold', r.nota >= 70 ? 'text-good' : r.nota >= 50 ? 'text-warn' : 'text-bad')}>{r.nota}%</span>
                <ChevronDown className={cx('size-4 text-ink-3 transition', aberta === x.key && 'rotate-180')} />
              </button>
              {aberta === x.key && (
                <div className="border-t border-line p-4">
                  <Resultado embutido e={e} t={x.t} res={r} log={x.log} notas={x.notas} setNota={(i, st) => setNota(x.key, i, st)} circuito={null} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Linha({ label, status, detalhe, compact, pts }: { label: string; status: Status | null; detalhe?: string; compact?: boolean; pts?: string }) {
  const tone = status === 'fez' ? 'good' : status === 'parcial' ? 'warn' : status === 'nao' ? 'bad' : 'neutral';
  const txt = status === 'fez' ? 'Fez' : status === 'parcial' ? 'Parcial' : status === 'nao' ? 'Não fez' : 'Avaliar';
  return (
    <div className={cx('flex items-start gap-3', compact ? 'py-1' : 'px-4 py-2.5')}>
      <div className="flex-1">
        <div className="text-[14px]">{label}</div>
        {detalhe && <div className="text-[12.5px] text-ink-3">{detalhe}</div>}
      </div>
      {pts && <span className="tabular shrink-0 text-[12px] text-ink-3">{pts} pt</span>}
      <Badge tone={tone}>{txt}</Badge>
    </div>
  );
}
