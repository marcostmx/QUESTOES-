/**
 * Caso vivo: exacerbação de DPOC com acidose respiratória (GOLD / SBPT).
 * O₂ CONTROLADO (Venturi) com alvo de SpO₂ 88–92% — O₂ em excesso piora a hipercapnia;
 * SABA + SAMA, corticoide sistêmico (prednisona 40 mg por 5 dias), antibiótico se escarro
 * purulento; VNI (BiPAP) quando pH < 7,35 com pCO₂ > 45 mmHg; intubação se falhar.
 */
import { aproxima, type Caso, type Estado } from './motor';

const MIN = 60;
const feito = (e: Estado, id: string) => e.feito[id] !== undefined;
const ate = (e: Estado, id: string, s: number) => feito(e, id) && e.feito[id] <= s;
const pco2 = (e: Estado) => (e.fx.pco2 as number) ?? 64;
const ph = (p: number) => 6.1 + Math.log10(31 / (0.03 * p));

export const DPOC: Caso = {
  id: 'dpoc-exacerbado',
  sistema: 'respiratorio',
  titulo: 'Falta de ar e escarro amarelo: DPOC exacerbada',
  subtitulo: 'Acidose respiratória · O₂ controlado e VNI',
  local: 'Sala de emergência',
  paciente: { nome: 'Sr. Osvaldo', idade: 68, sexo: 'M', peso: 64 },
  chegada: [
    'Homem de 68 anos, ex-tabagista (60 maços-ano), com DPOC e oxigênio domiciliar noturno. Há três dias tem mais falta de ar, mais tosse e escarro amarelo-esverdeado em maior quantidade.',
    'A filha conta que hoje ele está "mais sonolento".',
  ],
  triagem: { fc: 112, pas: 148, pad: 86, spo2: 82, fr: 30, dor: 0 },
  inicial: { fc: 112, pas: 148, pad: 86, fr: 30, spo2: 82, temp: 37.6, dor: 0, ritmo: 'sinusal', pulso: true },
  limite: 90 * MIN,
  velocidade: 8,

  acoes: [
    {
      id: 'exame', rotulo: 'Exame físico dirigido', grupo: 'Avaliação', dur: 60,
      fazer: (e, c) => c.log(`${pco2(e) > 75 ? 'Sonolento, desperta ao chamado, asterixe. ' : 'Acordado, um pouco sonolento. '}Lábios semicerrados, uso de musculatura acessória, tórax em tonel, murmúrio diminuído difusamente com sibilos e roncos esparsos. Edema discreto de MMII.`, 'resultado'),
    },
    {
      id: 'anamnese', rotulo: 'História: escarro, medicações, exacerbações', grupo: 'Avaliação', dur: 60,
      fazer: (_e, c) => c.log('"O catarro ficou amarelo e grosso, bem mais que o normal." Usa tiotrópio e formoterol; duas internações no último ano. Sem dor torácica.', 'fala'),
    },
    { id: 'monitor', rotulo: 'Monitor cardíaco', grupo: 'Monitorização', dur: 30, fazer: e => { e.monitorado = true; } },
    { id: 'oximetro', rotulo: 'Oxímetro de pulso', grupo: 'Monitorização', dur: 15, fazer: () => {} },
    { id: 'acesso', rotulo: 'Acesso venoso periférico', grupo: 'Monitorização', dur: 90, fazer: () => {} },
    {
      id: 'venturi', rotulo: 'O₂ por máscara de Venturi 28% (alvo SpO₂ 88–92%)', grupo: 'Procedimentos', dur: 20,
      fazer: e => { e.fx.o2 = 'venturi'; },
    },
    {
      id: 'reservatorio', rotulo: 'O₂ por máscara com reservatório 15 L/min', grupo: 'Procedimentos', dur: 20,
      fazer: (e, c) => {
        c.penalizar('O₂ em alto fluxo no DPOC hipercápnico piora a hipercapnia (perda do drive hipóxico, efeito Haldane e piora da relação V/Q). Use O₂ controlado, alvo 88–92%.', 10);
        e.fx.o2 = 'alto';
      },
    },
    {
      id: 'vni', rotulo: 'VNI: BiPAP (IPAP 12–16, EPAP 4–6 cmH₂O)', grupo: 'Procedimentos', dur: 3 * MIN,
      detalhe: 'Indicação: pH < 7,35 com pCO₂ > 45',
      bloqueio: e => (e.fx.iot ? 'Já intubado' : pco2(e) > 85 ? 'Rebaixado demais: VNI contraindicada' : null),
      fazer: e => { e.fx.vni = true; },
    },
    {
      id: 'iot', rotulo: 'Intubação e ventilação mecânica', grupo: 'Procedimentos', dur: 5 * MIN,
      fazer: (e, c) => {
        if (pco2(e) < 80 && !e.fx.vniFalha) c.penalizar('Intubação sem tentar VNI no DPOC com acidose respiratória: a VNI reduz intubação e mortalidade.', 10);
        e.fx.iot = true;
      },
    },
    {
      id: 'bronco', rotulo: 'Salbutamol + ipratrópio inalatórios', grupo: 'Medicações', dur: 4 * MIN, repetivel: true,
      bloqueio: e => (e.fx.broncoUlt !== undefined && e.t - (e.fx.broncoUlt as number) < 15 * MIN ? 'Repita após 20 min' : null),
      fazer: e => {
        e.fx.broncoUlt = e.t;
        e.fx.broncoN = ((e.fx.broncoN as number) ?? 0) + 1;
      },
    },
    { id: 'corticoide', rotulo: 'Prednisona 40 mg VO (5 dias)', grupo: 'Medicações', dur: 20, fazer: () => {} },
    {
      id: 'atb', rotulo: 'Antibiótico: amoxicilina-clavulanato', grupo: 'Medicações', dur: 20,
      detalhe: 'Escarro purulento ou VNI/VM',
      fazer: () => {},
    },
    {
      id: 'diazepam', rotulo: 'Benzodiazepínico para a agitação', grupo: 'Medicações', dur: 20,
      fazer: (e, c) => { c.penalizar('Sedativo no DPOC hipercápnico deprime o drive respiratório.', 15); e.fx.pco2 = pco2(e) + 10; },
    },
    {
      id: 'aminofilina', rotulo: 'Aminofilina IV', grupo: 'Medicações', dur: 30,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (_e, c) => c.penalizar('Metilxantinas não são recomendadas na exacerbação (efeitos adversos, pouco benefício).', 5),
    },
    {
      id: 'gaso', rotulo: 'Gasometria arterial', grupo: 'Exames', dur: 3 * MIN, repetivel: true,
      fazer: (e, c) => {
        const p = pco2(e);
        const h = ph(p);
        c.resultado({ id: `gaso${e.t}`, titulo: 'Gasometria arterial', texto: `pH ${h.toFixed(2).replace('.', ',')}; pCO₂ ${Math.round(p)} mmHg; HCO₃ 31 mEq/L; pO₂ ${Math.round(e.v.spo2 - 30)} mmHg. ${h < 7.35 ? 'Acidose respiratória aguda sobre crônica (HCO₃ elevado = compensação crônica). Indicação de VNI.' : 'pH normalizado, HCO₃ alto (retentor crônico).'}` });
        e.fx.gasoN = ((e.fx.gasoN as number) ?? 0) + 1;
      },
    },
    {
      id: 'rx', rotulo: 'Radiografia de tórax', grupo: 'Exames', dur: 10 * MIN,
      fazer: (_e, c) => c.resultado({ id: 'rx', titulo: 'Radiografia de tórax', texto: 'Hiperinsuflação, retificação das cúpulas, sem consolidação, sem pneumotórax, sem congestão.' }),
    },
    { id: 'ecg', rotulo: 'ECG', grupo: 'Exames', dur: 90, fazer: (_e, c) => c.resultado({ id: 'ecg', titulo: 'ECG', figura: 'taqui-sinusal', texto: 'Taquicardia sinusal; P pulmonale em DII; sem isquemia aguda.' }) },
    {
      id: 'internar', rotulo: 'Internar (enfermaria/UTI)', grupo: 'Decisão', dur: 30,
      fazer: (e, c) => c.encerrar('internado', e.fx.iot ? 'Intubado e internado na UTI.' : ph(pco2(e)) >= 7.35 ? 'Acidose corrigida com VNI; internado para continuar o tratamento.' : 'Internado ainda acidótico.'),
    },
    { id: 'aguardar', rotulo: 'Reavaliar em 5 minutos', grupo: 'Decisão', dur: 5 * MIN, repetivel: true, fazer: () => {} },
  ],

  tick: (e, dt, c) => {
    const v = e.v;
    if (!v.pulso) {
      if (e.t - (e.fx.pcrEm as number) > 4 * MIN) c.encerrar('obito', 'Parada por narcose carbônica e acidose grave.');
      e.quadro = 'Sem pulso.';
      return;
    }
    let p = pco2(e);
    const broncoAtivo = e.fx.broncoUlt !== undefined && e.t - (e.fx.broncoUlt as number) < 30 * MIN;
    const alvo = e.fx.iot ? 50 : e.fx.vni ? 50 : e.fx.o2 === 'alto' ? 98 : 70 - (broncoAtivo ? 3 : 0) - (feito(e, 'corticoide') ? 1 : 0);
    p = aproxima(p, alvo, dt, e.fx.vni || e.fx.iot ? 15 * MIN : 22 * MIN);
    e.fx.pco2 = p;
    if (p > 85 && !e.fx.rebaixado && !e.fx.iot) {
      e.fx.rebaixado = e.t;
      c.log('Torporoso, não protege a via aérea (narcose por CO₂). Indicação de intubação!', 'alerta');
    }
    if (e.fx.rebaixado !== undefined && !e.fx.iot && e.t - (e.fx.rebaixado as number) > 8 * MIN) {
      e.fx.pcrEm = e.t;
      Object.assign(v, { pulso: false, ritmo: 'assistolia', pas: 0, pad: 0, spo2: 0, fr: 0, fc: 0 });
      c.log('Parada respiratória.', 'alerta');
      return;
    }
    const spo2Alvo = e.fx.iot ? 94 : e.fx.o2 === 'alto' ? 98 : e.fx.o2 === 'venturi' ? 90 + (e.fx.vni ? 1 : 0) : 82;
    v.spo2 = aproxima(v.spo2, spo2Alvo, dt, 120);
    v.fr = aproxima(v.fr, e.fx.iot ? 14 : e.fx.rebaixado ? 10 : p > 70 ? 30 : e.fx.vni ? 20 : 26, dt, 120);
    v.fc = aproxima(v.fc, 84 + (p - 40) * 0.9 + (broncoAtivo ? 6 : 0), dt, 120);
    v.pas = aproxima(v.pas, 130 + (p - 50) * 0.6, dt, 120);
    v.pad = aproxima(v.pad, 80, dt, 120);
    e.quadro = e.fx.iot ? 'Intubado, sedado.' : p > 85 ? 'Torporoso, respiração superficial.' : p > 70 ? 'Sonolento, com asterixe; respira com lábios semicerrados.' : e.fx.vni ? 'Mais desperto, adaptado à VNI.' : 'Acordado, ainda dispneico.';
  },

  metas: [
    { id: 'gaso', texto: 'Gasometria arterial em até 10 min', peso: 10, dica: 'Sonolência no DPOC = suspeita de hipercapnia.', avaliar: e => ({ ok: ate(e, 'gaso', 10 * MIN) }) },
    { id: 'o2', texto: 'O₂ controlado (Venturi) em até 5 min', peso: 15, dica: 'Alvo de SpO₂ 88–92% no retentor de CO₂.', avaliar: e => ({ ok: ate(e, 'venturi', 5 * MIN) && !feito(e, 'reservatorio') }) },
    { id: 'bronco', texto: 'SABA + ipratrópio em até 10 min', peso: 15, dica: 'Broncodilatadores de curta ação, repetidos.', avaliar: e => ({ ok: ate(e, 'bronco', 10 * MIN) }) },
    { id: 'corti', texto: 'Corticoide sistêmico', peso: 10, dica: 'Prednisona 40 mg por 5 dias.', avaliar: e => ({ ok: feito(e, 'corticoide') }) },
    { id: 'atb', texto: 'Antibiótico (escarro purulento)', peso: 10, dica: 'Indicado com aumento da purulência do escarro ou necessidade de VNI/VM.', avaliar: e => ({ ok: feito(e, 'atb') }) },
    { id: 'vni', texto: 'VNI em até 20 min (acidose respiratória)', peso: 25, dica: 'pH < 7,35 e pCO₂ > 45: BiPAP reduz intubação e mortalidade.', avaliar: e => ({ ok: ate(e, 'vni', 20 * MIN), nota: feito(e, 'vni') ? `aos ${Math.round(e.feito.vni / 60)} min` : 'não feita' }) },
    { id: 'rx', texto: 'Radiografia para afastar pneumotórax/pneumonia', peso: 5, dica: 'Diferenciais da piora: pneumonia, pneumotórax, IC, TEP.', avaliar: e => ({ ok: feito(e, 'rx') }) },
    { id: 'reav', texto: 'Repetir a gasometria após a VNI', peso: 5, dica: 'Reavaliar em 1–2 h: o pH deve melhorar.', avaliar: e => ({ ok: ((e.fx.gasoN as number) ?? 0) >= 2 && feito(e, 'vni') }) },
    { id: 'destino', texto: 'Internar', peso: 5, dica: 'Exacerbação com acidose respiratória: internação.', avaliar: e => ({ ok: feito(e, 'internar') }) },
  ],

  ensino: [
    'No DPOC retentor de CO₂, use O₂ controlado (Venturi), com alvo de SpO₂ 88–92%. Excesso de O₂ piora a hipercapnia.',
    'Gasometria: pH baixo com pCO₂ alta e HCO₃ alto = acidose respiratória aguda sobre crônica.',
    'VNI (BiPAP) quando pH < 7,35 com pCO₂ > 45: reduz intubação e mortalidade. Falha ou rebaixamento: intubar.',
    'Tratamento: SABA + SAMA, prednisona 40 mg por 5 dias e antibiótico se o escarro estiver purulento.',
    'Evite sedativos e metilxantinas.',
  ],
};
