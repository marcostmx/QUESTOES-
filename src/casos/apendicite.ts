/**
 * Caso vivo: apendicite aguda no adulto jovem (WSES / diretrizes de abdome agudo).
 * Anamnese típica (dor periumbilical que migra para a FID, anorexia, náuseas), exame (Blumberg,
 * Rovsing, psoas), escore de Alvarado; analgesia precoce (NÃO mascara o diagnóstico); jejum e
 * hidratação; laboratório e imagem quando houver dúvida; antibiótico profilático pré-operatório;
 * apendicectomia (preferencialmente laparoscópica) antes de perfurar.
 */
import { aproxima, type Caso, type Estado } from './motor';

const MIN = 60;
const H = 60 * MIN;
const feito = (e: Estado, id: string) => e.feito[id] !== undefined;
const ate = (e: Estado, id: string, s: number) => feito(e, id) && e.feito[id] <= s;
const perfurou = (e: Estado) => e.fx.perfurou !== undefined;

export const APENDICITE: Caso = {
  id: 'apendicite-aguda',
  sistema: 'abdome',
  titulo: 'Dor na barriga que foi para a direita: apendicite aguda',
  subtitulo: 'Diagnóstico clínico, analgesia e cirurgia antes de perfurar',
  local: 'Pronto-socorro',
  paciente: { nome: 'Lucas', idade: 22, sexo: 'M', peso: 70 },
  chegada: [
    'Homem de 22 anos com dor abdominal há 18 horas: começou "em volta do umbigo" e foi para o lado direito, embaixo. Sem fome, enjoado, vomitou uma vez.',
  ],
  triagem: { fc: 98, pas: 124, pad: 78, spo2: 98, fr: 18, dor: 7 },
  inicial: { fc: 98, pas: 124, pad: 78, fr: 18, spo2: 98, temp: 37.9, dor: 7, ritmo: 'sinusal', pulso: true },
  limite: 9 * H,
  velocidade: 30,

  acoes: [
    {
      id: 'anamnese', rotulo: 'Anamnese dirigida da dor abdominal', grupo: 'Avaliação', dur: 5 * MIN,
      fazer: (_e, c) => c.log('"Começou no meio da barriga, de madrugada, e desceu para a direita. Dói mais quando ando ou tusso." Anorexia, náusea, um vômito. Sem diarreia, sem queixas urinárias. Sem cirurgias prévias.', 'fala'),
    },
    {
      id: 'exame', rotulo: 'Exame do abdome: Blumberg, Rovsing, psoas e obturador', grupo: 'Avaliação', dur: 5 * MIN,
      fazer: (e, c) => c.log(perfurou(e)
        ? 'Abdome tenso, defesa generalizada, descompressão dolorosa difusa (peritonite difusa).'
        : 'Dor à palpação do ponto de McBurney com defesa localizada; Blumberg positivo; Rovsing positivo; psoas positivo. Ruídos hidroaéreos diminuídos.', 'resultado'),
    },
    {
      id: 'alvarado', rotulo: 'Calcular o escore de Alvarado', grupo: 'Avaliação', dur: 2 * MIN,
      fazer: (e, c) => c.log(feito(e, 'lab')
        ? 'Alvarado 10: migração (1), anorexia (1), náusea/vômito (1), dor em FID (2), descompressão dolorosa (1), febre (1), leucocitose (2), desvio à esquerda (1). Alta probabilidade: avaliação cirúrgica.'
        : 'Sem o hemograma, Alvarado clínico ≥ 7: alta probabilidade de apendicite.', 'resultado'),
    },
    { id: 'monitor', rotulo: 'Sinais vitais seriados', grupo: 'Monitorização', dur: 2 * MIN, fazer: e => { e.monitorado = true; } },
    { id: 'acesso', rotulo: 'Acesso venoso periférico', grupo: 'Monitorização', dur: 3 * MIN, fazer: () => {} },
    { id: 'jejum', rotulo: 'Jejum e hidratação venosa', grupo: 'Monitorização', dur: 2 * MIN, bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'), fazer: () => {} },
    {
      id: 'lab', rotulo: 'Hemograma, PCR, EAS', grupo: 'Exames', dur: 5 * MIN, detalhe: 'Resultado em ~40 min',
      fazer: (_e, c) => c.resultado({ id: 'lab', titulo: 'Laboratório', texto: 'Leucócitos 15.800 com 82% de neutrófilos (desvio à esquerda); PCR 68 mg/L; EAS sem alterações.' }, 40 * MIN),
    },
    {
      id: 'usg', rotulo: 'Ultrassom de abdome', grupo: 'Exames', dur: 30 * MIN,
      fazer: (e, c) => c.resultado({ id: 'usg', titulo: 'Ultrassom', texto: perfurou(e) ? 'Apêndice não visualizado; líquido livre e coleção na FID (perfuração).' : 'Apêndice não compressível, com 11 mm de diâmetro, borramento da gordura periapendicular. Compatível com apendicite aguda.' }),
    },
    {
      id: 'tc', rotulo: 'Tomografia de abdome', grupo: 'Exames', dur: 60 * MIN,
      detalhe: 'Útil na dúvida diagnóstica',
      fazer: (e, c) => {
        if (feito(e, 'usg')) c.penalizar('TC após ultrassom já diagnóstico, com Alvarado alto: atrasa a cirurgia sem mudar a conduta.', 5);
        c.resultado({ id: 'tc', titulo: 'Tomografia', texto: 'Apêndice espessado (12 mm) com apendicolito e densificação da gordura; sem abscesso.' });
      },
    },
    {
      id: 'analgesia', rotulo: 'Analgesia: dipirona + morfina IV', grupo: 'Medicações', dur: 5 * MIN,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: () => {},
    },
    {
      id: 'segurar', rotulo: 'Segurar a analgesia até o cirurgião examinar', grupo: 'Medicações', dur: 2 * MIN,
      fazer: (_e, c) => c.penalizar('Mito: analgesia (inclusive opioide) não mascara o diagnóstico de abdome agudo. Não deixe o paciente com dor.', 10),
    },
    {
      id: 'buscopan', rotulo: 'Antiespasmódico e alta com orientação', grupo: 'Decisão', dur: 5 * MIN,
      fazer: (e, c) => {
        c.penalizar('Alta com antiespasmódico num quadro típico de apendicite: o paciente volta perfurado.', 25);
        c.encerrar('alta', 'Liberado com antiespasmódico. Retornou 20 horas depois com peritonite difusa.');
        e.fx.perfurou = e.t;
      },
    },
    {
      id: 'atb', rotulo: 'Antibiótico profilático: cefazolina + metronidazol', grupo: 'Medicações', dur: 5 * MIN,
      detalhe: 'Na indução ou até 60 min antes da incisão',
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: () => {},
    },
    {
      id: 'cirurgia', rotulo: 'Avaliação da cirurgia e apendicectomia videolaparoscópica', grupo: 'Procedimentos', dur: 90 * MIN,
      fazer: (e, c) => {
        c.resultado({ id: 'cir', titulo: 'Cirurgia', texto: perfurou(e) ? 'Apêndice perfurado com peritonite purulenta em FID e pelve; apendicectomia e lavagem; antibiótico terapêutico por 3–5 dias.' : 'Apendicite aguda flegmonosa, sem perfuração; apendicectomia sem intercorrências.' });
        c.encerrar('internado', perfurou(e) ? 'Operado após a perfuração: internação mais longa, com antibiótico terapêutico.' : 'Operado antes de perfurar; alta prevista em 24–48 h.');
      },
    },
    { id: 'aguardar', rotulo: 'Observar por 30 minutos', grupo: 'Decisão', dur: 30 * MIN, repetivel: true, fazer: () => {} },
  ],

  tick: (e, dt, c) => {
    const v = e.v;
    if (!perfurou(e) && e.t >= 4 * H) {
      e.fx.perfurou = e.t;
      c.log('A dor ficou difusa e muito intensa; febre alta: provável PERFURAÇÃO com peritonite.', 'alerta');
    }
    const p = perfurou(e);
    v.temp = aproxima(v.temp, p ? 38.9 : 37.9, dt, 1800);
    v.fc = aproxima(v.fc, (p ? 124 : 96) - (feito(e, 'analgesia') ? 8 : 0), dt, 600);
    v.pas = aproxima(v.pas, p ? 102 : 124, dt, 900);
    v.pad = aproxima(v.pad, v.pas * 0.62, dt, 900);
    v.fr = aproxima(v.fr, p ? 24 : 18, dt, 900);
    v.dor = aproxima(v.dor, p ? 9 : feito(e, 'analgesia') ? 3 : 7, dt, 600);
    e.quadro = p ? 'Imóvel no leito, abdome em tábua, febril.' : v.dor > 5 ? 'Encolhido, evita se mexer; dor ao tossir.' : 'Mais confortável após a analgesia.';
  },

  metas: [
    { id: 'clinica', texto: 'Anamnese e exame do abdome com sinais de irritação', peso: 10, dica: 'Migração da dor, anorexia; Blumberg, Rovsing, psoas.', avaliar: e => ({ ok: feito(e, 'anamnese') && ate(e, 'exame', 30 * MIN) }) },
    { id: 'alvarado', texto: 'Escore de Alvarado', peso: 10, dica: 'Alvarado ≥ 7: alta probabilidade; 4–6: imagem; ≤ 3: baixa.', avaliar: e => ({ ok: feito(e, 'alvarado') }) },
    { id: 'analgesia', texto: 'Analgesia em até 30 min', peso: 10, dica: 'Opioide não mascara o diagnóstico.', avaliar: e => ({ ok: ate(e, 'analgesia', 30 * MIN) && !feito(e, 'segurar') }) },
    { id: 'jejum', texto: 'Jejum e hidratação venosa', peso: 10, dica: 'Paciente potencialmente cirúrgico.', avaliar: e => ({ ok: feito(e, 'jejum') }) },
    { id: 'exames', texto: 'Hemograma/PCR e imagem adequada', peso: 10, dica: 'Ultrassom primeiro; TC se dúvida. Não atrase a cirurgia.', avaliar: e => ({ ok: feito(e, 'lab') && (feito(e, 'usg') || feito(e, 'tc')) }) },
    { id: 'atb', texto: 'Antibiótico profilático antes da cirurgia', peso: 15, dica: 'Cefazolina + metronidazol (ou equivalente) até 60 min antes da incisão.', avaliar: e => ({ ok: feito(e, 'atb') && (!feito(e, 'cirurgia') || e.feito.atb <= e.feito.cirurgia) }) },
    {
      id: 'cirurgia', texto: 'Apendicectomia antes de perfurar', peso: 35, dica: 'Quanto mais tempo, maior o risco de perfuração.',
      avaliar: e => ({ ok: feito(e, 'cirurgia') && (e.fx.perfurou === undefined || e.feito.cirurgia < (e.fx.perfurou as number)), nota: feito(e, 'cirurgia') ? `operado após ${Math.round(e.feito.cirurgia / H * 10) / 10} h` : 'não operado' }),
    },
  ],

  ensino: [
    'Quadro clássico: dor periumbilical que migra para a fossa ilíaca direita, anorexia, náuseas, febre baixa e leucocitose.',
    'Alvarado ≥ 7: alta probabilidade (avaliação cirúrgica); 4–6: imagem (ultrassom, depois TC); ≤ 3: baixa probabilidade.',
    'Analgesia precoce, inclusive com opioide, NÃO mascara o diagnóstico.',
    'Antibiótico profilático antes da cirurgia; terapêutico se perfurada.',
    'Em mulheres em idade fértil, sempre β-hCG e pensar em causas ginecológicas.',
  ],
};
