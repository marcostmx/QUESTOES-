/* Achados visíveis no corpo do paciente e sinais vitais do monitor, deduzidos do texto da estação. */
import type { Estacao } from './engine';

export type Lado = 'D' | 'E';
export type Achado3d =
  | { tipo: 'cullen' } | { tipo: 'grey-turner'; lado: Lado } | { tipo: 'globoso' } | { tipo: 'colateral' }
  | { tipo: 'hernia' } | { tipo: 'massa' } | { tipo: 'ptose'; lado: Lado; olhoFora: boolean } | { tipo: 'facial'; lado: Lado; testa: boolean }
  | { tipo: 'tonel' } | { tipo: 'pectus' } | { tipo: 'ictericia' } | { tipo: 'palidez' } | { tipo: 'cianose' }
  | { tipo: 'acromica' } | { tipo: 'petequias' } | { tipo: 'vesiculas'; lado: Lado } | { tipo: 'pinta' } | { tipo: 'escara' }
  | { tipo: 'xantelasma' } | { tipo: 'edema' } | { tipo: 'bocio' } | { tipo: 'linfonodo'; lado: Lado };

const NEG = /\b(sem|nega|n[ãa]o|aus[êe]ncia|ausente|aus[êe]ncias|nenhum)\b/i;

function clausulas(e: Estacao): string[] {
  const t = [e.caso, e.achados, ...e.comandos.map(c => c.achado ?? '')].join('. ');
  return t.split(/[.;•]\s*|,\s+(?=sem\b|nega\b)/).map(s => s.trim()).filter(Boolean);
}

const lado = (s: string, padrao: Lado = 'D'): Lado => {
  const d = s.search(/direit|\bD\b/);
  const e = s.search(/esquerd|\bE\b/);
  if (d < 0 && e < 0) return padrao;
  if (d < 0) return 'E';
  if (e < 0) return 'D';
  return d <= e ? 'D' : 'E';
};

