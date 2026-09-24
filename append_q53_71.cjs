const fs = require('fs');
const newQuestions = [
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `A aula apresenta a origem dos estudos ecológicos a partir de uma pergunta e da hipótese dela derivada. Assinale a alternativa que reproduz corretamente esse marco histórico.`,
        interactionType: "multiple-choice",
        options: [
            "A) Alvan Feinstein (1968) propôs comparar concentração de lítio entre pacientes individuais internados, inaugurando a epidemiologia clínica.",
            "B) Dawson e cols. (1968) randomizaram cidades para receber suplementação de lítio na água, caracterizando um ensaio comunitário.",
            "C) Paul (1938) comparou a concentração de lítio no sangue de pacientes maníacos e controles, num desenho caso-controle.",
            "D) Dawson e cols. (1968) perguntaram se os sais de lítio teriam a propriedade de controlar estados maníaco-depressivos e derivaram a hipótese de que as internações por essa doença seriam menos frequentes nas regiões cuja água de beber é rica em cátion lítio do que nas regiões pobres nesse íon.",
            "E) Durkheim (século XIX) perguntou se o lítio na água reduziriria o suicídio nas províncias da Prússia, derivando a hipótese da associação entre religião e mania."
        ],
        gabarito: `Alternativa D\n\nPor que D está certa: os slides "ORIGEM DOS ESTUDOS ECOLÓGICOS" trazem exatamente essa sequência. A derivação da hipótese parte da pergunta "Sais de lítio teriam a propriedade de controlar estados maníaco-depressivos?" e chega à formulação: "Se sais de lítio têm a propriedade de controlar a mania, então as internações hospitalares por essa doença devem ser menos frequentes nas regiões onde a água de beber é rica em cátion lítio do que em regiões pobres no referido íon". A pesquisa então correlacionou concentração de lítio na água de beber com internações hospitalares por psicose maníaco-depressiva — duas variáveis medidas em regiões, não em pessoas.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Assinale a alternativa que define corretamente o estudo ecológico.`,
        interactionType: "multiple-choice",
        options: [
            "A) São estudos que acompanham coortes de nascimento até a idade adulta para avaliar efeitos ambientais.",
            "B) São estudos que comparam casos e controles quanto à residência em área poluída.",
            "C) São estudos em que a unidade de análise é uma população ou um grupo de pessoas, que geralmente pertence a uma área geográfica definida (cidade, estado, país).",
            "D) São estudos em que a unidade de análise é o indivíduo, avaliado quanto a exposições ambientais por meio de questionários e exames.",
            "E) São estudos que avaliam o impacto de intervenções ambientais alocadas aleatoriamente entre municípios."
        ],
        gabarito: `Alternativa C\n\nPor que C está certa: transcrição do slide "O que é estudo ecológico?". A expressão decisiva é unidade de análise: no ecológico, o "sujeito" da linha do banco de dados não é uma pessoa, é um município, um estado, um país — ou o mesmo lugar em anos diferentes.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre as características do estudo ecológico apresentadas na aula, assinale a alternativa incorreta.`,
        interactionType: "multiple-choice",
        options: [
            "A) Os dados de cada indivíduo do grupo são coletados por entrevista direta, o que garante precisão da exposição individual.",
            "B) A unidade de observação é a população ou grupo de pessoas, pertencente a uma área geográfica definida — país, estado, cidade, município.",
            "C) Avalia os contextos ambientais e sociais e como eles afetam a saúde de grupos populacionais.",
            "D) Os dados de uma área são comparados a outras, ou no tempo (séries temporais), ou ambos.",
            "E) São frequentemente realizados combinando arquivos de dados já existentes em grandes populações, sendo geralmente mais baratos e mais rápidos."
        ],
        gabarito: `Alternativa A (a incorreta)\n\nPor que A é a incorreta: é exatamente o oposto do desenho. O ecológico se caracteriza por não dispor de dados individuais: "informações sobre comportamento, atitudes e história clínica não estão disponíveis (dados pessoais não disponíveis)" e os dados são "normalmente secundários (banco de dados - tabnet)". Se houvesse entrevista direta com cada pessoa, o nível de análise seria individual e o desenho deixaria de ser ecológico.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `A aula contrapõe dois níveis de análise nos estudos observacionais. Assinale a alternativa que faz corretamente essa distinção.`,
        interactionType: "multiple-choice",
        options: [
            "A) Nível individual — seccional, caso-controle e coorte: usa questionários, exames e formulários, mede o efeito no indivíduo e compara indivíduos. Nível agrupado — estudo ecológico: usa dados normalmente secundários, medidas em agregados (médias e proporções), medidas ambientais e medidas globais.",
            "B) Nível individual — estudo ecológico e séries temporais; nível agrupado — coorte e caso-controle, pois estes agrupam participantes por exposição.",
            "C) Nível individual — apenas o ensaio clínico randomizado; nível agrupado — todos os observacionais.",
            "D) Nível individual — estudos que usam dados do DATASUS; nível agrupado — estudos que aplicam questionários domiciliares.",
            "E) Não há distinção de níveis nos estudos observacionais, apenas nos experimentais."
        ],
        gabarito: `Alternativa A\n\nPor que A está certa: o slide "NÍVEIS DE ANÁLISE — OBSERVACIONAL" divide a tela em duas colunas. À esquerda, INDIVIDUAL (estudo seccional, caso-controle, coorte), com os marcadores: questionários, exames, formulários; efeito no indivíduo (efeito biológico); mede associação exposição-desfecho; compara-se indivíduos. À direita, AGRUPADO (estudo ecológico), com: dados normalmente secundários (banco de dados - tabnet); medidas em agregados (médias e proporções derivadas de variáveis individuais); medidas ambientais; medidas globais.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Segundo a aula, os estudos ecológicos são utilizados para:`,
        interactionType: "multiple-choice",
        options: [
            "A) Determinar a história natural de uma doença por meio do acompanhamento longitudinal de pacientes.",
            "B) Estimar a prevalência pontual de agravos por meio de amostragem domiciliar.",
            "C) Testar a eficácia de medicamentos em grupos aleatorizados de municípios.",
            "D) Gerar e testar hipóteses etiológicas; avaliar a efetividade de intervenções na população; verificar tendências (distribuição espacial dos agravos à saúde); e realizar análise de situação em saúde.",
            "E) Estabelecer a relação causal individual entre exposição e doença, dispensando estudos posteriores."
        ],
        gabarito: `Alternativa D\n\nPor que D está certa: são os quatro marcadores do slide "Como usar". O slide ainda ilustra o segundo item com o exemplo das campanhas de vacinação das décadas de 30 e 50 e sua correlação com a situação atual no Brasil, e o quarto com "muito utilizado para análise de situação em saúde".`
    },
    {
        type: "DISCURSIVA",
        text: `A aula apresenta dois exemplos de perguntas respondíveis por estudo ecológico: "Qual a influência da adoção de leis antitabaco sobre as taxas de câncer de pulmão no Brasil?" e "Qual a relação temporal entre os níveis de dióxido de carbono da cidade de São Paulo e as taxas de internamento por doenças do aparelho respiratório?" Explique por que ambas exigem um desenho ecológico e não poderiam ser respondidas por um estudo de nível individual.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\n1. A natureza da exposição (3,5 pts). Nos dois casos a exposição é coletiva por definição, não individual. Uma lei antitabaco não é "recebida" por alguns e não por outros dentro da mesma cidade — ela vale para todos ao mesmo tempo. O nível de dióxido de carbono é uma medida ambiental do ar da cidade: não existe "o CO2 do fulano". Exposições desse tipo só têm variação entre áreas ou entre períodos.\n\n2. A vantagem específica citada na aula (2,5 pts). O slide de vantagens diz que os ecológicos "conseguem estimar bem os efeitos de uma exposição quando ela varia pouco na área de estudo, pela comparação entre áreas — os estudos individuais não conseguem".\n\n3. O tipo de desenho de cada exemplo (2,5 pts).\n• Leis antitabaco x câncer de pulmão: pode ser série temporal ou misto. Trata-se da mensuração de um efeito ecológico ("implantação de nova legislação em saúde").\n• CO2 x internações respiratórias: estudo de séries temporais, do tipo analítico (associação entre mudanças no tempo do nível médio de exposição e das taxas de doença numa população geograficamente definida).\n\n4. Fontes de dados (1,5 pt). Ambos se apoiam em dados secundários já existentes (DATASUS/SIH, SIM, órgãos de monitoramento ambiental, IBGE).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `A aula classifica em três tipos as variáveis utilizadas nos estudos ecológicos. Assinale a alternativa que associa corretamente cada tipo ao seu exemplo.`,
        interactionType: "multiple-choice",
        options: [
            "A) Os três tipos são sinônimos, variando apenas conforme a fonte de dados consultada.",
            "B) Medidas agregadas — proporção de fumantes, taxa de incidência de uma doença, renda familiar média; medidas ambientais — nível de poluição do ar, qualidade da água, nível de radiação solar; medidas globais — densidade demográfica, nível de desigualdade social, existência de determinado tipo de sistema de saúde.",
            "C) Medidas agregadas — poluição do ar e radiação solar; medidas ambientais — densidade demográfica; medidas globais — renda familiar média.",
            "D) Medidas agregadas — densidade demográfica; medidas ambientais — proporção de fumantes; medidas globais — qualidade da água.",
            "E) Só existem dois tipos: medidas individuais e medidas coletivas, sendo as ambientais uma subcategoria das individuais."
        ],
        gabarito: `Alternativa B\n\nPor que B está certa: reproduz literalmente o slide "TIPOS DE VARIÁVEIS UTILIZADAS". O critério que separa os três está na própria definição de cada um: Agregadas sintetizam características individuais; Ambientais são características físicas do ambiente; Globais são atributos sem análogo no nível individual.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Um pesquisador compara as taxas de dengue entre os 184 municípios do Ceará no ano de 2024, buscando identificar padrões espaciais de ocorrência. Segundo a tipologia de desenhos ecológicos da aula, trata-se de:`,
        interactionType: "multiple-choice",
        options: [
            "A) Desenho de múltiplos grupos, do tipo analítico, pois toda comparação entre regiões envolve teste de hipótese.",
            "B) Estudo de séries temporais exploratório, pois avalia a evolução das taxas ao longo do tempo.",
            "C) Desenho misto analítico, pois combina variação espacial e temporal.",
            "D) Estudo seccional, pois observa todos os municípios em uma única oportunidade.",
            "E) Desenho de múltiplos grupos, do tipo exploratório, pois compara taxas de doença entre regiões durante o mesmo período para identificar padrões espaciais."
        ],
        gabarito: `Alternativa E\n\nPor que E está certa: o slide define o desenho de múltiplos grupos exploratório como "comparação de taxas de doença entre regiões durante o mesmo período para identificar padrões espaciais" — descrição idêntica ao enunciado. A palavra que decide é identificar padrões: não há variável de exposição sendo testada, apenas mapeamento.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Assinale a alternativa que diferencia corretamente as versões exploratória e analítica dos estudos ecológicos de séries temporais.`,
        interactionType: "multiple-choice",
        options: [
            "A) Ambos são idênticos, mudando apenas o software de análise empregado.",
            "B) O exploratório exige dados primários; o analítico exige dados secundários.",
            "C) O exploratório avalia a evolução das taxas de doença ao longo do tempo em uma população geograficamente definida, servindo a projeções de tendências futuras, avaliação de intervenção populacional e coortes de nascimento; o analítico avalia a associação entre mudanças no tempo do nível médio de exposição e das taxas de doença nessa população.",
            "D) O exploratório testa associação entre exposição média e taxa; o analítico apenas descreve a evolução das taxas.",
            "E) O exploratório compara regiões no mesmo período; o analítico compara períodos na mesma região."
        ],
        gabarito: `Alternativa C\n\nPor que C está certa: os dois slides de séries temporais definem exatamente assim. O exploratório: "Avalia a evolução das taxas de doença ao longo do tempo em uma determinada população geográfica definida". O analítico: "Avalia a associação entre mudanças no tempo do nível médio de exposição e das taxas de doenças em uma população geograficamente definida".`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Um estudo avaliou, para cada estado brasileiro, a taxa média de mortalidade por doenças cardiovasculares nos períodos de 1996–2000 e 2006–2010, cruzando essa variação com a cobertura média da Estratégia Saúde da Família de cada estado. Esse desenho classifica-se como:`,
        interactionType: "multiple-choice",
        options: [
            "A) Múltiplos grupos exploratório, pois há vários estados envolvidos.",
            "B) Séries temporais exploratório, pois há dois períodos comparados.",
            "C) Coorte ecológica, pois acompanha os estados ao longo de 14 anos.",
            "D) Ensaio comunitário, pois avalia a implantação de um programa de saúde.",
            "E) Misto analítico, pois avalia a associação entre as mudanças no tempo do nível de exposição média e das taxas de doença entre diferentes grupos populacionais, combinando as dimensões espacial e temporal."
        ],
        gabarito: `Alternativa E\n\nPor que E está certa: o slide "Desenhos Mistos — Estudo Analítico" define: "Avalia a associação entre as mudanças no tempo do nível de exposição média e das taxas de doenças entre diferentes grupos populacionais". O estudo do enunciado tem as duas dimensões — vários estados (espaço) e dois períodos (tempo) — mais uma exposição (cobertura da ESF), o que o torna analítico.`
    },
    {
        type: "DISCURSIVA",
        text: `Classifique os quatro estudos abaixo quanto ao eixo de comparação (múltiplos grupos, séries temporais ou misto) e quanto ao propósito (exploratório ou analítico), justificando cada classificação:\n(I) Mapa da taxa de mortalidade infantil dos 5.570 municípios brasileiros em 2023.\n(II) Evolução anual da taxa de incidência de sífilis congênita no Recife entre 2010 e 2024.\n(III) Correlação entre a renda média de cada capital e a taxa de mortalidade por causas externas no ano de 2023.\n(IV) Correlação entre a variação anual da cobertura vacinal e a variação anual da incidência de sarampo, em cada região do país, de 2015 a 2024.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\nI) Múltiplos grupos / Exploratório: Muitas áreas, um único período; nenhuma exposição correlacionada — apenas identificação de padrão espacial da taxa.\n\nII) Séries temporais / Exploratório: Uma única área geográfica definida, vários momentos; descreve a evolução da taxa sem cruzar com exposição.\n\nIII) Múltiplos grupos / Analítico: Muitas áreas, um único período, com exposição (renda média) associada à taxa de doença — é a definição do múltiplos grupos analítico.\n\nIV) Misto / Analítico: Várias regiões e vários anos, com associação entre mudanças no tempo do nível de exposição média e das taxas de doença entre grupos populacionais.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Assinale a alternativa que reúne corretamente as vantagens do estudo ecológico segundo a aula.`,
        interactionType: "multiple-choice",
        options: [
            "A) Baixo custo e execução rápida, graças às fontes de dados secundários disponíveis (SIM, SINASC, SINAN, IBGE); capacidade de estimar bem os efeitos de uma exposição que varia pouco na área de estudo, o que os estudos individuais não conseguem; e mensuração de um efeito ecológico, como a implantação de um novo programa ou legislação em saúde.",
            "B) Capacidade de estabelecer associação no nível individual; controle rigoroso de fatores de confusão; e disponibilidade de história clínica dos participantes.",
            "C) Possibilidade de calcular incidência e risco relativo; seguimento longitudinal dos participantes; e ausência de perdas.",
            "D) Randomização das áreas; cegamento dos avaliadores; e alto nível na pirâmide de evidência.",
            "E) Alta precisão da exposição individual; baixo risco de viés de aferição; e independência da qualidade das fontes de dados."
        ],
        gabarito: `Alternativa A\n\nPor que A está certa: são os três marcadores do slide "ESTUDOS ECOLÓGICOS: Vantagem". A segunda vantagem é a mais conceitual: quando a exposição é praticamente uniforme dentro de uma área, o estudo individual perde o contraste necessário, e só a comparação entre áreas revela o efeito.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre as limitações do estudo ecológico, assinale a alternativa que não corresponde ao conteúdo da aula.`,
        interactionType: "multiple-choice",
        options: [
            "A) A migração entre grupos — por exemplo, pessoas que moram em uma área e trabalham em outra — é irrelevante para o desenho, pois os dados são agregados por área de residência.",
            "B) Há incapacidade de associar exposição e doença no nível individual, sendo o desenho generalista.",
            "C) Há dificuldade de controlar os efeitos de potenciais fatores de confundimento.",
            "D) Os dados representam níveis de exposição média em vez de valores individuais reais, e não se leva em conta a variabilidade da característica dentro do grupo.",
            "E) Informações sobre comportamento, atitudes e história clínica não estão disponíveis, e o estudo depende da qualidade das informações das fontes utilizadas."
        ],
        gabarito: `Alternativa A (a que não corresponde)\n\nPor que A está errada e é a resposta: a migração entre grupos aparece no slide justamente como uma limitação, com o exemplo textual "(por exemplo, mora em uma área e trabalha em outra)". Ela importa exatamente porque os dados são agregados por área: a pessoa é contada como exposta ao ambiente da área onde reside, quando na prática passa boa parte do dia exposta a outro ambiente. Isso dilui ou distorce o contraste entre áreas — chamar isso de irrelevante inverte o sentido do slide.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Um pesquisador analisou dados agregados de 30 cidades e observou que aquelas com maiores níveis médios de poluição do ar apresentaram as maiores taxas de doenças respiratórias. Ele concluiu que os indivíduos mais expostos à poluição dentro de cada cidade são os que adoecem. O principal erro cometido é:`,
        interactionType: "multiple-choice",
        options: [
            "A) Viés de seleção, pois as 30 cidades não foram escolhidas aleatoriamente.",
            "B) Viés de aferição, pois os medidores de poluição podem estar descalibrados.",
            "C) Nenhum erro, pois a associação ecológica entre poluição e doença respiratória é biologicamente plausível e, portanto, válida no nível individual.",
            "D) Falácia ecológica, pois a análise está considerando dados agregados e inferindo relações de nível individual, ignorando a variação dentro das cidades.",
            "E) Viés temporal, pois não se sabe se a poluição precedeu as doenças respiratórias."
        ],
        gabarito: `Alternativa D\n\nPor que D está certa: a falácia ecológica é definida no slide como "inferir relações de nível individual a partir de dados de nível agrupado". É exatamente o que o pesquisador fez: saiu de "cidades mais poluídas têm mais doença" para "as pessoas mais expostas dentro da cidade é que adoecem" — um salto que os dados não autorizam. O slide resume a armadilha em uma frase: "olhar o macro e deduzir o micro".`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `O exemplo clássico de falácia ecológica citado na aula envolve Emile Durkheim, no século XIX. Assinale a alternativa que descreve corretamente o estudo e a razão pela qual sua inferência causal é incorreta.`,
        interactionType: "multiple-choice",
        options: [
            "A) Durkheim estudou a concentração de lítio na água das províncias prussianas, e o erro foi de aferição da exposição.",
            "B) Não houve erro: como a associação era estatisticamente forte, a inferência individual estava justificada.",
            "C) Durkheim observou associação ecológica positiva entre a proporção de indivíduos de religião protestante e as taxas de suicídio nas províncias da Prússia, concluindo que protestantes se suicidavam mais que católicos; a conclusão é factível, mas a inferência é incorreta porque poderiam ter sido os católicos residentes em províncias predominantemente protestantes a cometer os suicídios, e a metodologia ecológica não permite discernir qual hipótese está certa.",
            "D) Durkheim comparou católicos e protestantes individualmente por meio de entrevistas domiciliares, e o erro foi de viés de memória.",
            "E) Durkheim randomizou províncias para intervenções religiosas, e o erro foi de contaminação entre grupos."
        ],
        gabarito: `Alternativa C\n\nPor que C está certa: é a reprodução do slide, inclusive na frase final: "Conclusão factível mas a inferência causal não é correta: poderiam ter sido os católicos em províncias predominantemente protestantes a cometer os suicídios, e a metodologia ecológica não permite discernir qual das duas hipóteses está certa".\nPor que esse exemplo é tão didático: ele mostra que o dado agregado é compatível com duas explicações individuais opostas. Nenhuma sofisticação estatística resolve isso sem dados individuais.`
    },
    {
        type: "DISCURSIVA",
        text: `Defina falácia ecológica nos termos da aula, explique por que ela é um problema de inferência e não de estatística, e construa um exemplo hipotético seu (diferente do de Durkheim e do da poluição do ar) em que uma associação agregada verdadeira levaria a uma conclusão individual falsa.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n\n1. Definição (3,0 pts). "Inferir relações de nível individual a partir de dados de nível agrupado" ou "viés que pode ocorrer porque uma associação entre duas variáveis no nível agregado não necessariamente representa uma associação no nível individual".\n\n2. Por que é problema de inferência, não de estatística (3,0 pts). O cálculo pode estar impecável — a correlação entre as variáveis agregadas pode ser real e forte. O erro está no salto lógico de atribuir ao indivíduo o que se observou no grupo. Nenhum aumento de amostra ou ajuste corrige a falácia, porque a informação de quem estava exposto e quem adoeceu não existe no banco de dados ecológico.\n\n3. Exemplo próprio (3,0 pts). Modelos aceitáveis:\n• Imigração e criminalidade: bairros com maior proporção de imigrantes apresentam maior taxa de furtos. Concluir que "imigrantes furtam mais" é falácia — pode ser que imigrantes se instalem em bairros mais pobres e sejam as vítimas.\n• Médicos e mortalidade: municípios com mais médicos registram maior taxa de mortalidade por câncer. Concluir que "quem consulta médico morre mais" é falácia.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Como se estimam os efeitos em estudos ecológicos, segundo a aula?`,
        interactionType: "multiple-choice",
        options: [
            "A) Não se estimam efeitos em estudos ecológicos, apenas se descrevem taxas brutas.",
            "B) Utiliza-se regressão, normalmente linear, e o coeficiente de correlação (R), que reflete a extensão em que cada variável consegue predizer a outra; também se empregam a diferença entre as taxas e a razão de taxas.",
            "C) Utiliza-se exclusivamente a razão de prevalência calculada a partir da tabela 2x2 de indivíduos.",
            "D) Utiliza-se o odds ratio obtido pelo produto cruzado, por se tratar de desenho retrospectivo.",
            "E) Utiliza-se o risco relativo obtido pela razão de incidências acumuladas ao longo do seguimento."
        ],
        gabarito: `Alternativa B\n\nPor que B está certa: o slide "Como estimar os efeitos em estudos ecológicos?" traz esses quatro elementos: regressão (normalmente linear); coeficiente de correlação R; diferença entre as taxas; e razão de taxas.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Dois municípios de mesma população apresentaram os seguintes dados de mortalidade por doenças do aparelho respiratório em 2024:\n\nMunicípio | Óbitos | População | Nível médio de material particulado\nAlfa | 420 | 350.000 | Alto\nBeta | 180 | 300.000 | Baixo\n\nCalcule as taxas por 100.000 habitantes, a razão de taxas e a diferença entre as taxas, e assinale a alternativa correta.`,
        interactionType: "multiple-choice",
        options: [
            "A) Taxas de 420 e 180 por 100.000; razão de taxas = 2,33 e diferença = 240 por 100.000.",
            "B) Taxas de 120 e 60 por 100.000; razão de taxas = 0,5 e diferença = −60; portanto Alfa tem metade da mortalidade de Beta.",
            "C) Taxas de 120 e 60 por 100.000; razão de taxas = 2,0; portanto está comprovado que o material particulado causou os óbitos em Alfa.",
            "D) Não é possível calcular taxas, pois faltam os dados individuais de exposição de cada falecido.",
            "E) Taxas de 120 e 60 por 100.000; razão de taxas = 2,0 e diferença = 60 por 100.000; portanto a mortalidade respiratória em Alfa é o dobro da de Beta, havendo 60 óbitos a mais por 100.000 habitantes naquele município."
        ],
        gabarito: `Alternativa E\n\nTaxa = (óbitos / população) x 100.000\nAlfa: (420 / 350.000) x 100.000 = 120 por 100.000\nBeta: (180 / 300.000) x 100.000 = 60 por 100.000\nRazão de taxas = 120 / 60 = 2,0\nDiferença entre as taxas = 120 - 60 = 60 por 100.000`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre o coeficiente de correlação (r) nos estudos ecológicos, a aula afirma que:`,
        interactionType: "multiple-choice",
        options: [
            "A) O r varia de 0 a 100, sendo valores acima de 50 indicativos de causalidade.",
            "B) O r só pode assumir valores positivos, pois representa uma razão entre taxas.",
            "C) O r substitui a razão de prevalência nos estudos seccionais quando a amostra é pequena.",
            "D) Quanto mais próximo de 1 for o r, maior a confiabilidade dos dados, pois ele reflete a extensão em que cada variável consegue predizer a outra.",
            "E) Quanto mais próximo de zero for o r, maior a confiabilidade, pois indica ausência de erro aleatório."
        ],
        gabarito: `Alternativa D\n\nPor que D está certa: a frase é repetida duas vezes nos slides — "Quanto mais próximo de 1 for o R maior a confiabilidade de seus dados" e, ao final do exemplo das Florestas, "Quanto mais perto de 1 for o r, maior a confiabilidade dos dados". A definição que a acompanha é: "coeficiente de correlação: reflete a extensão em que cada variável consegue predizer a outra (R)". Leitura correta do "próximo de 1": entenda como próximo de 1 em módulo, isto é, próximo de +1 ou de −1.`
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
