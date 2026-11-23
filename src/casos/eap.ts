/**
 * Caso vivo: edema agudo de pulmão hipertensivo (IC aguda "quente e úmida" com PA muito alta).
 * Pilares: sentar o paciente, ventilação não invasiva (CPAP/BiPAP) precoce, vasodilatador em dose
 * alta (nitrato SL e nitroglicerina IV), diurético de alça; investigar gatilho (isquemia, arritmia,
 * má adesão). Morfina não é mais recomendada de rotina. Intubação se falhar a VNI.
 * Referências: Diretriz Brasileira de IC aguda (SBC); ESC Heart Failure.
 */
import { aproxima, type Caso, type Estado } from './motor';

const MIN = 60;
const feito = (e: Estado, id: string) => e.feito[id] !== undefined;
const ate = (e: Estado, id: string, s: number) => feito(e, id) && e.feito[id] <= s;
const suporte = (e: Estado) => e.fx.vni === true || e.fx.iot === true;

export const EAP: Caso = {
  id: 'edema-agudo-pulmao',
  sistema: 'cardiovascular',
  titulo: 'Falta de ar súbita: edema agudo de pulmão',
  subtitulo: 'IC aguda hipertensiva · VNI e vasodilatador',
  local: 'Sala de emergência',
  paciente: { nome: 'Dona Cida', idade: 71, sexo: 'F', peso: 80 },
  chegada: [
    'Mulher de 71 anos acordou de madrugada "afogando", sem conseguir deitar. Tosse com secreção rósea e espumosa.',
    'Hipertensa e diabética; parou os remédios da pressão há duas semanas.',
  ],
  triagem: { fc: 118, pas: 212, pad: 118, spo2: 84, fr: 34, dor: 0 },
  inicial: { fc: 118, pas: 212, pad: 118, fr: 34, spo2: 84, temp: 36.3, dor: 0, ritmo: 'sinusal', pulso: true },
  limite: 45 * MIN,

  acoes: [
    {
      id: 'exame', rotulo: 'Exame físico dirigido', grupo: 'Avaliação', dur: 45,
      fazer: (_e, c) => c.log('Sentada, sudoreica, usando musculatura acessória, fala frases curtas. Estertores crepitantes até os ápices, sibilos difusos. B3 presente, turgência jugular a 45°. Extremidades quentes. Perfil "quente e úmido".', 'resultado'),
    },
    {
      id: 'anamnese', rotulo: 'História e gatilhos', grupo: 'Avaliação', dur: 60,
      fazer: (e, c) => { c.log('Filho: "Ela parou o anlodipino e a losartana. Comeu muita comida salgada no fim de semana." Sem dor torácica.', 'fala'); e.fx.gatilho = true; },
    },
    { id: 'sentar', rotulo: 'Sentar o paciente, pernas pendentes', grupo: 'Monitorização', dur: 10, fazer: () => {} },
    { id: 'monitor', rotulo: 'Monitor cardíaco', grupo: 'Monitorização', dur: 30, fazer: e => { e.monitorado = true; } },
    { id: 'oximetro', rotulo: 'Oxímetro de pulso', grupo: 'Monitorização', dur: 15, fazer: () => {} },
    { id: 'acesso', rotulo: 'Acesso venoso periférico', grupo: 'Monitorização', dur: 90, fazer: () => {} },
    { id: 'o2', rotulo: 'Oxigênio por máscara com reservatório', grupo: 'Procedimentos', dur: 20, fazer: e => { e.fx.o2 = true; } },
    {
      id: 'vni', rotulo: 'VNI: CPAP/BiPAP (EPAP 8–10 cmH₂O)', grupo: 'Procedimentos', dur: 90,
      detalhe: 'Reduz pré e pós-carga, recruta alvéolos e evita intubação',
      bloqueio: e => (e.fx.iot ? 'Já intubada' : e.fx.rebaixada ? 'Rebaixada: VNI contraindicada' : null),
      fazer: e => { e.fx.vni = true; },
    },
    {
      id: 'iot', rotulo: 'Intubação orotraqueal e ventilação mecânica', grupo: 'Procedimentos', dur: 4 * MIN,
      fazer: (e, c) => {
        if (!e.fx.rebaixada && !e.fx.vniFalhou) c.penalizar('Intubação sem tentar VNI em paciente consciente: a VNI reduz a necessidade de IOT no EAP.', 10);
        e.fx.iot = true;
      },
    },
    {
      id: 'nitratoSL', rotulo: 'Dinitrato de isossorbida 5 mg SL', grupo: 'Medicações', dur: 20, repetivel: true,
      detalhe: 'Pode repetir enquanto prepara a nitroglicerina IV',
      fazer: (e, c) => {
        if (e.v.pas < 90) c.penalizar('Nitrato com PAS < 90 mmHg.', 15);
        e.fx.vaso = Math.max((e.fx.vaso as number) ?? 0, 1);
      },
    },
    {
      id: 'tridil', rotulo: 'Nitroglicerina IV em bomba (titular a cada 5 min)', grupo: 'Medicações', dur: 60,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: e => { e.fx.vaso = 2; },
    },
    {
      id: 'furosemida', rotulo: 'Furosemida 40–80 mg IV', grupo: 'Medicações', dur: 30,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: e => { e.fx.diur = e.t; },
    },
    {
      id: 'morfina', rotulo: 'Morfina 2 mg IV', grupo: 'Medicações', dur: 20,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (_e, c) => c.penalizar('Morfina no EAP associa-se a mais intubação e mortalidade: não é recomendada de rotina.', 8),
    },
    {
      id: 'soro', rotulo: 'Soro fisiológico 500 mL', grupo: 'Medicações', dur: 20,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (e, c) => { c.penalizar('Volume em paciente congesto piora o edema pulmonar.', 15); e.v.spo2 -= 4; },
    },
    {
      id: 'metoprolol', rotulo: 'Metoprolol IV', grupo: 'Medicações', dur: 20,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (_e, c) => c.penalizar('Betabloqueador IV na IC aguda descompensada pode precipitar choque.', 12),
    },
    {
      id: 'ecg', rotulo: 'ECG de 12 derivações', grupo: 'Exames', dur: 90,
      fazer: (_e, c) => c.resultado({ id: 'ecg', titulo: 'ECG de 12 derivações', figura: 'taqui-sinusal', texto: 'Taquicardia sinusal, sobrecarga de VE, sem supra de ST. Isquemia aguda pouco provável, mas dose troponina.' }),
    },
    {
      id: 'lab', rotulo: 'Troponina, BNP, função renal, eletrólitos, gasometria', grupo: 'Exames', dur: 30, detalhe: 'Resultado em ~30 min',
      fazer: (_e, c) => c.resultado({ id: 'lab', titulo: 'Laboratório', texto: 'BNP 1.850 pg/mL; troponina negativa; creatinina 1,4; K 4,2. Gasometria inicial: pH 7,28, pCO₂ 48, pO₂ 52 (acidose respiratória aguda).' }, 30 * MIN),
    },
    {
      id: 'imagem', rotulo: 'Radiografia de tórax ou ultrassom pulmonar à beira-leito', grupo: 'Exames', dur: 4 * MIN,
      fazer: (_e, c) => c.resultado({ id: 'imagem', titulo: 'Imagem do tórax', texto: 'US: linhas B difusas e bilaterais, sem derrame pericárdico. RX: congestão hilar "em asa de borboleta", cefalização da trama vascular.' }),
    },
    {
      id: 'uti', rotulo: 'Internar na UTI / unidade de emergência', grupo: 'Decisão', dur: 30,
      bloqueio: e => (suporte(e) || e.v.spo2 >= 92 ? null : 'Estabilize a oxigenação primeiro'),
      fazer: (e, c) => c.encerrar('internado', e.fx.iot ? 'Intubada e internada na UTI.' : 'Melhora com VNI e vasodilatador; internada na unidade de emergência para desmame da VNI e investigação.'),
    },
    { id: 'aguardar', rotulo: 'Observar 1 minuto', grupo: 'Decisão', dur: 60, repetivel: true, fazer: () => {} },
  ],

  tick: (e, dt, c) => {
    const v = e.v;
    if (!v.pulso) {
      if (e.t - (e.fx.pcrEm as number) > 4 * MIN) c.encerrar('obito', 'Parada por hipoxemia grave.');
      e.quadro = 'Sem pulso.';
      return;
    }
    const vaso = (e.fx.vaso as number) ?? 0;
    const melhora = (e.fx.vni ? 2 : e.fx.iot ? 2.5 : e.fx.o2 ? 0.6 : 0) + vaso * 0.9 + (e.fx.diur !== undefined && e.t - (e.fx.diur as number) > 5 * MIN ? 0.8 : 0) + (feito(e, 'sentar') ? 0.3 : 0);
    // falha: sem VNI/vasodilatador, hipoxemia progride e a paciente rebaixa
    if (melhora < 2 && e.t > 12 * MIN && !e.fx.rebaixada && !e.fx.iot) {
      e.fx.rebaixada = true;
      c.log('A paciente fica sonolenta e para de colaborar (hipercapnia). Indicação de intubação!', 'alerta');
    }
    if (e.fx.rebaixada && !e.fx.iot && e.t > 20 * MIN) {
      e.fx.pcrEm = e.t;
      Object.assign(v, { pulso: false, ritmo: 'assistolia', pas: 0, pad: 0, spo2: 0, fr: 0, fc: 0 });
      c.log('Parada cardiorrespiratória em AESP/assistolia por hipóxia.', 'alerta');
      return;
    }
    const spo2Alvo = Math.min(97, 82 + melhora * 3.4 - (e.fx.rebaixada && !e.fx.iot ? 8 : 0));
    v.spo2 = aproxima(v.spo2, spo2Alvo, dt, 90);
    v.pas = aproxima(v.pas, Math.max(130, 214 - vaso * 30 - (e.fx.vni ? 12 : 0)), dt, 120);
    v.pad = aproxima(v.pad, v.pas * 0.56, dt, 120);
    v.fr = aproxima(v.fr, e.fx.iot ? 16 : Math.max(18, 35 - melhora * 3.2), dt, 90);
    v.fc = aproxima(v.fc, Math.max(84, 120 - melhora * 6), dt, 90);
    e.quadro = e.fx.iot ? 'Intubada, sedada, em ventilação mecânica.' : e.fx.rebaixada ? 'Sonolenta, respiração superficial, cianótica.' : v.spo2 < 88 ? 'Muito dispneica, agitada, tosse com espuma rósea.' : v.spo2 < 93 ? 'Ainda dispneica, mas falando frases mais longas.' : 'Respirando melhor, mais confortável.';
  },

  metas: [
    { id: 'mov', texto: 'Monitor, oxímetro e acesso em até 5 min', peso: 10, dica: 'MOV na chegada.', avaliar: e => ({ ok: ['monitor', 'oximetro', 'acesso'].every(id => ate(e, id, 5 * MIN)) }) },
    { id: 'sentar', texto: 'Sentar o paciente com as pernas pendentes', peso: 5, dica: 'Reduz o retorno venoso e melhora a mecânica respiratória.', avaliar: e => ({ ok: ate(e, 'sentar', 3 * MIN) }) },
    { id: 'vni', texto: 'VNI (CPAP/BiPAP) em até 10 min', peso: 25, dica: 'A VNI melhora rapidamente a oxigenação e reduz a necessidade de intubação.', avaliar: e => ({ ok: ate(e, 'vni', 10 * MIN), nota: feito(e, 'vni') ? `aos ${Math.round(e.feito.vni / 60)} min` : 'não feita' }) },
    { id: 'vaso', texto: 'Vasodilatador (nitrato) em até 10 min', peso: 20, dica: 'EAP hipertensivo: nitrato SL logo, depois nitroglicerina IV em dose alta.', avaliar: e => ({ ok: ate(e, 'nitratoSL', 10 * MIN) || ate(e, 'tridil', 10 * MIN) }) },
    { id: 'diur', texto: 'Diurético de alça IV', peso: 10, dica: 'Furosemida IV (1–2,5× a dose oral habitual; 40–80 mg se virgem).', avaliar: e => ({ ok: feito(e, 'furosemida') }) },
    { id: 'invest', texto: 'ECG e troponina para afastar isquemia', peso: 10, dica: 'Investigar o gatilho: SCA, arritmia, crise hipertensiva, má adesão, infecção.', avaliar: e => ({ ok: feito(e, 'ecg') && feito(e, 'lab') }) },
    { id: 'imagem', texto: 'Confirmar congestão (US pulmonar ou RX)', peso: 5, dica: 'Linhas B no ultrassom confirmam rapidamente a congestão.', avaliar: e => ({ ok: feito(e, 'imagem') }) },
    { id: 'gatilho', texto: 'Identificar o gatilho', peso: 5, dica: 'Pergunte sobre adesão, sal e sintomas de isquemia.', avaliar: e => ({ ok: e.fx.gatilho === true }) },
    { id: 'uti', texto: 'Internar em unidade de terapia', peso: 10, dica: 'Monitorização contínua e desmame da VNI.', avaliar: e => ({ ok: feito(e, 'uti') }) },
  ],

  ensino: [
    'EAP hipertensivo: o problema é a pós-carga. Vasodilatador em dose alta (nitrato SL e depois nitroglicerina IV) é o tratamento principal.',
    'VNI (CPAP ou BiPAP) precoce melhora a oxigenação e reduz a intubação. Contraindicações: rebaixamento, vômitos, instabilidade grave.',
    'Furosemida IV ajuda, mas muitos pacientes com EAP hipertensivo estão redistribuídos, não hipervolêmicos.',
    'Morfina não é recomendada de rotina; volume e betabloqueador IV pioram o quadro.',
    'Procure o gatilho: isquemia, arritmia, má adesão, excesso de sal, infecção.',
  ],
};
