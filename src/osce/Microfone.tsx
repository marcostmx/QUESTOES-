/* Ditado por voz (Web Speech API, pt-BR) para responder os comandos verbais em voz alta. */
import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { cx } from '../app/ui';

type Rec = {
  lang: string; continuous: boolean; interimResults: boolean;
  start(): void; stop(): void; abort(): void;
  onresult: ((ev: { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }) => void) | null;
  onend: (() => void) | null; onerror: ((ev: { error: string }) => void) | null;
};
const Ctor = (): (new () => Rec) | null => {
  const w = window as unknown as { SpeechRecognition?: new () => Rec; webkitSpeechRecognition?: new () => Rec };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};
export const temDitado = () => typeof window !== 'undefined' && !!Ctor();

/** Botão de microfone: acrescenta ao texto o que for falado. */
export function Microfone({ onTexto, className }: { onTexto: (trecho: string) => void; className?: string }) {
  const [ouvindo, setOuvindo] = useState(false);
  const [parcial, setParcial] = useState('');
  const [erro, setErro] = useState('');
  const rec = useRef<Rec | null>(null);
  const cb = useRef(onTexto);
  cb.current = onTexto;
  useEffect(() => () => rec.current?.abort(), []);
  const C = Ctor();
  if (!C) return null;

  const alterna = () => {
    if (ouvindo) {
      rec.current?.stop();
      return;
    }
    const r = new C();
    r.lang = 'pt-BR';
    r.continuous = true;
    r.interimResults = true;
    r.onresult = ev => {
      let interim = '';
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const res = ev.results[i];
        if (res.isFinal) cb.current(res[0].transcript.trim());
        else interim += res[0].transcript;
      }
      setParcial(interim);
    };
    r.onerror = ev => setErro(ev.error === 'not-allowed' ? 'Permita o uso do microfone.' : 'Não consegui ouvir; tente de novo.');
    r.onend = () => {
      setOuvindo(false);
      setParcial('');
    };
    rec.current = r;
    setErro('');
    setOuvindo(true);
    r.start();
  };

  return (
    <div className={cx('flex flex-col gap-1', className)}>
      <button type="button" onClick={alterna} aria-pressed={ouvindo}
        className={cx('inline-flex h-9 w-fit items-center gap-1.5 rounded-full border px-3 text-[12.5px] font-semibold transition',
          ouvindo ? 'animate-pulse border-bad bg-bad text-white' : 'border-line text-ink-2 hover:border-accent hover:text-accent')}>
        {ouvindo ? <MicOff className="size-4" /> : <Mic className="size-4" />}
        {ouvindo ? 'Parar' : 'Responder falando'}
      </button>
      {parcial && <span className="text-[12px] text-ink-3 italic">{parcial}…</span>}
      {erro && <span className="text-[12px] text-bad">{erro}</span>}
    </div>
  );
}
