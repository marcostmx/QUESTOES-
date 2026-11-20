/* Sala de OSCE em alta fidelidade: materiais PBR (rugosidade/metal), texturas procedurais
 * (vinílico, pintura, lambri, forro mineral, madeira, azulejo, tecido) e mobiliário modelado
 * peça por peça. Nada é mesclado: cada objeto mantém sua geometria e material. */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export const SALA = { x0: -4.5, x1: 4.5, z0: -4.5, z1: 4, h: 2.8 };
/** Centros das luminárias de LED do forro (x, z); 1,2 × 0,6 m cada. */
export const LUMINARIAS: [number, number][] = [[-2, -2.2], [2, -2.2], [-2, 1.6], [2, 1.6]];
export type Caixa = [number, number, number, number];

let ANISO = 4;

/* ---------------- texturas procedurais ---------------- */
function semente(s: number) {
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function canvas(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function textura(w: number, h: number, desenha: (g: CanvasRenderingContext2D, w: number, h: number) => void, rep?: [number, number], cor = true) {
  const c = canvas(w, h);
  desenha(c.getContext('2d')!, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = cor ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = ANISO;
  if (rep) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(rep[0], rep[1]);
  }
  return t;
}

function repetida(t: THREE.Texture, x: number, y: number) {
  const c = t.clone();
  c.repeat.set(x, y);
  c.needsUpdate = true;
  return c;
}

/** Salpica pontinhos (granilha, poros) */
function salpica(g: CanvasRenderingContext2D, w: number, h: number, cores: string[], n: number, tam: [number, number], alfa: [number, number], r = semente(7)) {
  for (let i = 0; i < n; i++) {
    g.globalAlpha = alfa[0] + r() * (alfa[1] - alfa[0]);
    g.fillStyle = cores[Math.floor(r() * cores.length)];
    const s = tam[0] + r() * (tam[1] - tam[0]);
    g.fillRect(r() * w, r() * h, s, s * (0.6 + r() * 0.8));
  }
  g.globalAlpha = 1;
}

/** Manchas grandes e suaves (variação de tom) */
function manchas(g: CanvasRenderingContext2D, w: number, h: number, cor: string, n: number, alfa: number, r = semente(3)) {
  for (let i = 0; i < n; i++) {
    const x = r() * w, y = r() * h, rad = (0.1 + r() * 0.25) * w;
    const gr = g.createRadialGradient(x, y, 0, x, y, rad);
    const [rr, gg, bb] = [1, 3, 5].map(i => parseInt(cor.slice(i, i + 2), 16));
    gr.addColorStop(0, `rgba(${rr},${gg},${bb},1)`);
    gr.addColorStop(1, `rgba(${rr},${gg},${bb},0)`);
    g.globalAlpha = alfa * r();
    g.fillStyle = gr;
    g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
  }
  g.globalAlpha = 1;
}

function texto(g: CanvasRenderingContext2D, s: string, x: number, y: number, px: number, cor: string, peso = 'bold', al: CanvasTextAlign = 'center') {
  g.fillStyle = cor;
  g.font = `${peso} ${px}px system-ui, "Segoe UI", Roboto, sans-serif`;
  g.textAlign = al;
  g.textBaseline = 'middle';
  g.fillText(s, x, y);
}

function rrect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

const TEX = {
  piso: () => textura(1024, 1024, (g, w, h) => {
    g.fillStyle = '#d6d0c4';
    g.fillRect(0, 0, w, h);
    manchas(g, w, h, '#c4bcae', 18, 0.35);
    manchas(g, w, h, '#e8e3d9', 14, 0.3, semente(11));
    salpica(g, w, h, ['#b3aa9b', '#ece7dd', '#9f9688', '#a9c0c9', '#c9b79d'], 26000, [1, 3], [0.25, 0.7]);
    // juntas das placas (60 cm)
    g.fillStyle = 'rgba(70,60,50,0.18)';
    for (const p of [0, 512]) {
      g.fillRect(p, 0, 2, h);
      g.fillRect(0, p, w, 2);
    }
    g.fillStyle = 'rgba(255,255,255,0.25)';
    for (const p of [2, 514]) {
      g.fillRect(p, 0, 1, h);
      g.fillRect(0, p, w, 1);
    }
  }, [9 / 1.2, 8.5 / 1.2]),
  pisoRug: () => textura(512, 512, (g, w, h) => {
    g.fillStyle = '#8a8a8a';
    g.fillRect(0, 0, w, h);
    manchas(g, w, h, '#5e5e5e', 30, 0.6, semente(5));
    manchas(g, w, h, '#b0b0b0', 20, 0.5, semente(9));
    salpica(g, w, h, ['#666', '#aaa'], 6000, [1, 2], [0.3, 0.6]);
  }, [9 / 2.4, 8.5 / 2.4], false),
  pintura: () => textura(512, 512, (g, w, h) => {
    g.fillStyle = '#eeeae2';
    g.fillRect(0, 0, w, h);
    manchas(g, w, h, '#e2ddd3', 20, 0.4);
    salpica(g, w, h, ['#e6e1d7', '#f6f3ed', '#ddd8ce'], 30000, [1, 2], [0.25, 0.55]);
  }, [4.5, 1.4]),
  lambri: () => textura(512, 256, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h);
    gr.addColorStop(0, '#d5e3ea');
    gr.addColorStop(1, '#cbdbe3');
    g.fillStyle = gr;
    g.fillRect(0, 0, w, h);
    salpica(g, w, h, ['#c3d3db', '#e1ecf1'], 5000, [1, 2], [0.2, 0.5]);
    for (let x = 0; x < w; x += 64) {
      g.fillStyle = 'rgba(40,70,90,0.22)';
      g.fillRect(x, 0, 2, h);
      g.fillStyle = 'rgba(255,255,255,0.6)';
      g.fillRect(x + 2, 0, 1, h);
    }
  }),
  forro: () => textura(512, 512, (g, w, h) => {
    g.fillStyle = '#f2f1ec';
    g.fillRect(0, 0, w, h);
    const r = semente(21);
    // fissuras e poros da placa mineral
    for (let i = 0; i < 2600; i++) {
      g.fillStyle = `rgba(150,145,135,${0.15 + r() * 0.35})`;
      const x = 14 + r() * (w - 28), y = 14 + r() * (h - 28);
      g.beginPath();
      g.ellipse(x, y, 0.6 + r() * 1.6, 0.6 + r() * 1.2, r() * 3, 0, Math.PI * 2);
      g.fill();
    }
    salpica(g, w, h, ['#e7e5df', '#fbfaf7'], 8000, [1, 2], [0.3, 0.6]);
    // perfil T de alumínio (borda da placa)
    g.fillStyle = '#d9dadb';
    g.fillRect(0, 0, w, 10);
    g.fillRect(0, 0, 10, h);
    g.fillStyle = '#c3c5c7';
    g.fillRect(0, 9, w, 2);
    g.fillRect(9, 0, 2, h);
  }, [9 / 0.625, 8.5 / 0.625]),
  madeira: (base = '#b98a5e', escuro = '#8a6038', vertical = false) => textura(vertical ? 256 : 1024, vertical ? 1024 : 256, (g0, w0, h0) => {
    const c2 = canvas(1024, 256);
    const g = c2.getContext('2d')!;
    const w = 1024, h = 256;
    g.fillStyle = base;
    g.fillRect(0, 0, w, h);
    const r = semente(31);
    for (let i = 0; i < 140; i++) {
      const y0 = r() * h, amp = 0.6 + r() * 2.2, f = 0.002 + r() * 0.006, fase = r() * 10;
      g.strokeStyle = r() > 0.5 ? escuro : '#e2bf93';
      g.globalAlpha = 0.08 + r() * 0.18;
      g.lineWidth = 0.6 + r() * 2.2;
      g.beginPath();
      for (let x = 0; x <= w; x += 8) {
        const y = y0 + Math.sin(x * f + fase) * amp + Math.sin(x * f * 3.1) * amp * 0.3;
        x ? g.lineTo(x, y) : g.moveTo(x, y);
      }
      g.stroke();
    }
    g.globalAlpha = 1;
    salpica(g, w, h, [escuro], 1500, [1, 3], [0.05, 0.2]);
    if (vertical) {
      g0.translate(w0, 0);
      g0.rotate(Math.PI / 2);
    }
    g0.drawImage(c2, 0, 0);
  }),
  azulejo: () => textura(512, 512, (g, w, h) => {
    g.fillStyle = '#c9d0d3';
    g.fillRect(0, 0, w, h);
    const r = semente(41);
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
      const v = 246 - Math.floor(r() * 8);
      const gr = g.createLinearGradient(i * 128, j * 128, i * 128 + 128, j * 128 + 128);
      gr.addColorStop(0, `rgb(${v},${v + 2},${v + 3})`);
      gr.addColorStop(1, `rgb(${v - 8},${v - 6},${v - 4})`);
      g.fillStyle = gr;
      g.fillRect(i * 128 + 3, j * 128 + 3, 122, 122);
    }
  }),
  tecido: (cor: string) => textura(256, 256, (g, w, h) => {
    g.fillStyle = cor;
    g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 2) {
      g.fillStyle = `rgba(0,0,0,${y % 4 ? 0.07 : 0.12})`;
      g.fillRect(0, y, w, 1);
    }
    for (let x = 0; x < w; x += 2) {
      g.fillStyle = `rgba(255,255,255,${x % 4 ? 0.04 : 0.08})`;
      g.fillRect(x, 0, 1, h);
    }
    salpica(g, w, h, ['#000', '#fff'], 2500, [1, 1], [0.03, 0.1]);
  }, [3, 3]),
  napa: (cor: string) => textura(256, 256, (g, w, h) => {
    g.fillStyle = cor;
    g.fillRect(0, 0, w, h);
    const r = semente(51);
    for (let i = 0; i < 9000; i++) {
      g.fillStyle = `rgba(${r() > 0.5 ? '255,255,255' : '0,0,0'},${0.03 + r() * 0.05})`;
      g.beginPath();
      g.arc(r() * w, r() * h, 0.8 + r() * 1.5, 0, Math.PI * 2);
      g.fill();
    }
  }, [2, 2]),
};

/* ---------------- materiais ---------------- */
interface MP {
  rough?: number;
  metal?: number;
  map?: THREE.Texture | null;
  roughMap?: THREE.Texture;
  emissive?: number;
  ei?: number;
  transparent?: boolean;
  opacity?: number;
  side?: THREE.Side;
  env?: number;
}

function criaMateriais() {
  const cache = new Map<string, THREE.MeshStandardMaterial>();
  const std = (cor: number, p: MP = {}) => {
    const chave = `${cor}|${p.rough ?? 0.7}|${p.metal ?? 0}|${p.map?.uuid ?? ''}|${p.emissive ?? 0}|${p.ei ?? 1}|${p.opacity ?? 1}|${p.side ?? 0}`;
    let m = cache.get(chave);
    if (!m) {
      m = new THREE.MeshStandardMaterial({
        color: cor,
        roughness: p.rough ?? 0.7,
        metalness: p.metal ?? 0,
        map: p.map ?? null,
        roughnessMap: p.roughMap ?? null,
        emissive: p.emissive ?? 0,
        emissiveIntensity: p.ei ?? 1,
        transparent: p.transparent ?? (p.opacity !== undefined && p.opacity < 1),
        opacity: p.opacity ?? 1,
        side: p.side ?? THREE.FrontSide,
      });
      if (p.env !== undefined) m.envMapIntensity = p.env;
      if (m.transparent) m.depthWrite = false;
      cache.set(chave, m);
    }
    return m;
  };
  return {
    std,
    inox: std(0xc9ced2, { rough: 0.28, metal: 0.95 }),
    inoxEsc: std(0xa9b0b6, { rough: 0.38, metal: 0.9 }),
    cromo: std(0xe4e8ec, { rough: 0.12, metal: 1 }),
    aluminio: std(0xd0d4d8, { rough: 0.42, metal: 0.85 }),
    pretoFosco: std(0x1f2326, { rough: 0.6 }),
    borracha: std(0x16181a, { rough: 0.9 }),
    plasticoBranco: std(0xf3f4f2, { rough: 0.38 }),
    plasticoCinza: std(0xbfc6cc, { rough: 0.45 }),
    laca: std(0xf4f4f1, { rough: 0.3 }),
    vidro: std(0xdfeef4, { rough: 0.04, metal: 0, opacity: 0.18, env: 1.5 }),
    vidroFosco: std(0xe6eff2, { rough: 0.35, opacity: 0.7 }),
    papel: std(0xfbfbf8, { rough: 0.9 }),
  };
}
type Mats = ReturnType<typeof criaMateriais>;

/** Placa/cartaz desenhado em canvas (iluminado pela cena) */
function cartaz(w: number, h: number, px: number, desenha: (g: CanvasRenderingContext2D, W: number, H: number) => void, basico = false) {
  const W = px, H = Math.round((px * h) / w);
  const t = textura(W, H, desenha);
  const m = basico ? new THREE.MeshBasicMaterial({ map: t }) : new THREE.MeshStandardMaterial({ map: t, roughness: 0.55 });
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
}

