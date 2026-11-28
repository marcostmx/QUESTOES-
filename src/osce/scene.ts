/* Cena 3D em blocos (estilo voxel original) do simulador OSCE — Three.js puro, sem React. */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type { Postura, Regiao } from './maneuvers';
import { ANCORAS, estiloDe, ferramenta3d, marcador, ondeExaminar, roteiro, type Estilo } from './exame3d';
import { poseMarcha, RITMO, type PadraoMotor } from './motor';
import { Cortina, desenhaAchados, Monitor } from './sala3d';
import type { Achado3d, Vitais } from './visual';
import { humano } from './humano';
import { construirSala, desenhaTelaAvaliador, LUMINARIAS, SALA, type Caixa } from './salaOsce';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

export type Alvo =
  | { kind: 'paciente'; regiao: Regiao }
  | { kind: 'pia' }
  | { kind: 'avaliador' }
  | { kind: 'porta' };

export interface Proximidade { pertoPaciente: boolean; pertoPia: boolean; lado: 'direito' | 'esquerdo' | null; dentro: boolean }

export interface WorldOpts {
  sexo: 'M' | 'F';
  fr: number;
  padrao: 'normal' | 'cheyne' | 'kussmaul' | 'taquipneia';
  postura: Postura;
  numero: string;
  motor?: PadraoMotor;
  estilo?: 'blocos' | 'clinico';
  achados?: Achado3d[];
  vitais?: Vitais;
  expor?: { abdome: boolean; torax: boolean };
  onClick: (a: Alvo) => void;
  onHover: (a: Alvo | null) => void;
  onProx: (p: Proximidade) => void;
}

const S = 0.88; // escala do corpo
const MACA = { x: 0, z: -1, top: 0.74, len: 2.1, wid: 0.8 };
const PIA = new THREE.Vector3(3.55, 0, -3.7);

/** Visual "clínico": formas arredondadas, materiais foscos e paleta hospitalar (definido ao criar o mundo). */
let CLIN = false;
const PALETA: Record<number, number> = {
  0xf4efe6: 0xf1f4f7, 0x6aa7c9: 0x9db8cc, 0xe8e1d4: 0xeef1f4, 0x7cc46a: 0xd6dde4, 0xdfe8f0: 0xe9eef2, 0x2f4858: 0x5e6b75,
  0x8a5a3c: 0x7d8790, 0x5b3b28: 0x5e6870, 0xa47148: 0xc9ced3, 0x6d4a2f: 0x8a939b, 0x7a4e2d: 0xb9c3cc,
};
const lambert = (color: number | string) => {
  if (!CLIN) return new THREE.MeshStandardMaterial({ color, roughness: 0.72, metalness: 0 });
  const c = typeof color === 'number' ? PALETA[color] ?? color : color;
  return new THREE.MeshStandardMaterial({ color: c, roughness: 0.78, metalness: 0.02 });
};

function box(w: number, h: number, d: number, mat: THREE.Material, x = 0, y = 0, z = 0) {
  const r = Math.min(w, h, d) * 0.3;
  const geo = CLIN && r > 0.004 ? new RoundedBoxGeometry(w, h, d, 3, r) : new THREE.BoxGeometry(w, h, d);
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}



/* ---------- Personagem em blocos ---------- */
export interface Boneco {
  root: THREE.Group;
  frame: THREE.Group;
  torso: THREE.Group;
  chest: THREE.Mesh;
  head: THREE.Group;
  armL: THREE.Group;
  armR: THREE.Group;
  hipL: THREE.Group;
  hipR: THREE.Group;
  kneeL: THREE.Group;
  kneeR: THREE.Group;
  parts: Map<Regiao, THREE.Mesh[]>;
  boca: THREE.Mesh;
  olhos: THREE.Mesh[];
}

export function boneco(o: { pele: number; cabelo: number; tronco: number; calca: number; sapato: number; jaleco?: boolean; longo?: boolean }): Boneco {
  return humano(o);
}

