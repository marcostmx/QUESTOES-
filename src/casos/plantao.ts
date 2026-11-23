/**
 * Plantão de pronto-socorro (lógica pura): pacientes chegam ao longo do turno, você classifica
 * o risco pelo Protocolo de Manchester (versão simplificada e didática) e escolhe quem atender.
 * O relógio é em minutos de jogo e avança com as ações (triar, atender, aguardar).
 * Pontos: acerto da classificação e atendimento dentro do tempo-alvo da cor VERDADEIRA.
 * Pacientes graves que esperam demais pioram (eventos adversos).
 * O "atendimento" do jogo é a avaliação e estabilização inicial pelo médico do plantão.
 */

export type Cor = 'vermelho' | 'laranja' | 'amarelo' | 'verde' | 'azul';
export const CORES: { id: Cor; nome: string; alvo: number; hex: string; texto: string }[] = [
  { id: 'vermelho', nome: 'Emergência', alvo: 0, hex: '#dc2626', texto: '#fff' },
  { id: 'laranja', nome: 'Muito urgente', alvo: 10, hex: '#f97316', texto: '#fff' },
  { id: 'amarelo', nome: 'Urgente', alvo: 60, hex: '#eab308', texto: '#1f1f1f' },
  { id: 'verde', nome: 'Pouco urgente', alvo: 120, hex: '#16a34a', texto: '#fff' },
  { id: 'azul', nome: 'Não urgente', alvo: 240, hex: '#2563eb', texto: '#fff' },
];
export const corInfo = (c: Cor) => CORES.find(x => x.id === c)!;
const nivel = (c: Cor) => CORES.findIndex(x => x.id === c);
/** folga (min) sobre o tempo-alvo: inclui a própria triagem */
const TOLERANCIA = 10;

export interface Ficha {
  id: string;
  nome: string;
  idade: number;
  queixa: string;
  detalhes: string;
  vitais: string;
  cor: Cor;
  /** discriminador que define a cor */
  porque: string;
  /** minutos de atendimento */
  dur: number;
  chegada: number;
  /** caso vivo correspondente, para jogar depois */
  caso?: string;
}

export const FICHAS_CARDIO: Ficha[] = [
  { id: 'p1', nome: 'Roberto', idade: 58, chegada: 0, dur: 10, cor: 'laranja', caso: 'iam-supra-anterior',
    queixa: 'Dor no peito em aperto há 40 min', detalhes: 'Irradia para o braço esquerdo, sudorese, náusea.', vitais: 'PA 152/94 · FC 102 · SpO₂ 95% · dor 8/10',
    porque: 'Dor precordial/cardíaca: laranja (atendimento em até 10 min, ECG imediato).' },
  { id: 'p2', nome: 'Marta', idade: 34, chegada: 4, dur: 8, cor: 'verde',
    queixa: 'Palpitação há dois dias, agora sem sintomas', detalhes: 'Episódios curtos após café; sem síncope nem dor.', vitais: 'PA 124/78 · FC 84 regular · SpO₂ 99%',
    porque: 'Sem discriminadores de gravidade, problema recente: verde.' },
  { id: 'p3', nome: 'Lúcia', idade: 74, chegada: 15, dur: 12, cor: 'vermelho', caso: 'bradicardia-instavel',
    queixa: 'Desmaiou em casa, está confusa', detalhes: 'Pálida, extremidades frias, responde devagar.', vitais: 'PA 76/42 · FC 34 · SpO₂ 91%',
    porque: 'Choque (hipotensão com má perfusão e alteração de consciência): vermelho.' },
  { id: 'p4', nome: 'Seu Zé', idade: 69, chegada: 18, dur: 5, cor: 'azul',
    queixa: 'Veio renovar a receita da losartana', detalhes: 'Sem queixas; PA controlada em casa.', vitais: 'PA 132/84 · FC 72',
    porque: 'Demanda administrativa/crônica sem sintomas: azul (encaminhar à UBS).' },
  { id: 'p5', nome: 'Antônio', idade: 66, chegada: 33, dur: 12, cor: 'vermelho', caso: 'taquicardia-instavel',
    queixa: 'Palpitação forte e tontura', detalhes: 'Sudoreico, sonolento, aperto no peito. Infarto prévio.', vitais: 'PA 82/50 · FC 182 · SpO₂ 93%',
    porque: 'Choque e alteração de consciência: vermelho.' },
  { id: 'p6', nome: 'Juliana', idade: 27, chegada: 36, dur: 10, cor: 'amarelo',
    queixa: 'Dor no peito que piora ao respirar fundo', detalhes: 'Gripada há 5 dias; dor do lado direito, moderada.', vitais: 'PA 118/76 · FC 96 · SpO₂ 97% · Tax 37,9 · dor 5/10',
    porque: 'Dor pleurítica / dor moderada: amarelo.' },
  { id: 'p7', nome: 'Cida', idade: 71, chegada: 52, dur: 12, cor: 'vermelho', caso: 'edema-agudo-pulmao',
    queixa: 'Falta de ar súbita, não consegue deitar', detalhes: 'Fala só palavras, tosse com espuma rósea.', vitais: 'PA 212/118 · FC 118 · SpO₂ 84% · FR 34',
    porque: 'Respiração inadequada (não consegue falar frases): vermelho.' },
  { id: 'p8', nome: 'Paulo', idade: 56, chegada: 58, dur: 10, cor: 'laranja', caso: 'disseccao-aorta',
    queixa: 'Dor "rasgando" no peito e nas costas', detalhes: 'Súbita, a pior da vida, há 50 min.', vitais: 'PA 212/118 · FC 106 · SpO₂ 96% · dor 10/10',
    porque: 'Dor intensa (8–10) / dor precordial: laranja.' },
  { id: 'p9', nome: 'Dona Rosa', idade: 81, chegada: 70, dur: 10, cor: 'amarelo',
    queixa: 'Desmaio rápido no banheiro, já recuperada', detalhes: 'Sem trauma importante, orientada agora.', vitais: 'PA 128/70 · FC 64 · SpO₂ 96%',
    porque: 'História de perda de consciência: amarelo.' },
  { id: 'p10', nome: 'Carlos', idade: 45, chegada: 74, dur: 5, cor: 'azul',
    queixa: 'Inchaço nos tornozelos há meses', detalhes: 'Sem falta de ar; usa anlodipino.', vitais: 'PA 136/82 · FC 76 · SpO₂ 98%',
    porque: 'Queixa crônica, estável, sem sinais de alarme: azul.' },
];

