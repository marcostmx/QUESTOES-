/* Painel de ausculta: toca o som sintetizado e desenha o traçado (fonocardiograma simplificado). */
import { useEffect, useRef, useState } from 'react';
import { Headphones, Square } from 'lucide-react';
import { cx } from '../app/ui';
import { Estetoscopio, type Som } from './ausculta';
import { gravacaoPara } from './gravacoes';
import { audioCtx } from './sfx';

const cache = new Map<string, Promise<AudioBuffer>>();
function carregar(ctx: AudioContext, url: string) {
  let p = cache.get(url);
  if (!p) {
    p = fetch(url).then(r => {
      if (!r.ok) throw new Error(String(r.status));
      return r.arrayBuffer();
    }).then(b => ctx.decodeAudioData(b));
    p.catch(() => cache.delete(url));
    cache.set(url, p);
  }
  return p;
}

export function AuscultaCard({ som, titulo, mostrarFase, onClose }: { som: Som; titulo: string; mostrarFase: boolean; onClose: () => void }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const [fase, setFase] = useState<{ u: number; primeira: boolean }>({ u: 0, primeira: false });
  const [erro, setErro] = useState(false);
  const grav = gravacaoPara(som);
  const [real, setReal] = useState(!!grav);

  useEffect(() => {
    const ctx = audioCtx();
    if (!ctx) {
      setErro(true);
      return;
    }
    // gravação real (quando existe) ou som sintetizado
    let est: Estetoscopio | null = null;
    let fonte: AudioBufferSourceNode | null = null;
    let cancelado = false;
    let analyser: AnalyserNode;
    if (real && grav) {
      analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.connect(ctx.destination);
      void ctx.resume();
      carregar(ctx, import.meta.env.BASE_URL + grav.arquivo)
        .then(buf => {
          if (cancelado) return;
          fonte = ctx.createBufferSource();
          fonte.buffer = buf;
          fonte.loop = true;
          fonte.connect(analyser);
          fonte.start();
        })
        .catch(() => !cancelado && setReal(false)); // sem a gravação, cai no som sintetizado
    } else {
      est = new Estetoscopio(som, ctx);
      est.iniciar();
      analyser = est.analyser;
    }
    let raf = 0;
    const buf = new Uint8Array(analyser.fftSize);
    const hist: number[] = [];
    const draw = () => {
      raf = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(buf);
      let pico = 0;
      for (const b of buf) pico = Math.max(pico, Math.abs(b - 128));
      hist.push(pico);
      if (hist.length > 180) hist.shift();
      if (est) setFase(est.posicao());
      const c = cv.current;
      if (!c) return;
      const g = c.getContext('2d')!;
      g.fillStyle = '#0b1a14';
      g.fillRect(0, 0, c.width, c.height);
      g.strokeStyle = '#3ce07a';
      g.lineWidth = 2;
      g.beginPath();
      hist.forEach((v, i) => {
        const x = (i / 180) * c.width;
        const y = c.height / 2 - (v / 128) * (c.height / 2) * (i % 2 ? 1 : -1);
        if (i) g.lineTo(x, y);
        else g.moveTo(x, y);
      });
      g.stroke();
    };
    draw();
    const fim = setTimeout(onClose, 20000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fim);
      cancelado = true;
      est?.parar();
      try {
        fonte?.stop();
      } catch {
        /* já parado */
      }
      if (real && grav) setTimeout(() => analyser.disconnect(), 50);
    };
  }, [som, onClose, real, grav]);

  const nomes = som.tipo === 'cardiaca' ? ['Sístole', 'Diástole'] : som.tipo === 'pulmonar' ? ['Inspiração', 'Expiração'] : null;
  return (
    <div className="animate-rise absolute right-2 bottom-[118px] left-2 z-30 rounded-2xl border border-line bg-surface/97 p-3 shadow-pop backdrop-blur sm:right-auto sm:bottom-28 sm:left-3 sm:w-[340px]">
      <div className="mb-2 flex items-center gap-2">
        <Headphones className="size-4 text-accent" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13px] font-semibold">Auscultando · {titulo}</div>
          <div className="text-[11.5px] text-ink-3">{som.tipo === 'voz' ? `O paciente repete “${som.v.fala === '33' ? 'trinta e três' : 'iiiii'}”. Use fones.` : 'Use fones de ouvido e aumente o volume.'}</div>
        </div>
        <button type="button" onClick={onClose} className="flex h-8 items-center gap-1 rounded-full border border-line px-2.5 text-[12px] font-semibold hover:border-bad hover:text-bad">
          <Square className="size-3" /> Parar
        </button>
      </div>
      {erro ? (
        <p className="text-[12.5px] text-bad">Este aparelho não liberou o áudio. Toque na tela e tente de novo.</p>
      ) : (
        <>
          <canvas ref={cv} width={320} height={56} className="h-14 w-full rounded-lg" />
          {grav && (
            <div className="mt-2">
              <div className="grid grid-cols-2 gap-1 rounded-lg bg-surface-2 p-0.5 text-[12px] font-semibold">
                {([[true, 'Gravação real'], [false, 'Sintetizado']] as const).map(([v, l]) => (
                  <button key={l} type="button" onClick={() => setReal(v)} className={cx('rounded-md py-1', real === v ? 'bg-surface shadow-card' : 'text-ink-3')}>{l}</button>
                ))}
              </div>
              {real && (
                <p className="mt-1 text-[10.5px] leading-snug text-ink-3">
                  {grav.descricao}. Gravação: {grav.autor} · <a href={grav.licencaUrl} target="_blank" rel="noreferrer" className="underline">{grav.licenca}</a> · <a href={grav.fonte} target="_blank" rel="noreferrer" className="underline">Wikimedia Commons</a>
                </p>
              )}
            </div>
          )}
          {mostrarFase && nomes && !(real && grav) && (
            <div className="mt-2 grid grid-cols-2 gap-1.5 text-center text-[12px] font-semibold">
              {nomes.map((n, i) => (
                <span key={n} className={cx('rounded-lg py-1 transition', (i === 0) === fase.primeira ? 'bg-accent text-accent-ink' : 'bg-surface-2 text-ink-3')}>{n}</span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
