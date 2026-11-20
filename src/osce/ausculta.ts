/* Sons de ausculta sintetizados (WebAudio): bulhas, sopros, sons pulmonares e ruídos hidroaéreos.
 * O padrão é deduzido do achado da estação; nada é gravado — tudo é gerado no aparelho. */

export type TipoAusculta = 'cardiaca' | 'pulmonar' | 'abdominal' | 'voz';

export interface Cardiaca {
  fc: number; irregular: boolean; b2: 'normal' | 'desdobrado' | 'hiper'; b3: boolean; b4: boolean; estalido: boolean; atrito: boolean;
  sopro?: { tipo: 'ejetivo' | 'holo' | 'aspirativo' | 'ruflar'; grau: number };
}
export interface Pulmonar {
  fr: number; base: 'vesicular' | 'bronquico' | 'reduzido' | 'abolido'; expProlongada: boolean;
  finos: boolean; grossos: boolean; sibilos: boolean; roncos: boolean; estridor: boolean; atrito: boolean;
}
export interface Abdominal { rha: 'normal' | 'aumentados' | 'diminuidos' | 'abolidos' }
export interface Voz { modo: 'normal' | 'aumentada' | 'diminuida' | 'abolida' | 'egofonia'; fala: '33' | 'iii'; feminina: boolean }
export type Som = { tipo: 'cardiaca'; c: Cardiaca } | { tipo: 'pulmonar'; p: Pulmonar } | { tipo: 'abdominal'; a: Abdominal } | { tipo: 'voz'; v: Voz };

/** Ressonância vocal: como a voz chega ao estetoscópio. */
export function somVocal(txt: string, fala: Voz['fala'], feminina: boolean): Voz {
  const modo: Voz['modo'] = fala === 'iii' && /egofonia/i.test(txt) && !/sem egofonia/i.test(txt) ? 'egofonia'
    : /voz mais (n[íi]tida|intensa)|broncofonia|pectoril[óo]quia|resson[âa]ncia vocal aumentada|voz [↑]|\bvoz\s*↑/i.test(txt) ? 'aumentada'
    : /(resson[âa]ncia vocal|voz)[^.;]{0,25}abolid/i.test(txt) ? 'abolida'
    : /(resson[âa]ncia vocal|voz)[^.;]{0,25}(diminu|reduz)|resson[âa]ncia vocal reduzid|MV e resson[âa]ncia vocal reduzidos/i.test(txt) ? 'diminuida' : 'normal';
  return { modo, fala, feminina };
}

const GRAU: Record<string, number> = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6 };

export function somCardiaco(txt: string, fc = 76): Cardiaca {
  const g = txt.match(/\b(I{1,3}|IV|VI?|V)\/VI\b/);
  const grau = g ? GRAU[g[1]] : /fr[êe]mito/i.test(txt) ? 4 : 3;
  let sopro: Cardiaca['sopro'];
  if (/ruflar|diast[óo]lico (em )?ruflar/i.test(txt)) sopro = { tipo: 'ruflar', grau };
  else if (/protodiast|aspirativ|diast[óo]lico/i.test(txt)) sopro = { tipo: 'aspirativo', grau };
  else if (/holossist|regurgitativ/i.test(txt)) sopro = { tipo: 'holo', grau };
  else if (/sopro sist[óo]lico|ejetivo|crescendo/i.test(txt) && !/sem sopro/i.test(txt)) sopro = { tipo: 'ejetivo', grau };
  else if (/\bsopro\b/i.test(txt) && !/sem sopros?/i.test(txt)) sopro = { tipo: 'ejetivo', grau };
  return {
    fc, irregular: /irregularmente irregular|R[–-]R vari|fibrila|irregular/i.test(txt) && !/regular em dois tempos/i.test(txt),
    b2: /desdobramento|desdobrad/i.test(txt) && !/fisiol/i.test(txt) ? 'desdobrado' : /P2 hiperfon|B2 hiperfon/i.test(txt) ? 'hiper' : 'normal',
    b3: /\bB3\b|terceira bulha|galope/i.test(txt) && !/B4/i.test(txt), b4: /\bB4\b|quarta bulha/i.test(txt),
    estalido: /estalido/i.test(txt), atrito: /atrito peric|ru[íi]do [áa]spero.*bulhas|atrito/i.test(txt) && /peric|bulhas|precórdio|ápice/i.test(txt),
    sopro,
  };
}