export interface Paciente extends Ficha {
  triagem?: Cor;
  triadoEm?: number;
  inicio?: number;
  fim?: number;
  evento?: string;
}

export class Plantao {
  t = 0;
  pacientes: Paciente[];
  emAtendimento: Paciente | null = null;
  eventos: { t: number; texto: string; tipo: 'ok' | 'erro' | 'info' }[] = [];

  constructor(fichas: Ficha[] = FICHAS_CARDIO) {
    this.pacientes = fichas.map(f => ({ ...f }));
  }

  get chegaram() {
    return this.pacientes.filter(p => p.chegada <= this.t);
  }
  get aTriar() {
    return this.chegaram.filter(p => !p.triagem);
  }
  /** fila de atendimento: triados, não atendidos, ordenados pela cor dada e chegada */
  get fila() {
    return this.chegaram.filter(p => p.triagem && p.inicio === undefined).sort((a, b) => nivel(a.triagem!) - nivel(b.triagem!) || a.chegada - b.chegada);
  }
  get acabou() {
    return this.pacientes.every(p => p.fim !== undefined);
  }

  private avancar(min: number) {
    const ate = this.t + min;
    while (this.t < ate) {
      this.t += 1;
      for (const p of this.chegaram) {
        if (p.inicio !== undefined || p.evento) continue;
        const espera = this.t - p.chegada;
        if (p.cor === 'vermelho' && espera > 20) {
          p.evento = 'Piorou na espera e precisou de reanimação';
          this.eventos.push({ t: this.t, texto: `${p.nome} piorou muito enquanto esperava (${espera} min).`, tipo: 'erro' });
        } else if (p.cor === 'laranja' && espera > 40) {
          p.evento = 'Piorou na espera';
          this.eventos.push({ t: this.t, texto: `${p.nome} piorou na sala de espera.`, tipo: 'erro' });
        }
      }
    }
  }

  triar(id: string, cor: Cor) {
    const p = this.pacientes.find(x => x.id === id);
    if (!p || p.triagem || p.chegada > this.t) return false;
    p.triagem = cor;
    p.triadoEm = this.t;
    const d = nivel(cor) - nivel(p.cor);
    this.eventos.push({ t: this.t, texto: `${p.nome}: ${corInfo(cor).nome}${d === 0 ? ' ✓' : d > 0 ? ' (subtriagem)' : ' (supertriagem)'}`, tipo: d === 0 ? 'ok' : d > 0 ? 'erro' : 'info' });
    this.avancar(2);
    return true;
  }

  atender(id: string) {
    const p = this.pacientes.find(x => x.id === id);
    if (!p || !p.triagem || p.inicio !== undefined) return false;
    p.inicio = this.t;
    this.emAtendimento = p;
    const espera = p.inicio - p.chegada;
    const alvo = corInfo(p.cor).alvo;
    this.eventos.push({ t: this.t, texto: `Atendendo ${p.nome} (esperou ${espera} min; meta ${alvo === 0 ? 'imediata' : `≤ ${alvo} min`}).`, tipo: espera <= alvo + TOLERANCIA ? 'ok' : 'erro' });
    this.avancar(p.dur);
    p.fim = this.t;
    this.emAtendimento = null;
    return true;
  }

  aguardar(min = 5) {
    this.avancar(min);
  }

  /** tempo até a próxima chegada (para "aguardar") */
  get proximaChegada() {
    const f = this.pacientes.filter(p => p.chegada > this.t).sort((a, b) => a.chegada - b.chegada)[0];
    return f ? f.chegada - this.t : null;
  }

  resultado() {
    const linhas = this.pacientes.map(p => {
      const alvo = corInfo(p.cor).alvo;
      const espera = (p.inicio ?? this.t) - p.chegada;
      const triagemOk = p.triagem === p.cor;
      const dif = p.triagem ? nivel(p.triagem) - nivel(p.cor) : 99;
      const noTempo = p.inicio !== undefined && espera <= alvo + TOLERANCIA;
      return { p, alvo, espera, triagemOk, dif, noTempo };
    });
    const nTri = linhas.filter(l => l.triagemOk).length;
    const subtri = linhas.filter(l => l.dif > 0 && l.dif < 99).length;
    const nTempo = linhas.filter(l => l.noTempo).length;
    const graves = this.pacientes.filter(p => p.evento).length;
    const nota = Math.max(0, Math.round((nTri / linhas.length) * 45 + (nTempo / linhas.length) * 45 + 10 - subtri * 4 - graves * 10));
    return { linhas, nTri, subtri, nTempo, graves, nota: Math.min(100, nota) };
  }
}
