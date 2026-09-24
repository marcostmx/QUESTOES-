# scripts/generate_renal_dig.py
import json

renal_dig_questions = [
  # 137
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a mecânica da filtração glomerular e a integridade da barreira, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) A barreira de filtração é formada por endotélio fenestrado, membrana basal glomerular e podócitos com seus pedicelos.",
      "B) A membrana basal contém proteoglicanos ricos em sulfato de heparana, com carga negativa, que repelem macromoléculas aniônicas como a albumina.",
      "C) A taxa de filtração glomerular depende da pressão hidrostática intracapilar e da pressão oncótica plasmática.",
      "D) A constrição da arteríola eferente tende a aumentar a pressão hidrostática intraglomerular e a taxa de filtração.",
      "E) A presença de albuminúria maciça reflete apenas aumento do fluxo renal, sem lesão estrutural ou elétrica da barreira."
    ],
    "gabarito": "**Alternativa E** — A presença de albuminúria maciça reflete apenas aumento do fluxo renal, sem lesão estrutural ou elétrica da barreira.\n\nA barreira íntegra restringe a albumina por tamanho e carga. Albuminúria maciça (> 3,5 g/dia) exige perda da seletividade de carga ou lesão podocitária — como no apagamento dos pedicelos da lesão mínima ou na esclerose focal.\n\n• A) Correto — as três camadas da barreira.\n• B) Correto — seletividade de carga.\n• C) Correto — forças de Starling no glomérulo.\n• D) Correto — mecanismo mediado por angiotensina II.\n\nRevisar: Filtração glomerular · barreira e forças de Starling"
  },
  # 138
  {
    "type": "ASSOCIAÇÃO",
    "text": "Associe cada segmento do néfron à sua função fisiológica predominante:\n\n1. Túbulo contorcido proximal\n2. Alça de Henle (ramo ascendente espesso)\n3. Túbulo contorcido distal\n4. Ducto coletor cortical\n5. Ducto coletor medular\n\n( ) Reabsorção da maior parte da água, glicose, aminoácidos e bicarbonato filtrados.\n( ) Cotransporte Na⁺-K⁺-2Cl⁻ gerando gradiente medular hipertônico; impermeável à água.\n( ) Reabsorção de cloreto de sódio via cotransportador Na⁺-Cl⁻; sítio dos tiazídicos.\n( ) Ação da aldosterona reabsorvendo Na⁺ e secretando K⁺ e H⁺.\n( ) Ação do ADH inserindo aquaporinas-2 para reabsorção de água livre.",
    "interactionType": "textarea",
    "gabarito": "**Sequência: 1 – 2 – 3 – 4 – 5**\n\n• 1) Túbulo contorcido proximal: Reabsorve ~65% do sódio e da água, e 100% de glicose e aminoácidos.\n• 2) Alça de Henle: É o sítio de ação dos diuréticos de alça (furosemida) e o motor do mecanismo contracorrente.\n• 3) Túbulo contorcido distal: Reabsorção fina de NaCl; sítio dos tiazídicos.\n• 4) Ducto coletor cortical: Células principais (alvo da aldosterona e espironolactona) e intercaladas (equilíbrio ácido-base).\n• 5) Ducto coletor medular: Responde ao ADH, permitindo urina concentrada ou diluída conforme a necessidade.\n\nRevisar: Fisiologia tubular renal"
  },
  # 139
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Na diferenciação entre injúria renal aguda pré-renal e necrose tubular aguda (NTA), espera-se encontrar na pré-renal:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Sódio urinário > 40 mEq/L e fração de excreção de sódio > 2%.",
      "B) Sódio urinário < 20 mEq/L, fração de excreção de sódio < 1% e osmolaridade urinária elevada.",
      "C) Cilindros granulosos densos (marrons) no sedimento urinário.",
      "D) Relação ureia/creatinina sérica < 10."
    ],
    "gabarito": "**Alternativa B** — Sódio urinário < 20 mEq/L, fração de excreção de sódio < 1% e osmolaridade urinária elevada.\n\nNa pré-renal o parênquima está íntegro: os túbulos respondem à hipoperfusão reabsorvendo avidamente sódio e água sob estímulo de aldosterona e ADH. Na NTA o epitélio lesado perde a capacidade de reabsorver e concentrar.\n\n• A) Padrão típico da NTA estabelecida.\n• C) Achado patognomônico de NTA.\n• D) Na pré-renal a relação ureia/creatinina sobe (> 20), pois a ureia é reabsorvida junto à água.\n\nRevisar: Injúria renal aguda · pré-renal × intrínseca"
  },
  # 140
  {
    "type": "CASO CLÍNICO DISSERTATIVO",
    "text": "Homem de 72 anos, hipertenso em uso crônico de enalapril e hidroclorotiazida, apresenta diarreia e vômitos há três dias, com ingesta hídrica mínima. Por dor lombar, fez uso de diclofenaco por conta própria. Ao exame: letárgico, mucosas muito secas, turgor diminuído, PA 85/50 mmHg, FC 110 bpm. Exames: creatinina 3,8 mg/dL (basal de 1,0), ureia 140 mg/dL, K⁺ 5,8 mEq/L. Sedimento com cilindros hialinos esparsos, Na⁺ urinário 12 mEq/L.\n\na) Qual a etiologia e classificação da injúria renal?\nb) Explique a influência do enalapril e do diclofenaco na hemodinâmica intraglomerular desse paciente.\nc) Explique a relação ureia/creatinina muito elevada e o sódio urinário baixo.\nd) Qual a conduta inicial prioritária?",
    "interactionType": "textarea",
    "gabarito": "**Resposta-modelo:**\n\na) **Etiologia e classificação:** Injúria renal aguda pré-renal grave por desidratação (hipovolemia) associada a bloqueio farmacológico da autorregulação renal.\n\nb) **Influência dos fármacos na hemodinâmica glomerular:** Fisiologicamente, sob hipoperfusão, a arteríola aferente dilata via prostaglandinas para manter o fluxo, e a eferente constringe via angiotensina II para manter a pressão de filtração. O diclofenaco (AINE) inibe a síntese de prostaglandinas e bloqueia a dilatação da aferente. O enalapril (IECA) bloqueia a síntese de angiotensina II e impede a vasoconstrição da eferente. Sem dilatar a entrada e sem fechar a saída, a pressão intraglomerular desaba e a taxa de filtração cessa.\n\nc) **Ureia/creatinina e Na⁺ urinário:** O túbulo proximal reabsorve água e ureia avidamente sob hipovolemia, elevando a ureia sérica desproporcionalmente à creatinina (> 20:1). O sódio urinário baixo (< 20 mEq/L) e os cilindros apenas hialinos confirmam túbulos íntegros trabalhando em capacidade máxima de reabsorção.\n\nd) **Conduta prioritária:** Expansão volêmica vigorosa com cristaloides isotônicos e suspensão imediata do enalapril, do diurético e do AINE. Se a perfusão for restaurada rapidamente, a lesão é reversível antes de evoluir para NTA isquêmica.\n\nRevisar: Injúria renal pré-renal · autorregulação glomerular e nefrotóxicos"
  },
  # 141
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre as síndromes nefrítica e nefrótica, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) A síndrome nefrítica caracteriza-se por inflamação glomerular com hematúria (cilindros hemáticos), hipertensão, edema moderado e oligúria.",
      "B) A síndrome nefrótica define-se por proteinúria maciça (> 3,5 g/24 h), hipoalbuminemia, edema volumoso e dislipidemia.",
      "C) Na síndrome nefrítica a glomerulonefrite pós-estreptocócica é o exemplo clássico mediado por imunocomplexos.",
      "D) Pacientes nefróticos têm risco aumentado de fenômenos tromboembólicos por perda urinária de anticoagulantes naturais (antitrombina III).",
      "E) A hematúria dismórfica com cilindros hemáticos é o achado urinário definidor da síndrome nefrótica pura."
    ],
    "gabarito": "**Alternativa E** — A hematúria dismórfica com cilindros hemáticos é o achado urinário definidor da síndrome nefrótica pura.\n\nHematúria glomerular dismórfica e cilindros hemáticos são típicos da síndrome nefrítica (inflamação e ruptura de alça capilar). A nefrótica pura cursa com proteinúria pesada e cilindros graxos/lipidúria, sem hematúria significativa.\n\n• A) Correto — tétrade nefrítica clássica.\n• B) Correto — critérios definidores de síndrome nefrótica.\n• C) Correto — depósito de imunocomplexos subepiteliais (gibas).\n• D) Correto — trombose de veia renal e TEP são riscos reais.\n\nRevisar: Síndromes glomerulares · nefrítica × nefrótica"
  },
  # 142
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "O mecanismo fisiopatológico primário do edema na síndrome nefrótica grave envolve:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Aumento isolado da permeabilidade capilar sistêmica por citocinas inflamatórias.",
      "B) Queda da pressão oncótica plasmática pela hipoalbuminemia (underfill) somada à retenção primária de sódio e água no ducto coletor (overfill).",
      "C) Vasoconstrição linfática generalizada.",
      "D) Insuficiência ventricular esquerda congestiva concomitante obrigatória."
    ],
    "gabarito": "**Alternativa B** — Queda da pressão oncótica plasmática pela hipoalbuminemia (underfill) somada à retenção primária de sódio e água no ducto coletor (overfill).\n\nHistoricamente explicava-se pelo underfill (Starling: menos proteína no capilar = extravasamento para o interstício e hipovolemia relativa ativando SRAA). Hoje se sabe que o overfill (ativação direta de canais ENaC na luz do coletor por proteases na urina filtrada) também tem papel determinante.\n\n• A) Descreve o choque séptico ou anafilaxia.\n• C) Não é o mecanismo da nefrótica.\n• D) O coração costuma estar estruturalmente são.\n\nRevisar: Fisiopatologia do edema nefrótico"
  },
  # 143
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a fisiopatologia da doença renal crônica (DRC), assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) A perda inicial de néfrons leva a hipertrofia e hiperfiltração compensatórias nos néfrons remanescentes.",
      "B) A hiperfiltração crônica eleva a pressão intraglomerular, promovendo estresse mecânico, proteinúria e esclerose progressiva dos néfrons sobreviventes.",
      "C) A hipertensão intraglomerular é mediada em grande parte pela angiotensina II.",
      "D) O bloqueio do sistema renina-angiotensina retarda a progressão da DRC por reduzir a pressão intraglomerular e a proteinúria.",
      "E) A redução do número de néfrons é sempre acompanhada de regeneração tubular completa sem cicatrização fibrosa."
    ],
    "gabarito": "**Alternativa E** — A redução do número de néfrons é sempre acompanhada de regeneração tubular completa sem cicatrização fibrosa.\n\nNéfrons perdidos na DRC não se regeneram: a resposta do rim à lesão sustentada é a substituição do tecido nobre por fibrose intersticial e glomeruloesclerose — caminho comum e irreversível para a falência renal.\n\n• A) Correto — teoria dos néfrons remanescentes (Brenner).\n• B) Correto — o mecanismo adaptativo vira o motor da lesão crônica.\n• C) Correto — via vasoconstrição da arteríola eferente.\n• D) Correto — pilar do tratamento antiproteinúrico.\n\nRevisar: Doença renal crônica · mecanismos de progressão"
  },
  # 144
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "A anemia que se instala habitualmente a partir do estágio 3 da doença renal crônica decorre principalmente de:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Perda urinária crônica de hemoglobina.",
      "B) Queda da produção de eritropoetina pelas células intersticiais peritubulares renais.",
      "C) Carência isolada de vitamina B12 por má absorção.",
      "D) Hemólise intravascular autoimune induzida pela uremia."
    ],
    "gabarito": "**Alternativa B** — Queda da produção de eritropoetina pelas células intersticiais peritubulares renais.\n\nA eritropoetina (EPO) é sintetizada nos fibroblastos intersticiais peritubulares do córtex renal. Com a destruição tecidual da DRC, a produção cai, resultando em anemia normocítica e normocrômica hipoproliferativa.\n\n• A) A perda na DRC é de albumina, não de hemácias inteiras em massa.\n• C) A carência principal associada é de ferro, não B12.\n• D) A uremia reduz a meia-vida da hemácia, mas a causa primária é o déficit de EPO.\n\nRevisar: Anemia da DRC"
  },
  # 145
  {
    "type": "VERDADEIRO OU FALSO",
    "text": "Sobre distúrbios hidroeletrolíticos e ácido-base renais, julgue os itens:\n\n( ) A hipercalemia é complicação temida da uremia porque despolariza a membrana celular miocárdica e pode causar fibrilação ventricular.\n( ) A retenção de fosfato na DRC induz hipocalcemia e estimula a secreção persistente de PTH.\n( ) Na acidose tubular renal tipo 1 (distal) há incapacidade de secretar íons H⁺ no ducto coletor, gerando urina inapropriadamente básica.\n( ) A alcalose metabólica por vômitos decorre de perda de ácido clorídrico gástrico e hipovolemia com retenção de bicarbonato pelo rim.\n( ) A hipernatremia hipovolêmica deve ser corrigida rapidamente com água destilada pura intravenosa.",
    "interactionType": "textarea",
    "gabarito": "**Sequência: V – V – V – V – F**\n\n• V) Hipercalemia: Altera o potencial de repouso e causa arritmias fatais.\n• V) Retenção de fosfato: Liga-se ao cálcio, reduz a calcemia e ativa o eixo FGF23-PTH (hiperparatireoidismo secundário).\n• V) ATR tipo 1: Células intercaladas alfa falham em secretar H⁺; pH urinário fica > 5,5 apesar da acidose sistêmica.\n• V) Vômitos: Perda de HCl gera alcalose; o rim desidratado prioriza reabsorver Na⁺ com bicarbonato para segurar volume.\n• F) Correção rápida de hipernatremia: Água destilada pura EV causa hemólise letal; além disso, corrigir hipernatremia rápido causa edema cerebral. Usa-se solução hipotônica com controle rigoroso de velocidade.\n\nRevisar: Equilíbrio hidroeletrolítico e ácido-base"
  },
  # 146
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "No eletrocardiograma de um paciente renal com potássio sérico de 7,8 mEq/L, a primeira e mais precoce alteração esperada é:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Onda T apiculada, simétrica e de base estreita ('em tenda').",
      "B) Alargamento do intervalo QT com onda U proeminente.",
      "C) Desaparecimento imediato do complexo QRS.",
      "D) Supradesnivelamento difuso do segmento ST."
    ],
    "gabarito": "**Alternativa A** — Onda T apiculada, simétrica e de base estreita ('em tenda').\n\nA hipercalemia acelera a repolarização ventricular, gerando ondas T altas e pontiagudas. Progressivamente ocorrem achatamento da onda P, alargamento do QRS, ritmo sinoventricular e fibrilação ventricular/assistolia.\n\n• B) QT longo e onda U são achados clássicos de hipocalemia.\n• C) O QRS alarga antes de se fundir com a onda T em padrão senoidal.\n• D) Sugere síndrome coronariana aguda ou pericardite.\n\nRevisar: Manifestações eletrocardiográficas da hipercalemia"
  },
  # 147
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a secreção ácida gástrica e a barreira mucosa, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) A célula parietal secreta HCl pela bomba de prótons (H⁺/K⁺-ATPase).",
      "B) Gastrina, histamina e acetilcolina estimulam a secreção ácida por vias intracelulares complementares.",
      "C) As prostaglandinas (PGE2 e PGI2) estimulam a secreção de muco e bicarbonato e aumentam o fluxo sanguíneo da mucosa.",
      "D) A somatostatina, produzida pelas células D gástricas, atua como freio fisiológico da secreção ácida.",
      "E) A histamina inibe a bomba de prótons por meio de receptores H2."
    ],
    "gabarito": "**Alternativa E** — A histamina inibe a bomba de prótons por meio de receptores H2.\n\nA histamina, liberada pelas células ECL, é o estimulador parácrino mais potente da célula parietal via receptor H2 e AMPc. Bloqueadores H2 (ex.: ranitidina) inibem a secreção ácida justamente ao antagonizar essa via.\n\n• A) Correto — alvo dos inibidores da bomba de prótons (IBPs).\n• B) Correto — três vias sinérgicas de ativação.\n• C) Correto — pilares da barreira de defesa citoprotetora.\n• D) Correto — liberada em pH luminal muito baixo para limitar a acidez.\n\nRevisar: Secreção gástrica · regulação fisiológica"
  },
  # 148
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "A bactéria Helicobacter pylori promove a formação de úlceras pépticas primariamente através de:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Invasão direta da lâmina própria com destruição isquêmica vascular.",
      "B) Produção de urease (neutralizando o ácido local), citotoxinas (CagA, VacA) e indução de resposta inflamatória com hipergastrinemia secundária.",
      "C) Estímulo à produção excessiva de somatostatina pelas células D.",
      "D) Bloqueio irreversível da bomba de prótons."
    ],
    "gabarito": "**Alternativa B** — Produção de urease (neutralizando o ácido local), citotoxinas (CagA, VacA) e indução de resposta inflamatória com hipergastrinemia secundária.\n\nA urease hidrolisa a ureia em amônia e CO₂, gerando microambiente neutro protetor para a bactéria; a inflamação antral destrói células D (menos somatostatina → desinibição das células G → hipergastrinemia e hipercloridria), lesando o epitélio duodenal e gástrico.\n\n• A) H. pylori coloniza a superfície do muco, não é tipicamente invasiva profunda.\n• C) Há redução das células D e queda da somatostatina, desinibindo o ácido.\n• D) Não inibe a bomba; leva à hiperacidez relativa ou atrofia mucosal.\n\nRevisar: Patogênese da infecção por Helicobacter pylori"
  },
  # 149
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "O mecanismo pelo qual os anti-inflamatórios não esteroides (AINEs) causam lesão e sangramento gastroduodenal é:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Estímulo direto à liberação maciça de histamina pelas células enterocromafins.",
      "B) Inibição da enzima COX-1, com bloqueio da síntese de prostaglandinas protetoras da mucosa e redução da adesão plaquetária por inibição do tromboxano.",
      "C) Vasoconstrição da artéria mesentérica superior.",
      "D) Destruição imune seletiva das células parietais."
    ],
    "gabarito": "**Alternativa B** — Inibição da enzima COX-1, com bloqueio da síntese de prostaglandinas protetoras da mucosa e redução da adesão plaquetária por inibição do tromboxano.\n\nA COX-1 constitutiva produz prostaglandinas essenciais para secreção de muco, bicarbonato e manutenção do fluxo microvascular. Ao inibir a COX-1, a barreira enfraquece; associado ao efeito antiplaquetário, o risco de úlcera sangrante aumenta expressivamente.\n\n• A) Não envolve histamina primariamente.\n• C) Descreve isquemia mesentérica oclusiva.\n• D) Descreve a gastrite atrófica autoimune.\n\nRevisar: Toxicidade gástrica por AINEs"
  },
  # 150
  {
    "type": "CASO CLÍNICO DISSERTATIVO",
    "text": "Homem de 52 anos, obeso, com queixas de pirose e regurgitação ácida há 8 anos, pior ao deitar após as refeições. Endoscopia digestiva alta revela erosões longitudinais no terço distal do esôfago e uma área de mucosa avermelhada aveludada projetando-se 4 cm acima da transição esofagogástrica. A biópsia dessa área mostra epitélio colunar com células caliciformes.\n\na) Qual a complicação diagnosticada e como se denomina essa transformação epitelial?\nb) Qual a sequência fisiopatológica que levou a essa alteração?\nc) Qual o risco clínico evolutivo dessa condição?",
    "interactionType": "textarea",
    "gabarito": "**Resposta-modelo:**\n\na) **Complicação e transformação epitelial:** Esôfago de Barrett, caracterizado por metaplasia intestinal especializada (substituição do epitélio estratificado pavimentoso original do esôfago por epitélio colunar com células caliciformes).\n\nb) **Sequência fisiopatológica:** Hipotonia do esfíncter esofágico inferior somada ao aumento da pressão intra-abdominal pela obesidade favorece refluxo gastroesofágico crônico e recorrente. O ácido gástrico e os sais biliares promovem lesão química continuada e inflamação sobre a mucosa esofágica. Em resposta à agressão persistente, as células-tronco basais se reprogramam e diferenciam em um epitélio colunar mucosecretor mais resistente à acidez — um processo metaplásico adaptativo.\n\nc) **Risco evolutivo:** O Esôfago de Barrett é uma condição pré-neoplásica com risco aumentado de progressão na cascata: displasia de baixo grau → displasia de alto grau → adenocarcinoma de esôfago distal, exigindo vigilância endoscópica periódica.\n\nRevisar: DRGE e Esôfago de Barrett"
  },
  # 151
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a diferenciação entre Retocolite Ulcerativa (RCU) e Doença de Crohn (DC), assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) A RCU restringe-se à mucosa e submucosa, acometendo o cólon de forma contínua a partir do reto.",
      "B) A DC tem acometimento transmural, podendo afetar qualquer segmento do trato digestivo da boca ao ânus em padrão descontínuo ('lesões em salto').",
      "C) Fístulas, estenoses e granulomas não caseosos são complicações e achados histológicos típicos da Doença de Crohn.",
      "D) O sangramento retal com diarreia mucossanguinolenta é manifestação proeminente e frequente na RCU.",
      "E) A inflamação na Doença de Crohn é puramente superficial e nunca ultrapassa a lâmina própria."
    ],
    "gabarito": "**Alternativa E** — A inflamação na Doença de Crohn é puramente superficial e nunca ultrapassa a lâmina própria.\n\nA marca patológica fundamental da Doença de Crohn é a inflamação transmural (todas as camadas da parede intestinal são comprometidas). Isso explica a formação de fissuras profundas, estenoses fibróticas e fístulas entero-entéricas ou enterocutâneas.\n\n• A) Correto — acometimento ascendente e contínuo da mucosa colônica.\n• B) Correto — pan-entérico e descontínuo.\n• C) Correto — granulomas são marcos anatomopatológicos da DC.\n• D) Correto — diarreia sanguinolenta é regra na proctite e colite ulcerativa.\n\nRevisar: Doenças inflamatórias intestinais · Crohn × RCU"
  },
  # 152
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Na doença celíaca, a exposição ao glúten desencadeia lesão da mucosa intestinal caracterizada por:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Hipertrofia de vilosidades intestinais com dilatação vascular submucosa.",
      "B) Reação imunomediada com infiltrado de linfócitos intraepiteliais, hiperplasia de criptas e atrofia das vilosidades no duodeno e jejuno.",
      "C) Ulcerações transmurais fibróticas com formação de fístulas perianais.",
      "D) Destruição seletiva das células beta pancreáticas."
    ],
    "gabarito": "**Alternativa B** — Reação imunomediada com infiltrado de linfócitos intraepiteliais, hiperplasia de criptas e atrofia das vilosidades no duodeno e jejuno.\n\nA fração gliadina do glúten gera resposta mediada por linfócitos T e autoanticorpos (anti-transglutaminase tecidual, anti-endomísio) em indivíduos com HLA-DQ2/DQ8. A perda das vilosidades reduz a área de absorção, desencadeando síndrome de má absorção e diarreia crônica.\n\n• A) Ocorre atrofia das vilosidades, não hipertrofia.\n• C) Descreve Doença de Crohn.\n• D) Descreve diabetes tipo 1.\n\nRevisar: Doença celíaca · patogênese e histopatologia"
  },
  # 153
  {
    "type": "ASSOCIAÇÃO",
    "text": "Associe cada tipo de diarreia ao seu respectivo mecanismo predominante:\n\n1. Osmótica\n2. Secretória\n3. Exsudativa/Inflamatória\n4. Motora\n\n( ) Presença de soluto não absorvível na luz intestinal retendo água por gradiente osmótico; cessa com o jejum.\n( ) Estimulação ativa da secreção de água e eletrólitos pelos enterócitos (ex.: toxina colérica); persiste durante o jejum.\n( ) Ruptura da integridade da mucosa com saída de muco, sangue, proteínas e pus (ex.: disenteria, colite ulcerativa).\n( ) Trânsito intestinal acelerado por neuropatia autonômica ou hipertireoidismo, reduzindo o tempo de contato absortivo.",
    "interactionType": "textarea",
    "gabarito": "**Sequência: 1 – 2 – 3 – 4**\n\n• 1) Osmótica: Típica da intolerância à lactose e do uso de laxativos salinos (gap osmótico fecal aumentado).\n• 2) Secretória: Toxinas que ativam adenilato ciclase/guanilato ciclase e tumores secretores (ex.: VIPoma); volume fecal elevado mesmo sem ingesta.\n• 3) Exsudativa: Destruição da barreira epitelial e exsudação ativa por shiguelose, amebíase ou DII.\n• 4) Motora: Síndrome do intestino irritável, hipertireoidismo ou neuropatia diabética com hiperperistaltismo.\n\nRevisar: Mecanismos fisiopatológicos das diarreias"
  },
  # 154
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a pancreatite aguda, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) É deflagrada pela ativação prematura e inadequada do tripsinogênio em tripsina no interior dos ácinos pancreáticos.",
      "B) A tripsina ativada cascateia a ativação de fosfolipases, elastases e calicreínas, gerando necrose e autodigestão.",
      "C) Litíase biliar (obstrução ampular) e etilismo agudo/crônico são as etiologias mais comuns.",
      "D) Cursa com extravasamento capilar sistêmico, hipovolemia por sequestro de líquido em terceiro espaço e resposta inflamatória sistêmica.",
      "E) O nível sérico da amilase e lipase correlaciona-se diretamente com a gravidade da necrose tecidual."
    ],
    "gabarito": "**Alternativa E** — O nível sérico da amilase e lipase correlaciona-se diretamente com a gravidade da necrose tecidual.\n\nOs níveis séricos de amilase e lipase têm valor diagnóstico (três vezes o limite superior), mas não guardam relação prognóstica com a gravidade da necrose ou da disfunção orgânica (avaliadas por escores clínicos como Ranson, APACHE-II e tomografia com Balthazar).\n\n• A) Correto — evento gatilho central da patogênese.\n• B) Correto — mecanismo de autodigestão enzimática.\n• C) Correto — responsáveis por mais de 75% dos casos.\n• D) Correto — liberação de enzimas e citocinas gera choque distributivo/hipovolêmico.\n\nRevisar: Pancreatite aguda · fisiopatologia e biomarcadores"
  },
  # 155
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Na pancreatite crônica avançada, a perda de mais de 90% da função exócrina pancreática manifesta-se clinicamente por:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Hematúria e proteinúria maciça.",
      "B) Esteatorreia com fezes volumosas, brilhantes, fétidas e deficiência de vitaminas lipossolúveis (A, D, E e K).",
      "C) Ascite com gradiente de albumina soro-ascite elevado e hepatomegalia.",
      "D) Febre alta contínua com sopro cardíaco novo."
    ],
    "gabarito": "**Alternativa B** — Esteatorreia com fezes volumosas, brilhantes, fétidas e deficiência de vitaminas lipossolúveis (A, D, E e K).\n\nA lípase pancreática é indispensável para a digestão de triglicerídeos. Sem secreção exócrina suficiente, as gorduras não são clivadas em ácidos graxos livres e não formam micelas, saindo intactas nas fezes arrastando as vitaminas lipossolúveis.\n\n• A) São manifestações de doença renal/glomerular.\n• C) Descreve hipertensão portal/cirrose.\n• D) Sugere endocardite infecciosa.\n\nRevisar: Pancreatite crônica e insuficiência exócrina"
  },
  # 156
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a hipertensão portal na cirrose hepática, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) A distorção arquitetural por fibrose e nódulos de regeneração aumenta a resistência vascular intra-hepática.",
      "B) A vasodilatação esplâncnica reflexa e o estado hiperdinâmico aumentam o influxo venoso para o sistema porta, perpetuando a hipertensão.",
      "C) O gradiente de pressão venosa hepática (GPVH) superior a 10-12 mmHg associa-se a varizes esofágicas e ascite.",
      "D) A circulação colateral portossistêmica busca aliviar a pressão porta através de veias gastroesofágicas, retais e da parede abdominal.",
      "E) A hipertensão portal decorre puramente de trombose primária da veia cava inferior em todos os pacientes cirróticos."
    ],
    "gabarito": "**Alternativa E** — A hipertensão portal decorre puramente de trombose primária da veia cava inferior em todos os pacientes cirróticos.\n\nA causa da hipertensão portal na cirrose é a resistência intra-hepática sinusoide (aumento de colágeno no espaço de Disse, endotelina e contração de miofibroblastos estelares) somada à vasodilatação esplâncnica. Trombose de cava inferior ou veias supra-hepáticas caracteriza a Síndrome de Budd-Chiari (pós-hepática).\n\n• A) Correto — componente estrutural de resistência mecânica.\n• B) Correto — mediada por óxido nítrico esplâncnico.\n• C) Correto — limiares hemodinâmicos de descompensação.\n• D) Correto — cabeça de medusa, hemorroidas e varizes esofágicas.\n\nRevisar: Hipertensão portal · fisiopatologia"
  },
  # 157
  {
    "type": "CASO CLÍNICO DISSERTATIVO",
    "text": "Homem de 56 anos com cirrose hepática alcoólica é trazido ao pronto-socorro com aumento progressivo do abdome, icterícia e desorientação têmporo-espacial há 2 dias. Ao exame: abdome globoso, com sinal do piparote positivo e circulação colateral periumbilical em cabeça de medusa; icterícia 3+/4+; flapping (asterixe) positivo; e telangiectasias no tórax.\n\na) Explique a fisiopatologia da ascite nesse paciente (forças de Starling e hemodinâmica sistêmica).\nb) Qual o significado clínico do GASA (gradiente de albumina soro-ascite) e o que se espera nesse caso?\nc) Explique o mecanismo do asterixe e da encefalopatia hepática.\nd) Qual a explicação para as telangiectasias e o eritema palmar?",
    "interactionType": "textarea",
    "gabarito": "**Resposta-modelo:**\n\na) **Fisiopatologia da ascite:** Decorre da combinação da hipertensão portal sinusoidal com vasodilatação arterial esplâncnica (induzida por NO). A vasodilatação gera sequestro esplâncnico e queda do volume arterial circulante efetivo, ativando vigorosamente o SRAA, o sistema simpático e a liberação de ADH, com retenção renal secundária de sódio e água. Associada à hipoalbuminemia (menor síntese hepática = menor pressão oncótica capilar), a pressão hidrostática portal transborda líquido para a cavidade peritoneal.\n\nb) **GASA e valor esperado:** GASA = Albumina sérica − Albumina do líquido ascítico. Espera-se GASA ≥ 1,1 g/dL, o que confirma que a ascite decorre de hipertensão portal (transudato hemodinâmico), descartando carcinomatose peritoneal ou peritonite tuberculosa (GASA < 1,1 g/dL).\n\nc) **Encefalopatia e asterixe:** A falência hepatocelular na depuração de toxinas e a formação de shunts portossistêmicos desviam o sangue venoso intestinal rico em amônia diretamente para a circulação sistêmica. A amônia atravessa a barreira hematoencefálica; nos astrócitos, é convertida em glutamina por meio da glutamina sintetase, gerando edema osmótico celular, disfunção neurotransmissora GABAérgica/glutamatérgica e asterixe (tremor de aleteio por perda transitória do tônus postural).\n\nd) **Telangiectasias e eritema palmar:** Resultam do hiperestrogenismo secundário à perda da capacidade hepática de metabolizar e depurar estrógenos e androstenediona circulantes, induzindo vasodilatação arteriolar periférica persistente.\n\nRevisar: Cirrose descompensada · fisiopatologia integrada"
  },
  # 158
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "A peritonite bacteriana espontânea (PBE) no paciente com ascite cirrótica caracteriza-se por:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Contaminação peritoneal por perfuração viscerotomizada cirúrgica.",
      "B) Infecção bacteriana do líquido ascítico sem foco intra-abdominal cirúrgico, diagnosticada por contagem de polimorfonucleares (neutrófilos) ≥ 250 células/mm³.",
      "C) Líquido ascítico com neutrófilos < 100/mm³ e ausência total de sintomas.",
      "D) Formação de abscesso intraperitoneal fétido por anaeróbios estritos multirresistentes."
    ],
    "gabarito": "**Alternativa B** — Infecção bacteriana do líquido ascítico sem foco intra-abdominal cirúrgico, diagnosticada por contagem de polimorfonucleares (neutrófilos) ≥ 250 células/mm³.\n\nA PBE ocorre por translocação bacteriana da luz intestinal para linfonodos mesentéricos e corrente sanguínea, colonizando o líquido ascítico que tem baixa atividade opsonizante. Mais de 250 PMN/mm³ define a infecção e indica início imediato de antibioticoterapia sistêmica.\n\n• A) Descreve peritonite secundária.\n• C) Critério negativo para PBE.\n• D) Aponta para perfuração ou peritonite secundária.\n\nRevisar: Peritonite bacteriana espontânea"
  },
  # 159
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Na encefalopatia hepática, fatores precipitantes comuns que aumentam a carga de compostos nitrogenados na circulação incluem:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Hiper-hidratação isolada e hipoglicemia leve.",
      "B) Hemorragia digestiva alta, constipação intestinal, infecções e hipocalemia com alcalose metabólica.",
      "C) Ingestão exclusiva de carboidratos complexos.",
      "D) Uso crônico de lactulose conforme prescrição médica."
    ],
    "gabarito": "**Alternativa B** — Hemorragia digestiva alta, constipação intestinal, infecções e hipocalemia com alcalose metabólica.\n\nO sangue na luz intestinal é uma sobrecarga maciça de proteínas degradadas por bactérias em amônia. A constipação prolonga o tempo de absorção; infecções aumentam o catabolismo proteico; a hipocalemia e a alcalose aumentam a produção renal de amônia e convertem NH4⁺ em NH3 (que cruza livremente o SNC).\n\n• A) Não aumentam a amoniogênese.\n• C) Dieta com menos proteína reduz a geração de amônia.\n• D) A lactulose acidifica a luz cólica e trata a encefalopatia.\n\nRevisar: Encefalopatia hepática · precipitantes"
  },
  # 160
  {
    "type": "ASSOCIAÇÃO",
    "text": "Associe cada tipo de icterícia ao perfil laboratorial e fisiopatológico correspondente:\n\n1. Pré-hepática (hemolítica)\n2. Intra-hepática (hepatocelular)\n3. Pós-hepática (colestática obstrutiva)\n4. Síndrome de Gilbert\n\n( ) Hiperbilirrubinemia não conjugada (indireta), anemia, reticulocitose e DHL elevado; urina sem colúria.\n( ) Hiperbilirrubinemia mista com elevação expressiva de transaminases (ALT/AST); necrose celular.\n( ) Hiperbilirrubinemia conjugada (direta) com elevação marcante de fosfatase alcalina e GGT; colúria e acolia fecal.\n( ) Hiperbilirrubinemia não conjugada isolada e discreta, desencadeada por jejum ou estresse, com enzimas hepáticas normais.",
    "interactionType": "textarea",
    "gabarito": "**Sequência: 1 – 2 – 3 – 4**\n\n• 1) Pré-hepática (hemolítica): Sobrecarga de heme; o fígado conjuga no limite, mas há excesso de bilirrubina indireta lipossolúvel (não filtra no rim, logo sem colúria).\n• 2) Intra-hepática (hepatocelular): Lesão viral ou tóxica nos hepatócitos; falha conjugação e excreção, com escape de transaminases.\n• 3) Pós-hepática (obstrutiva): Obstrução biliar mecânica (cálculo, tumor); a bilirrubina direta hidrossolúvel regurgita para o sangue (colúria) e não chega ao intestino (acolia fecal).\n• 4) Síndrome de Gilbert: Redução benigna na atividade da glicuroniltransferase (UGT1A1); elevação intermitente da bilirrubina indireta em situações de estresse físico ou jejum prolongado.\n\nRevisar: Icterícias · classificação fisiopatológica"
  },
  # 161
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Paciente com ressecção extensa do íleo terminal por Doença de Crohn apresenta alto risco de desenvolver:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Deficiência isolada de ferro e gastrite atrófica.",
      "B) Má absorção de vitamina B12 (com anemia megaloblástica) e de sais biliares (com diarreia colerética e litíase biliar/renal).",
      "C) Úlcera péptica duodenal perfurada imediata.",
      "D) Acromegalia secundária."
    ],
    "gabarito": "**Alternativa B** — Má absorção de vitamina B12 (com anemia megaloblástica) e de sais biliares (com diarreia colerética e litíase biliar/renal).\n\nO íleo terminal é o sítio exclusivo de absorção do complexo fator intrínseco-vitamina B12 e da recirculação entero-hepática de sais biliares. A ressecção esgota o pool de sais biliares (gerando esteatorreia e cálculos de colesterol) e impede a captação de B12.\n\n• A) Ferro é absorvido primariamente no duodeno.\n• C) Não tem relação anatômica com a ressecção ileal.\n• D) Sem conexão hormonal.\n\nRevisar: Absorção no íleo terminal e síndrome do intestino curto"
  },
  # 162
  {
    "type": "VERDADEIRO OU FALSO",
    "text": "Sobre fisiologia e patologia hepática e biliar, julgue os itens:\n\n( ) A albumina e todos os fatores de coagulação (exceto o fator VIII) são sintetizados pelos hepatócitos.\n( ) O tempo de protrombina (TP/INR) é um marcador sensível da função sintética hepática aguda e crônica.\n( ) Os sais biliares são sintetizados a partir do colesterol e essenciais para a emulsificação de gorduras na luz duodenal.\n( ) A colecistoquinina (CCK) induz o relaxamento da vesícula biliar e o fechamento do esfíncter de Oddi durante as refeições.\n( ) O esteato-hepatite associada à disfunção metabólica (MASH) envolve lipotoxicidade e estresse oxidativo promovidos pela resistência à insulina.",
    "interactionType": "textarea",
    "gabarito": "**Sequência: V – V – V – F – V**\n\n• V) Síntese hepática: Hepatócitos produzem albumina, fibrinogênio, protrombina e fatores VII, IX e X.\n• V) TP/INR: Como o fator VII tem meia-vida curta (~6 h), o TP/INR altera-se rapidamente na falência hepática.\n• V) Sais biliares: Detergentes naturais derivados do colesterol essenciais para a digestão lipídica.\n• F) Colecistoquinina: O efeito da CCK é contrair a vesícula e relaxar o esfíncter de Oddi para ejetar bile no duodeno.\n• V) MASH: O acúmulo de lipídios no hepatócito induz disfunção mitocondrial, estresse de retículo e inflamação necrotizante com fibrose.\n\nRevisar: Fisiologia hepatobiliar e esteato-hepatite"
  },
  # 163
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "A colecistite aguda litiásica diferencia-se clinicamente da coledocolitíase isolada não complicada porque na colecistite:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Há icterícia obstrutiva com bilirrubina > 15 mg/dL e fezes acólicas.",
      "B) Há dor contínua no hipocôndrio direito, sinal de Murphy positivo, febre e espessamento da parede da vesícula por impactação do cálculo no ducto cístico.",
      "C) O ducto colédoco encontra-se dilatado e com cálculos em toda sua extensão.",
      "D) A amilase sérica eleva-se dez vezes o limite superior da normalidade."
    ],
    "gabarito": "**Alternativa B** — Há dor contínua no hipocôndrio direito, sinal de Murphy positivo, febre e espessamento da parede da vesícula por impactação do cálculo no ducto cístico.\n\nNa colecistite o cálculo obstrui o cístico, aprisionando bile e iniciando inflamação química/isquêmica da parede vesicular (Murphy positivo). Como o colédoco está pérvio, a bile flui livremente do fígado ao duodeno — logo, habitualmente não há icterícia marcante nem acolia.\n\n• A) Padrão de obstrução do ducto biliar principal (coledocolitíase ou neoplasia periampular).\n• C) Caracteriza a coledocolitíase.\n• D) Caracteriza pancreatite aguda biliar associada.\n\nRevisar: Litíase biliar · colecistite × coledocolitíase"
  },
  # 164
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a colangite bacteriana aguda e a Tríade de Charcot, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) A tríade de Charcot clássica é composta por dor abdominal no hipocôndrio direito, icterícia e febre com calafrios.",
      "B) A pentade de Reynolds adiciona hipotensão arterial e alteração do nível de consciência, denotando choque séptico de foco biliar.",
      "C) Decorre da combinação de obstrução do ducto biliar principal com proliferação bacteriana ascendente sob alta pressão.",
      "D) Exige descompressão biliar urgente e antibioticoterapia de amplo espectro.",
      "E) Trata-se de uma doença autoimune benigna que não requer desobstrução das vias biliares."
    ],
    "gabarito": "**Alternativa E** — Trata-se de uma doença autoimune benigna que não requer desobstrução das vias biliares.\n\nColangite bacteriana aguda é uma infecção grave e potencialmente letal: a bile infectada sob pressão elevada empurra bactérias e endotoxinas diretamente para os capilares hepáticos (bacteriemia fulminante). Requer descompressão biliar urgente (por CPRE ou cirurgia).\n\n• A) Correto — manifestações da infecção biliar canalicular.\n• B) Correto — sinal de colangite supurativa tóxica grave.\n• C) Correto — obstrução + proliferação bacteriana sob pressão.\n• D) Correto — desobstrução é mandatória.\n\nRevisar: Colangite aguda e descompressão biliar"
  },
  # 165
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Na obstrução intestinal mecânica em alça simples (ex.: por bridas ou volvo), o acúmulo de gás e líquido a montante da obstrução resulta em:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Aumento da absorção de água pelos enterócitos distendidos.",
      "B) Distensão progressiva da parede, aumento da pressão intraluminal, sequestro de líquido em terceiro espaço e risco de isquemia transmural por comprometimento da drenagem venosa.",
      "C) Vasodilatação sistêmica com elevação do débito urinário.",
      "D) Redução imediata da proliferação bacteriana intraluminal."
    ],
    "gabarito": "**Alternativa B** — Distensão progressiva da parede, aumento da pressão intraluminal, sequestro de líquido em terceiro espaço e risco de isquemia transmural por comprometimento da drenagem venosa.\n\nA distensão intraluminal aumenta a secreção e reduz a absorção; quando a pressão ultrapassa a pressão capilar e venosa da submucosa, ocorre isquemia de parede, proliferação bacteriana, necrose, perfuração e peritonite fecal.\n\n• A) Ocorre diminuição drástica da capacidade de absorção.\n• C) Há hipovolemia por terceiro espaço e vômitos, reduzindo a diurese.\n• D) Há proliferação bacteriana descontrolada.\n\nRevisar: Obstrução intestinal · fisiopatologia"
  },
  # 166
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "O íleo paralítico (adinâmico) diferencia-se da obstrução intestinal mecânica por:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Apresentar peristaltismo de luta com ruídos hidroaéreos aumentados e metálicos.",
      "B) Caracterizar-se por ausência transitória de motilidade coordenada de todo o trato gastrointestinal, com silêncio abdominal, frequentemente deflagrado por cirurgia abdominal, peritonite ou hipocalemia.",
      "C) Exigir laparotomia exploradora descompressiva de urgência em todos os casos.",
      "D) Ocorrer exclusivamente no esôfago."
    ],
    "gabarito": "**Alternativa B** — Caracterizar-se por ausência transitória de motilidade coordenada de todo o trato gastrointestinal, com silêncio abdominal, frequentemente deflagrado por cirurgia abdominal, peritonite ou hipocalemia.\n\nNo íleo paralítico não há barreira física; há perda da contratilidade por hiperatividade simpática reflexa, distúrbios iônicos (hipocalemia) ou inflamação peritoneal. O abdome fica distendido e silencioso (RHA diminuídos ou abolidos).\n\n• A) Peristaltismo de luta e ruídos metálicos são típicos da obstrução mecânica inicial.\n• C) O tratamento é conservador e de suporte (correção de eletrólitos e estímulo de motilidade).\n• D) Acomete estômago, intestino delgado e cólon.\n\nRevisar: Íleo adinâmico × obstrução mecânica"
  },
  # 167
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a apendicite aguda e a clássica migração da dor, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) A causa primária mais comum é a obstrução da luz apendicular por fecálito ou hiperplasia linfoide.",
      "B) A dor inicial periumbilical é do tipo visceral, mediada por fibras autonômicas C que respondem à distensão do órgão.",
      "C) A migração da dor para a fossa ilíaca direita ocorre quando o processo inflamatório atinge o peritônio parietal, inervado por fibras somáticas espinhais.",
      "D) O sinal de Blumberg (descompressão dolorosa no ponto de McBurney) reflete irritação do peritônio parietal.",
      "E) A dor da apendicite localiza-se na fossa ilíaca direita desde os primeiros minutos de obstrução mecânica inicial."
    ],
    "gabarito": "**Alternativa E** — A dor da apendicite localiza-se na fossa ilíaca direita desde os primeiros minutos de obstrução mecânica inicial.\n\nA cronologia de Murphy mostra que a dor começa vaga e difusa na região periumbilical ou epigástrica (visceral). Somente após várias horas, quando a inflamação transmural toca e irrita o peritônio parietal localizado, a dor torna-se pontual e precisa na fossa ilíaca direita.\n\n• A) Correto — mecanismo obstrutivo inicial.\n• B) Correto — dor visceral insensível à palpação localizada.\n• C) Correto — transição fisiopatológica de dor visceral para dor somática.\n• D) Correto — peritonite focal manifesta.\n\nRevisar: Fisiopatologia e semiologia da apendicite aguda"
  },
  # 168
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Na isquemia mesentérica aguda por embolia da artéria mesentérica superior, a característica clínica clássica mais marcante nas primeiras horas é:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Distensão abdominal maciça imediata com descompressão brusca difusa.",
      "B) Dor abdominal intensa e desproporcional aos achados do exame físico inicial, frequentemente associada a antecedente de arritmia cardíaca (como fibrilação atrial).",
      "C) Hematêmese fulminante com colapso cardiovascular precoce.",
      "D) Icterícia e dor pleurítica."
    ],
    "gabarito": "**Alternativa B** — Dor abdominal intensa e desproporcional aos achados do exame físico inicial, frequentemente associada a antecedente de arritmia cardíaca (como fibrilação atrial).\n\nNas primeiras horas a isquemia é puramente mucosa: há dor isquêmica excruciante ('angina intestinal'), mas o peritônio parietal ainda não está inflamado, de modo que o abdome permanece flácido e inocente à palpação. É o grande desafio diagnóstico da emergência médica.\n\n• A) Sinais de irritação peritoneal só surgem tardiamente, quando já há infarto transmural.\n• C) Hemorragia intraluminal maciça pode ocorrer tardiamente, mas não é a marca inicial.\n• D) Não faz parte do quadro mesentérico agudo.\n\nRevisar: Isquemia mesentérica aguda"
  },
  # 169
  {
    "type": "CASO CLÍNICO INTEGRADOR",
    "text": "Mulher de 68 anos com histórico de DM tipo 2 há 20 anos, hipertensão arterial de difícil controle e insuficiência cardíaca crônica com fração de ejeção reduzida (ICFER). Dá entrada por dispneia aos esforços mínimos, tosse noturna e edema importante de membros inferiores bilaterais. Exames: creatinina 2,4 mg/dL (basal 1,4), ureia 110 mg/dL, peptídeo natriurético tipo B (BNP) 1.800 pg/mL, albuminúria 600 mg/g creatinina. Ecocardiograma revela FEVE 32% e dilatação ventricular.\n\na) Como se conceitua a síndrome cardiorrenal e qual o subtipo predominante neste caso?\nb) Explique como a redução do débito cardíaco e o aumento da pressão venosa central afetam a hemodinâmica renal.\nc) Qual o papel da ativação neuro-hormonal crônica (sistema simpático e SRAA) no agravamento simultâneo do coração e do rim?\nd) Por que a redução excessiva da volemia por diuréticos pode paradoxalmente elevar ainda mais a creatinina?",
    "interactionType": "textarea",
    "gabarito": "**Resposta-modelo:**\n\na) **Conceito e subtipo:** A síndrome cardiorrenal envolve disfunção simultânea na qual a falência aguda ou crônica de um órgão (coração ou rim) acelera ou induz a falência do outro. Aqui há Síndrome Cardiorrenal Tipo 2 (insuficiência cardíaca crônica descompensada agravando a função renal crônica preexistente).\n\nb) **Hemodinâmica renal:** A falência ventricular reduz o débito anterógrado (menor perfusão renal efetiva), enquanto a congestão retrógrada eleva a pressão venosa central e a pressão nas veias renais. O aumento da pressão venosa renal reduz o gradiente arteriovenoso de perfusão trans-renal e eleva a pressão nos capilares peritubulares e no espaço de Bowman, derrubando a taxa de filtração glomerular.\n\nc) **Ativação neuro-hormonal:** O baixo débito ativa o sistema simpático e o SRAA. A angiotensina II e a noradrenalina induzem vasoconstrição periférica (elevando a pós-carga cardíaca) e fibrose miocárdica progressiva; no rim, promovem vasoconstrição glomerular, retenção de água e sódio e esclerose dos néfrons remanescentes, perpetuando o ciclo de congestão e falência orgânica.\n\nd) **Diuréticos em excesso e creatinina:** A diurese excessiva reduz abruptamente o volume intravascular efetivo e a pressão de enchimento. Em um rim com autorregulação comprometida (já no limite de perfusão), a depleção volêmica transforma o quadro congestivo em choque pré-renal hipovolêmico, colapsando a filtração glomerular.\n\nRevisar: Síndrome cardiorrenal e interação neuro-hormonal"
  },
  # 170
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a síndrome cardiorrenal, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) No tipo 1, a piora aguda da função cardíaca (ex.: choque cardiogênico) causa injúria renal aguda.",
      "B) No tipo 2, a disfunção cardíaca crônica leva à progressão da doença renal crônica.",
      "C) No tipo 3, a injúria renal aguda primária precipita disfunção cardíaca aguda (ex.: arritmias por hipercalemia, sobrecarga volêmica).",
      "D) No tipo 4, a doença renal crônica contribui para hipertrofia ventricular e insuficiência cardíaca crônica.",
      "E) A pressão venosa renal aumentada nunca interfere na taxa de filtração glomerular."
    ],
    "gabarito": "**Alternativa E** — A pressão venosa renal aumentada nunca interfere na taxa de filtração glomerular.\n\nA congestão venosa renal (hipertensão venosa retrógrada) é hoje reconhecida como um dos principais determinantes da queda da taxa de filtração glomerular na insuficiência cardíaca descompensada, por reduzir a pressão de perfusão líquida transrenal.\n\n• A) Correto — cardiorrenal aguda.\n• B) Correto — cardiorrenal crônica.\n• C) Correto — renocardíaca aguda.\n• D) Correto — renocardíaca crônica (tipo 4).\n\nRevisar: Classificação das síndromes cardiorrenais (ADQI)"
  },
  # 171
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "O choque séptico define-se fisiopatologicamente como uma forma de choque distributivo caracterizada primariamente por:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Falência de bomba mecânica do ventrículo esquerdo por necrose miocárdica isquêmica maciça.",
      "B) Vasodilatação sistêmica intensa e desregulada por liberação maciça de óxido nítrico e citocinas inflamatórias, com queda crítica da resistência vascular sistêmica e extravasamento capilar difuso.",
      "C) Tamponamento pericárdico agudo com restrição diastólica biventricular.",
      "D) Obstrução aguda do tronco da artéria pulmonar por tromboembolismo."
    ],
    "gabarito": "**Alternativa B** — Vasodilatação sistêmica intensa e desregulada por liberação maciça de óxido nítrico e citocinas inflamatórias, com queda crítica da resistência vascular sistêmica e extravasamento capilar difuso.\n\nNa sepse a resposta do hospedeiro ao patógeno deflagra tempestade de citocinas (TNF, IL-1, IL-6), ativando a enzima iNOS (óxido nítrico sintase induzível). O NO em altas concentrações relaxa a musculatura lisa vascular, levando a choque quente inicial com hipotensão refratária e perda de volume plasmático para o interstício.\n\n• A) Descreve choque cardiogênico.\n• C) Descreve choque obstrutivo por tamponamento.\n• D) Descreve choque obstrutivo por TEP maciço.\n\nRevisar: Choque séptico · fisiopatologia do choque distributivo"
  },
  # 172
  {
    "type": "ASSOCIAÇÃO",
    "text": "Associe cada tipo de choque ao seu respectivo perfil hemodinâmico clássico:\n\n1. Hipovolêmico (hemorragia maciça)\n2. Cardiogênico (IAM com choque)\n3. Distributivo (Séptico/Anafilático inicial)\n4. Obstrutivo (Tamponamento cardíaco)\n5. Neuroretrogênico / Neuroadrenérgico medular\n\n( ) Débito cardíaco muito baixo, RVS elevada, pressão de oclusão de artéria pulmonar (POAP) muito baixa.\n( ) Débito cardíaco muito baixo, RVS muito elevada, POAP muito elevada (congestão pulmonar).\n( ) Débito cardíaco elevado ou normal ('choque quente'), RVS muito baixa, extremidades quentes.\n( ) Débito cardíaco baixo, equalização das pressões diastólicas intracavitárias e pulso paradoxal.\n( ) Perda do tônus simpático abaixo do nível da lesão medular, com hipotensão associada a bradicardia.",
    "interactionType": "textarea",
    "gabarito": "**Sequência: 1 – 2 – 3 – 4 – 5**\n\n• 1) Hipovolêmico: Falta volume; o organismo compensa com vasoconstrição periférica extrema (RVS alta) e taquicardia.\n• 2) Cardiogênico: O coração não ejeta; pressões retrógradas sobem (POAP alta) e a resistência periférica aumenta tentando sustentar a PAM.\n• 3) Distributivo: Resistência vascular despenca; o coração tenta compensar aumentando a frequência e o volume de ejeção.\n• 4) Obstrutivo (tamponamento): O líquido pericárdico comprime todas as câmaras na diástole; as pressões se igualam e o enchimento é impedido.\n• 5) Neurogênico: Ao interromper as vias simpáticas descendentes na medula espinhal, perde-se tanto o tônus arteriolar quanto o estímulo taquicardizante cardíaco.\n\nRevisar: Perfis hemodinâmicos dos estados de choque"
  },
  # 173
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a síndrome de disfunção de múltiplos órgãos (MODS) no contexto da resposta inflamatória sistêmica grave, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) A disfunção mitocondrial ('hibernação celular') induzida por estresse oxidativo contribui para a falha celular mesmo com aporte adequado de oxigênio.",
      "B) A coagulação intravascular disseminada (CIVD) por ativação do fator tecidual causa trombose microvascular e consumo de plaquetas e fatores de coagulação.",
      "C) O aumento difuso da permeabilidade endotelial precipita edema tecidual e agrava o distúrbio de trocas gasosas e a perfusão.",
      "D) O hipermetabolismo induz gliconeogênese, proteólise muscular e resistência à insulina.",
      "E) A disfunção de múltiplos órgãos é sempre um processo imediato e irreversível nos primeiros 10 minutos de qualquer infecção bacteriana."
    ],
    "gabarito": "**Alternativa E** — A disfunção de múltiplos órgãos é sempre um processo imediato e irreversível nos primeiros 10 minutos de qualquer infecção bacteriana.\n\nA MODS é um processo progressivo e contínuo que se instala ao longo de horas ou dias como consequência do dano microvascular, inflamação e hipóxia celular não revertidos precocemente. A intervenção rápida (ressuscitação volêmica, antimicrobianos, suporte de oxigênio) pode interromper sua evolução e restabelecer a função dos órgãos.\n\n• A) Correto — a disóxia celular ocorre mesmo em níveis normais de PO2 tecidual.\n• B) Correto — o desbalanço entre inflamação e coagulação gera CIVD.\n• C) Correto — perda da barreira capilar por lesão do glicocálice.\n• D) Correto — resposta neuroendócrina de estresse com tempestade hormonal.\n\nRevisar: Fisiopatologia da sepse e MODS"
  },
  # 174
  {
    "type": "VERDADEIRO OU FALSO",
    "text": "Sobre resposta inflamatória sistêmica, choque e oxigenação tecidual, julgue os itens:\n\n( ) O lactato sérico elevado reflete primariamente hipóxia tecidual e glicólise anaeróbia secundária a hipoperfusão celular.\n( ) A saturação venosa central de oxigênio (SvcO2) menor que 70% indica extração tecidual excessiva de oxigênio decorrente de débito cardíaco ou transporte inadequado.\n( ) Na fase precoce da síndrome do desconforto respiratório agudo (SARA), o edema é rico em proteínas e exsudativo, com membrana hialina.\n( ) O uso precoce de noradrenalina no choque séptico busca restaurar o tônus vascular arteriolar e a pressão de perfusão dos órgãos nobres.\n( ) No choque descompensado o débito urinário tende a se manter acima de 2 mL/kg/h sem necessidade de intervenção.",
    "interactionType": "textarea",
    "gabarito": "**Sequência: V – V – V – V – F**\n\n• V) Lactato: Marcador clássico de glicólise anaeróbia e hipoperfusão tecidual (embora também haja componente de liberação adrenérgica).\n• V) SvcO2: Como as células recebem pouco oxigênio por fluxo insuficiente, extraem uma fração maior do sangue capilar, empobrecendo o retorno venoso.\n• V) SARA: Lesão inflamatória difusa da membrana alveolocapilar com extravasamento de plasma e fibrina.\n• V) Noradrenalina: Agonista alfa-1 prioritário para reverter a vasodilatação patológica do choque séptico.\n• F) Débito urinário: Pelo contrário, o rim é extremamente vulnerável à hipoperfusão; oligúria (< 0,5 mL/kg/h) é um dos sinais clínicos mais precoces e sensíveis de choque.\n\nRevisar: Monitorização hemodinâmica e oxigenação tecidual"
  },
  # 175
  {
    "type": "CASO CLÍNICO INTEGRADOR",
    "text": "Mulher de 82 anos, acamada com demência avançada, internada com febre de 39,2°C, tosse produtiva e sonolência há 24 horas. Ao exame físico: PA 75/40 mmHg, FC 128 bpm, FR 32 mpm, SpO2 86% em ar ambiente, tempo de enchimento capilar de 5 segundos, livedo reticular nos membros inferiores e oligúria nas últimas 12 horas. Gasometria arterial: pH 7,22, PaO2 54 mmHg, PaCO2 28 mmHg, HCO3 11 mEq/L, Lactato 5,2 mmol/L. Leucócitos 24.000/mm³ com 18% de bastões.\n\na) Identifique as síndromes clínicas e classifique a gravidade do quadro hemodinâmico e respiratório.\nb) Interprete a gasometria arterial integrando os componentes metabólico e respiratório.\nc) Descreva a cascata celular que conecta a infecção pulmonar à vasodilatação sistêmica, colapso circulatório e acidose lática.",
    "interactionType": "textarea",
    "gabarito": "**Resposta-modelo:**\n\na) **Síndromes clínicas e gravidade:** Sepse grave com Choque Séptico refratário a foco pulmonar (Pneumonia Comunitária Grave/Aspirativa) associada a Insuficiência Respiratória Aguda Tipo 1 (Hipoxêmica) e Provável SARA, além de Injúria Renal Aguda oligúrica.\n\nb) **Interpretação da gasometria:**\n• pH 7,22: Acidemia grave.\n• HCO3 11 mEq/L e Lactato 5,2 mmol/L: Acidose metabólica com ânion gap elevado, causada por hipóxia tecidual e acúmulo de ácido lático (glicólise anaeróbia).\n• PaCO2 28 mmHg: Alcalose respiratória compensatória (o centro respiratório hiperventila para tentar eliminar CO2 e tamponar o pH).\n• PaO2 54 mmHg em ar ambiente: Hipoxemia grave (relação PaO2/FiO2 < 260), decorrente de áreas pulmonares de shunt e desequilíbrio ventilação/perfusão.\n\nc) **Cascata celular integrada:** Bactérias no alvéolo liberam PAMPs (ex.: endotoxinas ou peptideoglicanos) reconhecidos por Toll-like receptors de macrófagos alveolares. Há liberação sistêmica maciça de TNF-alfa, IL-1 e IL-6, que ativam as células endoteliais em todo o organismo. O endotélio induz a síntese de óxido nítrico sintase (iNOS), gerando produção desregulada de NO, que relaxa as células musculares lisas das arteríolas pré-capilares (vasoplegia e choque distributivo). Simultaneamente, o glicocálice endotelial é destruído, provocando extravasamento maciço de albumina e água para o interstício (hipovolemia relativa). A queda crítica da pressão de perfusão tecidual somada a microtrombos capilares colapsa a entrega de oxigênio (DO2) às mitocôndrias celulares; sem oxigênio, a cadeia transportadora de elétrons cessa e a célula recorre à conversão de piruvato em lactato, gerando a acidose lática sistêmica.\n\nRevisar: Sepse, choque séptico e falência celular"
  },
  # 176
  {
    "type": "QUESTÃO ABERTA SÍNTESE",
    "text": "A inflamação crônica de baixo grau é o elo fisiopatológico unificador entre diversas doenças crônicas não transmissíveis da medicina moderna. Explique de que forma o acúmulo de tecido adiposo visceral inicia um ciclo inflamatório que conecta a resistência à insulina, o diabetes mellitus tipo 2, a dislipidemia aterogênica, a aterosclerose vascular e a esteato-hepatite metabólica (MASH).",
    "interactionType": "textarea",
    "gabarito": "**Resposta-modelo:**\n\n1. **Início no tecido adiposo visceral:** O excesso calórico crônico provoca hipertrofia extrema dos adipócitos viscerais, que ultrapassam sua capacidade de oxigenação capilar e entram em hipóxia e morte celular por piroptose. Isso recruta monócitos circulantes que se diferenciam em macrófagos pró-inflamatórios fenotípicos M1, formando estruturas em coroa ('crown-like structures') ao redor de adipócitos necróticos.\n\n2. **Resistência insulínica e Diabetes Tipo 2:** Esses macrófagos e adipócitos secretam citocinas pró-inflamatórias (TNF-alfa, IL-6, resistina) e reduzem a adiponectina (hormônio protetor). O TNF-alfa fosforila em serina os substratos do receptor de insulina (IRS-1), bloqueando a cascata intracelular da via PI3K-Akt. Sem ativação de Akt, os transportadores GLUT-4 não se translocam para a membrana nos músculos e adipócitos, instalando a resistência periférica à insulina e subsequente exaustão da célula beta pancreática, culminando no diabetes mellitus tipo 2.\n\n3. **Lipotoxicidade e Esteato-hepatite (MASH):** A resistência à insulina no adipócito desinibe a lípase hormônio-sensível, liberando fluxo maciço de ácidos graxos livres (AGLs) na circulação portal em direção ao fígado. No hepatócito, o excesso de AGLs satura a beta-oxidação mitocondrial, acumulando diacilglicerol e ceramidas que geram estresse de retículo endoplasmático e radicais livres de oxigênio (ROS). Esse estresse oxidativo ativa o inflamassoma NLRP3 e as células estreladas hepáticas, transformando a esteatose simples em esteato-hepatite com apoptose hepatocitária e fibrose progressiva (MASH).\n\n4. **Dislipidemia aterogênica e Aterosclerose:** O fígado saturado de lipídios hiperproduz lipoproteínas ricas em triglicerídeos (VLDL), resultando na clássica tríade aterogênica: hipertrigliceridemia, queda do HDL e formação de partículas de LDL pequenas e densas. Estas LDLs de pequeno calibre penetram facilmente o endotélio vascular danificado pelas citocinas e sofrem oxidação na íntima. Os macrófagos vasculares fagocitam essas ox-LDLs via receptores scavenger e transformam-se em células espumosas, iniciando as estrias lipídicas e alimentando as placas ateromatosas instáveis que culminam em infarto do miocárdio e AVC.\n\nDessa forma, a inflamação de baixo grau iniciada no adipócito visceral funciona como o eixo patológico comum e integrador de toda a morbimortalidade cardiometabólica moderna.\n\nRevisar: Inflamação crônica, síndrome metabólica e aterogênese integrada"
  }
]

out_code = "export const fisio176RenalDigestorio = " + json.dumps(renal_dig_questions, indent=2, ensure_ascii=False) + ";\n"
with open("src/fisio_176_renal_dig.ts", "w", encoding="utf-8") as f:
  f.write(out_code)

print(f"Generated src/fisio_176_renal_dig.ts with {len(renal_dig_questions)} questions.")
