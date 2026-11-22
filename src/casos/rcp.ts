/**
 * Minijogo de RCP de alta qualidade (adulto, FV): lógica pura, com o tempo passado por parâmetro.
 * Metas (AHA/ILCOR): 100–120 compressões/min, 30:2 sem via aérea avançada, pausas < 10 s,
 * fração de compressão > 80% (mínimo 60%), análise do ritmo a cada 2 min, choque seguro
 * ("afastem-se") e retomada imediata das compressões; adrenalina após o 2º choque na FV/TV.
 */

export type Fase = 'pronto' | 'compressoes' | 'ventilar' | 'analise' | 'carregando' | 'carregado' | 'pos-choque' | 'pulso' | 'fim';

export interface RcpOpcoes {
  /** duração do ciclo entre análises (s) */
  ciclo: number;
  /** quando o desfibrilador chega (s) */
  chegadaDesfib: number;
  /** quantos choques até o retorno da circulação */
  choquesParaRosc: number;
}

export const RAPIDO: RcpOpcoes = { ciclo: 45, chegadaDesfib: 20, choquesParaRosc: 2 };
export const REAL: RcpOpcoes = { ciclo: 120, chegadaDesfib: 30, choquesParaRosc: 2 };

export interface Evento { t: number; texto: string; tipo: 'ok' | 'erro' | 'info' }

export class Rcp {
  fase: Fase = 'pronto';
  inicio = 0;
  agora = 0;
  /** compressões no ciclo 30:2 atual */
  contagem = 0;
  ventilacoes = 0;
  choques = 0;
  intervalos: number[] = [];
  private ultimaComp = 0;
  /** tempo total com as mãos no tórax (aprox.: soma dos intervalos válidos) */
  tempoComprimindo = 0;
  /** pausa atual (mãos fora) */
  pausaDesde: number | null = null;
  pausas: number[] = [];
  proximaAnalise: number;
  desfibChegou = false;
  primeiroChoque: number | null = null;
  afastou = false;
  adrenalina: number | null = null;
  eventos: Evento[] = [];
  ritmo: 'fv' | 'sinusal' = 'fv';

  constructor(public op: RcpOpcoes = RAPIDO) {
    this.proximaAnalise = op.chegadaDesfib;
  }

  private ev(texto: string, tipo: Evento['tipo'] = 'info') {
    this.eventos.push({ t: this.t, texto, tipo });
  }
  get t() {
    return this.agora - this.inicio;
  }
  /** Hora de analisar o ritmo? */
  get analiseDevida() {
    return this.desfibChegou && this.t >= this.proximaAnalise && (this.fase === 'compressoes' || this.fase === 'ventilar');
  }

  iniciar(agora: number) {
    this.inicio = this.agora = this.ultimaComp = agora;
    this.fase = 'compressoes';
    this.ev('Compressões iniciadas.');
  }

  tick(agora: number) {
    this.agora = agora;
    if (!this.desfibChegou && this.t >= this.op.chegadaDesfib && this.fase !== 'pronto') {
      this.desfibChegou = true;
      this.ev('O desfibrilador chegou e as pás foram posicionadas. Analise o ritmo ao fim do ciclo.');
    }
  }

  private abrePausa() {
    if (this.pausaDesde === null) this.pausaDesde = this.agora;
  }
  private fechaPausa() {
    if (this.pausaDesde !== null) {
      this.pausas.push(this.agora - this.pausaDesde);
      if (this.agora - this.pausaDesde > 10) this.ev(`Pausa de ${Math.round(this.agora - this.pausaDesde)} s nas compressões (meta: menos de 10 s).`, 'erro');
      this.pausaDesde = null;
    }
  }

  comprimir(agora: number) {
    this.tick(agora);
    if (this.fase === 'pos-choque') {
      this.fase = 'compressoes';
      this.contagem = 0;
    }
    if (this.fase !== 'compressoes') return false;
    if (this.pausaDesde !== null) {
      this.fechaPausa();
    } else if (this.contagem > 0) {
      const dt = agora - this.ultimaComp;
      if (dt > 0.2 && dt < 2) {
        this.intervalos.push(dt);
        this.tempoComprimindo += dt;
      }
    }
    this.ultimaComp = agora;
    this.contagem++;
    if (this.contagem >= 30) {
      this.fase = 'ventilar';
      this.ventilacoes = 0;
      this.abrePausa();
    }
    return true;
  }

  ventilar(agora: number) {
    this.tick(agora);
    if (this.fase !== 'ventilar') return false;
    this.ventilacoes++;
    if (this.ventilacoes >= 2) {
      this.fase = 'compressoes';
      this.contagem = 0;
    }
    return true;
  }

