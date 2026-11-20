/* Cena 3D em blocos (estilo voxel original) do simulador OSCE — Three.js puro, sem React. */
import * as THREE from 'three';
import type { Postura, Regiao } from './maneuvers';
import { ANCORAS, ferramenta3d, marcador, ondeExaminar } from './exame3d';
import { poseMarcha, RITMO, type PadraoMotor } from './motor';

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
  onClick: (a: Alvo) => void;
  onHover: (a: Alvo | null) => void;
  onProx: (p: Proximidade) => void;
}

const S = 0.88; // escala do corpo
const MACA = { x: 0, z: -1, top: 0.74, len: 2.1, wid: 0.8 };
const PIA = new THREE.Vector3(3.55, 0, -3.7);
const ROOM = { x0: -4.5, x1: 4.5, z0: -4.5, z1: 4 };
const CORR = { x0: -7, x1: 7, z0: 4, z1: 7.6 };
const DOOR_W = 1.3;

const lambert = (color: number | string) => new THREE.MeshLambertMaterial({ color });

function box(w: number, h: number, d: number, mat: THREE.Material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function labelTexture(text: string, bg = '#1f2a44', fg = '#ffffff', w = 256, h = 96) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d')!;
  g.fillStyle = bg;
  g.fillRect(0, 0, w, h);
  g.fillStyle = fg;
  g.font = `bold ${Math.round(h * 0.42)}px system-ui, sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, w / 2, h / 2 + 2);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.magFilter = THREE.NearestFilter;
  return t;
}

function checker(a: string, b: string, n = 8) {
  const c = document.createElement('canvas');
  c.width = c.height = n * 8;
  const g = c.getContext('2d')!;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    g.fillStyle = (i + j) % 2 ? a : b;
    g.fillRect(i * 8, j * 8, 8, 8);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.magFilter = THREE.NearestFilter;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/* ---------- Personagem em blocos ---------- */
interface Boneco {
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

function boneco(o: { pele: number; cabelo: number; tronco: number; calca: number; sapato: number; jaleco?: boolean; longo?: boolean }): Boneco {
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
  private door: THREE.Group;
  private doorOpen = false;
  private frontWall: THREE.Mesh[] = [];
  private clickables: THREE.Object3D[] = [];
  private floor: THREE.Mesh[] = [];
  private hovered: THREE.Mesh[] = [];
  private posture: Postura;
  private gestureT = 0;
  private flash: { meshes: THREE.Mesh[]; t: number } | null = null;
  private lastProx = '';
  private heading = Math.PI;
  private ro: ResizeObserver;
  private disposed = false;
  private ancoras = new Map<string, THREE.Object3D>();
  private ferr: THREE.Group | null = null;
  private anel = marcador();
  private close: { pos: THREE.Vector3; n: THREE.Vector3; cam: THREE.Vector3; t: number; total: number; bate: boolean; seguir?: boolean } | null = null;
  private lookCur = new THREE.Vector3(0, 0.8, 4);
  private dorT = 0;
  private anim: { tipo: 'marcha' | 'romberg' | 'pull'; t: number; dur: number; x: number; dir: number; y: number; z: number } | null = null;

  constructor(private canvas: HTMLCanvasElement, private o: WorldOpts) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.scene.background = new THREE.Color(0xbfe3f5);
    this.scene.fog = new THREE.Fog(0xbfe3f5, 18, 34);
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 80);

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x8a7f70, 1.6));
    const sun = new THREE.DirectionalLight(0xffffff, 1.5);
    sun.position.set(4, 9, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 30 });
    this.scene.add(sun);

    this.buildRoom();
    this.door = this.buildDoor();

    this.player = boneco({ pele: 0xe0ac69, cabelo: 0x3b2a1e, tronco: 0xf7f7f7, calca: 0x24324a, sapato: 0x222222, jaleco: true });
    this.player.root.position.set(0, 0, 6.3);
    this.scene.add(this.player.root);
    this.player.root.traverse(m => m instanceof THREE.Mesh && (m.userData.regiao = undefined));

    const f = o.sexo === 'F';
    this.patient = boneco({ pele: f ? 0xc68642 : 0xf1c27d, cabelo: f ? 0x2b1a10 : 0x5a3d2b, tronco: 0x9ccbe8, calca: 0x7fb0d0, sapato: 0xeeeeee, longo: f });
    this.scene.add(this.patient.root);
    for (const [, ms] of this.patient.parts) for (const m of ms) this.clickables.push(m);
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
    window.addEventListener('keydown', this.onKey);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.onBlur);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas);
    this.resize();
    this.loop();
  }

  /* ----- construção ----- */
  private buildRoom() {
    const piso = new THREE.MeshLambertMaterial({ map: checker('#e9e4d8', '#ddd6c6') });
    piso.map!.repeat.set(9, 8.5);
    const floor = new THREE.Mesh(new THREE.BoxGeometry(9, 0.1, 8.5), piso);
    floor.position.set(0, -0.05, -0.25);
    floor.receiveShadow = true;
    this.scene.add(floor);
    const pisoC = new THREE.MeshLambertMaterial({ map: checker('#b9c7d6', '#aebdcd') });
    pisoC.map!.repeat.set(14, 3.6);
    const corr = new THREE.Mesh(new THREE.BoxGeometry(14, 0.1, 3.6), pisoC);
    corr.position.set(0, -0.05, 5.8);
    corr.receiveShadow = true;
    this.scene.add(corr);
    const grass = new THREE.Mesh(new THREE.BoxGeometry(60, 0.1, 60), lambert(0x7cc46a));
    grass.position.y = -0.12;
    this.scene.add(grass);
    this.floor.push(floor, corr);

    const parede = lambert(0xf4efe6);
    const faixa = lambert(0x6aa7c9);
    const H = 2.6;
    this.scene.add(box(9, H, 0.2, parede, 0, H / 2, ROOM.z0 - 0.1));
    this.scene.add(box(9, 0.25, 0.22, faixa, 0, 0.9, ROOM.z0 - 0.1));
    for (const x of [ROOM.x0 - 0.1, ROOM.x1 + 0.1]) {
      this.scene.add(box(0.2, H, 8.5, parede, x, H / 2, -0.25));
      this.scene.add(box(0.22, 0.25, 8.5, faixa, x, 0.9, -0.25));
    }
    // parede da frente (fica translúcida quando o jogador entra)
    const fw = new THREE.MeshLambertMaterial({ color: 0xe8e1d4, transparent: true });
    const half = (9 - DOOR_W) / 2;
    for (const s of [-1, 1]) {
      const m = box(half, H, 0.2, fw, s * (DOOR_W / 2 + half / 2), H / 2, ROOM.z1);
      this.frontWall.push(m);
      this.scene.add(m);
    }
    const top = box(DOOR_W, H - 2.2, 0.2, fw, 0, 2.2 + (H - 2.2) / 2, ROOM.z1);
    this.frontWall.push(top);
    this.scene.add(top);
    // corredor: parede do fundo e bancos
    this.scene.add(box(14, 0.9, 0.2, lambert(0xdfe8f0), 0, 0.45, CORR.z1 + 0.1));
    for (const x of [-4.5, 4.5]) {
      this.scene.add(box(1.6, 0.1, 0.45, lambert(0x8a5a3c), x, 0.45, 7.2));
      this.scene.add(box(0.1, 0.45, 0.4, lambert(0x5b3b28), x - 0.7, 0.22, 7.2));
      this.scene.add(box(0.1, 0.45, 0.4, lambert(0x5b3b28), x + 0.7, 0.22, 7.2));
    }
    const poster = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.8), new THREE.MeshBasicMaterial({ map: labelTexture('OSCE', '#e94f37', '#fff', 256, 96) }));
    poster.position.set(-2.6, 1.5, ROOM.z1 + 0.11);
    this.frontWall.push(poster);
    this.scene.add(poster);

    // maca
    const g = new THREE.Group();
    g.position.set(MACA.x, 0, MACA.z);
    g.add(box(MACA.len, 0.14, MACA.wid, lambert(0x2f4858), 0, MACA.top - 0.12, 0));
    g.add(box(MACA.len - 0.05, 0.08, MACA.wid - 0.05, lambert(0xf2f2f2), 0, MACA.top - 0.03, 0));
    g.add(box(0.45, 0.1, 0.5, lambert(0xffffff), -MACA.len / 2 + 0.3, MACA.top + 0.04, 0));
    for (const [x, z] of [[-0.95, -0.33], [0.95, -0.33], [-0.95, 0.33], [0.95, 0.33]]) g.add(box(0.08, MACA.top - 0.2, 0.08, lambert(0x9aa5ad), x, (MACA.top - 0.2) / 2, z));
    this.scene.add(g);

    // pia
    const pia = new THREE.Group();
    pia.position.copy(PIA);
    pia.add(box(1.0, 0.85, 0.55, lambert(0xd9d4c7), 0, 0.425, 0));
    pia.add(box(0.7, 0.08, 0.42, lambert(0xffffff), 0, 0.88, 0.02));
    pia.add(box(0.06, 0.3, 0.06, lambert(0xb8c4cc), 0, 1.05, -0.18));
    pia.add(box(0.06, 0.06, 0.18, lambert(0xb8c4cc), 0, 1.18, -0.1));
    pia.add(box(0.16, 0.26, 0.1, lambert(0x3aa2d6), 0.38, 1.35, -0.22));
    pia.add(box(0.5, 0.65, 0.04, lambert(0xcfe6f0), 0, 1.55, -0.25));
    const plate = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.2), new THREE.MeshBasicMaterial({ map: labelTexture('PIA', '#2f7fb5') }));
    plate.position.set(0, 2.0, -0.22);
    pia.add(plate);
    pia.traverse(m => {
      if (m instanceof THREE.Mesh) {
        m.userData.alvo = 'pia';
        this.clickables.push(m);
      }
    });
    this.scene.add(pia);

    // mesa do avaliador
    const mesa = new THREE.Group();
    mesa.position.set(-2.55, 0, -2.25);
    mesa.rotation.y = Math.PI / 2.4;
    mesa.add(box(1.2, 0.06, 0.7, lambert(0xa47148), 0, 0.75, 0));
    for (const [x, z] of [[-0.55, -0.3], [0.55, -0.3], [-0.55, 0.3], [0.55, 0.3]]) mesa.add(box(0.06, 0.72, 0.06, lambert(0x6d4a2f), x, 0.36, z));
    mesa.add(box(0.28, 0.02, 0.36, lambert(0xffffff), 0.1, 0.79, 0));
    this.scene.add(mesa);
    const cadeira = box(0.5, 0.42, 0.5, lambert(0x445566), -3.3, 0.21, -2.6);
    this.scene.add(cadeira);
  }

  private buildDoor() {
    const pivot = new THREE.Group();
    pivot.position.set(-DOOR_W / 2, 0, ROOM.z1);
    const leaf = box(DOOR_W, 2.2, 0.1, new THREE.MeshLambertMaterial({ color: 0x7a4e2d, transparent: true }), DOOR_W / 2, 1.1, 0);
    this.frontWall.push(leaf);
    leaf.userData.alvo = 'porta';
    pivot.add(leaf);
    pivot.add(box(0.08, 0.08, 0.16, lambert(0xd8c070), DOOR_W - 0.15, 1.05, 0));
    this.clickables.push(leaf);
    this.scene.add(pivot);
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.42), new THREE.MeshBasicMaterial({ map: labelTexture(`ESTAÇÃO ${this.o.numero}`, '#1f2a44', '#fff', 320, 104), transparent: true }));
    this.frontWall.push(sign);
    sign.position.set(0, 2.42, ROOM.z1 + 0.11);
    this.scene.add(sign);
    return pivot;
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

  /** Animação da manobra: instrumento no ponto do corpo, anel que pulsa e câmera em close. */
  examinar(id: string, regiao: Regiao, dor = false) {
    const { ancora, ferramenta } = ondeExaminar(id, regiao);
    this.pulse(regiao);
    if (dor) this.dorT = 1.8;
    if (this.ferr) {
      this.scene.remove(this.ferr);
      this.ferr = null;
    }
    const pl = this.player.root.position;
    let pos: THREE.Vector3;
    let n: THREE.Vector3;
    const a = ancora ? this.ancoras.get(ancora) : undefined;
    this.patient.root.updateMatrixWorld(true);
    if (a) {
      pos = a.getWorldPosition(new THREE.Vector3());
      n = (a.userData.n as THREE.Vector3).clone().applyQuaternion(a.getWorldQuaternion(new THREE.Quaternion())).normalize();
    } else {
      pos = this.patient.chest.getWorldPosition(new THREE.Vector3());
      n = new THREE.Vector3(pl.x - pos.x, 0, pl.z - pos.z).normalize();
    }
    const lado = new THREE.Vector3(pl.x - pos.x, 0, pl.z - pos.z).normalize();
    const dist = a ? 0.75 : 2.3;
    const dir = n.clone().add(new THREE.Vector3(0, 0.75, 0)).add(lado.multiplyScalar(0.55)).normalize();
    const cam = pos.clone().add(dir.multiplyScalar(dist));
    cam.y = Math.max(cam.y, 0.5);
    if (a && ferramenta !== 'olhar') {
      const f = ferramenta3d(ferramenta);
      f.position.copy(pos).addScaledVector(n, 0.006);
      f.lookAt(pos.clone().add(n));
      this.scene.add(f);
      this.ferr = f;
    }
    this.anel.visible = !!a;
    this.anel.position.copy(pos).addScaledVector(n, 0.012);
    this.anel.lookAt(pos.clone().add(n));
    this.faceTo(pos);
    this.gestureT = 2.4;
    let dur = 3.2;
    if (this.posture === 'pe' && /^(neu-(marcha|calcanhares)|cp-marcha)/.test(id)) dur = this.iniciaAnim('marcha', 7);
    else if (this.posture === 'pe' && /romberg/.test(id)) dur = this.iniciaAnim('romberg', 5.5);
    else if (this.posture === 'pe' && /pull/.test(id)) dur = this.iniciaAnim('pull', 3);
    this.close = { pos, n, cam, t: dur, total: dur, bate: ferramenta === 'martelo' || ferramenta === 'mao', seguir: !!this.anim };
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
      if (this.frontWall.includes(m)) continue;
      if (m.userData.regiao) return { alvo: { kind: 'paciente', regiao: m.userData.regiao } as Alvo, mesh: m, point: h.point };
      if (m.userData.alvo === 'pia') return { alvo: { kind: 'pia' } as Alvo, mesh: m, point: h.point };
      if (m.userData.alvo === 'avaliador') return { alvo: { kind: 'avaliador' } as Alvo, mesh: m, point: h.point };
      if (m.userData.alvo === 'porta') return { alvo: { kind: 'porta' } as Alvo, mesh: m, point: h.point };
      if (this.floor.includes(m)) return { alvo: null, mesh: null, point: h.point };
    }
    return null;
  }

  private setHover(ms: THREE.Mesh[]) {
    for (const m of this.hovered) (m.material as THREE.MeshLambertMaterial).emissive?.setHex(0);
    this.hovered = ms;
    for (const m of ms) (m.material as THREE.MeshLambertMaterial).emissive?.setHex(0x335577);
  }

  private onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const p = this.pick(e);
    let ms: THREE.Mesh[] = [];
    if (p?.alvo?.kind === 'paciente') ms = this.patient.parts.get(p.alvo.regiao) ?? [];
    else if (p?.alvo && p.mesh) ms = [p.mesh];
    this.canvas.style.cursor = p?.alvo ? 'pointer' : 'default';
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
    const p = this.pick(e);
    if (!p) return;
    if (p.alvo) this.o.onClick(p.alvo);
    else {
      this.target = new THREE.Vector3(p.point.x, 0, p.point.z);
      this.arrive = null;
    }
  };

  private onKey = (e: KeyboardEvent) => {
    const t = e.target as HTMLElement;
    if (/INPUT|TEXTAREA|SELECT/.test(t.tagName)) return;
    const k = e.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
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
    const r = 0.28;
    const inRoom = x > ROOM.x0 + r && x < ROOM.x1 - r && z > ROOM.z0 + r && z < ROOM.z1 - 0.1;
    const inCorr = x > CORR.x0 + r && x < CORR.x1 - r && z > CORR.z0 + 0.1 && z < CORR.z1 - r;
    const inDoor = Math.abs(x) < DOOR_W / 2 - 0.15 && z >= ROOM.z1 - 0.3 && z <= ROOM.z1 + 0.3;
    if (!inRoom && !inCorr && !inDoor) return true;
    if (!this.doorOpen && z < ROOM.z1 + r) return true;
    const boxes: [number, number, number, number][] = [
      [MACA.x - MACA.len / 2, MACA.x + MACA.len / 2, MACA.z - MACA.wid / 2, MACA.z + MACA.wid / 2],
      [PIA.x - 0.5, PIA.x + 0.5, PIA.z - 0.3, PIA.z + 0.3],
      [-3.4, -1.9, -3.0, -1.5],
      [-3.6, -3.0, -2.9, -2.3],
    ];
    if (this.posture === 'pe') boxes.push([MACA.x + 0.0, MACA.x + 0.4, MACA.z + 0.65, MACA.z + 1.05]);
    if (this.posture === 'sentado') boxes.push([MACA.x - 0.25, MACA.x + 0.25, MACA.z, MACA.z + 0.85]);
    return boxes.some(([x0, x1, z0, z1]) => x > x0 - r && x < x1 + r && z > z0 - r && z < z1 + r);
  }

  private step(dt: number) {
    const pl = this.player;
    let dx = 0;
    let dz = 0;
    if (this.keys.has('w') || this.keys.has('arrowup')) dz -= 1;
    if (this.keys.has('s') || this.keys.has('arrowdown')) dz += 1;
    if (this.keys.has('a') || this.keys.has('arrowleft')) dx -= 1;
    if (this.keys.has('d') || this.keys.has('arrowright')) dx += 1;
    if (this.joy.x || this.joy.y) {
      dx = this.joy.x;
      dz = this.joy.y;
      this.target = null;
    }
    if (!dx && !dz && this.target) {
      const v = this.target.clone().sub(pl.root.position).setY(0);
      if (v.length() < 0.08) {
        this.target = null;
        const a = this.arrive;
        this.arrive = null;
        if (a) {
          this.faceTo(new THREE.Vector3(MACA.x, 0, MACA.z));
          a();
        }
      } else {
        v.normalize();
        dx = v.x;
        dz = v.z;
      }
    }
    const len = Math.hypot(dx, dz);
    const moving = len > 0.01;
    if (moving) {
      const sp = 3.2 * dt;
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
      this.heading = Math.atan2(dx, dz);
    }
    let dh = this.heading - pl.root.rotation.y;
    dh = Math.atan2(Math.sin(dh), Math.cos(dh));
    pl.root.rotation.y += dh * Math.min(1, dt * 12);

    const t = this.clock.elapsedTime;
    const sw = moving ? Math.sin(t * 10) * 0.7 : 0;
    pl.hipL.rotation.x += (sw - pl.hipL.rotation.x) * 0.3;
    pl.hipR.rotation.x += (-sw - pl.hipR.rotation.x) * 0.3;
    const g = this.gestureT > 0 ? (this.close ? -1.45 : -1.2) : 0;
    pl.armL.rotation.x += ((g || -sw) - pl.armL.rotation.x) * 0.3;
    pl.armR.rotation.x += ((g || sw) - pl.armR.rotation.x) * 0.3;
    pl.root.position.y = moving ? Math.abs(Math.sin(t * 10)) * 0.03 : 0;
    this.gestureT = Math.max(0, this.gestureT - dt);
  }

  private faceTo(v: THREE.Vector3) {
    const p = this.player.root.position;
    this.heading = Math.atan2(v.x - p.x, v.z - p.z);
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
    this.patient.chest.scale.set(1 + (s - 1) * 0.3, 1, s);
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
    const dentro = p.z < ROOM.z1;
    const k = `${perto}|${pertoPia}|${lado}|${dentro}`;
    if (k !== this.lastProx) {
      this.lastProx = k;
      this.o.onProx({ pertoPaciente: perto, pertoPia, lado, dentro });
    }
    // parede da frente some quando o jogador está dentro
    const op = dentro ? 0.12 : 1;
    for (const m of this.frontWall) {
      const mat = m.material as THREE.MeshLambertMaterial | THREE.MeshBasicMaterial;
      mat.opacity += (op - mat.opacity) * 0.15;
      mat.depthWrite = mat.opacity > 0.9;
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
    this.prox();
    const want = this.doorOpen ? -Math.PI / 2 : 0;
    this.door.rotation.y += (want - this.door.rotation.y) * 0.08;
    if (this.flash) {
      this.flash.t -= dt;
      const on = this.flash.t > 0 && Math.floor(this.flash.t * 8) % 2 === 0;
      for (const m of this.flash.meshes) if (!this.hovered.includes(m)) (m.material as THREE.MeshLambertMaterial).emissive?.setHex(on ? 0x2d6a3e : 0);
      if (this.flash.t <= 0) this.flash = null;
    }
    // expressão de dor
    if (this.dorT > 0) this.dorT = Math.max(0, this.dorT - dt);
    const d = this.dorT > 0 ? 1 : 0;
    this.patient.boca.scale.set(1 - 0.15 * d, 1 + 2.5 * d, 1);
    for (const o of this.patient.olhos) o.scale.y = 1 - 0.75 * d;
    this.player.root.visible = !this.close || this.close.t < 0.25;
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
      if (this.ferr && c.bate) this.ferr.position.copy(c.pos).addScaledVector(c.n, 0.006 + Math.max(0, Math.sin(this.clock.elapsedTime * 9)) * 0.02);
      if (c.t <= 0) {
        this.close = null;
        this.anel.visible = false;
        if (this.ferr) {
          this.scene.remove(this.ferr);
          this.ferr = null;
        }
      }
    } else {
      // câmera em terceira pessoa (ângulo fixo, segue o jogador)
      const p = this.player.root.position;
      const inside = p.z < ROOM.z1;
      const want3 = new THREE.Vector3(p.x * 0.6, inside ? 5.4 : 4.2, p.z + (inside ? 5.2 : 4.6));
      this.camera.position.lerp(want3, 0.08);
      const look = new THREE.Vector3(p.x * 0.8, 0.8, p.z - (inside ? 1.2 : 1.6));
      this.lookCur.lerp(look, 0.15);
      this.camera.lookAt(this.lookCur);
    }
    this.renderer.render(this.scene, this.camera);
  };

  private resize() {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.fov = w < h ? 68 : 50;
    this.camera.updateProjectionMatrix();
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.canvas.removeEventListener('pointermove', this.onMove);
    this.canvas.removeEventListener('pointerdown', this.onDown);
    window.removeEventListener('keydown', this.onKey);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('blur', this.onBlur);
    this.scene.traverse(o => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        const m = o.material as THREE.MeshBasicMaterial;
        m.map?.dispose();
        m.dispose();
      }
    });
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
