const fs = require('fs');
const newQuestions = [
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `No exemplo "Árvores ou Floresta?" apresentado na aula, uma variável X (efeito de exposição) e uma variável Y (uma taxa) foram analisadas de três maneiras:\n\nAnálise | Coeficiente r obtido\n(1) Regressão sobre todos os pontos, sem estratificar — "as árvores" | r = 0,1469\n(2) Regressão dentro de cada grupo — "os bosques" | r negativo (entre -0,54 e -0,74)\n(3) Regressão sobre as 4 médias de grupo — "as florestas" | r = 0,9938\n\nAssinale a alternativa que interpreta corretamente esse conjunto de resultados.`,
        interactionType: "multiple-choice",
        options: [
            "A) O r de 0,1469 é o mais confiável, pois utiliza todos os pontos individuais sem perda de informação.",
            "B) Os coeficientes negativos indicam erro de cálculo, pois o r não pode ser negativo.",
            "C) O r de 0,9938 comprova a relação causal entre X e Y, por estar muito próximo de 1.",
            "D) Os mesmos dados produzem conclusões opostas conforme o nível de agregação: dentro dos grupos a associação é negativa e moderada a forte, enquanto entre as médias dos grupos ela é positiva e quase perfeita (r = 0,9938); a análise sem estratificar mascara ambas (r = 0,1469).",
            "E) Os três resultados concordam entre si, indicando associação positiva consistente em todos os níveis."
        ],
        gabarito: `Alternativa D\n\nPor que D está certa e por que este é o exemplo mais importante da aula: ele demonstra numericamente a falácia ecológica. Se um pesquisador tivesse acesso apenas às médias dos quatro grupos — que é a situação típica do estudo ecológico, com dados secundários agregados por município — encontraria r = 0,9938 e concluiria por uma associação positiva fortíssima. No entanto, dentro de cada grupo a relação é negativa. A conclusão agregada seria não apenas imprecisa: seria de sinal invertido em relação à realidade individual.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Uma pesquisadora dispõe apenas de dados do DATASUS agregados por município e deseja avaliar se o consumo médio de álcool se associa à mortalidade por doenças cardiovasculares. Ela pergunta se poderia, ao final, afirmar que "indivíduos que bebem mais morrem mais de doença cardiovascular". A orientação correta é:`,
        interactionType: "multiple-choice",
        options: [
            "A) Não. O estudo é ecológico e permite afirmar apenas que municípios com maior consumo médio apresentam maior mortalidade; qualquer conclusão sobre indivíduos exigiria um desenho de nível individual, sob pena de falácia ecológica.",
            "B) Sim, desde que o coeficiente de correlação seja superior a 0,90, o que valida a inferência individual.",
            "C) Sim, desde que sejam incluídos todos os 5.570 municípios brasileiros, pois o tamanho da amostra elimina a falácia.",
            "D) Sim, desde que a análise seja ajustada por regressão múltipla, o que elimina o problema de nível.",
            "E) Não, porque estudos ecológicos não permitem estimar efeito algum, apenas descrever taxas isoladas."
        ],
        gabarito: `Alternativa A\n\nPor que A está certa: a conclusão legítima de um estudo ecológico se formula no nível da unidade de análise. Se a unidade é o município, a frase correta é sobre municípios. O slide de limitações abre justamente com "incapacidade de associar exposição e doença no nível individual; generalista".`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Um estudo ecológico correlacionou, entre 200 municípios, o número de médicos por mil habitantes com a taxa de mortalidade infantil, encontrando r = -0,72. Qual das interpretações abaixo é a mais adequada?`,
        interactionType: "multiple-choice",
        options: [
            "A) Há correlação negativa forte no nível agregado: municípios com maior densidade de médicos tendem a apresentar menores taxas de mortalidade infantil — sem que se possa afirmar que a assistência recebida por cada criança individualmente explique seu desfecho.",
            "B) Há correlação positiva forte, pois o valor absoluto de 0,72 é elevado e indica que ambas as variáveis crescem juntas.",
            "C) Não há correlação, pois o valor é negativo e, portanto, está distante de 1.",
            "D) Está comprovado que contratar mais médicos reduz a mortalidade infantil, pois a correlação é forte.",
            "E) O resultado é inválido, pois número de médicos é medida global e não pode ser correlacionado com uma taxa."
        ],
        gabarito: `Alternativa A\n\nPor que A está certa: lê corretamente as duas informações contidas no coeficiente. O sinal (-) indica a direção: as variáveis se movem em sentidos opostos. O módulo (0,72, próximo de 1) indica a força da relação. E a segunda metade da alternativa respeita o limite do desenho, não fazendo inferência individual.`
    },
    {
        type: "DISCURSIVA",
        text: `Descreva como você desenharia um estudo ecológico para investigar a relação entre poluição do ar e doenças respiratórias. Indique: (a) a unidade de análise; (b) as variáveis de exposição e de desfecho e a que tipo pertence cada uma na classificação da aula; (c) as fontes de dados; (d) a medida de efeito que calcularia; e (e) a principal limitação da conclusão obtida.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\n(a) Unidade de análise — 1,5 pt. A população de cada município em um período definido.\n(b) Variáveis — 2,5 pts. Exposição: nível médio anual de material particulado (medida ambiental). Desfecho: taxa de internação por doenças respiratórias por 100.000 habitantes (medida agregada).\n(c) Fontes de dados — 2,0 pts. Todas secundárias: DATASUS/SIH, órgãos de monitoramento da qualidade do ar, IBGE.\n(d) Medida de efeito — 2,0 pts. Regressão linear e coeficiente de correlação (r) entre nível médio de poluente e taxa de doença respiratória.\n(e) Limitação principal — 2,0 pts. A falácia ecológica: encontrar correlação entre poluição média e taxa de doença não permite afirmar que os indivíduos mais expostos dentro de cada cidade são os que adoecem.`
    },
    {
        type: "DISCURSIVA",
        text: `Dê um exemplo de estudo ecológico que investigue a relação entre consumo de álcool e mortalidade por doenças cardiovasculares. Descreva o desenho, os dados que seriam coletados e o que o resultado permitiria — e o que não permitiria — concluir.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\n1. Formulação do estudo (3,0 pts). Comparar os 27 estados brasileiros quanto ao consumo médio de álcool per capita e à taxa de mortalidade por doenças do aparelho circulatório por 100.000 habitantes, num mesmo ano. Desenho: múltiplos grupos analítico.\n\n2. Dados e fontes (2,0 pts). Dados secundários (VIGITEL, SIM/DATASUS, IBGE).\n\n3. Análise (2,0 pts). Regressão linear com o consumo médio no eixo x e a taxa de mortalidade no eixo y, calculando o coeficiente de correlação r.\n\n4. O que permite concluir (1,5 pt). Que existe (ou não) associação ecológica entre consumo médio de álcool e mortalidade cardiovascular no nível dos estados.\n\n5. O que NÃO permite concluir (1,5 pt). Que indivíduos que bebem mais morrem mais de causas cardiovasculares — isso seria falácia ecológica.`
    },
    {
        type: "DISCURSIVA",
        text: `Um gestor deseja avaliar o impacto de uma política pública de vacinação em larga escala implantada em 2018. Explique como um estudo ecológico poderia responder a essa pergunta, indicando o tipo de desenho, o que seria comparado e por que este é um dos usos em que o desenho ecológico é considerado especialmente adequado.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\n1. Tipo de desenho (2,5 pts). Séries temporais, comparando as taxas de incidência pela doença-alvo antes e depois de 2018, na mesma população.\n\n2. O que seria comparado (2,5 pts). A cobertura vacinal contra a taxa da doença ao longo dos anos.\n\n3. Por que o ecológico é especialmente adequado aqui (3,5 pts). O slide de vantagens fala em "mensuração de um efeito ecológico -> implantação de um novo programa de saúde ou uma nova legislação em saúde". Uma política pública é uma exposição coletiva. A exposição varia pouco dentro da área, situação em que os estudos individuais não conseguem estimar bem o efeito — só a comparação entre áreas ou períodos revela o impacto.\n\n4. Limitações a mencionar (1,5 pt). Outros fatores podem ter mudado no mesmo período; e continua sem ser possível afirmar, no nível individual, que "quem se vacinou não adoeceu".`
    },
    {
        type: "DISCURSIVA",
        text: `Compare o estudo seccional e o estudo ecológico quanto a: unidade de análise, tipo de dado utilizado, medida de associação produzida, principal viés característico e posição na hierarquia da evidência. Ao final, explique por que os dois compartilham a mesma restrição fundamental quanto à causalidade, embora por motivos diferentes.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\nCritério | Estudo seccional | Estudo ecológico\nUnidade de análise | Indivíduo | População ou grupo em área geográfica definida\nTipo de dado | Primário (questionários, exames) | Normalmente secundário (DATASUS, IBGE)\nMedida de associação | Razão de prevalência (RP) | Coeficiente de correlação (r)\nViés característico | Viés temporal | Falácia ecológica\nHierarquia | Ambos ocupam posições baixas na pirâmide\n\nA restrição comum e seus motivos distintos (4,0 pts). Nenhum dos dois sustenta inferência causal.\n• No seccional, o problema é temporal. Os dados são individuais, mas não se sabe a ordem entre exposição e desfecho.\n• No ecológico, o problema é de nível. A temporalidade pode estar estabelecida (série temporal), mas o que falta é o dado individual (falácia ecológica).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Considere a tabela 2x2 padrão, em que A = doentes expostos, B = não doentes expostos, C = doentes não expostos, D = não doentes não expostos e N = A+B+C+D. Assinale a alternativa que apresenta corretamente as fórmulas da prevalência global e da prevalência da doença entre os expostos.`,
        interactionType: "multiple-choice",
        options: [
            "A) Prevalência global = A/N; prevalência entre os expostos = A/(C+D).",
            "B) Prevalência global = (B+D)/N; prevalência entre os expostos = B/(A+B).",
            "C) Prevalência global = N/(A+C); prevalência entre os expostos = (A+B)/A.",
            "D) Prevalência global = (A+C)/N; prevalência entre os expostos = A/(A+B).",
            "E) Prevalência global = (A+B)/N; prevalência entre os expostos = A/(A+C)."
        ],
        gabarito: `Alternativa D\n\nPrevalência global = (A+C)/N -> todos os doentes sobre o total geral.\nPrevalência nos expostos = A/(A+B) -> doentes expostos sobre todos os expostos (linha 1).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Em um estudo seccional obteve-se: A = 45, B = 105, C = 30, D = 270. Calcule a razão de prevalência.`,
        interactionType: "multiple-choice",
        options: [
            "A) RP = 3,0, pois a prevalência nos expostos é 30% (45/150) e nos não expostos é 10% (30/300).",
            "B) RP = 1,5, pois a prevalência nos expostos é 45/75 e nos não expostos é 30/75.",
            "C) RP = 0,33, pois a prevalência nos expostos é 10% e nos não expostos é 30%.",
            "D) RP = 1,67, pois a razão entre os doentes é 45/30 e entre os sadios é 105/270.",
            "E) RP = 0,17, pois a prevalência global é 75/450."
        ],
        gabarito: `Alternativa A\n\nPrevalência nos expostos = 45 / (45+105) = 45 / 150 = 0,30\nPrevalência nos não expostos = 30 / (30+270) = 30 / 300 = 0,10\nRP = 0,30 / 0,10 = 3,0`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Um estudo seccional apresentou as seguintes razões de prevalência ajustadas para o desfecho consumo de tabaco:\n\nVariável | RP ajustada | IC95% | p\nIdade 15–17 anos | 1,98 | 1,32 – 2,96 | 0,001\nIdade ≥ 18 anos | 3,87 | 2,76 – 5,44 | <0,001\nSexo masculino | 1,23 | 1,01 – 1,50 | 0,038\nAnsiedade moderada | 1,30 | 0,94 – 1,79 | 0,110\nPai ou mãe fumante | 1,60 | 1,28 – 2,00 | <0,001\n\nAssinale a alternativa correta.`,
        interactionType: "multiple-choice",
        options: [
            "A) Todas as cinco variáveis são significantes, pois todas têm RP acima de 1,0.",
            "B) A variável sexo masculino não é significante, pois o limite inferior de 1,01 está muito próximo de 1,0.",
            "C) A variável de maior magnitude é \"pai ou mãe fumante\", pois tem o menor valor de p entre as significantes.",
            "D) Quatro das cinco variáveis mostram associação significante; a ansiedade moderada é a única não significante, pois seu IC95% (0,94–1,79) contém o valor 1,0 — e a variável de maior magnitude é a idade ≥ 18 anos, com prevalência 3,87 vezes a do grupo de referência.",
            "E) Nenhuma conclusão é possível, pois razões de prevalência ajustadas não admitem interpretação isolada."
        ],
        gabarito: `Alternativa D\n\nPor que D está certa: executa corretamente as duas operações que a tabela exige — triar a significância pelo intervalo (se o IC contém 1,0, não é significante) e ordenar a magnitude pela RP (3,87 é a maior RP pontual).`
    },
    {
        type: "DISCURSIVA",
        text: `Escreva as quatro fórmulas da tabela 2x2 cobradas na disciplina, explicando em palavras o que cada uma responde e qual é o denominador correto de cada uma. Em seguida, explique por que a prevalência global não entra no cálculo da razão de prevalência.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\n1) Prevalência global = (A+C) / N. "Que fração da população inteira está doente?" Denominador: N.\n2) Prevalência da doença nos expostos = A / (A+B). "Entre quem está exposto, que fração adoeceu?" Denominador: A+B.\n3) Prevalência da doença nos não expostos = C / (C+D). "Entre quem não está exposto, que fração adoeceu?" Denominador: C+D.\n4) Razão de prevalência = [A/(A+B)] / [C/(C+D)]. "Quantas vezes mais os expostos estão doentes em relação aos não expostos?"\n\nPor que a prevalência global não entra na RP (3,5 pts). A RP é uma medida de comparação entre dois grupos. A prevalência global é uma medida de frequência do conjunto — ela mistura expostos e não expostos numa única fração. Usar (A+C)/N destruiria a comparação.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Reproduza o cálculo do slide. Em 1.267 adultos, entre 160 obesos havia 78 com hipertensão arterial; entre 1.107 não obesos, havia 236 com hipertensão. Assinale a alternativa correta.`,
        interactionType: "multiple-choice",
        options: [
            "A) Prevalência de HA nos obesos = 6,16%; nos não obesos = 18,63%; RP = 0,33.",
            "B) Prevalência de HA nos obesos = 48,75%; nos não obesos = 21,32%; RP = 0,44.",
            "C) Prevalência de HA nos obesos = 48,75%; nos não obesos = 21,32%; RP = 2,3; a prevalência de HA nos obesos é 2,3 vezes a dos não obesos, ou 1,3 vez maior.",
            "D) Prevalência de HA nos obesos = 48,75%; nos não obesos = 21,32%; RP = 2,3; a prevalência de HA nos obesos é 2,3 vezes maior que a dos não obesos, ou 3,3 vezes a dos não obesos.",
            "E) Prevalência de HA nos obesos = 24,84%; nos não obesos = 75,16%; RP = 0,33."
        ],
        gabarito: `Alternativa C\n\nPrevalência nos obesos: 78 / 160 = 48,75%\nPrevalência nos não obesos: 236 / 1107 = 21,32%\nRP = 48,75 / 21,32 = 2,286 -> 2,3\nInterpretação: 2,3 vezes a prevalência, ou 1,3 vez maior que ela (excesso = RP - 1).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Reproduza o cálculo do slide HEROÍNA x ABORTO. Entre 75 usuárias de heroína, 15 tiveram aborto; entre 198 não usuárias, 18 tiveram aborto. Calcule (1) a prevalência de abortos entre as usuárias, (2) entre as não usuárias e (3) a razão de prevalência.`,
        interactionType: "multiple-choice",
        options: [
            "A) (1) 9%; (2) 20%; (3) RP = 0,45.",
            "B) (1) 20%; (2) 9%; (3) RP = 11 pontos percentuais.",
            "C) (1) 20%; (2) 9%; (3) RP = 2,22.",
            "D) (1) 45,5%; (2) 54,5%; (3) RP = 0,83.",
            "E) (1) 5,5%; (2) 6,6%; (3) RP = 0,83."
        ],
        gabarito: `Alternativa C\n\n(1) Usuárias = 15 / 75 = 20%\n(2) Não usuárias = 18 / 198 = 9,09% -> 9%\n(3) RP = 0,20 / 0,09 = 2,22`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Um inquérito seccional avaliou uso regular de protetor solar (exposição) e presença de lesões actínicas (desfecho) em 1.000 trabalhadores rurais. Dos 400 que usam protetor, 40 têm lesão. Dos 600 que não usam, 120 têm lesão. Calcule a RP e assinale a interpretação correta.`,
        interactionType: "multiple-choice",
        options: [
            "A) RP = 1,0; não há associação, pois a prevalência global é 16% em ambos os grupos.",
            "B) RP = 0,5; associação inversa: a prevalência de lesões actínicas entre os usuários regulares de protetor é metade da observada entre os não usuários (10% contra 20%), o que caracteriza a exposição como fator de proteção neste retrato.",
            "C) RP = 2,0; associação positiva: o uso de protetor solar associa-se ao dobro da prevalência de lesões.",
            "D) RP = 0,5; associação inversa, o que comprova que o protetor solar previne lesões actínicas.",
            "E) RP = 0,33; associação inversa, calculada pela razão entre os casos absolutos (40 / 120)."
        ],
        gabarito: `Alternativa B\n\nPrevalência nos expostos = 40 / 400 = 10%\nPrevalência nos não expostos = 120 / 600 = 20%\nRP = 10% / 20% = 0,5. RP < 1 indica associação inversa (metade da prevalência).`
    },
    {
        type: "DISCURSIVA",
        text: `Em um inquérito seccional com 900 idosos avaliou-se polifarmácia (uso de 5 ou mais medicamentos) como exposição e queda no último ano como desfecho. Entre os 300 com polifarmácia, 120 sofreram queda; entre os 600 sem polifarmácia, 120 sofreram queda.\n\n(a) Monte a tabela 2x2 completa. (b) Calcule as quatro medidas (prevalência global, prevalência nos expostos, nos não expostos e RP), apresentando as fórmulas. (c) Calcule também a diferença de prevalências e explique o que ela acrescenta à RP. (d) Redija a conclusão do estudo.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\nPolifarmácia | Com queda | Sem queda | Total\nSim | 120 | 180 | 300\nNão | 120 | 480 | 600\nTotal | 240 | 660 | 900\n\n(b) Cálculos\nGlobal = 240 / 900 = 26,67%\nExpostos = 120 / 300 = 40%\nNão expostos = 120 / 600 = 20%\nRP = 40% / 20% = 2,0\n\n(c) Diferença de prevalências = 40% - 20% = 20 pontos percentuais. A RP mede a força relativa. A diferença mede o impacto absoluto: quantos casos a mais existem, por 100 pessoas expostas.\n\n(d) Conclusão\n"Neste inquérito seccional, a prevalência de quedas entre idosos com polifarmácia foi de 40%, duas vezes a observada entre idosos sem polifarmácia (20%), com razão de prevalência de 2,0. Por se tratar de estudo transversal, não é possível estabelecer relação de causa e efeito."`
    }
];

let text = fs.readFileSync('src/gis2_all.ts', 'utf8');
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
fs.writeFileSync('src/gis2_all.ts', text + newContent);
