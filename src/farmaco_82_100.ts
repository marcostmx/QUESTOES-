export const farmaco_82_100 = [
  {
    "type": "MÚLTIPLA ESCOLHA",
    "interactionType": "multiple-choice",
    "text": "Sobre a sequência de ativação de um receptor acoplado à proteína G, julgue os itens em verdadeiro (V) ou falso (F):\n\nI. Na ausência do ligante, a subunidade G-α encontra-se ligada ao GTP, configurando o estado de repouso.\nII. A ligação do agonista provoca alteração conformacional que leva à liberação do GDP e ao acoplamento do GTP.\nIII. Após a ativação, o heterotrímero se dissocia, e as subunidades β e γ podem exercer funções próprias, como a abertura de canais iônicos.\nIV. O retorno ao estado basal depende da hidrólise do GTP a GDP pela própria subunidade α.",
    "options": [
      "A) V – V – V – V",
      "B) F – V – V – V",
      "C) V – F – V – F",
      "D) F – V – F – V",
      "E) V – V – F – F"
    ],
    "answer": "B",
    "gabarito": "**Alternativa B — F · V · V · V**\n\n**I — F.** Inversão do estado basal. Na ausência do ligante, a subunidade G-α está ligada ao GDP — forma INATIVA. A forma ativa é a ligada ao GTP. Este é o erro mais cobrado do tema.\n**II — V.** A ligação do agonista provoca alteração conformacional no receptor e na subunidade α, que perde a afinidade pelo GDP: o GDP sai, o GTP entra. É a troca de nucleotídeo que \"liga\" o sistema.\n**III — V.** Após a ativação, o heterotrímero se dissocia: a α-GTP segue para a proteína efetora e o dímero βγ exerce funções próprias — notadamente a modulação de canais iônicos. O βγ não é um espectador.\n**IV — V.** A própria subunidade α tem atividade GTPásica intrínseca: ela hidrolisa o GTP a GDP, se reassocia ao βγ e o sistema retorna ao estado basal. É um temporizador embutido — a sinalização se autolimita, sem necessidade de nenhum sinal de desligamento externo."
  },
  {
    "type": "MÚLTIPLA ESCOLHA",
    "interactionType": "multiple-choice",
    "text": "Assinale a alternativa que relaciona corretamente cada subtipo de proteína G à enzima efetora que ele mobiliza e ao segundo mensageiro resultante.",
    "options": [
      "A) Gs ativa a fosfolipase C, gerando IP3 e DAG; Gi ativa a adenilil ciclase, elevando o AMPc; Gq inibe a adenilil ciclase.",
      "B) Gs inibe a adenilil ciclase, reduzindo o AMPc; Gi ativa a adenilil ciclase; Gq ativa a guanilil ciclase, gerando GMPc.",
      "C) Gs ativa a adenilil ciclase, elevando o AMPc e a PKA; Gi inibe a adenilil ciclase, reduzindo o AMPc e a PKA; Gq ativa a fosfolipase C, gerando IP3 e DAG.",
      "D) Gs, Gi e Gq convergem para a mesma enzima efetora — a adenilil ciclase — diferindo apenas na intensidade da resposta.",
      "E) Gs ativa a fosfolipase C; Gi abre canais de cálcio dependentes de voltagem; Gq ativa a PKA diretamente, sem segundo mensageiro."
    ],
    "answer": "C",
    "gabarito": "**Alternativa C**\n\n**Por que C está certa:** é a única que preserva as três associações canônicas. **Gs → ativa** a adenilil ciclase → **↑ AMPc → ↑ PKA**. **Gi → inibe** a adenilil ciclase → **↓ AMPc → ↓ PKA**. **Gq → ativa** a fosfolipase C → gera **IP3 + DAG** → Ca²⁺ do retículo e ativação da PKC. Repare na economia do sistema: **Gs e Gi compartilham a mesma enzima** (adenilil ciclase) e diferem apenas no sentido — uma liga, a outra desliga. Só a **Gq** usa uma enzima diferente.\n\n**A — ERRADA.** Embaralha as três: dá a fosfolipase C à Gs, faz a Gi ativar a adenilil ciclase e atribui à Gq a inibição da adenilil ciclase.\n**B — ERRADA.** Inverte Gs e Gi (a Gs **estimula**, como o próprio \"s\" indica) e inventa uma via de guanilil ciclase para a Gq — a guanilil ciclase existe e produz GMPc, mas pertence à sinalização do óxido nítrico, não à Gq.\n**D — ERRADA.** As três não convergem para a mesma enzima: a Gq mobiliza a **fosfolipase C**. Além disso, a diferença entre Gs e Gi não é \"intensidade\", e sim **sentido oposto**.\n**E — ERRADA.** Erra as três atribuições e ainda afirma que a Gq ativaria a PKA \"diretamente, sem segundo mensageiro\" — o que contraria a própria definição de receptor **metabotrópico**, cuja assinatura é justamente a existência de segundos mensageiros."
  },
  {
    "type": "MÚLTIPLA ESCOLHA",
    "interactionType": "multiple-choice",
    "text": "A dessensibilização de receptores acoplados à proteína G (GPCRs) explica a redução da resposta farmacológica ao longo do tempo mesmo com o agonista presente continuamente. Julgue:\n\nI. A dessensibilização é irreversível.\nII. Muitos GPCRs são regulados por fosforilação via GRK (cinase do receptor acoplado à proteína G).\nIII. A β-arrestina se liga ao receptor fosforilado, promovendo endocitose e podendo permitir reciclagem/ressensibilização.\nIV. Para manter a resposta clínica, muitas vezes aumenta-se a dose, elevando o risco de efeitos colaterais.",
    "options": [
      "A) Apenas I, II e III.",
      "B) Apenas I e IV.",
      "C) II, III e IV.",
      "D) Apenas II e III.",
      "E) Todas estão corretas."
    ],
    "answer": "C",
    "gabarito": "**Alternativa C — itens II, III e IV**\n\n**I — INCORRETO (é o item que decide a questão).** A dessensibilização é **REVERSÍVEL**. A prova disso está no próprio item III: existe **ressensibilização**, com desfosforilação do receptor e **reciclagem de volta à membrana**. Se fosse irreversível, o fenômeno não teria nome oposto.\n**II — CORRETO.** As **GRKs** (cinases de receptores acoplados à proteína G) reconhecem e **fosforilam seletivamente o receptor OCUPADO pelo agonista** — mecanismo elegante, que dessensibiliza apenas os receptores que estão sendo estimulados em excesso.\n**III — CORRETO.** A fosforilação cria sítio de ancoragem para a **β-arrestina**, que **desacopla** o receptor da proteína G e promove sua **internalização por endocitose**. O receptor internalizado pode ser desfosforilado e **reciclado** à membrana (ressensibilização) ou encaminhado a degradação lisossomal (*down-regulation*).\n**IV — CORRETO.** É a tradução clínica do fenômeno: com menos receptores funcionais, mantém-se a resposta **aumentando a dose** — o que amplia proporcionalmente a exposição sistêmica e o **risco de efeitos adversos**. É a base farmacológica da **tolerância**."
  },
  {
    "type": "DISCURSIVA",
    "interactionType": "textarea",
    "text": "A cascata da proteína G e os segundos mensageiros\na. Descreva, em ordem, as etapas da ativação de um receptor acoplado à proteína G, desde o estado de repouso até o retorno ao basal.\nb. Qual subunidade da proteína G carrega o nucleotídeo de guanina e qual das duas formas (GDP ou GTP) corresponde ao estado ativo? Justifique por que essa distinção é funcionalmente decisiva.\nc. Explique o que acontece com as subunidades β e γ após a dissociação do heterotrímero.\nd. Descreva integralmente a via Gq, nomeando a enzima efetora, os dois segundos mensageiros gerados, o destino de cada um deles e o efeito final sobre o músculo liso.",
    "gabarito": "**(a) Etapas, em ordem.** (1) Estado de repouso: receptor e heterotrímero (α, β, γ) formam complexo na membrana, com a subunidade **α ligada ao GDP**. (2) O ligante se acopla ao receptor. (3) Receptor e subunidade α sofrem **alteração de conformação**, com liberação do GDP e **acoplamento do GTP**. (4) Ativação do complexo. (5) **Dissociação:** β e γ se separam da α e exercem funções próprias, como a abertura de canais iônicos. (6) A α-GTP encontra e interage com a **proteína efetora** (adenilil ciclase ou fosfolipase C). (7) **Hidrólise do GTP a GDP** pela atividade GTPásica da própria α, com reassociação do heterotrímero e retorno ao estado basal.\n\n**(b) Subunidade e forma ativa.** O nucleotídeo de guanina é carregado pela **subunidade α**. A forma **ATIVA** é a ligada ao **GTP**; a ligada ao **GDP é inativa**. A distinção é funcionalmente decisiva porque é ela que confere ao sistema um **interruptor com temporizador embutido**: a própria α hidrolisa o GTP e se desliga sozinha, garantindo que a sinalização seja **transitória e autolimitada**. Sem essa hidrólise, o sinal permaneceria permanentemente ligado — exatamente o que ocorre na intoxicação pela toxina colérica.\n\n**(c) O dímero βγ.** Após a dissociação, β e γ **não são inertes**: permanecem associados entre si e exercem funções sinalizadoras próprias, notadamente a **modulação direta de canais iônicos** — como a abertura de canais de potássio em células cardíacas, responsável em parte pela bradicardia mediada por M2. Participam ainda do recrutamento de GRKs e da regulação de outras enzimas efetoras.\n\n**(d) A via Gq completa.** A proteína **Gq** ativada estimula a **fosfolipase C**, que hidrolisa fosfolipídios de membrana (PIP2) gerando dois segundos mensageiros. O **IP3 (inositol trifosfato)** é hidrossolúvel, difunde pelo citosol e **libera cálcio do retículo** endoplasmático/sarcoplasmático. O **DAG (diacilglicerol)** permanece ancorado na membrana e, **junto do cálcio**, ativa a **PKC (proteína cinase C)**. O efeito final sobre o músculo liso é a **CONTRAÇÃO** — no vaso, vasoconstrição com elevação da pressão arterial (via α1); em glândulas e músculo liso visceral, os efeitos muscarínicos M3."
  },
  {
    "type": "MÚLTIPLA ESCOLHA",
    "interactionType": "multiple-choice",
    "text": "Um gráfico de dose-resposta mostra a curva de um agonista isolado e a mesma curva na presença de um antagonista, sem alteração do platô (efeito máximo), mas com deslocamento da curva para a direita. Assinale a alternativa correta sobre esse tipo de antagonismo.",
    "options": [
      "A) O gráfico ilustra um antagonismo alostérico, já que o antagonista isolado não produz resposta.",
      "B) O gráfico é relativo a um antagonista do tipo não competitivo.",
      "C) Há diminuição da eficácia do agonista.",
      "D) Há diminuição da potência do agonista, mas a eficácia (Emax) permanece igual, caracterizando antagonismo competitivo.",
      "E) A curva dose-resposta do agonista não é alterada na presença do antagonista."
    ],
    "answer": "D",
    "gabarito": "**Alternativa D**\n\n**Por que D está certa:** o gráfico descreve a assinatura exata do **antagonismo competitivo**. **Deslocamento à direita** significa que passou a ser necessária **mais** concentração de agonista para o mesmo efeito — ou seja, a EC50 aumentou e a **POTÊNCIA** diminuiu. **Platô inalterado** significa que, com dose suficiente, o efeito máximo ainda é alcançado — ou seja, a **EFICÁCIA (Emáx)** foi **preservada**. Mecanicamente: o antagonista competitivo apenas **disputa o sítio** de forma reversível; aumentando o agonista, ele é deslocado da competição, e por isso o antagonismo é **superável**.\n\n**A — ERRADA.** O argumento apresentado (\"o antagonista isolado não produz resposta\") descreve *qualquer* antagonista puro e não identifica antagonismo **alostérico** — que, além disso, se liga a um sítio distinto e costuma **reduzir o platô**, não deslocá-lo lateralmente.\n**B — ERRADA.** O antagonismo **não competitivo** produziria o padrão oposto: **queda do platô/Emáx**, com deslocamento lateral pequeno ou nenhum.\n**C — ERRADA.** A eficácia é lida no **eixo Y** (altura do platô) — e ele está **inalterado**. O que caiu foi a potência.\n**E — ERRADA.** A curva foi claramente alterada: deslocou-se para a direita."
  },
  {
    "type": "MÚLTIPLA ESCOLHA",
    "interactionType": "multiple-choice",
    "text": "O que caracteriza o efeito de \"terapia de saturação\", como ocorre com agonistas parciais e curvas dose-resposta em geral?",
    "options": [
      "A) O efeito do fármaco só é observado após 24 horas de uso.",
      "B) A relação entre dose e efeito é linear indefinidamente.",
      "C) A curva dose-resposta apresenta uma fase de platô, na qual o aumento da dose não aumenta mais o efeito (todos os receptores relevantes já estão ocupados/ativados).",
      "D) A concentração do fármaco no local de ação aumenta exponencialmente.",
      "E) O efeito só ocorre quando o fármaco se liga a todos os receptores disponíveis."
    ],
    "answer": "C",
    "gabarito": "**Alternativa C**\n\n**Por que C está certa:** a curva dose-resposta não é uma reta — é **sigmoide, com um platô**. Uma vez que todos os receptores relevantes estejam ocupados/ativados, o sistema **satura**: aumentar a dose não aumenta mais o efeito, apenas a *exposição* do organismo ao fármaco — e, com ela, a toxicidade. Esse platô é a própria definição gráfica da **eficácia máxima (Emáx)** do fármaco.\n\n**A — ERRADA.** O tempo até o início de ação é uma propriedade farmacocinética, sem relação com saturação de receptores.\n**B — ERRADA.** A relação dose-efeito **não é linear indefinidamente** — se fosse, não haveria platô, nem Emáx, nem eficácia máxima, e qualquer fármaco poderia produzir qualquer efeito bastando aumentar a dose.\n**D — ERRADA.** Descreve um comportamento de concentração (farmacocinética), não a relação dose-resposta.\n**E — ERRADA.** O efeito começa **muito antes** da ocupação total: na maioria dos sistemas, uma fração pequena de receptores ocupados já produz resposta submáxima — inclusive porque existem *receptores de reserva* em vários tecidos."
  },
  {
    "type": "MÚLTIPLA ESCOLHA",
    "interactionType": "multiple-choice",
    "text": "A respeito da potência e da eficácia de quatro fármacos (A, B, C, D) representados nas curvas dose-resposta (A, B, C, D todas chegando ao platô máximo, exceto B que chega apenas a 50%. A ordem no eixo X da esquerda para a direita é: B, A, C, D), julgue:\n\nI. C e D são mais potentes que A e B por terem EC50 menor.\nII. A potência depende, em parte, da afinidade (Kd) do fármaco pelo receptor e, em parte, da eficiência do acoplamento à resposta.\nIII. A é mais potente e mais eficaz que B.\nIV. A, C e D têm eficácia máxima igual, todas maiores que a de B.\nV. A potência de A é menor que a de B, pois a EC50 de A é maior que a de B.",
    "options": [
      "A) I, III, IV e V.",
      "B) II, IV e V.",
      "C) I, II e III.",
      "D) Todas corretas.",
      "E) Apenas III."
    ],
    "answer": "B",
    "gabarito": "**Alternativa B — itens II, IV e V**\n\n**I — INCORRETO.** C e D estão **à direita** de A e de B: têm EC50 **maior**, e portanto são **menos** potentes, não mais.\n**II — CORRETO.** A potência é uma propriedade **composta**: depende da **afinidade** do fármaco pelo receptor (refletida no Kd) e da **eficiência do acoplamento** entre a ocupação do receptor e a resposta celular (número de receptores, presença de receptores de reserva, amplificação da cascata). Por isso potência não é sinônimo de afinidade.\n**III — INCORRETO.** A afirmação é uma conjunção, e basta uma metade falsa para derrubá-la. A é **mais eficaz** que B (100% contra 50%) — verdadeiro; mas A é **menos potente** que B (EC50 maior) — o que torna \"mais potente e mais eficaz\" falso.\n**IV — CORRETO.** A, C e D atingem o mesmo platô de 100%, superior aos 50% de B. **Eficácia igual entre si e maior que a de B** — exatamente o que se lê no eixo Y.\n**V — CORRETO.** A EC50 de A é **maior** que a de B, logo **A é menos potente que B**. Este é o item que mais confunde: o fármaco **menos eficaz** (B) é justamente o **mais potente** do conjunto."
  },
  {
    "type": "MÚLTIPLA ESCOLHA",
    "interactionType": "multiple-choice",
    "text": "Sobre conceitos de agonismo e antagonismo, julgue V/F:\n\nI. Existem 3 tipos de agonistas — pleno, parcial e inverso; o antagonista se liga ao receptor, geralmente não desencadeia resposta bioquímica própria e bloqueia o efeito do agonista, podendo ser competitivo, não competitivo/irreversível ou fisiológico.\nII. Efeitos colaterais são previsíveis, decorrentes do próprio mecanismo de ação do fármaco; efeitos adversos não são explicados pelo mecanismo de ação principal e não são esperados.",
    "options": [
      "A) I falso, II falso.",
      "B) I verdadeiro, II falso.",
      "C) I falso, II verdadeiro.",
      "D) I e II verdadeiros.",
      "E) Questão anulada."
    ],
    "answer": "D",
    "gabarito": "**Alternativa D — I e II verdadeiros**\n\n**I — V** Descrição correta e completa. São três os tipos de agonista: **pleno** (eficácia 100% — ex.: adrenalina), **parcial** (não atinge o Emáx nem em dose máxima, cerca de 50%) e **inverso** (liga-se ao receptor e produz o efeito contrário, reduzindo a atividade constitutiva — ex.: anti-histamínicos). O **antagonista** liga-se ao receptor, em regra **não desencadeia resposta bioquímica própria** e bloqueia o efeito do agonista, podendo ser **competitivo, não competitivo/irreversível ou fisiológico**.\n**II — V** Distinção conceitual cobrada na prova. **Efeito colateral** — **previsível, decorrente do próprio mecanismo de ação** do fármaco em outro sítio ou tecido: é o *preço farmacológico* da ação desejada (a boca seca do anticolinérgico, a broncoconstrição do propranolol). **Efeito adverso** — **não explicado** pelo mecanismo principal e **não esperado**: reações idiossincrásicas, de hipersensibilidade, imunomediadas.\n\n**A, B, C — ERRADAS.** Negam um ou ambos os itens, que estão corretos.\n**E — ERRADA.** Não há elemento que justifique anulação: as duas afirmações são tecnicamente sustentáveis."
  },
  {
    "type": "MÚLTIPLA ESCOLHA",
    "interactionType": "multiple-choice",
    "text": "Sobre agonistas plenos, parciais e inversos e sobre a atividade constitutiva dos receptores, assinale a alternativa CORRETA.",
    "options": [
      "A) O agonista parcial produz o mesmo Emax do agonista pleno, apenas com doses maiores.",
      "B) O agonista inverso é sinônimo de antagonista competitivo neutro.",
      "C) Na presença de um agonista pleno, o agonista parcial se comporta funcionalmente como antagonista competitivo, reduzindo a resposta máxima do sistema.",
      "D) O antagonista neutro reduz a atividade basal do receptor abaixo do nível constitutivo.",
      "E) A atividade constitutiva é um artefato experimental sem relevância clínica."
    ],
    "answer": "C",
    "gabarito": "**Alternativa C**\n\n**Por que C está certa:** é o comportamento \"dupla face\" do **agonista parcial** — o conceito mais sofisticado do módulo. Sozinho, o agonista parcial ativa o receptor (produz efeito, ainda que submáximo). Porém, na presença de um **agonista pleno**, ele passa a **ocupar receptores que o agonista pleno ativaria totalmente**, substituindo uma ativação de 100% por uma de ~50%. O resultado líquido é **redução da resposta máxima do sistema** — comportando-se funcionalmente como um **antagonista competitivo**. É esse mecanismo que explica, por exemplo, o uso da **buprenorfina** (agonista parcial µ) na dependência de opioides: ela sustenta um efeito parcial e, ao mesmo tempo, limita o efeito de um agonista pleno usado sobre ela.\n\n**A — ERRADA.** É a definição **invertida**. O agonista parcial **NÃO** atinge o Emáx do agonista pleno, **por maior que seja a dose** — porque a limitação é de **eficácia intrínseca**, não de quantidade. Quem alcança o mesmo Emáx com doses maiores é apenas um agonista pleno menos potente.\n**B — ERRADA.** São coisas distintas. O **antagonista neutro** ocupa o receptor e **mantém** a atividade constitutiva no nível basal. O **agonista inverso** ocupa o receptor e **reduz a atividade abaixo do basal**, estabilizando a conformação inativa — produz, portanto, um efeito próprio, de sinal oposto ao do agonista.\n**D — ERRADA.** Inverte as definições da alternativa anterior: reduzir a atividade abaixo do nível constitutivo é o que faz o **agonista inverso**, não o antagonista neutro.\n**E — ERRADA.** A **atividade constitutiva** — a fração de receptores que assume espontaneamente a conformação ativa, sem ligante — é um fenômeno real e clinicamente relevante: é ela que dá sentido à existência dos agonistas inversos, classe à qual pertencem vários anti-histamínicos H1 de uso corrente."
  },
  {
    "type": "DISCURSIVA",
    "interactionType": "textarea",
    "text": "Leitura de curvas dose-resposta\nCom relação à farmacodinâmica, considere o gráfico dose-resposta com três fármacos: A e B atingem Emáx de 100% (B com EC50 dez vezes menor que a de A) e C atinge Emáx de 50% com EC50 igual à de B. Responda:\na. Qual é o fármaco mais potente? Justifique indicando em que eixo do gráfico essa informação é lida.\nb. Qual é o fármaco mais eficaz? Justifique.\nc. Como se classifica farmacodinamicamente o fármaco C? Explique o que aconteceria com a resposta se C fosse administrado junto de um agonista pleno.",
    "gabarito": "**(a) Mais potente: o fármaco B.** A potência é lida no **eixo X** (eixo da concentração/dose), pela **EC50** — a concentração necessária para produzir metade do efeito máximo. Quanto menor a EC50, mais à esquerda está a curva e **maior** é a potência. O enunciado informa que a EC50 de B é **dez vezes menor** que a de A: B precisa de dez vezes menos concentração para o mesmo grau de efeito. O fármaco C tem EC50 **igual** à de B — logo, B e C empatam em potência, e ambos superam A. (Resposta plenamente aceita: \"B — e C tem a mesma potência de B\".)\n\n**(b) Mais eficaz: os fármacos A e B, empatados.** A eficácia é lida no **eixo Y**, pela altura do platô (**Emáx**). A e B atingem **100%**; C atinge apenas **50%**. Como A e B alcançam o mesmo efeito máximo, têm **eficácia idêntica** — apesar de suas potências diferirem por um fator de dez. Este é o ponto central da questão: **eficácia igual não implica potência igual**.\n\n**(c) Classificação de C: AGONISTA PARCIAL.** C ocupa o receptor e produz efeito — portanto é agonista —, mas **não alcança o efeito máximo** do sistema, estacionando em 50% mesmo em concentrações altas. Essa limitação é de **eficácia intrínseca**: não se resolve aumentando a dose. **Se C for administrado junto de um agonista pleno** (A ou B), ele passará a competir pelos mesmos receptores; cada receptor que C ocupa deixa de ser ativado a 100% e passa a ser ativado a ~50%. O efeito líquido é a **redução da resposta máxima do sistema** — o agonista parcial comporta-se, nesse contexto, como um **antagonista competitivo**. Note que C é, ao mesmo tempo, tão potente quanto B e menos eficaz que ele: a demonstração mais limpa possível da independência entre os dois parâmetros."
  }
];
