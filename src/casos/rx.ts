/**
 * Radiografia de tórax PA esquemática, desenhada em canvas (didática, não é imagem real).
 * Convenção: o lado DIREITO do paciente aparece à ESQUERDA da tela.
 */

export interface PadraoRx {
  id: string;
  nome: string;
  achados: string[];
  pista: string;
}

export const PADROES_RX: PadraoRx[] = [
  { id: 'normal', nome: 'Radiografia normal', achados: ['Índice cardiotorácico < 0,5', 'Seios costofrênicos livres', 'Trama vascular até a periferia', 'Hemicúpula direita um pouco mais alta que a esquerda'], pista: 'Leia sempre na mesma ordem: técnica, partes moles e ossos, mediastino, hilos, pulmões, pleura, diafragma.' },
  { id: 'pneumotorax', nome: 'Pneumotórax à direita', achados: ['Linha pleural visceral fina à direita', 'Área periférica hipertransparente sem trama vascular', 'Sem desvio do mediastino (não hipertensivo)'], pista: 'Pequeno e estável: observação/O₂ ou aspiração; grande ou sintomático: drenagem. Hipertensivo é diagnóstico clínico.' },
  { id: 'derrame', nome: 'Derrame pleural à esquerda', achados: ['Opacidade homogênea na base esquerda', 'Curva de Damoiseau (menisco) ascendendo lateralmente', 'Seio costofrênico apagado'], pista: 'Toracocentese diagnóstica: critérios de Light (exsudato × transudato).' },
  { id: 'consolidacao', nome: 'Consolidação no lobo inferior direito', achados: ['Opacidade alveolar na base direita', 'Broncogramas aéreos', 'Borda cardíaca direita preservada (lobo inferior, não médio)'], pista: 'Pneumonia: CURB-65 para decidir o local de tratamento e antibiótico.' },
  { id: 'eap', nome: 'Congestão / edema agudo de pulmão', achados: ['Cardiomegalia', 'Opacidades peri-hilares bilaterais em "asa de borboleta"', 'Linhas B de Kerley nas bases e cefalização da trama'], pista: 'VNI, nitrato e diurético; investigar o gatilho.' },
  { id: 'cardiomegalia', nome: 'Cardiomegalia', achados: ['Índice cardiotorácico > 0,5 em PA', 'Pulmões sem congestão importante'], pista: 'Ecocardiograma para definir a causa (miocardiopatia, valvopatia, derrame pericárdico).' },
  { id: 'dpoc', nome: 'Hiperinsuflação (DPOC/enfisema)', achados: ['Cúpulas diafragmáticas rebaixadas e retificadas', 'Mais de 10 arcos costais posteriores visíveis', 'Coração alongado ("em gota") e pulmões hipertransparentes'], pista: 'Espirometria confirma; na exacerbação, a RX serve para afastar pneumonia e pneumotórax.' },
  { id: 'pneumoperitonio', nome: 'Pneumoperitônio', achados: ['Faixa de ar livre sob a hemicúpula diafragmática direita', 'Separação entre o diafragma e o fígado'], pista: 'Perfuração de víscera oca: cirurgia de urgência.' },
  { id: 'mediastino', nome: 'Alargamento do mediastino', achados: ['Mediastino superior > 8 cm em PA', 'Contorno aórtico apagado/duplo'], pista: 'Com dor torácica: dissecção de aorta até prova em contrário (angio-TC).' },
];

export const rxPorId = (id: string) => PADROES_RX.find(p => p.id === id)!;

