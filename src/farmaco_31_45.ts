export const farmaco_31_45 = [
{ type: "MÚLTIPLA ESCOLHA", text: `A farmacodinâmica estuda os mecanismos de ação dos fármacos e seus efeitos. Sobre a interação fármaco-receptor, assinale a alternativa CORRETA.`, interactionType: "multiple-choice", options: [
"A) Afinidade é a capacidade de um fármaco de produzir o efeito máximo após ligar-se ao receptor.",
"B) Eficácia intrínseca é a capacidade do fármaco de ligar-se fortemente ao receptor.",
"C) Um agonista total possui alta afinidade e eficácia intrínseca igual a 1 (máxima).",
"D) Receptores farmacológicos são invariavelmente enzimas circulantes no plasma.",
"E) A ligação entre fármaco e receptor é sempre mediada por ligações covalentes irreversíveis."
], gabarito: `**Alternativa C**

**Por que C está certa:** os dois pilares da interação droga-receptor são afinidade e eficácia. O agonista total (ou pleno) é aquele que consegue se encaixar no receptor (tem afinidade) e, uma vez encaixado, ativa o receptor ao máximo, gerando 100% do efeito possível (eficácia intrínseca = 1).
**A — ERRADA.** Isso é eficácia. Afinidade é apenas a capacidade de *ligação* química (encaixe), independentemente de gerar efeito ou não.
**B — ERRADA.** A capacidade de ligar-se fortemente é afinidade. Eficácia intrínseca é a capacidade de, *após ligado*, gerar a mudança conformacional que ativa o receptor.
**D — ERRADA.** Receptores são macrómoléculas (geralmente proteínas), na maioria transmembrana (ligados a proteína G, canais iônicos) ou intracelulares, e não apenas enzimas no plasma.
**E — ERRADA.** A grande maioria das ligações fármaco-receptor é *reversível* (pontes de hidrogênio, iônicas, van der Waals). Ligações covalentes irreversíveis são exceção (ex.: AAS na COX-1, omeprazol na bomba de prótons).` },
{ type: "MÚLTIPLA ESCOLHA", text: `Considere dois analgésicos: a morfina (agonista total dos receptores opioides) e a buprenorfina (agonista parcial). Um paciente com dor intensa recebe morfina e obtém alívio. Algumas horas depois, equivocadamente, um colega administra buprenorfina ao mesmo paciente. Qual o provável resultado clínico dessa interação e qual conceito farmacodinâmico a explica?`, interactionType: "multiple-choice", options: [
"A) Aumento drástico da analgesia e parada respiratória, devido ao sinergismo de soma entre dois agonistas.",
"B) Redução da analgesia ou até precipitação de síndrome de abstinência, pois o agonista parcial compete pelo receptor e funciona como antagonista na presença do agonista total.",
"C) Efeito inalterado, pois a buprenorfina não tem afinidade pelos receptores ocupados pela morfina.",
"D) A buprenorfina induzirá o metabolismo da morfina, caracterizando um antagonismo farmacocinético.",
"E) Haverá potencialização recíproca por atuarem em receptores diferentes."
], gabarito: `**Alternativa B**

**Por que B está certa:** é a pegadinha clássica do agonista parcial. Um agonista parcial (buprenorfina) tem alta afinidade, mas baixa eficácia (só consegue ativar o receptor até um teto, digamos 40%). Se o receptor está vazio, ele age como agonista (dá 40% de efeito). Mas se o receptor já está ocupado por um agonista total (morfina, que dá 100% de efeito), a buprenorfina "chuta" a morfina do receptor (competição) para assumir o lugar. O efeito cai de 100% para 40%. Na prática, o agonista parcial atua como um *antagonista* frente ao agonista total, cortando o efeito analgésico e precipitando abstinência.
**A — ERRADA.** Eles não somam. A buprenorfina tem um teto de efeito menor e rouba o lugar da morfina.
**C — ERRADA.** Eles competem exatamente pelo mesmo receptor (receptores *mi*).
**D — ERRADA.** A interação é pura competição pelo receptor (farmacodinâmica), não há indução hepática envolvida na falha aguda.
**E — ERRADA.** Atuam no mesmo receptor.` },
{ type: "MÚLTIPLA ESCOLHA", text: `Considere a curva dose-resposta da heparina (anticoagulante) e da varfarina. Sabe-se que, em caso de sangramento por superdose de heparina, administra-se sulfato de protamina, uma molécula básica que se liga fortemente à heparina (ácida) na corrente sanguínea, formando um complexo inativo que é excretado, revertendo a hemorragia sem sequer tocar nos receptores de coagulação. O sulfato de protamina atua por meio de um:`, interactionType: "multiple-choice", options: [
"A) Antagonismo fisiológico.",
"B) Antagonismo farmacocinético.",
"C) Antagonismo químico.",
"D) Antagonismo farmacológico irreversível.",
"E) Agonismo parcial."
], gabarito: `**Alternativa C**

**Por que C está certa:** Antagonismo químico é o choque direto entre duas substâncias. Elas reagem quimicamente entre si no plasma ou no estômago, neutralizando-se, sem nenhum envolvimento de receptores celulares. A protamina anula a heparina por atração de cargas elétricas. Outro exemplo clássico de antagonismo químico é o uso de antiácidos (hidróxido de alumínio) neutralizando o ácido clorídrico no estômago.
**A — ERRADA.** Fisiológico seria usar drogas em receptores diferentes gerando efeitos opostos.
**B — ERRADA.** Farmacocinético seria se a protamina acelerasse o metabolismo hepático da heparina.
**D — ERRADA.** Não há interação com os receptores (enzimas) da heparina; o sequestro ocorre livremente no sangue.` },
{ type: "MÚLTIPLA ESCOLHA", text: `O receptor GABA-A é um canal iônico de cloreto que, quando ativado pelo GABA (agonista endógeno), inibe o neurônio. Os benzodiazepínicos (ex.: diazepam) ligam-se a um sítio diferente no mesmo receptor, mas não conseguem abri-lo sozinhos. Eles apenas "ajudam" o GABA, fazendo com que o canal se abra com mais frequência quando o GABA está presente. Qual é a correta classificação farmacodinâmica do diazepam neste cenário?`, interactionType: "multiple-choice", options: [
"A) Agonista total.",
"B) Antagonista competitivo reversível.",
"C) Modulador alostérico positivo.",
"D) Agonista parcial.",
"E) Modulador alostérico negativo."
], gabarito: `**Alternativa C**

**Por que C está certa:** "Alostérico" significa "em outro lugar" (do grego *allos* = outro, *stereos* = local). Quando uma droga se liga num sítio diferente do sítio principal (sítio ortostérico, onde o GABA se liga), ela não compete. A ligação dela apenas muda a forma do receptor de um jeito que ajuda ("positivo") ou atrapalha ("negativo") o ligante principal. O diazepam é um modulador alostérico positivo: ele sozinho não tem força para abrir a porta, mas quando o GABA tenta abrir, o diazepam "empurra" junto, potencializando a inibição.
**A — ERRADA.** Agonista total se ligaria no sítio principal e abriria o canal sozinho.
**B — ERRADA.** Antagonista bloquearia a ação do GABA.
**D — ERRADA.** Agonista parcial abriria o canal sozinho, mas só até a metade do máximo.
**E — ERRADA.** Modulador negativo (ex.: flumazenil em certas situações, ou beta-carbolinas) dificultaria o trabalho do GABA, gerando ansiedade e convulsão.` },
{ type: "MÚLTIPLA ESCOLHA", text: `Ao comparar a ação de dois fármacos (Fármaco A e Fármaco B) em um laboratório, observa-se que, na presença do Fármaco B, a curva dose-resposta do Fármaco A é deslocada para a direita, sem que haja diminuição do seu efeito máximo. O efeito máximo do Fármaco A só é atingido mediante o aumento significativo de sua dose. Assinale a alternativa que classifica corretamente o Fármaco B.`, interactionType: "multiple-choice", options: [
"A) Agonista parcial.",
"B) Antagonista não competitivo.",
"C) Antagonista fisiológico.",
"D) Antagonista competitivo reversível.",
"E) Modulador alostérico negativo."
], gabarito: `**Alternativa D**

**Por que D está certa:** esta é a assinatura gráfica da competição reversível. Imagine o jogo das cadeiras. O Fármaco B (antagonista) ocupa a cadeira (receptor). Mas a ligação é reversível ("solta-fácil"). Se você inundar a sala com uma quantidade brutal do Fármaco A (agonista), a lei de ação das massas prevalece: por pura superioridade numérica, o Fármaco A expulsa o B, assume todos os receptores e atinge o efeito máximo original (100%). Por isso a curva desloca para a direita (precisa de mais dose do A), mas não achata (o teto continua 100%).
**A — ERRADA.** O agonista parcial achata o teto da resposta do agonista pleno.
**B e E — ERRADAS.** No antagonismo não competitivo (ou no bloqueio alostérico irreversível), o antagonista gruda e não solta, ou amassa a cadeira. Não importa o quanto você aumente a dose do Fármaco A, ele nunca conseguirá usar as cadeiras quebradas. A curva desloca para a direita e *achata* o efeito máximo.
**C — ERRADA.** Fisiológico envolveria sistemas/receptores paralelos opostos, a resposta matemática no gráfico é mais complexa e reduz o efeito máximo global.` },
{ type: "DISCURSIVA", text: `a. Diferencie Afinidade de Eficácia Intrínseca no contexto da interação droga-receptor.
b. Classifique os fármacos abaixo de acordo com sua Eficácia Intrínseca (E): Agonista Total, Agonista Parcial e Antagonista.
c. Explique, com base na ocupação de receptores, por que um antagonista competitivo pode ser superado pelo aumento da dose do agonista, mas um antagonista não competitivo não pode.`, interactionType: "textarea", gabarito: `**(a) Afinidade × Eficácia.** Afinidade é a probabilidade e a força com que o fármaco reconhece e se liga ao seu sítio no receptor (o "encaixe da chave"). Eficácia intrínseca é a capacidade de o fármaco, *uma vez ligado*, alterar a conformação do receptor e desencadear a resposta celular (o "girar a fechadura").
**(b) Classificação por eficácia.**
- Agonista Total: possui afinidade e eficácia máxima (E = 1 ou 100%).
- Agonista Parcial: possui afinidade e eficácia intermediária (0 < E < 1).
- Antagonista: possui afinidade (liga-se perfeitamente), mas eficácia nula (E = 0). Ocupa o espaço, mas não aciona o mecanismo.
**(c) Competitivo × Não competitivo.** No antagonismo competitivo (reversível), ambos disputam o *mesmo* sítio de ligação de forma não covalente. O aumento extremo da concentração do agonista faz com que ele desbanque o antagonista por lei de ação das massas, restaurando o efeito máximo (a curva vai para a direita, sem cair). No não competitivo, o antagonista se liga irreversivelmente (covalente) ao sítio principal ou liga-se a um sítio alostérico, inativando o receptor de forma permanente para aquela interação. Aumentar a dose do agonista é inútil, pois a "fechadura" está quebrada ou deformada, reduzindo o efeito máximo irremediavelmente (a curva cai/achata).` }
];
