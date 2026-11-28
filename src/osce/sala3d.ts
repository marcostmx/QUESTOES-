/* Achados desenhados no corpo do paciente, cortina de privacidade e monitor de sinais vitais. */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

class RoundedBoxGeometryMesh extends THREE.Mesh {
  constructor(w: number, h: number, d: number, r: number, m: THREE.Material) {
    super(new RoundedBoxGeometry(w, h, d, 3, r), m);
  }
}
import type { Achado3d, Vitais } from './visual';

interface Corpo {
  torso: THREE.Group; head: THREE.Group; chest: THREE.Mesh; kneeL: THREE.Group; kneeR: THREE.Group;
  boca: THREE.Mesh; olhos: THREE.Mesh[]; parts: Map<string, THREE.Mesh[]>;
}

const lb = (c: number) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.7 });
function placa(g: THREE.Object3D, w: number, h: number, d: number, c: number, x: number, y: number, z: number, rz = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lb(c));
  m.position.set(x, y, z);
  m.rotation.z = rz;
  g.add(m);
  return m;
}

/** Desenha os achados no boneco. Devolve o fator extra de profundidade do tórax (tórax em tonel). */
export function desenhaAchados(b: Corpo, achados: Achado3d[], pele: number, expor: { abdome: boolean; torax: boolean }): number {
  let toraxZ = 1;
  const abd = (b.parts.get('abdome') ?? []).find(m => m.parent === b.torso);
  const corPele = (c: number) => {
    for (const r of ['cabeca', 'mmss', 'mmii'] as const)
      for (const m of b.parts.get(r) ?? []) {
        const mat = m.material as THREE.MeshStandardMaterial;
        if (mat.color.getHex() === pele) mat.color.setHex(c);
      }
    return c;
  };
  let skin = pele;
  for (const a of achados) {
    if (a.tipo === 'ictericia') skin = corPele(0xd8c25a);
    if (a.tipo === 'palidez' && skin === pele) skin = corPele(0xf0d9c4);
  }
  if (expor.abdome && abd) (abd.material as THREE.MeshStandardMaterial).color.setHex(skin);
  if (expor.torax) (b.chest.material as THREE.MeshStandardMaterial).color.setHex(skin);
  const T = b.torso;
  const H = b.head;
  for (const a of achados) {
    switch (a.tipo) {
      case 'cullen':
        placa(T, 0.1, 0.08, 0.006, 0x6b3d7a, 0, 0.12, 0.103);
        placa(T, 0.02, 0.02, 0.008, 0x3a2030, 0, 0.12, 0.106);
        break;
      case 'grey-turner':
        placa(T, 0.006, 0.12, 0.12, 0x6b3d7a, a.lado === 'D' ? -0.182 : 0.182, 0.1, 0.0);
        break;
      case 'globoso':
        if (abd) {
          abd.scale.z = 1.55;
          abd.position.z = 0.05;
        }
        break;
      case 'colateral':
        for (const [x, y, r] of [[-0.08, 0.14, 0.3], [0.07, 0.16, -0.4], [0.0, 0.2, 0.1]]) placa(T, 0.006, 0.12, 0.004, 0x3f5f9f, x, y, 0.103, r);
        break;
      case 'hernia':
        placa(T, 0.07, 0.06, 0.04, skin, 0, 0.2, 0.115);
        break;
      case 'massa':
        placa(T, 0.11, 0.08, 0.03, skin, 0, 0.12, 0.11);
        break;
      case 'ptose': {
        const o = b.olhos[a.lado === 'D' ? 0 : 1];
        o.scale.y = 0.35;
        o.position.y -= 0.012;
        if (a.olhoFora) o.position.x += a.lado === 'D' ? -0.012 : 0.012;
        o.userData.base = o.scale.y;
        placa(H, 0.055, 0.03, 0.012, skin, o.position.x, 0.245, 0.132); // pálpebra caída
        break;
      }
      case 'facial':
        b.boca.rotation.z = a.lado === 'D' ? 0.32 : -0.32;
        b.boca.position.x = a.lado === 'D' ? 0.01 : -0.01;
        if (a.testa) b.olhos[a.lado === 'D' ? 0 : 1].scale.y = 1.35;
        break;
      case 'tonel':
        toraxZ = 1.4;
        break;
      case 'pectus':
        placa(T, 0.08, 0.12, 0.004, 0x9a7a5c, 0, 0.38, 0.112);
        break;
      case 'cianose':
        (b.boca.material as THREE.MeshStandardMaterial).color.setHex(0x4a5bbf);
        break;
      case 'acromica':
        placa(H, 0.07, 0.04, 0.004, 0xf6f1ea, 0.02, 0.085, 0.132);
        break;
      case 'petequias':
        for (const k of [b.kneeL, b.kneeR])
          for (let i = 0; i < 14; i++) placa(k, 0.01, 0.01, 0.004, 0xa0153e, ((i * 37) % 11) / 100 - 0.05, -0.05 - ((i * 53) % 29) / 100, 0.077);
        break;
      case 'vesiculas':
        for (let i = 0; i < 9; i++) placa(T, 0.014, 0.014, 0.008, i % 3 ? 0xf3d6d6 : 0xd65c5c, (a.lado === 'D' ? -1 : 1) * (0.1 + (i % 3) * 0.025), 0.37 + Math.floor(i / 3) * 0.025, 0.113);
        break;
      case 'pinta':
        placa(T, 0.03, 0.028, 0.004, 0x2b1a12, 0.05, 0.35, -0.112);
        placa(T, 0.014, 0.012, 0.005, 0x5a3a24, 0.06, 0.36, -0.113);
        break;
      case 'escara':
        placa(T, 0.08, 0.06, 0.004, 0x1c1410, 0, 0.03, -0.102);
        placa(T, 0.1, 0.08, 0.003, 0xb85a5a, 0, 0.03, -0.101);
        break;
      case 'xantelasma':
        placa(H, 0.04, 0.012, 0.004, 0xe8cf5a, -0.06, 0.262, 0.132);
        placa(H, 0.04, 0.012, 0.004, 0xe8cf5a, 0.06, 0.262, 0.132);
        break;
      case 'edema':
        for (const k of [b.kneeL, b.kneeR]) for (const m of k.children) if (m instanceof THREE.Mesh && m.position.y > -0.3) m.scale.set(1.3, 1, 1.3);
        break;
      case 'bocio':
        placa(H, 0.11, 0.06, 0.045, skin, 0, 0.035, 0.07);
        break;
      case 'linfonodo':
        placa(H, 0.035, 0.03, 0.03, skin, a.lado === 'D' ? -0.075 : 0.075, -0.0, 0.05);
        break;
    }
  }
  return toraxZ;
}

