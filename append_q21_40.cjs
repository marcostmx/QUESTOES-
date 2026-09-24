const fs = require('fs');
const newQuestions = [
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `As cinco etapas da Medicina Baseada em Evidências, na ordem apresentada na aula, são:`,
        interactionType: "multiple-choice",
        options: [
            `A) Buscar a evidência → formular a questão → aplicar → avaliar criticamente → publicar os resultados.`,
            `B) Geração → busca → avaliação crítica → aplicação → síntese das evidências.`,
            `C) Planejamento → execução → análise → divulgação → replicação.`,
            `D) Formular a questão → aplicar a evidência → buscar a evidência → avaliar criticamente → arquivar.`,
            `E) Formular uma questão que possa ser respondida → buscar a melhor evidência científica → avaliar criticamente a evidência → aplicar a evidência → avaliação do desfecho.`
        ],
        gabarito: `Alternativa E\nPor que E está certa: os slides das "ETAPAS DA MEDICINA BASEADA EM EVIDÊNCIAS" são numerados de 1ª a 5ª exatamente nessa ordem: (1ª) formular uma questão que possa ser respondida; (2ª) buscar a melhor evidência científica; (3ª) avaliar criticamente a evidência; (4ª) aplicar a evidência; (5ª) avaliação do desfecho.\n\nA e D — erradas. Ordem embaralhada. Buscar antes de formular, ou aplicar antes de buscar, quebra a lógica do método.\nB — errada. Distrator gêmeo: são os cinco processos da epidemiologia clínica, não as etapas da MBE. Diferença decisiva: a MBE começa em "formular a questão" e termina em "avaliar o desfecho"; a epidemiologia clínica começa em "geração" e termina em "síntese".\nC — errada. Descreve fases de uma pesquisa, não da MBE.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Considere a pergunta clínica: "Diante de um paciente com trombose venosa profunda, a heparina de baixo peso molecular, quando comparada à heparina não fracionada, reduz mais a recorrência de tromboembolismo venoso e reduz o risco de sangramento?" Sobre a estrutura dessa pergunta:`,
        interactionType: "multiple-choice",
        options: [
            `A) Ela é uma pergunta descritiva, pois não compara grupos, servindo apenas para gerar hipóteses.`,
            `B) Ela segue o acrônimo PICO: paciente com TVP (P), heparina de baixo peso molecular (I), heparina não fracionada (C), recorrência de TEV e risco de sangramento (O) — e o "O" pode conter mais de um desfecho.`,
            `C) Ela segue o PICO, mas está incorreta, pois o acrônimo admite apenas um desfecho por pergunta.`,
            `D) Ela não segue o PICO, pois falta o componente "tempo", obrigatório no acrônimo.`,
            `E) Ela corresponde ao acrônimo DECS, usado para estruturar perguntas clínicas na 1ª etapa da MBE.`
        ],
        gabarito: `Alternativa B\nPor que B está certa: o slide da 1ª etapa apresenta esse exemplo exato e anota, entre parênteses, cada componente: "(paciente)", "(intervenção)", "(comparação)", "(desfecho)" — e o faz duas vezes ao final, marcando "reduz mais a recorrência de tromboembolismo venoso (desfecho) e reduz o risco de sangramento (desfecho)". Portanto, múltiplos desfechos são admitidos.\n\nA — errada. Há comparação explícita entre duas heparinas.\nC — errada. O próprio slide contradiz a restrição a um só desfecho.\nD — errada. O acrônimo apresentado na aula é PICO — Patients, Intervention, Comparison group, Outcomes. Não há "T" obrigatório nesta aula.\nE — errada. Confusão clássica: DECS (Descritores em Ciências da Saúde) pertence à 2ª etapa — é o vocabulário controlado usado para buscar nas bases. PICO é da 1ª etapa e serve para formular. Não confunda a ferramenta de formular com a de buscar.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre a 2ª e a 3ª etapas da MBE, assinale a alternativa correta.`,
        interactionType: "multiple-choice",
        options: [
            `A) Na 2ª etapa aplica-se o PICO e na 3ª etapa realiza-se a busca, pois só se pode avaliar depois de aplicar.`,
            `B) Na 2ª etapa avalia-se criticamente a evidência e na 3ª busca-se a evidência, pois a crítica precede a seleção.`,
            `C) Na 2ª etapa realiza-se a randomização dos participantes e na 3ª a análise estatística dos dados.`,
            `D) Na 2ª etapa é obrigatório restringir a busca a ensaios clínicos randomizados; na 3ª, descartar todo estudo observacional.`,
            `E) Na 2ª etapa identificam-se os Descritores em Ciências da Saúde (DECS) para buscar em bases como Cochrane Library, MEDLINE, SciELO e LILACS; na 3ª, avaliam-se criticamente os artigos selecionados quanto a validade e aplicabilidade clínica no contexto.`
        ],
        gabarito: `Alternativa E\nPor que E está certa: a 2ª etapa é descrita como "buscar a melhor evidência científica: muitos recursos disponíveis; identificar os Descritores da Saúde (DECS)", e a ATIVIDADE 1 lista as bases: Cochrane Library, MEDLINE, SciELO e LILACS. A 3ª etapa é "avaliar criticamente a evidência: avaliação crítica dos artigos selecionados; uso de métodos objetivos (regras formais de evidências); validade, aplicabilidade clínica no contexto".\n\nA e B — erradas. Desordenam as etapas.\nC — errada. Randomizar e analisar são etapas de execução de um ensaio, não do ciclo da MBE.\nD — errada. A MBE busca a melhor evidência disponível; descartar todo estudo observacional deixaria sem resposta perguntas de etiologia e prognóstico, para as quais coorte e caso-controle são adequados.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre a 4ª e a 5ª etapas da MBE, é correto afirmar que:`,
        interactionType: "multiple-choice",
        options: [
            `A) Na 4ª, formula-se novamente a pergunta pelo PICO; na 5ª, arquiva-se o artigo para consulta futura.`,
            `B) Na 4ª, calcula-se a razão de prevalência do desfecho; na 5ª, compara-se com o intervalo de confiança de 95%.`,
            `C) Na 4ª, escolhe-se o desenho de estudo; na 5ª, define-se o tamanho amostral.`,
            `D) Na 4ª, aplica-se a evidência sem que isso substitua o raciocínio clínico, combinando validade científica, experiência clínica individual e preferências da pessoa; na 5ª, avalia-se o desfecho, incluindo a resposta do paciente ao tratamento e a melhora das próprias habilidades do médico em MBE.`,
            `E) Na 4ª, a evidência substitui o raciocínio clínico; na 5ª, publica-se o caso em revista indexada.`
        ],
        gabarito: `Alternativa D\nPor que D está certa: a 4ª etapa traz os marcadores "a prática da MBE não substitui o raciocínio clínico" e "processo decisório: estudos com validade científica, experiência clínica individual e preferências da pessoa". A 5ª traz três marcadores: "descoberta de resposta à questão clínica"; "avaliação da resposta do paciente ao tratamento empregado"; e "como o médico pode melhorar suas habilidades no campo da MBE" — este último é o mais esquecido: a 5ª etapa avalia também o próprio praticante, fechando um ciclo de aprendizagem.\n\nA, B e C — erradas. Deslocam para as etapas finais atividades que pertencem à 1ª etapa, à análise de um estudo seccional ou ao planejamento de pesquisa.\nE — errada. Contradiz literalmente a 4ª etapa.\n\nObjetivo educacional: a MBE é um ciclo, não uma linha: a 5ª etapa realimenta a 1ª, tanto pelo desfecho do paciente quanto pelo aperfeiçoamento do médico.`
    },
    {
        type: "DISCURSIVA",
        text: `Um interno atende uma gestante de 32 semanas com bacteriúria assintomática e fica em dúvida se deve tratar. Descreva como ele deveria conduzir o caso percorrendo as cinco etapas da MBE, nomeando a ferramenta usada em cada uma e as bases de dados que deveria consultar.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n1ª etapa — Formular uma questão respondível (2,5 pts). Usar o PICO: P = gestante de 32 semanas com bacteriúria assintomática; I = antibioticoterapia; C = conduta expectante / não tratar; O = ocorrência de pielonefrite, parto prematuro, baixo peso ao nascer. O aluno deve identificar que a questão é de tratamento (a aula lista diagnóstico, tratamento, prognóstico e etiologia como os quatro tipos).\n\n2ª etapa — Buscar a melhor evidência (2,0 pts). Identificar os DECS (Descritores em Ciências da Saúde) correspondentes — bacteriúria, gravidez, antibacterianos — e buscar em Cochrane Library, MEDLINE, SciELO e LILACS. Espera-se a menção nominal de ao menos duas dessas bases.\n\n3ª etapa — Avaliar criticamente (2,5 pts). Aplicar métodos objetivos e regras formais de evidência aos artigos selecionados, examinando validade (o estudo foi bem feito?) e aplicabilidade clínica no contexto (a população estudada se parece com a minha paciente? o desfecho medido importa aqui?). Espera-se que o aluno acione a hierarquia da pirâmide: uma revisão sistemática Cochrane pesa mais que uma série de casos.\n\n4ª etapa — Aplicar (1,5 pt). Integrar a evidência à experiência clínica e às preferências da gestante — lembrando que a MBE não substitui o raciocínio clínico. Fatores como alergia prévia, adesão e disponibilidade do fármaco entram aqui.\n\n5ª etapa — Avaliar o desfecho (1,5 pt). Verificar se a questão clínica foi respondida, acompanhar a resposta da paciente (urocultura de controle, ausência de pielonefrite) e refletir sobre como aprimorar a própria habilidade em MBE.\n\nPerda de pontos frequente: parar na 3ª etapa. Muitos alunos descrevem bem buscar e criticar e esquecem que aplicar e avaliar o desfecho são etapas formais do método.`
    },
    {
        type: "DISCURSIVA",
        text: `Diferencie epidemiologia descritiva e epidemiologia analítica quanto a: (a) pergunta que respondem; (b) variáveis que privilegiam; (c) desenhos de estudo típicos; e (d) capacidade de estabelecer causalidade. Ao final, explique por que a aula afirma que uma "alimenta" a outra.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n(a) Pergunta\nDescritiva: Quem adoece? Onde? Quando? Quanto ocorre?\nAnalítica: Como se transmite? Por quê? Existe associação entre X e Y?\n\n(b) Variáveis\nDescritiva: Pessoa, lugar e tempo — as variáveis circunstanciais.\nAnalítica: Determinantes: fatores de risco, formas de transmissão, exposições.\n\n(c) Desenhos\nDescritiva: Relato de caso; série de casos.\nAnalítica: Transversal (seccional); caso-controle; coorte; ecológico; e os experimentais (ECR, ensaio de campo, ensaio comunitário).\n\n(d) Causalidade\nDescritiva: Não estabelece. Levanta "pistas".\nAnalítica: Testa hipóteses e comprova associações causais (com ressalvas próprias de cada desenho).\n\nPor que uma alimenta a outra (3,0 pts). O slide é explícito: "os elementos fornecidos pela epidemiologia descritiva quanto à distribuição das doenças no tempo, espaço e pessoa fornecem os indícios iniciais sobre os determinantes das doenças. E a partir desses elementos deve-se conduzir a formulação de hipóteses com fatores de risco ou causa para as doenças por meio de estudos analíticos". Isto é: sem o mapa descritivo não há hipótese plausível a testar; e sem o teste analítico o mapa permanece uma coincidência não explicada.\n\nNuance que rende ponto: mesmo dentro da epidemiologia analítica, a capacidade de afirmar causalidade varia com o desenho. O seccional é analítico e ainda assim "não é possível estabelecer a relação causa e efeito"; o ecológico é analítico e esbarra na falácia ecológica. Reconhecer essa gradação demonstra domínio real do conteúdo.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `O estudo seccional recebe outros dois nomes na literatura e na aula. Assinale a alternativa que apresenta corretamente essas denominações e a razão de cada uma.`,
        interactionType: "multiple-choice",
        options: [
            `A) Estudo ecológico, porque trabalha com agregados; e estudo de correlação, porque usa o coeficiente r.`,
            `B) Estudo experimental, porque o pesquisador define a exposição; e estudo de eficácia, porque testa intervenções.`,
            `C) Estudo transversal, porque corta a população num único momento do tempo; e estudo de prevalência, porque a medida de frequência que ele produz é a prevalência.`,
            `D) Estudo longitudinal, porque acompanha os indivíduos ao longo do tempo; e estudo de incidência, porque mede casos novos.`,
            `E) Estudo retrospectivo, porque parte do desfecho; e estudo de razão de chances, porque sua medida é o odds ratio.`
        ],
        gabarito: `Alternativa C\nPor que C está certa: o slide "ESTUDO SECCIONAL — CARACTERÍSTICAS" abre com dois marcadores: "• Ou transversal;" e "• Ou estudos de prevalência;". As justificativas encaixam com o restante do slide: o seccional é "caracterizado pela observação direta de determinada quantidade planejada de indivíduos em uma única oportunidade" — daí o corte transversal — e é "utilizado para determinar a prevalência de doenças ou de condições relacionadas à saúde".\n\nA — errada. Agregados e coeficiente r são do ecológico (Aula 3).\nB — errada. O seccional é observacional; o pesquisador não define exposição alguma.\nD — errada. Longitudinal e incidência são atributos da coorte, o oposto conceitual do seccional.\nE — errada. Retrospectivo e odds ratio caracterizam o caso-controle.\n\nObjetivo educacional: ancorar a tríade seccional = transversal = estudo de prevalência. Se a questão fala em prevalência, o desenho quase sempre é seccional.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `A aula descreve o estudo seccional como o "retrato" de uma situação. Qual alternativa explica corretamente essa metáfora e sua principal consequência metodológica?`,
        interactionType: "multiple-choice",
        options: [
            `A) É um retrato porque acompanha os participantes por período curto; a consequência é a perda de seguimento elevada.`,
            `B) É um retrato porque não usa questionários, apenas exames; a consequência é a ausência de viés de memória.`,
            `C) É um retrato porque a observação ocorre em uma única oportunidade, captando exposição e desfecho no mesmo instante; a consequência é que não se pode estabelecer relação de causa e efeito.`,
            `D) É um retrato porque a amostra é fotografada por censo, e não por amostragem; a consequência é a impossibilidade de generalizar.`,
            `E) É um retrato porque registra apenas casos incidentes; a consequência é a superestimação da prevalência.`
        ],
        gabarito: `Alternativa C\nPor que C está certa: as duas metades são literais do slide. "É o 'retrato' de uma situação" convive, no mesmo bloco, com "As medidas de exposição e efeito (doença) são realizadas ao mesmo tempo. Por esse motivo, não é fácil avaliar as associações encontradas nesses estudos" e, no marcador final, "Não é possível estabelecer a relação CAUSA E EFEITO".\n\nA — errada. Não há seguimento no seccional — logo, não há perda de seguimento.\nB — errada. Questionários são explicitamente citados como instrumento na fase de planejamento.\nD — errada. O slide de vantagens diz exatamente o contrário em ambas as metades: "a população do estudo é selecionada por amostra" e o seccional "tem maior poder de generalização".\nE — errada. O seccional capta casos prevalentes (existentes), não incidentes.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Um estudo entrevistou 1.200 adultos de um município e, na mesma visita domiciliar, aferiu a pressão arterial e aplicou questionário sobre sedentarismo. Encontrou associação entre sedentarismo e hipertensão. O autor conclui, no resumo, que "o sedentarismo causa hipertensão". A crítica metodológica mais precisa a essa conclusão é:`,
        interactionType: "multiple-choice",
        options: [
            `A) A conclusão é adequada, pois o estudo seccional é classificado como analítico e todo estudo analítico comprova causalidade.`,
            `B) A conclusão é inadequada, pois em delineamento seccional a exposição e o efeito são medidos simultaneamente e a questão-chave — saber se a exposição precede ou é consequência do efeito — permanece sem resposta.`,
            `C) A conclusão é adequada, pois a associação foi estatisticamente significante e o tamanho amostral é grande.`,
            `D) A conclusão é inadequada apenas porque a amostra é pequena; com 5.000 participantes ela seria válida.`,
            `E) A conclusão é inadequada porque o estudo deveria ter calculado incidência em vez de prevalência, o que é possível no seccional.`
        ],
        gabarito: `Alternativa B\nPor que B está certa: o slide traz textualmente: "A questão-chave nesse tipo de delineamento é saber se a exposição precede ou é consequência do efeito". No caso, é perfeitamente possível que a hipertensão (com suas limitações, sintomas e orientações médicas) tenha levado ao sedentarismo, e não o contrário — a chamada causalidade reversa. O slide de desvantagens nomeia esse problema de viés temporal: "para algumas variáveis, não se pode afirmar o que foi causa ou consequência".\n\nA — errada. Ser analítico não garante causalidade; o próprio slide do seccional nega essa possibilidade.\nC — errada. Significância estatística responde "é acaso?" — não responde "o que veio primeiro?". São perguntas independentes.\nD — errada. O problema é de desenho, não de tamanho. Nenhum n conserta a ausência de temporalidade.\nE — errada. O seccional não mede incidência — mede prevalência. A justificativa é falsa.\n\nPegadinha recorrente: alternativas que atribuem o problema ao tamanho da amostra. Guarde: limitação de desenho não se resolve com mais gente.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Assinale a alternativa que reúne corretamente as vantagens do estudo seccional listadas na aula.`,
        interactionType: "multiple-choice",
        options: [
            `A) Relativamente mais barato e mais rápido que coorte e caso-controle; maior poder de generalização; população selecionada por amostra; permite medir associação entre exposição e desfecho, com limitação para inferir causalidade.`,
            `B) Baixo custo; permite estabelecer causalidade; adequado para doenças raras; elimina fatores de confusão.`,
            `C) Permite calcular incidência; segue os participantes no tempo; é o padrão-ouro para intervenções.`,
            `D) Usa exclusivamente dados secundários; não requer amostragem; dispensa treinamento de pesquisadores de campo.`,
            `E) Permite inferência individual a partir de dados agregados; é imune à falácia ecológica; usa regressão linear.`
        ],
        gabarito: `Alternativa A\nPor que A está certa: os quatro marcadores do slide "ESTUDO SECCIONAL — VANTAGENS" estão reproduzidos integralmente, inclusive a ressalva do último: "pode-se medir a associação entre exposição e desfecho, mas há limitação para inferir causalidade".\n\nB — errada. Três erros graves: não estabelece causalidade; é inadequado para doenças raras; e fatores de confusão constam como desvantagem, não como algo eliminado.\nC — errada. Incidência e seguimento são da coorte; padrão-ouro para intervenções é o ECR.\nD — errada. Dados secundários e dispensa de campo caracterizam o ecológico. O seccional, ao contrário, exige seleção e treinamento de pesquisadores de campo (fase 1).\nE — errada. Descreve mal o ecológico e não o seccional.\n\nCuidado com o comparativo: o seccional é mais barato e mais rápido que coorte e caso-controle — o slide nomeia esses dois. Ele não é mais barato que um ecológico, que usa dados já coletados.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Um pesquisador deseja estudar a associação entre exposição ocupacional a um solvente e uma neoplasia hematológica cuja frequência na população geral é de aproximadamente 3 casos por 100.000 habitantes. Ele propõe um inquérito seccional em amostra de 2.000 trabalhadores. A principal objeção metodológica é:`,
        interactionType: "multiple-choice",
        options: [
            `A) O seccional só pode ser aplicado a doenças transmissíveis, conforme a Portaria 3.252/09.`,
            `B) Não há objeção: por ser barato e rápido, o seccional serve igualmente bem a qualquer frequência de doença.`,
            `C) O seccional é inadequado para estudar doenças raras em amostras da população em geral, pois o número esperado de casos seria próximo de zero, inviabilizando qualquer estimativa estável.`,
            `D) O seccional não permite calcular prevalência, e prevalência é o que se precisaria aqui.`,
            `E) O seccional exige seguimento prolongado, incompatível com o prazo do projeto.`
        ],
        gabarito: `Alternativa C\nPor que C está certa: é o quarto marcador do slide de desvantagens: "Inadequados para estudar doenças raras em amostras da população em geral". Fazendo a conta implícita: 3/100.000 × 2.000 ≈ 0,06 caso esperado. Com fração de caso esperada, não há como estimar prevalência nem razão de prevalência com qualquer precisão. Para doenças raras o desenho de escolha é o caso-controle, que parte dos casos já identificados.\n\nA — errada. A portaria abrange transmissíveis, não transmissíveis e agravos, e não restringe desenhos de estudo.\nB — errada. Contraria diretamente o slide.\nD — errada. Calcular prevalência é exatamente o que o seccional faz.\nE — errada. O seccional não tem seguimento — esse é o traço da coorte.\n\nRegra prática: doença rara → caso-controle. Exposição rara → coorte. Nenhuma das duas rara e quero o "retrato agora" → seccional.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre as desvantagens do estudo seccional, assinale a alternativa correta.`,
        interactionType: "multiple-choice",
        options: [
            `A) Dificuldade de separar causa e efeito; viés temporal (não é possível estabelecer a temporalidade dos eventos); presença de fatores de confusão; e inadequação para doenças raras.`,
            `B) Custo elevado; lentidão; necessidade de seguimento longo; e perda de participantes.`,
            `C) Impossibilidade de calcular qualquer medida de associação; ausência de grupo de comparação; e restrição a estudos-piloto.`,
            `D) Falácia ecológica; migração entre grupos; e dependência da qualidade das fontes secundárias.`,
            `E) Necessidade de randomização; exigência de cegamento; e dificuldade ética.`
        ],
        gabarito: `Alternativa A\nPor que A está certa: reproduz os quatro marcadores do slide "DESVANTAGENS", inclusive a explicação que acompanha o viés temporal: "para algumas variáveis, não se pode afirmar o que foi causa ou consequência. Não é possível a temporalidade dos eventos".\n\nB — errada. Custo e lentidão são o contrário do que a aula atribui ao seccional (vantagens).\nC — errada. O seccional pode medir associação — a razão de prevalência é justamente essa medida.\nD — errada. Distrator de troca de aula: falácia ecológica, migração entre grupos e dependência de fontes secundárias são limitações do estudo ecológico (Aula 3).\nE — errada. Randomização e cegamento pertencem ao ensaio clínico.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Segundo a aula, o estudo seccional deve ser usado quando o objetivo é:`,
        interactionType: "multiple-choice",
        options: [
            `A) Descrever um evento clínico raro ou uma nova intervenção em poucos pacientes.`,
            `B) Descrever padrões e suas magnitudes; estimar a prevalência de doenças e agravos à saúde; e estabelecer associações entre exposição e doença.`,
            `C) Estimar a incidência acumulada e o risco relativo de um desfecho ao longo de dez anos.`,
            `D) Avaliar a eficácia comparativa de dois medicamentos em grupos aleatorizados.`,
            `E) Comparar taxas de mortalidade entre estados brasileiros usando o DATASUS.`
        ],
        gabarito: `Alternativa B\nPor que B está certa: são exatamente os três marcadores do slide "QUANDO USAR?". Note que o terceiro — "estabelecer associações entre exposição e doença" — usa a palavra associação, e não causalidade; a distinção é deliberada e é o coração da matéria.\n\nA — errada. Evento raro ou nova intervenção em poucos pacientes = estudo/relato de caso.\nC — errada. Incidência acumulada e risco relativo em dez anos = coorte.\nD — errada. Eficácia comparativa com aleatorização = ECR.\nE — errada. Comparar taxas entre estados com dados secundários = ecológico de múltiplos grupos.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `As fases de um estudo seccional, na sequência apresentada na aula, e o conteúdo de cada uma são:`,
        interactionType: "multiple-choice",
        options: [
            `A) (1) Coleta de dados; (2) Planejamento; (3) Estudo piloto, pois o piloto valida o que já foi coletado.`,
            `B) (1) Randomização; (2) Intervenção; (3) Seguimento, pois todo estudo analítico segue essa lógica.`,
            `C) (1) Geração de evidências; (2) Busca; (3) Síntese, conforme os processos da epidemiologia clínica.`,
            `D) (1) Formulação da hipótese; (2) Cálculo da razão de prevalência; (3) Publicação, pois a hipótese só se testa após o cálculo.`,
            `E) (1) Planejamento — instrumentos/questionários, amostragem, seleção e treinamento de pesquisadores de campo; (2) Execução — estudo piloto e coleta de dados; (3) Análise e divulgação dos resultados.`
        ],
        gabarito: `Alternativa E\nPor que E está certa: o slide "FASES DE UM ESTUDO SECCIONAL" numera as três fases em degraus e detalha exatamente esses conteúdos. Vale reparar em dois itens da fase 1 que costumam ser esquecidos: amostragem (o estudo é feito por amostra, não censo) e seleção e treinamento de pesquisadores de campo (padronizar quem coleta é o que evita viés de aferição). E na fase 2, o estudo piloto — anotado no slide como "estudo prévio" — serve para testar o instrumento antes de gastar a amostra real.\n\nA — errada. Coletar antes de planejar inverte a lógica; e o piloto ocorre antes da coleta definitiva, não depois.\nB — errada. Randomização, intervenção e seguimento são de ensaio clínico.\nC — errada. São processos da epidemiologia clínica (Aula 1).\nD — errada. Ordem e conteúdo incorretos.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `A razão de prevalência (RP) é definida na aula como a medida que:`,
        interactionType: "multiple-choice",
        options: [
            `A) Estima a dispersão dos dados em torno da média, sendo obtida pela raiz da variância.`,
            `B) Estima quantas vezes mais os expostos estão doentes quando comparados aos não expostos, na época do estudo seccional; é obtida dividindo a prevalência de doentes entre os expostos pela prevalência de doentes entre os não expostos.`,
            `C) Estima o número de casos novos que surgirão entre os expostos ao longo do seguimento, sendo obtida pela divisão das incidências.`,
            `D) Estima a chance de exposição entre os casos comparada à dos controles, sendo obtida pelo produto cruzado da tabela 2×2.`,
            `E) Estima a força da correlação entre duas variáveis agregadas, variando de −1 a +1.`
        ],
        gabarito: `Alternativa B\nPor que B está certa: a frase do slide é literal: "Razão de prevalência estima quantas vezes mais os expostos estão doentes quando comparados aos não expostos, na época do estudo seccional". A expressão final — "na época do estudo" — é o que amarra a medida ao instante do retrato e a impede de virar afirmação causal. E o quadro seguinte apresenta a fração: prevalência de doentes expostos ÷ prevalência de doentes não expostos.\n\nA — errada. Raiz da variância = desvio padrão, medida de dispersão.\nC — errada. Casos novos e incidência = risco relativo, medida da coorte.\nD — errada. Chance de exposição e produto cruzado = odds ratio, medida do caso-controle.\nE — errada. Correlação de −1 a +1 = coeficiente r, da Aula 3 (ecológico).\n\nObjetivo educacional: saber qual medida pertence a qual desenho. Seccional → RP. Coorte → RR. Caso-controle → OR. Ecológico → r.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Um inquérito seccional avaliou a relação entre obesidade e hipertensão arterial (HA) em 1.267 adultos, obtendo os dados abaixo.\n\nObesidade    Com HA    Sem HA    Total\nSim           78        82        160\nNão           236       871       1.107\nTotal         314       953       1.267\n\nCom base no cálculo das prevalências e da razão de prevalência, assinale a alternativa correta.`,
        interactionType: "multiple-choice",
        options: [
            `A) Não é possível calcular a razão de prevalência, pois o desenho seccional só permite estimar a prevalência global.`,
            `B) Há associação positiva entre obesidade e HA, pois a prevalência de HA nos obesos (48,75%) é cerca de 2,3 vezes a prevalência nos não obesos (21,32%).`,
            `C) Não há associação, pois a prevalência global de HA (24,78%) é intermediária entre os dois grupos, o que anula a razão.`,
            `D) Há associação inversa, pois a prevalência de HA nos obesos (21,32%) é menor que nos não obesos (48,75%), com RP de 0,44.`,
            `E) Há associação positiva, pois a prevalência de HA nos obesos (24,84%) é 4,8 vezes a dos não obesos (5,17%), calculadas sobre o total da amostra.`
        ],
        gabarito: `Alternativa B · RP = 2,3\n\nPasso 1 — prevalência de HA nos EXPOSTOS (obesos) = A/(A+B)\n78 ÷ 160 = 0,4875 → 48,75%\n\nPasso 2 — prevalência de HA nos NÃO EXPOSTOS = C/(C+D)\n236 ÷ 1.107 = 0,2132 → 21,32%\n\nPasso 3 — razão de prevalência = passo 1 ÷ passo 2\n0,4875 ÷ 0,2132 = 2,28 ≈ 2,3\n\n(Extra) prevalência global = (A+C)/N\n314 ÷ 1.267 = 0,2478 → 24,78%\n\nLeitura do resultado: "A prevalência de HA nos obesos é 2,3 vezes a prevalência nos não obesos" — ou, equivalentemente, "é 1,3 vez maior que". RP > 1 significa associação positiva: a obesidade está associada a maior frequência de HA naquele momento. Não se afirma que a obesidade causou a HA.\n\nA — errada. O seccional é justamente o desenho que produz a RP.\nC — errada. A prevalência global não anula nada; ela é apenas o retrato do conjunto e não entra no cálculo da RP.\nD — errada. Inverte numerador e denominador. Repare: 1 ÷ 2,28 = 0,44 — é exatamente a RP calculada de cabeça para baixo. Este é o erro de conta mais comum da matéria.\nE — errada. Calcula os denominadores errados: usa 314/1.267 e 82/1.586. Prevalência de doença no grupo exposto tem como denominador o total de expostos (160), não o total da amostra.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Um estudo seccional investigou a associação entre uso de heroína (exposição) e ocorrência de aborto (desfecho) em 273 mulheres.\n\nUso de heroína    Aborto    Sem aborto    Total\nSim (usuárias)     15        60            75\nNão (não usuárias) 18        180           198\nTotal              33        240           273\n\nCalcule (1) a prevalência de abortos entre as usuárias, (2) a prevalência entre as não usuárias e (3) a razão de prevalência, e assinale a interpretação correta.`,
        interactionType: "multiple-choice",
        options: [
            `A) 20% e 9%, com RP ≈ 0,45; portanto o uso de heroína é fator de proteção contra aborto.`,
            `B) 5,5% e 12,1%, com RP ≈ 0,45; portanto não há associação relevante.`,
            `C) 45% e 91%, com RP ≈ 0,49; portanto a prevalência é maior entre as não usuárias.`,
            `D) 20% e 9%, com RP ≈ 2,22; portanto está comprovado que a heroína causa aborto, dado o valor superior a 2.`,
            `E) 20% e 9%, com RP ≈ 2,22; portanto a prevalência de aborto entre as usuárias é aproximadamente 2,2 vezes a das não usuárias, caracterizando associação positiva.`
        ],
        gabarito: `Alternativa E · RP = 2,22\n\n1) Prevalência de abortos entre as USUÁRIAS = A/(A+B)\n15 ÷ 75 = 0,2 → 20%\n\n2) Prevalência de abortos entre as NÃO USUÁRIAS = C/(C+D)\n18 ÷ 198 = 0,0909 → ≈ 9%\n\n3) Razão de prevalência\n0,2 ÷ 0,09 = 2,22\n\nLeitura: a prevalência de aborto entre as usuárias de heroína é cerca de 2,2 vezes a das não usuárias. RP > 1 → associação positiva.\n\nA — errada. Os números 1 e 2 estão certos, mas a RP está invertida (0,09/0,2 = 0,45) e a conclusão de "proteção" é o oposto do achado.\nB — errada. Usa o total da coluna como denominador (15/273 e 33/273), o que não corresponde a nenhuma das fórmulas do slide.\nC — errada. Calcula prevalência de exposição entre os grupos de desfecho, invertendo os eixos da tabela.\nD — errada. A armadilha central da matéria: os números estão corretos, mas a conclusão é ilegítima. Nenhum valor de RP, por maior que seja, transforma um estudo seccional em prova de causalidade — exposição e desfecho foram medidos simultaneamente e não se sabe o que veio primeiro. Esta é a alternativa que mais derruba aluno bom em conta e desatento em conceito.\n\nNota sobre o arredondamento: o slide arredonda 0,0909 para 0,09 antes de dividir, chegando a 2,22. Sem arredondar, 0,2 ÷ 0,0909 = 2,20. Ambos aceitáveis; use o valor do slide (2,22) se a alternativa oferecer os dois.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre a interpretação da razão de prevalência, assinale a alternativa correta.`,
        interactionType: "multiple-choice",
        options: [
            `A) RP só pode ser interpretada após transformação logarítmica, sendo o valor bruto desprovido de significado clínico.`,
            `B) RP = 1 indica prevalências idênticas nos dois grupos, ou seja, ausência de associação; RP > 1 indica associação positiva; RP < 1 indica associação inversa (a exposição está associada a menor prevalência do desfecho).`,
            `C) RP = 0 indica ausência de associação; qualquer valor diferente de zero indica associação, positiva ou negativa conforme o sinal.`,
            `D) RP > 1 indica associação inversa e RP < 1 indica associação positiva, pois o denominador representa o grupo de risco.`,
            `E) RP varia de −1 a +1, sendo os extremos indicativos de correlação perfeita.`
        ],
        gabarito: `Alternativa B\nPor que B está certa: é a leitura do slide "INTERPRETANDO A RAZÃO DE PREVALÊNCIA (RP)". Sendo uma razão, o valor neutro é 1 (numerador igual ao denominador), não zero. Acima de 1, o grupo exposto tem mais doença; abaixo de 1, tem menos — o que sugere fator de proteção.\n\nA — errada. A transformação logarítmica é recurso estatístico para modelagem, não pré-requisito de interpretação.\nC — errada. Confunde razão com diferença. Em uma diferença de prevalências o valor neutro é 0; em uma razão, é 1. RP = 0 só ocorreria se não houvesse nenhum doente entre os expostos.\nD — errada. Inverte a interpretação.\nE — errada. Quem varia de −1 a +1 é o coeficiente de correlação r (Aula 3). A RP varia de 0 a infinito.\n\nFixe a régua: 0 ←— proteção —→ 1 ←— risco —→ ∞.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Em um inquérito seccional sobre aleitamento materno exclusivo até o 6º mês (exposição) e infecção respiratória no 1º ano de vida (desfecho), obtiveram-se os dados:\n\nAleitamento exclusivo    Com infecção    Sem infecção    Total\nSim                      36              264             300\nNão                      96              304             400\nTotal                    132             568             700\n\nCalcule a RP e assinale a conclusão correta.`,
        interactionType: "multiple-choice",
        options: [
            `A) RP = 0,5; há associação inversa, o que comprova que o aleitamento exclusivo previne infecção respiratória.`,
            `B) RP = 0,375; há associação inversa, calculada pela razão entre os números absolutos de casos (36 ÷ 96).`,
            `C) RP = 0,5; há associação inversa, sugerindo que o aleitamento exclusivo se comporta como fator de proteção, pois a prevalência de infecção nos amamentados exclusivamente (12%) é metade da observada nos não amamentados exclusivamente (24%).`,
            `D) RP = 2,0; há associação positiva, pois o aleitamento exclusivo se associa ao dobro da prevalência de infecção.`,
            `E) RP = 1,0; não há associação, pois as prevalências globais se equivalem.`
        ],
        gabarito: `Alternativa C · RP = 0,5\nPrevalência nos EXPOSTOS (aleitamento exclusivo) = A/(A+B)\n36 ÷ 300 = 0,12 → 12%\n\nPrevalência nos NÃO EXPOSTOS = C/(C+D)\n96 ÷ 400 = 0,24 → 24%\n\nRP = 0,12 ÷ 0,24 = 0,5\n\nLeitura: RP < 1 → associação inversa. A prevalência de infecção respiratória entre os amamentados exclusivamente é metade (0,5 vez) da observada no grupo não exposto. Em linguagem epidemiológica, a exposição comporta-se como fator de proteção naquele momento.\n\nA — errada. Atenção: o número está certo, a direção está certa — mas o verbo "comprova" está errado. Estudo seccional não comprova prevenção; ele descreve uma associação num único momento. Basta a palavra "comprova" para tornar a alternativa incorreta.\nB — errada. Razão entre números absolutos ignora os denominadores, que são diferentes (300 vs 400). É um erro de conta, não de interpretação.\nD — errada. Inverte a razão (0,24/0,12 = 2,0) e, com isso, inverte totalmente a conclusão clínica.\nE — errada. A prevalência global (132/700 = 18,86%) não é usada no cálculo da RP.\n\nComo falar de RP < 1 sem errar: "a prevalência nos expostos é 0,5 vez a dos não expostos", ou "há uma redução de 50% na prevalência" (1 − 0,5 = 0,5 → 50%). Evite dizer "0,5 vez menor", que é ambíguo.`
    },
    {
        type: "DISCURSIVA",
        text: `Um estudo seccional em 1.267 adultos encontrou 78 hipertensos entre 160 obesos e 236 hipertensos entre 1.107 não obesos. (a) Calcule a prevalência global de hipertensão, a prevalência nos expostos, a prevalência nos não expostos e a razão de prevalência, apresentando as fórmulas. (b) Escreva duas frases de interpretação do resultado, uma usando a expressão "vezes a" e outra usando "vezes maior que". (c) Explique por que essas duas frases não são contraditórias.`,
        interactionType: "textarea",
        gabarito: `RESPOSTA ESPERADA\n(a) Cálculos — 5,0 pts\nPrevalência global = (A+C)/N = (78+236) ÷ 1.267 = 314 ÷ 1.267 = 0,2478 → 24,78%\nPrevalência nos expostos = A/(A+B) = 78 ÷ 160 = 0,4875 → 48,75%\nPrevalência nos não expostos = C/(C+D) = 236 ÷ 1.107 = 0,2132 → 21,32%\nRP = 0,4875 ÷ 0,2132 = 2,28 ≈ 2,3\n\n(b) As duas frases — 3,0 pts.\n• "A prevalência de hipertensão arterial nos obesos é 2,3 vezes a prevalência nos não obesos."\n• "A prevalência de hipertensão arterial nos obesos é 1,3 vez maior que a prevalência nos não obesos."\n\n(c) Por que não são contraditórias — 2,0 pts. A primeira expressa a razão bruta (quantas vezes o valor do numerador contém o do denominador): 2,3. A segunda expressa o excesso relativo, isto é, o quanto se acrescentou acima do valor de referência: RP − 1 = 2,3 − 1 = 1,3, ou 130% a mais. São duas leituras do mesmo número, com pontos de partida diferentes: uma parte do zero, a outra parte de 1 (a ausência de associação).\n\nErro que custa a questão inteira: escrever "2,3 vezes maior que" — que mistura as duas leituras e, tecnicamente, afirmaria uma RP de 3,3. O slide traz as duas formulações corretas lado a lado justamente para treinar essa distinção.`
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
console.log("Appended Q21-40.");
