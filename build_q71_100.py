import json

q71_100 = [
    {
        "type": "DISCURSIVA",
        "text": """Paciente de 68 anos, hipertenso, procura atendimento por dispneia aos esforços. Exame: PA = 168x58 mmHg, FC = 76 bpm, ritmo regular. Ictus cordis no 6º espaço intercostal esquerdo, na linha axilar anterior, propulsivo. Pulso radial amplo, com ascensão e colapso rápidos. À ausculta, sopro diastólico aspirativo 3+/6+ no 3º EIC esquerdo junto à borda esternal.
a. Calcule a pressão de pulso e classifique-a.
b. Qual a valvopatia mais provável? Justifique usando três achados distintos do caso.
c. Explique o mecanismo hemodinâmico que produz simultaneamente a pressão de pulso encontrada e o padrão do pulso radial.
d. O ictus está normal? Justifique e explique o que seu deslocamento indica em termos de remodelamento ventricular.
e. Que outro nome recebe o pulso descrito, e a que outro sinal periférico ele costuma se associar?""",
        "interactionType": "textarea",
        "gabarito": """Gabarito Comentado e Completo:

(a) Cálculo e Classificação da Pressão de Pulso:
• Fórmula: Pressão de Pulso (PP) = PAS - PAD.
• Cálculo: PP = 168 - 58 = 110 mmHg.
• Classificação: Pressão de pulso DIVERGENTE (ou alargada), uma vez que o valor normal situa-se entre 30 e 50 mmHg e valores > 60 mmHg são francamente patológicos.

(b) Valvopatia Mais Provável e Três Justificativas Clínico-Semiotécnicas:
• Diagnóstico: INSUFICIÊNCIA AÓRTICA (Regurgitação Aórtica crônica grave).
• Três Achados Clínicos Distintos que Justificam o Diagnóstico:
  1. Ausculta Cardíaca: Sopro diastólico aspirativo de alta frequência no 3º Espaço Intercostal Esquerdo junto à borda esternal (Foco Aórtico Acessório ou Ponto de Erb), irradiando para o ápice;
  2. Padrão Pressórico e Periférico: Pressão de pulso marcadamente divergente (110 mmHg) associada a pulso radial célere (amplo, com ascensão abrupta e colapso rápido);
  3. Palpação do Precórdio: Ictus cordis desviado para baixo e para fora (6º EIC na linha axilar anterior), difuso e hipercinético/propulsivo, refletindo cardiomegalia com dilatação ventricular esquerda.

(c) Mecanismo Hemodinâmico Integrado da Pressão de Pulso e do Pulso Radial:
• Na Sístole Mecânica: Durante a diástole anterior, o ventrículo esquerdo recebeu o influxo normal vindo do átrio esquerdo somado ao sangue regurgitado da aorta pela valva incompetente (sobrecarga de volume). O VE hipertrofiado e dilatado ejeta esse grande volume diastólico final para a raiz da aorta a cada sístole (volume sistólico total muito aumentado). Isso projeta uma onda de pressão de ascensão rápida e elevada amplitude, explicando o pico da pressão sistólica (PAS = 168 mmHg) e a fase de ascensão rápida e vigorosa do pulso radial.
• Na Diástole Mecânica: Tão logo a sístole ventricular cessa, o sangue contido na aorta sofre refluxo retrógrado imediato e maciço para o interior do ventrículo esquerdo relaxado através da valva aórtica que não fecha. Esse esvaziamento aórtico bidirecional rápido (refluxo para o VE associado ao fluxo anterógrado para a periferia) provoca um colapso pressórico aórtico abrupto, derrubando a pressão diastólica para níveis muito baixos (PAD = 58 mmHg) e gerando o colapso rápido da onda de pulso palpável periférica.

(d) Avaliação do Ictus Cordis e Remodelamento Ventricular:
• O ictus cordis está CLARAMENTE ANORMAL. Em adultos normais ele localiza-se no 4º ou 5º EIC esquerdo na linha hemiclavicular e mede de 1 a 2 polpas digitais (cerca de 2 cm). No paciente, encontra-se deslocado para baixo (6º EIC) e lateralmente para fora (linha axilar anterior), sendo difuso e fortemente propulsivo.
• Significado em Remodelamento: Esse deslocamento inferior e lateral é o sinal semiológico clássico de CARDIOMEGALIA por SOBRECARGA DE VOLUME (remodelamento ventricular excêntrico), no qual os sarcômeros são adicionados em série, dilatando intensamente a câmara ventricular esquerda para acomodar o volume regurgitante crônico.

(e) Outro Nome do Pulso e Sinais Periféricos Associados:
• O pulso amplo com ascensão e colapso rápidos é denominado PULSO CÉLERE, PULSO EM "MARTELO D'ÁGUA" ou PULSO DE CORRIGAN.
• Sinais periféricos associados clássicos da Insuficiência Aórtica grave:
  - Sinal de Musset: Oscilação rítmica da cabeça sincrônica com as pulsações cardíacas;
  - Sinal de Quincke: Pulsação capilar visível sob o leito ungueal à leve compressão digital da ponta da unha;
  - Sinal de Müller: Pulsação sistólica rítmica da úvula;
  - Sinal de Duroziez: Duplo sopro audível sobre a artéria femoral (sopro sistólico anterógrado e sopro diastólico retrógrado à compressão com o estetoscópio);
  - Sinal de Traube ("tiro de pistola"): Som estrondoso em chicotada audível sobre a artéria femoral."""
    },
    {
        "type": "DISCURSIVA",
        "text": """a. Explique o mecanismo de origem de B3 e de B4, situando cada uma no ciclo cardíaco.
b. Associe cada uma ao tipo de sobrecarga ventricular correspondente e cite duas condições clínicas para cada.
c. Por que ambas são mais bem auscultadas com a campânula?
d. Explique por que a B4 não pode existir na fibrilação atrial.
e. O que é o ritmo de galope e qual sua importância clínica?""",
        "interactionType": "textarea",
        "gabarito": """Gabarito Comentado e Completo:

(a) Mecanismo de Origem e Localização no Ciclo Cardíaco:
• Terceira Bulha (B3):
  - Localização no ciclo: Ocorre no início da diástole mecânica (PROTODIÁSTOLE), cerca de 0,12 a 0,18 segundos após o componente B2, coincidindo com o final da fase de enchimento ventricular rápido passivo.
  - Mecanismo: Resulta da desaceleração abrupta da coluna de sangue que entra rapidamente no ventrículo esquerdo proveniente do átrio, gerando vibração ressonante das paredes miocárdicas ventriculares relaxadas, dos músculos papilares e das cúspides da valva mitral, especialmente quando o ventrículo já se encontra sobrecarregado por volume ou dilatado.
• Quarta Bulha (B4):
  - Localização no ciclo: Ocorre no final da diástole mecânica (TELEDIÁSTOLE ou pré-sístole), imediatamente antes da primeira bulha (B1), coincidindo exatamente com o momento da contração atrial ("sístole atrial" ou patada atrial).
  - Mecanismo: Decorre da desaceleração súbita do fluxo sanguíneo ejetado vigorosamente pela contração do miocárdio atrial contra uma câmara ventricular rígida, hipertrofiada e pouco complacente, que oferece alta resistência elástica ao enchimento diastólico final.

(b) Tipo de Sobrecarga Ventricular e Condições Clínicas:
• B3:
  - Tipo de sobrecarga: SOBRECARGA DE VOLUME (ou falência miocárdica sistólica com dilatação da câmara).
  - Duas condições clínicas: 1. Insuficiência Cardíaca Sistólica com Fração de Ejeção Reduzida (dilatação do VE); 2. Insuficiência Mitral grave (refluxo com grande volume diastólico que inunda o VE). Pode ser fisiológica em crianças, adolescentes saudáveis e gestantes no 3º trimestre.
• B4:
  - Tipo de sobrecarga: SOBRECARGA DE PRESSÃO (ou perda da complacência parietal ventricular).
  - Duas condições clínicas: 1. Cardiopatia Hipertensiva (Hipertensão Arterial Sistêmica de longa data com hipertrofia concêntrica do VE); 2. Estenose Aórtica severa (resistência à ejeção com consequente hipertrofia concêntrica). É invariavelmente patológica em qualquer faixa etária.

(c) Por que são mais bem auscultadas com a Campânula:
• B3 e B4 são sons de BAIXA FREQUÊNCIA (sons graves e profundos, na faixa de 20 a 70 Hz), gerados pela vibração da massa miocárdica. A campânula do estetoscópio é uma cúpula aberta concebida especificamente para captar e transmitir sons de baixa frequência sem filtrá-los. Ela deve ser apoiada com extrema SUAVEZA sobre a pele (sem comprimir), no ápice cardíaco (ictus cordis), preferencialmente com o paciente na manobra de Pachon (decúbito lateral esquerdo). Se o examinador pressionar fortemente a campânula contra a pele, a derme estica-se e atua como uma membrana tensa que atenua e extingue os sons graves de B3 e B4.

(d) Por que a B4 NÃO pode existir na Fibrilação Atrial:
• A gênese da B4 depende estritamente do impacto hidrodinâmico decorrente da CONTRAÇÃO ATRIAL MECÂNICA EFETIVA E COORDENADA (sístole atrial). Na fibrilação atrial (FA), os átrios despolarizam-se de maneira anárquica e fragmentada (400 a 600 bpm), sem gerar contração mecânica sincrônica das fibras atriais. Sem sístole atrial, não há a injeção do bólus de sangue telediastólico contra a parede ventricular e, portanto, é biologicamente impossível a formação do ruído de B4.

(e) Ritmo de Galope e sua Importância Clínica:
• Definição: Ritmo de galope é a ausculta cardíaca caracterizada pela associação de um ruído acessório diastólico patológico (B3 e/ou B4) com TAQUICARDIA (FC geralmente > 90–100 bpm), produzindo uma cadência acústica a três tempos que mimetiza perfeitamente o som de um cavalo a galope. Pode ser: Galope Ventricular / Protodiastólico (B3 + taquicardia); Galope Atrial / Pré-sistólico (B4 + taquicardia); ou Galope de Somação (quando a taquicardia extrema funde B3 e B4 em um único som intenso na mesodiástole).
• Importância Clínica: O galope ventricular (B3 associada a taquicardia) é um sinal semiológico de GRAVIDADE EXTREMA, indicando descompensação hemodinâmica aguda da insuficiência cardíaca congestiva sistólica com elevação acentuada das pressões de enchimento capilar pulmonar e risco iminente de edema agudo de pulmão e choque cardiogênico."""
    },
    {
        "type": "DISCURSIVA",
        "text": """Paciente de 55 anos, com pericardite constritiva conhecida, é avaliado à beira do leito. Durante a aferição da pressão arterial, você percebe que a pressão sistólica cai 18 mmHg durante a inspiração profunda.
a. Como se chama esse achado e qual o valor de corte que o define?
b. Explique o mecanismo fisiopatológico do fenômeno, incluindo o papel da interdependência ventricular.
c. Por que o nome "paradoxal" é, a rigor, impreciso?
d. Cite três condições, além da pericardite constritiva, em que o achado pode estar presente.
e. Descreva a técnica de pesquisa do pulso paradoxal com esfigmomanômetro.""",
        "interactionType": "textarea",
        "gabarito": """Gabarito Comentado e Completo:

(a) Nomenclatura e Ponto de Corte Diagnóstico:
• Nome do achado: PULSO PARADOXAL (ou Pulso de Kussmaul).
• Ponto de corte: É definido semiologicamente pela QUEDA DA PRESSÃO ARTERIAL SISTÓLICA (PAS) SUPERIOR A 10 mmHg durante a fase inspiratória do ciclo respiratório espontâneo (no paciente em questão a queda foi de 18 mmHg, sendo francamente patológica).

(b) Mecanismo Fisiopatológico e Interdependência Ventricular:
• Na fisiologia normal, durante a inspiração a pressão intratorácica negativa aumenta o retorno venoso para as cavidades direitas, dilatando discretamente o ventrículo direito (VD). A parede livre do VD expande-se livremente para a cavidade pericárdica sem invadir significativamente a câmara esquerda.
• Na Pericardite Constritiva e no Tamponamento Cardíaco, o saco pericárdico encontra-se rígido, calcificado ou sob alta pressão por líquido incompressível. Isso fixa o volume intracardíaco total máximo: as cavidades cardíacas não conseguem expandir suas paredes livres para fora.
• Fenômeno da INTERDEPENDÊNCIA VENTRICULAR EXACERBADA:
  1. Durante a inspiração, o retorno venoso aumentado força o sangue a entrar no ventrículo direito;
  2. Como a parede livre do VD está impedida de se expandir pela carapaça rígida do pericárdio, o aumento de volume do VD obriga o SEPTO INTERVENTRICULAR A DESLOCAR-SE E ABALAR PARA A ESQUERDA, invadindo a cavidade do ventrículo esquerdo (VE);
  3. Esse desvio septal reduz agudamente a área e o volume diastólico de enchimento do VE, diminuindo sua pré-carga;
  4. Simultaneamente, o leito vascular pulmonar expande-se com a pressão negativa inspiratória, retendo temporariamente mais sangue nos pulmões e reduzindo o fluxo que chega ao átrio esquerdo;
  5. Com menor volume diastólico final, o ventrículo esquerdo ejeta um volume sistólico drasticamente diminuído a cada sístole durante a inspiração, provocando queda acentuada da pressão arterial sistólica sistêmica (> 10 mmHg).

(c) Por que o Termo "Paradoxal" é Impreciso:
• O termo "paradoxo" foi cunhado por Adolf Kussmaul no século XIX porque ele percebia pelo tato que a onda de pulso radial desaparecia na inspiração enquanto os batimentos cardíacos continuavam sendo auscultados perfeitamente com o estetoscópio.
• No entanto, do ponto de vista da hemodinâmica moderna, NÃO há nenhum comportamento verdadeiramente paradoxal (oposto ao normal): durante a inspiração normal fisiológica, a PAS já cai naturalmente entre 3 e 9 mmHg. O que ocorre nas doenças constritivas e tamponamentos é apenas a EXACERBAÇÃO QUANTITATIVA PATOLÓGICA dessa queda fisiológica habitual (queda > 10 mmHg), e não um paradoxo biológico.

(d) Três Outras Condições Clínicas com Pulso Paradoxal:
1. Tamponamento Cardíaco por derrame pericárdico volumoso ou hemopericárdio traumático (é a causa clássica prototípica);
2. Crise Asmática Aguda Grave (Status Asmaticus): As excursões respiratórias extremas com pressão pleural excessivamente negativa na inspiração (-30 cmH₂O) e hiperinsuflação alveolar acentuam a variação do retorno venoso e a pós-carga ventricular;
3. Doença Pulmonar Obstrutiva Crônica (DPOC) descompensada com grande aprisionamento aéreo e esforço ventilatório acessório;
4. Tromboembolismo Pulmonar (TEP) maciço / Cor Pulmonale agudo.

(e) Técnica Semiotécnica Padronizada de Pesquisa com Esfigmomanômetro:
1. O paciente deve ser posicionado em decúbito dorsal ou semi-fowler, respirando de maneira calma, tranquila e espontânea (sem forçar a respiração);
2. Posiciona-se o manguito de tamanho adequado no braço e insufla-se acima da pressão sistólica esperada até o desaparecimento do pulso radial;
3. Desinsufla-se a válvula muito lentamente, a uma velocidade aproximada de 2 mmHg por segundo;
4. Identifica-se e anota-se o valor da pressão sistólica no qual os primeiros ruídos de Korotkoff passam a ser ouvidos EXCLUSIVAMENTE DURANTE A EXPIRAÇÃO (na inspiração eles silenciam);
5. Continua-se a desinsuflar lentamente até o patamar pressórico em que os ruídos de Korotkoff passam a ser ouvidos DE FORMA CONTÍNUA E CONSTANTE EM TODAS AS FASES DO CICLO (tanto na inspiração quanto na expiração);
6. Calcula-se a diferença aritmética entre esses dois valores de pressão: se a diferença for SUPERIOR A 10 mmHg, confirma-se o achado de PULSO PARADOXAL."""
    }
]

with open("src/q71_100.ts", "w", encoding="utf-8") as f:
    f.write("export const q71_100 = " + json.dumps(q71_100, ensure_ascii=False, indent=4) + ";\n")

print("Successfully written updated src/q71_100.ts!")
