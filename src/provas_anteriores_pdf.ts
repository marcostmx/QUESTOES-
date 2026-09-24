// Transcrição Fiel do Compilado de Provas Anteriores (PR1/PR2) - SOP IV (Medicina Estácio/IDOMED Juazeiro)
// Contém gabaritos oficiais comentados, objetivos pedagógicos ("O que o professor quer avaliar")
// e observações sobre divergências na fonte.
// Excluídas conforme solicitação: Ginecologia, Hematologia, Gastroenterologia e Nefrologia.

export interface AuthenticQuestion {
    type: string;
    text: string;
    interactionType: 'multiple-choice' | 'textarea';
    options?: string[];
    gabarito: string;
    graphicsHtml?: string;
    sourceExam?: string;
    origin?: string;
}

export const pdfPropedeuticaQuestions: AuthenticQuestion[] = [
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 1 — Questão 1 (Exame Físico Geral)",
        text: `Questão 1 — Exame físico geral (padrões respiratórios e pulsos)

Em relação ao exame físico geral, analise as assertivas a seguir:

I. O padrão respiratório de Cheyne-Stokes é comum em pacientes com lesões cerebrais com hipertensão intracraniana.
II. O padrão respiratório de Biot é caracterizado por respirações anárquicas e sem padrão.
III. Durante um episódio de cetoacidose diabética, pode-se desenvolver um padrão respiratório chamado Kussmaul.
IV. Espera-se encontrar Pulso em martelo d’água em um paciente com insuficiência aórtica.

Assinale a alternativa correta:`,
        interactionType: "multiple-choice",
        options: [
            "A) Todos os itens estão corretos.",
            "B) Apenas o Item IV é falso.",
            "C) Apenas os Itens III e IV são falsos.",
            "D) Apenas os itens I, II e IV são verdadeiros.",
            "E) Os itens II, III e IV são verdadeiros."
        ],
        gabarito: `Alternativa E.

**COMENTÁRIO DO GABARITO:**
O padrão de Cheyne-Stokes (respiração crescendo-decrescendo intercalada com apneia) está classicamente associado a insuficiência cardíaca e a lesões bi-hemisféricas/diencefálicas, não especificamente à hipertensão intracraniana — esse quadro combina melhor com a respiração de Biot (ataxia respiratória, por lesão de bulbo/ponte). Por isso o item I é falso e os demais (Biot, Kussmaul na cetoacidose e pulso em martelo d’água/Corrigan na insuficiência aórtica) são corretos.

• I. FALSO
• II. VERDADEIRO
• III. VERDADEIRO
• IV. VERDADEIRO

**O QUE O PROFESSOR QUER AVALIAR:**
Testa se o aluno associa corretamente cada padrão respiratório ao seu mecanismo fisiopatológico (não basta decorar nomes) e se conhece os principais pulsos arteriais patológicos ligados a valvopatias — conteúdo clássico do exame físico geral.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 1 — Questão 2 (Semiologia Respiratória)",
        text: `Questão 2 — Semiologia do aparelho respiratório

Sobre avaliação do aparelho respiratório, analise as assertivas a seguir:

I. Ao se examinar um paciente com Pneumonia, espera-se que o frêmito toraco-vocal esteja reduzido, bem como durante a percussão espera-se um som maçiço ou submaçiço.
II. Durante uma crise de Asma, ao realizar a ausculta respiratória pode-se encontrar um som anormal contínuo, conhecido como sibilo.
III. Ao se auscultar um paciente com pneumotórax espera-se ouvir um som hipertimpânico.
IV. Durante a percussão de um paciente com Derrame pleural em hemitórax direito, espera-se ouvir um som submaçiço/maçiço ao percutir este hemitórax.

Assinale a alternativa correta:`,
        interactionType: "multiple-choice",
        options: [
            "A) Todos os itens estão corretos.",
            "B) Apenas o Item I é falso.",
            "C) Apenas o item IV é verdadeiro.",
            "D) Apenas os itens II e IV são verdadeiros.",
            "E) Os itens II, III e IV são verdadeiros."
        ],
        gabarito: `Alternativa E.

**COMENTÁRIO DO GABARITO:**
Na pneumonia (condensação/consolidação), o pulmão fica mais denso e transmite melhor as vibrações — o correto é frêmito aumentado, com percussão submaçiça/maçiça, e não reduzido como diz o item I.
Sibilo na asma, hipertimpanismo no pneumotórax e macicez no derrame pleural são achados clássicos e corretos.

• I. FALSO
• II. VERDADEIRO
• III. VERDADEIRO
• IV. VERDADEIRO

**O QUE O PROFESSOR QUER AVALIAR:**
Quer verificar se o aluno sabe diferenciar os três grandes padrões de alteração da ausculta/percussão pulmonar — condensação (frêmito ↑), derrame (frêmito ↓) e pneumotórax (timpanismo) — e não confundir a direção das alterações do frêmito toraco-vocal.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 1 — Questão 3 (Sinais e Sintomas)",
        text: `Questão 3 — Sinais e sintomas (alternativa incorreta)

Sobre sinais e sintomas, é incorreto afirmar que:`,
        interactionType: "multiple-choice",
        options: [
            "A) A ortopneia é o tipo de dispneia caracterizada por impedir o paciente de ficar deitado, causando desconforto respiratório nessa posição.",
            "B) Se um paciente possui um derrame pleural à direita, a posição de conforto respiratório desse paciente é o decúbito lateral do lado direito.",
            "C) A lipotimia consiste na perda súbita e transitória da consciência.",
            "D) O sinal de Koplik é patognomônico de sarampo.",
            "E) Os dentes de Hutchinson são patognomônicos de Sífilis congênita."
        ],
        gabarito: `Alternativa C.

**COMENTÁRIO DO GABARITO:**
A questão pede a alternativa incorreta. A definição do item C descreve, na verdade, a síncope: perda súbita, transitória e completa da consciência por queda do fluxo sanguíneo cerebral. Já a lipotimia (pré-síncope) é a sensação iminente de desmaio — palidez, sudorese, turvamento visual — sem perda completa da consciência. As demais alternativas (ortopneia, posição de conforto no derrame pleural, sinal de Koplik e dentes de Hutchinson) estão corretas, por isso foram marcadas como verdadeiras na prova original.

**O QUE O PROFESSOR QUER AVALIAR:**
Clássica pegadinha de prova de semiologia: separar lipotimia x síncope. O professor quer garantir que o aluno não troque os dois termos, além de cobrar sinais patognomônicos frequentes em provas (Koplik/sarampo, dentes de Hutchinson/sífilis congênita) e o raciocínio de posicionamento de conforto no derrame pleural.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 1 — Questão 4 (Caso Clínico Linfonodomegalia e Desidratação)",
        text: `Questão 4 — Caso clínico: linfonodomegalia cervical + desidratação

Mulher de 60 anos, com histórico de diabetes mellitus tipo 2 e hipertensão arterial, procura atendimento devido a aumento de volume na região cervical e sensação de mal-estar geral. Relata que há cerca de uma semana notou aumento progressivo no tamanho de um nódulo na região do pescoço à esquerda. Além disso, apresenta cansaço excessivo e boca seca. No exame físico, a paciente está alerta, mas com sinais de desidratação e hipoperfusão capilar. Além disso, apresenta linfonodos palpáveis na região cervical esquerda, endurecidos, aderidos e indolores.

Com base no caso e nos seus conhecimentos sobre o exame físico geral, analise as alternativas:

I. A presença de linfonodos endurecidos, aderidos e indolores é mais sugestiva de um processo inflamatório agudo do que de malignidade.
II. A desidratação grave geralmente causa aumento do turgor cutâneo, com mucosas secas e ausência do sinal da prega.
III. A perfusão adequada do paciente é essencial para a manutenção das funções fisiológicas, sendo um indicador importante da função cardiovascular e da circulação sanguínea. Na avaliação do paciente, o tempo de enchimento capilar normal pode variar de 2 a 4 segundos.
IV. A inspeção da pele e mucosas, ao identificar lesões de desidratação, é uma parte fundamental do exame físico geral. Alterações de coloração e sinais como cianose ou palidez podem indicar comprometimento circulatório ou respiratório ou anemia.
V. A presença de linfonodomegalia generalizada é comum em infecções virais e pode estar presente em mononucleose infecciosa.

Marque a opção correta:`,
        interactionType: "multiple-choice",
        options: [
            "A) Apenas I, III e V são corretas.",
            "B) Apenas II, III e IV são corretas.",
            "C) Apenas IV e V são corretas.",
            "D) Apenas III, IV e V são corretas.",
            "E) I, II, III, IV e V são falsas."
        ],
        gabarito: `Alternativa A.

**COMENTÁRIO DO GABARITO:**
A desidratação grave reduz o turgor cutâneo (pele fica menos elástica, sinal da prega fica presente/positivo, e não ausente) — por isso o item II é falso. O item IV, do jeito que está redigido, também foi contabilizado como falso no gabarito original.

**ATENÇÃO / DIVERGÊNCIA NA FONTE:**
O item I (linfonodos endurecidos, aderidos e indolores sugerindo processo inflamatório agudo) foi marcado como verdadeiro no gabarito da prova original. Vale registrar que, na literatura clássica de semiologia, essa tríade (endurecido + aderido + indolor) costuma ser descrita como mais sugestiva de malignidade; adenopatias inflamatórias agudas tendem a ser dolorosas, móveis e de consistência mais amolecida/fibroelástica. Fica mantida a transcrição fiel do gabarito oficial da prova com essa ressalva conceitual importante.

**O QUE O PROFESSOR QUER AVALIAR:**
Foca em exame físico geral: sinais de desidratação (turgor, sinal da prega, mucosas), perfusão periférica (tempo de enchimento capilar) e caracterização semiológica de linfonodos — itens muito cobrados em OSCE.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 1 — Questão 5 (Semiologia Neurológica V/F)",
        text: `Questão 5 — Semiologia Neurológica (V/F em sequência)

Sobre a Semiologia Neurológica, assinale V (verdadeiro) ou F (falso) para as afirmações abaixo e marque a alternativa correspondente à sequência correta:

I. O reflexo de Babinski é considerado patológico quando há flexão do hálux ao ser estimulada a planta do pé, sugerindo lesão nas vias piramidais.
II. Na afasia de Broca, o paciente tem dificuldade de compreensão da linguagem, embora a fala seja fluente e clara.
III. O Mini-Mental ou o mini exame do estado mental é um teste diagnóstico utilizado para avaliar de forma detalhada a causa da demência, permitindo a diferenciação entre as várias formas de doenças neurodegenerativas.
IV. O Mini-Mental ou o mini exame do estado mental avalia funções cognitivas como orientação, memória, atenção, linguagem e capacidade de abstração, sendo amplamente utilizado como parte do exame do estado mental em pacientes com suspeita de comprometimento cognitivo.
V. A dismetria é caracterizada pela dificuldade de realizar movimentos alternados rápidos.`,
        interactionType: "multiple-choice",
        options: [
            "A) F – F – F – F – V",
            "B) F – V – F – V – F",
            "C) V – F – F – V – F",
            "D) F – F – F – V – F",
            "E) V – F – V – F – F"
        ],
        gabarito: `Alternativa D.

**COMENTÁRIO DO GABARITO:**
• I — FALSO: Babinski patológico é a extensão (dorsiflexão) do hálux com abertura em leque dos outros dedos — não flexão (flexão é o reflexo plantar fisiológico normal).
• II — FALSO: O quadro descrito é o da afasia de Wernicke (fala fluente, mas compreensão prejudicada); na afasia de Broca ocorre o oposto: compreensão relativamente preservada e fala não-fluente/esforçada.
• III — FALSO: O MEEM é um instrumento de rastreio cognitivo, não confirma etiologia nem diferencia demências sozinho.
• IV — VERDADEIRO: De fato avalia os domínios citados (orientação temporal/espacial, memória imediata e evocação, atenção/cálculo, linguagem e capacidade de cópia/abstração).
• V — FALSO: Dificuldade em movimentos alternados rápidos é disdiadococinesia, não dismetria (que é erro de distância/amplitude do movimento na prova index-nariz).

Sequência correta: F – F – F – V – F (Alternativa D).

**O QUE O PROFESSOR QUER AVALIAR:**
Bloco de semiologia neurológica muito denso: sinais piramidais (Babinski), classificação das afasias, utilidade e limite do MEEM como rastreio (não diagnóstico etiológico) e diferença entre dismetria x disdiadococinesia no exame cerebelar.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 1 — Questão 6 (Caso Clínico AVC)",
        text: `Questão 6 — Caso clínico: sequela de AVC (marcha, Romberg, afasia, força)

Homem de 68 anos, diabético há 20 anos, com sequela motora à direita, além de afasia. Relata diminuição de sensibilidade no membro direito e dificuldade para caminhar. Histórico de AVC isquêmico prévio; a marcha é descrita como parética, com arrastamento do pé direito. No exame físico, a força muscular no membro superior direito é classificada como grau 3 (escala de 0 a 5). A força muscular no membro inferior direito é grau 4. Além disso, foi realizado o teste de Romberg durante o exame físico.

Com base no caso e nos seus conhecimentos sobre a semiologia neurológica, assinale a alternativa correta:

I. A marcha parética, neste caso, com arrastamento do pé direito e a dificuldade para caminhar indicam lesão nas vias corticoespinhais do lado esquerdo do cérebro, afetando a motricidade voluntária.
II. O teste de Romberg deve ser realizado com o paciente em pé, com os pés juntos e os olhos fechados, sendo mantido nessa posição por 2 minutos para avaliar possíveis quedas. O teste alterado pode evidenciar alterações vestibulares, do equilíbrio ou proprioceptivas.
III. A afasia de Wernicke é caracterizada pela dificuldade em compreender a linguagem, mas o paciente é capaz de falar, embora as palavras faladas sejam muitas vezes sem sentido, comprometendo a fluência verbal.
IV. A força muscular grau 3 indica fraqueza muscular moderada, com capacidade para mover o membro contra a gravidade, mas sem resistência adicional.
V. O teste de Mingazzini pode ser utilizado para avaliar a força muscular e a sensibilidade tátil em pacientes pós-AVC.`,
        interactionType: "multiple-choice",
        options: [
            "A) Apenas I, II e V são corretas.",
            "B) Apenas II, III e IV são corretas.",
            "C) Apenas I, III e IV são corretas.",
            "D) Apenas I, II e IV são corretas.",
            "E) Apenas III, IV e V são corretas."
        ],
        gabarito: `Alternativa D.

**COMENTÁRIO DO GABARITO:**
A afasia de Wernicke é fluente (o item III erra ao dizer que ela “compromete a fluência verbal”) — o paciente fala normalmente em ritmo e melodia, mas com conteúdo sem sentido (parafasias/jargão) e compreensão prejudicada.
O teste de Mingazzini é puramente motor (avalia queda progressiva do membro por paresia discreta), não avalia sensibilidade tátil — por isso o item V é falso.
Os itens I, II e IV estão corretos: a lesão piramidal cruzada no hemisfério esquerdo justifica a hemiparesia direita (I), o teste de Romberg avalia propriocepção/vestíbulo (II) e o grau 3 vence a gravidade mas não resiste à oposição do examinador (IV).

**O QUE O PROFESSOR QUER AVALIAR:**
Integra semiologia do AVC: localização da lesão pela marcha/hemiparesia, técnica correta do Romberg, escala MRC de força muscular (grau 0 a 5) e as manobras deficitárias (Mingazzini/Barré) — cobrando a precisão sobre o que cada teste avalia.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 1 — Questão 7 (Diagnóstico Diferencial Dor Torácica)",
        text: `Questão 7 — Diagnóstico diferencial de dor torácica

Analise as assertivas a seguir:

I. Paciente de 25 anos, há 3 dias evoluindo com febre, mal-estar, dor torácica anterior com irradiação para a esquerda, piorando com a inspiração profunda e melhorando ao sentar-se. O diagnóstico provável é pleurite aguda.
II. Paciente sexo feminino, 67 anos, com quadro de dispneia e dor torácica em hemitórax esquerdo do tipo pleurítica. Histórico de estar restrita ao leito há 1 mês, logo após cirurgia de correção de fratura de colo de fêmur decorrente de queda da própria altura, além de relato de ter começado a apresentar edema em membro inferior direito há 3 dias. O provável diagnóstico é infarto pulmonar.
III. Paciente com quadro de dor torácica que surge durante os movimentos ventilatórios, em especial na inspiração profunda ou na movimentação dos braços e do pescoço. Trata-se de uma dor bem localizada e desencadeada pela compressão de um ponto. É provável que essa dor seja de origem musculoesquelética.

Está correto o que se afirma em:`,
        interactionType: "multiple-choice",
        options: [
            "A) Apenas I e II estão corretas.",
            "B) Apenas I e III estão corretas.",
            "C) Apenas II e III estão corretas.",
            "D) I, II e III estão corretas.",
            "E) I, II e III estão incorretas."
        ],
        gabarito: `Alternativa D.

**COMENTÁRIO DO GABARITO:**
Os três casos são descrições-modelo clássicas de dor torácica:
• I: Dor pleurítica que piora deitado/inspirando e melhora sentado/inclinado para frente (pleurite/pericardite).
• II: Imobilização pós-cirúrgica + edema unilateral de membro inferior + dispneia e dor pleurítica súbita sugerindo TVP com tromboembolismo e infarto pulmonar.
• III: Dor reprodutível à palpação local e à movimentação de braços/pescoço, tipicamente musculoesquelética (costocondrite).
Todas as três assertivas estão corretas (Alternativa D).

**O QUE O PROFESSOR QUER AVALIAR:**
Questão de diagnóstico diferencial da dor torácica por padrão clínico: pleurítica x tromboembólica x musculoesquelética — sem citar exames complementares, valorizando o raciocínio puramente clínico.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 1 — Questão 8 (Termos Semiológicos)",
        text: `Questão 8 — Termos semiológicos (aorta, dispneia posicional, atelectasia)

Analise as assertivas a seguir:

I. Um paciente que apresenta redução da elasticidade da aorta tende a apresentar redução da pressão arterial sistólica.
II. Homem, 39 anos, procura emergência do hospital com sintomatologia de dificuldade de respirar em posição ortostática, que alivia na posição deitada. Trata-se de um quadro de trepopneia.
III. Mulher, 52 anos, internada na enfermaria de Cirurgia Geral no 2º dia após realização de colecistectomia. Evolui com quadro de taquipneia e redução do frêmito toracovocal na base do pulmão direito. Essa alteração do exame físico é compatível com o diagnóstico de atelectasia.

Está correto o que se afirma em:`,
        interactionType: "multiple-choice",
        options: [
            "A) Apenas I e II estão corretas.",
            "B) Apenas I e III estão corretas.",
            "C) Apenas II e III estão corretas.",
            "D) I, II e III estão incorretas.",
            "E) Nenhuma das alternativas anteriores está correta."
        ],
        gabarito: `Alternativa D.

**COMENTÁRIO DO GABARITO:**
• I: FALSO — uma aorta mais rígida (menos elasticidade, comum no idoso/aterosclerótico) tipicamente aumenta a pressão arterial sistólica (alargando a pressão de pulso diferencial), não reduz.
• II: FALSO — dispneia que piora ao ficar em pé e alivia na posição deitada é a definição de platipneia (trepopneia é a dispneia em decúbito lateral específico, aliviada no lado oposto).
• III: FALSO — na atelectasia por colapso com brônquio pérvio ou consolidação o frêmito costuma estar aumentado; além disso, a assertiva foi classificada como incorreta no gabarito oficial da prova.
Portanto, I, II e III estão incorretas (Alternativa D).

**O QUE O PROFESSOR QUER AVALIAR:**
Questão de terminologia fina em semiologia respiratória e cardiovascular — troca proposital de termos (trepopneia x platipneia) e de sinais físicos para verificar se o aluno domina os conceitos com precisão.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 1 — Questão 9 (Caso Clínico Cefaleia com Alarme)",
        text: `Questão 9 — Caso clínico: cefaleia com sinais de alarme

Gustavo, um homem de 60 anos, apresenta queixas de cefaleia progressivamente mais frequente, associada a episódios de confusão mental temporária. O exame físico revela papiledema e dor à palpação na região cervical. Ele refere história de câncer de pulmão tratado há cinco anos.

Qual das seguintes etapas deve ser priorizada na abordagem desse paciente?`,
        interactionType: "multiple-choice",
        options: [
            "A) Realizar uma tomografia computadorizada (TC) de crânio para investigar causas secundárias.",
            "B) Solicitar um exame de sangue para avaliar marcadores tumorais.",
            "C) Aumentar a dose dos analgésicos prescritos, preferencialmente opioides.",
            "D) Encaminhar para um psiquiatra para avaliação de possível transtorno de ansiedade.",
            "E) Todas as afirmativas estão corretas."
        ],
        gabarito: `Alternativa A.

**COMENTÁRIO DO GABARITO:**
Cefaleia de início recente ou progressiva em paciente > 50 anos + episódios de confusão mental + papiledema ao fundo de olho + história de neoplasia prévia (câncer de pulmão) são clássicos sinais de alarme (red flags) indicativos de hipertensão intracraniana ou metástase cerebral (cefaleia secundária). A prioridade absoluta é realizar neuroimagem (TC de crânio ou RNM) para investigar causas estruturais secundárias antes de qualquer conduta sintomática.

**O QUE O PROFESSOR QUER AVALIAR:**
Cobra o reconhecimento dos sinais de alarme da cefaleia (idade avançada, histórico oncológico, papiledema, confusão mental) que transformam a abordagem de conduta analgésica ambulatorial em investigação imediata por neuroimagem.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 1 — Questão 10 (Cefaleias Primárias x Secundárias)",
        text: `Questão 10 — Cefaleia primária x secundária

Analise as afirmativas a seguir e marque a alternativa correta:

I. Cefaleias primárias não têm uma causa subjacente identificável, enquanto cefaleias secundárias são causadas por condições médicas subjacentes.
II. A enxaqueca é considerada uma cefaleia secundária, pois geralmente envolve sintomas associados como náuseas e fotofobia.
III. A cefaleia tensional geralmente apresenta sintomas associados sem investigação adicional.
IV. Algumas cefaleias secundárias podem ser tratadas apenas com analgésicos comuns sem investigação adicional.

Marque a opção correta:`,
        interactionType: "multiple-choice",
        options: [
            "A) Apenas I é verdadeira.",
            "B) I, II são verdadeiras.",
            "C) I e III são verdadeiras.",
            "D) II e III são verdadeiras.",
            "E) I, II, III e IV são falsas."
        ],
        gabarito: `Alternativa D.

**COMENTÁRIO DO GABARITO:**
O gabarito oficial da prova original assinalou a Alternativa D (II e III são verdadeiras).

**ATENÇÃO / DIVERGÊNCIA NA FONTE:**
Há uma importante inconsistência teórica que o estudante deve conhecer: pela Classificação Internacional de Cefaleias (ICHD-3), a enxaqueca (migrânea) é classificada como cefaleia PRIMÁRIA (assim como a cefaleia tensional e a cefaleia em salvas), e não secundária. Portanto, segundo a literatura clássica, a afirmativa II conteria um equívoco conceitual. Todavia, a chave de correção da avaliação marcou a alternativa D como oficial. Mantemos aqui a transcrição fiel da prova original para preparação acadêmica exata.

**O QUE O PROFESSOR QUER AVALIAR:**
Visa diferenciar o conceito geral de cefaleia primária e secundária e a presença de sintomas autonômicos ou neurológicos associados.`
    },
    {
        type: "DISCURSIVA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 2 — Questão 1 (Caso Clínico Fala Súbita - PR2)",
        text: `Questão 1 — Caso clínico: alteração súbita da fala (PR2)

Um homem de 68 anos, casado, dextro, professor aposentado, é levado ao pronto-socorro pela esposa devido a uma alteração neurológica súbita iniciada há cerca de 5 horas.

Segundo a esposa, ele estava bem pela manhã, tomando café e lendo o jornal. Durante uma conversa, ela percebeu que ele começou a responder de forma estranha às perguntas. Quando perguntado o que gostaria de almoçar, respondeu: “A janela está correndo porque os livros estão felizes”. Desde então, continua falando espontaneamente, mas frequentemente utiliza palavras e frases inadequadas ou inventadas; em alguns momentos parece não perceber que sua fala não faz sentido.

Na triagem, o paciente encontra-se desperto, mantém contato visual e parece tranquilo. Quando o médico pergunta seu nome, ele responde prontamente: “A casa está cheia”. Ao ser solicitado que mostre dois dedos da mão direita, ele não executa o comando. Quando solicitado a fechar os olhos, também não executa a tarefa.

1a. Qual domínio das funções corticais superiores parece estar predominantemente comprometido? (0,2)
1b. Qual alteração neurológica está descrita no caso? Especifique (0,4). Quais características permitem essa classificação? (0,4)`,
        interactionType: "textarea",
        options: [],
        gabarito: `Gabarito Oficial da Prova:

**1a) Domínio comprometido:**
Linguagem.

