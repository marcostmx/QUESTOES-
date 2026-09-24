const fs = require('fs');
const newQuestions = [
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Em um estudo seccional, a prevalência de anemia foi de 36% entre crianças de famílias com insegurança alimentar e de 12% entre as demais. Sobre esses resultados, assinale a alternativa correta.`,
        interactionType: "multiple-choice",
        options: [
            "A) RP = 3,0; a prevalência de anemia nas crianças expostas é 3 vezes a das não expostas, ou 2 vezes maior que ela, com diferença de 24 pontos percentuais.",
            "B) RP = 3,0; a prevalência nas expostas é 3 vezes maior que nas não expostas, com diferença de 3 pontos percentuais.",
            "C) RP = 24; a razão é obtida pela subtração das prevalências.",
            "D) RP = 0,33; a prevalência nas expostas é um terço da observada nas não expostas.",
            "E) RP = 1,5; a razão é obtida pela divisão das prevalências pela prevalência global de 24%."
        ],
        gabarito: `Alternativa A\n\nRP = 0,36 / 0,12 = 3,0\nExcesso relativo = RP - 1 = 3,0 - 1 = 2,0 -> "2 vezes maior que"\nDiferença de prevalências = 36% - 12% = 24 pontos percentuais`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Em um inquérito com 1.200 gestantes, a prevalência de anemia foi de 25% entre as que faziam suplementação de ferro e de 25% entre as que não faziam. Assinale a alternativa correta.`,
        interactionType: "multiple-choice",
        options: [
            "A) RP = 1,0, o que comprova que a suplementação de ferro não previne anemia gestacional.",
            "B) RP = 1,0: as prevalências são idênticas nos dois grupos, indicando ausência de associação entre suplementação e anemia neste retrato — o que não significa que a suplementação seja ineficaz, mas apenas que, no momento da aferição, os dois grupos tinham a mesma frequência do desfecho.",
            "C) RP = 0: as prevalências se anulam, indicando ausência de associação.",
            "D) RP = 25: a razão corresponde ao valor percentual comum aos dois grupos.",
            "E) RP = 50%: soma-se a prevalência dos dois grupos e divide-se por dois."
        ],
        gabarito: `Alternativa B\n\nRP = 0,25 / 0,25 = 1,0 -> valor neutro da razão\nDiferença de prevalências = 25% - 25% = 0 pontos percentuais\nA alternativa A está errada porque usa a palavra "comprova". Num estudo transversal, a ausência de associação pode ocorrer por fator de confusão por indicação (as que tomam ferro já eram as que tinham anemia).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Um estudo seccional em 2.000 escolares avaliou exposição à tela por mais de 4 horas diárias e sintomas de insônia. A prevalência global de insônia foi de 18%. Sabendo-se que 800 escolares eram expostos e que a prevalência de insônia entre eles foi de 30%, calcule a prevalência entre os não expostos e a RP.`,
        interactionType: "multiple-choice",
        options: [
            "A) Prevalência nos não expostos = 18%; RP = 1,67.",
            "B) Prevalência nos não expostos = 12%; RP = 2,5.",
            "C) Prevalência nos não expostos = 30%; RP = 1,0.",
            "D) Não é possível calcular sem conhecer o número absoluto de casos.",
            "E) Prevalência nos não expostos = 10%; RP = 3,0."
        ],
        gabarito: `Alternativa E\n\nGlobal = 18% de 2000 = 360 casos totais.\nExpostos = 800. Casos nos expostos = 30% de 800 = 240.\nNão expostos = 1200 (2000 - 800).\nCasos nos não expostos = 360 - 240 = 120.\nPrevalência nos não expostos = 120 / 1200 = 10%.\nRP = 30% / 10% = 3,0.`
    },
    {
        type: "DISCURSIVA",
        text: `Um inquérito seccional em 1.500 trabalhadores da construção civil avaliou uso de equipamento de proteção auditiva (exposição) e perda auditiva induzida por ruído (desfecho). Dos 1.500, 600 usavam proteção regularmente. A prevalência global de perda auditiva foi de 22%. Entre os usuários de proteção, a prevalência foi de 10%.\n\n(a) Reconstrua a tabela 2x2 completa mostrando todos os passos. (b) Calcule a prevalência nos não expostos e a RP. (c) Interprete o resultado usando as duas formulações corretas. (d) Explique por que, apesar do resultado, não se pode afirmar que o EPI auditivo previne a perda auditiva neste estudo.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\n(a) Reconstrução\nTotal de casos = 22% de 1.500 = 330\nCasos entre expostos = 10% de 600 = 60\nCasos entre não expostos = 330 - 60 = 270\nNão expostos = 1.500 - 600 = 900\n\nUsa proteção | Com perda | Sem perda | Total\nSim | 60 | 540 | 600\nNão | 270 | 630 | 900\nTotal | 330 | 1.170 | 1.500\n\n(b) Cálculos\nPrevalência nos não expostos = 270 / 900 = 30%\nRP = 10% / 30% = 0,33\n\n(c) Interpretação\n• "A prevalência de perda auditiva entre os usuários de proteção é 0,33 vez a observada entre os não usuários."\n• "Há uma redução de aproximadamente 67% na prevalência de perda auditiva entre os usuários de proteção." (1 - 0,33 = 0,67)\n\n(d) Por que não afirmar prevenção\n• Desenho: estudo seccional, com aferição simultânea.\n• Causalidade reversa: trabalhadores que já perderam audição podem ter abandonado o EPI (por percebê-lo inútil).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Quatro estudos seccionais reportaram os seguintes resultados. Assinale a alternativa que ordena corretamente as associações da mais forte no sentido de risco para a mais forte no sentido de proteção.\n\nEstudo | Prev. expostos | Prev. não expostos\nI | 15% | 60%\nII | 48% | 12%\nIII | 30% | 30%\nIV | 27% | 18%`,
        interactionType: "multiple-choice",
        options: [
            "A) II (RP = 4,0) -> IV (RP = 1,5) -> III (RP = 1,0) -> I (RP = 0,25).",
            "B) I (RP = 4,0) -> III (RP = 1,0) -> IV (RP = 1,5) -> II (RP = 0,25).",
            "C) II (RP = 36) -> IV (RP = 9) -> III (RP = 0) -> I (RP = -45).",
            "D) IV (RP = 1,5) -> II (RP = 4,0) -> I (RP = 0,25) -> III (RP = 1,0).",
            "E) Todos apresentam a mesma força de associação, variando apenas a prevalência absoluta."
        ],
        gabarito: `Alternativa A\n\nI: RP = 15/60 = 0,25 (proteção forte)\nII: RP = 48/12 = 4,0 (risco forte)\nIII: RP = 30/30 = 1,0 (sem associação)\nIV: RP = 27/18 = 1,5 (risco moderado)\nOrdem de risco -> proteção: II (4,0) > IV (1,5) > III (1,0) > I (0,25)`
    },
    {
        type: "DISCURSIVA",
        text: `Um estudante calculou, para um inquérito seccional, os seguintes valores a partir da tabela A = 60, B = 140, C = 100, D = 700:\n• Prevalência nos expostos = 60 / 160 = 37,5%\n• Prevalência nos não expostos = 100 / 160 = 62,5%\n• RP = 0,60\nIdentifique todos os erros cometidos, refaça os cálculos corretamente e escreva a interpretação adequada do resultado.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\nErro identificado: O estudante usou o total de doentes (A+C = 160) como denominador. Isso troca o eixo da tabela (ele calculou a proporção de expostos entre doentes). O denominador correto é o total da linha: 200 para expostos (60+140) e 800 para não expostos (100+700).\n\nCálculo correto:\nPrevalência nos expostos = 60 / 200 = 30%\nPrevalência nos não expostos = 100 / 800 = 12,5%\nRP = 30% / 12,5% = 2,4\n\nInterpretação: "A prevalência da doença entre os expostos é 2,4 vezes a observada entre os não expostos" (associação positiva).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Três municípios registraram os seguintes números de óbitos infantis em 2024:\n\nMunicípio | Óbitos < 1 ano | Nascidos vivos\nAlfa | 48 | 4.000\nBeta | 60 | 10.000\nGama | 90 | 5.000\n\nCalcule a taxa de mortalidade infantil por 1.000 nascidos vivos de cada município e ordene do maior para o menor risco.`,
        interactionType: "multiple-choice",
        options: [
            "A) Todos têm a mesma taxa, pois a razão entre óbitos e nascidos vivos é constante.",
            "B) Gama (18) > Alfa (12) > Beta (6) por 1.000 nascidos vivos.",
            "C) Gama (90) > Beta (60) > Alfa (48), pela ordem dos números absolutos de óbitos.",
            "D) Beta (10.000) > Gama (5.000) > Alfa (4.000), pela ordem do porte populacional.",
            "E) Alfa (12) > Gama (18) > Beta (6), pois Alfa tem o menor número de nascidos vivos."
        ],
        gabarito: `Alternativa B\n\nTaxa = (óbitos / nascidos vivos) x 1.000\nAlfa: (48 / 4.000) x 1.000 = 12\nBeta: (60 / 10.000) x 1.000 = 6\nGama: (90 / 5.000) x 1.000 = 18\nOrdem: Gama (18) > Alfa (12) > Beta (6)`
    },
    {
        type: "DISCURSIVA",
        text: `Um estudo ecológico comparou duas regiões quanto à mortalidade por câncer de pulmão em 2024:\n• Região Norte: 900 óbitos em uma população de 1.800.000 habitantes; prevalência média de tabagismo de 24%.\n• Região Sul: 750 óbitos em uma população de 2.500.000 habitantes; prevalência média de tabagismo de 12%.\n\n(a) Calcule as taxas de mortalidade por 100.000 habitantes. (b) Calcule a razão de taxas e a diferença entre as taxas, explicando o que cada uma informa. (c) Classifique o desenho do estudo (eixo e propósito). (d) Escreva a conclusão que o estudo autoriza — e a que ele não autoriza.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\n(a) Taxas\nNorte: (900 / 1.800.000) x 100.000 = 50 por 100.000\nSul: (750 / 2.500.000) x 100.000 = 30 por 100.000\n\n(b) Medidas de efeito\nRazão de taxas = 50 / 30 = 1,67. Informa a força relativa: mortalidade 1,67 vez a do Sul.\nDiferença = 50 - 30 = 20 por 100.000. Informa o impacto absoluto: há 20 óbitos a mais por 100 mil habitantes.\n\n(c) Desenho: Múltiplos grupos e analítico (há uma exposição — prevalência média de tabagismo — sendo confrontada com a taxa de doença).\n\n(d) Conclusões\nAutoriza: "Observou-se associação ecológica positiva entre prevalência média de tabagismo e taxa de mortalidade por câncer de pulmão no nível regional."\nNão autoriza: afirmar que os indivíduos fumantes da região Norte são os que morreram de câncer (falácia ecológica).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Quatro estudos ecológicos reportaram os seguintes coeficientes de correlação entre uma exposição agregada e uma taxa de doença: I: r = +0,12 | II: r = -0,89 | III: r = +0,55 | IV: r = -0,20. Assinale a alternativa correta.`,
        interactionType: "multiple-choice",
        options: [
            "A) O estudo II apresenta a correlação de maior força (|r| = 0,89, próximo de 1), sendo ela negativa — quando a exposição aumenta, a taxa diminui; o estudo I apresenta a correlação mais fraca (|r| = 0,12, próximo de zero).",
            "B) O estudo III apresenta a maior força, pois é o maior valor positivo, e o II a menor, por ser negativo.",
            "C) Os estudos II e IV devem ser descartados, pois o coeficiente de correlação não assume valores negativos.",
            "D) O estudo II comprova relação causal inversa, por ter |r| superior a 0,80.",
            "E) Todos os quatro têm a mesma confiabilidade, pois o que importa é o tamanho da amostra e não o valor de r."
        ],
        gabarito: `Alternativa A\n\nPor que A está certa: o sinal (+ ou -) indica apenas a direção. O módulo (|r|) indica a força. Portanto, |-0,89| = 0,89 é mais forte que |+0,55| = 0,55.`
    },
    {
        type: "DISCURSIVA",
        text: `Retome o exemplo "Árvores ou Floresta?" da Aula 3, em que o mesmo conjunto de dados produziu r = 0,1469 sem estratificação, r entre -0,5487 e -0,7469 dentro de cada um dos quatro grupos, e r = 0,9938 na regressão sobre as quatro médias de grupo. (a) Explique o que cada um dos três coeficientes está medindo. (b) Explique por que esse exemplo é a demonstração numérica da falácia ecológica. (c) Diga qual dos três resultados um pesquisador que só dispõe de dados secundários agregados por município obteria, e qual conclusão errada ele estaria prestes a tirar.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\n(a) 0,1469: correlação global, todos os pontos misturados (cancela estruturas opostas). Negativos: correlação dentro de cada grupo (relação verdadeira, indivíduo). 0,9938: correlação entre as 4 médias dos grupos (correlação ecológica pura).\n(b) Demonstra falácia porque o resultado varia do extremo positivo no nível agregado para o negativo no nível interno. Mostra que correlação forte agregada não prova nada sobre o indivíduo.\n(c) O pesquisador só veria o r=0,9938 (dados agregados por município) e concluiria, erroneamente, por uma forte relação individual positiva.`
    },
    {
        type: "DISCURSIVA",
        text: `Uma escala de sintomas ansiosos foi aplicada a dois grupos, com os seguintes resultados:\n• Grupo A: média = 12,4 desvio padrão = 2,1\n• Grupo B: média = 12,4 desvio padrão = 8,7\n\n(a) Defina média e desvio padrão nos termos da aula. (b) Explique o que significa dois grupos terem a mesma média e desvios padrão tão diferentes. (c) Explique por que apresentar apenas a média seria insuficiente e potencialmente enganoso para o planejamento de um serviço de saúde mental.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\n(a) Média: centro da distribuição. Desvio padrão: medida de dispersão.\n(b) Grupo A é homogêneo (maioria perto da média). Grupo B é heterogêneo (muita gente bem, e muita gente com escore alto).\n(c) A média engana porque o Grupo A precisa de uma intervenção leve e uniforme, enquanto o Grupo B precisa de triagem: alguns precisam de psiquiatria, outros não precisam de nada.`
    },
    {
        type: "DISCURSIVA",
        text: `Uma pesquisadora conduziu um inquérito seccional em 2.400 adultos de um município, avaliando insegurança alimentar (exposição) e diabetes tipo 2 (desfecho). Encontrou 900 pessoas em insegurança alimentar, das quais 216 tinham diabetes; entre as demais, 150 tinham diabetes.\n\n(a) Monte a tabela 2x2 e calcule as quatro medidas. (b) Interprete a RP nas duas formulações. (c) A pesquisadora quer agora comparar seu município com outros 40 municípios da região, usando dados do DATASUS: descreva esse segundo estudo (desenho, unidade de análise, variáveis, medida de efeito). (d) Explique qual limitação específica pesa sobre cada um dos dois estudos e por que elas são de naturezas diferentes.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\n(a) Tabela e cálculos\nGlobal = (216+150) / 2400 = 15,25%\nExpostos = 216 / 900 = 24%\nNão expostos = 150 / 1500 = 10%\nRP = 24% / 10% = 2,4\n\n(b) Interpretação: "A prevalência de diabetes na insegurança alimentar é 2,4 vezes a observada nos demais" ou "1,4 vez maior que".\n\n(c) Segundo estudo: Ecológico de múltiplos grupos (analítico). Unidade de análise: município. Variáveis: proporção com insegurança alimentar e taxa de mortalidade/internação por diabetes (agregadas). Efeito: regressão/correlação r.\n\n(d) Limitações: Seccional tem limitação temporal (causalidade reversa); ecológico tem limitação de nível (falácia ecológica). Um erra no quando, o outro no quem.`
    },
    {
        type: "DISCURSIVA",
        text: `Um gestor apresenta os seguintes dados de dois distritos sanitários e pede sua análise:\n\nDistrito Leste: 3.000 moradores avaliados; 1.200 residem a menos de 500 m de uma via de tráfego intenso, dos quais 300 têm asma. Entre os 1.800 restantes, 180 têm asma.\nDistrito Oeste (dados agregados do DATASUS, 2024): taxa de internação por asma de 85 por 100.000 habitantes, contra 34 por 100.000 no Leste.\n\n(a) Para o Distrito Leste, calcule as quatro medidas e interprete. (b) Para a comparação entre os distritos, calcule razão de taxas e diferença entre taxas. (c) Identifique o desenho de cada uma das duas análises. (d) Aponte o erro que se cometeria ao concluir, a partir da comparação entre distritos, que "os moradores do Oeste expostos ao tráfego são os que internam mais".`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\n(a) Leste\nGlobal = 480 / 3000 = 16%\nExpostos = 300 / 1200 = 25%\nNão expostos = 180 / 1800 = 10%\nRP = 2,5. "A prevalência de asma perto das vias é 2,5 vezes a dos demais."\n\n(b) Comparação\nRazão de taxas = 85 / 34 = 2,5. Diferença = 85 - 34 = 51 por 100.000.\n\n(c) Desenhos\nLeste: estudo seccional.\nComparação Leste x Oeste: estudo ecológico de múltiplos grupos.\n\n(d) Erro: falácia ecológica. O Oeste interna mais, mas os dados não informam se quem internou mora perto de vias. A coincidência do 2,5 na RP individual e na razão de taxas ecológicas é fortuita.`
    },
    {
        type: "DISCURSIVA",
        text: `Feche o conteúdo da PR1 relacionando as três aulas. Um pesquisador quer saber se o consumo de ultraprocessados se associa à obesidade infantil. (a) Formule a pergunta pelo PICO. (b) Descreva o que cada um dos três desenhos vistos — seccional, ecológico e coorte — responderia, indicando a medida de efeito de cada um e como se calcula. (c) Ordene os três na pirâmide da evidência, justificando. (d) Explique como as cinco etapas da MBE seriam percorridas por um pediatra diante dessa dúvida na prática clínica.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\n(a) PICO: P = crianças; I = consumo elevado de ultraprocessados; C = baixo consumo; O = obesidade infantil.\n\n(b) Desenhos:\n• Seccional: "qual a prevalência de obesidade hoje?". Medida: RP.\n• Ecológico: "municípios com maior consumo médio têm maiores taxas de obesidade?". Medida: correlação r.\n• Coorte: "crianças eutróficas que consomem muito desenvolvem obesidade com maior frequência?". Medida: risco relativo.\n\n(c) Hierarquia: coorte (temporalidade garantida) > seccional (sem temporalidade) e ecológico (falácia ecológica).\n\n(d) MBE: 1) Formular a questão (PICO); 2) Buscar nas bases (DECS); 3) Avaliar criticamente (validade, hierarquia); 4) Aplicar à paciente (julgamento clínico); 5) Avaliar o desfecho.`
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