function placaTexto(s: string, w: number, h: number, bg: string, fg: string) {
  return cartaz(w, h, 512, (g, W, H) => {
    g.fillStyle = bg;
    rrect(g, 0, 0, W, H, H * 0.12);
    g.fill();
    texto(g, s, W / 2, H / 2 + 2, Math.round(H * 0.48), fg);
  });
}

export interface SalaConstruida {
  pisos: THREE.Mesh[];
  pia: THREE.Group;
  porta: THREE.Mesh;
  obstaculos: Caixa[];
  /** grupos dinâmicos: relógio de parede (ponteiros) */
  ponteiros: { min: THREE.Object3D; hora: THREE.Object3D; seg: THREE.Object3D };
  /** tela do notebook do avaliador (canvas atualizável) */
  telaAvaliador: { cv: HTMLCanvasElement; tex: THREE.CanvasTexture };
}

export function construirSala(cena: THREE.Scene, numero: string, pia: THREE.Vector3, maca: { x: number; z: number; top: number; len: number; wid: number }, aniso = 4): SalaConstruida {
  ANISO = aniso;
  const { x0, x1, z0, z1, h: H } = SALA;
  const M = criaMateriais();
  const { std } = M;
  const obst: Caixa[] = [];

  /* ---- auxiliares de modelagem ---- */
  const pos = (m: THREE.Object3D, x: number, y: number, z: number, pai: THREE.Object3D, rx = 0, ry = 0, rz = 0) => {
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, rz);
    pai.add(m);
    return m;
  };
  const b = (w: number, h: number, d: number, mt: THREE.Material, x: number, y: number, z: number, pai: THREE.Object3D = cena, ry = 0) =>
    pos(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mt), x, y, z, pai, 0, ry) as THREE.Mesh;
  const rb = (w: number, h: number, d: number, r: number, mt: THREE.Material, x: number, y: number, z: number, pai: THREE.Object3D = cena, ry = 0) =>
    pos(new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2, h / 2, d / 2) * 0.999), mt), x, y, z, pai, 0, ry) as THREE.Mesh;
  const cil = (rt: number, rb_: number, h: number, mt: THREE.Material, x: number, y: number, z: number, pai: THREE.Object3D = cena, rx = 0, rz = 0, seg = 24) =>
    pos(new THREE.Mesh(new THREE.CylinderGeometry(rt, rb_, h, seg), mt), x, y, z, pai, rx, 0, rz) as THREE.Mesh;
  const esf = (r: number, mt: THREE.Material, x: number, y: number, z: number, pai: THREE.Object3D = cena) =>
    pos(new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), mt), x, y, z, pai) as THREE.Mesh;
  const torno = (perfil: [number, number][], mt: THREE.Material, x: number, y: number, z: number, pai: THREE.Object3D = cena, seg = 32) =>
    pos(new THREE.Mesh(new THREE.LatheGeometry(perfil.map(([r, y]) => new THREE.Vector2(r, y)), seg), mt), x, y, z, pai) as THREE.Mesh;
  const tubo = (pts: [number, number, number][], r: number, mt: THREE.Material, pai: THREE.Object3D = cena, seg = 48) => {
    const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p))), seg, r, 8, false), mt);
    pai.add(m);
    return m;
  };
  const grupo = (x: number, y: number, z: number, ry = 0, pai: THREE.Object3D = cena) => {
    const g = new THREE.Group();
    pos(g, x, y, z, pai, 0, ry);
    return g;
  };
  /** Rodízio: garfo + roda */
  const rodizio = (x: number, z: number, pai: THREE.Object3D, r = 0.035) => {
    b(0.03, 0.035, 0.035, M.inoxEsc, x, r * 2 + 0.01, z, pai);
    cil(r, r, 0.025, M.borracha, x, r, z, pai, 0, Math.PI / 2, 16);
  };

  /* =================== PISO, FORRO E PAREDES =================== */
  const piso = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, 0.1, z1 - z0), std(0xffffff, { map: TEX.piso(), roughMap: TEX.pisoRug(), rough: 0.55 }));
  piso.position.set((x0 + x1) / 2, -0.05, (z0 + z1) / 2);
  piso.receiveShadow = true;
  cena.add(piso);

  const teto = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0), std(0xffffff, { map: TEX.forro(), rough: 0.95 }));
  teto.rotation.x = Math.PI / 2;
  teto.position.set((x0 + x1) / 2, H, (z0 + z1) / 2);
  teto.receiveShadow = true;
  cena.add(teto);

  // luminárias de LED embutidas (o difusor brilha; a luz vem das RectAreaLights da cena)
  const difusor = new THREE.MeshBasicMaterial({ color: 0xfffcf4 });
  const moldura = std(0xe9ebec, { rough: 0.4, metal: 0.3 });
  for (const [x, z] of LUMINARIAS) {
    rb(1.26, 0.035, 0.66, 0.008, moldura, x, H - 0.012, z);
    const d = new THREE.Mesh(new THREE.PlaneGeometry(1.18, 0.58), difusor);
    d.rotation.x = Math.PI / 2;
    d.position.set(x, H - 0.031, z);
    cena.add(d);
    // grade prismática do difusor
    for (let i = -2; i <= 2; i++) b(0.006, 0.004, 0.58, moldura, x + i * 0.236, H - 0.033, z);
  }
  // grelhas de insuflamento e retorno do ar
  const grelha = (x: number, z: number) => {
    rb(0.62, 0.025, 0.62, 0.006, M.laca, x, H - 0.012, z);
    for (let i = 0; i < 4; i++) {
      const s = 0.25 - i * 0.06;
      b(s * 2, 0.012, 0.012, M.plasticoCinza, x, H - 0.03, z - s, cena);
      b(s * 2, 0.012, 0.012, M.plasticoCinza, x, H - 0.03, z + s, cena);
      b(0.012, 0.012, s * 2, M.plasticoCinza, x - s, H - 0.03, z, cena);
      b(0.012, 0.012, s * 2, M.plasticoCinza, x + s, H - 0.03, z, cena);
    }
  };
  grelha(0, -3.4);
  grelha(-0.2, 2.9);
  // detector de fumaça, sprinklers e caixa de som
  cil(0.07, 0.075, 0.035, M.plasticoBranco, 1.0, H - 0.018, 0.2);
  esf(0.008, std(0xff3b30, { emissive: 0xff2b20, ei: 2 }), 1.03, H - 0.037, 0.21);
  for (const [x, z] of [[-3, -0.3], [3, -0.3], [0, 0.6], [-3, 3], [3, 3], [0, -2.6]]) {
    cil(0.03, 0.03, 0.01, M.cromo, x, H - 0.005, z, cena, 0, 0, 16);
    cil(0.006, 0.008, 0.04, std(0xc49a3a, { rough: 0.3, metal: 1 }), x, H - 0.03, z, cena, 0, 0, 8);
    cil(0.02, 0.02, 0.003, M.cromo, x, H - 0.05, z, cena, 0, 0, 12);
  }
  cil(0.13, 0.13, 0.015, M.plasticoBranco, -1.0, H - 0.008, 0.2, cena, 0, 0, 32);
  for (let i = 1; i < 5; i++) {
    const t = new THREE.Mesh(new THREE.TorusGeometry(i * 0.024, 0.002, 4, 32), M.plasticoCinza);
    pos(t, -1.0, H - 0.017, 0.2, cena, Math.PI / 2);
  }

  /* ---- paredes com lambri, bate-maca e rodapé sanitário ---- */
  const tinta = TEX.pintura();
  const lambri = TEX.lambri();
  const PAREDE = std(0xffffff, { map: tinta, rough: 0.92 });
  const FAIXA = std(0x4f93b8, { rough: 0.35 });
  const FAIXA_TOPO = std(0x3b7da2, { rough: 0.35 });
  const RODAPE = std(0x6f7d87, { rough: 0.45 });
  const paredes: THREE.Mesh[] = [];
  const parede = (comp: number, x: number, z: number, ry: number, y0 = 0, y1 = H) => {
    const m = b(comp, y1 - y0, 0.2, std(0xffffff, { map: repetida(tinta, comp / 2, (1.4 * (y1 - y0)) / H), rough: 0.92 }), x, (y0 + y1) / 2, z, cena, ry);
    paredes.push(m);
    const g = grupo(x, 0, z, ry);
    const s = ry ? (x > 0 ? 1 : -1) : z > 0 ? -1 : 1; // lado interno
    const sz = ry ? -s : s;
    if (y0 === 0) {
      b(comp, 0.95, 0.012, std(0xffffff, { map: repetida(lambri, comp, 1), rough: 0.4 }), 0, 0.53, sz * 0.106, g);
      rb(comp, 0.14, 0.04, 0.012, FAIXA, 0, 0.98, sz * 0.12, g);
      rb(comp, 0.02, 0.045, 0.008, FAIXA_TOPO, 0, 1.06, sz * 0.12, g);
      rb(comp, 0.1, 0.03, 0.01, RODAPE, 0, 0.05, sz * 0.112, g);
    }
    if (y1 === H) rb(comp, 0.03, 0.03, 0.012, std(0xf6f6f3, { rough: 0.6 }), 0, H - 0.015, sz * 0.112, g); // tabica do forro
  };
  parede(x1 - x0, 0, z0 - 0.1, 0);
  parede(z1 - z0, x0 - 0.1, (z0 + z1) / 2, Math.PI / 2);
  // parede direita com o vão da janela (z −0,5…1,9; y 1,1…2,34)
  const J = { za: -0.5, zb: 1.9, ya: 1.1, yb: 2.34 };
  parede(J.za - z0, x1 + 0.1, (z0 + J.za) / 2, Math.PI / 2);
  parede(z1 - J.zb, x1 + 0.1, (J.zb + z1) / 2, Math.PI / 2);
  parede(J.zb - J.za, x1 + 0.1, (J.za + J.zb) / 2, Math.PI / 2, 0, J.ya);
  parede(J.zb - J.za, x1 + 0.1, (J.za + J.zb) / 2, Math.PI / 2, J.yb, H);
  // parede da porta (com vão)
  const vao = 1.3;
  const lado = (x1 - x0 - vao) / 2;
  for (const s of [-1, 1]) parede(lado, s * (vao / 2 + lado / 2), z1 + 0.1, 0);
  b(vao, H - 2.2, 0.2, PAREDE, 0, 2.2 + (H - 2.2) / 2, z1 + 0.1);
  // cantoneiras de proteção nos cantos
  for (const [x, z] of [[x0, z0], [x1, z0], [x0, z1], [x1, z1]]) rb(0.05, 1.5, 0.05, 0.01, M.plasticoBranco, x + Math.sign(-x) * 0.02, 0.75, z + Math.sign(-z) * 0.02);
  paredes.forEach(p => (p.receiveShadow = true));

  /* ---- porta ---- */
  const BATENTE = std(0xf1f1ee, { rough: 0.35 });
  rb(0.08, 2.24, 0.24, 0.01, BATENTE, -vao / 2 - 0.04, 1.12, z1 + 0.1);
  rb(0.08, 2.24, 0.24, 0.01, BATENTE, vao / 2 + 0.04, 1.12, z1 + 0.1);
  rb(vao + 0.16, 0.08, 0.24, 0.01, BATENTE, 0, 2.24, z1 + 0.1);
  const porta = new THREE.Mesh(new RoundedBoxGeometry(vao - 0.02, 2.18, 0.05, 2, 0.01), new THREE.MeshStandardMaterial({ map: TEX.madeira('#c9a378', '#9a7752', true), roughness: 0.45 }));
  porta.position.set(0, 1.1, z1 + 0.05);
  porta.userData.alvo = 'porta';
  cena.add(porta);
  {
    const zi = -0.03; // face interna (local da folha)
    // visor de vidro jateado com moldura
    rb(0.3, 0.6, 0.012, 0.004, M.aluminio, 0.3, 0.42, zi, porta);
    b(0.26, 0.56, 0.004, M.vidroFosco, 0.3, 0.42, zi - 0.007, porta);
    // chapa de proteção inferior em inox
    b(vao - 0.1, 0.28, 0.004, M.inox, 0, -0.93, zi - 0.002, porta);
    // maçaneta tipo alavanca
    const lx = -0.5;
    cil(0.03, 0.03, 0.012, M.inox, lx, -0.05, zi - 0.006, porta, Math.PI / 2);
    cil(0.011, 0.011, 0.05, M.inox, lx, -0.05, zi - 0.03, porta, Math.PI / 2);
    rb(0.14, 0.022, 0.026, 0.01, M.inox, lx + 0.065, -0.05, zi - 0.055, porta);
    rb(0.035, 0.12, 0.012, 0.005, M.inox, lx, -0.16, zi - 0.006, porta);
    cil(0.006, 0.006, 0.004, M.pretoFosco, lx, -0.19, zi - 0.013, porta, Math.PI / 2, 0, 12);
    // dobradiças
    for (const y of [-0.85, 0, 0.85]) cil(0.012, 0.012, 0.11, M.inoxEsc, vao / 2 - 0.02, y, zi, porta, 0, 0, 12);
    // mola aérea
    rb(0.36, 0.06, 0.05, 0.01, M.aluminio, 0.2, 0.98, zi - 0.03, porta);
    rb(0.3, 0.02, 0.02, 0.008, M.aluminio, 0.33, 1.04, zi - 0.09, porta);
  }
  const pl = placaTexto(`ESTAÇÃO ${numero}`, 1.0, 0.24, '#1f2a44', '#ffffff');
  pos(pl, 0, 2.5, z1 - 0.003, cena, 0, Math.PI);
  // interruptor duplo, termostato do ar e tomadas
  const espelho = (x: number, y: number, z: number, ry: number, tipo: 'tomada' | 'interruptor' | 'termostato') => {
    const g = grupo(x, y, z, ry);
    if (tipo === 'termostato') {
      rb(0.1, 0.1, 0.02, 0.01, M.plasticoBranco, 0, 0, 0.01, g);
      const t = cartaz(0.06, 0.035, 128, (c, W, H2) => {
        c.fillStyle = '#0e1f2a';
        c.fillRect(0, 0, W, H2);
        texto(c, '22°C', W / 2, H2 / 2 + 2, 30, '#7fe3ff');
      }, true);
      pos(t, 0, 0.015, 0.021, g);
      return;
    }
    rb(0.08, 0.12, 0.012, 0.004, M.plasticoBranco, 0, 0, 0.006, g);
    if (tipo === 'tomada') {
      cil(0.022, 0.022, 0.004, M.plasticoCinza, 0, 0, 0.013, g, Math.PI / 2);
      for (const dx of [-0.008, 0.008]) cil(0.003, 0.003, 0.002, M.pretoFosco, dx, 0, 0.016, g, Math.PI / 2, 0, 8);
    } else for (const dy of [-0.025, 0.025]) rb(0.05, 0.04, 0.008, 0.003, M.laca, 0, dy, 0.014, g);
  };
  espelho(0.95, 1.2, z1, Math.PI, 'interruptor');
  espelho(1.15, 1.5, z1, Math.PI, 'termostato');
  for (const [x, y] of [[-2.2, 0.3], [2.4, 0.3]]) espelho(x, y, z1, Math.PI, 'tomada');
  for (const [x, y] of [[-3.8, 0.3], [-0.7, 0.3], [0.2, 1.2], [2.9, 1.2]]) espelho(x, y, z0, 0, 'tomada');
  for (const [z, y] of [[-1.5, 0.3], [2.2, 0.3]]) espelho(x0, y, z, Math.PI / 2, 'tomada');
  for (const [z, y] of [[-1.2, 0.3], [-3.0, 1.2]]) espelho(x1, y, z, -Math.PI / 2, 'tomada');
  // dispensador de álcool em gel junto à porta
  const gel = (x: number, y: number, z: number, ry: number) => {
    const g = grupo(x, y, z, ry);
    rb(0.12, 0.24, 0.09, 0.02, M.plasticoBranco, 0, 0, 0.045, g);
    rb(0.1, 0.12, 0.012, 0.01, std(0x2b8fd0, { rough: 0.3 }), 0, 0.04, 0.092, g);
    rb(0.08, 0.04, 0.05, 0.01, M.plasticoCinza, 0, -0.12, 0.06, g);
    const et = cartaz(0.08, 0.04, 128, (c, W, H2) => {
      c.fillStyle = '#ffffff';
      c.fillRect(0, 0, W, H2);
      texto(c, 'ÁLCOOL 70%', W / 2, H2 / 2 + 1, 14, '#1d6fa5');
    });
    pos(et, 0, 0.04, 0.0985, g);
  };
  gel(-1.1, 1.35, z1, Math.PI);

  // cadeira de acompanhante junto à porta
  {
    const g = grupo(-2.6, 0, z1 - 0.32, Math.PI);
    const assento = std(0xffffff, { map: TEX.napa('#3e6a8a'), rough: 0.5 });
    for (const sx of [-0.21, 0.21]) {
      tubo([[sx, 0, 0.2], [sx, 0.42, 0.2], [sx, 0.44, 0.18], [sx, 0.44, -0.2], [sx, 0.85, -0.25]], 0.012, M.cromo, g, 24);
      tubo([[sx, 0, -0.2], [sx, 0.43, -0.2]], 0.012, M.cromo, g, 4);
      tubo([[sx, 0.62, -0.22], [sx, 0.64, 0.1], [sx, 0.5, 0.15]], 0.01, M.cromo, g, 16); // braço
      rb(0.05, 0.03, 0.3, 0.012, M.pretoFosco, sx, 0.645, -0.04, g);
    }
    rb(0.48, 0.07, 0.44, 0.03, assento, 0, 0.47, 0, g);
    const enc = rb(0.48, 0.4, 0.06, 0.03, assento, 0, 0.72, -0.24, g);
    enc.rotation.x = -0.12;
    obst.push([-2.95, -2.25, z1 - 0.65, z1]);
  }

  // câmeras de gravação nos cantos (salas de OSCE são filmadas)
  for (const [x, z, ry] of [[x1 - 0.18, z1 - 0.18, -Math.PI * 0.75], [x0 + 0.18, z0 + 0.18, Math.PI * 0.25]]) {
    const g = grupo(x, H, z, ry);
    rb(0.08, 0.02, 0.08, 0.008, M.plasticoBranco, 0, -0.01, 0, g);
    cil(0.012, 0.012, 0.1, M.plasticoBranco, 0, -0.07, 0, g, 0, 0, 12);
    const corpo = grupo(0, -0.14, 0.04, 0, g);
    corpo.rotation.x = -0.45;
    rb(0.11, 0.09, 0.22, 0.03, M.plasticoBranco, 0, 0, 0, corpo);
    rb(0.13, 0.015, 0.24, 0.006, M.plasticoBranco, 0, 0.052, 0.01, corpo);
    cil(0.032, 0.032, 0.02, M.pretoFosco, 0, 0, 0.115, corpo, Math.PI / 2);
    cil(0.02, 0.02, 0.005, std(0x0a2440, { rough: 0.05, metal: 0.5 }), 0, 0, 0.126, corpo, Math.PI / 2);
    esf(0.006, std(0xff3b30, { emissive: 0xff2010, ei: 3 }), 0.035, 0.025, 0.11, corpo);
  }

  // ar-condicionado split
  {
    const g = grupo(x1 - 0.13, 2.38, -2.6, -Math.PI / 2);
    rb(1.0, 0.3, 0.22, 0.04, M.laca, 0, 0, 0, g);
    rb(0.96, 0.07, 0.02, 0.01, std(0x2e3a42, { rough: 0.5 }), 0, -0.1, 0.1, g);
    const aleta = rb(0.9, 0.012, 0.07, 0.005, M.laca, 0, -0.14, 0.1, g);
    aleta.rotation.x = 0.5;
    for (let i = 0; i < 6; i++) b(0.94, 0.004, 0.004, M.plasticoCinza, 0, 0.12 - i * 0.012, 0.111, g);
    esf(0.005, std(0x4fc3f7, { emissive: 0x2aa8ff, ei: 3 }), 0.4, -0.05, 0.111, g);
    const logo = cartaz(0.14, 0.03, 128, (c, W, H2) => {
      c.fillStyle = '#f4f4f1';
      c.fillRect(0, 0, W, H2);
      texto(c, 'inverter', W / 2, H2 / 2 + 1, 20, '#8a959e', '600');
    });
    pos(logo, 0, 0.03, 0.111, g);
    tubo([[0.45, -0.05, -0.08], [0.45, -0.3, -0.09], [0.45, -0.6, -0.1]], 0.012, M.plasticoBranco, g, 8); // dreno
  }

  /* =================== PAREDE DO FUNDO =================== */
  const zf = z0; // face interna
  // negatoscópio com radiografia de tórax (aceso)
  {
    const g = grupo(-3.4, 1.62, zf);
    rb(0.95, 0.72, 0.09, 0.015, M.laca, 0, 0, 0.045, g);
    const luz = cartaz(0.86, 0.6, 512, (c, W, H2) => {
      c.fillStyle = '#e9f2f6';
      c.fillRect(0, 0, W, H2);
      // filme
      const fx = 40, fy = 22, fw = W - 80, fh = H2 - 44;
      c.fillStyle = '#05080a';
      c.fillRect(fx, fy, fw, fh);
      const cx = fx + fw / 2, cy = fy + fh / 2;
      // partes moles
      const pm = c.createRadialGradient(cx, cy + 10, 20, cx, cy + 10, fw * 0.55);
      pm.addColorStop(0, 'rgba(120,130,135,0.6)');
      pm.addColorStop(1, 'rgba(20,25,28,0)');
      c.fillStyle = pm;
      c.fillRect(fx, fy, fw, fh);
      // pulmões (escuros)
      for (const s of [-1, 1]) {
        const gr = c.createRadialGradient(cx + s * 70, cy, 10, cx + s * 70, cy, 110);
        gr.addColorStop(0, '#11181c');
        gr.addColorStop(1, '#2b3439');
        c.fillStyle = gr;
        c.beginPath();
        c.ellipse(cx + s * 72, cy + 6, 58, 112, s * 0.08, 0, Math.PI * 2);
        c.fill();
      }
      // arcos costais
      c.strokeStyle = 'rgba(205,215,220,0.55)';
      c.lineWidth = 5;
      for (let i = 0; i < 9; i++) for (const s of [-1, 1]) {
        c.beginPath();
        c.ellipse(cx + s * 30, cy - 105 + i * 24, 105, 30, s * 0.2, s > 0 ? Math.PI * 1.05 : Math.PI * 1.25, s > 0 ? Math.PI * 1.75 : Math.PI * 1.95);
        c.stroke();
      }
      // coluna, coração, clavículas, diafragma
      c.fillStyle = '#c9d2d6';
      c.fillRect(cx - 9, fy + 6, 18, fh - 12);
      c.fillStyle = 'rgba(215,222,226,0.92)';
      c.beginPath();
      c.ellipse(cx + 22, cy + 52, 52, 46, 0.35, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = '#d7dee2';
      c.lineWidth = 7;
      for (const s of [-1, 1]) {
        c.beginPath();
        c.moveTo(cx + s * 10, cy - 125);
        c.quadraticCurveTo(cx + s * 70, cy - 140, cx + s * 130, cy - 120);
        c.stroke();
      }
      c.fillStyle = 'rgba(205,212,216,0.85)';
      c.beginPath();
      c.moveTo(fx, fy + fh);
      c.quadraticCurveTo(cx - 70, cy + 70, cx, cy + 112);
      c.quadraticCurveTo(cx + 70, cy + 80, fx + fw, fy + fh);
      c.fill();
      texto(c, 'D', fx + 18, fy + 22, 22, '#e8eef0');
    }, true);
    pos(luz, 0, 0.02, 0.092, g);
    for (const x of [-0.25, 0.25]) rb(0.06, 0.03, 0.02, 0.006, M.inoxEsc, x, 0.31, 0.1, g);
    rb(0.04, 0.025, 0.02, 0.006, M.plasticoCinza, 0.4, -0.33, 0.1, g);
  }
  // pôster de focos de ausculta (moldura de alumínio)
  const quadroMold = (w: number, h: number, x: number, y: number, z: number, ry: number, desenha: (c: CanvasRenderingContext2D, W: number, H: number) => void) => {
    const g = grupo(x, y, z, ry);
    rb(w + 0.04, h + 0.04, 0.02, 0.006, M.aluminio, 0, 0, 0.01, g);
    pos(cartaz(w, h, 512, desenha), 0, 0, 0.021, g);
    b(w, h, 0.002, std(0xffffff, { rough: 0.05, opacity: 0.08, env: 1.2 }), 0, 0, 0.024, g);
    return g;
  };
  quadroMold(0.58, 0.82, -2.35, 1.55, zf, 0, (c, W, H2) => {
    c.fillStyle = '#fdfaf2';
    c.fillRect(0, 0, W, H2);
    c.fillStyle = '#1b4d89';
    c.fillRect(0, 0, W, 70);
    texto(c, 'FOCOS DE AUSCULTA', W / 2, 38, 34, '#ffffff');
    // tronco
    const cx = W / 2;
    c.fillStyle = '#f2cfae';
    c.beginPath();
    c.moveTo(cx - 70, 110);
    c.quadraticCurveTo(cx - 190, 120, cx - 175, 260);
    c.lineTo(cx - 150, 620);
    c.lineTo(cx + 150, 620);
    c.lineTo(cx + 175, 260);
    c.quadraticCurveTo(cx + 190, 120, cx + 70, 110);
    c.closePath();
    c.fill();
    c.strokeStyle = '#d9ab86';
    c.lineWidth = 3;
    c.stroke();
    // costelas e esterno
    c.strokeStyle = 'rgba(190,140,110,0.5)';
    for (let i = 0; i < 6; i++) {
      c.beginPath();
      c.arc(cx, 150 + i * 48, 150, Math.PI * 0.18, Math.PI * 0.82);
      c.stroke();
    }
    c.fillStyle = 'rgba(200,150,120,0.45)';
    c.fillRect(cx - 12, 150, 24, 260);
    // coração
    c.fillStyle = 'rgba(214,69,69,0.35)';
    c.beginPath();
    c.ellipse(cx + 30, 380, 85, 70, 0.5, 0, Math.PI * 2);
    c.fill();
    const focos: [number, number, string, string][] = [[cx - 40, 250, 'A', 'Aórtico'], [cx + 40, 250, 'P', 'Pulmonar'], [cx - 30, 330, 'Ac', 'Acessório'], [cx - 10, 420, 'T', 'Tricúspide'], [cx + 95, 450, 'M', 'Mitral']];
    for (const [x, y, t] of focos) {
      c.fillStyle = '#d64545';
      c.beginPath();
      c.arc(x, y, 22, 0, Math.PI * 2);
      c.fill();
      texto(c, t, x, y + 1, 20, '#ffffff');
    }
    c.fillStyle = '#263238';
    focos.forEach(([, , t, n], i) => texto(c, `${t} — ${n}`, 40, 650 + i * 26, 20, '#263238', '600', 'left'));
  });
  // régua de gases medicinais (O₂, ar comprimido, vácuo) com fluxômetro e frasco de aspiração
  {
    const g = grupo(-1.3, 1.55, zf);
    rb(0.95, 0.17, 0.07, 0.02, M.aluminio, 0, 0, 0.035, g);
    rb(0.95, 0.03, 0.072, 0.01, std(0xe5e8ea, { rough: 0.4, metal: 0.5 }), 0, 0.07, 0.036, g);
    const gas: [number, number, string][] = [[-0.3, 0x2e9b4f, 'O₂'], [0, 0xf2c12e, 'AR'], [0.3, 0x8f9aa3, 'VÁCUO']];
    for (const [x, cor, nome] of gas) {
      cil(0.03, 0.03, 0.02, std(cor, { rough: 0.35 }), x, -0.01, 0.075, g, Math.PI / 2);
      cil(0.014, 0.014, 0.03, M.cromo, x, -0.01, 0.095, g, Math.PI / 2);
      const et = cartaz(0.1, 0.035, 128, (c, W, H2) => {
        c.fillStyle = `#${cor.toString(16).padStart(6, '0')}`;
        c.fillRect(0, 0, W, H2);
        texto(c, nome, W / 2, H2 / 2 + 1, 26, '#ffffff');
      });
      pos(et, x, 0.05, 0.0715, g);
    }
    // fluxômetro de O₂ com umidificador
    const fx = -0.3;
    rb(0.05, 0.035, 0.035, 0.008, M.cromo, fx, -0.01, 0.13, g);
    cil(0.018, 0.018, 0.16, M.vidro, fx, 0.09, 0.15, g);
    cil(0.02, 0.02, 0.015, M.cromo, fx, 0.175, 0.15, g);
    cil(0.02, 0.02, 0.015, M.cromo, fx, 0.005, 0.15, g);
    esf(0.008, std(0x2e9b4f, { rough: 0.2 }), fx, 0.07, 0.15, g);
    cil(0.012, 0.012, 0.03, std(0x2e9b4f, { rough: 0.3 }), fx + 0.03, 0.17, 0.15, g, 0, Math.PI / 2, 12);
    torno([[0, 0], [0.038, 0], [0.04, 0.02], [0.04, 0.12], [0.03, 0.135], [0, 0.135]], std(0xdff1f7, { rough: 0.05, opacity: 0.45 }), fx, -0.2, 0.15, g);
    cil(0.036, 0.036, 0.07, std(0x9fd8ec, { rough: 0.1, opacity: 0.55 }), fx, -0.16, 0.15, g);
    cil(0.032, 0.032, 0.025, M.plasticoBranco, fx, -0.055, 0.15, g);
    // frasco de aspiração
    const vx = 0.3;
    rb(0.05, 0.035, 0.035, 0.008, M.cromo, vx, -0.01, 0.13, g);
    rb(0.08, 0.06, 0.04, 0.01, M.plasticoBranco, vx, -0.06, 0.14, g);
    cil(0.025, 0.025, 0.012, M.pretoFosco, vx, -0.045, 0.165, g, Math.PI / 2, 0, 20);
    torno([[0, 0], [0.055, 0], [0.058, 0.02], [0.058, 0.18], [0.05, 0.19], [0, 0.19]], std(0xe9f5f9, { rough: 0.05, opacity: 0.4 }), vx, -0.36, 0.13, g);
    cil(0.06, 0.06, 0.025, M.plasticoBranco, vx, -0.16, 0.13, g);
    tubo([[vx + 0.03, -0.15, 0.15], [vx + 0.12, -0.1, 0.2], [vx + 0.15, -0.4, 0.18], [vx + 0.08, -0.6, 0.14]], 0.006, std(0xe8f4f8, { rough: 0.15, opacity: 0.6 }), g, 24);
  }
  // relógio de parede (com números)
  const relogio = grupo(-1.3, 2.36, zf);
  {
    const aro = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.022, 12, 48), std(0x2b3238, { rough: 0.4 }));
    pos(aro, 0, 0, 0.035, relogio);
    cil(0.2, 0.2, 0.04, M.plasticoBranco, 0, 0, 0.02, relogio, Math.PI / 2, 0, 48);
    const face = cartaz(0.38, 0.38, 512, (c, W) => {
      c.fillStyle = '#ffffff';
      c.beginPath();
      c.arc(W / 2, W / 2, W / 2, 0, Math.PI * 2);
      c.fill();
      for (let i = 0; i < 60; i++) {
        const a = (i / 60) * Math.PI * 2, r1 = W / 2 - 10, r2 = r1 - (i % 5 ? 12 : 28);
        c.strokeStyle = '#263238';
        c.lineWidth = i % 5 ? 3 : 8;
        c.beginPath();
        c.moveTo(W / 2 + Math.sin(a) * r1, W / 2 - Math.cos(a) * r1);
        c.lineTo(W / 2 + Math.sin(a) * r2, W / 2 - Math.cos(a) * r2);
        c.stroke();
      }
      for (let i = 1; i <= 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        texto(c, String(i), W / 2 + Math.sin(a) * (W / 2 - 78), W / 2 - Math.cos(a) * (W / 2 - 78) + 3, 50, '#1f2a33');
      }
    });
    (face.material as THREE.MeshStandardMaterial).transparent = true;
    pos(face, 0, 0, 0.041, relogio);
    b(0.4, 0.4, 0.002, std(0xffffff, { rough: 0.05, opacity: 0.08, env: 1.5 }), 0, 0, 0.05, relogio).scale.set(0.95, 0.95, 1);
  }
  const ponteiro = (comp: number, larg: number, cor: number, z: number) => {
    const g = new THREE.Group();
    g.position.z = z;
    relogio.add(g);
    b(larg, comp, 0.004, std(cor, { rough: 0.4 }), 0, comp / 2 - 0.02, 0, g);
    return g;
  };
  const hora = ponteiro(0.11, 0.014, 0x1f2a33, 0.044);
  const min = ponteiro(0.16, 0.009, 0x1f2a33, 0.046);
  const seg = ponteiro(0.17, 0.003, 0xd32f2f, 0.048);
  cil(0.01, 0.01, 0.008, std(0xd32f2f, { rough: 0.4 }), 0, 0, 0.05, relogio, Math.PI / 2, 0, 12);

  // esfigmomanômetro aneroide de parede com cesto
  {
    const g = grupo(-0.35, 1.48, zf);
    rb(0.16, 0.36, 0.03, 0.02, M.plasticoCinza, 0, 0, 0.015, g);
    cil(0.08, 0.08, 0.05, M.plasticoBranco, 0, 0.07, 0.05, g, Math.PI / 2, 0, 40);
    const mostrador = cartaz(0.14, 0.14, 256, (c, W) => {
      c.fillStyle = '#fafafa';
      c.beginPath();
      c.arc(W / 2, W / 2, W / 2, 0, Math.PI * 2);
      c.fill();
      for (let i = 0; i <= 30; i++) {
        const a = -Math.PI * 0.8 + (i / 30) * Math.PI * 1.6, r1 = W / 2 - 8, r2 = r1 - (i % 2 ? 7 : 16);
        c.strokeStyle = '#222';
        c.lineWidth = i % 2 ? 1.5 : 3;
        c.beginPath();
        c.moveTo(W / 2 + Math.sin(a) * r1, W / 2 - Math.cos(a) * r1);
        c.lineTo(W / 2 + Math.sin(a) * r2, W / 2 - Math.cos(a) * r2);
        c.stroke();
        if (i % 6 === 0) texto(c, String(i * 10), W / 2 + Math.sin(a) * (r2 - 18), W / 2 - Math.cos(a) * (r2 - 18), 16, '#222');
      }
      texto(c, 'mmHg', W / 2, W / 2 + 40, 16, '#555', '600');
      c.strokeStyle = '#111';
      c.lineWidth = 4;
      c.beginPath();
      c.moveTo(W / 2, W / 2);
      c.lineTo(W / 2 - 50, W / 2 + 40);
      c.stroke();
      c.fillStyle = '#111';
      c.beginPath();
      c.arc(W / 2, W / 2, 7, 0, Math.PI * 2);
      c.fill();
    });
    (mostrador.material as THREE.MeshStandardMaterial).transparent = true;
    pos(mostrador, 0, 0.07, 0.076, g);
    const aro = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.008, 8, 40), M.cromo);
    pos(aro, 0, 0.07, 0.076, g);
    // cesto com manguito enrolado
    rb(0.16, 0.08, 0.1, 0.01, M.plasticoCinza, 0, -0.13, 0.06, g);
    rb(0.12, 0.06, 0.07, 0.025, std(0xffffff, { map: TEX.tecido('#1c5a8c'), rough: 0.9 }), 0, -0.1, 0.065, g);
    // tubo espiralado até o manguito
    const esp: [number, number, number][] = [];
    for (let i = 0; i <= 40; i++) {
      const a = i * 0.9;
      esp.push([0.06 + Math.cos(a) * 0.02, 0.02 - i * 0.004, 0.06 + Math.sin(a) * 0.02]);
    }
    tubo(esp, 0.004, M.pretoFosco, g, 160);
    tubo([[0.06, -0.14, 0.06], [0.03, -0.12, 0.08], [0.0, -0.08, 0.08]], 0.004, M.pretoFosco, g, 12);
  }
  // conjunto de diagnóstico de parede (otoscópio e oftalmoscópio) + dispensador de espéculos
  {
    const g = grupo(0.5, 1.5, zf);
    rb(0.46, 0.2, 0.06, 0.02, M.plasticoCinza, 0, 0.05, 0.03, g);
    rb(0.42, 0.04, 0.03, 0.01, std(0x2c3e50, { rough: 0.4 }), 0, 0.12, 0.06, g);
    esf(0.006, std(0x66ff88, { emissive: 0x33dd66, ei: 2 }), 0.17, 0.12, 0.076, g);
    for (const [x, tipo] of [[-0.11, 'oto'], [0.11, 'oft']] as const) {
      // cabo serrilhado preto pendurado
      cil(0.017, 0.017, 0.16, M.pretoFosco, x, -0.08, 0.08, g, 0, 0, 16);
      for (let i = 0; i < 6; i++) cil(0.0185, 0.0185, 0.005, M.borracha, x, -0.13 + i * 0.018, 0.08, g, 0, 0, 16);
      cil(0.02, 0.017, 0.03, M.cromo, x, 0.015, 0.08, g, 0, 0, 16);
      if (tipo === 'oto') {
        cil(0.022, 0.022, 0.035, M.pretoFosco, x, 0.045, 0.08, g, Math.PI / 2, 0, 16);
        cil(0.004, 0.014, 0.04, M.pretoFosco, x, 0.045, 0.12, g, Math.PI / 2, 0, 12);
      } else {
        rb(0.04, 0.06, 0.025, 0.01, M.pretoFosco, x, 0.06, 0.08, g);
        cil(0.009, 0.009, 0.004, std(0x334455, { rough: 0.05, metal: 0.6 }), x, 0.07, 0.094, g, Math.PI / 2, 0, 12);
      }
      tubo([[x, -0.16, 0.08], [x, -0.25, 0.1], [x * 0.5, -0.3, 0.08], [0, -0.1, 0.06]], 0.004, M.pretoFosco, g, 24);
    }
    rb(0.08, 0.14, 0.05, 0.01, M.vidroFosco, 0.32, -0.02, 0.03, g);
    for (let i = 0; i < 4; i++) cil(0.006, 0.012, 0.03, M.pretoFosco, 0.32, -0.06 + i * 0.03, 0.03, g, 0, 0, 10);
  }
  // armário de procedimento: gaveteiro com tampo, caixas de luva e aéreo de vidro
  const ax = 1.55;
  {
    const g = grupo(ax, 0, zf);
    rb(1.1, 0.84, 0.5, 0.01, M.laca, 0, 0.47, 0.25, g);
    b(1.06, 0.08, 0.46, std(0x707a82, { rough: 0.6 }), 0, 0.04, 0.24, g); // rodapé recuado
    for (const [y, hh] of [[0.24, 0.3], [0.56, 0.3], [0.8, 0.15]]) {
      rb(1.06, hh - 0.02, 0.02, 0.006, M.plasticoBranco, 0, y, 0.505, g);
      rb(0.24, 0.02, 0.035, 0.009, M.inox, 0, y + hh / 2 - 0.06, 0.53, g);
    }
    rb(1.14, 0.035, 0.54, 0.008, std(0xe3e1da, { rough: 0.25 }), 0, 0.905, 0.26, g);
    // caixas de luvas P/M/G com etiqueta
    const luva = (x: number, cor: string, tam: string) => {
      const gb = grupo(x, 0.98, 0.2, 0, g);
      b(0.24, 0.12, 0.13, std(0xffffff, { map: textura(256, 128, (c, W, H2) => {
        c.fillStyle = '#f6f8fa';
        c.fillRect(0, 0, W, H2);
        c.fillStyle = cor;
        c.fillRect(0, 0, W, 34);
        c.fillRect(0, H2 - 18, W, 18);
        texto(c, 'LUVAS', W / 2, 18, 22, '#fff');
        texto(c, `PROCEDIMENTO · ${tam}`, W / 2, 62, 18, '#33424d');
        texto(c, '100 un', W / 2, 90, 16, '#6b7680', '600');
      }), rough: 0.6 }), 0, 0, 0, gb);
      const furo = new THREE.Mesh(new THREE.CircleGeometry(0.035, 24), std(0x7aa6d8, { rough: 0.8 }));
      pos(furo, 0, 0.0605, 0, gb, -Math.PI / 2).scale.set(1.6, 0.9, 1);
    };
    luva(-0.38, '#4462c4', 'P');
    luva(-0.12, '#8e44ad', 'M');
    luva(0.14, '#1aa0c8', 'G');
    // frasco de gaze, almotolia e caixa de máscaras
    torno([[0, 0], [0.05, 0], [0.05, 0.14], [0.045, 0.15], [0, 0.15]], std(0xeef6f9, { rough: 0.05, opacity: 0.45 }), 0.37, 0.925, 0.24, g);
    cil(0.046, 0.046, 0.11, std(0xffffff, { rough: 1 }), 0.37, 0.985, 0.24, g);
    cil(0.052, 0.052, 0.02, M.inox, 0.37, 1.085, 0.24, g);
    torno([[0, 0], [0.03, 0], [0.032, 0.1], [0.012, 0.13], [0.006, 0.17], [0, 0.17]], std(0xf2f5f7, { rough: 0.35 }), 0.48, 0.925, 0.36, g);
    rb(0.2, 0.08, 0.1, 0.006, std(0xffffff, { map: textura(256, 128, (c, W, H2) => {
      c.fillStyle = '#e8f4fb';
      c.fillRect(0, 0, W, H2);
      texto(c, 'MÁSCARA', W / 2, 40, 26, '#1d6fa5');
      texto(c, 'CIRÚRGICA', W / 2, 80, 22, '#1d6fa5');
    }), rough: 0.6 }), 0.1, 0.965, 0.4, g);
    // aéreo com portas de vidro e prateleira com insumos
    rb(1.1, 0.62, 0.36, 0.01, M.laca, 0, 2.08, 0.18, g);
    b(1.02, 0.54, 0.005, std(0xdfe5e8, { rough: 0.7 }), 0, 2.08, 0.01, g);
    b(1.02, 0.015, 0.32, M.plasticoBranco, 0, 2.08, 0.18, g);
    const r = semente(61);
    for (const y of [1.84, 2.1]) for (let i = 0; i < 6; i++) {
      const w = 0.1 + r() * 0.07, hh = 0.1 + r() * 0.1;
      const cores = [0xe3f2fd, 0xfff3e0, 0xe8f5e9, 0xfce4ec, 0xffffff, 0xede7f6];
      rb(w, hh, 0.2, 0.004, std(cores[i], { rough: 0.6 }), -0.42 + i * 0.165, y + hh / 2 + 0.008, 0.16, g);
    }
    for (const s of [-1, 1]) {
      const pg = grupo(s * 0.275, 2.08, 0.37, 0, g);
      rb(0.54, 0.6, 0.02, 0.006, M.aluminio, 0, 0, 0, pg);
      b(0.48, 0.54, 0.022, M.vidro, 0, 0, 0, pg);
      rb(0.015, 0.12, 0.025, 0.006, M.inox, -s * 0.22, -0.18, 0.02, pg);
    }
    obst.push([ax - 0.6, ax + 0.6, z0, z0 + 0.6]);
  }
  // pôster de higienização das mãos e coletor de perfurocortantes em suporte
  quadroMold(0.42, 0.58, 2.65, 1.9, zf, 0, (c, W, H2) => {
    c.fillStyle = '#ffffff';
    c.fillRect(0, 0, W, H2);
    c.fillStyle = '#2f7fb5';
    c.fillRect(0, 0, W, 86);
    texto(c, 'HIGIENIZAÇÃO', W / 2, 30, 34, '#fff');
    texto(c, 'DAS MÃOS', W / 2, 64, 30, '#fff');
    const passos = ['Palma com palma', 'Dorso das mãos', 'Entre os dedos', 'Polegares', 'Pontas dos dedos', 'Punhos'];
    passos.forEach((p, i) => {
      const x = 20 + (i % 2) * (W / 2), y = 110 + Math.floor(i / 2) * 200;
      c.fillStyle = '#e3f2fd';
      rrect(c, x, y, W / 2 - 40, 150, 14);
      c.fill();
      c.fillStyle = '#f1c9a5';
      c.beginPath();
      c.ellipse(x + (W / 2 - 40) / 2 - 18, y + 62, 30, 42, -0.4, 0, Math.PI * 2);
      c.ellipse(x + (W / 2 - 40) / 2 + 18, y + 62, 30, 42, 0.4, 0, Math.PI * 2);
      c.fill();
      texto(c, `${i + 1}`, x + 22, y + 22, 24, '#2f7fb5');
      texto(c, p, x + (W / 2 - 40) / 2, y + 130, 19, '#263238', '600');
    });
  });
  {
    const g = grupo(2.65, 1.15, zf);
    rb(0.3, 0.05, 0.22, 0.008, M.inox, 0, -0.14, 0.11, g);
    rb(0.3, 0.3, 0.02, 0.008, M.inox, 0, 0, 0.01, g);
    rb(0.26, 0.24, 0.18, 0.01, std(0xf6c315, { rough: 0.6 }), 0, 0, 0.11, g);
    rb(0.27, 0.04, 0.19, 0.008, std(0xd32f2f, { rough: 0.4 }), 0, 0.13, 0.11, g);
    const et = cartaz(0.22, 0.12, 256, (c, W, H2) => {
      c.fillStyle = '#f6c315';
      c.fillRect(0, 0, W, H2);
      c.strokeStyle = '#222';
      c.lineWidth = 4;
      c.strokeRect(6, 6, W - 12, H2 - 12);
      texto(c, 'PERFURO-', W / 2, H2 * 0.38, 30, '#222');
      texto(c, 'CORTANTE', W / 2, H2 * 0.68, 30, '#222');
    });
    pos(et, 0, -0.01, 0.201, g);
  }

  /* ---- pia de lavagem das mãos (clicável) ---- */
  const P = pia;
  const gp = new THREE.Group();
  gp.position.copy(P);
  {
    // azulejos atrás da pia
    b(1.3, 0.7, 0.01, std(0xffffff, { map: repetida(TEX.azulejo(), 1.3 / 0.6, 0.7 / 0.6), rough: 0.18 }), 0, 1.2, -0.29, gp);
    // gabinete com duas portas
    rb(1.0, 0.8, 0.52, 0.01, M.laca, 0, 0.48, 0, gp);
    b(0.96, 0.08, 0.48, std(0x707a82, { rough: 0.6 }), 0, 0.04, -0.01, gp);
    for (const s of [-1, 1]) {
      rb(0.47, 0.74, 0.02, 0.006, M.plasticoBranco, s * 0.245, 0.47, 0.265, gp);
      rb(0.02, 0.18, 0.03, 0.008, M.inox, s * 0.04, 0.68, 0.285, gp);
    }
    // tampo com cuba embutida
    const tampo = std(0xf2f1ec, { rough: 0.22 });
    rb(1.04, 0.04, 0.56, 0.012, tampo, 0, 0.9, 0.0, gp);
    b(1.04, 0.1, 0.02, tampo, 0, 0.97, -0.27, gp); // espelho do tampo
    torno([[0.0, -0.17], [0.12, -0.165], [0.19, -0.13], [0.22, -0.06], [0.23, 0.0], [0.25, 0.0], [0.25, 0.012]], std(0xf8f8f6, { rough: 0.12 }), 0, 0.92, 0.03, gp, 48).scale.set(1, 1, 0.75);
    cil(0.022, 0.022, 0.005, M.cromo, 0, 0.756, 0.03, gp, 0, 0, 20); // ralo
    // torneira bica alta (pescoço de ganso) com alavanca de cotovelo
    cil(0.028, 0.032, 0.05, M.cromo, 0, 0.945, -0.18, gp);
    tubo([[0, 0.96, -0.18], [0, 1.18, -0.18], [0, 1.25, -0.12], [0, 1.2, -0.02], [0, 1.1, 0.0]], 0.014, M.cromo, gp, 32);
    cil(0.016, 0.014, 0.025, M.cromo, 0, 1.09, 0.0, gp, 0, 0, 16);
    rb(0.2, 0.018, 0.022, 0.009, M.cromo, 0.1, 0.99, -0.18, gp);
    // espelho com moldura inox
    rb(0.52, 0.66, 0.025, 0.01, M.inox, 0, 1.75, -0.275, gp);
    b(0.48, 0.62, 0.006, std(0xb9c6cc, { rough: 0.02, metal: 1, env: 1.4 }), 0, 1.75, -0.26, gp);
    // saboneteira e toalheiro de papel
    rb(0.12, 0.22, 0.1, 0.02, M.plasticoBranco, 0.4, 1.33, -0.23, gp);
    rb(0.1, 0.1, 0.01, 0.01, std(0xf0a1c0, { rough: 0.3 }), 0.4, 1.36, -0.175, gp);
    rb(0.07, 0.03, 0.04, 0.008, M.plasticoCinza, 0.4, 1.2, -0.2, gp);
    rb(0.32, 0.38, 0.14, 0.03, M.plasticoBranco, -0.62, 1.42, -0.2, gp);
    rb(0.28, 0.16, 0.01, 0.02, std(0xdfe8ec, { rough: 0.1, opacity: 0.8 }), -0.62, 1.48, -0.128, gp);
    b(0.22, 0.004, 0.07, M.papel, -0.62, 1.215, -0.15, gp);
    rb(0.24, 0.02, 0.02, 0.006, M.plasticoCinza, -0.62, 1.235, -0.13, gp);
    const placaPia = placaTexto('LAVE AS MÃOS', 0.6, 0.16, '#2f7fb5', '#ffffff');
    pos(placaPia, 0, 2.2, -0.265, gp);
  }
  // materiais próprios (o realce ao passar o mouse não pode acender outras peças)
  gp.traverse(o => {
    if (o instanceof THREE.Mesh) o.material = (o.material as THREE.Material).clone();
  });
  cena.add(gp);
  obst.push([P.x - 0.55, P.x + 0.55, P.z - 0.3, P.z + 0.32]);

  // lixeiras com pedal (comum e infectante)
  const lixeira = (x: number, z: number, cor: number, rotulo: string, fundo: string) => {
    const g = grupo(x, 0, z, -Math.PI / 2);
    const corpo = std(cor, { rough: 0.35 });
    torno([[0, 0.02], [0.15, 0.02], [0.165, 0.5], [0, 0.5]], corpo, 0, 0, 0, g);
    const tampa = torno([[0, 0.07], [0.12, 0.06], [0.17, 0.02], [0.17, 0], [0, 0]], corpo, 0, 0.5, 0, g);
    tampa.rotation.x = -0.02;
    rb(0.1, 0.02, 0.08, 0.008, M.pretoFosco, 0, 0.02, 0.18, g);
    const et = cartaz(0.16, 0.08, 256, (c, W, H2) => {
      c.fillStyle = fundo;
      rrect(c, 0, 0, W, H2, 14);
      c.fill();
      texto(c, rotulo, W / 2, H2 / 2 + 2, rotulo.length > 7 ? 36 : 44, '#fff');
    });
    et.position.set(0, 0.32, 0.162);
    et.rotation.x = -0.03;
    g.add(et);
  };
  lixeira(x1 - 0.22, P.z + 0.05, 0x9aa3aa, 'COMUM', '#55606a');
  lixeira(x1 - 0.22, P.z + 0.45, 0xf4f4f2, 'INFECTANTE', '#c62828');
  obst.push([x1 - 0.42, x1, P.z - 0.2, P.z + 0.7]);

  /* =================== PAREDE ESQUERDA: AVALIADOR =================== */
  const mesa = grupo(-2.55, 0, -2.25, Math.PI / 2.4);
  const madeira = std(0xffffff, { map: TEX.madeira(), rough: 0.42 });
  const telaAvaliador = (() => {
    const cv = canvas(512, 320);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = ANISO;
    return { cv, tex };
  })();
  {
    rb(1.3, 0.04, 0.72, 0.012, madeira, 0, 0.75, 0, mesa);
    rb(1.3, 0.012, 0.72, 0.006, std(0x8a6038, { rough: 0.5 }), 0, 0.728, 0, mesa); // fita de borda
    // estrutura metálica
    for (const sx of [-0.6, 0.6]) {
      rb(0.05, 0.71, 0.05, 0.01, M.aluminio, sx, 0.365, -0.3, mesa);
      rb(0.05, 0.71, 0.05, 0.01, M.aluminio, sx, 0.365, 0.3, mesa);
      rb(0.05, 0.04, 0.62, 0.01, M.aluminio, sx, 0.05, 0, mesa);
      for (const sz of [-0.3, 0.3]) cil(0.02, 0.02, 0.012, M.borracha, sx, 0.006, sz, mesa, 0, 0, 12);
    }
    rb(1.2, 0.04, 0.04, 0.01, M.aluminio, 0, 0.71, -0.3, mesa);
    rb(1.18, 0.34, 0.015, 0.006, std(0x6c7a84, { rough: 0.5, metal: 0.3 }), 0, 0.52, -0.33, mesa); // painel frontal
    // notebook aberto
    const nb = grupo(-0.25, 0.772, 0.05, 0, mesa);
    const casco = std(0x9aa3a9, { rough: 0.35, metal: 0.8 });
    rb(0.34, 0.016, 0.24, 0.006, casco, 0, 0.008, 0, nb);
    b(0.3, 0.002, 0.11, std(0x1e2326, { rough: 0.7 }), 0, 0.017, -0.035, nb); // teclado
    for (let i = 0; i < 5; i++) for (let j = 0; j < 13; j++) b(0.018, 0.003, 0.016, std(0x2c3237, { rough: 0.6 }), -0.132 + j * 0.022, 0.0185, -0.08 + i * 0.019, nb);
    b(0.1, 0.002, 0.06, std(0x8e979d, { rough: 0.3, metal: 0.8 }), 0, 0.017, 0.07, nb); // touchpad
    const tampa = grupo(0, 0.016, -0.12, 0, nb);
    tampa.rotation.x = 0.28;
    rb(0.34, 0.23, 0.01, 0.006, casco, 0, 0.115, -0.004, tampa);
    const tela = new THREE.Mesh(new THREE.PlaneGeometry(0.31, 0.195), new THREE.MeshBasicMaterial({ map: telaAvaliador.tex }));
    pos(tela, 0, 0.118, 0.0015, tampa);
    // prancheta com checklist
    const pr = grupo(0.22, 0.772, 0.02, -0.12, mesa);
    rb(0.24, 0.008, 0.33, 0.004, std(0x8d6e63, { rough: 0.55 }), 0, 0.004, 0, pr);
    const folha = cartaz(0.21, 0.29, 256, (c, W, H2) => {
      c.fillStyle = '#fdfdfb';
      c.fillRect(0, 0, W, H2);
      texto(c, `CHECKLIST · ESTAÇÃO ${numero}`, W / 2, 22, 13, '#1b4d89');
      for (let i = 0; i < 12; i++) {
        const y = 50 + i * 24;
        c.strokeStyle = '#90a4ae';
        c.lineWidth = 1.5;
        c.strokeRect(14, y - 7, 12, 12);
        c.fillStyle = '#b0bec5';
        c.fillRect(34, y - 2, 120 + ((i * 37) % 70), 4);
        if (i < 5) {
          c.strokeStyle = '#1e88e5';
          c.lineWidth = 2.5;
          c.beginPath();
          c.moveTo(15, y);
          c.lineTo(20, y + 5);
          c.lineTo(28, y - 8);
          c.stroke();
        }
      }
    });
    pos(folha, 0, 0.0095, 0.01, pr, -Math.PI / 2);
    rb(0.11, 0.022, 0.04, 0.008, M.inox, 0, 0.014, -0.15, pr);
    // caneta, cronômetro, copo d'água e plaquinha
    cil(0.005, 0.005, 0.14, std(0x1e88e5, { rough: 0.3 }), 0.37, 0.778, 0.04, mesa, Math.PI / 2, 0, 10).rotation.z = 0.4;
    {
      const cr = grupo(0.42, 0.772, 0.24, 0, mesa);
      cil(0.032, 0.032, 0.018, std(0xeeeeee, { rough: 0.3 }), 0, 0.012, 0, cr, 0, 0, 24);
      const vis = cartaz(0.045, 0.02, 128, (c, W, H2) => {
        c.fillStyle = '#c9d6c3';
        c.fillRect(0, 0, W, H2);
        texto(c, '04:12', W / 2, H2 / 2 + 2, 44, '#1d2a1d', 'bold');
      });
      pos(vis, 0, 0.0215, 0, cr, -Math.PI / 2);
      cil(0.006, 0.006, 0.012, M.cromo, 0, 0.012, -0.035, cr, Math.PI / 2, 0, 10);
    }
    torno([[0, 0], [0.03, 0], [0.04, 0.11], [0.038, 0.11], [0.028, 0.004], [0, 0.004]], std(0xeef6f9, { rough: 0.05, opacity: 0.35, side: THREE.DoubleSide }), -0.52, 0.77, 0.22, mesa);
    cil(0.033, 0.029, 0.07, std(0xbfe4f2, { rough: 0.05, opacity: 0.5 }), -0.52, 0.81, 0.22, mesa);
    // vaso com planta
    {
      const vp = grupo(-0.52, 0.77, -0.2, 0, mesa);
      torno([[0, 0], [0.05, 0], [0.065, 0.11], [0.07, 0.115], [0, 0.115]], std(0xe9e4dc, { rough: 0.6 }), 0, 0, 0, vp);
      cil(0.062, 0.062, 0.005, std(0x3b2a20, { rough: 1 }), 0, 0.108, 0, vp);
      const folhaMat = std(0x3f8f4f, { rough: 0.55, side: THREE.DoubleSide });
      const r = semente(77);
      for (let i = 0; i < 14; i++) {
        const f = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 6), folhaMat);
        f.scale.set(0.35, 1.2, 0.08);
        const a = (i / 14) * Math.PI * 2;
        f.position.set(Math.cos(a) * 0.025, 0.15 + r() * 0.05, Math.sin(a) * 0.025);
        f.rotation.set(Math.sin(a) * 0.6, a, Math.cos(a) * 0.6);
        vp.add(f);
      }
    }
    // lixeira pequena
    torno([[0, 0], [0.1, 0], [0.13, 0.3], [0.125, 0.3], [0.095, 0.01], [0, 0.01]], std(0x4a5560, { rough: 0.5, side: THREE.DoubleSide }), 0.45, 0, -0.1, mesa);
  }
  {
    // plaquinha "AVALIADOR" em prisma
    const pg = grupo(0, 0.77, 0.3, 0, mesa);
    const tri = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.36, 3), std(0x0f5c4d, { rough: 0.4 }));
    pos(tri, 0, 0.018, 0, pg, 0, 0, Math.PI / 2);
    tri.rotation.x = Math.PI / 6 + Math.PI;
    const t = placaTexto('AVALIADOR', 0.32, 0.05, '#0f5c4d', '#ffffff');
    pos(t, 0, 0.03, 0.022, pg, -0.52);
  }
  // cadeira giratória do avaliador
  {
    const g = grupo(-3.3, 0, -2.6, Math.PI / 2.4 + Math.PI / 2);
    const tec = std(0xffffff, { map: TEX.tecido('#34495e'), rough: 0.95 });
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const raio = rb(0.3, 0.025, 0.04, 0.01, M.pretoFosco, Math.cos(a) * 0.15, 0.07, Math.sin(a) * 0.15, g);
      raio.rotation.y = -a;
      cil(0.022, 0.022, 0.02, M.borracha, Math.cos(a) * 0.29, 0.025, Math.sin(a) * 0.29, g, 0, Math.PI / 2, 14);
      b(0.02, 0.03, 0.02, M.pretoFosco, Math.cos(a) * 0.29, 0.06, Math.sin(a) * 0.29, g);
    }
    cil(0.035, 0.035, 0.05, M.pretoFosco, 0, 0.085, 0, g);
    cil(0.022, 0.022, 0.25, M.cromo, 0, 0.23, 0, g);
    rb(0.3, 0.03, 0.28, 0.01, M.pretoFosco, 0, 0.37, 0, g);
    rb(0.5, 0.08, 0.48, 0.035, tec, 0, 0.42, 0, g);
    rb(0.06, 0.32, 0.025, 0.01, M.pretoFosco, 0, 0.55, 0.24, g);
    const enc = rb(0.46, 0.46, 0.07, 0.035, tec, 0, 0.88, 0.27, g);
    enc.rotation.x = 0.1;
    for (const s of [-1, 1]) {
      rb(0.03, 0.22, 0.03, 0.01, M.pretoFosco, s * 0.25, 0.52, 0.02, g);
      rb(0.06, 0.03, 0.26, 0.012, M.pretoFosco, s * 0.25, 0.64, 0.0, g);
    }
  }
  obst.push([-3.4, -1.9, -3.0, -1.5], [-3.6, -3.0, -2.9, -2.3]);

  // tabela de Snellen
  quadroMold(0.34, 0.82, x0, 1.55, -0.55, Math.PI / 2, (c, W, H2) => {
    c.fillStyle = '#ffffff';
    c.fillRect(0, 0, W, H2);
    texto(c, 'SNELLEN', W / 2, 30, 26, '#c62828');
    const linhas = ['E', 'F P', 'T O Z', 'L P E D', 'P E C F D', 'E D F C Z P', 'F E L O P Z D', 'D E F P O T E C'];
    let y = 110;
    linhas.forEach((l, i) => {
      const px = Math.max(14, 110 - i * 15);
      texto(c, l, W / 2, y, px, '#111', '700');
      c.fillStyle = '#c62828';
      c.fillRect(W - 28, y - 1, 16, 2);
      y += px * 0.85 + 30;
    });
  });
  // quadro branco com bandeja e pincéis
  {
    const g = grupo(x0, 1.65, 0.95, Math.PI / 2);
    rb(1.84, 1.04, 0.03, 0.01, M.aluminio, 0, 0, 0.015, g);
    const q = cartaz(1.78, 0.98, 1024, (c, W, H2) => {
      c.fillStyle = '#ffffff';
      c.fillRect(0, 0, W, H2);
      manchas(c, W, H2, '#e8eef2', 10, 0.5);
      c.fillStyle = '#1565c0';
      texto(c, `OSCE · Estação ${numero}`, 40, 70, 54, '#1565c0', 'bold', 'left');
      texto(c, '1 min leitura · 5 min execução', 40, 140, 36, '#c62828', '600', 'left');
      ['✓ Higienize as mãos', '✓ Apresente-se e peça consentimento', '✓ Examine pelo lado direito', '✓ Explique cada etapa ao paciente'].forEach((s, i) => texto(c, s, 40, 220 + i * 60, 34, '#37474f', '500', 'left'));
      c.strokeStyle = '#2e7d32';
      c.lineWidth = 5;
      c.beginPath();
      c.arc(W - 220, 330, 120, 0, Math.PI * 2);
      c.stroke();
      texto(c, 'ABCDE', W - 220, 330, 46, '#2e7d32');
    });
    (q.material as THREE.MeshStandardMaterial).roughness = 0.12;
    pos(q, 0, 0, 0.031, g);
    rb(1.4, 0.03, 0.08, 0.01, M.aluminio, 0, -0.53, 0.05, g);
    for (const [x, cor] of [[-0.3, 0x1565c0], [-0.15, 0xc62828], [0.0, 0x2e7d32], [0.15, 0x222222]] as const) cil(0.009, 0.009, 0.13, std(cor, { rough: 0.4 }), x, -0.505, 0.05, g, 0, Math.PI / 2, 10);
    rb(0.12, 0.04, 0.05, 0.01, std(0x455a64, { rough: 0.8 }), 0.42, -0.5, 0.05, g);
  }
  // cabideiro com jaleco
  {
    const g = grupo(x0, 1.8, 2.6, Math.PI / 2);
    rb(0.4, 0.06, 0.02, 0.008, M.aluminio, 0, 0, 0.01, g);
    for (const x of [-0.12, 0.12]) tubo([[x, 0, 0.02], [x, 0, 0.07], [x, 0.04, 0.09]], 0.008, M.cromo, g, 8);
    const jal = std(0xffffff, { map: TEX.tecido('#f7f7f5'), rough: 0.95 });
    const jg = grupo(-0.12, -0.06, 0.07, 0, g);
    rb(0.16, 0.04, 0.04, 0.015, jal, 0, 0.0, 0, jg); // gola no gancho
    const corpo = rb(0.44, 0.9, 0.06, 0.03, jal, 0, -0.47, 0.0, jg);
    corpo.scale.z = 1;
    for (const s of [-1, 1]) {
      const manga = rb(0.1, 0.62, 0.06, 0.03, jal, s * 0.25, -0.38, 0.0, jg);
      manga.rotation.z = s * 0.08;
      const lapela = b(0.08, 0.32, 0.006, std(0xe9e9e6, { rough: 0.95 }), s * 0.06, -0.16, 0.033, jg);
      lapela.rotation.z = -s * 0.35;
      b(0.13, 0.1, 0.006, std(0xeeeeeb, { rough: 0.95 }), s * 0.11, -0.66, 0.033, jg); // bolsos
    }
    b(0.004, 0.62, 0.004, std(0xd5d5d2, { rough: 0.9 }), 0.0, -0.58, 0.034, jg);
    for (let i = 0; i < 4; i++) cil(0.007, 0.007, 0.004, std(0xdddddd, { rough: 0.4 }), 0.012, -0.36 - i * 0.14, 0.034, jg, Math.PI / 2, 0, 10);
    cil(0.004, 0.004, 0.11, std(0x1e88e5, { rough: 0.3 }), -0.12, -0.6, 0.04, jg, 0, 0, 8); // caneta no bolso
  }

  /* =================== PAREDE DIREITA: JANELA, ESCALA DE DOR, BALANÇA =================== */
  {
    const g = grupo(x1, (J.ya + J.yb) / 2, (J.za + J.zb) / 2, -Math.PI / 2);
    // requadro do vão
    const req = std(0xf0ede6, { rough: 0.6 });
    b(2.4, 0.02, 0.2, req, 0, 0.61, -0.1, g);
    b(2.4, 0.02, 0.2, req, 0, -0.61, -0.1, g);
    for (const s of [-1, 1]) b(0.02, 1.24, 0.2, req, s * 1.19, 0, -0.1, g);
    // vista externa (campus com árvores e prédios)
    const vista = cartaz(2.4, 1.3, 1024, (c, W, H2) => {
      const ceu = c.createLinearGradient(0, 0, 0, H2);
      ceu.addColorStop(0, '#8fc3ea');
      ceu.addColorStop(0.7, '#d7ebf7');
      ceu.addColorStop(1, '#eef5f2');
      c.fillStyle = ceu;
      c.fillRect(0, 0, W, H2);
      const r = semente(91);
      for (let i = 0; i < 6; i++) {
        c.fillStyle = 'rgba(255,255,255,0.7)';
        const x = r() * W, y = 40 + r() * 120;
        for (let k = 0; k < 5; k++) {
          c.beginPath();
          c.ellipse(x + k * 26, y + Math.sin(k) * 8, 38, 16, 0, 0, Math.PI * 2);
          c.fill();
        }
      }
      for (let i = 0; i < 6; i++) {
        const x = i * 180 + r() * 60, w = 120 + r() * 80, h = 140 + r() * 160;
        c.fillStyle = ['#c9c2b6', '#b8c3cc', '#d8d2c6'][i % 3];
        c.fillRect(x, H2 * 0.62 - h, w, h + 100);
        c.fillStyle = 'rgba(70,110,140,0.55)';
        for (let yy = H2 * 0.62 - h + 14; yy < H2 * 0.6; yy += 26) for (let xx = x + 10; xx < x + w - 14; xx += 22) c.fillRect(xx, yy, 14, 16);
      }
      for (let i = 0; i < 22; i++) {
        const x = r() * W, y = H2 * 0.62 + r() * 40, rr = 30 + r() * 50;
        c.fillStyle = ['#5f8f4e', '#4e7d43', '#77a160'][i % 3];
        c.beginPath();
        c.arc(x, y, rr, 0, Math.PI * 2);
        c.fill();
      }
      c.fillStyle = '#9bbf7a';
      c.fillRect(0, H2 * 0.7, W, H2 * 0.3);
    }, true);
    pos(vista, 0, 0, -0.25, g);
    // caixilho
    const caix = std(0xf3f3f1, { rough: 0.35 });
    rb(2.34, 0.07, 0.12, 0.01, caix, 0, 0.62, 0.0, g);
    rb(2.34, 0.07, 0.12, 0.01, caix, 0, -0.62, 0.0, g);
    for (const x of [-1.15, 0, 1.15]) rb(0.07, 1.3, 0.12, 0.01, caix, x, 0, 0.0, g);
    b(2.3, 1.2, 0.006, M.vidro, 0, 0, 0.0, g);
    for (const x of [-0.55, 0.6]) rb(0.025, 0.12, 0.03, 0.008, M.aluminio, x, -0.1, 0.07, g);
    // peitoril
    rb(2.5, 0.035, 0.16, 0.01, std(0xe7e4dd, { rough: 0.3 }), 0, -0.635, 0.06, g);
    // persiana horizontal meio aberta
    rb(2.36, 0.07, 0.09, 0.02, M.aluminio, 0, 0.7, 0.12, g);
    const lamina = std(0xeceff1, { rough: 0.45, metal: 0.2, side: THREE.DoubleSide });
    for (let i = 0; i < 14; i++) {
      const l = b(2.28, 0.003, 0.05, lamina, 0, 0.64 - i * 0.035, 0.12, g);
      l.rotation.x = 0.55;
    }
    rb(2.3, 0.02, 0.055, 0.008, M.aluminio, 0, 0.64 - 14 * 0.035, 0.12, g);
    for (const x of [-0.9, 0, 0.9]) b(0.004, 0.5, 0.004, std(0xdddddd, { rough: 0.8 }), x, 0.4, 0.12, g);
    tubo([[1.05, 0.66, 0.15], [1.05, 0.0, 0.16], [1.05, -0.3, 0.16]], 0.003, std(0xdddddd, { rough: 0.8 }), g, 4);
    cil(0.01, 0.01, 0.05, M.plasticoBranco, 1.05, -0.32, 0.16, g, 0, 0, 10);
  }
  quadroMold(0.5, 0.7, x1, 1.55, 2.25, -Math.PI / 2, (c, W, H2) => {
    c.fillStyle = '#ffffff';
    c.fillRect(0, 0, W, H2);
    texto(c, 'ESCALA DE DOR', W / 2, 44, 40, '#263238');
    const cores = ['#43a047', '#7cb342', '#c0ca33', '#fdd835', '#ffb300', '#fb8c00', '#f4511e', '#e53935', '#d32f2f', '#b71c1c', '#8e0000'];
    cores.forEach((cor, i) => {
      const y = 100 + i * 52;
      c.fillStyle = cor;
      rrect(c, 40, y, 90, 42, 8);
      c.fill();
      texto(c, String(i), 85, y + 22, 26, '#fff');
      // carinha
      const cx = 190, cy = y + 21;
      c.fillStyle = cor;
      c.beginPath();
      c.arc(cx, cy, 19, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = '#222';
      c.fillRect(cx - 8, cy - 6, 4, 4);
      c.fillRect(cx + 4, cy - 6, 4, 4);
      c.strokeStyle = '#222';
      c.lineWidth = 2.5;
      c.beginPath();
      const k = (5 - i) / 5;
      c.moveTo(cx - 9, cy + 7);
      c.quadraticCurveTo(cx, cy + 7 + k * 8, cx + 9, cy + 7);
      c.stroke();
      texto(c, ['Sem dor', '', 'Leve', '', 'Moderada', '', 'Intensa', '', 'Muito intensa', '', 'Pior possível'][i], 240, y + 22, 24, '#37474f', '600', 'left');
    });
  });
  // balança antropométrica com régua
  {
    const g = grupo(x1 - 0.42, 0, 3.2, -Math.PI / 2);
    rb(0.42, 0.08, 0.5, 0.02, std(0xe9ecee, { rough: 0.4, metal: 0.3 }), 0, 0.06, 0.05, g);
    rb(0.36, 0.01, 0.4, 0.004, std(0x2b2f33, { map: TEX.napa('#2b2f33'), rough: 0.85 }), 0, 0.105, 0.06, g);
    for (const [x, z] of [[-0.17, -0.18], [0.17, -0.18], [-0.17, 0.28], [0.17, 0.28]]) cil(0.02, 0.02, 0.02, M.borracha, x, 0.01, z, g, 0, 0, 12);
    rb(0.07, 1.25, 0.05, 0.01, std(0xe9ecee, { rough: 0.4, metal: 0.3 }), 0, 0.72, -0.19, g);
    // cabeçote digital
    rb(0.26, 0.16, 0.08, 0.02, M.plasticoBranco, 0, 1.3, -0.16, g);
    const vis = cartaz(0.16, 0.06, 256, (c, W, H2) => {
      c.fillStyle = '#16231a';
      c.fillRect(0, 0, W, H2);
      texto(c, '0,0 kg', W / 2, H2 / 2 + 3, 56, '#7dff9e', 'bold');
    }, true);
    pos(vis, 0, 1.31, -0.119, g);
    // estadiômetro
    rb(0.04, 0.9, 0.012, 0.004, std(0xf2f2f0, { map: textura(64, 512, (c, W, H2) => {
      c.fillStyle = '#f7f7f4';
      c.fillRect(0, 0, W, H2);
      for (let i = 0; i < 100; i++) {
        c.fillStyle = '#333';
        c.fillRect(0, (i / 100) * H2, i % 10 ? 18 : 36, 1.5);
        if (i % 10 === 0) texto(c, String(200 - i), 48, (i / 100) * H2 + 8, 12, '#333', '600');
      }
    }), rough: 0.5 }), 0, 1.85, -0.16, g);
    rb(0.2, 0.012, 0.06, 0.005, M.aluminio, 0, 1.75, -0.12, g);
    obst.push([x1 - 0.75, x1, 2.9, 3.5]);
  }

  /* =================== MACA DE EXAME E ENTORNO =================== */
  const gm = grupo(maca.x, 0, maca.z);
  {
    const Lm = maca.len, Wm = maca.wid, T = maca.top;
    const pintura = std(0xeff1f2, { rough: 0.35, metal: 0.2 });
    // base em gabinete com gavetas (maca clínica moderna)
    rb(Lm - 0.5, 0.5, Wm - 0.2, 0.015, pintura, 0.0, 0.33, 0, gm);
    b(Lm - 0.56, 0.06, Wm - 0.26, std(0x5b6670, { rough: 0.6 }), 0, 0.06, 0, gm);
    for (const s of [-1, 1]) {
      for (const [x, w] of [[-0.42, 0.6], [0.3, 0.7]]) {
        rb(w - 0.02, 0.2, 0.015, 0.005, M.plasticoBranco, x, 0.47, s * (Wm / 2 - 0.095), gm);
        rb(0.16, 0.018, 0.02, 0.008, M.inox, x, 0.5, s * (Wm / 2 - 0.08), gm);
        rb(w - 0.02, 0.2, 0.015, 0.005, M.plasticoBranco, x, 0.22, s * (Wm / 2 - 0.095), gm);
        rb(0.16, 0.018, 0.02, 0.008, M.inox, x, 0.25, s * (Wm / 2 - 0.08), gm);
      }
    }
    // tampo estrutural, colchão em dois módulos e trilho lateral
    rb(Lm, 0.06, Wm, 0.015, pintura, 0, T - 0.12, 0, gm);
    const napa = std(0xffffff, { map: TEX.napa('#3f6a80'), rough: 0.45 });
    rb(0.62, 0.09, Wm - 0.03, 0.03, napa, -Lm / 2 + 0.33, T - 0.04, 0, gm);
    rb(Lm - 0.7, 0.09, Wm - 0.03, 0.03, napa, 0.33, T - 0.04, 0, gm);
    for (const s of [-1, 1]) {
      rb(Lm - 0.3, 0.025, 0.02, 0.008, M.inox, 0.05, T - 0.12, s * (Wm / 2 + 0.02), gm);
      for (const x of [-0.7, 0.8]) b(0.03, 0.02, 0.03, M.inox, x, T - 0.12, s * (Wm / 2 + 0.005), gm);
    }
    // lençol de papel desenrolado do suporte da cabeceira
    b(Lm - 0.15, 0.003, Wm - 0.2, std(0xfafaf7, { rough: 0.95 }), 0.04, T + 0.007, 0, gm);
    for (const s of [-1, 1]) rb(0.06, 0.1, 0.02, 0.008, M.inox, -Lm / 2 - 0.02, T - 0.08, s * (Wm / 2 - 0.08), gm);
    cil(0.065, 0.065, Wm - 0.22, M.papel, -Lm / 2 - 0.04, T - 0.08, 0, gm, Math.PI / 2, 0, 24);
    cil(0.02, 0.02, Wm - 0.21, std(0xb08a5b, { rough: 0.8 }), -Lm / 2 - 0.04, T - 0.08, 0, gm, Math.PI / 2, 0, 12);
    // travesseiro com fronha
    rb(0.36, 0.1, Wm - 0.22, 0.045, std(0xffffff, { map: TEX.tecido('#f4f6f8'), rough: 0.95 }), -Lm / 2 + 0.26, T + 0.05, 0, gm);
    // lençol dobrado nos pés
    rb(0.36, 0.05, Wm - 0.16, 0.015, std(0xffffff, { map: TEX.tecido('#9fc5e8'), rough: 0.95 }), Lm / 2 - 0.26, T + 0.03, 0, gm);
    // pés niveladores
    for (const [x, z] of [[-0.75, -0.25], [0.75, -0.25], [-0.75, 0.25], [0.75, 0.25]]) cil(0.025, 0.03, 0.03, M.borracha, x, 0.015, z, gm, 0, 0, 12);
  }
  obst.push([maca.x - maca.len / 2, maca.x + maca.len / 2, maca.z - maca.wid / 2, maca.z + maca.wid / 2]);

  // escadinha de dois degraus em inox
  {
    const g = grupo(maca.x + 1.35, 0, maca.z + 0.55);
    for (const sx of [-0.21, 0.21]) {
      tubo([[sx, 0, 0.16], [sx, 0.2, 0.16], [sx, 0.2, 0.0], [sx, 0.4, 0.0], [sx, 0.4, -0.12]], 0.012, M.cromo, g, 32);
      tubo([[sx, 0, -0.16], [sx, 0.4, -0.16], [sx, 0.85, -0.17], [sx, 0.88, -0.12]], 0.012, M.cromo, g, 32);
      for (const z of [0.16, -0.16]) cil(0.018, 0.018, 0.012, M.borracha, sx, 0.006, z, g, 0, 0, 10);
    }
    tubo([[-0.21, 0.88, -0.12], [0, 0.89, -0.12], [0.21, 0.88, -0.12]], 0.012, M.cromo, g, 8);
    for (const [y, z, d] of [[0.2, 0.08, 0.17], [0.4, -0.07, 0.19]]) {
      rb(0.44, 0.02, d, 0.006, M.inox, 0, y, z, g);
      rb(0.4, 0.008, d - 0.03, 0.003, std(0x222629, { rough: 0.95 }), 0, y + 0.013, z, g);
    }
  }
  obst.push([maca.x + 1.1, maca.x + 1.6, maca.z + 0.35, maca.z + 0.75]);

  // suporte de soro com bolsa e equipo
  {
    const g = grupo(maca.x - 1.25, 0, maca.z - 0.95);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + 0.3;
      const p = rb(0.26, 0.022, 0.03, 0.008, M.inoxEsc, Math.cos(a) * 0.13, 0.06, Math.sin(a) * 0.13, g);
      p.rotation.y = -a;
      rodizio(Math.cos(a) * 0.26, Math.sin(a) * 0.26, g, 0.025);
    }
    cil(0.03, 0.03, 0.05, M.inoxEsc, 0, 0.08, 0, g, 0, 0, 16);
    cil(0.014, 0.014, 1.95, M.cromo, 0, 1.03, 0, g, 0, 0, 16);
    cil(0.02, 0.02, 0.04, M.inoxEsc, 0, 1.3, 0, g, 0, 0, 16);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      tubo([[0, 1.98, 0], [Math.cos(a) * 0.1, 1.98, Math.sin(a) * 0.1], [Math.cos(a) * 0.13, 2.02, Math.sin(a) * 0.13]], 0.006, M.cromo, g, 8);
    }
    // bolsa de soro fisiológico
    const bolsa = new THREE.Mesh(new THREE.SphereGeometry(0.07, 20, 14), std(0xeaf6fb, { rough: 0.08, opacity: 0.55 }));
    bolsa.scale.set(1, 1.7, 0.45);
    pos(bolsa, 0.13, 1.86, 0, g);
    const et = cartaz(0.07, 0.08, 128, (c, W, H2) => {
      c.fillStyle = '#ffffff';
      c.fillRect(0, 0, W, H2);
      texto(c, 'SF 0,9%', W / 2, 30, 22, '#1d6fa5');
      texto(c, '500 mL', W / 2, 70, 20, '#33424d', '600');
      for (let i = 0; i < 5; i++) {
        c.fillStyle = '#90a4ae';
        c.fillRect(20, 92 + i * 7, 88, 2);
      }
    });
    pos(et, 0.13, 1.86, 0.033, g);
    cil(0.006, 0.006, 0.04, M.plasticoBranco, 0.13, 1.74, 0, g, 0, 0, 8);
    cil(0.012, 0.012, 0.06, std(0xf3fbff, { rough: 0.05, opacity: 0.5 }), 0.13, 1.69, 0, g, 0, 0, 14);
    tubo([[0.13, 1.66, 0], [0.16, 1.3, 0.04], [0.12, 1.0, 0.06], [0.06, 0.85, 0.04], [0.02, 1.0, 0.02], [0.02, 1.25, 0.02]], 0.0035, std(0xeef8fc, { rough: 0.1, opacity: 0.75 }), g, 64);
    rb(0.02, 0.05, 0.02, 0.006, std(0x1e88e5, { rough: 0.4 }), 0.14, 1.25, 0.05, g);
  }
  obst.push([maca.x - 1.45, maca.x - 1.05, maca.z - 1.15, maca.z - 0.75]);

  // carrinho auxiliar inox com instrumentos de exame físico
  const cx = 2.4, cz = 1.2;
  {
    const g = grupo(cx, 0, cz);
    const bandeja = (y: number) => {
      rb(0.72, 0.025, 0.46, 0.008, M.inox, 0, y, 0, g);
      for (const s of [-1, 1]) {
        rb(0.72, 0.04, 0.012, 0.005, M.inox, 0, y + 0.02, s * 0.225, g);
        rb(0.012, 0.04, 0.46, 0.005, M.inox, s * 0.355, y + 0.02, 0, g);
      }
    };
    bandeja(0.85);
    bandeja(0.4);
    for (const [x, z] of [[-0.34, -0.21], [0.34, -0.21], [-0.34, 0.21], [0.34, 0.21]]) {
      cil(0.012, 0.012, 0.8, M.cromo, x, 0.47, z, g, 0, 0, 12);
      rodizio(x, z, g, 0.03);
    }
    // gaveta sob o tampo
    rb(0.5, 0.08, 0.36, 0.008, M.inoxEsc, 0, 0.78, 0, g);
    rb(0.14, 0.015, 0.02, 0.006, M.cromo, 0, 0.78, 0.19, g);
    // campo de tecido azul
    b(0.6, 0.004, 0.36, std(0xffffff, { map: TEX.tecido('#3d7fb3'), rough: 0.95 }), 0, 0.865, 0, g);
    const y0 = 0.869;
    // estetoscópio: olivas, hastes, Y e tubo até a campânula
    const borr = std(0x1c2024, { rough: 0.55 });
    tubo([[-0.24, y0 + 0.01, -0.12], [-0.18, y0 + 0.01, -0.02], [-0.06, y0 + 0.01, 0.03], [0.02, y0 + 0.01, -0.04], [-0.02, y0 + 0.01, -0.1], [-0.1, y0 + 0.01, -0.12], [-0.17, y0 + 0.01, -0.09]], 0.0055, borr, g, 64);
    tubo([[-0.24, y0 + 0.01, -0.12], [-0.28, y0 + 0.01, -0.15], [-0.25, y0 + 0.01, -0.2], [-0.2, y0 + 0.01, -0.21]], 0.0035, M.cromo, g, 24);
    tubo([[-0.24, y0 + 0.01, -0.12], [-0.2, y0 + 0.01, -0.15], [-0.15, y0 + 0.01, -0.19], [-0.12, y0 + 0.01, -0.2]], 0.0035, M.cromo, g, 24);
    esf(0.008, std(0x222222, { rough: 0.5 }), -0.2, y0 + 0.01, -0.21, g);
    esf(0.008, std(0x222222, { rough: 0.5 }), -0.12, y0 + 0.01, -0.2, g);
    cil(0.026, 0.026, 0.014, M.cromo, -0.17, y0 + 0.008, -0.09, g, 0, 0, 32);
    cil(0.023, 0.023, 0.002, std(0x3a3f44, { rough: 0.25 }), -0.17, y0 + 0.016, -0.09, g, 0, 0, 32);
    cil(0.016, 0.02, 0.012, M.cromo, -0.17, y0 + 0.005, -0.06, g, Math.PI / 2, 0, 16);
    // martelo de reflexos (Taylor)
    const tri = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.025, 3), std(0xd64545, { rough: 0.6 }));
    pos(tri, 0.07, y0 + 0.016, 0.07, g, Math.PI / 2);
    cil(0.005, 0.005, 0.18, M.cromo, 0.07, y0 + 0.006, 0.17, g, Math.PI / 2, 0, 10);
    // diapasão
    cil(0.004, 0.004, 0.06, M.cromo, 0.22, y0 + 0.005, -0.15, g, Math.PI / 2, 0, 8);
    for (const dx of [-0.008, 0.008]) b(0.006, 0.006, 0.13, M.cromo, 0.22 + dx, y0 + 0.005, -0.055, g);
    b(0.022, 0.006, 0.008, M.cromo, 0.22, y0 + 0.005, -0.12, g);
    // lanterna clínica
    cil(0.009, 0.009, 0.13, std(0x2e3a42, { rough: 0.35, metal: 0.7 }), 0.25, y0 + 0.01, 0.1, g, 0, Math.PI / 2, 16);
    cil(0.01, 0.01, 0.015, M.cromo, 0.32, y0 + 0.01, 0.1, g, 0, Math.PI / 2, 16);
    rb(0.008, 0.004, 0.05, 0.002, M.cromo, 0.23, y0 + 0.02, 0.1, g).rotation.y = Math.PI / 2;
    // caixa de abaixadores de língua
    const cxA = grupo(-0.17, y0, 0.11, 0.2, g);
    rb(0.16, 0.035, 0.07, 0.004, std(0xf6f2ea, { rough: 0.7 }), 0, 0.018, 0, cxA);
    for (let i = 0; i < 5; i++) rb(0.15, 0.002, 0.018, 0.0009, std(0xd9bc8c, { rough: 0.8 }), 0.01, 0.038 + i * 0.002, -0.022 + i * 0.011, cxA);
    // fita métrica, termômetro, gazes e sachês de álcool
    torno([[0, 0], [0.028, 0], [0.028, 0.016], [0, 0.016]], std(0xf2c12e, { rough: 0.4 }), 0.0, y0, -0.17, g, 24);
    rb(0.11, 0.008, 0.014, 0.003, std(0xf7f7f7, { rough: 0.3 }), 0.12, y0 + 0.004, -0.17, g).rotation.y = 0.5;
    rb(0.008, 0.004, 0.016, 0.001, std(0x2b5aa6, { rough: 0.4 }), 0.075, y0 + 0.006, -0.195, g);
    for (let i = 0; i < 3; i++) rb(0.07, 0.008, 0.05, 0.003, std(0xffffff, { rough: 0.9 }), -0.02 + i * 0.012, y0 + 0.004 + i * 0.008, 0.16, g);
    for (let i = 0; i < 3; i++) rb(0.04, 0.003, 0.04, 0.001, std(0xd0e6f5, { rough: 0.3 }), 0.17 + i * 0.045, y0 + 0.002, 0.18, g);
    // bandeja de baixo: manguito, cuba-rim e caixa de luvas
    rb(0.24, 0.05, 0.12, 0.02, std(0xffffff, { map: TEX.tecido('#1c5a8c'), rough: 0.9 }), -0.15, 0.45, 0, g);
    torno([[0.0, 0.0], [0.06, 0.004], [0.075, 0.03], [0.08, 0.035]], std(0xd9dee2, { rough: 0.2, metal: 0.95, side: THREE.DoubleSide }), 0.15, 0.415, 0, g).scale.set(1.8, 1, 1);
  }
  obst.push([cx - 0.45, cx + 0.45, cz - 0.3, cz + 0.3]);

  /* ---- sombras: tudo projeta e recebe, menos forro, paredes e itens do teto ---- */
  cena.traverse(o => {
    if (!(o instanceof THREE.Mesh)) return;
    const naoProjeta = o === teto || o === piso || paredes.includes(o) || o.position.y > H - 0.06;
    o.castShadow = !naoProjeta && !(o.material as THREE.Material).transparent;
    o.receiveShadow = true;
  });

  return { pisos: [piso], pia: gp, porta, obstaculos: obst, ponteiros: { min, hora, seg }, telaAvaliador };
}

