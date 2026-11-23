/**
 * Megacode ACLS (algoritmo de PCR do adulto, AHA): FV refratária → AESP → retorno da circulação.
 * RCP de alta qualidade contínua, checagem de ritmo a cada 2 min, choque nos ritmos chocáveis,
 * adrenalina 1 mg a cada 3–5 min (após o 2º choque na FV; o quanto antes na AESP/assistolia),
 * amiodarona 300 mg após o 3º choque (2ª dose 150 mg), procurar e tratar Hs e Ts.
 * Causa deste caso: hipercalemia em paciente dialítico que faltou à diálise.
 */
import { aproxima, type Caso, type Estado } from './motor';

const MIN = 60;
const feito = (e: Estado, id: string) => e.feito[id] !== undefined;
const emPCR = (e: Estado) => !e.v.pulso;
const n = (e: Estado, k: string) => (e.fx[k] as number) ?? 0;

export const MEGACODE: Caso = {
  id: 'megacode-acls',
  sistema: 'cardiovascular',
  titulo: 'Megacode: parada cardiorrespiratória',
  subtitulo: 'FV refratária, AESP e Hs e Ts · algoritmo de PCR do ACLS',
  local: 'Enfermaria · código azul',
  paciente: { nome: 'Sr. Jorge', idade: 59, sexo: 'M', peso: 70 },
  chegada: [
    'Código azul na enfermaria! Homem de 59 anos encontrado irresponsivo no leito. A enfermeira diz que ele "não respira direito" e não sente pulso.',
    'O carrinho de parada e o desfibrilador já estão ao lado do leito, com as pás conectadas.',
  ],
  triagem: { fc: 0, pas: 0, pad: 0, spo2: 0, fr: 0, dor: 0 },
  inicial: { fc: 0, pas: 0, pad: 0, fr: 0, spo2: 0, temp: 36.2, dor: 0, ritmo: 'fv', pulso: false },
  limite: 40 * MIN,
  velocidade: 1,

  acoes: [
    {
      id: 'rcp', rotulo: 'Iniciar / retomar RCP (compressões contínuas)', grupo: 'Procedimentos', dur: 5, repetivel: true,
      bloqueio: e => (!emPCR(e) ? 'Paciente com pulso' : e.fx.rcp ? 'RCP em andamento' : null),
      fazer: e => {
        e.fx.rcp = true;
        e.fx.pausaDesde = -1;
        if (e.fx.rcpEm === undefined) e.fx.rcpEm = e.t;
      },
    },
    {
      id: 'checar', rotulo: 'Pausar e checar ritmo (e pulso, se ritmo organizado)', grupo: 'Procedimentos', dur: 5, repetivel: true,
      bloqueio: e => (!emPCR(e) ? 'Paciente com pulso' : null),
      fazer: (e, c) => {
        const desde = e.t - n(e, 'ultimaChecagem');
        if (e.fx.ultimaChecagem !== undefined && desde < 100) c.penalizar('Checagem de ritmo antes de 2 min de RCP: interrompe as compressões sem necessidade.', 5);
        e.fx.ultimaChecagem = e.t;
        e.fx.rcp = false;
        e.fx.pausaDesde = e.t;
        const v = e.v;
        if (v.ritmo === 'fv') {
          if (n(e, 'choques') >= 3 && e.fx.amio) {
            v.ritmo = 'sinusal';
            e.fx.aespEm = e.t;
            c.log('Ritmo organizado no monitor, FC ~40, SEM pulso: atividade elétrica sem pulso (AESP). Ritmo não chocável.', 'alerta');
          } else c.log('Fibrilação ventricular: ritmo chocável. Carregue e choque.', 'alerta');
        } else if (v.ritmo === 'sinusal' && !v.pulso) {
          if (e.fx.calcio !== undefined && e.t - n(e, 'calcio') >= 60) {
            Object.assign(v, { pulso: true, fc: 108, pas: 86, pad: 52, spo2: 90, fr: 12 });
            e.fx.roscEm = e.t;
            e.fx.rcp = false;
            c.log('Pulso carotídeo presente! Retorno da circulação espontânea (RCE). Inicie os cuidados pós-PCR.', 'evento');
          } else c.log('Continua em AESP (QRS largo, bizarro, FC ~40). Sem pulso. Retome a RCP e procure a causa (Hs e Ts).', 'alerta');
        }
      },
    },
    {
      id: 'choque', rotulo: 'Desfibrilar 200 J bifásico ("afastem-se!")', grupo: 'Procedimentos', dur: 3, repetivel: true,
      fazer: (e, c) => {
        if (e.v.ritmo !== 'fv' || !emPCR(e)) {
          c.penalizar('Choque em ritmo não chocável (AESP/assistolia): não indicado.', 15);
          return;
        }
        if (e.fx.rcp) c.penalizar('Choque sem pausar e sem confirmar o ritmo: confira o ritmo antes de chocar.', 5);
        e.fx.choques = n(e, 'choques') + 1;
        if (e.fx.choque1 === undefined) e.fx.choque1 = e.t;
        c.log(`Choque ${e.fx.choques} entregue. Retome as compressões imediatamente.`, 'acao');
      },
    },
    {
      id: 'via', rotulo: 'Via aérea avançada (IOT) + capnografia', grupo: 'Procedimentos', dur: 60,
      bloqueio: e => (emPCR(e) && !e.fx.rcp ? 'Faça com a RCP em andamento' : null),
      fazer: (e, c) => {
        e.fx.via = true;
        c.log('Tubo confirmado pela capnografia (ETCO₂ 14 mmHg). Agora: 1 ventilação a cada 6 s, compressões contínuas.', 'evento');
      },
    },
    {
      id: 'acesso', rotulo: 'Acesso venoso ou intraósseo', grupo: 'Monitorização', dur: 40,
      bloqueio: e => (emPCR(e) && !e.fx.rcp ? 'Faça com a RCP em andamento' : null),
      fazer: () => {},
    },
    {
      id: 'adrenalina', rotulo: 'Adrenalina 1 mg IV/IO + flush 20 mL', grupo: 'Medicações', dur: 15, repetivel: true,
      detalhe: 'A cada 3–5 min',
      bloqueio: e => (!feito(e, 'acesso') ? 'Precisa de acesso IV/IO' : !emPCR(e) ? 'Paciente com pulso' : null),
      fazer: (e, c) => {
        if (e.v.ritmo === 'fv' && n(e, 'choques') < 2) c.penalizar('Na FV, a primeira adrenalina vem após o 2º choque.', 5);
        const ult = e.fx.adrenUlt as number | undefined;
        if (ult !== undefined && e.t - ult < 3 * MIN) c.penalizar('Adrenalina com intervalo menor que 3 min.', 5);
        e.fx.adrenUlt = e.t;
        e.fx.adren = n(e, 'adren') + 1;
        if (e.fx.aespEm !== undefined && e.fx.adrenAesp === undefined) e.fx.adrenAesp = e.t;
      },
    },
    {
      id: 'amiodarona', rotulo: 'Amiodarona 300 mg IV/IO em bolus', grupo: 'Medicações', dur: 15,
      detalhe: 'FV/TV refratária, após o 3º choque (2ª dose: 150 mg)',
      bloqueio: e => (!feito(e, 'acesso') ? 'Precisa de acesso IV/IO' : null),
      fazer: (e, c) => {
        if (e.v.ritmo !== 'fv') c.penalizar('Amiodarona fora de ritmo chocável.', 8);
        else if (n(e, 'choques') < 3) c.penalizar('Amiodarona antes do 3º choque.', 3);
        e.fx.amio = true;
      },
    },
    {
      id: 'hst', rotulo: 'Revisar Hs e Ts (prontuário e equipe)', grupo: 'Avaliação', dur: 30,
      fazer: (e, c) => {
        e.fx.hst = true;
        c.log('Prontuário: renal crônico em hemodiálise, faltou à sessão de ontem. Fístula no braço esquerdo. Sem trauma, sem febre. Pense em hipercalemia (H), hipovolemia, hipóxia, acidose, hipotermia; tamponamento, tensão no tórax, trombose, tóxicos (T).', 'resultado');
      },
    },
    {
      id: 'gaso', rotulo: 'Gasometria e eletrólitos à beira-leito', grupo: 'Exames', dur: 20, detalhe: 'Resultado em ~2 min',
      fazer: (_e, c) => c.resultado({ id: 'gaso', titulo: 'Gasometria venosa (POC)', texto: 'pH 7,08; HCO₃ 12; K 7,9 mEq/L; glicemia 140. Hipercalemia grave com acidose metabólica.' }, 2 * MIN),
    },
    {
      id: 'usg', rotulo: 'Ultrassom à beira-leito (na pausa)', grupo: 'Exames', dur: 10,
      fazer: (_e, c) => c.log('Sem derrame pericárdico, VD não dilatado, deslizamento pleural bilateral presente. Afasta tamponamento, TEP maciço e pneumotórax.', 'resultado'),
    },
    {
      id: 'calcio', rotulo: 'Gluconato de cálcio 10% 30 mL IV (ou cloreto 10 mL)', grupo: 'Medicações', dur: 20,
      bloqueio: e => (!feito(e, 'acesso') ? 'Precisa de acesso IV/IO' : null),
      fazer: e => { if (e.fx.calcio === undefined) e.fx.calcio = e.t; },
    },
    {
      id: 'bic', rotulo: 'Bicarbonato de sódio 8,4% 50 mEq IV', grupo: 'Medicações', dur: 20,
      bloqueio: e => (!feito(e, 'acesso') ? 'Precisa de acesso IV/IO' : null),
      fazer: (e, c) => { if (!e.fx.hst && !feito(e, 'gaso')) c.penalizar('Bicarbonato de rotina na PCR, sem indicação (hipercalemia, acidose grave, tóxicos).', 5); e.fx.bic = true; },
    },
    {
      id: 'insulina', rotulo: 'Insulina regular 10 UI + glicose 50% 50 mL', grupo: 'Medicações', dur: 20,
      bloqueio: e => (!feito(e, 'acesso') ? 'Precisa de acesso IV/IO' : null),
      fazer: e => { e.fx.insulina = true; },
    },
    {
      id: 'pos', rotulo: 'Cuidados pós-PCR: ECG, PAM ≥ 65, SpO₂ 92–98%, controle de temperatura', grupo: 'Decisão', dur: 2 * MIN,
      bloqueio: e => (emPCR(e) ? 'Ainda em parada' : null),
      fazer: (e, c) => {
        e.fx.pos = true;
        c.log('ECG sem supra, noradrenalina para PAM ≥ 65, FiO₂ titulada, controle de temperatura e hemodiálise de urgência solicitada.', 'evento');
      },
    },
    {
      id: 'uti', rotulo: 'Transferir para a UTI (hemodiálise de urgência)', grupo: 'Decisão', dur: 30,
      bloqueio: e => (emPCR(e) ? 'Ainda em parada' : null),
      fazer: (_e, c) => c.encerrar('internado', 'Retorno da circulação mantido; transferido para a UTI para hemodiálise e cuidados pós-PCR.'),
    },
    { id: 'aguardar', rotulo: 'Manter a RCP por 30 s', grupo: 'Decisão', dur: 30, repetivel: true, fazer: () => {} },
  ],

  tick: (e, dt, c) => {
    const v = e.v;
    e.monitorado = true; // pás já conectadas
    if (emPCR(e)) {
      if (!e.fx.rcp && e.fx.rcpEm !== undefined && (e.fx.pausaDesde as number) >= 0 && e.t - (e.fx.pausaDesde as number) > 10) {
        c.penalizar('Pausa nas compressões maior que 10 s.', 5);
      }
      if (e.t >= 30 * MIN) c.encerrar('obito', 'Após 30 minutos de reanimação sem retorno da circulação, o óbito foi constatado.');
      e.quadro = e.fx.rcp ? (e.fx.via ? 'RCP contínua com 1 ventilação a cada 6 s. ETCO₂ 14 mmHg.' : 'RCP em andamento: 30 compressões para 2 ventilações.') : 'Sem compressões! Paciente sem pulso.';
      return;
    }
    v.fc = aproxima(v.fc, e.fx.pos ? 92 : 104, dt, 60);
    v.pas = aproxima(v.pas, e.fx.pos ? 118 : 88, dt, 90);
    v.pad = aproxima(v.pad, v.pas * 0.6, dt, 90);
    v.spo2 = aproxima(v.spo2, e.fx.pos ? 96 : 92, dt, 60);
    v.fr = 12;
    e.quadro = 'Com pulso, ainda em coma, intubado.';
  },

  metas: [
    { id: 'rcp', texto: 'Iniciar RCP em até 30 s', peso: 10, dica: 'Sem pulso: compressões já, enquanto o desfibrilador é preparado.', avaliar: e => ({ ok: feito(e, 'rcp') && e.feito.rcp <= 30 }) },
    { id: 'choque1', texto: 'Primeiro choque em até 2 min', peso: 15, dica: 'FV/TV sem pulso: choque o mais rápido possível.', avaliar: e => ({ ok: e.fx.choque1 !== undefined && (e.fx.choque1 as number) <= 2 * MIN }) },
    { id: 'pausas', texto: 'Sem pausas longas nem checagens antes de 2 min', peso: 10, dica: 'Checagem a cada 2 min, pausas menores que 10 s.', avaliar: e => ({ ok: !e.penal.some(p => /Pausa|antes de 2 min/.test(p.texto)) }) },
    { id: 'adren', texto: 'Adrenalina após o 2º choque e a cada 3–5 min', peso: 10, dica: 'Adrenalina 1 mg IV/IO a cada 3–5 min.', avaliar: e => ({ ok: n(e, 'adren') >= 1 && !e.penal.some(p => /adrenalina/i.test(p.texto)) }) },
    { id: 'amio', texto: 'Amiodarona 300 mg na FV refratária (após o 3º choque)', peso: 10, dica: 'Alternativa: lidocaína 1–1,5 mg/kg.', avaliar: e => ({ ok: e.fx.amio === true && !e.penal.some(p => /Amiodarona/.test(p.texto)) }) },
    { id: 'aesp', texto: 'Na AESP: adrenalina em até 3 min', peso: 10, dica: 'Ritmo não chocável: adrenalina o quanto antes.', avaliar: e => (e.fx.aespEm === undefined ? null : { ok: e.fx.adrenAesp !== undefined && (e.fx.adrenAesp as number) - (e.fx.aespEm as number) <= 3 * MIN }) },
    { id: 'causa', texto: 'Identificar e tratar a hipercalemia', peso: 20, dica: 'Dialítico que faltou à diálise + AESP: cálcio IV, bicarbonato, insulina com glicose e diálise.', avaliar: e => ({ ok: e.fx.calcio !== undefined }) },
    { id: 'via', texto: 'Via aérea avançada com capnografia', peso: 5, dica: 'Capnografia confirma o tubo e monitora a qualidade da RCP.', avaliar: e => ({ ok: e.fx.via === true }) },
    { id: 'pos', texto: 'Cuidados pós-PCR', peso: 10, dica: 'PAM ≥ 65, SpO₂ 92–98%, ECG, controle de temperatura, tratar a causa.', avaliar: e => ({ ok: e.fx.pos === true }) },
  ],

  ensino: [
    'PCR: RCP de alta qualidade imediata, choque precoce nos ritmos chocáveis e checagem do ritmo a cada 2 min, com pausas menores que 10 s.',
    'FV/TV sem pulso: adrenalina após o 2º choque; amiodarona 300 mg após o 3º (depois 150 mg).',
    'AESP/assistolia: não chocar; adrenalina 1 mg o quanto antes e a cada 3–5 min.',
    'Procure os Hs e Ts: hipovolemia, hipóxia, H⁺ (acidose), hipo/hipercalemia, hipotermia; tensão no tórax, tamponamento, toxinas, trombose coronária e pulmonar.',
    'Hipercalemia na PCR: cálcio IV, bicarbonato, insulina com glicose e diálise.',
  ],
};