/* ---------- Cortina de privacidade ---------- */
export class Cortina {
  grupo = new THREE.Group();
  private paineis: THREE.Object3D[] = [];
  private alvo = 0; // 0 aberta, 1 fechada
  private estado = 0;
  private pontos: THREE.Vector2[];

  constructor(cx: number, cz: number) {
    const x0 = cx - 1.75, x1 = cx + 1.75, zf = cz - 0.95, zn = cz + 0.55;
    this.pontos = [new THREE.Vector2(x0, zn), new THREE.Vector2(x0, zf), new THREE.Vector2(x1, zf), new THREE.Vector2(x1, zn)];
    const trilho = new THREE.MeshStandardMaterial({ color: 0xd0d5d9, roughness: 0.35, metalness: 0.85 });
    const H = 2.0;
    for (let i = 0; i < 3; i++) {
      const a = this.pontos[i], b = this.pontos[i + 1];
      const len = a.distanceTo(b);
      const m = new THREE.Mesh(new THREE.BoxGeometry(len + 0.03, 0.035, 0.03), trilho);
      m.position.set((a.x + b.x) / 2, H + 0.02, (a.y + b.y) / 2);
      m.rotation.y = -Math.atan2(b.y - a.y, b.x - a.x);
      this.grupo.add(m);
    }
    // hastes de sustentação até o forro
    for (const p of [this.pontos[1], this.pontos[2], new THREE.Vector2((this.pontos[1].x + this.pontos[2].x) / 2, this.pontos[1].y), this.pontos[0], this.pontos[3]]) {
      const h = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.78, 8), trilho);
      h.position.set(p.x, H + 0.41, p.y);
      this.grupo.add(h);
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.012, 16), trilho);
      base.position.set(p.x, 2.79, p.y);
      this.grupo.add(base);
    }
    // tecido com pregas (ondas) e faixa de tela vazada no alto
    const tex = (() => {
      const c = document.createElement('canvas');
      c.width = c.height = 128;
      const g = c.getContext('2d')!;
      g.fillStyle = '#8fd1c4';
      g.fillRect(0, 0, 128, 128);
      for (let i = 0; i < 128; i += 4) {
        g.fillStyle = 'rgba(255,255,255,0.08)';
        g.fillRect(i, 0, 2, 128);
        g.fillStyle = 'rgba(0,60,50,0.06)';
        g.fillRect(0, i, 128, 2);
      }
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(2, 10);
      return t;
    })();
    const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.95, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false });
    const tela = new THREE.MeshStandardMaterial({ color: 0xf4f7f6, roughness: 0.9, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false });
    const argola = new THREE.MeshStandardMaterial({ color: 0xc9ced2, roughness: 0.3, metalness: 0.9 });
    const prega = (w: number, h: number) => {
      const geo = new THREE.PlaneGeometry(w, h, 16, 1);
      const pa = geo.attributes.position;
      for (let k = 0; k < pa.count; k++) pa.setZ(k, Math.sin((pa.getX(k) / w) * Math.PI * 4) * 0.03);
      geo.computeVertexNormals();
      return geo;
    };
    const geoT = prega(0.36, 1.42), geoM = prega(0.36, 0.22);
    for (let i = 0; i < 16; i++) {
      const p = new THREE.Group();
      const t = new THREE.Mesh(geoT, mat);
      t.position.y = -0.31 - 0.71;
      const m = new THREE.Mesh(geoM, tela);
      m.position.y = -0.2;
      const a = new THREE.Mesh(new THREE.TorusGeometry(0.018, 0.004, 6, 14), argola);
      a.position.y = -0.06;
      p.add(t, m, a);
      p.position.y = H;
      this.paineis.push(p);
      this.grupo.add(p);
    }
    this.posiciona(0);
  }

  private ponto(u: number) {
    const segs = [0, 1, 2].map(i => this.pontos[i].distanceTo(this.pontos[i + 1]));
    let d = u * segs.reduce((a, b) => a + b, 0);
    for (let i = 0; i < 3; i++) {
      if (d <= segs[i] || i === 2) {
        const a = this.pontos[i], b = this.pontos[i + 1];
        const k = Math.min(1, d / segs[i]);
        return { p: new THREE.Vector2(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k), ang: -Math.atan2(b.y - a.y, b.x - a.x) };
      }
      d -= segs[i];
    }
    return { p: this.pontos[3], ang: 0 };
  }

  private posiciona(e: number) {
    this.paineis.forEach((m, i) => {
      const fechado = i / (this.paineis.length - 1);
      const aberto = 1 - 0.012 * i; // recolhida no canto, longe do avaliador
      const { p, ang } = this.ponto(aberto + (fechado - aberto) * e);
      m.position.x = p.x;
      m.position.z = p.y;
      m.rotation.y = ang + (1 - e) * 0.9 * (i % 2 ? 1 : -1);
    });
  }

  fechar() { this.alvo = 1; }
  abrir() { this.alvo = 0; }
  get fechada() { return this.alvo === 1; }

  passo(dt: number) {
    if (Math.abs(this.estado - this.alvo) < 0.001) return;
    this.estado += (this.alvo - this.estado) * Math.min(1, dt * 3);
    this.posiciona(this.estado);
  }
}