/** Desenha a tela do notebook do avaliador (checklist sendo preenchido). */
export function desenhaTelaAvaliador(cv: HTMLCanvasElement, numero: string, marcados: number, seg: number) {
  const g = cv.getContext('2d')!;
  const W = cv.width, H = cv.height;
  g.fillStyle = '#f4f6f8';
  g.fillRect(0, 0, W, H);
  g.fillStyle = '#1b4d89';
  g.fillRect(0, 0, W, 44);
  texto(g, `OSCE · Estação ${numero}`, 16, 23, 22, '#ffffff', 'bold', 'left');
  const mm = String(Math.floor(seg / 60)).padStart(2, '0'), ss = String(Math.floor(seg % 60)).padStart(2, '0');
  texto(g, `${mm}:${ss}`, W - 16, 23, 24, '#ffd54f', 'bold', 'right');
  for (let i = 0; i < 9; i++) {
    const y = 66 + i * 28;
    g.fillStyle = i % 2 ? '#ffffff' : '#eef2f5';
    g.fillRect(10, y - 13, W - 20, 26);
    g.strokeStyle = '#90a4ae';
    g.lineWidth = 2;
    g.strokeRect(20, y - 8, 16, 16);
    if (i < marcados) {
      g.fillStyle = '#2e7d32';
      g.fillRect(22, y - 6, 12, 12);
    }
    g.fillStyle = '#9fb0bb';
    g.fillRect(48, y - 3, 180 + ((i * 53) % 160), 6);
  }
  g.fillStyle = '#cfd8dc';
  g.fillRect(16, H - 18, W - 32, 8);
  g.fillStyle = '#43a047';
  g.fillRect(16, H - 18, ((W - 32) * Math.min(9, marcados)) / 9, 8);
}
