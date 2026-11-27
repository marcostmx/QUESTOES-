/**
 * Caso vivo: colangite aguda grave (Tokyo Guidelines 2018, grau III).
 * Tríade de Charcot (febre, icterícia, dor em hipocôndrio direito) + choque e confusão (pêntade de
 * Reynolds). Hemoculturas, antibiótico em até 1 h (cobrir gram-negativos e anaeróbios), cristaloide,
 * noradrenalina, ultrassom (dilatação de vias biliares) e DRENAGEM BILIAR urgente (CPRE) assim que
 * houver suporte hemodinâmico. Colecistectomia não é a conduta da fase aguda da colangite.
 */
import { aproxima, type Caso, type Estado } from './motor';

const MIN = 60;
const feito = (e: Estado, id: string) => e.feito[id] !== undefined;
const ate = (e: Estado, id: string, s: number) => feito(e, id) && e.feito[id] <= s;
const g = (e: Estado) => (e.fx.grav as number) ?? 0.5;

export const COLANGITE: Caso = {
  id: 'colangite-grave',
  sistema: 'abdome',
  titulo: 'Febre, icterícia e confusão: colangite aguda grave',
  subtitulo: 'Pêntade de Reynolds · antibiótico e drenagem biliar urgente',
  local: 'Sala de emergência',
  paciente: { nome: 'Dona Zilda', idade: 74, sexo: 'F', peso: 62 },
  chegada: [
    'Mulher de 74 anos com dor no lado direito da barriga há 2 dias, febre com calafrios e "olhos amarelos" desde ontem. Hoje está confusa.',
    'Tem "pedra na vesícula" conhecida, sem cirurgia.',
  ],
  triagem: { fc: 118, pas: 84, pad: 48, spo2: 94, fr: 24, dor: 6 },
  inicial: { fc: 118, pas: 84, pad: 48, fr: 24, spo2: 94, temp: 39.1, dor: 6, ritmo: 'sinusal', pulso: true },
  limite: 180 * MIN,
  velocidade: 12,

  acoes: [
    {
      id: 'exame', rotulo: 'Exame físico dirigido', grupo: 'Avaliação', dur: 2 * MIN,
      fazer: (_e, c) => c.log('Desorientada, ictérica (++/4+), febril, extremidades frias. Dor à palpação do hipocôndrio direito, sem peritonite. Tríade de Charcot + hipotensão + confusão = PÊNTADE DE REYNOLDS.', 'resultado'),
    },
    {
      id: 'tokyo', rotulo: 'Classificar a gravidade (Tokyo 2018)', grupo: 'Avaliação', dur: 60,
      fazer: (e, c) => c.log(feito(e, 'lab') ? 'Grau III (grave): disfunção cardiovascular (precisa de vasopressor/hipotensão), neurológica (confusão) e renal (creatinina 2,3). Drenagem biliar urgente assim que houver suporte.' : 'Clinicamente grau III (hipotensão e confusão); confirme as disfunções com os exames.', 'resultado'),
    },
    { id: 'monitor', rotulo: 'Monitor cardíaco', grupo: 'Monitorização', dur: 30, fazer: e => { e.monitorado = true; } },
    { id: 'oximetro', rotulo: 'Oxímetro de pulso', grupo: 'Monitorização', dur: 15, fazer: () => {} },
    { id: 'acesso', rotulo: 'Dois acessos venosos periféricos', grupo: 'Monitorização', dur: 2 * MIN, fazer: () => {} },
    { id: 'o2', rotulo: 'O₂ por cateter nasal', grupo: 'Procedimentos', dur: 30, fazer: e => { e.fx.o2 = true; } },
    {
      id: 'hemocultura', rotulo: 'Hemoculturas (2 amostras)', grupo: 'Exames', dur: 4 * MIN,
      fazer: (_e, c) => c.resultado({ id: 'hemo', titulo: 'Hemoculturas', texto: 'Escherichia coli sensível a piperacilina-tazobactam.' }, 150 * MIN),
    },
    {
      id: 'lab', rotulo: 'Hemograma, bilirrubinas, enzimas canaliculares, função renal, lactato', grupo: 'Exames', dur: 2 * MIN, detalhe: 'Resultado em ~30 min',
      fazer: (_e, c) => c.resultado({ id: 'lab', titulo: 'Laboratório', texto: 'Leucócitos 19.800; bilirrubina total 6,2 (direta 5,1); FA e GGT muito elevadas; TGO/TGP 3× o normal; creatinina 2,3; lactato 4,1; plaquetas 96 mil.' }, 30 * MIN),
    },
    {
      id: 'usg', rotulo: 'Ultrassom de abdome à beira-leito', grupo: 'Exames', dur: 10 * MIN,
      fazer: (_e, c) => c.resultado({ id: 'usg', titulo: 'Ultrassom', texto: 'Colédoco dilatado (14 mm) com cálculo distal; vias biliares intra-hepáticas dilatadas; vesícula com cálculos, sem espessamento.' }),
    },
    {
      id: 'atb', rotulo: 'Piperacilina-tazobactam 4,5 g IV', grupo: 'Medicações', dur: 5 * MIN,
      detalhe: 'Gram-negativos e anaeróbios',
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: e => { e.fx.atb = e.t; },
    },
    {
      id: 'volume', rotulo: 'Ringer lactato 30 mL/kg (~1,9 L)', grupo: 'Medicações', dur: 15 * MIN,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: e => { e.fx.volume = e.t; },
    },
    {
      id: 'nora', rotulo: 'Noradrenalina (alvo PAM ≥ 65)', grupo: 'Medicações', dur: 3 * MIN,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: e => { e.fx.nora = e.t; },
    },
    { id: 'analgesia', rotulo: 'Analgesia (dipirona/opioide)', grupo: 'Medicações', dur: 30, bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'), fazer: () => {} },
    {
      id: 'cpre', rotulo: 'CPRE com papilotomia e drenagem biliar', grupo: 'Procedimentos', dur: 40 * MIN,
      bloqueio: e => (!feito(e, 'usg') ? 'Confirme a obstrução biliar (ultrassom)' : e.fx.atb === undefined ? 'Inicie o antibiótico antes' : null),
      fazer: (e, c) => {
        if (e.fx.nora === undefined && e.v.pas < 90) c.penalizar('CPRE sem suporte hemodinâmico em paciente chocada: estabilize antes (volume e vasopressor).', 8);
        e.fx.drenado = e.t;
        c.resultado({ id: 'cpre', titulo: 'CPRE', texto: 'Saída de bile purulenta sob pressão; papilotomia e extração do cálculo; prótese biliar.' });
      },
    },
    {
      id: 'cirurgia', rotulo: 'Colecistectomia de urgência', grupo: 'Procedimentos', dur: 60 * MIN,
      fazer: (_e, c) => c.penalizar('Colecistectomia não drena o colédoco e é arriscada na colangite grave: a drenagem é endoscópica (CPRE). A vesícula fica para depois.', 15),
    },
    {
      id: 'uti', rotulo: 'Internar na UTI', grupo: 'Decisão', dur: 2 * MIN,
      fazer: (e, c) => c.encerrar('internado', e.fx.drenado ? 'Via biliar drenada; segue na UTI com antibiótico. Colecistectomia na mesma internação, após recuperar.' : 'Segue na UTI sem drenagem biliar: o foco infeccioso continua.'),
    },
    { id: 'aguardar', rotulo: 'Reavaliar em 10 minutos', grupo: 'Decisão', dur: 10 * MIN, repetivel: true, fazer: () => {} },
  ],

  tick: (e, dt, c) => {
    const v = e.v;
    if (!v.pulso) {
      if (e.t - (e.fx.pcrEm as number) > 4 * MIN) c.encerrar('obito', 'Óbito por choque séptico de foco biliar.');
      e.quadro = 'Sem pulso.';
      return;
    }
    let s = g(e);
    const atb = e.fx.atb !== undefined;
    const drenado = e.fx.drenado !== undefined && e.t - (e.fx.drenado as number) > 20 * MIN;
    // sem drenagem, o antibiótico só segura por um tempo (foco obstruído)
    const taxa = drenado ? -0.008 : atb ? (e.t - (e.fx.atb as number) > 60 * MIN ? 0.007 : 0) : 0.006;
    s += (taxa / 60) * dt;
    if (e.fx.volume !== undefined && e.t - (e.fx.volume as number) > 10 * MIN) s -= (0.0012 / 60) * dt;
    s = Math.max(0.05, Math.min(1, s));
    e.fx.grav = s;
    const vol = e.fx.volume !== undefined && e.t - (e.fx.volume as number) > 5 * MIN ? 1 : 0;
    const nora = e.fx.nora !== undefined ? 1 : 0;
    const pamAlvo = 80 - s * 38 + vol * 6 + nora * 12;
    if (pamAlvo < 45) {
      e.fx.pcrEm = e.t;
      Object.assign(v, { pulso: false, pas: 0, pad: 0, spo2: 0, fr: 0 });
      c.log('Parada em AESP por choque séptico.', 'alerta');
      return;
    }
    const pas = pamAlvo * 1.42;
    v.pas = aproxima(v.pas, pas, dt, 180);
    v.pad = aproxima(v.pad, (3 * pamAlvo - pas) / 2, dt, 180);
    v.fc = aproxima(v.fc, 84 + s * 50, dt, 180);
    v.temp = aproxima(v.temp, atb ? 37.6 : 39.4, dt, 2400);
    v.spo2 = aproxima(v.spo2, (e.fx.o2 ? 97 : 93) - s * 2, dt, 120);
    v.fr = aproxima(v.fr, 16 + s * 14, dt, 180);
    v.dor = aproxima(v.dor, feito(e, 'analgesia') ? 2 : 6, dt, 300);
    e.quadro = s > 0.7 ? 'Torporosa, ictérica, pele fria e marmórea.' : s > 0.4 ? 'Confusa, ictérica, febril.' : 'Mais desperta, febre cedendo.';
  },

  metas: [
    { id: 'reconhecer', texto: 'Reconhecer a pêntade de Reynolds', peso: 10, dica: 'Febre, icterícia, dor em HD + hipotensão + confusão.', avaliar: e => ({ ok: ate(e, 'exame', 10 * MIN) }) },
    { id: 'culturas', texto: 'Hemoculturas antes do antibiótico', peso: 5, dica: 'Sem atrasar o antibiótico.', avaliar: e => ({ ok: feito(e, 'hemocultura') && (!feito(e, 'atb') || e.feito.hemocultura <= e.feito.atb) }) },
    { id: 'atb', texto: 'Antibiótico em até 1 hora', peso: 20, dica: 'Choque séptico: antibiótico na 1ª hora (pip-tazo, ou ceftriaxona + metronidazol).', avaliar: e => ({ ok: ate(e, 'atb', 60 * MIN), nota: feito(e, 'atb') ? `aos ${Math.round(e.feito.atb / 60)} min` : 'não feito' }) },
    { id: 'volume', texto: 'Cristaloide 30 mL/kg', peso: 10, dica: 'Hipotensão: 30 mL/kg nas primeiras horas.', avaliar: e => ({ ok: feito(e, 'volume') }) },
    { id: 'nora', texto: 'Noradrenalina para PAM ≥ 65', peso: 10, dica: 'Hipotensão persistente após o volume.', avaliar: e => ({ ok: feito(e, 'nora') }) },
    { id: 'usg', texto: 'Ultrassom para confirmar obstrução biliar', peso: 10, dica: 'Dilatação de vias biliares e cálculo no colédoco.', avaliar: e => ({ ok: feito(e, 'usg') }) },
    { id: 'tokyo', texto: 'Classificar a gravidade (Tokyo)', peso: 5, dica: 'Grau III = disfunção orgânica: drenagem urgente.', avaliar: e => ({ ok: feito(e, 'tokyo') }) },
    { id: 'cpre', texto: 'Drenagem biliar urgente (CPRE)', peso: 20, dica: 'Sem drenagem, o antibiótico sozinho não controla o foco.', avaliar: e => ({ ok: feito(e, 'cpre') }) },
    { id: 'uti', texto: 'Internar na UTI', peso: 10, dica: 'Colangite grau III: UTI.', avaliar: e => ({ ok: feito(e, 'uti') }) },
  ],

  ensino: [
    'Tríade de Charcot: febre, icterícia e dor em hipocôndrio direito. Pêntade de Reynolds: + hipotensão e confusão (colangite grave).',
    'Tokyo 2018: grau III (disfunção orgânica) → drenagem biliar urgente com suporte; grau II → drenagem precoce; grau I → antibiótico e drenagem se não melhorar.',
    'Antibiótico na 1ª hora cobrindo gram-negativos e anaeróbios; hemoculturas antes, sem atrasar.',
    'A drenagem de escolha é endoscópica (CPRE); a colecistectomia fica para depois, na mesma internação.',
    'Sem drenagem, o antibiótico sozinho não controla uma via biliar obstruída e infectada.',
  ],
};
