/**
 * Caso vivo: obstrução intestinal por bridas (Bologna/WSES 2017).
 * Sem sinais de sofrimento de alça: tratamento conservador — jejum, sonda nasogástrica descompressiva,
 * hidratação e correção de eletrólitos, analgesia, TC para afastar estrangulamento e contraste
 * hidrossolúvel (diagnóstico e terapêutico). Sinais de estrangulamento (febre, taquicardia, dor
 * contínua, peritonite, lactato alto, TC com isquemia) = cirurgia de urgência.
 * Procinéticos, laxantes e dieta são contraindicados na obstrução mecânica.
 */
import { aproxima, type Caso, type Estado } from './motor';

const MIN = 60;
const H = 60 * MIN;
const feito = (e: Estado, id: string) => e.feito[id] !== undefined;
const ate = (e: Estado, id: string, s: number) => feito(e, id) && e.feito[id] <= s;
const conservador = (e: Estado) => feito(e, 'sng') && feito(e, 'hidratacao');

export const OBSTRUCAO: Caso = {
  id: 'obstrucao-bridas',
  sistema: 'abdome',
  titulo: 'Barriga distendida e vômitos: obstrução intestinal',
  subtitulo: 'Bridas pós-operatórias · conservador × cirurgia',
  local: 'Pronto-socorro',
  paciente: { nome: 'Dona Celina', idade: 68, sexo: 'F', peso: 66 },
  chegada: [
    'Mulher de 68 anos com cólicas abdominais há 2 dias, barriga cada vez mais inchada e vômitos esverdeados. Não elimina gases nem fezes desde ontem.',
    'Fez histerectomia por via abdominal há 10 anos.',
  ],
  triagem: { fc: 104, pas: 118, pad: 72, spo2: 96, fr: 20, dor: 6 },
  inicial: { fc: 104, pas: 118, pad: 72, fr: 20, spo2: 96, temp: 37.2, dor: 6, ritmo: 'sinusal', pulso: true },
  limite: 16 * H,
  velocidade: 60,

  acoes: [
    {
      id: 'exame', rotulo: 'Exame do abdome e pesquisa de hérnias', grupo: 'Avaliação', dur: 5 * MIN,
      fazer: (e, c) => c.log(e.fx.estrangulou
        ? 'Dor contínua e localizada, descompressão dolorosa, febre. Sinais de SOFRIMENTO de alça.'
        : 'Abdome distendido e timpânico, cicatriz infraumbilical, ruídos aumentados com timbre metálico, dor difusa em cólica sem peritonite. Sem hérnias. Toque retal: ampola vazia.', 'resultado'),
    },
    {
      id: 'anamnese', rotulo: 'História: cirurgias, eliminações, vômitos', grupo: 'Avaliação', dur: 5 * MIN,
      fazer: (_e, c) => c.log('"A dor vem e vai, em cólica. Vomitei verde várias vezes. Não solto gases desde ontem." Única cirurgia: histerectomia.', 'fala'),
    },
    { id: 'monitor', rotulo: 'Sinais vitais seriados', grupo: 'Monitorização', dur: 5 * MIN, fazer: e => { e.monitorado = true; } },
    { id: 'acesso', rotulo: 'Acesso venoso periférico', grupo: 'Monitorização', dur: 3 * MIN, fazer: () => {} },
    {
      id: 'sng', rotulo: 'Jejum e sonda nasogástrica aberta (descompressão)', grupo: 'Procedimentos', dur: 10 * MIN,
      fazer: (_e, c) => c.log('Saída de 900 mL de conteúdo esverdeado pela sonda; alívio da náusea.', 'evento'),
    },
    { id: 'sonda', rotulo: 'Sonda vesical (diurese horária)', grupo: 'Monitorização', dur: 10 * MIN, fazer: () => {} },
    {
      id: 'lab', rotulo: 'Eletrólitos, função renal, hemograma, lactato, gasometria', grupo: 'Exames', dur: 5 * MIN, detalhe: 'Resultado em ~40 min',
      fazer: (e, c) => c.resultado({ id: `lab${e.t}`, titulo: 'Laboratório', texto: e.fx.estrangulou ? 'Leucócitos 19.600; lactato 4,4 (isquemia); K 3,3; creatinina 1,5.' : 'K 3,1 (hipocalemia); Na 134; creatinina 1,3; ureia 68 (pré-renal); leucócitos 10.800; lactato 1,6. Alcalose metabólica hipoclorêmica pelos vômitos.' }, 40 * MIN),
      repetivel: true,
    },
    {
      id: 'rx', rotulo: 'Radiografia de abdome (pé e deitado)', grupo: 'Exames', dur: 20 * MIN,
      fazer: (_e, c) => c.resultado({ id: 'rx', titulo: 'Radiografia de abdome', texto: 'Alças de delgado distendidas, centrais, com pregas coniventes ("empilhamento de moedas") e níveis hidroaéreos em degrau; pouco ar no cólon, sem ar no reto. Obstrução de delgado.' }),
    },
    {
      id: 'tc', rotulo: 'Tomografia de abdome com contraste IV', grupo: 'Exames', dur: 60 * MIN,
      fazer: (e, c) => c.resultado({ id: `tc${e.t}`, titulo: 'Tomografia', texto: e.fx.estrangulou ? 'Alça em "olho fechado" com parede sem realce, líquido livre e borramento do mesentério: ESTRANGULAMENTO.' : 'Ponto de transição em íleo distal por brida, sem sinais de isquemia (parede com realce normal, sem líquido livre, sem pneumatose).' }),
      repetivel: true,
    },
    {
      id: 'hidratacao', rotulo: 'Hidratação com cristaloide + reposição de potássio', grupo: 'Medicações', dur: 10 * MIN,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: () => {},
    },
    { id: 'analgesia', rotulo: 'Analgesia (dipirona/opioide) e antiemético', grupo: 'Medicações', dur: 5 * MIN, bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'), fazer: () => {} },
    {
      id: 'gastrografina', rotulo: 'Contraste hidrossolúvel pela sonda (gastrografina) + RX seriado', grupo: 'Medicações', dur: 15 * MIN,
      detalhe: 'Diagnóstico e terapêutico; após descomprimir',
      bloqueio: e => (!feito(e, 'sng') ? 'Descomprima com a sonda antes' : e.fx.estrangulou ? 'Há sinais de estrangulamento: é cirurgia' : null),
      fazer: e => { e.fx.contraste = e.t; },
    },
    {
      id: 'procinetico', rotulo: 'Metoclopramida', grupo: 'Medicações', dur: 5 * MIN,
      fazer: (_e, c) => c.penalizar('Procinético na obstrução mecânica aumenta a dor e o risco de perfuração.', 10),
    },
    {
      id: 'laxante', rotulo: 'Laxante e enema', grupo: 'Medicações', dur: 10 * MIN,
      fazer: (_e, c) => c.penalizar('Laxante e enema são contraindicados na obstrução mecânica de delgado.', 10),
    },
    {
      id: 'cirurgiao', rotulo: 'Avaliação da cirurgia geral e reavaliação seriada', grupo: 'Decisão', dur: 20 * MIN,
      fazer: e => { e.fx.cirurgiaoEm = e.t; },
    },
    {
      id: 'cirurgia', rotulo: 'Laparotomia/laparoscopia de urgência', grupo: 'Procedimentos', dur: 2 * H,
      fazer: (e, c) => {
        if (!e.fx.estrangulou) c.penalizar('Sem sinais de sofrimento de alça, a obstrução por bridas merece tratamento conservador inicial (até ~72 h).', 8);
        const tarde = e.fx.estrangulou !== undefined && e.t - (e.fx.estrangulou as number) > 4 * H;
        c.encerrar('internado', !e.fx.estrangulou ? 'Operada; lise de bridas sem ressecção.' : tarde ? 'Operada tarde: necrose de alça com ressecção extensa.' : 'Operada a tempo: lise de bridas e alça viável após descompressão.');
      },
    },
    {
      id: 'internar', rotulo: 'Internar em tratamento conservador', grupo: 'Decisão', dur: 10 * MIN,
      bloqueio: e => (e.fx.estrangulou ? 'Há sinais de estrangulamento' : null),
      fazer: (e, c) => c.encerrar('internado', e.fx.resolvida ? 'Contraste chegou ao cólon, voltou a eliminar gases: resolução sem cirurgia.' : 'Internada em tratamento conservador, com reavaliação seriada.'),
    },
    { id: 'aguardar', rotulo: 'Reavaliar em 2 horas', grupo: 'Decisão', dur: 2 * H, repetivel: true, fazer: () => {} },
  ],

  tick: (e, dt, c) => {
    const v = e.v;
    // sem descompressão nem hidratação, a alça sofre e estrangula
    if (!e.fx.estrangulou && !conservador(e) && e.t > 6 * H) {
      e.fx.estrangulou = e.t;
      c.log('Dor passou a ser CONTÍNUA, febre, taquicardia: sinais de estrangulamento!', 'alerta');
    }
    if (e.fx.contraste !== undefined && !e.fx.resolvida && e.t - (e.fx.contraste as number) > 8 * H) {
      e.fx.resolvida = true;
      c.log('RX de controle: contraste no cólon em 8 h. Voltou a eliminar gases: obstrução resolvendo.', 'evento');
    }
    if (e.fx.estrangulou !== undefined && e.t - (e.fx.estrangulou as number) > 7 * H && !e.fx.choque) {
      e.fx.choque = true;
      c.log('Choque séptico por necrose e perfuração de alça.', 'alerta');
    }
    if (e.fx.choque && e.t - (e.fx.estrangulou as number) > 9 * H) c.encerrar('obito', 'Óbito por necrose intestinal e choque séptico.');
    const est = e.fx.estrangulou !== undefined;
    const ok = conservador(e);
    v.fc = aproxima(v.fc, e.fx.choque ? 138 : est ? 122 : ok ? 88 : 106, dt, 1800);
    v.pas = aproxima(v.pas, e.fx.choque ? 78 : est ? 108 : 124, dt, 1800);
    v.pad = aproxima(v.pad, v.pas * 0.6, dt, 1800);
    v.temp = aproxima(v.temp, est ? 38.6 : 37.1, dt, 3600);
    v.dor = aproxima(v.dor, est ? 9 : feito(e, 'analgesia') ? 3 : e.fx.resolvida ? 2 : 6, dt, 1800);
    e.quadro = e.fx.choque ? 'Torporosa, abdome em tábua, fria.' : est ? 'Dor contínua, abdome doloroso e tenso, febril.' : e.fx.resolvida ? 'Abdome menos distendido, eliminando gases.' : ok ? 'Mais aliviada com a sonda; abdome ainda distendido.' : 'Distendida, nauseada, cólicas intensas.';
  },

  metas: [
    { id: 'clinica', texto: 'História e exame (cirurgia prévia, parada de eliminações, hérnias)', peso: 10, dica: 'Bridas são a principal causa de obstrução de delgado; procure hérnias encarceradas.', avaliar: e => ({ ok: feito(e, 'anamnese') && feito(e, 'exame') }) },
    { id: 'sng', texto: 'Jejum e SNG descompressiva em até 1 h', peso: 20, dica: 'Descomprime, alivia vômitos e reduz o risco de aspiração.', avaliar: e => ({ ok: ate(e, 'sng', 1 * H) }) },
    { id: 'hid', texto: 'Hidratação e reposição de potássio em até 1 h', peso: 15, dica: 'Perdas para o terceiro espaço e vômitos: hipovolemia, hipocalemia, alcalose.', avaliar: e => ({ ok: ate(e, 'hidratacao', 1 * H) }) },
    { id: 'dor', texto: 'Analgesia e antiemético', peso: 5, dica: 'Conforto sem atrasar a avaliação.', avaliar: e => ({ ok: feito(e, 'analgesia') }) },
    { id: 'imagem', texto: 'RX e TC para procurar sinais de sofrimento', peso: 15, dica: 'TC: ponto de transição e sinais de isquemia (realce, líquido livre, pneumatose).', avaliar: e => ({ ok: feito(e, 'rx') && feito(e, 'tc') }) },
    { id: 'lab', texto: 'Eletrólitos e lactato', peso: 5, dica: 'Lactato alto sugere isquemia.', avaliar: e => ({ ok: feito(e, 'lab') }) },
    {
      id: 'conduta', texto: 'Conduta certa: contraste hidrossolúvel (sem sofrimento) ou cirurgia (com estrangulamento)', peso: 20, dica: 'Sem sinais de estrangulamento: conservador com gastrografina; com sinais: cirurgia sem demora.',
      avaliar: e => ({ ok: e.fx.estrangulou ? feito(e, 'cirurgia') && e.feito.cirurgia - (e.fx.estrangulou as number) <= 4 * H : feito(e, 'gastrografina') }),
    },
    { id: 'cirurgiao', texto: 'Avaliação da cirurgia e reavaliação seriada', peso: 10, dica: 'Todo paciente com obstrução precisa do cirurgião desde o início.', avaliar: e => ({ ok: feito(e, 'cirurgiao') }) },
  ],

  ensino: [
    'Obstrução de delgado: dor em cólica, distensão, vômitos e parada de eliminação de gases e fezes. Bridas são a principal causa.',
    'Sem sinais de sofrimento: jejum, SNG, hidratação, eletrólitos e contraste hidrossolúvel (se chegar ao cólon em 24 h, prediz resolução).',
    'Sinais de estrangulamento: dor contínua, febre, taquicardia, peritonite, leucocitose, lactato alto, TC com isquemia → cirurgia.',
    'Procinéticos, laxantes e enema são contraindicados na obstrução mecânica.',
    'Conservador por até ~72 h; sem melhora, cirurgia.',
  ],
};