export function somPulmonar(txt: string, fr = 16): Pulmonar {
  const neg = (rx: RegExp) => new RegExp(`sem (ru[íi]dos advent[íi]cios|${rx.source})`, 'i').test(txt);
  return {
    fr: Math.max(10, Math.min(32, fr)),
    base: /murm[úu]rio vesicular (abolido|ausente)|MV abolido|abolid/i.test(txt) ? 'abolido'
      : /respira[çc][ãa]o (de tonalidade )?br[ôo]nquica|sopro tub[áa]rio|tonalidade br[ôo]nquica/i.test(txt) ? 'bronquico'
      : /(murm[úu]rio|MV|ventila[çc][ãa]o|ausculta)[^.;]{0,45}(diminu|reduzid)|redu[çc][ãa]o (global )?do murm/i.test(txt) ? 'reduzido' : 'vesicular',
    expProlongada: /expira[çc][ãa]o (prolongada|mais demorada)/i.test(txt),
    finos: /estertores finos|crepita/i.test(txt) && !neg(/estertores/),
    grossos: /estertores grossos|bolhosos/i.test(txt) && !neg(/estertores/),
    sibilos: /\bsibil|ru[íi]dos musicais/i.test(txt) && !/sem sibilos/i.test(txt),
    roncos: /roncos/i.test(txt) && !neg(/roncos/),
    estridor: /estridor|agudo\/intenso predominantemente inspirat/i.test(txt),
    atrito: /atrito pleural|ru[íi]do [áa]spero sincronizado com a respira/i.test(txt),
  };
}

export function somAbdominal(txt: string): Abdominal {
  return {
    rha: /(RHA|ru[íi]dos hidroa[ée]reos)[^.;]{0,30}(abolidos|ausentes)|íleo/i.test(txt) ? 'abolidos'
      : /(RHA|ru[íi]dos)[^.;]{0,30}(aumentados|hiperativ|met[áa]lic)/i.test(txt) ? 'aumentados'
      : /(RHA|ru[íi]dos)[^.;]{0,30}(diminu|hipoativ)/i.test(txt) ? 'diminuidos' : 'normal',
  };
}

const CARD = /^(cv-(focos|ao|pulm|tric|mitral|pachon|frente|rivero|handgrip|valsalva|agachamento)|dt-ausc-precordio|ur-ausc-card)/;
const PULM = /^(resp-(ausc|tosse)|dt-ausc-pulm|ur-ausc-pulm)/;
const ABD = /^(abd-ausc|aa-ausc)$/;
const VOZ = /^resp-(resson|egofonia)$/;

/** Qual som a manobra produz (ou nada, se não for ausculta). */
export function somDaManobra(id: string, achado: string, fc?: number, fr?: number, contexto = '', feminina = false): Som | null {
  if (VOZ.test(id)) return { tipo: 'voz', v: somVocal(`${achado}. ${contexto}`, id === 'resp-egofonia' ? 'iii' : '33', feminina) };
  if (CARD.test(id)) {
    const c = somCardiaco(achado, fc ?? 76);
    // achados que só descrevem a variação ("o sopro aumenta") herdam o sopro descrito no restante da estação
    const ctx = somCardiaco(contexto, fc ?? 76);
    if (!c.sopro && ctx.sopro && /sopro|ruflar/i.test(achado + contexto)) c.sopro = { ...ctx.sopro };
    c.irregular ||= ctx.irregular;
    if (c.sopro && /^cv-(valsalva|agachamento|handgrip|rivero)/.test(id)) {
      if (/aument|mais (intens|evidente|aud)|acentua/i.test(achado)) c.sopro.grau = Math.min(6, c.sopro.grau + 1);
      if (/menos intens|diminu|reduz/i.test(achado)) c.sopro.grau = Math.max(1, c.sopro.grau - 2);
    }
    return { tipo: 'cardiaca', c };
  }
  if (PULM.test(id) || (/^resp-insp-din/.test(id) && /estridor|ru[íi]do agudo/i.test(achado))) return { tipo: 'pulmonar', p: somPulmonar(achado, fr ?? 16) };
  if (ABD.test(id)) return { tipo: 'abdominal', a: somAbdominal(achado) };
  return null;
}

