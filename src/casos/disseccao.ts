/**
 * Caso vivo: emergência hipertensiva com dissecção aguda de aorta tipo A (Stanford).
 * Metas: controle da FC (< 60 bpm) com betabloqueador IV ANTES do vasodilatador, depois
 * PAS entre 100 e 120 mmHg em até 20 min (nitroprussiato), analgesia, angio-TC de aorta e
 * cirurgia cardíaca de emergência (tipo A). Antitrombóticos e fibrinolíticos são proibidos.
 * Referências: Diretriz brasileira de HAS (emergências), ESC/AHA aortic disease.
 */
import { aproxima, type Caso, type Estado } from './motor';

const MIN = 60;
const feito = (e: Estado, id: string) => e.feito[id] !== undefined;
const ate = (e: Estado, id: string, s: number) => feito(e, id) && e.feito[id] <= s;

export const DISSECCAO: Caso = {
  id: 'disseccao-aorta',
  sistema: 'cardiovascular',
  titulo: 'Dor "rasgando" nas costas: emergência hipertensiva',
  subtitulo: 'Dissecção aguda de aorta · controle de FC e PA em minutos',
  local: 'Sala de emergência',
  paciente: { nome: 'Sr. Paulo', idade: 56, sexo: 'M', peso: 92 },
  chegada: [
    'Homem de 56 anos com dor súbita e muito forte no peito, "como se estivesse rasgando", que foi para as costas entre as escápulas. Começou há 50 minutos, já no pico.',
    'Hipertenso sem tratamento regular.',
  ],
  triagem: { fc: 106, pas: 212, pad: 118, spo2: 96, fr: 22, dor: 10 },
  inicial: { fc: 106, pas: 212, pad: 118, fr: 22, spo2: 96, temp: 36.6, dor: 10, ritmo: 'sinusal', pulso: true },
  limite: 50 * MIN,

  acoes: [
    {
      id: 'exame', rotulo: 'Exame físico: pulsos e PA nos dois braços', grupo: 'Avaliação', dur: 60,
      fazer: (e, c) => {
        e.fx.pulsos = true;
        c.log('PA 212/118 no braço direito e 164/94 no esquerdo (diferença > 20 mmHg). Pulso radial esquerdo mais fraco. Sopro diastólico em foco aórtico (insuficiência aórtica). Sem déficit neurológico.', 'resultado');
      },
    },
    { id: 'anamnese', rotulo: 'Caracterizar a dor e antecedentes', grupo: 'Avaliação', dur: 60, fazer: (_e, c) => c.log('"Veio de uma vez, a pior dor da minha vida, rasgando para as costas." Nega uso de cocaína. Pai morreu "de aneurisma".', 'fala') },
    { id: 'monitor', rotulo: 'Monitor cardíaco', grupo: 'Monitorização', dur: 30, fazer: e => { e.monitorado = true; } },
    { id: 'oximetro', rotulo: 'Oxímetro de pulso', grupo: 'Monitorização', dur: 15, fazer: () => {} },
    { id: 'acesso', rotulo: 'Dois acessos venosos calibrosos', grupo: 'Monitorização', dur: 2 * MIN, fazer: () => {} },
    { id: 'pai', rotulo: 'Pressão arterial invasiva (PAI)', grupo: 'Monitorização', dur: 4 * MIN, detalhe: 'Ideal para titular drogas IV', fazer: () => {} },
    {
      id: 'ecg', rotulo: 'ECG de 12 derivações', grupo: 'Exames', dur: 90,
      fazer: (_e, c) => c.resultado({ id: 'ecg', titulo: 'ECG de 12 derivações', figura: 'taqui-sinusal', texto: 'Taquicardia sinusal, sobrecarga de VE, sem supradesnivelamento de ST. Dor torácica sem supra: ampliar o diferencial (dissecção, TEP).' }),
    },
    {
      id: 'rx', rotulo: 'Radiografia de tórax no leito', grupo: 'Exames', dur: 5 * MIN,
      fazer: (_e, c) => c.resultado({ id: 'rx', titulo: 'Radiografia de tórax', texto: 'Alargamento do mediastino superior e contorno aórtico duplo. Sugere dissecção, mas não exclui nem confirma.' }),
    },
    {
      id: 'angiotc', rotulo: 'Angiotomografia de aorta', grupo: 'Exames', dur: 10 * MIN,
      detalhe: 'Leve o paciente monitorizado',
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (e, c) => {
        e.fx.diagnostico = true;
        c.resultado({ id: 'angiotc', titulo: 'Angiotomografia de aorta', texto: 'Flap intimal desde a raiz da aorta até a aorta descendente: dissecção tipo A de Stanford (DeBakey I). Pequeno derrame pericárdico.' });
      },
    },
    {
      id: 'labs', rotulo: 'Troponina, D-dímero, hemograma, função renal, tipagem', grupo: 'Exames', dur: 30, detalhe: 'Resultado em ~30 min',
      fazer: (_e, c) => c.resultado({ id: 'labs', titulo: 'Laboratório', texto: 'Troponina normal; D-dímero muito elevado; creatinina 1,1; Hb 14. Tipagem e reserva de sangue feitas.' }, 30 * MIN),
    },
    {
      id: 'analgesia', rotulo: 'Analgesia: fentanil ou morfina IV', grupo: 'Medicações', dur: 30,
      detalhe: 'Dor ativa o simpático e piora a PA e a FC',
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: e => { e.fx.analgesia = true; },
    },
    {
      id: 'esmolol', rotulo: 'Betabloqueador IV: esmolol (ou metoprolol) até FC < 60', grupo: 'Medicações', dur: 60,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: e => { e.fx.beta = e.t; },
    },
    {
      id: 'nitroprussiato', rotulo: 'Nitroprussiato IV em bomba até PAS 100–120', grupo: 'Medicações', dur: 60,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (e, c) => {
        if (e.fx.beta === undefined) c.penalizar('Vasodilatador antes do betabloqueador: taquicardia reflexa aumenta a força de cisalhamento na aorta.', 10);
        e.fx.vaso = e.t;
      },
    },
    {
      id: 'hidralazina', rotulo: 'Hidralazina IV', grupo: 'Medicações', dur: 30,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (e, c) => { c.penalizar('Hidralazina causa taquicardia reflexa: contraindicada na dissecção de aorta.', 10); e.v.fc += 12; },
    },
    {
      id: 'aas', rotulo: 'AAS 300 mg mastigado', grupo: 'Medicações', dur: 30,
      fazer: (_e, c) => c.penalizar('Antiagregante na dissecção de aorta aumenta o sangramento. Na dor torácica sem supra, afaste dissecção antes.', 15),
    },
    {
      id: 'enoxaparina', rotulo: 'Enoxaparina 1 mg/kg SC', grupo: 'Medicações', dur: 30,
      fazer: (_e, c) => c.penalizar('Anticoagulação na dissecção de aorta pode ser fatal.', 20),
    },
    {
      id: 'fibrinolise', rotulo: 'Fibrinólise (tenecteplase)', grupo: 'Medicações', dur: 60,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (e, c) => {
        c.penalizar('Fibrinolítico na dissecção de aorta: contraindicação absoluta.', 40);
        e.fx.tamponamento = e.t;
      },
    },
    {
      id: 'cirurgia', rotulo: 'Acionar cirurgia cardiovascular de emergência', grupo: 'Decisão', dur: 60,
      bloqueio: e => (e.fx.diagnostico ? null : 'Confirme o diagnóstico por imagem'),
      fazer: (e, c) => c.encerrar('transferido', e.fx.controle
        ? 'Levado ao centro cirúrgico com FC e PA controladas para correção da dissecção tipo A.'
        : 'Levado à cirurgia sem controle hemodinâmico adequado: alto risco de ruptura no trajeto.'),
    },
    { id: 'aguardar', rotulo: 'Observar 1 minuto', grupo: 'Decisão', dur: 60, repetivel: true, fazer: () => {} },
  ],

  tick: (e, dt, c) => {
    const v = e.v;
    if (!v.pulso) {
      if (e.t - (e.fx.pcrEm as number) > 3 * MIN) c.encerrar('obito', 'Óbito por tamponamento cardíaco / ruptura da aorta.');
      e.quadro = 'Sem pulso, AESP.';
      return;
    }
    // ruptura/tamponamento: após fibrinolítico ou sem controle por muito tempo
    const semControle = !e.fx.controle && e.t > 30 * MIN;
    if ((e.fx.tamponamento !== undefined && e.t - (e.fx.tamponamento as number) > 4 * MIN) || semControle) {
      e.fx.pcrEm = e.t;
      Object.assign(v, { pulso: false, pas: 0, pad: 0, spo2: 0, fr: 0 });
      c.log('Hipotensão súbita, turgência jugular e abafamento de bulhas: tamponamento por ruptura da dissecção. Parada em AESP.', 'alerta');
      return;
    }
    const beta = e.fx.beta !== undefined;
    const vaso = e.fx.vaso !== undefined;
    const dor = e.fx.analgesia ? 4 : 9;
    v.dor = aproxima(v.dor, dor, dt, 90);
    v.fc = aproxima(v.fc, beta ? 56 : vaso ? 124 : 96 + v.dor * 1.2, dt, 60);
    v.pas = aproxima(v.pas, vaso ? 112 : beta ? 178 : 196 + v.dor * 1.6, dt, 90);
    v.pad = aproxima(v.pad, v.pas * 0.56, dt, 90);
    if (!e.fx.controle && v.fc < 62 && v.pas <= 122) {
      e.fx.controle = e.t;
      c.log('Metas atingidas: FC < 60 e PAS 100–120 mmHg.', 'evento');
    }
    e.quadro = v.dor > 7 ? 'Agitado, contorcendo-se de dor, sudoreico.' : 'Dor mais controlada; ansioso.';
  },

  metas: [
    { id: 'mov', texto: 'Monitor, oxímetro e acessos em até 5 min', peso: 10, dica: 'MOV com dois acessos calibrosos.', avaliar: e => ({ ok: ['monitor', 'oximetro', 'acesso'].every(id => ate(e, id, 5 * MIN)) }) },
    { id: 'pulsos', texto: 'PA nos dois braços e pulsos', peso: 10, dica: 'Diferença de PA > 20 mmHg ou déficit de pulso sugere dissecção.', avaliar: e => ({ ok: e.fx.pulsos === true }) },
    { id: 'ecg', texto: 'ECG em até 10 min', peso: 10, dica: 'Afaste IAM com supra (a dissecção pode ocluir a coronária direita).', avaliar: e => ({ ok: ate(e, 'ecg', 10 * MIN) }) },
    { id: 'dor', texto: 'Analgesia', peso: 5, dica: 'A dor mantém a descarga adrenérgica.', avaliar: e => ({ ok: e.fx.analgesia === true }) },
    { id: 'beta', texto: 'Betabloqueador IV antes do vasodilatador', peso: 15, dica: 'Primeiro FC < 60 (esmolol, metoprolol ou labetalol), depois o vasodilatador.', avaliar: e => ({ ok: e.fx.beta !== undefined && (e.fx.vaso === undefined || (e.fx.beta as number) <= (e.fx.vaso as number)) }) },
    {
      id: 'controle', texto: 'FC < 60 e PAS 100–120 em até 20 min', peso: 20, dica: 'Na dissecção, a meta é atingida em minutos, não em horas.',
      avaliar: e => ({ ok: e.fx.controle !== undefined && (e.fx.controle as number) <= 20 * MIN, nota: e.fx.controle !== undefined ? `aos ${Math.round((e.fx.controle as number) / 60)} min` : 'não atingido' }),
    },
    { id: 'imagem', texto: 'Confirmar com angio-TC de aorta', peso: 15, dica: 'Angio-TC (ou ecocardiograma transesofágico se instável).', avaliar: e => ({ ok: feito(e, 'angiotc') }) },
    { id: 'cirurgia', texto: 'Cirurgia cardíaca de emergência (tipo A)', peso: 15, dica: 'Tipo A: cirurgia. Tipo B não complicado: tratamento clínico.', avaliar: e => ({ ok: feito(e, 'cirurgia') && e.fx.controle !== undefined }) },
  ],

  ensino: [
    'Emergência hipertensiva = PA muito alta COM lesão aguda de órgão-alvo. A meta depende do órgão: na dissecção, PAS 100–120 e FC < 60 em até 20 minutos.',
    'Sequência: analgesia, betabloqueador IV primeiro, depois vasodilatador (nitroprussiato ou nitroglicerina).',
    'Sinais de alerta: dor súbita "rasgando" para o dorso, diferença de PA entre os braços, déficit de pulso, sopro de insuficiência aórtica, mediastino alargado.',
    'Na dor torácica sem supra, pense em dissecção antes de antiagregar ou anticoagular. Fibrinólise é contraindicação absoluta.',
    'Tipo A (aorta ascendente): cirurgia de emergência. Tipo B não complicada: tratamento clínico.',
  ],
};
