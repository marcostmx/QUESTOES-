/**
 * Caso vivo: pneumonia comunitária grave com choque séptico (Surviving Sepsis Campaign / ILAS).
 * Pacote da 1ª hora: lactato, hemoculturas antes do antibiótico (sem atrasá-lo), antibiótico de amplo
 * espectro em até 1 h, cristaloide 30 mL/kg se hipotensão ou lactato ≥ 4, noradrenalina se PAM < 65
 * apesar do volume, O₂ e reavaliação do lactato. CURB-65 ≥ 3: UTI.
 */
import { aproxima, type Caso, type Estado } from './motor';

const MIN = 60;
const feito = (e: Estado, id: string) => e.feito[id] !== undefined;
const ate = (e: Estado, id: string, s: number) => feito(e, id) && e.feito[id] <= s;
const gravidade = (e: Estado) => (e.fx.grav as number) ?? 0.5;
const pam = (e: Estado) => (e.v.pas + 2 * e.v.pad) / 3;

export const SEPSE: Caso = {
  id: 'pneumonia-sepse',
  sistema: 'respiratorio',
  titulo: 'Febre, tosse e hipotensão: pneumonia com choque séptico',
  subtitulo: 'Pacote da 1ª hora da sepse',
  local: 'Sala de emergência',
  paciente: { nome: 'Sr. Benedito', idade: 72, sexo: 'M', peso: 70 },
  chegada: [
    'Homem de 72 anos com tosse produtiva, febre e falta de ar há 4 dias. Hoje ficou confuso e quase não urinou.',
    'Diabético e hipertenso.',
  ],
  triagem: { fc: 118, pas: 86, pad: 48, spo2: 89, fr: 28, dor: 0 },
  inicial: { fc: 118, pas: 86, pad: 48, fr: 28, spo2: 89, temp: 38.9, dor: 0, ritmo: 'sinusal', pulso: true },
  limite: 120 * MIN,
  velocidade: 12,

  acoes: [
    {
      id: 'exame', rotulo: 'Exame físico e foco infeccioso', grupo: 'Avaliação', dur: 2 * MIN,
      fazer: (_e, c) => c.log('Confuso (desorientado no tempo), mucosas secas, extremidades frias com livedo em joelhos, enchimento capilar 5 s. Estertores crepitantes e sopro tubário em base direita. qSOFA 3 (confusão, FR ≥ 22, PAS ≤ 100).', 'resultado'),
    },
    {
      id: 'curb', rotulo: 'Calcular o CURB-65', grupo: 'Avaliação', dur: 30,
      fazer: (e, c) => c.log(feito(e, 'lab') ? 'CURB-65 = 4 (Confusão, Ureia > 50, PA baixa, idade ≥ 65): pneumonia grave → UTI.' : 'Faltam a ureia; sem ela, CRB-65 = 3 (confusão, PA, idade): pneumonia grave.', 'resultado'),
    },
    { id: 'monitor', rotulo: 'Monitor cardíaco', grupo: 'Monitorização', dur: 30, fazer: e => { e.monitorado = true; } },
    { id: 'oximetro', rotulo: 'Oxímetro de pulso', grupo: 'Monitorização', dur: 15, fazer: () => {} },
    { id: 'acesso', rotulo: 'Dois acessos venosos periféricos', grupo: 'Monitorização', dur: 2 * MIN, fazer: () => {} },
    { id: 'sonda', rotulo: 'Sonda vesical para débito urinário', grupo: 'Monitorização', dur: 5 * MIN, fazer: () => {} },
    { id: 'o2', rotulo: 'O₂ por cateter nasal (alvo SpO₂ 92–96%)', grupo: 'Procedimentos', dur: 30, fazer: e => { e.fx.o2 = true; } },
    {
      id: 'lactato', rotulo: 'Lactato arterial', grupo: 'Exames', dur: 2 * MIN, repetivel: true,
      fazer: (e, c) => {
        const l = Math.max(1.1, 1 + gravidade(e) * 6.4);
        c.resultado({ id: `lac${e.t}`, titulo: 'Lactato', texto: `${l.toFixed(1).replace('.', ',')} mmol/L${l >= 4 ? ' (≥ 4: hipoperfusão grave)' : l >= 2 ? ' (elevado)' : ' (normalizado)'}.` });
        e.fx.lacN = ((e.fx.lacN as number) ?? 0) + 1;
      },
    },
    {
      id: 'hemocultura', rotulo: 'Hemoculturas (2 amostras) e escarro', grupo: 'Exames', dur: 4 * MIN,
      detalhe: 'Antes do antibiótico, sem atrasá-lo',
      fazer: (_e, c) => c.resultado({ id: 'hemo', titulo: 'Hemoculturas', texto: 'Resultado em 48 h: Streptococcus pneumoniae sensível à ceftriaxona.' }, 100 * MIN),
    },
    {
      id: 'lab', rotulo: 'Hemograma, ureia, creatinina, bilirrubinas, plaquetas, gasometria', grupo: 'Exames', dur: 2 * MIN, detalhe: 'Resultado em ~30 min',
      fazer: (_e, c) => c.resultado({ id: 'lab', titulo: 'Laboratório', texto: 'Leucócitos 21.400 (desvio à esquerda); ureia 78; creatinina 2,1; plaquetas 118 mil; bilirrubina 1,4. Gasometria: acidose metabólica (HCO₃ 16). Disfunção renal e hematológica (SOFA ≥ 2).' }, 30 * MIN),
    },
    { id: 'rx', rotulo: 'Radiografia de tórax no leito', grupo: 'Exames', dur: 10 * MIN, fazer: (_e, c) => c.resultado({ id: 'rx', titulo: 'Radiografia de tórax', texto: 'Consolidação em lobo inferior direito com broncograma aéreo.' }) },
    {
      id: 'atb', rotulo: 'Ceftriaxona 2 g IV + azitromicina 500 mg IV', grupo: 'Medicações', dur: 5 * MIN,
      detalhe: 'Pneumonia comunitária grave',
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: e => { e.fx.atb = e.t; },
    },
    {
      id: 'volume', rotulo: 'Ringer lactato 30 mL/kg (~2 L) em bolus', grupo: 'Medicações', dur: 15 * MIN,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: e => { e.fx.volume = e.t; },
    },
    {
      id: 'nora', rotulo: 'Noradrenalina em bomba (alvo PAM ≥ 65)', grupo: 'Medicações', dur: 3 * MIN,
      detalhe: 'Pode iniciar em veia periférica calibrosa',
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (e, c) => {
        if (!feito(e, 'volume')) c.penalizar('Vasopressor sem nenhuma reposição volêmica: primeiro o cristaloide (ou junto, se PAM muito baixa).', 5);
        e.fx.nora = e.t;
      },
    },
    {
      id: 'dopamina', rotulo: 'Dopamina em bomba', grupo: 'Medicações', dur: 3 * MIN,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (e, c) => { c.penalizar('Dopamina tem mais arritmias que a noradrenalina; a noradrenalina é o vasopressor de primeira escolha.', 8); e.fx.nora = e.t; },
    },
    {
      id: 'amido', rotulo: 'Hidroxietilamido (coloide sintético)', grupo: 'Medicações', dur: 15 * MIN,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (_e, c) => c.penalizar('Amidos sintéticos aumentam lesão renal e mortalidade na sepse: contraindicados.', 12),
    },
    {
      id: 'hidrocortisona', rotulo: 'Hidrocortisona 200 mg/dia', grupo: 'Medicações', dur: 60,
      bloqueio: e => (feito(e, 'acesso') ? null : 'Precisa de acesso venoso'),
      fazer: (e, c) => { if (!feito(e, 'nora')) c.penalizar('Hidrocortisona só no choque que precisa de vasopressor (dose de noradrenalina em ascensão).', 5); },
    },
    {
      id: 'uti', rotulo: 'Internar na UTI', grupo: 'Decisão', dur: 2 * MIN,
      fazer: (e, c) => c.encerrar('internado', pam(e) >= 65 ? 'Choque séptico em ressuscitação, PAM ≥ 65; segue para a UTI.' : 'Segue para a UTI ainda hipotenso.'),
    },
    { id: 'aguardar', rotulo: 'Reavaliar em 10 minutos', grupo: 'Decisão', dur: 10 * MIN, repetivel: true, fazer: () => {} },
  ],

  tick: (e, dt, c) => {
    const v = e.v;
    if (!v.pulso) {
      if (e.t - (e.fx.pcrEm as number) > 4 * MIN) c.encerrar('obito', 'Óbito por choque séptico refratário.');
      e.quadro = 'Sem pulso.';
      return;
    }
    let g = gravidade(e);
    const atb = e.fx.atb !== undefined;
    g += ((atb ? (e.t - (e.fx.atb as number) > 30 * MIN ? -0.004 : 0) : 0.007) / 60) * dt;
    if (e.fx.volume !== undefined && e.t - (e.fx.volume as number) > 10 * MIN) g -= (0.0015 / 60) * dt;
    if (e.fx.nora !== undefined) g -= (0.001 / 60) * dt;
    g = Math.max(0.05, Math.min(1, g));
    e.fx.grav = g;
    const volume = e.fx.volume !== undefined && e.t - (e.fx.volume as number) > 5 * MIN ? 1 : 0;
    const nora = e.fx.nora !== undefined ? 1 : 0;
    const pamAlvo = 78 - g * 34 + volume * 7 + nora * 12;
    if (pamAlvo < 45 && !e.fx.pcrEm) {
      e.fx.pcrEm = e.t;
      Object.assign(v, { pulso: false, ritmo: 'sinusal', pas: 0, pad: 0, spo2: 0, fr: 0 });
      c.log('Parada cardiorrespiratória em AESP por choque refratário.', 'alerta');
      return;
    }
    const pasAlvo = pamAlvo * 1.42;
    v.pas = aproxima(v.pas, pasAlvo, dt, 180);
    v.pad = aproxima(v.pad, (3 * pamAlvo - pasAlvo) / 2, dt, 180);
    v.fc = aproxima(v.fc, 88 + g * 50 - volume * 6, dt, 180);
    v.fr = aproxima(v.fr, 18 + g * 16, dt, 180);
    v.spo2 = aproxima(v.spo2, (e.fx.o2 ? 96 : 91) - g * 3, dt, 120);
    v.temp = aproxima(v.temp, atb ? 37.8 : 39.2, dt, 1800);
    e.quadro = g > 0.75 ? 'Torporoso, pele marmórea, extremidades frias.' : g > 0.45 ? 'Confuso, pele fria, livedo em joelhos.' : 'Mais desperto; enchimento capilar melhorando.';
  },

  metas: [
    { id: 'lactato', texto: 'Lactato em até 30 min', peso: 10, dica: 'Lactato ≥ 2 = hipoperfusão; ≥ 4 indica volume de 30 mL/kg.', avaliar: e => ({ ok: ate(e, 'lactato', 30 * MIN) }) },
    { id: 'culturas', texto: 'Hemoculturas antes do antibiótico', peso: 10, dica: 'Colher culturas sem atrasar o antibiótico.', avaliar: e => ({ ok: feito(e, 'hemocultura') && (!feito(e, 'atb') || e.feito.hemocultura <= e.feito.atb) }) },
    { id: 'atb', texto: 'Antibiótico em até 1 hora', peso: 25, dica: 'Choque séptico: antibiótico na 1ª hora. Cada hora de atraso aumenta a mortalidade.', avaliar: e => ({ ok: ate(e, 'atb', 60 * MIN), nota: feito(e, 'atb') ? `aos ${Math.round(e.feito.atb / 60)} min` : 'não feito' }) },
    { id: 'volume', texto: 'Cristaloide 30 mL/kg', peso: 15, dica: 'Hipotensão ou lactato ≥ 4: 30 mL/kg de cristaloide balanceado nas primeiras 3 h.', avaliar: e => ({ ok: feito(e, 'volume') }) },
    { id: 'nora', texto: 'Noradrenalina para PAM ≥ 65', peso: 15, dica: 'Se a PAM segue < 65 durante/após o volume: noradrenalina (pode ser periférica no início).', avaliar: e => ({ ok: feito(e, 'nora') && !feito(e, 'dopamina') }) },
    { id: 'o2', texto: 'Oxigênio', peso: 5, dica: 'SpO₂ < 92%: O₂.', avaliar: e => ({ ok: feito(e, 'o2') }) },
    { id: 'relac', texto: 'Repetir o lactato', peso: 5, dica: 'Reavaliar o lactato em 2–4 h se estava alto.', avaliar: e => ({ ok: ((e.fx.lacN as number) ?? 0) >= 2 }) },
    { id: 'gravidade', texto: 'Estratificar (CURB-65) e encaminhar à UTI', peso: 15, dica: 'CURB-65 ≥ 3 e choque: UTI.', avaliar: e => ({ ok: feito(e, 'curb') && feito(e, 'uti') }) },
  ],

  ensino: [
    'Sepse = infecção + disfunção orgânica (SOFA ≥ 2). Choque séptico: vasopressor para PAM ≥ 65 e lactato > 2 apesar do volume.',
    'Pacote da 1ª hora: lactato, hemoculturas, antibiótico de amplo espectro, 30 mL/kg de cristaloide se hipotensão ou lactato ≥ 4 e noradrenalina se PAM < 65.',
    'A noradrenalina é o vasopressor de escolha e pode começar em veia periférica. Hidrocortisona se o vasopressor estiver em ascensão.',
    'Evite amidos sintéticos. Prefira cristaloides balanceados.',
    'Pneumonia comunitária grave: ceftriaxona (ou outro betalactâmico) + macrolídeo; CURB-65 ≥ 3 sugere UTI.',
  ],
};
