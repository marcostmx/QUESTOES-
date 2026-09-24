export const q2 = [
    {
        type: "CASO CLÍNICO",
        text: `Homem de 68 anos internado há 5 dias por IAM de parede anterior, tratado tardiamente. Vinha estável quando, subitamente, apresenta piora acentuada da dispneia, hipotensão e surgimento de sopro holossistólico intenso, novo, em borda esternal esquerda baixa, com frêmito. Ausculta pulmonar com estertores difusos.

a) Cite três complicações mecânicas do IAM compatíveis com uma deterioração súbita neste período e diga qual delas melhor explica o sopro descrito.
b) A qual dos seis mecanismos de disfunção cardiovascular corresponde a complicação que você escolheu?
c) Por que essa complicação ocorre justamente por volta do 5º dia?`,
        interactionType: "textarea",
        gabarito: `a) Complicações mecânicas compatíveis: ruptura de parede livre (evolui com hemopericárdio e tamponamento), ruptura do septo interventricular e ruptura de músculo papilar necrosado (insuficiência mitral aguda). O sopro holossistólico novo em borda esternal esquerda baixa, com frêmito, é característico da ruptura do septo interventricular — comunicação interventricular adquirida.

b) Corresponde ao mecanismo 4 — fluxo colateral: o sangue é desviado de uma parte do coração para outra (do VE para o VD) por um defeito adquirido após o infarto.

c) Porque o 5º dia cai na janela de fragilidade do 3º ao 7º dia. Nesse período a necrose já desorganizou a arquitetura do tecido e os macrófagos já removeram o material necrótico, mas o tecido de granulação e a fibrose ainda não se formaram — a parede está mecanicamente no seu ponto mais frágil.`
    },
    {
        type: "FECHADA",
        text: `Sobre a extensão do infarto e os territórios coronarianos, assinale a alternativa CORRETA:`,
        interactionType: "multiple-choice",
        options: [
            "A) O infarto subendocárdico circunferencial decorre tipicamente da oclusão permanente do ramo descendente anterior esquerdo.",
            "B) A restauração do fluxo (reperfusão) pode converter um infarto que seria transmural em não transmural.",
            "C) Microinfartos decorrem de hipotensão global sustentada.",
            "D) A oclusão do ramo circunflexo esquerdo produz infarto da parede anterior do ventrículo esquerdo.",
            "E) O infarto transmural caracteriza-se por necrose restrita ao terço subendocárdico da parede."
        ],
        gabarito: `Alternativa B.

A reperfusão limita a progressão da necrose do subendocárdio para o epicárdio, podendo converter um infarto que seria transmural em não transmural.
A está errada: oclusão permanente da DA gera infarto transmural anterior; o subendocárdico circunferencial decorre de hipotensão global. C está errada: microinfartos decorrem de oclusão de pequenos vasos intramurais. D está errada: a circunflexa irriga a parede lateral. E está errada: transmural é a necrose de toda a espessura da parede.`
    },
    {
        type: "ABERTA",
        text: `Explique o que é um circuito de reentrada e cite as duas condições necessárias para que ele se estabeleça. Depois explique por que uma cicatriz de infarto favorece esse mecanismo.`,
        interactionType: "textarea",
        gabarito: `Na condução normal, o impulso parte do nó SA e se propaga de modo ordenado até o miocárdio, extinguindo-se ao encontrar tecido refratário. Um circuito de reentrada ocorre quando o impulso, em vez de se extinguir, encontra um caminho que o traz de volta ao ponto de partida e o reexcita — passando a girar continuamente e a comandar o ritmo.

As duas condições necessárias são:
1. Bloqueio unidirecional em uma das vias — o impulso não desce por ela, mas pode subir;
2. Condução retrógrada suficientemente lenta, de modo que, quando o impulso retorna, o tecido de origem já saiu do período refratário e pode ser reexcitado.

A cicatriz de infarto favorece a reentrada porque cria exatamente esse cenário: o tecido fibroso é inexcitável e obriga o impulso a contorná-lo, e as ilhas de miócitos sobreviventes nas bordas — parcialmente despolarizados e mal acoplados — conduzem de forma lenta e desigual, produzindo as zonas de bloqueio unidirecional e de condução lentificada.`
    },
    {
        type: "CASO CLÍNICO",
        text: `Homem de 72 anos é levado ao pronto-socorro após perder a consciência enquanto estava de pé cantando na igreja. A esposa relata que ele ficou inconsciente por 2 a 3 minutos, sem movimentos anormais, e ao acordar ficou tonto por um ou dois minutos, recuperando-se em seguida. Nos últimos meses vinha suspendendo atividades por fraqueza e tontura. Ao exame: alerta e orientado, afebril, FC 35 bpm regular, PA 118/72 mmHg sem variação ao ficar de pé. Exames laboratoriais e enzimas cardíacas normais.

a) Qual o diagnóstico e o mecanismo?
b) Que dados do caso permitem descartar crise convulsiva e síncope ortostática?
c) Explique, usando a hierarquia do automatismo cardíaco, por que a frequência está em 35 bpm.`,
        interactionType: "textarea",
        gabarito: `a) Síncope por bloqueio atrioventricular total (de terceiro grau). Mecanismo: a condução do átrio para o ventrículo é completamente interrompida, o ventrículo passa a depender de um ritmo de escape lento, o débito cardíaco cai abruptamente e ocorre hipoperfusão cerebral global transitória.

b) Contra crise convulsiva: ausência de movimentos anormais, recuperação rápida e ausência de período pós-ictal prolongado. Contra síncope ortostática: a PA não se altera ao ficar de pé.

c) Todas as estruturas do sistema de condução têm automatismo próprio, em hierarquia decrescente: nó SA ≈ 60–100 bpm, junção AV ≈ 40–60 bpm, His-Purkinje/ventrículo ≈ 20–40 bpm. Normalmente o nó SA comanda por ser o mais rápido. Com o bloqueio total, o impulso atrial não alcança o ventrículo, que passa a ser comandado por um foco de escape ventricular — daí a frequência de 35 bpm, dentro da faixa do automatismo de Purkinje/ventrículo.`
    },
    {
        type: "VERDADEIRO OU FALSO",
        text: `Marque V ou F e corrija as falsas:

I. A lesão isquêmica é a causa mais comum de distúrbios de ritmo.
II. Se os miócitos atriais se tornam "irritáveis" e despolarizam de modo independente, o resultado é o bloqueio atrioventricular.
III. A fibrilação ventricular é uma despolarização caótica sem contração ventricular funcional.
IV. O feixe de Kent conduz impulsos diretamente dos átrios aos ventrículos, transpondo o nó AV.
V. O flutter atrial típico é uma arritmia caracterizada por macrorreentrada no átrio direito.`,
        interactionType: "textarea",
        gabarito: `• I — VERDADEIRO: A isquemia miocárdica (aguda ou crônica) é a etiologia mais frequente das arritmias ventriculares e atriais com risco de vida no adulto. Ela atua por dano eletrofisiológico direto aos miócitos (desacoplamento celular, hipóxia, acúmulo de lactato e potássio extracelular) e por remodelamento/dilatação das câmaras cardíacas, gerando focos ectópicos de automatismo anormal, atividade deflagrada e circuitos de reentrada.

• II — FALSO: A presença de múltiplos focos miocíticos atriais irritáveis com despolarizações rápidas, desorganizadas e independentes (frequência de 400 a 600 bpm), transmitidas de forma variável e caótica aos ventrículos através do nó AV, caracteriza a Fibrilação Atrial (FA). O bloqueio atrioventricular (BAV) não é gerado por irritabilidade atrial, mas sim por atraso ou interrupção anatômica/funcional da condução elétrica no próprio nó AV ou no feixe de His-Purkinje.

• III — VERDADEIRO: A Fibrilação Ventricular (FV) caracteriza-se por atividade elétrica ventricular caótica, fragmentada e assincrônica, sem despolarização ventricular organizada. Do ponto de vista mecânico, não há contração ventricular efetiva nem sístole, resultando em débito cardíaco nulo, colapso circulatório imediato, perda de pulso e morte súbita em minutos se não for prontamente revertida com desfibrilação.

• IV — VERDADEIRO: O Feixe de Kent é uma via anômala congênita acessória que conecta eletricamente o miocárdio atrial diretamente ao miocárdio ventricular, contornando (transpondo) o atraso fisiológico do nó AV. Essa condução rápida sem retardo produz pré-excitação ventricular, manifestando-se no eletrocardiograma pelo intervalo PR curto, presença da onda delta e alargamento do QRS, configuração clássica da Síndrome de Wolff-Parkinson-White.

• V — VERDADEIRO: O Flutter Atrial típico decorre de um macrocircuito de reentrada unifocal, homogêneo e estável localizado no átrio direito, cujo sentido de rotação é habitualmente anti-horário em torno do anel tricúspide. Esse circuito é anatomicamente dependente do istmo cavotricuspídeo (zona estreita de condução lenta situada entre a veia cava inferior e o anel da valva tricúspide), alvo preferencial da ablação por radiofrequência.`
    },
    {
        type: "ABERTA",
        text: `a) Defina morte súbita cardíaca segundo o critério temporal apresentado.
b) Qual é a principal causa em adultos e qual a proporção que ela representa?
c) Cite cinco causas mais frequentes em vítimas jovens.
d) Qual é o mecanismo imediato mais frequente da morte?`,
        interactionType: "textarea",
        gabarito: `a) Morte inesperada decorrente de causas cardíacas sem aparecimento de sintomas, ou dentro de 1 a 24 horas do início dos sintomas.
b) A doença arterial coronariana, responsável por 80% a 90% dos casos.
c) Em vítimas mais jovens, causas não ateroscleróticas predominam: anormalidades hereditárias ou adquiridas do sistema de condução; anormalidades arteriais coronarianas congênitas; prolapso da valva mitral; miocardite ou sarcoidose; cardiomiopatia dilatada ou hipertrófica; hipertensão pulmonar; hipertrofia do miocárdio (fator de risco independente — alguns atletas que morrem subitamente têm como único achado o aumento inexplicado da massa cardíaca).
d) A arritmia letal — assistolia ou, mais comumente, fibrilação ventricular. Ou seja: a DAC é a causa, mas o mecanismo imediato da morte é elétrico.`
    },
    {
        type: "ASSOCIAÇÃO",
        text: `Associe cada lesão valvar à sua causa:

Lesão
1 Estenose aórtica
2 Insuficiência aórtica
3 Estenose mitral
4 Insuficiência mitral

Causa
( ) Degeneração mixomatosa (prolapso da valva mitral)
( ) Calcificação e esclerose valvar, com deposição de hidroxiapatita
( ) Cardiopatia reumática
( ) Dilatação da aorta, frequentemente por hipertensão e/ou envelhecimento`,
        interactionType: "textarea",
        gabarito: `4 – 1 – 3 – 2

• Degeneração mixomatosa ← insuficiência mitral (4)
• Calcificação e esclerose com hidroxiapatita ← estenose aórtica (1)
• Cardiopatia reumática ← estenose mitral (3)
• Dilatação da aorta ← insuficiência aórtica (2)`
    },
    {
        type: "CASO CLÍNICO",
        text: `Menino de 12 anos apresentou, há três semanas, quadro de faringite com febre, tratado apenas com sintomáticos. Retorna agora com febre, poliartrite migratória de grandes articulações e sopro cardíaco novo. A biópsia endomiocárdica, se realizada, mostraria lesões granulomatosas características.

a) Qual o processo em curso e qual o mecanismo imunológico envolvido?
b) Qual o nome do achado histológico característico?
c) Qual valva é mais frequentemente comprometida a longo prazo e qual lesão resulta?
d) Descreva duas consequências tardias possíveis dessa lesão valvar.`,
        interactionType: "textarea",
        gabarito: `a) Febre reumática aguda, sequela de faringite por estreptococo beta-hemolítico do grupo A. O mecanismo é imunológico, por reação cruzada (mimetismo molecular): os anticorpos produzidos contra antígenos bacterianos reconhecem antígenos do tecido cardíaco, gerando pancardite.
b) Nódulos de Aschoff — lesões granulomatosas características.
c) A valva mitral, evoluindo com doença valvar fibrótica deformante e estenose mitral.
d) Duas consequências: fibrilação atrial (por dilatação e remodelamento do átrio esquerdo obstruído) e edema agudo de pulmão (por transmissão retrógrada da pressão ao leito capilar pulmonar). Também são possíveis o tromboembolismo a partir da estase no AE dilatado, a hipertensão pulmonar e a insuficiência cardíaca direita.`
    },
    {
        type: "FECHADA",
        text: `Sobre as endocardites, assinale a alternativa CORRETA:`,
        interactionType: "multiple-choice",
        options: [
            "A) A endocardite infecciosa é causada em 50 a 60% dos casos por Staphylococcus aureus, componente normal da flora cutânea.",
            "B) A endocardite trombótica não bacteriana cursa com vegetações contendo micro-organismos e intensa reação inflamatória.",
            "C) A endocardite de Libman-Sacks ocorre no lúpus eritematoso sistêmico, com valvulite mitral e tricúspide e pequenas vegetações estéreis.",
            "D) A endocardite infecciosa acomete exclusivamente valvas nativas, nunca o endocárdio mural.",
            "E) A endocardite trombótica não bacteriana é a forma mais comum de endocardite e decorre de bacteriemia transitória."
        ],
        gabarito: `Alternativa C.

Libman-Sacks é a endocardite do LES, com valvulite mitral e tricúspide e pequenas vegetações estéreis.
A está errada: o agente em 50–60% dos casos é o Streptococcus viridans, componente normal da flora da cavidade oral. B está errada: na trombótica não bacteriana as vegetações são estéreis, sem micro-organismos. D está errada: a endocardite infecciosa acomete valvas ou o endocárdio mural. E está errada: a forma mais comum é a infecciosa.`
    },
    {
        type: "CASO CLÍNICO",
        text: `Homem de 58 anos, fumante de 2 maços/dia desde os 15 anos, refere dispneia progressiva, hoje aos mínimos esforços e em repouso, e tosse com escarro marrom-amarelado todas as manhãs ao longo do ano. Ao exame: FR 28 mpm, sentado inclinado para frente com os braços apoiados nos joelhos, lábios cianóticos, uso de musculatura acessória. Tórax com diâmetro anteroposterior aumentado e retração dos arcos costais inferiores à inspiração. Ausculta com sibilos e roncos bilaterais, sem crepitantes. Bulhas rítmicas e hipofonéticas.

a) Qual o diagnóstico e quais os dois componentes fisiopatológicos que compõem essa doença?
b) Explique o mecanismo do aumento do diâmetro anteroposterior e da hipofonese das bulhas.
c) Qual o próximo passo diagnóstico e o que ele informa?
d) Cite quatro complicações crônicas da hipoxemia nessa doença.`,
        interactionType: "textarea",
        gabarito: `a) DPOC com exacerbação aguda. Os dois componentes: bronquite crônica (inflamação da mucosa brônquica, hipertrofia das glândulas submucosas, hipersecreção de muco → tosse produtiva) e enfisema (destruição dos septos alveolares e perda do recolhimento elástico → aprisionamento aéreo).

b) A perda do recolhimento elástico faz as vias aéreas colapsarem na expiração; o ar entra mas não sai completamente → aprisionamento aéreo → hiperinsuflação → aumento do diâmetro anteroposterior (tórax em tonel). O excesso de ar interposto entre o coração e a parede torácica atenua a transmissão do som, produzindo bulhas hipofonéticas.

c) Gasometria arterial, que informa rapidamente o estado da oxigenação (PaO₂) e da ventilação (PaCO₂), além do equilíbrio ácido-base.

d) Hipertensão pulmonar (evoluindo para cor pulmonale), eritrocitose secundária, limitação das atividades físicas e comprometimento da função mental.`
    },
    {
        type: "ABERTA",
        text: `Compare os padrões obstrutivo e restritivo quanto a: problema mecânico predominante, capacidade pulmonar total, volume residual, VEF1, CVF e relação VEF1/CVF. Explique por que a relação VEF1/CVF pode estar normal ou aumentada no padrão restritivo.`,
        interactionType: "textarea",
        gabarito: `| | Obstrutivo | Restritivo |
|---|---|---|
| Problema | dificuldade de expirar; aumento da resistência ao fluxo | dificuldade de encher; redução da expansão do parênquima |
| Capacidade pulmonar total | aumentada | reduzida |
| Volume residual | aumentado (aprisionamento) | reduzido |
| VEF1 | muito reduzido | reduzido |
| CVF | normal ou pouco reduzida | reduzida |
| VEF1/CVF | reduzida (< 0,7) | normal ou aumentada |

No restritivo a relação se mantém ou sobe porque VEF1 e CVF caem proporcionalmente — o pulmão é menor, mas esvazia bem. Na verdade, o pulmão fibrótico tem recolhimento elástico exagerado, o que acelera o esvaziamento e pode até elevar a razão. No obstrutivo, ao contrário, o VEF1 cai muito mais que a CVF, derrubando a relação.`
    },
    {
        type: "FECHADA",
        text: `Sobre enfisema e bronquite crônica, assinale a alternativa INCORRETA:`,
        interactionType: "multiple-choice",
        options: [
            "A) O enfisema caracteriza-se por dilatação irreversível dos espaços aéreos distais ao bronquíolo terminal, com destruição parenquimatosa.",
            "B) A bronquite crônica é definida por tosse produtiva por, no mínimo, 3 meses em pelo menos 2 anos consecutivos, na ausência de outra causa.",
            "C) Na bronquite crônica há hipersecreção de muco nas grandes vias aéreas, associada à hipertrofia das glândulas submucosas.",
            "D) Cerca de 80% dos casos de DPOC desenvolvem-se por causa do tabagismo; outros fatores incluem poluentes ocupacionais e ambientais, hiper-responsividade das vias aéreas e polimorfismos genéticos.",
            "E) No enfisema, o aprisionamento de ar reduz as dimensões anteroposteriores do tórax, produzindo o chamado tórax escavado."
        ],
        gabarito: `Alternativa E.

O aprisionamento de ar aumenta as dimensões anteroposteriores do tórax, produzindo o tórax em tonel (ou em barril). Tórax escavado (pectus excavatum) é uma deformidade congênita da parede, sem relação com enfisema.`
    },
    {
        type: "VERDADEIRO OU FALSO",
        text: `Considerando que o HCO₃⁻ é o componente metabólico e a PaCO₂ o componente respiratório, marque V ou F e corrija as falsas:

I. HCO₃⁻ baixo indica acidose metabólica, e a resposta compensatória esperada é hiperventilação para reduzir o CO₂.
II. PaCO₂ elevada indica acidose respiratória, decorrente de hipoventilação, e a compensação é renal, com elevação do HCO₃⁻.
III. HCO₃⁻ elevado indica alcalose respiratória.
IV. PaCO₂ baixa indica alcalose respiratória, com o paciente hiperventilando e eliminando CO₂.
V. Na alcalose metabólica a compensação esperada é a hipoventilação, para reter CO₂.`,
        interactionType: "textarea",
        gabarito: `• I — VERDADEIRO: A redução primária da concentração de bicarbonato sérico ([HCO₃⁻] < 22 mEq/L) define a acidose metabólica. Como o pH = 6,1 + log([HCO₃⁻] / [0,03 × PaCO₂]), a queda do numerador reduz o pH sanguíneo. A resposta homeostática compensatória rápida é a hiperventilação (estímulo aos quimiorreceptores do bulbo e corpos carotídeos), que "lava" CO₂ e reduz a PaCO₂ (prevista pela fórmula de Winter: PaCO₂ esperada = 1,5 × [HCO₃⁻] + 8 ± 2) para atenuar a acidemia.

• II — VERDADEIRO: A elevação primária da PaCO₂ (> 45 mmHg) define a acidose respiratória, decorrente de hipoventilação alveolar (ex.: depressão do SNC por opioides, DPOC, fadiga neuromuscular). A compensação é exercida pelos rins, que aumentam a excreção de íons H⁺ e a reabsorção/geração tubular de novo bicarbonato ([HCO₃⁻]), processo que leva de 24 a 72 horas para se estabelecer plenamente.

• III — FALSO: A elevação primária do bicarbonato ([HCO₃⁻] > 26–28 mEq/L) define ALCALOSE METABÓLICA, e não alcalose respiratória. A alcalose respiratória é caracterizada primariamente pela redução patológica da PaCO₂ (< 35 mmHg) decorrente de hiperventilação alveolar aguda ou crônica.

• IV — VERDADEIRO: A redução primária da PaCO₂ abaixo dos limites basais (< 35 mmHg) define a alcalose respiratória. Ela ocorre quando o paciente hiperventila (por ansiedade, sepse inicial, embolia pulmonar, crise de dor, gravidez ou ventilação mecânica excessiva), eliminando CO₂ a uma taxa superior à sua produção metabólica tecidual.

• V — VERDADEIRO: Na alcalose metabólica primária (excesso de bases ou perda de ácidos como em vômitos incoercíveis), o organismo tenta compensar o aumento do pH alveolar diminuindo a ventilação-minuto (hipoventilação alveolar compensatória), permitindo que o CO₂ seja retido no sangue e eleve a PaCO₂ para contrabalançar o excesso de bicarbonato (embora limitada pela necessidade de manter oxigenação tecidual mínima).`
    },
    {
        type: "ABERTA",
        text: `Explique o princípio mecânico da ventilação a partir da frase "maior pressão → menor pressão". Por que a pressão intrapulmonar precisa se tornar negativa para que haja entrada de ar? Relacione isso com o que ocorre no pneumotórax.`,
        interactionType: "textarea",
        gabarito: `O gás sempre se desloca da região de maior pressão para a de menor pressão. Para que o ar entre nos pulmões, é obrigatório que a pressão dentro do pulmão se torne menor (negativa) em relação à atmosférica — o que se consegue pela contração do diafragma e dos intercostais, que expande a caixa torácica e, por consequência, o pulmão a ela acoplado pela pleura. Sem gradiente de pressão não há fluxo, e portanto não há respiração nem troca gasosa.

No pneumotórax, o ar entra no espaço pleural e desfaz a pressão negativa intrapleural que mantinha o pulmão aderido à parede torácica. Perdido o acoplamento, o pulmão colapsa por seu próprio recolhimento elástico: mesmo que a caixa torácica se expanda, aquele pulmão não é mais tracionado, o gradiente não se forma e a ventilação daquele lado cessa.`
    },
    {
        type: "CASO CLÍNICO",
        text: `Homem de 37 anos, não fumante, refere tosse não produtiva há três meses, que piora à noite e após exercício. Iniciou recentemente um programa de corrida e relata que tem muita dificuldade, com falta de ar rápida e tosse intensa. Nega febre, hemoptise ou perda de peso. Ao exame, pulmões limpos, exceto por sibilos expiratórios ocasionais na expiração forçada. Radiografia de tórax normal.

a) Qual o diagnóstico mais provável e como confirmá-lo?
b) Descreva as alterações histológicas esperadas nas vias aéreas desse paciente.
c) Por que a radiografia normal não afasta o diagnóstico?
d) Cite dois achados laboratoriais que apoiam o diagnóstico.`,
        interactionType: "textarea",
        gabarito: `a) Asma (doença reativa das vias aéreas). Confirmação: provas de função pulmonar; se a espirometria basal for normal, faz-se broncoprovocação com metacolina, demonstrando hiper-responsividade.
b) Espessamento da parede das vias aéreas, hipertrofia da musculatura lisa brônquica, aumento das glândulas submucosas com hipersecreção de muco, espessamento da membrana basal e infiltrado inflamatório rico em eosinófilos, mastócitos e linfócitos T.
c) Porque a asma é doença funcional e episódica das vias aéreas — fora da crise, e mesmo durante ela, o parênquima permanece estruturalmente normal. A radiografia serve para afastar outras causas, não para confirmar asma.
d) Eosinofilia no sangue periférico e achado de eosinófilos (no escarro/secreção), além da demonstração de aumento da obstrução ao fluxo aéreo com dificuldade na exalação.`
    },
    {
        type: "FECHADA",
        text: `Sobre a asma, assinale a alternativa INCORRETA:`,
        interactionType: "multiple-choice",
        options: [
            "A) A asma atópica decorre de sensibilização a alérgenos com ativação imune, sendo uma reação de hipersensibilidade mediada por IgE (tipo I).",
            "B) As células TH2 são o tipo de linfócito T dominante na doença, com contribuição de células TH17 produtoras de IL-17, que recrutam neutrófilos.",
            "C) Os leucotrienos C4, D4 e E4 e a acetilcolina causam broncoconstrição prolongada.",
            "D) A histamina é um potente broncoconstritor e a prostaglandina D2 estimula broncoconstrição e vasodilatação.",
            "E) A asma não atópica caracteriza-se por níveis muito elevados de IgE específica e testes cutâneos fortemente positivos para aeroalérgenos."
        ],
        gabarito: `Alternativa E.

A asma não atópica é justamente aquela sem evidência de sensibilização a alérgenos. A descrição de IgE específica elevada e testes cutâneos positivos corresponde à asma atópica.`
    },
    {
        type: "ABERTA",
        text: `Diferencie a reação inicial e a reação de fase tardia da asma quanto aos fenômenos predominantes e às células envolvidas.`,
        interactionType: "textarea",
        gabarito: `Reação inicial — dominada por broncoconstrição, aumento da produção de muco e graus variáveis de vasodilatação e aumento da permeabilidade vascular. É a resposta imediata, mediada sobretudo pelos mediadores pré-formados e recém-sintetizados dos mastócitos (histamina, leucotrienos, prostaglandina D2).

Reação de fase tardia — dominada pelo recrutamento de leucócitos, notadamente eosinófilos, neutrófilos e mais células T. É a fase que sustenta a inflamação crônica, o remodelamento das vias aéreas e a persistência da hiper-responsividade.`
    },
    {
        type: "CASO CLÍNICO",
        text: `Mulher de 45 anos com história de infecções respiratórias de repetição desde a infância. Queixa-se de tosse severa e persistente, com expectoração abundante, de odor fétido e por vezes sanguinolenta. Tomografia mostra dilatação de brônquios, mais acentuada nos lobos inferiores bilateralmente.

a) Qual o diagnóstico e o mecanismo da lesão?
b) Quais são as duas condições geralmente necessárias para o desenvolvimento das lesões completas?
c) Por que os sintomas são episódicos?
d) Cite uma doença genética que cursa classicamente com esse quadro e explique o elo fisiopatológico.`,
        interactionType: "textarea",
        gabarito: `a) Bronquiectasia — dilatação permanente e irreversível de brônquios e bronquíolos, resultante da destruição do músculo liso e do tecido elástico por infecções necrotizantes crônicas.
b) Obstrução e infecção. São as principais condições associadas, e é provável que ambas sejam necessárias para o desenvolvimento das lesões completas.
c) Porque são frequentemente precipitados por infecções do trato respiratório superior ou pela introdução de novos agentes patogênicos, que reagudizam o ciclo de inflamação e destruição.
d) Fibrose cística. O elo: o defeito no canal de cloreto (CFTR) altera o transporte iônico → secreções viscosas → depuração mucociliar defeituosa e obstrução das vias aéreas → cenário propício a infecções bacterianas crônicas → dano difuso às paredes → destruição do músculo liso e do tecido elástico → bronquiectasia, enquanto os pequenos bronquíolos são obliterados por fibrose (bronquiolite obliterante).`
    },
    {
        type: "ASSOCIAÇÃO",
        text: `Associe cada tipo de atelectasia ao seu mecanismo:

Tipo
1 Atelectasia de reabsorção
2 Atelectasia de compressão
3 Atelectasia de contração

Mecanismo
( ) Fibrose pleural ou pulmonar, focal ou generalizada, que impede a expansão total do pulmão
( ) Obstrução completa de via aérea, com o pulmão distal não conseguindo se expandir
( ) Acúmulo de volumes significativos de líquido, tumor ou ar na cavidade pleural`,
        interactionType: "textarea",
        gabarito: `3 – 1 – 2

• Fibrose que impede a expansão ← contração (3)
• Obstrução completa de via aérea ← reabsorção (1)
• Líquido, tumor ou ar na cavidade pleural ← compressão (2)`
    },
    {
        type: "CASO CLÍNICO",
        text: `Mulher de 75 anos, hipertensa e diabética, com tosse, febre de 38,8 °C e escarro purulento há três dias. Ao exame do aparelho respiratório: frêmito toracovocal aumentado, macicez à percussão, ruídos respiratórios brônquicos e broncofonia em terço inferior do hemitórax esquerdo. Leucócitos 14.000/mm³. Radiografia com infiltrado em lobo inferior esquerdo.

a) Qual o diagnóstico e o agente etiológico mais provável?
b) Explique o mecanismo que gera esse conjunto de achados semiológicos.
c) Se em vez desses achados a paciente apresentasse frêmito diminuído e murmúrio abolido, qual seria a hipótese e por quê?
d) Cite dois marcadores laboratoriais úteis para diferenciar infecção bacteriana de viral e explique sua origem.`,
        interactionType: "textarea",
        gabarito: `a) Pneumonia adquirida na comunidade, muito provavelmente por Streptococcus pneumoniae.
b) O alvéolo se enche de exsudato inflamatório e o pulmão, antes cheio de ar, torna-se sólido. Meio sólido conduz som melhor que o ar — daí o frêmito toracovocal aumentado, a macicez à percussão, os ruídos respiratórios brônquicos e a broncofonia.
c) Derrame pleural. Nesse caso há líquido entre as pleuras, que afasta o parênquima da parede torácica. O som produzido nas vias aéreas não chega bem à superfície: o frêmito diminui e o murmúrio fica abolido, embora a percussão também seja maciça. A dupla consolidação/derrame se distingue justamente pelo frêmito — aumentado numa, diminuído na outra.
d) Proteína C-reativa e procalcitonina — ambos reagentes de fase aguda produzidos primariamente no fígado, significativamente mais elevados em infecções bacterianas do que em virais.`
    },
    {
        type: "FECHADA",
        text: `Sobre as infecções pulmonares, assinale a alternativa INCORRETA:`,
        interactionType: "multiple-choice",
        options: [
            "A) Streptococcus pneumoniae é o agente causador mais comum de pneumonia aguda adquirida na comunidade e é um Gram-positivo.",
            "B) Klebsiella pneumoniae é a causa mais frequente de pneumonia bacteriana por Gram-negativos, acometendo comumente indivíduos debilitados e desnutridos, em especial alcoolistas crônicos.",
            "C) A invasão bacteriana do parênquima pulmonar causa preenchimento dos alvéolos com exsudato inflamatório.",
            "D) A proteína C-reativa e a procalcitonina são reagentes de fase aguda produzidos primariamente no fígado.",
            "E) No vírus influenza, a hemaglutinina possui dois subtipos principais (H1 e H2) e a neuraminidase possui três (N1 a N3)."
        ],
        gabarito: `Alternativa E.

Está invertido: a hemaglutinina tem três subtipos principais (H1 a H3) e a neuraminidase tem dois (N1 e N2).`
    },
    {
        type: "ABERTA",
        text: `Compare síndrome de consolidação e derrame pleural quanto a frêmito toracovocal, percussão, murmúrio vesicular e ausculta da voz. Explique o princípio físico que justifica as diferenças.`,
        interactionType: "textarea",
        gabarito: `| | Consolidação | Derrame pleural |
|---|---|---|
| Frêmito toracovocal | aumentado | diminuído |
| Percussão | macicez / submacicez | macicez |
| Murmúrio vesicular | diminuído, com sopro tubário | abolido |
| Ausculta da voz | broncofonia, pectorilóquia | reduzida ou abolida |

Princípio físico: o som se propaga melhor em meios sólidos e contínuos do que em meios com ar. Na consolidação, o alvéolo cheio de exsudato transforma o pulmão em um bloco sólido em continuidade com a parede torácica — o som chega reforçado. No derrame, existe uma camada de líquido interposta que separa o pulmão da parede: essa descontinuidade de meios reflete e dispersa o som, que chega atenuado.`
    },
    {
        type: "CASO CLÍNICO",
        text: `Mulher de 48 anos chega ao pronto-socorro com dispneia de início súbito. Estava em pé na cozinha quando sentiu falta de ar, percebeu o coração disparar e quase desmaiou. Nega dor torácica e febre. Fez colecistectomia há duas semanas, com internação de oito dias por infecção da ferida operatória. Ao exame: FR 28 mpm, saturação 84% em ar ambiente, FC 124 bpm, PA 118/89 mmHg, mucosa levemente cianótica, pressão venosa jugular elevada, pulmões limpos, hiperfonese de B2 no foco pulmonar. Perna direita edemaciada e dolorosa. ECG com taquicardia sinusal e radiografia de tórax normal.

a) Qual o diagnóstico e a origem mais provável do evento?
b) Explique o mecanismo da hipoxemia grave com radiografia normal.
c) Explique a hiperfonese de B2 e a turgência jugular.
d) Cite três fatores de risco presentes ou possíveis, incluindo estados de hipercoagulabilidade primários e secundários.`,
        interactionType: "textarea",
        gabarito: `a) Tromboembolismo pulmonar (TEP), quase certamente originado de trombose venosa profunda do membro inferior direito.
b) O êmbolo obstrui um ramo da artéria pulmonar e cria uma área ventilada, mas não perfundida — aumento do espaço morto. O parênquima permanece estruturalmente normal, por isso a radiografia é normal; mas o sangue deixa de passar por aquela região e é redistribuído, gerando distúrbio da relação ventilação/perfusão (V/Q) e hipoxemia.
c) A obstrução aumenta abruptamente a resistência vascular pulmonar → elevação da pressão na artéria pulmonar → o componente pulmonar da segunda bulha fecha com mais força → hiperfonese de B2. A sobrecarga aguda do ventrículo direito dificulta o retorno venoso sistêmico → turgência jugular. Se maciço, configura cor pulmonale agudo.
d) Presentes: imobilização durante a internação de oito dias, cirurgia recente e estado inflamatório/infeccioso pós-operatório. Outros fatores de hipercoagulabilidade citados no material: primários — fator V de Leiden, mutações da protrombina, síndrome antifosfolipídio; secundários — obesidade, câncer, uso de contraceptivos orais, gravidez.`
    },
    {
        type: "VERDADEIRO OU FALSO",
        text: `Marque V ou F e corrija as falsas:

I. Derrame pleural é o acúmulo de níveis anormais de líquido na cavidade pleural, podendo ser transudato, exsudato, purulento, quiloso ou sanguíneo.
II. Hemotórax é um tipo específico de derrame pleural em que há sangue na cavidade pleural, podendo decorrer de trauma torácico, cirurgia, câncer ou ruptura de grande vaso.
III. Pneumotórax é a existência de líquido no espaço pleural, sendo sempre traumático.
IV. A síndrome da angústia respiratória aguda é um tipo de insuficiência respiratória com acúmulo de líquidos nos pulmões e redução do oxigênio sanguíneo a níveis excessivamente baixos.
V. Na embolia pulmonar, a morte súbita ocorre em grande parte pelo bloqueio do fluxo sanguíneo nos pulmões, podendo também decorrer de insuficiência cardíaca aguda direita.`,
        interactionType: "textarea",
        gabarito: `• I — VERDADEIRO: O derrame pleural consiste no acúmulo patológico de líquido na cavidade pleural (entre os folhetos parietal e visceral, cujo volume fisiológico normal é de apenas 0,1 a 0,3 mL/kg). De acordo com os critérios de Light e mecanismos fisiopatológicos, pode ser: transudato (desequilíbrio de pressões hidrostática/oncótica, como na IC ou cirrose); exsudato (aumento de permeabilidade capilar inflamatória ou neoplásica); purulento (empiema pleural bacteriano); quiloso (quilotórax por obstrução do ducto torácico rico em triglicerídeos); ou hemático/sanguíneo (hemotórax).

• II — VERDADEIRO: O hemotórax é uma forma específica e grave de derrame caracterizada pela presença maciça de sangue na cavidade pleural, definida laboratorialmente quando o hematócrito do líquido pleural é igual ou superior a 50% do hematócrito sanguíneo periférico. Suas principais causas incluem trauma torácico contuso ou penetrante, iatrogenia cirúrgica/procedimental, ruptura de aneurismas aórticos ou neoplasias vasculares pleurais.

• III — FALSO: A assertiva contém dois erros fundamentais:
  1) Pneumotórax é o acúmulo patológico de AR (gás) no espaço pleural, e não de líquido.
  2) NÃO é sempre traumático: além das causas traumáticas e iatrogênicas, existe o pneumotórax espontâneo, que pode ser primário (em jovens altos, magros, sem doença pulmonar prévia, por rotura de pequenas bolhas subpleurais apicais - "blebs") ou secundário a pneumopatias estruturais subjacentes (DPOC, tuberculose, pneumocistose).

• IV — VERDADEIRO: A Síndrome do Desconforto Respiratório Agudo (SDRA / SARA, conforme a Definição de Berlim) é uma forma catastrófica de insuficiência respiratória hipoxêmica não cardiogênica decorrente de inflamação pulmonar ou sistêmica aguda grave (como sepse ou pneumonia). O dano alveolar difuso e a lesão da barreira endotelial-alveolar levam a inundação de exsudato rico em proteínas nos alvéolos, perda e inativação de surfactante, atelectasias difusas, aumento do shunt intrapulmonar direito-esquerdo e hipoxemia refratária (PaO₂/FiO₂ ≤ 300 mmHg).

• V — VERDADEIRO: No tromboembolismo pulmonar maciço (oclusão de ramos lobares ou tronco da artéria pulmonar > 50% da vasculatura pulmonar), a resistência vascular pulmonar aumenta abruptamente, impondo uma pós-carga insuperável ao ventrículo direito. O VD dilata-se agudamente, falha mecanicamente (cor pulmonale agudo) e desloca o septo interventricular para o interior do VE, impedindo o enchimento ventricular esquerdo e precipitando choque obstrutivo cardiogênico com colapso hemodinâmico e morte súbita.`
    }
];