/* ---------- Monitor multiparamétrico ---------- */
export class Monitor {
  grupo = new THREE.Group();
  private cv = document.createElement('canvas');
  private tex: THREE.CanvasTexture;
  private acc = 0;
  private fase = 0;
  private traco: number[] = [];

  constructor(private v: Vitais) {
    this.cv.width = 320;
    this.cv.height = 200;
    this.tex = new THREE.CanvasTexture(this.cv);
    this.tex.colorSpace = THREE.SRGBColorSpace;
    const pe = new THREE.MeshStandardMaterial({ color: 0xc9ced2, roughness: 0.3, metalness: 0.9 });
    const plast = new THREE.MeshStandardMaterial({ color: 0xe9ecee, roughness: 0.4 });
    const escuro = new THREE.MeshStandardMaterial({ color: 0x2a3138, roughness: 0.5 });
    const borr = new THREE.MeshStandardMaterial({ color: 0x16181a, roughness: 0.9 });
    const add = (m: THREE.Mesh, x: number, y: number, z: number) => {
      m.position.set(x, y, z);
      this.grupo.add(m);
      return m;
    };
    // pedestal com cinco rodízios
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const p = add(new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.025, 0.035), pe), Math.cos(a) * 0.13, 0.06, Math.sin(a) * 0.13);
      p.rotation.y = -a;
      const r = add(new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.02, 14), borr), Math.cos(a) * 0.26, 0.025, Math.sin(a) * 0.26);
      r.rotation.z = Math.PI / 2;
    }
    add(new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.2, 14), pe), 0, 0.66, 0);
    add(new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.1, 0.12), plast), 0, 0.9, 0.04); // cesto de cabos
    // monitor com moldura, alça e teclas
    add(new RoundedBoxGeometryMesh(0.64, 0.46, 0.1, 0.03, plast), 0, 1.45, 0);
    add(new RoundedBoxGeometryMesh(0.6, 0.38, 0.02, 0.01, escuro), 0, 1.46, 0.045);
    add(new RoundedBoxGeometryMesh(0.4, 0.04, 0.06, 0.02, plast), 0, 1.71, -0.01);
    for (let i = 0; i < 5; i++) add(new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.018, 0.01), escuro), -0.2 + i * 0.1, 1.24, 0.05);
    add(new THREE.Mesh(new THREE.SphereGeometry(0.008, 8, 6), new THREE.MeshBasicMaterial({ color: 0x55ff88 })), 0.27, 1.24, 0.05);
    const tela = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.35), new THREE.MeshBasicMaterial({ map: this.tex }));
    tela.position.set(0, 1.46, 0.057);
    this.grupo.add(tela);
    // cabos de ECG e oxímetro
    const cabo = (pts: [number, number, number][], cor: number) => {
      const t = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p))), 24, 0.004, 6), new THREE.MeshStandardMaterial({ color: cor, roughness: 0.5 }));
      this.grupo.add(t);
    };
    cabo([[0.25, 1.3, -0.04], [0.3, 1.0, -0.02], [0.12, 0.92, 0.06]], 0x3a4046);
    cabo([[0.28, 1.32, -0.04], [0.36, 1.05, 0.0], [0.05, 0.93, 0.08]], 0x1e88e5);
    this.grupo.traverse(o => o instanceof THREE.Mesh && (o.castShadow = o.receiveShadow = true));
    this.desenha();
  }

  /** troca os sinais exibidos (monitor ligado a um caso vivo) */
  atualizar(v: Vitais) {
    this.v = v;
  }

  passo(dt: number) {
    this.acc += dt;
    const fc = this.v.fc ?? 76;
    this.fase += dt * (fc / 60) * (this.v.ritmoIrregular ? 0.7 + Math.random() * 0.6 : 1);
    if (this.acc < 0.08) return;
    this.acc = 0;
    // ECG: complexo QRS a cada ciclo
    const f = this.fase % 1;
    const y = f < 0.04 ? -10 * Math.sin((f / 0.04) * Math.PI) : f < 0.08 ? 34 * Math.sin(((f - 0.04) / 0.04) * Math.PI) : f < 0.12 ? -12 * Math.sin(((f - 0.08) / 0.04) * Math.PI) : f > 0.3 && f < 0.42 ? 7 * Math.sin(((f - 0.3) / 0.12) * Math.PI) : 0;
    this.traco.push(y);
    if (this.traco.length > 60) this.traco.shift();
    this.desenha();
  }

  private desenha() {
    const g = this.cv.getContext('2d')!;
    const v = this.v;
    g.fillStyle = '#071014';
    g.fillRect(0, 0, 320, 200);
    g.strokeStyle = '#3ce07a';
    g.lineWidth = 2.5;
    g.beginPath();
    this.traco.forEach((y, i) => (i ? g.lineTo(10 + i * 3.4, 60 - y) : g.moveTo(10, 60 - y)));
    g.stroke();
    g.font = 'bold 30px monospace';
    g.fillStyle = '#3ce07a';
    g.fillText(`FC ${v.fc ?? '--'}`, 12, 132);
    g.fillStyle = '#4fc3f7';
    g.fillText(`SpO2 ${v.spo2 ?? '--'}`, 170, 132);
    g.fillStyle = '#ffffff';
    g.font = 'bold 26px monospace';
    g.fillText(`PA ${v.pa ?? '--/--'}`, 12, 178);
    g.fillStyle = '#ffd54f';
    g.font = 'bold 22px monospace';
    g.fillText(`FR ${v.fr ?? '--'}  T ${v.t ?? '--'}`, 170, 178);
    this.tex.needsUpdate = true;
  }
}
