/* Padrões motores do paciente (marcha, tremor, Romberg) deduzidos do texto da estação e animados na cena 3D. */
import * as THREE from 'three';
import type { Estacao } from './engine';

export type Marcha = 'normal' | 'ceifante' | 'atáxica' | 'parkinsoniana' | 'escarvante' | 'tesoura';
export type Lado = 'D' | 'E';
export interface PadraoMotor { marcha: Marcha; ladoMarcha: Lado; tremor?: Lado; romberg?: { queda: boolean; lado: Lado } }

const ladoDe = (txt: string, padrao: Lado = 'D'): Lado => {
  const d = txt.search(/direit|\bD\b|à D/);
  const e = txt.search(/esquerd|\bE\b|à E/);
  if (d < 0 && e < 0) return padrao;
  if (d < 0) return 'E';
  if (e < 0) return 'D';
  return d <= e ? 'D' : 'E';
};

/** Lê o caso e os achados da estação e escolhe a marcha, o tremor e a resposta ao Romberg. */
export function padraoMotor(e: Estacao): PadraoMotor {
  const textos = [e.achados, e.caso, ...e.comandos.map(c => c.achado ?? '')].join(' • ');
  const frases = textos.split(/[;•.]\s*/);
  const achaFrase = (rx: RegExp) => frases.find(f => rx.test(f)) ?? '';
  const mf = achaFrase(/marcha|andar|passos|caminh/i);
  let marcha: Marcha = 'normal';
  if (/ceifante|hemipar[ée]tic|wernicke|helic[óo]pode/i.test(textos)) marcha = 'ceifante';
  else if (/entrecruz|tesoura|membros inferiores aduzidos/i.test(textos)) marcha = 'tesoura';
  else if (/escarvante|eleva[çc][ãa]o exagerada do joelho|p[ée] ca[íi]do/i.test(textos)) marcha = 'escarvante';
  else if (/passos curtos|festina|marcha (lenta e deliberada|parkinson)|bradicinesia/i.test(textos)) marcha = 'parkinsoniana';
  else if (/at[áa]xic|base alargada|cerebelar|marcha inst[áa]vel|ebriosa/i.test(textos)) marcha = 'atáxica';
  else if (/rigidez axial/i.test(textos)) marcha = 'parkinsoniana';
  else if (/hemiparesia|paresia (de )?(membro|perna|MI)/i.test(mf)) marcha = 'ceifante';
  else if (/propriocep|cordonal posterior|tab[ée]tic/i.test(textos) && /romberg positivo|instabilidade/i.test(textos)) marcha = 'atáxica';
  const hemi = achaFrase(/hemipar|paresia|ceifante|escarvante|dorsiflex|eleva[çc][ãa]o exagerada|paralisia/i);
  const ladoMarcha = ladoDe(hemi || mf);
  const tf = achaFrase(/tremor de repouso|tremor.*repouso|contar moedas/i);
  const tremor = tf && !/pouco evidente|ausente|sem tremor/i.test(tf) ? ladoDe(tf) : undefined;
  const rf = achaFrase(/romberg|olhos fechados|ao fechar os olhos|instabilidade/i);
  const romberg = rf ? { queda: /positivo|instabilidade acentuada|cai|queda|oscila/i.test(rf) && !/negativo/i.test(rf), lado: ladoDe(rf, 'E') } : undefined;
  return { marcha, ladoMarcha, tremor, romberg };
}

/** Partes do boneco que as animações mexem. */
export interface Corpo {
  root: THREE.Group; torso: THREE.Group; head: THREE.Group;
  armL: THREE.Group; armR: THREE.Group; hipL: THREE.Group; hipR: THREE.Group; kneeL: THREE.Group; kneeR: THREE.Group;
}

