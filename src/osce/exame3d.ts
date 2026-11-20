/* Pontos do corpo (âncoras) e instrumentos usados nas animações de exame. */
import * as THREE from 'three';
import type { Regiao } from './maneuvers';

export type Ferramenta = 'mao' | 'esteto' | 'martelo' | 'diapasao' | 'lanterna' | 'manguito' | 'abaixador' | 'olhar';
type Grupo = 'torso' | 'head' | 'armR' | 'armL' | 'hipR' | 'kneeR' | 'frame';

/** Coordenadas locais no grupo do corpo (paciente em pé, +z = frente, −x = lado direito do paciente). */
export const ANCORAS: Record<string, { g: Grupo; p: [number, number, number]; n: [number, number, number] }> = {
  umbigo: { g: 'torso', p: [0, 0.12, 0.105], n: [0, 0, 1] },
  epigastrio: { g: 'torso', p: [0, 0.24, 0.105], n: [0, 0, 1] },
  'hipocondrio-d': { g: 'torso', p: [-0.12, 0.23, 0.105], n: [0, 0, 1] },
  'hipocondrio-e': { g: 'torso', p: [0.12, 0.23, 0.105], n: [0, 0, 1] },
  fid: { g: 'torso', p: [-0.11, 0.02, 0.105], n: [0, 0, 1] },
  fie: { g: 'torso', p: [0.11, 0.02, 0.105], n: [0, 0, 1] },
  hipogastrio: { g: 'torso', p: [0, -0.02, 0.105], n: [0, 0, 1] },
  torax: { g: 'torso', p: [0, 0.4, 0.115], n: [0, 0, 1] },
  aortico: { g: 'torso', p: [-0.06, 0.5, 0.115], n: [0, 0, 1] },
  pulmonar: { g: 'torso', p: [0.06, 0.5, 0.115], n: [0, 0, 1] },
  tricuspide: { g: 'torso', p: [0.03, 0.36, 0.115], n: [0, 0, 1] },
  mitral: { g: 'torso', p: [0.11, 0.33, 0.115], n: [0, 0, 1] },
  erb: { g: 'torso', p: [0.04, 0.44, 0.115], n: [0, 0, 1] },
  'axila-e': { g: 'torso', p: [0.205, 0.38, 0.0], n: [1, 0, 0] },
  'dorso-sd': { g: 'torso', p: [-0.09, 0.44, -0.115], n: [0, 0, -1] },
  'dorso-se': { g: 'torso', p: [0.09, 0.44, -0.115], n: [0, 0, -1] },
  'dorso-md': { g: 'torso', p: [-0.09, 0.32, -0.115], n: [0, 0, -1] },
  'dorso-me': { g: 'torso', p: [0.09, 0.32, -0.115], n: [0, 0, -1] },
  'dorso-id': { g: 'torso', p: [-0.09, 0.2, -0.105], n: [0, 0, -1] },
  'dorso-ie': { g: 'torso', p: [0.09, 0.2, -0.105], n: [0, 0, -1] },
  'torax-sd': { g: 'torso', p: [-0.09, 0.46, 0.115], n: [0, 0, 1] },
  'torax-se': { g: 'torso', p: [0.09, 0.46, 0.115], n: [0, 0, 1] },
  dorso: { g: 'torso', p: [-0.05, 0.32, -0.115], n: [0, 0, -1] },
  lombar: { g: 'torso', p: [-0.1, 0.15, -0.105], n: [0, 0, -1] },
  pescoco: { g: 'head', p: [0, 0.03, 0.065], n: [0, 0, 1] },
  carotida: { g: 'head', p: [-0.055, 0.04, 0.06], n: [-0.4, 0, 1] },
  face: { g: 'head', p: [0, 0.2, 0.135], n: [0, 0, 1] },
  olhos: { g: 'head', p: [0, 0.23, 0.135], n: [0, 0, 1] },
  boca: { g: 'head', p: [0, 0.14, 0.135], n: [0, 0, 1] },
  orelha: { g: 'head', p: [-0.145, 0.21, 0], n: [-1, 0, 0] },
  'braco-d': { g: 'armR', p: [0, -0.18, 0.07], n: [0, 0, 1] },
  'punho-d': { g: 'armR', p: [0, -0.5, 0.065], n: [0, 0, 1] },
  'mao-d': { g: 'armR', p: [0, -0.56, 0.06], n: [0, 0, 1] },
  'coxa-d': { g: 'hipR', p: [0, -0.2, 0.09], n: [0, 0, 1] },
  'joelho-d': { g: 'kneeR', p: [0, 0.01, 0.085], n: [0, 0, 1] },
  'canela-d': { g: 'kneeR', p: [0, -0.2, 0.08], n: [0, 0, 1] },
  'tornozelo-d': { g: 'kneeR', p: [0, -0.37, -0.08], n: [0, 0, -1] },
  'planta-d': { g: 'kneeR', p: [0, -0.47, 0.06], n: [0, -1, 0] },
};

export type Estilo = 'apoiar' | 'percutir' | 'palpar' | 'descomprimir' | 'martelar' | 'vibrar' | 'varrer';

