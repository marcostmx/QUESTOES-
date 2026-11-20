/* Painel de ausculta: toca o som sintetizado e desenha o traçado (fonocardiograma simplificado). */
import { useEffect, useRef, useState } from 'react';
import { Headphones, Square } from 'lucide-react';
import { cx } from '../app/ui';
import { Estetoscopio, type Som } from './ausculta';
import { audioCtx } from './sfx';

export function AuscultaCard({ som, titulo, mostrarFase, onClose }: { som: Som; titulo: string; mostrarFase: boolean; onClose: () => void }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const [fase, setFase] = useState<{ u: number; primeira: boolean }>({ u: 0, primeira: false });
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const ctx = audioCtx();
    if (!ctx) {
      setErro(true);
      return;
    }
    const est = new Estetoscopio(som, ctx);
    est.iniciar();
    let raf = 0;
    const buf = new Uint8Array(est.analyser.fftSize);
    const hist: number[] = [];
    const draw = () => {
      raf = requestAnimationFrame(draw);
      est.analyser.getByteTimeDomainData(buf);
      let pico = 0;
      for (const b of buf) pico = Math.max(pico, Math.abs(b - 128));
      hist.push(pico);
      if (hist.length > 180) hist.shift();
      setFase(est.posicao());
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
      est.parar();
    };
  }, [som, onClose]);

  const nomes = som.tipo === 'cardiaca' ? ['Sístole', 'Diástole'] : som.tipo === 'pulmonar' ? ['Inspiração', 'Expiração'] : null;
  return (
    <div className="animate-rise absolute right-2 bottom-[118px] left-2 z-30 rounded-2xl border border-line bg-surface/97 p-3 shadow-pop backdrop-blur sm:right-auto sm:bottom-28 sm:left-3 sm:w-[340px]">
      <div className="mb-2 flex items-center gap-2">
        <Headphones className="size-4 text-accent" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13px] font-semibold">Auscultando · {titulo}</div>
          <div className="text-[11.5px] text-ink-3">Use fones de ouvido e aumente o volume.</div>
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
          {mostrarFase && nomes && (
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
