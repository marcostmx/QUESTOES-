// 11 Questões da Prova com seus Gráficos — Farmacologia
// Transcrição fiel: Q.1 a Q.11, com gabarito comentado, raciocínio padrão-ouro e gráficos em alta resolução

export const FIGURA_1_SVG = `
<div class="whitespace-normal w-full max-w-xl mx-auto my-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
  <svg viewBox="0 0 540 360" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrow-fig1" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1f2937" />
      </marker>
    </defs>
    
    <!-- Eixo Y -->
    <line x1="60" y1="40" x2="60" y2="280" stroke="#1f2937" stroke-width="1.5" />
    <!-- Eixo X -->
    <line x1="60" y1="280" x2="490" y2="280" stroke="#1f2937" stroke-width="1.5" />

    <!-- Ticks e Labels Eixo Y -->
    <line x1="55" y1="40" x2="60" y2="40" stroke="#1f2937" stroke-width="1.5" />
    <text x="50" y="44" font-size="13" font-family="system-ui, sans-serif" font-weight="600" text-anchor="end" fill="#1f2937">10</text>
    
    <line x1="55" y1="88" x2="60" y2="88" stroke="#1f2937" stroke-width="1.5" />
    <text x="50" y="92" font-size="13" font-family="system-ui, sans-serif" font-weight="600" text-anchor="end" fill="#1f2937">8</text>

    <line x1="55" y1="136" x2="60" y2="136" stroke="#1f2937" stroke-width="1.5" />
    <text x="50" y="140" font-size="13" font-family="system-ui, sans-serif" font-weight="600" text-anchor="end" fill="#1f2937">6</text>

    <line x1="55" y1="184" x2="60" y2="184" stroke="#1f2937" stroke-width="1.5" />
    <text x="50" y="188" font-size="13" font-family="system-ui, sans-serif" font-weight="600" text-anchor="end" fill="#1f2937">4</text>

    <line x1="55" y1="232" x2="60" y2="232" stroke="#1f2937" stroke-width="1.5" />
    <text x="50" y="236" font-size="13" font-family="system-ui, sans-serif" font-weight="600" text-anchor="end" fill="#1f2937">2</text>

    <line x1="55" y1="280" x2="60" y2="280" stroke="#1f2937" stroke-width="1.5" />
    <text x="50" y="284" font-size="13" font-family="system-ui, sans-serif" font-weight="600" text-anchor="end" fill="#1f2937">0</text>

    <!-- Rótulo Eixo Y -->
    <text transform="rotate(-90)" x="-160" y="20" font-size="13" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle" fill="#374151">concentração sérica (µg/mL)</text>

    <!-- Ticks e Labels Eixo X -->
    <line x1="60" y1="280" x2="60" y2="286" stroke="#1f2937" stroke-width="1.5" />
    <text x="60" y="302" font-size="13" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle" fill="#1f2937">0</text>

    <line x1="165" y1="280" x2="165" y2="286" stroke="#1f2937" stroke-width="1.5" />
    <text x="165" y="302" font-size="13" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle" fill="#1f2937">5</text>

    <line x1="270" y1="280" x2="270" y2="286" stroke="#1f2937" stroke-width="1.5" />
    <text x="270" y="302" font-size="13" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle" fill="#1f2937">10</text>

    <line x1="375" y1="280" x2="375" y2="286" stroke="#1f2937" stroke-width="1.5" />
    <text x="375" y="302" font-size="13" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle" fill="#1f2937">15</text>

    <line x1="480" y1="280" x2="480" y2="286" stroke="#1f2937" stroke-width="1.5" />
    <text x="480" y="302" font-size="13" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle" fill="#1f2937">20</text>

    <!-- Rótulo Eixo X -->
    <text x="270" y="328" font-size="13" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle" fill="#374151">tempo (h)</text>

    <!-- Linhas horizontais delimitando a Faixa Terapêutica -->
    <line x1="60" y1="112" x2="480" y2="112" stroke="#4b5563" stroke-width="1.5" />
    <line x1="60" y1="208" x2="480" y2="208" stroke="#4b5563" stroke-width="1.5" />
    <text x="415" y="160" font-size="13" font-family="system-ui, sans-serif" fill="#4b5563" text-anchor="middle">faixa terapêutica</text>

    <!-- Curva A -->
    <path d="M 60,88 C 95,145 125,185 165,203 C 205,221 235,238 270,249 C 320,263 390,272 480,276" fill="none" stroke="#111827" stroke-width="3.5" stroke-linecap="round" />
    
    <!-- Rótulo e Seta A -->
    <text x="238" y="142" font-size="16" font-family="system-ui, sans-serif" font-weight="700" fill="#111827">A</text>
    <line x1="230" y1="145" x2="166" y2="198" stroke="#1f2937" stroke-width="1.5" marker-end="url(#arrow-fig1)" />

    <!-- Curva B -->
    <path d="M 60,280 C 75,238 95,215 123,215 C 150,215 180,225 215,233 C 270,244 370,267 480,274" fill="none" stroke="#111827" stroke-width="3.5" stroke-linecap="round" />

    <!-- Rótulo e Seta B -->
    <text x="278" y="210" font-size="16" font-family="system-ui, sans-serif" font-weight="700" fill="#111827">B</text>
    <line x1="275" y1="214" x2="238" y2="236" stroke="#1f2937" stroke-width="1.5" marker-end="url(#arrow-fig1)" />
  </svg>
  <p class="text-xs text-gray-500 italic text-center mt-3">Figura 1. Concentração sérica (µg/mL) × tempo (h); curvas A e B; a faixa terapêutica está delimitada pelas duas linhas horizontais. Reprodução em alta resolução do gráfico da prova.</p>
</div>
`;

export const FIGURA_2_SVG = `
<div class="whitespace-normal w-full max-w-xl mx-auto my-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
  <svg viewBox="0 0 540 370" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb" />
      </marker>
    </defs>
    
    <!-- Eixos -->
    <line x1="60" y1="40" x2="60" y2="280" stroke="#1f2937" stroke-width="1.5" />
    <line x1="60" y1="280" x2="490" y2="280" stroke="#1f2937" stroke-width="1.5" />

    <!-- Y labels -->
    <text x="50" y="44" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="end" fill="#1f2937">10</text>
    <text x="50" y="92" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="end" fill="#1f2937">8</text>
    <text x="50" y="140" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="end" fill="#1f2937">6</text>
    <text x="50" y="188" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="end" fill="#1f2937">4</text>
    <text x="50" y="236" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="end" fill="#1f2937">2</text>
    <text x="50" y="284" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="end" fill="#1f2937">0</text>
    <text transform="rotate(-90)" x="-160" y="20" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle" fill="#374151">concentração sérica (µg/mL)</text>

    <!-- X labels -->
    <text x="60" y="302" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle" fill="#1f2937">0</text>
    <text x="165" y="302" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle" fill="#1f2937">5</text>
    <text x="270" y="302" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle" fill="#1f2937">10</text>
    <text x="375" y="302" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle" fill="#1f2937">15</text>
    <text x="480" y="302" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle" fill="#1f2937">20</text>
    <text x="270" y="328" font-size="12" font-family="system-ui, sans-serif" font-weight="600" text-anchor="middle" fill="#374151">tempo (h)</text>

    <!-- Linhas Faixa Terapêutica -->
    <line x1="60" y1="112" x2="480" y2="112" stroke="#10b981" stroke-width="1.5" />
    <text x="415" y="104" font-size="11" font-family="system-ui, sans-serif" font-weight="600" fill="#dc2626" text-anchor="middle">zona de toxicidade (&gt; CTM)</text>
    
    <line x1="60" y1="208" x2="480" y2="208" stroke="#10b981" stroke-width="1.5" />
    <text x="415" y="226" font-size="11" font-family="system-ui, sans-serif" font-weight="600" fill="#6b7280" text-anchor="middle">zona subterapêutica (&lt; CEM)</text>
    <text x="415" y="160" font-size="13" font-family="system-ui, sans-serif" font-weight="600" fill="#059669" text-anchor="middle">faixa terapêutica</text>

    <!-- Curva A (IV) em azul escuro -->
    <path d="M 60,88 C 95,145 125,185 165,203 C 205,221 235,238 270,249 C 320,263 390,272 480,276" fill="none" stroke="#1e3a8a" stroke-width="3.5" stroke-linecap="round" />
    <circle cx="60" cy="88" r="4.5" fill="#1e3a8a" />
    
    <!-- Anotação Cmáx IV -->
    <text x="180" y="68" font-size="11" font-family="system-ui, sans-serif" font-weight="600" fill="#1e3a8a" text-anchor="middle">Cmáx em t = 0 → não há fase de absorção</text>
    <line x1="110" y1="72" x2="68" y2="86" stroke="#1e3a8a" stroke-width="1.5" marker-end="url(#arrow-blue)" />
    <text x="248" y="145" font-size="14" font-family="system-ui, sans-serif" font-weight="700" fill="#1e3a8a">A — via IV</text>

    <!-- Curva B (Oral) em vermelho/laranja -->
    <path d="M 60,280 C 75,238 95,215 123,215 C 150,215 180,225 215,233 C 270,244 370,267 480,274" fill="none" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round" />
    <circle cx="123" cy="215" r="4.5" fill="#dc2626" />
    
    <!-- Anotação Tmáx Oral -->
    <line x1="123" y1="215" x2="123" y2="280" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,3" />
    <text x="123" y="246" font-size="11" font-family="system-ui, sans-serif" font-weight="600" fill="#dc2626" text-anchor="middle">Tmáx ≈ 3 h</text>
    <text x="123" y="260" font-size="9" font-family="system-ui, sans-serif" font-weight="500" fill="#dc2626" text-anchor="middle">(só existe se houver absorção)</text>
    <text x="288" y="210" font-size="14" font-family="system-ui, sans-serif" font-weight="700" fill="#dc2626">B — via ORAL</text>
  </svg>
  <p class="text-xs text-gray-500 italic text-center mt-3">Figura 2. O mesmo gráfico, agora anotado. A curva A parte da concentração máxima em t = 0 e apenas declina (perfil de via intravenosa). A curva B parte de zero, sobe até um pico (Tmáx ≈ 3 h) e depois declina — perfil só compatível com uma via que tem fase de absorção. CEM = concentração efetiva mínima; CTM = concentração tóxica mínima.</p>
</div>
`;

