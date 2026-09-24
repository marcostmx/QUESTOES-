const fs = require('fs');
const newQuestions = [
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre os agentes das infecções cirúrgicas e sua apresentação, assinale a alternativa CORRETA.`,
        interactionType: "multiple-choice",
        options: [
            "A) A infecção de ferida operatória manifesta-se habitualmente nas primeiras 24 horas de pós-operatório.",
            "B) O agente etiológico mais comum das infecções de sítio operatório é o Staphylococcus aureus; a infecção de ferida habitualmente se manifesta após o 7º dia de pós-operatório; o Clostridium perfringens associa-se a infecção que surge após 48 horas, com enfisema subcutâneo e exsudato marrom-avermelhado; e o estreptococo beta-hemolítico, a eritema rapidamente progressivo com hipersensibilidade das bordas.",
            "C) O Clostridium perfringens é o agente mais comum e produz quadro tardio, após 30 dias.",
            "D) Os sítios mais comuns de infecção no internamento pós-operatório, excetuando-se o sítio cirúrgico, são o sistema nervoso central e o osteoarticular.",
            "E) Diante de sinais de inflamação no pós-operatório, a investigação deve restringir-se à inspeção da ferida, sendo desnecessários exames complementares."
        ],
        gabarito: `Alternativa B\nPor que B está certa: S. aureus prevalece (após 7º dia). Clostridium perfringens causa enfisema e infecção rápida (24-48h).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Cirrótico com ascite volumosa evolui com febre e dor abdominal difusa. A paracentese revela 380 neutrófilos/mm³ no líquido ascítico, e a tomografia não identifica foco intra-abdominal cirurgicamente tratável. Sobre o diagnóstico e a conduta, assinale a alternativa CORRETA.`,
        interactionType: "multiple-choice",
        options: [
            "A) Peritonite bacteriana secundária; indicada laparotomia exploradora de urgência.",
            "B) Peritonite bacteriana terciária; o tratamento é altamente eficaz e dispensa imunomodulação.",
            "C) Abscesso cavitário; indicada drenagem percutânea guiada por imagem.",
            "D) Peritonite bacteriana primária (espontânea) — o diagnóstico se firma com neutrófilos > 250/mm³ no líquido ascítico na ausência de foco cirurgicamente tratável. O germe mais comum é a E. coli (cerca de 60%), e o tratamento é clínico, com cefalosporina de 3ª geração, sem indicação cirúrgica.",
            "E) Fasceíte necrosante intra-abdominal; indicado desbridamento cirúrgico amplo."
        ],
        gabarito: `Alternativa D\nPor que D está certa: Neutrófilos > 250 em cirrótico sem foco perfurado = PBE (Primária / Espontânea). Tratada apenas com antibiótico.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre a fasceíte necrosante, assinale a alternativa CORRETA.`,
        interactionType: "multiple-choice",
        options: [
            "A) É causada por germes não clostridiais — geralmente Streptococcus microaerófilos, Staphylococcus e Gram-negativos aeróbios e anaeróbios —, tem porta de entrada em feridas e úlceras, dissemina-se pela fáscia muscular com trombose, e cursa com bolhas avermelhadas, hiperemia, edema, crepitação, dor, odor pútrido e diminuição da sensibilidade por lesão nervosa.",
            "B) É sempre causada por Clostridium, o que justifica o nome \"gangrena gasosa\".",
            "C) Caracteriza-se por aumento da sensibilidade local, o que a distingue das demais infecções de partes moles.",
            "D) O tratamento é exclusivamente clínico, com antibioticoterapia isolada.",
            "E) Decorre invariavelmente de quebra da técnica asséptica durante o ato cirúrgico."
        ],
        gabarito: `Alternativa A\nPor que A está certa: As Fasceítes perigosas se propagam destruindo filetes de sensibilidade, aliviando a dor cutânea paradoxalmente. Exigem debridamento profundo.`
    },
    {
        type: "DISCURSIVA",
        text: `a. Classifique a ferida operatória nas quatro categorias, indicando para cada uma o risco de infecção e a definição.\nb. Enuncie as regras da antibioticoprofilaxia: momento ideal de administração, critério para repetir a dose e o que a extensão além de 24 horas acrescenta (ou não).\nc. Indique, para cada classe de ferida, se há indicação de antibiótico e de que natureza (profilático ou terapêutico). Detalhe as cinco exceções em que a cirurgia limpa recebe profilaxia.\nd. Cite quatro fatores de risco relacionados ao paciente e quatro relacionados à cirurgia. Explique por que uma hemostasia inadequada aumenta o risco infeccioso.`,
        interactionType: "textarea",
        gabarito: `(a) Limpa (<5%), Potencialmente contaminada (<10%), Contaminada (10-20%), Infectada (30-40%).\n(b) 30 a 60 min antes da incisão. Repetir se > 3h ou 2 meias vidas. Além de 24h não tem benefício.\n(c) Limpa: Não (exceções: próteses, dano local letal, febre reumática, imunosuprimidos, neurocirurgia). Potencial/Contaminada: Profilático. Infectada: Terapêutico.\n(d) Fatores de risco do paciente: idade, diabetes, obesidade, tabagismo. Da cirurgia: antissepsia, tricotomia, técnica, tempo prolongado. Hemostasia inadequada forma hematoma que age como meio de cultura vivo.`
    },
    {
        type: "DISCURSIVA",
        text: `a. Diferencie ISC incisional superficial e ISC incisional profunda quanto a: sintomas sistêmicos, profundidade acometida, prazo e critérios diagnósticos.\nb. Explique os dois prazos que definem a infecção de órgão ou cavidade e o que determina a aplicação de um ou de outro.\nc. Cite quatro situações que não são consideradas infecção de sítio cirúrgico.\nd. Qual o agente etiológico mais comum e em que momento do pós-operatório a infecção de ferida habitualmente se manifesta? Quais os dois sítios extracirúrgicos mais comuns de infecção no internamento, e que exames a sua investigação exige?`,
        interactionType: "textarea",
        gabarito: `(a) Superficial: derme/subcutâneo, 30 dias, sem sintomas sistêmicos. Profunda: fáscia/músculo, 30 dias, tem sintomas sistêmicos.\n(b) 30 dias para tecidos naturais, 1 ano para próteses artificiais implantadas.\n(c) Granuloma de fio, episiotomia, circuncisão, queimaduras infectadas.\n(d) S. aureus (~7º dia). Sítios extracirúrgicos: pulmão e trato urinário (exigindo RX de tórax e sumário de urina).`
    },
    {
        type: "DISCURSIVA",
        text: `a. Construa uma tabela comparando as peritonites bacterianas primária, secundária e terciária quanto a: mecanismo, germes mais comuns, mortalidade e tratamento.\nb. Liste quatro fatores predisponentes à peritonite bacteriana espontânea e descreva o critério diagnóstico laboratorial.\nc. Explique por que a peritonite primária não tem indicação cirúrgica, enquanto a secundária tem.\nd. Sobre o abscesso cavitário: qual sua mortalidade, de que ele geralmente resulta, e como se explicam os abscessos em vísceras maciças?\ne. Diferencie as indicações de drenagem cirúrgica e percutânea de um abscesso, citando ao menos três critérios de cada.`,
        interactionType: "textarea",
        gabarito: `(a) 1ª: Clínica, E. coli. 2ª: Cirúrgica, germes mistos por perfuração. 3ª: Resistente de UTI pós tratamento (alta mortalidade). (b) Cirrose avançada, líquido com neutrófilos >250, sangramento TGI prévio, ITU. (c) A primária provém de translocação bacteriana e não há defeito cirúrgico na anatomia; a secundária tem uma víscera estourada que exige sutura. (d) Mortalidade 20%; de fístulas, coleções não limpas; em víscera maciça vem por semeadura hematogênica de outro órgão supurado. (e) Cirúrgica (Lojas múltiplas difusas e complexas / fístulas ativas abertas); Percutânea (Únicas delimitadas por TC com trajeto limpo).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Homem de 64 anos, com insuficiência cardíaca classe funcional III e DPOC oxigenodependente, com limitação incapacitante das atividades diárias, será submetido a uma laparotomia de urgência por abdome agudo. Segundo a classificação ASA, ele deve ser classificado como:`,
        interactionType: "multiple-choice",
        options: [
            "A) ASA II, pois a doença sistêmica está controlada com medicação.",
            "B) ASA III, pois há doença grave, ainda que não incapacitante.",
            "C) ASA IV E — doença sistêmica grave e incapacitante, com o sufixo E acrescentado por se tratar de urgência, o que agrava substancialmente o risco.",
            "D) ASA V, pois o paciente apresenta risco elevado de óbito.",
            "E) ASA VI, reservada a pacientes com doença sistêmica incapacitante."
        ],
        gabarito: `Alternativa C\nPor que C está certa: O paciente tem limitação incapacitante das atividades (ASA IV) e será submetido à cirurgia de urgência (Sufixo E).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre a checagem do jejum pré-operatório, analise as assertivas:\n\nI. O tempo de jejum é determinado pelo tempo de esvaziamento gástrico.\nII. Líquidos claros — água, chá e sucos de fruta sem polpa — exigem 2 horas de jejum.\nIII. Líquidos não claros e alimentos sólidos exigem 6 horas.\nIV. Em lactentes, o leite materno exige 4 horas e as fórmulas pediátricas, 6 horas.\n\nEstá correto o que se afirma em:`,
        interactionType: "multiple-choice",
        options: [
            "A) Apenas I e II.",
            "B) Apenas II e III.",
            "C) Apenas I, II e IV.",
            "D) Apenas III e IV.",
            "E) I, II, III e IV."
        ],
        gabarito: `Alternativa E\nTodas as assertivas descrevem perfeitamente as regras universais e tempos de jejum (2-4-6).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Está indicada uma cirurgia de membro inferior com necessidade de analgesia pós-operatória prolongada. Sobre a técnica de bloqueio regional, assinale a alternativa CORRETA.`,
        interactionType: "multiple-choice",
        options: [
            "A) A raquianestesia é preferível, pois permite a instalação de cateter para analgesia contínua.",
            "B) A peridural é preferível: realizada no espaço epidural pela técnica de Dogliotti (perda de resistência), permite instalar um cateter que prolonga ou estende o bloqueio e produz analgesia pós-operatória. Tem ainda menor risco de cefaleia pós-punção dural e menos hipotensão quando não se adiciona epinefrina, ao custo de um bloqueio motor menos intenso.",
            "C) A peridural é realizada no espaço subaracnoide, com agulha fina, e tem início de ação mais rápido.",
            "D) As duas técnicas são idênticas quanto ao espaço puncionado, diferindo apenas na dose do anestésico.",
            "E) A raquianestesia é a única indicada para cirurgias de membros inferiores; a peridural restringe-se a procedimentos torácicos."
        ],
        gabarito: `Alternativa B\nPor que B está certa: O cateter peridural é perfeito para prolongar e estender o bloqueio com infusões sucessivas no pós-operatório (analgesia).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Mulher jovem e magra desenvolve, no segundo dia após raquianestesia, cefaleia frontal intensa que piora ao sentar-se e melhora em decúbito dorsal, associada a cervicalgia e zumbido. Sobre o quadro, assinale a alternativa CORRETA.`,
        interactionType: "multiple-choice",
        options: [
            "A) Trata-se de raquianestesia total, complicação que exige suporte ventilatório imediato.",
            "B) O quadro piora em decúbito e melhora ao sentar, o que o distingue de outras cefaleias.",
            "C) A prevenção se faz com agulhas de grosso calibre e múltiplas tentativas de punção.",
            "D) É a cefaleia pós-raquianestesia, complicação mais comum da técnica: a punção da dura-máter causa perda de LCR, com queda da pressão no espaço subaracnoide e vasodilatação cerebral reflexa. Fatores de risco: mulheres, jovens, magros e história prévia de cefaleia. Prevenção: poucas punções e agulhas finas com ponta de lápis. Tratamento: hidratação, cafeína e analgésicos, e, nos casos refratários, blood patch peridural.",
            "E) Trata-se de hematoma peridural, e a conduta é expectante."
        ],
        gabarito: `Alternativa D\nPor que D está certa: Reflete o quadro típico da Cefaleia Pós Punção Dural (CPPD), uma síndrome ortostática secundária à perda volêmica de LCR que traciona as meninges.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre os anestésicos locais, assinale a alternativa CORRETA.`,
        interactionType: "multiple-choice",
        options: [
            "A) Agem por bloqueio do transporte de sódio, produzindo bloqueio sensitivo, motor e autonômico. A lidocaína tem início rápido e duração menor (30–180 min, dose máxima 5 mg/kg), que sobe para 60–240 min e 7 mg/kg quando associada a vasoconstritor; bupivacaína e ropivacaína demoram mais a agir e duram 240–480 min, com doses máximas de 3 e 4 mg/kg, respectivamente.",
            "B) Agem bloqueando canais de potássio, o que hiperpolariza o axônio.",
            "C) A bupivacaína tem início mais rápido e duração mais curta que a lidocaína.",
            "D) A adição de vasoconstritor reduz a duração do efeito e aumenta a toxicidade sistêmica.",
            "E) Anestésicos locais não apresentam toxicidade sistêmica, sendo sua ação estritamente local."
        ],
        gabarito: `Alternativa A\nPor que A está certa: Apresenta a farmacocinética correta (bloqueio canais de Na+) e dosagem apropriada com a ressalva do tempo extra provido pelo vasoconstritor.`
    },
    {
        type: "DISCURSIVA",
        text: `a. Cite seis itens investigados na avaliação pré-anestésica.\nb. O que o MET mede? Dê um exemplo de atividade correspondente a 1 MET, a 4 MET e a mais de 10 MET.\nc. Descreva as seis classes ASA e explique o significado do sufixo "E".\nd. Enuncie a regra do jejum pré-operatório, incluindo as particularidades do lactente, e explique o que determina esses tempos.\ne. O que a classificação de Mallampati avalia, e quais classes sugerem via aérea difícil?`,
        interactionType: "textarea",
        gabarito: `(a) Anamnese, exame de vias aéreas, alergias, medicações, exames laboratoriais, jejum. (b) MET mede capacidade funcional respiratória basal. 1=deitado, 4=subir escadas lentamente, 10=nadar/esporte pesado. (c) ASA I a VI, sufixo E = Urgência/Emergência em qualquer classe. (d) Jejum 2h (água), 4h (Leite Materno), 6h (Refeição leve/Leite fórmula), 8h (Fartura gorda). (e) Mallampati é inspeção visual do véu palatino (III e IV são difíceis intubações onde não se vê a úvula direito).`
    },
    {
        type: "DISCURSIVA",
        text: `a. Nomeie as três técnicas anestésicas e as três fases da anestesia geral, indicando o objetivo de cada fase.\nb. Descreva os componentes da fase de indução e explique a finalidade da pré-oxigenação a 100%.\nc. Quais os cuidados na fase de recuperação? Explique o que é a descarga hiperadrenérgica e cite quatro manifestações. Qual o principal cuidado pós-operatório relacionado ao bloqueador neuromuscular?\nd. Compare raquianestesia e peridural quanto a: espaço puncionado, técnica, calibre da agulha, intensidade do bloqueio motor, vantagens e complicações.\ne. Liste as sete condições que aumentam o risco da anestesia raquidiana ou peridural, identificando a que constitui contraindicação absoluta.`,
        interactionType: "textarea",
        gabarito: `(a) Local, Regional, Geral. Geral tem: Indução, Manutenção e Recuperação. (b) Pré-oxigenação a 100% gera margem de segurança de apnéia de 5 a 10 minutos sem causar hipóxia encefálica caso a intubação seja falha ao tentar a primeira vez. (c) A recuperação sofre Descargas simpáticas autonômicas com taquicardias severas; cuidado principal de bloqueador muscular = a paralisia costal asfixia o paciente. (d) Raqui perfura dural com agulha fina para infusão imediata. Peridural para com agulha mais grossa para colocar um cateter continuo em espaço epidural de dor crônica. (e) Recusa do Paciente é contraindicação legal absoluta.`
    },
    {
        type: "DISCURSIVA",
        text: `a. Qual é o mecanismo de ação dos anestésicos locais e que tipos de bloqueio eles produzem?\nb. Construa uma tabela com lidocaína, lidocaína com vasoconstritor, bupivacaína e ropivacaína, indicando duração e dose máxima de cada.\nc. Explique os efeitos da adição de vasoconstritor à solução anestésica e o risco associado — nomeando os sítios anatômicos em que ele é mais temido.\nd. Um paciente de 60 kg receberá lidocaína sem vasoconstritor. Calcule a dose máxima em miligramas. Faça o mesmo cálculo com vasoconstritor e comente a diferença.\ne. Descreva as seis etapas da intubação em sequência rápida e explique qual complicação ela busca evitar.`,
        interactionType: "textarea",
        gabarito: `(a) Inibe canal de Sódio voltage-dependente dos axônios. Bloqueia autonômicos e dolorosos primeiro e depois tato e o motor. (b) Lidocaína pura: 5mg/kg corpo. Lido com Epinefrina: 7mg/kg. Bupi: 3 a 4mg/kg. (c) Adição contrai vasos e evita pico sanguíneo central toxico; Perigoso em zonas de dedos e penianas (necrose oclusiva pontal). (d) Puro: 300mg máximo total (60kg * 5mg). Com Adrena = 420mg no teto máximo total (60kg * 7). (e) Busca Evitar: Brancoaspiração aguda letal nosofaringea. Preparo-PréO2-PréMedica-Relaxa-Posiciona-Confirma.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Um paciente em pós-operatório refere sensação anormal e desagradável no território da incisão, descrita como queimação incômoda e espontânea. Sobre a terminologia, assinale a alternativa CORRETA.`,
        interactionType: "multiple-choice",
        options: [
            "A) Trata-se de parestesia, pois é uma sensação anormal espontânea.",
            "B) Trata-se de hipoestesia, por corresponder a uma alteração qualitativa da sensibilidade.",
            "C) Trata-se de disestesia: ambas as sensações são anormais e espontâneas, mas a parestesia não é necessariamente desagradável (o formigamento neutro, por exemplo), enquanto a disestesia é sempre desagradável ou dolorosa.",
            "D) Trata-se de alodinia, pois há dor sem estímulo doloroso identificável.",
            "E) Trata-se de anestesia, pois há alteração da sensibilidade no território operado."
        ],
        gabarito: `Alternativa C\nPor que C está certa: Sensação anormal que é SEMPRE desagradável ou dolorosa define disestesia.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre a taxonomia e as classificações da dor, analise as assertivas:\n\nI. Alodinia é a dor desencadeada por um estímulo normalmente não doloroso, como o toque leve do lençol.\nII. Hiperpatia é a resposta dolorosa explosiva e frequentemente prolongada a um estímulo, em geral repetitivo.\nIII. A dor neuropática decorre de lesão ou disfunção do sistema nervoso — o sinal elétrico não é gerado no nociceptor, mas em outras vias aferentes.\nIV. A dor nociplástica é um tipo de dor crônica em que os receptores da dor são estimulados sem causa aparente, com alteração da nocicepção e redução do limiar doloroso.\n\nEstá correto o que se afirma em:`,
        interactionType: "multiple-choice",
        options: [
            "A) Apenas I e II.",
            "B) Apenas II e III.",
            "C) Apenas I, III e IV.",
            "D) Apenas III e IV.",
            "E) I, II, III e IV."
        ],
        gabarito: `Alternativa E\nTodas as alternativas estão corretas e apresentam as terminologias exatas das modulações álgicas da IASP.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Assinale a alternativa que associa corretamente cada evento celular da nocicepção ao seu conceito e ao local onde ocorre.`,
        interactionType: "multiple-choice",
        options: [
            "A) Transdução — propagação do estímulo elétrico pelas vias — no córtex cerebral.",
            "B) Transdução — transformação do estímulo nociceptivo em influxo nervoso, na periferia/tecido; transmissão — propagação do estímulo elétrico pelas vias nociceptivas, em nível periférico; modulação — mecanismos que atenuam ou amplificam o impulso, na medula; percepção — discriminação e decodificação do fenômeno doloroso, no córtex cerebral.",
            "C) Modulação — transformação do estímulo em influxo nervoso — na periferia.",
            "D) Percepção — atenuação ou amplificação do impulso nociceptivo — na medula espinal.",
            "E) Transmissão — decodificação cortical do fenômeno doloroso — no tálamo."
        ],
        gabarito: `Alternativa B\nPor que B está certa: Segue a via lógica orgânica natural em 4 eventos: Transduz -> Transmite -> Modula -> Percebe.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre a sensibilização central e o fenômeno de wind-up, assinale a alternativa CORRETA.`,
        interactionType: "multiple-choice",
        options: [
            "A) A sensibilização central eleva o limiar dos nociceptores, reduzindo a percepção dolorosa.",
            "B) O wind-up depende do bloqueio do receptor NMDA pelo magnésio, o que reduz a sensibilidade ao glutamato.",
            "C) A hiperalgesia secundária é um fenômeno estritamente periférico, dependente da manutenção do estímulo lesivo.",
            "D) A sensibilização central resulta de estímulo intenso ou repetitivo e cursa com aumento da eficácia sináptica dos neurônios do corno dorsal, redução do limiar e aumento da responsividade, gerando alodinia e hiperalgesia secundária. O wind-up é a potencialização das respostas dos neurônios WDR à estimulação repetida das fibras C, com despolarização cumulativa e desbloqueio do canal de magnésio do receptor NMDA, o que aumenta a sensibilidade ao glutamato — as células continuam disparando mesmo após cessar o estímulo.",
            "E) Ambos os fenômenos ocorrem exclusivamente em dor crônica de origem neuropática, sem relação com a dor pós-operatória."
        ],
        gabarito: `Alternativa D\nPor que D está certa: No wind up (sintonia desregulada) há hiper-excitação de dor refratária pela remoção química do tampão magnésio do receptor glutamatérgico no nervo lesado.`
    },
    {
        type: "DISCURSIVA",
        text: `a. Defina dor, nocicepção, nociceptor e sofrimento, deixando clara a diferença entre nocicepção e dor.\nb. Diferencie, em uma frase cada: hipoestesia, anestesia, alodinia, hiperpatia, parestesia e disestesia.\nc. Apresente as quatro classificações da dor (fisiopatológica, temporal, anatômica e de padrão), com as categorias de cada uma.\nd. Diferencie as fibras Aδ e C quanto à velocidade e à qualidade da dor conduzida.\ne. Explique por que a dor visceral costuma ser mal localizada e acompanhada de sintomas autonômicos, e defina dor referida.`,
        interactionType: "textarea",
        gabarito: `(a) Dor é processamento límbico cortical, nocicepção é tráfego elétrico insensível se comado/anestesiado. (b) Alodinia: dor por carícia boba. Hipo: Não sinto bem. Anestesia: Apagado do tato. Hiperpatia: Dor prolongada intensa após cessado o choque. Parestesia: Sentimento de Agulha e formigas normais da pele sem dor. Disestesia: Parestesia ardente/Dói. (c) Fisiopatologia: Nociceptiva x Neuropática. Temporal: Aguda e Cronificada. Anatômica: Somática e Orgânica visceral. Padrão: Constante x Pontada e Pulsátil. (d) Fibras A: Gordas e Ágeis pro trauma agudo cortante pontudo. C: Lentas e demoradas para latejos crônicos viscerais mal localizados.`
    },
    {
        type: "DISCURSIVA",
        text: `Paciente submetido a laparotomia extensa evolui com dor intensa e mal controlada nos primeiros dias. Semanas depois, já cicatrizado, mantém dor persistente na cicatriz e refere que o simples toque da roupa dói.\n\na. Nomeie os quatro eventos celulares da nocicepção, indicando o local de cada um, e as seis etapas do processamento completo da dor.\nb. O que é a "sopa inflamatória"? Cite cinco de seus componentes e explique o efeito que ela produz sobre o limiar dos nociceptores.\nc. Explique os mecanismos de sensibilização periférica e sensibilização central, e defina hiperalgesia secundária.\nd. Descreva o fenômeno de wind-up, incluindo o papel do receptor NMDA e do magnésio, e explique como ele justifica a cronificação da dor pós-operatória mal controlada neste paciente.\ne. Qual o termo técnico para "o toque da roupa dói"? Cite os quatro sistemas de vias inibitórias descendentes e o mecanismo do sistema opioide.`,
        interactionType: "textarea",
        gabarito: `(a) Transdução (Tecido); Transmissão (Neurônio); Modulação (Medula cordão dorsal); Percepção (Tálamo e Córtex). (b) Células lisadas pela lâmina cirúrgica despejam potássio, prostaglandinas, interleucinas, fatores necróticos tumorais e citocinas que acirram e deixam a porta do nervo super excitável com limiares baixíssimos que apitam com tudo (Sopa Inflamatória). (c) Hiperalgesia atua no vizinho, deixando inflamado todo o território adjacente à lesão pela vasodilatação eferente lateral das mediações inflamatórias transbordadas nos vizinhos não lesados. (d) Wind-UP: Sob dor de tortura constante do cirurgiado de facadas abertas, o Magnésio protetor salta da sinápse da medula central abalando o sistema neural que memoriza a dor do paciente pelo NMDA hiper excitável cronicamente com o Glutamato liberado ininterruptamente na medula ferida. (e) O lençol que fere é "Alodinia". O Sistema Descendente é Adrenérgico, Serotoninérgico e GABA / Opióide. A inibição natural usa peptídeos narcóticos próprios cerebrais que selam as fendas nociceptivas medulares apagando a chama ascendente para confortar o moribundo agredido.`
    }
];

let text = fs.readFileSync('src/bc_all.ts', 'utf8');
text = text.replace(/\];\n$/, '');
let newContent = '';
for (let q of newQuestions) {
    newContent += ',\n    {\n';
    newContent += `        type: "${q.type}",\n`;
    newContent += `        text: \`${q.text}\`,\n`;
    newContent += `        interactionType: "${q.interactionType}",\n`;
    if (q.options) {
        newContent += `        options: [\n`;
        newContent += q.options.map(opt => `            \`${opt}\``).join(',\n');
        newContent += `\n        ],\n`;
    }
    newContent += `        gabarito: \`${q.gabarito}\`\n`;
    newContent += '    }';
}
newContent += '\n];\n';
fs.writeFileSync('src/bc_all.ts', text + newContent);
