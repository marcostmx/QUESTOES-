# scripts/generate_fisio500.py
import json

# Define the 100 topics with exact text from the PDF
# Block 1: Cardiovascular (1 to 25)
cv_topics = [
    {
        "name": "estenose e insuficiência valvar",
        "statement": "A estenose valvar impede a abertura adequada e cria sobrecarga de pressão; a insuficiência permite refluxo e cria sobrecarga de volume.",
        "implication": "A alteração crônica modifica câmaras e pode culminar em insuficiência cardíaca. A direção do fluxo e a fase do ciclo cardíaco ajudam a localizar a lesão.",
        "case": "Sopro e sinais de congestão em pessoa com valvopatia",
        "caution": "Não se deve confundir refluxo com obstrução fixa."
    },
    {
        "name": "êmbolos de câmaras direitas e esquerdas",
        "statement": "Trombos das câmaras direitas tendem a embolizar para a circulação pulmonar, enquanto trombos das câmaras esquerdas podem embolizar para a circulação sistêmica.",
        "implication": "O território arterial atingido define a manifestação clínica do êmbolo. A origem do êmbolo deve ser relacionada ao trajeto vascular subsequente.",
        "case": "Paciente com fibrilação atrial e déficit neurológico súbito",
        "caution": "Trombo venoso e trombo cardíaco não têm necessariamente o mesmo destino."
    },
    {
        "name": "tamponamento cardíaco",
        "statement": "Acúmulo rápido de líquido no espaço pericárdico pode comprimir o coração e limitar o enchimento diastólico.",
        "implication": "A queda do débito cardíaco decorre de redução do enchimento ventricular. É a velocidade e a pressão exercida pelo líquido, e não apenas o volume absoluto, que importam.",
        "case": "Hipotensão, turgência jugular e abafamento de bulhas após derrame pericárdico",
        "caution": "Tamponamento é uma urgência por comprometimento hemodinâmico."
    },
    {
        "name": "sistema de condução",
        "statement": "O estímulo fisiológico inicia-se no nó sinoatrial, percorre os átrios, sofre atraso no nó atrioventricular e segue pelo feixe de His, ramos e fibras de Purkinje.",
        "implication": "A sequência coordenada permite contração atrial e ventricular organizada. O atraso nodal AV favorece o enchimento ventricular antes da sístole ventricular.",
        "case": "Bradicardia ou bloqueio após disfunção do nó AV",
        "caution": "O nó AV não é o marcapasso fisiológico dominante em condições usuais."
    },
    {
        "name": "insuficiência cardíaca e mecanismos",
        "statement": "Insuficiência cardíaca é a incapacidade de o coração fornecer débito adequado às demandas, exceto às custas de pressões de enchimento elevadas.",
        "implication": "Pode haver hipoperfusão para frente e congestão venosa para trás. O padrão clínico depende de ventrículo predominante e do grau de compensação.",
        "case": "Dispneia, fadiga, edema e limitação ao esforço em paciente com cardiopatia estrutural",
        "caution": "Insuficiência cardíaca é síndrome, não sinônimo exclusivo de fração de ejeção baixa."
    },
    {
        "name": "mecanismo de frank starling",
        "statement": "Aumento moderado da pré-carga estira fibras miocárdicas e pode elevar temporariamente a força de contração, até um limite fisiológico.",
        "implication": "A princípio sustenta o débito; quando excessivo, favorece congestão sem normalizar a bomba falha. O mecanismo é compensatório e não corrige a causa de uma miocardiopatia persistente.",
        "case": "Descompensação com aumento das pressões de enchimento",
        "caution": "Pré-carga não é sinônimo de pós-carga."
    },
    {
        "name": "ativação simpática na insuficiência cardíaca",
        "statement": "A ativação adrenérgica aumenta frequência cardíaca, contratilidade e vasoconstrição como resposta à queda do débito.",
        "implication": "No longo prazo, eleva consumo de oxigênio, pós-carga e risco de remodelamento. A compensação de curto prazo pode se tornar mal-adaptativa em doença crônica.",
        "case": "Taquicardia persistente em insuficiência cardíaca descompensada",
        "caution": "O sistema simpático não promove vasodilatação sistêmica predominante nesse contexto."
    },
    {
        "name": "sistema renina angiotensina aldosterona",
        "statement": "Redução da perfusão renal ativa renina, angiotensina II e aldosterona, gerando vasoconstrição e retenção de sódio e água.",
        "implication": "A expansão de volume aumenta a pré-carga e pode piorar a congestão. Angiotensina II aumenta a pós-carga; aldosterona favorece retenção hidrossalina.",
        "case": "Edema e ganho ponderal em insuficiência cardíaca",
        "caution": "Esse eixo não é uma via de eliminação de sódio."
    },
    {
        "name": "remodelamento e hipertrofia cardíaca",
        "statement": "Sobrecarga persistente induz hipertrofia e remodelamento; fibrose torna o miocárdio mais rígido e favorece disfunção e arritmias.",
        "implication": "Pode comprometer relaxamento, perfusão e eficiência contrátil. A adaptação inicial não garante benefício prolongado.",
        "case": "Ventrículo hipertrofiado com sintomas progressivos de insuficiência cardíaca",
        "caution": "Hipertrofia patológica não equivale a melhor desempenho permanente."
    },
    {
        "name": "insuficiência cardíaca esquerda",
        "statement": "Falência predominante do ventrículo esquerdo eleva pressões venosas pulmonares e causa congestão pulmonar, além de reduzir débito sistêmico.",
        "implication": "Dispneia, ortopneia e dispneia paroxística noturna são manifestações típicas. Congestão pulmonar decorre de transmissão retrógrada da pressão ao leito venoso pulmonar.",
        "case": "Paciente que precisa dormir com vários travesseiros e apresenta estertores",
        "caution": "Edema pulmonar não é achado primário da insuficiência ventricular direita isolada."
    },
    {
        "name": "insuficiência cardíaca direita",
        "statement": "Falência predominante do ventrículo direito eleva a pressão venosa sistêmica e causa edema periférico, ascite e turgência jugular.",
        "implication": "A congestão afeta fígado, trato gastrointestinal e membros inferiores. Muitas vezes é consequência de insuficiência cardíaca esquerda ou hipertensão pulmonar.",
        "case": "Edema maleolar, hepatomegalia e jugulares ingurgitadas",
        "caution": "Não se espera congestão pulmonar intensa como efeito principal da forma direita isolada."
    },
    {
        "name": "disfunção sistólica e diastólica",
        "statement": "Na disfunção sistólica há redução da ejeção por contração prejudicada; na diastólica há enchimento prejudicado por ventrículo rígido, podendo haver fração de ejeção preservada.",
        "implication": "Ambas elevam pressões de enchimento e podem produzir congestão. Fração de ejeção normal não exclui insuficiência cardíaca.",
        "case": "Paciente com dispneia e hipertensão de longa data, mas fração de ejeção preservada",
        "caution": "A fração de ejeção descreve ejeção relativa, não diretamente o volume total do ventrículo."
    },
    {
        "name": "peptídeos natriuréticos",
        "statement": "Distensão de câmaras cardíacas estimula liberação de peptídeos natriuréticos, que favorecem natriurese, diurese e vasodilatação.",
        "implication": "Atuam como contrarregulação parcial da retenção hidrossalina. São marcadores úteis na avaliação clínica, interpretados junto ao quadro.",
        "case": "Elevação de BNP ou NT-proBNP em contexto compatível com insuficiência cardíaca",
        "caution": "Eles não ativam o sistema renina angiotensina aldosterona."
    },
    {
        "name": "isquemia miocárdica",
        "statement": "Doença isquêmica resulta de desbalanço entre oferta e demanda de oxigênio do miocárdio, geralmente por redução do fluxo coronariano.",
        "implication": "Isquemia intensa e prolongada pode evoluir para necrose miocárdica. Taquicardia e hipertensão aumentam demanda de oxigênio e podem agravar o desbalanço.",
        "case": "Dor torácica desencadeada por esforço em pessoa com aterosclerose coronariana",
        "caution": "Isquemia não significa automaticamente necrose irreversível."
    },
    {
        "name": "aterosclerose coronariana",
        "statement": "A aterosclerose é processo inflamatório crônico com acúmulo lipídico, formação de placa e possibilidade de ruptura e trombose.",
        "implication": "Placas estáveis limitam fluxo; placas vulneráveis podem precipitar síndromes coronarianas agudas. Ruptura de placa expõe material trombogênico e favorece oclusão aguda.",
        "case": "Angina em paciente com múltiplos fatores de risco cardiovasculares",
        "caution": "Aterosclerose não é apenas depósito passivo de gordura."
    },
    {
        "name": "angina estável",
        "statement": "Angina estável costuma decorrer de estenose coronariana fixa e aparece previsivelmente ao esforço, melhorando com repouso ou redução da demanda.",
        "implication": "A limitação de fluxo torna-se evidente quando a demanda aumenta. Não há necessidade de ruptura aguda de placa para esse padrão.",
        "case": "Dor precordial semelhante em caminhadas, sem piora recente, que cede ao parar",
        "caution": "Dor de angina estável não é definida por necrose miocárdica."
    },
    {
        "name": "síndrome coronariana aguda",
        "statement": "Ruptura ou erosão de placa com trombose pode reduzir abruptamente o fluxo coronariano e gerar angina instável ou infarto.",
        "implication": "Dor pode ocorrer em repouso, ser crescente e associar-se a necrose conforme a duração da isquemia. A dosagem de troponina ajuda a diferenciar necrose miocárdica de angina instável.",
        "case": "Dor torácica nova, prolongada ou em repouso",
        "caution": "A síndrome coronariana aguda não se explica por estenose fixa estável isolada."
    },
    {
        "name": "infarto agudo do miocárdio",
        "statement": "Isquemia miocárdica grave e prolongada leva a lesão irreversível e necrose de cardiomiócitos.",
        "implication": "Dor persistente e biomarcadores de necrose apoiam o diagnóstico. O tempo até reperfusão influencia a extensão da necrose.",
        "case": "Dor torácica intensa por mais de 30 minutos, sem alívio adequado ao repouso",
        "caution": "Infarto não é definido apenas por desconforto torácico."
    },
    {
        "name": "padrões de infarto",
        "statement": "Oclusão coronariana persistente pode causar infarto transmural; isquemia subendocárdica ocorre em comprometimento parcial ou transitório do fluxo.",
        "implication": "A topografia reflete intensidade e duração da redução de perfusão. A classificação clínica atual integra ECG, biomarcadores e contexto, não somente profundidade anatômica.",
        "case": "Alterações de ECG e troponina em síndrome coronariana aguda",
        "caution": "Subendocárdico não significa ausência de necrose."
    },
    {
        "name": "biomarcadores de necrose",
        "statement": "Troponinas cardíacas são marcadores sensíveis e específicos de lesão miocárdica; mioglobina eleva cedo, porém é pouco específica, e CK-MB pode auxiliar em contextos selecionados.",
        "implication": "A interpretação depende da cinética e da probabilidade clínica pré-teste. Um valor isolado precoce pode exigir repetição conforme o tempo de sintomas.",
        "case": "Elevação seriada de troponina em dor torácica aguda",
        "caution": "Mioglobina não confirma origem cardíaca de forma específica."
    },
    {
        "name": "fibrilação atrial",
        "statement": "Na fibrilação atrial há atividade atrial desorganizada, perda da contração atrial efetiva e ritmo ventricular irregular.",
        "implication": "A estase atrial pode favorecer tromboembolismo, sobretudo no apêndice atrial esquerdo. Perda da contribuição atrial pode agravar enchimento ventricular em ventrículos pouco complacentes.",
        "case": "Pulso irregularmente irregular em paciente com palpitações",
        "caution": "Fibrilação atrial não é ritmo regular organizado pelo nó sinoatrial."
    },
    {
        "name": "arritmias graves e morte súbita",
        "statement": "Fibrilação ventricular produz atividade elétrica caótica sem débito efetivo; assistolia representa ausência de atividade elétrica organizada.",
        "implication": "Ambas podem levar rapidamente a parada circulatória e exigem reconhecimento imediato. Isquemia miocárdica é causa importante de arritmias potencialmente letais.",
        "case": "Colapso súbito em contexto de doença cardíaca estrutural ou isquemia",
        "caution": "Ritmo caótico não equivale a contração ventricular eficiente."
    },
    {
        "name": "reentrada e vias acessórias",
        "statement": "Reentrada ocorre quando um impulso circula repetidamente por circuito com propriedades de condução e refratariedade adequadas; vias acessórias podem facilitar taquiarritmias.",
        "implication": "O circuito sustenta atividade elétrica anormal além do estímulo inicial. O mecanismo depende de vias com condução diferente, não de simples aumento de automatismo em todos os casos.",
        "case": "Palpitações paroxísticas com início e término abruptos",
        "caution": "Uma via acessória não é parte obrigatória do sistema de condução normal."
    },
    {
        "name": "valvopatias inflamatórias e infecciosas",
        "statement": "Febre reumática pode lesar válvulas por mecanismo imune após infecção estreptocócica; endocardite pode destruí-las por infecção direta.",
        "implication": "As lesões podem gerar estenose, insuficiência e fenômenos embólicos. A etiologia orienta o tipo de lesão e a investigação clínica.",
        "case": "Sopro novo associado a febre e sinais sistêmicos",
        "caution": "Endocardite não é processo exclusivamente degenerativo."
    },
    {
        "name": "hipertensão pulmonar e cor pulmonale",
        "statement": "Doença pulmonar ou vascular pulmonar crônica pode elevar a pós-carga do ventrículo direito e evoluir para cor pulmonale.",
        "implication": "O ventrículo direito hipertrofia e pode falhar, levando a congestão sistêmica. A causa primária localiza-se na circulação pulmonar, embora a repercussão seja cardíaca.",
        "case": "Paciente com doença respiratória crônica, edema periférico e sinais de sobrecarga direita",
        "caution": "Cor pulmonale não é definido por falência isolada do ventrículo esquerdo."
    }
]