**1b) Alteração neurológica:**
Afasia de Wernicke (afasia sensorial ou fluente).
**Características que justificam:**
• Compreensão verbal severamente prejudicada (não compreende perguntas simples, não executa comandos verbais como fechar os olhos ou mostrar dois dedos).
• Fala fluente com prosódia preservada, porém vazia de sentido, com presença de parafasias e neologismos ("A janela está correndo porque os livros estão felizes").
• Anosognosia para o déficit de linguagem (o paciente fala com tranquilidade e parece não perceber a inadequação da própria fala).

**COMENTÁRIO DO GABARITO:**
O caso é a descrição clássica da afasia de Wernicke (lesão na porção posterior do giro temporal superior esquerdo — hemisfério dominante): o paciente fala espontaneamente e sem hesitação motora (diferente da afasia de Broca), mas não decodifica o significado da fala alheia nem monitora a própria produção linguística.

**O QUE O PROFESSOR QUER AVALIAR:**
Capacidade de localizar a função cortical lesada puramente através da semiologia clínica e diferenciar afasia de Wernicke (fluente/compreensão ↓) de afasia de Broca (não-fluente/compreensão preservada).`
    },
    {
        type: "DISCURSIVA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 2 — Questão 2 (Exame da Força Muscular - PR2)",
        text: `Questão 2 — Continuação do caso: exame da força muscular (PR2)

