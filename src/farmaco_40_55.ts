export const farmaco_40_55 = [
{ type: "MÚLTIPLA ESCOLHA", text: `A clonidina e a metildopa são fármacos classificados como agonistas alfa-2 adrenérgicos, amplamente utilizados como anti-hipertensivos. Como se explica o efeito redutor da pressão arterial de um agonista adrenérgico?`, interactionType: "multiple-choice", options: [
"A) Eles estimulam os receptores alfa-2 no coração, provocando bradicardia intensa.",
"B) O receptor alfa-2 é pré-sináptico inibitório; ao ser ativado no Sistema Nervoso Central, ele reduz a liberação de noradrenalina, diminuindo o tônus simpático periférico.",
"C) Eles atuam como falsos neurotransmissores, destruindo as vesículas de acetilcolina nos gânglios.",
"D) A estimulação alfa-2 nos vasos sanguíneos promove vasodilatação direta pela via do óxido nítrico.",
"E) Eles bloqueiam a enzima MAO, esgotando os estoques de catecolaminas."
], gabarito: `**Alternativa B**

**Por que B está certa:** O receptor Alfa-2 é o "freio" do sistema simpático. Ele fica localizado na membrana PRÉ-sináptica. Quando a noradrenalina é liberada na fenda, uma parte volta e liga-se ao alfa-2, avisando o neurônio: "já tem noradrenalina suficiente, pode parar de liberar". A clonidina e a metildopa vão até o cérebro (centro vasomotor), ligam-se ao alfa-2 e enganam o neurônio, acionando o freio. O cérebro para de mandar impulsos simpáticos para o corpo, a resistência vascular cai e a pressão diminui. (Ação simpatolítica de ação central).
**A — ERRADA.** O alvo não é o coração; a ação primária é central (tronco encefálico).
**C — ERRADA.** Não atuam nos gânglios nem envolvem acetilcolina.
**D — ERRADA.** Alfa-2 periférico no vaso pode até causar leve vasoconstrição inicial, mas o efeito central inibitório é esmagadoramente superior. Não envolve óxido nítrico.
**E — ERRADA.** Não inibem a MAO (inibidor da MAO aumenta catecolaminas, não esgota).` },
{ type: "MÚLTIPLA ESCOLHA", text: `O propranolol é um antagonista beta-adrenérgico não seletivo. Qual das seguintes condições representa uma contraindicação clássica e perigosa para o uso do propranolol?`, interactionType: "multiple-choice", options: [
"A) Hipertensão arterial sistêmica.",
"B) Angina de peito.",
"C) Asma brônquica.",
"D) Tremor essencial.",
"E) Taquicardia sinusal."
], gabarito: `**Alternativa C**

**Por que C está certa:** O propranolol é NÃO SELETIVO, ou seja, bloqueia tanto Beta-1 (coração) quanto Beta-2 (brônquios). Bloquear o beta-1 é bom para hipertensão e angina. Mas bloquear o beta-2 no pulmão retira o estímulo relaxante do brônquio, o que em uma pessoa normal não faz muita diferença, mas em um paciente com asma desencadeia um broncoespasmo fatal. Para asmáticos que precisam de betabloqueador, usam-se os cardiosseletivos (bloqueiam só Beta-1), como o atenolol ou metoprolol.
**A, B, D e E — ERRADAS.** Todas essas são INDICAÇÕES para o uso do propranolol, e não contraindicações.` },
{ type: "DISCURSIVA", text: `Você está prescrevendo um betabloqueador para um paciente que sofreu infarto agudo do miocárdio, mas que também é portador de Doença Pulmonar Obstrutiva Crônica (DPOC).
a. Qual é o risco de prescrever um betabloqueador não seletivo (ex.: propranolol)? Explique o mecanismo fisiológico.
b. Qual subgrupo de betabloqueadores deve ser escolhido e cite dois exemplos.`, interactionType: "textarea", gabarito: `**(a) O Risco do Não Seletivo.** O propranolol bloqueia tanto receptores beta-1 quanto beta-2. O bloqueio beta-2 no trato respiratório impede o relaxamento da musculatura lisa brônquica, podendo induzir broncoespasmo severo e insuficiência respiratória fatal no paciente com DPOC ou asma.
**(b) A Escolha Certa.** Devem-se utilizar os **betabloqueadores cardiosseletivos (seletivos para beta-1)**. Eles reduzem o trabalho cardíaco sem bloquear significativamente os receptores beta-2 pulmonares. Exemplos: Atenolol, Metoprolol, Bisoprolol.` },
{ type: "MÚLTIPLA ESCOLHA", text: `Um paciente de 40 anos é diagnosticado com hipertensão arterial e o médico decide iniciar tratamento com um Inibidor da Enzima Conversora de Angiotensina (IECA). Qual dos fármacos abaixo pertence a essa classe e qual é o seu principal efeito adverso característico?`, interactionType: "multiple-choice", options: [
"A) Losartana; causa tosse seca crônica.",
"B) Enalapril; causa tosse seca crônica devido ao acúmulo de bradicinina.",
"C) Amlodipino; causa edema de membros inferiores.",
"D) Hidroclorotiazida; causa hipocalemia.",
"E) Captopril; causa bradicardia severa."
], gabarito: `**Alternativa B**

**Por que B está certa:** O Enalapril (assim como captopril, lisinopril, ramipril - todos os terminados em "-pril") é um IECA. A Enzima Conversora de Angiotensina (ECA) tem duas funções no corpo: transformar Angiotensina I em Angiotensina II (potente vasoconstritor) e DEGRADAR a bradicinina (um peptídeo inflamatório/vasodilatador). Ao inibir a ECA, você reduz a angiotensina II (baixando a pressão), mas também impede a degradação da bradicinina. A bradicinina acumula-se no pulmão e irrita as vias aéreas, gerando o clássico efeito adverso da tosse seca, que afeta até 20% dos pacientes e obriga a troca da medicação.
**A — ERRADA.** A losartana é um BRA (Bloqueador do Receptor de Angiotensina). Ela bloqueia o receptor, não a enzima. Por não inibir a ECA, a bradicinina é degradada normalmente e não dá tosse. É justamente a droga substituta quando o paciente tem tosse com IECA.
**C — ERRADA.** Amlodipino é bloqueador de canal de cálcio (dá edema, de fato, mas não é IECA).
**D — ERRADA.** Hidroclorotiazida é diurético tiazídico.
**E — ERRADA.** O Captopril é IECA, mas não causa bradicardia (não age no coração diretamente como o betabloqueador).` },
{ type: "MÚLTIPLA ESCOLHA", text: `Um paciente negro, idoso, foi diagnosticado com hipertensão arterial sistêmica estágio I isolada. De acordo com as diretrizes e a farmacologia clássica, qual a classe de anti-hipertensivos geralmente menos efetiva como monoterapia inicial para essa população específica (pacientes negros)?`, interactionType: "multiple-choice", options: [
"A) Diuréticos tiazídicos.",
"B) Bloqueadores dos canais de cálcio (BCC).",
"C) Inibidores da ECA (IECA) e Bloqueadores dos Receptores de Angiotensina (BRA).",
"D) Vasodilatadores diretos.",
"E) Diuréticos de alça."
], gabarito: `**Alternativa C**

**Por que C está certa:** Por fatores genéticos e populacionais, a hipertensão na população negra costuma ser mais dependente de volume (retenção de sódio) e apresentar baixos níveis plasmáticos de renina. Os IECAs e BRAs funcionam inibindo a cascata da renina-angiotensina-aldosterona. Se o sistema já está inibido/baixo nessa população, bloquear algo que já está baixo tem pouco efeito hemodinâmico. Por isso, as diretrizes recomendam iniciar o tratamento de pacientes negros com Diuréticos Tiazídicos ou Bloqueadores de Canal de Cálcio, deixando IECAs e BRAs para associação, caso necessário.
**A e B — ERRADAS.** São exatamente a primeira escolha para essa população, por atacarem o componente volumétrico/vascular independente de renina.
**D e E — ERRADAS.** Não são primeira linha para hipertensão não complicada em nenhuma etnia.` },
{ type: "MÚLTIPLA ESCOLHA", text: `Os bloqueadores de canais de cálcio (BCC) são divididos em di-hidropiridínicos (ex.: anlodipino, nifedipino) e não di-hidropiridínicos (ex.: verapamil, diltiazem). Qual é a principal diferença farmacodinâmica entre esses dois grupos?`, interactionType: "multiple-choice", options: [
"A) Os di-hidropiridínicos agem apenas no coração, enquanto os não di-hidropiridínicos agem apenas nos vasos.",
"B) O anlodipino atua predominantemente promovendo vasodilatação periférica, podendo causar taquicardia reflexa; já o verapamil tem forte ação depressora cardíaca (inotropismo e cronotropismo negativos), sendo contraindicado na insuficiência cardíaca.",
"C) O verapamil é o fármaco de escolha para hipertensão na gravidez, diferentemente do nifedipino.",
"D) Ambos têm efeito diurético idêntico, diferindo apenas na meia-vida.",
"E) Os não di-hidropiridínicos aumentam a contratilidade cardíaca."
], gabarito: `**Alternativa B**

**Por que B está certa:** a divisão dos BCCs dita a conduta médica.
- Di-hidropiridínicos (anlodipino, nifedipino): são seletivos para a musculatura lisa dos vasos. Causam vasodilatação potente. O coração, sentindo a queda de pressão, dispara para compensar (taquicardia reflexa).
- Não di-hidropiridínicos (verapamil e, em menor grau, diltiazem): têm predileção pelos canais de cálcio do coração. Eles retardam a condução do nó AV (bradizam) e reduzem a força do músculo cardíaco. Se o paciente tiver o coração fraco (insuficiência cardíaca de fração de ejeção reduzida), o verapamil tira o pouco de força que resta e pode matar o paciente por choque cardiogênico.
**A — ERRADA.** Inverte a ação principal.
**C — ERRADA.** O nifedipino (e metildopa) é que costuma ser usado na pré-eclâmpsia.
**D — ERRADA.** Não são diuréticos.
**E — ERRADA.** O verapamil *reduz* a contratilidade (inotropismo negativo).` },
{ type: "MÚLTIPLA ESCOLHA", text: `Qual das interações medicamentosas abaixo justifica a proibição do uso simultâneo de Verapamil (BCC não di-hidropiridínico) e Propranolol (Betabloqueador)?`, interactionType: "multiple-choice", options: [
"A) O antagonismo farmacológico competitivo pelos receptores beta-1.",
"B) O risco extremo de bloqueio atrioventricular (BAV) total e parada cardíaca, devido ao sinergismo somatório de depressão do nódulo AV.",
"C) A inativação química mútua no trato gastrointestinal, impedindo a absorção.",
"D) A estimulação cruzada do simpático, gerando crise hipertensiva aguda.",
"E) Indução enzimática que reduz a meia-vida de ambos a níveis subterapêuticos."
], gabarito: `**Alternativa B**

**Por que B está certa:** o verapamil "freia" o nódulo atrioventricular (impedindo o cálcio de entrar). O propranolol também "freia" o nódulo AV (tirando o estímulo simpático). Quando usados juntos, você corta as duas vias de aceleração do coração simultaneamente. O resultado é o congelamento do sistema elétrico: bloqueio atrioventricular de alto grau, bradicardia extrema, assistolia e morte. É um sinergismo letal.
**A — ERRADA.** O verapamil atua no canal de cálcio L-type, o propranolol atua no receptor beta adrenérgico. Não competem pelo mesmo receptor.
**C, D e E — ERRADAS.** É uma interação farmacodinâmica fatal no órgão alvo, não físico-química, nem gera hipertensão.` },
{ type: "DISCURSIVA", text: `Sobre os anti-hipertensivos que atuam no Sistema Renina-Angiotensina-Aldosterona (SRAA):
a. Cite a diferença no mecanismo de ação entre um IECA (ex.: Enalapril) e um BRA (ex.: Losartana).
b. Por que os IECAs causam tosse seca (frequentemente obrigando a troca da medicação), enquanto os BRAs não causam?
c. Por que ambas as classes são contraindicadas na gravidez?`, interactionType: "textarea", gabarito: `**(a) Mecanismo de Ação.** IECA: Inibe a Enzima Conversora de Angiotensina, impedindo a transformação da Angiotensina I em Angiotensina II (o agente vasoconstritor ativo). BRA: Não mexe na enzima; permite que a Angiotensina II seja formada, mas bloqueia o receptor dela (receptor AT1) nos vasos e suprarrenais, impedindo que ela aja.
**(b) Tosse Seca.** A ECA, além de produzir Angiotensina II, é a responsável por degradar a Bradicinina. Quando o IECA inibe a ECA, a bradicinina acumula-se, causando inflamação e tosse irritativa nas vias aéreas. Como os BRAs não inibem a ECA (agindo apenas no receptor da angiotensina), a bradicinina continua sendo degradada normalmente, sem causar tosse.
**(c) Gravidez.** IECAs e BRAs são teratogênicos absolutos (Categoria D/X). Eles interferem no desenvolvimento renal do feto, podendo causar oligoidrâmnio (falta de líquido amniótico), hipoplasia pulmonar fetal, anúria neonatal e morte fetal.` },
{ type: "MÚLTIPLA ESCOLHA", text: `Os diuréticos são fundamentais no manejo da hipertensão e insuficiência cardíaca. Qual das alternativas correlaciona CORRETAMENTE a classe do diurético, seu local de ação no néfron e seu principal efeito nos níveis de potássio no sangue?`, interactionType: "multiple-choice", options: [
"A) Furosemida: age no túbulo contorcido distal, poupando potássio (hipercalemia).",
"B) Hidroclorotiazida: age na alça de Henle, causando hipocalemia severa.",
"C) Espironolactona: age no túbulo coletor antagonizando a aldosterona, retendo potássio (risco de hipercalemia).",
"D) Manitol: inibe o transportador Na-K-2Cl na alça espessa, sem alterar o potássio.",
"E) Amilorida: inibe a anidrase carbônica no túbulo proximal, causando perda de potássio."
], gabarito: `**Alternativa C**

**Por que C está certa:** a espironolactona é o protótipo dos diuréticos poupadores de potássio. Ela é um antagonista competitivo do receptor de aldosterona no túbulo contorcido distal final e ducto coletor. A aldosterona manda o rim reabsorver sódio e jogar fora potássio. Ao bloquear a aldosterona, a espironolactona joga fora o sódio (diurese) e retém o potássio, podendo causar hipercalemia perigosa.
**A — ERRADA.** A Furosemida age na Alça de Henle e espolia (joga fora) potássio, causando HIPOcalemia.
**B — ERRADA.** A Hidroclorotiazida (tiazídico) age no túbulo contorcido distal, não na alça.
**D — ERRADA.** O manitol é diurético osmótico (age na alça fina e túbulo proximal por osmose pura). Quem inibe o Na-K-2Cl é a furosemida.
**E — ERRADA.** Inibidor da anidrase carbônica é a acetazolamida. Amilorida é poupador de potássio (bloqueia o canal ENaC no coletor).` },
{ type: "MÚLTIPLA ESCOLHA", text: `Um paciente dá entrada na emergência com edema agudo de pulmão (congestão severa, falta de ar extrema). Qual diurético deve ser administrado imediatamente por via intravenosa devido ao seu rápido e potente efeito natriurético?`, interactionType: "multiple-choice", options: [
"A) Hidroclorotiazida.",
"B) Espironolactona.",
"C) Furosemida.",
"D) Acetazolamida.",
"E) Clortalidona."
], gabarito: `**Alternativa C**

**Por que C está certa:** a Furosemida é um diurético de alça. Eles são conhecidos como diuréticos "de teto alto" por terem a maior eficácia na remoção de volume do corpo. Agem bloqueando o transportador Na-K-2Cl na porção espessa da alça de Henle, local por onde passa cerca de 25% do sódio filtrado. Por via IV, a ação é imediata, resgatando o paciente afogado no próprio líquido em poucos minutos.
**A e E — ERRADAS.** Tiazídicos (HCTZ e clortalidona) são excelentes para hipertensão crônica leve/moderada, mas não têm força para tirar o volume brutal de um edema agudo.
**B — ERRADA.** A espironolactona demora dias para ter seu efeito pleno (pois age bloqueando a síntese de proteínas induzidas pela aldosterona), sendo inútil na urgência.
**D — ERRADA.** A acetazolamida tem efeito diurético muito fraco; é mais usada para tratar glaucoma e mal da montanha.` },
{ type: "MÚLTIPLA ESCOLHA", text: `Pacientes em uso crônico de furosemida para insuficiência cardíaca frequentemente precisam de suplementação de qual eletrólito, devido ao mecanismo de ação da droga?`, interactionType: "multiple-choice", options: [
"A) Sódio, pois a hiponatremia é fatal a curto prazo.",
"B) Potássio, para prevenir hipocalemia e arritmias ventriculares.",
"C) Cálcio, pois o fármaco induz calcificação óssea acelerada.",
"D) Cloro, para prevenir acidose hiperclorêmica.",
"E) Lítio, para manter o humor estável."
], gabarito: `**Alternativa B**

**Por que B está certa:** os diuréticos de alça e os tiazídicos mandam muito sódio para a porção final do néfron (coletor). Quando esse excesso de sódio chega lá, o corpo tenta reabsorvê-lo trocando-o por potássio. O resultado é uma perda massiva de potássio na urina (hipocalemia). A falta de potássio altera a repolarização cardíaca e pode precipitar arritmias letais. Por isso, a reposição de KCl (ou associação com espironolactona) é quase obrigatória.
**A — ERRADA.** Repor sódio anularia o efeito do diurético (que é justamente espoliar sódio para tirar a água do corpo).
**C — ERRADA.** Curiosidade: a furosemida joga cálcio fora na urina (usada para tratar hipercalcemia). Os tiazídicos *retêm* cálcio (usados para tratar osteoporose ou cálculo renal de cálcio).
**D e E — ERRADAS.** Sem pertinência.` },
{ type: "MÚLTIPLA ESCOLHA", text: `Sobre a farmacologia dos anti-inflamatórios não esteroidais (AINEs), assinale a alternativa que explica seu principal mecanismo de ação.`, interactionType: "multiple-choice", options: [
"A) Inibição da enzima Fosfolipase A2, impedindo a liberação de ácido araquidônico da membrana celular.",
"B) Ativação dos receptores opioides tipo Mi, bloqueando a transmissão do impulso doloroso na medula.",
"C) Inibição das enzimas Cicloxigenases (COX-1 e COX-2), bloqueando a síntese de prostaglandinas e tromboxanos.",
"D) Neutralização direta da histamina e bradicinina nos tecidos periféricos.",
"E) Inibição da enzima Lipoxigenase (LOX), impedindo a formação de leucotrienos broncoconstritores."
], gabarito: `**Alternativa C**

**Por que C está certa:** a base sagrada dos AINEs (ibuprofeno, diclofenaco, AAS, nimesulida). Quando uma célula sofre lesão, a Fosfolipase A2 quebra a membrana e solta o Ácido Araquidônico. Esse ácido é pego pelas enzimas COX, que o transformam em Prostaglandinas (causam dor, calor, rubor, edema, febre) e Tromboxano (causa agregação plaquetária). Os AINEs simplesmente entram na COX e travam a enzima. Sem COX, não há prostaglandinas; logo, a inflamação cede.
**A — ERRADA.** Quem inibe a Fosfolipase A2, lá no topo da cascata, são os GLICOCORTICOIDES (corticoides como dexametasona). É por isso que eles são anti-inflamatórios muito mais potentes.
**B — ERRADA.** Esse é o mecanismo da morfina e derivados (analgésicos opioides), não dos AINEs.
**D — ERRADA.** Anti-histamínicos (antialérgicos) bloqueiam a histamina.
**E — ERRADA.** Os AINEs não bloqueiam a LOX. Na verdade, ao bloquear a COX, todo o ácido araquidônico "sobra" para a via da LOX, gerando mais leucotrienos. Isso explica a famosa "asma induzida por aspirina", pois os leucotrienos contraem o brônquio.` },
{ type: "MÚLTIPLA ESCOLHA", text: `Paciente idoso com osteoartrite faz uso de diclofenaco diariamente. Após alguns meses, desenvolve úlcera péptica sangrante. Qual o raciocínio farmacológico por trás desse evento adverso crônico dos AINEs tradicionais?`, interactionType: "multiple-choice", options: [
"A) A droga é um ácido forte que, ao encostar na parede do estômago, corrói fisicamente a mucosa.",
"B) A inibição da COX-1 impede a síntese de prostaglandinas protetoras (PGE2 e PGI2), as quais são responsáveis por estimular a produção de muco e bicarbonato gástrico.",
"C) O fármaco induz hipersecreção de ácido clorídrico por estímulo direto nos receptores H2 da célula parietal.",
"D) O diclofenaco inibe a coagulação por bloquear a vitamina K, causando sangramento espontâneo do estômago intacto.",
"E) A inibição seletiva da COX-2 gera um desvio metabólico que lesa o estômago."
], gabarito: `**Alternativa B**

**Por que B está certa:** a úlcera por AINE é fisiológica, não apenas um machucado por contato (tanto que a úlcera ocorre mesmo se o AINE for injetado na veia). A COX-1 é uma enzima constitutiva ("do bem"). Ela funciona o tempo todo produzindo as prostaglandinas que forram o estômago com muco grosso e bicarbonato, e mantêm o fluxo de sangue na mucosa. Quando o AINE tradicional bloqueia a COX-1 cronicamente, o estômago perde seu escudo de muco. O próprio ácido do paciente corroerá a parede, gerando a úlcera.
**A — ERRADA.** O dano tópico existe (AAS irrita), mas é secundário; a úlcera é primariamente por inibição sistêmica da COX-1.
**C — ERRADA.** Não há estímulo aos receptores H2 (alvo da ranitidina).
**D — ERRADA.** AINE bloqueia agregação plaquetária via tromboxano A2, não via vitamina K (alvo da varfarina). O distúrbio de coagulação agrava o sangramento, mas não CAUSA a úlcera.
**E — ERRADA.** Inibir a COX-2 seletivamente (coxibes) foi a estratégia inventada justamente para *poupar* o estômago, pois a COX-2 é a enzima patológica (da inflamação).` },
{ type: "MÚLTIPLA ESCOLHA", text: `O ácido acetilsalicílico (AAS) é o único AINE capaz de prevenir infartos e derrames em doses baixas (100 mg/dia), enquanto os demais AINEs, inclusive os inibidores seletivos de COX-2, podem AUMENTAR o risco cardiovascular. O que confere ao AAS esse perfil antitrombótico único?`, interactionType: "multiple-choice", options: [
"A) É o único capaz de inibir a enzima tromboxano sintase, preservando a COX intacta.",
"B) Ele inibe a COX de forma irreversível por ligação covalente (acetilação). Como a plaqueta não tem núcleo para fabricar nova enzima, ela fica inativa por toda a sua vida útil (7 a 10 dias).",
"C) Ele aumenta a síntese de prostaglandina I2 (prostaciclina) no endotélio, dilatando os vasos.",
"D) Em baixas doses, ele inibe apenas a cascata de coagulação, simulando o efeito da heparina.",
"E) É o único AINE altamente seletivo para a COX-2."
], gabarito: `**Alternativa B**

**Por que B está certa:** essa é a marca registrada do AAS, que cai em 9 de 10 provas. Todos os outros AINEs inibem a COX de forma reversível (competitiva). Quando o nível do remédio no sangue cai, a enzima volta a funcionar. O AAS, por sua vez, destrói a COX para sempre (acetilação irreversível). A plaqueta fabrica Tromboxano A2 (que faz coágulo) usando a COX-1. Como a plaqueta não tem DNA/núcleo celular, ela não pode construir uma COX-1 nova. Aquela plaqueta morre sem conseguir agregar nunca mais. O efeito antiplaquetário dura 7 a 10 dias (tempo para a medula fazer novas plaquetas), conferindo proteção contra infarto.
**A — ERRADA.** Ele inibe a COX, não a tromboxano sintase.
**C — ERRADA.** Ele diminui a prostaciclina também (que é feita pela COX endotelial), mas a célula endotelial tem núcleo, então refaz a enzima rápido.
**D — ERRADA.** Não age na cascata de coagulação plasmática (fatores do fígado), age na agregação plaquetária.
**E — ERRADA.** O AAS é mais seletivo para COX-1, não COX-2.` },
{ type: "MÚLTIPLA ESCOLHA", text: `Os inibidores seletivos da COX-2 (coxibes, ex.: celecoxibe) foram desenvolvidos para resolver qual problema principal dos AINEs não seletivos, e qual foi o novo e perigoso risco descoberto com seu uso em larga escala?`, interactionType: "multiple-choice", options: [
"A) Resolver a tosse crônica; porém causaram insuficiência renal aguda.",
"B) Reduzir o risco de úlceras gastrointestinais (poupando a COX-1); porém, ao inibir a prostaciclina vasoprotetora sem inibir o tromboxano plaquetário, aumentaram drasticamente o risco de infarto agudo do miocárdio e trombose.",
"C) Melhorar o efeito antipirético; porém mostraram-se altamente hepatotóxicos, causando cirrose fulminante.",
"D) Proporcionar efeito analgésico equiparável à morfina; porém causaram dependência química severa e síndrome de abstinência.",
"E) Prevenir sangramentos cirúrgicos; porém induziram o desenvolvimento de asma grave."
], gabarito: `**Alternativa B**

**Por que B está certa:** a história dos coxibes (como o rofecoxibe, retirado do mercado no escândalo do Vioxx®). A indústria criou uma droga inteligente: bloqueia apenas a COX-2 (a enzima ruim da inflamação) e deixa a COX-1 em paz. Resultado: pacientes sem dor e sem úlcera no estômago! Perfeito. O erro trágico foi fisiológico. O endotélio dos vasos usa a COX-2 para fabricar Prostaciclina (que evita coágulos). A plaqueta usa a COX-1 para fabricar Tromboxano (que faz coágulo). Ao bloquear SÓ a COX-2, você corta a defesa do vaso, mas deixa a plaqueta livre e louca gerando tromboxano através da COX-1. O sangue fica propenso a coagular. Milhares de pacientes infartaram. Hoje, coxibes são contraindicados em cardiopatas.
**A, C, D e E — ERRADAS.** Não resolvem tosse, não são iguais à morfina, não causam dependência, e a toxicidade hepática não foi o problema que os marcou historicamente (e sim a trombose).` }
];