/* ---------- Síntese ---------- */
export class Estetoscopio {
  private ctx: AudioContext;
  private master: GainNode;
  private ruido: AudioBuffer;
  private timer = 0;
  private proximo = 0;
  private ciclo = 0;
  analyser: AnalyserNode;
  /** marca de tempo de cada evento (para o indicador de sístole/diástole) */
  private fases: { inicio: number; sistole: number; duracao: number }[] = [];
  private set fase(f: { inicio: number; sistole: number; duracao: number }) {
    this.fases.push(f);
    if (this.fases.length > 12) this.fases.shift();
  }

  constructor(private som: Som, ctx: AudioContext) {
    this.ctx = ctx;
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.9;
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 1024;
    this.master.connect(this.analyser).connect(this.ctx.destination);
    const n = this.ctx.sampleRate * 2;
    this.ruido = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
    const d = this.ruido.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  }

  iniciar() {
    void this.ctx.resume();
    this.proximo = this.ctx.currentTime + 0.1;
    const agenda = () => {
      while (this.proximo < this.ctx.currentTime + 0.4) this.proximo += this.agendaCiclo(this.proximo);
    };
    agenda();
    this.timer = window.setInterval(agenda, 60);
  }

  parar() {
    clearInterval(this.timer);
    const g = this.master.gain;
    g.setTargetAtTime(0, this.ctx.currentTime, 0.05);
    setTimeout(() => this.master.disconnect(), 300);
  }

  /** Agenda um ciclo (batimento, respiração ou janela de RHA) e devolve sua duração. */
  private agendaCiclo(t: number): number {
    this.ciclo++;
    if (this.som.tipo === 'cardiaca') return this.batimento(t, this.som.c);
    if (this.som.tipo === 'pulmonar') return this.respiracao(t, this.som.p);
    if (this.som.tipo === 'voz') return this.fala(t, this.som.v);
    return this.intestino(t, this.som.a);
  }

  /* blocos básicos */
  private ruidoFiltrado(t: number, dur: number, f: number, q: number, env: (g: AudioParam, t: number) => void, tipo: BiquadFilterType = 'bandpass') {
    const src = this.ctx.createBufferSource();
    src.buffer = this.ruido;
    src.loop = true;
    const fl = this.ctx.createBiquadFilter();
    fl.type = tipo;
    fl.frequency.value = f;
    fl.Q.value = q;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    env(g.gain, t);
    src.connect(fl).connect(g).connect(this.master);
    src.start(t, Math.random());
    src.stop(t + dur + 0.05);
    return { fl, g };
  }

  private baque(t: number, f: number, vol: number, dur = 0.07) {
    // bulha: "tum" grave = senoide com queda de frequência + ruído grave
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.frequency.setValueAtTime(f * 1.6, t);
    o.frequency.exponentialRampToValueAtTime(f, t + dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + dur + 0.02);
    this.ruidoFiltrado(t, dur, f * 2.2, 1.2, (gp, t0) => {
      gp.linearRampToValueAtTime(vol * 0.6, t0 + 0.006);
      gp.exponentialRampToValueAtTime(0.0001, t0 + dur);
    });
  }

