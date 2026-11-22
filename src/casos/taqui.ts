/**
 * Caso vivo: taquicardia instável — TV monomórfica com pulso (algoritmo de taquicardia do ACLS/AHA).
 * Taquicardia com instabilidade (hipotensão, alteração de consciência, choque, dor isquêmica, IC):
 * cardioversão elétrica SINCRONIZADA imediata (TV monomórfica: 100 J), com sedação se possível.
 * Não atrasar com drogas. Se perder o pulso: desfibrilação (não sincronizada) e RCP.
 */
import { aproxima, type Caso, type Estado } from './motor';

const MIN = 60;
const feito = (e: Estado, id: string) => e.feito[id] !== undefined;
const ate = (e: Estado, id: string, s: number) => feito(e, id) && e.feito[id] <= s;
const emTV = (e: Estado) => e.v.ritmo === 'tv';
const semPulso = (e: Estado) => !e.v.pulso;

function reverte(e: Estado) {
  Object.assign(e.v, { ritmo: 'sinusal', pulso: true, fc: 96, pas: 104, pad: 64, spo2: 95, fr: 20 });
  e.fx.revertido = true;
}

export const TAQUI: Caso = {
  id: 'taquicardia-instavel',
  sistema: 'cardiovascular',
  titulo: 'Palpitação e hipotensão: taquicardia instável',
  subtitulo: 'Taquicardia de QRS largo com pulso · algoritmo de taquicardia',
  local: 'Sala de emergência',
  paciente: { nome: 'Sr. Antônio', idade: 66, sexo: 'M', peso: 78 },
  chegada: [
    'Homem de 66 anos com palpitação forte há 30 minutos, tontura e "aperto" no peito. Infartou há três anos.',
    'Está pálido, sudoreico e responde devagar.',
  ],
  triagem: { fc: 182, pas: 82, pad: 50, spo2: 93, fr: 26, dor: 5 },
  inicial: { fc: 182, pas: 82, pad: 50, fr: 26, spo2: 93, temp: 36.5, dor: 5, ritmo: 'tv', pulso: true },
  limite: 40 * MIN,

  acoes: [
    {
      id: 'exame', rotulo: 'Avaliar pulso e sinais de instabilidade', grupo: 'Avaliação', dur: 30,
      fazer: (e, c) => {
        c.log(semPulso(e) ? 'Sem pulso central!' : 'Pulso carotídeo fino e rápido. PA 82/50, sonolento, dor torácica, extremidades frias: taquicardia INSTÁVEL.', 'resultado');
        e.fx.instavel = true;
      },
    },
    {
      id: 'anamnese', rotulo: 'História e medicações', grupo: 'Avaliação', dur: 60,
      fazer: (e, c) => {
        c.log('"Tive um infarto há três anos, uso AAS, atorvastatina e carvedilol. Tomo furosemida também." Sem alergias.', 'fala');
        e.fx.historia = true;
      },
    },
    { id: 'monitor', rotulo: 'Monitor e pás do desfibrilador', grupo: 'Monitorização', dur: 30, fazer: e => { e.monitorado = true; } },
    { id: 'oximetro', rotulo: 'Oxímetro de pulso', grupo: 'Monitorização', dur: 15, fazer: () => {} },
    { id: 'acesso', rotulo: 'Acesso venoso periférico', grupo: 'Monitorização', dur: 90, fazer: () => {} },
    {
      id: 'o2', rotulo: 'Oxigênio (alvo SpO₂ ≥ 94%)', grupo: 'Monitorização', dur: 20,
      fazer: (e, c) => { if (e.v.spo2 >= 94) c.penalizar('Oxigênio sem hipoxemia.', 3); else e.fx.o2 = true; },
    },
    {
      id: 'ecg', rotulo: 'ECG de 12 derivações', grupo: 'Exames', dur: 90,
      fazer: (e, c) => c.resultado(e.fx.revertido
        ? { id: 'ecg', titulo: 'ECG de 12 derivações (pós-cardioversão)', figura: 'normal', texto: 'Ritmo sinusal, FC ~95 bpm, área inativa anterior antiga, sem supra de ST novo.' }
        : { id: 'ecg', titulo: 'ECG de 12 derivações', figura: 'tv', texto: 'Taquicardia regular de QRS largo (~180 ms), monomórfica, FC ~180 bpm, sem ondas P relacionadas. Com IAM prévio: taquicardia ventricular até prova em contrário.' }),
      repetivel: true,
    },
    {
      id: 'lab', rotulo: 'Potássio, magnésio, troponina', grupo: 'Exames', dur: 30, detalhe: 'Resultado em ~30 min',
      fazer: (_e, c) => c.resultado({ id: 'lab', titulo: 'Laboratório', texto: 'K 3,2 mEq/L (baixo, pela furosemida); Mg 1,5 mg/dL (baixo); troponina discretamente elevada.' }, 30 * MIN),
    },
    {
      id: 'sedacao', rotulo: 'Sedação e analgesia (etomidato + fentanil)', grupo: 'Medicações', dur: 60,
      detalhe: 'Antes da cardioversão, se não atrasar',
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: () => {},
    },
    {
      id: 'cardioversao', rotulo: 'Cardioversão SINCRONIZADA 100 J', grupo: 'Procedimentos', dur: 20, repetivel: true,
      bloqueio: e => (!e.monitorado ? 'Conecte o monitor e as pás' : !emTV(e) ? 'Sem taquicardia para cardioverter' : null),
      fazer: (e, c) => {
        if (semPulso(e)) {
          c.penalizar('Cardioversão sincronizada em TV sem pulso: o aparelho pode não disparar. Sem pulso = desfibrilar.', 10);
          return;
        }
        if (!feito(e, 'sedacao')) c.penalizar('Cardioversão em paciente consciente sem sedação.', 5);
        e.fx.cvEm = e.t;
        reverte(e);
        c.log('Choque sincronizado entregue: reversão para ritmo sinusal.', 'evento');
      },
    },
    {
      id: 'desfibrilar', rotulo: 'Desfibrilar 200 J (não sincronizado)', grupo: 'Procedimentos', dur: 15, repetivel: true,
      bloqueio: e => (e.monitorado ? null : 'Conecte o monitor e as pás'),
      fazer: (e, c) => {
        if (!semPulso(e)) {
          c.penalizar('Choque não sincronizado em paciente com pulso: risco de cair no período vulnerável (R sobre T) e gerar FV.', 15);
          if (emTV(e)) Object.assign(e.v, { ritmo: 'fv', pulso: false, pas: 0, pad: 0, spo2: 0, fr: 0 });
          e.fx.pcrEm = e.t;
          c.log('O choque caiu sobre a onda T: fibrilação ventricular!', 'alerta');
          return;
        }
        reverte(e);
        e.fx.desfibOk = e.t;
        c.log('Desfibrilação: retorno da circulação em ritmo sinusal.', 'evento');
      },
    },
    {
      id: 'rcp', rotulo: 'Iniciar RCP', grupo: 'Procedimentos', dur: 10, repetivel: true,
      visivel: e => e.fx.pcrEm !== undefined,
      fazer: (e, c) => { if (e.v.pulso) c.penalizar('RCP em paciente com pulso.', 15); },
    },
    {
      id: 'adenosina', rotulo: 'Adenosina 6 mg IV em bolus', grupo: 'Medicações', dur: 30,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (_e, c) => c.penalizar('Paciente instável: drogas atrasam a cardioversão (adenosina só se estável, com QRS largo regular e monomórfico).', 10),
    },
    {
      id: 'amiodarona', rotulo: 'Amiodarona 150 mg IV em 10 min', grupo: 'Medicações', dur: 60,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (e, c) => {
        if (!e.fx.revertido) c.penalizar('Amiodarona antes da cardioversão no paciente instável atrasa o tratamento.', 8);
        else e.fx.amioPos = true;
      },
    },
    {
      id: 'repor', rotulo: 'Repor potássio e sulfato de magnésio', grupo: 'Medicações', dur: 30,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: e => { e.fx.repos = true; },
    },
    {
      id: 'verapamil', rotulo: 'Verapamil 5 mg IV', grupo: 'Medicações', dur: 20,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (e, c) => { c.penalizar('Verapamil em taquicardia de QRS largo pode causar colapso hemodinâmico.', 15); e.v.pas -= 15; },
    },
    {
      id: 'uti', rotulo: 'Internar na UTI coronariana (investigar isquemia, avaliar CDI)', grupo: 'Decisão', dur: 30,
      bloqueio: e => (e.fx.revertido ? null : 'Estabilize o ritmo primeiro'),
      fazer: (_e, c) => c.encerrar('internado', 'Revertido, em ritmo sinusal, internado na unidade coronariana para investigação e avaliação de cardiodesfibrilador.'),
    },
    { id: 'aguardar', rotulo: 'Observar 1 minuto', grupo: 'Decisão', dur: 60, repetivel: true, fazer: () => {} },
  ],

  tick: (e, dt, c) => {
    const v = e.v;
    if (semPulso(e)) {
      if (e.fx.pcrEm === undefined) e.fx.pcrEm = e.t;
      if (e.t - (e.fx.pcrEm as number) > 6 * MIN) c.encerrar('obito', 'Óbito em parada sem desfibrilação efetiva.');
      e.quadro = 'Inconsciente, sem pulso.';
      return;
    }
    if (emTV(e) && e.t >= 10 * MIN) {
      e.fx.pcrEm = e.t;
      Object.assign(v, { pulso: false, pas: 0, pad: 0, spo2: 0, fr: 0 });
      c.log('O paciente perde o pulso: TV sem pulso!', 'alerta');
      return;
    }
    if (emTV(e)) {
      v.fc = aproxima(v.fc, 182, dt, 30);
      v.pas = aproxima(v.pas, 82 - Math.min(14, e.t / 40), dt, 60);
      v.pad = v.pas * 0.6;
      v.spo2 = aproxima(v.spo2, e.fx.o2 ? 96 : 92, dt, 60);
      v.dor = aproxima(v.dor, 6, dt, 120);
      e.quadro = v.pas < 75 ? 'Muito sonolento, pálido, pele fria e úmida.' : 'Sonolento, sudoreico, com aperto no peito.';
    } else {
      v.fc = aproxima(v.fc, 90, dt, 60);
      v.pas = aproxima(v.pas, 124, dt, 90);
      v.pad = aproxima(v.pad, 76, dt, 90);
      v.spo2 = aproxima(v.spo2, 97, dt, 60);
      v.dor = aproxima(v.dor, 1, dt, 120);
      v.fr = aproxima(v.fr, 18, dt, 90);
      e.quadro = 'Acordado, conversando; a palpitação passou.';
    }
  },

  metas: [
    { id: 'mov', texto: 'Monitor, oxímetro e acesso em até 3 min', peso: 10, dica: 'Instável: MOV em paralelo com o preparo do choque.', avaliar: e => ({ ok: ['monitor', 'oximetro', 'acesso'].every(id => ate(e, id, 3 * MIN)) }) },
    { id: 'instab', texto: 'Checar pulso e instabilidade em até 2 min', peso: 10, dica: 'Primeiro: tem pulso? Está instável?', avaliar: e => ({ ok: ate(e, 'exame', 2 * MIN) }) },
    {
      id: 'cv', texto: 'Cardioversão sincronizada em até 8 min', peso: 35, dica: 'Taquicardia instável com pulso: cardioversão sincronizada imediata (TV monomórfica: 100 J).',
      avaliar: e => ({ ok: ate(e, 'cardioversao', 8 * MIN) && e.fx.cvEm !== undefined, nota: e.fx.cvEm !== undefined ? `aos ${Math.round((e.fx.cvEm as number) / 60)} min` : 'não feita' }),
    },
    { id: 'sedacao', texto: 'Sedação antes do choque', peso: 10, dica: 'Paciente consciente: sedar e analgesiar, sem atrasar o choque.', avaliar: e => (e.fx.cvEm !== undefined ? { ok: feito(e, 'sedacao') && e.feito.sedacao <= (e.fx.cvEm as number) } : null) },
    { id: 'ecg', texto: 'Registrar ECG de 12 derivações', peso: 10, dica: 'Documente a taquicardia (se não atrasar o choque) e repita após a reversão.', avaliar: e => ({ ok: feito(e, 'ecg') }) },
    { id: 'eletro', texto: 'Corrigir potássio e magnésio', peso: 10, dica: 'Hipocalemia e hipomagnesemia (diurético) favorecem arritmias ventriculares.', avaliar: e => ({ ok: e.fx.repos === true }) },
    { id: 'amio', texto: 'Amiodarona após a reversão (prevenir recorrência)', peso: 5, dica: '150 mg IV em 10 min, depois manutenção.', avaliar: e => (e.fx.revertido ? { ok: e.fx.amioPos === true } : null) },
    { id: 'uti', texto: 'Internar em unidade coronariana', peso: 10, dica: 'Investigar isquemia e avaliar CDI.', avaliar: e => ({ ok: feito(e, 'uti') }) },
  ],

  ensino: [
    'Taquicardia com pulso e instabilidade: cardioversão SINCRONIZADA imediata. Doses iniciais: QRS estreito regular 50–100 J; FA 120–200 J; TV monomórfica 100 J.',
    'Sedação e analgesia antes do choque, desde que não atrasem a conduta.',
    'Sem pulso: não é cardioversão, é desfibrilação (não sincronizada) e RCP.',
    'Choque não sincronizado num paciente com pulso pode cair sobre a onda T e desencadear FV.',
    'QRS largo em cardiopata: trate como TV. Evite verapamil/diltiazem. Corrija K e Mg.',
  ],
};
