const fs = require('fs');
const newQuestions = [
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Um slide da aula esquematiza o estudo seccional como algo que "explora a associação entre variáveis", colocando de um lado sexo, religião e pais fumantes e do outro tabagismo. Assinale a alternativa que identifica corretamente o papel de cada conjunto de variáveis e o que isso implica para o cálculo.`,
        interactionType: "multiple-choice",
        options: [
            "A) Sexo, religião e pais fumantes são os desfechos; tabagismo é a exposição; logo, calcula-se uma prevalência de sexo entre os tabagistas.",
            "B) Todas as variáveis citadas são desfechos, e a exposição é a própria condição de ser estudante, o que impede o cálculo de RP.",
            "C) Sexo e religião são exposições, mas \"pais fumantes\" é um fator de confusão que deve ser excluído da análise.",
            "D) A distinção entre exposição e desfecho é irrelevante no seccional, pois ambos são medidos ao mesmo tempo e a RP é simétrica.",
            "E) Sexo, religião e pais fumantes são as exposições; tabagismo é o desfecho; logo, para cada exposição calcula-se uma razão de prevalência própria, sempre com o mesmo desfecho no numerador e no denominador."
        ],
        gabarito: `Alternativa E\n\nPor que E está certa: o slide desenha uma seta de EXPOSIÇÃO (sexo, religião, pais fumantes) para DESFECHO (tabagismo). Um mesmo estudo seccional pode ter várias exposições e um único desfecho: para cada exposição monta-se uma tabela 2x2 diferente, mas a coluna "doente" é sempre a mesma (ser tabagista). Daí resultam várias RP — uma por exposição.\n\nA — errada. Inverte a seta. Sexo e religião são características anteriores ao desfecho; não faz sentido tratá-las como consequência do tabagismo.\n\nB — errada. Se não houvesse exposição definida, o estudo seria puramente descritivo — mas o slide explicita que ele "explora a associação entre variáveis".\n\nC — errada. "Pais fumantes" é apresentado no slide como exposição de interesse, não como confundidor a descartar. Confundidores, quando existem, são ajustados, e não simplesmente removidos.\n\nD — errada. Armadilha importante: a simultaneidade da aferição não torna a RP simétrica. Quem é exposto e quem é doente é decisão do pesquisador ao montar a tabela, e trocar os eixos muda completamente o resultado — é exatamente o erro que derruba nas questões de cálculo.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Em uma tabela de estudo seccional sobre determinantes do consumo de tabaco por estudantes, encontram-se os seguintes resultados:\n\nVariável | RP | IC95% | p\nCor da pele não branca | 1,07 | 0,85 – 1,34 | 0,525\nSexo masculino | 1,38 | 1,12 – 1,71 | 0,002\n\nCom base na regra de leitura do intervalo de confiança, é correto afirmar:`,
        interactionType: "multiple-choice",
        options: [
            "A) Ambas as associações são significantes, pois ambas as RP são maiores que 1,0.",
            "B) Apenas a associação com a cor da pele é significante, pois seu intervalo é mais estreito.",
            "C) Nenhuma é significante, pois RP abaixo de 2,0 não tem relevância epidemiológica.",
            "D) Ambas são não significantes, pois o valor de p deveria ser inferior a 0,001 em estudos seccionais.",
            "E) Apenas a associação com o sexo masculino é estatisticamente significante, pois seu IC95% (1,12–1,71) não contém o valor 1,0, enquanto o IC da cor da pele (0,85–1,34) atravessa o 1,0."
        ],
        gabarito: `Alternativa E\n\nPor que E está certa: é exatamente a regra anotada à mão no seu slide — "se passar de 1,0 não é significante". Um intervalo de confiança de 95% que inclui o valor 1,0 é compatível com a hipótese de ausência de associação (RP = 1) e, portanto, não permite afirmar que há associação. O IC 0,85–1,34 vai de "proteção" a "risco", passando pelo neutro — resultado indefinido. Já 1,12–1,71 está inteiramente acima de 1,0: mesmo no pior cenário do intervalo, ainda há associação positiva. Os valores de p confirmam: 0,525 (não significante) e 0,002 (significante).\n\nA — errada. Olha só a estimativa pontual e ignora o intervalo. A RP de 1,07 é pontualmente maior que 1, mas a incerteza em torno dela abrange o 1,0.\n\nB — errada. Além de inverter a conclusão, a premissa é falsa: 0,85–1,34 tem amplitude 0,49; 1,12–1,71 tem amplitude 0,59. O intervalo da cor da pele é, na verdade, mais estreito — e ainda assim não é significante. O que importa é onde o intervalo cai, não o quão largo ele é.\n\nC — errada. Não existe limiar de 2,0 para relevância. Uma RP de 1,38 significante é um achado epidemiologicamente importante, sobretudo para um desfecho prevalente como o tabagismo.\n\nD — errada. O limiar convencional é p < 0,05, e não varia conforme o desenho de estudo.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `A aula define duas medidas estatísticas ao apresentar as tabelas de um artigo. Assinale a alternativa que as define corretamente.`,
        interactionType: "multiple-choice",
        options: [
            "A) Ambas são medidas de posição, diferindo apenas na unidade de expressão.",
            "B) Média é o valor que demonstra a concentração dos dados de uma distribuição; desvio padrão é medida de dispersão, indicando o quanto um conjunto de dados se desvia da média.",
            "C) Média é medida de dispersão e desvio padrão é medida de concentração, pois o desvio identifica o centro dos dados.",
            "D) Média é o valor que separa a distribuição em duas metades iguais; desvio padrão é o valor mais frequente da distribuição.",
            "E) Média é a razão entre prevalências e desvio padrão é o intervalo de confiança de 95%."
        ],
        gabarito: `Alternativa B\n\nPor que B está certa: transcrição literal do slide: "MÉDIA: valor que demonstra a concentração dos dados de uma distribuição; DESVIO PADRÃO: medida de dispersão, indica o quanto um conjunto de dados se desvia da média."\n\nA — errada. A média é medida de posição/tendência central; o desvio padrão é medida de dispersão. São categorias diferentes.\n\nC — errada. Inverte os dois conceitos.\n\nD — errada. Descreve mediana (separa em duas metades) e moda (valor mais frequente).\n\nE — errada. Nada a ver: RP é medida de associação e IC95% é medida de precisão da estimativa. Nenhuma das duas descreve a distribuição de uma variável contínua.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Um estudo seccional aplicou a escala EADS-21 para avaliar ansiedade em dois períodos. Os resultados de média (M) e desvio padrão (DP) foram:\n\nGrupo | Período normal | Período pandêmico\nMulheres | M = 3,31  DP = 3,67 | M = 12,41  DP = 4,91\nHomens | M = 2,74  DP = 2,94 | M = 11,92  DP = 4,09\n\nAssinale a alternativa que interpreta corretamente esses dados.`,
        interactionType: "multiple-choice",
        options: [
            "A) Houve aumento da média e redução do desvio padrão, indicando que a população se tornou mais homogênea durante a pandemia.",
            "B) As mulheres apresentaram aumento muito maior que os homens (9,1 contra 2,7 pontos), o que caracteriza associação significante entre sexo e ansiedade.",
            "C) O desvio padrão elevado no período normal (3,67 nas mulheres) indica que a média de 3,31 é impossível, pois o desvio não pode superar a média.",
            "D) Não é possível qualquer interpretação sem o valor de p e o intervalo de confiança de 95%.",
            "E) Houve aumento expressivo da média de ansiedade em ambos os sexos no período pandêmico — cerca de 9,1 pontos nas mulheres e 9,2 pontos nos homens — acompanhado de aumento do desvio padrão, o que indica que os escores também se tornaram mais dispersos entre os participantes."
        ],
        gabarito: `Alternativa E\n\nPor que E está certa: aplica corretamente as duas definições do slide. A média subiu quase igualmente nos dois sexos (~9 pontos), mostrando deslocamento do centro da distribuição. O desvio padrão também subiu, e isso tem leitura própria: a pandemia não só elevou o nível médio de ansiedade como ampliou a diferença entre as pessoas — alguns muito mais afetados que outros.\n\nA — errada. O DP aumentou nos dois grupos; a conclusão de homogeneização é o oposto do dado.\n\nB — errada. Erro de conta: o aumento nos homens é 11,92 - 2,74 = 9,18, e não 2,7 — o distrator repete a média basal masculina em vez da diferença. Além disso, comparar duas médias não estabelece significância sem teste estatístico.\n\nC — errada. Nada impede que o desvio padrão supere a média — isso é comum em escalas com piso em zero e distribuição assimétrica à direita, exatamente o caso de um escore de ansiedade em período normal.\n\nD — errada. Média e desvio padrão são plenamente interpretáveis por si — são medidas descritivas de posição e dispersão. O que não se pode, sem teste, é declarar significância da diferença entre os grupos.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Assinale a alternativa que caracteriza corretamente o estudo caso-controle, segundo a Aula 2, diferenciando-o do seccional.`,
        interactionType: "multiple-choice",
        options: [
            "A) Dois grupos semelhantes são selecionados a partir de uma população em risco, diferindo entre si pela presença ou ausência de doença; é retrospectivo, e o pesquisador busca localizar os possíveis fatores de risco aos quais a amostra com a doença foi exposta anteriormente.",
            "B) Dois grupos são selecionados pela presença ou ausência de exposição e acompanhados prospectivamente até o surgimento do desfecho.",
            "C) Um único grupo é observado em uma única oportunidade, medindo-se exposição e desfecho simultaneamente.",
            "D) Populações inteiras de municípios são comparadas quanto a médias de exposição e taxas de doença.",
            "E) Os participantes são alocados aleatoriamente em dois braços e seguidos por tempo determinado."
        ],
        gabarito: `Alternativa A\n\nPor que A está certa: transcreve o slide do caso-controle. A palavra decisiva é retrospectivo: parte-se do desfecho já ocorrido e olha-se para trás em busca da exposição — o inverso da coorte.\n\nB — errada. Descreve a coorte (seleção pela exposição, seguimento prospectivo).\n\nC — errada. Descreve o seccional.\n\nD — errada. Descreve o ecológico.\n\nE — errada. Descreve o ECR.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `"Aluna e ansiedade dentro da faculdade" e "efeito medicamentoso" aparecem como anotações ao lado do organograma de tipos de estudo. Considerando os desenhos apropriados a cada uma dessas perguntas, assinale a alternativa correta.`,
        interactionType: "multiple-choice",
        options: [
            "A) A primeira é responder por relato de caso e a segunda por série de casos, pois são estudos descritivos rápidos.",
            "B) Estimar quantas alunas apresentam ansiedade na faculdade neste semestre é pergunta de prevalência, adequada ao estudo seccional; testar o efeito de um medicamento é pergunta de intervenção, adequada ao ensaio clínico randomizado.",
            "C) Ambas as perguntas são adequadas ao estudo ecológico, pois envolvem grupos definidos.",
            "D) A primeira pergunta exige coorte, pois ansiedade é condição dinâmica; a segunda exige caso-controle, pois o efeito medicamentoso é retrospectivo.",
            "E) Ambas exigem ensaio clínico randomizado, pois o padrão-ouro serve a qualquer pergunta."
        ],
        gabarito: `Alternativa B\n\nPor que B está certa: as anotações do slide ligam "aluna e ansiedade dentro da faculdade" ao ramo seccional (um retrato da frequência atual em uma população definida) e "efeito medicamentoso" ao ensaio clínico randomizado (única forma de testar uma intervenção deliberadamente alocada). A regra geral da Aula 1 é a mesma: "para cada tipo de pergunta, deve-se escolher um tipo de estudo".\n\nA — errada. Relato e série de casos descrevem casos raros ou novos, não estimam frequência populacional nem testam intervenção.\n\nC — errada. Nenhuma das duas perguntas trabalha com agregados geográficos.\n\nD — errada. Estimar quantas alunas têm agora é prevalência, não incidência; e testar efeito medicamentoso prospectivamente não é caso-controle.\n\nE — errada. Randomizar quem "tem ansiedade" é impossível e sem sentido.`
    },
    {
        type: "DISCURSIVA",
        text: `Explique por que o estudo seccional não permite estabelecer relação de causa e efeito, mesmo quando encontra uma razão de prevalência elevada e estatisticamente significante. Em sua resposta, defina viés temporal e dê um exemplo clínico concreto de causalidade reversa.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\n1. O núcleo do argumento (3,5 pts). No seccional, "as medidas de exposição e efeito (doença) são realizadas ao mesmo tempo". Como ambas são captadas no mesmo instante, o estudo é incapaz de responder à questão-chave do delineamento: "saber se a exposição precede ou é consequência do efeito". Sem ordem temporal estabelecida, não se satisfaz um dos critérios elementares de causalidade — a causa tem de anteceder o efeito.\n\n2. Definição de viés temporal (2,5 pts). Conforme o slide: "para algumas variáveis, não se pode afirmar o que foi causa ou consequência. Não é possível [estabelecer] a temporalidade dos eventos". É o erro sistemático decorrente da impossibilidade de ordenar exposição e desfecho no tempo.\n\n3. Exemplo de causalidade reversa (2,5 pts). Qualquer exemplo coerente vale. Modelos aceitáveis:\n• Sedentarismo x hipertensão: a hipertensão e suas comorbidades podem reduzir a atividade física, e não o inverso.\n• Baixo peso x câncer: num retrato instantâneo, o câncer causa emagrecimento; concluir que emagrecer causa câncer inverteria a seta.\n• Uso de ansiolítico x insônia: a insônia leva ao uso do fármaco, não o contrário.\n\n4. Por que a significância não resolve (1,5 pt). O valor de p e o IC95% respondem apenas se a associação observada é compatível com o acaso. Eles não informam a direção da seta causal nem afastam confundimento. Uma RP de 5,0 com IC95% de 3,2–7,8 continua sendo a comparação de duas fotografias tiradas no mesmo instante: é uma associação forte, precisa e não casual — e ainda assim de direção causal indeterminada.`
    },
    {
        type: "DISCURSIVA",
        text: `Você foi designado para planejar um estudo seccional que estime a prevalência de sintomas depressivos entre os estudantes de medicina da sua instituição e investigue sua associação com carga horária de estágio. Descreva as três fases do estudo, detalhando pelo menos duas providências em cada uma, e indique qual medida de associação você calcularia ao final.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\nFase 1 — PLANEJAMENTO (4,0 pts). Deve conter, no mínimo:\n• Instrumentos: escolher e, se necessário, validar um questionário para rastreio de sintomas depressivos.\n• Amostragem: definir a população de estudo, o tamanho amostral e o método de seleção.\n• Seleção e treinamento dos pesquisadores de campo: padronizar a aplicação para reduzir viés de aferição.\n• Definição operacional de exposto e não exposto.\n\nFase 2 — EXECUÇÃO (3,0 pts).\n• Estudo piloto ("estudo prévio"): aplicar o instrumento a um pequeno grupo para detectar perguntas ambíguas, estimar tempo de aplicação e ajustar a logística.\n• Coleta de dados propriamente dita, mantendo a simultaneidade da aferição de exposição e desfecho.\n\nFase 3 — ANÁLISE E DIVULGAÇÃO (2,0 pts). Montar a tabela 2x2, calcular a prevalência global, a prevalência nos expostos e nos não expostos, estimar a razão de prevalência com o respectivo IC95% e divulgar os resultados.\n\nMedida de associação (1,0 pt). Razão de prevalência (RP) = prevalência de sintomas depressivos entre os de alta carga horária ÷ prevalência entre os de baixa carga horária.`
    },
    {
        type: "DISCURSIVA",
        text: `Compare estudo seccional, coorte e caso-controle quanto a: ponto de partida, direção temporal, medida de frequência produzida, medida de associação e adequação para doenças raras. Justifique por que o seccional ocupa posição inferior à coorte na pirâmide da evidência.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\nCritério | Seccional | Coorte | Caso-controle\nPonto de partida | População (sem separar por exp ou dç) | Exposição | Doença (casos e controles)\nDireção temporal | Nenhuma (corte simultâneo) | Prospectiva (para frente) | Retrospectiva (para trás)\nFrequência | Prevalência | Incidência | Não estima frequencia populacional\nAssociação | Razão de prevalência (RP) | Risco relativo (RR) | Odds ratio (OR)\nDoença rara | Inadequado | Pouco eficiente | Desenho de escolha\n\nPor que o seccional fica abaixo da coorte na pirâmide (4,0 pts). A hierarquia da evidência reflete a capacidade do desenho de sustentar inferência causal. Na coorte, a exposição é aferida antes do desfecho: a temporalidade está garantida por construção, o que satisfaz um critério essencial de causalidade e ainda permite estimar incidência. No seccional, exposição e desfecho são medidos simultaneamente, de modo que o viés temporal é inerente e a causalidade reversa nunca pode ser descartada. Some-se a isso que o seccional capta casos prevalentes, sobre-representando doenças de longa duração e sub-representando as de curso rápido ou letal — o chamado viés de sobrevivência, que distorce a comparação com os expostos.`
    },
    {
        type: "DISCURSIVA",
        text: `Um inquérito seccional em 500 gestantes avaliou tabagismo materno (exposição) e baixo peso ao nascer (desfecho):\n\nTabagismo | Baixo peso | Peso normal | Total\nSim | 30 | 70 | 100\nNão | 40 | 360 | 400\nTotal | 70 | 430 | 500\n\n(a) Calcule a prevalência global de baixo peso, a prevalência nos expostos, nos não expostos e a RP. (b) O IC95% obtido para essa RP foi de 1,95–4,60. Interprete a RP e avalie a significância. (c) Redija a conclusão do estudo em uma frase metodologicamente correta.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\n(a) Cálculos — 5,0 pts\nPrevalência global = 70 / 500 = 0,14 -> 14%\nPrevalência nos expostos = 30 / 100 = 0,30 -> 30%\nPrevalência nos não expostos = 40 / 400 = 0,10 -> 10%\nRP = 0,30 / 0,10 = 3,0\n\n(b) Interpretação e significância — 2,5 pts.\nMagnitude e direção: RP = 3,0 é maior que 1, logo há associação positiva. "A prevalência de baixo peso nos filhos de tabagistas é 3 vezes a dos filhos de não tabagistas".\nSignificância: o IC95% de 1,95–4,60 está inteiramente acima de 1,0 — não contém o valor neutro. Portanto a associação é estatisticamente significante.\n\n(c) Conclusão correta — 2,5 pts.\n"Neste inquérito seccional, a prevalência de baixo peso ao nascer entre filhos de gestantes tabagistas foi de 30%, três vezes a observada entre filhos de não tabagistas (10%), com RP = 3,0 (IC95% 1,95–4,60), configurando associação positiva estatisticamente significante. Por se tratar de estudo transversal, com aferição simultânea de exposição e desfecho, não é possível estabelecer relação de causa e efeito."`
    },
    {
        type: "DISCURSIVA",
        text: `A aula afirma que o estudo seccional é "adequado para identificar pessoas e características passíveis de intervenção e gerar hipóteses de causas de doenças". Explique o que significa "gerar hipóteses" nesse contexto e como esse papel se articula com o encadeamento entre epidemiologia descritiva e analítica visto na Aula 1.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\n1. O que é gerar hipóteses (3,5 pts). Significa produzir uma conjectura plausível sobre uma possível relação entre exposição e doença, a ser testada posteriormente por um desenho capaz de sustentar inferência causal (coorte ou ensaio clínico). O seccional identifica que duas coisas andam juntas naquele momento; ele não afirma que uma produz a outra. A hipótese é o produto legítimo desse achado.\n\n2. A utilidade prática imediata (2,0 pts). Ainda que não sirva para causalidade, o seccional é imediatamente útil para o serviço: identifica quem e quais características são "passíveis de intervenção", dimensiona a magnitude do problema e orienta alocação de recursos.\n\n3. A articulação com a Aula 1 (3,5 pts). A epidemiologia descritiva "levanta pistas" a partir de pessoa, lugar e tempo; a analítica "comprova as associações causais". O seccional ocupa uma posição de charneira: é formalmente analítico (mede associação, calcula RP), mas sua limitação temporal o mantém, na prática, próximo do papel gerador de hipóteses — as pistas ficam mais quantificadas, porém a comprovação continua dependendo de um desenho com temporalidade garantida.`
    },
    {
        type: "DISCURSIVA",
        text: `Um artigo relata: "Em inquérito domiciliar seccional com 2.400 adultos, 1.000 referiram consumo diário de bebidas açucaradas. Entre estes, 120 tinham diabetes; entre os 1.400 demais, 100 tinham diabetes. Concluímos que o consumo de bebidas açucaradas causa diabetes."\n\n(a) Monte a tabela 2x2, calcule a prevalência global de diabetes, a prevalência nos expostos, nos não expostos e a razão de prevalência. (b) Sabendo que o IC95% dessa RP foi de 1,31–2,16, avalie a significância — e explique o que teria mudado na conclusão se o IC fosse 0,92–3,05. (c) Analise criticamente a conclusão do autor. (d) Indique qual desenho de estudo permitiria sustentar a afirmação feita e por quê.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\nConsumo diário | Com diabetes | Sem diabetes | Total\nSim (expostos) | 120 | 880 | 1.000\nNão (não expostos) | 100 | 1.300 | 1.400\nTotal | 220 | 2.180 | 2.400\n\n(a) Cálculos — 3,5 pts\nPrevalência global = 220 / 2.400 = 0,0917 -> 9,17%\nPrevalência nos expostos = 120 / 1.000 = 0,12 -> 12%\nPrevalência nos não expostos = 100 / 1.400 = 0,0714 -> 7,14%\nRP = 0,12 / 0,0714 = 1,68\n\n(b) Leitura do intervalo e Significância — 2,5 pts.\nCom IC95% de 1,31–2,16, o intervalo está inteiramente acima de 1,0: a associação é estatisticamente significante. Se o IC fosse 0,92–3,05, ele conteria o 1,0 — "se passar de 1,0 não é significante" — e a conclusão correta passaria a ser: "observou-se RP de 1,68, sem significância estatística, resultado compatível com a hipótese nula".\n\n(c) Crítica à conclusão — 3,0 pts.\nO achado numérico é legítimo, mas a conclusão é insustentável, porque o verbo empregado é "causa". Em delineamento seccional, a questão-chave do desenho — saber se a exposição precede ou é consequência do efeito — permanece sem resposta. Pode haver causalidade reversa (quem recebe diagnóstico de diabetes reduz o consumo de açúcar) e fatores de confusão (obesidade, sedentarismo).\n\n(d) Desenho adequado — 1,0 pt.\nUm estudo de coorte: parte-se da exposição, selecionando adultos sem diabetes no início, classificando-os por consumo e acompanhando-os prospectivamente. Como a exposição é aferida antes do desfecho, a temporalidade fica garantida.`
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