export function desenharRx(cv: HTMLCanvasElement, id: string) {
  const W = cv.width, H = cv.height;
  const c = cv.getContext('2d')!;
  const X = (f: number) => f * W, Y = (f: number) => f * H;
  const p = {
    cupulaD: id === 'dpoc' ? 0.82 : 0.71,
    cupulaE: id === 'dpoc' ? 0.84 : 0.74,
    curva: id === 'dpoc' ? 0.02 : 0.07,
    coracao: id === 'cardiomegalia' || id === 'eap' ? 0.23 : id === 'dpoc' ? 0.12 : 0.155,
    mediast: id === 'mediastino' ? 0.13 : 0.075,
  };
  c.save();
  c.fillStyle = '#050505';
  c.fillRect(0, 0, W, H);
  // partes moles do tórax e abdome superior
  const corpo = c.createLinearGradient(0, 0, 0, H);
  corpo.addColorStop(0, '#3a3a3a');
  corpo.addColorStop(0.7, '#5c5c5c');
  corpo.addColorStop(1, '#8a8a8a');
  c.fillStyle = corpo;
  c.beginPath();
  c.moveTo(X(0.22), Y(0.03));
  c.quadraticCurveTo(X(0.02), Y(0.12), X(0.04), Y(0.5));
  c.lineTo(X(0.06), Y(1));
  c.lineTo(X(0.94), Y(1));
  c.lineTo(X(0.96), Y(0.5));
  c.quadraticCurveTo(X(0.98), Y(0.12), X(0.78), Y(0.03));
  c.closePath();
  c.fill();

  // pulmões (radiotransparentes = escuros)
  const pulmao = (lado: 1 | -1, cupula: number) => {
    const m = (f: number) => (lado === 1 ? f : 1 - f);
    c.beginPath();
    c.moveTo(X(m(0.36)), Y(0.13));
    c.bezierCurveTo(X(m(0.16)), Y(0.15), X(m(0.09)), Y(0.42), X(m(0.12)), Y(cupula + 0.08));
    c.quadraticCurveTo(X(m(0.25)), Y(cupula - p.curva - 0.02), X(m(0.45)), Y(cupula + 0.01));
    c.lineTo(X(m(0.44)), Y(0.22));
    c.closePath();
  };
  c.filter = 'blur(3px)';
  for (const [lado, cup] of [[1, p.cupulaD], [-1, p.cupulaE]] as const) {
    pulmao(lado, cup);
    const gr = c.createRadialGradient(X(lado === 1 ? 0.28 : 0.72), Y(0.45), X(0.02), X(lado === 1 ? 0.28 : 0.72), Y(0.45), X(0.3));
    gr.addColorStop(0, id === 'dpoc' ? '#0c0c0c' : '#1d1d1d');
    gr.addColorStop(1, id === 'dpoc' ? '#121212' : '#262626');
    c.fillStyle = gr;
    c.fill();
  }
  c.filter = 'none';

  // trama vascular (some na periferia do pneumotórax)
  c.strokeStyle = 'rgba(150,150,150,0.35)';
  c.lineWidth = 1.6;
  for (const lado of [1, -1] as const) {
    const hx = X(lado === 1 ? 0.41 : 0.59), hy = Y(0.4);
    for (let i = 0; i < 14; i++) {
      const ang = (lado === 1 ? Math.PI : 0) + (i / 13 - 0.5) * 2.2 * (lado === 1 ? -1 : 1);
      const len = X(0.14 + (i % 3) * 0.03) * (id === 'eap' && i % 2 ? 1.2 : 1);
      if (id === 'pneumotorax' && lado === 1) continue;
      c.beginPath();
      c.moveTo(hx, hy);
      c.quadraticCurveTo(hx + Math.cos(ang) * len * 0.5, hy + Math.sin(ang) * len * 0.5 + 6, hx + Math.cos(ang) * len, hy + Math.sin(ang) * len);
      c.stroke();
    }
  }
  if (id === 'pneumotorax') {
    // pulmão direito colapsado com linha pleural
    c.strokeStyle = 'rgba(150,150,150,0.35)';
    for (let i = 0; i < 8; i++) {
      const ang = Math.PI + (i / 7 - 0.5) * 2;
      c.beginPath();
      c.moveTo(X(0.41), Y(0.4));
      c.lineTo(X(0.41) + Math.cos(ang) * X(0.08), Y(0.4) + Math.sin(ang) * X(0.08));
      c.stroke();
    }
    c.strokeStyle = 'rgba(220,220,220,0.85)';
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(X(0.36), Y(0.2));
    c.bezierCurveTo(X(0.24), Y(0.25), X(0.24), Y(0.55), X(0.33), Y(0.66));
    c.stroke();
    c.fillStyle = 'rgba(0,0,0,0.45)';
    c.beginPath();
    c.moveTo(X(0.36), Y(0.14));
    c.bezierCurveTo(X(0.12), Y(0.16), X(0.1), Y(0.5), X(0.13), Y(0.78));
    c.lineTo(X(0.33), Y(0.66));
    c.bezierCurveTo(X(0.24), Y(0.55), X(0.24), Y(0.25), X(0.36), Y(0.2));
    c.closePath();
    c.fill();
  }

  // arcos costais
  c.strokeStyle = id === 'dpoc' ? 'rgba(200,200,200,0.28)' : 'rgba(200,200,200,0.22)';
  c.lineWidth = X(0.012);
  const arcos = id === 'dpoc' ? 11 : 9;
  for (let i = 0; i < arcos; i++) {
    const y = Y(0.13 + i * (0.66 / arcos));
    for (const lado of [1, -1] as const) {
      c.beginPath();
      const x0 = X(0.5 + lado * -0.03);
      c.moveTo(x0, y);
      c.bezierCurveTo(X(0.5 - lado * 0.25), y - Y(0.035), X(0.5 - lado * 0.42), y + Y(0.02), X(0.5 - lado * 0.4), y + Y(0.09));
      c.stroke();
    }
  }
  // clavículas
  c.strokeStyle = 'rgba(225,225,225,0.7)';
  c.lineWidth = X(0.016);
  for (const lado of [1, -1] as const) {
    c.beginPath();
    c.moveTo(X(0.5 - lado * 0.04), Y(0.12));
    c.quadraticCurveTo(X(0.5 - lado * 0.2), Y(0.07), X(0.5 - lado * 0.36), Y(0.09));
    c.stroke();
  }

  // mediastino, coração e aorta
  c.filter = 'blur(2px)';
  c.fillStyle = '#d2d2d2';
  c.beginPath();
  c.moveTo(X(0.5 - p.mediast), Y(0.08));
  c.lineTo(X(0.5 + p.mediast), Y(0.08));
  c.lineTo(X(0.5 + p.mediast + (id === 'mediastino' ? 0.02 : 0)), Y(0.38));
  c.lineTo(X(0.5 - p.mediast), Y(0.38));
  c.closePath();
  c.fill();
  // botão aórtico
  c.beginPath();
  c.ellipse(X(0.57 + (id === 'mediastino' ? 0.05 : 0)), Y(0.27), X(0.045), Y(0.035), 0, 0, Math.PI * 2);
  c.fill();
  // silhueta cardíaca (mais para a esquerda do paciente = direita da tela)
  c.beginPath();
  c.moveTo(X(0.5 - p.coracao * 0.55), Y(0.38));
  c.bezierCurveTo(X(0.5 - p.coracao * 0.75), Y(0.48), X(0.5 - p.coracao * 0.75), Y(0.62), X(0.5 - p.coracao * 0.45), Y(0.7));
  c.lineTo(X(0.5 + p.coracao * 1.25), Y(0.72));
  c.bezierCurveTo(X(0.5 + p.coracao * 1.45), Y(0.6), X(0.5 + p.coracao * 1.1), Y(0.42), X(0.5 + p.coracao * 0.4), Y(0.38));
  c.closePath();
  c.fill();
  // coluna e traqueia
  c.fillStyle = 'rgba(60,60,60,0.9)';
  c.fillRect(X(0.485), Y(0.04), X(0.03), Y(0.25));

  // diafragma/abdome (radiopaco)
  c.fillStyle = '#a5a5a5';
  for (const [lado, cup] of [[1, p.cupulaD], [-1, p.cupulaE]] as const) {
    const m = (f: number) => (lado === 1 ? f : 1 - f);
    c.beginPath();
    c.moveTo(X(m(0.08)), Y(cup + 0.1));
    c.quadraticCurveTo(X(m(0.25)), Y(cup - p.curva - 0.03), X(m(0.5)), Y(cup + 0.02));
    c.lineTo(X(m(0.5)), Y(1));
    c.lineTo(X(m(0.06)), Y(1));
    c.closePath();
    c.fill();
  }
  c.filter = 'none';
  // bolha gástrica (abaixo da cúpula esquerda = direita da tela)
  if (id !== 'pneumoperitonio' && id !== 'derrame') {
    c.fillStyle = 'rgba(20,20,20,0.8)';
    c.beginPath();
    c.ellipse(X(0.7), Y(p.cupulaE + 0.07), X(0.05), Y(0.025), 0, 0, Math.PI * 2);
    c.fill();
  }

  // achados específicos
  c.filter = 'blur(4px)';
  if (id === 'derrame') {
    // restrito ao hemitórax esquerdo (direita da tela), com menisco subindo lateralmente
    c.save();
    pulmao(-1, p.cupulaE);
    c.clip();
    c.fillStyle = 'rgba(185,185,185,0.97)';
    c.beginPath();
    c.moveTo(X(0.52), Y(0.7));
    c.bezierCurveTo(X(0.66), Y(0.66), X(0.8), Y(0.6), X(0.9), Y(0.46));
    c.lineTo(X(0.95), Y(0.95));
    c.lineTo(X(0.52), Y(0.95));
    c.closePath();
    c.fill();
    c.restore();
  }
  if (id === 'consolidacao') {
    const gr = c.createRadialGradient(X(0.24), Y(0.6), X(0.01), X(0.24), Y(0.6), X(0.14));
    gr.addColorStop(0, 'rgba(200,200,200,0.85)');
    gr.addColorStop(1, 'rgba(200,200,200,0)');
    c.save();
    pulmao(1, p.cupulaD);
    c.clip();
    c.fillStyle = gr;
    c.fillRect(X(0.05), Y(0.4), X(0.4), Y(0.35));
    c.restore();
  }
  if (id === 'eap') {
    for (const lado of [1, -1] as const) {
      const gr = c.createRadialGradient(X(0.5 - lado * 0.13), Y(0.42), X(0.01), X(0.5 - lado * 0.13), Y(0.42), X(0.2));
      gr.addColorStop(0, 'rgba(190,190,190,0.75)');
      gr.addColorStop(1, 'rgba(190,190,190,0)');
      c.fillStyle = gr;
      c.fillRect(X(0.05), Y(0.15), X(0.9), Y(0.6));
    }
  }
  c.filter = 'none';
  if (id === 'consolidacao') {
    c.strokeStyle = 'rgba(15,15,15,0.8)';
    c.lineWidth = 2;
    for (const [dx, dy] of [[-0.06, 0.04], [-0.03, 0.08], [0.01, 0.06]]) {
      c.beginPath();
      c.moveTo(X(0.36), Y(0.5));
      c.lineTo(X(0.28 + dx), Y(0.56 + dy));
      c.stroke();
    }
  }
  if (id === 'eap') {
    c.strokeStyle = 'rgba(210,210,210,0.7)';
    c.lineWidth = 1.5;
    for (const lado of [1, -1] as const)
      for (let i = 0; i < 5; i++) {
        const y = Y(0.6 + i * 0.022);
        const x = X(lado === 1 ? 0.12 : 0.88);
        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(x + lado * X(0.04), y);
        c.stroke();
      }
  }
  if (id === 'pneumoperitonio') {
    c.fillStyle = 'rgba(8,8,8,0.95)';
    c.beginPath();
    c.moveTo(X(0.12), Y(p.cupulaD + 0.1));
    c.quadraticCurveTo(X(0.25), Y(p.cupulaD - p.curva - 0.02), X(0.45), Y(p.cupulaD + 0.03));
    c.quadraticCurveTo(X(0.27), Y(p.cupulaD + 0.04), X(0.12), Y(p.cupulaD + 0.12));
    c.closePath();
    c.fill();
  }
  // marcador de lado
  c.fillStyle = '#f2f2f2';
  c.font = `bold ${Math.round(W * 0.04)}px system-ui, sans-serif`;
  c.fillText('D', X(0.05), Y(0.07));
  c.restore();
}
