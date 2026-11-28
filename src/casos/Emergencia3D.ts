/**
 * Sala de emergência 3D para os casos vivos: o paciente na maca reage aos sinais vitais do motor
 * (respiração, cianose, palidez, parada), o monitor mostra o ritmo real do caso com bipes e alarmes,
 * e estações clicáveis na sala abrem as condutas (paciente, monitor, computador de exames,
 * carrinho de medicações, carrinho de parada, telefone).
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { construirSala, LUMINARIAS, SALA } from '../osce/salaOsce';
import { boneco, type Boneco } from '../osce/scene';
import { audioCtx } from '../osce/sfx';
import { amostra } from './ecg';
import type { Grupo, Vitais } from './motor';

export type Estacao3D = 'paciente' | 'monitor' | 'exames' | 'medicacoes' | 'procedimentos' | 'decisao';
export const GRUPO_DA_ESTACAO: Record<Estacao3D, Grupo> = {
  paciente: 'Avaliação', monitor: 'Monitorização', exames: 'Exames', medicacoes: 'Medicações', procedimentos: 'Procedimentos', decisao: 'Decisão',
};
export const NOME_ESTACAO: Record<Estacao3D, string> = {
  paciente: 'Paciente', monitor: 'Monitor e O₂', exames: 'Exames', medicacoes: 'Medicações', procedimentos: 'Procedimentos', decisao: 'Telefone e decisões',
};

export interface Pino { id: Estacao3D; x: number; y: number; visivel: boolean }
interface Opts {
  sexo: 'M' | 'F';
  onEstacao: (e: Estacao3D) => void;
  onPinos: (p: Pino[]) => void;
}

const MACA = { x: 0, z: -1, top: 0.74, len: 2.1, wid: 0.8 };
const S = 0.88;

/** pontos de vista (posição da câmera e ponto observado) */
const VISTAS: Record<Estacao3D | 'geral', { pos: [number, number, number]; olhar: [number, number, number] }> = {
  geral: { pos: [0.9, 1.62, 2.4], olhar: [-0.2, 0.9, -1.2] },
  paciente: { pos: [0.35, 1.55, 0.25], olhar: [-0.35, 0.82, -1] },
  monitor: { pos: [-0.75, 1.5, -0.35], olhar: [-1.65, 1.42, -1.6] },
  exames: { pos: [-1.55, 1.45, -1.1], olhar: [-2.6, 0.9, -2.3] },
  medicacoes: { pos: [-0.9, 1.5, 1.7], olhar: [-1.95, 0.95, 0.75] },
  procedimentos: { pos: [1.25, 1.5, 0.35], olhar: [2.25, 0.95, -1.3] },
  decisao: { pos: [1.0, 1.55, 2.55], olhar: [1.65, 1.45, 3.95] },
};
/** onde aparece o pino de cada estação */
const ANCORA: Record<Estacao3D, [number, number, number]> = {
  paciente: [-0.25, 1.15, -1],
  monitor: [-1.65, 1.95, -1.6],
  exames: [-2.55, 1.25, -2.25],
  medicacoes: [-1.95, 1.35, 0.75],
  procedimentos: [2.25, 1.45, -1.3],
  decisao: [1.65, 1.85, 3.94],
};

const mat = (c: number, rough = 0.6, metal = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: rough, metalness: metal });

function caixa(w: number, h: number, d: number, m: THREE.Material, x: number, y: number, z: number, pai: THREE.Object3D, r = 0.01) {
  const mesh = new THREE.Mesh(r > 0 ? new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 2, h / 2, d / 2) * 0.99) : new THREE.BoxGeometry(w, h, d), m);
  mesh.position.set(x, y, z);
  mesh.castShadow = mesh.receiveShadow = true;
  pai.add(mesh);
  return mesh;
}

function telaCanvas(w: number, h: number) {
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return { cv, tex, g: cv.getContext('2d')! };
}

