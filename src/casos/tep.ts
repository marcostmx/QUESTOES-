/**
 * Caso vivo: tromboembolismo pulmonar que evolui para alto risco (ESC 2019).
 * Probabilidade clínica (Wells) alta → anticoagular (heparina não fracionada) já, antes da imagem;
 * confirmar com angio-TC enquanto estável. Se evoluir com hipotensão (PAS < 90 = TEP de alto
 * risco): ecocardiograma à beira-leito (VD dilatado) e trombólise sistêmica (alteplase 100 mg em 2 h),
 * suporte com noradrenalina e volume cauteloso (≤ 500 mL).
 */
import { aproxima, type Caso, type Estado } from './motor';

const MIN = 60;
const feito = (e: Estado, id: string) => e.feito[id] !== undefined;
const ate = (e: Estado, id: string, s: number) => feito(e, id) && e.feito[id] <= s;
const instavel = (e: Estado) => e.fx.choqueEm !== undefined && !e.fx.lisado;

export const TEP: Caso = {
  id: 'tep-alto-risco',
  sistema: 'respiratorio',
  titulo: 'Falta de ar súbita e síncope: tromboembolismo pulmonar',
  subtitulo: 'Anticoagulação imediata · trombólise se instabilizar',
  local: 'Sala de emergência',
  paciente: { nome: 'Renata', idade: 46, sexo: 'F', peso: 74 },
  chegada: [
    'Mulher de 46 anos com falta de ar súbita há 2 horas, dor em pontada no lado direito do tórax e um desmaio rápido em casa.',
    'Voltou há quatro dias de uma viagem de ônibus de 18 horas; a panturrilha esquerda está inchada.',
  ],
  triagem: { fc: 124, pas: 102, pad: 66, spo2: 88, fr: 30, dor: 5 },
  inicial: { fc: 124, pas: 102, pad: 66, fr: 30, spo2: 88, temp: 37.4, dor: 5, ritmo: 'sinusal', pulso: true },
  limite: 75 * MIN,
  velocidade: 6,

  acoes: [
    {
      id: 'exame', rotulo: 'Exame físico dirigido', grupo: 'Avaliação', dur: 60,
      fazer: (e, c) => c.log(`${instavel(e) ? 'Pálida, sudoreica, extremidades frias. ' : 'Taquipneica, ansiosa. '}Pulmões com murmúrio presente bilateral, sem estertores. B2 hiperfonética em foco pulmonar. Turgência jugular. Panturrilha esquerda empastada.`, 'resultado'),
    },
    {
      id: 'wells', rotulo: 'Escore de Wells para TEP', grupo: 'Avaliação', dur: 30,
      fazer: (_e, c) => c.log('Wells: sinais de TVP (3) + TEP como diagnóstico mais provável (3) + FC > 100 (1,5) = 7,5 → ALTA probabilidade clínica. D-dímero não é necessário: vá direto à imagem.', 'resultado'),
    },
    {
      id: 'anamnese', rotulo: 'Fatores de risco e contraindicações à trombólise', grupo: 'Avaliação', dur: 60,
      fazer: (e, c) => { e.fx.ci = true; c.log('Usa anticoncepcional oral combinado. Sem cirurgia, AVC, sangramento ou trauma recentes. Sem anticoagulante.', 'fala'); },
    },
    { id: 'monitor', rotulo: 'Monitor cardíaco', grupo: 'Monitorização', dur: 30, fazer: e => { e.monitorado = true; } },
    { id: 'oximetro', rotulo: 'Oxímetro de pulso', grupo: 'Monitorização', dur: 15, fazer: () => {} },
    { id: 'acesso', rotulo: 'Acesso venoso periférico', grupo: 'Monitorização', dur: 90, fazer: () => {} },
    { id: 'o2', rotulo: 'O₂ (alvo SpO₂ ≥ 90%)', grupo: 'Procedimentos', dur: 20, fazer: e => { e.fx.o2 = true; } },
    {
      id: 'ecg', rotulo: 'ECG de 12 derivações', grupo: 'Exames', dur: 90,
      fazer: (_e, c) => c.resultado({ id: 'ecg', titulo: 'ECG', figura: 'taqui-sinusal', texto: 'Taquicardia sinusal; padrão S1Q3T3 e inversão de T de V1 a V3 (sobrecarga de VD). Sem supra de ST.' }),
    },
    { id: 'lab', rotulo: 'Troponina, BNP, função renal, gasometria', grupo: 'Exames', dur: 30, detalhe: 'Resultado em ~30 min', fazer: (_e, c) => c.resultado({ id: 'lab', titulo: 'Laboratório', texto: 'Troponina elevada; BNP elevado (disfunção de VD); creatinina 0,8. Gasometria: hipoxemia com alcalose respiratória.' }, 30 * MIN) },
    {
      id: 'ddimero', rotulo: 'D-dímero', grupo: 'Exames', dur: 30,
      fazer: (_e, c) => { c.penalizar('D-dímero com alta probabilidade clínica não muda a conduta: vá direto à angio-TC.', 3); c.resultado({ id: 'dd', titulo: 'D-dímero', texto: 'Elevado (inespecífico).' }, 30 * MIN); },
    },
    {
      id: 'angiotc', rotulo: 'Angiotomografia de tórax', grupo: 'Exames', dur: 15 * MIN,
      fazer: (e, c) => {
        if (instavel(e)) {
          c.penalizar('Levar à tomografia uma paciente em choque: use o ecocardiograma à beira-leito.', 10);
          e.fx.pioraTC = true;
        }
        e.fx.confirmado = true;
        c.resultado({ id: 'angiotc', titulo: 'Angiotomografia', texto: 'Falhas de enchimento nas artérias pulmonares principais direita e esquerda (TEP bilateral central); relação VD/VE 1,4.' });
      },
    },
    {
      id: 'eco', rotulo: 'Ecocardiograma à beira-leito (POCUS)', grupo: 'Exames', dur: 3 * MIN,
      fazer: (e, c) => {
        e.fx.eco = true;
        c.resultado({ id: 'eco', titulo: 'Ecocardiograma à beira-leito', texto: 'VD dilatado e hipocinético (VD/VE > 1), septo retificado ("D-sign"), sinal de McConnell. Trombo em trânsito? Não. Compatível com TEP com disfunção de VD.' });
      },
    },
    {
      id: 'heparina', rotulo: 'Heparina não fracionada: 80 UI/kg IV em bolus + infusão', grupo: 'Medicações', dur: 60,
      detalhe: 'Preferível se houver chance de trombólise',
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: () => {},
    },
    {
      id: 'alteplase', rotulo: 'Trombólise: alteplase 100 mg IV em 2 h', grupo: 'Medicações', dur: 3 * MIN,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (e, c) => {
        if (e.fx.choqueEm === undefined) c.penalizar('Trombólise sistêmica com a paciente normotensa: no TEP de risco intermediário não é rotina (risco de sangramento). Reserve para instabilidade.', 10);
        if (!e.fx.ci) c.penalizar('Trombólise sem checar contraindicações.', 5);
        if (!e.fx.confirmado && !e.fx.eco) c.penalizar('Trombólise sem confirmação por imagem (angio-TC ou eco à beira-leito).', 5);
        e.fx.alteplase = e.t;
      },
    },
    {
      id: 'soro500', rotulo: 'Cristaloide 500 mL', grupo: 'Medicações', dur: 10 * MIN,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: e => { e.fx.volume = true; },
    },
    {
      id: 'soro2l', rotulo: 'Cristaloide 2 L em bolus', grupo: 'Medicações', dur: 20 * MIN,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (e, c) => { c.penalizar('Volume excessivo distende o VD e piora o débito no TEP: no máximo ~500 mL.', 10); e.fx.excesso = true; },
    },
    {
      id: 'nora', rotulo: 'Noradrenalina em bomba', grupo: 'Medicações', dur: 3 * MIN,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: e => { e.fx.nora = true; },
    },
    {
      id: 'uti', rotulo: 'Internar na UTI', grupo: 'Decisão', dur: 60,
      fazer: (e, c) => c.encerrar('internado', e.fx.lisado ? 'Após a trombólise, PA estabilizada; internada na UTI.' : e.fx.choqueEm !== undefined ? 'Internada ainda em choque.' : 'Internada anticoagulada em monitorização.'),
    },
    { id: 'aguardar', rotulo: 'Reavaliar em 2 minutos', grupo: 'Decisão', dur: 2 * MIN, repetivel: true, fazer: () => {} },
  ],

  tick: (e, dt, c) => {
    const v = e.v;
    if (!v.pulso) {
      if (e.t - (e.fx.pcrEm as number) > 4 * MIN) c.encerrar('obito', 'Óbito por TEP maciço sem reperfusão.');
      e.quadro = 'Sem pulso: AESP.';
      return;
    }
    // novo êmbolo: vira TEP de alto risco aos 16 min (antes, se excesso de volume)
    if (e.fx.choqueEm === undefined && !e.fx.alteplase && e.t >= (e.fx.excesso ? 10 : 16) * MIN) {
      e.fx.choqueEm = e.t;
      c.log('Novo quadro de síncope! PA 76/48, FC 138, extremidades frias. TEP de ALTO RISCO.', 'alerta');
    }
    if (e.fx.alteplase !== undefined && !e.fx.lisado && e.t - (e.fx.alteplase as number) > 12 * MIN) {
      e.fx.lisado = true;
      c.log('Melhora da PA e da saturação após a trombólise.', 'evento');
    }
    const choque = instavel(e);
    if (choque && e.t - (e.fx.choqueEm as number) > (e.fx.pioraTC ? 12 : 18) * MIN && !e.fx.alteplase) {
      e.fx.pcrEm = e.t;
      Object.assign(v, { pulso: false, pas: 0, pad: 0, spo2: 0, fr: 0 });
      c.log('Parada em atividade elétrica sem pulso.', 'alerta');
      return;
    }
    const suporte = (e.fx.nora ? 10 : 0) + (e.fx.volume ? 4 : 0);
    const pas = e.fx.lisado ? 118 : choque ? 72 + suporte : 102;
    v.pas = aproxima(v.pas, pas, dt, 60);
    v.pad = aproxima(v.pad, pas * 0.63, dt, 60);
    v.fc = aproxima(v.fc, e.fx.lisado ? 98 : choque ? 138 : 122, dt, 60);
    v.spo2 = aproxima(v.spo2, (e.fx.lisado ? 95 : choque ? 84 : 89) + (e.fx.o2 ? 4 : 0), dt, 60);
    v.fr = aproxima(v.fr, e.fx.lisado ? 20 : 30, dt, 60);
    e.quadro = e.fx.lisado ? 'Respirando melhor, corada, PA estável.' : choque ? 'Pálida, sudoreica, confusa; pulsos finos.' : 'Taquipneica e ansiosa, com dor pleurítica.';
  },

  metas: [
    { id: 'prob', texto: 'Estimar a probabilidade clínica (Wells)', peso: 10, dica: 'Alta probabilidade: anticoagule e faça angio-TC; não peça D-dímero.', avaliar: e => ({ ok: feito(e, 'wells') }) },
    { id: 'ecg', texto: 'ECG e marcadores de disfunção de VD', peso: 5, dica: 'ECG (S1Q3T3, strain de VD), troponina e BNP estratificam o risco.', avaliar: e => ({ ok: feito(e, 'ecg') && feito(e, 'lab') }) },
    { id: 'hep', texto: 'Heparina em até 15 min (antes da confirmação)', peso: 20, dica: 'Alta probabilidade: anticoagular já, enquanto aguarda a imagem. HNF se pode precisar de trombólise.', avaliar: e => ({ ok: ate(e, 'heparina', 15 * MIN) }) },
    { id: 'imagem', texto: 'Confirmar: angio-TC se estável ou eco à beira-leito se instável', peso: 15, dica: 'Instável: o ecocardiograma à beira-leito com VD dilatado basta para trombolisar.', avaliar: e => ({ ok: (feito(e, 'angiotc') && !e.penal.some(p => /tomografia/.test(p.texto))) || feito(e, 'eco') }) },
    {
      id: 'lise', texto: 'Trombólise em até 15 min da hipotensão', peso: 30, dica: 'TEP de alto risco (PAS < 90 por > 15 min ou necessidade de vasopressor): trombólise sistêmica.',
      avaliar: e => (e.fx.choqueEm === undefined ? null : { ok: e.fx.alteplase !== undefined && (e.fx.alteplase as number) - (e.fx.choqueEm as number) <= 15 * MIN }),
    },
    { id: 'suporte', texto: 'Suporte hemodinâmico adequado (noradrenalina, volume ≤ 500 mL)', peso: 10, dica: 'Volume em excesso piora o VD; use noradrenalina.', avaliar: e => (e.fx.choqueEm === undefined ? null : { ok: feito(e, 'nora') && !feito(e, 'soro2l') }) },
    { id: 'uti', texto: 'Internar na UTI', peso: 10, dica: 'TEP com disfunção de VD ou instabilidade: UTI.', avaliar: e => ({ ok: feito(e, 'uti') }) },
  ],

  ensino: [
    'Probabilidade clínica alta (Wells > 6): anticoagular já e pedir angio-TC. D-dímero só serve na probabilidade baixa ou intermediária.',
    'TEP de alto risco = hipotensão (PAS < 90) ou choque: trombólise sistêmica (alteplase 100 mg em 2 h), salvo contraindicação.',
    'Paciente instável: o ecocardiograma à beira-leito com VD dilatado autoriza a trombólise. Não leve à tomografia.',
    'No TEP, o VD não tolera volume: no máximo ~500 mL; prefira noradrenalina.',
    'Heparina não fracionada é preferível quando há chance de trombólise (meia-vida curta, reversível).',
  ],
};
