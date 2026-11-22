import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check, HandMetal, Music, Play, RotateCcw, Syringe, X, Zap } from 'lucide-react';
import { xpCaso } from '../app/core/career';
import { href } from '../app/router';
import { Badge, Card, cx, Ring } from '../app/ui';
import { audioCtx } from '../osce/sfx';
import { amostra } from './ecg';
import { casoHistory } from './history';
import { RAPIDO, REAL, Rcp, type RcpOpcoes } from './rcp';

const agora = () => performance.now() / 1000;
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function RcpRun() {
  const [op, setOp] = useState<RcpOpcoes | null>(null);
  const [metro, setMetro] = useState(true);
  if (!op) return <Inicio metro={metro} setMetro={setMetro} onIniciar={setOp} />;
  return <Jogo key={String(op.ciclo) + Math.random()} op={op} metro={metro} onRefazer={() => setOp(null)} />;
}

function Inicio({ metro, setMetro, onIniciar }: { metro: boolean; setMetro: (b: boolean) => void; onIniciar: (o: RcpOpcoes) => void }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg p-4">
      <Card className="w-full max-w-xl p-6 sm:p-8">
        <a href={href('casos')} className="mb-4 inline-flex items-center gap-1 text-[13px] text-ink-3"><ArrowLeft className="size-4" /> Casos</a>
        <p className="text-[12px] font-medium tracking-wide text-ink-3 uppercase">Cardiovascular · Procedimento</p>
        <h1 className="font-display mt-1 text-[28px] leading-tight font-semibold">RCP de alta qualidade e desfibrilação</h1>
        <p className="mt-4 text-[15px] leading-relaxed">
          Homem de 62 anos cai no corredor. Não responde, não respira normalmente e não tem pulso. Você inicia a RCP; o desfibrilador chega em seguida.
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-[14px] text-ink-2">
          <li><b>Comprimir:</b> toque no botão (ou barra de espaço) no ritmo de <b>100–120/min</b>.</li>
          <li><b>30:2:</b> a cada 30 compressões, 2 ventilações. Pausas sempre <b>menores que 10 s</b>.</li>
          <li>Ao fim de cada ciclo, <b>analise o ritmo</b>. Se chocável: carregar, <b>"afastem-se"</b>, chocar e voltar a comprimir na hora.</li>
          <li>Adrenalina após o 2º choque.</li>
        </ul>
        <label className="mt-5 flex items-center gap-2 text-[14px]">
          <input type="checkbox" checked={metro} onChange={e => setMetro(e.target.checked)} className="size-4" />
          <Music className="size-4" /> Metrônomo a 110/min
        </label>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <button type="button" onClick={() => onIniciar(RAPIDO)} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-ink text-[15px] font-semibold text-bg"><Play className="size-4" /> Treino rápido (ciclos de 45 s)</button>
          <button type="button" onClick={() => onIniciar(REAL)} className="flex h-12 items-center justify-center rounded-xl border border-line text-[15px] font-semibold">Tempo real (ciclos de 2 min)</button>
        </div>
      </Card>
    </div>
  );
}

