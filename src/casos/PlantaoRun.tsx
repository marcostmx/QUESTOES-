import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Clock, Hourglass, RotateCcw, Stethoscope, Users, X } from 'lucide-react';
import { xpCaso } from '../app/core/career';
import { href } from '../app/router';
import { Card, cx, Ring } from '../app/ui';
import { casoHistory } from './history';
import { CORES, corInfo, FICHAS_POR_SISTEMA, Plantao, type Cor, type Paciente } from './plantao';

const hora = (min: number) => {
  const m = 19 * 60 + min;
  return `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};

function Pulseira({ cor, pequena }: { cor: Cor; pequena?: boolean }) {
  const c = corInfo(cor);
  return <span className={cx('inline-flex items-center rounded-md font-semibold', pequena ? 'px-1.5 py-0.5 text-[11px]' : 'px-2 py-0.5 text-[12px]')} style={{ background: c.hex, color: c.texto }}>{c.nome}</span>;
}

export default function PlantaoRun({ sis = 'cardiovascular' }: { sis?: string }) {
  const conf = FICHAS_POR_SISTEMA[sis] ?? FICHAS_POR_SISTEMA.cardiovascular;
  const [iniciado, setIniciado] = useState(false);
  const [chave, setChave] = useState(0);
  if (!iniciado) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg p-4">
        <Card className="w-full max-w-xl p-6 sm:p-8">
          <a href={href('casos')} className="mb-4 inline-flex items-center gap-1 text-[13px] text-ink-3"><ArrowLeft className="size-4" /> Casos</a>
          <p className="text-[12px] font-medium tracking-wide text-ink-3 uppercase">{conf.titulo} · Plantão</p>
          <h1 className="font-display mt-1 text-[28px] leading-tight font-semibold">Plantão noturno do pronto-socorro</h1>
          <p className="mt-4 text-[15px] leading-relaxed">São 19:00. Você é o médico do acolhimento: classifique o risco de cada paciente que chega e decida quem atender primeiro.</p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-[14px] text-ink-2">
            <li>Classificar leva 2 min; atender (avaliar e estabilizar) leva de 5 a 12 min.</li>
            <li>Tempos-alvo: vermelho imediato, laranja 10 min, amarelo 60, verde 120, azul 240.</li>
            <li>Paciente grave que espera demais piora.</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-1.5">{CORES.map(c => <Pulseira key={c.id} cor={c.id} />)}</div>
          <p className="mt-3 text-[12px] text-ink-3">Classificação baseada no Protocolo de Manchester, em versão simplificada e didática.</p>
          <button type="button" onClick={() => setIniciado(true)} className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink text-[15px] font-semibold text-bg"><Stethoscope className="size-4" /> Começar o plantão</button>
        </Card>
      </div>
    );
  }
  return <Jogo key={chave} sis={sis} onRefazer={() => setChave(k => k + 1)} />;
}

function Jogo({ sis, onRefazer }: { sis: string; onRefazer: () => void }) {
  const pl = useRef(new Plantao((FICHAS_POR_SISTEMA[sis] ?? FICHAS_POR_SISTEMA.cardiovascular).fichas)).current;
  const [, render] = useState(0);
  const salvo = useRef(false);
  const up = () => render(n => n + 1);

  if (pl.acabou) {
    const r = pl.resultado();
    if (!salvo.current) {
      salvo.current = true;
      casoHistory.save({ key: `plantao:${Date.now()}`, id: sis === 'cardiovascular' ? 'plantao-cardio' : `plantao-${sis}`, date: Date.now(), nota: r.nota, obito: false, minutos: pl.t });
    }
    const cor = r.nota >= 70 ? 'var(--good)' : r.nota >= 50 ? 'var(--warn)' : 'var(--bad)';
    return (
      <div className="min-h-dvh bg-bg">
        <div className="mx-auto max-w-3xl px-4 pt-8 pb-16">
          <a href={href('casos')} className="mb-4 inline-flex items-center gap-1 text-[13px] text-ink-3"><ArrowLeft className="size-4" /> Casos</a>
          <div className="mb-6 flex items-center gap-5">
            <Ring value={r.nota} size={92} stroke={8} color={cor}><span className="font-display text-[26px] font-semibold">{r.nota}</span></Ring>
            <div>
              <p className="text-[12px] font-medium text-ink-3 uppercase">Fim do plantão · {hora(pl.t)}</p>
              <h1 className="font-display text-[24px] font-semibold">{r.nTri} de {r.linhas.length} classificações corretas</h1>
              <p className="text-[14px] text-ink-2">{r.nTempo} atendidos no tempo-alvo · {r.subtri} subtriagens · {r.graves} pioras na espera</p>
              <span className="mt-1 inline-block rounded-md bg-good-soft px-2 py-0.5 text-[12px] font-semibold text-good">+{xpCaso({ nota: r.nota })} XP</span>
            </div>
          </div>
          <Card className="mb-6 divide-y divide-line">
            {r.linhas.map(({ p, espera, alvo, triagemOk, noTempo }) => (
              <div key={p.id} className="p-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[14px] font-semibold">{p.nome}, {p.idade}</span>
                  <span className="text-[13px] text-ink-2">· {p.queixa}</span>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[13px]">
                  <span className="text-ink-3">Você:</span> {p.triagem ? <Pulseira cor={p.triagem} pequena /> : '—'}
                  {triagemOk ? <Check className="size-4 text-good" /> : <><X className="size-4 text-bad" /><span className="text-ink-3">Correta:</span> <Pulseira cor={p.cor} pequena /></>}
                  <span className={cx('ml-auto tabular', noTempo ? 'text-good' : 'text-bad')}>esperou {espera} min · meta {alvo === 0 ? 'imediata' : `≤ ${alvo}`}</span>
                </div>
                <p className="mt-1 text-[13px] text-ink-2">{p.porque}{p.evento ? ` ${p.evento}.` : ''}</p>
                {p.caso && <a href={href(`casos/${p.caso}`)} className="mt-1 inline-flex items-center gap-1 text-[13px] font-semibold text-accent">Jogar o caso deste paciente <ArrowRight className="size-3.5" /></a>}
              </div>
            ))}
          </Card>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={onRefazer} className="inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-[14px] font-semibold text-bg"><RotateCcw className="size-4" /> Novo plantão</button>
            <a href={href('casos')} className="inline-flex h-11 items-center rounded-xl border border-line px-5 text-[14px] font-semibold">Casos clínicos</a>
          </div>
        </div>
      </div>
    );
  }

  const espera = (p: Paciente) => pl.t - p.chegada;
  const prox = pl.proximaChegada;
  return (
    <div className="min-h-dvh bg-bg">
      <header className="sticky top-0 z-30 flex items-center gap-2 border-b border-line bg-bg/90 px-3 py-2 backdrop-blur sm:px-5">
        <a href={href('casos')} aria-label="Sair" className="rounded-lg p-2 text-ink-2 hover:bg-surface-2"><ArrowLeft className="size-5" /></a>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold">Plantão · {(FICHAS_POR_SISTEMA[sis] ?? FICHAS_POR_SISTEMA.cardiovascular).titulo}</p>
          <p className="text-[12px] text-ink-3">{pl.pacientes.filter(p => p.fim !== undefined).length} de {pl.pacientes.length} atendidos</p>
        </div>
        <span className="tabular flex items-center gap-1.5 rounded-xl bg-surface-2 px-3 py-1.5 font-mono text-[17px] font-semibold"><Clock className="size-4" /> {hora(pl.t)}</span>
      </header>

      <div className="mx-auto grid max-w-5xl gap-4 p-3 sm:p-5 lg:grid-cols-2">
        <section>
          <h2 className="mb-2 flex items-center gap-2 text-[14px] font-semibold"><Users className="size-4" /> Aguardando classificação <span className="text-ink-3">({pl.aTriar.length})</span></h2>
          {pl.aTriar.length === 0 && <Card className="p-4 text-[14px] text-ink-2">Ninguém na recepção agora.</Card>}
          <div className="flex flex-col gap-3">
            {pl.aTriar.map(p => (
              <Card key={p.id} className="p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[15px] font-semibold">{p.nome}, {p.idade} anos</p>
                  <span className="tabular text-[12px] text-ink-3">chegou {hora(p.chegada)}</span>
                </div>
                <p className="mt-1 text-[14px] font-medium">{p.queixa}</p>
                <p className="text-[13px] text-ink-2">{p.detalhes}</p>
                <p className="tabular mt-1 rounded-lg bg-surface-2 px-2.5 py-1.5 font-mono text-[12.5px]">{p.vitais}</p>
                <div className="mt-3 grid grid-cols-5 gap-1.5">
                  {CORES.map(c => (
                    <button key={c.id} type="button" onClick={() => { pl.triar(p.id, c.id); up(); }} title={c.nome}
                      className="h-10 rounded-lg text-[11px] font-semibold leading-tight shadow-sm active:scale-95" style={{ background: c.hex, color: c.texto }}>
                      {c.nome.split(' ').map(w => <span key={w} className="block">{w}</span>)}
                    </button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2 flex items-center gap-2 text-[14px] font-semibold"><Stethoscope className="size-4" /> Fila de atendimento <span className="text-ink-3">({pl.fila.length})</span></h2>
          {pl.fila.length === 0 && <Card className="p-4 text-[14px] text-ink-2">Fila vazia.</Card>}
          <Card className="divide-y divide-line">
            {pl.fila.map(p => {
              const atrasado = espera(p) > corInfo(p.triagem!).alvo;
              return (
                <div key={p.id} className="flex items-center gap-3 p-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Pulseira cor={p.triagem!} pequena />
                      <span className="text-[14px] font-semibold">{p.nome}</span>
                    </div>
                    <p className="truncate text-[13px] text-ink-2">{p.queixa}</p>
                    <p className={cx('tabular text-[12px]', atrasado ? 'font-semibold text-bad' : 'text-ink-3')}>esperando há {espera(p)} min</p>
                  </div>
                  <button type="button" onClick={() => { pl.atender(p.id); up(); }} className="h-10 shrink-0 rounded-xl bg-ink px-4 text-[13px] font-semibold text-bg">Atender · {p.dur} min</button>
                </div>
              );
            })}
          </Card>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => { pl.aguardar(5); up(); }} className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-line px-3.5 text-[13px] font-semibold"><Hourglass className="size-4" /> Aguardar 5 min</button>
            {prox !== null && pl.aTriar.length === 0 && pl.fila.length === 0 && (
              <button type="button" onClick={() => { pl.aguardar(prox); up(); }} className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-line px-3.5 text-[13px] font-semibold">Até a próxima chegada ({prox} min)</button>
            )}
          </div>
          <Card className="mt-4 p-3.5">
            <p className="mb-2 text-[12px] font-medium text-ink-3">Ocorrências</p>
            <ol className="flex max-h-60 flex-col gap-1.5 overflow-y-auto text-[13px]">
              {[...pl.eventos].reverse().map((e, i) => (
                <li key={i} className="flex gap-2">
                  <span className="tabular shrink-0 font-mono text-[12px] text-ink-3">{hora(e.t)}</span>
                  <span className={cx(e.tipo === 'erro' ? 'text-bad' : e.tipo === 'ok' ? 'text-good' : 'text-ink-2')}>{e.texto}</span>
                </li>
              ))}
            </ol>
          </Card>
        </section>
      </div>
    </div>
  );
}