  private batimento(t: number, c: Cardiaca): number {
    let rr = 60 / c.fc;
    if (c.irregular) rr *= 0.62 + Math.random() * 0.8;
    const sis = Math.min(0.36, 0.1 + 0.25 * Math.sqrt(rr)); // duração da sístole
    this.fase = { inicio: t, sistole: sis, duracao: rr };
    const v = 0.9;
    if (c.b4) this.baque(t - 0.09, 32, 0.35, 0.06);
    this.baque(t, 48, v);
    const t2 = t + sis;
    if (c.b2 === 'desdobrado') {
      this.baque(t2, 70, 0.6, 0.05);
      this.baque(t2 + 0.045, 75, 0.55, 0.05);
    } else this.baque(t2, 72, c.b2 === 'hiper' ? 0.95 : 0.6, 0.05);
    if (c.estalido) this.ruidoFiltrado(t2 + 0.08, 0.03, 420, 3, (g, t0) => {
      g.linearRampToValueAtTime(0.5, t0 + 0.004);
      g.exponentialRampToValueAtTime(0.0001, t0 + 0.03);
    });
    if (c.b3) this.baque(t2 + 0.15, 30, 0.4, 0.07);
    const s = c.sopro;
    if (s) {
      const amp = 0.05 + 0.055 * s.grau;
      if (s.tipo === 'ejetivo') {
        const a = t + 0.06, b = t2 - 0.03, m = (a + b) / 2;
        this.ruidoFiltrado(a, b - a, 260, 0.9, (g) => {
          g.linearRampToValueAtTime(amp, m);
          g.linearRampToValueAtTime(0.0001, b);
        });
      } else if (s.tipo === 'holo') {
        this.ruidoFiltrado(t + 0.02, sis, 420, 0.8, (g, t0) => {
          g.linearRampToValueAtTime(amp * 0.85, t0 + 0.03);
          g.setValueAtTime(amp * 0.85, t0 + sis - 0.03);
          g.linearRampToValueAtTime(0.0001, t0 + sis);
        });
      } else if (s.tipo === 'aspirativo') {
        const dur = Math.min(0.4, (rr - sis) * 0.7);
        this.ruidoFiltrado(t2 + 0.01, dur, 650, 0.9, (g, t0) => {
          g.linearRampToValueAtTime(amp * 0.8, t0 + 0.015);
          g.exponentialRampToValueAtTime(0.0001, t0 + dur);
        }, 'highpass');
      } else {
        // ruflar: grave, mesodiastólico com reforço pré-sistólico
        const a = t2 + (c.estalido ? 0.12 : 0.16), b = t + rr - 0.01;
        const { g } = this.ruidoFiltrado(a, b - a, 70, 2.5, (gp, t0) => {
          gp.linearRampToValueAtTime(amp * 1.2, t0 + 0.05);
          gp.linearRampToValueAtTime(amp * 0.5, (t0 + b) / 2);
          gp.linearRampToValueAtTime(amp * 1.4, b - 0.02);
          gp.linearRampToValueAtTime(0.0001, b);
        });
        // modulação "rolada"
        const lfo = this.ctx.createOscillator();
        const lg = this.ctx.createGain();
        lfo.frequency.value = 22;
        lg.gain.value = amp * 0.6;
        lfo.connect(lg).connect(g.gain);
        lfo.start(a);
        lfo.stop(b);
      }
    }
    if (c.atrito) for (const [x, d] of [[0.04, sis * 0.6], [sis + 0.05, 0.12], [rr - 0.14, 0.1]] as const) {
      this.ruidoFiltrado(t + x, d, 900, 0.7, (g, t0) => {
        for (let k = 0; k < 6; k++) g.setValueAtTime(k % 2 ? 0.05 : 0.22, t0 + (k * d) / 6);
        g.linearRampToValueAtTime(0.0001, t0 + d);
      });
    }
    return rr;
  }

