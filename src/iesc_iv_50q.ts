export interface Question {
    "type": string;
    "text": string;
    "interactionType": "multiple-choice" | "textarea" | "true-false";
  options?: string[];
    "gabarito": string;
  graphicsHtml?: string;
  ogSubject?: string;
  ogIndex?: number;
}

export const iescIvQuestions: Question[] = [
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "Uma UBS implanta prontu\u00e1rio eletr\u00f4nico integrado: qualquer profissional acessa toda a hist\u00f3ria do usu\u00e1rio em segundos. Ainda assim, por alta rotatividade contratual, cada usu\u00e1rio \u00e9 atendido por um m\u00e9dico diferente a cada trimestre. Os usu\u00e1rios relatam ter de \"recontar tudo de novo\" e a ades\u00e3o ao tratamento de DM2 cai. Qual atributo permanece comprometido, apesar da informatiza\u00e7\u00e3o?",
    interactionType: "multiple-choice",
    options: [
      "A) Coordena\u00e7\u00e3o, porque as informa\u00e7\u00f5es dos especialistas n\u00e3o retornam \u00e0 equipe.",
      "B) Longitudinalidade, porque o v\u00ednculo terap\u00eautico ao longo do tempo n\u00e3o se estabelece.",
      "C) Primeiro contato, porque a porta de entrada n\u00e3o est\u00e1 estruturada.",
      "D) Integralidade, porque a unidade n\u00e3o oferece o espectro completo de a\u00e7\u00f5es.",
      "E) Compet\u00eancia cultural, porque a linguagem t\u00e9cnica n\u00e3o foi adaptada ao usu\u00e1rio."
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "Segundo a aula, diante de um \u00fanico evento de sa\u00fade todo o ecossistema da APS \u00e9 acionado em sequ\u00eancia. Assinale a ordem apresentada.",
    interactionType: "multiple-choice",
    options: [
      "A) Longitudinalidade \u2192 primeiro contato \u2192 coordena\u00e7\u00e3o \u2192 integralidade \u2192 compet\u00eancia cultural \u2192 orienta\u00e7\u00e3o familiar \u2192 orienta\u00e7\u00e3o comunit\u00e1ria",
      "B) Primeiro contato \u2192 longitudinalidade \u2192 integralidade \u2192 coordena\u00e7\u00e3o \u2192 orienta\u00e7\u00e3o familiar \u2192 orienta\u00e7\u00e3o cultural \u2192 orienta\u00e7\u00e3o comunit\u00e1ria",
      "C) Primeiro contato \u2192 integralidade \u2192 longitudinalidade \u2192 orienta\u00e7\u00e3o familiar \u2192 coordena\u00e7\u00e3o \u2192 orienta\u00e7\u00e3o comunit\u00e1ria \u2192 compet\u00eancia cultural",
      "D) Integralidade \u2192 primeiro contato \u2192 orienta\u00e7\u00e3o familiar \u2192 longitudinalidade \u2192 orienta\u00e7\u00e3o comunit\u00e1ria \u2192 coordena\u00e7\u00e3o \u2192 compet\u00eancia cultural",
      "E) Primeiro contato \u2192 coordena\u00e7\u00e3o \u2192 integralidade \u2192 longitudinalidade \u2192 compet\u00eancia cultural \u2192 orienta\u00e7\u00e3o comunit\u00e1ria \u2192 orienta\u00e7\u00e3o familiar"
    ],
    gabarito: "C"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "A integralidade \u00e9 definida como o espectro completo de respostas que a unidade deve reconhecer, gerenciar ou oferecer. Qual conjunto reproduz corretamente as quatro frentes que esse atributo cobre?",
    interactionType: "multiple-choice",
    options: [
      "A) Preven\u00e7\u00e3o, cura/tratamento, reabilita\u00e7\u00e3o e palia\u00e7\u00e3o",
      "B) Promo\u00e7\u00e3o, preven\u00e7\u00e3o, diagn\u00f3stico e encaminhamento",
      "C) Preven\u00e7\u00e3o prim\u00e1ria, secund\u00e1ria, terci\u00e1ria e quatern\u00e1ria",
      "D) Acolhimento, triagem, tratamento e alta",
      "E) Rastreio, diagn\u00f3stico, tratamento e vigil\u00e2ncia epidemiol\u00f3gica"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "Paciente com DM2 faz retinografia e teste ergom\u00e9trico em servi\u00e7os distintos. Os laudos ficam retidos nos servi\u00e7os de origem, ningu\u00e9m explica os resultados e a equipe da UBS s\u00f3 toma conhecimento meses depois, em interna\u00e7\u00e3o. Qual atributo falhou e qual a consequ\u00eancia mensur\u00e1vel que a aula associa a essa falha?",
    interactionType: "multiple-choice",
    options: [
      "A) Integralidade; aumento do n\u00famero de encaminhamentos desnecess\u00e1rios",
      "B) Longitudinalidade; queda da cobertura vacinal do territ\u00f3rio",
      "C) Coordena\u00e7\u00e3o; queda na mortalidade por descontinuidade do cuidado",
      "D) Coordena\u00e7\u00e3o; aumento da mortalidade por descontinuidade do cuidado",
      "E) Primeiro contato; sobrecarga da aten\u00e7\u00e3o especializada"
    ],
    gabarito: "D"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "A equipe mapeia o territ\u00f3rio, identifica um bairro com esgoto a c\u00e9u aberto e surto de diarreia infantil e articula interven\u00e7\u00e3o com a vigil\u00e2ncia sanit\u00e1ria antes que as crian\u00e7as procurem a unidade. A aula chama isso de:",
    interactionType: "multiple-choice",
    options: [
      "A) Integralidade, por incluir a preven\u00e7\u00e3o entre as frentes de cuidado",
      "B) Orienta\u00e7\u00e3o familiar, por atuar sobre condi\u00e7\u00f5es do domic\u00edlio",
      "C) Orienta\u00e7\u00e3o comunit\u00e1ria, exercida como vigil\u00e2ncia ativa em vez de medicina passiva",
      "D) Coordena\u00e7\u00e3o, por articular a APS com outro servi\u00e7o do sistema",
      "E) Compet\u00eancia cultural, por adaptar a interven\u00e7\u00e3o ao territ\u00f3rio"
    ],
    gabarito: "C"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "A compet\u00eancia cultural \u00e9 descrita na aula como a \"ponte da ades\u00e3o\". O que essa express\u00e3o significa exatamente?",
    interactionType: "multiple-choice",
    options: [
      "A) Que o profissional deve conhecer a genealogia e o hist\u00f3rico familiar do paciente",
      "B) Que a prescri\u00e7\u00e3o t\u00e9cnica s\u00f3 se converte em conduta real quando \u00e9 traduzida para a linguagem e os valores do paciente",
      "C) Que a equipe deve substituir pr\u00e1ticas tradicionais por condutas baseadas em evid\u00eancia",
      "D) Que o v\u00ednculo longitudinal aumenta a confian\u00e7a e, com ela, a ades\u00e3o",
      "E) Que barreiras de acesso s\u00e3o resolvidas pela amplia\u00e7\u00e3o do hor\u00e1rio de funcionamento"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "Sobre a rela\u00e7\u00e3o entre atributos essenciais e derivados, \u00e9 correto afirmar:",
    interactionType: "multiple-choice",
    options: [
      "A) Os derivados s\u00e3o pr\u00e9-requisito dos essenciais e devem ser garantidos primeiro",
      "B) Os essenciais s\u00e3o suficientes: cumpridos os quatro, o cuidado est\u00e1 tecnicamente completo",
      "C) Um servi\u00e7o pode cumprir tecnicamente os quatro essenciais e ainda assim falhar com uma fam\u00edlia espec\u00edfica se ignorar os derivados",
      "D) Os derivados substituem os essenciais em territ\u00f3rios de alta vulnerabilidade",
      "E) A hierarquia entre eles determina a ordem de implanta\u00e7\u00e3o de uma nova equipe de ESF"
    ],
    gabarito: "C"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "Relacione corretamente a frente de atua\u00e7\u00e3o do m\u00e9dico na ESF ao atributo de Starfield que ela exerce, conforme a tabela da aula.",
    interactionType: "multiple-choice",
    options: [
      "A) Visita domiciliar \u2192 orienta\u00e7\u00e3o comunit\u00e1ria; territorializa\u00e7\u00e3o \u2192 orienta\u00e7\u00e3o familiar",
      "B) Visita domiciliar \u2192 orienta\u00e7\u00e3o familiar; territorializa\u00e7\u00e3o e mapeamento de risco \u2192 orienta\u00e7\u00e3o comunit\u00e1ria",
      "C) Pr\u00e1tica cl\u00ednica resolutiva \u2192 longitudinalidade; acompanhamento de HAS/DM \u2192 primeiro contato",
      "D) Articula\u00e7\u00e3o com a RAPS \u2192 integralidade; visita domiciliar \u2192 coordena\u00e7\u00e3o",
      "E) Adapta\u00e7\u00e3o da linguagem ao contexto \u2192 orienta\u00e7\u00e3o familiar; visita domiciliar \u2192 compet\u00eancia cultural"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "Homem de 70 anos, assintom\u00e1tico, chega com solicita\u00e7\u00e3o de PSA, tomografia de corpo inteiro e \"check-up completo\" feita por um plano privado. O m\u00e9dico discute o risco de achados incidentais, sobrediagn\u00f3stico e cascata de exames, e pactua um rastreamento proporcional ao risco. Essa conduta \u00e9 descrita na aula como:",
    interactionType: "multiple-choice",
    options: [
      "A) Preven\u00e7\u00e3o quatern\u00e1ria, dentro da frente de vigil\u00e2ncia e preven\u00e7\u00e3o",
      "B) Preven\u00e7\u00e3o terci\u00e1ria, dentro da frente de pr\u00e1tica cl\u00ednica resolutiva",
      "C) Coordena\u00e7\u00e3o do cuidado, dentro da frente de gest\u00e3o e planejamento",
      "D) Preven\u00e7\u00e3o prim\u00e1ria, dentro da frente de educa\u00e7\u00e3o e ensino",
      "E) Medicina defensiva, aceit\u00e1vel quando h\u00e1 demanda expl\u00edcita do usu\u00e1rio"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "A aula afirma que a alta rotatividade m\u00e9dica \u00e9 um problema de longitudinalidade, e n\u00e3o apenas de gest\u00e3o de pessoal. O melhor argumento para essa afirma\u00e7\u00e3o \u00e9 que:",
    interactionType: "multiple-choice",
    options: [
      "A) A troca frequente de profissionais eleva o custo de contrata\u00e7\u00e3o da gest\u00e3o municipal",
      "B) A rotatividade impede a forma\u00e7\u00e3o do v\u00ednculo terap\u00eautico de longo prazo, que \u00e9 o conte\u00fado do pr\u00f3prio atributo",
      "C) A rotatividade reduz a cobertura de visitas domiciliares realizadas pelos ACS",
      "D) Sem m\u00e9dico fixo, o territ\u00f3rio n\u00e3o pode ser mapeado quanto a riscos sociais",
      "E) A rotatividade impede que os resultados de exames retornem \u00e0 unidade"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "Uma equipe alcan\u00e7a 62% no componente de cuidado da pessoa com hipertens\u00e3o e 78% no componente da pessoa idosa. Pela r\u00e9gua de classifica\u00e7\u00e3o do Previne Brasil, os resultados correspondem, respectivamente, a:",
    interactionType: "multiple-choice",
    options: [
      "A) Suficiente e Bom",
      "B) Bom e \u00d3timo",
      "C) Bom e Bom",
      "D) Suficiente e \u00d3timo",
      "E) Regular e Bom"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "O componente C1 avalia o acesso por demanda programada. Para que um atendimento agendado seja efetivamente computado, \u00e9 necess\u00e1rio que:",
    interactionType: "multiple-choice",
    options: [
      "A) O paciente tenha sido acolhido por demanda espont\u00e2nea e reagendado no mesmo dia",
      "B) A presen\u00e7a do paciente seja confirmada pelo m\u00f3dulo agenda e o \"Tipo de atendimento\" seja finalizado como Consulta Agendada",
      "C) O atendimento tenha CIAP-2 e CID-10 registrados simultaneamente",
      "D) A consulta tenha sido realizada por m\u00e9dico, excluindo-se atendimentos de enfermagem",
      "E) O agendamento tenha sido feito com pelo menos 30 dias de anteced\u00eancia"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "Crian\u00e7a de 20 meses acompanhada na UBS: primeira consulta no 25\u00ba dia de vida, 6 consultas at\u00e9 o momento, 6 registros de peso e altura, uma \u00fanica visita domiciliar do ACS (realizada aos 20 dias) e calend\u00e1rio vacinal completo. Quais boas pr\u00e1ticas do C2 est\u00e3o, at\u00e9 aqui, cumpridas?",
    interactionType: "multiple-choice",
    options: [
      "A) Primeira consulta e vacina\u00e7\u00e3o",
      "B) Primeira consulta, vacina\u00e7\u00e3o e visitas domiciliares",
      "C) Primeira consulta, consultas at\u00e9 2 anos e registros de peso/altura",
      "D) Somente a vacina\u00e7\u00e3o",
      "E) Todas as cinco, desde que as demais se completem antes dos 24 meses"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "Gestante na 14\u00aa semana inicia pr\u00e9-natal. Ao longo do acompanhamento a equipe planeja as boas pr\u00e1ticas do C3. Assinale a alternativa correta quanto a esse indicador.",
    interactionType: "multiple-choice",
    options: [
      "A) A primeira consulta at\u00e9 12 semanas j\u00e1 n\u00e3o pode ser pontuada, mas as demais boas pr\u00e1ticas permanecem poss\u00edveis",
      "B) Bastam 5 consultas de pr\u00e9-natal para pontuar o item de consultas",
      "C) A dTpa deve ser aplicada no primeiro trimestre para contar como boa pr\u00e1tica",
      "D) S\u00e3o exigidas 2 visitas domiciliares do ACS ap\u00f3s a primeira consulta",
      "E) Os testes r\u00e1pidos para s\u00edfilis e HIV s\u00e3o exigidos apenas no primeiro trimestre"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "Qual conjunto re\u00fane apenas c\u00f3digos CIAP-2 que ativam o m\u00f3dulo de gesta\u00e7\u00e3o no e-SUS?",
    interactionType: "multiple-choice",
    options: [
      "A) W78, W84, W85",
      "B) W18, W19, W70",
      "C) W78, W90, W94",
      "D) W71, W92, W95",
      "E) W79, W80, W91"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "Sobre as boas pr\u00e1ticas do puerp\u00e9rio no C3, \u00e9 correto afirmar:",
    interactionType: "multiple-choice",
    options: [
      "A) Exige-se ao menos 1 consulta obrigatoriamente presencial com m\u00e9dico",
      "B) Exige-se pelo menos 1 consulta (presencial ou remota) por m\u00e9dico ou enfermeiro, ao menos 1 visita domiciliar do ACS e ao menos 1 avalia\u00e7\u00e3o odontol\u00f3gica durante a gesta\u00e7\u00e3o",
      "C) A avalia\u00e7\u00e3o odontol\u00f3gica deve ocorrer no puerp\u00e9rio, at\u00e9 42 dias ap\u00f3s o parto",
      "D) S\u00e3o exigidas 3 visitas domiciliares do ACS, como na gesta\u00e7\u00e3o",
      "E) O puerp\u00e9rio n\u00e3o tem boas pr\u00e1ticas pr\u00f3prias; \u00e9 avaliado dentro do componente da crian\u00e7a"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "No componente C4 (pessoa com diabetes), quais boas pr\u00e1ticas valem 20 pontos cada?",
    interactionType: "multiple-choice",
    options: [
      "A) Consulta nos \u00faltimos 6 meses e registro de hemoglobina glicada",
      "B) Consulta nos \u00faltimos 6 meses e 2 visitas domiciliares com intervalo m\u00ednimo de 30 dias",
      "C) Aferi\u00e7\u00e3o de PA e avalia\u00e7\u00e3o dos p\u00e9s",
      "D) Registro de peso e altura e avalia\u00e7\u00e3o dos p\u00e9s",
      "E) Todas as boas pr\u00e1ticas valem 20 pontos, como no C2"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "Pessoa com DM2 tem consulta h\u00e1 4 meses, PA aferida h\u00e1 4 meses, peso e altura h\u00e1 10 meses, hemoglobina glicada h\u00e1 14 meses, avalia\u00e7\u00e3o dos p\u00e9s h\u00e1 8 meses e duas visitas domiciliares h\u00e1 3 e 11 meses. Quantos pontos a equipe deixa de somar, e por qu\u00ea?",
    interactionType: "multiple-choice",
    options: [
      "A) 15 pontos, pela hemoglobina glicada fora da janela de 12 meses",
      "B) 15 pontos, pela avalia\u00e7\u00e3o dos p\u00e9s fora da janela de 6 meses",
      "C) 30 pontos, por glicada e peso/altura fora de janela",
      "D) 20 pontos, porque as visitas domiciliares n\u00e3o respeitaram o intervalo m\u00ednimo",
      "E) Nenhum ponto \u00e9 perdido: todos os registros est\u00e3o dentro das respectivas janelas"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "Sobre a codifica\u00e7\u00e3o do diabetes citada na aula, assinale a correta.",
    interactionType: "multiple-choice",
    options: [
      "A) T89 corresponde ao diabetes n\u00e3o insulino-dependente e T90 ao insulino-dependente",
      "B) T89 corresponde ao diabetes insulino-dependente e T90 ao n\u00e3o insulino-dependente; na CID-10, E10.9 indica diabetes insulino-dependente sem complica\u00e7\u00f5es",
      "C) E10.9 indica diabetes insulino-dependente com complica\u00e7\u00f5es m\u00faltiplas",
      "D) A CIAP-2 n\u00e3o possui c\u00f3digos pr\u00f3prios para diabetes, usando-se apenas a CID-10",
      "E) O registro do atendimento de diabetes dispensa avalia\u00e7\u00e3o codificada, bastando o resultado da glicada"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "Comparando C5 (hipertens\u00e3o) e C6 (pessoa idosa), ambos com boas pr\u00e1ticas de 25 pontos cada, a diferen\u00e7a correta entre eles \u00e9:",
    interactionType: "multiple-choice",
    options: [
      "A) No C5 a consulta tem janela de 6 meses e no C6, de 12 meses; o C6 inclui a vacina influenza e o C5 inclui a aferi\u00e7\u00e3o de PA",
      "B) Ambos exigem consulta nos \u00faltimos 6 meses, diferindo apenas quanto \u00e0 vacina\u00e7\u00e3o",
      "C) O C5 exige vacina influenza e o C6 exige aferi\u00e7\u00e3o de PA",
      "D) No C6 exige-se apenas 1 registro de peso e altura nos \u00faltimos 12 meses",
      "E) O C5 dispensa visitas domiciliares do ACS"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "No componente C7, qual boa pr\u00e1tica vale mais pontos e a qual p\u00fablico se dirige?",
    interactionType: "multiple-choice",
    options: [
      "A) Rastreamento de c\u00e2ncer de colo de \u00fatero, 30 pontos, mulheres de 25 a 64 anos",
      "B) Rastreamento de c\u00e2ncer de mama, 30 pontos, mulheres de 50 a 69 anos",
      "C) Vacina HPV (ao menos 1 dose), 30 pontos, meninas e adolescentes de 9 a 14 anos, empatada com o atendimento em sa\u00fade sexual e reprodutiva (30 pontos, 14 a 69 anos)",
      "D) Atendimento em sa\u00fade sexual e reprodutiva, 40 pontos, mulheres de 25 a 64 anos",
      "E) Todas as quatro boas pr\u00e1ticas valem 25 pontos"
    ],
    gabarito: "C"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "Mulher de 52 anos: citopatol\u00f3gico h\u00e1 30 meses, mamografia h\u00e1 26 meses e atendimento em sa\u00fade sexual e reprodutiva h\u00e1 8 meses. Quantos pontos do C7 ela gera?",
    interactionType: "multiple-choice",
    options: [
      "A) 70 pontos",
      "B) 50 pontos",
      "C) 30 pontos",
      "D) 20 pontos",
      "E) 80 pontos"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "Sobre as janelas temporais dos componentes, assinale a associa\u00e7\u00e3o correta.",
    interactionType: "multiple-choice",
    options: [
      "A) Consulta: 6 meses em HAS e DM; 12 meses na pessoa idosa",
      "B) Aferi\u00e7\u00e3o de PA: 12 meses em HAS e DM",
      "C) Visita domiciliar do ACS: intervalo m\u00e1ximo de 30 dias entre visitas",
      "D) Registro de peso e altura no diabetes: 6 meses",
      "E) Rastreio de mama: 36 meses; rastreio de colo: 24 meses"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "Quanto ao registro operacional no e-SUS/PEC descrito na aula, \u00e9 correto que:",
    interactionType: "multiple-choice",
    options: [
      "A) A DUM \u00e9 registrada na Avalia\u00e7\u00e3o, de onde o sistema calcula a idade gestacional",
      "B) A DUM \u00e9 registrada no Objetivo, e \u00e9 a partir dela que o sistema calcula a idade gestacional",
      "C) A dTpa \u00e9 registrada digitando-se o c\u00f3digo CIAP-2 W78 no campo de vacinas",
      "D) Os testes r\u00e1pidos s\u00e3o registrados no Subjetivo, como relato da gestante",
      "E) Peso e altura da crian\u00e7a s\u00e3o registrados no campo Acompanhamento \u2192 Crian\u00e7a"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "A aula sustenta que o Previne Brasil \"n\u00e3o paga pela quantidade de atendimentos\". Qual leitura traduz melhor essa afirma\u00e7\u00e3o e sua rela\u00e7\u00e3o com o M\u00f3dulo 1?",
    interactionType: "multiple-choice",
    options: [
      "A) O pagamento \u00e9 por produ\u00e7\u00e3o, desde que os atendimentos sejam agendados",
      "B) O componente de qualidade remunera o acompanhamento longitudinal de grupos priorit\u00e1rios, de modo que cada boa pr\u00e1tica \u00e9 a tradu\u00e7\u00e3o operacional de um atributo de Starfield",
      "C) O financiamento independe do registro cl\u00ednico, que tem finalidade apenas assistencial",
      "D) Os indicadores medem satisfa\u00e7\u00e3o do usu\u00e1rio com o servi\u00e7o prestado",
      "E) A remunera\u00e7\u00e3o depende exclusivamente da cobertura populacional cadastrada"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "Mulher de 48 anos com cefaleia quase di\u00e1ria diz: \"Quero fazer uma tomografia. Minha vizinha come\u00e7ou assim e depois descobriu um tumor.\" A pergunta \"o que voc\u00ea acha que pode estar acontecendo?\" explora qual dimens\u00e3o do SIFE, e a pergunta \"o que isso mudou na sua rotina?\", qual outra?",
    interactionType: "multiple-choice",
    options: [
      "A) Sentimentos e Expectativas",
      "B) Ideias e Funcionalidade",
      "C) Ideias e Expectativas",
      "D) Sentimentos e Funcionalidade",
      "E) Expectativas e Ideias"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "Sobre o uso do SIFE, a afirma\u00e7\u00e3o compat\u00edvel com a aula \u00e9:",
    interactionType: "multiple-choice",
    options: [
      "A) As quatro perguntas devem ser feitas literalmente e na ordem S\u2013I\u2013F\u2013E, no in\u00edcio da consulta",
      "B) O SIFE substitui a anamnese biom\u00e9dica quando a queixa n\u00e3o tem sinais de alarme",
      "C) O SIFE \u00e9 uma forma de escutar melhor: as quatro dimens\u00f5es precisam ser exploradas em algum momento, sem sequ\u00eancia fixa nem leitura literal",
      "D) O SIFE s\u00f3 se aplica a queixas de origem psicossocial",
      "E) O SIFE deve ser registrado na Avalia\u00e7\u00e3o, por se tratar de interpreta\u00e7\u00e3o cl\u00ednica"
    ],
    gabarito: "C"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "Assinale a alternativa que apresenta os 7 passos da consulta na ordem correta.",
    interactionType: "multiple-choice",
    options: [
      "A) Prepara\u00e7\u00e3o \u00b7 Primeiros minutos \u00b7 Explora\u00e7\u00e3o \u00b7 Avalia\u00e7\u00e3o \u00b7 Plano \u00b7 Encerramento \u00b7 Reflex\u00e3o final",
      "B) Primeiros minutos \u00b7 Prepara\u00e7\u00e3o \u00b7 Explora\u00e7\u00e3o \u00b7 Plano \u00b7 Avalia\u00e7\u00e3o \u00b7 Reflex\u00e3o final \u00b7 Encerramento",
      "C) Prepara\u00e7\u00e3o \u00b7 Explora\u00e7\u00e3o \u00b7 Primeiros minutos \u00b7 Avalia\u00e7\u00e3o \u00b7 Plano \u00b7 Reflex\u00e3o final \u00b7 Encerramento",
      "D) Acolhimento \u00b7 Anamnese \u00b7 Exame f\u00edsico \u00b7 Hip\u00f3teses \u00b7 Conduta \u00b7 Registro \u00b7 Retorno",
      "E) Prepara\u00e7\u00e3o \u00b7 Primeiros minutos \u00b7 Avalia\u00e7\u00e3o \u00b7 Explora\u00e7\u00e3o \u00b7 Plano \u00b7 Reflex\u00e3o final \u00b7 Encerramento"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "Segundo a aula, em qual dos 7 passos o MCCP N\u00c3O \u00e9 descrito como entrando explicitamente?",
    interactionType: "multiple-choice",
    options: [
      "A) Prepara\u00e7\u00e3o",
      "B) Primeiros minutos",
      "C) Explora\u00e7\u00e3o",
      "D) Plano",
      "E) Reflex\u00e3o final"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "Qual fala pertence ao plano compartilhado, e n\u00e3o ao modelo prescritivo?",
    interactionType: "multiple-choice",
    options: [
      "A) \"Voc\u00ea precisa perder dez quilos at\u00e9 o retorno.\"",
      "B) \"Fa\u00e7a essa caminhada todos os dias, sem falta.\"",
      "C) \"Se n\u00e3o fizer o que eu estou mandando, n\u00e3o vai melhorar.\"",
      "D) \"Entre estas possibilidades, o que seria vi\u00e1vel para voc\u00ea? Vamos combinar um primeiro passo?\"",
      "E) \"Vou aumentar a dose e reavalio em trinta dias.\""
    ],
    gabarito: "D"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "\"Estrutura sem escuta vira checklist; escuta sem estrutura pode perder seguran\u00e7a cl\u00ednica.\" A leitura correta dessa advert\u00eancia \u00e9:",
    interactionType: "multiple-choice",
    options: [
      "A) Deve-se escolher entre priorizar a escuta ou a seguran\u00e7a cl\u00ednica, conforme o tempo dispon\u00edvel",
      "B) O erro mais comum n\u00e3o \u00e9 escolher um dos dois, mas achar que um substitui o outro \u2014 os 7 passos existem para que a escuta ocorra dentro de uma sequ\u00eancia que n\u00e3o abandona a seguran\u00e7a",
      "C) A escuta \u00e9 atributo do MCCP e a estrutura pertence ao registro em SOAP, sendo dom\u00ednios independentes",
      "D) Em consultas de demanda espont\u00e2nea, a estrutura deve ser abandonada em favor do v\u00ednculo",
      "E) A estrutura dos 7 passos deve ser seguida rigidamente, e a escuta acomodada no tempo que sobrar"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "Na tabela que contrap\u00f5e consulta centrada na doen\u00e7a e centrada na pessoa, qual par est\u00e1 corretamente atribu\u00eddo?",
    interactionType: "multiple-choice",
    options: [
      "A) \"H\u00e1 sinais de alarme?\" \u2192 centrada na pessoa; \"O que mais preocupa?\" \u2192 centrada na doen\u00e7a",
      "B) \"Qual exame?\" \u2192 centrada na pessoa; \"Como afeta a rotina?\" \u2192 centrada na doen\u00e7a",
      "C) \"Quais hip\u00f3teses?\" \u2192 centrada na doen\u00e7a; \"O que isso significa?\" \u2192 centrada na pessoa",
      "D) \"Qual tratamento?\" \u2192 centrada na pessoa; \"O que ela espera da consulta?\" \u2192 centrada na doen\u00e7a",
      "E) Todas as perguntas pertencem \u00e0 consulta centrada na pessoa, desde que feitas com empatia"
    ],
    gabarito: "C"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "Um estudante afirma que \"aplicar o MCCP significa dar menos peso \u00e0s hip\u00f3teses diagn\u00f3sticas, porque o que importa \u00e9 a experi\u00eancia da pessoa\". A cr\u00edtica correta \u00e9 que:",
    interactionType: "multiple-choice",
    options: [
      "A) Est\u00e1 certo: em APS, o diagn\u00f3stico \u00e9 secund\u00e1rio ao v\u00ednculo",
      "B) Est\u00e1 errado: o MCCP n\u00e3o substitui o racioc\u00ednio cl\u00ednico, mas impede que o racioc\u00ednio cl\u00ednico perca a pessoa",
      "C) Est\u00e1 errado: o MCCP exige mais exames complementares para confirmar hip\u00f3teses",
      "D) Est\u00e1 certo, desde que o paciente n\u00e3o apresente sinais de alarme",
      "E) Est\u00e1 errado: o MCCP s\u00f3 se aplica depois de encerrado o racioc\u00ednio diagn\u00f3stico"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 4 \u2014 Registro em SOAP e CIAP-2",
    text: "Sobre o prontu\u00e1rio orientado por problemas (POMR), assinale a correta.",
    interactionType: "multiple-choice",
    options: [
      "A) Foi proposto por Barbara Starfield e organiza o registro por ordem cronol\u00f3gica de queixas",
      "B) Foi proposto por Lawrence Weed; sua unidade central \u00e9 a lista de problemas, numerados e acompanhados como ativos, inativos ou resolvidos",
      "C) Foi proposto pela WONCA e substitui o SOAP nas unidades informatizadas",
      "D) Organiza o registro por especialidade, para facilitar o encaminhamento",
      "E) \u00c9 recomendado apenas para servi\u00e7os hospitalares de alta complexidade"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 4 \u2014 Registro em SOAP e CIAP-2",
    text: "Um interno registra em Subjetivo: \"Paciente com quadro gripal, provavelmente viral.\" Qual \u00e9 o erro e como corrigi-lo?",
    interactionType: "multiple-choice",
    options: [
      "A) N\u00e3o h\u00e1 erro: a impress\u00e3o inicial pode abrir o Subjetivo",
      "B) O erro \u00e9 de conte\u00fado cl\u00ednico; bastaria retirar o termo \"provavelmente\"",
      "C) Trata-se de impress\u00e3o diagn\u00f3stica lan\u00e7ada no Subjetivo; o S deveria trazer a fala do paciente (\"tosse e dor de garganta h\u00e1 tr\u00eas dias\") e a interpreta\u00e7\u00e3o pertence \u00e0 Avalia\u00e7\u00e3o",
      "D) O registro pertence ao Objetivo, pois descreve o estado geral observado",
      "E) O registro pertence ao Plano, pois antecipa a conduta sintom\u00e1tica"
    ],
    gabarito: "C"
  },
  {
    type: "M\u00f3dulo 4 \u2014 Registro em SOAP e CIAP-2",
    text: "Em qual letra do SOAP se registram Sentimentos, Ideias, Funcionalidade e Expectativas, e por qu\u00ea?",
    interactionType: "multiple-choice",
    options: [
      "A) Na Avalia\u00e7\u00e3o, porque exigem interpreta\u00e7\u00e3o do profissional",
      "B) No Objetivo, porque podem ser observados durante a consulta",
      "C) No Subjetivo, porque s\u00e3o, por defini\u00e7\u00e3o, relatados pelo pr\u00f3prio paciente",
      "D) No Plano, porque orientam a negocia\u00e7\u00e3o da conduta",
      "E) Distribuem-se entre Subjetivo (S e I) e Avalia\u00e7\u00e3o (F e E)"
    ],
    gabarito: "C"
  },
  {
    type: "M\u00f3dulo 4 \u2014 Registro em SOAP e CIAP-2",
    text: "Qual afirma\u00e7\u00e3o distingue corretamente CIAP-2 e CID-10?",
    interactionType: "multiple-choice",
    options: [
      "A) A CIAP-2 foca na doen\u00e7a e a CID-10, no epis\u00f3dio de cuidado",
      "B) A CID-10 foca na doen\u00e7a; a CIAP-2 foca no epis\u00f3dio de cuidado, permitindo codificar com a mesma l\u00f3gica o motivo da consulta, os procedimentos e o diagn\u00f3stico",
      "C) S\u00e3o sin\u00f4nimos, variando apenas o pa\u00eds de ado\u00e7\u00e3o",
      "D) A CIAP-2 \u00e9 usada na aten\u00e7\u00e3o hospitalar e a CID-10, na APS",
      "E) A CIAP-2 codifica apenas diagn\u00f3sticos confirmados, e a CID-10, tamb\u00e9m sintomas"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 4 \u2014 Registro em SOAP e CIAP-2",
    text: "O c\u00f3digo R05 \u00e9 decomposto do seguinte modo:",
    interactionType: "multiple-choice",
    options: [
      "A) R = registro de rotina; 05 = quinta consulta do epis\u00f3dio",
      "B) R = respirat\u00f3rio (cap\u00edtulo/sistema corporal); 05 = componente correspondente a tosse",
      "C) R = resultado de exame; 05 = gravidade do sintoma",
      "D) R = retorno; 05 = n\u00famero do problema na lista de problemas",
      "E) R = rastreamento; 05 = periodicidade em anos"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 4 \u2014 Registro em SOAP e CIAP-2",
    text: "A CIAP-2 organiza-se em:",
    interactionType: "multiple-choice",
    options: [
      "A) 7 cap\u00edtulos \u00d7 17 componentes, sendo o componente 1 o de diagn\u00f3sticos e doen\u00e7as",
      "B) 17 cap\u00edtulos \u00d7 7 componentes, sendo o componente 1 o de sintomas e queixas e o 7 o de diagn\u00f3sticos e doen\u00e7as",
      "C) 17 cap\u00edtulos \u00d7 10 componentes, com numera\u00e7\u00e3o cont\u00ednua de 01 a 99",
      "D) Cap\u00edtulos por faixa et\u00e1ria e componentes por n\u00edvel de complexidade",
      "E) Cap\u00edtulos por ciclo de vida e componentes por tipo de profissional que registra"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 4 \u2014 Registro em SOAP e CIAP-2",
    text: "Considere os c\u00f3digos K86, L03, P e T89. A associa\u00e7\u00e3o correta entre a letra e o sistema \u00e9:",
    interactionType: "multiple-choice",
    options: [
      "A) K circulat\u00f3rio, L osteomuscular, P psicol\u00f3gico, T metab\u00f3lico e end\u00f3crino",
      "B) K osteomuscular, L circulat\u00f3rio, P pele, T neurol\u00f3gico",
      "C) K circulat\u00f3rio, L neurol\u00f3gico, P psicol\u00f3gico, T social",
      "D) K metab\u00f3lico, L osteomuscular, P psicol\u00f3gico, T circulat\u00f3rio",
      "E) K circulat\u00f3rio, L osteomuscular, P pele, T metab\u00f3lico e end\u00f3crino"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulo 4 \u2014 Registro em SOAP e CIAP-2",
    text: "No registro do caso de Lucas (lombalgia, com relato de ass\u00e9dio do supervisor), a Avalia\u00e7\u00e3o foi escrita como: \"Lombalgia mec\u00e2nica inespec\u00edfica, sem sinais de alarme \u2014 CIAP-2: L03. Situa\u00e7\u00e3o de sofrimento ocupacional associada, a explorar em retorno.\" Qual princ\u00edpio de registro essa formula\u00e7\u00e3o demonstra?",
    interactionType: "multiple-choice",
    options: [
      "A) Que o sofrimento ps\u00edquico deve ser omitido do prontu\u00e1rio at\u00e9 confirma\u00e7\u00e3o diagn\u00f3stica",
      "B) Que o SOAP muda de formato quando a consulta \u00e9 centrada na pessoa",
      "C) Que o achado biom\u00e9dico e a situa\u00e7\u00e3o de vida s\u00e3o ambos registrados na Avalia\u00e7\u00e3o, sem serem fundidos em um \u00fanico c\u00f3digo",
      "D) Que o medo de demiss\u00e3o deveria ter sido codificado como diagn\u00f3stico psiqui\u00e1trico",
      "E) Que o Subjetivo deve conter a interpreta\u00e7\u00e3o do contexto social"
    ],
    gabarito: "C"
  },
  {
    type: "M\u00f3dulos 5 e 6 \u2014 Casos cl\u00ednicos e s\u00edntese",
    text: "Marcos, 52 anos, motorista, pede \"todos os exames\"; assintom\u00e1tico, PA 136\u00d784, IMC 29, refere raramente procurar servi\u00e7os de sa\u00fade. Ap\u00f3s sil\u00eancio, conta que um colega de 51 anos morreu de infarto na semana anterior. Qual \u00e9 a leitura correta da demanda e o principal risco de erro?",
    interactionType: "multiple-choice",
    options: [
      "A) Demanda de rastreamento; o risco \u00e9 n\u00e3o solicitar todos os exames pedidos, perdendo diagn\u00f3sticos precoces",
      "B) Hipocondria; o risco \u00e9 refor\u00e7ar o comportamento atendendo ao pedido",
      "C) Demanda expl\u00edcita de exames encobrindo medo de morte s\u00fabita; o risco \u00e9 atender acriticamente (medicina defensiva) ou desqualificar o pedido como \"sem necessidade cl\u00ednica\", perdendo a janela para falar de risco cardiovascular e do pr\u00f3prio medo",
      "D) Demanda administrativa; o risco \u00e9 n\u00e3o emitir o atestado de aptid\u00e3o ocupacional",
      "E) Demanda de v\u00ednculo; o risco \u00e9 realizar exame f\u00edsico, que pode ser interpretado como desconfian\u00e7a"
    ],
    gabarito: "C"
  },
  {
    type: "M\u00f3dulos 5 e 6 \u2014 Casos cl\u00ednicos e s\u00edntese",
    text: "Dona C\u00e9lia, 61 anos, PA 168\u00d798, em uso de losartana e anlodipino, revela que omite doses \"quando a press\u00e3o est\u00e1 boa\", por medo de \"estragar os rins\"; cuida do marido p\u00f3s-AVC e de dois netos. O estudante pensa em aumentar o anlodipino. Qual a cr\u00edtica mais precisa a essa conduta inicial?",
    interactionType: "multiple-choice",
    options: [
      "A) \u00c9 adequada, pois a PA est\u00e1 acima da meta e a paciente afirma tomar a medica\u00e7\u00e3o corretamente",
      "B) \u00c9 inadequada porque anlodipino \u00e9 nefrot\u00f3xico, devendo-se trocar a classe do f\u00e1rmaco",
      "C) \u00c9 inadequada porque trata o n\u00famero da PA sem tocar nas duas causas reais: a ideia de dano renal e a sobrecarga como cuidadora",
      "D) \u00c9 inadequada porque a paciente deve ser classificada como n\u00e3o aderente e encaminhada \u00e0 psicologia",
      "E) \u00c9 adequada, desde que acompanhada de orienta\u00e7\u00e3o escrita sobre a import\u00e2ncia da ades\u00e3o"
    ],
    gabarito: "C"
  },
  {
    type: "M\u00f3dulos 5 e 6 \u2014 Casos cl\u00ednicos e s\u00edntese",
    text: "Ainda sobre Dona C\u00e9lia, quais elementos comp\u00f5em um plano compartilhado coerente com o MCCP?",
    interactionType: "multiple-choice",
    options: [
      "A) Explicar sem jarg\u00e3o por que a dose prescrita n\u00e3o causa dano renal, simplificar o esquema posol\u00f3gico quando poss\u00edvel, negociar um lembrete compat\u00edvel com a rotina e reconhecer explicitamente seu papel de cuidadora antes de qualquer orienta\u00e7\u00e3o sobre a press\u00e3o",
      "B) Entregar folheto sobre hipertens\u00e3o e agendar retorno em seis meses",
      "C) Aumentar a dose e condicionar o pr\u00f3ximo atendimento \u00e0 comprova\u00e7\u00e3o de ades\u00e3o",
      "D) Encaminhar ao cardiologista para reavalia\u00e7\u00e3o do esquema terap\u00eautico",
      "E) Solicitar fun\u00e7\u00e3o renal para provar \u00e0 paciente que seus rins est\u00e3o preservados"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulos 5 e 6 \u2014 Casos cl\u00ednicos e s\u00edntese",
    text: "Ana Paula, 38 anos, com ins\u00f4nia h\u00e1 tr\u00eas meses, pede \"alguma coisa para dormir\"; separou-se h\u00e1 quatro meses e, ao ser perguntada sobre isso, responde \"prefiro n\u00e3o falar disso\", acrescentando em seguida \"mas estou cansada de fingir para todo mundo que estou bem\". Qual \u00e9 a conduta tecnicamente correta pelo MCCP?",
    interactionType: "multiple-choice",
    options: [
      "A) Insistir delicadamente no tema da separa\u00e7\u00e3o, pois a segunda frase autoriza o aprofundamento",
      "B) Prescrever o hipn\u00f3tico solicitado, j\u00e1 que a paciente delimitou o escopo da consulta",
      "C) Reconhecer explicitamente o limite, validar o cansa\u00e7o, oferecer retorno pr\u00f3ximo e deixar a porta aberta, sem encerrar a consulta sem nenhum plano de cuidado para o sono e a seguran\u00e7a dela",
      "D) Encerrar o atendimento e encaminhar imediatamente ao servi\u00e7o de sa\u00fade mental, sem abordar a ins\u00f4nia",
      "E) Registrar recusa de informa\u00e7\u00e3o no prontu\u00e1rio e reagendar com outro profissional"
    ],
    gabarito: "C"
  },
  {
    type: "M\u00f3dulos 5 e 6 \u2014 Casos cl\u00ednicos e s\u00edntese",
    text: "No caso de Lucas (dor lombar h\u00e1 duas semanas, sem sinais de alarme, com relato posterior de ass\u00e9dio no trabalho), qual afirma\u00e7\u00e3o \u00e9 correta?",
    interactionType: "multiple-choice",
    options: [
      "A) A revela\u00e7\u00e3o do ass\u00e9dio explica a dor e torna dispens\u00e1vel o exame f\u00edsico osteomuscular",
      "B) A aus\u00eancia de sinais de alarme j\u00e1 permite classificar a dor como provavelmente mec\u00e2nica, e isso n\u00e3o muda com o conte\u00fado revelado depois; o ass\u00e9dio \u00e9, em si, um problema de sa\u00fade que merece registro e cuidado",
      "C) O atestado deve ser negado, pois a demanda real \u00e9 psicossocial",
      "D) O atestado deve ser concedido pelos tr\u00eas dias solicitados, para preservar o v\u00ednculo",
      "E) Deve-se encaminhar imediatamente ao psiquiatra antes de qualquer conduta para a lombalgia"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulos 5 e 6 \u2014 Casos cl\u00ednicos e s\u00edntese",
    text: "Na tabela de s\u00edntese do M\u00f3dulo 6, \"cuidado ao longo do tempo, n\u00e3o epis\u00f3dico\" aparece nos quatro vocabul\u00e1rios da disciplina como:",
    interactionType: "multiple-choice",
    options: [
      "A) Integralidade \u00b7 boas pr\u00e1ticas da preven\u00e7\u00e3o \u00e0 reabilita\u00e7\u00e3o \u00b7 \"entender a pessoa como um todo\" \u00b7 SIFE no Subjetivo",
      "B) Longitudinalidade \u00b7 consulta em janela de 6 a 12 meses \u00b7 rela\u00e7\u00e3o m\u00e9dico-pessoa (4\u00ba componente do MCCP) \u00b7 lista de problemas acompanhada por evolu\u00e7\u00e3o",
      "C) Coordena\u00e7\u00e3o \u00b7 encaminhamentos e registro compartilhado \u00b7 \"construir com\" \u00b7 Plano com encaminhamento expl\u00edcito",
      "D) Compet\u00eancia cultural \u00b7 c\u00f3digos padronizados \u00b7 explora\u00e7\u00e3o do contexto \u00b7 l\u00f3gica letra + n\u00famero da CIAP-2",
      "E) Orienta\u00e7\u00e3o familiar \u00b7 visita domiciliar do ACS \u00b7 7 passos \u00b7 itens sociais no Subjetivo"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulos 5 e 6 \u2014 Casos cl\u00ednicos e s\u00edntese",
    text: "Seguindo Dona C\u00e9lia do sistema \u00e0 consulta, a sequ\u00eancia descrita no exerc\u00edcio mental do M\u00f3dulo 6 \u00e9:",
    interactionType: "multiple-choice",
    options: [
      "A) Primeiro contato estruturado (M1) \u2192 acompanhamento da HAS nos \u00faltimos 6 meses como boa pr\u00e1tica do C5 (M2) \u2192 SIFE revelando o medo renal e a sobrecarga (M3) \u2192 registro em SOAP com CIAP-2 K86 ou K87 na Avalia\u00e7\u00e3o (M4)",
      "B) Coordena\u00e7\u00e3o (M1) \u2192 componente C4 (M2) \u2192 7 passos (M3) \u2192 CIAP-2 T90 na Avalia\u00e7\u00e3o (M4)",
      "C) Longitudinalidade (M1) \u2192 componente C6 (M2) \u2192 SIFE (M3) \u2192 CIAP-2 K86 no Subjetivo (M4)",
      "D) Orienta\u00e7\u00e3o comunit\u00e1ria (M1) \u2192 componente C1 (M2) \u2192 plano compartilhado (M3) \u2192 CID-10 I10 no Plano (M4)",
      "E) Compet\u00eancia cultural (M1) \u2192 componente C5 (M2) \u2192 SIFE (M3) \u2192 CIAP-2 L03 na Avalia\u00e7\u00e3o (M4)"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulos 5 e 6 \u2014 Casos cl\u00ednicos e s\u00edntese",
    text: "\"A mesma consulta, vista de baixo para cima, \u00e9 dado cl\u00ednico; vista de cima para baixo, \u00e9 indicador de qualidade de um sistema de sa\u00fade inteiro.\" A implica\u00e7\u00e3o pr\u00e1tica mais direta dessa frase \u00e9:",
    interactionType: "multiple-choice",
    options: [
      "A) Que o registro cl\u00ednico deve ser simplificado para n\u00e3o competir com o tempo da escuta",
      "B) Que o atendimento individual bem registrado se converte em ponto percentual do componente de qualidade da equipe, de modo que qualidade assistencial e qualidade do registro s\u00e3o insepar\u00e1veis",
      "C) Que os indicadores do Previne Brasil substituem a avalia\u00e7\u00e3o cl\u00ednica individual",
      "D) Que a codifica\u00e7\u00e3o em CIAP-2 \u00e9 exig\u00eancia burocr\u00e1tica sem efeito sobre o cuidado",
      "E) Que apenas atendimentos de grupos priorit\u00e1rios precisam de registro estruturado"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulos 5 e 6 \u2014 Casos cl\u00ednicos e s\u00edntese",
    text: "O roteiro comum de discuss\u00e3o dos quatro casos encerra-se com a pergunta \"qual seria o maior erro de uma consulta centrada apenas na doen\u00e7a?\". Considerando os quatro casos em conjunto, a resposta que melhor sintetiza esse erro \u00e9:",
    interactionType: "multiple-choice",
    options: [
      "A) Deixar de solicitar exames complementares suficientes para excluir causas org\u00e2nicas",
      "B) Resolver a demanda expl\u00edcita \u2014 exames, dose maior, atestado, hipn\u00f3tico \u2014 sem acessar a demanda poss\u00edvel que a sustenta, perdendo a oportunidade de um plano vi\u00e1vel na vida real da pessoa",
      "C) Demorar-se excessivamente na consulta, comprometendo a agenda da equipe",
      "D) Registrar o contexto social no prontu\u00e1rio, expondo dados sens\u00edveis do paciente",
      "E) Envolver a fam\u00edlia no plano terap\u00eautico sem autoriza\u00e7\u00e3o formal do paciente"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "Em uma Unidade B\u00e1sica de Sa\u00fade, a equipe percebe que os pacientes com queixas cr\u00f4nicas frequentemente peregrinam por v\u00e1rios especialistas sem que haja um registro unificado ou uma condu\u00e7\u00e3o centralizada. Qual atributo da Aten\u00e7\u00e3o Prim\u00e1ria \u00e0 Sa\u00fade segundo Starfield est\u00e1 mais diretamente comprometido nessa situa\u00e7\u00e3o?",
    interactionType: "multiple-choice",
    options: [
      "A) Primeiro contato",
      "B) Longitudinalidade",
      "C) Coordena\u00e7\u00e3o do cuidado",
      "D) Orienta\u00e7\u00e3o familiar",
      "E) Compet\u00eancia cultural"
    ],
    gabarito: "C"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "O atributo 'Primeiro Contato' da APS refere-se \u00e0 acessibilidade e ao uso do servi\u00e7o como porta de entrada para cada novo problema ou epis\u00f3dio de necessidade de sa\u00fade. Assinale a alternativa que melhor exemplifica o exerc\u00edcio pleno desse atributo.",
    interactionType: "multiple-choice",
    options: [
      "A) Paciente com dor tor\u00e1cica aguda que procura diretamente o pronto-socorro hospitalar por falta de acolhimento na UBS",
      "B) Unidade que oferece atendimento imediato de demanda espont\u00e2nea e funciona como centro preferencial de atendimento a novas necessidades de sa\u00fade",
      "C) Agendamento exclusivo para consultas programadas de hipertensos com anteced\u00eancia de 60 dias",
      "D) Encaminhamento obrigat\u00f3rio de todas as queixas agudas para cl\u00ednicas privadas conveniadas",
      "E) Restri\u00e7\u00e3o do acesso \u00e0 UBS apenas para pacientes cadastrados no territ\u00f3rio adscrito com exames em dia"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "Sobre os atributos derivados de Barbara Starfield (orienta\u00e7\u00e3o familiar, orienta\u00e7\u00e3o comunit\u00e1ria e compet\u00eancia cultural), \u00e9 correto afirmar que:",
    interactionType: "multiple-choice",
    options: [
      "A) S\u00e3o opcionais e secund\u00e1rios, podendo ser ignorados sem preju\u00edzo \u00e0 qualidade assistencial",
      "B) Atuam ampliando a \u00f3rbita essencial, conectando o indiv\u00edduo \u00e0 sua fam\u00edlia, ao seu contexto social e aos valores culturais da comunidade",
      "C) Substituem completamente os atributos essenciais em \u00e1reas urbanas de alta densidade",
      "D) S\u00e3o avaliados exclusivamente por indicadores financeiros do Minist\u00e9rio da Sa\u00fade",
      "E) Referem-se unicamente ao n\u00famero de visitas domiciliares realizadas pelos Agentes Comunit\u00e1rios de Sa\u00fade"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "A preven\u00e7\u00e3o quatern\u00e1ria, inserida na frente de vigil\u00e2ncia e preven\u00e7\u00e3o da ESF, tem como principal objetivo:",
    interactionType: "multiple-choice",
    options: [
      "A) Diagnosticar precocemente doen\u00e7as assintom\u00e1ticas atrav\u00e9s de exames de rastreio em massa",
      "B) Evitar a iatrogenia, proteger o paciente de interven\u00e7\u00f5es excessivas ou desnecess\u00e1rias e combater a medicaliza\u00e7\u00e3o da vida",
      "C) Realizar reabilita\u00e7\u00e3o motora e funcional p\u00f3s-acidente vascular encef\u00e1lico",
      "D) Fornecer cuidados paliativos exclusivos para pacientes em fase terminal",
      "E) Vacinar a popula\u00e7\u00e3o contra doen\u00e7as infectocontagiosas sazonais"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "O conceito de territorializa\u00e7\u00e3o na Estrat\u00e9gia Sa\u00fade da Fam\u00edlia (ESF) permite \u00e0 equipe conhecer o perfil epidemiol\u00f3gico, social e sanit\u00e1rio da popula\u00e7\u00e3o adscrita. Qual atributo de Starfield \u00e9 potencializado diretamente por essa pr\u00e1tica?",
    interactionType: "multiple-choice",
    options: [
      "A) Apenas o primeiro contato",
      "B) A orienta\u00e7\u00e3o comunit\u00e1ria e o planejamento de a\u00e7\u00f5es baseadas nas necessidades do territ\u00f3rio",
      "C) A exclus\u00e3o de pacientes n\u00e3o cadastrados da rede de atendimento",
      "D) A centraliza\u00e7\u00e3o do atendimento m\u00e9dico em procedimentos hospitalares",
      "E) A elimina\u00e7\u00e3o da necessidade de prontu\u00e1rio eletr\u00f4nico"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "A longitudinalidade na pr\u00e1tica da Aten\u00e7\u00e3o Prim\u00e1ria garante que a rela\u00e7\u00e3o entre m\u00e9dico, equipe e usu\u00e1rio se fortale\u00e7a ao longo do tempo. Qual dos seguintes eventos na rotina de uma UBS mais fere diretamente este atributo?",
    interactionType: "multiple-choice",
    options: [
      "A) A realiza\u00e7\u00e3o de reuni\u00f5es semanais de equipe para discuss\u00e3o de casos complexos",
      "B) A alta rotatividade de profissionais m\u00e9dicos que impede a constru\u00e7\u00e3o de v\u00ednculo terap\u00eautico cont\u00ednuo",
      "C) O uso de prontu\u00e1rio eletr\u00f4nico integrado com hist\u00f3rico cl\u00ednico acess\u00edvel",
      "D) A oferta de grupos educativos para portadores de hipertens\u00e3o e diabetes",
      "E) A realiza\u00e7\u00e3o de visitas domiciliares conjuntas entre m\u00e9dico e enfermeiro"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "A integralidade como atributo da APS abrange um amplo espectro de respostas assistenciais. Quando a equipe de sa\u00fade articula a\u00e7\u00f5es de reabilita\u00e7\u00e3o e suporte ao fim da vida (cuidados paliativos), ela est\u00e1 atuando em quais das quatro frentes da integralidade?",
    interactionType: "multiple-choice",
    options: [
      "A) Apenas preven\u00e7\u00e3o e diagn\u00f3stico",
      "B) Reabilita\u00e7\u00e3o e palia\u00e7\u00e3o",
      "C) Triagem e encaminhamento administrativo",
      "D) Rastreio e vigil\u00e2ncia sanit\u00e1ria",
      "E) Apenas cura e tratamento agudo"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "A compet\u00eancia cultural na pr\u00e1tica m\u00e9dica da ESF exige que o profissional:",
    interactionType: "multiple-choice",
    options: [
      "A) Imponha o protocolo cient\u00edfico padr\u00e3o sem considerar as cren\u00e7as ou valores do paciente",
      "B) Traduzca a linguagem t\u00e9cnica para termos compreens\u00edveis e respeite as cren\u00e7as, tradi\u00e7\u00f5es e valores locais do paciente, garantindo a ades\u00e3o ao cuidado",
      "C) Encaminhe imediatamente qualquer paciente com pr\u00e1ticas tradicionais para atendimento psiqui\u00e1trico",
      "D) Evite realizar anamnese detalhada sobre o contexto sociofamiliar",
      "E) Utilize exclusivamente termos t\u00e9cnicos em latim nas prescri\u00e7\u00f5es"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "A orienta\u00e7\u00e3o familiar na APS reconhece o indiv\u00edduo inserido no seu n\u00facleo familiar. Assinale a conduta que demonstra o exerc\u00edcio desse atributo:",
    interactionType: "multiple-choice",
    options: [
      "A) Atender o paciente de forma isolada, ignorando quem cuida dele ou sua din\u00e2mica domiciliar",
      "B) Investigar a sobrecarga do cuidador familiar ao planejar o tratamento de um paciente idoso dependente",
      "C) Exigir que todos os membros da fam\u00edlia compare\u00e7am juntos a todas as consultas de rotina",
      "D) Repassar a responsabilidade do tratamento exclusivamente para os parentes sem orientar o paciente",
      "E) Limitar o atendimento cl\u00ednico apenas a pacientes que possuem c\u00f4njuge cadastrado"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 1 \u2014 Atributos de Starfield e o m\u00e9dico na ESF",
    text: "Sobre a coordena\u00e7\u00e3o do cuidado na rede de aten\u00e7\u00e3o \u00e0 sa\u00fade, \u00e9 correto afirmar que a UBS atua como:",
    interactionType: "multiple-choice",
    options: [
      "A) Um filtro burocr\u00e1tico intranspon\u00edvel que dificulta o acesso a especialistas",
      "B) O centro de comunica\u00e7\u00e3o e roteador central das informa\u00e7\u00f5es cl\u00ednicas entre os diferentes pontos da rede (especialistas, exames e hospitais)",
      "C) Um servi\u00e7o independente que n\u00e3o mant\u00e9m rela\u00e7\u00e3o com hospitais ou servi\u00e7os de alta complexidade",
      "D) Um local de atendimento estritamente epis\u00f3dico sem responsabilidade de contrarrefer\u00eancia",
      "E) Uma unidade de pronto atendimento para urg\u00eancias cardiol\u00f3gicas severas"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "No modelo de financiamento do Previne Brasil, o indicador de propor\u00e7\u00e3o de gestantes com atestado de s\u00edfilis e HIV realizados no pr\u00e9-natal (Componente C3) exige a realiza\u00e7\u00e3o de testes r\u00e1pidos ou sorologias em momentos espec\u00edficos. Quais trimestres s\u00e3o preconizados?",
    interactionType: "multiple-choice",
    options: [
      "A) Apenas no primeiro trimestre de gesta\u00e7\u00e3o",
      "B) No primeiro trimestre e repetidos no terceiro trimestre",
      "C) Apenas no puerp\u00e9rio imediato",
      "D) Mensalmente durante toda a gesta\u00e7\u00e3o",
      "E) Apenas no momento do parto na maternidade"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "Em rela\u00e7\u00e3o \u00e0s regras de pontua\u00e7\u00e3o do Componente C2 (vacina\u00e7\u00e3o infantil), qual das seguintes vacinas ou imunobiol\u00f3gicos comp\u00f5e o indicador avaliado no Previne Brasil?",
    interactionType: "multiple-choice",
    options: [
      "A) Vacina contra Poliomielite e Pentavalente aos 12 meses",
      "B) Vacina BCG aplicada na maternidade",
      "C) Apenas vacina contra Febre Amarela aos 9 meses",
      "D) Vacina contra Raiva humana p\u00f3s-exposi\u00e7\u00e3o",
      "E) Vacina contra HPV em adolescentes de 15 a 18 anos"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "O Componente C4 do Previne Brasil avalia o acompanhamento de pessoas com diabetes mellitus. Entre as boas pr\u00e1ticas computadas, qual possui o maior peso em pontua\u00e7\u00e3o na composi\u00e7\u00e3o do indicador?",
    interactionType: "multiple-choice",
    options: [
      "A) Consulta nos \u00faltimos 6 meses e registro de hemoglobina glicada nos \u00faltimos 12 meses (20 pontos cada)",
      "B) Aferi\u00e7\u00e3o de press\u00e3o arterial mensal obrigat\u00f3ria",
      "C) Realiza\u00e7\u00e3o de ultrassonografia abdominal anual",
      "D) Encaminhamento obrigat\u00f3rio anual ao endocrinologista",
      "E) Apenas a emiss\u00e3o de atestados de aptid\u00e3o f\u00edsica"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "No Componente C5 (pessoas com hipertens\u00e3o arterial sist\u00eamica), qual \u00e9 a janela temporal exigida para a consulta m\u00e9dica ou de enfermagem e para a aferi\u00e7\u00e3o da press\u00e3o arterial para fins de pontua\u00e7\u00e3o?",
    interactionType: "multiple-choice",
    options: [
      "A) \u00daltimos 3 meses",
      "B) \u00daltimos 6 meses",
      "C) \u00daltimos 12 meses",
      "D) \u00daltimos 24 meses",
      "E) A cada 30 dias sem toler\u00e2ncia"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "O Componente C6 avalia a sa\u00fade da pessoa idosa. Diferente do C5 (hipertens\u00e3o), a janela temporal para a consulta de acompanhamento do idoso no Previne Brasil \u00e9 de:",
    interactionType: "multiple-choice",
    options: [
      "A) 3 meses",
      "B) 6 meses",
      "C) 12 meses",
      "D) 24 meses",
      "E) 36 meses"
    ],
    gabarito: "C"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "No Componente C7 (sa\u00fade da mulher), qual faixa et\u00e1ria e periodicidade s\u00e3o preconizadas para o rastreamento do c\u00e2ncer do colo do \u00fatero (exame citopatol\u00f3gico)?",
    interactionType: "multiple-choice",
    options: [
      "A) Mulheres de 18 a 70 anos, anualmente",
      "B) Mulheres de 25 a 64 anos, a cada 3 anos (ap\u00f3s dois exames anuais negativos consecutivos)",
      "C) Apenas mulheres acima de 65 anos a cada 5 anos",
      "D) Mulheres de 15 a 49 anos semestralmente",
      "E) Mulheres de 40 a 69 anos bianualmente"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "Sobre o rastreamento do c\u00e2ncer de mama no Componente C7 do Previne Brasil, qual \u00e9 a faixa et\u00e1ria alvo e a periodicidade avaliada?",
    interactionType: "multiple-choice",
    options: [
      "A) Mulheres de 40 a 49 anos anualmente",
      "B) Mulheres de 50 a 69 anos a cada 2 anos (mamografia bianual)",
      "C) Mulheres de 20 a 70 anos a cada 3 anos",
      "D) Mulheres acima de 75 anos semestralmente",
      "E) Apenas mulheres com hist\u00f3rico familiar de c\u00e2ncer de mama a partir dos 30 anos"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "A r\u00e9gua de classifica\u00e7\u00e3o de desempenho dos indicadores do Previne Brasil possui faixas padronizadas. Um indicador com resultado percentual de 82% situa-se em qual classifica\u00e7\u00e3o?",
    interactionType: "multiple-choice",
    options: [
      "A) Regular",
      "B) Suficiente",
      "C) Bom",
      "D) \u00d3timo",
      "E) Insatisfat\u00f3rio cr\u00edtico"
    ],
    gabarito: "D"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "No registro operacional no e-SUS PEC para o acompanhamento de gestantes, a Data da \u00daltima Menstrua\u00e7\u00e3o (DUM) deve ser registrada em qual se\u00e7\u00e3o do SOAP para que o sistema calcule automaticamente a idade gestacional?",
    interactionType: "multiple-choice",
    options: [
      "A) No Subjetivo como relato livre",
      "B) No Objetivo",
      "C) Na Avalia\u00e7\u00e3o diagn\u00f3stica",
      "D) No Plano de condutas",
      "E) Exclusivamente no campo de observa\u00e7\u00f5es administrativas"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 2 \u2014 Componentes de Qualidade (Previne Brasil)",
    text: "O financiamento por desempenho do Previne Brasil substituiu o antigo modelo baseado exclusivamente em repasses fixos por teto de custeio ou produ\u00e7\u00e3o pura. Qual \u00e9 a principal justificativa conceitual desse modelo perante a APS?",
    interactionType: "multiple-choice",
    options: [
      "A) Remunerar o n\u00famero de receitas m\u00e9dicas impressas no m\u00eas",
      "B) Vincular o incentivo financeiro federal aos resultados de sa\u00fade e ao acompanhamento longitudinal de grupos priorit\u00e1rios",
      "C) Exigir que o m\u00e9dico atenda mais de 60 pacientes por turno",
      "D) Financiar exclusivamente hospitais de alta complexidade",
      "E) Extinguir a obrigatoriedade de registro de procedimentos no e-SUS"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "O M\u00e9todo Cl\u00ednico Centrado na Pessoa (MCCP) prop\u00f5e a explora\u00e7\u00e3o conjunta da doen\u00e7a e da experi\u00eancia da doen\u00e7a atrav\u00e9s do acr\u00f4nimo SIFE. O que significa a letra 'F' no SIFE?",
    interactionType: "multiple-choice",
    options: [
      "A) Fam\u00edlia",
      "B) Funcionalidade (como a doen\u00e7a afeta o dia a dia e a rotina da pessoa)",
      "C) Farmacologia",
      "D) Fisiopatologia",
      "E) For\u00e7a muscular"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "No MCCP, a dimens\u00e3o 'Ideias' da experi\u00eancia da doen\u00e7a investiga:",
    interactionType: "multiple-choice",
    options: [
      "A) O que o paciente sente emocionalmente em rela\u00e7\u00e3o ao problema (medo, tristeza, ansiedade)",
      "B) O que o paciente acha que tem ou pensa sobre a causa da sua doen\u00e7a",
      "C) O que o paciente espera que o m\u00e9dico prescreva na receita",
      "D) Como o problema alterou a capacidade de trabalho do indiv\u00edduo",
      "E) A \u00e1rvore geneal\u00f3gica de doen\u00e7as heredit\u00e1rias"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "Qual das seguintes alternativas descreve corretamente o primeiro dos 7 passos da consulta no MCCP?",
    interactionType: "multiple-choice",
    options: [
      "A) Exame f\u00edsico minucioso",
      "B) Prepara\u00e7\u00e3o (revis\u00e3o de prontu\u00e1rio, organiza\u00e7\u00e3o do ambiente e acolhimento mental antes de ver o paciente)",
      "C) Emiss\u00e3o de atestado m\u00e9dico e prescri\u00e7\u00e3o",
      "D) Leitura de exames complementares de alto custo",
      "E) Despedida e agendamento de retorno sem escuta"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "O s\u00e9timo e \u00faltimo passo da consulta estruturada pelo MCCP \u00e9 a 'Reflex\u00e3o final'. O que caracteriza esse passo?",
    interactionType: "multiple-choice",
    options: [
      "A) O momento em que o paciente revisa os exames laboratoriais em casa",
      "B) O momento de autoavalia\u00e7\u00e3o do profissional sobre a rela\u00e7\u00e3o m\u00e9dico-pessoa, lacunas e aprendizados do encontro cl\u00ednico",
      "C) A entrega da receita m\u00e9dica na recep\u00e7\u00e3o da UBS",
      "D) A discuss\u00e3o do caso com o especialista em reuni\u00e3o cl\u00ednica hospitalar",
      "E) O registro obrigat\u00f3rio de CID-10 no sistema informatizado"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "A transi\u00e7\u00e3o do modelo prescritivo tradicional para o plano compartilhado no MCCP \u00e9 exemplificada por qual postura do m\u00e9dico?",
    interactionType: "multiple-choice",
    options: [
      "A) \"Voc\u00ea \u00e9 obrigado a tomar este rem\u00e9dio rigorosamente sem questionar.\"",
      "B) \"Entre estas possibilidades terap\u00eauticas vi\u00e1veis, o que se encaixa melhor na sua rotina? Vamos decidir juntos o primeiro passo?\"",
      "C) \"Se voc\u00ea n\u00e3o seguir minhas ordens, n\u00e3o voltarei a atend\u00ea-lo.\"",
      "D) \"A doen\u00e7a \u00e9 minha especialidade; sua opini\u00e3o sobre o tratamento n\u00e3o importa.\"",
      "E) \"Fa\u00e7a exatamente o que est\u00e1 escrito no protocolo ministerial sem adapta\u00e7\u00f5es.\""
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "A advert\u00eancia cl\u00e1ssica da disciplina afirma: 'Estrutura sem escuta vira checklist; escuta sem estrutura pode perder seguran\u00e7a cl\u00ednica.' Qual \u00e9 o significado pr\u00e1tico dessa frase?",
    interactionType: "multiple-choice",
    options: [
      "A) O m\u00e9dico deve escolher entre ser emp\u00e1tico ou ser tecnicamente competente, pois ambos s\u00e3o incompat\u00edveis",
      "B) Os 7 passos e ferramentas como o SIFE fornecem a estrutura necess\u00e1ria para que a escuta profunda ocorra de forma segura, sem abandonar o racioc\u00ednio cl\u00ednico",
      "C) O atendimento em APS dispensa exame f\u00edsico se houver boa escuta",
      "D) O registro SOAP deve ser feito apenas ao final do m\u00eas para economizar tempo",
      "E) A consulta centrada na pessoa descarta completamente a necessidade de hip\u00f3teses diagn\u00f3sticas"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "O quarto componente do MCCP, al\u00e9m de explorar a sa\u00fade, a doen\u00e7a e a pessoa, \u00e9:",
    interactionType: "multiple-choice",
    options: [
      "A) A amplia\u00e7\u00e3o da rela\u00e7\u00e3o m\u00e9dico-pessoa (fortalecimento do v\u00ednculo terap\u00eautico ao longo do tempo)",
      "B) O n\u00famero de exames solicitados por consulta",
      "C) O custo financeiro dos medicamentos prescritos",
      "D) O tempo cronometrado de atendimento em minutos",
      "E) A quantidade de encaminhamentos gerados para hospitais"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "Durante a explora\u00e7\u00e3o da experi\u00eancia da doen\u00e7a (SIFE), uma paciente relata choro frequente, ins\u00f4nia e medo intenso de ter uma doen\u00e7a incur\u00e1vel igual \u00e0 de sua m\u00e3e. Essas falhas expressam predominantemente qual dimens\u00e3o do SIFE?",
    interactionType: "multiple-choice",
    options: [
      "A) Sentimentos",
      "B) Funcionalidade",
      "C) Expectativas",
      "D) Ideias biol\u00f3gicas",
      "E) Antecedentes familiares gen\u00e9ticos"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "Quando um paciente chega \u00e0 consulta perguntando explicitamente \"Doutor, o senhor acha que eu preciso de uma resson\u00e2ncia magn\u00e9tica?\", a dimens\u00e3o do SIFE correspondente a essa pergunta \u00e9:",
    interactionType: "multiple-choice",
    options: [
      "A) Sentimentos",
      "B) Ideias",
      "C) Expectativas (o que o paciente espera da consulta ou da conduta m\u00e9dica)",
      "D) Funcionalidade social",
      "E) Sintomatologia aut\u00f4noma"
    ],
    gabarito: "C"
  },
  {
    type: "M\u00f3dulo 3 \u2014 MCCP e a consulta em 7 passos",
    text: "O terceiro passo da consulta no MCCP ('Explora\u00e7\u00e3o') engloba simultaneamente:",
    interactionType: "multiple-choice",
    options: [
      "A) Apenas a emiss\u00e3o da receita e o atestado m\u00e9dico",
      "B) A explora\u00e7\u00e3o da doen\u00e7a (perspectiva biom\u00e9dica) e da experi\u00eancia da doen\u00e7a (SIFE - perspectiva da pessoa)",
      "C) A realiza\u00e7\u00e3o de exames laboratoriais de rotina em jejum",
      "D) A discuss\u00e3o de casos cl\u00ednicos em reuni\u00e3o de equipe multidisciplinar",
      "E) O encerramento imediato da queixa principal"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 4 \u2014 Registro em SOAP e CIAP-2",
    text: "No Prontu\u00e1rio Orientado por Problemas (POMR), proposto por Lawrence Weed, qual \u00e9 a unidade central de organiza\u00e7\u00e3o dos registros cl\u00ednicos?",
    interactionType: "multiple-choice",
    options: [
      "A) A lista de problemas ativos, inativos e resolvidos do paciente",
      "B) A ordem cronol\u00f3gica estrita de entrada na recep\u00e7\u00e3o da UBS",
      "C) A especialidade m\u00e9dica respons\u00e1vel pelo atendimento do dia",
      "D) O custo financeiro dos procedimentos ambulatoriais",
      "E) O n\u00famero de interna\u00e7\u00f5es hospitalares pr\u00e9vias"
    ],
    gabarito: "A"
  },
  {
    type: "M\u00f3dulo 4 \u2014 Registro em SOAP e CIAP-2",
    text: "No formato SOAP de registro cl\u00ednico, o que deve ser obrigatoriamente inclu\u00eddo na se\u00e7\u00e3o 'Subjetivo' (S)?",
    interactionType: "multiple-choice",
    options: [
      "A) O diagn\u00f3stico m\u00e9dico definitivo e a prescri\u00e7\u00e3o de antibi\u00f3ticos",
      "B) Os achados do exame f\u00edsico objetivo e sinais vitais aferidos",
      "C) O relato do paciente, queixa principal, hist\u00f3ria da doen\u00e7a atual (HDA) e os elementos do SIFE (sentimentos, ideias, funcionalidade e expectativas)",
      "D) O plano de exames laboratoriais e encaminhamentos especializados",
      "E) A interpreta\u00e7\u00e3o epidemiol\u00f3gica do territ\u00f3rio adscrito"
    ],
    gabarito: "C"
  },
  {
    type: "M\u00f3dulo 4 \u2014 Registro em SOAP e CIAP-2",
    text: "Em um registro SOAP, onde devem ser lan\u00e7ados os dados mensur\u00e1veis obtidos pelo profissional durante o atendimento, como press\u00e3o arterial, frequ\u00eancia card\u00edaca, peso, altura e resultados de exames f\u00edsicos?",
    interactionType: "multiple-choice",
    options: [
      "A) No Subjetivo (S)",
      "B) No Objetivo (O)",
      "C) Na Avalia\u00e7\u00e3o (A)",
      "D) No Plano (P)",
      "E) Na lista de problemas cronol\u00f3gicos"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 4 \u2014 Registro em SOAP e CIAP-2",
    text: "Na estrutura do SOAP, a se\u00e7\u00e3o 'Avalia\u00e7\u00e3o' (A) corresponde a:",
    interactionType: "multiple-choice",
    options: [
      "A) A transcri\u00e7\u00e3o exata das reclama\u00e7\u00f5es do paciente sem filtro profissional",
      "B) A s\u00edntese cl\u00ednica, racioc\u00ednio diagn\u00f3stico, hip\u00f3teses diagn\u00f3sticas ou problemas avaliados com base nos dados subjetivos e objetivos",
      "C) A marca\u00e7\u00e3o do retorno agendado para daqui a 30 dias",
      "D) O registro de vacinas aplicadas na sala de imuniza\u00e7\u00e3o",
      "E) A anota\u00e7\u00e3o do grau de satisfa\u00e7\u00e3o do usu\u00e1rio com a recep\u00e7\u00e3o"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 4 \u2014 Registro em SOAP e CIAP-2",
    text: "A se\u00e7\u00e3o 'Plano' (P) do registro SOAP contempla:",
    interactionType: "multiple-choice",
    options: [
      "A) A hist\u00f3ria familiar detalhada da inf\u00e2ncia do paciente",
      "B) As condutas terap\u00eauticas, exames solicitados, prescri\u00e7\u00f5es, orienta\u00e7\u00f5es dadas, acordos do plano compartilhado e encaminhamentos",
      "C) Os sentimentos relatados pelo paciente sobre sua separa\u00e7\u00e3o conjugal",
      "D) O c\u00e1lculo da idade gestacional baseado na DUM",
      "E) A classifica\u00e7\u00e3o de risco territorial da micro\u00e1rea"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 4 \u2014 Registro em SOAP e CIAP-2",
    text: "Qual \u00e9 a principal vantagem da Classifica\u00e7\u00e3o Internacional de Aten\u00e7\u00e3o Prim\u00e1ria (CIAP-2) sobre a CID-10 no contexto da APS?",
    interactionType: "multiple-choice",
    options: [
      "A) A CIAP-2 \u00e9 mais complexa e restrita a hospitais de grande porte",
      "B) A CIAP-2 possui estrutura em eixos que permite codificar com a mesma l\u00f3gica o motivo da consulta (sintomas e queixas), os procedimentos e o diagn\u00f3stico, adaptando-se a consultas que terminam sem diagn\u00f3stico fechado",
      "C) A CID-10 foi desenvolvida pela WONCA especificamente para unidades b\u00e1sicas de sa\u00fade",
      "D) A CIAP-2 elimina a necessidade de registro SOAP no prontu\u00e1rio eletr\u00f4nico",
      "E) A CID-10 possui c\u00f3digos espec\u00edficos para sentimentos e expectativas dos pacientes"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 4 \u2014 Registro em SOAP e CIAP-2",
    text: "Na CIAP-2, os c\u00f3digos s\u00e3o compostos por uma letra inicial e dois d\u00edgitos num\u00e9ricos. O que a letra inicial representa na classifica\u00e7\u00e3o?",
    interactionType: "multiple-choice",
    options: [
      "A) O grau de urg\u00eancia cl\u00ednica do atendimento",
      "B) O cap\u00edtulo ou sistema corporal anat\u00f4mico correspondente (ex: K para circulat\u00f3rio, L para osteomuscular)",
      "C) O profissional de sa\u00fade respons\u00e1vel pelo registro (m\u00e9dico ou enfermeiro)",
      "D) A faixa et\u00e1ria do paciente atendido",
      "E) O n\u00famero da micro\u00e1rea de abrang\u00eancia da ESF"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulo 4 \u2014 Registro em SOAP e CIAP-2",
    text: "Considere o registro de um paciente com hipertens\u00e3o arterial sist\u00eamica acompanhado na UBS. O c\u00f3digo CIAP-2 K86 (hipertens\u00e3o sem complica\u00e7\u00e3o) deve ser registrado em qual se\u00e7\u00e3o do SOAP?",
    interactionType: "multiple-choice",
    options: [
      "A) No Subjetivo (S), junto com as queixas de cefaleia",
      "B) No Objetivo (O), junto com a medida da press\u00e3o arterial",
      "C) Na Avalia\u00e7\u00e3o (A), como formula\u00e7\u00e3o diagn\u00f3stica do problema avaliado",
      "D) No Plano (P), junto com a receita de losartana",
      "E) No cabe\u00e7alho administrativo da ficha de atendimento"
    ],
    gabarito: "C"
  },
  {
    type: "M\u00f3dulo 4 \u2014 Registro em SOAP e CIAP-2",
    text: "O erro cl\u00e1ssico apontado nas aulas de registro cl\u00ednico em SOAP ocorre quando o interno coloca impress\u00f5es diagn\u00f3sticas ou julgamentos precipitados na se\u00e7\u00e3o 'Subjetivo' (S). O Subjetivo deve conter estritamente:",
    interactionType: "multiple-choice",
    options: [
      "A) O resultado de exames laboratoriais de sangue e imagem",
      "B) O relato do paciente, suas palavras, sintomas e percep\u00e7\u00f5es sobre o problema",
      "C) A assinatura digital do preceptor da resid\u00eancia m\u00e9dica",
      "D) O c\u00f3digo num\u00e9rico da CID-10 de interna\u00e7\u00e3o hospitalar",
      "E) A dosagem miligrama por quilo dos f\u00e1rmacos prescritos"
    ],
    gabarito: "B"
  },
  {
    type: "M\u00f3dulos 5 e 6 \u2014 Casos cl\u00ednicos e s\u00edntese",
    text: "Em um caso cl\u00ednico de s\u00edntese da disciplina IESC IV, um paciente assintom\u00e1tico solicita exames de rotina completos motivado pelo medo ap\u00f3s a morte s\u00fabita de um colega da mesma idade. A conduta ideal que sintetiza a abordagem da APS \u00e9:",
    interactionType: "multiple-choice",
    options: [
      "A) Solicitar imediatamente todos os exames caros pedidos pelo paciente para evitar conflito",
      "B) Repreender o paciente por gastar recursos p\u00fablicos com exames desnecess\u00e1rios",
      "C) Acolher o medo e a ang\u00fastia subjacente (demanda poss\u00edvel), avaliando o risco cardiovascular real e realizando preven\u00e7\u00e3o quatern\u00e1ria sem mercantilizar exames desnecess\u00e1rios",
      "D) Encaminhar o paciente diretamente para a emerg\u00eancia psiqui\u00e1trica hospitalar",
      "E) Emitir um atestado de aptid\u00e3o f\u00edsica sem realizar qualquer escuta ou exame f\u00edsico"
    ],
    gabarito: "C"
  }
];
