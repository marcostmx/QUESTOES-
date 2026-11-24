/**
 * Caso vivo: pneumotórax hipertensivo pós-trauma (ATLS 10ª ed.).
 * Diagnóstico CLÍNICO: não esperar radiografia. Descompressão imediata com agulha/cateter
 * calibroso no 4º–5º espaço intercostal, anterior à linha axilar média (adulto),
 * seguida de drenagem torácica no "triângulo de segurança" (5º EIC). O₂ e reavaliação.
 * A agulha pode dobrar/obstruir: o pneumotórax recidiva se não drenar.
 */
import { aproxima, type Caso, type Estado } from './motor';

const MIN = 60;
const feito = (e: Estado, id: string) => e.feito[id] !== undefined;
const ate = (e: Estado, id: string, s: number) => feito(e, id) && e.feito[id] <= s;
/** tensão ativa no tórax? */
const tenso = (e: Estado) => !e.fx.dreno && (e.fx.descomp === undefined || e.fx.recidiva === true);

export const PNEUMOTORAX: Caso = {
  id: 'pneumotorax-hipertensivo',
  sistema: 'respiratorio',
  titulo: 'Trauma de tórax: pneumotórax hipertensivo',
  subtitulo: 'Diagnóstico clínico · descompressão e drenagem',
  local: 'Sala de trauma',
  paciente: { nome: 'Diego', idade: 22, sexo: 'M', peso: 72 },
  chegada: [
    'Motociclista de 22 anos, colisão contra um carro. Trazido pelo SAMU com colar cervical e prancha, muito agitado, com dor no hemitórax direito e falta de ar que piora a cada minuto.',
  ],
  triagem: { fc: 132, pas: 84, pad: 56, spo2: 84, fr: 36, dor: 9 },
  inicial: { fc: 132, pas: 84, pad: 56, fr: 36, spo2: 84, temp: 36.1, dor: 9, ritmo: 'sinusal', pulso: true },
  limite: 40 * MIN,
  velocidade: 2,

  acoes: [
    {
      id: 'abcde', rotulo: 'Avaliação primária (ABCDE) com foco no B', grupo: 'Avaliação', dur: 45,
      fazer: (e, c) => c.log(tenso(e)
        ? 'A: fala com dificuldade, via aérea pérvia. B: turgência jugular, hemitórax direito hipoexpandido, MURMÚRIO VESICULAR ABOLIDO e hipertimpanismo à direita, traqueia desviada para a esquerda. C: pulsos finos, PA 84/56. Hipótese: PNEUMOTÓRAX HIPERTENSIVO à direita.'
        : 'B: murmúrio vesicular presente bilateralmente, dreno oscilando. C: pulsos cheios.', 'resultado'),
    },
    { id: 'colar', rotulo: 'Manter restrição da coluna cervical', grupo: 'Avaliação', dur: 10, fazer: () => {} },
    { id: 'o2', rotulo: 'O₂ por máscara com reservatório 15 L/min', grupo: 'Monitorização', dur: 15, fazer: e => { e.fx.o2 = true; } },
    { id: 'monitor', rotulo: 'Monitor cardíaco', grupo: 'Monitorização', dur: 20, fazer: e => { e.monitorado = true; } },
    { id: 'oximetro', rotulo: 'Oxímetro de pulso', grupo: 'Monitorização', dur: 10, fazer: () => {} },
    { id: 'acesso', rotulo: 'Dois acessos venosos calibrosos + coleta', grupo: 'Monitorização', dur: 90, fazer: () => {} },
    {
      id: 'descompD', rotulo: 'Descompressão com cateter 14G: 4º–5º EIC à DIREITA, anterior à linha axilar média', grupo: 'Procedimentos', dur: 30,
      fazer: (e, c) => {
        e.fx.descomp = e.t;
        e.fx.recidiva = false;
        c.log('Saída de ar sob pressão pelo cateter! Melhora imediata da PA e da saturação.', 'evento');
      },
    },
    {
      id: 'descompE', rotulo: 'Descompressão com cateter 14G à ESQUERDA', grupo: 'Procedimentos', dur: 30,
      fazer: (_e, c) => c.penalizar('Descompressão do lado errado: o murmúrio está abolido à direita (a traqueia desvia para o lado oposto ao pneumotórax). Pode criar um pneumotórax iatrogênico.', 15),
    },
    {
      id: 'dreno', rotulo: 'Drenagem torácica à direita (5º EIC, triângulo de segurança, selo d\'água)', grupo: 'Procedimentos', dur: 6 * MIN,
      detalhe: 'Tratamento definitivo; anestesia local',
      fazer: (e, c) => {
        e.fx.dreno = true;
        c.log('Dreno 28 Fr no 5º EIC na linha axilar média, borbulhando e oscilando no selo d\'água.', 'evento');
      },
    },
    {
      id: 'iot', rotulo: 'Intubação e ventilação com pressão positiva', grupo: 'Procedimentos', dur: 4 * MIN,
      fazer: (e, c) => {
        if (tenso(e)) {
          c.penalizar('Ventilação com pressão positiva antes de descomprimir piora o pneumotórax hipertensivo e precipita a parada.', 15);
          e.fx.piorou = true;
        } else c.penalizar('Intubação sem indicação: paciente consciente e oxigenando após a descompressão.', 5);
      },
    },
    {
      id: 'rx', rotulo: 'Radiografia de tórax no leito', grupo: 'Exames', dur: 5 * MIN, repetivel: true,
      fazer: (e, c) => {
        if (tenso(e) && e.fx.descomp === undefined) c.penalizar('Radiografia antes da descompressão: o pneumotórax hipertensivo é diagnóstico clínico; o atraso pode ser fatal.', 15);
        c.resultado({
          id: `rx${e.t}`, titulo: 'Radiografia de tórax',
          texto: e.fx.dreno ? 'Pulmão direito expandido, dreno bem posicionado; fratura de 5º e 6º arcos costais à direita.' : 'Hipertransparência sem trama vascular à direita, colapso pulmonar, desvio do mediastino para a esquerda.',
        });
      },
    },
    { id: 'efast', rotulo: 'E-FAST (ultrassom no trauma)', grupo: 'Exames', dur: 2 * MIN, fazer: (e, c) => c.resultado({ id: 'efast', titulo: 'E-FAST', texto: e.fx.dreno ? 'Deslizamento pleural presente à direita após a drenagem; sem líquido livre no abdome nem derrame pericárdico.' : 'Ausência de deslizamento pleural e ponto pulmonar à direita (pneumotórax). Sem líquido livre no abdome; sem derrame pericárdico.' }) },
    { id: 'analgesia', rotulo: 'Analgesia (morfina ou fentanil IV)', grupo: 'Medicações', dur: 30, bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'), fazer: () => {} },
    {
      id: 'volume', rotulo: 'Cristaloide 1 L aquecido', grupo: 'Medicações', dur: 60,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: () => {},
    },
    {
      id: 'centro', rotulo: 'Encaminhar para tomografia e avaliação da cirurgia', grupo: 'Decisão', dur: 30,
      bloqueio: e => (tenso(e) ? 'Paciente instável: resolva o B primeiro' : null),
      fazer: (e, c) => c.encerrar('internado', e.fx.dreno ? 'Estável, drenado, segue para tomografia e cirurgia torácica.' : 'Segue para a tomografia só com o cateter: risco de recidiva no trajeto.'),
    },
    { id: 'aguardar', rotulo: 'Reavaliar em 1 minuto', grupo: 'Decisão', dur: 60, repetivel: true, fazer: () => {} },
  ],

  tick: (e, dt, c) => {
    const v = e.v;
    if (!v.pulso) {
      if (e.fx.descomp !== undefined && !e.fx.recidiva && e.t - (e.fx.pcrEm as number) < 3 * MIN) {
        Object.assign(v, { pulso: true, fc: 120, pas: 96, pad: 60, spo2: 88, fr: 28 });
        c.log('Após a descompressão, retorno da circulação!', 'evento');
      } else {
        if (e.t - (e.fx.pcrEm as number) > 3 * MIN) c.encerrar('obito', 'Parada em AESP por pneumotórax hipertensivo não descomprimido.');
        e.quadro = 'Sem pulso: AESP.';
        return;
      }
    }
    // a agulha obstrui ~8 min depois se não drenar
    if (e.fx.descomp !== undefined && !e.fx.dreno && !e.fx.recidiva && e.t - (e.fx.descomp as number) > 8 * MIN) {
      e.fx.recidiva = true;
      e.fx.recidivaEm = e.t;
      c.log('O cateter dobrou: dispneia, hipotensão e turgência jugular voltam. Recidiva da tensão!', 'alerta');
    }
    const t = tenso(e);
    const tempoTenso = t ? (e.fx.recidiva ? e.t - (e.fx.recidivaEm as number) : e.t) : 0;
    if (t && (tempoTenso > (e.fx.piorou ? 3 : 8) * MIN)) {
      e.fx.pcrEm = e.t;
      Object.assign(v, { pulso: false, pas: 0, pad: 0, spo2: 0, fr: 0 });
      c.log('O paciente perde o pulso: atividade elétrica sem pulso (AESP).', 'alerta');
      return;
    }
    const piora = t ? Math.min(1, tempoTenso / (8 * MIN)) : 0;
    v.spo2 = aproxima(v.spo2, t ? 84 - piora * 12 + (e.fx.o2 ? 2 : 0) : e.fx.o2 ? 97 : 94, dt, 30);
    v.pas = aproxima(v.pas, t ? 84 - piora * 22 : 118, dt, 40);
    v.pad = aproxima(v.pad, v.pas * 0.64, dt, 40);
    v.fc = aproxima(v.fc, t ? 132 + piora * 16 : feito(e, 'analgesia') ? 96 : 108, dt, 40);
    v.fr = aproxima(v.fr, t ? 36 : 22, dt, 40);
    v.dor = aproxima(v.dor, feito(e, 'analgesia') ? 3 : 8, dt, 60);
    e.quadro = t ? (piora > 0.6 ? 'Cianótico, rebaixado, turgência jugular, pulsos quase impalpáveis.' : 'Agitado, muito dispneico, turgência jugular.') : 'Respirando melhor, mais tranquilo.';
  },

  metas: [
    { id: 'abcde', texto: 'Avaliação primária focada no B em até 2 min', peso: 10, dica: 'Jugulares, expansibilidade, ausculta, percussão e traqueia.', avaliar: e => ({ ok: ate(e, 'abcde', 2 * MIN) }) },
    { id: 'o2', texto: 'O₂ em alto fluxo', peso: 5, dica: 'Máscara com reservatório a 15 L/min no trauma grave.', avaliar: e => ({ ok: feito(e, 'o2') }) },
    { id: 'clinico', texto: 'Não esperar radiografia para descomprimir', peso: 15, dica: 'Pneumotórax hipertensivo é diagnóstico clínico.', avaliar: e => ({ ok: feito(e, 'descompD') && (!feito(e, 'rx') || e.feito.descompD < e.feito.rx) }) },
    { id: 'descomp', texto: 'Descompressão do lado certo em até 5 min', peso: 30, dica: 'Lado do murmúrio abolido e do hipertimpanismo; traqueia desvia para o lado oposto.', avaliar: e => ({ ok: ate(e, 'descompD', 5 * MIN), nota: feito(e, 'descompD') ? `aos ${Math.round(e.feito.descompD / 60)} min` : 'não feita' }) },
    { id: 'dreno', texto: 'Drenagem torácica (tratamento definitivo)', peso: 20, dica: '5º EIC, entre as linhas axilares anterior e média.', avaliar: e => ({ ok: feito(e, 'dreno') }) },
    { id: 'acesso', texto: 'Acessos calibrosos e analgesia', peso: 10, dica: 'Dois acessos calibrosos; analgesia melhora a ventilação.', avaliar: e => ({ ok: feito(e, 'acesso') && feito(e, 'analgesia') }) },
    { id: 'controle', texto: 'Reavaliar após a drenagem (RX ou E-FAST)', peso: 10, dica: 'Confirmar a expansão e a posição do dreno.', avaliar: e => ({ ok: (feito(e, 'rx') && (e.fx.dreno === true)) || feito(e, 'efast') }) },
  ],

  ensino: [
    'Pneumotórax hipertensivo: dispneia, hipotensão, turgência jugular, murmúrio abolido, hipertimpanismo e desvio da traqueia (tardio). O diagnóstico é clínico.',
    'Descompressão imediata no adulto: 4º–5º EIC, anterior à linha axilar média (ATLS 10ª ed.). Em crianças, 2º EIC na linha hemiclavicular.',
    'A agulha é ponte: drenagem torácica no 5º EIC (triângulo de segurança) é o tratamento definitivo.',
    'Ventilação com pressão positiva antes de descomprimir piora a tensão.',
    'Depois do B, siga o ABCDE: C (choque hemorrágico?), D e E.',
  ],
};
