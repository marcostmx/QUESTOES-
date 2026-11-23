import { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, AlertTriangle, ArrowLeft, Check, Clock, FileText, MessageSquare, Pause, Play, RotateCcw, X } from 'lucide-react';
import { xpCaso } from '../app/core/career';
import { href } from '../app/router';
import { Badge, Card, cx, Dialog, Ring } from '../app/ui';
import { casoPorId } from './catalogo';
import { amostra, desenhaECG12 } from './ecg';
import { casoHistory } from './history';
import { avancar, bloqueio, debriefing, executar, GRUPOS, novoEstado, relogio, type Caso, type Estado, type Grupo, type Resultado } from './motor';

/** segundos de jogo por segundo real */
const VELOCIDADE = 4;

export default function CasoRun({ id }: { id: string }) {
  const caso = casoPorId(id);
  if (!caso) {
    return (
      <div className="p-8">
        <p>Caso não encontrado.</p>
        <a className="text-accent" href={href('casos')}>Voltar</a>
      </div>
    );
  }
  return <Jogo key={id} caso={caso} />;
}

function Jogo({ caso }: { caso: Caso }) {
  const [fase, setFase] = useState<'intro' | 'jogo' | 'fim'>('intro');
  const est = useRef<Estado>(novoEstado(caso));
  const [, render] = useState(0);
  const [pausa, setPausa] = useState(false);
  const [grupo, setGrupo] = useState<Grupo>('Monitorização');
  const [figura, setFigura] = useState<Resultado | null>(null);
  const chave = useRef(`${caso.id}:${Date.now()}`);
  const e = est.current;

  // relógio de jogo em tempo real
  useEffect(() => {
    if (fase !== 'jogo' || pausa) return;
    const iv = setInterval(() => {
      avancar(caso, est.current, (caso.velocidade ?? VELOCIDADE) / 4);
      render(n => n + 1);
      if (est.current.fim) setFase('fim');
    }, 250);
    return () => clearInterval(iv);
  }, [fase, pausa, caso]);

  const fazer = (aid: string) => {
    executar(caso, e, aid);
    render(n => n + 1);
    if (e.fim) setFase('fim');
  };

  const deb = useMemo(() => (fase === 'fim' ? debriefing(caso, e) : null), [fase, caso, e]);
  useEffect(() => {
    if (!deb) return;
    casoHistory.save({ key: chave.current, id: caso.id, date: Date.now(), nota: deb.nota, obito: deb.obito, minutos: Math.round(e.t / 60) });
  }, [deb, caso.id, e.t]);

  const refazer = () => {
    est.current = novoEstado(caso);
    chave.current = `${caso.id}:${Date.now()}`;
    setPausa(false);
    setGrupo('Monitorização');
    setFase('intro');
  };

  if (fase === 'intro') return <Intro caso={caso} onIniciar={() => setFase('jogo')} />;
  if (fase === 'fim' && deb) return <Debrief caso={caso} e={e} deb={deb} onRefazer={refazer} />;

  const acoes = caso.acoes.filter(a => a.grupo === grupo && (a.visivel?.(e) ?? true));
  const alerta = !e.v.pulso;
  const gruposVisiveis = GRUPOS.filter(gr => caso.acoes.some(a => a.grupo === gr && (a.visivel?.(e) ?? true)));

  return (
    <div className="min-h-dvh bg-bg">
      <header className="sticky top-0 z-30 flex items-center gap-2 border-b border-line bg-bg/90 px-3 py-2 backdrop-blur sm:px-5">
        <a href={href('casos')} aria-label="Sair do caso" className="rounded-lg p-2 text-ink-2 hover:bg-surface-2"><ArrowLeft className="size-5" /></a>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] text-ink-3">{caso.local} · {caso.paciente.nome}, {caso.paciente.idade} anos</p>
          <p className="truncate text-[14px] font-semibold">{caso.titulo}</p>
        </div>
        <div className={cx('tabular flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-[18px] font-semibold', alerta ? 'bg-bad text-white' : 'bg-surface-2')}>
          <Clock className="size-4" /> {relogio(e.t)}
        </div>
        <button type="button" onClick={() => setPausa(p => !p)} aria-label={pausa ? 'Continuar' : 'Pausar'} className="rounded-lg p-2 text-ink-2 hover:bg-surface-2">
          {pausa ? <Play className="size-5" /> : <Pause className="size-5" />}
        </button>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-4 p-3 sm:p-5 lg:grid lg:grid-cols-[1.15fr_1fr]">
        <div className="contents min-w-0 lg:flex lg:flex-col lg:gap-4">
          <div className="order-1 min-w-0"><Monitor e={e} caso={caso} /></div>
          <Card className={cx('order-2 p-4', alerta && 'border-bad')}>
            <div className="flex items-start gap-3">
              <span className={cx('flex size-9 shrink-0 items-center justify-center rounded-xl', alerta ? 'bg-bad-soft text-bad' : 'bg-surface-2 text-ink-2')}>
                {alerta ? <AlertTriangle className="size-5" /> : <MessageSquare className="size-4" />}
              </span>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold">{e.quadro || 'Paciente acordado, ansioso.'}</p>
                {e.v.pulso && (caso.triagem.dor ?? 0) > 0 && <p className="text-[13px] text-ink-2">Dor {Math.round(e.v.dor)}/10</p>}
              </div>
            </div>
          </Card>
          {e.resultados.length > 0 && (
            <Card className="order-4 divide-y divide-line">
              {[...e.resultados].reverse().map(r => (
                <div key={r.id + r.t} className="flex items-start gap-3 p-3.5">
                  <FileText className="mt-0.5 size-4 shrink-0 text-ink-3" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold">{r.titulo} <span className="font-normal text-ink-3">· {relogio(r.t)}</span></p>
                    <p className="text-[13px] text-ink-2">{r.texto}</p>
                    {r.figura && <button type="button" className="mt-1.5 text-[13px] font-semibold text-accent" onClick={() => setFigura(r)}>Ver traçado</button>}
                  </div>
                </div>
              ))}
            </Card>
          )}
          {e.pendentes.length > 0 && (
            <p className="order-5 text-[12px] text-ink-3">Aguardando: {e.pendentes.map(p => `${p.titulo} (${relogio(p.pronto)})`).join(' · ')}</p>
          )}
        </div>

        <div className="contents min-w-0 lg:flex lg:flex-col lg:gap-4">
          <Card className="order-3 p-3">
            <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
              {gruposVisiveis.map(gr => (
                <button key={gr} type="button" onClick={() => setGrupo(gr)}
                  className={cx('shrink-0 rounded-full px-3 py-1.5 text-[13px] font-medium', grupo === gr ? 'bg-ink text-bg' : 'text-ink-2 hover:bg-surface-2')}>
                  {gr}
                </button>
              ))}
            </div>
            <div className="mt-2 grid gap-2">
              {acoes.map(a => {
                const b = bloqueio(e, a);
                const feito = e.feito[a.id] !== undefined;
                return (
                  <button key={a.id} type="button" disabled={!!b} onClick={() => fazer(a.id)}
                    className={cx('flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition',
                      b ? 'border-line bg-surface-2/50 text-ink-3' : 'border-line bg-surface hover:border-line-strong active:scale-[0.99]',
                      a.grupo === 'Procedimentos' && !b && 'border-bad/50')}>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-medium">{a.rotulo}</span>
                      {(b && b !== 'Já feito' ? b : a.detalhe) && <span className="block text-[12px] text-ink-3">{b && b !== 'Já feito' ? b : a.detalhe}</span>}
                    </span>
                    {feito && <Check className="size-4 shrink-0 text-good" />}
                    <span className="tabular shrink-0 text-[11px] text-ink-3">{a.dur >= 60 ? `${Math.round(a.dur / 60)} min` : `${a.dur} s`}</span>
                  </button>
                );
              })}
            </div>
          </Card>
          <Card className="order-6 p-3.5">
            <p className="mb-2 text-[12px] font-medium text-ink-3">Linha do tempo</p>
            <ol className="flex max-h-64 flex-col gap-1.5 overflow-y-auto text-[13px]">
              {[...e.log].reverse().slice(0, 30).map((l, i) => (
                <li key={i} className="flex gap-2">
                  <span className="tabular shrink-0 font-mono text-[12px] text-ink-3">{relogio(l.t)}</span>
                  <span className={cx(l.tipo === 'alerta' ? 'text-bad' : l.tipo === 'acao' ? 'font-medium' : l.tipo === 'fala' ? 'italic text-ink-2' : 'text-ink-2')}>{l.texto}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>

      <Dialog open={!!figura} onClose={() => setFigura(null)} title={figura?.titulo} wide>
        {figura?.figura && <Ecg12 figura={figura.figura} />}
        <p className="mt-3 px-1 text-[13px] text-ink-2">{figura?.texto}</p>
      </Dialog>
    </div>
  );
}

function Ecg12({ figura }: { figura: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) desenhaECG12(ref.current, figura);
  }, [figura]);
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <canvas ref={ref} width={1300} height={560} className="block w-full min-w-[640px]" />
    </div>
  );
}