# Block 2: Endócrino e Reprodutor (26 to 50)
endo_topics = [
    {
        "name": "obesidade e controle do peso",
        "statement": "O peso corporal resulta da interação entre ingestão alimentar, controle central da saciedade, controle hormonal do armazenamento e atividade física ou taxa metabólica.",
        "implication": "Excesso de peso suficiente para aumentar morbidade e mortalidade caracteriza a relevância fisiopatológica da obesidade. A regulação do peso depende de integração entre sinais periféricos e centros de controle.",
        "case": "Pessoa com obesidade e fatores comportamentais, centrais e hormonais associados",
        "caution": "Obesidade não se explica por um único hormônio isolado."
    },
    {
        "name": "adenoma hipofisário",
        "statement": "Adenomas hipofisários são tumores de origem clonal das células hipofisárias e podem causar hiperfunção hormonal ou efeito de massa.",
        "implication": "A hiperfunção depende do hormônio secretado: excesso de GH causa gigantismo ou acromegalia, excesso de ACTH relaciona-se à síndrome de Cushing e prolactina elevada produz hiperprolactinemia. A massa tumoral pode também comprometer tecido hipofisário normal.",
        "case": "Lesão hipofisária associada a excesso hormonal específico",
        "caution": "Adenoma secretor não é sinônimo de deficiência hormonal global."
    },
    {
        "name": "hiperprolactinemia",
        "statement": "Hiperprolactinemia pode ocorrer por prolactinoma, hipotireoidismo primário ou bloqueio de receptores de dopamina.",
        "implication": "Nas mulheres, associa-se a amenorreia, irregularidade menstrual e infertilidade; nos homens, a redução da libido, impotência e infertilidade. A prolactina elevada interfere no eixo reprodutivo.",
        "case": "Amenorreia e galactorreia em paciente com adenoma hipofisário",
        "caution": "Hiperprolactinemia não causa tireotoxicose por aumento de T4 livre."
    },
    {
        "name": "hipopituitarismo",
        "statement": "Hipopituitarismo pode resultar de necrose isquêmica hipofisária, trauma cranioencefálico, neoplasias selares, lesões inflamatórias, infiltrativas ou mutações genéticas.",
        "implication": "A consequência depende de quais hormônios hipofisários se tornam deficientes. A avaliação deve relacionar a causa estrutural ao padrão de deficiência hormonal.",
        "case": "Pessoa com deficiência de hormônios hipofisários após lesão da região selar",
        "caution": "Hipopituitarismo não é uma condição de secreção excessiva de todos os hormônios hipofisários."
    },
    {
        "name": "siadh",
        "statement": "Na síndrome de secreção inapropriada de vasopressina há secreção excessiva de ADH apesar de hipo-osmolalidade ou ausência de depleção de volume intravascular.",
        "implication": "O quadro produz hiponatremia sem edema e pode causar letargia, confusão, fraqueza, mioclonia, asterixis, convulsões e coma. A retenção de água reduz a osmolaridade plasmática e explica os sintomas neurológicos quando intensa.",
        "case": "Hiponatremia euvolêmica com alteração neurológica",
        "caution": "SIADH não produz poliúria com urina diluída como mecanismo central."
    },
    {
        "name": "hipertireoidismo",
        "statement": "No hipertireoidismo há funcionamento exagerado da tireoide, com aceleração metabólica, aumento da frequência cardíaca, temperatura corporal e gasto energético.",
        "implication": "Emagrecimento, bócio e manifestações cardiovasculares podem ocorrer; na doença de Graves pode haver exoftalmia. A manifestação clínica deriva da ação excessiva dos hormônios tireoidianos.",
        "case": "Taquicardia, emagrecimento e intolerância ao calor em quadro de tireotoxicose",
        "caution": "Hipertireoidismo não corresponde a redução primária de T4 livre."
    },
    {
        "name": "doença de graves",
        "statement": "A doença de Graves é causa autoimune de hipertireoidismo, com anticorpos contra o receptor de TSH que estimulam células foliculares a secretar T3 e T4.",
        "implication": "O quadro pode incluir bócio difuso, tireotoxicose, oftalmopatia infiltrativa e mixedema pré-tibial. Anticorpos anti-receptor de TSH sustentam a estimulação da tireoide.",
        "case": "Bócio difuso e exoftalmia em paciente com tireotoxicose",
        "caution": "Graves não é uma tireoidite destrutiva com T4 livre reduzido."
    },
    {
        "name": "padrões laboratoriais tireoidianos",
        "statement": "No hipertireoidismo primário, TSH está baixo e T4 livre elevado; no hipotireoidismo primário, TSH está elevado e T4 livre reduzido.",
        "implication": "Os padrões refletem o feedback entre tireoide e hipófise. A determinação sérica de TSH e T4 livre orienta a avaliação inicial da função tireoidiana.",
        "case": "Exames com TSH indetectável e T4 livre alto em paciente com tireotoxicose",
        "caution": "TSH elevado com T4 livre elevado não caracteriza hipertireoidismo primário."
    },
    {
        "name": "hipotireoidismo e tireoidite de hashimoto",
        "statement": "No hipotireoidismo o metabolismo torna-se mais lento; a tireoidite de Hashimoto é inflamação autoimune crônica com infiltração linfocitária e títulos elevados de anticorpos anti-peroxidase tireoidiana.",
        "implication": "Pode haver bócio indolor simétrico e sintomas de hipofunção; mixedema provoca edema em face e pálpebras. A lesão imune é destrutiva dentro dos folículos tireoidianos.",
        "case": "Cansaço, menor gasto energético e bócio em paciente com anti-TPO elevado",
        "caution": "Hashimoto não decorre de anticorpos estimulando o receptor de TSH."
    },
    {
        "name": "doença de addison",
        "statement": "Na insuficiência primária do córtex suprarrenal, os hormônios corticais estão deficientes e o ACTH se eleva por perda de feedback, frequentemente por destruição autoimune.",
        "implication": "Hipotensão, hiperpigmentação, hipoglicemia, perda de peso e alterações hidroeletrolíticas podem ocorrer. ACTH alto decorre da ausência de inibição pelos hormônios corticais.",
        "case": "Hipotensão e hiperpigmentação em pessoa com insuficiência adrenal primária",
        "caution": "Addison não corresponde a excesso de cortisol."
    },
    {
        "name": "síndrome de cushing",
        "statement": "Síndrome de Cushing é hipercortisolismo não iatrogênico, causado principalmente por tumor hipofisário secretor de ACTH, tumor adrenal ou tumor não hipofisário secretor de ACTH.",
        "implication": "Redistribuição de gordura, obesidade central, fraqueza muscular, estrias, hipertensão e alterações glicêmicas podem ocorrer. A dosagem de cortisol e ACTH integra a distinção entre causas dependentes e independentes de ACTH.",
        "case": "Obesidade central, estrias e fraqueza proximal em investigação de hipercortisolismo",
        "caution": "Cushing não é causado por deficiência primária de cortisol."
    },
    {
        "name": "diabetes melito tipo 1",
        "statement": "No diabetes melito tipo 1 ocorre destruição das células beta pancreáticas, frequentemente mediada por linfócitos T e associada a autoanticorpos.",
        "implication": "A deficiência acentuada de insulina causa hiperglicemia, decomposição de gorduras e proteínas e pode levar a cetoacidose. A massa de células beta e a insulina circulante ficam acentuadamente reduzidas.",
        "case": "Pessoa jovem com poliúria, polidipsia, emagrecimento e cetoacidose",
        "caution": "DM1 não é definido por resistência periférica isolada à insulina."
    },
    {
        "name": "diabetes melito tipo 2",
        "statement": "No diabetes melito tipo 2 há hiperglicemia associada a deficiência relativa de insulina, resistência à insulina, secreção anormal pelas células beta e aumento da produção hepática de glicose.",
        "implication": "Obesidade, dislipidemia e alterações endoteliais e vasculares integram a síndrome metabólica associada. A resistência à insulina não é compensada adequadamente pela célula beta ao longo do tempo.",
        "case": "Adulto com sobrepeso, hiperglicemia de instalação gradual e insulina normal ou elevada inicialmente",
        "caution": "DM2 não exige destruição autoimune inicial de células beta."
    },
    {
        "name": "diabetes melito gestacional",
        "statement": "No diabetes melito gestacional, hormônios placentários hiperglicemiantes e enzimas placentárias que degradam insulina aumentam a resistência à insulina durante a gestação.",
        "implication": "A doença é diagnosticada com maior frequência no segundo ou terceiro trimestre. Sobrepeso, obesidade, história familiar e síndrome dos ovários policísticos são fatores associados apresentados nos slides.",
        "case": "Gestante com hiperglicemia identificada no segundo trimestre",
        "caution": "Diabetes gestacional não decorre de destruição autoimune obrigatória de células beta."
    },
    {
        "name": "diagnóstico e acompanhamento do diabetes",
        "statement": "O diabetes pode ser confirmado por duas ou mais glicemias de jejum acima de 126 mg/dL ou glicemia casual acima de 200 mg/dL na presença de sintomas clássicos; HbA1c avalia controle glicêmico de longo prazo, cerca de 90 dias.",
        "implication": "Poliúria, polidipsia e polifagia são manifestações clássicas da hiperglicemia. A glicose liga-se de forma não enzimática à hemoglobina, permitindo a medida de HbA1c.",
        "case": "Poliúria, polidipsia e polifagia com glicemias elevadas",
        "caution": "HbA1c não avalia apenas a glicemia de um único dia."
    },
    {
        "name": "complicações crônicas do diabetes",
        "statement": "Complicações crônicas do diabetes incluem alterações microvasculares, como neuropatia, nefropatia e retinopatia, e macrovasculares, como doença coronariana, cerebral e periférica.",
        "implication": "Úlceras nos pés e alterações gastrointestinais também podem surgir no curso crônico. A hiperglicemia crônica lesiona vasos e tecidos-alvo.",
        "case": "Paciente com diabetes prolongado e lesão de retina, rim ou nervos periféricos",
        "caution": "Retinopatia diabética não é uma complicação exclusivamente macrovascular."
    },
    {
        "name": "fisiologia do adh",
        "statement": "O ADH é produzido nos núcleos supraóptico e paraventricular do hipotálamo, liberado pela neuro-hipófise e atua em receptores V2 dos túbulos coletores para inserir aquaporina-2.",
        "implication": "Aumento da osmolaridade plasmática ou redução do volume circulante efetivo estimulam sua liberação. A via V2 ativa adenilato ciclase e AMPc, favorecendo reabsorção de água.",
        "case": "Aumento da osmolaridade plasmática seguido de conservação renal de água",
        "caution": "ADH não promove perda obrigatória de água livre pelos túbulos coletores."
    },
    {
        "name": "diabetes insípido central",
        "statement": "No diabetes insípido central há deficiência de síntese ou liberação de ADH, levando a menor inserção de aquaporina-2, menor reabsorção de água e urina diluída.",
        "implication": "Trauma craniano, tumores, cirurgia hipofisária e doenças infiltrativas aparecem como causas nos slides. Com ingestão hídrica inadequada, pode haver hipernatremia e desidratação grave.",
        "case": "Poliúria, polidipsia e urina diluída após trauma hipofisário",
        "caution": "No DI central, o ADH não está normal ou alto como característica primária."
    },
    {
        "name": "diabetes insípido nefrogênico",
        "statement": "No diabetes insípido nefrogênico há resistência renal ao ADH, com ADH normal ou elevado, falha na resposta do receptor e inserção inadequada de aquaporinas.",
        "implication": "Mutações de receptor V2 ou aquaporina-2, uso de lítio, hipercalcemia, hipocalemia e doença renal crônica são causas apresentadas. No teste de privação hídrica, a resposta à desmopressina ajuda a diferenciar formas central e nefrogênica.",
        "case": "Poliúria com ADH preservado e falha de resposta renal",
        "caution": "DI nefrogênico não é deficiência de produção hipotalâmica de ADH."
    },
    {
        "name": "mioma uterino",
        "statement": "Mioma uterino é tumor benigno monoclonal de músculo liso uterino, dependente de esteroides ovarianos, com participação de estrogênio, progesterona, mutação MED12 e fatores de crescimento.",
        "implication": "Estrogênio aumenta proliferação e matriz extracelular; progesterona mantém crescimento e inibe apoptose. A queda estrogênica ajuda a explicar a regressão pós-menopausa.",
        "case": "Mulher em idade reprodutiva com nódulo uterino que regride após menopausa",
        "caution": "Mioma não contém, por definição, glândulas endometriais ectópicas no miométrio."
    },
    {
        "name": "manifestações e localização do mioma",
        "statement": "Miomas podem causar sangramento uterino anormal, dor pélvica e infertilidade por aumento da superfície endometrial, alteração da contratilidade, isquemia ou distorção da cavidade.",
        "implication": "Submucoso tem maior impacto em sangramento, intramural altera contratilidade e subseroso produz efeito compressivo. Degenerações hialina, cística, calcificação e vermelha podem ocorrer.",
        "case": "Sangramento aumentado em paciente com mioma submucoso",
        "caution": "Mioma subseroso não tem maior impacto primário sobre sangramento do que o submucoso."
    },
    {
        "name": "adenomioma",
        "statement": "Adenomioma é forma focal de adenomiose, composta por glândulas e estroma endometriais no miométrio com proliferação reacional de músculo liso adjacente.",
        "implication": "Diferencia-se do mioma por conter tecido endometrial ectópico e por ter processo inflamatório mais marcado. Estrogênio estimula proliferação e pode haver resistência à progesterona.",
        "case": "Dismenorreia e sangramento anormal em lesão miometrial com glândulas endometriais ectópicas",
        "caution": "Adenomioma não é tumor composto apenas por músculo liso."
    },
    {
        "name": "endometriose",
        "statement": "Endometriose é doença inflamatória crônica com glândulas e estroma endometriais fora da cavidade uterina, frequentemente em ovários, peritônio e ligamentos uterossacros.",
        "implication": "A teoria de Sampson descreve menstruação retrógrada e implantação peritoneal; metaplasia celômica e disseminação linfática ou hematogênica explicam outros cenários. Aromatase aumentada, redução de 17 beta HSD tipo 2 e resistência à progesterona sustentam ambiente hiperestrogênico e inflamatório local.",
        "case": "Dor pélvica e infertilidade associadas a focos endometriais ectópicos",
        "caution": "Endometriose não é presença de tecido endometrial apenas dentro da cavidade uterina."
    },
    {
        "name": "infertilidade na endometriose",
        "statement": "Endometriose pode causar infertilidade por inflamação peritoneal, ambiente tóxico para oócitos e espermatozoides, alteração da receptividade endometrial, aderências tubárias e mudança da contratilidade uterina.",
        "implication": "Os mecanismos podem coexistir e dificultar fecundação, transporte e implantação. A alteração reprodutiva decorre do microambiente inflamatório e anatômico.",
        "case": "Infertilidade associada a dor pélvica crônica e aderências pélvicas",
        "caution": "A infertilidade na endometriose não se resume a ausência de ovulação isolada."
    },
    {
        "name": "síndrome dos ovários policísticos",
        "statement": "Na SOP, aumento de peso e resistência à insulina elevam insulina, reduzem SHBG e IGFBP-1 e se associam a aumento de LH com redução de FSH, hiperandrogenismo e inibição da maturação folicular.",
        "implication": "Pode haver hirsutismo, disfunção menstrual, infertilidade, sobrepeso, obesidade e maior frequência de resistência à insulina e diabetes. O desequilíbrio hormonal contribui para aumento de testosterona livre e alteração da ovulação.",
        "case": "Irregularidade menstrual, hiperandrogenismo e dificuldade de maturação folicular",
        "caution": "SOP não é caracterizada por redução de andrógenos e maturação folicular normal."
    }
]

