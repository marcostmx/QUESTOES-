/**
 * Personagem humano procedural (volumes arredondados, articulações e rosto).
 * Mantém exatamente os mesmos pivôs, grupos e regiões do boneco antigo, para que as âncoras de exame,
 * as posturas e as animações (marcha, Romberg, respiração, dor) continuem funcionando.
 * Coordenadas no "frame" (antes da escala): pelve em y = 0, torso a partir de y = 0,09, cabeça em 0,55
 * do torso; ombros em (±0,27; 0,5); quadris em (±0,095; −0,06); joelhos 0,42 abaixo.
 */
import * as THREE from 'three';
import type { Regiao } from './maneuvers';
import type { Boneco } from './scene';

const S = 0.88;

export interface Aparencia {
  pele: number;
  cabelo: number;
  tronco: number;
  calca: number;
  sapato: number;
  jaleco?: boolean;
  longo?: boolean;
}

const pano = (c: number) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.88 });
const pele = (c: number) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.55 });

function malha(geo: THREE.BufferGeometry, m: THREE.Material, x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1) {
  const o = new THREE.Mesh(geo, m);
  o.position.set(x, y, z);
  o.scale.set(sx, sy, sz);
  o.castShadow = true;
  o.receiveShadow = true;
  return o;
}
/** cápsula vertical: raio, comprimento da parte reta */
const cap = (r: number, len: number) => new THREE.CapsuleGeometry(r, len, 6, 18);
const esf = (r: number, w = 20, h = 14) => new THREE.SphereGeometry(r, w, h);
/** sólido de revolução a partir de um perfil [raio, altura] (tronco contínuo, sem "cintura de boneco") */
const torno = (perfil: [number, number][]) => new THREE.LatheGeometry(perfil.map(([r, y]) => new THREE.Vector2(r, y)), 32);
const PROF = 0.68; // achatamento ântero-posterior do tronco