export const FIGURA_3_SVG = `
<div class="whitespace-normal w-full max-w-2xl mx-auto my-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Gráfico 1: Antagonismo -->
    <div class="border border-gray-100 p-3 rounded-xl bg-gray-50/50">
      <p class="text-xs font-bold text-gray-800 text-center mb-2">Antagonismo competitivo × não competitivo</p>
      <svg viewBox="0 0 320 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <!-- Eixos -->
        <line x1="45" y1="20" x2="45" y2="180" stroke="#1f2937" stroke-width="1.5" />
        <line x1="45" y1="180" x2="305" y2="180" stroke="#1f2937" stroke-width="1.5" />
        <!-- Ticks Y -->
        <text x="38" y="24" font-size="9" font-weight="600" text-anchor="end" fill="#4b5563">100</text>
        <text x="38" y="56" font-size="9" font-weight="600" text-anchor="end" fill="#4b5563">80</text>
        <text x="38" y="88" font-size="9" font-weight="600" text-anchor="end" fill="#4b5563">60</text>
        <text x="38" y="120" font-size="9" font-weight="600" text-anchor="end" fill="#4b5563">40</text>
        <text x="38" y="152" font-size="9" font-weight="600" text-anchor="end" fill="#4b5563">20</text>
        <text x="38" y="184" font-size="9" font-weight="600" text-anchor="end" fill="#4b5563">0</text>
        <text transform="rotate(-90)" x="-100" y="12" font-size="9" font-weight="600" text-anchor="middle" fill="#4b5563">resposta (% do efeito máximo)</text>
        
        <!-- Ticks X: -3, -2, -1, 0, 1, 2, 3 -->
        <!-- x span: 45 to 295 = 250 px, step ≈ 41.6 px -->
        <text x="45" y="195" font-size="9" text-anchor="middle" fill="#4b5563">-3</text>
        <text x="87" y="195" font-size="9" text-anchor="middle" fill="#4b5563">-2</text>
        <text x="128" y="195" font-size="9" text-anchor="middle" fill="#4b5563">-1</text>
        <text x="170" y="195" font-size="9" text-anchor="middle" fill="#4b5563">0</text>
        <text x="212" y="195" font-size="9" text-anchor="middle" fill="#4b5563">1</text>
        <text x="253" y="195" font-size="9" text-anchor="middle" fill="#4b5563">2</text>
        <text x="295" y="195" font-size="9" text-anchor="middle" fill="#4b5563">3</text>
        <text x="170" y="210" font-size="9" font-weight="600" text-anchor="middle" fill="#4b5563">log [fármaco]</text>

        <!-- Curva Agonista Pleno (preto contínuo) -->
        <path d="M 60,178 C 110,175 140,140 160,80 C 175,35 200,22 260,22" fill="none" stroke="#111827" stroke-width="2.5" />
        
        <!-- Curva + Antagonista Competitivo (tracejado azul) -->
        <path d="M 100,178 C 150,175 185,150 205,100 C 220,50 245,22 295,22" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,3" />

        <!-- Curva + Antagonista NÃO Competitivo (pontilhado vermelho) -->
        <path d="M 70,178 C 120,175 145,155 165,120 C 180,95 200,92 260,92" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="2,2" />

        <!-- Legenda compacta -->
        <rect x="52" y="25" width="165" height="42" fill="white" fill-opacity="0.9" rx="4" stroke="#e5e7eb" stroke-width="0.5" />
        <line x1="56" y1="33" x2="72" y2="33" stroke="#111827" stroke-width="2" />
        <text x="76" y="36" font-size="7.5" fill="#111827">Agonista pleno</text>
        <line x1="56" y1="44" x2="72" y2="44" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="3,2" />
        <text x="76" y="47" font-size="7.5" fill="#2563eb">+ antag. COMPETITIVO (Emáx mantido)</text>
        <line x1="56" y1="55" x2="72" y2="55" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="2,2" />
        <text x="76" y="58" font-size="7.5" fill="#dc2626">+ antag. NÃO competitivo (Emáx ↓)</text>
      </svg>
    </div>

    <!-- Gráfico 2: Atividade Intrínseca -->
    <div class="border border-gray-100 p-3 rounded-xl bg-gray-50/50">
      <p class="text-xs font-bold text-gray-800 text-center mb-2">Espectro de atividade intrínseca</p>
      <svg viewBox="0 0 320 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <!-- Eixos -->
        <line x1="45" y1="20" x2="45" y2="180" stroke="#1f2937" stroke-width="1.5" />
        <line x1="45" y1="180" x2="305" y2="180" stroke="#1f2937" stroke-width="1.5" />
        <text x="38" y="24" font-size="9" font-weight="600" text-anchor="end" fill="#4b5563">100</text>
        <text x="38" y="56" font-size="9" font-weight="600" text-anchor="end" fill="#4b5563">80</text>
        <text x="38" y="88" font-size="9" font-weight="600" text-anchor="end" fill="#4b5563">60</text>
        <text x="38" y="120" font-size="9" font-weight="600" text-anchor="end" fill="#4b5563">40</text>
        <text x="38" y="152" font-size="9" font-weight="600" text-anchor="end" fill="#4b5563">20</text>
        <text x="38" y="184" font-size="9" font-weight="600" text-anchor="end" fill="#4b5563">0</text>
        <text transform="rotate(-90)" x="-100" y="12" font-size="9" font-weight="600" text-anchor="middle" fill="#4b5563">resposta (% do efeito máximo)</text>
        
        <!-- Ticks X -->
        <text x="45" y="195" font-size="9" text-anchor="middle" fill="#4b5563">-3</text>
        <text x="87" y="195" font-size="9" text-anchor="middle" fill="#4b5563">-2</text>
        <text x="128" y="195" font-size="9" text-anchor="middle" fill="#4b5563">-1</text>
        <text x="170" y="195" font-size="9" text-anchor="middle" fill="#4b5563">0</text>
        <text x="212" y="195" font-size="9" text-anchor="middle" fill="#4b5563">1</text>
        <text x="253" y="195" font-size="9" text-anchor="middle" fill="#4b5563">2</text>
        <text x="295" y="195" font-size="9" text-anchor="middle" fill="#4b5563">3</text>
        <text x="170" y="210" font-size="9" font-weight="600" text-anchor="middle" fill="#4b5563">log [fármaco]</text>

        <!-- Linha de Atividade Basal (13% = y ≈ 160) -->
        <line x1="45" y1="160" x2="295" y2="160" stroke="#9ca3af" stroke-width="1.5" stroke-dasharray="3,3" />
        <text x="290" y="155" font-size="7.5" fill="#6b7280" text-anchor="end">atividade constitutiva (basal)</text>

        <!-- Agonista Pleno (preto) -->
        <path d="M 60,160 C 130,160 160,120 180,60 C 195,30 215,22 280,22" fill="none" stroke="#111827" stroke-width="2.5" />

        <!-- Agonista Parcial (laranja) -->
        <path d="M 60,160 C 130,160 165,140 185,115 C 205,102 225,102 280,102" fill="none" stroke="#d97706" stroke-width="2" />

        <!-- Antagonista Neutro (cinza - mantém basal) -->
        <!-- Representado pela própria linha basal -->

        <!-- Agonista Inverso (magenta/roxo - cai abaixo do basal) -->
        <path d="M 60,160 C 110,160 135,166 160,175 C 185,178 220,178 280,178" fill="none" stroke="#a21caf" stroke-width="2" />

        <!-- Legenda compacta -->
        <rect x="52" y="25" width="165" height="52" fill="white" fill-opacity="0.9" rx="4" stroke="#e5e7eb" stroke-width="0.5" />
        <line x1="56" y1="32" x2="72" y2="32" stroke="#111827" stroke-width="2" />
        <text x="76" y="35" font-size="7.5" fill="#111827">Agonista pleno (morfina)</text>
        <line x1="56" y1="43" x2="72" y2="43" stroke="#d97706" stroke-width="2" />
        <text x="76" y="46" font-size="7.5" fill="#d97706">Agonista parcial (buprenorfina)</text>
        <line x1="56" y1="54" x2="72" y2="54" stroke="#9ca3af" stroke-width="1.5" stroke-dasharray="3,2" />
        <text x="76" y="57" font-size="7.5" fill="#4b5563">Antag. neutro (naloxona) — mantém basal</text>
        <line x1="56" y1="65" x2="72" y2="65" stroke="#a21caf" stroke-width="2" />
        <text x="76" y="68" font-size="7.5" fill="#a21caf">Agonista inverso — cai abaixo do basal</text>
      </svg>
    </div>
  </div>
  <p class="text-xs text-gray-500 italic text-center mt-3">Figura 3. À esquerda, a assinatura gráfica do antagonismo: o competitivo desloca a curva para a direita mantendo o Emáx (superável); o não competitivo derruba o Emáx (insuperável). À direita, o espectro de atividade intrínseca: o agonista inverso é o único que leva a resposta abaixo da atividade basal do sistema.</p>
</div>
`;

