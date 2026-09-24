import json

with open("q11_40.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

# Q1
questions[0]["gabarito"] = """Alternativa C (Apenas II e III estão corretas).

**COMENTÁRIO DO GABARITO:**

• I — FALSO: O quadro clínico descrito (homem jovem de 25 anos com febre, mal-estar e dor torácica anterior que piora com a inspiração profunda e o decúbito dorsal, mas que MELHORA tipicamente ao sentar-se e inclinar o tórax para a frente — sinal da prece maometana) é clássico e patognomônico de PERICARDITE AGUDA, e não de pleurite isolada. Na pleurite, a dor é nitidamente lateral/axilar (pontada), piora na inspiração e alivia quando o paciente se deita sobre o hemitórax acometido (imobilizando a parede), não havendo esse alívio característico ao sentar-se e inclinar o tronco.

• II — VERDADEIRO: A paciente de 67 anos permaneceu acamada por 30 dias após fratura de colo de fêmur (fator de risco maior da Tríade de Virchow para trombose venosa profunda) e abriu edema unilateral no MID há 3 dias. A instalação súbita de dispneia e dor torácica do tipo pleurítica decorre da embolização para ramo arterial pulmonar com isquemia e reação inflamatória da pleura parietal sobrejacente, configurando infarto pulmonar por Tromboembolismo Pulmonar (TEP).

• III — VERDADEIRO: A dor torácica de origem osteomuscular/osteoneuromuscular (ex.: costocondrite, síndrome de Tietze, miosite) tem como atributos semiológicos típicos o desencadeamento ou piora pela movimentação dos braços, rotação do pescoço e inspiração profunda (movimentação da caixa torácica), sendo nitidamente localizada e reprodutível à palpação ou compressão digital do ponto anatômico correspondente.

• Resumo Semiológico: Apenas II e III estão corretas (Alternativa C)."""

# Q2
questions[1]["gabarito"] = """Alternativa B.

**COMENTÁRIO DO GABARITO:**

• O relato de "cansaço que não melhora após uma noite inteira de sono" define o sintoma semiológico FADIGA (diferente da astenia pura ou da dispneia aos esforços).
• A associação de fadiga crônica, ganho ponderal paradoxal (por retenção hidrossalina e mixedema), intolerância marcante ao frio, pele áspera e descamativa, constipação intestinal obstinada e bradicardia sinusal de repouso (FC 54 bpm) compõe a clássica síndrome clínica do Hipotireoidismo primário.
• A fácies apresentada é a FÁCIES MIXEDEMATOSA (ou hipotiroidea): caracterizada por edema periorbitário e facial não depressível (infiltração de glicosaminoglicanos), olhar apático/sonolento, supercílios rarefeitos na metade lateral (madarose) e cabelos secos e quebradiços.
• As demais alternativas estão incorretas: não é astenia isolada inespecífica (A); não é dispneia de etiologia puramente cardiovascular (C); lipotimia é sensação de pré-síncope/desmaio iminente (D); a fácies de Addison relaciona-se à insuficiência adrenal primária com hiperpigmentação cutaneomucosa (E)."""

# Q3
questions[2]["gabarito"] = """Alternativa A (Apenas I e II estão corretas).

**COMENTÁRIO DO GABARITO:**

• I — VERDADEIRO: A Dispneia Paroxística Noturna (DPN) é um sintoma altamente específico de insuficiência ventricular esquerda. Decorre da reabsorção progressiva do líquido intersticial dos membros inferiores para a circulação sistêmica durante o decúbito, elevando a volemia central e a pressão capilar pulmonar após cerca de 1 a 2 horas de sono, acordando o paciente com sufocação intensa que o obriga a sentar-se na cama ou aproximar-se de uma janela aberta.

• II — VERDADEIRO: A Trepopneia é a variante posicional da dispneia na qual o paciente refere falta de ar em determinado decúbito lateral e alívio ao deitar-se sobre o lado oposto. É comum em derrames pleurais unilaterais volumosos (onde o paciente prefere deitar sobre o lado do derrame para permitir a livre expansão do hemitórax são superior) ou em deformidades anatômicas pulmonares/cardíacas.

• III — FALSO: De acordo com a classificação funcional da New York Heart Association (NYHA):
  - Classe I: Sintomas surgem apenas aos GRANDES esforços (acima das atividades habituais), sem limitação na vida diária;
  - Classe II: Limitação leve aos esforços habituais/médios;
  - Classe III: Limitação marcante, com sintomas aos PEQUENOS esforços cotidianos (ex.: escovar dentes, trocar de roupa, caminhar poucos metros em plano);
  - Classe IV: Sintomas em repouso. O enunciado descreveu a Classe I, e não a Classe III.

• IV — FALSO: A Platipneia é a dispneia que surge ou piora na posição ortostática (em pé ou sentado) e melhora no decúbito dorsal. A dispneia que piora no decúbito dorsal e melhora na posição ortostática é a ORTOPNEIA.

• Resumo Semiológico: Apenas I e II estão corretas (Alternativa A)."""

# Q4
questions[3]["gabarito"] = """Gabarito Comentado e Completo:

(a) Mecanismos Fisiopatológicos e Eficácia dos Antitérmicos:
• Febre: É uma resposta homeostática coordenada e regulada do sistema nervoso central diante de pirógenos exógenos (bactérias, vírus, endotoxinas) e endógenos (citocinas como IL-1, TNF-alfa e IL-6). Essas citocinas atuam no endotélio vascular do órgão vasculoso da lâmina terminal (OVLT) estimulando a ciclooxigenase-2 (COX-2) a sintetizar Prostaglandina E2 (PGE2). A PGE2 liga-se a receptores nos neurônios pré-ópticos do hipotálamo anterior, elevando o "ponto de ajuste" térmico ("set-point" hipotalâmico). O organismo passa a reconhecer uma temperatura mais alta como normal, deflagrando mecanismos fisiológicos de retenção e produção de calor (vasoconstrição periférica, calafrios, piloereção). Por essa razão, os antitérmicos (AINEs, paracetamol, dipirona) são eficazes: eles inibem as enzimas ciclooxigenases, bloqueiam a produção de PGE2 hipotalâmica e restauram o ponto de ajuste ao nível fisiológico (36,5–37,0 °C), induzindo sudorese e vasodilatação para dissipar calor.
• Hipertermia: Ocorre quando a temperatura corporal central sobe de forma desregulada e patológica por falha dos mecanismos periféricos de dissipação térmica ou por sobrecarga extrema de calor ambiental/metabólica (ex.: insolação/intermação, hipertermia maligna por anestésicos inalatórios, síndrome neuroléptica maligna, intoxicação anticolinérgica). O ponto de ajuste hipotalâmico permanece estritamente normal (não há elevação de PGE2 hipotalâmica). Por conseguinte, os antitérmicos comuns são completamente ineficazes, e a conduta terapêutica imediata baseia-se no resfriamento físico ativo (compressas geladas, banho frio, infusão de soro gelado, ventilador) e medidas farmacológicas específicas para o relaxamento muscular (ex.: dantroleno).

(b) Classificação Evolutiva da Curva Térmica:
• O padrão apresentado (manhãs com 37,4–37,8 °C e tardes com 39,0–39,6 °C) é classificado como FEBRE REMITENTE.
• Justificativa: Na febre remitente, ocorrem oscilações térmicas diárias amplas, superiores a 1 °C, porém a temperatura corporal oscila sempre em patamares febris, sem retornar à apirexia/normotermia (isto é, a temperatura mínima registrada mantém-se acima de 37,2–37,5 °C ao longo de todos os dias avaliados).
• Por que não é Febre Intermitente: Na febre intermitente, os picos febris são interrompidos obrigatoriamente por períodos de apirexia/temperatura absolutamente normal (inferior a 37,0 °C) no mesmo ciclo diário ou a cada 48h/72h (como na malária ou febre em agulha da bacteremia). No caso citado, a menor temperatura da manhã foi de 37,4 °C, jamais atingindo a apirexia.
• Por que não é Febre Irregular/Séptica: Na febre irregular ou recorrente não há nenhum padrão temporal previsível ou ciclo de oscilação; já no caso do paciente há um ciclo diário perfeito e repetido de menor temperatura matinal e elevação vespertina expressiva (> 1 °C)."""

# Q5
questions[4]["gabarito"] = """Gabarito Comentado e Completo:

(a) Cálculo da Carga Tabágica e Significado Clínico:
• Fórmula: Carga tabágica (maços-ano) = (Número de maços fumados por dia) × (Anos de fumo contínuo).
• Cálculo: 2 maços/dia × 30 anos = 60 maços-ano.
• Significado clínico: Permite a quantificação objetiva, cumulativa e padronizada da exposição tabágica ao longo da vida do indivíduo. Cargas tabágicas elevadas (especialmente ≥ 20–30 maços-ano) estão fortemente associadas a risco exponencial de neoplasias malignas (câncer de pulmão de pequenas e não pequenas células, carcinoma espinocelular de laringe, esôfago, bexiga) e de doença pulmonar obstrutiva crônica (DPOC/enfisema).

(b) Rouquidão e "Pigarrinho":
• O termo semiológico correto para rouquidão / alteração da qualidade vocal é DISFONIA. O "pigarrinho" para clarear secreção na garganta refere-se a PIGARRO ou HAWKING.
• Estrutura anatômica: A disfonia origina-se fundamentalmente na LARINGE (especificamente no comprometimento funcional ou estrutural das PREGAS VOCAIS).
• A disfonia não deve ser classificada como sintoma estritamente respiratório baixo porque a laringe pertence à via aérea superior e ao aparelho fonador. Em um tabagista pesado com 60 maços-ano, a disfonia persistente há 2 meses é um "sinal de alarme" crítico que obriga a investigação prioritária de neoplasia de laringe ou de invasão do nervo laríngeo recorrente por tumor broncogênico mediastinal/apical.

(c) Piora Vespertina e Tríade da Febre Héctica:
• Significado da elevação vespertina: Febre com picos ao final da tarde e noite, frequentemente acompanhada de sudorese noturna profusa e perda ponderal, reflete liberação cíclica de citocinas inflamatórias, padrão clássico de tuberculose pulmonar ativa e de certas síndromes linfoproliferativas (linfomas).
• Tríade da febre séptica / héctica: É composta pela sequência diária recorrente de:
  1. Calafrios intensos e vasoconstrição periférica (fase de ascensão térmica rápida);
  2. Pico febril elevado (geralmente > 39,0–40,0 °C);
  3. Sudorese profusa (diaforese) com defervescência térmica e prostração extrema."""

# Q6
questions[5]["gabarito"] = """Gabarito Comentado e Completo:

(a) Diferenciação entre Vertigem, Lipotimia e Síncope:
• Vertigem: É uma ilusão de movimento, na qual o paciente percebe erroneamente que o ambiente gira ao seu redor (vertigem objetiva) ou que seu próprio corpo está girando no espaço (vertigem subjetiva). Decorre de disfunção no sistema vestibular periférico (labirinto, nervo vestibulococlear) ou central (núcleos vestibulares no tronco encefálico e cerebelo). O nível de consciência permanece RIGOROSAMENTE PRESERVADO durante todo o episódio.
• Lipotimia (ou Pré-síncope): É a sensação iminente de desfalecimento ou perda dos sentidos, com turvação visual, zumbido, palidez, sudorese fria e fraqueza muscular nas pernas. Ocorre hipoperfusão cerebral global transitória, mas NÃO há perda efetiva da consciência (o paciente consegue deitar-se ou sentar-se a tempo de evitar o desmaio completo).
• Síncope: É a perda súbita, transitória e de curta duração da consciência e do tônus postural, acompanhada de recuperação espontânea, completa e rápida, decorrente de hipoperfusão cerebral global transitória e difusa. A consciência é COMPLETAMENTE PERDIDA por segundos a poucos minutos.

(b) Comportamento da Frequência Cardíaca e da Pressão Arterial na Febre:
• Resposta fisiológica habitual: Para cada elevação de 1 °C na temperatura corporal central acima de 37 °C, ocorre um aumento proporcional de 10 a 15 batimentos por minuto na frequência cardíaca (FC), acompanhado de elevação discreta da pressão arterial sistólica devido ao aumento do débito cardíaco e tônus adrenérgico.
• Sinal de Faget (Bradicardia Relativa): É a dissociação esfigmotérmica em que há febre alta na ausência da taquicardia proporcional esperada (ou até presença de bradicardia franca). Em vez de a FC elevar-se 10–15 bpm/°C, ela se mantém em níveis normais ou baixos.
• O sinal de Faget é semiologicamente clássico na Febre Tifoide (Salmonella typhi), na Febre Amarela, na Leptospirose e na Doença dos Legionários (Legionella pneumophila)."""

# Q7
questions[6]["gabarito"] = """Alternativa E (Os itens II, III e IV são verdadeiros).

**COMENTÁRIO DO GABARITO:**

• I — FALSO: O padrão respiratório no qual a amplitude das incursões aumenta progressivamente até um pico, depois decresce gradualmente até a apneia, repetindo o ciclo ciclicamente, é a Respiração de CHEYNE-STOKES (frequente em insuficiência cardíaca grave e lesões hemisféricas cerebrais bilaterais). A Respiração de KUSSMAUL é caracterizada por inspirações rápidas e profundas intercaladas com pausas curtas e expirações forçadas e ruidosas, típica de acidose metabólica grave (ex.: cetoacidose diabética).

• II — VERDADEIRO: Na escala de Glasgow atualizada, o estímulo doloroso/mecânico padronizado deve ser realizado centralmente com pressão no leito ungueal, pinçamento do músculo trapézio ou compressão da incisura supraorbitária. A pressão no esterno não é recomendada por risco de lesão tecidual.

• III — VERDADEIRO: A atitude ortopneica é aquela adotada pelo paciente para obter alívio da dispneia: senta-se na borda da cama com os pés pendentes ou deita-se escorado em múltiplos travesseiros (angulação > 45°), apoiando as mãos no colchão para fixar a cintura escapular e recrutar músculos acessórios da respiração, diminuindo a congestão capilar pulmonar por acúmulo gravitacional de sangue nas extremidades inferiores.

• IV — VERDADEIRO: A atitude em prece maometana (ou genupeitoral), na qual o paciente se ajoelha debruçando o tórax sobre as coxas e o leito, afasta o pericárdio parietal inflamado da pleura e do diafragma, sendo clássica para alívio da dor na pericardite aguda com derrame pericárdico moderado a volumoso.

• Resumo Semiológico: Estão corretos os itens II, III e IV (Alternativa E)."""

# Q8
questions[7]["gabarito"] = """Alternativa B (Apenas as assertivas I, II e IV estão corretas).

**COMENTÁRIO DO GABARITO:**

• I — VERDADEIRO: Recomenda-se repouso prévio de no mínimo 5 minutos em ambiente calmo, bexiga vazia e abstinência de cafeína, fumo ou exercícios físicos nos 30 minutos antecedentes. O manguito deve circundar o braço com a bolsa inflável cobrindo ao menos 80% da circunferência e largura de 40%.

• II — VERDADEIRO: O desinsuflamento do manguito deve ser lento e contínuo, a uma velocidade aproximada de 2 a 3 mmHg por segundo, garantindo precisão na identificação dos sons.

• III — FALSO: O estetoscópio (campânula ou diafragma) deve ser posicionado SUAVEMENTE sobre a artéria braquial na fossa cubital, NUNCA devendo ser colocado ou preso por baixo do manguito, pois a pressão exercida pelo tecido do manguito comprime a artéria e distorce a ausculta dos ruídos de Korotkoff, gerando leituras imprecisas.

• IV — VERDADEIRO: A pressão sistólica é identificada no momento do aparecimento do primeiro som regular (Fase I de Korotkoff), e a pressão diastólica no desaparecimento completo de todos os sons arteriais (Fase V de Korotkoff em adultos).

• Resumo Semiológico: Apenas I, II e IV estão corretas (Alternativa B)."""

# Q9
questions[8]["gabarito"] = """Alternativa A (Apenas I e IV estão corretas).

**COMENTÁRIO DO GABARITO:**

• I — VERDADEIRO: A bradipneia é definida semiologicamente pela frequência respiratória inferior a 12 incursões respiratórias por minuto (irpm) em adultos em repouso.

• II — FALSO: A respiração com paradas respiratórias periódicas sem padrão regular de amplitude (ritmo completamente anárquico com períodos irregulares de apneia) é a Respiração de BIOT (ou atáxica), associada a lesão bulbar/tronco encefálico e hipertensão intracraniana grave. A Respiração de Cheyne-Stokes tem padrão em crescente e decrescente harmônico.

• III — FALSO: A respiração rápida e profunda decorrente de acidose metabólica grave é a Respiração de KUSSMAUL, não Cheyne-Stokes.

• IV — VERDADEIRO: A Platipneia é a queixa de dispneia que se manifesta ou intensifica na posição ereta (ortostática) e que melhora com o decúbito horizontal (frequente na síndrome hepatopulmonar e shunts intracardíacos direita-esquerda dependentes da postura).

• Resumo Semiológico: Apenas I e IV estão corretas (Alternativa A)."""

# Q10
questions[9]["gabarito"] = """Alternativa B.

**COMENTÁRIO DO GABARITO:**

• Cálculo das Pressões de Pulso (Pressão Sistólica - Pressão Diastólica):
  - Paciente A: PA = 172 x 58 mmHg -> PP = 172 - 58 = 114 mmHg (valor de referência normal: 30 a 50 mmHg). Como PP > 60 mmHg, está acentuadamente DIVERGENTE (alargada), típica de insuficiência aórtica, aterosclerose aórtica severa de idosos ou estados hipercinéticos.
  - Paciente B: PA = 88 x 68 mmHg -> PP = 88 - 68 = 20 mmHg. Como PP < 30 mmHg, está CONVERGENTE (pinçada/estreita), típica de baixo volume ejetado sistólico (choque cardiogênico, estenose aórtica crítica, tamponamento cardíaco ou desidratação grave).
  - Paciente C: PA = 118 x 76 mmHg -> PP = 118 - 76 = 42 mmHg, situando-se perfeitamente na faixa fisiológica normal.
• Portanto, o Paciente A tem pressão de pulso divergente e o Paciente B tem pressão de pulso convergente (Alternativa B)."""

# Q11
questions[10]["gabarito"] = """Alternativa B (Apenas I, III, IV e V são verdadeiras).

**COMENTÁRIO DO GABARITO:**

• I — VERDADEIRO: A hipotensão ortostática é diagnosticada quando há queda na PAS ≥ 20 mmHg e/ou na PAD ≥ 10 mmHg dentro de 3 minutos após passar do decúbito dorsal para a posição ortostática.
• II — FALSO: A rigidez aórtica decorrente do envelhecimento vascular e aterosclerose reduz a complacência e a capacidade elástica da aorta ("efeito Windkessel"), fazendo com que a onda de pulso reflita precocemente durante a sístole. Isso ELEVA a pressão arterial sistólica e REDUZ a pressão diastólica, ALARGANDO (divergindo) a pressão de pulso, e não diminuindo a sistólica.
• III — VERDADEIRO: O descompasso entre ritmo cardíaco e pulso palpável (déficit de pulso) decorre de batimentos prematuros ou contrações ventriculares ineficazes que não geram volume ejetado suficiente para abrir a valva aórtica e transmitir onda pressórica até os vasos periféricos.
• IV — VERDADEIRO: O hiato auscultatório consiste no desaparecimento transitório dos ruídos de Korotkoff durante a fase II, comum em pacientes idosos e hipertensos. Se não for evitado pela estimativa prévia da PAS pela palpação radial, pode subestimar a pressão sistólica e superestimar a diastólica.
• V — VERDADEIRO: O tamanho inadequado do manguito gera erro sistemático clássico: manguito excessivamente estreito superestima a pressão arterial real; manguito muito largo a subestima.
• Resumo Semiológico: Apenas I, III, IV e V são verdadeiras (Alternativa B)."""

# Q12
questions[11]["gabarito"] = """Alternativa B (Apenas I, II e IV estão corretas).

**COMENTÁRIO DO GABARITO:**

• I — VERDADEIRO: O déficit de pulso é definido pela discordância quantitativa entre a frequência cardíaca apical central auscultada com o estetoscópio e a frequência de pulso periférico palpada simultaneamente em artéria radial.
• II — VERDADEIRO: O pulso filiforme (ou parvus) apresenta amplitude muito pequena e onda de pulso fraca e rápida, característico dos estados de baixo débito cardíaco e choque circulatório.
• III — FALSO: O pulso paradoxal é a QUEDA exagerada (> 10 mmHg) da pressão arterial sistólica durante a INSPIRAÇÃO normal, e não aumento durante a expiração.
• IV — VERDADEIRO: O pulso alternante consiste na alternância regular de uma onda de pulso de grande amplitude com outra de pequena amplitude, mantendo ritmo cardíaco estritamente regular, sendo sinal patognomônico de disfunção ventricular esquerda grave e falência miocárdica avançada.
• Resumo Semiológico: Apenas I, II e IV estão corretas (Alternativa B)."""

# Q13
questions[12]["gabarito"] = """Alternativa D (Pontuação total = 12).

**COMENTÁRIO DO GABARITO:**

• Na Escala de Coma de Glasgow (ECG-P):
  1. Abertura Ocular:
     - Espontânea = 4
     - Ao estímulo sonoro / chamada verbal = 3  <-- (Paciente abre aos olhos ao ser chamado)
     - À pressão / dor = 2
     - Nenhuma = 1
  2. Resposta Verbal:
     - Orientada = 5
     - Confusa (desorientada no tempo/espaço) = 4  <-- (Responde desorientado, confuso)
     - Palavras inapropriadas = 3
     - Sons incompreensíveis = 2
     - Nenhuma = 1
  3. Melhor Resposta Motora:
     - Obedece a comandos = 6
     - Localiza o estímulo doloroso = 5  <-- (Localiza o estímulo doloroso)
     - Flexão normal (retirada) = 4
     - Flexão anormal (decorticação) = 3
     - Extensão anormal (descerebração) = 2
     - Nenhuma = 1
• Somatório: 3 (ocular) + 4 (verbal) + 5 (motora) = 12 pontos (Alternativa D)."""

# Q14
questions[13]["gabarito"] = """Alternativa B (Apenas I, II e III estão corretas).

**COMENTÁRIO DO GABARITO:**

• I — VERDADEIRO: O paciente apresenta: Abertura ocular à dor = 2; Resposta verbal com sons incompreensíveis/gemidos = 2; Resposta motora em flexão anormal (padrão de decorticação: adução dos braços, flexão de punhos e cotovelos e extensão das pernas) = 3. Somatório = 2 + 2 + 3 = 7 pontos.
• II — VERDADEIRO: Pelas diretrizes de trauma neurológico (ATLS), o traumatismo cranioencefálico (TCE) é estratificado em: Leve (13 a 15 pontos), Moderado (9 a 12 pontos) e Grave (≤ 8 pontos). Com pontuação 7, trata-se inequivocamente de TCE GRAVE.
• III — VERDADEIRO: Em pacientes com Glasgow ≤ 8 há perda dos reflexos protetores de via aérea (deglutição, tosse) e risco crítico de broncoaspiração e hipóxia hipoxêmica, sendo mandatória a intubação orotraqueal imediata para proteção de via aérea e controle ventilatório.
• IV — FALSO: A postura de decorticação (flexão anormal) decorre de lesão hemisférica extensa acima do núcleo rubro (trato corticoespinal ao nível dos hemisférios cerebrais ou cápsula interna), preservando o trato rubroespinal. A postura que indica lesão pontomedular e de tronco encefálico baixo com perda de funções supranucleares é a DESCEREBRAÇÃO (extensão anormal, rotação interna dos braços e pronação).
• Resumo Semiológico: Apenas I, II e III estão corretas (Alternativa B)."""

# Q15
questions[14]["gabarito"] = """Alternativa E (Nenhuma das alternativas anteriores está correta).

**COMENTÁRIO DO GABARITO:**

• I — FALSO: A redução da elasticidade (perda da complacência elástica por enrijecimento arterial) da aorta faz com que o vaso não acomode adequadamente o volume sistólico ejetado durante a sístole, acelerando a velocidade da onda de pulso e gerando retorno precoce da onda refletida ainda durante a sístole. Esse fenômeno ELEVA a pressão arterial sistólica (gerando hipertensão sistólica isolada do idoso) e reduz a diastólica, alargando a pressão de pulso, e não diminuindo a pressão sistólica.

• II — FALSO: A dificuldade de respirar que surge na posição ortostática (em pé) e alivia no decúbito dorsal é a PLATIPNEIA (frequentemente associada à ortodeoxia). Trepopneia é a dispneia que surge em um determinado decúbito lateral e alivia no decúbito lateral oposto (típica de derrame pleural unilateral volumoso).

• III — VERDADEIRO: No 2º dia pós-operatório de colecistectomia (cirurgia abdominal alta), a dor toracoabdominal, a respiração superficial antiálgica e a sedação residual favorecem o acúmulo de secreções nos bronquíolos basais com colapso alveolar periférico (atelectasia de reabsorção). A oclusão da via aérea impede a transmissão das vibrações da coluna aérea até a parede torácica, reduzindo ou abolindo o frêmito toracovocal (FTV) e o murmúrio vesicular, com submacicez à percussão.

• Conclusão da Análise: Apenas a assertiva III é verdadeira. Como as opções de A a D listam combinações ("Apenas I e II", "Apenas I e III", "Apenas II e III", "I, II e III estão incorretas"), a resposta correta do teste é a Alternativa E (Nenhuma das alternativas anteriores está correta)."""

# Q16
questions[15]["gabarito"] = """Gabarito Comentado e Completo:

(a) Três Erros Técnicos Cometidos e suas Consequências:
1. Utilização de manguito de tamanho padrão (adulto padrão) em paciente obesa:
   - Consequência: O manguito padrão possui largura e comprimento insuficientes para circundar adequadamente a circunferência braquial da paciente obesa (circunferência > 32–34 cm). Isso exige pressões de insuflação artificialmente maiores para colabar a artéria braquial, resultando em SUPERESTIMAÇÃO FALSA DA PRESSÃO ARTERIAL (pseudohipertensão por manguito estreito). Deve-se utilizar o manguito de tamanho G (obeso).
2. Posicionamento do manguito por cima da manga da blusa de lã:
   - Consequência: O tecido da roupa interpõe resistência mecânica à transmissão da pressão e abafa significativamente os ruídos auscultatórios de Korotkoff, introduzindo leituras imprecisas, subestimando ou superestimando a PA e impedindo a correta palpação e ausculta da artéria.
3. Não realização do repouso prévio de 5 minutos:
   - Consequência: A paciente acabou de chegar caminhando da rua ao ambulatório. A atividade física imediata ativa o tônus simpático e eleva transitoriamente a pressão sistólica e a frequência cardíaca, gerando registro falso-positivo de hipertensão.

(b) Por que Estimar a PAS pela Palpação Radial antes da Ausculta:
• A estimativa prévia da pressão sistólica pela palpação da artéria radial (insuflando o manguito até o desaparecimento do pulso radial e somando 20 a 30 mmHg a esse valor) é obrigatória para:
  1. Evitar o erro induzido pelo HIATO AUSCULTATÓRIO: em hipertensos e idosos com aterosclerose, os ruídos de Korotkoff podem desaparecer completamente na fase II e reaparecer na fase III. Se o examinador não estimar a pressão pelo pulso radial, poderá insuflar o manguito apenas até a zona de silêncio do hiato, tomando o reaparecimento tardio dos sons como pressão sistólica e SUBESTIMANDO gravemente a verdadeira PAS.
  2. Evitar desconforto e dor por hiperinsuflação desnecessária do manguito no braço do paciente."""

# Q17
questions[16]["gabarito"] = """Gabarito Comentado e Completo:

(a) Definição e Fisiologia da Pressão de Pulso:
• Definição: Pressão de pulso (ou pressão diferencial) é a diferença numérica entre a pressão arterial sistólica (PAS) e a pressão arterial diastólica (PAD).
• Fórmula de cálculo: Pressão de Pulso (PP) = PAS - PAD.
• Significado hemodinâmico: Representa a oscilação pulsátil da pressão a cada ciclo cardíaco. É determinada por dois fatores principais: o volume de sangue ejetado pelo ventrículo esquerdo a cada sístole (volume sistólico) e a complacência elástica da aorta e das grandes artérias elásticas centrais. O valor de referência fisiológico situa-se entre 30 e 50 mmHg.

(b) Cálculo e Classificação no Idoso:
• Dados do paciente: Idoso de 79 anos, PA = 176 x 62 mmHg.
• Cálculo: PP = 176 - 62 = 114 mmHg.
• Classificação: Pressão de pulso DIVERGENTE (ou alargada), pois encontra-se acentuadamente superior a 60 mmHg.
• Causa e Mecanismo no Idoso:
  - Causa mais frequente: ENRIJECIMENTO ARTERIAL POR PERDA DA ELASTICIDADE DA AORTA (Arterioesclerose com substituição de elastina por colágeno na camada média).
  - Mecanismo: A aorta perde sua complacência e não distende para amortecer o volume sistólico ejetado durante a sístole mecânica. Isso gera elevação rápida do pico pressórico sistólico (176 mmHg). Ao mesmo tempo, na diástole, não há o recuo elástico adequado que sustenta a pressão diastólica mínima, havendo esvaziamento rápido para o leito periférico, resultando em PAD baixa (62 mmHg) e caracterizando a Hipertensão Arterial Sistólica Isolada (HASI)."""

# Q18
questions[17]["gabarito"] = """Gabarito Comentado e Completo:

(a) Pontuação na Escala de Coma de Glasgow (ECG-P):
• Abertura Ocular: Ausente mesmo ao estímulo doloroso/pressão = 1 ponto.
• Resposta Verbal: Palavras inapropriadas e desconexas (sem diálogo) = 3 pontos.
• Melhor Resposta Motora: Postura de extensão anormal dos membros superiores com pronação e rotação interna (descerebração) = 2 pontos.
• Cálculo da pontuação total inicial: 1 + 3 + 2 = 6 pontos.
• Avaliação Pupilar (Escala de Glasgow com Reatividade Pupilar):
  - Ambas as pupilas fixas e arreativas à luz = subtraem-se 2 pontos (-2).
  - Pontuação Glasgow-Pupilar Final = 6 - 2 = 4 pontos (ECG-P = 4).
• Classificação: Trata-se de Traumatismo Cranioencefálico GRAVE (definido por pontuação ≤ 8).

(b) Significado Fisiopatológico da Descerebração e Midríase Bilateral Arreativa:
• A resposta motora em extensão anormal (descerebração) decorre de comprometimento estrutural grave e transecção funcional do mesencéfalo e da ponte alta, abaixo do núcleo rubro, liberando a via vestibuloespinal extensora.
• A presença de midríase bilateral com abolição completa dos reflexos fotomotores indica compressão catastrófica do tronco encefálico (mesencéfalo) por herniação cerebral transtentorial (herniação uncal/central bilateral), com isquemia e paralisia bilateral dos núcleos do III par craniano (nervo oculomotor) e de suas fibras parassimpáticas constritoras da pupila. Representa emergência neurocirúrgica com risco iminente de parada cardiorrespiratória por compressão dos centros bulbares."""

# Q19
questions[18]["gabarito"] = """Alternativa B (Apenas I, II e IV estão corretas).

**COMENTÁRIO DO GABARITO:**

• I — VERDADEIRO: A fácies mixedematosa (do hipotireoidismo) é marcada pelo edema facial que não forma cacifo (infiltração do tecido conjuntivo por glicosaminoglicanos), olhar apático, sonolento e lentificado, lábios espessados e madarose (perda da cauda dos supercílios).
• II — VERDADEIRO: A fácies leonina é característica da Hanseníase virchowiana avançada, decorrente da infiltração lepromatosa dérmica difusa com formação de lepromas na fronte, supercílios e bochechas, espessamento do nariz e pavilhões auriculares e queda total dos pelos da sobrancelha e barba.
• III — FALSO: A fácies cushingoide (em "lua cheia", com bochechas arredondadas, pletora facial, rubor malar, acne e hirsutismo) decorre do HIPERCORTISOLISMO crônico (Síndrome ou Doença de Cushing, ou uso exógeno de corticosteroides), e NÃO do hipocortisolismo. No hipocortisolismo crônico (Doença de Addison), a fácies é caracterizada por emagrecimento, astenia e hiperpigmentação castanho-escura difusa da pele e mucosas (fácies de Addison).
• IV — VERDADEIRO: A fácies parkinsoniana (ou hipomímica / "em máscara") apresenta redução expressiva dos movimentos mímicos e da frequência do piscar de olhos, fixidez do olhar, rigidez facial e aspecto inexpressivo secundário à depleção dopaminérgica nigroestriatal.
• Resumo Semiológico: Apenas I, II e IV estão corretas (Alternativa B)."""

# Q20
questions[19]["gabarito"] = """Alternativa B (Apenas II e V estão corretas).

**COMENTÁRIO DO GABARITO:**

• I — FALSO: O distúrbio da fala decorrente da incoordenação ou paralisia da musculatura fonoarticulatória periférica (língua, lábios, faringe) por lesão de nervos cranianos ou cerebelo é denominado DISARTRIA (ou disfasia/afasia quando há lesão dos centros cerebrais corticais de linguagem). DISFONIA é a alteração primária da voz decorrente de comprometimento da laringe ou pregas vocais (rouquidão, voz bitonal).
• II — VERDADEIRO: A icterícia torna-se clinicamente visível ao exame físico geral (com boa iluminação natural) a partir do momento em que a bilirrubina sérica total atinge valores ≥ 2,5 a 3,0 mg/dL, manifestando-se precocemente na esclera e no freio lingual devido à alta afinidade tecidual da elastina por bilirrubina.
• III — FALSO: A palidez de mucosa conjuntival e palmar decorre de redução da perfusão vascular periférica ou de concentração reduzida de hemoglobina circulante (anemia), não tendo nenhuma relação com depósito de melanina ou pigmentos biliares.
• IV — FALSO: O Sinal de Romanã (edema bipalpebral unilateral elástico com congestão conjuntival e adenomegalia pré-auricular satélite) é o sinal clássico da porta de entrada cutaneomucosa do Trypanosoma cruzi na Doença de CHAGAS aguda, e não na Hanseníase.
• V — VERDADEIRO: A cianose central manifesta-se tipicamente em mucosas quentes (língua, assoalho da boca, lábios) e decorre de dessaturação arterial de oxigênio (PaO₂ baixa por pneumopatia ou shunt intracardíaco D-E), enquanto a cianose periférica afeta extremidades acrais frias (dedos, leito ungueal, ponta do nariz) por vasoconstrição e lentificação do fluxo microvascular tecidual.
• Resumo Semiológico: Apenas II e V estão corretas (Alternativa B)."""

# Q21
questions[20]["gabarito"] = """Alternativa A (Sequência: V – V – F – V – V).

**COMENTÁRIO DO GABARITO:**

• (V) O sinal de Godet (ou da fóvea/cacifo) é pesquisado através da compressão digital firme com o polegar contra uma superfície óssea subjacente (ex.: face anterior da tíbia, maléolo medial ou sacro) durante pelo menos 5 segundos. A formação de uma depressão persistente confirma o edema intersticial líquido.
• (V) A intensidade do edema pelo sinal de Godet é semiologicamente quantificada em cruzes (de 1+ a 4+) de acordo com a profundidade da depressão e o tempo decorrido para o retorno da pele ao nível normal.
• (F) O edema cardiogênico da insuficiência cardíaca congestiva é classicamente INDOLOR (ou causa apenas sensação de peso e cansaço). O edema francamente DOLOROSO à palpação e manipulação é a marca registrada de processos inflamatórios agudos locais, como celulite/erisipela bacteriana e Trombose Venosa Profunda (TVP).
• (V) O linfedema crônico (obstrução linfática primária ou secundária a cirurgia/neoplasia) caracteriza-se por acúmulo de líquido rico em macromoléculas proteicas no interstício, induzindo proliferação fibroblástica que torna o tecido duro e não depressível ao longo do tempo (Godet negativo tardio).
• (V) O edema por estase venosa crônica é bilateral ou unilateral, comumente acompanhado de hiperpigmentação ocre nos terços distais da perna (dermatite ocre por extravasamento de hemácias e deposição tecidual de hemossiderina), ectasias venosas e lipodermatoesclerose.
• Resumo Semiológico: Sequência correta: V – V – F – V – V (Alternativa A)."""

# Q22
questions[21]["gabarito"] = """Alternativa C (Apenas IV e V são corretas).

**COMENTÁRIO DO GABARITO:**

• I — FALSO: A presença de linfonodo aumentado, de consistência endurecida/pétrea, indolor e aderido aos planos profundos em mulher de 60 anos não fala a favor de processo infeccioso agudo benigno (que costuma ser elástico, doloroso e móvel), mas sim de METÁSTASE NEOPLÁSICA MALIGNA (linfadenopatia tumoral).
• II — FALSO: O sinal da prega cutânea (turgor cutâneo) avalia o estado de hidratação corporal intersticial, e não a rigidez aórtica ou cardiovascular.
• III — FALSO: O IMC de 23,8 kg/m² classifica a paciente como EUTRÓFICA (peso normal: 18,5 a 24,9 kg/m²), e não com sobrepeso (sobrepeso = 25,0 a 29,9 kg/m²).
• IV — VERDADEIRO: A presença de hálito cetônico (odor adocicado semelhante a maçã verde ou acetona) é um achado semiológico crítico característico de cetoacidose diabética decorrente do acúmulo sistêmico e excreção pulmonar de corpos cetônicos (acetoacetato e acetona).
• V — VERDADEIRO: A cianose central decorre da presença de concentração absoluta de hemoglobina desoxigenada (reduzida) no sangue arterial capilar superior a 5 g/dL, comprometendo simultaneamente o leito ungueal, a pele e as mucosas centrais aquecidas (língua, lábios).
• Resumo Semiológico: Apenas IV e V estão corretas (Alternativa C)."""

# Q23
questions[22]["gabarito"] = """Alternativa B (Apenas I, II e IV estão corretas).

**COMENTÁRIO DO GABARITO:**

• I — VERDADEIRO: A marcha ceifante (helicópode ou hemiplégica) é observada em pacientes com sequela de acidente vascular encefálico (síndrome piramidal espástica unilateral). O membro superior afetado mantém-se flexionado e aduzido junto ao tronco, enquanto o membro inferior acometido permanece rígido e em extensão espástica, forçando o paciente a descrever um semicírculo para fora (movimento de ceifa) ao avançar a perna.
• II — VERDADEIRO: A marcha escarvante (ou do pé caído) decorre da fraqueza/paralisia da musculatura dorsiflexora do tornozelo por lesão do nervo fibular comum ou de raízes L4-L5, obrigando o paciente a elevar exageradamente a coxa para evitar que a ponta do pé arraste no solo.
• III — FALSO: A ataxia cerebelar decorre de disfunção do próprio cerebelo e caracteriza-se por base alargada de sustentação e oscilação em todas as direções ("marcha do ébrio"). O fechamento dos olhos NÃO agrava significativamente o déficit motor na lesão cerebelar clássica (Sinal de Romberg negativo). A ataxia que piora acentuadamente com o fechamento dos olhos (Romberg positivo) é a ATAXIA SENSITIVA (ou proprioceptiva / tabética), por lesão do cordão posterior da medula espinal.
• IV — VERDADEIRO: A marcha parkinsoniana (ou festinante) caracteriza-se por postura em flexão generalizada do tronco e pescoço, passos curtos e arrastados, perda do balanço associado dos membros superiores e hesitação no início do passo, acelerando progressivamente para tentar compensar o centro de gravidade deslocado para a frente.
• Resumo Semiológico: Apenas I, II e IV estão corretas (Alternativa B)."""

# Q24
questions[23]["gabarito"] = """Alternativa B (Apenas II e III estão corretas).

**COMENTÁRIO DO GABARITO:**

• I — FALSO: Em lactentes e recém-nascidos, a palpação da fontanela anterior (bregmática) é um elemento propedêutico FUNDAMENTAL para a avaliação do estado de hidratação. Na desidratação moderada a grave a fontanela apresenta-se DEPRIMIDA (afundada), e não abaulada (fontanela abaulada/tensa indica hipertensão intracraniana ou meningite).
• II — VERDADEIRO: A atitude em opistótono decorre de contratura espástica intensa dos músculos extensores paravertebrais da coluna dorsal e do pescoço, de modo que o corpo do paciente forma um arco sustentado apenas pelo occipital e pelos calcanhares apoiados no leito, clássica do Tétano e da Meningite bacteriana grave.
• III — VERDADEIRO: A fácies hipocrática (ou peritoneal) expressa estado de prostração extrema e falência orgânica (peritonite difusa, choque séptico terminal), apresentando olhos encovados, nariz afilado, maçãs do rosto salientes, pele pálida, fria e recoberta de suor viscoso.
• IV — FALSO: A posição ortopneica favorece a expansão dos pulmões e reduz o retorno venoso e a congestão capilar pulmonar por acúmulo gravitacional de sangue nos membros inferiores, aliviando a dispneia; ela não "dificulta o trabalho respiratório".
• Resumo Semiológico: Apenas II e III estão corretas (Alternativa B)."""

# Q25
questions[24]["gabarito"] = """Alternativa A.

**COMENTÁRIO DO GABARITO:**

• Fórmula do Índice de Massa Corporal (IMC):
  IMC = Peso (kg) / [Altura (m)]²
• Dados da questão:
  Peso = 118 kg; Altura = 1,72 m.
• Cálculo:
  (1,72)² = 2,9584 m²
  IMC = 118 / 2,9584 = 39,886... ≅ 39,9 kg/m².
• Classificação Antropométrica da OMS:
  - Abaixo do peso: < 18,5 kg/m²
  - Eutrofia (peso saudável): 18,5 a 24,9 kg/m²
  - Sobrepeso (pré-obesidade): 25,0 a 29,9 kg/m²
  - Obesidade Grau I: 30,0 a 34,9 kg/m²
  - Obesidade Grau II: 35,0 a 39,9 kg/m²
  - Obesidade Grau III (obesidade grave/mórbida): ≥ 40,0 kg/m²
• Como o resultado do paciente é de 39,9 kg/m² (faixa de 35,0 a 39,9), o diagnóstico nutricional é rigorosamente OBESIDADE GRAU II (Alternativa A)."""

# Q26
questions[25]["gabarito"] = """Gabarito Comentado e Completo:

(a) O que é Fácies e por que integra o Exame Físico Geral:
• Definição: Em semiologia médica, a Fácies é o conjunto de traços fisionômicos, elementos anatômicos e expressividade emocional da face do paciente em repouso e em movimento. É o resultado integrado da mímica facial, coloração cutânea, tônus dos músculos faciais, simetria das rimas e da conformação esquelética craniomaxilar.
• Por que integra o exame físico geral: A avaliação da fácies é o primeiro passo da inspeção ("olhar semiológico") do médico ao adentrar o quarto ou consultório. Diversas enfermidades sistêmicas graves (endócrinas, renais, infecciosas, neurológicas e metabólicas) provocam alterações patognomônicas imediatas na fisionomia, permitindo ao examinador formular hipóteses sindrômicas sólidas antes mesmo do exame segmentar.

(b) Achados Clínicos de Três Fácies Típicas:
1. Fácies Mixedematosa (Hipotireoidismo):
   - Face arredondada com aspecto botuliforme e edema periorbitário não depressível (infiltração de glicosaminoglicanos);
   - Expressão apática, lentificada e olhar sonolento;
   - Madarose (rarefação ou perda dos pelos no terço lateral das sobrancelhas);
   - Lábios espessados, macroglossia e cabelos secos, grossos e quebradiços.
2. Fácies Renal (Síndrome Nefrótica / Glomerulopatias):
   - Edema facial difuso e depressível (sinal de Godet positivo no tecido celular subcutâneo laxo), com predomínio marcante no período matutino nas regiões periorbitárias e pálpebras;
   - Palidez cutânea difusa (palidez "cúprea" ou esbranquiçada por anemia e vasoconstrição periférica);
   - Abertura palpebral diminuída ("olhos em fenda").
3. Fácies Acromegálica (Hipersecreção de GH / Adenoma Hipofisário):
   - Proeminência acentuada das bossas frontais e arcadas supraciliares;
   - Prognatismo mandibular volumoso com perda da oclusão dentária e aumento dos espaços interdentários (diastema);
   - Macrorrinia (nariz volumoso e achatado), lábios grossos e marcante macroglossia com dentes espaçados."""

# Q27
questions[26]["gabarito"] = """Gabarito Comentado e Completo:

(a) Cinco Parâmetros Semiológicos para Caracterização do Edema:
1. Localização e Distribuição Topográfica: Avaliar se o edema é localizado (unilateral, ex.: celulite, TVP) ou generalizado (anasarca, simétrico, bilateral de membros inferiores, ex.: IC, cirrose, síndrome nefrótica).
2. Intensidade / Magnitude: Avaliada pela profundidade da fóvea produzida pela dígito-pressão contra plano ósseo (escala de 1+ a 4+ cruzes: 1+ = discreta até 2 mm; 4+ = depressão profunda > 8 mm com retorno demorado).
3. Consistência:
   - Edema Mole: Deixa cacifo com facilidade à compressão digital leve/moderada (típico de transudatos recentes como na insuficiência cardíaca e desnutrição);
   - Edema Duro: Oferece grande resistência à compressão e forma pouca ou nenhuma depressão (típico de linfedema crônico por fibroplasia ou mixedema).
4. Elasticidade:
   - Edema Elástico: A depressão desfaz-se quase instantaneamente ao retirar o dedo (observado em edemas inflamatórios agudos);
   - Edema Inelástico: A fóvea permanece afundada por muitos segundos ou minutos antes de retornar ao nível da pele (típico do edema hipoalbuminêmico e cardiogênico).
5. Temperatura e Sensibilidade:
   - Temperatura: Frio (edema hemodinâmico por insuficiência cardíaca ou renal) versus Quente (edema inflamatório por vasodilatação capilar);
   - Sensibilidade: Indolor (IC, nefropatias) versus Doloroso (flebites, erisipela, celulite).

(b) Mecanismo Fisiopatológico de Três Doenças Distintas:
1. Insuficiência Cardíaca Congestiva (ICC):
   - Mecanismo: Elevação da Pressão Hidrostática Capilar. A falência ventricular esquerda e direita causa elevação retrógrada da pressão venosa sistêmica. Pela equação de Starling, quando a pressão hidrostática capilar (Pc) supera a pressão oncótica do plasma (πc), o fluxo de filtração líquida para o interstício excede a drenagem linfática tecidual, acumulando edema gravitacional nos membros inferiores.
2. Síndrome Nefrótica:
   - Mecanismo: Redução da Pressão Coloidosmótica (Oncótica) Plasmática. A lesão glomerular acentuada causa proteinúria maciça (> 3,5 g/24h) com consequente hipoalbuminemia grave (< 3,0 g/dL). Como a albumina é a principal responsável pela pressão oncótica intravascular (πc), a queda dessa força osmótica impede a reabsorção hídrica no segmento venular do capilar, promovendo extravasamento transudativo generalizado para o interstício.
3. Cirrose Hepática Descompensada:
   - Mecanismo Duplo Integrado: Hipertensão Portal associada à Redução da Síntese de Albumina. A fibrose e a desorganização da arquitetura hepática aumentam a resistência vascular portal (hipertensão portal), elevando a pressão hidrostática no leito esplâncnico. Concomitantemente, a falência hepatocelular compromete a síntese de albumina, reduzindo a pressão oncótica sistêmica, enquanto a vasodilatação arterial esplâncnica deflagra retenção hidrossalina secundária pelo sistema renina-angiotensina-aldosterona."""

# Q28
questions[27]["gabarito"] = """Gabarito Comentado e Completo:

(a) Diferenciação entre Atitude Ativa, Passiva e Forçada:
• Critério Fundamental: O critério semiológico determinante é a VOLIÇÃO (VONTADE DO PACIENTE) e a CAPACIDADE DE ESCOLHA da postura corporal no leito ou no ambiente:
1. Atitude Ativa: O paciente tem plena capacidade física e livre vontade para adotar, alterar e sustentar qualquer postura corporal no leito ou em pé (decúbito dorsal, lateral, ventral, sentado ou em pé) sem restrições ou dor. Pode ser:
   - Ativa indiferente: O paciente muda de posição livremente sem qualquer preferência;
   - Ativa preferencial: O paciente opta voluntariamente por uma posição que lhe traga maior conforto subjetivo.
2. Atitude Passiva: O paciente perdeu completamente a capacidade motora, muscular ou a consciência (ex.: coma profundo, tetraplegia, paresia grave, choque terminal). Ele permanece imóvel exatamente na posição em que é colocado pela equipe de enfermagem, submetendo-se passivamente à gravidade.
3. Atitude Forçada (ou Antialgica / Compulsória): O paciente adota obrigatoriamente uma determinada posição corporal como único mecanismo possível para amenizar uma dor intolerável, aliviar um sintoma asfixiante ou por restrição anatômica espástica invencível, sendo incapaz de mudar de decúbito sem experimentar sofrimento agudo extremo.

(b) Três Exemplos de Atitudes Forçadas e suas Causas:
1. Atitude Ortopneica:
   - O paciente senta-se ereto no leito ou inclina o tórax para a frente apoiando os braços no colchão/coxas.
   - Causa clássica: Insuficiência Ventricular Esquerda grave com congestão pulmonar ou Crise Asmática severa. O decúbito sentado reduz o retorno venoso gravitacional e melhora a mecânica ventilatória do diafragma.
2. Atitude em Prece Maometana (Genupeitoral):
   - O paciente ajoelha-se no leito aproximando o tórax das pernas.
   - Causa clássica: Pericardite Aguda com derrame pericárdico volumoso. Afasta o saco pericárdico sob tensão do diafragma e das estruturas mediastinais, aliviando a dor precordial e a opressão torácica.
3. Atitude em Gatilho de Fuzil (ou Decúbito Lateral em Flexão Extrema):
   - O paciente mantém-se deitado de lado com a cabeça hiperestendida e os membros inferiores firmemente flexionados sobre o abdome.
   - Causa clássica: Síndrome Meníngea (Meningite bacteriana / Irritação radicular meníngea). Alivia a tensão e o estiramento das raízes nervosas inflamadas e das meninges espinais."""

# Q29
questions[28]["gabarito"] = """Alternativa B (Apenas I, II e III estão corretas).

**COMENTÁRIO DO GABARITO:**

• I — VERDADEIRO: A Tabela de Snellen é o instrumento universalmente padronizado para mensuração da acuidade visual para longe, posicionada habitualmente a uma distância de 6 metros (20 pés) do paciente, testando-se cada olho isoladamente com e sem correção refrativa.
• II — VERDADEIRO: O reflexo fotomotor direto pesquisa a integridade da via aferente conduzida pelo II par craniano (nervo óptico) e da via eferente parassimpática carreada pelo III par craniano (nervo oculomotor), promovendo a constrição pupilar (miose) reflexa no olho iluminado.
• III — VERDADEIRO: O reflexo consensual (ou fotomotor cruzado) consiste na constrição pupilar simétrica no olho contralateral àquele submetido ao feixe de luz direto, demonstrando a decussação fisiológica das fibras do trato óptico nos núcleos pré-tectais mesencefálicos e núcleos de Edinger-Westphal.
• IV — FALSO: A tríade descrita de ptose palpebral unilateral parcial, miose pupilar ipsilateral e anidrose hemifacial é o sinal patognomônico da SÍNDROME DE HORNER (lesão da via simpática cervical/oculossimpática, como no tumor de Pancoast no ápice pulmonar). A lesão completa do III par craniano (nervo oculomotor) produz ptose palpebral TOTAL associada a MIDRÍASE paralítica (abolição parassimpática) e desvio do olho para fora e para baixo (ação mantida do reto lateral e oblíquo superior).
• Resumo Semiológico: Apenas I, II e III estão corretas (Alternativa B)."""

# Q30
questions[29]["gabarito"] = """Alternativa C (INCORRETA — é a resposta da questão).

**COMENTÁRIO DO GABARITO:**

• C — INCORRETA: A assertiva comete um erro semiológico conceitual grave. A Tabela de Snellen avalia a ACUIDADE VISUAL (capacidade de discriminar detalhes e formas espaciais à distância), e NÃO a campimetria visual. A Campimetria Visual (exame do campo de visão periférico e central) é avaliada no consultório clínico através da Técnica de Confrontação do Campo Visual (campimetria de confrontação) ou por perímetria computadorizada em consultório oftalmológico.

• A — CORRETA: A avaliação da cabeça compreende rigorosamente a inspeção de simetria craniofacial, morfologia e dimensões do crânio (macrocefalia, microcefalia), implantação e distribuição pilosa e palpação de pontos dolorosos ou contraturas na musculatura epicraniana.
• B — CORRETA: O exame das orelhas engloba a inspeção externa, palpação do trago (positivo na otite externa) e apófise mastoide (positivo na mastoidite), otoscopia com visualização do conduto auditivo externo e da membrana timpânica íntegra e translúcida, complementada pelos testes com diapasão de Rinne e Weber para diferenciar perda auditiva condutiva de neurossensorial.
• D — CORRETA: No teste de Rinne em indivíduos com audição normal (Rinne Positivo fisiológico), a condução aérea do som através do aparelho auditivo externo e médio é mais eficiente e dura o dobro do tempo em relação à condução óssea pela mastoide (Via Aérea > Via Óssea).
• E — CORRETA: Bócio (aumento difuso ou nodular da glândula tireoide) é achado comum nas tireopatias, e a presença de sopro sistólico carotídeo à ausculta cervical alerta para turbilhonamento por placa aterosclerótica obstrutiva na bifurcação carotídea, fator de risco crucial para acidente vascular cerebral isquêmico transitório ou estabelecido."""

with open("src/q11_40.ts", "w", encoding="utf-8") as f:
    f.write("export const q11_40 = " + json.dumps(questions, ensure_ascii=False, indent=4) + ";\n")

print("Successfully written updated src/q11_40.ts!")