export function humano(o: Aparencia): Boneco {
  const root = new THREE.Group();
  const frame = new THREE.Group();
  frame.scale.setScalar(S);
  root.add(frame);
  const parts = new Map<Regiao, THREE.Mesh[]>();
  const tag = (r: Regiao, m: THREE.Mesh) => {
    m.material = (m.material as THREE.Material).clone(); // material próprio: realce só da região
    m.userData.regiao = r;
    (parts.get(r) ?? parts.set(r, []).get(r)!).push(m);
    return m;
  };
  const mPele = pele(o.pele);
  const mTronco = pano(o.tronco);
  const mCalca = pano(o.calca);
  const mCabelo = new THREE.MeshStandardMaterial({ color: o.cabelo, roughness: 0.62 });
  const feminino = !!o.longo;

  /* ---------- pelve e tronco ---------- */
  frame.add(tag('abdome', malha(torno([[0, -0.15], [0.09, -0.145], [0.14, -0.12], [0.162, -0.07], [0.165, 0.0], [0.158, 0.06], [0, 0.06]]), mCalca, 0, 0, 0, 1, 1, PROF + 0.04)));
  const torso = new THREE.Group();
  torso.position.y = 0.09;
  frame.add(torso);
  torso.add(tag('abdome', malha(torno([[0, -0.07], [0.157, -0.07], [0.152, 0.02], [0.148, 0.12], [0.155, 0.21], [0.165, 0.27], [0, 0.27]]), mTronco, 0, 0, 0, 1, 1, PROF)));
  const chest = tag('torax', malha(torno([[0, 0.26], [0.165, 0.26], [0.178, 0.32], [0.188, 0.4], [0.19, 0.46], [0.18, 0.51], [0.14, 0.555], [0.07, 0.585], [0, 0.59]]), mTronco, 0, 0, 0, 1, 1, PROF));
  torso.add(chest);
  if (feminino) for (const s of [-1, 1]) torso.add(tag('torax', malha(esf(0.06), mTronco, s * 0.075, 0.39, 0.095, 1, 0.9, 0.75)));
  // cintura escapular: une os ombros ao tórax sem "bolas" soltas
  const ombros = tag('torax', malha(cap(0.066, 0.34), mTronco, 0, 0.49, -0.005, 1, 1, 0.9));
  ombros.rotation.z = Math.PI / 2;
  torso.add(ombros);
  if (o.jaleco) {
    // jaleco: aba inferior, gola e estetoscópio no pescoço
    const branco = pano(0xf7f7f5);
    const aba = malha(new THREE.CylinderGeometry(0.2, 0.235, 0.42, 24, 1, true), branco, 0, -0.12, 0, 1, 1, 0.78);
    (aba.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide;
    frame.add(aba);
    for (const s of [-1, 1]) {
      const gola = malha(new THREE.BoxGeometry(0.06, 0.2, 0.012), branco, s * 0.06, 0.45, 0.132);
      gola.rotation.z = s * 0.35;
      torso.add(gola);
    }
    const esteto = malha(new THREE.TorusGeometry(0.085, 0.007, 6, 24, Math.PI), new THREE.MeshStandardMaterial({ color: 0x263238, roughness: 0.45 }), 0, 0.53, 0.04);
    esteto.rotation.set(Math.PI / 2 + 0.5, 0, Math.PI);
    torso.add(esteto);
    torso.add(malha(new THREE.CylinderGeometry(0.018, 0.018, 0.01, 14), new THREE.MeshStandardMaterial({ color: 0xc9ced2, roughness: 0.25, metalness: 0.9 }), 0.03, 0.33, 0.124).rotateX(Math.PI / 2));
  }

  /* ---------- cabeça ---------- */
  const head = new THREE.Group();
  head.position.y = 0.55;
  torso.add(head);
  head.add(tag('cabeca', malha(new THREE.CylinderGeometry(0.045, 0.052, 0.1, 16), mPele, 0, 0.03, 0)));
  head.add(tag('cabeca', malha(esf(0.125, 28, 20), mPele, 0, 0.205, 0, 0.92, 1.1, 1.0)));
  head.add(tag('cabeca', malha(esf(0.075), mPele, 0, 0.125, 0.035, 1.05, 0.8, 1)));
  for (const s of [-1, 1]) head.add(tag('cabeca', malha(esf(0.028, 12, 10), mPele, s * 0.117, 0.2, -0.005, 0.5, 1, 0.8)));
  const nariz = tag('cabeca', malha(cap(0.017, 0.035), mPele, 0, 0.19, 0.122));
  nariz.rotation.x = -0.35;
  head.add(nariz);
  // olhos (branco + íris; a escala vertical do branco fecha o olho)
  const olhos: THREE.Mesh[] = [];
  for (const s of [-1, 1]) {
    const branco = malha(esf(0.021, 14, 10), new THREE.MeshStandardMaterial({ color: 0xf6f4ef, roughness: 0.25 }), s * 0.045, 0.225, 0.1, 1, 1, 0.65);
    const iris = malha(esf(0.012, 12, 8), new THREE.MeshStandardMaterial({ color: 0x3a2b20, roughness: 0.2 }), 0, 0, 0.016, 1, 1, 0.6);
    branco.add(iris);
    head.add(branco);
    olhos.push(branco);
    const sobr = malha(cap(0.0065, 0.04), mCabelo, s * 0.046, 0.258, 0.108);
    sobr.rotation.z = Math.PI / 2 + s * 0.12;
    head.add(sobr);
  }
  const boca = malha(cap(0.0085, 0.045), new THREE.MeshStandardMaterial({ color: 0xa65a50, roughness: 0.5 }), 0, 0.14, 0.108);
  boca.rotation.z = Math.PI / 2;
  head.add(boca);
  // cabelo: calota + mecha longa
  const calota = malha(new THREE.SphereGeometry(0.131, 28, 16, 0, Math.PI * 2, 0, Math.PI * 0.52), mCabelo, 0, 0.215, -0.008, 0.95, 1.12, 1.04);
  calota.rotation.x = -0.18;
  head.add(calota);
  if (feminino) head.add(malha(cap(0.1, 0.14), mCabelo, 0, 0.12, -0.07, 1.05, 1, 0.45));

  /* ---------- braços ---------- */
  const braco = (side: number) => {
    const g = new THREE.Group();
    g.position.set(side * 0.27, 0.5, 0);
    g.add(tag('mmss', malha(cap(0.056, 0.2), mTronco, 0, -0.15, 0)));
    g.add(tag('mmss', malha(esf(0.046), mPele, 0, -0.33, 0)));
    g.add(tag('mmss', malha(cap(0.045, 0.15), mPele, 0, -0.44, 0.005)));
    g.add(tag('mmss', malha(esf(0.045, 14, 10), mPele, 0, -0.58, 0.01, 0.75, 1.35, 0.5)));
    torso.add(g);
    return g;
  };

  /* ---------- pernas ---------- */
  const perna = (side: number) => {
    const hip = new THREE.Group();
    hip.position.set(side * 0.095, -0.06, 0);
    hip.add(tag('mmii', malha(cap(0.078, 0.26), mCalca, 0, -0.21, 0)));
    const knee = new THREE.Group();
    knee.position.y = -0.42;
    knee.add(tag('mmii', malha(esf(0.06), o.jaleco ? mCalca : mPele, 0, 0, 0)));
    knee.add(tag('mmii', malha(cap(0.056, 0.27), o.jaleco ? mCalca : mPele, 0, -0.2, 0)));
    const pe = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.13, 4, 12), new THREE.MeshStandardMaterial({ color: o.sapato, roughness: 0.6 }));
    pe.rotation.x = Math.PI / 2;
    pe.position.set(0, -0.42, 0.045);
    pe.scale.set(1.1, 1, 0.75);
    pe.castShadow = true;
    knee.add(tag('mmii', pe));
    hip.add(knee);
    frame.add(hip);
    return { hip, knee };
  };
  const l = perna(1);
  const r = perna(-1);
  return { root, frame, torso, chest, head, armL: braco(1), armR: braco(-1), hipL: l.hip, hipR: r.hip, kneeL: l.knee, kneeR: r.knee, parts, boca, olhos };
}