export class Emergencia3D {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private clock = new THREE.Clock();
  private raf = 0;
  private ro: ResizeObserver;
  private ray = new THREE.Raycaster();
  private ptr = new THREE.Vector2();
  private alvos: THREE.Object3D[] = [];
  private grupos = new Map<Estacao3D, THREE.Mesh[]>();
  private paciente: Boneco;
  private pele: THREE.MeshStandardMaterial[] = [];
  private corPele: THREE.Color;
  private monitorTela = telaCanvas(512, 320);
  private pcTela = telaCanvas(512, 320);
  private desfibTela = telaCanvas(256, 160);
  private v: Vitais | null = null;
  private monitorado = false;
  private oximetro = false;
  private limpar = true;
  private quadro = '';
  // câmera
  private pos = new THREE.Vector3(...VISTAS.geral.pos);
  private yaw = 0;
  private pitch = 0;
  private tween: { de: THREE.Vector3; para: THREE.Vector3; yaw0: number; yaw1: number; p0: number; p1: number; t: number } | null = null;
  private arrasto: { x: number; y: number; yaw: number; pitch: number; mov: number } | null = null;
  private hover: Estacao3D | null = null;
  // monitor e sons
  private varre = 0;
  private yAnt = 0;
  private faseBat = 0;
  private alarmeT = 0;
  private pinosT = 0;
  som = true;
  /** compressões torácicas em andamento */
  rcp = false;
  private flash = 0;
  private flashEl: HTMLDivElement;
  private disposed = false;

  constructor(private canvas: HTMLCanvasElement, private o: Opts) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.scene.background = new THREE.Color(0x1d2329);
    this.camera = new THREE.PerspectiveCamera(68, 1, 0.05, 40);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
    this.scene.environmentIntensity = 0.32;
    RectAreaLightUniformsLib.init();
    for (const [x, z] of LUMINARIAS) {
      const l = new THREE.RectAreaLight(0xfff6e8, 5.2, 1.18, 0.58);
      l.position.set(x, SALA.h - 0.035, z);
      l.lookAt(x, 0, z);
      this.scene.add(l);
    }
    this.scene.add(new THREE.HemisphereLight(0xfffaf2, 0xe0d8cc, 0.9));
    const luz = new THREE.DirectionalLight(0xfff4e6, 1.1);
    luz.position.set(0.8, 7, 1.4);
    luz.castShadow = true;
    luz.shadow.mapSize.set(2048, 2048);
    Object.assign(luz.shadow.camera, { left: -5.2, right: 5.2, top: 5.2, bottom: -5.2, near: 2, far: 10 });
    luz.shadow.bias = -0.0004;
    luz.shadow.normalBias = 0.02;
    this.scene.add(luz);
    const foco = new THREE.SpotLight(0xfff2de, 6, 6, 0.6, 0.8, 1.6);
    foco.position.set(MACA.x + 0.2, SALA.h - 0.05, MACA.z + 0.2);
    foco.target.position.set(MACA.x, 0.7, MACA.z);
    this.scene.add(foco, foco.target);

    const sala = construirSala(this.scene, '', new THREE.Vector3(3.55, 0, -3.7), MACA, this.renderer.capabilities.getMaxAnisotropy(), 'emergencia');
    // computador de exames: usa a tela do notebook da mesa
    this.pcTela = { cv: sala.telaAvaliador.cv, tex: sala.telaAvaliador.tex, g: sala.telaAvaliador.cv.getContext('2d')! };
    this.desenhaPC();

    // paciente deitado
    const f = o.sexo === 'F';
    const corPele = f ? 0xc68642 : 0xf1c27d;
    this.corPele = new THREE.Color(corPele);
    this.paciente = boneco({ pele: corPele, cabelo: f ? 0x2b1a10 : 0x4a3b30, tronco: 0x9ccbe8, calca: 0x7fb0d0, sapato: 0xeeeeee, longo: f });
    const b = this.paciente;
    b.root.rotation.set(-Math.PI / 2, Math.PI / 2, 0, 'YXZ');
    b.root.position.set(MACA.x + 0.05, MACA.top + 0.11 * S + 0.01, MACA.z);
    b.torso.rotation.x = 0.35;
    this.scene.add(b.root);
    for (const r of ['cabeca', 'mmss'] as const)
      for (const m of b.parts.get(r) ?? []) {
        const mt = m.material as THREE.MeshStandardMaterial;
        if (mt.color.getHex() === corPele) this.pele.push(mt);
      }
    const meshesPaciente: THREE.Mesh[] = [];
    b.root.traverse(x => x instanceof THREE.Mesh && meshesPaciente.push(x));
    this.registrar('paciente', meshesPaciente);

