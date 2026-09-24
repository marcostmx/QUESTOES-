export const q4 = [
    {
        type: "ASSOCIAÇÃO",
        text: `Associe cada hormônio à sua origem:

Hormônio
1 Adeno-hipófise (lobo anterior)
2 Neuro-hipófise (lobo posterior)

Hormônio
( ) Ocitocina
( ) TSH
( ) ADH (vasopressina)
( ) Prolactina
( ) ACTH
( ) GH
( ) FSH e LH

Em seguida, explique onde os hormônios da neuro-hipófise são de fato sintetizados e como chegam ao lobo posterior.`,
        interactionType: "textarea",
        gabarito: `2 – 1 – 2 – 1 – 1 – 1 – 1

• Ocitocina ← neuro-hipófise (2)
• TSH ← adeno-hipófise (1)
• ADH ← neuro-hipófise (2)
• Prolactina ← adeno-hipófise (1)
• ACTH ← adeno-hipófise (1)
• GH ← adeno-hipófise (1)
• FSH e LH ← adeno-hipófise (1)

Os hormônios da neuro-hipófise — ocitocina e ADH — são na verdade sintetizados no hipotálamo e armazenados nos terminais axônicos localizados no lobo posterior. A neuro-hipófise consiste em células gliais modificadas (pituicitos) e processos axonais que se estendem do hipotálamo, pela haste hipofisária, até o lobo posterior. Em resposta a estímulo apropriado, os hormônios pré-formados são liberados diretamente na circulação sistêmica pelos canais venosos da hipófise.`
    },
    {
        type: "ABERTA",
        text: `Cite os quatro fatores hipotalâmicos de liberação (estimulantes) e as duas influências hipotalâmicas inibitórias descritas no material, indicando o hormônio-alvo de cada uma. Diferencie gônada e glândula.`,
        interactionType: "textarea",
        gabarito: `Fatores de liberação (estimulantes):
- TRH — hormônio liberador de tireotrofina → estimula o TSH
- CRH — hormônio liberador de corticotropina → estimula o ACTH
- GHRH — hormônio de liberação do hormônio do crescimento → estimula o GH
- GnRH — hormônio liberador de gonadotropina → estimula FSH e LH

Influências inibitórias:
- PIF (fator inibidor de prolactina, a dopamina) → inibe a prolactina
- GIH ou somatostatina (fator inibidor do hormônio do crescimento) → inibe o GH

Gônada produz hormônios e gametas. Glândula produz apenas hormônios.`
    },
    {
        type: "CASO CLÍNICO",
        text: `Homem de 42 anos procura atendimento por aumento progressivo do tamanho das mãos e dos pés — trocou a aliança três vezes em cinco anos — e alteração dos traços faciais. Refere cefaleia e alterações do campo visual.

a) Qual o diagnóstico e qual o tipo de adenoma envolvido?
b) Qual a posição desse adenoma em frequência entre os adenomas hipofisários funcionantes?
c) Qual mediador hepático responde por muitas das manifestações clínicas?
d) Se o mesmo adenoma surgisse antes do fechamento das epífises, qual seria o quadro e como ele se caracterizaria?
e) Por que esses adenomas costumam estar grandes no momento do diagnóstico?`,
        interactionType: "textarea",
        gabarito: `a) Acromegalia, por adenoma somatotrófico secretor de hormônio do crescimento (GH).
b) É o segundo tipo mais comum de adenoma hipofisário funcionante.
c) Os níveis persistentemente elevados de GH estimulam a secreção hepática de IGF-1 (fator de crescimento semelhante à insulina 1), que causa muitas das manifestações clínicas.
d) Se o adenoma surgisse antes do fechamento das epífises — ou seja, em crianças —, os níveis elevados de GH e IGF-1 resultariam em gigantismo, caracterizado pelo aumento generalizado no tamanho do corpo, com braços e pernas desproporcionalmente longos.
e) Porque as manifestações do excesso de GH podem ser sutis e de instalação lenta — a mudança dos traços é gradual e passa despercebida —, de modo que o adenoma já está grande quando chama atenção clínica. Daí também a cefaleia e as alterações do campo visual, por compressão do quiasma óptico.`
    },
    {
        type: "CASO CLÍNICO",
        text: `Mulher de 48 anos em consulta de rotina. IMC 33 kg/m², circunferência abdominal aumentada, PA 148/94 mmHg. Exames: glicemia de jejum 118 mg/dL, triglicerídeos 240 mg/dL, HDL 38 mg/dL. Ultrassom abdominal com esteatose hepática.

a) Qual síndrome ela apresenta e quais são seus componentes segundo o material?
b) Explique o mecanismo pelo qual a obesidade contribui para a hipertensão.
c) Por que a dislipidemia dessa paciente aumenta o risco coronariano?
d) Cite outras três repercussões da obesidade descritas no material, além das já presentes no caso.`,
        interactionType: "textarea",
        gabarito: `a) Síndrome metabólica, cujos componentes são: adiposidade visceral ou intra-abdominal, resistência à insulina, hiperinsulinemia, intolerância à glicose, hipertensão, hipertrigliceridemia e HDL baixo.
b) A obesidade associa-se a resistência à insulina e hiperinsulinemia. O excesso de insulina desencadeia retenção de sódio, expansão do volume sanguíneo, produção excessiva de noradrenalina e proliferação das células musculares lisas vasculares — todos elementos característicos da hipertensão. O risco de desenvolver hipertensão em indivíduos previamente normotensos aumenta proporcionalmente ao peso.
c) Porque indivíduos obesos costumam ter hipertrigliceridemia e HDL baixo, e ambos aumentam o risco de doença arterial coronariana.
d) Doença hepática gordurosa não alcoólica (mais frequente em diabéticos, podendo progredir para fibrose e cirrose — presente neste caso); colelitíase, seis vezes mais comum em obesos, pelo aumento do colesterol total, do seu turnover e da excreção biliar; hipoventilação e hipersonolência, com pausas apneicas durante o sono, policitemia e eventual cor pulmonale; e osteoartrite, pela sobrecarga mecânica cumulativa das articulações.`
    },
    {
        type: "FECHADA",
        text: `Sobre a relação entre obesidade e câncer, assinale a alternativa INCORRETA:`,
        interactionType: "multiple-choice",
        options: [
            "A) A hiperinsulinemia inibe a produção das proteínas ligadoras de IGF (IGFBP-1 e IGFBP-2), aumentando os níveis de IGF-1 livre.",
            "B) O IGF-1 é mitogênico e seu receptor IGFR-1 é altamente expresso em muitos cânceres humanos, ativando as vias RAS e PI3K/AKT.",
            "C) A obesidade aumenta a síntese de estrogênio a partir de precursores androgênicos por efeito da aromatase no tecido adiposo.",
            "D) A obesidade aumenta a produção hepática de globulina ligadora de hormônios sexuais (SHBG), reduzindo a disponibilidade de estrogênio.",
            "E) Os níveis reduzidos de adiponectina em indivíduos obesos contribuem para a hiperinsulinemia, já que ela atua como agente sensibilizador à insulina."
        ],
        gabarito: `Alternativa D.

Está invertido: a obesidade inibe a produção hepática de SHBG, o que aumenta — e não reduz — a disponibilidade de estrogênio livre. Somado ao efeito da aromatase no tecido adiposo e ao aumento da síntese de androgênios em ovários e suprarrenais, isso amplia a exposição estrogênica de mama, útero e outros tecidos.`
    },
    {
        type: "ABERTA",
        text: `Descreva o eixo tireoidiano, do hipotálamo à célula folicular, incluindo:
a) a via de sinalização intracelular ativada pelo TSH ao se ligar ao seu receptor;
b) o que a célula folicular converte e em quais hormônios, e como eles circulam;
c) o que são as células parafoliculares e qual hormônio produzem, com sua função.`,
        interactionType: "textarea",
        gabarito: `a) Em resposta a fatores hipotalâmicos (TRH), o TSH é liberado pelos tireotrofos da adeno-hipófise na circulação. A ligação do TSH a seu receptor no epitélio folicular ativa o receptor, que se associa à proteína Gs. A ativação da proteína G eleva os níveis intracelulares de cAMP, o que — através das proteínas cinases dependentes de cAMP — acentua o crescimento da tireoide e a síntese e liberação dos hormônios.
b) As células epiteliais foliculares convertem a tireoglobulina em tiroxina (T4) e, em quantidades menores, tri-iodotironina (T3). Ambos são liberados na circulação sistêmica, onde a maioria circula reversivelmente ligada a proteínas plasmáticas, como a globulina ligada à tiroxina e a transtiretina.
c) As células parafoliculares (células C) sintetizam e secretam a calcitonina, que promove a absorção de cálcio pelo esqueleto e inibe a reabsorção óssea pelos osteoclastos.`
    },
    {
        type: "CASO CLÍNICO",
        text: `Mulher de 37 anos, previamente hígida, procura a clínica por emagrecimento não intencional de 7,5 kg em três meses, mantendo apetite excelente. Refere insônia, irritabilidade e intolerância ao calor, com sudorese aumentada. Ao exame: FC 108 bpm, PA 142/82 mmHg, olhar fixo com olhos protuberantes, tireoide grande, lisa e indolor, pele quente, tremor fino de extremidades e sopro de ejeção sistólico 2/6.

a) Qual o diagnóstico e o autoantígeno envolvido?
b) Qual o resultado esperado de TSH e T4 livre? Como se completa a investigação?
c) Explique o mecanismo da taquicardia, da perda de peso, do bócio e da fraqueza muscular.
d) Cite as quatro modalidades de tratamento descritas.
e) Qual hipótese é levantada no material sobre o gatilho da produção do autoanticorpo?`,
        interactionType: "textarea",
        gabarito: `a) Doença de Graves, causa mais comum de hipertireoidismo. O autoantígeno é o receptor do TSH (TSHR), que sofre estimulação por anticorpos específicos direcionados contra ele (anti-rTSH), os quais mimetizam a ação do TSH.
b) TSH indetectável/diminuído e T4 livre elevado (T3 também aumentado). A investigação se completa com o doseamento de anticorpos anti-rTSH, quase sempre positivo; quando o diagnóstico clínico não é claro, dosam-se anticorpos anti-TPO em concentrações elevadas ou realiza-se cintilografia demonstrando bócio difuso.
c) Taquicardia — efeito direto do hormônio tireoidiano sobre o sistema de condução cardíaco, somado à superatividade do sistema nervoso simpático. Perda de peso — aumento da taxa metabólica basal, apesar do apetite preservado. Bócio — autoanticorpos que estimulam o crescimento das células epiteliais tireoidianas. Fraqueza muscular — catabolismo proteico aumentado, atrofia muscular, diminuição da eficiência dos músculos e alterações na miosina.
d) Controle sintomático com betabloqueadores; redução da síntese hormonal com tionamidas; iodo radioativo; e cirurgia.
e) A causa desencadeante não é conhecida, mas o material levanta a hipótese de uma resposta imune contra um antígeno viral que compartilha homologia com o receptor de TSH — ou seja, reação cruzada levando à doença autoimune.`
    },
    {
        type: "FECHADA",
        text: `Sobre o hipertireoidismo, assinale a alternativa INCORRETA:`,
        interactionType: "multiple-choice",
        options: [
            "A) As três causas mais comuns são a hiperplasia difusa associada à doença de Graves (cerca de 85%), o bócio multinodular hiperfuncionante e o adenoma hiperfuncionante da tireoide.",
            "B) Hipertireoidismo primário decorre de anomalia intrínseca da tireoide; secundário, de processos externos a ela, como um tumor hipofisário secretor de TSH.",
            "C) Tireotoxicose e hipertireoidismo são sinônimos exatos, uma vez que toda tireotoxicose decorre de hiperfuncionamento glandular.",
            "D) A tireotoxicose é um estado hipermetabólico causado por níveis circulantes elevados de T3 e T4 livres.",
            "E) O hipertireoidismo pode causar hipermotilidade gastrointestinal, má absorção e diarreia."
        ],
        gabarito: `Alternativa C.

Tireotoxicose e hipertireoidismo não são sinônimos exatos. Em certas condições o excesso hormonal decorre de liberação de hormônio pré-formado (como nas tireoidites) ou de fonte extratireoidiana, e não de hiperfuncionamento glandular. Falando estritamente, o hipertireoidismo é apenas uma — embora a mais comum — das causas de tireotoxicose.`
    },
    {
        type: "CASO CLÍNICO",
        text: `Mulher de 52 anos refere ganho de peso, intolerância ao frio, constipação, pele seca e escamosa, cabelo ressecado e escasso, esquecimento e parestesias das mãos e dos pés. Ao exame: edema de face, bradicardia e aumento indolor da tireoide.

a) Qual o diagnóstico e a causa mais provável?
b) Qual o resultado esperado de TSH e T4 livre?
c) Como se confirma laboratorialmente a etiologia?
d) Descreva os achados histopatológicos da glândula.
e) Por que há bócio se a glândula está hipofuncionante?`,
        interactionType: "textarea",
        gabarito: `a) Hipotireoidismo, muito provavelmente por tireoidite de Hashimoto — a etiologia autoimune mais comum, mais frequente em mulheres, com prevalência que aumenta com a idade e cerca de dez vezes mais comum em mulheres que em homens.
b) TSH elevado e T4 livre diminuído — padrão do hipotireoidismo primário.
c) Pela demonstração de altos títulos de anticorpos antiperoxidase tireoidiana (anti-TPO).
d) Inflamação autoimune crônica com infiltração linfocitária; o ataque imunológico é agressivo e destrutivo dentro dos folículos tireoidianos; há aglomerados de macrófagos e infiltração linfoide no tecido intersticial, acompanhada de formação de folículos linfoides.
e) Porque há hipotrofia das células foliculares com aumento do tamanho dos folículos como tentativa de compensação — a glândula cresce buscando manter a produção hormonal, apesar de destruída funcionalmente. Some-se o estímulo trófico do TSH cronicamente elevado.`
    },
    {
        type: "ASSOCIAÇÃO",
        text: `Associe o quadro ao padrão laboratorial:

Quadro
1 Doença de Graves
2 Tireoidite de Hashimoto
3 Hipotireoidismo secundário

Padrão
( ) TSH baixo e T4 livre baixo — a falha está na hipófise/hipotálamo
( ) TSH indetectável e T4 livre elevado
( ) TSH elevado e T4 livre diminuído`,
        interactionType: "textarea",
        gabarito: `3 – 1 – 2

• TSH baixo e T4 livre baixo ← hipotireoidismo secundário (3) — a falha é hipofisária/hipotalâmica, então o TSH não sobe
• TSH indetectável e T4 livre elevado ← doença de Graves (1)
• TSH elevado e T4 livre diminuído ← tireoidite de Hashimoto (2) — hipotireoidismo primário`
    },
    {
        type: "ABERTA",
        text: `a) Cite as três zonas do córtex adrenal e sua localização relativa.
b) Indique qual classe de esteroide é produzida em cada zona, com o principal representante.
c) Qual zona constitui cerca de 75% do córtex?
d) Do que é composta a medula adrenal e o que ela secreta?`,
        interactionType: "textarea",
        gabarito: `a) Zona glomerulosa — logo abaixo da cápsula; zona fasciculada — intermediária; zona reticular — estreita, limitando a medula.
b) Glomerulosa → mineralocorticoides, sendo o mais importante a aldosterona. Fasciculada → glicocorticoides, principalmente o cortisol. Reticular → esteroides sexuais (estrogênios e androgênios).
c) A zona fasciculada, que constitui cerca de 75% do córtex total.
d) A medula é composta de células cromafínicas, que sintetizam e secretam catecolaminas, principalmente epinefrina. As catecolaminas permitem adaptações rápidas às alterações do ambiente.`
    },
    {
        type: "CASO CLÍNICO",
        text: `Mulher de 58 anos vai ao consultório após quase desmaiar. Relata fadiga progressiva há vários meses, dor abdominal leve e intermitente, perda de apetite e emagrecimento de 5 a 7,5 kg. Ao exame: temperatura 37,7 °C, FC 102 bpm, PA 89/62 mmHg, que cai para 70 mmHg de sistólica ao ficar de pé, com FC subindo para 125. Está bronzeada, com os sulcos das mãos hiperpigmentados. Laboratório: Na 121 mEq/L, K 5,8 mEq/L, HCO₃ 16 mEq/L, glicemia 52 mg/dL.

a) Qual o diagnóstico e a causa mais comum?
b) Qual o comportamento do ACTH e por quê?
c) Explique cada alteração laboratorial pelo hormônio que está faltando.
d) Por que a doença "começa insidiosamente e não chama a atenção" até fase avançada?`,
        interactionType: "textarea",
        gabarito: `a) Doença de Addison — insuficiência adrenocortical crônica primária (o defeito está no próprio córtex), aqui em descompensação aguda. A causa mais comum é a destruição autoimune idiopática.
b) O ACTH está elevado, porque, com os hormônios do córtex suprarrenal deficientes, não há inibição por feedback sobre a hipófise.
c) Faltam mineralocorticoides (aldosterona) → o túbulo distal não troca sódio por potássio → perda de sódio (Na 121 = hiponatremia), retenção de potássio (K 5,8 = hipercalemia), acidose metabólica (HCO₃ 16), depleção de volume e hipotensão com componente ortostático. Faltam glicocorticoides (cortisol) → gliconeogênese prejudicada → hipoglicemia (glicemia 52), além de fraqueza, anorexia e perda de peso.
d) Porque a doença começa insidiosamente e as queixas iniciais — fraqueza progressiva e cansaço fácil — podem ser interpretadas como reclamações não específicas. O quadro só chama atenção quando os níveis de glicocorticoides e mineralocorticoides circulantes já estão significativamente diminuídos.`
    },
    {
        type: "ABERTA",
        text: `Explique por que a insuficiência adrenal primária cursa com hiperpigmentação e hipercalemia, enquanto a secundária não apresenta nenhuma das duas.`,
        interactionType: "textarea",
        gabarito: `Hiperpigmentação. Na forma primária, o córtex está destruído e o cortisol baixo remove o feedback negativo sobre a hipófise → o ACTH sobe muito. Como o ACTH deriva da clivagem da POMC, a mesma pró-proteína que origina o MSH (hormônio estimulante de melanócitos), o excesso estimula os melanócitos → escurecimento cutâneo, sobretudo em áreas expostas ao sol e pontos de pressão — pescoço, cotovelos, joelhos e articulações dos dedos. Na forma secundária a falha é hipofisária, o ACTH está baixo, e por isso não há hiperpigmentação.

Hipercalemia. Na forma primária o córtex inteiro é destruído, incluindo a zona glomerulosa — falta aldosterona, e sem ela o túbulo distal retém potássio e perde sódio → hipercalemia e hiponatremia. Na forma secundária, a secreção de aldosterona é preservada, porque ela depende primariamente do sistema renina-angiotensina e da própria calemia, e não do ACTH — logo, não há hipercalemia.`
    },
    {
        type: "CASO CLÍNICO",
        text: `Mulher de 44 anos apresenta ganho de peso com obesidade de tronco, rosto arredondado e acúmulo de gordura na parte posterior do pescoço. Refere fraqueza para subir escadas e levantar-se da cadeira. Ao exame: estrias abdominais largas, pele fina que se machuca com facilidade, PA 156/98 mmHg. Laboratório: glicemia de jejum 142 mg/dL e glicosúria. Densitometria com osteoporose. Relata três episódios de infecção nos últimos seis meses.

a) Qual o diagnóstico?
b) Explique o mecanismo da fraqueza proximal e por que ela é proximal.
c) Explique o mecanismo da hiperglicemia, das estrias e da osteoporose.
d) Por que essa paciente tem infecções de repetição?`,
        interactionType: "textarea",
        gabarito: `a) Síndrome de Cushing (hipercortisolismo).
b) O hipercortisolismo causa atrofia seletiva das miofibras de contração rápida (tipo 2), resultando em massa muscular diminuída e fraqueza proximal nos membros. É proximal porque a musculatura de cinturas — que sustenta e movimenta o tronco contra a gravidade — é rica em fibras tipo 2, justamente as atrofiadas; daí a dificuldade de subir escadas e levantar-se da cadeira.
c) Hiperglicemia — os glicocorticoides induzem a gliconeogênese e inibem a captação de glicose pelas células, resultando em hiperglicemia, glicosúria e polidipsia (diabetes secundária). Estrias — os efeitos do catabolismo causam perda de colágeno, deixando a pele fina, frágil e facilmente machucável, com estrias particularmente comuns na área abdominal e cicatrização deficiente. Osteoporose — o catabolismo promove reabsorção óssea, com dor nas costas e suscetibilidade aumentada a fraturas.
d) Porque os glicocorticoides suprimem a resposta imunológica, colocando as pessoas com síndrome de Cushing sob risco para uma variedade de infecções.`
    },
    {
        type: "FECHADA",
        text: `Sobre as causas de hipercortisolismo, assinale a alternativa INCORRETA:`,
        interactionType: "multiple-choice",
        options: [
            "A) As causas dividem-se em exógenas e endógenas, sendo a exógena a administração de glicocorticoides (\"iatrogênica\").",
            "B) As causas endógenas podem ser dependentes ou independentes do ACTH.",
            "C) A secreção excessiva de ACTH por um tumor da glândula hipófise configura hipercortisolismo secundário.",
            "D) Tumores benignos ou malignos das suprarrenais e tumores não hipofisários secretores de ACTH estão entre as principais causas.",
            "E) Na síndrome de Cushing há atividade adrenocortical deficiente, com queda dos níveis de glicocorticoides circulantes."
        ],
        gabarito: `Alternativa E.

Na síndrome de Cushing a atividade adrenocortical é excessiva, não deficiente — o distúrbio é causado por condições que produzem níveis elevados de glicocorticoides. Atividade deficiente descreve a doença de Addison, que é o oposto.`
    },
    {
        type: "ASSOCIAÇÃO",
        text: `Associe cada tipo celular das ilhotas de Langerhans ao seu produto e função:

Célula
1 Célula β
2 Célula α
3 Célula δ
4 Célula PP

Produto e função
( ) Somatostatina, que suprime tanto a liberação de insulina quanto a de glucagon
( ) Glucagon, que estimula a glicogenólise hepática e aumenta o açúcar no sangue
( ) Polipeptídeo pancreático, responsável por diversos efeitos gastrointestinais
( ) Insulina, que regula a utilização da glicose nos tecidos e reduz a glicemia`,
        interactionType: "textarea",
        gabarito: `3 – 2 – 4 – 1

• Somatostatina, que suprime insulina e glucagon ← célula δ (3)
• Glucagon, que estimula a glicogenólise hepática ← célula α (2)
• Polipeptídeo pancreático, com efeitos gastrointestinais ← célula PP (4)
• Insulina, que reduz a glicemia ← célula β (1)

Resumo funcional: insulina — ação hipoglicemiante; glucagon — ação hiperglicemiante.`
    },
    {
        type: "CASO CLÍNICO",
        text: `Jovem de 18 anos é levada à emergência confusa e com comportamento estranho. A mãe relata perda não intencional de 10 kg, fadiga há 2–3 semanas e que a filha vem se levantando várias vezes à noite para urinar. Na manhã da consulta queixou-se de dor abdominal e vomitou. Ao exame: magra, afebril, FC 118 bpm, respiração profunda a 24 mpm, mucosa oral seca, veias do pescoço planas. Laboratório: glicemia 475 mg/dL, Na 131, K 5,3, CO₂ 9 mEq/L, pH 7,12, pCO₂ 24 mmHg. Urina com 3+ de glicose e 3+ de cetonas.

a) Qual o diagnóstico e o tipo de diabetes que ele provavelmente inaugura?
b) Qual a tríade clássica de apresentação desse tipo de diabetes?
c) Explique a cadeia que leva da deficiência de insulina à acidose e à hipovolemia.
d) Qual o nome e o significado do padrão respiratório apresentado?
e) Qual o mecanismo imunológico e quais autoanticorpos estão envolvidos?`,
        interactionType: "textarea",
        gabarito: `a) Cetoacidose diabética (CAD), inaugurando um diabetes melito tipo 1 — doença autoimune caracterizada pela destruição das células β e por deficiência ABSOLUTA de insulina, típica de indivíduos jovens.
b) Poliúria, polidipsia e polifagia — e, quando grave, também cetoacidose diabética, todas resultantes dos desarranjos metabólicos.
c) Deficiência grave e absoluta de insulina, com predomínio dos hormônios contrarreguladores → lipólise descontrolada → ácidos graxos livres ao fígado → cetogênese → acúmulo de corpos cetônicos → acidose metabólica com ânion-gap aumentado (pH 7,12, CO₂ 9, cetonas 3+).
Em paralelo: a hiperglicemia ultrapassa o limiar renal de reabsorção → glicosúria (3+) → diurese osmótica → poliúria e noctúria → desidratação e hipovolemia (mucosa seca, veias planas, taquicardia).
d) Respiração de Kussmaul — profunda e rápida. Significa compensação respiratória da acidose metabólica: o organismo hiperventila para eliminar CO₂ e elevar o pH, o que se confirma pela pCO₂ baixa (24 mmHg).
e) O DM1 resulta de predisposição genética, fator ambiental e hipersensibilidade mediada por linfócitos T, com destruição das células β. O tipo 1A é mediado imunologicamente, com autoanticorpos contra insulina (AAI) e autoanticorpos contra células das ilhotas. O tipo 1B é idiopático, não relacionado a distúrbios imunes.`
    },
    {
        type: "CASO CLÍNICO",
        text: `Mulher de 52 anos, assintomática, comparece a exame de rotina. IMC 29 kg/m², PA 140/92 mmHg, história familiar de diabetes e hipertensão em mãe e irmão. Ao exame, acantose nigricans no pescoço. Glicemia de jejum: 140 mg/dL.

a) Qual o diagnóstico e quais os dois defeitos metabólicos primordiais desse tipo de diabetes?
b) O valor da glicemia preenche critério diagnóstico? Justifique.
c) Explique o significado fisiopatológico da acantose nigricans.
d) Como se diferencia a deficiência de insulina desse tipo em relação ao tipo 1?`,
        interactionType: "textarea",
        gabarito: `a) Diabetes melito tipo 2. Os dois defeitos metabólicos primordiais são: (1) diminuição da resposta dos tecidos periféricos à insulina — especialmente músculo esquelético, tecido adiposo e fígado, ou seja, resistência à insulina; e (2) secreção inadequada de insulina pelas células β (disfunção da célula β).
b) Sim. O critério é glicose plasmática de jejum ≥ 126 mg/dL, e a paciente apresenta 140 mg/dL. O ideal é confirmar com nova dosagem ou com HbA1c.
c) A acantose nigricans é marcador cutâneo de resistência insulínica. A resistência gera hiperinsulinemia compensatória, e o excesso de insulina estimula receptores de IGF-1 em queratinócitos e fibroblastos, produzindo o espessamento aveludado e escurecido da pele em áreas de dobra.
d) No tipo 1 a deficiência de insulina é ABSOLUTA — as células β foram destruídas e não há produção. No tipo 2 a deficiência é RELATIVA: existe insulina circulante, muitas vezes até em excesso no início, mas ela é insuficiente diante da resistência periférica. Somam-se a secreção anormal pelas células β e a produção aumentada de glicose pelo fígado.`
    },
    {
        type: "FECHADA",
        text: `Sobre o diagnóstico e o monitoramento do diabetes, assinale a alternativa INCORRETA:`,
        interactionType: "multiple-choice",
        options: [
            "A) Os valores de glicose sanguínea são normalmente mantidos entre 70 e 120 mg/dL.",
            "B) Glicose plasmática de jejum ≥ 126 mg/dL é critério diagnóstico.",
            "C) Glicose plasmática de 2 horas ≥ 200 mg/dL no teste oral de tolerância à glicose, com carga de 75 g, é critério diagnóstico.",
            "D) HbA1c ≥ 6,5% é critério diagnóstico.",
            "E) A hemoglobina glicada reflete o controle glicêmico dos últimos 7 a 10 dias, uma vez que a ligação da glicose à hemoglobina é reversível e enzimática."
        ],
        gabarito: `Alternativa E.

A ligação da glicose à hemoglobina é irreversível e não enzimática, e a dosagem da fração HbA1c permite avaliação de longo prazo do controle glicêmico — o prazo avaliado é de cerca de 90 dias, não de 7 a 10 dias.`
    },
    {
        type: "ABERTA",
        text: `Sobre o diabetes melito gestacional:
a) Explique o mecanismo pelo qual a placenta contribui para a hiperglicemia.
b) Em que período da gestação costuma ser diagnosticado?
c) Cite cinco fatores de risco descritos no material.`,
        interactionType: "textarea",
        gabarito: `a) A placenta produz hormônios hiperglicemiantes e enzimas placentárias que degradam a insulina. Isso gera resistência à insulina e exige um aumento compensatório na produção de insulina; quando o pâncreas não consegue acompanhar essa demanda, instala-se a hiperglicemia.
b) É diagnosticado no 2º ou 3º trimestres da gestação.
c) Idade (fator importante); sobrepeso, obesidade ou ganho excessivo de peso; deposição central excessiva de gordura corporal; história familiar; crescimento fetal excessivo, polidrâmnio, hipertensão ou pré-eclâmpsia na gravidez atual; síndrome de ovários policísticos; baixa estatura (inferior a 1,5 m).`
    },
    {
        type: "ABERTA",
        text: `a) Classifique as complicações crônicas do diabetes descritas no material, separando os distúrbios da microcirculação das complicações macrovasculares.
b) Cite a complicação relacionada ao trato gastrointestinal e a complicação de membros inferiores.
c) Explique, em uma frase, por que o controle glicêmico estrito reduz as complicações microvasculares.`,
        interactionType: "textarea",
        gabarito: `a) Distúrbios da microcirculação: neuropatias, nefropatia e retinopatia. Complicações macrovasculares: doenças vasculares coronariana, cerebral e periférica.
b) No trato gastrointestinal, os transtornos gastrintestinais (com destaque para a gastroparesia, decorrente da neuropatia autonômica). Nos membros inferiores, as úlceras dos pés (pé diabético), resultado da combinação de neuropatia sensitiva, doença arterial periférica e infecção.
c) Porque as complicações microvasculares decorrem diretamente da glicotoxicidade — o estresse oxidativo e a glicação de proteínas provocados pela hiperglicemia crônica —, de modo que reduzir a exposição glicêmica ao longo do tempo reduz proporcionalmente esse dano endotelial e de membrana basal.`
    }
];