# Block 3: Dor (51 to 75)
dor_topics = [
    {
        "name": "definição de dor",
        "statement": "Dor é experiência sensorial e emocional desagradável associada ou semelhante à associada a dano tecidual real ou potencial.",
        "implication": "A experiência é subjetiva e envolve componentes sensoriais, afetivos e cognitivos. A intensidade referida é influenciada por contexto, memória e modulação neural.",
        "case": "Pessoa com lesão semelhante à de outra, mas percepção dolorosa diferente",
        "caution": "Dor não pode ser reduzida apenas a um sinal periférico objetivo."
    },
    {
        "name": "dor aguda e dor crônica",
        "statement": "Dor aguda costuma estar ligada a evento identificável e tem função protetora; dor crônica persiste além do tempo esperado de cicatrização e pode tornar-se doença em si.",
        "implication": "A dor persistente pode envolver sensibilização e fatores biopsicossociais. O corte temporal é orientador, mas o mecanismo e o impacto funcional também importam.",
        "case": "Dor após trauma recente versus dor persistente por meses sem lesão ativa proporcional",
        "caution": "Dor crônica não é explicada obrigatoriamente por lesão tecidual contínua."
    },
    {
        "name": "dor nociceptiva",
        "statement": "Dor nociceptiva decorre da ativação de nociceptores por estímulos mecânicos, térmicos ou químicos potencialmente lesivos.",
        "implication": "A sinalização alerta para ameaça ou dano tecidual. A transdução começa nas terminações nervosas livres periféricas.",
        "case": "Dor inflamatória após entorse com liberação de mediadores locais",
        "caution": "Dor nociceptiva não exige lesão direta de nervo sensitivo."
    },
    {
        "name": "dor neuropática",
        "statement": "Dor neuropática é causada por lesão ou doença do sistema somatossensorial, periférico ou central.",
        "implication": "Pode gerar queimação, choques, alodinia e dor desproporcional ao estímulo. A origem está em disfunção do sistema sensorial, não apenas em inflamação tecidual local.",
        "case": "Dor em queimação em território de neuropatia periférica",
        "caution": "Dor neuropática não é sinônimo de dor muscular comum."
    },
    {
        "name": "transdução nociceptiva",
        "statement": "Transdução é a conversão de estímulo nocivo mecânico, térmico ou químico em sinal elétrico nos nociceptores.",
        "implication": "Inicia a cadeia que seguirá por fibras aferentes até o sistema nervoso central. Mediadores inflamatórios reduzem limiar de ativação de nociceptores.",
        "case": "Lesão cutânea com ativação imediata de terminações nervosas livres",
        "caution": "Transdução não é a interpretação consciente da dor no córtex."
    },
    {
        "name": "fibras a delta",
        "statement": "Fibras A delta são finamente mielinizadas e conduzem dor rápida, aguda e relativamente bem localizada.",
        "implication": "Explicam a primeira sensação dolorosa após estímulo nocivo. A mielinização aumenta a velocidade de condução em comparação com fibras C.",
        "case": "Dor em pontada imediata após tocar objeto muito quente",
        "caution": "Fibras A delta não são as principais responsáveis pela dor lenta e difusa persistente."
    },
    {
        "name": "fibras c",
        "statement": "Fibras C são amielínicas, de condução lenta, e transmitem dor tardia, difusa e em queimação.",
        "implication": "Participam de dor persistente e sensibilização periférica e central. Sua condução é mais lenta que a das fibras A delta.",
        "case": "Dor contínua e mal localizada após a pontada inicial de uma queimadura",
        "caution": "Fibras C não são as fibras mais espessas e intensamente mielinizadas."
    },
    {
        "name": "mediadores inflamatórios",
        "statement": "Prostaglandinas, bradicinina, histamina, serotonina, íons e outros mediadores podem ativar ou sensibilizar nociceptores.",
        "implication": "O limiar doloroso diminui no tecido inflamado. Sensibilização periférica explica hiperalgesia no local da inflamação.",
        "case": "Área inflamada dolorosa ao toque após lesão tecidual",
        "caution": "Mediadores inflamatórios não são neurotransmissores exclusivamente corticais."
    },
    {
        "name": "transmissão no corno dorsal",
        "statement": "No corno dorsal da medula, aferentes nociceptivos fazem sinapse com neurônios de segunda ordem e interneurônios, modulando a transmissão ascendente.",
        "implication": "A informação pode ser facilitada ou inibida antes de ascender. O corno dorsal é ponto chave de integração da nocicepção.",
        "case": "Estímulo doloroso periférico chegando à medula espinal",
        "caution": "A primeira sinapse não ocorre no córtex cerebral."
    },
    {
        "name": "glutamato",
        "statement": "Glutamato é neurotransmissor excitatório importante na transmissão nociceptiva rápida no corno dorsal.",
        "implication": "Ativação repetida pode contribuir para aumento de excitabilidade em circuitos de dor. Seu efeito é geralmente mais rápido e localizado que o da substância P.",
        "case": "Dor aguda com liberação sináptica rápida de neurotransmissor excitatório",
        "caution": "Glutamato não é o principal neurotransmissor inibitório do SNC."
    },
    {
        "name": "substância p",
        "statement": "Substância P é neuropeptídeo liberado especialmente por fibras C, com efeito mais lento, difuso e prolongado, potencializando a transmissão nociceptiva.",
        "implication": "Pode contribuir para dor persistente e sensibilização. Neuropeptídeos têm ação mais duradoura que neurotransmissores de rápida recaptação.",
        "case": "Estímulo nociceptivo sustentado com aumento da excitabilidade no corno dorsal",
        "caution": "Substância P não é neurotransmissor inibitório predominante."
    },
    {
        "name": "sensibilização central",
        "statement": "Estimulação nociceptiva persistente pode tornar neurônios de segunda ordem hiperexcitáveis, ampliando a resposta a estímulos.",
        "implication": "Favorece hiperalgesia secundária e alodinia. A mudança ocorre no processamento central, não apenas no tecido periférico lesado.",
        "case": "Dor aumentada fora do local inicial da lesão após estimulação prolongada",
        "caution": "Sensibilização central não significa que a dor seja imaginária."
    },
    {
        "name": "hiperalgesia",
        "statement": "Hiperalgesia é resposta dolorosa aumentada a estímulo que normalmente é doloroso.",
        "implication": "Pode ser periférica, no local de inflamação, ou central, em áreas vizinhas. É diferente de alodinia, na qual estímulo usualmente inócuo dói.",
        "case": "Picada habitualmente dolorosa percebida como muito mais intensa em área sensibilizada",
        "caution": "Hiperalgesia não é ausência de sensação dolorosa."
    },
    {
        "name": "alodinia",
        "statement": "Alodinia é dor provocada por estímulo que normalmente não causa dor.",
        "implication": "Reflete alteração do processamento nociceptivo, frequente em dor neuropática e sensibilização central. O estímulo é inócuo em condições habituais, mas torna-se doloroso para o paciente.",
        "case": "Contato leve de roupa causando dor intensa",
        "caution": "Alodinia não é aumento da dor a estímulo já nocivo; isso define hiperalgesia."
    },
    {
        "name": "via neoespinotalâmica",
        "statement": "A via neoespinotalâmica conduz dor rápida, bem localizada e temperatura ao tálamo e córtex somatossensorial.",
        "implication": "Permite discriminar localização e qualidade do estímulo agudo. Neurônios de segunda ordem cruzam e ascendem contralateralmente.",
        "case": "Dor aguda e precisamente localizada após estímulo térmico",
        "caution": "A via neoespinotalâmica não é a principal responsável pela dor crônica difusa afetiva."
    },
    {
        "name": "via paleoespinotalâmica",
        "statement": "A via paleoespinotalâmica transmite dor lenta, difusa e mal localizada, com conexões para formação reticular e sistema límbico.",
        "implication": "Relaciona-se ao componente afetivo e motivacional da dor persistente. As conexões múltiplas explicam menor precisão na localização.",
        "case": "Sofrimento e desconforto difuso associados a dor prolongada",
        "caution": "Não é a via predominante para a primeira dor aguda em pontada."
    },
    {
        "name": "decussação da dor",
        "statement": "Axônios de neurônios de segunda ordem da via anterolateral cruzam para o lado contralateral na medula e ascendem ao encéfalo.",
        "implication": "Lesões acima do cruzamento podem alterar a percepção dolorosa do lado oposto do corpo. A organização anatômica é fundamental para localizar lesões.",
        "case": "Déficit de dor e temperatura contralateral a lesão medular em via ascendente",
        "caution": "A via não ascende exclusivamente pelo mesmo lado após sinapse medular."
    },
    {
        "name": "tálamo e córtex somatossensorial",
        "statement": "O tálamo funciona como estação de retransmissão, e o córtex somatossensorial contribui para identificar localização, intensidade e tipo de dor.",
        "implication": "A percepção consciente exige processamento central. Sensação e discriminação não se confundem com componente emocional.",
        "case": "Paciente identifica precisamente onde e como dói após estímulo nociceptivo",
        "caution": "O córtex somatossensorial não é a principal estrutura para gerar medo e sofrimento afetivo."
    },
    {
        "name": "sistema límbico e dor",
        "statement": "Estruturas límbicas, como amígdala e hipocampo, participam do componente emocional, da memória e da motivação relacionados à dor.",
        "implication": "Ansiedade, medo e sofrimento modulam a experiência dolorosa. A dimensão afetiva é real e biologicamente mediada.",
        "case": "Dor crônica associada a aversão e memória de experiências dolorosas anteriores",
        "caution": "Sistema límbico não define a localização tátil precisa do estímulo."
    },
    {
        "name": "córtex pré frontal e dor",
        "statement": "O córtex pré-frontal contribui para interpretação cognitiva, atenção, avaliação e tomada de decisões relacionadas à dor.",
        "implication": "Expectativas e contexto podem alterar a experiência dolorosa. A dor resulta da integração de processos sensoriais, afetivos e cognitivos.",
        "case": "Paciente cuja ansiedade e expectativa amplificam o sofrimento percebido",
        "caution": "O córtex pré-frontal não é o local inicial de transdução periférica."
    },
    {
        "name": "substância cinzenta periaquedutal",
        "statement": "A substância cinzenta periaquedutal integra sistemas descendentes de analgesia, é rica em receptores opioides e projeta para núcleos do tronco encefálico.",
        "implication": "Pode reduzir a transmissão nociceptiva no corno dorsal por vias descendentes. Conecta circuitos de dor, emoção e respostas defensivas.",
        "case": "Modulação endógena de dor intensa pelo sistema nervoso central",
        "caution": "Não é uma estrutura periférica que detecta diretamente a lesão cutânea."
    },
    {
        "name": "núcleo magno da rafe",
        "statement": "O núcleo magno da rafe recebe projeções descendentes e envia fibras à medula, modulando a transmissão nociceptiva por mecanismos serotoninérgicos, entre outros.",
        "implication": "A inibição descendente reduz a chegada de sinais dolorosos aos circuitos superiores. Atua em conjunto com substância cinzenta periaquedutal e corno dorsal.",
        "case": "Ativação de via analgésica descendente no tronco encefálico",
        "caution": "Não é a estação de retransmissão talâmica da dor."
    },
    {
        "name": "serotonina e norepinefrina",
        "statement": "Serotonina e norepinefrina participam das vias descendentes que modulam a transmissão nociceptiva na medula.",
        "implication": "Alterações nessas vias podem contribuir para manutenção ou redução de dor persistente. A ação depende de receptores e circuitos, não de simples bloqueio de toda sensação.",
        "case": "Dor crônica com alvo em circuitos de modulação descendente",
        "caution": "Esses mediadores não explicam a transdução inicial no nociceptor periférico."
    },
    {
        "name": "gaba e glicina",
        "statement": "GABA e glicina são neurotransmissores inibitórios relevantes no corno dorsal; redução de inibição pode favorecer hiperalgesia e alodinia.",
        "implication": "O equilíbrio entre excitação e inibição regula o ganho da via nociceptiva. A teoria do controle de portão envolve modulação segmentar da transmissão dolorosa.",
        "case": "Sensibilização com perda de controle inibitório espinal",
        "caution": "GABA não é neurotransmissor excitatório principal dos nociceptores."
    },
    {
        "name": "modulação descendente",
        "statement": "A modulação descendente pode inibir ou facilitar a dor, integrando substância cinzenta periaquedutal, tronco encefálico e corno dorsal.",
        "implication": "Explica por que contexto, emoção e sistemas endógenos alteram a percepção dolorosa. Não há uma relação fixa: a modulação pode ser analgésica ou facilitadora conforme o circuito.",
        "case": "Dor reduzida em situação de ameaça intensa ou amplificada em estresse persistente.",
        "caution": "Modulação descendente não substitui a entrada nociceptiva periférica em todos os quadros."
    }
]

