/* Efeitos sonoros sintetizados (WebAudio) — sem arquivos de áudio. */
let ctx: AudioContext | null = null;
const ac = () => {
  try {
    ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
};

function tone(freq: number, dur: number, type: OscillatorType = 'sine', vol = 0.12, delay = 0) {
  const c = ac();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  const t0 = c.currentTime + delay;
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(vol, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(c.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
}

/** Som de Korotkoff: batida grave; fases II e IV mais abafadas. */
function korotkoff(fase: 1 | 2 | 3 | 4) {
  const c = ac();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  const f = c.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = fase === 4 ? 180 : fase === 2 ? 320 : 600;
  o.type = fase === 2 ? 'sawtooth' : 'triangle';
  o.frequency.setValueAtTime(fase === 4 ? 70 : 95, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(45, c.currentTime + 0.12);
  const vol = fase === 1 ? 0.35 : fase === 3 ? 0.4 : fase === 2 ? 0.2 : 0.12;
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(vol, c.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + (fase === 4 ? 0.18 : 0.12));
  o.connect(f).connect(g).connect(c.destination);
  o.start();
  o.stop(c.currentTime + 0.25);
}

/** Contexto de áudio compartilhado (criado no primeiro toque). */
export const audioCtx = () => ac();

export const sfx = {
  korotkoff,
  tap: () => tone(660, 0.08, 'square', 0.05),
  beep: () => {
    tone(880, 0.18, 'sine', 0.15);
    tone(880, 0.18, 'sine', 0.15, 0.25);
  },
  bell: () => {
    tone(784, 0.5, 'triangle', 0.14);
    tone(1046, 0.7, 'triangle', 0.1, 0.12);
  },
  water: () => {
    const c = ac();
    if (!c) return;
    const len = c.sampleRate * 1.3;
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = c.createBufferSource();
    src.buffer = buf;
    const f = c.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = 1400;
    f.Q.value = 0.8;
    const g = c.createGain();
    g.gain.value = 0.18;
    src.connect(f).connect(g).connect(c.destination);
    src.start();
    tone(1318, 0.15, 'sine', 0.08, 1.3);
  },
};
