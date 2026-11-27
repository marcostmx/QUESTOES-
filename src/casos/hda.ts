/**
 * Caso vivo: hemorragia digestiva alta varicosa em cirrótico (Baveno VII / ACG / SBH).
 * Dois acessos calibrosos e tipagem; reposição volêmica cautelosa; transfusão RESTRITIVA (Hb < 7,
 * alvo 7–8); vasoativo esplâncnico (terlipressina ou octreotide) imediato; antibiótico profilático
 * (ceftriaxona); IBP até ver a fonte; endoscopia em até 12 h após estabilizar, com ligadura elástica;
 * proteger a via aérea se rebaixamento ou hematêmese maciça.
 */
import { aproxima, type Caso, type Estado } from './motor';

const MIN = 60;
const feito = (e: Estado, id: string) => e.feito[id] !== undefined;
const ate = (e: Estado, id: string, s: number) => feito(e, id) && e.feito[id] <= s;
const num = (e: Estado, k: string, d: number) => (e.fx[k] as number) ?? d;

export const HDA: Caso = {
  id: 'hda-varicosa',
  sistema: 'abdome',
  titulo: 'Vômito com sangue: hemorragia digestiva alta varicosa',
  subtitulo: 'Cirrótico com choque · terlipressina, antibiótico e endoscopia',
  local: 'Sala de emergência',
  paciente: { nome: 'Sr. Valter', idade: 58, sexo: 'M', peso: 74 },
  chegada: [
    'Homem de 58 anos, etilista, com dois episódios de vômito com grande quantidade de sangue vivo e fezes pretas desde a manhã.',
    'Tem "problema no fígado" e barriga d\'água. Está pálido, suado e tonto.',
  ],
  triagem: { fc: 124, pas: 86, pad: 52, spo2: 95, fr: 24, dor: 2 },
  inicial: { fc: 124, pas: 86, pad: 52, fr: 24, spo2: 95, temp: 36.2, dor: 2, ritmo: 'sinusal', pulso: true },
  limite: 120 * MIN,
  velocidade: 8,

  acoes: [
    {
      id: 'exame', rotulo: 'Exame físico e estigmas de cirrose', grupo: 'Avaliação', dur: 90,
      fazer: (e, c) => c.log(`${num(e, 'deficit', 0.34) > 0.4 ? 'Sonolento, ' : 'Acordado, '}pálido, sudoreico. Icterícia leve, aranhas vasculares, eritema palmar, ginecomastia, ascite moderada, circulação colateral. Toque retal: melena.`, 'resultado'),
    },
    {
      id: 'anamnese', rotulo: 'História: álcool, medicações, sangramentos prévios', grupo: 'Avaliação', dur: 60,
      fazer: (_e, c) => c.log('"Bebo uma garrafa de cachaça por dia há 20 anos." Já foi internado por "barriga d\'água". Não usa betabloqueador nem anticoagulante.', 'fala'),
    },
    {
      id: 'escore', rotulo: 'Calcular Glasgow-Blatchford e Child-Pugh', grupo: 'Avaliação', dur: 60,
      fazer: (e, c) => c.log(feito(e, 'lab') ? 'Glasgow-Blatchford 14 (alto risco: precisa de intervenção). Child-Pugh C (bilirrubina, albumina, INR, ascite).' : 'Faltam os exames: com PA, FC e melena, o Blatchford já é ≥ 9 (alto risco).', 'resultado'),
    },
    { id: 'monitor', rotulo: 'Monitor cardíaco', grupo: 'Monitorização', dur: 30, fazer: e => { e.monitorado = true; } },
    { id: 'oximetro', rotulo: 'Oxímetro de pulso', grupo: 'Monitorização', dur: 15, fazer: () => {} },
    { id: 'acesso', rotulo: 'Dois acessos venosos calibrosos (14–16G) + tipagem e reserva', grupo: 'Monitorização', dur: 3 * MIN, fazer: () => {} },
    {
      id: 'lab', rotulo: 'Hemograma, coagulograma, função hepática e renal', grupo: 'Exames', dur: 60, detalhe: 'Resultado em ~20 min',
      fazer: (e, c) => c.resultado({ id: 'lab', titulo: 'Laboratório', texto: `Hb ${num(e, 'hb', 7.6).toFixed(1).replace('.', ',')} g/dL; plaquetas 72 mil; INR 1,9; bilirrubina 3,4; albumina 2,6; creatinina 1,2; ureia 92 (ureia alta por sangue no tubo digestivo).` }, 20 * MIN),
    },
    {
      id: 'hb', rotulo: 'Hemoglobina à beira-leito', grupo: 'Exames', dur: 60, repetivel: true,
      fazer: (e, c) => c.resultado({ id: `hb${e.t}`, titulo: 'Hemoglobina', texto: `${num(e, 'hb', 7.6).toFixed(1).replace('.', ',')} g/dL.` }),
    },
    {
      id: 'cristaloide', rotulo: 'Cristaloide 500 mL', grupo: 'Medicações', dur: 10 * MIN, repetivel: true,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (e, c) => {
        e.fx.cristal = num(e, 'cristal', 0) + 0.5;
        if (num(e, 'cristal', 0) > 2) c.penalizar('Mais de 2 L de cristaloide na HDA varicosa: aumenta a pressão portal, o ressangramento e dilui a coagulação.', 8);
        e.fx.deficit = Math.max(0, num(e, 'deficit', 0.34) - 0.07);
        e.fx.hb = num(e, 'hb', 7.6) - 0.3;
      },
    },
    {
      id: 'sangue', rotulo: 'Concentrado de hemácias (1 unidade)', grupo: 'Medicações', dur: 15 * MIN, repetivel: true,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (e, c) => {
        if (num(e, 'hb', 7.6) > 8) c.penalizar('Transfusão com Hb > 8 no cirrótico: estratégia liberal aumenta ressangramento e mortalidade (alvo 7–8).', 8);
        e.fx.deficit = Math.max(0, num(e, 'deficit', 0.34) - 0.09);
        e.fx.hb = num(e, 'hb', 7.6) + 1;
        e.fx.transfundiu = true;
      },
    },
    {
      id: 'terlipressina', rotulo: 'Terlipressina 2 mg IV a cada 4 h', grupo: 'Medicações', dur: 60,
      detalhe: 'Vasoconstritor esplâncnico (ou octreotide)',
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: e => { e.fx.terli = e.t; },
    },
    { id: 'ceftriaxona', rotulo: 'Ceftriaxona 1 g IV/dia (profilaxia)', grupo: 'Medicações', dur: 30, bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'), fazer: () => {} },
    { id: 'ibp', rotulo: 'Omeprazol 80 mg IV', grupo: 'Medicações', dur: 30, detalhe: 'Até a endoscopia definir a fonte', bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'), fazer: () => {} },
    {
      id: 'propranolol', rotulo: 'Propranolol', grupo: 'Medicações', dur: 20,
      fazer: (e, c) => { c.penalizar('Betabloqueador na hemorragia ativa com hipotensão piora o choque (é para profilaxia secundária depois).', 10); e.fx.deficit = num(e, 'deficit', 0.34) + 0.05; },
    },
    {
      id: 'iot', rotulo: 'Intubação para proteger a via aérea', grupo: 'Procedimentos', dur: 6 * MIN,
      fazer: (e, c) => {
        if (!e.fx.rebaixado) c.penalizar('Intubação sem indicação (consciente, sem hematêmese maciça em curso).', 5);
        e.fx.iot = true;
      },
    },
    {
      id: 'eda', rotulo: 'Endoscopia digestiva alta com ligadura elástica', grupo: 'Procedimentos', dur: 30 * MIN,
      bloqueio: e => (e.v.pas < 90 ? 'Estabilize a hemodinâmica antes (PAS ≥ 90)' : null),
      fazer: (e, c) => {
        e.fx.edaFeita = true;
        c.resultado({ id: 'eda', titulo: 'Endoscopia', texto: 'Varizes esofágicas de grosso calibre com sangramento em jato; 5 bandas de ligadura elástica com hemostasia. Gastropatia hipertensiva.' });
      },
    },
    {
      id: 'balao', rotulo: 'Balão de Sengstaken-Blakemore', grupo: 'Procedimentos', dur: 15 * MIN,
      detalhe: 'Ponte no sangramento refratário',
      fazer: (e, c) => { if (e.fx.terli === undefined || e.fx.edaFeita) c.penalizar('Balão só como ponte no sangramento refratário ao vasoativo + endoscopia.', 5); e.fx.balao = true; },
    },
    {
      id: 'uti', rotulo: 'Internar na UTI', grupo: 'Decisão', dur: 2 * MIN,
      fazer: (e, c) => c.encerrar('internado', e.fx.edaFeita ? 'Sangramento controlado pela ligadura; internado na UTI com terlipressina e antibiótico.' : 'Internado sem controle endoscópico do sangramento.'),
    },
    { id: 'aguardar', rotulo: 'Reavaliar em 5 minutos', grupo: 'Decisão', dur: 5 * MIN, repetivel: true, fazer: () => {} },
  ],

  tick: (e, dt, c) => {
    const v = e.v;
    if (!v.pulso) {
      if (e.t - (e.fx.pcrEm as number) > 4 * MIN) c.encerrar('obito', 'Óbito por choque hemorrágico.');
      e.quadro = 'Sem pulso.';
      return;
    }
    // sangramento: reduzido pela terlipressina e parado pela ligadura
    let taxa = 0.0045;
    if (e.fx.terli !== undefined && e.t - (e.fx.terli as number) > 5 * MIN) taxa *= 0.35;
    if (e.fx.balao) taxa *= 0.3;
    if (e.fx.edaFeita) taxa = 0;
    // ressangramento volumoso aos 35 min se nada foi feito
    if (!e.fx.terli && !e.fx.edaFeita && e.t > 35 * MIN && !e.fx.hematemese) {
      e.fx.hematemese = true;
      e.fx.deficit = num(e, 'deficit', 0.34) + 0.12;
      c.log('Nova hematêmese volumosa!', 'alerta');
    }
    const def = Math.min(1, num(e, 'deficit', 0.34) + (taxa / 60) * dt);
    e.fx.deficit = def;
    e.fx.hb = Math.max(3, num(e, 'hb', 7.6) - ((taxa * 9) / 60) * dt);
    if (def > 0.5 && !e.fx.rebaixado) {
      e.fx.rebaixado = true;
      c.log('Rebaixamento do nível de consciência: risco de aspiração. Considere proteger a via aérea.', 'alerta');
    }
    if (def > 0.68) {
      e.fx.pcrEm = e.t;
      Object.assign(v, { pulso: false, pas: 0, pad: 0, spo2: 0, fr: 0, ritmo: 'sinusal' });
      c.log('Parada em AESP por choque hemorrágico.', 'alerta');
      return;
    }
    v.pas = aproxima(v.pas, 128 - def * 125, dt, 60);
    v.pad = aproxima(v.pad, v.pas * 0.6, dt, 60);
    v.fc = aproxima(v.fc, 76 + def * 140, dt, 60);
    v.fr = aproxima(v.fr, 16 + def * 20, dt, 90);
    e.quadro = def > 0.5 ? 'Sonolento, frio, pulsos finos.' : def > 0.3 ? 'Pálido, sudoreico, tonto.' : 'Mais corado, conversando.';
  },

  metas: [
    { id: 'acesso', texto: 'Dois acessos calibrosos e tipagem em até 10 min', peso: 10, dica: 'HDA com instabilidade: dois acessos 14–16G e reserva de sangue.', avaliar: e => ({ ok: ate(e, 'acesso', 10 * MIN) }) },
    { id: 'terli', texto: 'Vasoativo (terlipressina) em até 30 min', peso: 20, dica: 'Suspeita de varizes: vasoativo antes da endoscopia, o quanto antes.', avaliar: e => ({ ok: ate(e, 'terlipressina', 30 * MIN), nota: feito(e, 'terlipressina') ? `aos ${Math.round(e.feito.terlipressina / 60)} min` : 'não feito' }) },
    { id: 'atb', texto: 'Antibiótico profilático (ceftriaxona)', peso: 15, dica: 'Cirrótico com HDA: antibiótico reduz infecção, ressangramento e mortalidade.', avaliar: e => ({ ok: feito(e, 'ceftriaxona') }) },
    { id: 'volume', texto: 'Volume cauteloso (≤ 2 L de cristaloide)', peso: 10, dica: 'Repor o suficiente para perfundir, sem aumentar a pressão portal.', avaliar: e => ({ ok: feito(e, 'cristaloide') && num(e, 'cristal', 0) <= 2 }) },
    { id: 'transf', texto: 'Transfusão restritiva (Hb < 7, alvo 7–8)', peso: 10, dica: 'Transfundir com Hb < 7 (ou instabilidade); evitar passar de 8.', avaliar: e => ({ ok: e.fx.transfundiu === true && !e.penal.some(p => /Transfusão/.test(p.texto)) }) },
    { id: 'ibp', texto: 'IBP até definir a fonte', peso: 5, dica: 'Até a endoscopia, a úlcera péptica é possível.', avaliar: e => ({ ok: feito(e, 'ibp') }) },
    { id: 'eda', texto: 'Endoscopia com ligadura após estabilizar', peso: 20, dica: 'EDA em até 12 h, depois da ressuscitação inicial.', avaliar: e => ({ ok: feito(e, 'eda') }) },
    { id: 'escore', texto: 'Estratificar (Glasgow-Blatchford / Child-Pugh)', peso: 5, dica: 'Blatchford alto = intervenção; Child C = alto risco.', avaliar: e => ({ ok: feito(e, 'escore') }) },
    { id: 'uti', texto: 'Internar na UTI', peso: 5, dica: 'HDA varicosa com choque: UTI.', avaliar: e => ({ ok: feito(e, 'uti') }) },
  ],

  ensino: [
    'Suspeita de HDA varicosa: terlipressina (ou octreotide) imediata, antes mesmo da endoscopia.',
    'Antibiótico profilático (ceftriaxona) em todo cirrótico com HDA: reduz infecção, ressangramento e mortalidade.',
    'Transfusão restritiva: Hb < 7, alvo 7–8. Excesso de volume aumenta a pressão portal e o ressangramento.',
    'Endoscopia em até 12 h, após estabilizar, com ligadura elástica. Balão de Sengstaken só como ponte.',
    'Betabloqueador não é para a fase aguda: é a profilaxia secundária depois do controle do sangramento.',
  ],
};
