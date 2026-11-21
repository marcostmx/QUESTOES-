/**
 * Caso vivo 1A: IAM com supra de ST anterior em hospital SEM hemodinâmica.
 * Transferência para ICP primária levaria ~150 min (> 120 min), então a conduta é
 * fibrinólise em até 30 min da chegada + AAS, clopidogrel e enoxaparina, e depois
 * transferência para centro com hemodinâmica (estratégia fármaco-invasiva).
 * Referências: Diretriz SBC de IAM com supra de ST; AHA/ACC STEMI; ACLS (FV).
 */
import { aproxima, type Caso, type Estado } from './motor';

const MIN = 60;
const feito = (e: Estado, id: string) => e.feito[id] !== undefined;
const antes = (e: Estado, a: string, b: string) => feito(e, a) && (!feito(e, b) || e.feito[a] <= e.feito[b]);
const ate = (e: Estado, id: string, s: number) => feito(e, id) && e.feito[id] <= s;
const emFV = (e: Estado) => e.v.ritmo === 'fv';
const reperfundido = (e: Estado) => e.fx.reperfusao === true;

export const IAM: Caso = {
  id: 'iam-supra-anterior',
  sistema: 'cardiovascular',
  titulo: 'Dor torácica: IAM com supra de ST',
  subtitulo: 'Pronto-socorro sem hemodinâmica · transferência para ICP em ~150 min',
  local: 'Sala de emergência',
  paciente: { nome: 'Sr. Roberto', idade: 58, sexo: 'M', peso: 82 },
  chegada: [
    'Homem de 58 anos chega trazido pela esposa com dor no peito "em aperto" há 40 minutos, irradiando para o braço esquerdo, com sudorese fria e náusea.',
    'Hipertenso e tabagista. O hospital não tem hemodinâmica: a transferência para angioplastia levaria cerca de 150 minutos.',
  ],
  triagem: { fc: 102, pas: 152, pad: 94, spo2: 95, fr: 22, dor: 8 },
  inicial: { fc: 102, pas: 152, pad: 94, fr: 22, spo2: 95, temp: 36.4, dor: 8, ritmo: 'supra', pulso: true },
  limite: 60 * MIN,

  acoes: [
    /* ---------- Avaliação ---------- */
    {
      id: 'anamnese', rotulo: 'Anamnese dirigida e contraindicações', grupo: 'Avaliação', dur: 90,
      detalhe: 'Início da dor, fatores de risco, alergias e contraindicações à fibrinólise',
      fazer: (e, c) => {
        c.log('"Começou há uns 40 minutos, vendo televisão. Nunca senti uma dor assim." Nega AVC prévio, sangramento ativo, cirurgia ou trauma recentes, uso de anticoagulante e de sildenafila. Sem alergias.', 'fala');
        e.fx.contraindicacoes = true;
      },
    },
    {
      id: 'exame', rotulo: 'Exame físico dirigido', grupo: 'Avaliação', dur: 60,
      fazer: (_e, c) => c.log('Sudoreico e pálido. Bulhas rítmicas com B4, sem sopros. Pulmões limpos (Killip I). Pulsos simétricos. Sem turgência jugular.', 'resultado'),
    },
    /* ---------- MOV ---------- */
    {
      id: 'monitor', rotulo: 'Monitor cardíaco', grupo: 'Monitorização', dur: 30,
      fazer: e => { e.monitorado = true; },
    },
    { id: 'oximetro', rotulo: 'Oxímetro de pulso', grupo: 'Monitorização', dur: 15, fazer: () => {} },
    { id: 'acesso', rotulo: 'Acesso venoso periférico calibroso', grupo: 'Monitorização', dur: 90, fazer: () => {} },
    /* ---------- Exames ---------- */
    {
      id: 'ecg', rotulo: 'ECG de 12 derivações', grupo: 'Exames', dur: 120,
      fazer: (e, c) => c.resultado({
        id: 'ecg', titulo: 'ECG de 12 derivações', figura: e.fx.reperfusao ? 'ecg-reperfundido' : 'ecg-supra-anterior',
        texto: e.fx.reperfusao
          ? 'Ritmo sinusal. Redução de mais de 50% do supradesnivelamento de ST: critério de reperfusão.'
          : 'Ritmo sinusal, FC ~100 bpm. Supradesnivelamento de ST de V1 a V5, DI e aVL, com infradesnivelamento recíproco em DII, DIII e aVF. Conclusão: IAM com supra de ST de parede anterior extensa.',
      }),
      repetivel: true,
    },
    {
      id: 'troponina', rotulo: 'Troponina ultrassensível', grupo: 'Exames', dur: 30,
      detalhe: 'Resultado em ~60 min',
      fazer: (_e, c) => c.resultado({ id: 'troponina', titulo: 'Troponina ultrassensível', texto: 'Elevada (acima do percentil 99). Lembre: no IAM com supra, a troponina não deve atrasar a reperfusão.' }, 60 * MIN),
    },
    { id: 'glicemia', rotulo: 'Glicemia capilar', grupo: 'Exames', dur: 30, fazer: (_e, c) => c.resultado({ id: 'glicemia', titulo: 'Glicemia capilar', texto: '138 mg/dL.' }) },
    {
      id: 'lab', rotulo: 'Hemograma, eletrólitos, função renal e coagulograma', grupo: 'Exames', dur: 30, detalhe: 'Resultado em ~40 min',
      fazer: (_e, c) => c.resultado({ id: 'lab', titulo: 'Laboratório', texto: 'Hb 14,8 g/dL; plaquetas 236 mil; K 4,1; creatinina 1,0 mg/dL; TP e TTPa normais.' }, 40 * MIN),
    },
    {
      id: 'rx', rotulo: 'Radiografia de tórax', grupo: 'Exames', dur: 12 * MIN, detalhe: 'Leva ~12 min na sala de raio X',
      fazer: (e, c) => {
        c.resultado({ id: 'rx', titulo: 'Radiografia de tórax', texto: 'Área cardíaca normal, sem congestão, mediastino de largura normal.' });
        if (!feito(e, 'tnk')) c.penalizar('Radiografia antes da fibrinólise atrasou a reperfusão (não é necessária para decidir).', 5);
      },
    },
    /* ---------- Medicações ---------- */
    { id: 'aas', rotulo: 'AAS 300 mg mastigado', grupo: 'Medicações', dur: 30, fazer: () => {} },
    {
      id: 'clopidogrel', rotulo: 'Clopidogrel 300 mg VO (ataque)', grupo: 'Medicações', dur: 30,
      detalhe: 'Com fibrinólise: 300 mg até 75 anos; acima de 75, 75 mg sem ataque',
      fazer: () => {},
    },
    {
      id: 'enoxaparina', rotulo: 'Enoxaparina 30 mg IV + 1 mg/kg SC', grupo: 'Medicações', dur: 60,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: () => {},
    },
    {
      id: 'nitrato', rotulo: 'Dinitrato de isossorbida 5 mg SL', grupo: 'Medicações', dur: 30, repetivel: true,
      detalhe: 'Contraindicado se PAS < 90, IAM de VD ou uso de sildenafila',
      fazer: (e, c) => {
        if (e.v.pas < 90) c.penalizar('Nitrato com PAS < 90 mmHg: risco de hipotensão grave.', 15);
        if (!e.fx.contraindicacoes) c.penalizar('Nitrato sem perguntar sobre sildenafila/tadalafila.', 5);
        e.fx.nitratoAte = e.t + 10 * MIN;
        e.v.pas -= 12;
      },
    },
    {
      id: 'morfina', rotulo: 'Morfina 2 mg IV', grupo: 'Medicações', dur: 30, repetivel: true,
      detalhe: 'Só para dor refratária ao nitrato',
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: e => { e.fx.morfinaAte = e.t + 15 * MIN; },
    },
    {
      id: 'o2', rotulo: 'Oxigênio por cateter nasal', grupo: 'Medicações', dur: 20,
      fazer: (e, c) => { if (e.v.spo2 >= 90) c.penalizar('Oxigênio com SpO₂ ≥ 90%: sem benefício no IAM (só se hipoxemia).', 3); },
    },
    {
      id: 'metoprolol', rotulo: 'Metoprolol IV', grupo: 'Medicações', dur: 30,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (e, c) => {
        c.penalizar('Betabloqueador IV de rotina na fase aguda aumenta o risco de choque cardiogênico. Prefira VO nas primeiras 24 h, se estável.', 10);
        e.v.pas -= 15;
        e.v.fc -= 15;
      },
    },
    {
      id: 'tnk', rotulo: 'Fibrinólise: tenecteplase 45 mg IV em bolus', grupo: 'Medicações', dur: 60,
      detalhe: 'Dose pelo peso (82 kg)',
      bloqueio: e => (!feito(e, 'ecg') ? 'Confirme o diagnóstico com o ECG' : !feito(e, 'acesso') ? 'Precisa de acesso venoso' : null),
      fazer: (e, c) => {
        if (!e.fx.contraindicacoes) c.penalizar('Fibrinólise sem checar contraindicações (AVC, sangramento, cirurgia recente).', 10);
        e.fx.tnkEm = e.t;
        c.log('Tenecteplase infundida. Observe os critérios de reperfusão nos próximos 60–90 min.', 'evento');
      },
    },
    /* ---------- Parada ---------- */
    {
      id: 'rcp', rotulo: 'Iniciar RCP (compressões 100–120/min)', grupo: 'Procedimentos', dur: 10, repetivel: true,
      visivel: e => e.fx.fvInicio !== undefined,
      fazer: (e, c) => {
        if (e.v.pulso) c.penalizar('RCP em paciente com pulso.', 15);
        else e.fx.rcp = true;
      },
    },
    {
      id: 'choque', rotulo: 'Desfibrilar 200 J (bifásico)', grupo: 'Procedimentos', dur: 10, repetivel: true,
      bloqueio: e => (e.monitorado ? null : 'Monitorize para ver o ritmo'),
      fazer: (e, c) => {
        if (!emFV(e)) {
          c.penalizar('Choque em ritmo que não é chocável (paciente com pulso).', 20);
          return;
        }
        e.fx.choques = ((e.fx.choques as number) ?? 0) + 1;
        if (e.fx.choqueEm === undefined) e.fx.choqueEm = e.t;
        const rapido = e.t - (e.fx.fvInicio as number) <= 2 * MIN;
        if (rapido || e.fx.rcp) {
          Object.assign(e.v, { ritmo: 'supra', pulso: true, fc: 112, pas: 104, pad: 66, spo2: 93 });
          e.fx.rcp = false;
          c.log('Retorno da circulação espontânea após o choque. Mantenha a reperfusão como prioridade.', 'evento');
        } else c.log('Ainda em FV. Retome a RCP por 2 minutos e reavalie o ritmo.', 'alerta');
      },
    },
    /* ---------- Decisão ---------- */
    {
      id: 'icp', rotulo: 'Transferir já para angioplastia primária (~150 min)', grupo: 'Decisão', dur: 30,
      bloqueio: e => (feito(e, 'tnk') ? 'Após fibrinólise, use a transferência fármaco-invasiva' : null),
      fazer: (_e, c) => {
        c.penalizar('Transferir para ICP primária com atraso previsto > 120 min, sem fibrinolisar: perde-se miocárdio.', 25);
        c.encerrar('transferido', 'Paciente transferido sem reperfusão. Chegará à hemodinâmica cerca de 150 min depois.');
      },
    },
    {
      id: 'transferir', rotulo: 'Transferir para centro com hemodinâmica (estratégia fármaco-invasiva)', grupo: 'Decisão', dur: 30,
      bloqueio: e => (!feito(e, 'tnk') ? 'Primeiro decida a reperfusão' : emFV(e) ? 'Paciente em parada' : null),
      fazer: (e, c) => c.encerrar('transferido', reperfundido(e)
        ? 'Transferido estável, com critérios de reperfusão, para cateterismo nas próximas 2 a 24 horas.'
        : 'Transferido após a fibrinólise. Sem critérios de reperfusão ainda: precisará de angioplastia de resgate.'),
    },
    { id: 'aguardar', rotulo: 'Observar 1 minuto', grupo: 'Decisão', dur: 60, repetivel: true, fazer: () => {} },
  ],

  tick: (e, dt, c) => {
    const v = e.v;
    // parada: FV se a fibrinólise atrasar (isquemia prolongada)
    if (!feito(e, 'tnk') && e.fx.fvInicio === undefined && e.t >= 17 * MIN) {
      e.fx.fvInicio = e.t;
      Object.assign(v, { ritmo: 'fv', pulso: false, pas: 0, pad: 0, spo2: 0, fr: 0 });
      c.log('O paciente perde a consciência! Sem pulso central.', 'alerta');
    }
    if (emFV(e)) {
      if (e.t - (e.fx.fvInicio as number) > 8 * MIN) c.encerrar('obito', 'Óbito em fibrilação ventricular sem desfibrilação efetiva.');
      e.quadro = 'Inconsciente, sem pulso, em gasping.';
      return;
    }
    // reperfusão ~20 min após a fibrinólise, com RIVA transitório
    const tnk = e.fx.tnkEm as number | undefined;
    if (tnk !== undefined && !reperfundido(e)) {
      if (e.t >= tnk + 18 * MIN && v.ritmo !== 'riva') {
        v.ritmo = 'riva';
        c.log('Ritmo idioventricular acelerado no monitor: arritmia de reperfusão, benigna.', 'evento');
      }
      if (e.t >= tnk + 20 * MIN) {
        e.fx.reperfusao = true;
        v.ritmo = 'sinusal';
        c.log('Dor em melhora importante e resolução do supra de ST: critérios de reperfusão presentes.', 'evento');
      }
    }
    let dor = reperfundido(e) ? 1 : 8;
    if ((e.fx.nitratoAte as number) > e.t) dor -= 2;
    if ((e.fx.morfinaAte as number) > e.t) dor -= 2;
    if (feito(e, 'aas')) dor -= 0.5;
    dor = Math.max(0, dor);
    v.dor = aproxima(v.dor, dor, dt, 60);
    const ruido = () => (Math.random() - 0.5) * 0.6;
    v.fc = aproxima(v.fc, (v.ritmo === 'riva' ? 76 : 76 + v.dor * 3.2) + ruido(), dt, 40);
    v.pas = aproxima(v.pas, 128 + v.dor * 3 - ((e.fx.nitratoAte as number) > e.t ? 12 : 0), dt, 90);
    v.pad = aproxima(v.pad, 78 + v.dor * 2, dt, 90);
    v.fr = aproxima(v.fr, 16 + v.dor * 0.7, dt, 60);
    v.spo2 = aproxima(v.spo2, feito(e, 'o2') ? 98 : reperfundido(e) ? 97 : 95, dt, 60);
    e.quadro = v.dor >= 6 ? 'Muito ansioso, sudoreico, com a mão no peito.' : v.dor >= 3 ? 'Ainda com desconforto torácico, menos sudoreico.' : 'Mais tranquilo; refere alívio da dor.';
  },

  metas: [
    {
      id: 'mov', texto: 'Monitor, oxímetro e acesso venoso em até 5 min', peso: 10,
      dica: 'MOV logo na chegada de toda dor torácica.',
      avaliar: e => ({ ok: ['monitor', 'oximetro', 'acesso'].every(id => ate(e, id, 5 * MIN)) }),
    },
    {
      id: 'ecg10', texto: 'ECG de 12 derivações em até 10 min', peso: 15,
      dica: 'A meta porta-ECG é de 10 minutos.',
      avaliar: e => ({ ok: ate(e, 'ecg', 10 * MIN), nota: feito(e, 'ecg') ? `feito aos ${Math.round(e.feito.ecg / 60)} min` : 'não feito' }),
    },
    {
      id: 'aas', texto: 'AAS na chegada (até 15 min)', peso: 10,
      dica: 'AAS 150–300 mg mastigado, salvo alergia.',
      avaliar: e => ({ ok: ate(e, 'aas', 15 * MIN) }),
    },
    {
      id: 'ci', texto: 'Checar contraindicações antes da fibrinólise', peso: 10,
      dica: 'AVC prévio, sangramento ativo, cirurgia ou trauma recentes, dissecção de aorta.',
      avaliar: e => (feito(e, 'tnk') ? { ok: antes(e, 'anamnese', 'tnk') } : { ok: false, nota: 'não houve fibrinólise' }),
    },
    {
      id: 'tnk30', texto: 'Fibrinólise em até 30 min da chegada (porta-agulha)', peso: 25,
      dica: 'Se a ICP primária não sai em até 120 min, fibrinolise em até 30 min.',
      avaliar: e => ({ ok: ate(e, 'tnk', 30 * MIN), nota: feito(e, 'tnk') ? `aos ${Math.round(e.feito.tnk / 60)} min` : 'não feita' }),
    },
    {
      id: 'adjuvante', texto: 'Clopidogrel e anticoagulação junto com a fibrinólise', peso: 10,
      dica: 'Com fibrinólise: clopidogrel 300 mg (≤ 75 anos) + enoxaparina.',
      avaliar: e => ({ ok: feito(e, 'clopidogrel') && feito(e, 'enoxaparina') }),
    },
    {
      id: 'transf', texto: 'Transferir para centro com hemodinâmica após a fibrinólise', peso: 10,
      dica: 'Estratégia fármaco-invasiva: cateterismo em 2–24 h (ou resgate se não reperfundir).',
      avaliar: e => ({ ok: feito(e, 'transferir') }),
    },
    {
      id: 'fv', texto: 'Na FV: desfibrilar em até 2 min', peso: 10,
      dica: 'FV/TV sem pulso: choque imediato e RCP de alta qualidade.',
      avaliar: e => (e.fx.fvInicio === undefined ? null : { ok: e.fx.choqueEm !== undefined && (e.fx.choqueEm as number) - (e.fx.fvInicio as number) <= 2 * MIN }),
    },
  ],

  ensino: [
    'Supra de ST + dor isquêmica = reperfusão já. Troponina e radiografia não devem atrasar a decisão.',
    'Sem hemodinâmica e com transferência > 120 min: fibrinólise em até 30 min, depois transferência (fármaco-invasiva).',
    'Critérios de reperfusão: alívio da dor, queda > 50% do supra de ST em 60–90 min, RIVA e pico precoce de marcadores.',
    'Oxigênio só se SpO₂ < 90%. Nitrato é contraindicado com PAS < 90, IAM de VD ou uso de inibidor de PDE-5.',
    'A principal causa de morte precoce no IAM é a FV: monitorize e tenha o desfibrilador pronto.',
  ],
};