/* ---------- monitor multiparamétrico ---------- */
function Monitor({ e, caso }: { e: Estado; caso: Caso }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const vit = useRef(e.v);
  vit.current = e.v;
  const on = e.monitorado;
  const oxi = e.feito.oximetro !== undefined;

  useEffect(() => {
    const c = cv.current;
    if (!c || !on) return;
    const ctx = c.getContext('2d')!;
    let raf = 0, x = 0, ant = performance.now(), yAnt = 0;
    const t0 = performance.now();
    const W = c.width, H = c.height;
    ctx.fillStyle = '#061015';
    ctx.fillRect(0, 0, W, H);
    const pxs = W / 5; // 5 s na tela
    const loop = (agora: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.1, (agora - ant) / 1000);
      ant = agora;
      const passos = Math.max(1, Math.round(dt * pxs));
      for (let i = 0; i < passos; i++) {
        x = (x + 1) % W;
        const tt = (agora - t0) / 1000 - (passos - i) / pxs;
        const v = vit.current;
        const y = H * 0.55 - amostra(v.ritmo, tt, v.fc) * H * 0.32;
        ctx.fillStyle = '#061015';
        ctx.fillRect(x, 0, 6, H);
        ctx.strokeStyle = v.ritmo === 'fv' || v.ritmo === 'tv' ? '#ff6b6b' : '#3ce07a';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - 1, x ? yAnt : y);
        ctx.lineTo(x, y);
        ctx.stroke();
        yAnt = y;
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [on]);

  const v = e.v;
  const num = (valor: string, rotulo: string, cor: string, peq?: string) => (
    <div className="min-w-0">
      <p className="text-[11px] font-semibold tracking-wide uppercase" style={{ color: cor }}>{rotulo}</p>
      <p className="tabular font-mono text-[22px] leading-none font-semibold sm:text-[28px]" style={{ color: cor }}>{valor}</p>
      {peq && <p className="tabular font-mono text-[11px]" style={{ color: cor, opacity: 0.75 }}>{peq}</p>}
    </div>
  );
  if (!on) {
    const tr = caso.triagem;
    return (
      <div className="rounded-2xl bg-[#061015] p-4 text-white">
        <div className="flex items-center gap-2 text-[13px] text-white/60"><Activity className="size-4" /> Monitor desconectado</div>
        <p className="mt-2 text-[14px]">Conecte o monitor (aba Monitorização) para ver o ritmo e os sinais em tempo real.</p>
        <p className="mt-3 text-[12px] text-white/50">Triagem: PA {tr.pas}/{tr.pad} · FC {tr.fc} · SpO₂ {tr.spo2}% · FR {tr.fr} · dor {tr.dor}/10</p>
      </div>
    );
  }
  const semPulso = !v.pulso;
  return (
    <div className="overflow-hidden rounded-2xl bg-[#061015] text-white">
      <div className="flex items-center justify-between px-4 pt-3 text-[11px] text-white/50">
        <span>II · 25 mm/s</span>
        <span>{v.ritmo === 'fv' ? 'ALARME: FV' : !v.pulso && v.ritmo === 'sinusal' ? 'AESP · SEM PULSO' : v.ritmo === 'tv' ? 'ALARME: TAQUICARDIA VENTRICULAR' : v.ritmo === 'riva' ? 'RIVA' : v.ritmo === 'mp' ? 'MARCA-PASSO · captura' : ''}</span>
      </div>
      <canvas ref={cv} width={900} height={170} className="block h-[120px] w-full sm:h-[150px]" />
      <div className="grid grid-cols-[0.8fr_1.5fr_0.8fr_0.7fr] gap-2 px-4 pt-1 pb-4">
        {num(semPulso ? '---' : String(Math.round(v.fc)), 'FC', '#3ce07a')}
        {num(semPulso ? '--/--' : `${Math.round(v.pas)}/${Math.round(v.pad)}`, 'PA', '#ffffff', semPulso ? '' : `PAM ${Math.round((v.pas + 2 * v.pad) / 3)}`)}
        {num(!oxi || semPulso ? '--' : String(Math.round(v.spo2)), 'SpO₂', '#4fc3f7')}
        {num(semPulso ? '--' : String(Math.round(v.fr)), 'FR', '#ffd54f')}
      </div>
    </div>
  );
}

/* ---------- abertura ---------- */
function Intro({ caso, onIniciar }: { caso: Caso; onIniciar: () => void }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg p-4">
      <Card className="w-full max-w-xl p-6 sm:p-8">
        <a href={href('casos')} className="mb-4 inline-flex items-center gap-1 text-[13px] text-ink-3"><ArrowLeft className="size-4" /> Casos</a>
        <p className="text-[12px] font-medium tracking-wide text-ink-3 uppercase">{caso.local}</p>
        <h1 className="font-display mt-1 text-[28px] leading-tight font-semibold">{caso.titulo}</h1>
        <p className="mt-1 text-[14px] text-ink-2">{caso.subtitulo}</p>
        <div className="mt-5 space-y-3 text-[15px] leading-relaxed">
          {caso.chegada.map(p => <p key={p}>{p}</p>)}
        </div>
        <div className="mt-5 rounded-xl bg-surface-2 p-3.5 text-[13px] text-ink-2">
          <p className="font-semibold text-ink">Como funciona</p>
          <p className="mt-1">O relógio corre ({(caso.velocidade ?? VELOCIDADE) === 1 ? 'em tempo real' : `1 s real = ${caso.velocidade ?? VELOCIDADE} s no caso`}) e cada conduta gasta tempo. O paciente melhora ou piora conforme o que você faz. No fim, você recebe o debriefing com as metas e o tempo de cada conduta. Dá para pausar a qualquer momento.</p>
        </div>
        <button type="button" onClick={onIniciar} className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink text-[15px] font-semibold text-bg active:scale-[0.99]">
          <Play className="size-4" /> Assumir o caso
        </button>
      </Card>
    </div>
  );
}