# Block 4: Respiratório (76 to 100)
resp_topics = [
    {
        "name": "ph arterial",
        "statement": "O pH arterial normal situa-se aproximadamente entre 7,35 e 7,45; valores menores indicam acidemia e maiores indicam alcalemia.",
        "implication": "A identificação do distúrbio começa pela direção do pH antes de avaliar o componente primário. Acidemia e acidose não são termos sempre idênticos: o primeiro descreve o pH sanguíneo, o segundo o processo fisiopatológico.",
        "case": "Gasometria com pH de 7,28",
        "caution": "O pH não deve ser interpretado sem PaCO2 e bicarbonato."
    },
    {
        "name": "acidose metabólica",
        "statement": "Acidose metabólica caracteriza-se por redução primária do bicarbonato, com compensação respiratória por queda da PaCO2.",
        "implication": "A hiperventilação reduz CO2 e atenua, mas não corrige totalmente, a acidemia. A compensação não transforma o distúrbio primário em respiratório.",
        "case": "pH baixo, bicarbonato reduzido e PaCO2 abaixo do esperado",
        "caution": "Na acidose metabólica, o bicarbonato não está primariamente elevado."
    },
    {
        "name": "alcalose metabólica",
        "statement": "Alcalose metabólica caracteriza-se por elevação primária do bicarbonato, com compensação respiratória por aumento da PaCO2.",
        "implication": "A hipoventilação compensatória é limitada pela necessidade de manter oxigenação adequada. O componente respiratório segue a alteração metabólica como compensação.",
        "case": "pH elevado e bicarbonato acima da faixa esperada",
        "caution": "Alcalose metabólica não apresenta redução primária do bicarbonato."
    },
    {
        "name": "acidose respiratória",
        "statement": "Acidose respiratória decorre de aumento primário da PaCO2 por hipoventilação alveolar; os rins elevam bicarbonato como compensação ao longo do tempo.",
        "implication": "Retenção de CO2 reduz pH e pode causar cefaleia, sonolência e confusão em casos graves. A compensação renal é mais importante quando o distúrbio se torna crônico.",
        "case": "Hipoventilação com PaCO2 elevada e pH reduzido",
        "caution": "Acidose respiratória não é definida por hiperventilação com PaCO2 baixa."
    },
    {
        "name": "alcalose respiratória",
        "statement": "Alcalose respiratória decorre de queda primária da PaCO2 por hiperventilação; os rins reduzem bicarbonato como compensação.",
        "implication": "A redução de CO2 aumenta o pH sanguíneo. A compensação renal leva tempo e é limitada na fase aguda.",
        "case": "Ansiedade ou hipoxemia com hiperventilação e PaCO2 baixa",
        "caution": "Alcalose respiratória não resulta de retenção de CO2."
    },
    {
        "name": "oxigenação arterial",
        "statement": "PaO2 avalia oxigênio dissolvido no sangue arterial, enquanto saturação de oxigênio estima a proporção de hemoglobina ocupada por oxigênio.",
        "implication": "Ambas ajudam a avaliar oxigenação, mas não são medidas idênticas. A interpretação deve considerar ventilação, troca gasosa e hemoglobina.",
        "case": "Gasometria arterial com PaO2 reduzida e oximetria baixa",
        "caution": "PaO2 não é medida direta de bicarbonato ou de ventilação alveolar."
    },
    {
        "name": "espirometria",
        "statement": "Espirometria mede volumes e fluxos de ar movimentados durante manobras respiratórias, sendo útil para detectar padrões ventilatórios.",
        "implication": "Permite avaliar VEF1, CVF e a relação VEF1 CVF. Não mede diretamente o volume residual nem a capacidade pulmonar total em espirometria simples.",
        "case": "Paciente com dispneia submetido a curva fluxo volume",
        "caution": "Espirometria não substitui gasometria para avaliar pH e PaCO2."
    },
    {
        "name": "volume corrente",
        "statement": "Volume corrente é o volume de ar inspirado ou expirado em uma respiração tranquila normal.",
        "implication": "É um dos volumes pulmonares básicos e compõe capacidades maiores. Em adulto saudável, valores aproximados variam com tamanho corporal; números isolados não definem doença.",
        "case": "Traçado espirométrico durante respiração em repouso",
        "caution": "Volume corrente não inclui todo o volume que permanece após expiração máxima."
    },
    {
        "name": "volume de reserva inspiratório",
        "statement": "Volume de reserva inspiratório é o volume adicional que pode ser inspirado após uma inspiração tranquila.",
        "implication": "Somado ao volume corrente, participa da capacidade inspiratória. Reflete reserva disponível para expandir os pulmões além da respiração comum.",
        "case": "Paciente realiza inspiração máxima após ciclo respiratório habitual",
        "caution": "Não é o ar que permanece nos pulmões depois de expiração máxima."
    },
    {
        "name": "volume de reserva expiratório",
        "statement": "Volume de reserva expiratório é o volume adicional que pode ser expirado após uma expiração tranquila.",
        "implication": "Integra a capacidade residual funcional juntamente com o volume residual. Reduções podem ocorrer quando a mecânica respiratória é limitada.",
        "case": "Manobra expiratória forçada iniciada ao final de uma expiração normal",
        "caution": "Não corresponde à capacidade vital inteira."
    },
    {
        "name": "volume residual",
        "statement": "Volume residual é o ar que permanece nos pulmões após expiração máxima e não é medido diretamente por espirometria simples.",
        "implication": "Ajuda a manter alvéolos abertos, mas pode aumentar em aprisionamento aéreo. Compõe a capacidade residual funcional e a capacidade pulmonar total.",
        "case": "Paciente com doença obstrutiva e hiperinsuflação",
        "caution": "Não é expelido durante a manobra de capacidade vital forçada."
    },
    {
        "name": "capacidade vital",
        "statement": "Capacidade vital corresponde ao volume máximo que pode ser expirado após uma inspiração máxima, somando volume de reserva inspiratório, volume corrente e reserva expiratória.",
        "implication": "Reduz-se em processos que limitam expansão pulmonar. Não inclui o volume residual.",
        "case": "Paciente com fibrose e redução de volumes pulmonares",
        "caution": "Capacidade vital não é sinônimo de VEF1, que mede apenas o primeiro segundo da expiração forçada."
    },
    {
        "name": "capacidade residual funcional",
        "statement": "Capacidade residual funcional é a soma do volume de reserva expiratório e do volume residual, representando o volume após expiração tranquila.",
        "implication": "Funciona como reserva de ar entre ciclos respiratórios normais. Pode aumentar em aprisionamento aéreo e diminuir em algumas situações restritivas.",
        "case": "Avaliação de volumes pulmonares em doença com hiperinsuflação",
        "caution": "Não inclui o volume de reserva inspiratório."
    },
    {
        "name": "capacidade pulmonar total",
        "statement": "Capacidade pulmonar total é a soma de todos os volumes pulmonares, incluindo volume residual.",
        "implication": "A medida é essencial para confirmar restrição quando reduzida. A espirometria isolada não mede diretamente a capacidade pulmonar total.",
        "case": "Provas completas de função pulmonar em suspeita de doença restritiva",
        "caution": "Capacidade pulmonar total não é igual à capacidade vital, pois esta exclui volume residual."
    },
    {
        "name": "cvf",
        "statement": "Capacidade vital forçada é o volume máximo expirado de maneira forçada após inspiração máxima.",
        "implication": "É usada junto ao VEF1 para caracterizar padrão ventilatório. Pode diminuir em doenças restritivas e em obstrução grave com aprisionamento.",
        "case": "Manobra expiratória forçada em espirometria",
        "caution": "CVF não se limita ao ar eliminado no primeiro segundo."
    },
    {
        "name": "vef1",
        "statement": "VEF1 é o volume expirado no primeiro segundo de uma expiração forçada após inspiração máxima.",
        "implication": "Cai de forma marcante quando há obstrução ao fluxo expiratório. Deve ser interpretado em relação ao previsto e à CVF.",
        "case": "Curva espirométrica com prolongamento da expiração",
        "caution": "VEF1 não é uma medida de pressão arterial de oxigênio."
    },
    {
        "name": "padrão obstrutivo",
        "statement": "Doença obstrutiva aumenta a resistência ao fluxo aéreo e reduz desproporcionalmente o VEF1, diminuindo a relação VEF1 CVF.",
        "implication": "A expiração torna-se dificultada e pode ocorrer aprisionamento aéreo. Asma e DPOC são exemplos de doenças com padrão obstrutivo.",
        "case": "Espirometria com relação VEF1 CVF abaixo do limite inferior de normalidade",
        "caution": "Padrão obstrutivo não é definido primariamente por redução proporcional de todos os volumes com relação preservada."
    },
    {
        "name": "padrão restritivo",
        "statement": "Doença restritiva caracteriza-se por redução da expansão pulmonar e diminuição de volumes, especialmente da capacidade pulmonar total, com relação VEF1 CVF normal ou elevada.",
        "implication": "O pulmão ou a caixa torácica comportam menos volume. A confirmação exige medida de capacidade pulmonar total reduzida.",
        "case": "Volumes baixos em fibrose pulmonar com relação VEF1 CVF preservada",
        "caution": "Restrição não é definida por relação VEF1 CVF baixa como achado central."
    },
    {
        "name": "curva fluxo volume obstrutiva",
        "statement": "Na obstrução, o ramo expiratório da curva fluxo volume torna-se escavado por limitação do fluxo, e o esvaziamento é prolongado.",
        "implication": "A perda de retração elástica e o colapso dinâmico de vias podem contribuir. O formato fornece informação adicional além dos números isolados.",
        "case": "Curva com concavidade expiratória em paciente com DPOC",
        "caution": "A curva obstrutiva não costuma ser simplesmente menor, porém com formato proporcionalmente preservado."
    },
    {
        "name": "enfisema",
        "statement": "Enfisema é destruição permanente de paredes alveolares e aumento anormal dos espaços aéreos distais, com redução de elasticidade pulmonar.",
        "implication": "A perda de retração elástica favorece colapso expiratório e aprisionamento de ar. Tabagismo e deficiência de alfa um antitripsina alteram o equilíbrio protease antiprotease.",
        "case": "Dispneia progressiva, tórax hiperinsuflado e padrão obstrutivo",
        "caution": "Enfisema não é definido por excesso de secreção brônquica como mecanismo principal."
    },
    {
        "name": "alfa um antitripsina",
        "statement": "Alfa um antitripsina inibe elastase; sua deficiência ou inativação aumenta destruição de fibras elásticas e favorece enfisema.",
        "implication": "O desequilíbrio protease antiprotease lesa paredes alveolares. Fumaça recruta células inflamatórias e pode reduzir a proteção antiprotease.",
        "case": "Enfisema precoce ou desproporcional em pessoa sem tabagismo intenso",
        "caution": "A deficiência não causa fibrose por aumento de deposição de colágeno como mecanismo central."
    },
    {
        "name": "bronquite crônica",
        "statement": "Bronquite crônica envolve inflamação das vias aéreas e hipersecreção de muco, contribuindo para obstrução persistente.",
        "implication": "Secreções espessas prejudicam depuração mucociliar e favorecem infecção. Neutrófilos e mediadores inflamatórios participam da lesão das vias aéreas.",
        "case": "Tosse produtiva crônica em fumante",
        "caution": "Bronquite crônica não é caracterizada principalmente pela destruição difusa de septos alveolares."
    },
    {
        "name": "depuração mucociliar",
        "statement": "A depuração mucociliar remove partículas e microrganismos das vias aéreas; secreção espessa ou defeito ciliar reduz essa defesa.",
        "implication": "A retenção de secreção facilita colonização e infecções respiratórias recorrentes. O sistema depende de muco com propriedades adequadas e movimento ciliar coordenado.",
        "case": "Infecções recorrentes associadas a secreção de difícil eliminação",
        "caution": "Depuração mucociliar não é mecanismo de difusão de oxigênio através da membrana alvéolo capilar."
    },
    {
        "name": "bronquiectasia",
        "statement": "Bronquiectasia é dilatação anormal e persistente dos brônquios, associada a destruição da parede, retenção de secreções e infecção recorrente.",
        "implication": "Forma-se ciclo de inflamação, secreção, infecção e dano estrutural. Pode coexistir com distúrbio obstrutivo ao fluxo aéreo.",
        "case": "Tosse crônica com expectoração e infecções respiratórias repetidas",
        "caution": "Não é simplesmente broncoconstrição reversível isolada."
    },
    {
        "name": "insuficiência respiratória",
        "statement": "Insuficiência respiratória ocorre quando o sistema respiratório falha em manter oxigenação adequada, eliminação apropriada de CO2 ou ambas.",
        "implication": "Pode decorrer de alterações de ventilação, troca gasosa, perfusão ou mecânica respiratória. Gasometria e avaliação clínica são fundamentais para caracterizar o padrão.",
        "case": "Hipoxemia com ou sem hipercapnia em doença pulmonar grave",
        "caution": "Insuficiência respiratória não é definida apenas por tosse ou alteração isolada de espirometria."
    }
]