/** Manobras que percorrem vários pontos, na ordem do exame. */
const ROTEIROS: [RegExp, string[]][] = [
  [/^cv-focos/, ['aortico', 'pulmonar', 'erb', 'tricuspide', 'mitral']],
  [/^cv-mitral/, ['mitral', 'axila-e']],
  [/^cv-ao$/, ['aortico', 'carotida']],
  [/^(resp-(ausc|perc|ftv|resson)|dt-(ausc-pulm|perc|ftv)|ur-ausc-pulm)/, ['dorso-sd', 'dorso-se', 'dorso-md', 'dorso-me', 'dorso-id', 'dorso-ie']],
  [/^(resp-expans|dt-expans)/, ['dorso-id', 'dorso-ie']],
  [/^(abd-(ausc|perc|palp-sup|palp-prof)|aa-(ausc|perc|palp))/, ['hipocondrio-d', 'hipocondrio-e', 'fie', 'fid']],
  [/^cp-linfonodos/, ['orelha', 'carotida', 'pescoco']],
];

/** Como o instrumento se mexe. */
export function estiloDe(id: string, f: Ferramenta): Estilo {
  if (f === 'martelo') return 'martelar';
  if (f === 'diapasao') return 'vibrar';
  if (f === 'lanterna') return 'varrer';
  if (f !== 'mao') return 'apoiar';
  if (/blumberg/.test(id)) return 'descomprimir';
  if (/perc|giordano|traube|hepatimetria|jobert|torres|piparote|macicez|skoda/.test(id)) return 'percutir';
  return 'palpar';
}

export function roteiro(id: string): string[] | null {
  for (const [rx, r] of ROTEIROS) if (rx.test(id)) return r;
  return null;
}

/** Onde e com que instrumento cada manobra é feita (o restante cai na região). */
const MAPA: [RegExp, string | null, Ferramenta][] = [
  [/^abd-murphy|^abd-(hepatimetria|jobert|torres|lemos|mathieu)|^aa-jobert/, 'hipocondrio-d', 'mao'],
  [/^abd-(traube|perc-espl|baco|schuster)/, 'hipocondrio-e', 'mao'],
  [/^abd-(mcburney|blumberg)|^aa-blumberg/, 'fid', 'mao'],
  [/^abd-rovsing/, 'fie', 'mao'],
  [/^abd-ausc|^aa-ausc/, 'umbigo', 'esteto'],
  [/^abd-(psoas|obturador)/, 'coxa-d', 'mao'],
  [/giordano/, 'lombar', 'mao'],
  [/^ur-globo/, 'hipogastrio', 'mao'],
  [/^(abd|aa)-insp|^pele-|^neu-insp/, null, 'olhar'],
  [/^cv-(focos|ao|frente)/, 'aortico', 'esteto'],
  [/^cv-pulm/, 'pulmonar', 'esteto'],
  [/^cv-(tric|rivero)/, 'tricuspide', 'esteto'],
  [/^cv-(mitral|pachon|handgrip)|^ur-ausc-card|^dt-ausc-precordio/, 'mitral', 'esteto'],
  [/^cv-ictus/, 'mitral', 'mao'],
  [/^cv-fremito/, 'aortico', 'mao'],
  [/^cv-paraesternal/, 'tricuspide', 'mao'],
  [/^cv-epigastrio/, 'epigastrio', 'mao'],
  [/^cv-carotida/, 'carotida', 'mao'],
  [/jugular/, 'pescoco', 'olhar'],
  [/^cv-(radial|quincke)|^pa-(radial|palpatoria)|^dt-pulsos|^resp-fr/, 'punho-d', 'mao'],
  [/^resp-(ausc|resson|egofonia|tosse)|^dt-ausc-pulm|^ur-ausc-pulm/, 'dorso', 'esteto'],
  [/^resp-(expans|ftv|perc)|^dt-(expans|ftv|perc)/, 'dorso', 'mao'],
  [/^resp-insp|^ur-resp/, 'torax', 'olhar'],
  [/^resp-louis/, 'aortico', 'mao'],
  [/^neu-(bicipital|tricipital|estilo)/, 'braco-d', 'martelo'],
  [/^neu-patelar/, 'joelho-d', 'martelo'],
  [/^neu-aquileu/, 'tornozelo-d', 'martelo'],
  [/^neu-plantar/, 'planta-d', 'martelo'],
  [/^neu-vibra/, 'planta-d', 'diapasao'],
  [/^neu-(dor|temp|proprio)/, 'canela-d', 'mao'],
  [/^neu-(pupilas|oculo)|^cp-(pupilas|moe)/, 'olhos', 'lanterna'],
  [/^cp-palpebras/, 'olhos', 'olhar'],
  [/^neu-(vii|glasgow|linguagem|cognicao)/, 'face', 'olhar'],
  [/^neu-(ix-x|xii)|^cp-orofaringe/, 'boca', 'abaixador'],
  [/^neu-(nuca|brudzinski)/, 'pescoco', 'mao'],
  [/^neu-(kernig|lasegue|mingazzini|calc-joelho)/, 'coxa-d', 'mao'],
  [/^neu-(forca|barre|tonus|ativacao|index|diado|bradi|tremor|praxia|fasc|asterixis|cortical|hoffmann)|^ur-asterixis/, 'mao-d', 'mao'],
  [/^neu-(marcha|calcanhares|romberg|pull)|^cp-(romberg|marcha)/, null, 'olhar'],
  [/^cp-(linfonodos|tireoide)/, 'pescoco', 'mao'],
  [/^cp-ausc-pescoco/, 'carotida', 'esteto'],
  [/^cp-(otoscopia|weber|rinne)/, 'orelha', 'diapasao'],
  [/^pa-(braco|circunferencia|manguito|outro-braco)/, 'braco-d', 'manguito'],
  [/^pa-(esteto|insuflar|ausculta|ortostatica)/, 'braco-d', 'esteto'],
  [/^pa-panturrilha|^ur-(edema|panturrilha)/, 'canela-d', 'mao'],
  [/^ur-(hidratacao)/, 'boca', 'olhar'],
  [/^ur-jugulares|^dt-traqueia/, 'pescoco', 'olhar'],
  [/^ur-macicez|^abd-(perc|palp|smith|piparote|macicez|skoda)|^aa-(perc|palp)/, 'umbigo', 'mao'],
];