  private respiracao(t: number, p: Pulmonar): number {
    const ciclo = 60 / p.fr;
    const insp = ciclo * (p.expProlongada ? 0.32 : 0.4);
    const exp = ciclo - insp;
    this.fase = { inicio: t, sistole: insp, duracao: ciclo };
    const vol = p.base === 'abolido' ? 0.02 : p.base === 'reduzido' ? 0.12 : 0.35;
    if (p.base === 'bronquico') {
      // tubário: mais agudo, expiração tão alta quanto a inspiração, com pausa entre as fases
      this.ruidoFiltrado(t, insp, 900, 0.8, (g, t0) => { g.linearRampToValueAtTime(0.3, t0 + insp * 0.3); g.linearRampToValueAtTime(0.0001, t0 + insp); });
      this.ruidoFiltrado(t + insp + 0.15, exp * 0.75, 850, 0.8, (g, t0) => { g.linearRampToValueAtTime(0.34, t0 + 0.1); g.linearRampToValueAtTime(0.0001, t0 + exp * 0.75); });
    } else {
      // vesicular: inspiração suave e mais longa; expiração curta e baixa
      this.ruidoFiltrado(t, insp, 320, 0.5, (g, t0) => { g.linearRampToValueAtTime(vol, t0 + insp * 0.7); g.linearRampToValueAtTime(0.0001, t0 + insp); }, 'lowpass');
      const fe = p.expProlongada ? exp * 0.9 : exp * 0.35;
      this.ruidoFiltrado(t + insp, fe, 300, 0.5, (g, t0) => { g.linearRampToValueAtTime(vol * (p.expProlongada ? 0.6 : 0.35), t0 + 0.05); g.linearRampToValueAtTime(0.0001, t0 + fe); }, 'lowpass');
    }
    const clique = (tt: number, f: number, d: number, v: number) => this.ruidoFiltrado(tt, d, f, 2, (g, t0) => { g.linearRampToValueAtTime(v, t0 + 0.002); g.exponentialRampToValueAtTime(0.0001, t0 + d); });
    if (p.finos) for (let k = 0; k < 14; k++) clique(t + insp * (0.55 + Math.random() * 0.45), 1600, 0.006, 0.28);
    if (p.grossos) for (let k = 0; k < 9; k++) clique(t + Math.random() * (insp * 0.5) + (k % 3 === 0 ? insp + Math.random() * exp * 0.4 : 0), 500, 0.018, 0.3);
    const tom = (tt: number, d: number, f: number, v: number, forma: OscillatorType = 'sine') => {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = forma;
      o.frequency.setValueAtTime(f, tt);
      o.frequency.linearRampToValueAtTime(f * 0.92, tt + d);
      g.gain.setValueAtTime(0, tt);
      g.gain.linearRampToValueAtTime(v, tt + 0.08);
      g.gain.linearRampToValueAtTime(0.0001, tt + d);
      const fl = this.ctx.createBiquadFilter();
      fl.type = 'lowpass';
      fl.frequency.value = forma === 'sawtooth' ? 400 : 4000;
      o.connect(fl).connect(g).connect(this.master);
      o.start(tt);
      o.stop(tt + d + 0.02);
    };
    if (p.sibilos) for (const f of [480, 610, 760]) tom(t + insp + 0.05, exp * 0.85, f + Math.random() * 30, 0.045);
    if (p.roncos) {
      tom(t + insp + 0.05, exp * 0.7, 140, 0.12, 'sawtooth');
      tom(t + insp * 0.2, insp * 0.6, 120, 0.08, 'sawtooth');
    }
    if (p.estridor) tom(t + 0.05, insp * 0.9, 900, 0.09, 'triangle');
    if (p.atrito) for (const x of [insp * 0.75, insp + 0.08]) this.ruidoFiltrado(t + x, 0.22, 700, 0.8, (g, t0) => {
      for (let k = 0; k < 5; k++) g.setValueAtTime(k % 2 ? 0.04 : 0.25, t0 + k * 0.044);
      g.linearRampToValueAtTime(0.0001, t0 + 0.22);
    });
    return ciclo;
  }

  private intestino(t: number, a: Abdominal): number {
    const janela = 1.5;
    this.fase = { inicio: t, sistole: 0, duracao: janela };
    const prob = a.rha === 'abolidos' ? 0 : a.rha === 'diminuidos' ? 0.12 : a.rha === 'aumentados' ? 1 : 0.55;
    const n = a.rha === 'aumentados' ? 3 : 1;
    for (let k = 0; k < n; k++) {
      if (Math.random() > prob) continue;
      const tt = t + Math.random() * janela;
      const d = 0.15 + Math.random() * 0.4;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sine';
      const f = 180 + Math.random() * 300;
      o.frequency.setValueAtTime(f, tt);
      for (let i = 1; i < 6; i++) o.frequency.linearRampToValueAtTime(f * (0.7 + Math.random() * 0.8), tt + (d * i) / 6);
      g.gain.setValueAtTime(0, tt);
      g.gain.linearRampToValueAtTime(a.rha === 'aumentados' ? 0.22 : 0.14, tt + 0.03);
      g.gain.linearRampToValueAtTime(0.0001, tt + d);
      o.connect(g).connect(this.master);
      o.start(tt);
      o.stop(tt + d + 0.02);
      this.ruidoFiltrado(tt, d, f * 1.5, 3, (gp, t0) => { gp.linearRampToValueAtTime(0.08, t0 + 0.02); gp.linearRampToValueAtTime(0.0001, t0 + d); });
    }
    return janela;
  }

