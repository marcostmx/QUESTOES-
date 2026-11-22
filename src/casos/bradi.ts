/**
 * Caso vivo: bradicardia instável por BAV total (algoritmo de bradicardia do ACLS/AHA).
 * Instabilidade (hipotensão, confusão, sinais de choque) + FC < 50: atropina 1 mg (repetir a cada
 * 3–5 min, máx. 3 mg); se ineficaz, marca-passo transcutâneo (com analgesia/sedação) ou infusão
 * de dopamina (5–20 mcg/kg/min) ou adrenalina (2–10 mcg/min); procurar causas reversíveis;
 * encaminhar para marca-passo transvenoso/definitivo.
 */
import { aproxima, type Caso, type Estado } from './motor';

const MIN = 60;
const feito = (e: Estado, id: string) => e.feito[id] !== undefined;
const ate = (e: Estado, id: string, s: number) => feito(e, id) && e.feito[id] <= s;
const suporte = (e: Estado) => e.fx.mp === true || e.fx.droga === true;

export const BRADI: Caso = {
  id: 'bradicardia-instavel',
  sistema: 'cardiovascular',
  titulo: 'Tontura e síncope: bradicardia instável',
  subtitulo: 'BAV total com hipotensão · algoritmo de bradicardia',
  local: 'Sala de emergência',
  paciente: { nome: 'Dona Lúcia', idade: 74, sexo: 'F', peso: 64 },
  chegada: [
    'Mulher de 74 anos trazida pelo SAMU após desmaiar em casa. Está tonta, confusa e pálida.',
    'A filha conta que ela "anda cansada há dois dias". Hipertensa, faz uso de vários remédios.',
  ],
  triagem: { fc: 34, pas: 76, pad: 42, spo2: 91, fr: 22, dor: 0 },
  inicial: { fc: 34, pas: 76, pad: 42, fr: 22, spo2: 91, temp: 36.1, dor: 0, ritmo: 'bradi', pulso: true },
  limite: 45 * MIN,

  acoes: [
    {
      id: 'exame', rotulo: 'Avaliar sinais de instabilidade', grupo: 'Avaliação', dur: 45,
      detalhe: 'Hipotensão, consciência, perfusão, dor torácica, congestão',
      fazer: (e, c) => {
        c.log('Sonolenta e desorientada, extremidades frias, enchimento capilar de 4 s. PA 76/42. Sem dor torácica; estertores discretos nas bases. Bradicardia sintomática com sinais de instabilidade.', 'resultado');
        e.fx.instavel = true;
      },
    },
    {
      id: 'anamnese', rotulo: 'Revisar medicações e história com a filha', grupo: 'Avaliação', dur: 90,
      fazer: (e, c) => {
        c.log('"Ela toma atenolol 50 mg, losartana e hidroclorotiazida. Semana passada o médico aumentou o atenolol." Sem dor no peito. Diabética? Não.', 'fala');
        e.fx.causa = true;
      },
    },
    { id: 'monitor', rotulo: 'Monitor cardíaco e pás de marca-passo', grupo: 'Monitorização', dur: 40, fazer: e => { e.monitorado = true; } },
    { id: 'oximetro', rotulo: 'Oxímetro de pulso', grupo: 'Monitorização', dur: 15, fazer: () => {} },
    { id: 'acesso', rotulo: 'Acesso venoso periférico', grupo: 'Monitorização', dur: 90, fazer: () => {} },
    {
      id: 'o2', rotulo: 'Oxigênio (alvo SpO₂ ≥ 94%)', grupo: 'Monitorização', dur: 20,
      fazer: (e, c) => { if (e.v.spo2 >= 94) c.penalizar('Oxigênio sem hipoxemia.', 3); else e.fx.o2 = true; },
    },
    {
      id: 'ecg', rotulo: 'ECG de 12 derivações', grupo: 'Exames', dur: 120,
      fazer: (_e, c) => c.resultado({ id: 'ecg', titulo: 'ECG de 12 derivações', figura: 'bavt', texto: 'Ondas P regulares (~90/min) dissociadas dos QRS; escape ventricular largo a ~34 bpm. Conclusão: BAV total (3º grau).' }),
    },
    {
      id: 'lab', rotulo: 'Potássio, função renal, troponina e glicemia', grupo: 'Exames', dur: 30, detalhe: 'Resultado em ~30 min',
      fazer: (e, c) => {
        e.fx.lab = true;
        c.resultado({ id: 'lab', titulo: 'Laboratório', texto: 'K 4,9 mEq/L; creatinina 1,3 mg/dL; troponina negativa; glicemia 112 mg/dL. Causa provável: betabloqueador em dose alta.' }, 30 * MIN);
      },
    },
    {
      id: 'atropina', rotulo: 'Atropina 1 mg IV', grupo: 'Medicações', dur: 30, repetivel: true,
      detalhe: 'Repetir a cada 3–5 min, máximo 3 mg',
      bloqueio: e => (!feito(e, 'acesso') ? 'Precisa de acesso venoso' : (e.vezes.atropina ?? 0) >= 3 ? 'Dose máxima (3 mg) atingida' : null),
      fazer: (e, c) => {
        c.log('Sem resposta à atropina: no BAV total com escape largo (infranodal) ela costuma falhar. Não atrase o marca-passo.', 'evento');
        e.fx.atropinaEm = e.t;
      },
    },
    {
      id: 'analgesia', rotulo: 'Analgesia e sedação leve (fentanil)', grupo: 'Medicações', dur: 45,
      detalhe: 'O marca-passo transcutâneo é doloroso',
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: () => {},
    },
    {
      id: 'dopamina', rotulo: 'Dopamina 5–20 mcg/kg/min em bomba', grupo: 'Medicações', dur: 60,
      detalhe: 'Alternativa ao marca-passo (ou adrenalina 2–10 mcg/min)',
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: e => { e.fx.droga = true; },
    },
    {
      id: 'mp', rotulo: 'Marca-passo transcutâneo: FC 70, aumentar mA até captura', grupo: 'Procedimentos', dur: 90,
      bloqueio: e => (e.monitorado ? null : 'Conecte o monitor e as pás'),
      fazer: (e, c) => {
        if (!feito(e, 'analgesia')) c.penalizar('Marca-passo transcutâneo sem analgesia/sedação: dor intensa.', 5);
        e.fx.mp = true;
        e.v.ritmo = 'mp';
        c.log('Captura elétrica a 70 mA. Confirme a captura mecânica: pulso femoral a 70 bpm.', 'evento');
      },
    },
    {
      id: 'adenosina', rotulo: 'Adenosina 6 mg IV rápida', grupo: 'Medicações', dur: 20,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (e, c) => { c.penalizar('Adenosina é para taquicardia supraventricular; na bradicardia piora o bloqueio.', 15); e.v.fc -= 6; },
    },
    {
      id: 'amiodarona', rotulo: 'Amiodarona 150 mg IV', grupo: 'Medicações', dur: 30,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (e, c) => { c.penalizar('Amiodarona deprime a condução AV e piora o BAV.', 15); e.v.fc -= 4; },
    },
    {
      id: 'transvenoso', rotulo: 'Acionar cardiologia: marca-passo transvenoso e UTI', grupo: 'Decisão', dur: 30,
      fazer: (e, c) => c.encerrar('internado', suporte(e)
        ? 'Paciente estabilizada com cronotropismo, encaminhada à UTI para marca-passo transvenoso. Atenolol suspenso.'
        : 'Encaminhada sem suporte de frequência: chegou à UTI em choque.'),
    },
    { id: 'aguardar', rotulo: 'Observar 1 minuto', grupo: 'Decisão', dur: 60, repetivel: true, fazer: () => {} },
  ],

  tick: (e, dt, c) => {
    const v = e.v;
    if (v.ritmo === 'assistolia') {
      if (e.t - (e.fx.pcrEm as number) > 4 * MIN) c.encerrar('obito', 'Parada em assistolia por bradicardia não tratada.');
      e.quadro = 'Sem pulso, sem resposta.';
      return;
    }
    if (!suporte(e) && e.t >= 14 * MIN) {
      e.fx.pcrEm = e.t;
      Object.assign(v, { ritmo: 'assistolia', pulso: false, pas: 0, pad: 0, fc: 0, spo2: 0, fr: 0 });
      c.log('A paciente perde o pulso: evolução para assistolia.', 'alerta');
      return;
    }
    const fcAlvo = e.fx.mp ? 70 : e.fx.droga ? 52 : 34 - Math.min(6, e.t / (2 * MIN));
    const pasAlvo = e.fx.mp ? 112 : e.fx.droga ? 96 : 76 - Math.min(16, e.t / MIN);
    v.fc = aproxima(v.fc, fcAlvo, dt, 20);
    v.pas = aproxima(v.pas, pasAlvo, dt, 60);
    v.pad = aproxima(v.pad, pasAlvo * 0.58, dt, 60);
    v.spo2 = aproxima(v.spo2, e.fx.o2 ? 96 : suporte(e) ? 94 : 90, dt, 60);
    v.fr = aproxima(v.fr, suporte(e) ? 18 : 24, dt, 90);
    e.quadro = v.pas < 80 ? 'Sonolenta, confusa, extremidades frias.' : v.pas < 100 ? 'Mais desperta, ainda pálida.' : 'Acordada e orientada; refere melhora da tontura.';
  },

  metas: [
    { id: 'mov', texto: 'Monitor, oxímetro e acesso em até 5 min', peso: 10, dica: 'MOV na chegada.', avaliar: e => ({ ok: ['monitor', 'oximetro', 'acesso'].every(id => ate(e, id, 5 * MIN)) }) },
    { id: 'instab', texto: 'Reconhecer sinais de instabilidade em até 5 min', peso: 10, dica: 'Hipotensão, alteração de consciência, choque, dor torácica isquêmica ou IC aguda.', avaliar: e => ({ ok: ate(e, 'exame', 5 * MIN) }) },
    { id: 'ecg', texto: 'ECG de 12 derivações em até 10 min', peso: 10, dica: 'Defina o tipo de bloqueio.', avaliar: e => ({ ok: ate(e, 'ecg', 10 * MIN) }) },
    { id: 'atropina', texto: 'Atropina 1 mg como primeira droga', peso: 10, dica: 'Dose atual: 1 mg IV a cada 3–5 min (máx. 3 mg).', avaliar: e => ({ ok: feito(e, 'atropina') && (!feito(e, 'dopamina') || e.feito.atropina <= e.feito.dopamina) }) },
    {
      id: 'suporte', texto: 'Marca-passo transcutâneo ou cronotrópico em até 10 min', peso: 25, dica: 'Se a atropina falha: marca-passo transcutâneo ou dopamina/adrenalina em infusão.',
      avaliar: e => {
        const t = Math.min(e.feito.mp ?? Infinity, e.feito.dopamina ?? Infinity);
        return { ok: t <= 10 * MIN, nota: Number.isFinite(t) ? `aos ${Math.round(t / 60)} min` : 'não feito' };
      },
    },
    { id: 'analgesia', texto: 'Analgesia antes do marca-passo transcutâneo', peso: 10, dica: 'Fentanil e/ou sedação leve: a estimulação é muito dolorosa.', avaliar: e => (feito(e, 'mp') ? { ok: feito(e, 'analgesia') && e.feito.analgesia <= e.feito.mp } : null) },
    { id: 'causa', texto: 'Investigar causa reversível (medicações e eletrólitos)', peso: 15, dica: 'Betabloqueador, bloqueador de canal de cálcio, digoxina, hipercalemia, isquemia inferior.', avaliar: e => ({ ok: feito(e, 'anamnese') && feito(e, 'lab') }) },
    { id: 'destino', texto: 'Encaminhar para marca-passo transvenoso / UTI', peso: 10, dica: 'O transcutâneo é ponte: providencie o transvenoso.', avaliar: e => ({ ok: feito(e, 'transvenoso') && suporte(e) }) },
  ],

  ensino: [
    'Bradicardia + instabilidade: atropina 1 mg IV a cada 3–5 min (máx. 3 mg). Não atrase o marca-passo se não houver resposta.',
    'No BAV total com QRS largo e no Mobitz II, a atropina costuma falhar: vá direto para o marca-passo transcutâneo ou para a infusão de dopamina ou adrenalina.',
    'Marca-passo transcutâneo: analgesia e sedação, FC de 60–80, aumente o mA até a captura e confirme pelo pulso (captura mecânica).',
    'Procure causas reversíveis: betabloqueador, bloqueador de canal de cálcio, digoxina, hipercalemia, IAM inferior e hipotireoidismo.',
    'Adenosina e amiodarona pioram a condução AV: não usar.',
  ],
};