const PADRAO: Record<Regiao, string | null> = {
  cabeca: 'face', torax: 'torax', dorso: 'dorso', abdome: 'umbigo', mmss: 'punho-d', mmii: 'joelho-d', geral: null,
};

export function ondeExaminar(id: string, regiao: Regiao): { ancora: string | null; ferramenta: Ferramenta } {
  for (const [rx, a, f] of MAPA) if (rx.test(id)) return { ancora: a, ferramenta: f };
  return { ancora: PADRAO[regiao], ferramenta: regiao === 'geral' ? 'olhar' : 'mao' };
}

/* ---------- Instrumentos em blocos ---------- */
const mat = (c: number, emissive = 0) => new THREE.MeshLambertMaterial({ color: c, emissive });
const bx = (w: number, h: number, d: number, m: THREE.Material, x = 0, y = 0, z = 0) => {
  const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  o.position.set(x, y, z);
  return o;
};

/** Instrumento com a ponta na origem, apontando para −z (é orientado para a superfície do corpo). */
export function ferramenta3d(f: Ferramenta): THREE.Group {
  const g = new THREE.Group();
  g.scale.setScalar(1.25);
  switch (f) {
    case 'mao':
      g.add(bx(0.09, 0.03, 0.11, mat(0xe0ac69), 0, 0, 0.03));
      g.add(bx(0.09, 0.025, 0.05, mat(0xe0ac69), 0, 0, 0.1));
      break;
    case 'esteto': {
      const disco = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.018, 12), mat(0xb8c4cc));
      disco.rotation.x = Math.PI / 2;
      disco.position.z = 0.01;
      g.add(disco);
      g.add(bx(0.012, 0.012, 0.22, mat(0x222222), 0, 0, 0.13));
      g.add(bx(0.07, 0.025, 0.08, mat(0xe0ac69), 0, 0.02, 0.05));
      break;
    }
    case 'martelo':
      g.add(bx(0.07, 0.03, 0.03, mat(0xd64545), 0, 0, 0.02));
      g.add(bx(0.015, 0.015, 0.2, mat(0xb8c4cc), 0, 0, 0.13));
      break;
    case 'diapasao':
      g.add(bx(0.012, 0.012, 0.05, mat(0xc9d1d6), 0, 0, 0.03));
      g.add(bx(0.012, 0.012, 0.1, mat(0xc9d1d6), -0.018, 0, 0.11));
      g.add(bx(0.012, 0.012, 0.1, mat(0xc9d1d6), 0.018, 0, 0.11));
      g.add(bx(0.048, 0.012, 0.012, mat(0xc9d1d6), 0, 0, 0.06));
      break;
    case 'lanterna':
      g.add(bx(0.03, 0.03, 0.14, mat(0x333a40), 0, 0, 0.12));
      g.add(bx(0.034, 0.034, 0.02, mat(0xfff3a0, 0xfff3a0), 0, 0, 0.05));
      break;
    case 'abaixador':
      g.add(bx(0.03, 0.006, 0.2, mat(0xd8b98a), 0, 0, 0.08));
      break;
    case 'manguito':
      g.add(bx(0.17, 0.12, 0.03, mat(0x2f6f9f), 0, 0, 0.0));
      g.add(bx(0.01, 0.01, 0.25, mat(0x222222), 0.05, -0.05, 0.12));
      break;
    case 'olhar':
      break;
  }
  g.traverse(o => o instanceof THREE.Mesh && (o.castShadow = true));
  return g;
}

/** Anel que pulsa no ponto examinado. */
export function marcador(): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.008, 6, 20), new THREE.MeshBasicMaterial({ color: 0xffd23f, transparent: true, opacity: 0.9, depthTest: false }));
  m.renderOrder = 10;
  return m;
}