/** Pose de um passo de marcha (φ = fase do ciclo). Lado afetado: R = direito do paciente. */
export function poseMarcha(c: Corpo, tipo: Marcha, lado: Lado, phi: number, t: number) {
  const s = Math.sin(phi);
  const flex = (x: number) => Math.max(0, x);
  const afetHip = lado === 'D' ? c.hipR : c.hipL;
  const sadHip = lado === 'D' ? c.hipL : c.hipR;
  const afetKnee = lado === 'D' ? c.kneeR : c.kneeL;
  const sadKnee = lado === 'D' ? c.kneeL : c.kneeR;
  const afetArm = lado === 'D' ? c.armR : c.armL;
  const sadArm = lado === 'D' ? c.armL : c.armR;
  const sgn = lado === 'D' ? -1 : 1; // abdução do membro afetado no eixo z
  for (const j of [c.hipL, c.hipR, c.kneeL, c.kneeR, c.armL, c.armR, c.torso, c.head]) j.rotation.set(0, 0, 0);
  c.torso.rotation.set(0, 0, 0);
  switch (tipo) {
    case 'normal':
      c.hipL.rotation.x = 0.45 * s;
      c.hipR.rotation.x = -0.45 * s;
      c.kneeL.rotation.x = 0.6 * flex(-s);
      c.kneeR.rotation.x = 0.6 * flex(s);
      c.armL.rotation.x = -0.35 * s;
      c.armR.rotation.x = 0.35 * s;
      break;
    case 'ceifante': {
      // membro inferior afetado rígido, em semicírculo; membro superior fletido e aduzido, sem balanço
      const sw = flex(-s);
      afetHip.rotation.x = -0.3 * sw;
      afetHip.rotation.z = sgn * 0.45 * sw;
      afetKnee.rotation.x = 0;
      sadHip.rotation.x = 0.35 * s;
      sadKnee.rotation.x = 0.55 * flex(s);
      afetArm.rotation.x = -0.75;
      afetArm.rotation.z = -sgn * 0.35;
      sadArm.rotation.x = 0.3 * s;
      c.torso.rotation.z = -sgn * 0.08 * sw;
      break;
    }
    case 'atáxica': {
      const irreg = 1 + 0.35 * Math.sin(t * 2.3) * Math.sin(t * 0.9);
      c.hipL.rotation.x = 0.4 * s * irreg;
      c.hipR.rotation.x = -0.4 * s * irreg;
      c.hipL.rotation.z = 0.18;
      c.hipR.rotation.z = -0.18;
      c.kneeL.rotation.x = 0.5 * flex(-s);
      c.kneeR.rotation.x = 0.5 * flex(s);
      c.armL.rotation.z = 0.45;
      c.armR.rotation.z = -0.45;
      c.torso.rotation.z = 0.14 * Math.sin(t * 1.6);
      c.torso.rotation.x = 0.06 * Math.sin(t * 2.1);
      break;
    }
    case 'parkinsoniana':
      c.torso.rotation.x = 0.38;
      c.head.rotation.x = 0.15;
      c.hipL.rotation.x = -0.25 + 0.16 * s;
      c.hipR.rotation.x = -0.25 - 0.16 * s;
      c.kneeL.rotation.x = 0.35;
      c.kneeR.rotation.x = 0.35;
      c.armL.rotation.x = -0.25;
      c.armR.rotation.x = -0.25;
      break;
    case 'escarvante': {
      const sw = flex(-s);
      afetHip.rotation.x = -1.0 * sw;
      afetKnee.rotation.x = 1.25 * sw;
      sadHip.rotation.x = 0.4 * s;
      sadKnee.rotation.x = 0.5 * flex(s);
      c.armL.rotation.x = -0.3 * s;
      c.armR.rotation.x = 0.3 * s;
      break;
    }
    case 'tesoura':
      c.hipL.rotation.x = 0.25 * s;
      c.hipR.rotation.x = -0.25 * s;
      c.hipL.rotation.z = -0.16;
      c.hipR.rotation.z = 0.16;
      c.torso.rotation.z = 0.06 * s;
      c.armL.rotation.z = 0.2;
      c.armR.rotation.z = -0.2;
      break;
  }
}

/** Velocidade (m/s) e cadência (rad/s) de cada marcha. */
export const RITMO: Record<Marcha, { v: number; w: number }> = {
  normal: { v: 0.75, w: 6 },
  ceifante: { v: 0.4, w: 3.6 },
  'atáxica': { v: 0.5, w: 4.6 },
  parkinsoniana: { v: 0.32, w: 9.5 },
  escarvante: { v: 0.55, w: 5 },
  tesoura: { v: 0.4, w: 6.5 },
};

export const nomeMarcha: Record<Marcha, string> = {
  normal: 'marcha atípica', ceifante: 'marcha ceifante', 'atáxica': 'marcha atáxica', parkinsoniana: 'marcha parkinsoniana',
  escarvante: 'marcha escarvante', tesoura: 'marcha em tesoura',
};
