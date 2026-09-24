const fs = require('fs');
const newQuestions = [
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `A palavra "Epidemiologia" é formada por três radicais gregos. Uma estudante afirma, em seminário, que a etimologia do termo já antecipa o objeto da disciplina: ela não estuda o indivíduo isolado, mas o coletivo. Assinale a alternativa que apresenta corretamente a decomposição do termo e a conclusão que dela decorre.`,
        interactionType: "multiple-choice",
        options: [
            `A) Epi = acima, demo = demonstração, logia = tratado; portanto, é o tratado que demonstra causas, sendo sinônimo de epidemiologia analítica.`,
            `B) Epi = entre, demo = pessoas, logia = medida; portanto, é a medida entre pessoas, o que a torna equivalente à bioestatística.`,
            `C) Epi = sobre, demo = doença, logia = estudo; portanto, é o estudo sobre as doenças, com foco no diagnóstico individual.`,
            `D) Epi = sobre, demo = povo, logia = estudo; portanto, é o estudo que recai sobre o povo, o que justifica a coletividade como unidade de interesse.`,
            `E) Epi = doença, demo = distribuição, logia = ciência; portanto, é a ciência da distribuição das doenças, restrita a agravos transmissíveis.`
        ],
        gabarito: `Alternativa D\nPor que D está certa: o slide de abertura da Aula 1 decompõe literalmente o termo em Epi = sobre, Demo = povo, Logia = estudo. A conclusão está corretamente encadeada: se o radical central é "povo", a unidade de interesse é a coletividade, e não o paciente isolado — exatamente o que a definição da IEA (1973) reforça ao falar em "coletividades humanas".\n\nA — errada. A justificativa transforma a epidemiologia inteira em epidemiologia analítica, ignorando o ramo descritivo, que é metade do campo.\nB — errada. Epidemiologia e bioestatística não são equivalentes: a estatística é uma ferramenta usada pela epidemiologia, não sua definição.\nC — errada. Erra o radical demo e, na justificativa, coloca o foco no diagnóstico individual — que é justamente o oposto do que o radical "povo" indica.\nE — errada. Epi não é "doença" e demo não é "distribuição". Além disso, a segunda metade restringe a epidemiologia a agravos transmissíveis, o que contraria a Portaria 3.252/09, que inclui expressamente doenças não transmissíveis e agravos.\n\nObjetivo educacional: fixar que o eixo da disciplina é populacional. Toda vez que uma alternativa deslocar o foco para o indivíduo isolado, desconfie.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `A Associação Internacional de Epidemiologia (IEA), em 1973, consagrou uma definição clássica da disciplina. Qual das alternativas reproduz corretamente essa definição e identifica seus dois eixos estruturantes?`,
        interactionType: "multiple-choice",
        options: [
            `A) "Estudo dos fatores que determinam a frequência e a distribuição das doenças nas coletividades humanas"; os eixos são frequência e distribuição, ambos dependentes dos determinantes.`,
            `B) "Estudo da história natural das doenças em indivíduos suscetíveis"; os eixos são suscetibilidade e exposição.`,
            `C) "Aplicação de métodos estatísticos ao processo diagnóstico e terapêutico"; os eixos são diagnóstico e terapêutica.`,
            `D) "Uso consciente, explícito e judicioso das melhores evidências disponíveis"; os eixos são consciência e explicitação.`,
            `E) "Ciência que compara agregados populacionais em áreas geográficas definidas"; os eixos são área e agregado.`
        ],
        gabarito: `Alternativa A\nPor que A está certa: é a transcrição literal do slide "REVISANDO..." da Aula 1, atribuída à IEA, 1973. Os dois substantivos que estruturam a frase são precisamente frequência (quanto ocorre) e distribuição (em quem, onde, quando), ambos governados pelos determinantes — os três conceitos que a professora desdobra no slide seguinte.\n\nB — errada. "História natural da doença" é um conceito adjacente, mas não é a definição da IEA, e a expressão "em indivíduos suscetíveis" contraria o caráter coletivo.\nC — errada. Essa é a frase de Alvan Feinstein definindo Epidemiologia Clínica (1968), não a definição da IEA para epidemiologia geral. Trocar uma pela outra é a confusão mais clássica deste bloco.\nD — errada. É a definição de Medicina Baseada em Evidência, do último terço da aula.\nE — errada. Descreve o estudo ecológico (Aula 3), que é um desenho de estudo, não a definição do campo.\n\nPegadinha: a prova adora embaralhar as três definições — IEA/1973 (epidemiologia), Feinstein/1968 (epidemiologia clínica) e Sackett (MBE). Memorize a palavra-âncora de cada uma: IEA = "coletividades humanas"; Feinstein = "métodos estatísticos e epidemiológicos"; MBE = "consciente, explícito e judicioso".`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `A Portaria nº 3.252/09 é citada na aula ao lado da definição ampliada de Epidemiologia. Qual é a atribuição que essa portaria vincula ao campo epidemiológico?`,
        interactionType: "multiple-choice",
        options: [
            `A) Criação da Medicina Baseada em Evidência como política de Estado, pois torna obrigatório o uso do PICO no SUS.`,
            `B) Instituição do coeficiente de correlação como medida oficial dos estudos ecológicos, pois padroniza a análise de dados secundários.`,
            `C) Vigilância e controle das doenças transmissíveis, não transmissíveis e agravos, pois a portaria amplia o escopo da vigilância para além das doenças infecciosas.`,
            `D) Notificação exclusiva de doenças de transmissão vetorial, pois foi editada em resposta a surtos de arboviroses.`,
            `E) Regulamentação dos ensaios clínicos randomizados no Brasil, pois define o padrão-ouro de evidência.`
        ],
        gabarito: `Alternativa C\nPor que C está certa: no slide, logo abaixo do parágrafo que define epidemiologia como ciência que estuda o processo saúde-doença na sociedade, aparece a caixa "Vigilância e controle das doenças transmissíveis, não transmissíveis e agravos" com a referência Portaria 3.252/09. A tríade completa — transmissíveis + não transmissíveis + agravos — é o ponto que a portaria consolida.\n\nA, B e E — erradas. Nenhuma dessas atribuições aparece no material. São enxertos plausíveis mas inventados, exatamente o tipo de distrator que se combate voltando ao slide.\nD — errada. Restringe a portaria ao vetorial; o texto do slide é explícito ao incluir as não transmissíveis.\n\nFixe a tríade: transmissíveis, não transmissíveis e agravos. Se uma alternativa citar só duas das três, ela está incompleta.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `A aula organiza a epidemiologia em torno de três conceitos: FREQUÊNCIA, DISTRIBUIÇÃO e DETERMINANTES. Um aluno precisa relacionar cada conceito ao ramo da epidemiologia correspondente. Assinale a correspondência correta.`,
        interactionType: "multiple-choice",
        options: [
            `A) Todos os três conceitos pertencem à epidemiologia descritiva, pois a analítica se ocupa apenas de ensaios clínicos.`,
            `B) Todos os três pertencem à epidemiologia analítica, pois descrever já é uma forma de explicar.`,
            `C) Distribuição (pessoa, espaço, tempo) → epidemiologia descritiva; determinantes (como e por quê) → epidemiologia analítica, pois a descritiva mapeia o padrão de ocorrência e a analítica testa hipóteses causais.`,
            `D) Distribuição → epidemiologia analítica; determinantes → epidemiologia descritiva, pois descrever a causa exige teste de hipótese.`,
            `E) Frequência → epidemiologia analítica; distribuição e determinantes → epidemiologia descritiva, pois só a contagem permite inferência.`
        ],
        gabarito: `Alternativa C\nPor que C está certa: o slide "Principais conceitos" faz duas setas explícitas. A primeira parte de DISTRIBUIÇÃO — desdobrada em quem adoece (pessoa), onde adoece (espaço) e quando adoece (tempo) — e aponta para Epidemiologia descritiva, rotulada "padrão de ocorrência da doença". A segunda parte de DETERMINANTES — desdobrada em como (forma de transmissão) e por quê (fatores de risco) — e aponta para Epidemiologia analítica, rotulada "busca de explicações (causas)".\n\nA — errada. Reduz a epidemiologia analítica a ensaios clínicos; transversal, caso-controle, coorte e ecológico são todos analíticos observacionais.\nB — errada. Descrever não é explicar — a própria aula diz que a descritiva "levanta pistas" e a analítica "comprova as associações causais".\nD — errada. Inverte exatamente as duas setas do slide.\nE — errada. A frequência é a mensuração/quantificação da ocorrência; ela alimenta os dois ramos, e a justificativa ("só a contagem permite inferência") é falsa.\n\nObjetivo educacional: este é o esqueleto conceitual da aula inteira. Pessoa-espaço-tempo = descritiva. Como e por quê = analítica.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre a relação entre epidemiologia descritiva e analítica, a aula sintetiza a diferença em duas frases-chave. Qual alternativa reproduz corretamente essa síntese?`,
        interactionType: "multiple-choice",
        options: [
            `A) Ambas comprovam associações causais, diferindo apenas quanto ao tamanho da amostra necessária.`,
            `B) A descritiva é sempre experimental e a analítica sempre observacional, pois descrever exige intervenção.`,
            `C) A descritiva estuda determinantes e a analítica estuda a distribuição, pois o determinante é um atributo descritivo.`,
            `D) A descritiva levanta "pistas" que permitirão elucidar as causas, enquanto a analítica comprova as associações causais; por isso a descritiva antecede e alimenta a analítica.`,
            `E) A descritiva comprova as associações causais e a analítica levanta pistas, pois a descrição já é um teste de hipótese.`
        ],
        gabarito: `Alternativa D\nPor que D está certa: o slide "EPIDEMIOLOGIA DESCRITIVA × ANALÍTICA" traz literalmente a faixa "Levanta 'pistas' que permitirão elucidar as causas (determinação) das doenças" ligada à descritiva, e a caixa "Comprova as associações causais" ligada à analítica. O texto do slide ainda explicita a sequência: os elementos da descritiva "fornecem os indícios iniciais sobre os determinantes" e "a partir desses elementos deve-se conduzir a formulação de hipóteses (...) por meio de estudos analíticos".\n\nA — errada. A descritiva não comprova causalidade em nenhum tamanho de amostra — a limitação é de desenho, não de n.\nB — errada. A descritiva é observacional (relato de caso, série de casos); a analítica inclui observacionais e experimentais.\nC — errada. Troca os objetos dos dois ramos.\nE — errada. Inversão literal.\n\nSequência a decorar: descrever (pessoa-espaço-tempo) → gerar hipótese → testar hipótese (analítico) → comprovar associação.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Qual é o objetivo central da epidemiologia descritiva, segundo o slide específico dedicado a ela?`,
        interactionType: "multiple-choice",
        options: [
            `A) Calcular razões de prevalência ajustadas, por meio de regressão multivariada.`,
            `B) Sintetizar evidências de múltiplos ensaios clínicos, por meio de metanálise.`,
            `C) Delinear o perfil epidemiológico das populações e possibilitar intervenções de saúde coletiva contextualizadas, por meio do estudo da frequência e da distribuição dos eventos em função de pessoa, lugar e tempo.`,
            `D) Estabelecer relações de causa e efeito entre exposições e desfechos, por meio do controle de fatores de confusão.`,
            `E) Avaliar a eficácia de intervenções terapêuticas, por meio da randomização de grupos.`
        ],
        gabarito: `Alternativa C\nPor que C está certa: reprodução direta do slide "EPIDEMIOLOGIA DESCRITIVA", que fecha com o triângulo TEMPO–PESSOA–LUGAR. Note as duas metades do objetivo: delinear o perfil (função de conhecimento) e possibilitar intervenções contextualizadas (função prática) — a descritiva não é um exercício estéril, ela orienta a ação de saúde coletiva.\n\nA — errada. RP ajustada pressupõe modelagem analítica.\nB — errada. Metanálise é o topo da pirâmide de evidência, não epidemiologia descritiva.\nD — errada. Causa e efeito é território da analítica; o próprio estudo seccional, que é analítico observacional, já esbarra nessa limitação.\nE — errada. Randomização = ensaio clínico randomizado, desenho experimental.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Um grupo de pesquisa observou, em levantamento municipal, que a frequência de doença cardiovascular é maior nos bairros com maior proporção de tabagistas. Diante disso, formulou a pergunta: "O tabagismo aumenta o risco de doença cardiovascular?" e planejou um estudo quantitativo para testá-la. Segundo a lógica apresentada na Aula 1, essa sequência corresponde a:`,
        interactionType: "multiple-choice",
        options: [
            `A) Estudo descritivo puro, pois nenhuma associação foi ainda quantificada.`,
            `B) Observação da frequência e distribuição → formulação de hipótese → estudo analítico, pois é exatamente o encadeamento que o slide de epidemiologia analítica descreve.`,
            `C) Estudo analítico → formulação de hipótese → observação da distribuição, pois a hipótese só surge depois do teste estatístico.`,
            `D) Ensaio clínico randomizado seguido de revisão sistemática, pois toda hipótese causal exige intervenção.`,
            `E) Aplicação do PICO seguida de metanálise, pois a pergunta contém paciente, intervenção, comparação e desfecho.`
        ],
        gabarito: `Alternativa B\nPor que B está certa: o slide "EPIDEMIOLOGIA ANALÍTICA" apresenta o fluxo com duas setas descendentes: Observação da frequência e distribuição de um evento relacionado à saúde-doença e de seus determinantes ↓ Formulação de hipóteses (com os exemplos "Existe associação entre atividade física e tabagismo?" e "O tabagismo aumenta o risco de doença cardiovascular?") ↓ Estudos analíticos: estudos quantitativos com teste de hipóteses. O enunciado é uma paráfrase desse fluxo.\n\nA — errada. A etapa descritiva já ocorreu; o que se planeja agora é analítico.\nC — errada. Inverte o fluxo. A hipótese precede o teste, por definição.\nD — errada. Nem toda hipótese causal exige ECR; exposições como tabagismo não podem ser randomizadas por razões éticas — daí a importância dos observacionais analíticos.\nE — errada. O PICO é ferramenta da MBE para formular a pergunta de busca, e a pergunta do enunciado sequer tem "intervenção" e "comparação" explícitas.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre a origem histórica da Epidemiologia Clínica, assinale a alternativa que associa corretamente autor, ano e contribuição.`,
        interactionType: "multiple-choice",
        options: [
            `A) Ambas são de Dawson e cols. (1968), pois o estudo do lítio na água inaugurou a epidemiologia clínica.`,
            `B) A primeira menção é de Sackett (1996) e a fundação é da Cochrane (1993), pois a MBE precede a epidemiologia clínica.`,
            `C) A primeira menção ao termo é atribuída a Paul (1938), e o fundador da disciplina é Alvan Feinstein (1968), pois Paul apenas propôs a ideia e Feinstein a estruturou metodologicamente.`,
            `D) A primeira menção é de Feinstein (1938) e a fundação é de Paul (1968), pois Feinstein antecedeu Paul em três décadas.`,
            `E) Ambas as contribuições são de Durkheim (século XIX), pois foi ele quem primeiro correlacionou variáveis populacionais.`
        ],
        gabarito: `Alternativa C\nPor que C está certa: o slide "O que é Epidemiologia Clínica?" abre com "Primeira menção a Epidemiologia Clínica: 'Uma nova ciência básica para a medicina preventiva, na qual a exploração de aspectos relevantes da ecologia humana e da saúde pública começaria com o estudo de pacientes individuais' (PAUL, 1938)". Três slides adiante, a definição formal é creditada a "Alvan Feinstein — fundador da epidemiologia clínica (1968)".\n\nA — errada. Dawson e cols. (1968) é a origem dos estudos ecológicos (sais de lítio na água × internações por psicose maníaco-depressiva). Coincide o ano com Feinstein, e é aí que a prova arma a armadilha.\nB — errada. A MBE é descrita na aula como evolução da epidemiologia clínica, portanto vem depois, não antes.\nD — errada. Inverte nomes e anos.\nE — errada. Durkheim aparece na Aula 3, como exemplo clássico de falácia ecológica (protestantes × suicídio na Prússia) — outro campo inteiramente.\n\nPegadinha do ano 1968: dois marcos diferentes compartilham esse ano — Feinstein (funda a epidemiologia clínica, Aula 1) e Dawson (inaugura o estudo ecológico, Aula 3). Não troque um pelo outro.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Assinale a alternativa que contém a definição de Epidemiologia Clínica tal como apresentada na aula.`,
        interactionType: "multiple-choice",
        options: [
            `A) Conjunto de técnicas estatísticas destinadas a calcular prevalência, incidência e razão de prevalência em amostras representativas.`,
            `B) Abordagem que substitui o raciocínio clínico pela aplicação automática de diretrizes derivadas de ensaios randomizados.`,
            `C) Ramo da epidemiologia que se ocupa exclusivamente de doenças raras, por meio de relatos e séries de casos.`,
            `D) Ciência básica para a medicina clínica que estuda eventos clínicos em um grupo de pacientes similares, com métodos científicos rigorosos, para produzir informações válidas e acuradas necessárias ao cuidado dos pacientes.`,
            `E) Ciência que estuda a distribuição de doenças em agregados populacionais delimitados geograficamente, com o fim de gerar hipóteses etiológicas.`
        ],
        gabarito: `Alternativa D\nPor que D está certa: transcrição do slide "Definição: EPIDEMIOLOGIA CLÍNICA". Repare nos três elementos que a definição amarra: (1) grupo de pacientes similares — mantém o caráter coletivo herdado da epidemiologia; (2) métodos científicos rigorosos — herança metodológica; (3) cuidado dos pacientes — finalidade clínica. É exatamente a fusão que o esquema anterior mostra: Epidemiologia Tradicional + Medicina Clínica = Epidemiologia Clínica.\n\nA — errada. Reduz a disciplina a um kit de fórmulas; a epidemiologia clínica é uma ciência básica, não uma calculadora.\nB — errada. Contraria frontalmente o slide da 4ª etapa da MBE: "a prática da MBE não substitui o raciocínio clínico".\nC — errada. Doenças raras via relato/série de casos é epidemiologia descritiva.\nE — errada. Descreve o estudo ecológico.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `A Epidemiologia Clínica "teve papel central em cinco processos necessários à tomada de decisões em saúde". Assinale a alternativa que apresenta esses cinco processos na ordem correta.`,
        interactionType: "multiple-choice",
        options: [
            `A) Formulação da questão → busca → avaliação crítica → aplicação → avaliação do desfecho.`,
            `B) Randomização → cegamento → análise → publicação → replicação.`,
            `C) Planejamento → execução → análise → divulgação → arquivamento.`,
            `D) Geração das evidências → busca das evidências → avaliação crítica das evidências → aplicação das evidências → síntese das evidências.`,
            `E) Busca → geração → aplicação → síntese → avaliação crítica.`
        ],
        gabarito: `Alternativa D\nPor que D está certa: a faixa horizontal do slide "EPIDEMIOLOGIA CLÍNICA — cinco processos" lista, da esquerda para a direita: GERAÇÃO DE EVIDÊNCIAS → BUSCA DAS EVIDÊNCIAS → AVALIAÇÃO CRÍTICA DAS EVIDÊNCIAS → APLICAÇÃO DAS EVIDÊNCIAS → SÍNTESE DAS EVIDÊNCIAS.\n\nA — errada. Distrator de altíssimo risco: essas são as 5 etapas da MBE (formular a questão via PICO, buscar, avaliar criticamente, aplicar, avaliar o desfecho), não os cinco processos da epidemiologia clínica. Os dois conjuntos têm cinco itens e três palavras em comum — separe-os com cuidado.\nB — errada. Descreve etapas de um ensaio clínico.\nC — errada. São as fases do estudo seccional (Aula 2), e nem essas estão certas — lá são três fases, não cinco.\nE — errada. Ordem embaralhada; não se busca antes de existir evidência gerada.\n\nObjetivo educacional: saber distinguir as duas listas de cinco. Regra prática: se a lista começa em "formular uma questão", é MBE; se começa em "geração de evidências", é epidemiologia clínica.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `O esquema da aula posiciona a Epidemiologia Clínica na interseção entre a Epidemiologia Tradicional e a Medicina Clínica. Qual alternativa descreve corretamente o que cada campo aporta a essa interseção?`,
        interactionType: "multiple-choice",
        options: [
            `A) Da Epidemiologia Tradicional vem o cuidado individual e da Medicina Clínica vêm os indicadores populacionais, invertendo-se os papéis clássicos.`,
            `B) Ambos os campos aportam apenas ferramentas estatísticas, e a epidemiologia clínica é o nome dado à bioestatística médica.`,
            `C) A interseção elimina o componente populacional, restringindo-se ao paciente individual.`,
            `D) A interseção elimina o componente clínico, restringindo-se à vigilância epidemiológica.`,
            `E) Da Epidemiologia Tradicional vêm distribuição, determinantes e indicadores populacionais; da Medicina Clínica vêm o entender/tratar a doença e o manejo de pacientes; da fusão resulta a aplicação de métodos epidemiológicos a indivíduos e grupos.`
        ],
        gabarito: `Alternativa E\nPor que E está certa: o slide organiza duas colunas. À esquerda, sob "Epidemiologia Tradicional": entender o processo saúde-doença; distribuição e fatores determinantes; danos à saúde e eventos associados; prevenção, controle ou erradicação; indicadores; avaliação das ações de saúde. À direita, sob "Medicina Clínica → Epidemiologia Clínica": entender e tratar a doença; melhorar o diagnóstico e o manejo de pacientes; indivíduos e grupos. A expressão "indivíduos e grupos" é a assinatura da síntese.\n\nA — errada. Inverte as contribuições.\nB — errada. Reduz tudo à bioestatística.\nC e D — erradas. A epidemiologia clínica não elimina nenhum dos dois polos; ela os articula. O slide "Epidemiologia Clínica" explicita: "estudar grupos de pessoas" + "aplicar princípios e métodos de investigação epidemiológica na pesquisa clínica" → "evidência básica para a tomada de decisão".`
    },
    {
        type: "DISCURSIVA",
        text: `Explique, com base na Aula 1, por que a Epidemiologia Clínica é descrita como "ciência básica para a medicina clínica" e como ela se articula com a Medicina Baseada em Evidência. Cite o autor considerado fundador e o ano.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\nA resposta deve articular quatro elementos:\n\n1. O sentido de "ciência básica" (2,5 pts). Assim como a fisiologia ou a bioquímica fornecem o substrato conceitual para a prática clínica, a epidemiologia clínica fornece o substrato metodológico: ela ensina como produzir e como julgar informação válida sobre diagnóstico, risco, tratamento e prognóstico. Ela não é uma especialidade clínica, é uma base.\n\n2. O objeto (2,5 pts). Estuda eventos clínicos em grupos de pacientes similares, usando métodos científicos rigorosos e adequados, com o objetivo de produzir informações válidas e acuradas necessárias ao cuidado dos pacientes. O aluno deve mostrar que o caráter coletivo é preservado — não se estuda um paciente, estuda-se um grupo semelhante ao paciente que se tem à frente.\n\n3. A articulação com a MBE (3,0 pts). A aula afirma que a MBE é a "forma moderna de aplicação da epidemiologia clínica no cuidado das pessoas" e a "evolução da epidemiologia clínica". Ou seja: a epidemiologia clínica produz e qualifica a evidência; a MBE é o processo estruturado (5 etapas) pelo qual essa evidência chega à beira do leito, integrada à experiência clínica e aos valores da pessoa.\n\n4. Autoria (2,0 pts). Alvan Feinstein, fundador, em 1968. Ponto extra se citar também a primeira menção ao termo por Paul, 1938.\n\nErro que zera parte da nota: dizer que a MBE substitui o julgamento clínico. A aula é explícita no sentido contrário ("a prática da MBE não substitui o raciocínio clínico" e "a evidência a partir da pesquisa não é o único fator determinante na tomada de decisão clínica").`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Quanto à classificação geral dos estudos epidemiológicos apresentada na aula, assinale a alternativa correta.`,
        interactionType: "multiple-choice",
        options: [
            `A) A diferença entre os dois grupos é apenas o tamanho amostral, sendo os experimentais sempre maiores.`,
            `B) Todos os estudos analíticos são experimentais, e todos os descritivos são observacionais.`,
            `C) Estudos ecológicos são experimentais, pois manipulam dados agregados de múltiplas populações.`,
            `D) Nos estudos observacionais o pesquisador não intervém, apenas observa e compara o efeito em grupos expostos e de controle; nos de intervenção o pesquisador determina o fator, a intensidade e o grupo de exposição.`,
            `E) Nos observacionais o pesquisador determina a exposição, e nos de intervenção apenas observa, pois a observação exige controle experimental.`
        ],
        gabarito: `Alternativa D\nPor que D está certa: os dois slides "TIPOS DE ESTUDO EM EPIDEMIOLOGIA" definem literalmente assim. Observacionais: "O pesquisador não intervém no estudo. Apenas observa e compara o efeito em grupos expostos e de controle". Intervenção (experimentais): "O pesquisador intervém determinando o fator, a intensidade e o grupo de exposição. Geralmente experimenta métodos para controle ou prevenção do fenômeno".\n\nA — errada. A diferença é de desenho (há ou não manipulação da exposição), não de tamanho.\nB — errada. Distrator forte: os observacionais se subdividem em descritivos (relato de caso, série de casos) e analíticos (transversal, caso-controle, coorte, ecológico). Portanto existem analíticos observacionais — a maioria deles, aliás.\nC — errada. O ecológico é observacional analítico; usar dados secundários agregados não é intervir.\nE — errada. Inversão pura.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Assinale a alternativa em que todos os desenhos citados pertencem ao grupo indicado, conforme a Aula 1.`,
        interactionType: "multiple-choice",
        options: [
            `A) Estudos de intervenção: coorte prospectiva, transversal e ensaio comunitário.`,
            `B) Observacionais analíticos: transversal, caso-controle, coorte e ecológico.`,
            `C) Observacionais descritivos: coorte, caso-controle e ensaio de campo.`,
            `D) Estudos de intervenção: ensaio clínico randomizado, série de casos e estudo ecológico.`,
            `E) Observacionais analíticos: relato de caso, série de casos e transversal.`
        ],
        gabarito: `Alternativa B\nPor que B está certa: o slide separa em duas caixas. "ESTUDOS DESCRITIVOS — descrever a distribuição dos agravos e a distribuição de seus determinantes: relato de caso; série de casos." E "ESTUDOS ANALÍTICOS — testar hipóteses sobre a associação entre determinante e agravo: transversal; caso-controle; coorte; ecológico". Os quatro da alternativa B batem exatamente.\n\nA — errada. Coorte e transversal são observacionais. Só o ensaio comunitário é de intervenção.\nC — errada. Coorte e caso-controle são analíticos; ensaio de campo é de intervenção.\nD — errada. Série de casos é descritivo observacional; ecológico é analítico observacional. Só o ECR está no lugar certo.\nE — errada. Relato de caso e série de casos são descritivos.\n\nLista fechada dos três de intervenção: ensaio clínico randomizado, ensaio de campo, ensaio comunitário. Qualquer outro nome numa lista de "intervenção" derruba a alternativa.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Um pesquisador precisa descrever a incidência e a história natural de uma condição, acompanhando um grupo definido de pessoas ao longo do tempo e comparando desfechos a partir da exposição. Qual desenho é o mais adequado e por quê?`,
        interactionType: "multiple-choice",
        options: [
            `A) Seccional, pois é o "retrato" da situação e mede exposição e desfecho simultaneamente.`,
            `B) Caso-controle, pois é retrospectivo e parte da doença para a exposição, permitindo estimar incidência.`,
            `C) Ecológico, pois compara agregados populacionais ao longo do tempo em séries temporais.`,
            `D) Ensaio clínico randomizado, pois é o padrão-ouro e por isso serve para qualquer pergunta.`,
            `E) Coorte, pois é estudo longitudinal, prospectivo e observacional, sendo o desenho mais adequado para descrição de incidência e história natural de uma condição.`
        ],
        gabarito: `Alternativa E\nPor que E está certa: o slide da Aula 2 define coorte como "estudo longitudinal, prospectivo e observacional, em que um grupo definido de pessoas (coorte) é acompanhado durante um período de tempo. Os desfechos são comparados a partir da exposição, ou não (...). É o desenho de estudo mais adequado para a descrição de incidência e história natural de uma condição". A frase final é literal.\n\nA — errada. O seccional mede prevalência, não incidência; é um retrato instantâneo, incompatível com "história natural".\nB — errada. A primeira metade está certa (retrospectivo, parte da doença), mas a justificativa está errada: o caso-controle não estima incidência, porque a proporção de casos e controles é definida pelo pesquisador.\nC — errada. O ecológico trabalha com agregados e não permite inferência individual.\nD — errada. Ser padrão-ouro para avaliar intervenções não o torna adequado a toda pergunta — descrever história natural de uma doença não envolve intervenção.\n\nAtenção ao formato do professor: a alternativa B traz a resposta parcialmente correta com uma justificativa falsa. Nesse formato, justificativa errada = alternativa errada, mesmo que o nome do estudo pareça plausível.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre o ensaio clínico randomizado (ECR), conforme apresentado nas aulas, é correto afirmar:`,
        interactionType: "multiple-choice",
        options: [
            `A) É o padrão-ouro para estimar prevalência, pois a randomização garante representatividade da população geral.`,
            `B) É um estudo observacional de alta qualidade, pois o pesquisador não interfere na alocação.`,
            `C) É retrospectivo, pois parte do desfecho para identificar a intervenção recebida.`,
            `D) Ocupa a base da pirâmide da evidência científica, pois avalia apenas um desfecho por vez.`,
            `E) É o estudo padrão-ouro para avaliar intervenções; é prospectivo, e a intervenção é testada em pelo menos dois grupos aleatórios de indivíduos, por um tempo determinado.`
        ],
        gabarito: `Alternativa E\nPor que E está certa: literal do slide: "É o estudo padrão-ouro para se avaliar intervenções. É um estudo prospectivo, onde uma intervenção será testada em pelo menos dois grupos aleatórios de indivíduos, por um tempo determinado."\n\nA — errada. Prevalência é o produto do estudo seccional. Randomizar não é amostrar: randomização é alocação em grupos; amostragem é seleção da população de estudo.\nB — errada. O ECR é experimental por definição — o pesquisador determina quem recebe o quê.\nC — errada. Retrospectivo, partindo do desfecho, é o caso-controle.\nD — errada. Na pirâmide, o ECR está próximo ao topo (abaixo apenas das revisões sistemáticas/metanálises); a base é ocupada por opinião de especialista e estudos experimentais básicos.`
    },
    {
        type: "DISCURSIVA",
        text: `A Aula 1 apresenta a "Pirâmide da Evidência Científica" e afirma, entre os princípios da MBE, que "não existe um mesmo nível de evidência". Explique o que essa pirâmide representa, qual a lógica de sua hierarquia e por que a professora questiona, em slide próprio, se "todas as fontes de informação têm a mesma qualidade científica".`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n1. O que a pirâmide representa (3,0 pts). É uma hierarquia dos delineamentos de pesquisa segundo a força da evidência que produzem, ou seja, segundo o grau de proteção que cada desenho oferece contra viés e confundimento. Quanto mais alto na pirâmide, menor a probabilidade de que a associação observada seja artefato.\n\n2. A lógica da hierarquia (3,0 pts). Da base para o topo: opinião de especialista / estudos básicos → relato e série de casos → estudos transversais (seccional) e ecológicos → caso-controle → coorte → ensaio clínico randomizado → revisões sistemáticas e metanálises. O critério que faz um desenho subir é o controle sobre a temporalidade e sobre a alocação da exposição: o seccional está baixo porque mede exposição e desfecho ao mesmo tempo e não estabelece causa e efeito; a coorte sobe porque a exposição precede o desfecho; o ECR sobe mais porque a alocação é aleatória, distribuindo confundidores conhecidos e desconhecidos.\n\n3. O sentido da pergunta da professora (3,0 pts). O slide contrapõe fontes cotidianas de informação médica — conversa com colegas, conversa com representantes farmacêuticos, experiência profissional, artigos de revisão, revistas médicas — e pergunta se todas produzem evidência de igual qualidade. A resposta é não: essas fontes ocupam posições muito diferentes na hierarquia, e algumas (representante farmacêutico, por exemplo) carregam conflito de interesse explícito. Daí o primeiro princípio da MBE: "não existe um mesmo nível de evidência: há necessidade de identificar a hierarquia de evidências para a tomada de decisão".\n\n4. Complemento valorizado (1,0 pt). Citar o segundo princípio — "somente o nível de evidências nunca é suficiente" — mostrando que o topo da pirâmide não decide sozinho: é preciso contrabalançar risco e benefício das alternativas no contexto dos valores e preferências da pessoa.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Assinale a alternativa que traz corretamente a definição de Medicina Baseada em Evidência adotada na aula e sua relação com a epidemiologia clínica.`,
        interactionType: "multiple-choice",
        options: [
            `A) É a padronização de condutas por protocolo institucional, dispensando a avaliação crítica individual dos artigos.`,
            `B) É o estudo dos determinantes de frequência e distribuição das doenças em coletividades humanas, conforme a IEA (1973).`,
            `C) É o "uso consciente, explícito e judicioso das melhores evidências disponíveis atualmente para a tomada de decisões acerca do cuidado dos pacientes", sendo descrita como a evolução e a forma moderna de aplicação da epidemiologia clínica.`,
            `D) É o uso exclusivo de ensaios clínicos randomizados na decisão clínica, substituindo a epidemiologia clínica, que se tornou obsoleta.`,
            `E) É a aplicação de métodos estatísticos ao processo diagnóstico e terapêutico, definição proposta por Feinstein em 1968.`
        ],
        gabarito: `Alternativa C\nPor que C está certa: os dois pedaços vêm do mesmo slide. A definição — "A MBE é o uso consciente, explícito e judicioso das melhores evidências disponíveis atualmente para a tomada de decisões acerca do cuidado dos pacientes" — e o posicionamento — "A forma moderna de aplicação da epidemiologia clínica no cuidado das pessoas" / "Evolução da epidemiologia clínica".\n\nA — errada. A 3ª etapa da MBE é justamente a avaliação crítica — dispensá-la desmonta o método.\nB — errada. É a definição da IEA para epidemiologia.\nD — errada. Duas falhas: a MBE não usa exclusivamente ECR (usa a melhor evidência disponível, que pode ser observacional), e não torna a epidemiologia clínica obsoleta — é sua evolução, o que pressupõe continuidade.\nE — errada. É a definição de epidemiologia clínica por Feinstein.\n\nObjetivo educacional: as três palavras da definição — consciente, explícito e judicioso — costumam ser cobradas literalmente. Consciente = deliberado; explícito = com critérios declarados e rastreáveis; judicioso = com julgamento, ponderando contexto.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Segundo a aula, a MBE "integra a melhor evidência atual, a experiência clínica e os valores das pessoas para otimizar os desfechos clínicos e a qualidade de vida". Com base nisso, avalie a conduta descrita: um médico encontra uma revisão sistemática favorável a determinado anticoagulante, mas a paciente, plenamente informada, recusa o esquema por incompatibilidade com sua rotina e prefere alternativa de eficácia ligeiramente menor. O médico acata a preferência e registra a decisão. Essa conduta:`,
        interactionType: "multiple-choice",
        options: [
            `A) É indiferente à MBE, pois a MBE só se aplica a decisões diagnósticas, não terapêuticas.`,
            `B) Contraria a MBE, pois a experiência clínica individual foi ignorada em favor da revisão sistemática.`,
            `C) Está de acordo com a MBE apenas se a revisão sistemática tiver baixo nível de evidência, o que não foi informado.`,
            `D) Está de acordo com a MBE, pois a evidência da pesquisa não é o único fator determinante na tomada de decisão clínica, que deve contrabalançar riscos, benefícios, valores e preferências da pessoa.`,
            `E) Contraria a MBE, pois a melhor evidência disponível deve prevalecer sobre a preferência do paciente.`
        ],
        gabarito: `Alternativa D\nPor que D está certa: dois slides sustentam a resposta. O primeiro afirma que "a evidência a partir da pesquisa não é o único fator determinante na tomada de decisão clínica". O segundo, nos princípios, diz que "somente o nível de evidências nunca é suficiente: há necessidade de fazer um contrabalanço entre risco e benefício das estratégias alternativas no contexto dos valores e preferências das pessoas". A 4ª etapa reforça: o processo decisório combina estudos com validade científica, experiência clínica individual e preferências da pessoa.\n\nA — errada. A 1ª etapa cita explicitamente questões de diagnóstico, tratamento, prognóstico e etiologia.\nB — errada. A experiência clínica não foi ignorada; o médico julgou e decidiu.\nC — errada. Condiciona a validade da conduta ao nível da evidência, quando o princípio vale independentemente do nível.\nE — errada. Transforma a MBE em tirania da evidência, exatamente o que a aula rejeita.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `A aula lista as razões pelas quais o médico "precisa" da Medicina Baseada em Evidências. Assinale a alternativa que reúne essas razões.`,
        interactionType: "multiple-choice",
        options: [
            `A) Literatura médica extensa e grande volume de publicações; sobrecarga de informações; e o fato de as informações disponíveis apresentarem problemas metodológicos (viés).`,
            `B) Escassez de publicações científicas; ausência de bases de dados em saúde; e proibição legal do uso de opinião de especialista.`,
            `C) Necessidade de reduzir custos hospitalares; exigência de conselhos profissionais; e padronização de prontuários.`,
            `D) Impossibilidade de realizar ensaios clínicos no Brasil; dependência de dados secundários; e falácia ecológica.`,
            `E) Aumento da expectativa de vida; transição epidemiológica; e envelhecimento populacional.`
        ],
        gabarito: `Alternativa A\nPor que A está certa: o slide "Por que o médico precisa da medicina baseada em evidências?" traz exatamente três marcadores: ❑ Literatura médica extensa/volume de publicações; ❑ Sobrecarga de informações; ❑ Informações disponíveis apresentam problemas metodológicos (viés).\n\nB — errada. Inverte o diagnóstico: o problema é excesso, não escassez.\nC — errada. Razões administrativas não constam do slide.\nD — errada. Mistura conceitos da Aula 3 (dados secundários, falácia ecológica) num contexto que não é o deles.\nE — errada. São fenômenos demográficos reais, mas não são as razões listadas para a MBE.\n\nPonto sutil: a terceira razão é a mais importante e a mais esquecida — não basta haver muita informação; parte dela é metodologicamente ruim. É isso que torna a 3ª etapa (avaliação crítica) indispensável.`
    }
];

let content = fs.readFileSync('src/gis2_all.ts', 'utf8');
content = content.replace(/\];\s*$/, '');
for (let q of newQuestions) {
    content += '    {\n';
    content += `        type: "${q.type}",\n`;
    content += `        text: \`${q.text.replace(/`/g, '\\`')}\`,\n`;
    content += `        interactionType: "${q.interactionType}",\n`;
    if (q.options) {
        content += `        options: [\n`;
        content += q.options.map(opt => `            \`${opt.replace(/`/g, '\\`')}\``).join(',\n');
        content += `\n        ],\n`;
    }
    content += `        gabarito: \`${q.gabarito.replace(/`/g, '\\`')}\`\n`;
    content += '    },\n';
}
content += '];\n';
fs.writeFileSync('src/gis2_all.ts', content);
console.log("Appended Q1-20.");
