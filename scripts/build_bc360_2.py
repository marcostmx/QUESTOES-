# scripts/build_bc360_2.py
# Questions 061 to 120 from PDF Banco de Questoes 1-360
import json

questions = [
    # 061
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Assinale a alternativa em que nenhum ambiente pertence à zona semirrestrita:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Farmácia e conforto médico.",
            "B) SRPA e lavabo.",
            "C) Vestiário e expurgo.",
            "D) Secretaria e área de enfermagem."
        ],
        "gabarito": "Alternativa C — Vestiário e expurgo.\n\nVestiário e expurgo são irrestritos; os demais pares listados são todos da zona limpa.\n\n• a) Ambos semirrestritos.\n• b) Ambos semirrestritos.\n• d) Ambos semirrestritos.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    # 062
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Um acadêmico entra na sala cirúrgica com o LAP de campos já aberto, usando pijama privativo, gorro e propés. Falta-lhe:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Avental estéril.",
            "B) Máscara cirúrgica.",
            "C) Luvas estéreis.",
            "D) Nada — a paramentação está completa."
        ],
        "gabarito": "Alternativa B — Máscara cirúrgica.\n\nA máscara é a barreira adicional exigida na zona restrita, sobretudo com material estéril exposto.\n\n• a) Só é necessário para quem entra em campo.\n• c) Só para quem entra em campo.\n• d) Falta a máscara.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    # 063
    {
        "type": "ASSOCIAÇÃO",
        "text": "Associe cada zona à exigência de paramentação:\n\n1. Irrestrita\n2. Semirrestrita\n3. Restrita\n\n( ) Circulação livre, sem uniforme privativo.\n( ) Pijama cirúrgico, touca ou gorro e propés.\n( ) Tudo o que a zona limpa exige, mais a máscara cirúrgica.",
        "interactionType": "textarea",
        "gabarito": "Sequência: 1 – 2 – 3\n\n• 1) Vestiários, espera, transferência, expurgo e corredor periférico (irrestrita).\n• 2) SRPA, farmácia, enfermagem, conforto médico, lavabos, secretaria (semirrestrita).\n• 3) Salas cirúrgicas (restrita).\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    # 064
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A confirmação de que o sítio cirúrgico está demarcado e conferido visualmente ocorre:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Antes da indução anestésica.",
            "B) Antes da saída do paciente.",
            "C) Somente na SRPA.",
            "D) Após a incisão."
        ],
        "gabarito": "Alternativa A — Antes da indução anestésica.\n\nÉ item do sign in, com o paciente preferencialmente ainda desperto — e reconfirmado no time out.\n\n• b) O sign out trata de contagem e amostras.\n• c) Tarde demais.\n• d) Tarde demais.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    # 065
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre o momento imediatamente anterior à incisão, assinale a alternativa INCORRETA:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Cada membro da equipe se apresenta por nome e função.",
            "B) Confirmam-se nome do paciente, procedimento e local da incisão.",
            "C) Confirma-se a administração de antimicrobiano nos últimos 60 minutos.",
            "D) Revisam-se verbalmente os pontos críticos do plano operatório.",
            "E) Realiza-se a contagem final de compressas e instrumentos."
        ],
        "gabarito": "Alternativa E — Realiza-se a contagem final de compressas e instrumentos.\n\nA contagem final pertence ao sign out, antes de o paciente deixar a sala.\n\n• a) Item do time out.\n• b) Item do time out.\n• c) Item do time out.\n• d) Item do time out.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    # 066
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Quem confirma verbalmente a identificação das amostras obtidas, com o nome do paciente?",
        "interactionType": "multiple-choice",
        "options": [
            "A) O cirurgião principal.",
            "B) A equipe de enfermagem, no sign out.",
            "C) O anestesiologista, no sign in.",
            "D) O instrumentador, no time out."
        ],
        "gabarito": "Alternativa B — A equipe de enfermagem, no sign out.\n\nO sign out é conduzido pela enfermagem e inclui procedimento realizado, contagem, amostras e problemas de equipamento.\n\n• a) A confirmação cabe à enfermagem.\n• c) O sign in trata de paciente, consentimento e riscos anestésicos.\n• d) O time out antecede a incisão.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    # 067
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O Protocolo de Cirurgia Segura tem por objetivo:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Padronizar a técnica operatória entre cirurgiões.",
            "B) Reduzir incidentes, eventos adversos e mortalidade cirúrgica por meio de ações preventivas padronizadas.",
            "C) Definir a remuneração da equipe.",
            "D) Substituir o prontuário."
        ],
        "gabarito": "Alternativa B — Reduzir incidentes, eventos adversos e mortalidade cirúrgica por meio de ações preventivas padronizadas.\n\nÉ protocolo de segurança do paciente, aplicado no pré, trans e pós-operatório imediato.\n\n• a) Não interfere na técnica.\n• c) Não tem essa finalidade.\n• d) Complementa o prontuário.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    # 068
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre o uso de adornos por profissionais no centro cirúrgico, é correto afirmar que:",
        "interactionType": "multiple-choice",
        "options": [
            "A) São permitidos fora do campo estéril.",
            "B) São vedados, independentemente de o profissional entrar ou não em campo.",
            "C) Apenas brincos são vedados.",
            "D) São permitidos se cobertos pelo pijama."
        ],
        "gabarito": "Alternativa B — São vedados, independentemente de o profissional entrar ou não em campo.\n\nA vedação é norma de biossegurança: adornos abrigam microrganismos e dificultam a higienização das mãos.\n\n• a) A norma não abre essa exceção.\n• c) A vedação alcança anéis, relógios, pulseiras e brincos.\n• d) Não há essa exceção.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    # 069
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre a conduta esperada do acadêmico no centro cirúrgico, assinale a alternativa INCORRETA:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Apresentar-se por nome e função a todos os profissionais.",
            "B) Conhecer as regras internas da instituição.",
            "C) Perguntar antes de tocar em qualquer material.",
            "D) Demonstrar conhecimento do caso e da técnica antes de solicitar realizar um procedimento.",
            "E) Assumir a execução de procedimentos por iniciativa própria, como demonstração de proatividade."
        ],
        "gabarito": "Alternativa E — Assumir a execução de procedimentos por iniciativa própria, como demonstração de proatividade.\n\nProatividade sem autorização e sem preparo é risco ao paciente, não iniciativa.\n\n• a) Conduta esperada.\n• b) Conduta esperada.\n• c) Conduta esperada.\n• d) Conduta esperada.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    # 070
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Qual dos seguintes itens NÃO corresponde a uma etapa do protocolo de cirurgia segura da OMS?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Revisão da identificação do paciente antes da indução anestésica.",
            "B) Confirmação do nome do paciente, local e procedimento antes da incisão.",
            "C) Administração de antimicrobianos profiláticos após a cirurgia.",
            "D) Verificação da acessibilidade aos exames de imagem antes da incisão."
        ],
        "gabarito": "Alternativa C — Administração de antimicrobianos profiláticos após a cirurgia.\n\nA profilaxia antimicrobiana é confirmada no time out e deve ter sido administrada nos últimos 60 minutos antes da incisão. Depois da cirurgia ela perde a finalidade preventiva.\n\n• a) Item legítimo do sign in.\n• b) Item legítimo do time out.\n• d) Item legítimo do time out.\n\nRevisar: Centro cirúrgico e cirurgia segura"
    },
    # 071
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em relação à ambientação cirúrgica e segurança, é correto afirmar que:",
        "interactionType": "multiple-choice",
        "options": [
            "A) O protocolo da OMS visa apenas à redução de infecção hospitalar.",
            "B) A lista de verificação é utilizada somente após o término da cirurgia.",
            "C) A segurança cirúrgica inclui etapas antes da anestesia, antes da incisão e antes da saída da sala cirúrgica.",
            "D) A função da equipe cirúrgica deve ser apresentada somente em casos de intercorrências."
        ],
        "gabarito": "Alternativa C — A segurança cirúrgica inclui etapas antes da anestesia, antes da incisão e antes da saída da sala cirúrgica.\n\nSão exatamente os três momentos da lista: sign in, time out e sign out. O protocolo padroniza ações preventivas no pré, trans e pós-operatório imediato.\n\n• a) O escopo é bem mais amplo: sítio errado, lateralidade trocada, perda sanguínea, via aérea difícil, retenção de corpo estranho.\n• b) É usada nos três momentos, e o primeiro deles antecede até a anestesia.\n• d) A apresentação nominal da equipe abre o time out em toda cirurgia, e serve para que qualquer membro se sinta autorizado a falar.\n\nRevisar: Centro cirúrgico e cirurgia segura"
    },
    # 072
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Qual ação deve ser feita antes da indução anestésica, segundo o protocolo de cirurgia segura?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Contagem de instrumentos.",
            "B) Confirmação da administração de antimicrobianos.",
            "C) Verbalização com o paciente sobre sua identificação.",
            "D) Avaliação dos exames de imagem necessários."
        ],
        "gabarito": "Alternativa C — Verbalização com o paciente sobre sua identificação.\n\nNo sign in a identificação é confirmada com o próprio paciente sempre que possível — daí a importância de fazê-lo antes da indução, enquanto ele ainda pode responder.\n\n• a) A contagem é feita no sign out.\n• b) Confirmada no time out, antes da incisão.\n• d) Confirmada no time out, antes da incisão.\n\nRevisar: Centro cirúrgico e cirurgia segura"
    },
    # 073
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Marque a alternativa que descreve uma conduta correta antes da saída do paciente da sala cirúrgica:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Revisar com o paciente os riscos da cirurgia.",
            "B) Confirmar o local de incisão com a equipe.",
            "C) Identificar amostras obtidas e confirmar com o nome do paciente.",
            "D) Avaliar a resposta do paciente à anestesia."
        ],
        "gabarito": "Alternativa C — Identificar amostras obtidas e confirmar com o nome do paciente.\n\nNo sign out a enfermagem confirma verbalmente o procedimento realizado, a contagem de instrumentos, compressas e agulhas, a identificação das amostras com o nome do paciente e eventuais problemas de equipamento.\n\n• a) Discussão de riscos é pré-operatória, no consentimento.\n• b) A confirmação do local pertence ao sign in e ao time out.\n• d) É cuidado anestésico contínuo, não item do sign out.\n\nRevisar: Centro cirúrgico e cirurgia segura"
    },
    # 074
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em relação às zonas do centro cirúrgico, é correto afirmar que:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A zona de proteção é aquela onde só é permitida a entrada com máscara e jaleco estéril.",
            "B) A zona limpa permite trânsito livre de pessoas e não exige paramentação específica.",
            "C) A zona estéril é onde se localizam as salas cirúrgicas e exige máscara cirúrgica, gorro, propé e pijama privativo.",
            "D) O conforto médico e a sala de recuperação fazem parte da zona estéril."
        ],
        "gabarito": "Alternativa C — A zona estéril é onde se localizam as salas cirúrgicas e exige máscara cirúrgica, gorro, propé e pijama privativo.\n\nAs exigências são cumulativas: a zona restrita soma a máscara a tudo o que já se exige na zona limpa.\n\n• a) A zona de proteção é a irrestrita — circulação livre, sem uniforme privativo.\n• b) Trânsito livre é característica da zona irrestrita; a limpa exige pijama, gorro e propés.\n• d) Ambos pertencem à zona semirrestrita.\n\nRevisar: Centro cirúrgico e cirurgia segura"
    },
    # 075
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Qual dos seguintes itens faz parte da lista de verificação da cirurgia segura, conforme preconizado pela OMS?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Conferência do diagnóstico do paciente após a cirurgia.",
            "B) Confirmação da identidade do paciente, local da cirurgia e procedimento antes da indução anestésica.",
            "C) Realização de exames de sangue obrigatórios no pré-operatório imediato.",
            "D) Aplicação de antibióticos profiláticos somente após o término da cirurgia."
        ],
        "gabarito": "Alternativa B — Confirmação da identidade do paciente, local da cirurgia e procedimento antes da indução anestésica.\n\nÉ o núcleo do sign in: identidade, sítio e procedimento confirmados antes de o paciente perder a capacidade de responder.\n\n• a) A lista confere o procedimento realizado, não o diagnóstico.\n• c) A lista não prescreve rotina de exames laboratoriais.\n• d) A profilaxia é pré-incisional, nos últimos 60 minutos.\n\nRevisar: Centro cirúrgico e cirurgia segura"
    },
    # 076
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre a antibioticoprofilaxia cirúrgica, assinale a alternativa INCORRETA:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Deve ser administrada de modo que a concentração tecidual esteja adequada no momento da incisão.",
            "B) A escolha do agente considera a flora esperada no sítio operatório.",
            "C) Doses adicionais podem ser necessárias em cirurgias prolongadas ou com grande perda sanguínea.",
            "D) Seu prolongamento por vários dias após a cirurgia limpa reduz comprovadamente a infecção de sítio cirúrgico.",
            "E) Não substitui a técnica asséptica nem o preparo adequado do paciente."
        ],
        "gabarito": "Alternativa D — Seu prolongamento por vários dias após a cirurgia limpa reduz comprovadamente a infecção de sítio cirúrgico.\n\nProlongar a profilaxia não reduz infecção e aumenta resistência bacteriana, custo e risco de colite por C. difficile. Na maioria dos casos ela se encerra em até 24 horas.\n\n• a) Correto — daí a janela dos 60 minutos pré-incisionais.\n• b) Correto.\n• c) Correto.\n• e) Correto.\n\nRevisar: 03 — Ambiente cirúrgico e cirurgia segura"
    },
    # 077
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Comparando clorexidina e PVPI como antissépticos para preparo da pele, é correto afirmar que:",
        "interactionType": "multiple-choice",
        "options": [
            "A) O PVPI tem maior efeito residual e não é inativado por matéria orgânica.",
            "B) A clorexidina tem maior efeito residual e mantém atividade na presença de matéria orgânica.",
            "C) Ambos perdem completamente a atividade em presença de álcool.",
            "D) A clorexidina é o antisséptico de escolha para uso em mucosa ocular e ouvido médio."
        ],
        "gabarito": "Alternativa B — A clorexidina tem maior efeito residual e mantém atividade na presença de matéria orgânica.\n\nA clorexidina liga-se à camada córnea e mantém ação por horas; o PVPI é inativado por sangue e outras proteínas. Por isso a clorexidina alcoólica é preferida no preparo de pele em boa parte das cirurgias.\n\n• a) É o contrário nos dois atributos.\n• c) As formulações alcoólicas são, na verdade, as mais eficazes.\n• d) A clorexidina é contraindicada em olho e ouvido médio, por toxicidade.\n\nRevisar: 04 — Antissepsia e preparo do paciente"
    },
    # 078
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Na antissepsia da pele do paciente, o movimento correto de aplicação é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Do periférico para o centro, em movimentos circulares.",
            "B) Do local da incisão para a periferia, em movimentos circulares ou em faixas, sem retornar ao ponto já preparado.",
            "C) Aleatório, desde que toda a área fique molhada.",
            "D) Apenas sobre a linha exata da incisão."
        ],
        "gabarito": "Alternativa B — Do local da incisão para a periferia, em movimentos circulares ou em faixas, sem retornar ao ponto já preparado.\n\nParte-se da área que será incisada — a mais crítica — em direção às áreas de maior carga microbiana, sem voltar com a gaze já utilizada, para não recontaminar o centro.\n\n• a) Inverte o sentido e carrega sujidade para o sítio da incisão.\n• c) A técnica tem sentido definido.\n• d) A área preparada deve ser ampla, prevendo ampliações e drenos.\n\nRevisar: 04 — Antissepsia e preparo do paciente"
    },
    # 079
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O uso de luvas cirúrgicas estéreis constitui medida de:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Antissepsia, por reduzir a microbiota das mãos.",
            "B) Assepsia, por impedir que agentes infecciosos alcancem um local que não os contém.",
            "C) Desinfecção, por atuar sobre superfície inanimada.",
            "D) Esterilização, por eliminar toda forma de vida do campo."
        ],
        "gabarito": "Alternativa B — Assepsia, por impedir que agentes infecciosos alcancem um local que não os contém.\n\nA luva estéril, por si só, não contém microrganismos; usá-la é erguer uma barreira — conceito de assepsia. Antissepsia é o que se faz sobre tecido vivo.\n\n• a) A redução da microbiota das mãos é obtida pela degermação, não pela luva.\n• c) Desinfecção se aplica a objetos e superfícies, não ao ato de enluvar.\n• d) Esterilizada foi a luva; o ato de calçá-la é medida asséptica.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 080
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A antissepsia caracteriza-se por:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Inibir a colonização por microrganismos em tecidos do paciente, podendo ou não destruí-los.",
            "B) Eliminar todas as formas de vida, inclusive esporos, de um material.",
            "C) Impedir a penetração de agentes infecciosos em ambientes que não os contêm.",
            "D) Reduzir a carga microbiana exclusivamente em superfícies inanimadas."
        ],
        "gabarito": "Alternativa A — Inibir a colonização por microrganismos em tecidos do paciente, podendo ou não destruí-los.\n\nA antissepsia atua no tecido vivo e tem efeito por um período determinado — álcool 70%, clorexidina, PVPI são exemplos.\n\n• b) Essa é a definição de esterilização.\n• c) Essa é a definição de assepsia.\n• d) Superfícies inanimadas são objeto da desinfecção.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 081
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Segundo o material da disciplina, a duração da lavagem cirúrgica das mãos deve ser de:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 1 a 2 minutos na primeira cirurgia e 1 minuto nas seguintes.",
            "B) 3 a 5 minutos na primeira cirurgia e 2 a 3 minutos nas cirurgias em sequência.",
            "C) 5 a 10 minutos sempre, independentemente da sequência.",
            "D) 2 a 3 minutos na primeira cirurgia e 3 a 5 minutos nas seguintes."
        ],
        "gabarito": "Alternativa B — 3 a 5 minutos na primeira cirurgia e 2 a 3 minutos nas cirurgias em sequência.\n\nOs dois pares de números são fixos e caem com frequência exatamente porque são fáceis de trocar entre si.\n\n• a) Tempo insuficiente para remover a microbiota transitória.\n• c) Excede o padrão e não corresponde ao material.\n• d) Inverte os dois tempos.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 082
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A ordem correta da escovação na lavagem cirúrgica é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Antebraços, interdigitais, dorso, palmas e unhas.",
            "B) Palmas, unhas, dorso, antebraços e interdigitais.",
            "C) Unhas, palmas, dorso das mãos, interdigitais e antebraços.",
            "D) Interdigitais, unhas, palmas, dorso e antebraços."
        ],
        "gabarito": "Alternativa C — Unhas, palmas, dorso das mãos, interdigitais e antebraços.\n\nA escovação progride da região de maior concentração microbiana e mais distal (unhas) em direção proximal (antebraços), alternando os lados.\n\n• a) Inverte totalmente o sentido.\n• b) Ordem desorganizada, sem a lógica distal-proximal.\n• d) Começa pelos interdigitais, quebrando a sequência.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 083
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Após concluir a lavagem cirúrgica, o profissional deve:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Manter as mãos abaixadas para que a água escorra em direção aos dedos.",
            "B) Manter as mãos acima da cabeça até chegar à mesa.",
            "C) Manter as mãos no próprio campo de visão, sem abaixá-las nem elevá-las em excesso.",
            "D) Secar as mãos na própria roupa privativa antes de vestir o avental."
        ],
        "gabarito": "Alternativa C — Manter as mãos no próprio campo de visão, sem abaixá-las nem elevá-las em excesso.\n\nManter as mãos no campo de visão evita tanto o escorrimento de água contaminada dos antebraços para as mãos quanto o contato inadvertido com superfícies.\n\n• a) Abaixar as mãos leva água do antebraço para os dedos.\n• b) Elevação excessiva também é incorreta e desnecessária.\n• d) A secagem é feita com a compressa estéril do LAP.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 084
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A ordem correta da paramentação é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Luvas estéreis, lavagem cirúrgica, avental, preparo do paciente.",
            "B) Lavagem cirúrgica com secagem, avental cirúrgico, luvas estéreis, preparo do paciente.",
            "C) Avental, lavagem cirúrgica, luvas, preparo do paciente.",
            "D) Lavagem cirúrgica, luvas estéreis, avental, preparo do paciente."
        ],
        "gabarito": "Alternativa B — Lavagem cirúrgica com secagem, avental cirúrgico, luvas estéreis, preparo do paciente.\n\nLava, seca, veste, calça e só então prepara o paciente. Calçar luvas antes do avental inviabiliza a manipulação correta do capote.\n\n• a) Inverte completamente a sequência.\n• c) É impossível tocar o avental sem estar lavado.\n• d) Troca a ordem entre avental e luvas.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 085
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre a vestimenta do avental cirúrgico, assinale a alternativa incorreta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) O avental a ser usado é o que está no topo da pilha do LAP naquele momento.",
            "B) O avental deve ser suspenso em bloco, pela borda interna.",
            "C) O próprio profissional paramentado deve amarrar as alças laterais.",
            "D) Depois de vestido, a face interna do avental, em contato com o pijama, está contaminada."
        ],
        "gabarito": "Alternativa C — O próprio profissional paramentado deve amarrar as alças laterais.\n\nAs alças laterais são amarradas pela circulante ou por alguém não paramentado, com o cuidado de não tocar a face externa estéril.\n\n• a) Conduta correta — não se escolhe o avental.\n• b) Conduta correta — evita que ele se abra e toque superfícies.\n• d) Conduta correta — por isso essa face não deve mais ser tocada.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 086
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "São consideradas zonas perigosas do capote cirúrgico, que não devem ser tocadas com as mãos enluvadas:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Mangas, punhos e face anterior do tórax.",
            "B) Gola, dorso e terço inferior.",
            "C) Apenas o dorso.",
            "D) Gola, mangas e face anterior do abdome."
        ],
        "gabarito": "Alternativa B — Gola, dorso e terço inferior.\n\nEssas três regiões não são consideradas estéreis, seja por estarem fora do campo de visão, seja por proximidade com áreas de contaminação.\n\n• a) A face anterior do tórax acima da cintura é área estéril de trabalho.\n• c) Incompleta — deixa de fora gola e terço inferior.\n• d) As mangas, acima do punho, fazem parte da área estéril.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 087
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Ao calçar as luvas estéreis, a regra fundamental é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A mão nua só toca a parte interna da luva e a mão enluvada só toca a parte externa.",
            "B) A mão nua pode tocar qualquer parte da primeira luva, desde que rapidamente.",
            "C) A mão enluvada deve tocar preferencialmente a parte interna da segunda luva.",
            "D) Não há restrição, desde que as mãos tenham sido degermadas."
        ],
        "gabarito": "Alternativa A — A mão nua só toca a parte interna da luva e a mão enluvada só toca a parte externa.\n\nÉ a lógica que preserva a esterilidade da face que ficará em contato com o paciente. Cada superfície só é tocada por aquilo que tem o mesmo status.\n\n• b) O tempo de contato não altera a contaminação.\n• c) Inverte a regra: a mão enluvada desliza pela face externa.\n• d) A degermação reduz, mas não esteriliza a pele.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 088
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Ao calçar a segunda luva, o acadêmico percebe que dois dedos entraram trocados. A conduta correta é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Corrigir imediatamente, antes de terminar o calçamento.",
            "B) Retirar as duas luvas e reiniciar todo o processo de paramentação.",
            "C) Terminar de calçar as duas luvas e só então corrigir a posição dos dedos.",
            "D) Solicitar que a circulante ajuste os dedos com as mãos desnudas."
        ],
        "gabarito": "Alternativa C — Terminar de calçar as duas luvas e só então corrigir a posição dos dedos.\n\nA correção só é feita quando as duas mãos já estão enluvadas, porque aí o ajuste é feito por superfícies estéreis tocando superfícies estéreis.\n\n• a) Corrigir com uma mão ainda nua contamina a face externa.\n• b) Medida desproporcional — não houve quebra de técnica.\n• d) Mão desnuda jamais toca a face externa da luva.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 089
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Na retirada das luvas ao final do procedimento, a sequência correta prevê que:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A mão desnuda toque apenas a parte interna da luva remanescente.",
            "B) A primeira luva seja retirada puxando-se pela ponta dos dedos com a outra mão enluvada.",
            "C) Ambas as luvas sejam retiradas simultaneamente pelos punhos.",
            "D) A mão desnuda puxe a luva restante pela face externa, próximo aos dedos."
        ],
        "gabarito": "Alternativa A — A mão desnuda toque apenas a parte interna da luva remanescente.\n\nDobra-se o punho de uma luva, retira-se a outra sem que toque a pele e, com a mão já desnuda, remove-se a luva restante tocando somente sua face interna.\n\n• b) Puxar pelos dedos favorece o contato da luva contaminada com a pele.\n• c) A retirada simultânea impede o controle das superfícies.\n• d) A face externa está contaminada e não pode tocar a pele.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 090
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A degermação diferencia-se da antissepsia simples porque:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Utiliza necessariamente álcool a 70%.",
            "B) Associa a ação antisséptica à remoção mecânica de sujidade e de parte da microbiota.",
            "C) É aplicada apenas em superfícies inanimadas.",
            "D) Elimina esporos bacterianos."
        ],
        "gabarito": "Alternativa B — Associa a ação antisséptica à remoção mecânica de sujidade e de parte da microbiota.\n\nNa degermação há fricção: o componente mecânico soma-se ao químico, removendo sujidade, oleosidade e microbiota transitória.\n\n• a) Pode ser feita com clorexidina ou PVPI degermante, não apenas álcool.\n• c) Atua sobre tecido vivo.\n• d) A destruição de esporos é atributo da esterilização.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 091
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Durante a escovação cirúrgica, o material da disciplina destaca a necessidade de escovar especificamente:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Apenas a face palmar, por ser a de maior contato.",
            "B) As laterais do 1º e do 5º quirodáctilos e as laterais do antebraço até o cotovelo.",
            "C) Somente os espaços interdigitais.",
            "D) A face dorsal das mãos, dispensando o antebraço."
        ],
        "gabarito": "Alternativa B — As laterais do 1º e do 5º quirodáctilos e as laterais do antebraço até o cotovelo.\n\nSão justamente as regiões que a escovação apressada esquece: as bordas laterais dos dedos extremos e as laterais do antebraço.\n\n• a) A escovação é circunferencial, não apenas palmar.\n• c) Os interdigitais são um dos passos, não o único.\n• d) O antebraço até o cotovelo é obrigatório.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 092
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Ao enxaguar as mãos após a escovação cirúrgica, é correto:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Apoiar-se na pia para maior estabilidade.",
            "B) Remover toda a espuma sem tocar a pia ou a torneira.",
            "C) Fechar a torneira com a mão dominante.",
            "D) Enxaguar do cotovelo em direção às mãos."
        ],
        "gabarito": "Alternativa B — Remover toda a espuma sem tocar a pia ou a torneira.\n\nQualquer contato com a pia ou a torneira recontamina as mãos já escovadas. O enxágue segue das mãos para os cotovelos, e não o inverso.\n\n• a) Contato com a pia contamina.\n• c) A torneira deve ser acionada por pedal, joelho ou sensor.\n• d) Levaria água do antebraço, menos limpo, para as mãos.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 093
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Quem não realizou a lavagem cirúrgica das mãos:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Pode manusear os aventais desde que use luvas de procedimento.",
            "B) Não deve tocar nos aventais estéreis dispostos no LAP.",
            "C) Pode escolher o avental de melhor tamanho na pilha.",
            "D) Pode ajudar a abrir o avental de quem está paramentado."
        ],
        "gabarito": "Alternativa B — Não deve tocar nos aventais estéreis dispostos no LAP.\n\nOs aventais do LAP são estéreis; tocá-los sem estar lavado os contamina, inclusive os que estão abaixo na pilha.\n\n• a) Luva de procedimento não é estéril.\n• c) Nem mesmo o profissional lavado escolhe: usa-se o de cima.\n• d) A abertura do avental é feita pelo próprio profissional paramentado.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 094
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Ao abrir o avental cirúrgico, o profissional deve:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Sacudi-lo para desfazer as dobras rapidamente.",
            "B) Afastar-se de equipamentos e pessoas e deixar a dobra se desfazer sozinha, como um lençol.",
            "C) Apoiá-lo sobre a mesa de instrumentação para desdobrá-lo.",
            "D) Pedir que a circulante o abra segurando pela face externa."
        ],
        "gabarito": "Alternativa B — Afastar-se de equipamentos e pessoas e deixar a dobra se desfazer sozinha, como um lençol.\n\nDeixar o avental se desdobrar pelo próprio peso, longe de superfícies, evita que a face externa estéril toque qualquer coisa.\n\n• a) Sacudir dispersa partículas e aumenta o risco de contato.\n• c) A mesa está ocupada por instrumental estéril e não deve receber o avental.\n• d) A circulante não toca a face externa estéril.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 095
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Ao vestir o avental, o profissional insere os braços nas mangas sem tocar a face externa porque:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A face externa ficará em contato com o paciente e deve permanecer estéril.",
            "B) A face externa é impermeável e a fricção a danifica.",
            "C) O tecido externo é mais caro e se desgasta com o toque.",
            "D) O contato com a face externa dificulta o fechamento das alças."
        ],
        "gabarito": "Alternativa A — A face externa ficará em contato com o paciente e deve permanecer estéril.\n\nÉ a face externa que entrará em contato com o campo e com o paciente. As mãos, ainda que degermadas, não são estéreis.\n\n• b) Não é uma questão de resistência do material.\n• c) Custo não é o critério.\n• d) As alças não têm relação com isso.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 096
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Qual é a finalidade específica da lavagem cirúrgica das mãos?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Esterilizar a pele das mãos e dos antebraços.",
            "B) Eliminar a microbiota transitória e reduzir a microbiota residente.",
            "C) Substituir o uso de luvas em procedimentos rápidos.",
            "D) Remover apenas resíduos visíveis de sujidade."
        ],
        "gabarito": "Alternativa B — Eliminar a microbiota transitória e reduzir a microbiota residente.\n\nA pele não pode ser esterilizada. O que se busca é remover a microbiota transitória, adquirida pelo contato, e reduzir a residente, que habita folículos e glândulas.\n\n• a) Pele viva não é esterilizável.\n• c) A lavagem não substitui a barreira física da luva.\n• d) A remoção de sujidade é apenas parte do objetivo.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 097
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "São exemplos de agentes antissépticos usados no preparo da pele do paciente:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Glutaraldeído, óxido de etileno e vapor sob pressão.",
            "B) Álcool 70%, clorexidina e PVPI.",
            "C) Hipoclorito a 1% e formaldeído.",
            "D) Peróxido de hidrogênio a 30% e fenol puro."
        ],
        "gabarito": "Alternativa B — Álcool 70%, clorexidina e PVPI.\n\nSão os três antissépticos citados no material, todos compatíveis com tecido vivo.\n\n• a) São agentes de esterilização e desinfecção de artigos, não de pele.\n• c) Agentes de desinfecção de superfícies, agressivos à pele.\n• d) Concentrações incompatíveis com uso em tecido vivo.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 098
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre assepsia e antissepsia, assinale a afirmativa correta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Assepsia consiste no uso de substâncias químicas para eliminar microrganismos de superfícies vivas.",
            "B) Antissepsia visa impedir a entrada de agentes infecciosos em tecidos sadios.",
            "C) Assepsia envolve práticas para manter um ambiente livre de contaminação.",
            "D) Antissepsia é aplicada exclusivamente em objetos inanimados e superfícies."
        ],
        "gabarito": "Alternativa C — Assepsia envolve práticas para manter um ambiente livre de contaminação.\n\nAssepsia é o conjunto de barreiras que impede o agente de chegar ao campo: esterilização, campos estéreis, luvas, fluxo de ar. Antissepsia age no tecido vivo.\n\n• a) Essa é a descrição de antissepsia.\n• b) Impedir a entrada é o conceito de assepsia; a antissepsia inibe a colonização de quem já está lá.\n• d) Inverte: a antissepsia é aplicada em tecido vivo.\n\nRevisar: Assepsia, antissepsia e paramentação"
    },
    # 099
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Qual das alternativas descreve corretamente o conceito de antissepsia?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Prática de lavagem de superfícies inanimadas com sabão cirúrgico.",
            "B) Inibição da colonização por microrganismos, podendo ou não destruí-los.",
            "C) Técnica de esterilização de materiais cirúrgicos em autoclave.",
            "D) Eliminação completa de microrganismos em tecidos vivos por assepsia."
        ],
        "gabarito": "Alternativa B — Inibição da colonização por microrganismos, podendo ou não destruí-los.\n\nA definição é precisa: a antissepsia inibe a colonização por determinado período, com ou sem destruição do agente. Álcool 70%, clorexidina e PVPI são os exemplos clássicos.\n\n• a) Superfícies inanimadas são objeto de desinfecção.\n• c) Autoclave é esterilização.\n• d) Eliminação completa é esterilização, e tecido vivo não é esterilizável.\n\nRevisar: Assepsia, antissepsia e paramentação"
    },
    # 100
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em relação à lavagem cirúrgica das mãos, assinale a alternativa correta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) É realizada apenas com água corrente e toalha de papel.",
            "B) Inicia-se pelos dedos e termina nos antebraços, sem necessidade de sabão específico.",
            "C) Deve incluir a fricção das mãos e antebraços por no mínimo 3 a 5 minutos.",
            "D) Pode ser feita somente com álcool 70%, sem necessidade de sabão em procedimentos cirúrgicos."
        ],
        "gabarito": "Alternativa C — Deve incluir a fricção das mãos e antebraços por no mínimo 3 a 5 minutos.\n\nSão 3 a 5 minutos na primeira cirurgia e 2 a 3 minutos nas cirurgias em sequência, com degermante — a fricção mecânica é parte essencial do procedimento.\n\n• a) Sem agente degermante não há redução adequada da microbiota.\n• b) A direção distal-proximal está certa, mas o degermante é obrigatório.\n• d) A fricção alcoólica não substitui a degermação na lavagem cirúrgica.\n\nRevisar: Assepsia, antissepsia e paramentação"
    },
    # 101
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre a lavagem cirúrgica das mãos, é correto afirmar que:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A ordem correta da escovação é: antebraços, unhas, dorso e palmas.",
            "B) A lavagem deve durar entre 1 a 2 minutos em qualquer cirurgia.",
            "C) A lavagem deve manter as mãos sempre abaixo do nível do cotovelo para melhor escoamento.",
            "D) Após a lavagem, as mãos devem ser mantidas acima do nível da cintura e dentro do campo de visão."
        ],
        "gabarito": "Alternativa D — Após a lavagem, as mãos devem ser mantidas acima do nível da cintura e dentro do campo de visão.\n\nMãos no campo de visão e acima da cintura evitam tanto o escorrimento de água do antebraço para os dedos quanto o contato inadvertido com superfícies.\n\n• a) A ordem é unhas → palmas → dorso → interdigitais → antebraços.\n• b) São 3 a 5 minutos na primeira e 2 a 3 nas subsequentes.\n• c) Manter as mãos abaixadas leva a água menos limpa do antebraço para as mãos.\n\nRevisar: Assepsia, antissepsia e paramentação"
    },
    # 102
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Assinale a alternativa correta quanto à paramentação cirúrgica:",
        "interactionType": "multiple-choice",
        "options": [
            "A) O avental pode ser vestido tocando-se a face externa com as mãos limpas, desde que seja antes do uso de luvas.",
            "B) A vestimenta do avental deve ser feita após a lavagem das mãos e a enfermeira circulante realiza a amarração lateral.",
            "C) As luvas devem ser calçadas antes do avental.",
            "D) A face interna do avental, ao entrar em contato com o pijama privativo, não é considerada contaminada."
        ],
        "gabarito": "Alternativa B — A vestimenta do avental deve ser feita após a lavagem das mãos e a enfermeira circulante realiza a amarração lateral.\n\nA ordem é lavagem com secagem → avental → luvas → preparo do paciente, e as alças laterais são amarradas por alguém não paramentado.\n\n• a) A face externa ficará em contato com o paciente e não pode ser tocada por mãos apenas degermadas.\n• c) Calçar luvas antes inviabiliza o manuseio correto do capote.\n• d) A face interna, em contato com o pijama, é considerada contaminada.\n\nRevisar: Assepsia, antissepsia e paramentação"
    },
    # 103
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre o uso de luvas estéreis, marque a correta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) É permitido tocar a parte interna da luva com a mão enluvada.",
            "B) O toque com luva estéril em qualquer parte do avental é seguro.",
            "C) Apenas a mão nua deve tocar a parte interna da luva, e a mão enluvada só pode tocar a parte externa.",
            "D) Caso os dedos entrem errados na luva, a recomendação é descartá-la imediatamente."
        ],
        "gabarito": "Alternativa C — Apenas a mão nua deve tocar a parte interna da luva, e a mão enluvada só pode tocar a parte externa.\n\nÉ a lei que preserva a esterilidade: cada superfície só é tocada por algo do mesmo status. A mão degermada, mas não estéril, fica restrita à face interna.\n\n• a) A mão enluvada é estéril e não deve tocar a face interna, que encostará na pele.\n• b) Gola, dorso e terço inferior são zonas perigosas e não devem ser tocados.\n• d) Não se descarta: corrige-se a posição dos dedos após as duas luvas estarem calçadas.\n\nRevisar: Assepsia, antissepsia e paramentação"
    },
    # 104
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Com relação ao passo a passo para abertura do avental cirúrgico, assinale a correta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) O avental deve ser tocado apenas por sua parte interna, segurando pelas laterais.",
            "B) Após suspender o avental, deve-se aproximá-lo da mesa cirúrgica para apoio.",
            "C) O avental deve ser aberto segurando-se a borda interna e deixando que ele se desdobre naturalmente, como um lençol.",
            "D) O avental deve ser retirado do pacote segurando sua parte inferior."
        ],
        "gabarito": "Alternativa C — O avental deve ser aberto segurando-se a borda interna e deixando que ele se desdobre naturalmente, como um lençol.\n\nSuspende-se em bloco pela borda interna, afasta-se de equipamentos e pessoas e deixa-se a dobra se desfazer pelo próprio peso — assim a face externa não toca nada.\n\n• a) A borda interna está certa, mas segurar pelas laterais abre o avental de forma descontrolada.\n• b) A mesa está ocupada por instrumental estéril e não serve de apoio para o avental.\n• d) Usa-se o avental do topo da pilha, suspenso pela borda interna — não pela parte inferior.\n\nRevisar: Assepsia, antissepsia e paramentação"
    },
    # 105
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Quais áreas do capote cirúrgico são consideradas zonas perigosas por risco de contaminação?",
        "interactionType": "multiple-choice",
        "options": [
            "A) As mangas e a porção superior do peito.",
            "B) A gola, as costas e o terço inferior do capote cirúrgico.",
            "C) As axilas e a parte frontal do tórax.",
            "D) O dorso das mangas e o colarinho interno."
        ],
        "gabarito": "Alternativa B — A gola, as costas e o terço inferior do capote cirúrgico.\n\nSão regiões fora do campo de visão ou próximas de áreas de contaminação, e por isso não devem ser tocadas com as mãos enluvadas.\n\n• a) A frente do tórax acima da cintura e as mangas são justamente a área estéril de trabalho.\n• c) A face anterior do tórax é área estéril.\n• d) Descrição imprecisa: a zona perigosa é o dorso do capote, e não o dorso das mangas.\n\nRevisar: Assepsia, antissepsia e paramentação"
    },
    # 106
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em relação ao manuseio de luvas estéreis, qual alternativa está correta?",
        "interactionType": "multiple-choice",
        "options": [
            "A) A mão enluvada pode tocar tanto a parte interna quanto a externa da segunda luva.",
            "B) As luvas devem ser calçadas com a ajuda da enfermeira circulante.",
            "C) A parte interna da luva só deve ser tocada pela mão nua.",
            "D) É permitido ajustar os dedos dentro da luva após tocar a parte externa com a mão nua."
        ],
        "gabarito": "Alternativa C — A parte interna da luva só deve ser tocada pela mão nua.\n\nA face interna encostará na pele do profissional; a face externa, no paciente. Cada uma só pode ser tocada por aquilo que tem o mesmo status de esterilidade.\n\n• a) A mão enluvada desliza pela face externa da segunda luva, nunca pela interna.\n• b) A circulante amarra as alças do avental; o calçamento é feito pelo próprio profissional.\n• d) Mão nua tocando a face externa contamina a luva.\n\nRevisar: Assepsia, antissepsia e paramentação"
    },
    # 107
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Durante o processo de paramentação cirúrgica, em que momento as luvas estéreis devem ser colocadas?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Antes da colocação do avental estéril.",
            "B) Não há necessidade de usar luvas se o cirurgião já lavou as mãos adequadamente.",
            "C) Logo após a lavagem das mãos, antes de qualquer outra parte da paramentação.",
            "D) Após a colocação do avental, com técnica asséptica, sem tocar nas superfícies externas das luvas."
        ],
        "gabarito": "Alternativa D — Após a colocação do avental, com técnica asséptica, sem tocar nas superfícies externas das luvas.\n\nA ordem é lavagem e secagem, avental, luvas e preparo do paciente. O calçamento respeita a regra das superfícies: mão nua na face interna, mão enluvada na externa.\n\n• a) Inverte a ordem da paramentação.\n• b) A lavagem reduz a microbiota, mas não esteriliza a pele — a luva é barreira insubstituível.\n• c) As luvas vêm depois do avental, não imediatamente após a lavagem.\n\nRevisar: Assepsia, antissepsia e paramentação"
    },
    # 108
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Qual das seguintes práticas está correta em relação à lavagem das mãos para um procedimento cirúrgico?",
        "interactionType": "multiple-choice",
        "options": [
            "A) A lavagem pode ser realizada apenas nas mãos, pois os antebraços não entram em contato com o campo cirúrgico.",
            "B) O tempo de duração da lavagem deve ser de no mínimo 3 a 5 minutos, contemplando as mãos e antebraços até os cotovelos.",
            "C) A lavagem cirúrgica deve ser feita apenas com água e sabão neutro, sem necessidade de soluções antissépticas.",
            "D) O uso de soluções alcoólicas dispensa a necessidade de lavagem das mãos no pré-operatório."
        ],
        "gabarito": "Alternativa B — O tempo de duração da lavagem deve ser de no mínimo 3 a 5 minutos, contemplando as mãos e antebraços até os cotovelos.\n\nO tempo e a extensão são padronizados: 3 a 5 minutos na primeira cirurgia, incluindo os antebraços até os cotovelos, com escovação das laterais do 1º e do 5º quirodáctilos.\n\n• a) As mangas do avental são permeáveis ao suor e o antebraço integra a área de trabalho.\n• c) Sabão neutro não tem ação antimicrobiana residual; usa-se PVPI ou clorexidina degermante.\n• d) A fricção alcoólica é complementar, não substitutiva, na lavagem cirúrgica.\n\nRevisar: Assepsia, antissepsia e paramentação"
    },
    # 109
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A esterilização do instrumental cirúrgico é medida de:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Antissepsia.",
            "B) Assepsia.",
            "C) Degermação.",
            "D) Desinfecção de tecido vivo."
        ],
        "gabarito": "Alternativa B — Assepsia.\n\nAssepsia impede que o agente chegue ao campo; antissepsia age sobre tecido vivo.\n\n• a) Antissepsia atua no paciente.\n• c) Degermação envolve fricção sobre tecido vivo.\n• d) Tecido vivo não é desinfetado.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 110
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Assinale a alternativa em que a medida está corretamente classificada:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Passar clorexidina na pele do paciente — assepsia.",
            "B) Usar campos estéreis — antissepsia.",
            "C) Aplicar PVPI na região da incisão — antissepsia.",
            "D) Esterilizar o instrumental — antissepsia."
        ],
        "gabarito": "Alternativa C — Aplicar PVPI na região da incisão — antissepsia.\n\nAntissepsia é o que se faz sobre tecido vivo; campos e instrumental esterilizados são assepsia.\n\n• a) Clorexidina na pele é antissepsia.\n• b) Campos estéreis são assepsia.\n• d) Esterilização é assepsia.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 111
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O que distingue a degermação da antissepsia simples é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) O uso obrigatório de álcool.",
            "B) A associação da ação química à remoção mecânica por fricção.",
            "C) Ser aplicada apenas em objetos.",
            "D) Eliminar esporos."
        ],
        "gabarito": "Alternativa B — A associação da ação química à remoção mecânica por fricção.\n\nNa degermação há fricção: sujidade, oleosidade e microbiota transitória são removidas mecanicamente.\n\n• a) Pode ser feita com clorexidina ou PVPI degermante.\n• c) Atua sobre tecido vivo.\n• d) Eliminar esporos é esterilização.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 112
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em cirurgias realizadas em sequência, a lavagem cirúrgica das mãos deve durar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 30 segundos.",
            "B) 1 a 2 minutos.",
            "C) 2 a 3 minutos.",
            "D) 5 a 10 minutos."
        ],
        "gabarito": "Alternativa C — 2 a 3 minutos.\n\nSão 3 a 5 minutos na primeira cirurgia e 2 a 3 minutos nas subsequentes.\n\n• a) Insuficiente.\n• b) Insuficiente.\n• d) Excede o padrão.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 113
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre a lavagem cirúrgica das mãos, assinale a alternativa INCORRETA:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Tem por finalidade eliminar a microbiota transitória e reduzir a residente.",
            "B) A escovação progride das unhas aos antebraços.",
            "C) Inclui as laterais do 1º e do 5º quirodáctilos.",
            "D) Esteriliza a pele das mãos e dos antebraços."
        ],
        "gabarito": "Alternativa D — Esteriliza a pele das mãos e dos antebraços.\n\nPele viva não é esterilizável — por isso a luva é barreira insubstituível.\n\n• a) Correto.\n• b) Correto.\n• c) Correto.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 114
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Após o enxágue, o profissional deve manter as mãos:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Abaixo do nível dos cotovelos.",
            "B) No próprio campo de visão, acima da cintura.",
            "C) Apoiadas na pia.",
            "D) Junto ao corpo."
        ],
        "gabarito": "Alternativa B — No próprio campo de visão, acima da cintura.\n\nEvita tanto o escorrimento de água do antebraço para os dedos quanto o contato inadvertido com superfícies.\n\n• a) Levaria água menos limpa às mãos.\n• c) Contato com a pia recontamina.\n• d) Aproxima as mãos do pijama.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 115
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Assinale a sequência correta da paramentação:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Luvas, avental, lavagem, preparo do paciente.",
            "B) Lavagem e secagem, avental, luvas, preparo do paciente.",
            "C) Avental, lavagem, luvas, preparo do paciente.",
            "D) Lavagem, luvas, avental, preparo do paciente."
        ],
        "gabarito": "Alternativa B — Lavagem e secagem, avental, luvas, preparo do paciente.\n\nCalçar luvas antes do avental inviabiliza a manipulação correta do capote.\n\n• a) Inverte tudo.\n• c) Não se toca o avental sem estar lavado.\n• d) Troca a ordem entre avental e luvas.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 116
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Um profissional paramentado ajeita a gola do próprio capote com a mão enluvada. Sobre esse gesto, é correto afirmar que:",
        "interactionType": "multiple-choice",
        "options": [
            "A) É permitido, pois a gola faz parte do avental estéril.",
            "B) Configura quebra de técnica, pois a gola é zona perigosa.",
            "C) É permitido se feito rapidamente.",
            "D) É permitido desde que depois se troque apenas o avental."
        ],
        "gabarito": "Alternativa B — Configura quebra de técnica, pois a gola é zona perigosa.\n\nGola, dorso e terço inferior não são considerados estéreis — tocá-los contamina a luva.\n\n• a) A gola não é área estéril.\n• c) A rapidez não altera a contaminação.\n• d) A luva também foi contaminada.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 117
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre a vestimenta do avental cirúrgico, assinale a alternativa INCORRETA:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Usa-se o avental que está no topo da pilha do LAP.",
            "B) O avental é suspenso em bloco pela borda interna.",
            "C) As alças laterais são amarradas pela circulante.",
            "D) A face interna, em contato com o pijama, permanece estéril."
        ],
        "gabarito": "Alternativa D — A face interna, em contato com o pijama, permanece estéril.\n\nA face interna é considerada contaminada justamente por tocar o pijama privativo.\n\n• a) Correto.\n• b) Correto.\n• c) Correto.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 118
    {
        "type": "VERDADEIRO OU FALSO",
        "text": "Julgue os itens sobre o calçamento e a retirada das luvas estéreis:\n\n( ) A mão nua só pode tocar a parte interna da luva.\n( ) A mão já enluvada desliza sob a borda da segunda luva, tocando sua face externa.\n( ) Dedos que entraram trocados devem ser corrigidos antes de calçar a segunda luva.\n( ) Na retirada, a mão desnuda toca apenas a face interna da luva remanescente.",
        "interactionType": "textarea",
        "gabarito": "Sequência: V – V – F – V\n\n• V) A face externa entrará em contato com o paciente.\n• V) Superfície estéril tocando superfície estéril.\n• F) A correção só é feita com as duas mãos já enluvadas.\n• V) A face externa está contaminada e não pode tocar a pele.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    # 119
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "As lâminas de bisturi nº 11 e nº 15 encaixam no cabo:",
        "interactionType": "multiple-choice",
        "options": [
            "A) nº 3.",
            "B) nº 4.",
            "C) nº 3 ou nº 4, indistintamente.",
            "D) nº 7, exclusivo para microcirurgia."
        ],
        "gabarito": "Alternativa A — nº 3.\n\nLâminas 11 e 15 são do cabo nº 3; as lâminas 21 e 22 são do cabo nº 4. É informação memorística e por isso muito cobrada.\n\n• b) O cabo nº 4 recebe as lâminas 21 e 22.\n• c) Os encaixes não são intercambiáveis.\n• d) Não corresponde ao material da disciplina.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    # 120
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A lâmina pontiaguda, adequada a incisões puntiformes como a drenagem de abscessos, é a de número:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 15.",
            "B) 11.",
            "C) 22.",
            "D) 21."
        ],
        "gabarito": "Alternativa B — 11.\n\nA lâmina 11 tem ponta triangular e permite a punção seguida de incisão. A 15 é pequena e curva, para cirurgia delicada e pele.\n\n• a) A 15 é curva e usada em incisões delicadas.\n• c) Lâmina grande, para incisões amplas, no cabo nº 4.\n• d) Lâmina grande, no cabo nº 4.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    }
]

with open('src/bc_360_2.ts', 'w') as f:
    f.write('export const bc360Part2 = ' + json.dumps(questions, ensure_ascii=False, indent=4) + ';\n')

print(f"Generated {len(questions)} questions in src/bc_360_2.ts")