Responda as questões abaixo ainda com base no caso da questão anterior (homem de 68 anos com alteração súbita de fala por suspeita de AVC):

2a. Na sequência do exame neurológico, para avaliação da força muscular, cite 2 manobras de força (manobras deficitárias). (0,4)
2b. Explique o que se espera encontrar no exame, considerando também a lateralidade e se membro superior e inferior estão acometidos. (0,6)`,
        interactionType: "textarea",
        options: [],
        gabarito: `Gabarito Oficial da Prova:

**2a) Manobras de força:**
Manobra de Barré (para membros superiores ou inferiores) e Manobra de Mingazzini (para membros inferiores). Também é aceita a Manobra dos Braços Estendidos.

**2b) Achados esperados e lateralidade:**
Espera-se encontrar diminuição da força muscular nos membros do lado direito (hemiparesia direita / déficit piramidal contralateral à lesão cortical esquerda).
• Na manobra de Barré/Braços Estendidos: o membro superior direito apresentará queda lenta e pronação da mão.
• Na manobra de Mingazzini: o membro inferior direito apresentará queda precoce ou incapacidade de manter a sustentação da perna flexionada a 90° em relação à coxa.

**COMENTÁRIO DO GABARITO:**
Como o paciente apresenta afasia de Wernicke (localizada no hemisfério cerebral esquerdo em destros), a via piramidal do hemisfério esquerdo cruza no nível das pirâmides bulbares (decussação das pirâmides), gerando déficits motores no hemicorpo direito (contralateral). As manobras deficitárias são desenhadas exatamente para revelar paresias leves não óbvias à inspeção.

