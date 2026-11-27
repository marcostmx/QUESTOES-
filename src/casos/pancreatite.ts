/**
 * Caso vivo: pancreatite aguda biliar (Atlanta revisada, ACG 2024, ensaio WATERFALL).
 * Diagnóstico com 2 de 3 critérios (dor típica, lipase > 3× o normal, imagem). Hidratação MODERADA
 * guiada por metas com Ringer lactato (agressiva aumenta sobrecarga sem benefício), analgesia
 * (opioide permitido), dieta oral precoce assim que tolerar, ultrassom para etiologia biliar,
 * SEM antibiótico profilático e SEM TC precoce de rotina; colecistectomia na mesma internação.
 */
import { aproxima, type Caso, type Estado } from './motor';

const MIN = 60;
const H = 60 * MIN;
const feito = (e: Estado, id: string) => e.feito[id] !== undefined;
const ate = (e: Estado, id: string, s: number) => feito(e, id) && e.feito[id] <= s;
const hid = (e: Estado) => (e.fx.hid as string | undefined) ?? 'nada';

export const PANCREATITE: Caso = {
  id: 'pancreatite-biliar',
  sistema: 'abdome',
  titulo: 'Dor em faixa e vômitos: pancreatite aguda',
  subtitulo: 'Hidratação moderada, dieta precoce e nada de antibiótico profilático',
  local: 'Pronto-socorro',
  paciente: { nome: 'Dona Rosângela', idade: 46, sexo: 'F', peso: 72 },
  chegada: [
    'Mulher de 46 anos com dor forte "na boca do estômago", em faixa, que vai para as costas, começou 6 horas depois de uma feijoada. Vomitou várias vezes.',
    'Já teve "cólica de vesícula". Não bebe álcool.',
  ],
  triagem: { fc: 112, pas: 132, pad: 80, spo2: 96, fr: 22, dor: 9 },
  inicial: { fc: 112, pas: 132, pad: 80, fr: 22, spo2: 96, temp: 37.6, dor: 9, ritmo: 'sinusal', pulso: true },
  limite: 30 * H,
  velocidade: 60,

  acoes: [
    {
      id: 'exame', rotulo: 'Exame físico', grupo: 'Avaliação', dur: 5 * MIN,
      fazer: (_e, c) => c.log('Desidratada, anictérica. Dor à palpação do epigástrio e mesogástrio com defesa voluntária, sem peritonite difusa. Ruídos diminuídos. Sem Cullen ou Grey-Turner.', 'resultado'),
    },
    {
      id: 'gravidade', rotulo: 'Estratificar: SIRS, BISAP, Marshall', grupo: 'Avaliação', dur: 5 * MIN,
      fazer: (e, c) => c.log(feito(e, 'lab') ? 'SIRS presente (FC > 90, leucócitos > 12 mil). BISAP 1 (SIRS). Sem falência orgânica (Marshall 0): pancreatite leve a moderada por enquanto. Reavaliar em 48 h.' : 'Faltam os exames para o BISAP completo; SIRS clínica presente.', 'resultado'),
    },
    { id: 'monitor', rotulo: 'Sinais vitais e diurese horária', grupo: 'Monitorização', dur: 5 * MIN, fazer: e => { e.monitorado = true; } },
    { id: 'acesso', rotulo: 'Acesso venoso periférico', grupo: 'Monitorização', dur: 3 * MIN, fazer: () => {} },
    {
      id: 'lab', rotulo: 'Lipase, hemograma, ureia, creatinina, enzimas hepáticas, PCR', grupo: 'Exames', dur: 5 * MIN, detalhe: 'Resultado em ~40 min',
      fazer: (_e, c) => c.resultado({ id: 'lab', titulo: 'Laboratório', texto: 'Lipase 2.480 U/L (> 3× o normal); leucócitos 14.200; hematócrito 46%; ureia 44; creatinina 0,9; TGO/TGP 4× o normal; FA levemente elevada; bilirrubina 1,6. ALT > 3× sugere causa biliar.' }, 40 * MIN),
    },
    { id: 'etiologia', rotulo: 'Triglicerídeos e cálcio (outras causas)', grupo: 'Exames', dur: 5 * MIN, fazer: (_e, c) => c.resultado({ id: 'tg', titulo: 'Triglicerídeos e cálcio', texto: 'Triglicerídeos 160 mg/dL; cálcio 8,9 mg/dL. Afastadas hipertrigliceridemia e hipercalcemia.' }, 60 * MIN) },
    {
      id: 'usg', rotulo: 'Ultrassom de abdome', grupo: 'Exames', dur: 30 * MIN,
      fazer: (_e, c) => c.resultado({ id: 'usg', titulo: 'Ultrassom', texto: 'Vesícula com múltiplos cálculos pequenos, sem colecistite; colédoco de 6 mm, sem cálculo visível. Pâncreas parcialmente visto, aumentado. Etiologia biliar.' }),
    },
    {
      id: 'tc', rotulo: 'Tomografia de abdome com contraste', grupo: 'Exames', dur: 60 * MIN,
      fazer: (e, c) => {
        if (e.t < 72 * H) c.penalizar('TC nas primeiras 72 h sem dúvida diagnóstica não muda a conduta e subestima a necrose.', 8);
        c.resultado({ id: 'tc', titulo: 'Tomografia', texto: 'Pâncreas aumentado com densificação peripancreática; sem necrose definida (precoce demais para avaliar).' });
      },
    },
    {
      id: 'moderada', rotulo: 'Ringer lactato: 10 mL/kg em bolus, depois 1,5 mL/kg/h guiado por metas', grupo: 'Medicações', dur: 10 * MIN,
      bloqueio: e => (!feito(e, 'acesso') ? 'Precisa de acesso venoso' : hid(e) !== 'nada' ? 'Hidratação já iniciada' : null),
      fazer: e => { e.fx.hid = 'moderada'; e.fx.hidEm = e.t; },
    },
    {
      id: 'agressiva', rotulo: 'Ringer lactato: 20 mL/kg em bolus, depois 3 mL/kg/h', grupo: 'Medicações', dur: 10 * MIN,
      bloqueio: e => (!feito(e, 'acesso') ? 'Precisa de acesso venoso' : hid(e) !== 'nada' ? 'Hidratação já iniciada' : null),
      fazer: (e, c) => {
        c.penalizar('Hidratação agressiva não reduz complicações e aumenta a sobrecarga hídrica (ensaio WATERFALL): prefira a moderada guiada por metas.', 10);
        e.fx.hid = 'agressiva';
        e.fx.hidEm = e.t;
      },
    },
    { id: 'analgesia', rotulo: 'Analgesia: dipirona + opioide (morfina ou tramadol)', grupo: 'Medicações', dur: 5 * MIN, bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'), fazer: () => {} },
    { id: 'antiemetico', rotulo: 'Antiemético (ondansetrona)', grupo: 'Medicações', dur: 5 * MIN, bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'), fazer: () => {} },
    {
      id: 'imipenem', rotulo: 'Imipenem profilático', grupo: 'Medicações', dur: 5 * MIN,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (_e, c) => c.penalizar('Antibiótico profilático não é indicado na pancreatite aguda (nem na necrosante estéril); só se houver infecção documentada ou suspeita.', 12),
    },
    {
      id: 'jejumlongo', rotulo: 'Jejum prolongado com sonda nasogástrica aberta', grupo: 'Medicações', dur: 5 * MIN,
      fazer: (_e, c) => c.penalizar('Jejum prolongado e SNG de rotina não ajudam; a alimentação oral precoce (assim que tolerar) reduz complicações.', 8),
    },
    {
      id: 'dieta', rotulo: 'Iniciar dieta oral leve, hipogordurosa', grupo: 'Medicações', dur: 10 * MIN,
      bloqueio: e => (e.v.dor > 4 ? 'Ainda com dor intensa e náuseas: reavalie depois' : null),
      fazer: () => {},
    },
    {
      id: 'colecistectomia', rotulo: 'Programar colecistectomia na mesma internação', grupo: 'Decisão', dur: 10 * MIN,
      fazer: (e, c) => { if (!feito(e, 'usg')) c.penalizar('Programar colecistectomia sem confirmar a causa biliar.', 5); },
    },
    {
      id: 'cpre', rotulo: 'CPRE de urgência', grupo: 'Procedimentos', dur: 60 * MIN,
      fazer: (_e, c) => c.penalizar('CPRE só se houver colangite associada ou obstrução biliar persistente; não é rotina na pancreatite biliar.', 10),
    },
    {
      id: 'internar', rotulo: 'Internar na enfermaria', grupo: 'Decisão', dur: 10 * MIN,
      fazer: (e, c) => c.encerrar('internado', feito(e, 'dieta') ? 'Melhorando, aceitando dieta; colecistectomia antes da alta.' : 'Internada para seguir o tratamento.'),
    },
    { id: 'aguardar', rotulo: 'Reavaliar em 2 horas', grupo: 'Decisão', dur: 2 * H, repetivel: true, fazer: () => {} },
  ],

  tick: (e, dt, c) => {
    const v = e.v;
    const h = hid(e);
    const hidratada = h !== 'nada' && e.t - (e.fx.hidEm as number) > 2 * H;
    if (h === 'nada' && e.t > 8 * H && !e.fx.piorou) {
      e.fx.piorou = true;
      c.log('Oligúria, ureia subindo, taquicardia persistente: hipovolemia por falta de reposição (risco de evoluir com falência renal).', 'alerta');
    }
    if (h === 'agressiva' && e.t - (e.fx.hidEm as number) > 10 * H && !e.fx.sobrecarga) {
      e.fx.sobrecarga = true;
      c.log('Dispneia e estertores em bases, edema de membros: sobrecarga hídrica.', 'alerta');
    }
    const analg = feito(e, 'analgesia');
    const melhora = Math.min(1, e.t / (20 * H));
    v.dor = aproxima(v.dor, (analg ? 4 : 8) - (hidratada ? 2.5 * melhora : 0), dt, 1800);
    v.fc = aproxima(v.fc, e.fx.piorou ? 124 : hidratada ? 88 : 108, dt, 1800);
    v.spo2 = aproxima(v.spo2, e.fx.sobrecarga ? 90 : 97, dt, 1800);
    v.fr = aproxima(v.fr, e.fx.sobrecarga ? 26 : hidratada ? 17 : 21, dt, 1800);
    v.pas = aproxima(v.pas, e.fx.piorou ? 104 : 126, dt, 1800);
    v.pad = aproxima(v.pad, v.pas * 0.62, dt, 1800);
    v.temp = aproxima(v.temp, 37.4, dt, 3600);
    e.quadro = v.dor > 6 ? 'Encolhida, com náuseas, dor em faixa.' : v.dor > 4 ? 'Dor moderada; ainda nauseada.' : 'Dor controlada, pedindo para comer.';
  },

  metas: [
    { id: 'dx', texto: 'Confirmar o diagnóstico (clínica + lipase)', peso: 10, dica: '2 de 3: dor típica, lipase/amilase > 3× o normal, imagem.', avaliar: e => ({ ok: feito(e, 'exame') && feito(e, 'lab') }) },
    { id: 'grav', texto: 'Estratificar a gravidade', peso: 5, dica: 'SIRS, BISAP, Marshall; reavaliar em 48 h.', avaliar: e => ({ ok: feito(e, 'gravidade') }) },
    { id: 'hid', texto: 'Hidratação moderada com Ringer em até 1 h', peso: 20, dica: '10 mL/kg se hipovolêmica, depois 1,5 mL/kg/h guiado por diurese, FC, ureia.', avaliar: e => ({ ok: ate(e, 'moderada', 1 * H) }) },
    { id: 'dor', texto: 'Analgesia em até 30 min', peso: 10, dica: 'Opioides são seguros e eficazes.', avaliar: e => ({ ok: ate(e, 'analgesia', 30 * MIN) }) },
    { id: 'usg', texto: 'Ultrassom para etiologia biliar', peso: 15, dica: 'Toda pancreatite: ultrassom na admissão.', avaliar: e => ({ ok: feito(e, 'usg') }) },
    { id: 'evitar', texto: 'Sem antibiótico profilático e sem TC precoce', peso: 10, dica: 'Os dois são erros clássicos.', avaliar: e => ({ ok: !feito(e, 'imipenem') && !feito(e, 'tc') }) },
    { id: 'dieta', texto: 'Dieta oral precoce assim que tolerar', peso: 15, dica: 'Não espere a lipase normalizar: alimente quando a dor e as náuseas melhorarem.', avaliar: e => ({ ok: feito(e, 'dieta') }) },
    { id: 'colecist', texto: 'Colecistectomia na mesma internação', peso: 10, dica: 'Pancreatite biliar leve: colecistectomia antes da alta reduz recorrência.', avaliar: e => ({ ok: feito(e, 'colecistectomia') }) },
    { id: 'internar', texto: 'Internar', peso: 5, dica: 'Enfermaria; UTI se falência orgânica.', avaliar: e => ({ ok: feito(e, 'internar') }) },
  ],

  ensino: [
    'Diagnóstico: 2 de 3 critérios (dor típica, lipase > 3× o normal, imagem). A TC não é necessária para diagnosticar se os outros dois estão presentes.',
    'Hidratação moderada guiada por metas com Ringer lactato; a agressiva causa sobrecarga sem benefício.',
    'Dieta oral precoce assim que tolerar; não espere a lipase normalizar.',
    'Sem antibiótico profilático; TC só se houver dúvida ou após 72 h para complicações.',
    'Biliar leve: colecistectomia na mesma internação. CPRE só com colangite ou obstrução persistente.',
  ],
};
