/* Esfigmomanômetro interativo: desinsufla e toca os sons de Korotkoff; o estudante marca o 1º som e o desaparecimento. */
import { useEffect, useRef, useState } from 'react';
import { FastForward, HeartPulse, X } from 'lucide-react';
import { Button, cx } from '../app/ui';
import type { LeituraPA } from './engine';
import { sfx } from './sfx';

export function Manometro({ leitura, inicio, irregular, braco, onDone, onClose }: {
  leitura: LeituraPA; inicio: number; irregular?: boolean; braco: 'D' | 'E';
  onDone: (pas: number | null, pad: number | null) => void; onClose: () => void;
}) {
  const [valor, setValor] = useState(inicio);
  const [pas, setPas] = useState<number | null>(null);
  const [pad, setPad] = useState<number | null>(null);
  const [rapido, setRapido] = useState(false);
  const [batida, setBatida] = useState(0);
  const [fim, setFim] = useState(false);
  const v = useRef(inicio);
  const rap = useRef(false);
  rap.current = rapido;

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let prox = last + 400;
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      v.current = Math.max(0, v.current - dt * (rap.current ? 6 : 3)); // 3 mmHg/s (técnica), 6 no modo rápido
      setValor(v.current);
      if (now >= prox) {
        const x = v.current;
        if (x <= leitura.pas && x > leitura.pad) {
          const fase = x > leitura.pas - 10 ? 1 : x > leitura.pas - 25 ? 2 : x > leitura.fase4 ? 3 : 4;
          sfx.korotkoff(fase as 1 | 2 | 3 | 4);
          setBatida(b => b + 1);
        }
        const rr = 60 / 76;
        prox = now + 1000 * (irregular ? rr * (0.6 + Math.random() * 0.8) : rr);
      }
      if (v.current <= 20) {
        setFim(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [leitura, irregular]);

  const ang = -225 + (Math.min(300, valor) / 300) * 270; // ponteiro de 0 a 300 mmHg
  const ticks = Array.from({ length: 31 }, (_, i) => i * 10);
  const concluir = () => onDone(pas, pad);

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
      <div className="animate-rise safe-bottom w-full rounded-t-3xl bg-surface p-4 shadow-pop sm:max-w-md sm:rounded-3xl">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <div className="text-[15px] font-semibold">Ausculta da artéria braquial · braço {braco === 'D' ? 'direito' : 'esquerdo'}</div>
            <div className="text-[12.5px] text-ink-3">Ligue o som. Marque o 1º som (fase I) e o desaparecimento (fase V).</div>
          </div>
          <button type="button" aria-label="Cancelar" onClick={onClose} className="flex size-9 items-center justify-center rounded-lg hover:bg-surface-2"><X className="size-4" /></button>
        </div>
        <div className="relative mx-auto my-2 size-56">
          <svg viewBox="-110 -110 220 220" className="size-full">
            <circle r="104" fill="#f7f5ef" stroke="#1f2a44" strokeWidth="6" />
            {ticks.map(t => {
              const a = ((-225 + (t / 300) * 270) * Math.PI) / 180;
              const big = t % 50 === 0;
              return (
                <g key={t}>
                  <line x1={Math.cos(a) * (big ? 80 : 88)} y1={Math.sin(a) * (big ? 80 : 88)} x2={Math.cos(a) * 96} y2={Math.sin(a) * 96} stroke="#1f2a44" strokeWidth={big ? 2.5 : 1} />
                  {big && <text x={Math.cos(a) * 66} y={Math.sin(a) * 66 + 4} fontSize="11" textAnchor="middle" fill="#1f2a44" fontWeight="600">{t}</text>}
                </g>
              );
            })}
            <line x1="0" y1="0" x2={Math.cos((ang * Math.PI) / 180) * 84} y2={Math.sin((ang * Math.PI) / 180) * 84} stroke="#c0392b" strokeWidth="3.5" strokeLinecap="round" />
            <circle r="7" fill="#1f2a44" />
            <text y="42" fontSize="20" textAnchor="middle" fontFamily="monospace" fontWeight="700" fill="#1f2a44">{Math.round(valor)}</text>
            <text y="58" fontSize="9" textAnchor="middle" fill="#666">mmHg</text>
          </svg>
          <HeartPulse key={batida} className={cx('absolute top-3 right-3 size-7 text-bad', batida ? 'animate-ping' : 'opacity-20')} style={{ animationIterationCount: 1 }} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button size="lg" variant={pas != null ? 'good' : 'primary'} disabled={pas != null || fim} onClick={() => setPas(Math.round(v.current / 2) * 2)}>
            {pas != null ? `1º som: ${pas}` : 'Ouvi o 1º som'}
          </Button>
          <Button size="lg" variant={pad != null ? 'good' : 'primary'} disabled={pad != null || fim} onClick={() => setPad(Math.round(v.current / 2) * 2)}>
            {pad != null ? `Sumiu: ${pad}` : 'Os sons sumiram'}
          </Button>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <button type="button" onClick={() => setRapido(r => !r)} className={cx('flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-medium', rapido ? 'border-accent bg-accent-soft text-accent' : 'border-line text-ink-2')}>
            <FastForward className="size-3.5" /> {rapido ? 'Rápido (6 mmHg/s)' : 'Velocidade real (3 mmHg/s)'}
          </button>
          <Button variant={fim || (pas != null && pad != null) ? 'primary' : 'secondary'} onClick={concluir}>Registrar medida</Button>
        </div>
      </div>
    </div>
  );
}