/** Lista os achados que dá para ver no boneco (só os afirmados, nunca os negados). */
export function achadosVisuais(e: Estacao): Achado3d[] {
  const cs = clausulas(e);
  // negação só vale no mesmo trecho (até a vírgula anterior) e antes da palavra-chave
  const negado = (c: string, i: number) => {
    // a negação vale até um verbo afirmativo (ex.: "sem dor..., apresenta equimoses" → não está negado)
    const antes = c.slice(Math.max(0, i - 80), i);
    const partes = antes.split(/\b(?<!n[ãa]o )(?:apresenta|h[áa]|observa(?:m|-se)?|refere|tem|notou|percebeu|com)\b/i);
    return NEG.test(partes[partes.length - 1]);
  };
  const acha = (rx: RegExp) => cs.find(c => {
    const i = c.search(rx);
    return i >= 0 && !negado(c, i);
  });
  const out: Achado3d[] = [];
  if (acha(/equimose periumbilical|Cullen|equimoses? ao redor do umbigo/i)) out.push({ tipo: 'cullen' });
  const gt = acha(/equimoses?[^.;]*flanco|Grey-Turner/i);
  if (gt) out.push({ tipo: 'grey-turner', lado: lado(gt, 'E') });
  if (acha(/abdome (é )?globoso|flancos (est[ãa]o )?abaulados|distens[ãa]o abdominal (importante|acentuada)|abdome (muito )?distendido/i)) out.push({ tipo: 'globoso' });
  if (acha(/circula[çc][ãa]o colateral|veias superficiais abdominais/i)) out.push({ tipo: 'colateral' });
  if (acha(/abaulamento (supraumbilical|na linha m[ée]dia|em regi[ãa]o anterior|intermitente)|h[ée]rnia/i)) out.push({ tipo: 'hernia' });
  if (acha(/massa (em|no) mesog[áa]strio|abaulamento localizado/i)) out.push({ tipo: 'massa' });
  const pt = acha(/ptose/i);
  if (pt) out.push({ tipo: 'ptose', lado: lado(pt), olhoFora: /para baixo e para fora|III par/i.test(cs.join(' ')) });
  const fa = acha(/paralisia facial|desvio da comissura|metade inferior da face|toda (a )?hemiface|assimetria da (metade inferior da )?face/i);
  if (fa) out.push({ tipo: 'facial', lado: /desvio da comissura (labial )?para a (E|esquerda)/i.test(fa) ? 'D' : /desvio da comissura (labial )?para a (D|direita)/i.test(fa) ? 'E' : lado(fa), testa: /toda (a )?hemiface|perif[ée]rica/i.test(fa) });
  if (acha(/t[óo]rax em (tonel|barril)/i)) out.push({ tipo: 'tonel' });
  if (acha(/depress[ãa]o esternal|pectus excavatum/i)) out.push({ tipo: 'pectus' });
  if (acha(/ict[ée]ric|icter[íi]cia (presente|progressiva|\d)|amarelo-palha/i)) out.push({ tipo: 'ictericia' });
  if (acha(/mucosas descoradas|palidez cut|p[áa]lid[oa]/i)) out.push({ tipo: 'palidez' });
  if (acha(/cianose (central|perif|de extremidades|labial)|cian[óo]tic/i)) out.push({ tipo: 'cianose' });
  if (acha(/mancha (branca|acr[ôo]mica)/i)) out.push({ tipo: 'acromica' });
  if (acha(/pet[ée]quias|lesões puntiformes vermelh/i)) out.push({ tipo: 'petequias' });
  const ve = acha(/ves[íi]culas|bolhas agrupadas/i);
  if (ve) out.push({ tipo: 'vesiculas', lado: lado(ve) });
  if (acha(/les[ãa]o pigmentada|pinta.*(cresceu|escura)/i)) out.push({ tipo: 'pinta' });
  if (acha(/escara|ferida escura.*sacral|regi[ãa]o sacral/i)) out.push({ tipo: 'escara' });
  if (acha(/xantelasma/i)) out.push({ tipo: 'xantelasma' });
  if (acha(/edema (mole|duro|[0-9]\+|de membros|bilateral|em MMII|frio)|godet [0-9]/i)) out.push({ tipo: 'edema' });
  if (acha(/b[óo]cio|volume na frente do pesco|tireoide aumentada/i)) out.push({ tipo: 'bocio' });
  const li = acha(/linfonodo(megalia)? (supraclavicular|cervical|aumentado|de \d)/i);
  if (li) out.push({ tipo: 'linfonodo', lado: lado(li, 'E') });
  return out;
}

export interface Vitais { pa?: string; fc?: number; fr?: number; spo2?: number; t?: string; ritmoIrregular?: boolean }

/** Sinais vitais para o monitor (só os que aparecem no caso). */
export function vitais(e: Estacao): Vitais {
  const t = `${e.vitais ?? ''} ${e.caso}`;
  const n = (rx: RegExp) => { const m = t.match(rx); return m ? Number(m[1]) : undefined; };
  const pa = t.match(/(?:PA|press[ãa]o arterial(?: de)?)\s*(\d{2,3}\s*[/×x]\s*\d{2,3})/i)?.[1]?.replace(/\s*[×x]\s*/, '/').replace(/\s/g, '');
  const temp = t.match(/(?:T|temperatura(?: de)?)\s*(\d{2}[,.]\d)\s*°?C/i)?.[1];
  return {
    pa,
    fc: n(/(?:FC|frequ[êe]ncia card[íi]aca(?: de)?)\s*(\d{2,3})/i),
    fr: n(/(?:FR|frequ[êe]ncia respirat[óo]ria(?: de)?)\s*(\d{1,2})/i) ?? (e.paciente.fr !== 16 ? e.paciente.fr : undefined),
    spo2: n(/SpO[₂2]\s*(\d{2,3})/i),
    t: temp,
    ritmoIrregular: /irregular|fibrila[çc][ãa]o atrial|\bFA\b/i.test(t),
  };
}