/* ---------- debriefing ---------- */
function Debrief({ caso, e, deb, onRefazer }: { caso: Caso; e: Estado; deb: ReturnType<typeof debriefing>; onRefazer: () => void }) {
  const cor = deb.nota >= 70 ? 'var(--good)' : deb.nota >= 50 ? 'var(--warn)' : 'var(--bad)';
  return (
    <div className="min-h-dvh bg-bg">
      <div className="mx-auto max-w-3xl px-4 pt-8 pb-16">
        <a href={href('casos')} className="mb-4 inline-flex items-center gap-1 text-[13px] text-ink-3"><ArrowLeft className="size-4" /> Casos</a>
        <div className="mb-6 flex items-center gap-5">
          <Ring value={deb.nota} size={92} stroke={8} color={cor}>
            <span className="font-display text-[26px] font-semibold">{deb.nota}</span>
          </Ring>
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-ink-3 uppercase">Debriefing · {relogio(e.t)} de caso</p>
            <h1 className="font-display text-[24px] leading-tight font-semibold">{caso.titulo}</h1>
            <p className={cx('text-[14px]', deb.obito ? 'text-bad' : 'text-ink-2')}>{e.fim?.texto}</p>
            <a href={href('carreira')} className="mt-1 inline-block rounded-md bg-good-soft px-2 py-0.5 text-[12px] font-semibold text-good">+{xpCaso({ nota: deb.nota })} XP</a>
          </div>
        </div>

        <h2 className="mb-2 text-[15px] font-semibold">Metas</h2>
        <Card className="mb-6 divide-y divide-line">
          {deb.metas.map(({ m, ok, nota }) => (
            <div key={m.id} className="flex items-start gap-3 p-3.5">
              <span className={cx('mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full', ok ? 'bg-good text-white' : 'bg-bad-soft text-bad')}>
                {ok ? <Check className="size-3.5" /> : <X className="size-3.5" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium">{m.texto} {nota && <span className="font-normal text-ink-3">· {nota}</span>}</p>
                {!ok && <p className="text-[13px] text-ink-2">{m.dica}</p>}
              </div>
              <Badge tone={ok ? 'good' : 'neutral'}>{m.peso} pts</Badge>
            </div>
          ))}
        </Card>

        {deb.penal.length > 0 && (
          <>
            <h2 className="mb-2 text-[15px] font-semibold">Condutas inadequadas</h2>
            <Card className="mb-6 divide-y divide-line">
              {deb.penal.map(p => (
                <div key={p.texto} className="flex items-start gap-3 p-3.5">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-bad" />
                  <p className="flex-1 text-[14px]">{p.texto} <span className="text-ink-3">· {relogio(p.t)}</span></p>
                  <Badge tone="bad">−{p.pts}</Badge>
                </div>
              ))}
            </Card>
          </>
        )}

        <h2 className="mb-2 text-[15px] font-semibold">Para levar</h2>
        <Card className="mb-6 p-4">
          <ul className="list-disc space-y-1.5 pl-5 text-[14px] text-ink-2">
            {caso.ensino.map(t => <li key={t}>{t}</li>)}
          </ul>
        </Card>

        <h2 className="mb-2 text-[15px] font-semibold">Linha do tempo</h2>
        <Card className="mb-8 p-4">
          <ol className="flex flex-col gap-1.5 text-[13px]">
            {e.log.map((l, i) => (
              <li key={i} className="flex gap-2">
                <span className="tabular shrink-0 font-mono text-[12px] text-ink-3">{relogio(l.t)}</span>
                <span className={cx(l.tipo === 'alerta' ? 'text-bad' : l.tipo === 'acao' ? 'font-medium' : 'text-ink-2')}>{l.texto}</span>
              </li>
            ))}
          </ol>
        </Card>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onRefazer} className="inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-[14px] font-semibold text-bg"><RotateCcw className="size-4" /> Refazer o caso</button>
          <a href={href('casos')} className="inline-flex h-11 items-center rounded-xl border border-line px-5 text-[14px] font-semibold">Outros casos</a>
        </div>
      </div>
    </div>
  );
}
