# scripts/generate_cv.py
import json

cv_questions = [
  # 001
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre as fases do ciclo cardíaco definidas pelo estado das valvas, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Na contração isovolumétrica todas as valvas estão fechadas e a pressão ventricular sobe sem alteração de volume.",
      "B) A ejeção começa quando a pressão ventricular ultrapassa a pressão aórtica e a valva semilunar se abre.",
      "C) No relaxamento isovolumétrico as valvas atrioventriculares ainda estão fechadas e a pressão cai rapidamente.",
      "D) O enchimento ventricular rápido ocorre com as valvas atrioventriculares abertas, logo após a abertura da mitral.",
      "E) Durante a contração isovolumétrica o volume ventricular aumenta, porque o átrio continua ejetando sangue."
    ],
    "gabarito": "**Alternativa E** — Durante a contração isovolumétrica o volume ventricular aumenta, porque o átrio continua ejetando sangue.\n\n'Isovolumétrico' significa exatamente volume constante. Com todas as quatro valvas fechadas, nenhum sangue entra ou sai — só a pressão varia.\n\n• A) Descrição correta da fase.\n• B) Correto: a abertura da valva depende do gradiente de pressão.\n• C) Correto: as AV só abrem quando a pressão ventricular cai abaixo da atrial.\n• D) Correto: é a fase de enchimento rápido, passiva.\n\nRevisar: Ciclo cardíaco · fases pelo estado das valvas"
  },
  # 002
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "A primeira bulha cardíaca (B1) corresponde ao:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Fechamento das valvas atrioventriculares, no início da sístole.",
      "B) Fechamento das valvas semilunares, no início da diástole.",
      "C) Enchimento ventricular rápido, no início da diástole.",
      "D) Contração atrial contra ventrículo rígido, ao final da diástole."
    ],
    "gabarito": "**Alternativa A** — Fechamento das valvas atrioventriculares, no início da sístole.\n\nB1 = fechamento de mitral e tricúspide, marcando o início da sístole ventricular. B2 = fechamento de aórtica e pulmonar, início da diástole.\n\n• B) Essa é a B2.\n• C) Corresponde à B3, quando patológica.\n• D) Corresponde à B4.\n\nRevisar: Ciclo cardíaco · bulhas"
  },
  # 003
  {
    "type": "VERDADEIRO OU FALSO",
    "text": "Sobre o sistema de condução cardíaca e sua tradução eletrocardiográfica, julgue os itens:\n\n( ) O nó sinoatrial é o marca-passo fisiológico por ter a maior frequência intrínseca de despolarização.\n( ) O atraso na condução pelo nó atrioventricular permite que o átrio termine de esvaziar antes da contração ventricular.\n( ) O complexo QRS representa a repolarização ventricular.\n( ) O segmento ST corresponde à repolarização atrial.\n( ) O intervalo PR reflete o tempo entre o início da despolarização atrial e o início da despolarização ventricular.",
    "interactionType": "textarea",
    "gabarito": "**Sequência: V – V – F – F – V**\n\n• V) O automatismo mais rápido comanda o ritmo; abaixo dele, nó AV e sistema His-Purkinje funcionam como marca-passos subsidiários mais lentos.\n• V) É o atraso fisiológico que garante a contribuição atrial ao enchimento — perdida, por exemplo, na fibrilação atrial.\n• F) O QRS é a despolarização ventricular. A repolarização ventricular é a onda T.\n• F) O ST corresponde ao período em que todo o ventrículo está despolarizado. A repolarização atrial fica encoberta pelo QRS.\n• V) Inclui a condução atrial e, sobretudo, o atraso nodal AV.\n\nRevisar: Sistema de condução e correlação com o ECG"
  },
  # 004
  {
    "type": "QUESTÃO ABERTA",
    "text": "Partindo de PA = DC × RVP, sendo DC = FC × volume sistólico, responda:\na) Por que o infarto agudo do miocárdio extenso causa hipotensão?\nb) Por que a perda da capacidade de relaxamento vascular causa hipertensão?\nc) Em um paciente em choque hipovolêmico com taquicardia, qual variável está caindo e qual tenta compensar?",
    "interactionType": "textarea",
    "gabarito": "**Resposta-modelo:**\n\na) A necrose de massa miocárdica reduz a contratilidade → cai o volume sistólico → cai o débito cardíaco. Como a pressão é o produto do débito pela resistência, a queda do DC derruba a PA; a vasoconstrição compensatória pode sustentá-la temporariamente, mas se a perda contrátil for grande demais instala-se o choque cardiogênico.\n\nb) O endotélio disfuncional produz menos óxido nítrico e mais mediadores vasoconstritores; o vaso perde a capacidade de relaxar e a resistência vascular periférica sobe de forma sustentada. Com DC preservado, o aumento da RVP eleva a PA — é o mecanismo central da hipertensão essencial.\n\nc) Está caindo o volume sistólico, por redução da pré-carga (perda volêmica). A frequência cardíaca aumenta para tentar manter o produto FC × VS, ou seja, preservar o débito cardíaco.\n\nA equação é a chave de leitura de quase toda a hemodinâmica: identifique qual variável a doença ataca e qual o organismo recruta para compensar.\n\nRevisar: Determinantes da pressão arterial e do débito cardíaco"
  },
  # 005
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Assinale a alternativa que não corresponde a um dos mecanismos gerais de disfunção cardiovascular:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Falência da bomba, por contração ou relaxamento inadequados.",
      "B) Obstrução ao fluxo, como em estenose valvar ou coarctação da aorta.",
      "C) Fluxo regurgitante, com sobrecarga de volume da câmara a montante.",
      "D) Ruptura do coração ou de um vaso principal.",
      "E) Aumento isolado da complacência arterial com queda da resistência periférica."
    ],
    "gabarito": "**Alternativa E** — Aumento isolado da complacência arterial com queda da resistência periférica.\n\nOs mecanismos são falência da bomba, obstrução ao fluxo, fluxo regurgitante, distúrbios de condução, shunt e ruptura. Complacência arterial aumentada não figura como mecanismo de doença.\n\n• A) Mecanismo válido.\n• B) Mecanismo válido.\n• C) Mecanismo válido.\n• D) Mecanismo válido.\n\nRevisar: Os seis mecanismos de disfunção cardiovascular"
  },
  # 006
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre os mecanismos compensatórios da insuficiência cardíaca, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) O mecanismo de Frank-Starling aumenta a força de contração porque o alongamento das fibras favorece a formação de pontes de actina-miosina.",
      "B) A ativação adrenérgica aumenta frequência cardíaca, contratilidade e resistência vascular periférica.",
      "C) A angiotensina II eleva a pós-carga por vasoconstrição direta e a pré-carga por meio da aldosterona.",
      "D) O peptídeo natriurético atrial reforça o sistema renina-angiotensina-aldosterona, ampliando a retenção de sódio e água.",
      "E) Na fase avançada há dessensibilização dos receptores beta-1 e participação relativa maior dos receptores alfa-1."
    ],
    "gabarito": "**Alternativa D** — O peptídeo natriurético atrial reforça o sistema renina-angiotensina-aldosterona, ampliando a retenção de sódio e água.\n\nO peptídeo natriurético atrial é liberado pela distensão atrial e contrapõe-se ao SRAA: promove natriurese, diurese e vasodilatação. É um mecanismo de defesa, não de amplificação.\n\n• A) Correto — é a lei do coração.\n• B) Correto — efeito beta-1 cardíaco e alfa-1 vascular.\n• C) Correto — a angiotensina II atua nos dois braços da carga ventricular.\n• E) Correto — a exposição crônica às catecolaminas reduz a densidade de receptores beta-1.\n\nRevisar: Mecanismos compensatórios da insuficiência cardíaca"
  },
  # 007
  {
    "type": "QUESTÃO ABERTA",
    "text": "Explique por que os mecanismos compensatórios da insuficiência cardíaca, embora inicialmente úteis, tornam-se deletérios com o tempo. Cite pelo menos três exemplos de mecanismo que se volta contra o coração.",
    "interactionType": "textarea",
    "gabarito": "**Resposta-modelo:**\n\nA compensação é desenhada para uma agressão aguda e autolimitada, como uma hemorragia. Mantida cronicamente, cada mecanismo cobra um preço.\n\n• **Ativação adrenérgica:** sustenta débito no curto prazo, mas aumenta consumo miocárdico de oxigênio, é arritmogênica, promove apoptose de miócitos e leva à dessensibilização dos receptores beta-1 — o coração deixa de responder ao próprio estímulo.\n• **SRAA:** a retenção de sódio e água eleva a pré-carga e piora a congestão; a angiotensina II eleva a pós-carga, aumentando o trabalho de um ventrículo já falido, e estimula fibrose intersticial via aldosterona.\n• **Hipertrofia:** normaliza o estresse parietal inicialmente, mas a massa cresce sem proporcional expansão da rede coronariana → isquemia relativa; a parede espessa perde complacência → disfunção diastólica; e o remodelamento evolui para dilatação e queda da função sistólica.\n• **Frank-Starling:** só funciona até o ponto ótimo de estiramento; além dele, o alongamento excessivo reduz a sobreposição actina-miosina e a força cai — o ventrículo dilatado passa a operar no ramo descendente da curva.\n\nEsse é o conceito central da aula: a compensação é adaptativa por tempo limitado e, prolongada, transforma-se no próprio motor da progressão da doença.\n\nRevisar: Mecanismos compensatórios · da adaptação à progressão"
  },
  # 008
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Paciente com insuficiência cardíaca apresenta dispneia aos esforços, ortopneia, dispneia paroxística noturna e estertores crepitantes bibasais. Esse conjunto traduz predominantemente:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Congestão venosa sistêmica por falência do ventrículo direito.",
      "B) Congestão venosa pulmonar por falência do ventrículo esquerdo.",
      "C) Baixo débito com hipoperfusão periférica.",
      "D) Derrame pericárdico com restrição ao enchimento."
    ],
    "gabarito": "**Alternativa B** — Congestão venosa pulmonar por falência do ventrículo esquerdo.\n\nO ventrículo esquerdo que falha transmite pressão retrogradamente ao átrio esquerdo e ao leito capilar pulmonar. O decúbito aumenta o retorno venoso e agrava a congestão, produzindo ortopneia e DPN.\n\n• A) A falência direita dá turgência jugular, hepatomegalia e edema de membros.\n• C) Baixo débito cursa com fadiga, oligúria, extremidades frias e confusão.\n• D) Tamponamento cursa com hipofonese de bulhas, turgência jugular e pulso paradoxal.\n\nRevisar: Insuficiência cardíaca esquerda · manifestações"
  },
  # 009
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "São manifestações da insuficiência cardíaca direita, EXCETO:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Turgência jugular patológica.",
      "B) Hepatomegalia congestiva com refluxo hepatojugular.",
      "C) Edema de membros inferiores, vespertino e gravitacional.",
      "D) Ascite em fases avançadas.",
      "E) Estertores crepitantes bibasais e escarro rosado."
    ],
    "gabarito": "**Alternativa E** — Estertores crepitantes bibasais e escarro rosado.\n\nCrepitantes e escarro espumoso rosado são marcas da congestão pulmonar, portanto da falência esquerda. A falência direita congestiona o território sistêmico.\n\n• A) Manifestação de congestão sistêmica.\n• B) Manifestação de congestão sistêmica.\n• C) Manifestação de congestão sistêmica.\n• D) Manifestação de congestão sistêmica avançada.\n\nRevisar: Insuficiência cardíaca direita · manifestações"
  },
  # 010
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a distinção entre insuficiência cardíaca sistólica e diastólica, assinale a alternativa correta:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Na disfunção diastólica há redução da fração de ejeção e dilatação ventricular.",
      "B) Na disfunção sistólica o problema é o enchimento, com ventrículo pequeno e rígido.",
      "C) Na disfunção diastólica a fração de ejeção pode estar preservada, e o defeito é o relaxamento e a complacência.",
      "D) Ambas cursam obrigatoriamente com fração de ejeção abaixo de 40%.",
      "E) A disfunção diastólica não produz congestão pulmonar."
    ],
    "gabarito": "**Alternativa C** — Na disfunção diastólica a fração de ejeção pode estar preservada, e o defeito é o relaxamento e a complacência.\n\nNa IC diastólica o ventrículo contrai bem, mas não relaxa nem se distende adequadamente: as pressões de enchimento sobem e há congestão, mesmo com fração de ejeção normal.\n\n• A) Inverte: FE reduzida e dilatação caracterizam a disfunção sistólica.\n• B) Inverte a descrição.\n• D) A IC com FE preservada é justamente a exceção a essa regra.\n• E) Produz congestão, sim — por elevação da pressão de enchimento.\n\nRevisar: IC sistólica × diastólica"
  },
  # 011
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "O cor pulmonale é definido como:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Insuficiência cardíaca esquerda secundária a valvopatia mitral.",
      "B) Insuficiência ventricular direita decorrente de doença pulmonar ou da vasculatura pulmonar.",
      "C) Dilatação das quatro câmaras por miocardiopatia dilatada idiopática.",
      "D) Derrame pericárdico secundário a pneumonia."
    ],
    "gabarito": "**Alternativa B** — Insuficiência ventricular direita decorrente de doença pulmonar ou da vasculatura pulmonar.\n\nA doença pulmonar eleva a resistência vascular pulmonar; o ventrículo direito enfrenta sobrecarga de pressão crônica, hipertrofia e acaba falindo. A IC direita isolada é incomum e quase sempre tem essa origem.\n\n• A) Descreve IC esquerda de causa valvar.\n• C) Descreve miocardiopatia dilatada.\n• D) Não corresponde ao conceito.\n\nRevisar: Cor pulmonale · IC direita isolada"
  },
  # 012
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Na insuficiência cardíaca, a presença de terceira bulha (B3) indica:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Contração atrial vigorosa contra ventrículo pouco complacente.",
      "B) Enchimento ventricular rápido em ventrículo dilatado e com pressões elevadas.",
      "C) Fechamento anômalo da valva aórtica calcificada.",
      "D) Abertura da valva mitral estenosada."
    ],
    "gabarito": "**Alternativa B** — Enchimento ventricular rápido em ventrículo dilatado e com pressões elevadas.\n\nA B3 é protodiastólica e traduz a desaceleração brusca do sangue ao encontrar um ventrículo já cheio e dilatado — marcador de sobrecarga volumétrica e de pior prognóstico na IC.\n\n• A) Isso descreve a B4, telediastólica, típica do ventrículo rígido e hipertrofiado.\n• C) O fechamento aórtico gera o componente A2 da segunda bulha.\n• D) A abertura da mitral estenosada produz o estalido de abertura.\n\nRevisar: Semiologia da insuficiência cardíaca · B3 e B4"
  },
  # 013
  {
    "type": "ASSOCIAÇÃO",
    "text": "Associe cada achado ao mecanismo fisiopatológico correspondente:\n\n1. Ortopneia\n2. Turgência jugular\n3. Nictúria\n4. Fadiga e intolerância ao esforço\n5. Caquexia cardíaca\n\n( ) Redistribuição do fluido dos membros inferiores para o tórax em decúbito, aumentando a congestão pulmonar.\n( ) Elevação da pressão venosa central transmitida ao sistema jugular pela falência do ventrículo direito.\n( ) Reabsorção do edema periférico durante o decúbito noturno, com aumento do retorno venoso e da filtração renal.\n( ) Incapacidade de elevar o débito cardíaco proporcionalmente à demanda muscular.\n( ) Estado inflamatório crônico, congestão intestinal com má absorção e aumento do gasto energético.",
    "interactionType": "textarea",
    "gabarito": "**Sequência: 1 – 2 – 3 – 4 – 5**\n\n• 1) Ortopneia: Por isso o paciente dorme com vários travesseiros e alivia ao sentar.\n• 2) Turgência jugular: É o equivalente clínico da medida de pressão venosa central à beira do leito.\n• 3) Nictúria: Explica por que o paciente urina mais à noite do que durante o dia.\n• 4) Fadiga e intolerância ao esforço: É a tradução do baixo débito, e não da congestão.\n• 5) Caquexia cardíaca: Marcador de doença avançada e de mau prognóstico.\n\nRevisar: Insuficiência cardíaca · correlação clínico-fisiopatológica"
  },
  # 014
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a hipertrofia miocárdica como resposta à sobrecarga, assinale a INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) A sobrecarga de pressão tende a produzir hipertrofia concêntrica, com espessamento parietal e cavidade normal ou reduzida.",
      "B) A sobrecarga de volume tende a produzir hipertrofia excêntrica, com dilatação da cavidade.",
      "C) A hipertrofia normaliza inicialmente o estresse parietal, segundo a lei de Laplace.",
      "D) O crescimento da massa miocárdica é acompanhado de crescimento proporcional da rede capilar coronariana, o que protege contra isquemia.",
      "E) A hipertrofia mantida evolui para fibrose intersticial e disfunção diastólica."
    ],
    "gabarito": "**Alternativa D** — O crescimento da massa miocárdica é acompanhado de crescimento proporcional da rede capilar coronariana, o que protege contra isquemia.\n\nA vascularização não acompanha proporcionalmente o aumento de massa. Daí a isquemia relativa do miocárdio hipertrofiado — mecanismo da angina na estenose aórtica mesmo sem doença coronariana.\n\n• A) Correto — padrão da estenose aórtica e da hipertensão.\n• B) Correto — padrão das insuficiências valvares.\n• C) Correto — espessura maior reduz a tensão parietal.\n• E) Correto — é o caminho para a IC com FE preservada.\n\nRevisar: Hipertrofia miocárdica · concêntrica e excêntrica"
  },
  # 015
  {
    "type": "CASO CLÍNICO DISSERTATIVO",
    "text": "Homem de 68 anos, hipertenso de longa data e sem seguimento, refere dispneia progressiva há seis meses, hoje aos pequenos esforços, além de ortopneia de dois travesseiros. Ao exame: PA 168/104 mmHg, FC 92 bpm, estertores crepitantes em bases, ictus desviado e propulsivo, B4 audível, sem sopros significativos. Ecocardiograma: fração de ejeção 58%, hipertrofia concêntrica do ventrículo esquerdo, relação E/A alterada.\n\na) Qual o tipo de insuficiência cardíaca e como se explica a dispneia com fração de ejeção normal?\nb) Explique a cadeia que liga a hipertensão não tratada a esse quadro.\nc) Por que há B4 e o que ela significa?",
    "interactionType": "textarea",
    "gabarito": "**Resposta-modelo:**\n\na) **Insuficiência cardíaca com fração de ejeção preservada (ICFEp)**, isto é, disfunção diastólica. O ventrículo contrai bem, mas é rígido: para se encher, precisa de pressões mais altas, que se transmitem retrogradamente ao átrio esquerdo e ao capilar pulmonar → congestão → dispneia. A FE, que mede a fração ejetada e não a pressão de enchimento, permanece normal.\n\nb) **Cadeia fisiopatológica:** Hipertensão crônica → aumento sustentado da pós-carga → sobrecarga de pressão sobre o VE → hipertrofia concêntrica → aumento da espessura com queda da complacência → elevação das pressões de enchimento → congestão pulmonar. Em paralelo, a hipertrofia gera isquemia relativa e fibrose intersticial, que agravam a rigidez.\n\nc) **Significado da B4:** A B4 é telediastólica e resulta da contração atrial vigorosa contra um ventrículo pouco complacente. Sua presença indica justamente a rigidez ventricular que caracteriza a disfunção diastólica.\n\nO caso encadeia hipertensão → hipertrofia concêntrica → disfunção diastólica → congestão, que é o percurso mais cobrado em prova.\n\nRevisar: IC com fração de ejeção preservada"
  },
  # 016
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "O peptídeo natriurético tipo B (BNP) eleva-se na insuficiência cardíaca porque:",
    "interactionType": "multiple-choice",
    "options": [
      "A) É produzido pelo endotélio em resposta à vasoconstrição da angiotensina II.",
      "B) É liberado pelos miócitos ventriculares em resposta ao estiramento da parede por aumento das pressões de enchimento.",
      "C) É secretado pelo córtex adrenal junto com a aldosterona.",
      "D) Origina-se dos rins em resposta à queda da perfusão glomerular."
    ],
    "gabarito": "**Alternativa B** — É liberado pelos miócitos ventriculares em resposta ao estiramento da parede por aumento das pressões de enchimento.\n\nO estresse parietal é o estímulo. Por isso o BNP é útil para diferenciar dispneia de origem cardíaca de dispneia pulmonar e para estimar gravidade.\n\n• A) Não é de origem endotelial.\n• C) A adrenal produz aldosterona e cortisol, não BNP.\n• D) O rim libera renina, não peptídeo natriurético.\n\nRevisar: Marcadores diagnósticos na IC"
  },
  # 017
  {
    "type": "VERDADEIRO OU FALSO",
    "text": "Sobre a classificação e a avaliação da insuficiência cardíaca, julgue os itens:\n\n( ) A classificação funcional da NYHA baseia-se no grau de limitação imposto pelos sintomas às atividades cotidianas.\n( ) A insuficiência cardíaca de alto débito ocorre em situações como tireotoxicose, anemia grave e fístulas arteriovenosas.\n( ) A fração de ejeção normal exclui o diagnóstico de insuficiência cardíaca.\n( ) A congestão pulmonar na IC decorre do aumento da pressão hidrostática capilar pulmonar.\n( ) A dispneia paroxística noturna melhora tipicamente em segundos ao se sentar, diferentemente da ortopneia.",
    "interactionType": "textarea",
    "gabarito": "**Sequência: V – V – F – V – F**\n\n• V) Vai de I (sem limitação) a IV (sintomas em repouso) e pode variar no mesmo paciente ao longo do tempo.\n• V) Nessas condições o débito é alto, mas insuficiente para a demanda periférica aumentada.\n• F) A IC com fração de ejeção preservada responde por cerca de metade dos casos.\n• V) A pressão de enchimento elevada se transmite ao capilar e supera a pressão oncótica, extravasando líquido.\n• F) É o contrário: a ortopneia alivia em poucos minutos com a elevação do tronco, enquanto a DPN desperta o paciente e leva mais tempo para ceder.\n\nRevisar: Classificação e avaliação da insuficiência cardíaca"
  },
  # 018
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a hipertensão arterial sistêmica, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Na grande maioria dos casos é primária ou essencial, sem causa única identificável.",
      "B) A hipertensão secundária deve ser suspeitada em início precoce, resistência ao tratamento ou achados clínicos sugestivos.",
      "C) A hipertensão eleva a pós-carga e é causa importante de hipertrofia concêntrica do ventrículo esquerdo.",
      "D) O aumento sustentado da pressão acelera a aterosclerose e a lesão de órgãos-alvo.",
      "E) A hipertensão essencial decorre tipicamente de um único defeito monogênico de herança autossômica dominante."
    ],
    "gabarito": "**Alternativa E** — A hipertensão essencial decorre tipicamente de um único defeito monogênico de herança autossômica dominante.\n\nA hipertensão essencial é poligênica e multifatorial: interação de variantes genéticas com sal, obesidade, sedentarismo, álcool e estresse. Formas monogênicas existem, mas são raras.\n\n• A) Correto — cerca de 90% dos casos.\n• B) Correto — são os sinais de alerta clássicos.\n• C) Correto — é o mecanismo da cardiopatia hipertensiva.\n• D) Correto — coração, cérebro, rim, retina e vasos.\n\nRevisar: Hipertensão arterial · fisiopatologia"
  },
  # 019
  {
    "type": "CASO CLÍNICO DISSERTATIVO",
    "text": "Homem de 39 anos com diagnóstico recente de hipertensão chega ao pronto-socorro confuso, com cefaleia intensa e visão turva. PA 230/140 mmHg, fundoscopia com papiledema e hemorragias em chama de vela; creatinina elevada em relação a exames prévios.\n\na) Qual a síndrome e o que a diferencia de uma urgência hipertensiva?\nb) Explique o mecanismo da encefalopatia hipertensiva.\nc) Cite dois outros órgãos-alvo que devem ser avaliados e o achado esperado em cada um.",
    "interactionType": "textarea",
    "gabarito": "**Resposta-modelo:**\n\na) **Emergência hipertensiva com encefalopatia.** O que a define não é o valor da pressão, e sim a presença de lesão aguda de órgão-alvo em curso — aqui, sistema nervoso central e rim. Na urgência hipertensiva a pressão está muito elevada, mas sem lesão aguda instalada.\n\nb) **Mecanismo da encefalopatia hipertensiva:** A autorregulação cerebral mantém fluxo constante dentro de uma faixa de pressão. Ultrapassado o limite superior, ocorre vasodilatação forçada e hiperperfusão, com ruptura da barreira hematoencefálica, extravasamento e edema cerebral vasogênico — daí cefaleia, confusão, alterações visuais e papiledema.\n\nc) **Outros órgãos-alvo:**\n• **Rim:** nefroesclerose hipertensiva aguda, com elevação de creatinina, proteinúria e hematúria.\n• **Coração:** hipertrofia ventricular esquerda e, na fase aguda, edema agudo de pulmão ou isquemia miocárdica por desbalanço entre oferta e consumo de oxigênio.\n\n*A pergunta separa quem decora números de quem entende que a emergência se define pela lesão de órgão-alvo.*\n\nRevisar: Emergência hipertensiva e lesão de órgão-alvo"
  },
  # 020
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "A causa da isquemia miocárdica em mais de 90% dos casos é:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Espasmo coronariano puro.",
      "B) Aterosclerose coronariana.",
      "C) Embolia séptica por endocardite.",
      "D) Dissecção espontânea de coronária.",
      "E) Anemia grave isolada."
    ],
    "gabarito": "**Alternativa B** — Aterosclerose coronariana.\n\nA placa aterosclerótica reduz a luz do vaso, limita a reserva de fluxo e, ao se romper, precipita trombose — é o substrato dominante da doença arterial coronariana.\n\n• A) Ocorre na angina de Prinzmetal, condição minoritária.\n• C) Causa rara de isquemia coronariana.\n• D) Causa incomum, mais descrita em mulheres jovens.\n• E) Pode agravar isquemia, mas raramente é causa isolada.\n\nRevisar: Cardiopatia isquêmica · etiologia"
  },
  # 021
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a angina estável, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Costuma manifestar-se quando a obstrução compromete cerca de 70% ou mais da luz do vaso.",
      "B) A dor é episódica, previsível, desencadeada por esforço ou estresse e aliviada pelo repouso ou por nitrato.",
      "C) Resulta do desequilíbrio entre oferta e consumo de oxigênio, sem necrose de miócitos.",
      "D) A duração típica da dor é de poucos minutos, geralmente menos de 10 a 15.",
      "E) Cursa tipicamente com elevação de troponina, o que confirma o diagnóstico."
    ],
    "gabarito": "**Alternativa E** — Cursa tipicamente com elevação de troponina, o que confirma o diagnóstico.\n\nNa angina estável há isquemia sem necrose — e sem necrose não há liberação de troponina. Marcador elevado indica lesão miocárdica e desloca o quadro para síndrome coronariana aguda.\n\n• A) Correto — abaixo disso a reserva de fluxo geralmente compensa.\n• B) Correto — previsibilidade é a marca da angina estável.\n• C) Correto — é isquemia reversível.\n• D) Correto — dor prolongada sugere infarto.\n\nRevisar: Angina estável · características"
  },
  # 022
  {
    "type": "ASSOCIAÇÃO",
    "text": "Associe cada forma clínica de doença isquêmica à sua característica definidora:\n\n1. Angina estável\n2. Angina instável\n3. Angina de Prinzmetal\n4. Infarto agudo do miocárdio\n5. Isquemia silenciosa\n\n( ) Dor previsível ao esforço, aliviada pelo repouso, sem necrose.\n( ) Dor em repouso ou em limiar progressivamente menor, de início recente, sem elevação de marcadores.\n( ) Dor em repouso por espasmo coronariano, tipicamente com supradesnivelamento transitório de ST.\n( ) Necrose de miócitos com elevação de marcadores bioquímicos.\n( ) Isquemia documentada por exame, sem qualquer sintoma referido pelo paciente.",
    "interactionType": "textarea",
    "gabarito": "**Sequência: 1 – 2 – 3 – 4 – 5**\n\n• 1) Angina estável: Obstrução fixa com reserva de fluxo limitada.\n• 2) Angina instável: Traduz placa instável com trombo suboclusivo — é síndrome coronariana aguda.\n• 3) Angina de Prinzmetal: Pode ocorrer em coronárias sem obstrução significativa.\n• 4) Infarto agudo do miocárdio: A oclusão mantida ultrapassa o tempo de tolerância isquêmica do miocárdio.\n• 5) Isquemia silenciosa: Frequente em diabéticos, por neuropatia autonômica.\n\nRevisar: Formas clínicas da doença arterial coronariana"
  },
  # 023
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a aterosclerose, assinale a alternativa correta:",
    "interactionType": "multiple-choice",
    "options": [
      "A) A lesão inicial é a estria gordurosa, resultante do acúmulo de macrófagos repletos de lipídios na íntima.",
      "B) A placa estável caracteriza-se por capa fibrosa fina e grande núcleo lipídico.",
      "C) A ruptura da placa provoca vasodilatação local e melhora transitória do fluxo.",
      "D) O LDL exerce efeito protetor por transportar colesterol dos tecidos para o fígado.",
      "E) A disfunção endotelial não participa da gênese da placa."
    ],
    "gabarito": "**Alternativa A** — A lesão inicial é a estria gordurosa, resultante do acúmulo de macrófagos repletos de lipídios na íntima.\n\nA sequência é: agressão endotelial → entrada e oxidação de LDL na íntima → recrutamento de monócitos → células espumosas → estria gordurosa → placa fibrolipídica.\n\n• B) Capa fina e núcleo lipídico volumoso definem a placa instável, propensa à ruptura.\n• C) A ruptura expõe material trombogênico e desencadeia trombose, reduzindo ou ocluindo o fluxo.\n• D) Esse é o papel do HDL; o LDL leva colesterol aos tecidos.\n• E) A disfunção endotelial é o evento iniciador.\n\nRevisar: Aterosclerose · patogênese"
  },
  # 024
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "A oclusão da artéria descendente anterior esquerda produz infarto tipicamente em qual território?",
    "interactionType": "multiple-choice",
    "options": [
      "A) Parede inferior do ventrículo esquerdo e ventrículo direito.",
      "B) Parede anterior do ventrículo esquerdo e porção anterior do septo interventricular.",
      "C) Parede lateral do ventrículo esquerdo exclusivamente.",
      "D) Átrio direito e nó sinusal."
    ],
    "gabarito": "**Alternativa B** — Parede anterior do ventrículo esquerdo e porção anterior do septo interventricular.\n\nA DA irriga a parede anterior, o ápice e os dois terços anteriores do septo. É a artéria de maior território e, por isso, seus infartos costumam ser mais extensos.\n\n• A) Território da coronária direita.\n• C) Território predominante da circunflexa.\n• D) Território de ramos atriais da coronária direita.\n\nRevisar: Territórios coronarianos"
  },
  # 025
  {
    "type": "VERDADEIRO OU FALSO",
    "text": "Sobre a cronologia da lesão isquêmica miocárdica, julgue os itens:\n\n( ) A interrupção do fluxo leva em segundos à mudança do metabolismo aeróbio para anaeróbio, com queda do ATP e acúmulo de lactato.\n( ) A lesão torna-se irreversível já nos primeiros cinco minutos de oclusão completa.\n( ) A necrose progride da região subendocárdica para a subepicárdica, em frente de onda.\n( ) A reperfusão é sempre isenta de dano adicional ao miocárdio.\n( ) O infarto transmural compromete toda a espessura da parede e associa-se tipicamente a supradesnivelamento de ST.",
    "interactionType": "textarea",
    "gabarito": "**Sequência: V – F – V – F – V**\n\n• V) A perda de contratilidade ocorre precocemente, ainda na fase de lesão reversível.\n• F) A janela de reversibilidade é de cerca de 20 a 30 minutos; depois disso inicia-se a necrose.\n• V) O subendocárdio é o território mais vulnerável, por maior pressão intramural e menor perfusão.\n• F) A lesão de reperfusão existe: sobrecarga de cálcio, radicais livres e inflamação podem ampliar o dano.\n• V) O não transmural, subendocárdico, cursa em geral sem supra de ST.\n\nRevisar: IAM · cronologia da lesão celular"
  },
  # 026
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre os marcadores bioquímicos do infarto agudo do miocárdio, assinale a INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) As troponinas I e T são os marcadores de maior sensibilidade e especificidade para lesão miocárdica.",
      "B) A troponina começa a se elevar em algumas horas e permanece alterada por vários dias.",
      "C) A CK-MB é útil sobretudo para detectar reinfarto, por normalizar mais rapidamente.",
      "D) A mioglobina eleva-se precocemente, mas tem baixa especificidade.",
      "E) A troponina elevada é exclusiva do infarto por aterotrombose, não ocorrendo em outras condições."
    ],
    "gabarito": "**Alternativa E** — A troponina elevada é exclusiva do infarto por aterotrombose, não ocorrendo em outras condições.\n\nTroponina indica lesão de miócito, qualquer que seja a causa: sepse, tromboembolismo pulmonar, miocardite, insuficiência renal e taquiarritmias também a elevam. O contexto clínico é indispensável.\n\n• A) Correto.\n• B) Correto — janela longa, útil no diagnóstico tardio.\n• C) Correto — normaliza em 48 a 72 horas.\n• D) Correto — sobe cedo, mas está presente em músculo esquelético.\n\nRevisar: Marcadores bioquímicos do IAM"
  },
  # 027
  {
    "type": "CASO CLÍNICO DISSERTATIVO",
    "text": "Homem de 56 anos chega ao pronto-socorro com dor retroesternal em aperto há 50 minutos, irradiada para o membro superior esquerdo e mandíbula, com sudorese fria e náuseas. Hipertenso, dislipidêmico e tabagista. ECG com supradesnivelamento de ST em V1–V4.\n\na) Qual o diagnóstico e o território provável?\nb) Explique a cadeia fisiopatológica desde a placa até o supradesnivelamento de ST.\nc) Por que o tempo é decisivo nesse quadro?",
    "interactionType": "textarea",
    "gabarito": "**Resposta-modelo:**\n\na) **Diagnóstico:** Infarto agudo do miocárdio com supradesnivelamento de ST, de parede anterior — território da artéria descendente anterior esquerda (V1 a V4).\n\nb) **Cadeia fisiopatológica:** Placa aterosclerótica instável, de capa fibrosa fina → ruptura ou erosão → exposição do núcleo lipídico e do colágeno subendotelial → adesão e agregação plaquetária → ativação da cascata de coagulação → trombo oclusivo → interrupção do fluxo → isquemia transmural. A lesão de toda a espessura da parede altera as correntes de repolarização e produz o supradesnivelamento de ST.\n\nc) **Por que o tempo é decisivo:** Porque a necrose avança em frente de onda, do subendocárdio ao epicárdio, ao longo das primeiras horas. Quanto mais precoce a reperfusão, maior a massa miocárdica salva — e a massa preservada determina a função ventricular residual e o prognóstico.\n\nRevisar: Síndrome coronariana aguda com supra de ST"
  },
  # 028
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Em relação às complicações mecânicas do infarto agudo do miocárdio, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) A ruptura de parede livre pode causar tamponamento cardíaco e morte súbita.",
      "B) A ruptura do septo interventricular gera comunicação interventricular, com sopro holossistólico novo.",
      "C) A ruptura ou disfunção de músculo papilar produz insuficiência mitral aguda com edema pulmonar.",
      "D) O aneurisma ventricular tardio predispõe à formação de trombo mural e a arritmias.",
      "E) As complicações mecânicas ocorrem exclusivamente nas primeiras seis horas do infarto."
    ],
    "gabarito": "**Alternativa E** — As complicações mecânicas ocorrem exclusivamente nas primeiras seis horas do infarto.\n\nAs rupturas concentram-se entre o 3º e o 7º dia, quando a necrose está mais amolecida pela digestão inflamatória do tecido. O aneurisma é complicação tardia, de semanas a meses.\n\n• A) Correto — complicação catastrófica.\n• B) Correto — sopro novo com deterioração hemodinâmica.\n• C) Correto — quadro de edema agudo com sopro sistólico.\n• D) Correto — a parede fina e discinética favorece estase.\n\nRevisar: Complicações do infarto agudo do miocárdio"
  },
  # 029
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre os mecanismos das arritmias, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) A reentrada exige duas vias de condução com velocidades e períodos refratários diferentes e um bloqueio unidirecional.",
      "B) O automatismo anormal ocorre quando células que normalmente não disparam passam a despolarizar espontaneamente.",
      "C) A atividade deflagrada depende de pós-potenciais precoces ou tardios que atingem o limiar.",
      "D) Isquemia, distúrbios eletrolíticos e fármacos são causas frequentes de arritmia.",
      "E) A reentrada só é possível em corações estruturalmente normais, sem fibrose ou cicatriz."
    ],
    "gabarito": "**Alternativa E** — A reentrada só é possível em corações estruturalmente normais, sem fibrose ou cicatriz.\n\nÉ justamente o oposto: cicatriz de infarto e fibrose criam zonas de condução lenta e bloqueio unidirecional, que são o substrato clássico do circuito de reentrada.\n\n• A) Correto — são as três condições necessárias.\n• B) Correto — foco ectópico.\n• C) Correto — é o mecanismo de torsades de pointes, por exemplo.\n• D) Correto — hipocalemia, hipomagnesemia e digitálicos são exemplos.\n\nRevisar: Arritmias · mecanismos"
  },
  # 030
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Na síndrome de Wolff-Parkinson-White, o substrato anatômico é:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Um circuito de reentrada confinado ao nó atrioventricular.",
      "B) Uma via acessória que conecta átrio e ventrículo, contornando o nó AV.",
      "C) Fibrose difusa do sistema His-Purkinje.",
      "D) Mutação em canal de potássio com prolongamento do QT."
    ],
    "gabarito": "**Alternativa B** — Uma via acessória que conecta átrio e ventrículo, contornando o nó AV.\n\nO feixe de Kent conduz o impulso diretamente do átrio ao ventrículo, sem o atraso nodal. Daí a pré-excitação: PR curto e onda delta no ECG.\n\n• A) Descreve a taquicardia por reentrada nodal.\n• C) Produz bloqueios de condução, não pré-excitação.\n• D) Descreve as canalopatias do QT longo.\n\nRevisar: Arritmias por vias acessórias"
  },
  # 031
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a fibrilação atrial, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) O ritmo é irregularmente irregular e não se identificam ondas P organizadas.",
      "B) A perda da contração atrial efetiva reduz o enchimento ventricular, o que é especialmente mal tolerado no ventrículo rígido.",
      "C) A estase no átrio esquerdo, sobretudo no apêndice atrial, favorece a formação de trombos e o embolismo sistêmico.",
      "D) A estenose mitral é uma das causas clássicas, por dilatação e sobrecarga do átrio esquerdo.",
      "E) A fibrilação atrial protege contra fenômenos tromboembólicos, por manter o sangue em constante movimento."
    ],
    "gabarito": "**Alternativa E** — A fibrilação atrial protege contra fenômenos tromboembólicos, por manter o sangue em constante movimento.\n\nOcorre exatamente o contrário: o átrio fibrilante não se contrai de modo organizado, o sangue estagna e formam-se trombos — daí o risco de AVC cardioembólico.\n\n• A) Correto — é a assinatura eletrocardiográfica.\n• B) Correto — a contribuição atrial pode responder por até 25% do enchimento.\n• C) Correto — o apêndice atrial esquerdo é a sede preferencial.\n• D) Correto — a sobrecarga crônica remodela o átrio.\n\nRevisar: Fibrilação atrial"
  },
  # 032
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre as canalopatias, assinale a alternativa correta:",
    "interactionType": "multiple-choice",
    "options": [
      "A) São doenças estruturais do miocárdio, com hipertrofia evidente ao ecocardiograma.",
      "B) Decorrem de mutações em genes de canais iônicos, com coração estruturalmente normal e risco de arritmia maligna.",
      "C) Manifestam-se exclusivamente na sexta década de vida.",
      "D) O QT longo congênito associa-se tipicamente a bradiarritmias sinusais benignas."
    ],
    "gabarito": "**Alternativa B** — Decorrem de mutações em genes de canais iônicos, com coração estruturalmente normal e risco de arritmia maligna.\n\nCanalopatias como QT longo, QT curto e síndrome de Brugada alteram correntes de sódio, potássio ou cálcio. O coração é normal à imagem, mas o substrato elétrico predispõe a taquiarritmias ventriculares e morte súbita.\n\n• A) Doença estrutural é o oposto do conceito de canalopatia.\n• C) Frequentemente se manifestam em crianças, adolescentes e adultos jovens.\n• D) O QT longo predispõe a torsades de pointes, taquiarritmia ventricular polimórfica.\n\nRevisar: Canalopatias e morte súbita"
  },
  # 033
  {
    "type": "VERDADEIRO OU FALSO",
    "text": "Sobre as manifestações e repercussões das arritmias, julgue os itens:\n\n( ) Palpitações, tontura, síncope e morte súbita são formas possíveis de apresentação.\n( ) A taquicardia excessiva pode reduzir o débito cardíaco por encurtamento do tempo de enchimento diastólico.\n( ) A bradicardia grave compromete o débito porque, com volume sistólico fixo, o produto FC × VS cai.\n( ) A fibrilação ventricular gera contração organizada e débito reduzido, porém suficiente para manter a consciência.\n( ) A síncope de origem arrítmica costuma ser súbita, sem pródromos, com recuperação rápida.",
    "interactionType": "textarea",
    "gabarito": "**Sequência: V – V – V – F – V**\n\n• V) A mesma arritmia pode ser assintomática em um paciente e catastrófica em outro, conforme a reserva cardiovascular.\n• V) Acima de certa frequência, o ganho em FC não compensa a perda de volume sistólico.\n• V) Daí a indicação de marca-passo em bradiarritmias sintomáticas.\n• F) Na fibrilação ventricular não há contração organizada nem débito: é parada cardiorrespiratória.\n• V) Diferencia-se da síncope vasovagal, que tem pródromos e recuperação mais lenta.\n\nRevisar: Arritmias · manifestações clínicas"
  },
  # 034
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "A causa mais frequente de morte súbita cardíaca em adultos é:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Miocardiopatia hipertrófica.",
      "B) Doença arterial coronariana.",
      "C) Síndrome de Brugada.",
      "D) Miocardite viral aguda.",
      "E) Displasia arritmogênica do ventrículo direito."
    ],
    "gabarito": "**Alternativa B** — Doença arterial coronariana.\n\nNa população adulta a doença coronariana responde pela maioria dos casos, geralmente por fibrilação ventricular deflagrada em território isquêmico ou em cicatriz de infarto prévio.\n\n• A) Principal causa em atletas jovens, não na população adulta geral.\n• C) Causa importante, porém bem menos frequente.\n• D) Causa possível em jovens, mas minoritária.\n• E) Causa incomum, associada a jovens e atletas.\n\nRevisar: Morte súbita cardíaca"
  },
  # 035
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a diferença conceitual entre estenose e insuficiência valvar, é correto afirmar que:",
    "interactionType": "multiple-choice",
    "options": [
      "A) A estenose impõe sobrecarga de volume à câmara a montante, e a insuficiência, sobrecarga de pressão.",
      "B) A estenose impõe sobrecarga de pressão à câmara a montante, e a insuficiência, sobrecarga de volume.",
      "C) Ambas impõem sobrecarga de pressão.",
      "D) Ambas impõem sobrecarga de volume."
    ],
    "gabarito": "**Alternativa B** — A estenose impõe sobrecarga de pressão à câmara a montante, e a insuficiência, sobrecarga de volume.\n\nNa estenose a câmara precisa gerar pressão maior para vencer a obstrução → hipertrofia concêntrica. Na insuficiência, parte do sangue retorna e a câmara recebe volume extra → dilatação e hipertrofia excêntrica.\n\n• A) Inverte os dois mecanismos.\n• C) A insuficiência é sobrecarga de volume.\n• D) A estenose é sobrecarga de pressão.\n\nRevisar: Valvopatias · estenose × insuficiência"
  },
  # 036
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "A tríade clássica da estenose aórtica é composta por:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Dispneia, hemoptise e rouquidão.",
      "B) Angina, síncope aos esforços e dispneia por insuficiência cardíaca.",
      "C) Palpitações, febre e fenômenos embólicos.",
      "D) Dor torácica pleurítica, atrito pericárdico e febre."
    ],
    "gabarito": "**Alternativa B** — Angina, síncope aos esforços e dispneia por insuficiência cardíaca.\n\nAngina pela isquemia relativa do miocárdio hipertrofiado; síncope porque o débito é fixo e não sobe com o esforço enquanto a periferia vasodilata; dispneia pela disfunção diastólica e congestão pulmonar.\n\n• A) Sugere estenose mitral avançada com hipertensão pulmonar.\n• C) Sugere endocardite infecciosa.\n• D) Sugere pericardite aguda.\n\nRevisar: Estenose aórtica · tríade clássica"
  },
  # 037
  {
    "type": "CASO CLÍNICO DISSERTATIVO",
    "text": "Mulher de 26 anos, com história de febre reumática na adolescência, está no segundo trimestre de gestação e procura atendimento por dispneia progressiva, ortopneia e um episódio de hemoptise. Ausculta: B1 hiperfonética, estalido de abertura e sopro diastólico em ruflar no foco mitral. Ritmo irregularmente irregular.\n\na) Qual a valvopatia e sua causa?\nb) Explique por que a gestação descompensou o quadro.\nc) Explique o mecanismo da hemoptise e o significado do ritmo irregular.",
    "interactionType": "textarea",
    "gabarito": "**Resposta-modelo:**\n\na) **Estenose mitral de etiologia reumática.** A febre reumática é a causa clássica: a inflamação leva a fusão comissural, espessamento e retração das cúspides e do aparelho subvalvar.\n\nb) **Por que a gestação descompensa:** A gestação aumenta o volume plasmático em cerca de 40% e eleva a frequência cardíaca. Ambos são deletérios na estenose mitral: mais volume a atravessar um orifício fixo e menos tempo de diástole para o átrio esvaziar. O resultado é aumento abrupto da pressão atrial esquerda e congestão pulmonar — por isso a estenose mitral tipicamente se revela na gravidez.\n\nc) **Hemoptise e ritmo irregular:** A hipertensão venocapilar pulmonar crônica rompe pequenas veias brônquicas dilatadas, produzindo hemoptise. O ritmo irregularmente irregular indica fibrilação atrial, consequência da dilatação e do remodelamento do átrio esquerdo sobrecarregado — e traz risco adicional de trombo atrial e embolia sistêmica.\n\nRevisar: Estenose mitral · fisiopatologia e descompensação"
  },
  # 038
  {
    "type": "ASSOCIAÇÃO",
    "text": "Associe cada valvopatia ao seu achado auscultatório característico:\n\n1. Estenose aórtica\n2. Insuficiência aórtica\n3. Estenose mitral\n4. Insuficiência mitral\n\n( ) Sopro mesossistólico em crescendo-decrescendo, no foco aórtico, irradiado para carótidas.\n( ) Sopro protodiastólico aspirativo, em decrescendo, na borda esternal esquerda, com pressão de pulso alargada.\n( ) Sopro diastólico em ruflar com reforço pré-sistólico, B1 hiperfonética e estalido de abertura.\n( ) Sopro holossistólico em foco mitral, irradiado para a axila.",
    "interactionType": "textarea",
    "gabarito": "**Sequência: 1 – 2 – 3 – 4**\n\n• 1) Estenose aórtica: Acompanha-se de pulso parvus et tardus e, muitas vezes, de B4.\n• 2) Insuficiência aórtica: O refluxo diastólico eleva a pressão sistólica e derruba a diastólica.\n• 3) Estenose mitral: O reforço pré-sistólico desaparece quando se instala fibrilação atrial.\n• 4) Insuficiência mitral: A regurgitação ocorre durante toda a sístole, porque o gradiente VE–AE é permanente nessa fase.\n\nRevisar: Valvopatias · correlação auscultatória"
  },
  # 039
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "A B1 hiperfonética na estenose mitral é explicada por:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Aumento da contratilidade ventricular esquerda.",
      "B) Fechamento de uma valva espessada, que permanece mais aberta ao final da diástole e fecha com maior excursão e energia.",
      "C) Ausência de contração atrial.",
      "D) Redução do gradiente transvalvar mitral."
    ],
    "gabarito": "**Alternativa B** — Fechamento de uma valva espessada, que permanece mais aberta ao final da diástole e fecha com maior excursão e energia.\n\nO gradiente atrioventricular persistente mantém a cúspide espessada afastada até o início da sístole; o fechamento ocorre a partir de posição mais aberta, gerando som mais intenso.\n\n• A) A contratilidade do VE costuma estar preservada na estenose mitral pura.\n• C) A perda da contração atrial ocorre na fibrilação, mas não explica a hiperfonese.\n• D) O gradiente está aumentado, e não reduzido.\n\nRevisar: Estenose mitral · semiologia"
  },
  # 040
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a estenose aórtica calcificada do idoso, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) É a valvopatia mais frequente em idosos em países desenvolvidos.",
      "B) Compartilha fatores de risco com a aterosclerose, como idade, dislipidemia e tabagismo.",
      "C) Provoca hipertrofia concêntrica do ventrículo esquerdo.",
      "D) A válvula aórtica bicúspide predispõe à calcificação e ao aparecimento mais precoce da estenose.",
      "E) A instalação dos sintomas não altera o prognóstico, que permanece benigno por décadas."
    ],
    "gabarito": "**Alternativa E** — A instalação dos sintomas não altera o prognóstico, que permanece benigno por décadas.\n\nO aparecimento de sintomas marca a virada prognóstica: a sobrevida média cai drasticamente — cerca de 5 anos após a angina, 3 após a síncope e 2 após a insuficiência cardíaca, sem intervenção.\n\n• A) Correto.\n• B) Correto — é um processo ativo, inflamatório e calcificante.\n• C) Correto — resposta à sobrecarga de pressão.\n• D) Correto — a bicúspide antecipa o quadro em uma ou duas décadas.\n\nRevisar: Estenose aórtica calcificada"
  },
  # 041
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Assinale a alternativa que associa corretamente o tipo de choque ao seu mecanismo:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Choque cardiogênico — perda de volume intravascular.",
      "B) Choque hipovolêmico — falência da bomba com débito reduzido.",
      "C) Choque distributivo — vasodilatação com má distribuição do fluxo e queda da resistência periférica.",
      "D) Choque obstrutivo — vasodilatação sistêmica por mediadores inflamatórios."
    ],
    "gabarito": "**Alternativa C** — Choque distributivo — vasodilatação com má distribuição do fluxo e queda da resistência periférica.\n\nNo choque distributivo (séptico, anafilático, neurogênico) o volume e a bomba podem estar adequados, mas a resistência despenca e o fluxo é mal distribuído.\n\n• A) Perda de volume define o choque hipovolêmico.\n• B) Falência de bomba define o cardiogênico.\n• D) O obstrutivo decorre de barreira mecânica ao fluxo: tamponamento, pneumotórax hipertensivo, embolia pulmonar maciça.\n\nRevisar: Choque · classificação fisiopatológica"
  },
  # 042
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Paciente em choque séptico apresenta extremidades quentes, pressão de pulso alargada e tempo de enchimento capilar normal na fase inicial. Isso se explica por:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Vasoconstrição periférica intensa mediada por catecolaminas.",
      "B) Vasodilatação sistêmica com débito cardíaco elevado, característica da fase hiperdinâmica.",
      "C) Redução primária do volume sistólico por falência miocárdica.",
      "D) Obstrução ao enchimento ventricular por tamponamento."
    ],
    "gabarito": "**Alternativa B** — Vasodilatação sistêmica com débito cardíaco elevado, característica da fase hiperdinâmica.\n\nNa fase quente do choque séptico a resistência vascular está muito baixa e o coração compensa com débito elevado. A hipoperfusão é tecidual e distributiva, não por falta de fluxo global.\n\n• A) A vasoconstrição produz extremidades frias — padrão do choque hipovolêmico e do cardiogênico.\n• C) Ocorre no cardiogênico e na fase tardia do séptico, com disfunção miocárdica.\n• D) Não corresponde ao quadro descrito.\n\nRevisar: Choque distributivo · fase hiperdinâmica"
  },
  # 043
  {
    "type": "VERDADEIRO OU FALSO",
    "text": "Sobre as respostas compensatórias ao choque hipovolêmico, julgue os itens:\n\n( ) A taquicardia é uma das primeiras respostas e visa manter o débito cardíaco diante da queda do volume sistólico.\n( ) A pressão arterial cai precocemente, antes de qualquer sinal de vasoconstrição periférica.\n( ) A ativação do sistema renina-angiotensina-aldosterona promove retenção de sódio e água e vasoconstrição.\n( ) A redistribuição do fluxo prioriza cérebro e coração em detrimento de pele, músculo, rim e trato gastrointestinal.\n( ) A acidose láctica no choque reflete metabolismo anaeróbio por hipoperfusão tecidual.",
    "interactionType": "textarea",
    "gabarito": "**Sequência: V – F – V – V – V**\n\n• V) Por isso a frequência cardíaca é marcador mais precoce que a pressão arterial.\n• F) A PA é um marcador tardio: a vasoconstrição a sustenta até perdas volêmicas consideráveis, sobretudo em jovens.\n• V) Somada à liberação de ADH, tenta restaurar o volume circulante.\n• V) Daí a oligúria e as extremidades frias como sinais precoces.\n• V) O lactato é, por isso, marcador de gravidade e de resposta à ressuscitação.\n\nRevisar: Choque hipovolêmico · compensação"
  },
  # 044
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a tríade de Virchow, assinale a alternativa correta:",
    "interactionType": "multiple-choice",
    "options": [
      "A) É composta por estase venosa, lesão endotelial e hipercoagulabilidade.",
      "B) É composta por dor, edema e eritema.",
      "C) Descreve as três camadas da parede arterial.",
      "D) Refere-se às três fases da aterosclerose."
    ],
    "gabarito": "**Alternativa A** — É composta por estase venosa, lesão endotelial e hipercoagulabilidade.\n\nOs três fatores explicam a formação de trombos e orientam a identificação de risco: imobilidade, trauma ou cirurgia e estados pró-trombóticos.\n\n• B) São manifestações clínicas da trombose, não a tríade.\n• C) As camadas são íntima, média e adventícia.\n• D) Não corresponde.\n\nRevisar: Trombose venosa · tríade de Virchow"
  },
  # 045
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre o aneurisma de aorta abdominal, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Associa-se fortemente à aterosclerose, ao tabagismo e à hipertensão.",
      "B) A lei de Laplace explica por que, quanto maior o diâmetro, maior a tensão parietal e o risco de ruptura.",
      "C) A maioria é assintomática até a ruptura ou a expansão rápida.",
      "D) A ruptura cursa com dor abdominal ou lombar intensa, hipotensão e massa pulsátil.",
      "E) O risco de ruptura é independente do diâmetro do aneurisma."
    ],
    "gabarito": "**Alternativa E** — O risco de ruptura é independente do diâmetro do aneurisma.\n\nO diâmetro é o principal preditor de ruptura — é exatamente por isso que o seguimento e a indicação cirúrgica se baseiam nele.\n\n• A) Correto.\n• B) Correto — tensão proporcional ao raio.\n• C) Correto — daí o valor do rastreamento em grupos de risco.\n• D) Correto — é a tríade clássica da ruptura.\n\nRevisar: Aneurisma de aorta · fisiopatologia"
  },
  # 046
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "A claudicação intermitente da doença arterial obstrutiva periférica caracteriza-se por:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Dor em repouso que piora com a elevação do membro.",
      "B) Dor muscular desencadeada pelo exercício e aliviada pelo repouso, reprodutível a uma distância previsível.",
      "C) Dor em queimação noturna, aliviada pela deambulação.",
      "D) Edema unilateral com empastamento de panturrilha."
    ],
    "gabarito": "**Alternativa B** — Dor muscular desencadeada pelo exercício e aliviada pelo repouso, reprodutível a uma distância previsível.\n\nÉ o equivalente periférico da angina estável: a obstrução limita a reserva de fluxo, e a demanda do exercício não é atendida. Em repouso, a oferta volta a ser suficiente.\n\n• A) Dor em repouso indica isquemia crítica, estágio mais avançado.\n• C) Sugere neuropatia, não isquemia por esforço.\n• D) Sugere trombose venosa profunda.\n\nRevisar: Doença arterial periférica"
  },
  # 047
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre o edema, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) O aumento da pressão hidrostática capilar é o mecanismo predominante no edema da insuficiência cardíaca.",
      "B) A queda da pressão oncótica do plasma é o mecanismo do edema na síndrome nefrótica e na cirrose avançada.",
      "C) O aumento da permeabilidade capilar explica o edema inflamatório.",
      "D) A obstrução linfática produz edema tipicamente depressível e de instalação súbita.",
      "E) A retenção renal de sódio e água amplifica o edema em várias dessas condições."
    ],
    "gabarito": "**Alternativa D** — A obstrução linfática produz edema tipicamente depressível e de instalação súbita.\n\nO linfedema é caracteristicamente não depressível (pouco cacifo), de instalação lenta e progressiva, com espessamento cutâneo — porque se acumulam proteínas e ocorre fibrose, e não apenas água.\n\n• A) Correto.\n• B) Correto — hipoalbuminemia.\n• C) Correto — extravasamento de proteínas e líquido.\n• E) Correto — o rim participa em praticamente todos os edemas generalizados.\n\nRevisar: Mecanismos de formação do edema"
  },
  # 048
  {
    "type": "QUESTÃO ABERTA",
    "text": "Um paciente com insuficiência cardíaca descompensada apresenta oligúria, ureia e creatinina em elevação e piora da congestão. Explique, pela fisiopatologia, por que o rim 'entende' a situação como hipovolemia e por que essa leitura agrava o quadro.",
    "interactionType": "textarea",
    "gabarito": "**Resposta-modelo:**\n\nO rim não mede volume total: mede volume arterial efetivo, isto é, a perfusão que chega ao aparelho justaglomerular. Na IC descompensada, o débito cardíaco cai e a perfusão renal diminui, mesmo com o paciente francamente congesto.\n\nInterpretando isso como hipovolemia, o rim ativa o sistema renina-angiotensina-aldosterona e o organismo libera ADH. O resultado é retenção de sódio e água, vasoconstrição e aumento da pré-carga e da pós-carga.\n\nO efeito é paradoxal e vicioso: mais volume retido → mais congestão → maior pressão venosa renal, que também compromete a filtração → mais isquemia relativa do rim → mais ativação neuro-hormonal. É a base da síndrome cardiorrenal.\n\nClinicamente, isso explica por que o paciente pode ter edema, turgência jugular e ascite e, ainda assim, apresentar marcadores de hipoperfusão renal — e por que o tratamento age nos dois eixos, descongestionando e bloqueando a ativação neuro-hormonal.\n\nRevisar: Síndrome cardiorrenal · volume arterial efetivo"
  },
  # 049
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "A pressão de pulso alargada, com pressão sistólica elevada e diastólica muito baixa, é achado característico de:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Estenose aórtica grave.",
      "B) Insuficiência aórtica crônica.",
      "C) Tamponamento cardíaco.",
      "D) Estenose mitral."
    ],
    "gabarito": "**Alternativa B** — Insuficiência aórtica crônica.\n\nNa insuficiência aórtica o ventrículo ejeta um volume sistólico aumentado (o próprio mais o regurgitado), elevando a sistólica; na diástole, parte do sangue retorna ao ventrículo e a diastólica despenca.\n\n• A) A estenose aórtica tende a reduzir a pressão de pulso, com pulso parvus et tardus.\n• C) Cursa com pulso paradoxal e pressão de pulso estreita.\n• D) Não altera caracteristicamente a pressão de pulso.\n\nRevisar: Insuficiência aórtica · repercussão hemodinâmica"
  },
  # 050
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre o tamponamento cardíaco, assinale a alternativa INCORRETA:",
    "interactionType": "multiple-choice",
    "options": [
      "A) O acúmulo de líquido no pericárdio eleva a pressão intrapericárdica e restringe o enchimento diastólico.",
      "B) A velocidade de instalação importa mais que o volume absoluto acumulado.",
      "C) Cursa com hipotensão, turgência jugular e hipofonese de bulhas.",
      "D) O pulso paradoxal corresponde à queda inspiratória exagerada da pressão sistólica.",
      "E) O débito cardíaco aumenta, pois a compressão externa auxilia a ejeção ventricular."
    ],
    "gabarito": "**Alternativa E** — O débito cardíaco aumenta, pois a compressão externa auxilia a ejeção ventricular.\n\nA compressão impede o enchimento. Sem enchimento adequado não há volume a ejetar: o débito cai, e é isso que produz o choque obstrutivo.\n\n• A) Correto — é o mecanismo central.\n• B) Correto — o pericárdio se adapta lentamente; derrames rápidos tamponam com pouco volume.\n• C) Correto — é a tríade de Beck.\n• D) Correto — acima de 10 mmHg de queda inspiratória.\n\nRevisar: Tamponamento cardíaco"
  },
  # 051
  {
    "type": "VERDADEIRO OU FALSO",
    "text": "Sobre choque cardiogênico e suas repercussões, julgue os itens:\n\n( ) A causa mais frequente é o infarto agudo do miocárdio extenso, geralmente com perda de mais de 40% da massa do ventrículo esquerdo.\n( ) Cursa com extremidades frias, oligúria, confusão mental e lactato elevado.\n( ) A pressão venosa central e as pressões de enchimento tendem a estar reduzidas.\n( ) A reposição volêmica agressiva é a primeira medida em todos os casos, independentemente do padrão hemodinâmico.\n( ) A mortalidade permanece elevada mesmo com terapia moderna de reperfusão.",
    "interactionType": "textarea",
    "gabarito": "**Sequência: V – V – F – F – V**\n\n• V) Também pode decorrer de complicações mecânicas do infarto, arritmias e miocardites.\n• V) São os sinais de hipoperfusão tecidual global.\n• F) Estão elevadas: a bomba falha e o sangue se acumula a montante. Pressões de enchimento baixas sugerem hipovolemia.\n• F) No choque cardiogênico com congestão, volume adicional agrava o edema pulmonar.\n• V) É a complicação de pior prognóstico do infarto.\n\nRevisar: Choque cardiogênico"
  },
  # 052
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "A miocardiopatia dilatada caracteriza-se por:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Hipertrofia assimétrica do septo com obstrução dinâmica da via de saída.",
      "B) Dilatação das câmaras com redução da contratilidade e queda da fração de ejeção.",
      "C) Ventrículo pequeno e rígido com enchimento restrito.",
      "D) Substituição fibrogordurosa do miocárdio do ventrículo direito."
    ],
    "gabarito": "**Alternativa B** — Dilatação das câmaras com redução da contratilidade e queda da fração de ejeção.\n\nÉ a forma mais comum de miocardiopatia: o coração dilata e perde força, com disfunção sistólica predominante. Causas incluem álcool, quimioterápicos, miocardite viral, periparto e formas genéticas.\n\n• A) Descreve a miocardiopatia hipertrófica.\n• C) Descreve a miocardiopatia restritiva.\n• D) Descreve a displasia arritmogênica do ventrículo direito.\n\nRevisar: Miocardiopatias"
  },
  # 053
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Na miocardiopatia hipertrófica obstrutiva, a síncope aos esforços ocorre porque:",
    "interactionType": "multiple-choice",
    "options": [
      "A) A obstrução da via de saída se acentua com o aumento da contratilidade e a redução do volume ventricular durante o exercício.",
      "B) O ventrículo esquerdo dilata subitamente durante o esforço.",
      "C) Há vasodilatação coronariana excessiva com roubo de fluxo.",
      "D) A frequência cardíaca cai paradoxalmente ao esforço."
    ],
    "gabarito": "**Alternativa A** — A obstrução da via de saída se acentua com o aumento da contratilidade e a redução do volume ventricular durante o exercício.\n\nAo contrário da estenose aórtica, cuja obstrução é fixa, aqui ela é dinâmica: mais contratilidade e menos volume aproximam o septo hipertrofiado do folheto mitral, estreitando a via de saída justamente quando mais se precisa de débito.\n\n• B) A cavidade é pequena; não há dilatação súbita.\n• C) Não corresponde ao mecanismo.\n• D) A resposta cronotrópica costuma estar preservada.\n\nRevisar: Miocardiopatia hipertrófica"
  },
  # 054
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "São marcadores de gravidade e mau prognóstico na insuficiência cardíaca, EXCETO:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Hiponatremia.",
      "B) Elevação persistente de peptídeos natriuréticos.",
      "C) Fração de ejeção muito reduzida com dilatação progressiva.",
      "D) Necessidade de internações repetidas por descompensação.",
      "E) Ganho de massa muscular e melhora da capacidade funcional."
    ],
    "gabarito": "**Alternativa E** — Ganho de massa muscular e melhora da capacidade funcional.\n\nGanho de massa e melhora funcional são sinais de resposta favorável. O oposto — caquexia cardíaca e perda de capacidade funcional — é que marca doença avançada.\n\n• A) Marcador clássico, reflete ativação neuro-hormonal intensa.\n• B) Marcador de sobrecarga pressórica persistente.\n• C) Marcador de remodelamento desfavorável.\n• D) Marcador de doença refratária.\n\nRevisar: IC · marcadores de gravidade"
  },
  # 055
  {
    "type": "MÚLTIPLA ESCOLHA",
    "text": "Sobre a febre reumática, assinale a alternativa correta:",
    "interactionType": "multiple-choice",
    "options": [
      "A) Resulta de infecção direta do miocárdio pelo estreptococo do grupo A.",
      "B) Decorre de reação imunológica cruzada após faringoamigdalite estreptocócica, por mimetismo molecular.",
      "C) Compromete preferencialmente a valva pulmonar.",
      "D) Não deixa sequelas valvares após o episódio agudo."
    ],
    "gabarito": "**Alternativa B** — Decorre de reação imunológica cruzada após faringoamigdalite estreptocócica, por mimetismo molecular.\n\nAnticorpos dirigidos contra antígenos do estreptococo reagem com proteínas do tecido cardíaco, articular, cutâneo e neuronal. É doença pós-infecciosa imunomediada, não infecção local.\n\n• A) Não há invasão direta do miocárdio.\n• C) A valva mitral é de longe a mais acometida, seguida da aórtica.\n• D) A cardiopatia reumática crônica é justamente a sequela valvar, que pode surgir anos depois.\n\nRevisar: Febre reumática e cardiopatia reumática"
  },
  # 056
  {
    "type": "CASO CLÍNICO DISSERTATIVO",
    "text": "Homem de 72 anos tem episódio de síncope súbita, sem pródromos e sem convulsões, ao subir escadas. Nos últimos meses vinha notando dispneia aos esforços e dor torácica opressiva ao caminhar rápido. Ao exame: pulso carotídeo de baixa amplitude e ascensão lenta, sopro mesossistólico rude irradiado para as carótidas, B4 presente.\n\na) Qual o diagnóstico mais provável?\nb) Explique o mecanismo dos três sintomas apresentados.\nc) Por que o pulso é parvus et tardus?",
    "interactionType": "textarea",
    "gabarito": "**Resposta-modelo:**\n\na) **Estenose aórtica grave**, provavelmente calcificada, dada a idade. O sopro mesossistólico irradiado para as carótidas e o pulso parvus et tardus são os achados que fecham o raciocínio.\n\nb) **Mecanismo dos três sintomas:**\n• **Síncope aos esforços:** o débito é limitado por uma obstrução fixa; ao exercício, a vasodilatação periférica reduz a resistência e, sem aumento compensatório do débito, a pressão de perfusão cerebral cai.\n• **Angina:** a hipertrofia concêntrica aumenta a demanda de oxigênio e comprime a microcirculação subendocárdica, gerando isquemia mesmo com coronárias normais.\n• **Dispneia:** a parede espessa e pouco complacente eleva as pressões de enchimento, que se transmitem ao capilar pulmonar.\n\nc) **Por que o pulso é parvus et tardus:** Porque o sangue atravessa um orifício estreito: a ejeção é lenta (tardus) e o volume que chega à periferia em cada sístole é reduzido (parvus). É o achado que melhor diferencia a estenose aórtica de outros sopros sistólicos.\n\nRevisar: Estenose aórtica · caso clínico integrado"
  }
]

out_code = "export const fisio176Cardiovascular = " + json.dumps(cv_questions, indent=2, ensure_ascii=False) + ";\n"
with open("src/fisio_176_cv.ts", "w", encoding="utf-8") as f:
  f.write(out_code)

print(f"Generated src/fisio_176_cv.ts with {len(cv_questions)} questions.")
