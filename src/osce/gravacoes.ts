/* Gravações reais de ausculta (Wikimedia Commons, licenças livres). Recortadas e convertidas para MP3 —
 * as versões derivadas seguem a mesma licença CC BY-SA do original. */
import type { Som } from './ausculta';

export interface Gravacao { id: string; arquivo: string; descricao: string; autor: string; licenca: string; licencaUrl: string; fonte: string }

export const GRAVACOES: Record<string, Gravacao> = {
  normal: {
    id: 'normal', arquivo: 'sons/bulhas-normais.mp3', descricao: 'Bulhas normais (estetoscópio Littmann 3200)',
    autor: 'James Heilman, MD', licenca: 'CC BY-SA 3.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/3.0', fonte: 'https://commons.wikimedia.org/wiki/File:Heartsounds.ogg',
  },
  holossistolico: {
    id: 'holossistolico', arquivo: 'sons/sopro-holossistolico.mp3', descricao: 'Sopro holossistólico (comunicação interventricular, área mitral) — ilustrativo',
    autor: 'Emmadon3', licenca: 'CC BY-SA 4.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/4.0', fonte: 'https://commons.wikimedia.org/wiki/File:Ventricular_Septal_Defect.wav',
  },
  'crepitacoes-pneumonia': {
    id: 'crepitacoes-pneumonia', arquivo: 'sons/crepitacoes-pneumonia.mp3', descricao: 'Crepitações em pneumonia',
    autor: 'James Heilman, MD', licenca: 'CC BY-SA 3.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/3.0', fonte: 'https://commons.wikimedia.org/wiki/File:Crackles_pneumoniaO.ogg',
  },
  'crepitacoes-finas': {
    id: 'crepitacoes-finas', arquivo: 'sons/crepitacoes-finas.mp3', descricao: 'Estertores finos em “velcro” (fibrose pulmonar)',
    autor: 'IPFeditor', licenca: 'CC BY-SA 3.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/3.0', fonte: 'https://commons.wikimedia.org/wiki/File:IPF_Lung_Sound.ogg',
  },
  sibilos: {
    id: 'sibilos', arquivo: 'sons/sibilos.mp3', descricao: 'Sibilos',
    autor: 'James Heilman, MD; derivado por Natural Philo', licenca: 'CC BY-SA 3.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/3.0', fonte: 'https://commons.wikimedia.org/wiki/File:Wheeze2O_noise_reduced.ogg',
  },
  estridor: {
    id: 'estridor', arquivo: 'sons/estridor.mp3', descricao: 'Estridor',
    autor: 'Wikimedia Commons (autor no arquivo original)', licenca: 'CC BY-SA 3.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/3.0', fonte: 'https://commons.wikimedia.org/wiki/File:Stridor_NP_OGG.ogg',
  },
  'rha-metalicos': {
    id: 'rha-metalicos', arquivo: 'sons/rha-metalicos.mp3', descricao: 'Ruídos hidroaéreos aumentados, metálicos (obstrução intestinal)',
    autor: 'James Heilman, MD', licenca: 'CC BY-SA 3.0', licencaUrl: 'https://creativecommons.org/licenses/by-sa/3.0', fonte: 'https://commons.wikimedia.org/wiki/File:SBOOgg.ogg',
  },
};

/** Gravação real que corresponde ao som, quando existe uma fiel ao achado. */
export function gravacaoPara(som: Som): Gravacao | null {
  let id: string | null = null;
  if (som.tipo === 'cardiaca') {
    const c = som.c;
    if (!c.sopro && !c.b3 && !c.b4 && !c.estalido && !c.atrito && !c.irregular && c.b2 === 'normal') id = 'normal';
    else if (c.sopro?.tipo === 'holo' && !c.b3 && !c.irregular) id = 'holossistolico';
  } else if (som.tipo === 'pulmonar') {
    const p = som.p;
    if (p.estridor) id = 'estridor';
    else if (p.sibilos && !p.finos && !p.grossos && !p.roncos) id = 'sibilos';
    else if (p.finos && p.base === 'bronquico') id = 'crepitacoes-pneumonia';
    else if (p.finos && !p.grossos && !p.sibilos) id = 'crepitacoes-finas';
  } else if (som.tipo === 'abdominal' && som.a.rha === 'aumentados') id = 'rha-metalicos';
  return id && DISPONIVEIS.has(id) ? GRAVACOES[id] : null;
}

/** Arquivos efetivamente incluídos no app (preenchido conforme os downloads foram concluídos). */
export const DISPONIVEIS = new Set<string>(['normal', 'crepitacoes-pneumonia', 'estridor', 'rha-metalicos']);
