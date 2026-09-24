const fs = require('fs');
const newQuestions = [
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Politraumatizado dá entrada há 6 horas, hipotenso, taquicárdico, em uso de vasopressor, com lactato elevado. O residente sugere iniciar nutrição enteral plena imediatamente, "para não perder massa muscular". Sobre a conduta, assinale a alternativa CORRETA.`,
        interactionType: "multiple-choice",
        options: [
            "A) A sugestão é adequada: quanto mais precoce a nutrição plena, melhor o desfecho em qualquer fase.",
            "B) A sugestão é adequada desde que se use a via parenteral, que independe da perfusão do trato digestivo.",
            "C) A sugestão é inadequada apenas porque o paciente ainda não fez triagem nutricional formal.",
            "D) A sugestão é inadequada: o paciente está na fase Ebb, com hipoperfusão tecidual — inclusive do TGI —, e a oferta de substrato energético nesse momento é deletéria. O organismo prioriza a sobrevivência, não a assimilação de nutrientes. A prioridade é o suporte clínico e hemodinâmico; a TN se inicia na fase Flow precoce.",
            "E) A sugestão é inadequada porque a nutrição só deve ser iniciada após 7 dias de jejum, independentemente da fase."
        ],
        gabarito: `Alternativa D\nPor que D está certa: O paciente chocado (Ebb) sofre hipoperfusão visceral. Oferecer nutrição a um intestino não oxigenado gera agravamento isquêmico (deletério).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre a resposta bifásica de citocinas após a agressão, assinale a alternativa CORRETA.`,
        interactionType: "multiple-choice",
        options: [
            "A) Na fase inicial (SIRS) ocorre pico de citocinas pró-inflamatórias — IL-1, IL-6, IL-8 e TNF —, que ativam a defesa, recrutam leucócitos, elevam a permeabilidade capilar e induzem febre; na fase tardia (CARS), citocinas anti-inflamatórias como IL-10 e TGF-β \"freiam\" a inflamação, o que evita lesão tecidual excessiva mas pode causar imunossupressão.",
            "B) A SIRS é mediada por IL-10 e TGF-β, e a CARS por IL-1, IL-6 e TNF.",
            "C) A CARS é sempre benéfica, pois a supressão da inflamação elimina o risco de infecção secundária.",
            "D) Na SIRS há queda do cortisol, do GH e do ACTH, o que explica a hipoglicemia da fase aguda.",
            "E) SIRS e CARS são fenômenos independentes, sem relação temporal entre si."
        ],
        gabarito: `Alternativa A\nPor que A está certa: Na SIRS, IL-1, IL-6 e TNF-a geram o quadro agudo pró-inflamatório. Na CARS, mediadores como IL-10 controlam o sistema, porém seu excesso acarreta imunossupressão.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre as alterações do metabolismo intermediário durante o hipermetabolismo pós-agressão, assinale a alternativa CORRETA.`,
        interactionType: "multiple-choice",
        options: [
            "A) Há aumento da massa magra e redução da síntese de ureia, refletindo o predomínio anabólico.",
            "B) A sensibilidade à insulina aumenta, com tendência à hipoglicemia persistente.",
            "C) Proteínas: ↑ catabolismo, ↓ massa magra, ↑ síntese de ureia, ↑ perda de nitrogênio e ↑ síntese de proteínas de fase aguda, sendo a glutamina o principal aminoácido metabolizado. Carboidratos: ↑ oxidação de glicose, ↑ gliconeogênese, ↑ ciclo de Cori e resistência insulínica, que causa hiperglicemia. Lipídeos: ↑ oxidação de ácidos graxos e ↑ produção de cetonas.",
            "D) A perda de nitrogênio urinário diminui, sendo um marcador de anabolismo.",
            "E) O ciclo de Cori é desativado no hipermetabolismo, poupando o fígado."
        ],
        gabarito: `Alternativa C\nPor que C está certa: O catabolismo induzido destrói proteína para energia. Estimula a gliconeogênese mas cria uma resistência insulínica com hiperglicemia sistêmica.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Paciente em UTI apresenta gastroparesia com resíduo gástrico de 1.200 mL em 24 horas, exigindo intervenções ativas para que a oferta de nutrientes seja adequada. Segundo o escore AGI, o grau e a conduta são:`,
        interactionType: "multiple-choice",
        options: [
            "A) Grau I — suspender a dieta por 24 a 48 horas e iniciar antieméticos.",
            "B) Grau III — indicar terapia parenteral imediatamente, sem tentativa enteral.",
            "C) Grau IV — indicar abordagem invasiva de urgência.",
            "D) Grau I — manter a dieta plena por via oral, pois o quadro é transitório.",
            "E) Grau II (disfunção) — antieméticos e procinéticos, com dieta por sonda nasoenteral pós-pilórica."
        ],
        gabarito: `Alternativa E\nPor que E está certa: O AGI Grau II (Disfunção) envolve sintomas que persistem ou exigem intervenção clínica, como esvaziamento prejudicado com grandes volumes (>1000ml/24h).`
    },
    {
        type: "DISCURSIVA",
        text: `a. Descreva a sequência ordenada de mobilização de reservas energéticas no jejum não complicado, explicando o papel do glucagon em cada etapa.\nb. Explique o que acontece quando se oferece substrato energético a um paciente em jejum sem inflamação — e por que o mesmo não ocorre no paciente traumatizado.\nc. Liste cinco alterações neuroendócrinas e imunológicas características da resposta ao trauma.\nd. Explique por que o balanço nitrogenado se torna negativo no trauma e qual a consequência disso para a cicatrização.`,
        interactionType: "textarea",
        gabarito: `(a) Sequência no jejum: Glicogênio (esgotado em 24h), Gordura, Proteína. O glucagon estimula a mobilização em todas as fases.\n(b) Em jejum isolado, dar comida reverte a gliconeogênese. No trauma, a inflamação mantém a via ativada e gera resistência insulínica.\n(c) Cinco alterações: Perda de K+; citocinas (IL-1, IL-6, TNF); alta de glucagon/ADH; retenção de Na+; hipercoagulabilidade.\n(d) Torna-se negativo porque o catabolismo muscular para energia excede a síntese. Isso prejudica a cicatrização (falta de colágeno).`
    },
    {
        type: "DISCURSIVA",
        text: `a. Caracterize as fases Ebb, Flow precoce e Flow tardia quanto a: duração aproximada, estado metabólico, achados clínicos e objetivo terapêutico.\nb. Para cada fase, indique a conduta em relação à terapia nutricional (proibida, iniciar ou manter) e justifique fisiopatologicamente.\nc. Explique por que o nome "Flow" costuma induzir ao erro em prova, e formule uma frase que impeça a inversão.\nd. Descreva as curvas SIRS e CARS, nomeando as citocinas de cada fase e explicando o risco associado à fase tardia.`,
        interactionType: "textarea",
        gabarito: `(a) Ebb: 2-3 dias, choque, hipometabólico. Flow Precoce: dias/semanas, hipermetabólico/catabólico. Flow Tardia: semanas/meses, anabólico.\n(b) Ebb -> Proibida (risco isquêmico). Flow precoce -> Iniciar. Flow tardia -> Manter.\n(c) "Flow" induz à intuição de abundância, mas Ebb é que é choque. Frase: Ebb = Choque/Hipo; Flow = Hiper.\n(d) SIRS inicial (IL-1, IL-6, TNF), CARS tardia (IL-10, TGF-B). Risco da CARS é a imunossupressão grave.`
    },
    {
        type: "DISCURSIVA",
        text: `a. Defina falência nutricional e explique por que, no paciente grave, ela é considerada inevitável se a doença de base não for tratada.\nb. Qual é a melhor forma de avaliar a necessidade de oferta nutricional no paciente grave, e por que os marcadores tradicionais (albumina, pré-albumina, antropometria) são insuficientes isoladamente?\nc. Cite as cinco funções do trato gastrointestinal e os três pré-requisitos para seu funcionamento apropriado.\nd. Descreva os quatro graus do escore AGI, com um exemplo clínico e a conduta correspondente a cada um.\ne. Em que situação está indicada a sonda pós-pilórica primária?`,
        interactionType: "textarea",
        gabarito: `(a) Falência Nutricional: perda inexorável de massa muscular pelo estado inflamatório. (b) Através do estado clínico inflamatório; albumina é marcador de fase aguda negativo. (c) Funções: digestiva, absortiva, barreira, endocrinológica, imunorreguladora. Pré-requisitos: perfusão, motilidade, secreção. (d) I-Risco (íleo transitório), II-Disfunção (gastroparesia), III-Falência, IV-Repercussão sistêmica. (e) Risco presumido elevado de regurgitação gástrica (broncoaspiração).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Paciente em pós-operatório de gastrectomia parcial apresenta trato gastrointestinal funcionante, mas não consegue ingerir por via oral o suficiente para atingir a meta calórica. Sobre a via de suporte nutricional, assinale a alternativa CORRETA.`,
        interactionType: "multiple-choice",
        options: [
            "A) Deve-se iniciar nutrição parenteral, por garantir oferta calórica precisa e independer do TGI.",
            "B) Deve-se optar pela via enteral: com o TGI funcionante, ela é preferível à parenteral, pois preserva o trofismo da mucosa, evita a atrofia dos enterócitos e reduz a translocação bacteriana — a regra é \"se o intestino funciona, use-o\".",
            "C) Deve-se manter apenas a via oral, ainda que insuficiente, até que o paciente recupere o apetite espontaneamente.",
            "D) Enteral e parenteral são equivalentes quando o TGI está funcionante, devendo-se optar pela de menor custo operacional para a equipe.",
            "E) Deve-se associar enteral e parenteral simultaneamente em todo paciente cirúrgico, por princípio."
        ],
        gabarito: `Alternativa B\nPor que B está certa: a regra de ouro universal da nutrição é "se o intestino funciona, use-o". A via enteral evita atrofia e translocação bacteriana.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Assinale a alternativa que reúne apenas contraindicações à nutrição enteral.`,
        interactionType: "multiple-choice",
        options: [
            "A) Risco de desnutrição, ingestão oral insuficiente e dor à deglutição.",
            "B) Idade avançada, permanência em UTI e presença de comorbidades.",
            "C) Hiperglicemia leve, hipoalbuminemia e perda de peso recente.",
            "D) Abdome agudo obstrutivo, obstrução intestinal, hemorragia grave do TGI, varizes esofágicas, fístulas jejunais, diarreia grave e vômitos intratáveis.",
            "E) Disfagia grave, fístula traqueoesofágica e rebaixamento da consciência."
        ],
        gabarito: `Alternativa D\nPor que D está certa: Reúne eventos onde o TGI não consegue manter o trânsito seguro (hemorragia, obstruções, grandes fístulas abertas).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre a escolha entre alimentação gástrica (pré-pilórica) e jejunal (pós-pilórica), assinale a alternativa CORRETA.`,
        interactionType: "multiple-choice",
        options: [
            "A) O risco de broncoaspiração é o fator primordial na decisão: a posição pós-pilórica reduz esse risco, permite alimentação mais precoce e desloca-se com menos facilidade; a pré-pilórica, em contrapartida, é de acesso mais fácil, mais fisiológica e permite progressão mais rápida da dieta.",
            "B) A posição pré-pilórica é a de menor risco de aspiração, por manter a dieta no estômago.",
            "C) A posição pós-pilórica é mais fisiológica e de acesso mais fácil que a pré-pilórica.",
            "D) A escolha depende exclusivamente do calibre da sonda disponível no serviço.",
            "E) Não há diferença clínica entre as duas posições quanto ao risco de aspiração."
        ],
        gabarito: `Alternativa A\nPor que A está certa: A migração pós-pilórica previne que dietas retornem à laringe, diminuindo o risco de broncoaspiração.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre o cálculo das necessidades nutricionais, assinale a alternativa CORRETA.`,
        interactionType: "multiple-choice",
        options: [
            "A) A equação de Harris-Benedict considera apenas peso e altura, sendo idêntica para homens e mulheres.",
            "B) A meta calórica recomendada é de 60 kcal/kg/dia, devendo ser atingida integralmente já nas primeiras 24 horas.",
            "C) A equação de Harris-Benedict estima o gasto energético basal a partir de peso, altura, idade e sexo; a fórmula de bolso, mais prática e baseada em calorimetria indireta, estima o gasto energético total em 20 a 30 kcal/kg/dia, empregando-se o valor menor nos pacientes mais graves e inflamados. A meta calórica é de 25 kcal/kg/dia, e atingir ao menos 80% dela já reduz a morbimortalidade.",
            "D) A necessidade proteica recomendada é de 0,3 a 0,5 g/kg/dia, independentemente da gravidade.",
            "E) Quanto mais grave o paciente, menor a necessidade proteica, pois o catabolismo poupa as reservas."
        ],
        gabarito: `Alternativa C\nPor que C está certa: A fórmula de bolso (20-30 kcal/kg/dia) com meta de 25 kcal reduz desfechos graves quando se chega a 80%.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre a triagem inicial de risco nutricional pelo NRS-2002, analise as assertivas:\n\nI. São investigados: IMC menor que 20,5; perda de peso nos últimos três meses; redução da ingestão alimentar na última semana; e gravidade da doença ou permanência em UTI.\nII. Basta uma resposta "sim" para que o paciente siga para a avaliação final (parte 2).\nIII. Se todas as respostas forem "não", o paciente deve ser reavaliado em intervalos semanais.\nIV. Pacientes com maior risco nutricional incluem os com evidência clínica de desnutrição à internação, doença crônica com comorbidades, condições agudas como sepse ou trauma, idade avançada e permanência em UTI superior a cinco dias.\n\nEstá correto o que se afirma em:`,
        interactionType: "multiple-choice",
        options: [
            "A) Apenas I e II.",
            "B) Apenas II e III.",
            "C) Apenas I, III e IV.",
            "D) Apenas III e IV.",
            "E) I, II, III e IV."
        ],
        gabarito: `Alternativa E\nTodas estão corretas e descrevem a avaliação do NRS-2002.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Paciente etilista crônico, gravemente desnutrido, com perda ponderal acentuada nos últimos dois meses, é internado e a equipe cogita iniciar terapia nutricional plena imediatamente. Sobre a conduta, assinale a alternativa CORRETA.`,
        interactionType: "multiple-choice",
        options: [
            "A) A oferta calórica plena deve ser imediata, pois a desnutrição grave é a principal indicação de TN.",
            "B) Há risco de síndrome da realimentação — condição potencialmente fatal que acomete desnutridos graves, pacientes com emagrecimento rápido, etilistas e operados de cirurgia bariátrica. A TN não está proibida, mas exige progressão cautelosa e acompanhamento, com correção prévia dos distúrbios hidroeletrolíticos.",
            "C) A terapia nutricional está definitivamente contraindicada nesse perfil de paciente.",
            "D) O risco só existiria se a via escolhida fosse a parenteral; pela enteral, a oferta plena imediata é segura.",
            "E) A decisão deve basear-se exclusivamente na dosagem de albumina e pré-albumina séricas."
        ],
        gabarito: `Alternativa B\nPor que B está certa: A devolução abrupta da nutrição glicêmica gera a Síndrome da Realimentação, causando colapso fatal por influxo rápido de eletrólitos para a célula.`
    },
    {
        type: "DISCURSIVA",
        text: `a. Defina terapia nutricional e indique quais profissionais compõem a EMTN.\nb. Apresente as três vias de suporte nutricional na ordem de preferência, indicando para cada uma: quando é indicada, duas indicações específicas e duas contraindicações.\nc. Explique por que a via enteral é preferível à parenteral sempre que o TGI estiver funcionante — cite o mecanismo, não apenas o custo.\nd. Cite cinco vantagens da terapia nutricional precoce (nas primeiras 24 a 48 horas).`,
        interactionType: "textarea",
        gabarito: `(a) Manutenção/recuperação do estado nutricional. EMTN: médico, enfermeiro, nutricionista, farmacêutico. (b) Oral (preferencial, TGI funcionante), Enteral (oral inviável, TGI funcionante), Parenteral (TGI não funcionante). (c) Mecanismo: a presença de nutrientes na luz estimula o trofismo da mucosa, preservando a barreira intestinal e prevenindo translocação bacteriana. (d) Vantagens: previne desnutrição, reduz complicações, diminui internação, modula inflamação, mantém barreira mucosa.`
    },
    {
        type: "DISCURSIVA",
        text: `Homem de 70 kg, internado em UTI com sepse abdominal, trato gastrointestinal funcionante, já estabilizado hemodinamicamente há 24 horas.\na. Calcule a meta calórica diária pela fórmula de bolso, usando o valor recomendado para pacientes graves e inflamados, e depois pela meta de 25 kcal/kg/dia. Apresente os dois resultados.\nb. Calcule a necessidade proteica diária, apresentando a faixa recomendada.\nc. Qual percentual da meta calórica já é suficiente para reduzir a morbimortalidade?\nd. Indique a via que você escolheria e o posicionamento da sonda, justificando com base no risco de broncoaspiração.\ne. Escreva a equação de Harris-Benedict para o sexo masculino e explique quais variáveis ela considera.`,
        interactionType: "textarea",
        gabarito: `(a) 20 kcal/kg x 70 = 1400 kcal. 25 kcal/kg x 70 = 1750 kcal. (b) 1,2 a 1,5 g/kg: 84g a 105g/dia. (c) Atingir 80% já reduz morbimortalidade. (d) Via enteral pós-pilórica, pois o TGI funciona e a via pós-pilórica minimiza o risco de refluxo e broncoaspiração em doente grave. (e) GEB = 66,5 + (13,7 x Peso) + (5,0 x Altura) - (6,8 x Idade). Variáveis: peso, altura, idade e gênero.`
    },
    {
        type: "DISCURSIVA",
        text: `a. Enuncie o critério temporal para o início do suporte nutricional no paciente grave.\nb. Explique por que a decisão de iniciar TN não deve basear-se apenas em albumina, pré-albumina e antropometria.\nc. Liste as cinco condições que contraindicam (ou exigem adiamento) o início da terapia nutricional no paciente grave inflamado.\nd. Descreva a síndrome da realimentação: quais pacientes estão sob risco e por que ela é considerada potencialmente fatal.\ne. Cite cinco parâmetros de monitoramento do paciente em terapia nutricional.`,
        interactionType: "textarea",
        gabarito: `(a) Jejum maior que 72 horas. (b) Albumina é proteína de fase aguda negativa (cai pela inflamação). Antropometria sofre com edemas. (c) Contraindicações: hiperglicemia >180 não tratada, distúrbios hidroeletrolíticos severos, instabilidade hemodinâmica, choque (fase Ebb), isquemia intestinal. (d) Risco em desnutridos/etilistas crônicos. Fatal por hipofosfatemia, hipocalemia e hipomagnesemia graves induzidas pela insulina, gerando arritmias e colapso respiratório. (e) Eletrólitos, peso/edema, resíduo gástrico, glicemia, sinais vitais.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Assinale a alternativa que relaciona corretamente a classificação da ferida operatória ao risco de infecção e à sua definição.`,
        interactionType: "multiple-choice",
        options: [
            "A) Limpa — risco de 10 a 20% — ferida traumática com contaminação grosseira.",
            "B) Potencialmente contaminada — risco de 30 a 40% — víscera perfurada com material purulento.",
            "C) Contaminada — risco menor que 5% — ferida não traumática, sem inflamação e sem quebra da técnica asséptica.",
            "D) Limpa — risco < 5%, não traumática, sem inflamação e sem quebra da técnica; potencialmente contaminada — risco < 10%, cirurgia de trato digestivo, respiratório ou geniturinário sem contaminação e com mínima quebra da técnica; contaminada — risco 10 a 20%, ferida traumática, contaminação grosseira, inflamação não purulenta e quebra da técnica; infectada/suja — risco 30 a 40%, tecidos desvitalizados, contaminação fecal, víscera perfurada e material purulento.",
            "E) Infectada — risco menor que 5% — ferida limpa com mínima quebra da técnica asséptica."
        ],
        gabarito: `Alternativa D\nPor que D está certa: Traz o diagrama exato: Limpa (<5%); Potencialmente Contaminada (<10%); Contaminada (10-20%); Infectada/Suja (30-40%).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre a antibioticoprofilaxia cirúrgica, analise as assertivas:\n\nI. A aplicação ideal ocorre cerca de 30 minutos antes da incisão, com cobertura adequada ao tipo de procedimento.\nII. A dose deve ser repetida caso o procedimento se estenda por mais de 3 horas ou por mais de duas meias-vidas do antibiótico.\nIII. A extensão da profilaxia por mais de 24 horas não reduz a incidência de infecção de ferida operatória.\nIV. A antibioticoprofilaxia cirúrgica não previne infecções pulmonares nem urinárias.\n\nEstá correto o que se afirma em:`,
        interactionType: "multiple-choice",
        options: [
            "A) I, II, III e IV.",
            "B) Apenas I e II.",
            "C) Apenas II e III.",
            "D) Apenas III e IV.",
            "E) Apenas I e IV."
        ],
        gabarito: `Alternativa A\nTodas as alternativas estão corretas. A profilaxia é dada ~30 min antes, repetida após 3h ou 2 meias-vidas, mantida por no máx 24h, e não previne ITU/PAC.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre a indicação de antibiótico conforme a classificação da ferida, assinale a alternativa CORRETA.`,
        interactionType: "multiple-choice",
        options: [
            "A) Toda cirurgia limpa exige antibioticoprofilaxia, sem exceções.",
            "B) A cirurgia infectada é a que mais se beneficia de antibioticoprofilaxia, dado o alto risco.",
            "C) A cirurgia limpa não precisa de antibioticoprofilaxia, exceto quando houver colocação de próteses, quando a infecção causaria danos graves, em portadores de febre reumática, em pacientes com risco aumentado de infecção (como imunodeprimidos) e em procedimentos cuja infecção seja difícil de tratar, como neurocirurgias. As cirurgias contaminada e potencialmente contaminada fazem profilaxia. A cirurgia infectada não faz profilaxia: o antibiótico ali é terapêutico.",
            "D) Cirurgias potencialmente contaminadas dispensam antibiótico, pois a quebra de técnica é mínima.",
            "E) A decisão independe da classificação da ferida, baseando-se apenas na duração do procedimento."
        ],
        gabarito: `Alternativa C\nPor que C está certa: Cirurgia limpa pula profilaxia salvo exceções com material protético. Ferida Infecciosa suja nunca faz profilaxia, pois ela já é a doença e exige dose terapêutica.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        text: `Sobre a infecção de sítio cirúrgico (ISC), assinale a alternativa CORRETA.`,
        interactionType: "multiple-choice",
        options: [
            "A) A ISC incisional superficial cursa com sintomas sistêmicos e envolve músculos e fáscias.",
            "B) A ISC incisional profunda não ultrapassa a derme e ocorre em até 7 dias.",
            "C) A infecção em local de episiotomia e a queimadura infectada são classificadas como ISC incisional superficial.",
            "D) A infecção de órgão ou cavidade é considerada até 30 dias mesmo quando há material permanente não derivado de tecido humano implantado.",
            "E) A ISC incisional superficial não cursa com sintomas sistêmicos, não ultrapassa a derme e ocorre no local da incisão em até 30 dias; a ISC incisional profunda cursa com sintomas sistêmicos e envolve tecidos moles profundos — músculos e fáscias."
        ],
        gabarito: `Alternativa E\nPor que E está certa: Caracteriza corretamente: Superficial restrita à derme, sem sintomas sistêmicos; Profunda avança para a fáscia e músculo, com febre sistêmica.`
    }
];

let text = fs.readFileSync('src/bc_all.ts', 'utf8');
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
fs.writeFileSync('src/bc_all.ts', text + newContent);
