/* Voz do paciente (síntese de fala do aparelho, pt-BR). */
import { storage } from '../app/core/store';

const KEY = 'pr.v2.osce.voz';
let ligada = storage.read<boolean>(KEY) ?? true;
let vozes: SpeechSynthesisVoice[] = [];

const suportada = () => typeof window !== 'undefined' && 'speechSynthesis' in window;
if (suportada()) {
  const carrega = () => (vozes = speechSynthesis.getVoices().filter(v => v.lang.toLowerCase().startsWith('pt')));
  carrega();
  speechSynthesis.addEventListener?.('voiceschanged', carrega);
}

export const voz = {
  suportada,
  get ligada() { return ligada && suportada(); },
  alternar() {
    ligada = !ligada;
    storage.write(KEY, ligada);
    if (!ligada && suportada()) speechSynthesis.cancel();
    return ligada;
  },
  /** Fala o texto com tom de acordo com o sexo e a idade do paciente. */
  falar(texto: string, sexo: 'M' | 'F', idade: number) {
    if (!this.ligada || !texto) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto.replace(/doutor\(a\)/g, 'doutor'));
    u.lang = 'pt-BR';
    const br = vozes.filter(v => /pt-BR|pt_BR/i.test(v.lang));
    const pool = br.length ? br : vozes;
    const fem = pool.find(v => /female|feminin|luciana|francisca|maria|vit[óo]ria|camila|let[íi]cia/i.test(v.name));
    const masc = pool.find(v => /male|masculin|daniel|ant[ôo]nio|felipe|ricardo/i.test(v.name) && !/female/i.test(v.name));
    u.voice = (sexo === 'F' ? fem : masc) ?? pool[0] ?? null;
    u.pitch = (sexo === 'F' ? 1.15 : 0.85) - (idade > 65 ? 0.1 : 0);
    u.rate = idade > 65 ? 0.9 : 1;
    speechSynthesis.speak(u);
  },
  parar() {
    if (suportada()) speechSynthesis.cancel();
  },
};