function Jogo({ op, metro, onRefazer }: { op: RcpOpcoes; metro: boolean; onRefazer: () => void }) {
  const r = useRef(new Rcp(op));
  const [, render] = useState(0);
  const [apertado, setApertado] = useState(false);
  const salvo = useRef(false);
  const rr = r.current;
  const up = () => render(n => n + 1);

  useEffect(() => {
    rr.iniciar(agora());
    const iv = setInterval(() => {
      rr.tick(agora());
      up();
    }, 200);
    return () => clearInterval(iv);
  }, [rr]);

  // metrônomo
  useEffect(() => {
    if (!metro || rr.fase === 'fim') return;
    const iv = setInterval(() => {
      if (rr.fase !== 'compressoes' && rr.fase !== 'pos-choque') return;
      try {
        const ctx = audioCtx();
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.frequency.value = 1100;
        g.gain.setValueAtTime(0.12, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        o.connect(g).connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.06);
      } catch { /* sem áudio */ }
    }, 60000 / 110);
    return () => clearInterval(iv);
  }, [metro, rr, rr.fase]);

  const comprimir = useCallback(() => {
    if (rr.comprimir(agora())) {
      setApertado(true);
      setTimeout(() => setApertado(false), 110);
      up();
    }
  }, [rr]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (rr.fase === 'ventilar') rr.ventilar(agora());
        else comprimir();
        up();
      }
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [comprimir, rr]);

  const fazer = (f: (t: number) => boolean) => () => {
    f(agora());
    up();
  };

  if (rr.fase === 'fim') {
    const res = rr.resultado();
    if (!salvo.current) {
      salvo.current = true;
      casoHistory.save({ key: `rcp:${Date.now()}`, id: 'rcp', date: Date.now(), nota: res.nota, obito: false, minutos: Math.round(rr.t / 60) });
    }
    const cor = res.nota >= 70 ? 'var(--good)' : res.nota >= 50 ? 'var(--warn)' : 'var(--bad)';
    return (
      <div className="min-h-dvh bg-bg">
        <div className="mx-auto max-w-2xl px-4 pt-8 pb-16">
          <div className="mb-6 flex items-center gap-5">
            <Ring value={res.nota} size={92} stroke={8} color={cor}><span className="font-display text-[26px] font-semibold">{res.nota}</span></Ring>
            <div>
              <p className="text-[12px] font-medium text-ink-3 uppercase">RCP · {mmss(rr.t)} · {res.compressoes} compressões · {rr.choques} choques</p>
              <h1 className="font-display text-[24px] font-semibold">Retorno da circulação!</h1>
              <span className="mt-1 inline-block rounded-md bg-good-soft px-2 py-0.5 text-[12px] font-semibold text-good">+{xpCaso({ nota: res.nota })} XP</span>
            </div>
          </div>
          <Card className="mb-6 divide-y divide-line">
            {res.metas.map(m => (
              <div key={m.texto} className="flex items-start gap-3 p-3.5">
                <span className={cx('mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full', m.ok ? 'bg-good text-white' : 'bg-bad-soft text-bad')}>
                  {m.ok ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                </span>
                <p className="flex-1 text-[14px] font-medium">{m.texto} <span className="font-normal text-ink-3">· {m.valor}</span></p>
                <Badge tone={m.ok ? 'good' : 'neutral'}>{m.peso}</Badge>
              </div>
            ))}
          </Card>
          <h2 className="mb-2 text-[15px] font-semibold">Linha do tempo</h2>
          <Card className="mb-6 p-4">
            <ol className="flex flex-col gap-1.5 text-[13px]">
              {rr.eventos.map((e, i) => (
                <li key={i} className="flex gap-2">
                  <span className="tabular shrink-0 font-mono text-[12px] text-ink-3">{mmss(e.t)}</span>
                  <span className={cx(e.tipo === 'erro' ? 'text-bad' : e.tipo === 'ok' ? 'text-good' : 'text-ink-2')}>{e.texto}</span>
                </li>
              ))}
            </ol>
          </Card>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={onRefazer} className="inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-[14px] font-semibold text-bg"><RotateCcw className="size-4" /> Treinar de novo</button>
            <a href={href('casos')} className="inline-flex h-11 items-center rounded-xl border border-line px-5 text-[14px] font-semibold">Casos clínicos</a>
          </div>
        </div>
      </div>
    );
  }

  const iv = rr.intervalos.slice(-5);
  const freq = iv.length ? Math.round(60 / (iv.reduce((a, b) => a + b, 0) / iv.length)) : 0;
  const pausa = rr.pausaDesde !== null ? rr.agora - rr.pausaDesde : 0;
  const naFaixa = freq >= 100 && freq <= 120;
  const restante = Math.max(0, rr.proximaAnalise - rr.t);
  const comprimindo = rr.fase === 'compressoes' || rr.fase === 'pos-choque';

  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <header className="flex items-center gap-2 border-b border-line px-3 py-2 sm:px-5">
        <a href={href('casos')} aria-label="Sair" className="rounded-lg p-2 text-ink-2 hover:bg-surface-2"><ArrowLeft className="size-5" /></a>
        <p className="min-w-0 flex-1 truncate text-[14px] font-semibold">RCP · adulto em FV</p>
        <span className="tabular rounded-xl bg-surface-2 px-3 py-1.5 font-mono text-[17px] font-semibold">{mmss(rr.t)}</span>
      </header>

      <div className="mx-auto grid w-full max-w-5xl flex-1 gap-4 p-3 sm:p-5 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-3">
          <Monitor ritmo={rr.fase === 'analise' || rr.fase === 'carregado' || rr.fase === 'pulso' ? rr.ritmo : null} desfib={rr.desfibChegou} />
          <div className="grid grid-cols-3 gap-2">
            <Medida rotulo="Frequência" valor={freq ? `${freq}/min` : '—'} tom={!freq ? 'n' : naFaixa ? 'ok' : 'ruim'} />
            <Medida rotulo="Ciclo 30:2" valor={`${rr.contagem}/30`} tom="n" />
            <Medida rotulo="Mãos fora" valor={pausa ? `${pausa.toFixed(0)} s` : '0 s'} tom={pausa > 10 ? 'ruim' : pausa > 6 ? 'alerta' : 'n'} />
          </div>
          <Regua freq={freq} />
          <p className="text-[13px] text-ink-2">
            {!rr.desfibChegou ? `Desfibrilador chegando em ${Math.ceil(op.chegadaDesfib - rr.t)} s…` : restante > 0 ? `Próxima análise do ritmo em ${Math.ceil(restante)} s` : 'Fim do ciclo: analise o ritmo ao terminar as ventilações.'}
          </p>
          {rr.eventos.length > 0 && (
            <p className={cx('rounded-xl px-3 py-2 text-[13px]', rr.eventos.at(-1)!.tipo === 'erro' ? 'bg-bad-soft text-bad' : 'bg-surface-2 text-ink-2')}>{rr.eventos.at(-1)!.texto}</p>
          )}
        </div>

        <div className="flex flex-col items-stretch gap-3">
          <Torax apertado={apertado} />
          {comprimindo && (
            <button type="button" onPointerDown={e => { e.preventDefault(); comprimir(); }}
              className={cx('h-28 rounded-3xl text-[22px] font-bold text-white shadow-pop transition-transform select-none touch-none', apertado ? 'scale-[0.97] bg-[#b91c1c]' : 'bg-[#dc2626]')}>
              {rr.fase === 'pos-choque' ? 'Retome as compressões!' : 'Comprimir'}
              <span className="block text-[13px] font-medium opacity-80">toque no ritmo · ou barra de espaço</span>
            </button>
          )}
          {rr.fase === 'ventilar' && (
            <button type="button" onClick={fazer(t => rr.ventilar(t))} className="h-28 rounded-3xl bg-[#2563eb] text-[22px] font-bold text-white shadow-pop select-none">
              Ventilar com bolsa-válvula-máscara
              <span className="block text-[13px] font-medium opacity-80">{rr.ventilacoes}/2 · cada uma em 1 s</span>
            </button>
          )}
          {rr.fase === 'pulso' && (
            <button type="button" onClick={fazer(t => rr.checarPulso(t))} className="h-20 rounded-3xl bg-good text-[20px] font-bold text-white">Checar pulso carotídeo (até 10 s)</button>
          )}
          <div className="grid grid-cols-2 gap-2">
            <Botao on={rr.analiseDevida || (rr.desfibChegou && comprimindo && rr.fase !== 'pos-choque')} destaque={rr.analiseDevida} onClick={fazer(t => rr.analisar(t))}>Analisar ritmo</Botao>
            <Botao on={rr.fase === 'analise' && rr.ritmo === 'fv'} destaque onClick={fazer(t => rr.carregar(t))}><Zap className="size-4" /> Carregar 200 J</Botao>
            <Botao on={rr.fase === 'carregado' && !rr.afastou} destaque onClick={fazer(t => rr.afastar(t))}><HandMetal className="size-4" /> "Afastem-se!"</Botao>
            <Botao on={rr.fase === 'carregado'} destaque={rr.afastou} perigo onClick={fazer(t => rr.chocar(t))}><Zap className="size-4" /> Chocar</Botao>
            <Botao on={rr.desfibChegou && rr.adrenalina === null} onClick={fazer(t => rr.darAdrenalina(t))}><Syringe className="size-4" /> Adrenalina 1 mg</Botao>
            <Botao on={rr.fase === 'analise' && rr.ritmo === 'fv'} onClick={fazer(t => { rr.fase = 'pos-choque'; rr.eventos.push({ t: rr.t, texto: 'Ritmo chocável sem choque: a FV só reverte com desfibrilação.', tipo: 'erro' }); return true; })}>Voltar sem chocar</Botao>
          </div>
        </div>
      </div>
    </div>
  );
}