export const farmaco_prova_11q = [
  // QUESTÃO 1 (Valor: 1,00)
  {
    type: "DISCURSIVA",
    text: `Um paciente de 54 anos, com histórico de etilismo crônico e cirrose hepática Child-Pugh B, é admitido com quadro de dor aguda. Ao planejar a terapia farmacológica, o clínico deve considerar que a disfunção do parênquima hepático altera parâmetros farmacocinéticos críticos. Nesse cenário, para um fármaco que possui alta taxa de extração hepática e é metabolizado pelo sistema citocromo P450, qual etapa da farmacocinética será afetada?`,
    interactionType: "textarea",
    gabarito: `✔ **Resposta: METABOLIZAÇÃO (biotransformação) — a 3ª etapa do ADME**
*Resposta dissertativa aceita: "metabolização/biotransformação hepática".*

**RACIOCÍNIO PADRÃO-OURO**
A — Absorção → D — Distribuição → M — Metabolização → E — Excreção

O enunciado entrega duas chaves que apontam para a mesma etapa:
1) "metabolizado pelo sistema citocromo P450" — o CYP450 é o complexo enzimático microssomal hepático responsável pelas reações de Fase I (oxidação, redução, hidrólise);
2) "alta taxa de extração hepática".

Fármacos de alta extração (E > 0,7 — propranolol, lidocaína, morfina, verapamil, nitroglicerina) têm o clearance hepático limitado pelo fluxo sanguíneo hepático (ClH ≈ QH), e não pela capacidade enzimática. Na cirrose ocorrem simultaneamente:
• ↓ fluxo sanguíneo hepático efetivo e formação de shunts portossistêmicos — o sangue portal desvia do hepatócito e o fármaco "escapa" da primeira passagem;
• ↓ massa de hepatócitos funcionantes e ↓ atividade de CYP450 (capilarização dos sinusoides, fibrose, colapso do espaço de Disse);
• consequência direta: ↓ metabolismo de primeira passagem → ↑ biodisponibilidade oral (pode aumentar várias vezes) e ↑ meia-vida de eliminação → acúmulo e toxicidade.

Conduta: reduzir a dose e/ou ampliar o intervalo; iniciar baixo e titular pela resposta clínica.

**OURO DE PROVA — O QUE QUASE NINGUÉM ACRESCENTA**
A cirrose afeta mais de uma etapa do ADME, e citar isso valoriza a resposta dissertativa — desde que a etapa nuclear (metabolização) venha primeiro:
• **Distribuição:** ↓ síntese de albumina → ↑ fração livre de fármacos ácidos; ascite → ↑ volume de distribuição de fármacos hidrossolúveis (ex.: aminoglicosídeos exigem dose de ataque maior).
• **Excreção:** colestase reduz a eliminação biliar; a síndrome hepatorrenal compromete a via renal.
• **Fase I × Fase II:** a Fase I (CYP450) é desproporcionalmente mais comprometida que a Fase II (glicuronidação, relativamente preservada). Por isso, entre os benzodiazepínicos, prefere-se Lorazepam, Oxazepam e Temazepam (mnemônico LOT) no hepatopata — sofrem apenas glicuronidação direta.
• **Child-Pugh B = comprometimento moderado** (7–9 pontos: bilirrubina, albumina, INR, ascite, encefalopatia). É o marcador clínico que autoriza o ajuste de dose.

**ERRO-ARMADILHA**
Responder "excreção" por associar fígado a "eliminação". Excreção é a saída do fármaco do organismo (renal, biliar, pulmonar, sudorípara); o que o CYP450 faz é transformar a molécula — isso é metabolização. Outro erro frequente é responder "absorção": ela muda de fato (↑ biodisponibilidade), mas é consequência da queda do metabolismo de primeira passagem, não a etapa primariamente afetada pela enzima citada.`
  },

  // QUESTÃO 2 (Valor: 1,00)
  {
    type: "DISCURSIVA",
    text: `Um paciente de 25 anos é levado à emergência em estado epiléptico (crises convulsivas contínuas). A equipe médica precisa administrar um anticonvulsivante de ação rápida. O protocolo sugere o uso de um benzodiazepínico. O médico discute com a equipe a escolha entre a via Intravenosa (IV) e a via Oral (VO) para este momento crítico. Qual seria a melhor via de administração e por quê?`,
    interactionType: "textarea",
    gabarito: `✔ **Resposta: VIA INTRAVENOSA (IV)**
*Porque é a via mais rápida, com biodisponibilidade de 100%, pois elimina a 1ª etapa da farmacocinética — a absorção.*

**RACIOCÍNIO PADRÃO-OURO**
O estado de mal epiléptico é emergência tempo-dependente: o objetivo é abortar a crise em minutos. A escolha da via é decidida por parâmetros farmacocinéticos — e, neste caso, também pela segurança do paciente:

• **Absorção:**
- Na Via intravenosa: Não existe — o fármaco é depositado diretamente na circulação sistêmica.
- Na Via oral: Depende de dissolução, esvaziamento gástrico, motilidade, pH e transportadores.

• **Biodisponibilidade (F):**
- Na IV: F = 1 (100%) por definição.
- Na VO: F < 1 — reduzida pelo efeito de primeira passagem hepático e intestinal.

• **Início de ação:**
- Na IV: Segundos a poucos minutos; permite titulação dose a dose.
- Na VO: 30–60 minutos ou mais — incompatível com a emergência.

• **Segurança no caso:**
- Na IV: Independe do nível de consciência e da deglutição.
- Na VO: Contraindicada — rebaixamento de consciência e crise motora → risco de broncoaspiração.

Ou seja, a IV vence por dois motivos independentes e somados: farmacocinético (ausência de absorção → F de 100% e início imediato) e de segurança (paciente sem via aérea protegida não recebe medicação oral).

**APLICAÇÃO CLÍNICA — O PROTOCOLO REAL**
• **1ª linha (benzodiazepínico):** diazepam IV 0,15–0,2 mg/kg (máx. 10 mg) ou lorazepam IV 0,1 mg/kg (máx. 4 mg). Sem acesso venoso: midazolam IM 10 mg — via parenteral alternativa que mantém boa velocidade de absorção, ou ainda midazolam intranasal/bucal.
• **2ª linha:** fenitoína/fosfenitoína, ácido valproico ou levetiracetam IV.
• **Por que a pressa:** quanto mais prolongada a crise, maior a farmacorresistência — há internalização progressiva dos receptores GABAA da membrana sináptica (o benzodiazepínico perde alvo) e migração de receptores NMDA para a membrana (mais excitação). A janela de boa resposta ao benzodiazepínico é dos primeiros minutos.

**ERRO-ARMADILHA**
Justificar apenas com "porque é mais rápida". A banca pontua o mecanismo farmacocinético: a IV suprime a etapa de absorção, garantindo F = 100% e concentração plasmática máxima no tempo zero. Cuidado também com a confusão inversa: biodisponibilidade não é potência — F = 100% significa que toda a dose chegou à circulação, não que o efeito seja maior por miligrama.`
  },

  // QUESTÃO 3 (Valor: 0,50)
  {
    type: "MÚLTIPLA ESCOLHA",
    text: `Um paciente de 65 anos, hipertenso e diabético, é admitido na unidade de emergência apresentando um quadro de crise hipertensiva severa, associada a náuseas e vômitos intensos. Durante a avaliação, observa-se também uma lesão inflamatória extensa e localizada no antebraço esquerdo, decorrente de uma picada de inseto ocorrida há dois dias. A equipe médica precisa decidir as melhores estratégias para: controle imediato da pressão arterial; manutenção da glicemia e hidratação; tratamento da inflamação local no braço. Com base nos conceitos de Farmacocinética, analise as três grandes vias de administração (Enteral, Parenteral e Tópica) e correlacione as colunas abaixo:

(A) Essa via de administração possui efeito sistêmico, a absorção não envolve os órgãos do trato gastrointestinal.
(II) Essa via de administração possui efeito local, a absorção envolve pele ou mucosa.
(C) Essa via possui efeito sistêmico, a absorção envolve os órgãos do trato gastrointestinal.

( ) Via Tópica.   ( ) Via Enteral.   ( ) Via Parenteral.

Transcrição fiel: os itens aparecem na prova rotulados como (A), (II) e (C).`,
    interactionType: "multiple-choice",
    options: [
      "A) ( II ) Via Tópica · ( C ) Via Enteral · ( A ) Via Parenteral",
      "B) ( A ) Via Tópica · ( C ) Via Enteral · ( II ) Via Parenteral",
      "C) ( II ) Via Tópica · ( A ) Via Enteral · ( C ) Via Parenteral",
      "D) ( C ) Via Tópica · ( II ) Via Enteral · ( A ) Via Parenteral",
      "E) ( A ) Via Tópica · ( II ) Via Enteral · ( C ) Via Parenteral"
    ],
    gabarito: `**Alternativa A — ( II ) Via Tópica · ( C ) Via Enteral · ( A ) Via Parenteral**

*Na prova, o item do meio vem rotulado como "(II)" e não "(B)" — a numeração mista é da própria banca. Se o gabarito oficial usar (B), é o mesmo item.*

**RACIOCÍNIO PADRÃO-OURO**
A classificação se apoia em duas perguntas objetivas: (i) o fármaco atravessa o trato gastrointestinal? (ii) o efeito desejado é local ou sistêmico?

• **Enteral:** Absorção pelo TGI; efeito sistêmico. Exemplos: Oral, sublingual, retal, sonda enteral. Ponto-chave: Sofre efeito de primeira passagem (exceto sublingual e reto inferior, que drenam para a cava e escapam parcialmente do fígado).
• **Parenteral:** "Para-enteron" = ao lado do intestino; não usa o TGI; efeito sistêmico. Exemplos: IV, IM, SC, intradérmica, intratecal, intraóssea. Ponto-chave: Não há primeira passagem hepática; IV com F = 100%; IM/SC dependem da perfusão local.
• **Tópica:** Aplicação sobre pele ou mucosa buscando efeito local. Exemplos: Cremes, pomadas, colírios, inalatórios tópicos, gel anti-inflamatório. Ponto-chave: Absorção sistêmica mínima e indesejada → menos efeitos adversos sistêmicos.

**Aplicando ao caso clínico:**
• **Crise hipertensiva com vômitos → via parenteral (IV):** Além da urgência, o vômito inviabiliza qualquer via enteral (a dose pode ser expelida antes de ser absorvida). Ex.: nitroprussiato, nitroglicerina, esmolol.
• **Glicemia e hidratação → via parenteral (IV):** Soroterapia e insulina regular IV/SC.
• **Inflamação localizada no antebraço → via tópica:** Efeito onde a lesão está, com exposição sistêmica desprezível — vantagem real em um idoso hipertenso e diabético (corticoide sistêmico elevaria PA e glicemia).

**ERRO-ARMADILHA**
• **Tópica ≠ transdérmica:** O adesivo (fentanil, nicotina, estradiol) é aplicado na pele, mas seu objetivo é sistêmico — por isso é classificado por muitos autores como via transdérmica/percutânea, e não como tópica no sentido estrito de "efeito local".
• **Sublingual é enteral, mas não sofre primeira passagem:** Errar isso é clássico: a nitroglicerina SL é usada justamente porque a drenagem venosa sublingual vai para a veia cava superior, e não para a porta.
• **Inalatória pode ser tópica** (budesonida para asma — efeito local no brônquio) **ou sistêmica** (anestésicos voláteis). A via não define o efeito; o alvo terapêutico define.`
  },

  // QUESTÃO 4 (Valor: 1,00)
  {
    type: "MÚLTIPLA ESCOLHA",
    text: `Sobre o gráfico abaixo, qual curva representa a via oral?`,
    graphicsHtml: FIGURA_1_SVG,
    interactionType: "multiple-choice",
    options: [
      "A) Curva A",
      "B) Curva B"
    ],
    gabarito: `**Alternativa B — CURVA B (via oral) — a curva A corresponde à via intravenosa**

${FIGURA_2_SVG}

**RACIOCÍNIO PADRÃO-OURO**
A leitura de uma curva concentração × tempo se faz por três marcadores cinéticos — Cmáx, Tmáx e AUC — somados à posição da curva em relação à faixa terapêutica:

• **Cmáx:**
- **Curva A — IV:** Alta e em t = 0 (8 µg/mL): toda a dose já está no plasma.
- **Curva B — Oral:** Menor (≈ 2,7 µg/mL): parte da dose se perde antes de chegar à circulação sistêmica.

• **Tmáx:**
- **Curva A — IV:** Não existe fase ascendente — não há absorção a ser cumprida.
- **Curva B — Oral:** ≈ 3 h — tempo necessário para dissolução, absorção intestinal e primeira passagem.

• **AUC (área sob a curva):**
- **Curva A — IV:** Maior — proporcional à dose que efetivamente alcançou a circulação.
- **Curva B — Oral:** Menor — AUCoral / AUCIV = F, a biodisponibilidade absoluta.

• **Faixa terapêutica:**
- **Curva A — IV:** Inicia acima da CTM (risco de toxicidade nos primeiros minutos) e permanece na faixa até ≈ 6 h.
- **Curva B — Oral:** Neste gráfico sequer alcança a CEM → dose oral equivalente seria subterapêutica.

**Regra prática infalível:** se a curva sobe antes de descer, existe absorção → não é intravenosa. Se a curva já nasce no pico, é intravenosa (ou bolus intra-arterial).
**Fórmula da biodisponibilidade absoluta:** F = (AUCoral × DoseIV) / (AUCIV × Doseoral)

**OURO DE PROVA**
• A diferença de Cmáx e AUC entre as curvas mede exatamente o que se perdeu por absorção incompleta + efeito de primeira passagem (intestinal, pela CYP3A4 e pela glicoproteína-P, e hepático).
• Note que ambas as curvas convergem na fase de declínio: a inclinação terminal reflete a eliminação, que é propriedade do fármaco e do paciente — a via de administração não muda a meia-vida de eliminação, apenas a velocidade e a extensão da entrada.
• Para corrigir o subefeito da curva B não se muda a meia-vida: aumenta-se a dose oral na razão 1/F, ou troca-se a via.
• O contrário também cai em prova: uma curva oral achatada e alargada (formulação de liberação prolongada) mantém a concentração dentro da faixa por mais tempo, reduzindo picos tóxicos e vales subterapêuticos.

**ERRO-ARMADILHA**
Escolher a curva A "porque atinge concentração maior, logo é a que funciona". Pico alto não é sinônimo de melhor: no gráfico, a curva A começa acima da concentração tóxica mínima. O que a questão pede é o reconhecimento do perfil cinético (existe ou não fase de absorção), não o julgamento de eficácia.`
  },

  // QUESTÃO 5 (Valor: 1,00)
  {
    type: "MÚLTIPLA ESCOLHA",
    text: `A tadalafila é um fármaco usado para disfunção erétil e hiperplasia prostática benigna. Sobre sua farmacodinâmica, qual das afirmações abaixo é a mais correta?`,
    interactionType: "multiple-choice",
    options: [
      "A) A tadalafila promove ereção ao bloquear canais de cálcio tipo L nas células do músculo liso cavernoso, reduzindo diretamente o influxo de cálcio.",
      "B) A tadalafila causa vasodilatação sistêmica imediata e intensa independente de estímulo sexual, devido ao bloqueio não seletivo de várias isoformas de fosfodiesterase.",
      "C) A tadalafila atua principalmente aumentando AMPc intracelular por inibir PDE4, o que leva ao relaxamento do músculo liso vascular.",
      "D) A tadalafila inibe PDE5, elevando os níveis de GMP cíclico (cGMP) após estimulação do NO; isso leva à ativação da proteína quinase G (PKG), redução do cálcio intracelular e relaxamento do músculo liso peniano.",
      "E) A tadalafila aumenta diretamente a síntese de óxido nítrico (NO) nas células endoteliais do corpo cavernoso, promovendo vasodilatação."
    ],
    gabarito: `**Alternativa D**

**RACIOCÍNIO PADRÃO-OURO — A VIA NO/CGMP EM CINCO PASSOS**
Estímulo sexual → NO (nervos NANC + endotélio) → Guanilato ciclase solúvel → ↑ cGMP → PKG → ↓ Ca²⁺ → relaxamento

O cGMP é degradado pela fosfodiesterase tipo 5 (PDE5), isoforma predominante no corpo cavernoso. A tadalafila inibe a degradação — ela não produz cGMP, apenas impede que ele seja destruído. Daí a consequência clínica mais cobrada: é indispensável haver estímulo sexual, porque sem liberação de NO não há cGMP para preservar. O fármaco é permissivo/amplificador, nunca iniciador.

A PKG ativada fosforila alvos que reduzem o cálcio citosólico (sequestro no retículo sarcoplasmático, abertura de canais de K⁺ com hiperpolarização, dessensibilização do aparato contrátil ao Ca²⁺) → relaxamento do músculo liso trabecular e arteriolar → ingurgitamento dos sinusoides e compressão venosa (mecanismo venoclusivo) → ereção.

**POR QUE CADA ALTERNATIVA ERRADA ESTÁ ERRADA**
• **a) Troca o alvo molecular:** Bloqueio de canais de cálcio tipo L é o mecanismo dos bloqueadores de canal de cálcio (anlodipino, nifedipino, verapamil). A tadalafila reduz o cálcio intracelular de forma indireta, via PKG — não bloqueia o canal.
• **b) Duas mentiras em uma frase:** (i) O efeito não é independente do estímulo sexual — é exatamente o contrário; (ii) a tadalafila é seletiva para a PDE5. A seletividade imperfeita explica os efeitos adversos, e não um suposto bloqueio "não seletivo": cruzamento com PDE11 (mialgia e dorsalgia, típicas da tadalafila) e, no caso da sildenafila, com PDE6 da retina (distúrbio visual azulado/cianopsia).
• **c) Troca o segundo mensageiro e a isoforma:** PDE5 degrada cGMP, não AMPc. Quem inibe PDE4 (e eleva AMPc) é o roflumilaste (DPOC) e o apremilaste (psoríase). Trocar cGMP por AMPc é o erro conceitual mais penalizado do tema.
• **e) Confunde inibir a degradação com aumentar a síntese:** Quem doa ou aumenta NO são os nitratos (nitroglicerina, nitroprussiato, dinitrato de isossorbida). É precisamente por atuarem na mesma via em pontos diferentes que a associação nitrato + inibidor de PDE5 é contraindicação absoluta: acúmulo maciço de cGMP → hipotensão grave e refratária.

**PÉROLAS CLÍNICAS**
• **Tadalafila:** meia-vida ≈ 17,5 h ("pílula do fim de semana") — por isso é a única do grupo com apresentação de uso diário 5 mg, aprovada também para HPB (relaxa o músculo liso prostático e do colo vesical) e usada em hipertensão arterial pulmonar.
• **Sildenafila:** meia-vida ≈ 4 h; início mais rápido; mais interação com alimento gorduroso.
• **Contraindicação absoluta:** uso de nitratos em qualquer forma. Cautela com α-bloqueadores (hipotensão postural).`
  },

  // QUESTÃO 6 (Valor: 0,50)
  {
    type: "MÚLTIPLA ESCOLHA",
    text: `Paciente masculino, 45 anos, com histórico de desidratação grave e hemoconcentração, apresenta quadro de hiperalbuminemia (aumento da concentração de albumina sérica). Durante a internação, o paciente necessita iniciar o uso de um fármaco X, que possui caráter ácido e alta taxa de ligação às proteínas plasmáticas (98%). Considerando os princípios da farmacocinética, qual é a consequência esperada para a fração livre do fármaco e seu efeito terapêutico inicial?`,
    interactionType: "multiple-choice",
    options: [
      "A) Redução da meia-vida de eliminação do fármaco, pois a ligação à albumina facilita a filtração glomerular.",
      "B) Aumento da biodisponibilidade do fármaco, pois a hiperalbuminemia acelera a absorção gastrointestinal.",
      "C) Manutenção da fração livre, uma vez que a ligação proteica independe da concentração de albumina no sangue.",
      "D) Aumento da fração livre do fármaco, levando a um risco elevado de toxicidade sistêmica.",
      "E) Redução da fração livre do fármaco, resultando em um subefeito terapêutico ou falha farmacológica."
    ],
    gabarito: `**Alternativa E**

**RACIOCÍNIO PADRÃO-OURO**
Princípio central: apenas o fármaco livre (não ligado) é farmacologicamente ativo. Só a fração livre atravessa membranas, alcança o receptor, é metabolizada pelo hepatócito e é filtrada no glomérulo. A fração ligada funciona como um reservatório circulante inativo.

A ligação obedece a um equilíbrio de massa: Fármaco + Albumina ⇌ Complexo fármaco-albumina.
Aumentar a concentração de albumina desloca o equilíbrio para a direita → mais complexo, menos fármaco livre → menor concentração no sítio de ação → resposta terapêutica inicial insuficiente.

O enunciado reforça o raciocínio com dois dados: o fármaco é ácido (ácidos ligam-se preferencialmente à albumina; básicos, à α1-glicoproteína ácida) e tem ligação de 98% — nessa faixa, pequenas variações na ligação produzem grandes variações relativas na fração livre (de 2% para 1% significa reduzir o fármaco ativo pela metade).

**POR QUE CADA ALTERNATIVA ERRADA ESTÁ ERRADA**
• **a) Inverte a fisiologia renal:** O complexo fármaco-albumina não é filtrado pelo glomérulo (a barreira retém moléculas grandes e carregadas negativamente). Maior ligação → menor filtração → tendência a prolongar, não reduzir, a meia-vida.
• **b) Mistura etapas do ADME:** Biodisponibilidade é conceito de absorção e primeira passagem. A albuminemia é um fenômeno de distribuição — não acelera absorção gastrointestinal.
• **c) Nega o próprio conceito:** A ligação proteica é, por definição, dependente da concentração da proteína, da afinidade do fármaco e do número de sítios disponíveis (é saturável e sujeita a competição).
• **d) É o cenário oposto — e é a armadilha da questão:** Aumento da fração livre e risco de toxicidade ocorrem na HIPOalbuminemia (síndrome nefrótica, cirrose, desnutrição, grande queimado, sepse) ou quando outro fármaco desloca o primeiro do sítio de ligação.

**OURO DE PROVA — FÁRMACOS EM QUE ISSO MUDA A CONDUTA**
• **Fenitoína (~90% ligada):** no paciente hipoalbuminêmico, a fenitoína total dosada vem baixa enquanto a livre está normal ou tóxica → corrige-se pela fórmula de Sheiner-Tozer ou dosa-se a fração livre.
• **Varfarina (~99%):** deslocamento por AINEs, sulfonamidas ou fenilbutazona → ↑ INR e sangramento.
• **AAS e demais ácidos** competem pelos mesmos sítios da albumina; **lidocaína e propranolol** (básicos) ligam-se à α1-glicoproteína ácida, que aumenta em inflamação aguda — e aí a fração livre cai.
• **Regra:** ↑ proteína = ↓ fármaco livre = ↓ efeito; ↓ proteína = ↑ fármaco livre = ↑ efeito e toxicidade. Relevante sobretudo para fármacos com ligação > 90% e índice terapêutico estreito.

**ERRO-ARMADILHA**
A palavra "desidratação" no enunciado induz a pensar em "concentração do fármaco → toxicidade" e leva à alternativa d). Mas o enunciado é explícito ao dizer hiperalbuminemia e ao perguntar pela fração livre: mais proteína carreadora = menos fármaco livre = menos efeito inicial.`
  },

  // QUESTÃO 7 (Valor: 1,00)
  {
    type: "MÚLTIPLA ESCOLHA",
    text: `Um paciente de 45 anos, em uso crônico de morfina para controle de dor oncológica, é levado ao pronto-socorro com rebaixamento do nível de consciência, miose puntiforme e depressão respiratória significativa. Opta-se pela administração de naloxona intravenosa. Considerando a farmacodinâmica da morfina e da naloxona, assinale a alternativa correta:`,
    interactionType: "multiple-choice",
    options: [
      "A) A naloxona exerce seu efeito por agonismo inverso nos receptores kapa-opioides, revertendo seletivamente a analgesia sem interferir na depressão respiratória induzida pela morfina.",
      "B) A morfina ativa receptores µ-opioides acoplados à proteína Gi, promovendo diminuição do AMPc, abertura de canais de K⁺ e fechamento de canais de Ca²⁺, enquanto a naloxona atua como antagonista competitivo nesses receptores, revertendo seus efeitos.",
      "C) A naloxona apresenta maior afinidade pelos receptores delta-opioides do que pelos mi, sendo sua principal ação a reversão da analgesia, com pouco efeito sobre a ventilação.",
      "D) A morfina atua como agonista parcial dos receptores µ-opioides, reduzindo a liberação de neurotransmissores excitatórios, enquanto a naloxona é um antagonista irreversível desses receptores.",
      "E) A morfina aumenta a excitabilidade neuronal por ativação de receptores NMDA, sendo revertida pela naloxona por antagonismo não competitivo desses receptores."
    ],
    gabarito: `**Alternativa B**

**RACIOCÍNIO PADRÃO-OURO — A CASCATA DO RECEPTOR Μ**
O receptor µ (MOR) é um GPCR acoplado à proteína Gi/o. Sua ativação pela morfina desencadeia três eventos que convergem para reduzir a neurotransmissão nociceptiva:
• **Subunidade αi:** inibe a adenilil ciclase → ↓ AMPc → menor atividade da PKA e da excitabilidade celular;
• **Subunidade βγ:** abre canais de K⁺ (GIRK) no neurônio pós-sináptico → hiperpolarização → mais difícil disparar potencial de ação;
• **Subunidade βγ:** fecha canais de Ca²⁺ voltagem-dependentes no terminal pré-sináptico → menor influxo de cálcio → menor liberação de glutamato, substância P e CGRP.

A naloxona é um antagonista competitivo (reversível, ligação ao mesmo sítio ortostérico) com alta afinidade por µ > κ > δ. Ela desloca a morfina do receptor e reverte todos os efeitos µ-mediados: analgesia, sedação, miose e — o alvo da emergência — a depressão respiratória.

**POR QUE CADA ALTERNATIVA ERRADA ESTÁ ERRADA**
• **a) Três erros:** a naloxona é antagonista competitivo (não agonista inverso — vide Q.9 para o conceito); atua predominantemente em µ, não em κ; e não é seletiva para a analgesia — reverte sim a depressão respiratória, que é justamente a indicação salvadora.
• **c) Inverte a hierarquia de afinidade (µ > κ > δ) e nega o efeito respiratório:** Se a naloxona tivesse "pouco efeito sobre a ventilação", não seria o antídoto padrão da intoxicação opioide.
• **d) Dois erros simétricos:** a morfina é agonista pleno (total) de µ — quem é agonista parcial é a buprenorfina (e butorfanol/nalbufina são agonistas-antagonistas mistos); e a naloxona é antagonista reversível/competitivo, não irreversível (o antagonista irreversível de µ é a β-funaltrexamina, de uso experimental).
• **e) Inverte completamente a farmacodinâmica:** a morfina reduz a excitabilidade neuronal e não atua em NMDA. Quem antagoniza NMDA de forma não competitiva é a cetamina — repare que a banca reutilizou esse conceito na Q.11, sinal de que é o ponto que ela quer testar.

**PÉROLAS CLÍNICAS**
• **Tríade da intoxicação opioide:** rebaixamento do nível de consciência + miose puntiforme + depressão respiratória (bradipneia). A miose, ao contrário da maioria dos efeitos, não sofre tolerância.
• **Dose da naloxona:** 0,04–0,4 mg IV, tituladas a cada 2–3 min. No usuário crônico (como o paciente da questão), doses altas de uma vez precipitam síndrome de abstinência aguda e crise de dor — titula-se para restaurar a ventilação, não para acordar o paciente.
• **Risco de re-narcotização:** a meia-vida da naloxona (30–80 min) é menor que a da morfina — o paciente pode voltar a deprimir quando o antídoto acabar. Exige observação prolongada e, por vezes, infusão contínua. (É o mesmo raciocínio do flumazenil na Q.10.)
• **Tolerância e dependência** resultam, em parte, da regulação para cima da adenilil ciclase — o oposto adaptativo da queda aguda do AMPc.`
  },

  // QUESTÃO 8 (Valor: 0,50)
  {
    type: "MÚLTIPLA ESCOLHA",
    text: `Durante uma consulta médica, um paciente questiona sobre a diferença entre os termos que lê nas embalagens e nos noticiários. O profissional explica que, embora usados como sinônimos no cotidiano, possuem definições técnicas distintas. Com base na terminologia oficial, assinale a alternativa que define corretamente esses conceitos:`,
    interactionType: "multiple-choice",
    options: [
      "A) Droga é exclusivamente a substância ilícita que causa dependência química, não possuindo relação com a produção de medicamentos.",
      "B) Medicação é fármaco tecnologicamente modificado, é um conceito mais amplo, pode ser o comprimido, mas também pode ser um chá ou uma psicoterapia.",
      "C) Medicamento é qualquer substância que altere o estado fisiológico, com ou sem finalidade terapêutica, como o fumo ou o álcool.",
      "D) Remédio é o produto farmacêutico tecnicamente elaborado que contém obrigatoriamente um fármaco e excipientes em uma forma farmacêutica.",
      "E) O fármaco é uma substância química definida, com propriedades farmacológicas, que constitui o princípio ativo do medicamento."
    ],
    gabarito: `**Alternativa E**

**RACIOCÍNIO PADRÃO-OURO — OS CINCO TERMOS E O QUE SEPARA CADA UM**
• **Remédio:** O mais amplo. Qualquer recurso empregado para combater a doença ou aliviar o sofrimento — não precisa ser farmacológico. Exemplos: Chá, repouso, fisioterapia, psicoterapia, compressa, e também um medicamento.
• **Droga:** Qualquer substância capaz de modificar uma função fisiológica, com ou sem finalidade terapêutica; no sentido técnico-farmacêutico, também a matéria-prima de origem vegetal/animal/mineral. Exemplos: Álcool, nicotina, cafeína, digital (droga vegetal).
• **Fármaco:** Substância química de estrutura definida, com propriedades farmacológicas conhecidas: é o princípio ativo. Exemplos: Dipirona sódica, morfina, tadalafila.
• **Medicamento:** Produto farmacêutico tecnicamente obtido ou elaborado, com finalidade profilática, curativa, paliativa ou diagnóstica (Lei 5.991/73) — fármaco + excipientes em uma forma farmacêutica. Exemplos: Comprimido de 500 mg de dipirona, com todos os excipientes.
• **Medicação:** É o ato/processo de administrar o medicamento (ou o esquema terapêutico prescrito). Exemplo: "Administrar a medicação das 8h".

**COMO OS TERMOS SE ENCAIXAM**
Remédio é o guarda-chuva terapêutico: todo medicamento é um remédio, mas nem todo remédio é medicamento (chá, repouso, psicoterapia). Medicamento é o produto; fármaco é a substância ativa dentro dele — não são dois degraus da mesma escada, são produto e princípio ativo. Droga é uma categoria à parte, definida pelo efeito sobre a fisiologia: nem toda droga é remédio (álcool, nicotina) e nem todo remédio é droga (repouso). Medicação não é substância nenhuma — é o ato de administrar.

Termos acessórios que também caem: forma farmacêutica (comprimido, cápsula, xarope, solução injetável); excipiente/adjuvante (substância sem ação terapêutica que dá forma e estabilidade); especialidade farmacêutica (medicamento industrializado, com nome comercial registrado); placebo (forma farmacêutica sem princípio ativo).

**POR QUE CADA ALTERNATIVA ERRADA ESTÁ ERRADA**
• **a) Reduz "droga" ao senso comum:** Tecnicamente, droga é qualquer substância que altere função fisiológica — e, na acepção farmacêutica clássica, é a própria matéria-prima de onde se extrai o fármaco ("droga vegetal"). Tem, portanto, relação direta com a produção de medicamentos.
• **b) Troca as definições de lugar:** "Conceito mais amplo, que pode ser um chá ou uma psicoterapia" é a definição de remédio. Medicação é o ato de medicar; "fármaco tecnologicamente modificado" descreve o medicamento.
• **c) Define droga, e chama de medicamento:** "Qualquer substância que altere o estado fisiológico, com ou sem finalidade terapêutica, como o fumo ou o álcool" é exatamente a definição de droga. O medicamento tem, por definição, finalidade terapêutica e elaboração técnica.
• **d) Define medicamento, e chama de remédio:** "Produto farmacêutico tecnicamente elaborado, com fármaco e excipientes em forma farmacêutica" é medicamento. Remédio é o termo mais abrangente e não exige composição farmacêutica.

**ERRO-ARMADILHA**
A banca não erra os conceitos: ela troca as etiquetas. Em quatro das cinco alternativas a descrição está correta — só que atribuída ao termo errado. A técnica de prova é ler cada alternativa perguntando "de que termo essa definição é, de verdade?" antes de julgar certo/errado.`
  },

  // QUESTÃO 9 (Valor: 0,50)
  {
    type: "MÚLTIPLA ESCOLHA",
    text: `Um pesquisador estuda um fármaco que, ao se ligar a determinado receptor acoplado à proteína G, reduz sua atividade basal mesmo na ausência de ligante endógeno. Em modelos experimentais, observa-se que esse fármaco produz efeito oposto ao agonista pleno e não apenas bloqueia sua ação. Com base nesses achados e nos princípios de farmacodinâmica, assinale a alternativa correta:`,
    interactionType: "multiple-choice",
    options: [
      "A) O fármaco descrito é um antagonista competitivo, pois impede a ligação do agonista sem alterar a atividade constitutiva do receptor.",
      "B) O fármaco atua como agonista parcial, pois reduz a resposta máxima do agonista pleno ao competir pelo mesmo sítio de ligação.",
      "C) A redução da atividade basal indica dessensibilização do receptor mediada por fosforilação, sendo independente da ligação do fármaco.",
      "D) O efeito observado sugere que o receptor apresenta atividade constitutiva e que o fármaco atua como agonista inverso, estabilizando a conformação inativa do receptor.",
      "E) O fármaco aumenta a afinidade do receptor pelo ligante endógeno, levando à diminuição paradoxal da resposta celular."
    ],
    gabarito: `**Alternativa D**

${FIGURA_3_SVG}

**RACIOCÍNIO PADRÃO-OURO — O MODELO DE DOIS ESTADOS**
Muitos GPCRs oscilam espontaneamente entre uma conformação inativa (R) e uma ativa (R*), mesmo sem ligante. A fração que está em R* gera a atividade constitutiva (basal) do sistema. O que cada classe de ligante faz é deslocar esse equilíbrio:
• **Agonista pleno (α = 1):** Estabiliza fortemente R* → resposta máxima
• **Agonista parcial (0 < α < 1):** Estabiliza R* parcialmente → resposta submáxima, no mesmo sentido
• **Antagonista neutro (α = 0):** Liga-se sem preferência por R ou R* → mantém a atividade basal e bloqueia o agonista
• **Agonista inverso (α < 0):** Estabiliza R → resposta cai abaixo do basal (efeito oposto ao do agonista)

O enunciado descreve exatamente as duas assinaturas do agonismo inverso:
1) reduz a atividade basal na ausência do ligante endógeno — logo não é bloqueio de agonista;
2) produz efeito oposto ao do agonista pleno — logo não é simples ausência de efeito.

**POR QUE CADA ALTERNATIVA ERRADA ESTÁ ERRADA**
• **a) O antagonista competitivo é "silencioso":** Ele ocupa o sítio e impede o agonista, mas não altera a atividade constitutiva — a própria alternativa diz isso, o que a torna incompatível com o achado do enunciado (houve redução do basal).
• **b) Confunde direção com magnitude:** O agonista parcial produz resposta submáxima no mesmo sentido do agonista pleno; nunca efeito oposto. (Ele pode se comportar como antagonista na presença de um agonista pleno, mas isso não gera resposta abaixo do basal.)
• **c) Dessensibilização é outro fenômeno, com outra cinética:** Depende de ativação prévia pelo agonista, é mediada por GRK e β-arrestina com internalização do receptor, e se instala ao longo do tempo de exposição. A própria alternativa se autodestrói ao dizer "independente da ligação do fármaco", quando o enunciado afirma que o efeito ocorre ao se ligar.
• **e) Descreve modulação alostérica positiva — e com desfecho invertido:** Aumentar a afinidade pelo ligante endógeno aumentaria a resposta (é o que os benzodiazepínicos fazem no GABAA — vide Q.10), jamais a reduziria.

**OURO DE PROVA — AGONISTAS INVERSOS QUE VOCÊ JÁ PRESCREVE**
• **Anti-histamínicos H1 (loratadina, cetirizina, difenidramina):** o receptor H1 tem atividade constitutiva relevante; esses fármacos são, em rigor, agonistas inversos e não meros "bloqueadores".
• **Betabloqueadores como propranolol, metoprolol e carvedilol** têm agonismo inverso em β — enquanto o pindolol tem atividade simpaticomimética intrínseca (agonista parcial).
• **Naloxona** comporta-se como antagonista neutro no indivíduo virgem de opioide, mas revela agonismo inverso em receptores µ constitutivamente ativados pelo uso crônico — uma das explicações para a intensidade da abstinência precipitada.
• **Significado prático:** a existência do agonismo inverso só é detectável em sistemas com atividade constitutiva mensurável. Sem basal, agonista inverso e antagonista neutro são clinicamente indistinguíveis.`
  },

  // QUESTÃO 10 (Valor: 1,00)
  {
    type: "MÚLTIPLA ESCOLHA",
    text: `Um paciente de 68 anos é admitido no pronto-socorro com rebaixamento do nível de consciência, hipercapnia e depressão respiratória leve após uso inadvertido de altas doses de diazepam. Considerando a farmacodinâmica do diazepam e a ação do flumazenil, assinale a alternativa correta:`,
    interactionType: "multiple-choice",
    options: [
      "A) O flumazenil é um antagonista competitivo dos benzodiazepínicos no receptor GABAA, revertendo os efeitos do diazepam sem interferir diretamente na ligação do GABA.",
      "B) O diazepam reduz a excitabilidade neuronal por inibição direta dos receptores NMDA, sendo revertido pelo flumazenil por antagonismo indireto desses receptores.",
      "C) O flumazenil possui atividade agonista parcial no receptor GABAA, sendo capaz de produzir sedação leve ao deslocar o diazepam.",
      "D) O diazepam aumenta a duração de abertura do canal de cloro do receptor GABAA, enquanto o flumazenil bloqueia o canal de cloro de forma não competitiva.",
      "E) O diazepam atua como agonista direto do receptor GABAA, aumentando a frequência de abertura do canal de cloro independentemente da presença de GABA, enquanto o flumazenil reduz a afinidade do GABA pelo receptor."
    ],
    gabarito: `**Alternativa A**

**RACIOCÍNIO PADRÃO-OURO — O RECEPTOR GABAA TEM SÍTIOS DIFERENTES**
O GABAA é um canal iônico ligante-dependente (ionotrópico), pentamérico (tipicamente 2α-2β-1γ), permeável ao cloreto. Sua abertura hiperpolariza o neurônio e reduz a excitabilidade. Há sítios de ligação distintos no mesmo receptor:
• **GABA (endógeno):** Interface β/α (sítio ortostérico) → Abre o canal — é o agonista do receptor
• **Benzodiazepínicos (diazepam):** Interface α/γ2 — sítio benzodiazepínico → Modulação alostérica positiva: ↑ FREQUÊNCIA de abertura. Exige GABA presente — sozinho não abre nada
• **Barbitúricos:** Sítio próprio, na subunidade β → ↑ DURAÇÃO de abertura e, em doses altas, abrem o canal diretamente, sem GABA
• **Flumazenil:** Mesmo sítio benzodiazepínico → Antagonista competitivo: ocupa o sítio sem modular; desloca o diazepam e não interfere na ligação do GABA

É exatamente isso que a alternativa a) afirma, palavra por palavra — antagonismo competitivo no sítio benzodiazepínico, com preservação da ligação do GABA ao seu próprio sítio.

**POR QUE CADA ALTERNATIVA ERRADA ESTÁ ERRADA**
• **b) Troca o receptor:** Diazepam não age em NMDA (esse é o alvo da cetamina, Q.11) e o flumazenil não tem qualquer antagonismo, direto ou "indireto", sobre NMDA.
• **c) Atribui atividade intrínseca a um antagonista:** O flumazenil é essencialmente desprovido de atividade intrínseca no sítio BZD (α ≈ 0) — não seda, não ansiolisa. Se sedasse, seria inútil como antídoto.
• **d) Erra nas duas metades:** (i) Quem aumenta a duração de abertura é o barbitúrico; o benzodiazepínico aumenta a frequência. (ii) O flumazenil não bloqueia o canal de cloro — ele compete pelo sítio benzodiazepínico, o que é antagonismo competitivo, não bloqueio de poro.
• **e) Dupla inversão:** (i) O benzodiazepínico não é agonista direto e depende da presença de GABA — é modulador alostérico positivo; quem age independentemente do GABA, em dose alta, é o barbitúrico. (ii) O flumazenil não reduz a afinidade do GABA: age em sítio distinto do sítio do GABA.

**OURO DE PROVA — POR QUE O BENZODIAZEPÍNICO É MAIS SEGURO QUE O BARBITÚRICO**
Porque o benzodiazepínico tem teto de efeito: como apenas modula a resposta ao GABA, seu efeito máximo é limitado pela quantidade de GABA disponível. O barbitúrico, ao abrir o canal diretamente em doses altas, não tem teto — daí a depressão respiratória fatal e o abandono clínico. É também por isso que a intoxicação por benzodiazepínico puro costuma cursar com depressão respiratória leve e hipercapnia, como descrito no enunciado.

**PÉROLAS CLÍNICAS DO FLUMAZENIL**
• **Dose:** 0,2 mg IV em 15–30 s, repetindo a cada minuto até 1–3 mg conforme a resposta.
• **Meia-vida curta (≈ 1 h), menor que a do diazepam (20–100 h, com metabólito ativo desmetildiazepam) → risco real de ressedação:** o paciente precisa ser monitorado, eventualmente com infusão contínua. Mesmo princípio da naloxona na Q.7.
• **Cuidados:** pode precipitar convulsão em usuário crônico de benzodiazepínico (abstinência aguda) e em intoxicação mista com antidepressivo tricíclico — nessas situações, prioriza-se suporte ventilatório sobre o antídoto.
• **No idoso (como o da questão):** meia-vida do diazepam prolongada, maior fração livre e maior sensibilidade do SNC — motivo pelo qual benzodiazepínicos de meia-vida longa estão nos critérios de Beers.`
  },

  // QUESTÃO 11 (Valor: 1,00)
  {
    type: "MÚLTIPLA ESCOLHA",
    text: `Um paciente politraumatizado é submetido à indução anestésica com cetamina em ambiente de emergência. Durante o procedimento, observa-se manutenção dos reflexos de via aérea, aumento de pressão arterial e frequência cardíaca, além de estado dissociativo. Com base na farmacodinâmica da cetamina, assinale a alternativa correta:`,
    interactionType: "multiple-choice",
    options: [
      "A) A cetamina atua como agonista dos receptores GABAA, promovendo hiperpolarização neuronal difusa e depressão do sistema nervoso central semelhante aos benzodiazepínicos.",
      "B) A cetamina exerce seu principal efeito por antagonismo não competitivo dos receptores NMDA, reduzindo a excitotoxicidade mediada pelo glutamato.",
      "C) A cetamina é um antagonista competitivo dos receptores µ-opioides, sendo sua ação analgésica dependente da inibição da substância P na medula espinhal.",
      "D) A cetamina reduz a atividade simpática central, levando à hipotensão e bradicardia, especialmente em pacientes hipovolêmicos.",
      "E) A cetamina atua predominantemente por bloqueio dos canais de sódio voltagem-dependentes, sendo classificada como anestésico local sistêmico."
    ],
    gabarito: `**Alternativa B**

**RACIOCÍNIO PADRÃO-OURO**
A cetamina é o protótipo do antagonista não competitivo do receptor NMDA. Ela se liga dentro do poro do canal já aberto (o mesmo sítio da fenciclidina e do Mg²⁺ — por isso é chamada de open-channel blocker, com bloqueio uso-dependente). Como não disputa o sítio do glutamato, o antagonismo é insuperável: aumentar glutamato não reverte o bloqueio — exatamente a assinatura gráfica de queda do Emáx mostrada na Figura 3.

O bloqueio NMDA no córtex e no sistema talamocortical, com ativação relativa do sistema límbico, produz a anestesia dissociativa: o paciente parece desconectado do ambiente, com olhos abertos, reflexos de via aérea e drive respiratório preservados e analgesia potente.
Clinicamente, reduzir a ativação NMDA também combate a excitotoxicidade glutamatérgica, o fenômeno de wind-up e a hiperalgesia — base do uso da cetamina em doses subanestésicas para dor crônica e refratária.

**POR QUE CADA ALTERNATIVA ERRADA ESTÁ ERRADA**
• **a) Troca o alvo:** Agonismo/modulação positiva em GABAA é o mecanismo de benzodiazepínicos, propofol, etomidato e barbitúricos. A cetamina age no glutamato, não no GABA — é por isso que ela não deprime o drive respiratório como os demais indutores.
• **c) Inventa o mecanismo analgésico:** A cetamina não é antagonista competitivo de receptores µ (ela tem, no máximo, interações fracas com o sistema opioide); sua analgesia decorre do bloqueio NMDA. Inibição da liberação de substância P na medula é, aliás, mecanismo opioide (vide Q.7).
• **d) É o oposto exato — e o próprio enunciado já entrega a resposta:** A cetamina estimula o tônus simpático (inibe a recaptação neuronal de catecolaminas) → ↑ PA, ↑ FC, broncodilatação. O enunciado descreve "aumento de pressão arterial e frequência cardíaca": aceitar a alternativa d) seria contradizer o caso clínico.
• **e) Troca a classe farmacológica:** Bloqueio de canais de sódio voltagem-dependentes é o mecanismo dos anestésicos locais (lidocaína, bupivacaína) e de antiarrítmicos classe I. A cetamina é um anestésico geral dissociativo.

**PÉROLAS CLÍNICAS**
• **Indicações de escolha:** indução em choque/instabilidade hemodinâmica (por não deprimir — e até elevar — a PA) e em broncoespasmo/asma grave (broncodilatação). Dose de indução 1–2 mg/kg IV ou 4–5 mg/kg IM.
• **Ressalva importante:** em paciente com depleção catecolaminérgica (choque prolongado, uso crônico de catecolaminas), o efeito simpaticomimético indireto falha e prevalece a depressão miocárdica direta → pode haver hipotensão. Essa é a única circunstância em que a "ideia" da alternativa d) tem algum fundo de verdade — e não é o cenário descrito.
• **Efeitos adversos:** fenômenos psicomiméticos na emergência anestésica (alucinações, delírio), prevenidos com benzodiazepínico; hipersalivação (antissialagogo); nistagmo; aumento do consumo miocárdico de O₂ (cautela em coronariopata).
• **Contexto atual:** a escetamina intranasal, pelo mesmo bloqueio NMDA, é aprovada para depressão resistente ao tratamento, com efeito antidepressivo em horas.`
  }
];
