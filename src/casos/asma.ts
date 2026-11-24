/**
 * Caso vivo: crise de asma grave (GINA / Diretriz SBPT).
 * Classificar a gravidade, O₂ com alvo de SpO₂ 93–95%, SABA inalatório repetido a cada 20 min
 * na 1ª hora + ipratrópio, corticoide sistêmico na 1ª hora, sulfato de magnésio IV na crise grave
 * que não responde, gasometria se grave (pCO₂ normal ou alta = fadiga). Sem sedativos.
 * Intubação se rebaixamento/tórax silencioso.
 */
import { aproxima, type Caso, type Estado } from './motor';

const MIN = 60;
const feito = (e: Estado, id: string) => e.feito[id] !== undefined;
const ate = (e: Estado, id: string, s: number) => feito(e, id) && e.feito[id] <= s;
const sev = (e: Estado) => (e.fx.sev as number) ?? 0.82;

export const ASMA: Caso = {
  id: 'asma-grave',
  sistema: 'respiratorio',
  titulo: 'Chiado e falta de ar: crise de asma grave',
  subtitulo: 'Broncoespasmo grave · SABA, corticoide e magnésio',
  local: 'Sala de emergência',
  paciente: { nome: 'Camila', idade: 24, sexo: 'F', peso: 60 },
  chegada: [
    'Mulher de 24 anos, asmática desde a infância, com falta de ar e chiado que pioraram nas últimas 6 horas após um resfriado. Usou a "bombinha" 8 vezes sem melhora.',
    'Já foi intubada por asma há três anos.',
  ],
  triagem: { fc: 128, pas: 132, pad: 82, spo2: 88, fr: 32, dor: 0 },
  inicial: { fc: 128, pas: 132, pad: 82, fr: 32, spo2: 88, temp: 37.2, dor: 0, ritmo: 'sinusal', pulso: true },
  limite: 80 * MIN,
  velocidade: 8,

  acoes: [
    {
      id: 'exame', rotulo: 'Avaliar a gravidade da crise', grupo: 'Avaliação', dur: 45,
      detalhe: 'Fala, consciência, musculatura acessória, sibilos',
      fazer: (e, c) => c.log(sev(e) > 0.9
        ? 'Sonolenta, não consegue falar, tórax quase silencioso à ausculta: crise com RISCO DE VIDA.'
        : sev(e) > 0.6
          ? 'Fala só palavras, sentada inclinada para frente, tiragem intercostal e de fúrcula, sibilos expiratórios e inspiratórios difusos. Crise GRAVE.'
          : 'Fala frases completas, sibilos expiratórios esparsos, sem tiragem.', 'resultado'),
    },
    {
      id: 'pfe', rotulo: 'Pico de fluxo expiratório (PFE)', grupo: 'Avaliação', dur: 30, repetivel: true,
      fazer: (e, c) => c.log(sev(e) > 0.9 ? 'Não consegue realizar o PFE.' : `PFE ${Math.round(100 - sev(e) * 80)}% do previsto${sev(e) > 0.62 ? ' (< 50%: grave)' : sev(e) > 0.37 ? ' (50–70%)' : ' (> 70%)'}.`, 'resultado'),
    },
    {
      id: 'anamnese', rotulo: 'História: gatilho, medicações, crises prévias', grupo: 'Avaliação', dur: 60,
      fazer: (_e, c) => c.log('"Uso o spray de salbutamol quando aperta, o corticoide inalatório eu parei faz meses." Intubação há 3 anos. Sem alergia a medicamentos.', 'fala'),
    },
    { id: 'monitor', rotulo: 'Monitor cardíaco', grupo: 'Monitorização', dur: 30, fazer: e => { e.monitorado = true; } },
    { id: 'oximetro', rotulo: 'Oxímetro de pulso', grupo: 'Monitorização', dur: 15, fazer: () => {} },
    { id: 'acesso', rotulo: 'Acesso venoso periférico', grupo: 'Monitorização', dur: 90, fazer: () => {} },
    { id: 'o2', rotulo: 'O₂ por cateter/máscara (alvo SpO₂ 93–95%)', grupo: 'Procedimentos', dur: 20, fazer: e => { e.fx.o2 = true; } },
    {
      id: 'saba', rotulo: 'Salbutamol 4–10 jatos com espaçador (ou nebulização)', grupo: 'Medicações', dur: 4 * MIN, repetivel: true,
      detalhe: 'A cada 20 min na 1ª hora',
      bloqueio: e => {
        const u = e.fx.sabaUlt as number | undefined;
        return u !== undefined && e.t - u < 15 * MIN ? `Próxima dose em ${Math.ceil((u + 15 * MIN - e.t) / 60)} min` : null;
      },
      fazer: e => {
        e.fx.sabaUlt = e.t;
        e.fx.sabaN = ((e.fx.sabaN as number) ?? 0) + 1;
        e.fx.sev = Math.max(0.15, sev(e) - 0.17);
      },
    },
    {
      id: 'ipratropio', rotulo: 'Brometo de ipratrópio junto ao SABA', grupo: 'Medicações', dur: 30,
      detalhe: 'Associado nas crises graves',
      fazer: e => { e.fx.sev = Math.max(0.15, sev(e) - 0.07); },
    },
    {
      id: 'corticoide', rotulo: 'Corticoide sistêmico (prednisona 40–50 mg VO ou metilprednisolona IV)', grupo: 'Medicações', dur: 30,
      fazer: e => { e.fx.corticoEm = e.t; },
    },
    {
      id: 'magnesio', rotulo: 'Sulfato de magnésio 2 g IV em 20 min', grupo: 'Medicações', dur: 60,
      detalhe: 'Crise grave sem resposta inicial',
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: e => { e.fx.sev = Math.max(0.15, sev(e) - 0.12); },
    },
    {
      id: 'aminofilina', rotulo: 'Aminofilina IV', grupo: 'Medicações', dur: 30,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (_e, c) => c.penalizar('Aminofilina não é recomendada: pouco benefício e muitos efeitos adversos (arritmia, vômitos).', 5),
    },
    {
      id: 'diazepam', rotulo: 'Diazepam para a ansiedade', grupo: 'Medicações', dur: 20,
      fazer: (e, c) => { c.penalizar('Sedativo na crise de asma deprime o drive respiratório: contraindicado.', 15); e.fx.sev = Math.min(1, sev(e) + 0.1); },
    },
    {
      id: 'antibiotico', rotulo: 'Antibiótico (amoxicilina)', grupo: 'Medicações', dur: 20,
      fazer: (_e, c) => c.penalizar('Antibiótico sem sinais de infecção bacteriana: o gatilho foi viral.', 3),
    },
    {
      id: 'gaso', rotulo: 'Gasometria arterial', grupo: 'Exames', dur: 3 * MIN, repetivel: true,
      fazer: (e, c) => {
        const s = sev(e);
        const pco2 = s > 0.9 ? 58 : s > 0.6 ? 41 : 32;
        c.resultado({ id: `gaso${e.t}`, titulo: 'Gasometria arterial', texto: `pH ${s > 0.9 ? '7,22' : s > 0.6 ? '7,38' : '7,46'}; pCO₂ ${pco2} mmHg; pO₂ ${Math.round(e.v.spo2 - 30)} mmHg. ${pco2 >= 40 ? 'pCO₂ "normal" ou alta numa crise grave = sinal de FADIGA.' : 'Hipocapnia esperada pela taquipneia.'}` });
      },
    },
    {
      id: 'rx', rotulo: 'Radiografia de tórax', grupo: 'Exames', dur: 10 * MIN,
      fazer: (_e, c) => c.resultado({ id: 'rx', titulo: 'Radiografia de tórax', texto: 'Hiperinsuflação, sem pneumotórax e sem consolidação. Não é necessária de rotina: indique se suspeita de pneumotórax, pneumonia ou falha terapêutica.' }),
    },
    {
      id: 'iot', rotulo: 'Intubação (cetamina) e ventilação com tempo expiratório longo', grupo: 'Procedimentos', dur: 5 * MIN,
      fazer: (e, c) => {
        if (!e.fx.rebaixada) c.penalizar('Intubação sem critério (consciente e respondendo ao tratamento).', 10);
        e.fx.iot = true;
        e.fx.sev = Math.min(sev(e), 0.6);
      },
    },
    {
      id: 'internar', rotulo: 'Internar (enfermaria/UTI) para seguir o tratamento', grupo: 'Decisão', dur: 30,
      fazer: (e, c) => c.encerrar('internado', e.fx.iot ? 'Intubada e internada na UTI.' : sev(e) < 0.45 ? 'Melhora parcial; internada para manter broncodilatador e corticoide e reavaliar.' : 'Internada ainda com crise grave: tratamento incompleto no PS.'),
    },
    {
      id: 'alta', rotulo: 'Alta com corticoide oral e retorno', grupo: 'Decisão', dur: 30,
      fazer: (e, c) => {
        c.penalizar('Alta inadequada: crise grave, intubação prévia e PFE ainda baixo. Critério de alta: PFE > 70% e estável após observação.', 15);
        c.encerrar('alta', 'Liberada para casa precocemente.');
      },
    },
    { id: 'aguardar', rotulo: 'Reavaliar em 5 minutos', grupo: 'Decisão', dur: 5 * MIN, repetivel: true, fazer: () => {} },
  ],

  tick: (e, dt, c) => {
    const v = e.v;
    if (!v.pulso) {
      if (e.t - (e.fx.pcrEm as number) > 4 * MIN) c.encerrar('obito', 'Parada respiratória por asma fatal.');
      e.quadro = 'Sem pulso.';
      return;
    }
    let s = sev(e);
    // piora sem broncodilatador; corticoide começa a agir após ~40 min
    const desdeSaba = e.fx.sabaUlt === undefined ? e.t : e.t - (e.fx.sabaUlt as number);
    if (!e.fx.iot && desdeSaba > 12 * MIN) s += (0.006 / 60) * dt;
    if (e.fx.corticoEm !== undefined && e.t - (e.fx.corticoEm as number) > 40 * MIN) s -= (0.004 / 60) * dt;
    s = Math.max(0.15, Math.min(1, s));
    e.fx.sev = s;
    if (s > 0.95 && !e.fx.rebaixada && !e.fx.iot) {
      e.fx.rebaixada = e.t;
      c.log('Sonolenta, bradipneica, tórax silencioso: falência respiratória iminente. Indicação de intubação!', 'alerta');
    }
    if (e.fx.rebaixada !== undefined && !e.fx.iot && e.t - (e.fx.rebaixada as number) > 6 * MIN) {
      e.fx.pcrEm = e.t;
      Object.assign(v, { pulso: false, ritmo: 'assistolia', pas: 0, pad: 0, spo2: 0, fr: 0, fc: 0 });
      c.log('Parada respiratória seguida de parada cardíaca.', 'alerta');
      return;
    }
    const sabaRecente = e.fx.sabaUlt !== undefined && e.t - (e.fx.sabaUlt as number) < 10 * MIN;
    v.spo2 = aproxima(v.spo2, Math.min(97, 100 - s * 14 + (e.fx.o2 ? 5 : 0) + (e.fx.iot ? 4 : 0)), dt, 60);
    v.fr = aproxima(v.fr, e.fx.iot ? 12 : e.fx.rebaixada ? 10 : 14 + s * 22, dt, 60);
    v.fc = aproxima(v.fc, 84 + s * 50 + (sabaRecente ? 8 : 0), dt, 60);
    v.pas = aproxima(v.pas, 118 + s * 16, dt, 120);
    v.pad = aproxima(v.pad, 74 + s * 8, dt, 120);
    e.quadro = e.fx.iot ? 'Intubada, sedada; ventilação com pressão de pico alta.' : s > 0.95 ? 'Sonolenta, tórax silencioso, cianose.' : s > 0.6 ? 'Fala só palavras, tiragem e sibilos difusos.' : s > 0.37 ? 'Fala frases curtas; sibilos expiratórios.' : 'Fala frases completas; poucos sibilos.';
  },

  metas: [
    { id: 'grav', texto: 'Classificar a gravidade (clínica + PFE) em até 5 min', peso: 10, dica: 'Fala, consciência, musculatura acessória, SpO₂, FC, PFE.', avaliar: e => ({ ok: ate(e, 'exame', 5 * MIN) && feito(e, 'pfe') }) },
    { id: 'o2', texto: 'Oxigênio com alvo de SpO₂ 93–95% em até 5 min', peso: 10, dica: 'SpO₂ < 90% na crise grave: oxigênio sem atraso.', avaliar: e => ({ ok: ate(e, 'o2', 5 * MIN) }) },
    { id: 'saba', texto: 'SABA inalatório em até 5 min', peso: 20, dica: 'Salbutamol com espaçador ou nebulização imediatamente.', avaliar: e => ({ ok: ate(e, 'saba', 5 * MIN) }) },
    { id: 'saba3', texto: 'Três doses de SABA na 1ª hora', peso: 10, dica: 'A cada 20 min na primeira hora.', avaliar: e => ({ ok: ((e.fx.sabaN as number) ?? 0) >= 3 }) },
    { id: 'ipra', texto: 'Ipratrópio associado', peso: 10, dica: 'Na crise grave, o ipratrópio reduz internação.', avaliar: e => ({ ok: feito(e, 'ipratropio') }) },
    { id: 'corti', texto: 'Corticoide sistêmico na 1ª hora', peso: 15, dica: 'Prednisona VO é tão eficaz quanto a IV se a paciente consegue engolir.', avaliar: e => ({ ok: ate(e, 'corticoide', 60 * MIN) }) },
    { id: 'mg', texto: 'Sulfato de magnésio IV na crise grave', peso: 10, dica: 'Crise grave sem resposta ao tratamento inicial: MgSO₄ 2 g IV em 20 min.', avaliar: e => ({ ok: feito(e, 'magnesio') }) },
    { id: 'gaso', texto: 'Gasometria para avaliar fadiga', peso: 5, dica: 'pCO₂ normal ou alta = fadiga respiratória.', avaliar: e => ({ ok: feito(e, 'gaso') }) },
    { id: 'destino', texto: 'Internar (crise grave com intubação prévia)', peso: 10, dica: 'Fatores de risco para asma fatal: intubação prévia, uso excessivo de SABA, sem corticoide inalatório.', avaliar: e => ({ ok: feito(e, 'internar') }) },
  ],

  ensino: [
    'Crise grave: fala palavras, uso de musculatura acessória, FC > 120, SpO₂ < 90%, PFE ≤ 50%. Risco de vida: sonolência, confusão, tórax silencioso.',
    'Tratamento: O₂ (alvo 93–95%), SABA a cada 20 min na 1ª hora + ipratrópio, corticoide sistêmico na 1ª hora e MgSO₄ 2 g IV se grave.',
    'pCO₂ "normal" numa crise grave é sinal de fadiga, não de melhora.',
    'Nunca sedar fora da intubação. Aminofilina e antibiótico de rotina não são recomendados.',
    'Na alta: corticoide inalatório sempre (e não só SABA), plano de ação e retorno.',
  ],
};