print(f"Total topics: CV={len(cv_topics)}, Endo={len(endo_topics)}, Dor={len(dor_topics)}, Resp={len(resp_topics)}")

def generate_block_questions(topics, block_name, block_index_offset):
    questions = []
    num_topics = len(topics)
    letters = ['A', 'B', 'C', 'D']
    
    for t_idx, topic in enumerate(topics):
        q_base_num = block_index_offset + (t_idx * 5) + 1
        
        # Distractors for Q1
        d1 = topics[(t_idx + 1) % num_topics]["statement"]
        d2 = topics[(t_idx + 2) % num_topics]["statement"]
        d3 = topics[(t_idx + 3) % num_topics]["statement"]
        
        # Position for Q1 correct answer (rotate through A, B, C, D)
        correct_pos_q1 = t_idx % 4
        opts_q1 = [None, None, None, None]
        opts_q1[correct_pos_q1] = topic["statement"]
        dist_pool_q1 = [d1, d2, d3]
        pool_idx = 0
        for i in range(4):
            if opts_q1[i] is None:
                opts_q1[i] = dist_pool_q1[pool_idx]
                pool_idx += 1
                
        correct_letter_q1 = letters[correct_pos_q1]
        
        gabarito_q1 = f"Alternativa {correct_letter_q1}. {topic['statement']}\n\nImplicação clínica/funcional: {topic['implication']}\n\nAs demais alternativas descrevem outros mecanismos fisiopatológicos do bloco."
        
        # Q1: FECHADA
        questions.append({
            "type": "FECHADA",
            "text": f"Sobre {topic['name']}, assinale a alternativa CORRETA:",
            "interactionType": "multiple-choice",
            "options": opts_q1,
            "gabarito": gabarito_q1
        })
        
        # Q2: CASO CLÍNICO
        q2_text = (
            f"{topic['case']}. Considere que o quadro apresentado se relaciona principalmente a {topic['name']}.\n\n"
            f"a) Identifique o mecanismo fisiopatológico central.\n"
            f"b) Explique como esse mecanismo gera a repercussão clínica ou funcional esperada.\n"
            f"c) Cite um dado de história, exame físico ou exame complementar que possa apoiar a hipótese."
        )
        q2_gabarito = (
            f"a) Mecanismo central: {topic['statement']}\n\n"
            f"b) Repercussão: {topic['implication']}\n\n"
            f"c) Achado de apoio: {topic['case']}. Atenção: {topic['caution']}"
        )
        questions.append({
            "type": "CASO CLÍNICO",
            "text": q2_text,
            "interactionType": "textarea",
            "gabarito": q2_gabarito
        })
        
        # Q3: ABERTA
        q3_text = (
            f"Explique, em sequência fisiopatológica, o mecanismo de {topic['name']}.\n\n"
            f"Sua resposta deve incluir: mecanismo inicial, alteração funcional resultante e uma repercussão clínica ou de exame compatível."
        )
        q3_gabarito = (
            f"Resposta esperada:\n"
            f"- Mecanismo inicial: {topic['statement']}\n"
            f"- Alteração funcional e repercussão: {topic['implication']}\n"
            f"- Ponto de atenção: {topic['caution']}"
        )
        questions.append({
            "type": "ABERTA",
            "text": q3_text,
            "interactionType": "textarea",
            "gabarito": q3_gabarito
        })
        
        # Q4: VERDADEIRO OU FALSO
        distractor_topic = topics[(t_idx + 4) % num_topics]
        q4_text = (
            f"Sobre {topic['name']}, marque V ou F e justifique as afirmativas falsas:\n\n"
            f"I. {topic['statement']}\n"
            f"II. {distractor_topic['statement']}\n"
            f"III. {topic['implication']}"
        )
        q4_gabarito = (
            f"I — V. {topic['statement']}\n\n"
            f"II — F. A afirmativa descreve o mecanismo de {distractor_topic['name']}, e não de {topic['name']}. No tema em questão: {topic['statement']}\n\n"
            f"III — V. {topic['implication']}"
        )
        questions.append({
            "type": "VERDADEIRO OU FALSO",
            "text": q4_text,
            "interactionType": "textarea",
            "gabarito": q4_gabarito
        })
        
        # Q5: FECHADA
        d4 = topics[(t_idx + 5) % num_topics]["statement"]
        d5 = topics[(t_idx + 6) % num_topics]["statement"]
        d6 = topics[(t_idx + 7) % num_topics]["statement"]
        
        correct_pos_q5 = (t_idx + 2) % 4
        opts_q5 = [None, None, None, None]
        opts_q5[correct_pos_q5] = topic["statement"]
        dist_pool_q5 = [d4, d5, d6]
        pool_idx = 0
        for i in range(4):
            if opts_q5[i] is None:
                opts_q5[i] = dist_pool_q5[pool_idx]
                pool_idx += 1
                
        correct_letter_q5 = letters[correct_pos_q5]
        gabarito_q5 = f"Alternativa {correct_letter_q5}. {topic['statement']}\n\nImplicação: {topic['implication']}\n\n{topic['caution']}"
        
        questions.append({
            "type": "FECHADA",
            "text": f"Em relação a {topic['name']}, qual alternativa melhor explica o mecanismo fisiopatológico predominante?",
            "interactionType": "multiple-choice",
            "options": opts_q5,
            "gabarito": gabarito_q5
        })
        
    return questions