/** Boneco antigo em blocos (mantido como referência). */
export function bonecoBlocos(o: { pele: number; cabelo: number; tronco: number; calca: number; sapato: number; jaleco?: boolean; longo?: boolean }): Boneco {
  const root = new THREE.Group();
  const frame = new THREE.Group();
  frame.scale.setScalar(S);
  root.add(frame);
  const parts = new Map<Regiao, THREE.Mesh[]>();
  const tag = (r: Regiao, m: THREE.Mesh) => {
    m.material = (m.material as THREE.Material).clone(); // material próprio: destaque só da região
    m.userData.regiao = r;
    (parts.get(r) ?? parts.set(r, []).get(r)!).push(m);
    return m;
  };
  const pele = lambert(o.pele);
  const tronco = lambert(o.tronco);
  const calca = lambert(o.calca);
  frame.add(tag('abdome', box(0.36, 0.18, 0.2, calca, 0, 0, 0)));
  const torso = new THREE.Group();
  torso.position.y = 0.09;
  frame.add(torso);
  torso.add(tag('abdome', box(0.36, 0.25, 0.2, tronco, 0, 0.125, 0)));
  const chest = tag('torax', box(0.4, 0.3, 0.22, tronco, 0, 0.4, 0));
  torso.add(chest);
  if (o.jaleco) {
    torso.add(box(0.06, 0.52, 0.01, lambert(0x2f6f9f), 0.08, 0.3, 0.115));
    torso.add(box(0.02, 0.2, 0.01, lambert(0x333333), -0.1, 0.42, 0.116)); // estetoscópio
  }
  const head = new THREE.Group();
  head.position.y = 0.55;
  if (CLIN) head.scale.setScalar(0.9);
  torso.add(head);
  head.add(tag('cabeca', box(0.12, 0.08, 0.12, pele, 0, 0.03, 0)));
  head.add(tag('cabeca', box(0.28, 0.28, 0.26, pele, 0, 0.21, 0)));
  const cab = lambert(o.cabelo);
  head.add(box(0.3, 0.08, 0.28, cab, 0, 0.37, -0.01));
  head.add(box(0.3, o.longo ? 0.34 : 0.16, 0.06, cab, 0, o.longo ? 0.2 : 0.28, -0.13));
  const olho = lambert(0x1b1b1b);
  const olhos = [box(0.045, 0.045, 0.01, olho, -0.06, 0.23, 0.131), box(0.045, 0.045, 0.01, olho, 0.06, 0.23, 0.131)];
  olhos.forEach(x => head.add(x));
  const boca = box(0.08, 0.02, 0.01, lambert(0xa0524a), 0, 0.14, 0.131);
  head.add(boca);
  const braco = (side: number) => {
    const g = new THREE.Group();
    g.position.set(side * 0.27, 0.5, 0);
    g.add(tag('mmss', box(0.13, 0.36, 0.13, tronco, 0, -0.16, 0)));
    g.add(tag('mmss', box(0.12, 0.22, 0.12, pele, 0, -0.44, 0)));
    torso.add(g);
    return g;
  };
  const perna = (side: number) => {
    const hip = new THREE.Group();
    hip.position.set(side * 0.095, -0.06, 0);
    hip.add(tag('mmii', box(0.16, 0.42, 0.17, calca, 0, -0.21, 0)));
    const knee = new THREE.Group();
    knee.position.y = -0.42;
    knee.add(tag('mmii', box(0.14, 0.4, 0.15, o.jaleco ? calca : pele, 0, -0.2, 0)));
    knee.add(tag('mmii', box(0.15, 0.07, 0.24, lambert(o.sapato), 0, -0.43, 0.04)));
    hip.add(knee);
    frame.add(hip);
    return { hip, knee };
  };
  const l = perna(1);
  const r = perna(-1);
  return { root, frame, torso, chest, head, armL: braco(1), armR: braco(-1), hipL: l.hip, hipR: r.hip, kneeL: l.knee, kneeR: r.knee, parts, boca, olhos };
}

/* ---------- Mundo ---------- */
export class World {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private ray = new THREE.Raycaster();
  private ptr = new THREE.Vector2();
  private clock = new THREE.Clock();
  private raf = 0;
  private keys = new Set<string>();
  private target: THREE.Vector3 | null = null;
  private arrive: (() => void) | null = null;
  private player: Boneco;
  private patient: Boneco;
  private evaluator: Boneco;
  private doorOpen = false;
  private obstaculos: Caixa[] = [];
  private ponteiros!: { min: THREE.Object3D; hora: THREE.Object3D; seg: THREE.Object3D };
  private tela!: { cv: HTMLCanvasElement; tex: THREE.CanvasTexture };
  private telaSeg = -1;
  private composer: EffectComposer | null = null;
  private envTex: THREE.Texture | null = null;
  /** primeira pessoa: direção do olhar */
  private yaw = 0;
  private pitch = -0.12;
  private arrasto: { x: number; y: number; id: number; moveu: boolean } | null = null;
  private retorno = 0;
  private clickables: THREE.Object3D[] = [];
  private floor: THREE.Mesh[] = [];
  private hovered: THREE.Mesh[] = [];
  private posture: Postura;
  private gestureT = 0;
  private flash: { meshes: THREE.Mesh[]; t: number } | null = null;
  private lastProx = '';
  private ro: ResizeObserver;
  private disposed = false;
  private ancoras = new Map<string, THREE.Object3D>();
  private ferr: THREE.Group | null = null;
  private anel = marcador();
  private close: { pos: THREE.Vector3; n: THREE.Vector3; cam: THREE.Vector3; t: number; total: number; bate: boolean; seguir?: boolean;
    pontos?: { pos: THREE.Vector3; n: THREE.Vector3; cam: THREE.Vector3 }[]; passo?: number; estilo?: Estilo; idx?: number; dor?: boolean } | null = null;
  private lookCur = new THREE.Vector3(0, 0.8, 4);
  private dorT = 0;
  private toraxZ = 1;
  private cortina = new Cortina(MACA.x, MACA.z);
  private monitor: Monitor;
  private anim: { tipo: 'marcha' | 'romberg' | 'pull'; t: number; dur: number; x: number; dir: number; y: number; z: number } | null = null;

