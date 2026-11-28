import { useEffect, useRef, useState } from 'react';
import { Activity, Check, FileText, FlaskConical, HeartPulse, MessageSquare, Phone, Pill, Stethoscope, X, Zap } from 'lucide-react';
import { cx } from '../app/ui';
import { Emergencia3D, GRUPO_DA_ESTACAO, NOME_ESTACAO, type Estacao3D, type Pino } from './Emergencia3D';
import { bloqueio, relogio, type Caso, type Estado, type Resultado } from './motor';

const ICONE: Record<Estacao3D, typeof Activity> = {
  paciente: Stethoscope, monitor: Activity, exames: FlaskConical, medicacoes: Pill, procedimentos: Zap, decisao: Phone,
};

export function Sala3DView({ caso, e, tick, som, fazer, verFigura }: {
  caso: Caso; e: Estado; tick: number; som: boolean;
  fazer: (id: string) => void; verFigura: (r: Resultado) => void;
}) {
  const cv = useRef<HTMLCanvasElement>(null);
  const mundo = useRef<Emergencia3D | null>(null);
  const [pinos, setPinos] = useState<Pino[]>([]);
  const [estacao, setEstacao] = useState<Estacao3D | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    if (!cv.current) return;
    try {
      mundo.current = new Emergencia3D(cv.current, { sexo: caso.paciente.sexo, onEstacao: setEstacao, onPinos: setPinos });
    } catch {
      setErro(true);
    }
    return () => {
      mundo.current?.dispose();
      mundo.current = null;
    };
  }, [caso.paciente.sexo]);

  // efeitos visuais das condutas (choque, RCP)
  const nLog = useRef(e.log.length);
  useEffect(() => {
    const novos = e.log.slice(nLog.current);
    nLog.current = e.log.length;
    for (const l of novos) if (l.tipo === 'acao' && /desfibril|choque|cardiovers/i.test(l.texto)) mundo.current?.choque();
  }, [tick, e]);
  useEffect(() => {
    if (mundo.current) mundo.current.rcp = e.fx.rcp === true && !e.v.pulso;
  }, [tick, e]);
  useEffect(() => {
    mundo.current?.atualizar(e.v, e.monitorado, e.quadro, e.feito.oximetro !== undefined || !caso.acoes.some(x => x.id === 'oximetro'));
  }, [tick, e]);
  useEffect(() => {
    if (mundo.current) mundo.current.som = som;
  }, [som]);

  const abrir = (id: Estacao3D) => {
    mundo.current?.irPara(id);
    setEstacao(id);
  };
  const fechar = () => {
    mundo.current?.irPara('geral');
    setEstacao(null);
  };

  const grupo = estacao ? GRUPO_DA_ESTACAO[estacao] : null;
  const acoes = grupo ? caso.acoes.filter(a => a.grupo === grupo && (a.visivel?.(e) ?? true)) : [];
  const temAcao = (id: Estacao3D) => caso.acoes.some(a => a.grupo === GRUPO_DA_ESTACAO[id] && (a.visivel?.(e) ?? true));
  const ultimos = [...e.log].reverse().slice(0, 3);
  const alerta = !e.v.pulso;

  if (erro) return <div className="flex h-full items-center justify-center p-6 text-center text-white">Não foi possível abrir a sala 3D neste aparelho. Use o modo 2D (botão no topo).</div>;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas ref={cv} className="block h-full w-full touch-none" />

      {/* marcadores das estações */}
      {pinos.filter(p => p.visivel && temAcao(p.id) && p.id !== estacao).map(p => {
        const I = ICONE[p.id];
        return (
          <button key={p.id} type="button" onClick={() => abrir(p.id)} style={{ left: p.x, top: p.y }}
            className={cx('absolute -translate-x-1/2 -translate-y-full flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[12px] font-semibold shadow-pop transition hover:scale-105',
              p.id === 'procedimentos' && alerta ? 'animate-pulse border-[#ff3b30] bg-[#ff3b30] text-white' : 'border-white/40 bg-black/60 text-white backdrop-blur')}>
            <I className="size-3.5" /> {NOME_ESTACAO[p.id]}
          </button>
        );
      })}

      {/* vitais compactos (quando monitorado) */}
      {e.monitorado && (
        <div className="pointer-events-none absolute top-3 left-3 flex gap-2 rounded-xl bg-black/65 px-3 py-2 font-mono text-[13px] font-semibold text-white backdrop-blur sm:text-[15px]">
          <span className="text-[#3ce07a]">FC {e.v.pulso ? Math.round(e.v.fc) : '--'}</span>
          <span>PA {e.v.pulso ? `${Math.round(e.v.pas)}/${Math.round(e.v.pad)}` : '--'}</span>
          {e.feito.oximetro !== undefined && <span className="text-[#4fc3f7]">SpO₂ {e.v.pulso ? Math.round(e.v.spo2) : '--'}</span>}
          <span className="text-[#ffd54f]">FR {e.v.pulso ? Math.round(e.v.fr) : '--'}</span>
        </div>
      )}

      {/* fala/estado do paciente e últimos eventos */}
      {!estacao && (
        <div className="absolute inset-x-0 bottom-0 flex justify-start gap-1.5 overflow-x-auto sm:justify-center bg-gradient-to-t from-black/70 to-transparent px-3 pt-6 pb-3">
          {(Object.keys(NOME_ESTACAO) as Estacao3D[]).filter(temAcao).map(id => {
            const I = ICONE[id];
            return (
              <button key={id} type="button" onClick={() => abrir(id)}
                className={cx('flex shrink-0 flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[11px] font-semibold text-white transition active:scale-95',
                  id === 'procedimentos' && alerta ? 'animate-pulse bg-[#ff3b30]' : 'bg-white/15 hover:bg-white/25')}>
                <I className="size-5" />
                <span className="max-w-[5.5rem] truncate">{NOME_ESTACAO[id]}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className={cx('pointer-events-none absolute bottom-24 left-3 flex max-w-[min(26rem,calc(100%-1.5rem))] flex-col gap-2', estacao && 'max-lg:hidden')}>
        <div className={cx('flex items-start gap-2 rounded-2xl px-3.5 py-2.5 text-[14px] shadow-pop', alerta ? 'bg-[#ff3b30] text-white' : 'bg-white/95 text-[#1f2328]')}>
          {alerta ? <HeartPulse className="mt-0.5 size-4 shrink-0" /> : <MessageSquare className="mt-0.5 size-4 shrink-0" />}
          <span className="font-medium">{e.quadro || 'Paciente acordado, ansioso.'}</span>
        </div>
        {ultimos.slice(0, 2).map((l, i) => (
          <div key={`${l.t}-${i}`} className={cx('rounded-xl px-3 py-1.5 text-[12.5px] backdrop-blur max-sm:line-clamp-3', i ? 'opacity-70 max-sm:hidden' : '', l.tipo === 'alerta' ? 'bg-[#ff3b30]/85 text-white' : 'bg-black/60 text-white')}>
            <span className="mr-1.5 font-mono opacity-70">{relogio(l.t)}</span>{l.texto}
          </div>
        ))}
      </div>

      {!estacao && (
        <p className="pointer-events-none absolute top-3 right-3 hidden rounded-xl bg-black/55 px-3 py-2 text-[12px] text-white/90 backdrop-blur sm:block">
          Clique nos objetos ou nos marcadores para agir · arraste para olhar
        </p>
      )}

      {/* painel da estação */}
      {estacao && grupo && (
        <div className="absolute inset-x-0 bottom-0 max-h-[58%] overflow-y-auto rounded-t-3xl bg-bg p-4 shadow-pop lg:inset-y-3 lg:right-3 lg:left-auto lg:max-h-none lg:w-[400px] lg:rounded-3xl">
          <div className="mb-3 flex items-center gap-2">
            {(() => {
              const I = ICONE[estacao];
              return <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent"><I className="size-4" /></span>;
            })()}
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold">{NOME_ESTACAO[estacao]}</p>
              <p className="text-[12px] text-ink-3">{grupo}</p>
            </div>
            <button type="button" onClick={fechar} aria-label="Fechar" className="rounded-lg p-2 text-ink-2 hover:bg-surface-2"><X className="size-5" /></button>
          </div>
          <div className="grid gap-2">
            {acoes.map(a => {
              const b = bloqueio(e, a);
              const feito = e.feito[a.id] !== undefined;
              return (
                <button key={a.id} type="button" disabled={!!b} onClick={() => fazer(a.id)}
                  className={cx('flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition',
                    b ? 'border-line bg-surface-2/50 text-ink-3' : 'border-line bg-surface hover:border-line-strong active:scale-[0.99]')}>
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
          {estacao === 'exames' && (e.resultados.length > 0 || e.pendentes.length > 0) && (
            <div className="mt-4">
              <p className="mb-2 text-[12px] font-medium text-ink-3">Resultados</p>
              <div className="flex flex-col gap-2">
                {[...e.resultados].reverse().map(r => (
                  <div key={r.id + r.t} className="flex items-start gap-2.5 rounded-xl bg-surface-2 p-3">
                    <FileText className="mt-0.5 size-4 shrink-0 text-ink-3" />
                    <div className="min-w-0 text-[13px]">
                      <p className="font-semibold">{r.titulo} <span className="font-normal text-ink-3">· {relogio(r.t)}</span></p>
                      <p className="text-ink-2">{r.texto}</p>
                      {r.figura && <button type="button" className="mt-1 font-semibold text-accent" onClick={() => verFigura(r)}>Ver traçado</button>}
                    </div>
                  </div>
                ))}
                {e.pendentes.map(p => <p key={p.id + p.t} className="text-[12px] text-ink-3">Aguardando {p.titulo} ({relogio(p.pronto)})</p>)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
