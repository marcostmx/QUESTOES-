export const farmaco_16_30 = [
{ type: "MÚLTIPLA ESCOLHA", text: `Para que um fármaco administrado por via oral produza seu efeito sistêmico, ele precisa atravessar membranas biológicas. Qual é o principal mecanismo de transporte responsável pela absorção da maioria dos fármacos?`, interactionType: "multiple-choice", options: [
"A) Transporte ativo, consumindo ATP para empurrar o fármaco contra o gradiente de concentração.",
"B) Difusão facilitada, dependendo exclusivamente de proteínas carreadoras.",
"C) Difusão passiva, em que o fármaco atravessa a bicamada lipídica a favor do gradiente de concentração, sem gasto de energia.",
"D) Pinocitose, processo pelo qual a célula engloba o fármaco juntamente com fluido extracelular.",
"E) Filtração aquosa através dos poros da membrana, independente do tamanho da molécula."
], gabarito: `**Alternativa C**

**Por que C está certa:** a difusão passiva é o mecanismo fundamental da farmacocinética. Mais de 90% dos fármacos são absorvidos assim: moléculas pequenas e lipossolúveis escorregam pela bicamada lipídica, do meio mais concentrado para o menos concentrado, sem gastar energia e sem precisar de carreador.
**A — ERRADA.** O transporte ativo existe (ex.: bomba de prótons, transportadores P-gp), mas não é o mecanismo principal de absorção da grande maioria dos fármacos.
**B — ERRADA.** Difusão facilitada usa carreador, mas não é a via principal.
**D — ERRADA.** A pinocitose (endocitose) é reservada a moléculas excepcionalmente grandes (ex.: vitamina B12 intrínseco), irrelevante para fármacos comuns.
**E — ERRADA.** A filtração aquosa só permite a passagem de moléculas minúsculas (peso molecular < 100 Da) hidrossolúveis, o que exclui a quase totalidade das drogas.` },
{ type: "MÚLTIPLA ESCOLHA", text: `O ácido acetilsalicílico (AAS) é um ácido fraco. Considerando o grau de ionização e o pH dos compartimentos do trato gastrointestinal, onde ocorrerá a maior taxa de absorção do AAS?`, interactionType: "multiple-choice", options: [
"A) No estômago (pH 1 a 3), pois lá o AAS estará predominantemente na forma não ionizada (lipossolúvel).",
"B) No intestino delgado (pH 6 a 8), pois a forma ionizada é a que atravessa melhor a membrana celular.",
"C) No estômago, pois a acidez aumenta a ionização do fármaco.",
"D) No intestino grosso, devido ao pH neutro, que facilita a ação de transportadores ativos.",
"E) No esôfago, pelo tempo prolongado de trânsito."
], gabarito: `**Alternativa A**

**Por que A está certa:** é a aplicação direta da regra de ouro da absorção: semelhante não ioniza semelhante. O AAS é um ácido fraco; no meio ácido do estômago, ele recebe prótons (H+) e permanece predominantemente na forma não ionizada (neutra, molecular). Sendo não ionizada, a molécula é mais lipossolúvel e atravessa a membrana lipídica com facilidade.
**B — ERRADA.** No intestino (meio básico), o AAS cederia prótons, transformando-se na forma ionizada. A forma ionizada é polar, atrai água e NÃO atravessa bem a membrana.
**C — ERRADA.** A acidez suprime a ionização do ácido, não a aumenta.
**D e E — ERRADAS.** Sem fundamento físico-químico; o esôfago não tem absorção e a ionização é o fator chave aqui.` },
{ type: "MÚLTIPLA ESCOLHA", text: `Você é chamado à emergência para avaliar um paciente jovem trazido após ingestão voluntária de grande quantidade de fenobarbital (um barbitúrico de caráter ácido fraco). Qual das seguintes medidas favorece a excreção renal desse fármaco e qual o princípio farmacológico envolvido?`, interactionType: "multiple-choice", options: [
"A) Acidificação da urina com vitamina C, para aumentar a forma não ionizada do fármaco no filtrado glomerular.",
"B) Alcalinização da urina com bicarbonato de sódio, para aumentar a fração ionizada do fármaco no túbulo, impedindo sua reabsorção (aprisionamento iônico).",
"C) Alcalinização da urina, para neutralizar a acidez sanguínea causada pelo medicamento.",
"D) Acidificação da urina, para aumentar a reabsorção tubular e prolongar o efeito.",
"E) A administração de diurético de alça isoladamente, sem alterar o pH, pois o pH não interfere na excreção de ácidos."
], gabarito: `**Alternativa B**

**Por que B está certa:** é a principal aplicação clínica do conceito de pKa (ionização) em toxicologia. Para eliminar uma substância ácida (como o fenobarbital ou o AAS) mais rapidamente, devemos alcalinizar a urina. No meio tubular alcalino, o fármaco ácido cede prótons e fica ionizado. Molécula ionizada não consegue atravessar a membrana da célula tubular para voltar ao sangue (reabsorção); ela fica "aprisionada" na luz do túbulo e é excretada. Esse é o aprisionamento iônico.
**A — ERRADA.** Acidificar a urina faria um ácido fraco ficar não ionizado (lipossolúvel), favorecendo sua reabsorção para o sangue — piorando a intoxicação. (Acidificar a urina seria útil para intoxicação por bases fracas, como as anfetaminas).
**C — ERRADA.** O objetivo do bicarbonato não é corrigir pH sistêmico, e sim alcalinizar o lúmen tubular para prender o fármaco na urina.
**D — ERRADA.** Acidificar de fato aumenta a reabsorção, mas o objetivo na intoxicação é eliminar o fármaco, não prolongar o efeito.
**E — ERRADA.** O pH urinário é o principal determinante da reabsorção tubular de ácidos e bases fracas.` },
{ type: "MÚLTIPLA ESCOLHA", text: `A distribuição é a passagem do fármaco da circulação sistêmica para os tecidos. Sobre os fatores que afetam essa etapa, é CORRETO afirmar que:`, interactionType: "multiple-choice", options: [
"A) A fração do fármaco ligada às proteínas plasmáticas é a responsável por atravessar as membranas capilares e gerar o efeito farmacológico.",
"B) Fármacos altamente lipossolúveis têm facilidade em ultrapassar a barreira hematoencefálica (BHE) e atingir o Sistema Nervoso Central.",
"C) A hipoalbuminemia (baixa de albumina no sangue) diminui a fração livre dos fármacos ácidos, reduzindo seu efeito tóxico.",
"D) O tecido adiposo recebe a maior parte do fluxo sanguíneo inicial (fase rápida da distribuição), por isso acumula fármacos mais rapidamente que o cérebro.",
"E) A ligação às proteínas plasmáticas é irreversível; uma vez ligado, o fármaco é inativado definitivamente."
], gabarito: `**Alternativa B**

**Por que B está certa:** a barreira hematoencefálica é formada por células endoteliais com junções oclusivas (tight junctions) e revestida por astrócitos, sem fendas intercelulares abertas. A única forma de um fármaco atravessá-la (além de transportadores específicos) é sendo altamente lipossolúvel para cruzar as membranas celulares diretamente (ex.: anestésicos gerais, diazepam).
**A — ERRADA.** A fração ligada à proteína (macromolécula) fica "presa" no vaso. Apenas a fração LIVRE é capaz de sair do capilar, alcançar o tecido e gerar o efeito farmacológico (e sofrer eliminação). A proteína age como um reservatório circulante.
**C — ERRADA.** Se a albumina cai, há menos proteína para "segurar" o fármaco; logo, a fração livre AUMENTA. Mais fração livre significa maior risco de toxicidade, não menor.
**D — ERRADA.** A fase inicial (rápida) da distribuição é determinada pelo fluxo sanguíneo, que prioriza os órgãos nobres: coração, cérebro, fígado e rins. O tecido adiposo é mal vascularizado e recebe o fármaco na fase tardia da distribuição.
**E — ERRADA.** A ligação fármaco-proteína é reversível (equilíbrio dinâmico). À medida que a fração livre sai do vaso, a fração ligada se solta da proteína para manter o equilíbrio.` },
{ type: "MÚLTIPLA ESCOLHA", text: `Pacientes idosos, pacientes com desnutrição grave ou com cirrose hepática costumam apresentar hipoalbuminemia. Qual o impacto farmacocinético mais imediato dessa condição ao se administrar um fármaco como a fenitoína, que possui alta taxa de ligação às proteínas plasmáticas (90%)?`, interactionType: "multiple-choice", options: [
"A) Redução do volume de distribuição, concentrando o fármaco apenas no plasma.",
"B) Aumento da fração ligada da fenitoína, diminuindo sua eficácia terapêutica.",
"C) Aumento significativo da fração livre do fármaco, elevando o risco de toxicidade.",
"D) Aceleração do metabolismo hepático de primeira passagem, necessitando de doses maiores.",
"E) Inibição da excreção renal por acúmulo de complexos fármaco-proteína no glomérulo."
], gabarito: `**Alternativa C**

**Por que C está certa:** a fenitoína é o exemplo clássico dessa interação endógena. Normalmente, de cada 100 moléculas de fenitoína no sangue, 90 estão presas à albumina e 10 estão livres (ativas). Se o paciente não tem albumina suficiente (cirrose, desnutrição), menos moléculas são sequestradas. Se a fração livre saltar de 10% para 20%, a quantidade de fármaco ativo no corpo dobrou sem que você tenha mexido na dose, resultando em toxicidade (ataxia, nistagmo).
**A — ERRADA.** Com mais fármaco livre, mais fármaco escapa do vaso para os tecidos, então o volume de distribuição tende a aumentar, não diminuir.
**B — ERRADA.** Ocorre o inverso: a fração ligada diminui.
**D e E — ERRADAS.** A falta de albumina altera a distribuição; o metabolismo e a excreção não são primariamente afetados por ela, e a filtração glomerular só filtra a fração livre.` },
{ type: "MÚLTIPLA ESCOLHA", text: `Sobre o processo de biotransformação (metabolismo) dos fármacos, analise as afirmativas:
I. O objetivo primário da biotransformação é tornar o fármaco mais hidrofílico (polar) para facilitar sua excreção renal.
II. As reações de Fase 1 (ex.: oxidação pelo citocromo P450) geralmente inserem ou expõem um grupo polar na molécula.
III. As reações de Fase 2 (conjugação, como a glicuronidação) anexam uma molécula endógena grande e polar ao fármaco.
IV. Pró-fármacos (ex.: enalapril) são administrados na forma inativa e dependem da biotransformação para serem convertidos no metabólito ativo.
Está(ão) correta(s):`, interactionType: "multiple-choice", options: ["A) I e II, apenas.", "B) II e III, apenas.", "C) I, III e IV, apenas.", "D) II, III e IV, apenas.", "E) I, II, III e IV."], gabarito: `**Alternativa E — todas estão corretas**

Esta questão é um excelente resumo do metabolismo.
**I — CORRETA.** Essa é a razão de existir do metabolismo hepático. Fármacos lipossolúveis (a maioria, para poderem ser absorvidos) não conseguem ser excretados pelo rim, porque são reabsorvidos no túbulo. O fígado precisa "grudar" polaridade neles para que a urina consiga levá-los embora.
**II — CORRETA.** Fase 1 = reações de funcionalização (oxidação, redução, hidrólise). A mais famosa é a oxidação pelas enzimas do complexo CYP450 (ex.: CYP3A4). A ideia é destampar ou acoplar uma "alça" polar (um grupo -OH, por exemplo).
**III — CORRETA.** Fase 2 = reações de conjugação. O fígado pega uma molécula gigante e hidrossolúvel (ácido glicurônico, glutationa, sulfato) e "amarra" na alça exposta na Fase 1. O resultado é um metabólito enorme, inativo e extremamente solúvel, pronto para ir para a urina ou bile.
**IV — CORRETA.** Embora o metabolismo geralmente inative fármacos, a exceção notável é o pró-fármaco. Ele nasce inativo e usa as enzimas hepáticas (fase 1) para ser convertido em ativo (enalapril → enalaprilato).` },
{ type: "MÚLTIPLA ESCOLHA", text: `O citocromo P450 (CYP) é o principal sistema enzimático envolvido no metabolismo de fase 1. Sobre os conceitos de inibição e indução enzimática, assinale a alternativa CORRETA.`, interactionType: "multiple-choice", options: [
"A) Um fármaco indutor enzimático (ex.: fenobarbital) diminui a síntese de enzimas do CYP, aumentando a concentração plasmática de outros fármacos administrados concomitantemente.",
"B) Se um paciente em uso de anticoncepcional oral inicia tratamento com rifampicina (forte indutor enzimático), espera-se falha do contraceptivo devido à destruição mais rápida do hormônio.",
"C) Um fármaco inibidor enzimático acelera a biotransformação de outros medicamentos, diminuindo seu efeito e exigindo aumento de dose.",
"D) A inibição enzimática é um processo genético lento, que demora semanas para se manifestar, ao passo que a indução enzimática é imediata.",
"E) A indução enzimática de pró-fármacos reduz suas concentrações ativas no sangue, diminuindo sua toxicidade."
], gabarito: `**Alternativa B**

**Por que B está certa:** é a interação medicamentosa clássica (e perigosa) de prova. A rifampicina "acorda" o fígado, induzindo (fabricando mais) enzimas do CYP450. Com mais enzimas trabalhando, o metabolismo do estrogênio/progesterona do anticoncepcional fica acelerado. O hormônio é destruído antes de fazer efeito, o nível no sangue cai e a paciente pode engravidar.
**A — ERRADA.** Indutor enzimático *aumenta* a síntese de enzimas. O metabolismo acelera, então a concentração do fármaco concomitante *cai*.
**C — ERRADA.** Inibidor enzimático (ex.: cetoconazol) trava o fígado. A biotransformação desacelera, o fármaco alvo acumula, a concentração sobe e há risco de intoxicação, exigindo *redução* de dose.
**D — ERRADA.** É o inverso! A indução enzimática exige transcrição e síntese de novas proteínas, o que demora dias ou semanas. A inibição enzimática é imediata (competição química pelo sítio da enzima no minuto em que os dois chegam ao fígado).
**E — ERRADA.** Se o fígado é induzido e o fármaco é um *pró-fármaco*, a conversão de inativo para ativo vai acelerar. O nível da forma ativa no sangue vai *subir*, aumentando a toxicidade.` },
{ type: "MÚLTIPLA ESCOLHA", text: `Paciente de 60 anos é portador de insuficiência renal crônica (clearance de creatinina = 20 mL/min). O médico prescreve um antibiótico cuja excreção é predominantemente renal e que possui índice terapêutico estreito. Qual o principal ajuste farmacocinético necessário e qual a razão?`, interactionType: "multiple-choice", options: [
"A) Aumentar a dose do antibiótico, pois o rim danificado filtrará o fármaco mais rapidamente.",
"B) Reduzir a dose ou aumentar o intervalo entre as doses, pois a taxa de excreção está diminuída, levando ao acúmulo e risco de toxicidade.",
"C) Manter a dose e associar um diurético, pois o fluxo urinário forçado compensa a perda de filtração glomerular.",
"D) Aumentar a frequência de administração, para compensar a má absorção típica do doente renal.",
"E) Mudar a via de administração para intravenosa, o que evita a passagem pelo rim."
], gabarito: `**Alternativa B**

**Por que B está certa:** a principal consequência da insuficiência renal crônica é a queda da filtração glomerular e da secreção tubular. Fármacos eliminados pelo rim (como penicilinas, aminoglicosídeos e digoxina) terão seu tempo de meia-vida (T1/2) severamente prolongado. Se a dose normal for mantida, o fármaco vai se acumular no sangue, superando a janela terapêutica e gerando toxicidade. A conduta é esticar o intervalo entre as tomadas (ex.: em vez de 8/8h, dar de 12/12h ou 24/24h) ou reduzir o tamanho da dose.
**A — ERRADA.** O rim insuficiente filtra mais lentamente. Aumentar a dose é iatrogenia (causará intoxicação).
**C — ERRADA.** O problema não é falta de volume de urina (diurese), e sim de filtração (perda de néfrons). O diurético de alça não melhora o *clearance* de creatinina ou a eliminação de substâncias não filtradas.
**D — ERRADA.** Aumentar frequência faria o fármaco acumular ainda mais rápido.
**E — ERRADA.** A via intravenosa apenas deposita o fármaco 100% no sangue. Eventualmente ele terá que sair, e a via de saída continua sendo o rim falido.` },
{ type: "MÚLTIPLA ESCOLHA", text: `O tempo de meia-vida (T1/2) é um parâmetro farmacocinético fundamental para definir posologias. Assinale a alternativa que define CORRETAMENTE esse parâmetro e suas implicações.`, interactionType: "multiple-choice", options: [
"A) É o tempo necessário para que metade do comprimido seja dissolvida no estômago.",
"B) É o tempo necessário para que a concentração plasmática do fármaco seja reduzida à metade (50%) por meio dos processos de eliminação.",
"C) Determina o momento exato em que o efeito terapêutico cessa completamente.",
"D) Independentemente do T1/2 do fármaco, a dose de manutenção deve ser sempre administrada a cada 12 horas.",
"E) Se um fármaco tem T1/2 de 4 horas, são necessárias 4 horas para eliminá-lo totalmente do organismo."
], gabarito: `**Alternativa B**

**Por que B está certa:** o T1/2 de eliminação é o tempo necessário para o corpo eliminar 50% da quantidade de fármaco que está no sangue. Se o sangue tem 100 mg/L e o T1/2 é 4 horas, em 4h a concentração cairá para 50 mg/L. Na prática, o T1/2 dita o intervalo das doses: a droga de meia-vida curta é tomada várias vezes ao dia; a de meia-vida longa, uma vez ao dia. Além disso, o T1/2 determina quando se atinge o estado de equilíbrio (steady-state).
**A — ERRADA.** Refere-se à concentração no sangue na fase de eliminação, não à dissolução da pílula.
**C — ERRADA.** O efeito terapêutico não acaba exata e mecanicamente com uma meia-vida. O efeito dura enquanto a concentração se mantiver acima da Concentração Mínima Efetiva (CME).
**D — ERRADA.** O intervalo das doses é diretamente dependente do T1/2.
**E — ERRADA.** Se o T1/2 é 4 horas, em 4h a concentração cai a 50%. Passadas mais 4h, cai metade do que sobrou (para 25%). São necessárias de 4 a 5 meias-vidas (16 a 20 horas, neste caso) para que o corpo seja considerado "limpo" (quando resta menos de 5% da droga).` },
{ type: "MÚLTIPLA ESCOLHA", text: `[INSERIR IMAGEM DA QUESTÃO 20 AQUI]
O gráfico ilustra a curva de concentração plasmática após doses orais sucessivas e repetidas de um fármaco, em intervalos regulares iguais à sua meia-vida. Nota-se que, após algumas doses, a concentração flutua dentro de uma faixa estável (patamar). O nome desse estado, no qual a quantidade de fármaco que entra no corpo é igual à quantidade que é eliminada, é:`, interactionType: "multiple-choice", options: [
"A) Efeito de primeira passagem.",
"B) Volume de distribuição aparente.",
"C) Concentração Máxima (Cmáx).",
"D) Estado de equilíbrio dinâmico (steady-state).",
"E) Saturação de primeira ordem."
], gabarito: `**Alternativa D**

**Por que D está certa:** esse é o conceito de *steady-state* (estado de equilíbrio, patamar ou concentração de platô). Quando iniciamos um tratamento de longo prazo (como para hipertensão ou depressão), damos doses sucessivas. A cada dose, o corpo acumula droga. Porém, como a eliminação geralmente é proporcional à concentração (cinética de primeira ordem), quanto mais droga no sangue, mais o corpo elimina. Vai chegar um ponto em que a quantidade absorvida em uma dose é exatamente igual à quantidade eliminada no intervalo até a próxima dose. A curva para de subir e "estaciona" no platô.
Ponto chave para provas: leva-se cerca de 4 a 5 meias-vidas para atingir o *steady-state*, independentemente da dose.
**A — ERRADA.** Primeira passagem é a metabolização hepática antes de atingir a circulação sistêmica.
**B — ERRADA.** VD é o volume teórico no qual o fármaco se dissolveu.
**C — ERRADA.** Cmáx é apenas o pico isolado de uma curva.
**E — ERRADA.** Não existe "saturação de primeira ordem". A cinética de primeira ordem é justamente a não saturada (proporcional). Saturação ocorre na cinética de ordem zero.` },
{ type: "MÚLTIPLA ESCOLHA", text: `Um paciente em estado grave necessita de digitalização (digoxina) rápida para controle de fibrilação atrial. Como a digoxina tem um longo tempo de meia-vida (cerca de 36 horas), demoraria cerca de 5 a 6 dias para atingir o estado de equilíbrio (*steady-state*) apenas com a dose de manutenção. A conduta do médico é prescrever uma dose inicial muito maior para preencher rapidamente os estoques teciduais, seguida das doses menores. Essa dose inicial alta é denominada:`, interactionType: "multiple-choice", options: [
"A) Dose de manutenção, calculada pelo *clearance* renal.",
"B) Dose tóxica, cujo objetivo é saturar receptores adversos.",
"C) Dose de ataque, baseada no volume de distribuição (VD) do fármaco.",
"D) Dose de eficácia residual.",
"E) Dose de biodisponibilidade intravenosa."
], gabarito: `**Alternativa C**

**Por que C está certa:** a dose de ataque (*loading dose*) é a ferramenta que temos para "burlar" a espera de 4 a 5 meias-vidas. Quando a urgência clínica não permite esperar, administramos de uma só vez uma quantidade imensa de fármaco, suficiente para encher todo o Volume de Distribuição (VD) até a concentração terapêutica desejada instantaneamente. A partir daí, basta administrar doses menores apenas para repor o que for sendo eliminado (doses de manutenção). É calculada por: Dose de Ataque = Concentração Alvo × VD.
**A — ERRADA.** A dose de manutenção não é a inicial alta, é a de seguimento. E ela sim se baseia no *clearance* (o quanto sai é o que precisa ser reposto).
**B — ERRADA.** Toxicidade nunca é o objetivo.
**D e E — ERRADAS.** Não são termos farmacocinéticos válidos neste contexto.` },
{ type: "MÚLTIPLA ESCOLHA", text: `Um paciente de 55 anos apresenta arritmia e recebe prescrição de amiodarona. O farmacêutico alerta que o paciente faz uso crônico de varfarina (anticoagulante) e que ambos os fármacos competem fortemente pela ligação às proteínas plasmáticas. Sabendo que a amiodarona pode deslocar a varfarina da albumina, qual será a consequência farmacocinética imediata?`, interactionType: "multiple-choice", options: [
"A) Diminuição da fração livre de varfarina, resultando em formação de coágulos (falha terapêutica).",
"B) Aumento da fração livre de varfarina, elevando o risco de hemorragias agudas.",
"C) Redução do volume de distribuição da varfarina, que ficará mais restrita aos vasos sanguíneos.",
"D) Aumento imediato do metabolismo hepático da amiodarona por indução enzimática cruzada.",
"E) Alteração na absorção gástrica de ambos os fármacos."
], gabarito: `**Alternativa B**

**Por que B está certa:** interação farmacocinética clássica na etapa de Distribuição. A varfarina viaja "de carona" na albumina (99% ligada). A amiodarona também. Quando chegam juntas no plasma, brigam pelo mesmo assento. Se a amiodarona desloca a varfarina, moléculas de varfarina caem no plasma (fração livre). Como só a fração livre tem efeito e a varfarina tem índice terapêutico estreito, esse aumento abrupto de anticoagulante livre e ativo pode causar sangramentos graves.
**A — ERRADA.** A fração livre aumenta, não diminui.
**C — ERRADA.** A varfarina solta da proteína consegue sair do vaso e ir para o tecido; portanto, o volume de distribuição tende a aumentar, não a ficar restrito ao vaso.
**D — ERRADA.** Competição por proteína plasmática é etapa de distribuição. Indução enzimática é etapa de metabolismo (ocorre no fígado e demora dias, não é imediata).
**E — ERRADA.** A competição citada ocorre no plasma, após a absorção.` },
{ type: "MÚLTIPLA ESCOLHA", text: `Relacione o parâmetro farmacocinético à sua definição correta e assinale a alternativa com a sequência correspondente:
(1) Biodisponibilidade
(2) Volume de Distribuição
(3) *Clearance* (depuração)
(4) Tempo de meia-vida
( ) Espaço teórico no organismo em que o fármaco deve ter se distribuído para produzir a concentração plasmática observada.
( ) Proporção da dose administrada que alcança a circulação sistêmica na sua forma inalterada.
( ) Volume de plasma que é totalmente limpo do fármaco na unidade de tempo.
( ) Tempo necessário para reduzir em 50% a quantidade do fármaco no organismo.`, interactionType: "multiple-choice", options: [
"A) 1, 2, 3, 4",
"B) 2, 1, 3, 4",
"C) 3, 4, 1, 2",
"D) 2, 3, 4, 1",
"E) 4, 2, 1, 3"
], gabarito: `**Alternativa B**

**Por que B está certa:** os quatro grandes pilares da farmacocinética matemática.
(2) Volume de Distribuição Aparente (VD): um conceito abstrato, não é um volume real de líquidos do corpo. É o volume de líquido que seria necessário para conter todo o fármaco do corpo na mesma concentração medida no plasma. VD alto significa que a droga foi para os tecidos (lipossolúvel). VD baixo significa que ela ficou presa no plasma.
(1) Biodisponibilidade: extensão da absorção sistêmica, área sob a curva.
(3) *Clearance* (Depuração): a eficiência da eliminação. É expresso em mL/min: não é quanto da droga saiu, mas qual o volume de sangue que o rim/fígado conseguiu "varrer" a droga por minuto. É ele que define a dose de manutenção.
(4) Tempo de meia-vida (T1/2): rege o intervalo das doses e o tempo para o estado de equilíbrio.` },
{ type: "DISCURSIVA", text: `Sobre a absorção de fármacos ácidos e básicos fracos, responda:
a. Qual é a relação entre lipossolubilidade e a forma ionizada/não ionizada da molécula?
b. Em qual ambiente do trato gastrointestinal (ácido ou básico) um fármaco BÁSICO fraco (como a anfetamina) é melhor absorvido e por quê?
c. O que se entende por "efeito de primeira passagem hepática" e como ele afeta a biodisponibilidade de fármacos orais?`, interactionType: "textarea", gabarito: `**(a) Lipossolubilidade × Ionização.** A forma não ionizada (neutra) é altamente lipossolúvel, pois não atrai dipolos de água, conseguindo cruzar passivamente a bicamada lipídica. A forma ionizada (com carga positiva ou negativa) atrai a água (torna-se polar/hidrossolúvel) e, portanto, é repelida pelos lipídios da membrana, tendo sua absorção impedida.
**(b) Absorção de bases.** Um fármaco básico fraco é melhor absorvido em ambiente BÁSICO (como o intestino delgado). O princípio é: "semelhante não ioniza semelhante". Em pH alcalino, a base cede prótons, permanecendo em sua forma molecular não ionizada. Aumentando a fração não ionizada, aumenta-se a lipossolubilidade e, por conseguinte, a absorção. Se estivesse no estômago, receberia H+, ficaria ionizada e não seria absorvida.
**(c) Efeito de Primeira Passagem.** É o metabolismo que o fármaco sofre antes de alcançar a circulação sistêmica. Fármacos administrados por via oral são absorvidos e levados pela veia porta diretamente ao fígado. O fígado inativa enzimaticamente uma fração considerável do fármaco antes que ele chegue à veia cava. Como resultado, a biodisponibilidade do fármaco cai, explicando por que doses orais de alguns fármacos (ex.: propranolol, morfina) precisam ser muito maiores que as doses intravenosas.` },
{ type: "DISCURSIVA", text: `O tratamento da epilepsia e de arritmias exige controle rigoroso de níveis séricos porque as drogas usadas (como fenitoína e amiodarona) têm "índice terapêutico estreito".
a. Defina o que é o "estado de equilíbrio dinâmico" (steady-state).
b. Em quantas meias-vidas o steady-state é alcançado? O aumento da dose fará o steady-state ser atingido mais rápido?
c. Qual é a utilidade prática de uma "dose de ataque"?
d. O que significa afirmar que um fármaco possui índice terapêutico estreito?`, interactionType: "textarea", gabarito: `**(a) Steady-state.** Estado em que a quantidade de fármaco administrada (num intervalo de dose) é igual à quantidade eliminada nesse mesmo período. A concentração plasmática não sobe mais, apenas oscila numa faixa de platô, garantindo eficácia contínua.
**(b) Tempo para alcançar.** É atingido em 4 a 5 meias-vidas. O aumento da dose de manutenção não faz o steady-state chegar mais rápido; ele apenas fará com que, após 4 a 5 meias-vidas, o platô se estabeleça num patamar mais alto (com risco de toxicidade). O tempo (cronômetro) é determinado exclusivamente pela meia-vida de eliminação.
**(c) Dose de Ataque.** Serve para alcançar o platô (concentração terapêutica desejada) quase imediatamente. É uma dose alta, baseada no Volume de Distribuição, empregada em urgências (arritmias, infecções graves) quando não se pode esperar 5 meias-vidas para que o fármaco alcance o nível eficaz apenas com doses de manutenção.
**(d) Índice Terapêutico Estreito.** Significa que a margem de segurança é pequena: a janela entre a Dose Eficaz Mínima e a Dose Tóxica Mínima é muito próxima. Qualquer pequena alteração na absorção (ex.: erro de via), distribuição (ex.: falta de albumina) ou eliminação (ex.: doença renal) faz o nível saltar da zona de eficácia direto para a zona de toxicidade (ou cair para ineficácia). Exige monitoramento rigoroso.` }
];
