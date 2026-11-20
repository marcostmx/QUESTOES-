/* Sala de OSCE detalhada em blocos. Tudo que é fixo é mesclado por material no fim
 * (poucas chamadas de desenho), para rodar leve no celular. */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export const SALA = { x0: -4.5, x1: 4.5, z0: -4.5, z1: 4, h: 2.8 };
export type Caixa = [number, number, number, number];

const cacheMat = new Map<number, THREE.MeshLambertMaterial>();
const mat = (c: number) => {
  let m = cacheMat.get(c);
  if (!m) {
    m = new THREE.MeshLambertMaterial({ color: c });
    cacheMat.set(c, m);
  }
  return m;
};

function textura(w: number, h: number, desenha: (g: CanvasRenderingContext2D) => void, nearest = false) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  desenha(c.getContext('2d')!);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  if (nearest) t.magFilter = THREE.NearestFilter;
  return t;
}

function placa(texto: string, w: number, h: number, bg: string, fg: string) {
  return new THREE.MeshBasicMaterial({
    map: textura(512, Math.round((512 * h) / w), g => {
      g.fillStyle = bg;
      g.fillRect(0, 0, 512, 512);
      g.fillStyle = fg;
      g.font = `bold ${Math.round((512 * h) / w * 0.5)}px system-ui, sans-serif`;
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText(texto, 256, Math.round((512 * h) / w) / 2 + 2);
    }),
  });
}

export interface SalaConstruida {
  pisos: THREE.Mesh[];
  pia: THREE.Group;
  porta: THREE.Mesh;
  obstaculos: Caixa[];
  /** grupos dinâmicos: relógio de parede (ponteiros) */
  ponteiros: { min: THREE.Object3D; hora: THREE.Object3D };
}