    this.montarMonitor();
    this.montarCarrinhoParada();
    this.montarCarrinhoMedicacoes();
    this.montarTelefone();
    // a mesa com o notebook vira a estação de exames
    const exames: THREE.Mesh[] = [];
    this.scene.traverse(x => {
      if (!(x instanceof THREE.Mesh)) return;
      const p = new THREE.Vector3();
      x.getWorldPosition(p);
      if (Math.hypot(p.x + 2.55, p.z + 2.25) < 0.75 && p.y > 0.7 && p.y < 1.2) exames.push(x);
    });
    this.registrar('exames', exames);

    // câmera inicial
    this.olharPara(new THREE.Vector3(...VISTAS.geral.olhar), true);
    canvas.addEventListener('pointerdown', this.onDown);
    canvas.addEventListener('pointermove', this.onMove);
    canvas.addEventListener('pointerup', this.onUp);
    canvas.addEventListener('pointercancel', this.onUp);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas);
    this.resize();
    // clarão do choque (sobre o canvas)
    this.flashEl = document.createElement('div');
    Object.assign(this.flashEl.style, { position: 'absolute', inset: '0', background: '#e8f4ff', opacity: '0', pointerEvents: 'none', transition: 'opacity 0.35s' });
    canvas.parentElement?.appendChild(this.flashEl);
    this.loop();
  }

  /** desfibrilação/cardioversão: clarão, tranco do paciente e estalo */
  choque() {
    this.flash = 0.35;
    this.flashEl.style.transition = 'none';
    this.flashEl.style.opacity = '0.85';
    requestAnimationFrame(() => {
      this.flashEl.style.transition = 'opacity 0.45s';
      this.flashEl.style.opacity = '0';
    });
    if (!this.som) return;
    try {
      const ctx = audioCtx();
      const n = ctx.createBufferSource();
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.25, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
      n.buffer = buf;
      const g = ctx.createGain();
      g.gain.value = 0.25;
      n.connect(g).connect(ctx.destination);
      n.start();
    } catch { /* sem áudio */ }
  }

  /* ---------- estações ---------- */
  private registrar(id: Estacao3D, ms: THREE.Mesh[]) {
    for (const m of ms) {
      if (!Array.isArray(m.material)) m.material = (m.material as THREE.Material).clone();
      m.userData.estacao = id;
      this.alvos.push(m);
    }
    this.grupos.set(id, ms);
  }

  private montarMonitor() {
    const g = new THREE.Group();
    g.position.set(-1.65, 0, -1.6);
    g.rotation.y = 0.55;
    const metal = mat(0xc9ced2, 0.3, 0.9);
    const plast = mat(0xe9ecee, 0.4);
    const ms: THREE.Mesh[] = [];
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const p = caixa(0.26, 0.025, 0.035, metal, Math.cos(a) * 0.13, 0.06, Math.sin(a) * 0.13, g);
      p.rotation.y = -a;
      ms.push(p);
    }
    ms.push(caixa(0.036, 1.2, 0.036, metal, 0, 0.66, 0, g, 0.015));
    ms.push(caixa(0.68, 0.48, 0.1, plast, 0, 1.45, 0, g, 0.03));
    ms.push(caixa(0.4, 0.04, 0.06, plast, 0, 1.72, -0.01, g, 0.02));
    const tela = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.39), new THREE.MeshBasicMaterial({ map: this.monitorTela.tex }));
    tela.position.set(0, 1.46, 0.052);
    g.add(tela);
    ms.push(tela);
    // cabos até o paciente
    const cabo = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0.25, 1.3, -0.04), new THREE.Vector3(0.6, 0.9, 0.2), new THREE.Vector3(1.2, 0.95, 0.35)]), 24, 0.005, 6), mat(0x3a4046, 0.5));
    g.add(cabo);
    this.scene.add(g);
    this.registrar('monitor', ms);
  }

  private montarCarrinhoParada() {
    const g = new THREE.Group();
    g.position.set(2.25, 0, -1.3);
    g.rotation.y = -Math.PI / 2;
    const vermelho = mat(0xc62828, 0.45);
    const ms: THREE.Mesh[] = [];
    ms.push(caixa(0.7, 0.9, 0.5, vermelho, 0, 0.53, 0, g, 0.02));
    for (let i = 0; i < 4; i++) {
      ms.push(caixa(0.66, 0.18, 0.02, mat(0xe53935, 0.4), 0, 0.2 + i * 0.21, 0.255, g, 0.005));
      ms.push(caixa(0.3, 0.02, 0.03, mat(0xdddddd, 0.3, 0.8), 0, 0.27 + i * 0.21, 0.27, g, 0.008));
    }
    for (const [x, z] of [[-0.3, -0.2], [0.3, -0.2], [-0.3, 0.2], [0.3, 0.2]]) ms.push(caixa(0.05, 0.08, 0.05, mat(0x222222, 0.9), x, 0.04, z, g, 0.01));
    // desfibrilador em cima
    ms.push(caixa(0.42, 0.26, 0.3, mat(0xf0c419, 0.4), 0, 1.11, 0, g, 0.03));
    const tela = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.12), new THREE.MeshBasicMaterial({ map: this.desfibTela.tex }));
    tela.position.set(-0.06, 1.15, 0.151);
    g.add(tela);
    ms.push(tela);
    for (const x of [0.1, 0.16]) ms.push(caixa(0.05, 0.12, 0.05, mat(0x37474f, 0.4), x, 1.27, 0.08, g, 0.015));
    // tábua de RCP no lado
    ms.push(caixa(0.02, 0.6, 0.45, mat(0xf2c12e, 0.5), 0.37, 0.6, 0, g, 0.01));
    const placa = this.placa('CARRINHO DE PARADA', '#c62828');
    placa.position.set(0, 0.95, 0.256);
    g.add(placa);
    this.scene.add(g);
    this.registrar('procedimentos', ms);
    const c = this.desfibTela.g;
    c.fillStyle = '#071014';
    c.fillRect(0, 0, 256, 160);
    c.fillStyle = '#3ce07a';
    c.font = 'bold 26px monospace';
    c.fillText('DEA/MANUAL', 20, 50);
    c.fillStyle = '#ffd54f';
    c.fillText('200 J', 20, 110);
    this.desfibTela.tex.needsUpdate = true;
  }

  private montarCarrinhoMedicacoes() {
    const g = new THREE.Group();
    g.position.set(-1.95, 0, 0.75);
    g.rotation.y = Math.PI / 2;
    const ms: THREE.Mesh[] = [];
    ms.push(caixa(0.6, 0.85, 0.45, mat(0xeef3f7, 0.4), 0, 0.5, 0, g, 0.02));
    const cores = [0x1e88e5, 0x43a047, 0xfb8c00];
    for (let i = 0; i < 3; i++) ms.push(caixa(0.56, 0.22, 0.02, mat(cores[i], 0.45), 0, 0.27 + i * 0.25, 0.23, g, 0.006));
    ms.push(caixa(0.64, 0.03, 0.5, mat(0xd0d5d9, 0.3, 0.8), 0, 0.94, 0, g, 0.01));
    // ampolas e seringas em cima
    for (let i = 0; i < 8; i++) {
      const amp = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.06, 10), new THREE.MeshStandardMaterial({ color: [0xffffff, 0xffe082, 0xb3e5fc][i % 3], roughness: 0.1, transparent: true, opacity: 0.85 }));
      amp.position.set(-0.22 + i * 0.05, 0.985, -0.1);
      g.add(amp);
      ms.push(amp);
    }
    for (let i = 0; i < 3; i++) ms.push(caixa(0.16, 0.022, 0.022, mat(0xffffff, 0.3), 0.1, 0.966, 0.06 + i * 0.05, g, 0.008));
    const placa = this.placa('MEDICAÇÕES', '#1e88e5');
    placa.position.set(0, 0.9, 0.236);
    g.add(placa);
    this.scene.add(g);
    this.registrar('medicacoes', ms);
  }

  private montarTelefone() {
    const g = new THREE.Group();
    g.position.set(1.65, 1.45, 3.98);
    g.rotation.y = Math.PI;
    const ms: THREE.Mesh[] = [];
    ms.push(caixa(0.2, 0.28, 0.05, mat(0x37474f, 0.4), 0, 0, 0.025, g, 0.02));
    ms.push(caixa(0.06, 0.24, 0.05, mat(0x263238, 0.4), -0.06, 0, 0.07, g, 0.02));
    for (let i = 0; i < 9; i++) ms.push(caixa(0.025, 0.02, 0.01, mat(0xcfd8dc, 0.4), 0.02 + (i % 3) * 0.035, 0.05 - Math.floor(i / 3) * 0.035, 0.055, g, 0.004));
    const placa = this.placa('RAMAIS · UTI · CIRURGIA', '#455a64');
    placa.position.set(0, 0.24, 0.02);
    g.add(placa);
    this.scene.add(g);
    this.registrar('decisao', ms);
  }

  private placa(texto: string, cor: string) {
    const { cv, tex, g } = telaCanvas(512, 96);
    g.fillStyle = cor;
    g.fillRect(0, 0, cv.width, cv.height);
    g.fillStyle = '#fff';
    g.font = 'bold 44px system-ui, sans-serif';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(texto, 256, 50);
    tex.needsUpdate = true;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.083), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5 }));
    return m;
  }

  private desenhaPC() {
    const { g, cv, tex } = this.pcTela;
    g.fillStyle = '#f4f6f8';
    g.fillRect(0, 0, cv.width, cv.height);
    g.fillStyle = '#1b4d89';
    g.fillRect(0, 0, cv.width, 44);
    g.fillStyle = '#fff';
    g.font = 'bold 22px system-ui, sans-serif';
    g.fillText('Prontuário · Exames', 16, 30);
    g.fillStyle = '#37474f';
    g.font = '18px system-ui, sans-serif';
    ['Laboratório', 'Imagem', 'ECG', 'Resultados'].forEach((s, i) => {
      g.fillStyle = i % 2 ? '#ffffff' : '#eef2f5';
      g.fillRect(12, 60 + i * 52, cv.width - 24, 44);
      g.fillStyle = '#37474f';
      g.fillText(s, 28, 88 + i * 52);
    });
    tex.needsUpdate = true;
  }

  /* ---------- estado do caso ---------- */
  atualizar(v: Vitais, monitorado: boolean, quadro: string, oximetro = true) {
    this.v = v;
    if (monitorado && !this.monitorado) this.limpar = true;
    this.monitorado = monitorado;
    this.oximetro = oximetro;
    this.quadro = quadro;
  }

  irPara(id: Estacao3D | 'geral') {
    const vis = VISTAS[id];
    const para = new THREE.Vector3(...vis.pos);
    const d = new THREE.Vector3(...vis.olhar).sub(para);
    const yaw1 = Math.atan2(d.x, -d.z);
    const p1 = Math.atan2(d.y, Math.hypot(d.x, d.z));
    let dy = yaw1 - this.yaw;
    dy = Math.atan2(Math.sin(dy), Math.cos(dy));
    this.tween = { de: this.pos.clone(), para, yaw0: this.yaw, yaw1: this.yaw + dy, p0: this.pitch, p1, t: 0 };
  }

  private olharPara(p: THREE.Vector3, imediato = false) {
    const d = p.clone().sub(this.pos);
    if (imediato) {
      this.yaw = Math.atan2(d.x, -d.z);
      this.pitch = Math.atan2(d.y, Math.hypot(d.x, d.z));
    }
  }

  /* ---------- entrada ---------- */
  private onDown = (ev: PointerEvent) => {
    this.arrasto = { x: ev.clientX, y: ev.clientY, yaw: this.yaw, pitch: this.pitch, mov: 0 };
  };
  private onMove = (ev: PointerEvent) => {
    if (this.arrasto) {
      const dx = ev.clientX - this.arrasto.x, dy = ev.clientY - this.arrasto.y;
      this.arrasto.mov = Math.max(this.arrasto.mov, Math.hypot(dx, dy));
      if (this.arrasto.mov > 6) {
        this.tween = null;
        this.yaw = this.arrasto.yaw + dx * 0.005;
        this.pitch = Math.max(-1.1, Math.min(0.8, this.arrasto.pitch + dy * 0.004));
      }
      return;
    }
    const h = this.pick(ev);
    if (h !== this.hover) this.realce(h);
  };
  private onUp = (ev: PointerEvent) => {
    const a = this.arrasto;
    this.arrasto = null;
    if (!a || a.mov > 6) return;
    const id = this.pick(ev);
    if (id) {
      this.irPara(id);
      this.o.onEstacao(id);
    }
  };
  private pick(ev: PointerEvent): Estacao3D | null {
    const r = this.canvas.getBoundingClientRect();
    this.ptr.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    this.ray.setFromCamera(this.ptr, this.camera);
    const hit = this.ray.intersectObjects(this.alvos, false)[0];
    return (hit?.object.userData.estacao as Estacao3D) ?? null;
  }
  private realce(id: Estacao3D | null) {
    for (const [k, ms] of this.grupos)
      for (const m of ms) {
        const mt = m.material as THREE.MeshStandardMaterial;
        if (mt.emissive) mt.emissive.setHex(k === id ? 0x1d3f5c : 0);
      }
    this.hover = id;
    this.canvas.style.cursor = id ? 'pointer' : 'grab';
  }

  /* ---------- sons ---------- */
  private bipe(freq: number, dur = 0.08, vol = 0.08) {
    if (!this.som) return;
    try {
      const ctx = audioCtx();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = freq;
      g.gain.setValueAtTime(vol, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + dur + 0.02);
    } catch { /* sem áudio */ }
  }

  /* ---------- quadro a quadro ---------- */
  private loop = () => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.loop);
    if (document.hidden) return;
    const dt = Math.min(0.1, this.clock.getDelta());
    const t = this.clock.elapsedTime;
    const v = this.v;

    // câmera
    if (this.tween) {
      const tw = this.tween;
      tw.t = Math.min(1, tw.t + dt / 0.9);
      const k = tw.t < 0.5 ? 2 * tw.t * tw.t : 1 - Math.pow(-2 * tw.t + 2, 2) / 2;
      this.pos.lerpVectors(tw.de, tw.para, k);
      this.yaw = tw.yaw0 + (tw.yaw1 - tw.yaw0) * k;
      this.pitch = tw.p0 + (tw.p1 - tw.p0) * k;
      if (tw.t >= 1) this.tween = null;
    }
    this.camera.position.copy(this.pos);
    const dir = new THREE.Vector3(Math.sin(this.yaw) * Math.cos(this.pitch), Math.sin(this.pitch), -Math.cos(this.yaw) * Math.cos(this.pitch));
    this.camera.lookAt(this.pos.clone().add(dir));

    // paciente: respiração, cor da pele, olhos
    if (v) {
      const b = this.paciente;
      const vivo = v.pulso && v.fr > 0;
      const amp = vivo ? 0.035 + Math.min(0.05, Math.max(0, (v.fr - 16) * 0.0015)) : 0;
      b.chest.scale.z = 1 + amp * (0.5 + 0.5 * Math.sin(t * 2 * Math.PI * (v.fr / 60)));
      const alvo = this.corPele.clone();
      if (!v.pulso || v.spo2 < 85) alvo.lerp(new THREE.Color(0x8fa3c9), v.pulso ? Math.min(0.6, (85 - v.spo2) / 20) : 0.65);
      else if (v.pas < 85) alvo.lerp(new THREE.Color(0xf3e7da), Math.min(0.55, (85 - v.pas) / 40));
      for (const m of this.pele) m.color.lerp(alvo, Math.min(1, dt * 1.5));
      for (const o of b.olhos) o.scale.y = vivo ? 1 : 0.12;
      b.head.rotation.y = vivo ? 0.15 * Math.sin(t * 0.3) : 0.35;
      // compressões torácicas (110/min) e tranco do choque
      if (this.rcp) b.chest.scale.y = 1 - 0.12 * Math.max(0, Math.sin(t * 2 * Math.PI * (110 / 60)));
      else b.chest.scale.y = 1;
      if (this.flash > 0) {
        this.flash = Math.max(0, this.flash - dt);
        b.root.position.y = MACA.top + 0.11 * S + 0.01 + Math.sin(this.flash * 60) * 0.03 * (this.flash / 0.35);
      }
    }

    // monitor: varredura do ECG e números
    const c = this.monitorTela.g;
    const W = this.monitorTela.cv.width, H = this.monitorTela.cv.height;
    if (!this.monitorado || !v) {
      c.fillStyle = '#061015';
      c.fillRect(0, 0, W, H);
      c.fillStyle = 'rgba(255,255,255,0.5)';
      c.font = '22px monospace';
      c.fillText('SEM SINAL', W / 2 - 60, H / 2);
    } else {
      if (this.limpar) {
        this.limpar = false;
        c.fillStyle = '#061015';
        c.fillRect(0, 0, W, H);
      }
      const area = 190;
      const passos = Math.max(1, Math.round(dt * 110));
      for (let i = 0; i < passos; i++) {
        this.varre = (this.varre + 1) % W;
        const tt = t - (passos - i) / 110;
        const y = 80 - amostra(v.ritmo, tt, v.fc || 60) * 46;
        c.fillStyle = '#061015';
        c.fillRect(this.varre, 0, 8, area);
        c.strokeStyle = v.ritmo === 'fv' || v.ritmo === 'tv' ? '#ff6b6b' : '#3ce07a';
        c.lineWidth = 3;
        c.beginPath();
        c.moveTo(this.varre - 1, this.varre ? this.yAnt : y);
        c.lineTo(this.varre, y);
        c.stroke();
        this.yAnt = y;
      }
      c.fillStyle = '#061015';
      c.fillRect(0, area, W, H - area);
      c.font = 'bold 40px monospace';
      const semPulso = !v.pulso;
      c.fillStyle = '#3ce07a';
      c.fillText(semPulso ? '---' : String(Math.round(v.fc)), 14, H - 70);
      c.fillStyle = '#ffffff';
      c.fillText(semPulso ? '--/--' : `${Math.round(v.pas)}/${Math.round(v.pad)}`, 140, H - 70);
      c.fillStyle = '#4fc3f7';
      c.fillText(semPulso || !this.oximetro ? '--' : String(Math.round(v.spo2)), 360, H - 70);
      c.fillStyle = '#ffd54f';
      c.fillText(semPulso ? '--' : String(Math.round(v.fr)), 448, H - 70);
      c.font = '16px monospace';
      c.fillStyle = 'rgba(255,255,255,0.6)';
      c.fillText('FC', 14, H - 112);
      c.fillText('PA', 140, H - 112);
      c.fillText('SpO2', 360, H - 112);
      c.fillText('FR', 448, H - 112);
      const alarme = semPulso || v.spo2 < 88 || v.pas < 85 || v.fc > 140 || (v.fc < 45 && v.pulso);
      if (alarme && Math.floor(t * 2) % 2 === 0) {
        c.fillStyle = '#ff3b30';
        c.fillRect(0, area, W, 26);
        c.fillStyle = '#fff';
        c.font = 'bold 18px monospace';
        c.fillText(semPulso ? 'ALARME: SEM PULSO' : 'ALARME', 12, area + 19);
      }
      // bipes: um por batimento; alarme sonoro a cada 1,5 s
      if (v.pulso && v.fc > 0) {
        this.faseBat += dt * (v.fc / 60);
        if (this.faseBat >= 1) {
          this.faseBat -= 1;
          this.bipe(500 + Math.max(0, v.spo2 - 80) * 18, 0.07, 0.05);
        }
      }
      this.alarmeT -= dt;
      if (alarme && this.alarmeT <= 0) {
        this.alarmeT = 1.5;
        this.bipe(960, 0.18, 0.06);
        setTimeout(() => this.bipe(720, 0.18, 0.06), 200);
      }
    }
    this.monitorTela.tex.needsUpdate = true;

    // pinos das estações (posição na tela)
    this.pinosT -= dt;
    if (this.pinosT <= 0) {
      this.pinosT = 0.1;
      this.camera.updateMatrixWorld();
      const r = this.canvas.getBoundingClientRect();
      const pinos: Pino[] = (Object.keys(ANCORA) as Estacao3D[]).map(id => {
        const p = new THREE.Vector3(...ANCORA[id]).project(this.camera);
        return { id, x: ((p.x + 1) / 2) * r.width, y: ((1 - p.y) / 2) * r.height, visivel: p.z < 1 && Math.abs(p.x) < 1.05 && Math.abs(p.y) < 1.05 };
      });
      this.o.onPinos(pinos);
    }
    this.renderer.render(this.scene, this.camera);
  };

  private resize() {
    const w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.fov = w < h ? 82 : 68;
    this.camera.updateProjectionMatrix();
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.canvas.removeEventListener('pointerdown', this.onDown);
    this.canvas.removeEventListener('pointermove', this.onMove);
    this.canvas.removeEventListener('pointerup', this.onUp);
    this.canvas.removeEventListener('pointercancel', this.onUp);
    this.scene.traverse(o => {
      if (o instanceof THREE.Mesh) {
        o.geometry.dispose();
        for (const m of (Array.isArray(o.material) ? o.material : [o.material]) as THREE.MeshStandardMaterial[]) {
          m.map?.dispose();
          m.dispose();
        }
      }
    });
    this.scene.environment?.dispose();
    this.flashEl.remove();
    this.renderer.dispose();
  }
}