function Botao({ on, destaque, perigo, onClick, children }: { on: boolean; destaque?: boolean; perigo?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" disabled={!on} onClick={onClick}
      className={cx('flex h-12 items-center justify-center gap-1.5 rounded-xl border text-[14px] font-semibold transition',
        !on && 'border-line text-ink-3 opacity-50',
        on && !destaque && 'border-line bg-surface hover:border-line-strong',
        on && destaque && !perigo && 'border-[#f59e0b] bg-[#fef3c7] text-[#92400e] animate-pulse',
        on && perigo && destaque && 'border-[#dc2626] bg-[#dc2626] text-white')}>
      {children}
    </button>
  );
}

function Medida({ rotulo, valor, tom }: { rotulo: string; valor: string; tom: 'ok' | 'ruim' | 'alerta' | 'n' }) {
  return (
    <div className={cx('rounded-xl px-3 py-2', tom === 'ok' ? 'bg-good-soft' : tom === 'ruim' ? 'bg-bad-soft' : tom === 'alerta' ? 'bg-warn-soft' : 'bg-surface-2')}>
      <p className="text-[11px] text-ink-3">{rotulo}</p>
      <p className={cx('tabular text-[18px] font-semibold', tom === 'ok' ? 'text-good' : tom === 'ruim' ? 'text-bad' : tom === 'alerta' ? 'text-warn' : '')}>{valor}</p>
    </div>
  );
}