**O QUE O PROFESSOR QUER AVALIAR:**
Nomeação correta das manobras deficitárias da semiologia neurológica e aplicação do raciocínio topográfico de lateralidade (lesão hemisférica esquerda produzindo paresia direita).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 2 — Questão 3 (Esquecimento e Romberg - PR2)",
        text: `Questão 3 — Caso clínico: esquecimento progressivo + Romberg positivo (PR2)

Uma mulher de 74 anos é trazida pela filha à consulta por queixa de esquecimento progressivo há cerca de dois anos. A filha relata que a paciente repete perguntas, esquece compromissos recentes e apresenta dificuldade crescente para administrar suas finanças e para cozinhar. Ainda consegue realizar atividades básicas de autocuidado. Nega hipertensão e diabetes.

Ao exame, encontra-se desperta, colaborativa, sem alterações motoras evidentes. Força muscular preservada globalmente. Reflexos osteotendíneos presentes e simétricos. Na avaliação neurológica complementar, observa-se redução da sensibilidade vibratória em ambos os pés. Ao ser solicitado que fique em pé com os pés juntos, primeiro com os olhos abertos e depois com os olhos fechados, a paciente apresenta instabilidade importante imediatamente ao fechar os olhos (Romberg positivo, sugerindo ataxia sensitiva).

Analise as assertivas a seguir:

I. O quadro de esquecimento progressivo há cerca de dois anos, com repetição de perguntas e prejuízo para atividades instrumentais da vida diária, sugere comprometimento cognitivo progressivo de padrão demencial. A aplicação do Mini Exame do Estado Mental é o principal instrumento diagnóstico para confirmar a doença de Alzheimer.
II. A dificuldade para manter-se em pé com os olhos fechados, associada à redução da sensibilidade vibratória em ambos os pés, sugere ataxia cerebelar, sendo necessário fazer testes como index-nariz e calcanhar-joelho para complementar o exame físico neurológico.
III. A hipótese de deficiência de vitamina B12 e condições como tabes dorsalis não devem ser consideradas, uma vez que a força muscular é preservada e os reflexos osteotendíneos estão normais.

Marque a opção correta:`,
        interactionType: "multiple-choice",
        options: [
            "A) Apenas I e II estão corretas",
            "B) Apenas I e III estão corretas",
            "C) Apenas III está correta",
            "D) I, II e III estão corretas",
            "E) As alternativas A, B, C e D estão incorretas"
        ],
        gabarito: `Alternativa E.

**COMENTÁRIO DO GABARITO:**
Todas as assertivas I, II e III contêm erros conceituais, logo a resposta correta é a Alternativa E:
• I — FALSO: O MEEM é uma ferramenta de triagem/rastreio cognitivo, não é capaz de confirmar isoladamente a doença de Alzheimer. O diagnóstico é clínico-sindrômico amplo.
• II — FALSO: Instabilidade que surge nitidamente ao fechar os olhos (sinal de Romberg presente) combinada com perda de sensibilidade vibratória é a definição de ataxia sensitiva (lesão dos cordões posteriores da medula/propriocepção), e NÃO ataxia cerebelar (na ataxia cerebelar o paciente oscila mesmo de olhos abertos).
• III — FALSO: A deficiência de vitamina B12 (degeneração combinada subaguda) e o tabes dorsalis afetam primariamente os cordões posteriores e devem, obrigatoriamente, ser investigados em pacientes com perda palestésica e Romberg positivo.

**O QUE O PROFESSOR QUER AVALIAR:**
Diferenciação fundamental entre ataxia sensitiva (Romberg positivo, perda proprioceptiva/vibratória) e ataxia cerebelar, além do papel do MEEM como instrumento de rastreio e não de diagnóstico de certeza.`
    },
    {
        type: "DISCURSIVA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 2 — Questão 4 (Regra ABCDE do Melanoma - PR2)",
        text: `Questão 4 — Nevo benigno x melanoma maligno (ABCDE) (PR2)

Que características clínicas são utilizadas para diferenciar um nevo benigno de um melanoma maligno? Descreva a regra semiológica ABCDE com os critérios diferenciais para cada parâmetro.`,
        interactionType: "textarea",
        options: [],
        graphicsHtml: `
<div class="my-4 p-5 rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50/70 via-white to-amber-50/50 shadow-sm">
    <div class="flex items-center gap-2 mb-3">
        <span class="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">Semiologia Dermatológica</span>
        <span class="text-xs text-gray-500 font-medium">Reprodução da tabela da prova original — Regra ABCDE</span>
    </div>
    <div class="overflow-x-auto">
        <table class="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
                <tr class="border-b border-gray-200 text-gray-700 bg-gray-50/80">
                    <th class="p-2.5 font-bold">Sigla</th>
                    <th class="p-2.5 font-bold">Característica</th>
                    <th class="p-2.5 font-bold text-emerald-800">Benigno (Nevo)</th>
                    <th class="p-2.5 font-bold text-rose-800">Maligno (Melanoma)</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 font-normal text-gray-800">
                <tr class="hover:bg-white/80 transition-colors">
                    <td class="p-2.5 font-black text-rose-600 text-base">A</td>
                    <td class="p-2.5 font-semibold">Assimetria</td>
                    <td class="p-2.5 text-emerald-700">Simétrico (uma metade espelha a outra)</td>
                    <td class="p-2.5 text-rose-700 font-medium">Assimétrico</td>
                </tr>
                <tr class="hover:bg-white/80 transition-colors">
                    <td class="p-2.5 font-black text-rose-600 text-base">B</td>
                    <td class="p-2.5 font-semibold">Bordas</td>
                    <td class="p-2.5 text-emerald-700">Regulares, nítidas e bem delimitadas</td>
                    <td class="p-2.5 text-rose-700 font-medium">Irregulares, chanfradas, denteadas ou mal delimitadas</td>
                </tr>
                <tr class="hover:bg-white/80 transition-colors">
                    <td class="p-2.5 font-black text-rose-600 text-base">C</td>
                    <td class="p-2.5 font-semibold">Cor</td>
                    <td class="p-2.5 text-emerald-700">Tonalidade uniforme (castanho claro ou escuro homogêneo)</td>
                    <td class="p-2.5 text-rose-700 font-medium">Policromia (múltiplas cores: preto, marrom, azul, vermelho, branco)</td>
                </tr>
                <tr class="hover:bg-white/80 transition-colors">
                    <td class="p-2.5 font-black text-rose-600 text-base">D</td>
                    <td class="p-2.5 font-semibold">Diâmetro</td>
                    <td class="p-2.5 text-emerald-700">Geralmente pequeno (&lt; 6 mm)</td>
                    <td class="p-2.5 text-rose-700 font-medium">Geralmente maior que 6 mm (tamanho de uma borracha de lápis)</td>
                </tr>
                <tr class="hover:bg-white/80 transition-colors">
                    <td class="p-2.5 font-black text-rose-600 text-base">E</td>
                    <td class="p-2.5 font-semibold">Evolução</td>
                    <td class="p-2.5 text-emerald-700">Estável, não muda de forma, tamanho ou cor</td>
                    <td class="p-2.5 text-rose-700 font-medium">Dinâmica: alteração progressiva no tamanho, forma, cor, elevação ou sintomas (coceira/sangramento)</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
`,
        gabarito: `Gabarito Oficial da Prova:

A diferenciação clínica baseia-se na **Regra do ABCDE**:
• **A (Assimetria):** Nevo benigno é simétrico; melanoma apresenta contorno assimétrico.
• **B (Bordas):** Nevo tem bordas regulares e bem delimitadas; melanoma apresenta bordas irregulares, serrilhadas ou difusas.
• **C (Cor):** Nevo tem pigmentação homogênea e uniforme; melanoma apresenta policromia (duas ou mais cores: tons castanhos, preto, azul, vermelho ou áreas esbranquiçadas).
• **D (Diâmetro):** Nevo costuma ter diâmetro < 6 mm; melanoma tipicamente apresenta diâmetro > 6 mm.
• **E (Evolução):** Nevo permanece estável ao longo do tempo; melanoma apresenta crescimento ou modificação em relevo, coloração ou sintomas como prurido e sangramento.

**O QUE O PROFESSOR QUER AVALIAR:**
Fixar o método mnemônico ABCDE do rastreio de lesões suspeitas de malignidade cutânea no exame físico geral.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 4 — Questão 5 (Valvopatias e Ausculta)",
        text: `Questão 5 — Anamnese e exame físico cardiovascular (valvopatias)

A anamnese e o exame físico do aparelho cardiovascular são de grande relevância na prática médica. Analise as assertivas a seguir:

I. Paciente 37 anos, sexo feminino, relata dispneia aos grandes esforços desde os 30 anos de idade. Ao exame do aparelho cardiovascular, detecta-se um sopro sistólico audível no foco localizado no cruzamento da linha hemiclavicular esquerda com o quinto espaço intercostal esquerdo, com intensidade 3+/6+. A valvopatia mais provável para esse quadro clínico é estenose mitral.
II. Paciente 22 anos, sexo feminino, relata inchaco nos pés eventual. Nega outros sintomas ou doenças prévias diagnosticadas. Ao exame físico: bom estado geral, eupneica, anictérica, corada, acianótica, consciente, orientada. Aparelho respiratório: murmúrio vesicular presente em ambos hemitórax, sem ruídos adventícios. Ao exame do aparelho cardiovascular: ritmo cardíaco regular, com sopro sistólico no quinto espaço intercostal esquerdo, junto à borda esternal esquerda, com intensidade 1+/6+. A valvopatia mais provável para esse quadro clínico é insuficiência tricúspide.
III. Paciente com 70 anos de idade apresenta há 3 meses quadro de dispneia aos moderados esforços. Hipertenso há 10 anos em uso regular de atenolol 50 mg/dia. Ao exame físico geral: bom estado, afebril, hidratado, corado, anictérico, FC=80 bpm, PA=170x60 mmHg, FR=18 irpm. Ao exame cardiovascular: bulhas normofonéticas em 2 tempos, com sopro diastólico 2+/6+ no terceiro espaço intercostal esquerdo, junto à borda esternal esquerda. A valvopatia mais provável para esse quadro clínico é insuficiência aórtica.

Assinale a alternativa correta:`,
        interactionType: "multiple-choice",
        options: [
            "A) Apenas as assertivas I e II estão corretas.",
            "B) Apenas as assertivas I e III estão corretas.",
            "C) Apenas as assertivas II e III estão corretas.",
            "D) As assertivas I, II e III estão corretas.",
            "E) As assertivas I, II e III estão falsas."
        ],
        gabarito: `Alternativa C.

**COMENTÁRIO DO GABARITO:**
• I — FALSO: O foco mitral localiza-se no 5º EIC com linha hemiclavicular esquerda (ictus cordis). Sopro SISTÓLICO neste foco corresponde à insuficiência mitral (regurgitação durante a sístole ventricular), e não estenose mitral (que produz sopro diastólico em ruflar com reforço pré-sistólico).
• II — VERDADEIRO: Sopro sistólico de baixa intensidade no 5º EIC esquerdo justaesternal (foco tricúspide) em paciente jovem com queixa discreta é compatível com insuficiência tricúspide leve.
• III — VERDADEIRO: Sopro diastólico em foco aórtico acessório (3º EIC esquerdo / foco de Erb) associado a pressão arterial divergente (pressão de pulso alargada: 170x60 mmHg) é a apresentação clínica clássica de insuficiência aórtica crônica.

Corretas: II e III (Alternativa C).

**O QUE O PROFESSOR QUER AVALIAR:**
Correlação estrita entre foco de ausculta anatômico, momento do ciclo cardíaco (sístole vs diástole) e a valvopatia correspondente.`
    },
    {
        type: "DISCURSIVA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 4 — Questão 6 (Frêmito e Ressonância na Consolidação)",
        text: `Questão 6 (item I) — Frêmito e ressonância vocal na consolidação

A anamnese e o exame físico são de grande relevância na prática médica. Analise a assertiva a seguir e julgue se é VERDADEIRA ou FALSA, justificando com base nos princípios semiológicos:

"Paciente A.M.S., sexo feminino, 25 anos, vai ao serviço de emergência devido a quadro de tosse e dispneia há 10 dias. Diabética tipo 2 há cinco anos, hipercolesterolemia, tabagismo importante desde os 12 anos (2 carteiras/dia). No exame físico, T=37,0°C, FR=28irpm, FC=112bpm, PA=138x76mmHg. Ao exame do aparelho respiratório: redução da expansibilidade, reforço do frêmito toracovocal à palpação, macicez à percussão e redução do murmúrio vesicular na metade inferior do hemitórax esquerdo. Espera-se identificar uma ressonância vocal reduzida na mesma região."`,
        interactionType: "textarea",
        options: [],
        gabarito: `Gabarito Oficial da Prova:

**Julgamento: FALSA.**

**Justificativa:**
A assertiva descreve uma síndrome de condensação/consolidação pulmonar (comprovada pelo reforço do frêmito toracovocal e macicez à percussão). Na consolidação, o parênquima pulmonar adensado transmite as vibrações sonoras da laringe com muito mais intensidade até a parede torácica. Por essa razão, a ressonância vocal estará **AUMENTADA** (broncofonia aumentada, pectorilóquia áfona ou fônica), e não reduzida. Afirmar que a ressonância vocal estará reduzida na mesma região contradiz a fisiopatologia da transmissão acústica na consolidação.

**O QUE O PROFESSOR QUER AVALIAR:**
Garantir que o acadêmico compreenda que frêmito toracovocal (palpação) e ressonância vocal (ausculta da voz falada) caminham sempre em paralelo: ambos aumentam na condensação e ambos reduzem no derrame pleural e no pneumotórax.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 4 — Questão sobre Manobras e Bulhas Cardíacas",
        text: `Analise as assertivas a seguir a respeito da ausculta e manobras cardíacas:

I. A primeira bulha cardíaca (B1) coincide com o fechamento das valvas semilunares (aórtica e pulmonar), marcando o término da sístole ventricular.
II. Há manobras que podem alterar a intensidade dos sopros cardíacos. A manobra de Rivero Carvallo é uma delas, e consiste na realização de uma inspiração profunda enquanto o médico ausculta o precórdio do paciente. A manobra de Rivero Carvallo promove aumento do sangue nas câmaras cardíacas direitas, o que leva ao aumento da intensidade dos sopros das valvopatias tricúspides e pulmonares.
III. A terceira e a quarta bulhas são de tonalidade mais baixa que a primeira e a segunda bulhas cardíacas. Essas bulhas (B3 e B4), quando presentes, são melhor audíveis com a campânula do estetoscópio, assim como o sopro diastólico da estenose mitral, situando-se na telediástole e protodiástole, respectivamente.

Assinale a alternativa correta:`,
        interactionType: "multiple-choice",
        options: [
            "A) As assertivas I, II e III estão corretas.",
            "B) Apenas a assertiva I está correta.",
            "C) Apenas a assertiva II está correta.",
            "D) Apenas a assertiva III está correta.",
            "E) As assertivas I, II e III estão falsas."
        ],
        gabarito: `Alternativa C (Apenas a assertiva II está correta).

**COMENTÁRIO DO GABARITO:**

• I — FALSO: A primeira bulha cardíaca (B1) decorre do fechamento das valvas atrioventriculares (mitral e tricúspide) no início da sístole ventricular mecânica (contração isovolumétrica). Quem coincide com o fechamento das valvas semilunares (aórtica e pulmonar) ao término da sístole e início da diástole mecânica é a segunda bulha cardíaca (B2).

• II — VERDADEIRO: A manobra de Rivero-Carvallo consiste na inspiração profunda sustentada, que promove redução da pressão intratorácica e aumento do gradiente de pressão para o retorno venoso às cavidades direitas. O maior volume sanguíneo ejetado pelo ventrículo direito intensifica os sopros das valvopatias tricúspide e pulmonar (sinal de Rivero-Carvallo positivo), permitindo diferenciá-los dos sopros originados nas cavidades esquerdas.

• III — FALSO: Embora B3 e B4 sejam de fato sons de baixa frequência (graves) e melhor audíveis com a campânula do estetoscópio aplicada levemente sobre o ápice ou borda esternal, o enunciado inverteu a cronologia clássica do ciclo cardíaco:
  - B3 (terceira bulha) é um ruído PROTODIASTÓLICO (início da diástole), gerado pela desaceleração abrupta do fluxo durante o enchimento ventricular rápido.
  - B4 (quarta bulha) é um ruído TELEDIÁSTÓLICO (final da diástole / pré-sístole), decorrente da contração atrial vigorosa contra um ventrículo com complacência diminuída.
  Portanto, situam-se na protodiástole e telediástole, respectivamente, e não o inverso.

• Resumo Semiológico: Apenas a assertiva II é verdadeira (Alternativa C). A distinção cronológica entre protodiástole (B3, estalido) e telediástole (B4) é conceito clássico e fundamental na semiologia cardiovascular.`
    },
    {
        type: "DISCURSIVA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 5 — Questão 7 (Síndromes Parkinsonianas)",
        text: `Questão 7 — Síndromes Parkinsonianas (dois casos)

Analise os dois casos clínicos e responda o diagnóstico mais provável para cada um:

7a) Paciente de 68 anos, com história de lentificação motora progressiva há cerca de 1 ano, associada a quedas frequentes desde o início do quadro. Familiares relatam dificuldade para olhar para baixo e mudança na fala, que se tornou mais lenta e arrastada. Ao exame neurológico, apresenta bradicinesia, rigidez, instabilidade postural e limitação do olhar vertical. Qual o diagnóstico mais provável?

7b) Paciente de 65 anos apresenta lentificação motora progressiva há aproximadamente 3 anos, iniciando de forma assimétrica no membro superior direito, associada a tremor em repouso discreto e rigidez leve. Refere leve dificuldade para iniciar a marcha, mas sem quedas recentes. Ao exame neurológico, observa-se bradicinesia, rigidez em roda denteada no braço direito e tremor em repouso assimétrico. Qual o diagnóstico mais provável?`,
        interactionType: "textarea",
        options: [],
        gabarito: `Gabarito Oficial da Prova:

**7a) Diagnóstico mais provável:**
**Paralisia Supranuclear Progressiva (PSP)** (parkinsonismo atípico).
*Justificativa:* Presença de sinais de parkinsonismo com sinais de alarme marcantes: quedas posturais precoces (logo no 1º ano) e oftalmoplegia supranuclear com paralisia do olhar vertical para baixo.

**7b) Diagnóstico mais provável:**
**Doença de Parkinson Idiopática (DP)**.
*Justificativa:* Quadro motor clássico de início insidioso e assimétrico no membro superior, tremor de repouso, rigidez plástica com sinal da roda denteada, bradicinesia e ausência de quedas precoces ou oftalmoplegia.

**O QUE O PROFESSOR QUER AVALIAR:**
Reconhecimento das red flags na síndrome parkinsoniana para diferenciar a Doença de Parkinson idiopática dos parkinsonismos atípicos (síndromes Parkinson-Plus).`
    },
    {
        type: "DISCURSIVA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 11 — Questão 1 (Exame do Nervo Óptico)",
        text: `Questão 1 — Exame do nervo óptico

FSB, masculino, 58 anos, procura atendimento relatando perda visual progressiva no olho direito há cerca de 2 semanas, associada à dificuldade para perceber objetos nas laterais. Diante da situação descrita, é fundamental lançar mão dos conhecimentos adquiridos sobre a avaliação do nervo óptico. De forma objetiva, quais etapas do exame físico deste nervo craniano (II par) devem ser testadas?`,
        interactionType: "textarea",
        options: [],
        gabarito: `Gabarito Oficial da Prova:

Etapas da avaliação do nervo óptico (II par craniano):
1. **Acuidade visual:** avaliada com optotipos (Tabela de Snellen ou de Jaeger).
2. **Campimetria (campo visual):** testada pela técnica de confrontação para verificar perda de visão periférica ou quadrantopsias/hemianopsias.
3. **Fundoscopia (oftalmoscopia):** exame do fundo de olho para avaliar papila/disco óptico (pesquisa de papiledema, escavação ou palidez), vasos retinianos e mácula.
4. **Visão de cores:** teste com pranchas de Ishihara (para descartar discromatopsia).
5. **Reflexos pupilares fotomotor e consensual (aferência visual):** avaliação da via aferente do nervo óptico e pesquisa de defeito pupilar aferente relativo (pupila de Marcus Gunn).

**O QUE O PROFESSOR QUER AVALIAR:**
Sistematização semiológica completa da propedêutica do II par craniano diante de queixa oftalmológica/neurológica.`
    },
    {
        type: "DISCURSIVA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 11 — Questão 2 (Caso Clínico ELA)",
        text: `Questão 2 — Caso clínico: fraqueza + atrofia + sinais mistos (ELA)

Um adulto jovem de 30 anos realizou uma consulta médica por conta de uma fraqueza generalizada e atrofia muscular na mão e no pé direito. Esses sintomas vinham se agravando nos últimos 2 anos e foram associados a cãibras musculares dolorosas. O exame neurológico demonstrava disartria, espasticidade generalizada, reflexos profundos aumentados em todos os tendões e sinal de Babinski bilateral. Observou-se ainda atrofia muscular proeminente em mão direita e ambos os pés, com fasciculações. O exame sensitivo se mostrou dentro da normalidade. Sem alterações de esfíncteres de bexiga e reto.

2.1 Qual diagnóstico mais provável?
2.2 Justifique sua resposta analisando a correlação com as vias motoras e sensitivas.

Opções para diagnóstico diferencial:
b) Deficiência de B12
c) Oclusão de Artéria Espinhal Anterior
d) Mielite Transversa
e) Tabes dorsalis`,
        interactionType: "textarea",
        options: [],
        gabarito: `Gabarito Oficial da Prova:

**2.1 Diagnóstico mais provável:**
**Esclerose Lateral Amiotrófica (ELA)**.

**2.2 Justificativa:**
• Coexistência de **sinais de 1º neurônio motor / neurônio motor superior** (espasticidade, hiperreflexia profunda difusa e sinal de Babinski bilateral) associados a **sinais de 2º neurônio motor / neurônio motor inferior** (atrofia muscular, fraqueza focal e fasciculações).
• **Preservação completa da sensibilidade** e ausência de disfunção vesical ou retal (a ELA é uma doença degenerativa motora pura, poupando a sensibilidade e esfíncteres).
• As outras alternativas (deficiência de B12, tabes dorsalis, mielite transversa e oclusão de artéria espinhal anterior) cursam obrigatoriamente com déficits sensitivos ou autonômicos expressivos.

**O QUE O PROFESSOR QUER AVALIAR:**
Aplicação do raciocínio semiológico neurológico topográfico para identificação de lesão mista de 1º e 2º neurônio motor.`
    },
    {
        type: "DISCURSIVA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 11 — Questão 3 (Utilidade do Diapasão)",
        text: `Questão 3 — Utilidade do diapasão no exame físico

O diapasão é um instrumento utilizado rotineiramente na semiologia médica. Qual a sua utilidade durante o exame neurológico? Que funções pode ser usado para avaliar?`,
        interactionType: "textarea",
        options: [],
        gabarito: `Gabarito Oficial da Prova:

O diapasão (frequências usuais de 128 Hz ou 256/512 Hz) é utilizado na propedêutica para duas avaliações fundamentais:
1. **Sensibilidade Vibratória ou Palestesia:** colocado sobre saliências ósseas (hálux, maléolos, tuberosidade da tíbia, crista ilíaca, dedos, rádio) para testar os cordões posteriores da medula espinhal e nervos periféricos (sensibilidade profunda).
2. **Avaliação da Função Auditiva / VIII Par Craniano (Vestibulococlear):**
   • **Teste de Rinne:** compara a condução aérea e a condução óssea (processo mastoide).
   • **Teste de Weber:** avalia a lateralização do som posicionando o diapasão no vértex craniano, permitindo diferenciar perda auditiva condutiva de neurossensorial.

**O QUE O PROFESSOR QUER AVALIAR:**
Demonstrar a aplicação do diapasão tanto no exame da sensibilidade profunda proprioceptiva quanto na otoneurologia dos pares cranianos.`
    },
    {
        type: "DISCURSIVA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 12 — Questão 10.1 (Síndrome de Consolidação)",
        text: `Questão 10.1 — Síndrome de consolidação (sopro tubário)

Paciente cursando com febre, tosse produtiva e dor torácica localizada em base de hemitórax direito, apresenta ao exame físico sopro tubário. Tendo em vista o provável diagnóstico, como devem estar a Percussão, o Frêmito Toracovocal e a Ressonância vocal, na base do hemitórax acometido?`,
        interactionType: "textarea",
        options: [],
        gabarito: `Gabarito Oficial da Prova:

Diante do diagnóstico de síndrome de condensação/consolidação pulmonar (pneumonia):
• **Percussão:** Macicez ou submacicez na base do hemitórax direito (decorrente da substituição do ar alveolar por exsudato inflamatório denso).
• **Frêmito Toracovocal (FTV):** Aumentado (o tecido consolidado com brônquio pérvio transmite com maior fidelidade as ondas vibratórias).
• **Ressonância vocal:** Aumentada (broncofonia aumentada e pectorilóquia afônica/fônica nítida).

**O QUE O PROFESSOR QUER AVALIAR:**
Domínio completo da tríade física da consolidação pulmonar, correlacionando o sopro tubário com as alterações de percussão, palpação e ausculta da voz.`
    },
    {
        type: "DISCURSIVA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 12 — Questão 10.2 (Pneumotórax Pós-Voo)",
        text: `Questão 10.2 — Pneumotórax pós-voo

Paciente com história de dispneia iniciada após voo comercial Petrolina-Recife. Ao exame físico, notou-se Frêmito Toracovocal abolido, Timpanismo à Percussão e Ressonância vocal abolida, no hemitórax direito. Qual o provável diagnóstico?`,
        interactionType: "textarea",
        options: [],
        gabarito: `Gabarito Oficial da Prova:

**Diagnóstico Provável:**
**Pneumotórax** (pneumotórax espontâneo primário desencadeado por alteração barométrica durante o voo).

**COMENTÁRIO DO GABARITO:**
O acúmulo de ar no espaço pleural atua como um isolante acústico entre o pulmão e a parede torácica, abolindo a transmissão das vibrações sonoras (FTV abolido e ressonância vocal abolida) e produzindo som timpânico (hipertimpanismo) à percussão torácica. O início agudo associado à despressurização/voo comercial reforça a ruptura de bolha subpleural apical.

**O QUE O PROFESSOR QUER AVALIAR:**
Contraste direto com a síndrome de consolidação da questão anterior e correlação clínica com gatilhos barométricos de pneumotórax.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 13 — Questão 4 (Exame Pulmonar Comparado)",
        text: `Questão 4 — Anamnese e exame físico pulmonar comparado

A anamnese e o exame físico são de grande relevância na prática médica. Analise as assertivas a seguir:

I. A anamnese é uma ferramenta fundamental para estabelecer a relação médico-paciente e deve ser realizada de forma estruturada e empática.
II. Paciente do sexo masculino, 58 anos, procura atendimento com quadro de dispneia progressiva há 5 dias, agravada pela respiração profunda. Refere também tosse seca e sensação de peso no peito. Ao exame físico, observa-se diminuição da expansibilidade torácica à direita e aumento do frêmito toracovocal. O diagnóstico provável desse paciente é derrame pleural.
III. Paciente sexo feminino, 67 anos, com quadro de dispneia e tosse há 3 dias. Histórico de cirurgia de correção de fratura de colo de fêmur decorrente de queda da própria altura há 10 anos. Ao exame do aparelho respiratório, identificou-se redução do frêmito toracovocal no terço inferior do hemitórax direito. Essa alteração do exame físico sugere o diagnóstico de infarto pulmonar.

Assinale a alternativa correta:`,
        interactionType: "multiple-choice",
        options: [
            "A) Apenas I está correta.",
            "B) Apenas I e II estão corretas.",
            "C) Apenas I e III estão corretas.",
            "D) Apenas II e III estão corretas.",
            "E) I, II e III estão corretas."
        ],
        gabarito: `Alternativa E.

**COMENTÁRIO DO GABARITO:**
Na avaliação da prova original, a chave assinalou a Alternativa E (todas corretas).

**ATENÇÃO / DIVERGÊNCIA NA FONTE:**
Vale salientar uma clássica controvérsia semiológica para o estudo: na assertiva II, o enunciado associa derrame pleural com "aumento do frêmito toracovocal". Na literatura canônica da semiologia médica (Porto, Bates), o líquido no espaço pleural amortece a transmissão das cordas vocais à parede, de modo que o derrame pleural típico causa REDUÇÃO ou ABOLIÇÃO do frêmito toracovocal (ao contrário da consolidação, onde há aumento). Todavia, na chave original da avaliação institucional, todas as assertivas foram computadas como verdadeiras (Alternativa E). Mantemos o registro exato para fidelidade acadêmica à prova.

**O QUE O PROFESSOR QUER AVALIAR:**
Habilidade do aluno em correlacionar cenários clínicos pulmonares e reconhecer os parâmetros da anamnese e palpação torácica.`
    }
];

export const pdfFisiopatologiaQuestions: AuthenticQuestion[] = [
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 3 — Questão sobre Atelectasia (Fisiopatologia)",
        text: `Mecanismos de atelectasia (I)

Assinale a alternativa correta sobre os mecanismos de atelectasia:`,
        interactionType: "multiple-choice",
        options: [
            "A) A atelectasia por contração ocorre por compressão externa do parênquima pulmonar, geralmente associada a derrame pleural.",
            "B) A atelectasia compressiva resulta da obstrução das vias aéreas, levando à reabsorção do ar alveolar distal.",
            "C) A atelectasia por reabsorção ocorre quando há obstrução brônquica, impedindo a entrada de ar e levando ao colapso progressivo dos alvéolos.",
            "D) A atelectasia cicatricial é reversível após a remoção da causa subjacente, sem alterações estruturais permanentes.",
            "E) A atelectasia por deficiência de surfactante está mais associada a processos obstrutivos das vias aéreas superiores."
        ],
        gabarito: `Alternativa C.

**COMENTÁRIO DO GABARITO:**
• A alternativa C é a correta: a atelectasia por reabsorção (obstrutiva) resulta da oclusão completa de uma via aérea (por tampão mucoso, corpo estranho ou neoplasia endobrônquica); o ar retido nos alvéolos distais é reabsorvido pela circulação capilar pulmonar, colapsando os alvéolos afetados.
• As alternativas A e B trocam os conceitos: a atelectasia compressiva decorre de compressão mecânica extrínseca do pulmão (ex.: derrame pleural, pneumotórax, elevação do diafragma). A atelectasia por contração (cicatricial) decorre de fibrose pulmonar ou pleural local/generalizada que impede a expansão, sendo essencialmente irreversível.

**O QUE O PROFESSOR QUER AVALIAR:**
Compreensão dos mecanismos fisiopatológicos dos diferentes tipos de colapso alveolar (atelectasia por reabsorção vs compressiva vs cicatricial).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 3 — Questão 14 (Fisiopatologia DPOC)",
        text: `Questão 14 — Fisiopatologia da DPOC/enfisema

Sobre a fisiopatologia do sistema respiratório, assinale a alternativa que contém todas as assertivas corretas propostas:

I. Atelectasia de compressão refere-se à fibrose pleural ou pulmonar focal ou generalizada.
II. A inalação da fumaça do cigarro e de outras partículas nocivas causa dano e inflamação nos pulmões, resultando em destruição parenquimatosa (enfisema) e doença das vias aéreas (bronquiolite e bronquite crônica).
III. Pessoas que possuem deficiência genética da antiprotease α1-antitripsina apresentam uma tendência notavelmente maior a desenvolver bronquiectasia.
IV. Em indivíduos com distúrbios obstrutivos difusos, os testes de função pulmonar exibem maiores taxas de fluxo aéreo máximo durante a expiração forçada, geralmente expressa como volume expiratório forçado no 1º segundo (FEV1).`,
        interactionType: "multiple-choice",
        options: [
            "A) I, II, III, IV.",
            "B) II.",
            "C) I, II.",
            "D) I, III.",
            "E) II, III, IV."
        ],
        gabarito: `Alternativa B.

**COMENTÁRIO DO GABARITO:**
• I — FALSO: Fibrose pulmonar ou pleural caracteriza a atelectasia de contração (cicatricial), e não a de compressão.
• II — VERDADEIRO: A fumaça do tabaco ativa macrófagos e neutrófilos, liberando proteinases e oxidantes que destroem os septos alveolares (enfisema) e inflamam as pequenas vias aéreas (bronquiolite e bronquite crônica).
• III — FALSO: A deficiência de α1-antitripsina (AAT) leva predominantemente a enfisema panacinar em adultos jovens (especialmente em fumantes), devido ao desbalanço protease-antiprotease, e não primariamente bronquiectasias.
• IV — FALSO: Doenças obstrutivas cursam com REDUÇÃO das taxas de fluxo expiratório máximo e diminuição pronunciada do VEF1 (e da relação VEF1/CVF).

Apenas a assertiva II está correta (Alternativa B).

**O QUE O PROFESSOR QUER AVALIAR:**
Fisiopatologia molecular e tecidual da DPOC, correlação do desbalanço protease-antiprotease e interpretação básica de espirometria nas doenças obstrutivas.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 4 — Questão 11 (Síndrome Coronariana Aguda com ECG)",
        text: `Questão 11 — Síndrome coronariana aguda com ECG

Um homem de 58 anos chega ao serviço de emergência queixando-se de dor torácica. A dor havia começado 1 hora antes, ele a descreve como forte, difusa e do tipo compressiva. A dor está localizada na região subesternal, irradia para os ombros e está associada à falta de ar. O paciente vomitou uma vez. É diabético e hipertenso. PA=150/100 mmHg, FC=95 bpm, FR=20 mpm, T=37,3°C, SpO2=98%. Está diaforético e ansioso. O eletrocardiograma (ECG) de 12 derivações é mostrado a seguir:

Analise as assertivas a seguir:

I. As síndromes clínicas de IAMSSST e AI são causadas por infarto subendocárdico ou isquemia, respectivamente, em geral decorrentes da formação de microêmbolos.
II. O IAMCSST ocorre quando a obstrução total de um vaso epicárdico causa infarto transmural que se manifesta classicamente como dor torácica não remitente e elevação do segmento ST ao ECG.
III. O IAMSSST é uma SCA em que há um novo episódio de dor torácica, uma dor torácica de gravidade crescente ou ainda uma dor torácica que ocorre em repouso, na presença de elevação dos níveis de biomarcadores cardíacos.
IV. O conceito de estreitamento fixo explica apenas a angina estável provocada pela demanda miocárdica aumentada.

Assinale a alternativa correta:`,
        interactionType: "multiple-choice",
        options: [
            "A) I e II.",
            "B) III e IV.",
            "C) II e III.",
            "D) I, II, III e IV.",
            "E) I, II e IV."
        ],
        graphicsHtml: `
<div class="my-4 p-4 rounded-2xl border-2 border-red-300 bg-[#fff5f5] shadow-md font-mono text-xs">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-red-200 gap-2">
        <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-red-600 text-white font-bold text-[11px] uppercase tracking-wider">ECG 12 Derivações</span>
            <span class="font-bold text-gray-800 text-xs sm:text-sm">Traçado Eletrocardiográfico da Prova Original</span>
        </div>
        <div class="text-[11px] text-red-700 bg-red-100 px-2 py-0.5 rounded border border-red-200">
            Vel: 25 mm/s | Ganho: 10 mm/mV | 1 mV Cal
        </div>
    </div>

    <!-- ECG Visual representation on pink clinical grid -->
    <div class="relative w-full rounded-xl overflow-hidden border border-red-200 bg-[#fff0f2]" style="background-image: linear-gradient(to right, rgba(255,160,180,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,160,180,0.3) 1px, transparent 1px); background-size: 8px 8px;">
        <div class="p-3 sm:p-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
            <!-- Col 1 -->
            <div class="bg-white/85 p-2 rounded border border-red-200 flex flex-col justify-between">
                <div class="flex justify-between items-center text-gray-700 font-bold border-b border-red-100 pb-1 mb-1">
                    <span>DI</span><span class="text-[10px] text-gray-500 font-normal">Isodifásica</span>
                </div>
                <div class="h-10 flex items-center justify-center">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-gray-900 fill-none" stroke-width="1.8">
                        <path d="M0,15 L20,15 L25,12 L30,15 L35,15 L38,18 L42,2 L46,24 L48,15 L60,15 L70,11 L80,15 L100,15" />
                    </svg>
                </div>
            </div>

            <div class="bg-white/85 p-2 rounded border border-red-200 flex flex-col justify-between">
                <div class="flex justify-between items-center text-gray-700 font-bold border-b border-red-100 pb-1 mb-1">
                    <span>aVR</span><span class="text-[10px] text-gray-500 font-normal">Infradesnivelamento recíproco</span>
                </div>
                <div class="h-10 flex items-center justify-center">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-gray-900 fill-none" stroke-width="1.8">
                        <path d="M0,15 L20,15 L25,18 L30,15 L35,15 L38,12 L42,28 L46,6 L48,15 L55,18 L65,18 L75,15 L100,15" />
                    </svg>
                </div>
            </div>

            <!-- Precordials with STEMI -->
            <div class="bg-red-50/90 p-2 rounded border-2 border-red-400 flex flex-col justify-between">
                <div class="flex justify-between items-center text-red-900 font-bold border-b border-red-200 pb-1 mb-1">
                    <span>V1</span><span class="text-[10px] bg-red-600 text-white px-1 rounded font-bold">SUPRA ST</span>
                </div>
                <div class="h-10 flex items-center justify-center">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-red-700 fill-none" stroke-width="2">
                        <path d="M0,16 L15,16 L20,13 L25,16 L32,16 L35,26 L38,8 L40,8 C48,2 55,2 62,8 L70,16 L100,16" />
                    </svg>
                </div>
            </div>

            <div class="bg-red-50/90 p-2 rounded border-2 border-red-400 flex flex-col justify-between">
                <div class="flex justify-between items-center text-red-900 font-bold border-b border-red-200 pb-1 mb-1">
                    <span>V4</span><span class="text-[10px] bg-red-600 text-white px-1 rounded font-bold">SUPRA ST</span>
                </div>
                <div class="h-10 flex items-center justify-center">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-red-700 fill-none" stroke-width="2">
                        <path d="M0,15 L15,15 L20,12 L25,15 L30,17 L35,2 L40,25 L43,7 C52,1 60,3 68,9 L75,15 L100,15" />
                    </svg>
                </div>
            </div>

            <!-- Row 2 -->
            <div class="bg-white/85 p-2 rounded border border-red-200 flex flex-col justify-between">
                <div class="flex justify-between items-center text-gray-700 font-bold border-b border-red-100 pb-1 mb-1">
                    <span>DII</span><span class="text-[10px] text-gray-500 font-normal">Normal</span>
                </div>
                <div class="h-10 flex items-center justify-center">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-gray-900 fill-none" stroke-width="1.8">
                        <path d="M0,15 L20,15 L25,11 L30,15 L35,16 L39,3 L44,22 L47,15 L60,15 L70,10 L80,15 L100,15" />
                    </svg>
                </div>
            </div>

            <div class="bg-white/85 p-2 rounded border border-red-200 flex flex-col justify-between">
                <div class="flex justify-between items-center text-gray-700 font-bold border-b border-red-100 pb-1 mb-1">
                    <span>aVL</span><span class="text-[10px] text-gray-500 font-normal">Discreto supra</span>
                </div>
                <div class="h-10 flex items-center justify-center">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-gray-900 fill-none" stroke-width="1.8">
                        <path d="M0,15 L20,15 L25,12 L30,15 L35,16 L40,6 L44,20 L47,11 L58,11 L68,15 L100,15" />
                    </svg>
                </div>
            </div>

            <div class="bg-red-50/90 p-2 rounded border-2 border-red-400 flex flex-col justify-between">
                <div class="flex justify-between items-center text-red-900 font-bold border-b border-red-200 pb-1 mb-1">
                    <span>V2</span><span class="text-[10px] bg-red-600 text-white px-1 rounded font-bold">SUPRA ST (4mm)</span>
                </div>
                <div class="h-10 flex items-center justify-center">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-red-700 fill-none" stroke-width="2">
                        <path d="M0,16 L15,16 L20,12 L25,16 L30,28 L35,5 C45,0 55,1 65,7 L72,16 L100,16" />
                    </svg>
                </div>
            </div>

            <div class="bg-red-50/90 p-2 rounded border-2 border-red-400 flex flex-col justify-between">
                <div class="flex justify-between items-center text-red-900 font-bold border-b border-red-200 pb-1 mb-1">
                    <span>V5</span><span class="text-[10px] text-red-700 font-bold">Supra residual</span>
                </div>
                <div class="h-10 flex items-center justify-center">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-red-700 fill-none" stroke-width="1.8">
                        <path d="M0,15 L15,15 L20,12 L25,15 L30,16 L35,4 L40,22 L43,11 L55,11 L65,15 L100,15" />
                    </svg>
                </div>
            </div>

            <!-- Row 3 -->
            <div class="bg-white/85 p-2 rounded border border-red-200 flex flex-col justify-between">
                <div class="flex justify-between items-center text-gray-700 font-bold border-b border-red-100 pb-1 mb-1">
                    <span>DIII</span><span class="text-[10px] text-gray-500 font-normal">Normal</span>
                </div>
                <div class="h-10 flex items-center justify-center">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-gray-900 fill-none" stroke-width="1.8">
                        <path d="M0,15 L20,15 L25,13 L30,15 L35,16 L40,7 L44,20 L47,15 L60,15 L70,12 L80,15 L100,15" />
                    </svg>
                </div>
            </div>

            <div class="bg-white/85 p-2 rounded border border-red-200 flex flex-col justify-between">
                <div class="flex justify-between items-center text-gray-700 font-bold border-b border-red-100 pb-1 mb-1">
                    <span>aVF</span><span class="text-[10px] text-gray-500 font-normal">Normal</span>
                </div>
                <div class="h-10 flex items-center justify-center">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-gray-900 fill-none" stroke-width="1.8">
                        <path d="M0,15 L20,15 L25,12 L30,15 L35,16 L40,5 L44,21 L47,15 L60,15 L70,11 L80,15 L100,15" />
                    </svg>
                </div>
            </div>

            <div class="bg-red-50/90 p-2 rounded border-2 border-red-400 flex flex-col justify-between">
                <div class="flex justify-between items-center text-red-900 font-bold border-b border-red-200 pb-1 mb-1">
                    <span>V3</span><span class="text-[10px] bg-red-600 text-white px-1 rounded font-bold">SUPRA ST (5mm)</span>
                </div>
                <div class="h-10 flex items-center justify-center">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-red-700 fill-none" stroke-width="2">
                        <path d="M0,16 L15,16 L20,12 L25,16 L30,26 L35,4 C46,0 56,1 66,7 L73,16 L100,16" />
                    </svg>
                </div>
            </div>

            <div class="bg-white/85 p-2 rounded border border-red-200 flex flex-col justify-between">
                <div class="flex justify-between items-center text-gray-700 font-bold border-b border-red-100 pb-1 mb-1">
                    <span>V6</span><span class="text-[10px] text-gray-500 font-normal">Isodifásica</span>
                </div>
                <div class="h-10 flex items-center justify-center">
                    <svg viewBox="0 0 100 30" class="w-full h-full stroke-gray-900 fill-none" stroke-width="1.8">
                        <path d="M0,15 L20,15 L25,12 L30,15 L34,16 L38,6 L42,20 L45,15 L58,15 L68,12 L78,15 L100,15" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-2 text-[11px] text-gray-600 italic">
        * Interpretação eletrocardiográfica: Supradesnivelamento de ST convexo em derivações precordiais anteriores (V1 a V4), caracterizando Infarto Agudo do Miocárdio com Supradesnivelamento do ST (IAMCSST) de parede anterior por oclusão de artéria descendente anterior (ADA).
    </div>
</div>
`,
        gabarito: `Alternativa C.

**COMENTÁRIO DO GABARITO:**
• II — VERDADEIRO: O IAMCSST decorre da oclusão aguda total e mantida de uma artéria coronária epicárdica (geralmente por ruptura/erosão de placa aterosclerótica com trombo vermelho oclusivo), levando a isquemia transmural da parede ventricular, manifestada por dor típica persistente e elevação em abóbada do segmento ST no ECG (visível claramente em V1 a V4).
• III — VERDADEIRO: O IAMSSST caracteriza-se por quadro clínico de síndrome coronariana aguda (dor em repouso, de início recente ou em padrão crescendo) acompanhado obrigatoriamente de elevação e curva dos biomarcadores de necrose miocárdica (troponina).
• I e IV contêm formulações incompletas ou errôneas no contexto da prova original.

Afirmativas corretas: II e III (Alternativa C).

**O QUE O PROFESSOR QUER AVALIAR:**
Integração entre fisiopatologia da aterotrombose coronariana, correlação anatômica do ECG com supra de ST e diferenciação entre as formas de Síndrome Coronariana Aguda (IAMCSST vs IAMSSST vs Angina Instável).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 4 — Questão 12 (IC Descompensada)",
        text: `Questão 12 — Insuficiência cardíaca descompensada

Uma mulher de 63 anos chega ao serviço de emergência apresentando desconforto respiratório. Faz uso de furosemida. Ao exame: PA=220/112 mmHg, FC=130 bpm, T=37,5°C, FR=36 mpm, SpO2=93% sob alto fluxo de O2. Pele fria, pegajosa e diaforética. Alerta, mas só consegue responder com sim/não devido à dispneia. Apresenta distensão venosa jugular no ângulo mandibular, estertores em ambos os campos pulmonares e edema pré-tibial 2+ bilateral.

Analise as assertivas a seguir:

I. A IC do lado direito resulta em aumento das pressões venosas sistêmicas, enquanto a insuficiência do lado esquerdo causa aumento das pressões venosas pulmonares.
II. O nível do BNP deve ser mensurado, pois, além de ser um indicador sensível da presença de doença cardíaca, essa molécula pode ser particularmente útil para distinguir origens cardíacas das não cardíacas de falta de ar.
III. A FEVE (fração de ejeção do ventrículo esquerdo) costuma ser utilizada para indicar o momento oportuno (classificação) de diferentes terapias.
IV. A IC muitas vezes está associada à doença valvar. A estenose aórtica é muito frequentemente causa de diferentes graus de disfunção ventricular.

Assinale a alternativa correta:`,
        interactionType: "multiple-choice",
        options: [
            "A) I, II e III.",
            "B) III e IV.",
            "C) II e IV.",
            "D) I, II, III e IV.",
            "E) II, III e IV."
        ],
        gabarito: `Alternativa D.

**COMENTÁRIO DO GABARITO:**
Todas as quatro assertivas trazem conceitos fundamentais e verdadeiros da insuficiência cardíaca:
• I — VERDADEIRO: A disfunção de VD eleva as pressões retrógradas na veia cava, gerando turgência jugular, hepatomegalia e edema periférico; a disfunção de VE eleva a pressão capilar pulmonar, gerando congestão e estertores crepitantes.
• II — VERDADEIRO: O peptídeo natriurético tipo B (BNP / NT-proBNP) é liberado pelos miócitos ventriculares em resposta ao estiramento miocárdico e possui alto valor preditivo negativo para diferenciar dispneia de origem cardíaca de causas pulmonares primárias.
• III — VERDADEIRO: A Fração de Ejeção do VE (ICFEr &lt; 40%, ICFElm 41-49%, ICFEp &ge; 50%) é o parâmetro padrão para estratificação fenotípica e direcionamento das quatro classes de drogas modificadoras de sobrevida (quádrupla terapia).
• IV — VERDADEIRO: Valvopatias obstrutivas esquerdas, em especial a estenose aórtica, impõem severa sobrecarga pressórica sistólica crônica, induzindo hipertrofia concêntrica e subsequente disfunção ventricular.

Portanto, I, II, III e IV estão corretas (Alternativa D).

**O QUE O PROFESSOR QUER AVALIAR:**
Fisiopatologia da congestão biventricular, valor diagnóstico do BNP no pronto-socorro e papel da FEVE e das valvopatias na insuficiência cardíaca.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 4 — Questão 15 (Fisiopatologia da Fibrilação Atrial)",
        text: `Questão 15 — Fisiopatologia da Fibrilação Atrial

Um homem de 70 anos chega ao serviço de emergência queixando-se de falta de ar que começou há 2 semanas. Antes disso, conseguia andar normalmente; agora sente fadiga após um curto passeio e nota o coração acelerado mesmo em repouso. História de hipertensão tratada com hidroclorotiazida e amlodipina. Sobre o caso, assinale as assertivas corretas:

I. A formação de trombos na fibrilação atrial ocorre principalmente no ventrículo esquerdo, devido à estase sanguínea causada pela perda da contração ventricular eficaz.
II. A atividade elétrica atrial na fibrilação atrial é organizada e depende exclusivamente de um único foco ectópico localizado no nó atrioventricular.
III. A principal causa de Fibrilação Atrial são processos isquêmicos cardíacos.
IV. A fibrilação atrial resulta de múltiplos circuitos de reentrada e/ou focos ectópicos.

Assinale a alternativa correta:`,
        interactionType: "multiple-choice",
        options: [
            "A) I, II, IV.",
            "B) I, II, III, IV.",
            "C) II, III.",
            "D) I, II, III.",
            "E) III, IV."
        ],
        gabarito: `Alternativa E.

**COMENTÁRIO DO GABARITO:**
• I — FALSO: A perda da sístole atrial coordenada e a estase sanguínea levam à formação de trombos predominantemente no ÁTRIO ESQUERDO, em particular no APÊNDICE ATRIAL ESQUERDO (aurícula esquerda), e não no ventrículo esquerdo.
• II — FALSO: A atividade atrial na FA é completamente caótica e desorganizada (350 a 600 despolarizações por minuto), sem contração atrial eficaz e sem foco único.
• III e IV — VERDADEIRAS: A cardiopatia isquêmica e a cardiopatia hipertensiva com dilatação/fibrose atrial são causas estruturais primárias muito frequentes de FA; eletrofisiologicamente, decorre de microrreentradas funcionais múltiplas e focos rápidos de gatilho (especialmente nas desembocaduras das veias pulmonares).

Corretas: III e IV (Alternativa E).

**O QUE O PROFESSOR QUER AVALIAR:**
Fisiopatologia arrítmica da fibrilação atrial, mecanismos de microrreentrada e o substrato tromboembólico atrial que fundamenta o risco de AVC cardioembólico e indicação de anticoagulação.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 5 — Questão 17 (Dor Neuropática Diabética)",
        text: `Questão 17 — Dor neuropática diabética

Um homem de 52 anos, portador de Diabetes Mellitus tipo 2 há 15 anos, procura atendimento relatando dor em queimação nos pés, de intensidade progressiva há 6 meses. Refere piora noturna e sensação de “choques elétricos”, além de alodinia ao toque leve. Ao exame, apresenta redução da sensibilidade vibratória e térmica em extremidades distais. Com base na fisiopatologia da dor apresentada, assinale a alternativa correta:`,
        interactionType: "multiple-choice",
        options: [
            "A) A dor descrita resulta principalmente da ativação de nociceptores periféricos intactos por estímulos mecânicos intensos.",
            "B) O quadro é compatível com dor nociceptiva inflamatória, mediada por prostaglandinas e bradicinina.",
            "C) Trata-se de dor neuropática, associada à lesão de fibras nervosas periféricas e à sensibilização central.",
            "D) A ausência de inflamação local exclui mecanismos periféricos na gênese da dor.",
            "E) A alodinia indica redução da excitabilidade neuronal nos neurônios do corno dorsal."
        ],
        gabarito: `Alternativa C.

**COMENTÁRIO DO GABARITO:**
• C é a correta: A queixa de dor em queimação, pontadas em choque elétrico, perda sensitiva distal em bota e alodinia (percepção dolorosa desencadeada por estímulos que normalmente não provocam dor, como o toque de um lençol) em paciente com diabetes crônico define a **dor neuropática**. Decorre da lesão microangiopática e metabólica das fibras nervosas periféricas mielínicas e amielínicas, gerando descargas ectópicas espontâneas associadas a hiperexcitabilidade dos neurônios de segunda ordem no corno posterior da medula (sensibilização central).
• As alternativas A e B descrevem dor nociceptiva e inflamatória (ex.: artrite, trauma tecidual), que responde classicamente a analgésicos e anti-inflamatórios comuns. A alodinia reflete AUMENTO (e não redução) da excitabilidade sináptica central.

**O QUE O PROFESSOR QUER AVALIAR:**
Distinção fisiopatológica entre dor nociceptiva vs neuropática, com foco na neuropatia sensitivo-motora distal do diabetes e no mecanismo de sensibilização central.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 5 — Questão 6 (TCE e Hematoma Epidural)",
        text: `Questão 6 — Trauma cranioencefálico (hematoma epidural)

Um homem de 24 anos sofre traumatismo cranioencefálico após colisão motociclística. Inicialmente apresenta perda breve da consciência, seguida de recuperação completa do estado neurológico. Cerca de duas horas depois evolui com cefaleia intensa, vômitos, rebaixamento do nível de consciência e anisocoria ipsilateral. A tomografia computadorizada evidencia coleção hiperdensa biconvexa na região temporoparietal esquerda. Assinale a alternativa correta:`,
        interactionType: "multiple-choice",
        options: [
            "A) O hematoma descrito resulta tipicamente da ruptura de veias ponte, levando a um sangramento venoso de lenta progressão localizado entre a dura-máter e a aracnoide.",
            "B) O intervalo lúcido é uma característica típica do hematoma subaracnoide traumático e decorre da compensação transitória da pressão liquórica.",
            "C) O hematoma subdural agudo ocorre entre a aracnoide e a pia-máter e caracteriza-se por coleção biconvexa limitada pelas suturas cranianas.",
            "D) O hematoma intraparenquimatoso traumático apresenta menor efeito de massa que os hematomas epidurais devido à ausência de edema cerebral associado.",
            "E) O hematoma epidural geralmente decorre da ruptura da artéria meníngea média, produzindo sangramento entre o crânio e a dura-máter, com rápida elevação da pressão intracraniana."
        ],
        gabarito: `Alternativa E.

**COMENTÁRIO DO GABARITO:**
• E é a correta: O caso é o protótipo clínico do **hematoma epidural (extradural)**: impacto na região têmporo-parietal com fratura óssea, laceração da **artéria meníngea média**, período de **intervalo lúcido** (recuperação neurológica transitória) seguido de rápida descompensação por sangramento arterial de alta pressão, hipertensão intracraniana, anisocoria ipsilateral por herniação uncal com compressão do III par craniano e imagem tomográfica clássica de **lente biconvexa** delimitada pelas suturas cranianas (onde a dura-máter adere firmemente ao osso).
• A ruptura de veias-ponte causa hematoma SUBDURAL (sangramento venoso entre dura-máter e aracnoide, com imagem em meia-lua/crescente que cruza suturas).

**O QUE O PROFESSOR QUER AVALIAR:**
Diferenciação anatômica, fisiopatológica e de imagem entre hematoma epidural (arterial/biconvexo/intervalo lúcido) e subdural (venoso/em crescente).`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 6 — Questão 18 (Diabetes Mellitus Tipo 1)",
        text: `Questão 18 — Diabetes Mellitus tipo 1

Uma mulher de 34 anos procura atendimento com queixa de fadiga, poliúria e perda de peso não intencional há 2 meses. Relata histórico familiar de doenças autoimunes. Ao exame, apresenta IMC normal. Exames laboratoriais mostram glicemia de jejum de 268 mg/dL e presença de autoanticorpos contra células β pancreáticas. Considerando a fisiopatologia do quadro descrito, assinale a alternativa correta:`,
        interactionType: "multiple-choice",
        options: [
            "A) A hiperglicemia decorre principalmente da resistência periférica à insulina em tecidos-alvo.",
            "B) Há destruição autoimune das células β pancreáticas, levando à deficiência absoluta de insulina.",
            "C) O aumento da secreção de glucagon compensa totalmente a deficiência de insulina no início da doença.",
            "D) A principal alteração fisiopatológica é a redução da produção hepática de glicose.",
            "E) A presença de autoanticorpos indica aumento da secreção de insulina."
        ],
        gabarito: `Alternativa B.

**COMENTÁRIO DO GABARITO:**
• B é a correta: No Diabetes Mellitus Tipo 1 (DM1), ocorre destruição autoimune crônica mediada por linfócitos T citotóxicos contra as células beta das ilhotas pancreáticas de Langerhans (marcada pela presença de autoanticorpos anti-GAD, anti-IA2, anti-insulina e anti-ZnT8). Esse processo culmina na **deficiência absoluta de insulina**.
• A resistência periférica à insulina com deficiência secretória relativa é a marca registrada do Diabetes Mellitus Tipo 2 (DM2), frequentemente associado a obesidade e síndrome metabólica.

**O QUE O PROFESSOR QUER AVALIAR:**
Fisiopatologia autoimune do DM1 vs defeito metabólico do DM2, enfatizando a deficiência absoluta de insulina como causa da perda de peso e da propensão à cetoacidose.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 6 — Questão 20 (Eixos Adrenal e Tireoidiano)",
        text: `Questão 20 — Eixos adrenal e tireoidiano (Addison + hipotireoidismo)

Um homem de 41 anos é avaliado por fadiga crônica, perda de peso e tontura postural. Ao exame, apresenta pressão arterial baixa e discreta hiperpigmentação cutânea. Exames laboratoriais mostram: sódio reduzido, potássio elevado, cortisol sérico baixo e ACTH elevado. Durante a investigação, também se identifica TSH elevado com T4 livre reduzido. Com base na fisiopatologia dos eixos hipotálamo-hipófise-tireoide e hipotálamo-hipófise-adrenal, analise as afirmativas:

I. Na insuficiência adrenal primária, a elevação do ACTH decorre da perda do feedback negativo exercido pelo cortisol sobre o eixo hipotálamo-hipófise.
II. A hipercalemia observada decorre, principalmente, da deficiência de aldosterona, que reduz a secreção de potássio nos túbulos distais renais.
III. Na insuficiência adrenal secundária, espera-se hiperpigmentação cutânea devido ao aumento de ACTH.
IV. No hipotireoidismo primário, o aumento do TSH ocorre em resposta à redução dos hormônios tireoidianos circulantes.

Assinale a alternativa correta:`,
        interactionType: "multiple-choice",
        options: [
            "A) Apenas I, II e III estão corretas.",
            "B) Apenas I, II e IV estão corretas.",
            "C) Apenas I e IV estão corretas.",
            "D) Apenas II e III estão corretas.",
            "E) Todas estão corretas."
        ],
        gabarito: `Alternativa B.

**COMENTÁRIO DO GABARITO:**
• I — VERDADEIRO: Na Doença de Addison (insuficiência adrenal primária), a destruição do córtex da adrenal cessa a produção de cortisol; a perda do retrocontrole negativo na adeno-hipófise leva à hipersecreção de ACTH e POMC (pró-opiomelanocortina), gerando hiperpigmentação de pele e mucosas por estimulação dos receptores melanocíticos MSH.
• II — VERDADEIRO: A deficiência concomitante de aldosterona impede a reabsorção de sódio e a secreção de potássio e prótons nos túbulos coletores renais, provocando hiponatremia e hipercalemia.
• III — FALSO: Na insuficiência adrenal secundária (falência hipofisária), o ACTH está BAIXO ou inapropriadamente normal, razão pela qual NÃO ocorre hiperpigmentação nem déficit significativo de mineralocorticoide (o SRAA é preservado).
• IV — VERDADEIRO: No hipotireoidismo primário (ex.: Tireoidite de Hashimoto), a falência da glândula tireoide com queda de T4L estimula o aumento compensatório de TSH pela hipófise.

Corretas: I, II e IV (Alternativa B).

**O QUE O PROFESSOR QUER AVALIAR:**
Domínio dos mecanismos de retroalimentação negativa (feedback) endócrina para diferenciar lesões primárias das secundárias nos eixos adrenal e tireoidiano.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 12 — Questão 13 (Crise de Asma Quase Fatal)",
        text: `Questão 13 — Crise de asma quase fatal

Às 3 horas da madrugada, os socorristas ligam para informá-lo de que estão a caminho do serviço de emergência (SE) levando uma paciente asmática de 33 anos. Quando a paciente chega, você percebe imediatamente que ela está se esforçando na tentativa de respirar. O suor emana de seu rosto e corpo, enquanto o pescoço e o tórax são erguidos na tentativa de inalar mais uma respiração e começa a ficar apêica. Os esforços da paciente acabam sendo inúteis, pois ela perde a consciência.

Analise as assertivas a seguir:

I. A exacerbação asmática típica é caracterizada por tosse, rigidez torácica, dispneia e sibilos em um paciente com história comprovada de asma.
II. Essa paciente apresenta uma típica doença restritiva pulmonar.
III. O diagnóstico formal da patologia do caso é estabelecido por espirometria.
IV. Os sibilos caracterizam a obstrução de via aérea e frequentemente são considerados o principal achado da asma.

Assinale a alternativa correta:`,
        interactionType: "multiple-choice",
        options: [
            "A) I, II e III.",
            "B) III e IV.",
            "C) I e III.",
            "D) I, II, III e IV."
        ],
        gabarito: `Alternativa B.

**COMENTÁRIO DO GABARITO:**
• O caso descreve uma exacerbação asmática gravíssima / iminência de parada respiratória (fadiga muscular extrema, sudorese profusa, perda da consciência e bradipneia/apneia). Em crises quase fatais, o fluxo aéreo pode ser tão restrito que os sibilos desaparecem completamente ("tórax silencioso"), de modo que o quadro não pode ser classificado como exacerbação "típica" (item I falso no gabarito oficial).
• II — FALSO: A asma brônquica é classicamente um distúrbio ventilatório OBSTRUTIVO difuso e variável, e não uma doença restritiva.
• III e IV — VERDADEIRAS: A espirometria com prova broncodilatadora (demonstrando limitação reversível do fluxo aéreo: aumento do VEF1 &ge; 12% e 200 mL) é o padrão-ouro confirmatório; os sibilos traduzem turbilhonamento do fluxo expiratório por estenose bronquiolar e representam o som adventício clássico da doença.

Corretas: III e IV (Alternativa B).

**O QUE O PROFESSOR QUER AVALIAR:**
Reconhecimento dos sinais de extrema gravidade da crise de asma e a classificação espirométrica da patologia como padrão obstrutivo reversível.`
    },
    {
        type: "MÚLTIPLA ESCOLHA",
        sourceExam: "Compilado Provas Anteriores - SOP IV (Estácio/IDOMED)",
        origin: "Bloco 12 — Questão 9 (Dor Torácica e Diagnósticos Diferenciais)",
        text: `Questão 9 — Dor torácica: múltiplos diagnósticos diferenciais

Sobre a abordagem e fisiopatologia da dor torácica, julgue as assertivas abaixo:

I. Uma dor torácica com as seguintes características: retroesternal em aperto, súbita, que melhora com o repouso (<10 min) é uma dor Tipo A (definitivamente anginosa).
II. Em relação à SCA (Síndrome Coronariana Aguda), podemos afirmar que na angina estável e na angina instável não há morte miocárdica, portanto não há elevação de troponina, enquanto nos infartos com e sem supra há elevação de troponina pela necrose de miocárdio.
III. O pneumotórax hipertensivo causa desvio de mediastino para o lado ipsilateral (do mesmo lado) à lesão, o que justifica drenagem imediata sem aguardar confirmação radiológica.
IV. Na pericardite aguda, a dor tipicamente piora ao decúbito dorsal e melhora quando o paciente se inclina para frente, na posição genupeitoral.
V. O tromboembolismo pulmonar maciço é uma das complicações possíveis de ocorrer após procedimentos cirúrgicos, e pode ser precipitado por fatores que incluem a tríade de Virchow (lesão endotelial + estase venosa + hipercoagulabilidade).

Assinale a alternativa correta:`,
        interactionType: "multiple-choice",
        options: [
            "A) Apenas II e IV são verdadeiras",
            "B) Apenas II, IV e V são verdadeiras",
            "C) Apenas I, II e V são verdadeiras",
            "D) Apenas I, IV, V são verdadeiras",
            "E) Todas são verdadeiras"
        ],
        gabarito: `Alternativa B.

**COMENTÁRIO DO GABARITO:**
• II — VERDADEIRO: Angina estável e instável caracterizam-se por isquemia miocárdica sem necrose/morte celular, logo sem curva de biomarcadores (troponina normal). Havendo necrose miocárdica com extravasamento de troponinas para o sangue, diagnostica-se IAM (com ou sem supra).
• IV — VERDADEIRO: A dor da pericardite aguda tem caráter pleuropericárdico que alivia na postura de prece maometana (genupeitoral / inclinação anterior do tronco) e piora em decúbito dorsal pela tensão folhetos pericárdicos contra o diafragma.
• V — VERDADEIRO: O TEP pós-operatório é precipitado pelos três elementos da tríade clássica de Rudolf Virchow (imobilização no leito = estase; trauma cirúrgico = lesão vascular; resposta inflamatória/cirúrgica = estado pró-trombótico).
• I — FALSO: Dor súbita com rápida resolução pode ser de padrão C/D ou estável a depender dos fatores desencadeantes.
• III — FALSO: O pneumotórax hipertensivo com mecanismo de válvula unidirecional desvia o mediastino e a traqueia para o lado CONTRALATERAL (lado oposto à lesão), comprimindo a veia cava e gerando choque obstrutivo.

Corretas: II, IV e V (Alternativa B).

**O QUE O PROFESSOR QUER AVALIAR:**
Fisiopatologia comparada das causas graves de dor torácica aguda em sala de emergência (SCA, pericardite, TEP e pneumotórax hipertensivo).`
    }
];