  constructor(private canvas: HTMLCanvasElement, private o: WorldOpts) {
    CLIN = o.estilo === 'clinico';
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.scene.background = new THREE.Color(0x1d2329);
    this.camera = new THREE.PerspectiveCamera(70, 1, 0.05, 40);

    // reflexos e luz indireta de um ambiente interno pré-filtrado
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
    this.scene.environment = this.envTex;
    this.scene.environmentIntensity = 0.32;

    // iluminação de sala: painéis de LED (luz de área), preenchimento suave e uma luz com sombra macia
    RectAreaLightUniformsLib.init();
    for (const [x, z] of LUMINARIAS) {
      const l = new THREE.RectAreaLight(0xfff6e8, 5.2, 1.18, 0.58);
      l.position.set(x, SALA.h - 0.035, z);
      l.lookAt(x, 0, z);
      this.scene.add(l);
    }
    this.scene.add(new THREE.HemisphereLight(0xfffaf2, 0xe0d8cc, CLIN ? 1.0 : 0.9));
    const luz = new THREE.DirectionalLight(0xfff4e6, 1.15);
    luz.position.set(0.8, 7, 1.4);
    luz.castShadow = true;
    luz.shadow.mapSize.set(2048, 2048);
    Object.assign(luz.shadow.camera, { left: -5.2, right: 5.2, top: 5.2, bottom: -5.2, near: 2, far: 10 });
    luz.shadow.bias = -0.0004;
    luz.shadow.normalBias = 0.02;
    luz.shadow.radius = 4;
    this.scene.add(luz);
    // luz de presença sobre a maca (foco de exame)
    const foco = new THREE.SpotLight(0xfff2de, 6, 6, 0.6, 0.8, 1.6);
    foco.position.set(MACA.x + 0.2, SALA.h - 0.05, MACA.z + 0.2);
    foco.target.position.set(MACA.x, 0.7, MACA.z);
    this.scene.add(foco, foco.target);

    const sala = construirSala(this.scene, o.numero, PIA, MACA, this.renderer.capabilities.getMaxAnisotropy());
    this.tela = sala.telaAvaliador;
    this.floor.push(...sala.pisos);
    this.obstaculos = sala.obstaculos;
    this.ponteiros = sala.ponteiros;
    sala.pia.traverse(m => {
      if (m instanceof THREE.Mesh) {
        m.userData.alvo = 'pia';
        this.clickables.push(m);
      }
    });
    this.clickables.push(sala.porta);

    // o estudante: corpo invisível, câmera nos olhos (primeira pessoa)
    this.player = boneco({ pele: 0xe0ac69, cabelo: 0x3b2a1e, tronco: 0xf7f7f7, calca: 0x24324a, sapato: 0x222222, jaleco: true });
    this.player.root.position.set(0.3, 0, 3.2);
    this.player.root.visible = false;
    this.scene.add(this.player.root);
    this.player.root.traverse(m => m instanceof THREE.Mesh && (m.userData.regiao = undefined));

    const f = o.sexo === 'F';
    const pele = f ? 0xc68642 : 0xf1c27d;
    this.patient = boneco({ pele, cabelo: f ? 0x2b1a10 : 0x5a3d2b, tronco: 0x9ccbe8, calca: 0x7fb0d0, sapato: 0xeeeeee, longo: f });
    this.scene.add(this.patient.root);
    this.toraxZ = desenhaAchados(this.patient as never, o.achados ?? [], pele, o.expor ?? { abdome: false, torax: false });
    for (const [, ms] of this.patient.parts) for (const m of ms) this.clickables.push(m);
    this.scene.add(this.cortina.grupo);
    this.monitor = new Monitor(o.vitais ?? {});
    this.monitor.grupo.position.set(MACA.x - 1.65, 0, MACA.z - 0.6);
    this.monitor.grupo.rotation.y = 0.55;
    this.scene.add(this.monitor.grupo);
    this.posture = o.postura;
    this.applyPosture(o.postura);
    for (const [nome, a] of Object.entries(ANCORAS)) {
      const g = this.patient[a.g] as THREE.Object3D;
      const o3 = new THREE.Object3D();
      o3.position.set(...a.p);
      o3.userData.n = new THREE.Vector3(...a.n).normalize();
      g.add(o3);
      this.ancoras.set(nome, o3);
    }
    this.anel.visible = false;
    this.scene.add(this.anel);

    this.evaluator = boneco({ pele: 0x8d5524, cabelo: 0x111111, tronco: 0x3e6f5a, calca: 0x2a2a2a, sapato: 0x111111 });
    this.evaluator.root.position.set(-3.3, 0.05, -2.6);
    this.evaluator.root.rotation.y = Math.PI / 2.4;
    this.evaluator.hipL.rotation.x = this.evaluator.hipR.rotation.x = -Math.PI / 2;
    this.evaluator.kneeL.rotation.x = this.evaluator.kneeR.rotation.x = Math.PI / 2;
    this.evaluator.root.position.y = 0.42;
    this.evaluator.armL.rotation.x = this.evaluator.armR.rotation.x = -0.9;
    this.evaluator.root.traverse(m => {
      if (m instanceof THREE.Mesh) {
        m.userData.alvo = 'avaliador';
        this.clickables.push(m);
      }
    });
    this.scene.add(this.evaluator.root);

    canvas.addEventListener('pointermove', this.onMove);
    canvas.addEventListener('pointerdown', this.onDown);
    canvas.addEventListener('pointerup', this.onUp);
    canvas.addEventListener('pointercancel', this.onUp);
    window.addEventListener('keydown', this.onKey);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.onBlur);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas);
    this.resize();
    this.loop();
  }

  /* ----- postura do paciente ----- */
  private applyPosture(p: Postura) {
    const b = this.patient;
    b.root.rotation.set(0, 0, 0);
    b.torso.rotation.set(0, 0, 0);
    for (const j of [b.hipL, b.hipR, b.kneeL, b.kneeR, b.armL, b.armR]) j.rotation.set(0, 0, 0);
    const lyingY = MACA.top + 0.11 * S + 0.01;
    switch (p) {
      case 'dorsal':
      case 'semi':
        b.root.rotation.set(-Math.PI / 2, Math.PI / 2, 0, 'YXZ');
        b.root.position.set(MACA.x + 0.05, lyingY, MACA.z);
        if (p === 'semi') {
          b.torso.rotation.x = 0.75;
          b.root.position.x = MACA.x + 0.2;
        }
        break;
      case 'sentado':
        b.root.position.set(MACA.x, MACA.top + 0.1, MACA.z + 0.1);
        b.hipL.rotation.x = b.hipR.rotation.x = -Math.PI / 2;
        b.kneeL.rotation.x = b.kneeR.rotation.x = Math.PI / 2;
        b.armL.rotation.x = b.armR.rotation.x = -0.25;
        break;
      case 'pe':
        b.root.position.set(MACA.x + 0.2, 0.92 * S + 0.03, MACA.z + 0.85);
        break;
      case 'lat-d':
      case 'lat-e':
        b.root.rotation.set(0, p === 'lat-e' ? Math.PI : 0, Math.PI / 2, 'ZYX');
        b.root.position.set(MACA.x + 0.05, MACA.top + 0.2 * S + 0.01, MACA.z);
        b.hipL.rotation.x = b.hipR.rotation.x = -0.5;
        b.kneeL.rotation.x = b.kneeR.rotation.x = 0.8;
        b.armL.rotation.x = -0.6;
        break;
    }
  }

  setPosture(p: Postura) {
    this.posture = p;
    this.applyPosture(p);
    this.lastProx = '';
  }

  openDoor() {
    this.doorOpen = true;
  }

  /** Destaca uma região do paciente por um instante (feedback da manobra). */
  pulse(regiao: Regiao) {
    const ms = regiao === 'geral' || regiao === 'dorso' ? [...(this.patient.parts.get(regiao === 'dorso' ? 'torax' : 'abdome') ?? [])] : this.patient.parts.get(regiao) ?? [];
    this.flash = { meshes: ms, t: 0.9 };
    this.gestureT = 0.8;
  }

  gesture() {
    this.gestureT = 0.8;
  }

  fecharCortina() {
    this.cortina.fechar();
  }

  /** Animação da manobra: instrumento no ponto do corpo, anel que pulsa e câmera em close. */
  examinar(id: string, regiao: Regiao, dor = false) {
    const { ancora, ferramenta } = ondeExaminar(id, regiao);
    this.pulse(regiao);
    if (this.ferr) {
      this.scene.remove(this.ferr);
      this.ferr = null;
    }
    const pl = this.player.root.position;
    this.patient.root.updateMatrixWorld(true);
    const nomes = ancora ? roteiro(id) ?? [ancora] : [];
    const pontos = nomes.map(nm => this.ancoras.get(nm)).filter((x): x is THREE.Object3D => !!x).map(a => ({
      pos: a.getWorldPosition(new THREE.Vector3()),
      n: (a.userData.n as THREE.Vector3).clone().applyQuaternion(a.getWorldQuaternion(new THREE.Quaternion())).normalize(),
    }));
    const temPonto = pontos.length > 0;
    if (!temPonto) {
      const pos = this.patient.chest.getWorldPosition(new THREE.Vector3());
      pontos.push({ pos, n: new THREE.Vector3(pl.x - pos.x, 0, pl.z - pos.z).normalize() });
    }
    const camDe = (pos: THREE.Vector3, n: THREE.Vector3) => {
      const lado = new THREE.Vector3(pl.x - pos.x, 0, pl.z - pos.z).normalize();
      const dir = n.clone().add(new THREE.Vector3(0, 0.75, 0)).add(lado.multiplyScalar(0.55)).normalize();
      const cam = pos.clone().add(dir.multiplyScalar(temPonto ? 0.75 : 2.3));
      cam.y = Math.max(cam.y, 0.5);
      return cam;
    };
    const estilo = estiloDe(id, ferramenta);
    if (temPonto && ferramenta !== 'olhar') {
      this.ferr = ferramenta3d(ferramenta);
      this.scene.add(this.ferr);
    }
    this.anel.visible = temPonto;
    const p0 = pontos[0];
    this.faceTo(p0.pos);
    this.gestureT = 2.4;
    const passo = pontos.length > 1 ? 1.1 : estilo === 'descomprimir' ? 2.6 : 3.2;
    let dur = Math.max(3.2, passo * pontos.length);
    if (estilo !== 'descomprimir' && dor) this.dorT = 1.8;
    if (this.posture === 'pe' && /^(neu-(marcha|calcanhares)|cp-marcha)/.test(id)) dur = this.iniciaAnim('marcha', 7);
    else if (this.posture === 'pe' && /romberg/.test(id)) dur = this.iniciaAnim('romberg', 5.5);
    else if (this.posture === 'pe' && /pull/.test(id)) dur = this.iniciaAnim('pull', 3);
    this.close = {
      pos: p0.pos.clone(), n: p0.n.clone(), cam: camDe(p0.pos, p0.n), t: dur, total: dur, bate: false, seguir: !!this.anim,
      pontos: pontos.map(p => ({ ...p, cam: camDe(p.pos, p.n) })), passo, estilo, idx: -1, dor,
    };
  }

  /** Posiciona o instrumento no ponto atual, com o movimento do estilo. */
  private moveFerramenta(c: NonNullable<World['close']>, tau: number) {
    const f = this.ferr;
    const p = c.pontos![c.idx];
    let off = 0.006;
    let lateral = 0;
    let giro = 0;
    switch (c.estilo) {
      case 'percutir': off += 0.035 * Math.abs(Math.sin(tau * 10)); break;
      case 'palpar': off = 0.004 + 0.026 * (0.5 + 0.5 * Math.cos(tau * 3)); break;
      case 'descomprimir':
        if (tau < 1.5) off = 0.032 - 0.028 * Math.min(1, tau / 1.3);
        else {
          off = 0.004 + Math.min(0.14, (tau - 1.5) * 0.9);
          if (c.dor) {
            this.dorT = 1.8;
            c.dor = false;
          }
        }
        break;
      case 'martelar': giro = 0.9 * Math.max(0, Math.sin(tau * 5)); off = 0.01; break;
      case 'vibrar': off += 0.002 * Math.sin(tau * 90); break;
      case 'varrer': lateral = 0.16 * Math.max(0, 1 - tau / 0.9); off = 0.05; break;
    }
    this.anel.position.copy(p.pos).addScaledVector(p.n, 0.012);
    this.anel.lookAt(p.pos.clone().add(p.n));
    if (!f) return;
    const tang = new THREE.Vector3().crossVectors(p.n, new THREE.Vector3(0, 1, 0));
    if (tang.lengthSq() < 0.01) tang.set(1, 0, 0);
    tang.normalize();
    f.position.copy(p.pos).addScaledVector(p.n, off).addScaledVector(tang, lateral);
    f.lookAt(f.position.clone().add(p.n));
    if (giro) f.rotateX(-giro);
    if (c.estilo === 'vibrar') f.rotateZ(0.04 * Math.sin(tau * 70));
  }

  private iniciaAnim(tipo: 'marcha' | 'romberg' | 'pull', dur: number) {
    this.applyPosture('pe');
    const r = this.patient.root.position;
    this.anim = { tipo, t: 0, dur, x: r.x, dir: 1, y: r.y, z: r.z };
    this.anel.visible = false;
    if (this.ferr) {
      this.scene.remove(this.ferr);
      this.ferr = null;
    }
    return dur;
  }

  /** Marcha, Romberg e pull test do paciente; tremor de repouso contínuo. */
  private animar(dt: number) {
    const b = this.patient;
    const m = this.o.motor;
    const a = this.anim;
    const t = this.clock.elapsedTime;
    if (a) {
      a.t += dt;
      if (a.tipo === 'marcha') {
        const tipo = m?.marcha ?? 'normal';
        const { v, w } = RITMO[tipo];
        a.x += a.dir * v * dt;
        if (a.x > 1.4) a.dir = -1;
        if (a.x < -1.4) a.dir = 1;
        b.root.position.x = a.x;
        b.root.position.z = a.z + 0.35 + (tipo === 'atáxica' ? 0.12 * Math.sin(a.t * 1.7) : 0);
        b.root.rotation.set(0, a.dir > 0 ? Math.PI / 2 : -Math.PI / 2, 0);
        const phi = a.t * w;
        poseMarcha(b, tipo, m?.ladoMarcha ?? 'D', phi, a.t);
        b.root.position.y = a.y + 0.02 * Math.abs(Math.sin(phi));
      } else if (a.tipo === 'romberg') {
        const r = m?.romberg;
        const fechou = a.t > 1.2; // primeiro de olhos abertos, depois fechados
        for (const o of b.olhos) o.scale.y = fechou ? 0.15 : 1;
        let incl = 0.012 * Math.sin(a.t * 3.1);
        if (fechou && r?.queda) {
          const k = Math.min(1, (a.t - 1.2) / 2.2);
          incl = 0.05 * Math.sin(a.t * 5) * (1 - k) + (r.lado === 'D' ? 1 : -1) * 0.32 * k * k;
          b.armL.rotation.z = 0.7 * k;
          b.armR.rotation.z = -0.7 * k;
        } else if (fechou) incl = 0.02 * Math.sin(a.t * 3.4);
        b.root.rotation.z = incl;
      } else {
        // pull test: puxado pelos ombros, recua e se recupera
        const k = a.t < 0.9 ? Math.sin((a.t / 0.9) * Math.PI / 2) : Math.max(0, 1 - (a.t - 0.9) / 1.4);
        b.root.position.z = a.z - 0.35 * k;
        b.torso.rotation.x = -0.25 * k;
        poseMarcha(b, 'normal', 'D', a.t * 9 * (a.t < 1.2 ? 1 : 0), a.t);
        b.torso.rotation.x = -0.25 * k;
      }
      if (a.t >= a.dur) {
        this.anim = null;
        for (const o of b.olhos) o.scale.y = 1;
        this.applyPosture(this.posture);
      }
      return;
    }
    if (m?.tremor) {
      const arm = m.tremor === 'D' ? b.armR : b.armL;
      arm.rotation.z = 0.06 * Math.sin(t * 2 * Math.PI * 5);
    }
  }

  /** Caminha até um ponto e chama `then` ao chegar. */
  walkTo(where: 'paciente' | 'pia', then?: () => void) {
    const p = where === 'pia' ? new THREE.Vector3(PIA.x - 0.2, 0, PIA.z + 0.85) : this.examSpot();
    this.target = p;
    this.arrive = then ?? null;
  }

  private examSpot() {
    if (this.posture === 'pe') return new THREE.Vector3(MACA.x - 0.6, 0, MACA.z + 1.7);
    if (this.posture === 'sentado') return new THREE.Vector3(MACA.x - 0.7, 0, MACA.z + 1.0);
    return new THREE.Vector3(MACA.x + 0.15, 0, MACA.z + MACA.wid / 2 + 0.45);
  }

  /** Posição da cabeça do paciente na tela (para o balão de fala). */
  headScreen(): { x: number; y: number } | null {
    const v = new THREE.Vector3();
    this.patient.head.getWorldPosition(v);
    v.y += 0.45;
    v.project(this.camera);
    if (v.z > 1) return null;
    const r = this.canvas.getBoundingClientRect();
    return { x: r.left + ((v.x + 1) / 2) * r.width, y: r.top + ((1 - v.y) / 2) * r.height };
  }

  /* ----- entrada ----- */
  private pick(e: PointerEvent) {
    const r = this.canvas.getBoundingClientRect();
    this.ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    this.ray.setFromCamera(this.ptr, this.camera);
    const hits = this.ray.intersectObjects([...this.clickables, ...this.floor], false);
    for (const h of hits) {
      const m = h.object as THREE.Mesh;
      if (m.userData.regiao) return { alvo: { kind: 'paciente', regiao: m.userData.regiao } as Alvo, mesh: m, point: h.point };
      if (m.userData.alvo === 'pia') return { alvo: { kind: 'pia' } as Alvo, mesh: m, point: h.point };
      if (m.userData.alvo === 'avaliador') return { alvo: { kind: 'avaliador' } as Alvo, mesh: m, point: h.point };
      if (m.userData.alvo === 'porta') return { alvo: { kind: 'porta' } as Alvo, mesh: m, point: h.point };
      if (this.floor.includes(m)) return { alvo: null, mesh: null, point: h.point };
    }
    return null;
  }

  private setHover(ms: THREE.Mesh[]) {
    for (const m of this.hovered) (m.material as THREE.MeshStandardMaterial).emissive?.setHex(0);
    this.hovered = ms;
    for (const m of ms) (m.material as THREE.MeshStandardMaterial).emissive?.setHex(0x335577);
  }

  private onMove = (e: PointerEvent) => {
    const a = this.arrasto;
    if (a && a.id === e.pointerId) {
      const dx = e.clientX - a.x;
      const dy = e.clientY - a.y;
      if (!a.moveu && Math.hypot(dx, dy) > 6) a.moveu = true;
      if (a.moveu) {
        const k = e.pointerType === 'mouse' ? 0.0045 : 0.006;
        this.yaw += dx * k;
        this.pitch = Math.max(-1.1, Math.min(0.6, this.pitch - dy * k));
        a.x = e.clientX;
        a.y = e.clientY;
        this.target = null;
      }
      return;
    }
    if (e.pointerType !== 'mouse') return;
    const p = this.pick(e);
    let ms: THREE.Mesh[] = [];
    if (p?.alvo?.kind === 'paciente') ms = this.patient.parts.get(p.alvo.regiao) ?? [];
    else if (p?.alvo && p.mesh) ms = [p.mesh];
    this.canvas.style.cursor = p?.alvo ? 'pointer' : 'grab';
    if (ms[0] !== this.hovered[0]) {
      this.setHover(ms);
      this.o.onHover(p?.alvo ?? null);
    }
  };

  private onDown = (e: PointerEvent) => {
    if (this.close) {
      this.close.t = Math.min(this.close.t, 0.15);
      if (this.anim) this.anim.t = this.anim.dur;
      return;
    }
    if (this.arrasto) return;
    this.arrasto = { x: e.clientX, y: e.clientY, id: e.pointerId, moveu: false };
    try {
      this.canvas.setPointerCapture(e.pointerId);
    } catch {
      /* sem captura */
    }
  };

  private onUp = (e: PointerEvent) => {
    const a = this.arrasto;
    if (!a || a.id !== e.pointerId) return;
    this.arrasto = null;
    if (a.moveu || e.type === 'pointercancel') return;
    // toque/clique curto: interagir com o que está sob o dedo
    const p = this.pick(e);
    if (!p) return;
    if (p.alvo) this.o.onClick(p.alvo);
    else if (this.doorOpen) {
      this.target = new THREE.Vector3(p.point.x, 0, p.point.z);
      this.arrive = null;
    }
  };

  private onKey = (e: KeyboardEvent) => {
    const t = e.target as HTMLElement;
    if (/INPUT|TEXTAREA|SELECT/.test(t.tagName)) return;
    const k = e.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'q', 'e', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
      this.keys.add(k);
      this.target = null;
      if (k.startsWith('arrow')) e.preventDefault();
    }
  };
  private onKeyUp = (e: KeyboardEvent) => this.keys.delete(e.key.toLowerCase());
  private onBlur = () => this.keys.clear();

  /** Joystick virtual (−1..1). */
  joy = { x: 0, y: 0 };

  /* ----- simulação ----- */
  private blocked(x: number, z: number) {
    const r = 0.25;
    if (x < SALA.x0 + r || x > SALA.x1 - r || z < SALA.z0 + r || z > SALA.z1 - r) return true;
    const boxes: Caixa[] = [...this.obstaculos, [MACA.x - 1.9, MACA.x - 1.4, MACA.z - 0.85, MACA.z - 0.35]];
    // espaço pessoal do paciente em pé ou sentado (a câmera não "entra" no rosto dele)
    if (this.posture === 'pe' || this.posture === 'sentado') {
      const pr = this.patient.root.position;
      if (Math.hypot(x - pr.x, z - pr.z) < 0.75) return true;
    }
    return boxes.some(([x0, x1, z0, z1]) => x > x0 - r && x < x1 + r && z > z0 - r && z < z1 + r);
  }

  private step(dt: number) {
    const pl = this.player;
    // girar com setas laterais / Q-E
    if (this.keys.has('arrowleft') || this.keys.has('q')) this.yaw -= dt * 1.8;
    if (this.keys.has('arrowright') || this.keys.has('e')) this.yaw += dt * 1.8;
    let fwd = 0;
    let lat = 0;
    if (this.keys.has('w') || this.keys.has('arrowup')) fwd += 1;
    if (this.keys.has('s') || this.keys.has('arrowdown')) fwd -= 1;
    if (this.keys.has('a')) lat -= 1;
    if (this.keys.has('d')) lat += 1;
    if (this.joy.x || this.joy.y) {
      fwd = -this.joy.y;
      lat = this.joy.x;
      this.target = null;
    }
    const f = new THREE.Vector3(Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    const rgt = new THREE.Vector3(Math.cos(this.yaw), 0, Math.sin(this.yaw));
    let dx = f.x * fwd + rgt.x * lat;
    let dz = f.z * fwd + rgt.z * lat;
    if (!dx && !dz && this.target) {
      const v = this.target.clone().sub(pl.root.position).setY(0);
      if (v.length() < 0.08) {
        this.target = null;
        const a = this.arrive;
        this.arrive = null;
        if (a) {
          this.faceTo(this.patient.chest.getWorldPosition(new THREE.Vector3()));
          a();
        }
      } else {
        v.normalize();
        dx = v.x;
        dz = v.z;
        // vira o olhar suavemente para onde está andando
        const alvo = Math.atan2(v.x, -v.z);
        let d = alvo - this.yaw;
        d = Math.atan2(Math.sin(d), Math.cos(d));
        this.yaw += d * Math.min(1, dt * 6);
      }
    }
    const len = Math.hypot(dx, dz);
    const moving = len > 0.01 && this.doorOpen;
    if (moving) {
      const sp = 2.2 * dt;
      dx = (dx / Math.max(1, len)) * sp;
      dz = (dz / Math.max(1, len)) * sp;
      const p = pl.root.position;
      let moved = false;
      if (!this.blocked(p.x + dx, p.z)) {
        p.x += dx;
        moved = true;
      }
      if (!this.blocked(p.x, p.z + dz)) {
        p.z += dz;
        moved = true;
      }
      if (!moved && this.target) {
        this.target = null;
        this.arrive = null;
      }
    }
    this.andando = moving;
    pl.root.rotation.y = -this.yaw + Math.PI;
    this.gestureT = Math.max(0, this.gestureT - dt);
  }

  private andando = false;

  private faceTo(v: THREE.Vector3) {
    const p = this.player.root.position;
    this.yaw = Math.atan2(v.x - p.x, -(v.z - p.z));
    const dist = Math.hypot(v.x - p.x, v.z - p.z);
    this.pitch = Math.max(-1.0, Math.min(0.3, Math.atan2((v.y || 0.9) - 1.6, Math.max(0.3, dist))));
  }

  private breathe() {
    const t = this.clock.elapsedTime;
    const { fr, padrao } = this.o;
    const w = (2 * Math.PI * fr) / 60;
    let amp = padrao === 'kussmaul' ? 0.1 : padrao === 'taquipneia' ? 0.03 : 0.05;
    if (padrao === 'cheyne') {
      const c = (t % 30) / 30; // 30 s: 20 s crescendo-decrescendo + 10 s de apneia
      amp = c < 0.67 ? 0.1 * Math.sin((c / 0.67) * Math.PI) : 0;
    }
    const s = 1 + amp * (0.5 + 0.5 * Math.sin(t * w));
    this.patient.chest.scale.set(1 + (s - 1) * 0.3, 1, s * this.toraxZ);
  }

  private prox() {
    const p = this.player.root.position;
    const pr = new THREE.Vector3();
    this.patient.root.getWorldPosition(pr);
    const cx = Math.max(MACA.x - MACA.len / 2, Math.min(p.x, MACA.x + MACA.len / 2));
    const cz = Math.max(MACA.z - MACA.wid / 2, Math.min(p.z, MACA.z + MACA.wid / 2));
    const dMaca = Math.hypot(p.x - cx, p.z - cz);
    const dPac = Math.hypot(p.x - pr.x, p.z - pr.z);
    const perto = this.posture === 'pe' ? dPac < 1.6 : dMaca < 1.0;
    const right = new THREE.Vector3(-1, 0, 0).applyQuaternion(this.patient.root.quaternion).setY(0);
    let lado: Proximidade['lado'] = null;
    if (right.length() > 0.5) {
      const d = right.normalize().dot(new THREE.Vector3(p.x - pr.x, 0, p.z - pr.z));
      if (Math.abs(d) > 0.25) lado = d > 0 ? 'direito' : 'esquerdo';
    }
    const pertoPia = Math.hypot(p.x - PIA.x, p.z - PIA.z) < 1.4;
    const dentro = this.doorOpen;
    const k = `${perto}|${pertoPia}|${lado}|${dentro}`;
    if (k !== this.lastProx) {
      this.lastProx = k;
      this.o.onProx({ pertoPaciente: perto, pertoPia, lado, dentro });
    }
  }

  private loop = () => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.loop);
    if (document.hidden) return;
    const dt = Math.min(0.1, this.clock.getDelta());
    this.step(dt);
    this.breathe();
    this.animar(dt);
    this.cortina.passo(dt);
    this.monitor.passo(dt);
    this.prox();
    // relógio de parede com a hora real
    const agora = new Date();
    this.ponteiros.seg.rotation.z = -((agora.getSeconds() + agora.getMilliseconds() / 1000) / 60) * Math.PI * 2;
    this.ponteiros.min.rotation.z = -((agora.getMinutes() + agora.getSeconds() / 60) / 60) * Math.PI * 2;
    const seg = Math.floor(this.clock.elapsedTime);
    if (seg !== this.telaSeg) {
      this.telaSeg = seg;
      desenhaTelaAvaliador(this.tela.cv, this.o.numero, Math.min(9, Math.floor(seg / 25)), seg);
      this.tela.tex.needsUpdate = true;
    }
    this.ponteiros.hora.rotation.z = -(((agora.getHours() % 12) + agora.getMinutes() / 60) / 12) * Math.PI * 2;
    if (this.flash) {
      this.flash.t -= dt;
      const on = this.flash.t > 0 && Math.floor(this.flash.t * 8) % 2 === 0;
      for (const m of this.flash.meshes) if (!this.hovered.includes(m)) (m.material as THREE.MeshStandardMaterial).emissive?.setHex(on ? 0x2d6a3e : 0);
      if (this.flash.t <= 0) this.flash = null;
    }
    // expressão de dor
    if (this.dorT > 0) this.dorT = Math.max(0, this.dorT - dt);
    const d = this.dorT > 0 ? 1 : 0;
    this.patient.boca.scale.set(1 - 0.15 * d, 1 + 2.5 * d, 1);
    for (const o of this.patient.olhos) o.scale.y = 1 - 0.75 * d;
    if (this.close) {
      // close no ponto examinado
      const c = this.close;
      c.t -= dt;
      if (c.seguir) {
        this.patient.chest.getWorldPosition(c.pos);
        c.cam.set(c.pos.x * 0.5, 2.4, c.pos.z + 3.0);
      }
      const k1 = 1 - Math.exp(-dt * 7);
      this.camera.position.lerp(c.cam, k1);
      this.lookCur.lerp(c.pos, Math.min(1, k1 * 1.4));
      this.camera.lookAt(this.lookCur);
      const k = 1 + 0.25 * Math.sin(this.clock.elapsedTime * 8);
      this.anel.scale.setScalar(k);
      if (c.pontos && !c.seguir) {
        const dec = c.total - c.t;
        const idx = Math.min(c.pontos.length - 1, Math.floor(dec / c.passo!));
        if (idx !== c.idx) {
          c.idx = idx;
          c.pos.copy(c.pontos[idx].pos);
          c.n.copy(c.pontos[idx].n);
          c.cam.copy(c.pontos[idx].cam);
        }
        this.moveFerramenta(c, dec - idx * c.passo!);
      }
      if (c.t <= 0) {
        this.close = null;
        this.retorno = 0.6;
        this.anel.visible = false;
        if (this.ferr) {
          this.scene.remove(this.ferr);
          this.ferr = null;
        }
      }
    } else {
      // primeira pessoa: olhos a 1,62 m, leve balanço ao andar
      const p = this.player.root.position;
      const bob = this.andando ? Math.sin(this.clock.elapsedTime * 9) * 0.018 : 0;
      const olho = new THREE.Vector3(p.x, 1.62 + bob, p.z);
      const dir = new THREE.Vector3(Math.sin(this.yaw) * Math.cos(this.pitch), Math.sin(this.pitch), -Math.cos(this.yaw) * Math.cos(this.pitch));
      const look = olho.clone().add(dir);
      if (this.retorno > 0) {
        // volta suave do close para os olhos
        this.retorno = Math.max(0, this.retorno - dt);
        const k = 1 - Math.exp(-dt * 9);
        this.camera.position.lerp(olho, k);
        this.lookCur.lerp(look, k);
      } else {
        this.camera.position.copy(olho);
        this.lookCur.copy(look);
      }
      this.camera.lookAt(this.lookCur);
    }
    if (this.composer) this.composer.render(dt);
    else this.renderer.render(this.scene, this.camera);
  };

  /** Pós-processamento: oclusão de ambiente (GTAO) para assentar móveis e cantos. Só em WebGL 2. */
  private montaComposer(w: number, h: number) {
    if (!this.renderer.capabilities.isWebGL2) return;
    try {
      const rt = new THREE.WebGLRenderTarget(w, h, { type: THREE.HalfFloatType, samples: 4 });
      const c = new EffectComposer(this.renderer, rt);
      c.addPass(new RenderPass(this.scene, this.camera));
      const ao = new GTAOPass(this.scene, this.camera, w, h);
      ao.updateGtaoMaterial({ radius: 0.32, distanceExponent: 1.6, thickness: 1.2, scale: 1.15, samples: 16, distanceFallOff: 1 });
      ao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 });
      ao.blendIntensity = 0.9;
      c.addPass(ao);
      c.addPass(new OutputPass());
      this.composer = c;
    } catch {
      this.composer = null;
    }
  }

  private resize() {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    if (!this.composer) this.montaComposer(w, h);
    if (this.composer) {
      this.composer.setPixelRatio(this.renderer.getPixelRatio());
      this.composer.setSize(w, h);
    }
    this.camera.aspect = w / h;
    this.camera.fov = w < h ? 80 : 70;
    this.camera.updateProjectionMatrix();
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.canvas.removeEventListener('pointermove', this.onMove);
    this.canvas.removeEventListener('pointerdown', this.onDown);
    this.canvas.removeEventListener('pointerup', this.onUp);
    this.canvas.removeEventListener('pointercancel', this.onUp);
    window.removeEventListener('keydown', this.onKey);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('blur', this.onBlur);
    this.scene.traverse(o => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        const ms = (Array.isArray(o.material) ? o.material : [o.material]) as THREE.MeshBasicMaterial[];
        for (const m of ms) {
          m.map?.dispose();
          m.dispose();
        }
      }
    });
    this.composer?.dispose();
    this.envTex?.dispose();
    this.renderer.dispose();
  }
}

export function webglOk() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}