  analisar(agora: number) {
    this.tick(agora);
    if (!this.desfibChegou || (this.fase !== 'compressoes' && this.fase !== 'ventilar')) return false;
    if (this.t < this.proximaAnalise - 5) this.ev('Análise antes do fim do ciclo de 2 minutos: interrompe as compressões sem necessidade.', 'erro');
    this.abrePausa();
    this.fase = 'analise';
    this.ritmo = this.choques >= this.op.choquesParaRosc ? 'sinusal' : 'fv';
    this.ev(this.ritmo === 'fv' ? 'Ritmo: fibrilação ventricular (chocável).' : 'Ritmo organizado no monitor: cheque o pulso.');
    if (this.ritmo === 'sinusal') this.fase = 'pulso';
    return true;
  }

  carregar(agora: number) {
    this.tick(agora);
    if (this.fase !== 'analise' || this.ritmo !== 'fv') return false;
    this.fase = 'carregado';
    this.afastou = false;
    return true;
  }

  afastar(agora: number) {
    this.tick(agora);
    if (this.fase !== 'carregado') return false;
    this.afastou = true;
    return true;
  }

  chocar(agora: number) {
    this.tick(agora);
    if (this.fase !== 'carregado') return false;
    if (!this.afastou) this.ev('Choque sem anunciar "afastem-se": risco para a equipe.', 'erro');
    this.choques++;
    if (this.primeiroChoque === null) this.primeiroChoque = this.t;
    this.ev(`Choque ${this.choques} (200 J bifásico). Retome as compressões imediatamente.`, 'ok');
    this.fase = 'pos-choque';
    this.proximaAnalise = this.t + this.op.ciclo;
    return true;
  }

  darAdrenalina(agora: number) {
    this.tick(agora);
    if (this.adrenalina !== null || this.fase === 'pronto' || this.fase === 'fim') return false;
    this.adrenalina = this.t;
    if (this.choques < 2) this.ev('Na FV, a adrenalina entra após o 2º choque.', 'erro');
    else this.ev('Adrenalina 1 mg IV/IO (repetir a cada 3–5 min).', 'ok');
    return true;
  }

  checarPulso(agora: number) {
    this.tick(agora);
    if (this.fase !== 'pulso') return false;
    this.fechaPausa();
    this.fase = 'fim';
    this.ev('Pulso carotídeo presente: retorno da circulação espontânea!', 'ok');
    return true;
  }

  resultado() {
    const iv = this.intervalos;
    const freqs = iv.map(d => 60 / d);
    const naFaixa = freqs.filter(f => f >= 100 && f <= 120).length;
    const media = freqs.length ? Math.round(freqs.reduce((a, b) => a + b, 0) / freqs.length) : 0;
    const total = Math.max(1, this.t);
    const fracao = Math.min(1, this.tempoComprimindo / total);
    const maiorPausa = Math.max(0, ...this.pausas);
    const pctFaixa = freqs.length ? naFaixa / freqs.length : 0;
    const erros = this.eventos.filter(e => e.tipo === 'erro').length;
    const metas = [
      { texto: 'Frequência entre 100 e 120/min', ok: pctFaixa >= 0.7, valor: `${Math.round(pctFaixa * 100)}% na faixa · média ${media}/min`, peso: 30 },
      { texto: 'Fração de compressão acima de 60% (ideal > 80%)', ok: fracao >= 0.6, valor: `${Math.round(fracao * 100)}%`, peso: 20 },
      { texto: 'Pausas menores que 10 s', ok: maiorPausa <= 10, valor: `maior pausa ${maiorPausa.toFixed(1).replace('.', ',')} s`, peso: 20 },
      { texto: 'Primeiro choque até 60 s após o desfibrilador chegar', ok: this.primeiroChoque !== null && this.primeiroChoque - this.op.chegadaDesfib <= 60, valor: this.primeiroChoque === null ? 'sem choque' : `${Math.round(this.primeiroChoque - this.op.chegadaDesfib)} s`, peso: 15 },
      { texto: 'Adrenalina após o 2º choque', ok: this.adrenalina !== null && this.choques >= 2, valor: this.adrenalina === null ? 'não feita' : 'feita', peso: 15 },
    ];
    const nota = Math.max(0, metas.reduce((a, m) => a + (m.ok ? m.peso : 0), 0) - erros * 5);
    return { nota, metas, media, fracao, maiorPausa, compressoes: iv.length + 1 };
  }
}