export function construirSala(cena: THREE.Scene, numero: string, pia: THREE.Vector3, maca: { x: number; z: number; top: number; len: number; wid: number }): SalaConstruida {
  const { x0, x1, z0, z1, h: H } = SALA;
  const est = new THREE.Group(); // estático → será mesclado
  const obst: Caixa[] = [];
  const b = (w: number, hh: number, d: number, c: number, x: number, y: number, z: number, pai: THREE.Object3D = est, ry = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, hh, d), mat(c));
    m.position.set(x, y, z);
    m.rotation.y = ry;
    pai.add(m);
    return m;
  };
  const cil = (r: number, hh: number, c: number, x: number, y: number, z: number, rx = 0, seg = 12, pai: THREE.Object3D = est) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, hh, seg), mat(c));
    m.position.set(x, y, z);
    m.rotation.x = rx;
    pai.add(m);
    return m;
  };

  /* ---------- piso, teto e paredes ---------- */
  const piso = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, 0.1, z1 - z0), new THREE.MeshLambertMaterial({
    map: textura(128, 128, g => {
      g.fillStyle = '#dcd8cf';
      g.fillRect(0, 0, 128, 128);
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
        g.fillStyle = (i + j) % 2 ? '#d5d0c5' : '#e2ded6';
        g.fillRect(i * 32 + 1, j * 32 + 1, 30, 30);
      }
    }, true),
  }));
  (piso.material as THREE.MeshLambertMaterial).map!.wrapS = (piso.material as THREE.MeshLambertMaterial).map!.wrapT = THREE.RepeatWrapping;
  (piso.material as THREE.MeshLambertMaterial).map!.repeat.set(4.5, 4.25);
  piso.position.set((x0 + x1) / 2, -0.05, (z0 + z1) / 2);
  piso.receiveShadow = true;
  cena.add(piso);

  const teto = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0), new THREE.MeshLambertMaterial({
    map: textura(64, 64, g => {
      g.fillStyle = '#f4f4f1';
      g.fillRect(0, 0, 64, 64);
      g.strokeStyle = '#c9c9c4';
      g.lineWidth = 2;
      g.strokeRect(0, 0, 64, 64);
      g.fillStyle = '#e6e6e1';
      for (let i = 0; i < 40; i++) g.fillRect((i * 37) % 60, (i * 23) % 60, 2, 2);
    }, true),
  }));
  (teto.material as THREE.MeshLambertMaterial).map!.wrapS = (teto.material as THREE.MeshLambertMaterial).map!.wrapT = THREE.RepeatWrapping;
  (teto.material as THREE.MeshLambertMaterial).map!.repeat.set(15, 14);
  teto.rotation.x = Math.PI / 2;
  teto.position.set((x0 + x1) / 2, H, (z0 + z1) / 2);
  cena.add(teto);
  // luminárias de LED
  const led = new THREE.MeshBasicMaterial({ color: 0xffffff });
  for (const [x, z] of [[-2, -2.2], [2, -2.2], [-2, 1.6], [2, 1.6]]) {
    const l = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.03, 0.6), led);
    l.position.set(x, H - 0.02, z);
    cena.add(l);
    b(1.28, 0.02, 0.68, 0xb8bcc0, x, H - 0.005, z);
  }

  const PAREDE = 0xf2efe8, LAMBRI = 0xdbe6ec, FAIXA = 0x5f9fc2, RODAPE = 0x7b8790;
  const parede = (comp: number, x: number, z: number, ry: number) => {
    b(comp, H, 0.2, PAREDE, x, H / 2, z, est, ry);
    const dz = 0.105;
    const ox = ry ? dz * (x > 0 ? -1 : 1) : 0;
    const oz = ry ? 0 : dz * (z > 0 ? -1 : 1);
    b(comp, 1.0, 0.02, LAMBRI, x + ox, 0.5, z + oz, est, ry);
    b(comp, 0.07, 0.03, FAIXA, x + ox, 1.02, z + oz, est, ry);
    b(comp, 0.1, 0.03, RODAPE, x + ox, 0.05, z + oz, est, ry);
  };
  parede(x1 - x0, 0, z0 - 0.1, 0);
  parede(z1 - z0, x0 - 0.1, (z0 + z1) / 2, Math.PI / 2);
  parede(z1 - z0, x1 + 0.1, (z0 + z1) / 2, Math.PI / 2);
  // parede da porta (com vão)
  const vao = 1.3;
  const lado = (x1 - x0 - vao) / 2;
  for (const s of [-1, 1]) parede(lado, s * (vao / 2 + lado / 2), z1 + 0.1, 0);
  b(vao, H - 2.2, 0.2, PAREDE, 0, 2.2 + (H - 2.2) / 2, z1 + 0.1);
  // batente e porta fechada (por dentro)
  b(0.08, 2.24, 0.24, 0xffffff, -vao / 2 - 0.04, 1.12, z1 + 0.1);
  b(0.08, 2.24, 0.24, 0xffffff, vao / 2 + 0.04, 1.12, z1 + 0.1);
  b(vao + 0.16, 0.08, 0.24, 0xffffff, 0, 2.24, z1 + 0.1);
  const porta = new THREE.Mesh(new THREE.BoxGeometry(vao, 2.2, 0.06), mat(0x9b6a43));
  porta.position.set(0, 1.1, z1 + 0.05);
  porta.userData.alvo = 'porta';
  cena.add(porta);
  b(0.32, 0.5, 0.01, 0xb7dff2, 0.25, 1.55, z1 + 0.015);
  b(0.05, 0.05, 0.16, 0xc9b26a, -0.5, 1.05, z1 - 0.04);
  b(0.16, 0.05, 0.05, 0xc9b26a, -0.44, 1.05, z1 - 0.11);
  const pl = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.3), placa(`ESTAÇÃO ${numero}`, 1.3, 0.3, '#1f2a44', '#ffffff'));
  pl.rotation.y = Math.PI;
  pl.position.set(0, 2.5, z1 - 0.01);
  cena.add(pl);
  // interruptor e álcool em gel junto à porta
  b(0.08, 0.12, 0.02, 0xffffff, 0.95, 1.2, z1 - 0.01);
  b(0.16, 0.26, 0.1, 0x3aa2d6, -1.1, 1.35, z1 - 0.06);
  b(0.1, 0.05, 0.06, 0xffffff, -1.1, 1.2, z1 - 0.12);

  // câmeras de gravação nos cantos (salas de OSCE são filmadas)
  for (const [x, z, ry] of [[x1 - 0.2, z1 - 0.2, -Math.PI * 0.75], [x0 + 0.2, z0 + 0.2, Math.PI * 0.25]]) {
    b(0.14, 0.1, 0.22, 0xeeeeee, x, H - 0.12, z, est, ry);
    b(0.08, 0.08, 0.06, 0x222222, x + Math.sin(ry) * 0.12, H - 0.13, z + Math.cos(ry) * 0.12, est, ry);
    const rec = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.02), new THREE.MeshBasicMaterial({ color: 0xff3b30 }));
    rec.position.set(x, H - 0.05, z);
    cena.add(rec);
  }
  // caixa de som e ar-condicionado
  cil(0.12, 0.02, 0xdddddd, 0, H - 0.01, 0.2, 0, 16);
  b(1.0, 0.3, 0.22, 0xf6f6f6, x1 - 0.12, 2.35, -2.6, est, Math.PI / 2);
  b(0.9, 0.04, 0.02, 0xc0c4c8, x1 - 0.24, 2.24, -2.6, est, Math.PI / 2);

  /* ---------- parede do fundo: pia, armário, materiais ---------- */
  const P = pia;
  const gp = new THREE.Group();
  gp.position.copy(P);
  b(1.0, 0.85, 0.55, 0xd9d4c7, 0, 0.425, 0, gp);
  b(0.7, 0.06, 0.42, 0xffffff, 0, 0.88, 0.02, gp);
  b(0.5, 0.04, 0.3, 0xe6eef2, 0, 0.86, 0.04, gp);
  b(0.05, 0.3, 0.05, 0xb8c4cc, 0, 1.05, -0.18, gp);
  b(0.05, 0.05, 0.2, 0xb8c4cc, 0, 1.19, -0.1, gp);
  b(0.12, 0.03, 0.05, 0xb8c4cc, 0.12, 1.02, -0.18, gp); // alavanca de cotovelo
  b(0.16, 0.26, 0.1, 0x3aa2d6, 0.38, 1.35, -0.22, gp); // sabonete
  b(0.5, 0.65, 0.03, 0xcfe6f0, 0, 1.6, -0.26, gp); // espelho
  b(0.54, 0.69, 0.02, 0x9aa5ad, 0, 1.6, -0.27, gp);
  b(0.32, 0.4, 0.14, 0xffffff, -0.62, 1.4, -0.2, gp); // papel-toalha
  b(0.2, 0.02, 0.1, 0x9aa5ad, -0.62, 1.19, -0.15, gp);
  const placaPia = new THREE.Mesh(new THREE.PlaneGeometry(0.66, 0.2), placa('LAVE AS MÃOS', 0.66, 0.2, '#2f7fb5', '#ffffff'));
  placaPia.position.set(0, 2.05, -0.25);
  gp.add(placaPia);
  cena.add(gp);
  obst.push([P.x - 0.5, P.x + 0.5, P.z - 0.3, P.z + 0.3]);
  // lixeiras ao lado da pia
  b(0.3, 0.5, 0.3, 0xf4f4f4, P.x + 0.75, 0.25, P.z + 0.05);
  b(0.3, 0.5, 0.3, 0xf2c12e, x1 - 0.28, 0.25, P.z + 0.05);
  b(0.2, 0.02, 0.2, 0xd9534f, x1 - 0.28, 0.51, P.z + 0.05);
  obst.push([P.x + 0.55, x1, P.z - 0.2, P.z + 0.3]);
  // caixa de perfurocortante
  b(0.28, 0.24, 0.18, 0xf9d71c, 2.65, 1.35, z0 + 0.1);
  b(0.2, 0.04, 0.06, 0xd32f2f, 2.65, 1.49, z0 + 0.12);
  // armário com gavetas, luvas e máscaras
  const ax = 1.55;
  b(1.1, 0.9, 0.5, 0xc9d1d8, ax, 0.45, z0 + 0.27);
  for (const y of [0.22, 0.47, 0.72]) {
    b(1.0, 0.2, 0.02, 0xb3bdc6, ax, y, z0 + 0.53);
    b(0.18, 0.03, 0.03, 0x6b7680, ax, y, z0 + 0.55);
  }
  b(1.12, 0.03, 0.52, 0xe8ecef, ax, 0.91, z0 + 0.27);
  b(0.24, 0.12, 0.13, 0x5b6fd6, ax - 0.35, 0.98, z0 + 0.22);
  b(0.24, 0.12, 0.13, 0x9b59b6, ax - 0.08, 0.98, z0 + 0.22);
  b(0.24, 0.12, 0.13, 0x4fc3f7, ax + 0.2, 0.98, z0 + 0.22);
  cil(0.04, 0.2, 0xffffff, ax + 0.43, 1.02, z0 + 0.25);
  obst.push([ax - 0.6, ax + 0.6, z0, z0 + 0.6]);
  // armário aéreo
  b(1.1, 0.6, 0.35, 0xe2e7eb, ax, 2.1, z0 + 0.18);
  b(0.01, 0.56, 0.02, 0x9aa5ad, ax, 2.1, z0 + 0.36);
  // conjunto de diagnóstico de parede (otoscópio/oftalmoscópio) e esfigmomanômetro
  b(0.5, 0.3, 0.06, 0x8f9aa3, 0.25, 1.5, z0 + 0.03);
  cil(0.025, 0.2, 0x222222, 0.13, 1.42, z0 + 0.09);
  cil(0.025, 0.2, 0x222222, 0.37, 1.42, z0 + 0.09);
  b(0.04, 0.06, 0.04, 0x333333, 0.13, 1.56, z0 + 0.09);
  b(0.04, 0.06, 0.04, 0x333333, 0.37, 1.56, z0 + 0.09);
  cil(0.13, 0.04, 0xffffff, -0.35, 1.5, z0 + 0.04, Math.PI / 2, 20);
  cil(0.135, 0.03, 0x37474f, -0.35, 1.5, z0 + 0.025, Math.PI / 2, 20);
  b(0.02, 0.4, 0.02, 0x222222, -0.35, 1.2, z0 + 0.05); // tubo
  // relógio de parede
  cil(0.22, 0.04, 0xffffff, -1.1, 2.3, z0 + 0.03, Math.PI / 2, 24);
  cil(0.23, 0.03, 0x37474f, -1.1, 2.3, z0 + 0.02, Math.PI / 2, 24);
  const relogio = new THREE.Group();
  relogio.position.set(-1.1, 2.3, z0 + 0.06);
  cena.add(relogio);
  const min = new THREE.Group();
  const hora = new THREE.Group();
  relogio.add(min, hora);
  const pm = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.16, 0.01), mat(0x222222));
  pm.position.y = 0.08;
  min.add(pm);
  const ph = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.1, 0.01), mat(0x222222));
  ph.position.y = 0.05;
  hora.add(ph);
  // negatoscópio com radiografia e pôster de anatomia
  b(0.95, 0.7, 0.06, 0xe8eef3, -2.6, 1.6, z0 + 0.03);
  const rx = new THREE.Mesh(new THREE.PlaneGeometry(0.82, 0.56), new THREE.MeshBasicMaterial({
    map: textura(160, 110, g => {
      g.fillStyle = '#0d1114';
      g.fillRect(0, 0, 160, 110);
      g.fillStyle = '#3d4a52';
      g.beginPath();
      g.ellipse(52, 58, 30, 42, 0, 0, Math.PI * 2);
      g.ellipse(108, 58, 30, 42, 0, 0, Math.PI * 2);
      g.fill();
      g.strokeStyle = '#c7d1d6';
      g.lineWidth = 3;
      for (let i = 0; i < 6; i++) {
        g.beginPath();
        g.arc(80, 20 + i * 14, 52, Math.PI * 1.08, Math.PI * 1.92);
        g.stroke();
      }
      g.fillStyle = '#d7dee2';
      g.fillRect(76, 8, 8, 96);
      g.beginPath();
      g.ellipse(88, 74, 20, 16, 0.3, 0, Math.PI * 2);
      g.fill();
    }),
  }));
  rx.position.set(-2.6, 1.6, z0 + 0.065);
  cena.add(rx);
  const poster = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 1.0), new THREE.MeshBasicMaterial({
    map: textura(150, 200, g => {
      g.fillStyle = '#fdfaf2';
      g.fillRect(0, 0, 150, 200);
      g.fillStyle = '#1b4d89';
      g.font = 'bold 12px sans-serif';
      g.textAlign = 'center';
      g.fillText('FOCOS DE AUSCULTA', 75, 16);
      g.fillStyle = '#f1c9a5';
      g.fillRect(40, 30, 70, 150);
      g.fillStyle = '#e57373';
      for (const [x, y, t] of [[62, 70, 'A'], [88, 70, 'P'], [84, 98, 'E'], [80, 122, 'T'], [100, 130, 'M']] as const) {
        g.beginPath();
        g.arc(x, y, 7, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = '#fff';
        g.font = 'bold 9px sans-serif';
        g.fillText(t, x, y + 3);
        g.fillStyle = '#e57373';
      }
    }),
  }));
  poster.position.set(-1.8, 1.5, z0 + 0.01);
  cena.add(poster);

  /* ---------- parede esquerda: avaliador ---------- */
  const mesa = new THREE.Group();
  mesa.position.set(-2.55, 0, -2.25);
  mesa.rotation.y = Math.PI / 2.4;
  b(1.3, 0.05, 0.72, 0xb98a5e, 0, 0.75, 0, mesa);
  for (const [x, z] of [[-0.6, -0.3], [0.6, -0.3], [-0.6, 0.3], [0.6, 0.3]]) b(0.05, 0.73, 0.05, 0x6d4a2f, x, 0.365, z, mesa);
  b(1.2, 0.35, 0.02, 0x9c7650, 0, 0.55, -0.34, mesa); // painel frontal
  b(0.36, 0.02, 0.25, 0x37474f, -0.25, 0.785, 0.05, mesa); // notebook
  const tela = b(0.36, 0.24, 0.015, 0x263238, -0.25, 0.9, -0.08, mesa);
  tela.rotation.x = -0.25;
  b(0.21, 0.01, 0.29, 0xffffff, 0.2, 0.78, 0.0, mesa); // checklist
  b(0.19, 0.012, 0.27, 0xf5f5f5, 0.22, 0.79, 0.02, mesa);
  cil(0.006, 0.14, 0x1e88e5, 0.36, 0.79, 0.02, Math.PI / 2, 6, mesa);
  cil(0.04, 0.1, 0xffffff, -0.5, 0.8, 0.2, 0, 10, mesa); // copo
  est.add(mesa);
  const plAval = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.12), placa('AVALIADOR', 0.42, 0.12, '#0f5c4d', '#ffffff'));
  plAval.position.set(0, 0.85, 0.32);
  plAval.rotation.x = -0.4;
  const plg = new THREE.Group();
  plg.position.copy(mesa.position);
  plg.rotation.y = mesa.rotation.y;
  plg.add(plAval);
  cena.add(plg);
  // cadeira do avaliador
  b(0.5, 0.06, 0.5, 0x445566, -3.3, 0.42, -2.6);
  b(0.5, 0.5, 0.06, 0x445566, -3.52, 0.7, -2.6, est, Math.PI / 2.4 + Math.PI / 2);
  cil(0.03, 0.38, 0x2f2f2f, -3.3, 0.2, -2.6);
  b(0.5, 0.03, 0.06, 0x2f2f2f, -3.3, 0.03, -2.6);
  b(0.06, 0.03, 0.5, 0x2f2f2f, -3.3, 0.03, -2.6);
  obst.push([-3.4, -1.9, -3.0, -1.5], [-3.6, -3.0, -2.9, -2.3]);
  // quadro branco
  b(0.04, 1.0, 1.8, 0xdfe3e6, x0 + 0.02, 1.65, 0.6);
  const quadro = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.9), new THREE.MeshBasicMaterial({
    map: textura(340, 180, g => {
      g.fillStyle = '#ffffff';
      g.fillRect(0, 0, 340, 180);
      g.fillStyle = '#1565c0';
      g.font = 'bold 26px sans-serif';
      g.fillText(`OSCE · Estação ${numero}`, 18, 40);
      g.fillStyle = '#c62828';
      g.font = '18px sans-serif';
      g.fillText('1 min leitura · 5 min execução', 18, 72);
      g.fillStyle = '#37474f';
      g.fillText('✓ Higienize as mãos', 18, 106);
      g.fillText('✓ Apresente-se e peça consentimento', 18, 132);
      g.fillText('✓ Examine pelo lado direito', 18, 158);
    }),
  }));
  quadro.rotation.y = Math.PI / 2;
  quadro.position.set(x0 + 0.05, 1.65, 0.6);
  cena.add(quadro);
  b(0.08, 0.03, 1.4, 0xb0bec5, x0 + 0.06, 1.13, 0.6);
  // cabideiro com jaleco
  b(0.04, 0.04, 0.6, 0x8a959e, x0 + 0.04, 1.8, 2.6);
  b(0.03, 0.7, 0.32, 0xfafafa, x0 + 0.08, 1.45, 2.5);

  /* ---------- parede direita: janela com persiana ---------- */
  b(0.06, 1.25, 2.3, 0xffffff, x1 - 0.02, 1.65, 0.7);
  b(0.04, 1.12, 2.15, 0xd7ecf6, x1 - 0.04, 1.65, 0.7);
  for (let i = 0; i < 12; i++) b(0.03, 0.06, 2.1, 0xeceff1, x1 - 0.08, 2.18 - i * 0.092, 0.7);
  b(0.12, 0.05, 2.25, 0xb0bec5, x1 - 0.08, 2.28, 0.7);
  b(0.08, 0.06, 2.3, 0xffffff, x1 - 0.06, 1.0, 0.7); // peitoril

  /* ---------- em volta da maca ---------- */
  const M = maca;
  const gm = new THREE.Group();
  gm.position.set(M.x, 0, M.z);
  b(M.len - 0.1, 0.06, M.wid - 0.2, 0x37474f, 0, 0.28, 0, gm); // chassi
  b(M.len, 0.1, M.wid, 0x2f4858, 0, M.top - 0.12, 0, gm);
  b(M.len - 0.04, 0.09, M.wid - 0.04, 0xf2f2f2, 0, M.top - 0.03, 0, gm); // colchão
  b(0.42, 0.1, M.wid - 0.15, 0xffffff, -M.len / 2 + 0.28, M.top + 0.05, 0, gm); // travesseiro
  b(0.45, 0.04, M.wid - 0.06, 0x9fc5e8, M.len / 2 - 0.3, M.top + 0.02, 0, gm); // lençol dobrado
  cil(0.06, M.wid - 0.1, 0xfafafa, -M.len / 2 + 0.03, M.top + 0.02, 0, Math.PI / 2, 12, gm); // rolo de papel
  for (const sz of [-1, 1]) b(M.len * 0.45, 0.04, 0.03, 0xb0bec5, 0.25, M.top + 0.1, sz * (M.wid / 2 + 0.02), gm); // grades
  for (const [x, z] of [[-0.9, -0.3], [0.9, -0.3], [-0.9, 0.3], [0.9, 0.3]]) {
    b(0.06, M.top - 0.22, 0.06, 0x9aa5ad, x, (M.top - 0.22) / 2 + 0.06, z, gm);
    b(0.1, 0.1, 0.06, 0x212121, x, 0.05, z, gm); // rodízios
  }
  est.add(gm);
  obst.push([M.x - M.len / 2, M.x + M.len / 2, M.z - M.wid / 2, M.z + M.wid / 2]);
  // escadinha de dois degraus
  b(0.45, 0.2, 0.3, 0x8f9aa3, M.x + 1.35, 0.1, M.z + 0.55);
  b(0.45, 0.2, 0.15, 0x8f9aa3, M.x + 1.35, 0.3, M.z + 0.47);
  b(0.44, 0.015, 0.29, 0x263238, M.x + 1.35, 0.205, M.z + 0.55);
  obst.push([M.x + 1.1, M.x + 1.6, M.z + 0.35, M.z + 0.75]);
  // suporte de soro
  cil(0.015, 1.9, 0xb0bec5, M.x - 1.25, 0.95, M.z - 0.95);
  b(0.3, 0.02, 0.02, 0xb0bec5, M.x - 1.25, 1.88, M.z - 0.95);
  b(0.4, 0.03, 0.4, 0x546e7a, M.x - 1.25, 0.03, M.z - 0.95);
  b(0.1, 0.16, 0.04, 0xe3f2fd, M.x - 1.15, 1.75, M.z - 0.95);
  obst.push([M.x - 1.45, M.x - 1.05, M.z - 1.15, M.z - 0.75]);
  // carrinho de instrumentos
  const cx = 2.4, cz = 1.2;
  b(0.7, 0.03, 0.45, 0xb0bec5, cx, 0.85, cz);
  b(0.7, 0.03, 0.45, 0xb0bec5, cx, 0.4, cz);
  for (const [x, z] of [[-0.33, -0.2], [0.33, -0.2], [-0.33, 0.2], [0.33, 0.2]]) b(0.025, 0.85, 0.025, 0x90a4ae, cx + x, 0.43, cz + z);
  b(0.6, 0.02, 0.36, 0xeceff1, cx, 0.87, cz); // bandeja
  cil(0.035, 0.012, 0x90a4ae, cx - 0.2, 0.885, cz - 0.08, 0, 14); // diafragma do estetoscópio
  b(0.015, 0.012, 0.3, 0x212121, cx - 0.1, 0.885, cz - 0.05, est, 0.6);
  b(0.04, 0.02, 0.16, 0xd32f2f, cx + 0.05, 0.885, cz + 0.08); // martelo
  b(0.012, 0.012, 0.14, 0x9e9e9e, cx + 0.05, 0.885, cz + 0.17);
  b(0.012, 0.012, 0.12, 0xcfd8dc, cx + 0.2, 0.885, cz - 0.1); // diapasão
  b(0.012, 0.012, 0.12, 0xcfd8dc, cx + 0.23, 0.885, cz - 0.1);
  cil(0.015, 0.12, 0x37474f, cx + 0.22, 0.885, cz + 0.08, Math.PI / 2); // lanterna
  b(0.12, 0.03, 0.08, 0xd7b98a, cx - 0.22, 0.89, cz + 0.12); // abaixadores
  b(0.22, 0.06, 0.14, 0x1565c0, cx, 0.45, cz); // manguito guardado
  b(0.1, 0.1, 0.1, 0x212121, cx - 0.3, 0.05, cz - 0.18);
  b(0.1, 0.1, 0.1, 0x212121, cx + 0.3, 0.05, cz + 0.18);
  obst.push([cx - 0.45, cx + 0.45, cz - 0.3, cz + 0.3]);

  est.traverse(o => {
    if (o instanceof THREE.Mesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  cena.add(mesclar(est));
  return { pisos: [piso], pia: gp, porta, obstaculos: obst, ponteiros: { min, hora } };
}

/** Junta a geometria estática por material (uma malha por cor). */
function mesclar(g: THREE.Group): THREE.Group {
  g.updateMatrixWorld(true);
  const porMat = new Map<THREE.Material, THREE.BufferGeometry[]>();
  g.traverse(o => {
    if (!(o instanceof THREE.Mesh)) return;
    let geo = o.geometry.clone().applyMatrix4(o.matrixWorld);
    if (geo.index) geo = geo.toNonIndexed();
    const lista = porMat.get(o.material as THREE.Material) ?? [];
    lista.push(geo);
    porMat.set(o.material as THREE.Material, lista);
  });
  const out = new THREE.Group();
  for (const [m, geos] of porMat) {
    const merged = mergeGeometries(geos, false);
    if (!merged) continue;
    const mesh = new THREE.Mesh(merged, m);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    out.add(mesh);
    geos.forEach(x => x.dispose());
  }
  return out;
}