/** régua de frequência 60–160 com faixa-alvo */
function Regua({ freq }: { freq: number }) {
  const pos = (f: number) => `${Math.min(100, Math.max(0, ((f - 60) / 100) * 100))}%`;
  return (
    <div className="relative h-3 rounded-full bg-surface-3">
      <div className="absolute inset-y-0 rounded-full bg-good/40" style={{ left: pos(100), width: '20%' }} />
      {freq > 0 && <div className="absolute -top-1 h-5 w-1.5 -translate-x-1/2 rounded-full bg-ink transition-[left] duration-200" style={{ left: pos(freq) }} />}
      <div className="absolute -bottom-4 text-[10px] text-ink-3" style={{ left: pos(100) }}>100</div>
      <div className="absolute -bottom-4 -translate-x-full text-[10px] text-ink-3" style={{ left: pos(120) }}>120</div>
    </div>
  );
}

function Torax({ apertado }: { apertado: boolean }) {
  return (
    <svg viewBox="0 0 300 150" className="mx-auto h-36 w-full max-w-sm" aria-hidden>
      <ellipse cx="150" cy="130" rx="130" ry="14" fill="rgba(0,0,0,.08)" />
      <path d="M40 120 Q40 60 90 50 L210 50 Q260 60 260 120 Z" fill="#e8b48f" stroke="#c98d66" strokeWidth="2" />
      <path d="M150 55 L150 118" stroke="#c98d66" strokeWidth="2" strokeDasharray="4 4" />
      <g style={{ transform: `translateY(${apertado ? 12 : 0}px)`, transition: 'transform 90ms' }}>
        <rect x="128" y="22" width="44" height="40" rx="14" fill="#f2c9a5" stroke="#c98d66" strokeWidth="2" />
        <rect x="120" y="2" width="22" height="30" rx="9" fill="#2563eb" />
        <rect x="158" y="2" width="22" height="30" rx="9" fill="#2563eb" />
      </g>
      <text x="150" y="145" textAnchor="middle" fontSize="11" fill="#888">metade inferior do esterno · 5–6 cm · retorno total</text>
    </svg>
  );
}

function Monitor({ ritmo, desfib }: { ritmo: 'fv' | 'sinusal' | null; desfib: boolean }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const atual = useRef(ritmo);
  atual.current = ritmo;
  useEffect(() => {
    const c = cv.current;
    if (!c || !desfib) return;
    const ctx = c.getContext('2d')!;
    const W = c.width, H = c.height;
    let x = 0, yAnt = H / 2, raf = 0;
    const t0 = performance.now();
    ctx.fillStyle = '#061015';
    ctx.fillRect(0, 0, W, H);
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      for (let i = 0; i < 3; i++) {
        x = (x + 1) % W;
        const tt = (now - t0) / 1000 + i / 180;
        const r = atual.current;
        const v = r === null ? 0.5 * Math.sin(tt * 2 * Math.PI * 1.85) + 0.15 * Math.sin(tt * 23) : amostra(r === 'fv' ? 'fv' : 'sinusal', tt, 88);
        const y = H * 0.5 - v * H * 0.3;
        ctx.fillStyle = '#061015';
        ctx.fillRect(x, 0, 6, H);
        ctx.strokeStyle = r === 'fv' ? '#ff6b6b' : '#3ce07a';
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
  }, [desfib]);
  if (!desfib) return <div className="flex h-[120px] items-center justify-center rounded-2xl bg-[#061015] text-[13px] text-white/60">Aguardando o desfibrilador…</div>;
  return (
    <div className="overflow-hidden rounded-2xl bg-[#061015]">
      <div className="flex justify-between px-3 pt-2 text-[11px] text-white/60">
        <span>Pás · II</span>
        <span>{ritmo === null ? 'artefato de compressão' : ritmo === 'fv' ? 'FV · CHOCÁVEL' : 'ritmo organizado'}</span>
      </div>
      <canvas ref={cv} width={600} height={120} className="block h-[110px] w-full" />
    </div>
  );
}