  /** Voz sintetizada por formantes ("trinta e três" ou "iii") filtrada pelo tórax. */
  private fala(t: number, v: Voz): number {
    const f0 = v.feminina ? 210 : 118;
    const FORM: Record<string, [number, number, number]> = { i: [280, 2250, 2900], a: [700, 1220, 2600], e: [420, 2000, 2550], eh: [550, 1700, 2500] };
    // cadeia do tórax
    const torax = this.ctx.createBiquadFilter();
    const saida = this.ctx.createGain();
    if (v.modo === 'aumentada') { torax.type = 'lowpass'; torax.frequency.value = 3200; saida.gain.value = 0.9; }
    else if (v.modo === 'egofonia') { torax.type = 'bandpass'; torax.frequency.value = 1100; torax.Q.value = 1.1; saida.gain.value = 1.1; }
    else if (v.modo === 'diminuida') { torax.type = 'lowpass'; torax.frequency.value = 260; saida.gain.value = 0.18; }
    else if (v.modo === 'abolida') { torax.type = 'lowpass'; torax.frequency.value = 200; saida.gain.value = 0.03; }
    else { torax.type = 'lowpass'; torax.frequency.value = 380; saida.gain.value = 0.55; }
    torax.connect(saida).connect(this.master);
    if (v.modo === 'egofonia') {
      // timbre anasalado, "voz de cabra": tremolo rápido
      const lfo = this.ctx.createOscillator();
      const lg = this.ctx.createGain();
      lfo.frequency.value = 9;
      lg.gain.value = 0.45;
      lfo.connect(lg).connect(saida.gain);
      lfo.start(t);
      lfo.stop(t + 2);
    }
    const vogal = (t0: number, d: number, nome: string) => {
      const o = this.ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(f0 * 1.05, t0);
      o.frequency.linearRampToValueAtTime(f0 * 0.92, t0 + d);
      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0, t0);
      env.gain.linearRampToValueAtTime(0.5, t0 + 0.03);
      env.gain.setValueAtTime(0.5, t0 + d - 0.05);
      env.gain.linearRampToValueAtTime(0.0001, t0 + d);
      o.connect(env);
      const f = FORM[v.modo === 'egofonia' && nome === 'i' ? 'eh' : nome];
      f.forEach((fr, k) => {
        const bp = this.ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = fr;
        bp.Q.value = 8;
        const g = this.ctx.createGain();
        g.gain.value = [1, 0.5, 0.25][k] * 3;
        env.connect(bp).connect(g).connect(torax);
      });
      o.start(t0);
      o.stop(t0 + d + 0.02);
    };
    const consoante = (t0: number, d: number, f: number) => this.ruidoFiltrado(t0, d, f, 1.5, (g, a) => {
      g.linearRampToValueAtTime(0.25, a + 0.005);
      g.exponentialRampToValueAtTime(0.0001, a + d);
    }, 'bandpass');
    if (v.fala === 'iii') vogal(t + 0.1, 1.1, 'i');
    else {
      // "trin - ta - e - três"
      consoante(t + 0.1, 0.03, 3000);
      vogal(t + 0.14, 0.2, 'i');
      consoante(t + 0.38, 0.03, 3000);
      vogal(t + 0.42, 0.16, 'a');
      vogal(t + 0.6, 0.12, 'i');
      consoante(t + 0.75, 0.03, 3000);
      vogal(t + 0.8, 0.22, 'e');
      consoante(t + 1.02, 0.14, 5500);
    }
    this.fase = { inicio: t, sistole: 0, duracao: 2.2 };
    return 2.2;
  }

  /** Tempo atual dentro do ciclo (0..1) e se está na 1ª fase (sístole/inspiração). */
  posicao(): { u: number; primeira: boolean } {
    const now = this.ctx.currentTime;
    const f = [...this.fases].reverse().find(x => x.inicio <= now);
    if (!f) return { u: 0, primeira: false };
    const dt = now - f.inicio;
    return { u: Math.min(1, dt / f.duracao), primeira: dt < f.sistole };
  }
}