def write_ts_file(filepath, var_name, questions):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(f"export const {var_name} = ")
        json.dump(questions, f, ensure_ascii=False, indent=2)
        f.write(";\n")
    print(f"Wrote {len(questions)} questions to {filepath}")

cv_qs = generate_block_questions(cv_topics, "Cardiovascular", 0)
endo_qs = generate_block_questions(endo_topics, "Endócrino e Reprodutor", 125)
dor_qs = generate_block_questions(dor_topics, "Dor", 250)
resp_qs = generate_block_questions(resp_topics, "Respiratório", 375)

write_ts_file("src/fisio_500_cv.ts", "fisio500Cv", cv_qs)
write_ts_file("src/fisio_500_endo.ts", "fisio500Endo", endo_qs)
write_ts_file("src/fisio_500_dor.ts", "fisio500Dor", dor_qs)
write_ts_file("src/fisio_500_resp.ts", "fisio500Resp", resp_qs)

# Create aggregator file fisio_500_all.ts
with open("src/fisio_500_all.ts", 'w', encoding='utf-8') as f:
    f.write("""import { fisio500Cv } from './fisio_500_cv';
import { fisio500Endo } from './fisio_500_endo';
import { fisio500Dor } from './fisio_500_dor';
import { fisio500Resp } from './fisio_500_resp';

// Deterministic pseudo-random shuffle (Fisher-Yates with LCG) to guarantee stable, reproducible random order
function seededShuffle<T>(array: T[], seed = 2026): T[] {
  const arr = [...array];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const rnd = s / 233280;
    const j = Math.floor(rnd * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

export const fisio500All = seededShuffle([
  ...fisio500Cv,
  ...fisio500Endo,
  ...fisio500Dor,
  ...fisio500Resp
], 2026);
""")
print(f"Total 500 questions combined: {len(cv_qs) + len(endo_qs) + len(dor_qs) + len(resp_qs)}")

