import json

questions = [
    # 01
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre os tempos cirúrgicos, assinale a alternativa correta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) O 1º tempo cirúrgico corresponde à hemostasia, momento em que ocorre a retirada de tecidos comprometidos.",
            "B) O 2º tempo é responsável pela incisão e separação dos planos anatômicos.",
            "C) O 3º tempo corresponde à exérese, que envolve remoção de tecidos patológicos.",
            "D) A síntese, realizada no 2º tempo, visa à união dos tecidos após a incisão."
        ],
        "gabarito": "Alternativa C — O 3º tempo corresponde à exérese, que envolve remoção de tecidos patológicos.\n\nA sequência é diérese (1º), hemostasia (2º), exérese (3º) e síntese (4º). A exérese é o tempo que carrega o objetivo terapêutico da operação.\n\n• a) Confunde dois tempos: o 1º é a diérese, e a retirada de tecidos é a exérese.\n• b) A incisão e a separação dos planos são o 1º tempo, não o 2º.\n• d) A síntese é o 4º tempo, não o 2º.\n\nRevisar: Tempos fundamentais da técnica operatória"
    },
    # 02
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O que caracteriza o tempo cirúrgico da diérese?",
        "interactionType": "multiple-choice",
        "options": [
            "A) A remoção de tecidos para posterior análise histológica.",
            "B) A sutura dos tecidos para o encerramento da cirurgia.",
            "C) A separação dos planos anatômicos ou tecidos para possibilitar o acesso a um órgão ou região anatômica.",
            "D) A administração de medicamentos durante a cirurgia."
        ],
        "gabarito": "Alternativa C — A separação dos planos anatômicos ou tecidos para possibilitar o acesso a um órgão ou região anatômica.\n\nDiérese é abrir caminho: a secção ou divulsão dos planos que dá acesso à região-alvo. Pode ser cruenta (bisturi, tesoura, energia) ou romba (divulsão).\n\n• a) Descreve a exérese.\n• b) Descreve a síntese.\n• d) Não é um tempo cirúrgico.\n\nRevisar: Tempos fundamentais da técnica operatória"
    },
    # 03
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Durante uma cirurgia, por que a hemostasia adequada é essencial antes de realizar a exérese de uma estrutura patológica?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Para diminuir o risco de infecção no pós-operatório.",
            "B) Para evitar que o sangramento excessivo comprometa a segurança do ato cirúrgico.",
            "C) Para acelerar a cicatrização dos tecidos.",
            "D) Para garantir que os tecidos removidos sejam preservados para análise histopatológica."
        ],
        "gabarito": "Alternativa B — Para evitar que o sangramento excessivo comprometa a segurança do ato cirúrgico.\n\nCampo sangrando é campo cego. A hemostasia preventiva mantém a visibilidade, evita perda volêmica e permite que a exérese seja feita com controle anatômico.\n\n• a) Efeito indireto, e não a razão da hemostasia.\n• c) A cicatrização depende de outros fatores.\n• d) A preservação da peça depende do manuseio e da fixação, não da hemostasia.\n\nRevisar: Tempos fundamentais da técnica operatória"
    },
    # 04
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Durante uma laparotomia exploradora (acesso à cavidade abdominal através da abertura da pele, subcutâneo, aponeurose e peritônio), o cirurgião iniciou o tempo de síntese. Qual afirmação sobre o tempo de síntese está correta?",
        "interactionType": "multiple-choice",
        "options": [
            "A) A síntese deve começar pela camada mais superficial da pele para as mais profundas, para garantir uma cicatrização rápida.",
            "B) Durante a síntese, apenas a pele e o tecido subcutâneo precisam ser fechados, pois as outras camadas cicatrizam espontaneamente.",
            "C) A síntese é opcional e pode ser evitada, desde que a hemostasia tenha sido bem realizada.",
            "D) O tempo de síntese inclui a sutura das diferentes camadas de tecidos, da mais profunda até a mais superficial, para restaurar a anatomia de forma adequada."
        ],
        "gabarito": "Alternativa D — O tempo de síntese inclui a sutura das diferentes camadas de tecidos, da mais profunda até a mais superficial, para restaurar a anatomia de forma adequada.\n\nA síntese reconstrói os planos na ordem inversa da diérese: peritônio, aponeurose, subcutâneo e pele. Fechar de fora para dentro deixaria espaço morto e planos não aproximados.\n\n• a) Inverte a ordem correta, que é da profundidade para a superfície.\n• b) A aponeurose é o plano de sustentação da parede; não fechá-la leva a hérnia incisional.\n• c) A síntese não é opcional — sem ela não há restauração anatômica.\n\nRevisar: Tempos fundamentais da técnica operatória"
    },
    # 05
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
    # 06
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
    # 07
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
    # 08
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
    # 09
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
    # 10
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
    # 11
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
    # 12
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
    # 13
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
    # 14
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
    # 15
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
    # 16
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
    # 17
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
    # 18
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
    # 19
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
    # 20
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
    # 21
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
    # 22
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre os instrumentos utilizados para hemostasia, marque a alternativa correta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) As pinças Halsted e Rochester são utilizadas apenas na síntese.",
            "B) Pinças como Kelly, Crile e Halsted podem ser usadas para clampear vasos sanguíneos.",
            "C) A pinça de Allis é exclusiva para hemostasia delicada.",
            "D) As pinças de hemostasia não possuem variações em curva ou reta."
        ],
        "gabarito": "Alternativa B — Pinças como Kelly, Crile e Halsted podem ser usadas para clampear vasos sanguíneos.\n\nAs três são pinças hemostáticas, diferindo em delicadeza: Halsted (mosquito) para vasos finos, Kelly/Crile intermediárias e Rochester para pedículos espessos.\n\n• a) São pinças de hemostasia, não de síntese — esta usa o porta-agulhas.\n• c) A Allis é pinça de preensão, e prende com firmeza às custas de trauma.\n• d) Todas existem em versão curva e reta.\n\nRevisar: Instrumental cirúrgico básico"
    },
    # 23
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Qual das opções abaixo representa um instrumento de preensão usado para segurar tecidos?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Tesoura de Metzenbaum.",
            "B) Pinça Halsted.",
            "C) Pinça anatômica ou dente de rato.",
            "D) Porta-agulhas."
        ],
        "gabarito": "Alternativa C — Pinça anatômica ou dente de rato.\n\nO grupo de preensão serve para segurar, suspender vísceras e manipular tecidos. A anatômica é lisa e atraumática; a dente de rato prende pele e aponeurose com segurança.\n\n• a) Instrumento de diérese, para dissecção romba-aguda.\n• b) Pinça hemostática.\n• d) Instrumento de síntese.\n\nRevisar: Instrumental cirúrgico básico"
    },
    # 24
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Assinale a afirmativa correta sobre os afastadores:",
        "interactionType": "multiple-choice",
        "options": [
            "A) O afastador Farabeuf é autoestático e permanece fixo no campo cirúrgico.",
            "B) A válvula de Doyen é rígida e usada em neurocirurgias.",
            "C) Afastadores maleáveis são manuais e exigem manipulação contínua.",
            "D) A válvula de Gosset é usada manualmente pelo cirurgião principal."
        ],
        "gabarito": "Alternativa C — Afastadores maleáveis são manuais e exigem manipulação contínua.\n\nAfastador dinâmico é o que precisa de alguém segurando — Farabeuf, Doyen e maleáveis. Autoestático é o que se mantém aberto sozinho: Gosset, Balfour, Finochietto, Adson.\n\n• a) O Farabeuf é dinâmico: exige um auxiliar segurando.\n• b) A válvula de Doyen é usada para afastar vísceras abdominais, não em neurocirurgia.\n• d) O Gosset é autoestático, mantido por cremalheira.\n\nRevisar: Instrumental cirúrgico básico"
    },
    # 25
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em relação à organização e princípios da instrumentação, é correto afirmar que:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Os materiais específicos são utilizados em todas as cirurgias gerais.",
            "B) O instrumental para síntese inclui bisturi e pinça dente de rato.",
            "C) As tesouras cirúrgicas são utilizadas exclusivamente na hemostasia.",
            "D) A montagem da mesa cirúrgica segue a lógica dos tempos operatórios: diérese, preensão, hemostasia, exposição, especiais e síntese."
        ],
        "gabarito": "Alternativa D — A montagem da mesa cirúrgica segue a lógica dos tempos operatórios: diérese, preensão, hemostasia, exposição, especiais e síntese.\n\nA mesa é organizada por campos funcionais na ordem em que o cirurgião precisará deles, o que permite ao instrumentador antecipar o pedido sem procurar visualmente.\n\n• a) Materiais específicos são, por definição, de cirurgias determinadas.\n• b) O bisturi é de diérese e a dente de rato é de preensão; a síntese usa porta-agulhas e fios.\n• c) A tesoura é instrumento de diérese, usada em dissecção e corte.\n\nRevisar: Instrumental cirúrgico básico"
    },
    # 26
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em relação à montagem da mesa cirúrgica, qual das opções abaixo é o instrumento mais comumente utilizado no campo de DIÉRESE?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Pinça de Allis.",
            "B) Pinça dente de rato.",
            "C) Porta-agulhas de Mayo.",
            "D) Pinça de Kocher.",
            "E) Tesoura de Metzenbaum."
        ],
        "gabarito": "Alternativa E — Tesoura de Metzenbaum.\n\nO campo de diérese reúne cabos de bisturi, lâminas e tesouras. A Metzenbaum é a tesoura de dissecção por excelência, de pontas romba-agudas, própria para separar planos.\n\n• a) Pinça de preensão.\n• b) Pinça de preensão, para pele e aponeurose.\n• c) Instrumento de síntese.\n• d) Instrumento especial, de preensão firme de tecidos resistentes.\n\nRevisar: Instrumental cirúrgico básico"
    },
    # 27
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Na montagem da mesa cirúrgica, para qual campo são organizados os afastadores de Farabeuf e Doyen, e qual é sua função principal?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Campo de hemostasia, com função de cortar tecidos para reduzir o sangramento.",
            "B) Campo de exposição, com função de afastar tecidos para melhor visualização do campo operatório.",
            "C) Campo de preensão, com função de segurar e fixar os tecidos durante a cirurgia.",
            "D) Campo de diérese, com função de dissecar e cortar tecidos.",
            "E) Campo de síntese, com função de fechar as camadas dos tecidos."
        ],
        "gabarito": "Alternativa B — Campo de exposição, com função de afastar tecidos para melhor visualização do campo operatório.\n\nAfastadores compõem o campo de exposição. Sua função é abrir e manter a via de acesso para que o cirurgião enxergue e trabalhe.\n\n• a) Hemostasia é o campo das pinças hemostáticas.\n• c) Preensão é o campo das pinças que seguram tecido.\n• d) Diérese é o campo de bisturis e tesouras.\n• e) Síntese é o campo de porta-agulhas e fios.\n\nRevisar: Instrumental cirúrgico básico"
    },
    # 28
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre as agulhas cirúrgicas, assinale a afirmativa correta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) As agulhas retas têm angulação de 180°.",
            "B) O corte transversal triangular ou prismático é usado para perfurar tecidos resistentes.",
            "C) As agulhas curvas são inadequadas para uso em cavidades profundas.",
            "D) Agulhas cilíndricas são indicadas para pele devido à sua capacidade de cortar."
        ],
        "gabarito": "Alternativa B — O corte transversal triangular ou prismático é usado para perfurar tecidos resistentes.\n\nA secção transversal define se a agulha corta ou afasta fibras. A triangular corta e serve a pele e aponeurose; a cilíndrica não corta e é reservada a vísceras e vasos.\n\n• a) A angulação da agulha reta é 0°; 180° corresponde à agulha curva.\n• c) É justamente o contrário: a curvatura permite trabalhar em profundidade e espaços estreitos.\n• d) A cilíndrica não corta — a pele exige agulha triangular.\n\nRevisar: Fios e agulhas cirúrgicas"
    },
    # 29
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O fio ideal, segundo os postulados de Van Winkle e Hasting, deve apresentar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Alta rigidez, para manter o nó apertado.",
            "B) Resistência superior à do tecido suturado.",
            "C) Resistência tênsil semelhante à do tecido e causar mínima reação.",
            "D) Ser o mais grosso possível para garantir estabilidade."
        ],
        "gabarito": "Alternativa C — Resistência tênsil semelhante à do tecido e causar mínima reação.\n\nO primeiro postulado exige que o fio seja tão forte quanto o tecido — nem mais, nem menos. Fio mais forte que o tecido corta a borda da ferida em vez de sustentá-la.\n\n• a) Rigidez elevada significa mais memória e nós que deslizam.\n• b) Resistência superior à do tecido é desvantagem, não virtude.\n• d) O fio ideal é fino, regular e flexível — o calibre segue o tecido, não o exagero.\n\nRevisar: Fios e agulhas cirúrgicas"
    },
    # 30
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre os fios cirúrgicos, marque a alternativa correta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Fios monofilamentares tendem a ter maior risco de infecção do que os multifilamentares.",
            "B) A escolha do fio não leva em conta a reação tecidual que ele pode provocar.",
            "C) Fios absorvíveis são aqueles que permanecem indefinidamente no corpo.",
            "D) Fios multifilamentares têm maior atrito e maior chance de infecção."
        ],
        "gabarito": "Alternativa D — Fios multifilamentares têm maior atrito e maior chance de infecção.\n\nA superfície trançada aumenta a área de contato e cria interstícios entre os filamentos, que abrigam bactérias e dificultam a chegada de fagócitos.\n\n• a) Inverte: o monofilamentar é mais resistente à infecção.\n• b) O terceiro postulado de Van Winkle e Hasting exige exatamente o contrário.\n• c) Absorvível é o que é degradado e desaparece do local da sutura.\n\nRevisar: Fios e agulhas cirúrgicas"
    },
    # 31
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em relação à classificação dos fios quanto à absorção, é correto afirmar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Fios absorvíveis não precisam ser retirados, pois são degradados pelo corpo.",
            "B) Fios absorvíveis são sempre de origem natural.",
            "C) Fios não absorvíveis não causam reação tecidual.",
            "D) Fios absorvíveis de origem sintética são menos usados que os de origem animal."
        ],
        "gabarito": "Alternativa A — Fios absorvíveis não precisam ser retirados, pois são degradados pelo corpo.\n\nÉ a definição: o fio absorvível é degradado e desaparece do local da sutura, dispensando remoção — por isso é o de escolha em planos profundos e em mucosas.\n\n• b) Há absorvíveis sintéticos amplamente usados: Vicryl, Dexon e Monocryl.\n• c) Todo corpo estranho gera reação; a seda, por exemplo, é bastante reativa.\n• d) Os sintéticos são hoje mais usados, por absorção previsível e menor reação.\n\nRevisar: Fios e agulhas cirúrgicas"
    },
    # 32
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Assinale a afirmativa verdadeira sobre os fios de origem sintética absorvível:",
        "interactionType": "multiple-choice",
        "options": [
            "A) São utilizados apenas para síntese de pele.",
            "B) Exemplos incluem Dexon e Monocryl.",
            "C) Devem sempre ser removidos após 10 dias.",
            "D) Possuem maior risco de contaminação que os de origem animal."
        ],
        "gabarito": "Alternativa B — Exemplos incluem Dexon e Monocryl.\n\nDexon e Vicryl são multifilamentares; o Monocryl é monofilamentar. Todos são absorvíveis sintéticos, com reação tecidual menor que a dos catguts.\n\n• a) São usados sobretudo em planos profundos, aponeurose, mucosa e subcutâneo.\n• c) Absorvíveis não são removidos — é essa a vantagem.\n• d) Os sintéticos provocam menos reação que os de origem animal.\n\nRevisar: Fios e agulhas cirúrgicas"
    },
    # 33
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre fios não absorvíveis, é correto afirmar que:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Desaparecem do local da sutura após 7 dias.",
            "B) O algodão é um exemplo de material sintético usado.",
            "C) Podem ser feitos de seda, linho, poliéster, aço ou náilon.",
            "D) Nunca causam reação inflamatória."
        ],
        "gabarito": "Alternativa C — Podem ser feitos de seda, linho, poliéster, aço ou náilon.\n\nO grupo reúne naturais (seda, linho, algodão) e sintéticos (poliamida, polipropileno, poliéster, aço). Todos permanecem até serem removidos ou indefinidamente.\n\n• a) Quem desaparece é o absorvível.\n• b) O algodão é de origem natural.\n• d) Todo fio é corpo estranho e gera algum grau de reação; os naturais, mais ainda.\n\nRevisar: Fios e agulhas cirúrgicas"
    },
    # 34
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Assinale a opção correta sobre monofilamentos:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Apresentam maior atrito e são menos resistentes à infecção.",
            "B) São mais flexíveis e causam mais reações.",
            "C) Têm menor atrito e maior resistência à infecção.",
            "D) Devem ser evitados em áreas com alta contaminação."
        ],
        "gabarito": "Alternativa C — Têm menor atrito e maior resistência à infecção.\n\nA superfície lisa reduz o trauma na passagem pelo tecido e não oferece nicho para bactérias. O preço é menor maleabilidade e mais memória, exigindo mais nós.\n\n• a) Descreve o multifilamentar.\n• b) Flexibilidade é do multifilamentar, e o monofilamento causa menos reação.\n• d) É justamente em áreas contaminadas que ele é preferido.\n\nRevisar: Fios e agulhas cirúrgicas"
    },
    # 35
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre a escolha do fio cirúrgico, é incorreto afirmar que depende de:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Tamanho (calibre) do fio.",
            "B) Composição e resistência.",
            "C) Tempo estimado de cicatrização.",
            "D) Preferência estética do cirurgião."
        ],
        "gabarito": "Alternativa D — Preferência estética do cirurgião.\n\nA escolha é técnica: tempo necessário para o tecido cicatrizar, tensão que ele suporta e necessidade temporária ou permanente de suporte mecânico.\n\n• a) Critério válido — o calibre acompanha a espessura e a tensão do tecido.\n• b) Critério válido.\n• c) Critério válido, e central na escolha entre absorvível e inabsorvível.\n\nRevisar: Fios e agulhas cirúrgicas"
    },
    # 36
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em relação às agulhas cirúrgicas, qual é a característica principal de uma agulha cortante?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Possui uma ponta arredondada para minimizar o trauma ao passar por tecidos moles.",
            "B) É projetada para ser utilizada exclusivamente em tecidos oculares.",
            "C) É usada para perfurar tecidos rígidos, como a pele, devido ao seu formato triangular afiado.",
            "D) Seu formato espatulado facilita a sutura em órgãos ocos.",
            "E) É utilizada principalmente para suturas subcutâneas devido ao seu design atraumático."
        ],
        "gabarito": "Alternativa C — É usada para perfurar tecidos rígidos, como a pele, devido ao seu formato triangular afiado.\n\nA agulha cortante tem secção triangular ou prismática, com gumes que abrem caminho em tecidos densos como pele, aponeurose e tecido cicatricial.\n\n• a) Ponta arredondada descreve a agulha cilíndrica, atraumática.\n• b) A agulha espatulada é a de uso oftálmico.\n• d) O formato espatulado é oftálmico; órgãos ocos pedem agulha cilíndrica.\n• e) Design atraumático é o da cilíndrica.\n\nRevisar: Fios e agulhas cirúrgicas"
    },
    # 37
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Qual das alternativas descreve corretamente uma das principais diferenças entre os fios cirúrgicos monofilamentares e multifilamentares?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Os fios monofilamentares possuem um único filamento, o que acarreta maior atrito aos tecidos em comparação com os multifilamentares.",
            "B) Os fios multifilamentares apresentam maior maleabilidade e menor risco de infecção.",
            "C) Os fios monofilamentares oferecem menor risco de abrigar microrganismos devido à sua superfície lisa.",
            "D) Os fios multifilamentares deslizam mais facilmente pelos tecidos e apresentam maior memória."
        ],
        "gabarito": "Alternativa C — Os fios monofilamentares oferecem menor risco de abrigar microrganismos devido à sua superfície lisa.\n\nSem interstícios entre filamentos, não há espaço protegido para colonização bacteriana — daí a preferência pelo monofilamentar em ferida contaminada.\n\n• a) O atrito maior é do multifilamentar.\n• b) A maleabilidade é maior, sim, mas o risco de infecção também.\n• d) Quem desliza melhor é o monofilamentar, e a memória maior também é dele.\n\nRevisar: Fios e agulhas cirúrgicas"
    },
    # 38
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Quanto ao uso dos drenos cirúrgicos, marque a correta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) O dreno de Penrose é indicado para grandes volumes e drenagem profunda.",
            "B) Drenos são utilizados apenas em procedimentos cardiovasculares.",
            "C) A drenagem ativa utiliza sucção, enquanto a espontânea usa capilaridade ou gravidade.",
            "D) O dreno de Blake é feito de látex e tem baixa eficiência."
        ],
        "gabarito": "Alternativa C — A drenagem ativa utiliza sucção, enquanto a espontânea usa capilaridade ou gravidade.\n\nÉ a divisão fundamental por mecanismo. Ativa: Porto-Vac e Blake. Espontânea: Penrose (capilaridade), dreno de tórax e pigtail (gravidade).\n\n• a) O Penrose é pouco eficiente em grandes volumes.\n• b) Drenos são usados em praticamente todas as especialidades cirúrgicas.\n• d) O Blake é de silicone e muito eficiente.\n\nRevisar: Drenos"
    },
    # 39
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre os materiais e formatos dos drenos, é verdadeiro que:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Apenas drenos tubulares são utilizados atualmente.",
            "B) O silicone é um material inerte, com menor risco de reação.",
            "C) Os drenos de látex são preferidos em pacientes alérgicos.",
            "D) Materiais como PVC devem ser evitados por não causarem reações."
        ],
        "gabarito": "Alternativa B — O silicone é um material inerte, com menor risco de reação.\n\nO silicone tem a melhor biocompatibilidade do grupo, o que permite permanência mais prolongada com menos reação local.\n\n• a) Há drenos filiformes, laminares e tubulares.\n• c) O látex é justamente o material com risco de alergia.\n• d) A frase se contradiz: não causar reação seria vantagem, não motivo para evitar.\n\nRevisar: Drenos"
    },
    # 40
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em relação ao dreno de Penrose, é correto afirmar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Sua drenagem é ativa, pois depende de sucção contínua.",
            "B) É indicado para grandes volumes de secreção abdominal.",
            "C) Funciona por capilaridade e é pouco eficiente em grandes volumes.",
            "D) É confeccionado exclusivamente em PVC.",
            "E) É um dreno fechado com alta segurança contra contaminação externa."
        ],
        "gabarito": "Alternativa C — Funciona por capilaridade e é pouco eficiente em grandes volumes.\n\nLâmina de látex ou silicone, de luz colabada, que drena por capilaridade. Baixo custo e grande acessibilidade; uso típico na drenagem de abscessos.\n\n• a) A drenagem é espontânea, por capilaridade.\n• b) É justamente o que ele não faz bem.\n• d) É feito de látex ou silicone.\n• e) É um sistema aberto, com risco de contaminação ascendente.\n\nRevisar: Drenos"
    },
    # 41
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Julgue os itens a seguir sobre drenos cirúrgicos em verdadeiro (V) ou falso (F):\n\n( ) O dreno de Blake combina drenagem por capilaridade com a possibilidade de sucção.\n( ) O dreno Porto-VAC é ideal para cavidades abdominais profundas devido à sua alta potência de sucção.\n( ) O dreno de tórax é geralmente usado por sucção contínua, com alto custo.\n( ) O dreno Pigtail possui extremidade que se enrola e é utilizado por gravidade.\n( ) O dreno de Penrose é o mais indicado para ambientes contaminados, como abscessos.\n\nAssinale a sequência correta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) V – F – F – V – V",
            "B) V – V – F – F – V",
            "C) F – F – V – V – V",
            "D) V – F – V – F – V"
        ],
        "gabarito": "Alternativa A — V – F – F – V – V.\n\nSequência: V – F – F – V – V. Os dois erros do item 2 e do item 3 são os mais cobrados: Porto-Vac no abdome e mecanismo do dreno de tórax.\n\n• V) As valas longitudinais drenam por capilaridade e o dreno pode ser acoplado a sistema de sucção — é o único híbrido.\n• F) A sucção potente é exatamente o que o contraindica no abdome: pode aspirar e lesar vísceras. Ele é dreno de subcutâneo.\n• F) Drena por gravidade, é de plástico e tem baixo custo e grande acessibilidade.\n• V) A ponta em rabo de porco evita o deslocamento; é de silicone, de alto custo e baixa acessibilidade.\n• V) Baixo custo, grande acessibilidade e drenagem por capilaridade fazem dele o dreno clássico de abscesso.\n\nRevisar: Drenos"
    },
    # 42
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Associe corretamente os drenos às suas principais características:\n\n1. Dreno de Blake\n2. Dreno Porto-VAC\n3. Dreno de tórax\n4. Dreno Pigtail\n5. Dreno de Penrose\n\n( ) Dreno passivo, simples, por capilaridade, feito de látex ou silicone.\n( ) Dreno com alto custo, de silicone, com ponta enrolada e fenestrações.\n( ) Utilizado por sucção, feito de plástico, com acessibilidade intermediária.\n( ) Dreno de silicone com ação combinada de sucção e capilaridade.\n( ) Dreno plástico, usado por gravidade, com extremidade fenestrada e linha radiopaca.\n\nA sequência correta da associação é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 5 – 4 – 2 – 1 – 3",
            "B) 5 – 2 – 4 – 3 – 1",
            "C) 4 – 5 – 1 – 2 – 3",
            "D) 2 – 4 – 5 – 1 – 3"
        ],
        "gabarito": "Alternativa A — 5 – 4 – 2 – 1 – 3.\n\nSequência correta: 5 – 4 – 2 – 1 – 3.\n\n• 5) Penrose: lâmina de luz colabada, extremidade interna simples ou bifurcada.\n• 4) Pigtail: a ponta em rabo de porco previne o deslocamento; drenagens percutâneas guiadas por imagem.\n• 2) Porto-Vac: a sanfona gera o vácuo; indicado para subcutâneo, inadequado para o abdome.\n• 1) Blake: valas que se afunilam em um tubo; alto custo, muito eficiente, adequado à cavidade abdominal.\n• 3) Dreno de tórax: a linha radiopaca permite conferir o posicionamento na radiografia.\n\nRevisar: Drenos"
    },
    # 43
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em um paciente com pneumotórax espontâneo, o dreno mais indicado seria:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Blake.",
            "B) Porto-VAC.",
            "C) Penrose.",
            "D) Tórax.",
            "E) Pigtail."
        ],
        "gabarito": "Alternativa D — Tórax.\n\nO dreno de tórax em selo d'água permite a saída do ar sem permitir seu retorno, reexpandindo o pulmão. Fenestrações e linha radiopaca completam o dispositivo.\n\n• a) Dreno de cavidade abdominal.\n• b) Dreno de subcutâneo; a sucção forte é inadequada à pleura nesse contexto.\n• c) Lâmina de capilaridade, incapaz de manejar ar sob pressão.\n• e) Usado em coleções percutâneas guiadas por imagem, não em pneumotórax.\n\nRevisar: Drenos"
    },
    # 44
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre o dreno Porto-VAC, marque a alternativa incorreta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) É um dreno de sucção com acessibilidade intermediária.",
            "B) É feito de plástico e pode ser usado no subcutâneo.",
            "C) É altamente indicado para drenagem de cavidade abdominal.",
            "D) Possui custo mais baixo em comparação ao Blake.",
            "E) Usa sistema de aspiração contínua."
        ],
        "gabarito": "Alternativa C — É altamente indicado para drenagem de cavidade abdominal.\n\nÉ o oposto: a sucção potente pode lesar vísceras, o que torna o Porto-Vac inadequado à cavidade abdominal. O dreno de escolha ali é o Blake.\n\n• a) Afirmação correta.\n• b) Afirmação correta — é o uso típico dele.\n• d) Afirmação correta.\n• e) Afirmação correta.\n\nRevisar: Drenos"
    },
    # 45
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre os principais tipos de drenos, qual das alternativas descreve corretamente a função e o tipo de dreno cirúrgico?",
        "interactionType": "multiple-choice",
        "options": [
            "A) O dreno de Blake utiliza um sistema de sucção por pressão negativa combinado a um sistema de drenagem por capilaridade.",
            "B) O dreno de Penrose é um dreno tubular que utiliza pressão negativa para remover líquidos da cavidade cirúrgica.",
            "C) O dreno de Pigtail é adequado para pequenos procedimentos realizados em Unidade Básica de Saúde, pois tem custo reduzido e grande acessibilidade.",
            "D) O dreno torácico é um dreno tubular, em sistema fechado, devendo ser colocado em aspiração contínua e não é adequado para tratamento de empiema."
        ],
        "gabarito": "Alternativa A — O dreno de Blake utiliza um sistema de sucção por pressão negativa combinado a um sistema de drenagem por capilaridade.\n\nO Blake é o único dreno que soma os dois mecanismos, e é isso que o torna versátil e eficiente na cavidade abdominal.\n\n• b) O Penrose é laminar e drena por capilaridade, sem pressão negativa.\n• c) O pigtail tem alto custo e baixa acessibilidade; é de uso hospitalar, guiado por imagem.\n• d) Drena por gravidade e é justamente uma das indicações clássicas no empiema.\n\nRevisar: Drenos"
    },
    # 46
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Qual das sondas abaixo é mais adequada para um paciente com obstrução da via aérea superior e necessidade prolongada de ventilação?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Nasogástrica.",
            "B) Orotraqueal.",
            "C) Traqueostomia.",
            "D) Nasoentérica.",
            "E) De Nelaton."
        ],
        "gabarito": "Alternativa C — Traqueostomia.\n\nA traqueostomia é a via cruenta da via aérea: contorna a obstrução alta e é a opção adequada quando se prevê ventilação mecânica prolongada.\n\n• a) Sonda do trato digestivo, para descompressão gástrica.\n• b) Resolve a curto prazo, mas o uso prolongado leva a lesão laríngea e estenose.\n• d) Sonda do trato digestivo, para alimentação.\n• e) Sonda vesical de alívio.\n\nRevisar: Sondas e cateteres"
    },
    # 47
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Julgue os itens a seguir sobre sondas e cateteres em verdadeiro (V) ou falso (F):\n\n( ) A sonda nasoenteral é indicada para descompressão gástrica em pacientes com obstrução intestinal.\n( ) A sonda orotraqueal permite ventilação mecânica e pode conter balão (cuff) para selar a via aérea.\n( ) A sonda de Foley é usada para cateterismo de alívio e deve ser retirada logo após a coleta urinária.\n( ) A sonda de gastrostomia é indicada para pacientes com disfagia e necessidade de nutrição prolongada.\n( ) A sonda de silicone com fio-guia e esferas metálicas é típica da via nasoenteral.\n\nAssinale a sequência correta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) F – V – F – V – V",
            "B) V – V – F – F – V",
            "C) F – F – V – V – V",
            "D) V – F – V – F – F"
        ],
        "gabarito": "Alternativa A — F – V – F – V – V.\n\nSequência: F – V – F – V – V. Os dois erros cobrados são sempre os mesmos: trocar a função da nasoenteral com a da nasogástrica e trocar Foley com Nelaton.\n\n• F) A nasoenteral é para alimentação além do piloro. A descompressão gástrica é feita pela nasogástrica, de plástico monolúmen.\n• V) O balonete distal veda a traqueia, permitindo ventilação com pressão positiva e protegendo contra broncoaspiração.\n• F) A Foley tem balonete e é de demora. O cateterismo de alívio, único, é feito com a sonda de Nelaton.\n• V) Quando a via oral fica indisponível por tempo prolongado ou permanente, a gastrostomia substitui a sonda nasal.\n• V) As esferas são radiopacas e permitem conferir na radiografia a migração da ponta para o duodeno.\n\nRevisar: Sondas e cateteres"
    },
    # 48
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Associe as sondas aos seus materiais e funções principais:\n\n1. Oro/nasogástrica\n2. Nasoentérica\n3. Gastrostomia\n4. De Foley\n5. De Nelaton\n\n( ) Feita de plástico rígido, usada para descompressão gástrica.\n( ) Usada por curto tempo para cateterismo vesical de alívio.\n( ) Possui balonete, indicada para drenagem urinária prolongada.\n( ) Silicone com fio-guia metálico, usada para nutrição pós-pilórica.\n( ) Introduzida por via percutânea no estômago para nutrição.\n\nA sequência correta da associação é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 1 – 5 – 4 – 2 – 3",
            "B) 1 – 4 – 5 – 3 – 2",
            "C) 5 – 1 – 4 – 2 – 3",
            "D) 2 – 5 – 4 – 1 – 3"
        ],
        "gabarito": "Alternativa A — 1 – 5 – 4 – 2 – 3.\n\nSequência correta: 1 – 5 – 4 – 2 – 3.\n\n• 1) Tubo monolúmen; a via oral é preferida no paciente inconsciente ou com trauma de face.\n• 5) Nelaton: sem balonete, entra e sai.\n• 4) Foley: látex ou silicone, duas ou mais vias; o balonete a mantém na bexiga.\n• 2) Nasoentérica: migra para o duodeno pelo peristaltismo; posição confirmada por radiografia.\n• 3) Gastrostomia: preferencialmente endoscópica; também pode ser cirúrgica ou percutânea.\n\nRevisar: Sondas e cateteres"
    },
    # 49
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre a sonda nasoenteral, assinale a correta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) É rígida e curta, ideal para esvaziamento gástrico imediato.",
            "B) Deve ser posicionada por cirurgia e sempre fixada com balonete.",
            "C) Possui fio-guia metálico e depende do peristaltismo para atingir o duodeno.",
            "D) Não requer confirmação radiológica para uso.",
            "E) É indicada apenas para administração de medicamentos e não para alimentação."
        ],
        "gabarito": "Alternativa C — Possui fio-guia metálico e depende do peristaltismo para atingir o duodeno.\n\nÉ de silicone, flexível, com fio-guia removível e esferas metálicas na ponta; passa pelo nariz até o estômago e migra ao duodeno pelo peristaltismo.\n\n• a) Rígida e curta descreve a nasogástrica.\n• b) É passada à beira do leito, por via incruenta, e não tem balonete.\n• d) A confirmação radiográfica é obrigatória antes do uso.\n• e) Serve para alimentação e também para medicação.\n\nRevisar: Sondas e cateteres"
    },
    # 50
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Um paciente internado com retenção urinária aguda e necessidade de coleta única de urina estéril deve ser sondado com:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Sonda de Foley.",
            "B) Sonda de gastrostomia.",
            "C) Sonda nasoenteral.",
            "D) Sonda de Nelaton.",
            "E) Sonda orotraqueal."
        ],
        "gabarito": "Alternativa D — Sonda de Nelaton.\n\nColeta única e alívio pontual definem o cateterismo intermitente, feito com a Nelaton — que não tem balonete e, portanto, não permanece.\n\n• a) A Foley é de demora; seria a escolha se houvesse necessidade de monitorizar débito.\n• b) Sonda de alimentação gástrica.\n• c) Sonda de alimentação enteral.\n• e) Dispositivo de via aérea.\n\nRevisar: Sondas e cateteres"
    },
    # 51
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre a traqueostomia, assinale a alternativa correta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) É indicada preferencialmente em situações de emergência, como parada cardiorrespiratória.",
            "B) A sonda é inserida pela cavidade nasal até a traqueia, sem necessidade de incisão.",
            "C) Deve ser realizada quando há previsão de ventilação mecânica prolongada ou obstrução de via aérea superior.",
            "D) Usa-se apenas sondas de metal, pois são mais resistentes à infecção.",
            "E) A traqueostomia evita por completo complicações como disfagia ou vômitos."
        ],
        "gabarito": "Alternativa C — Deve ser realizada quando há previsão de ventilação mecânica prolongada ou obstrução de via aérea superior.\n\nSão as duas indicações clássicas. A via cruenta se justifica quando a intubação seria prolongada demais ou quando a via aérea alta está obstruída.\n\n• a) Na emergência a via de escolha é a intubação; a traqueostomia é procedimento eletivo ou semieletivo.\n• b) Isso descreve a intubação nasotraqueal. A traqueostomia exige incisão cervical.\n• d) As cânulas podem ser de plástico ou de metal.\n• e) A traqueostomia pode, inclusive, cursar com disfagia e aspiração.\n\nRevisar: Sondas e cateteres"
    },
    # 52
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O bisturi eletrônico moderno tem dois modos básicos, o corte e a coagulação. Qual é a principal diferença entre os modos de uso da energia durante procedimentos cirúrgicos?",
        "interactionType": "multiple-choice",
        "options": [
            "A) No modo de corte, a energia é liberada de maneira contínua para produzir calor suficiente para vaporizar os tecidos, enquanto no modo de coagulação a energia é intermitente, permitindo a coagulação dos vasos.",
            "B) O modo de corte é utilizado apenas para coagular vasos pequenos, enquanto o modo de coagulação é mais indicado para cortar tecidos profundos.",
            "C) O modo de corte utiliza menor quantidade de energia do que o modo de coagulação, tornando-o mais seguro para cirurgias vasculares.",
            "D) O modo de coagulação é o único utilizado para cortes cirúrgicos, enquanto o modo de corte é exclusivo para hemostasia.",
            "E) No modo de corte a energia é liberada de forma intermitente, enquanto no modo de coagulação a energia é liberada continuamente."
        ],
        "gabarito": "Alternativa A — No modo de corte, a energia é liberada de maneira contínua para produzir calor suficiente para vaporizar os tecidos, enquanto no modo de coagulação a energia é intermitente, permitindo a coagulação dos vasos.\n\nO que muda entre os modos é a forma de onda. O corte usa corrente contínua não modulada, de baixa tensão, que aquece a célula a cerca de 100 ºC e vaporiza a água intracelular. A coagulação usa corrente interrompida, de alta tensão, entre 60 e 100 ºC, que desidrata e desnatura proteínas.\n\n• b) Inverte as funções dos dois modos.\n• c) O corte usa baixa tensão, mas não é 'mais seguro' por usar menos energia — e a coagulação é que atinge tensões maiores.\n• d) Inverte completamente corte e coagulação.\n• e) Inverte a modulação: contínua é o corte, intermitente é a coagulação.\n\nRevisar: Energia em cirurgia — corte, coagulação e blend"
    },
    # 53
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Qual das seguintes afirmações descreve corretamente a diferença entre a eletrocirurgia monopolar e bipolar?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Na eletrocirurgia monopolar, a corrente elétrica passa diretamente entre as duas pontas do eletrodo ativo, sem necessidade de placa de retorno.",
            "B) A eletrocirurgia bipolar não utiliza corrente elétrica e é indicada apenas para coagulação de grandes vasos.",
            "C) A eletrocirurgia monopolar é usada apenas para corte, enquanto a bipolar é usada apenas para coagulação.",
            "D) A eletrocirurgia bipolar é menos precisa e frequentemente causa mais danos térmicos aos tecidos circundantes do que a monopolar.",
            "E) Na eletrocirurgia monopolar a corrente percorre o corpo do paciente, necessitando de uma placa de retorno, enquanto na bipolar a corrente flui entre as duas pontas de uma pinça, sem necessidade de placa de retorno."
        ],
        "gabarito": "Alternativa E — Na eletrocirurgia monopolar a corrente percorre o corpo do paciente, necessitando de uma placa de retorno, enquanto na bipolar a corrente flui entre as duas pontas de uma pinça, sem necessidade de placa de retorno.\n\nA diferença é o trajeto da corrente. Monopolar: gerador → eletrodo ativo → corpo do paciente → placa dispersiva → gerador. Bipolar: a corrente circula apenas no tecido preso entre os dois polos do instrumento.\n\n• a) Descreve o circuito bipolar.\n• b) A bipolar usa corrente elétrica, sim, e é indicada para hemostasia fina.\n• c) A monopolar também coagula, e a bipolar corta de forma limitada.\n• d) É o inverso: a bipolar é mais precisa e causa menos dano térmico lateral.\n\nRevisar: Energia em cirurgia — monopolar e bipolar"
    },
    # 54
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em relação à resposta hormonal ao estresse cirúrgico, é INCORRETO afirmar que:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A liberação de cortisol está aumentada.",
            "B) A liberação de insulina está aumentada.",
            "C) A liberação de aldosterona está aumentada.",
            "D) A liberação de glucagon está aumentada."
        ],
        "gabarito": "Alternativa B — A liberação de insulina está aumentada.\n\nA insulina é o único hormônio da lista que diminui no estresse cirúrgico. As catecolaminas inibem sua secreção e ainda reduzem seu efeito periférico — daí a hiperglicemia com insulina baixa.\n\n• a) Verdadeira: o eixo HPA eleva o cortisol.\n• c) Verdadeira: a ativação do SRAA eleva a aldosterona.\n• d) Verdadeira: o glucagon sobe e contribui para a gliconeogênese.\n\nRevisar: Resposta endocrinometabólica ao trauma"
    },
    # 55
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Assinale a alternativa CORRETA sobre a resposta metabólica ao trauma:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Cortisol, catecolaminas e glucagon são hormônios de estresse e, portanto, encontram-se diminuídos logo após um trauma ou cirurgia extensos.",
            "B) A magnitude da resposta neuroendócrina independe da gravidade do trauma ou operação.",
            "C) A recuperação de força, balanço nitrogenado positivo e a restauração das proteínas musculares fazem parte da fase anabólica.",
            "D) O ganho de peso é, em média, duas vezes mais rápido que a perda.",
            "E) A cirurgia laparoscópica tende a aumentar a resposta inflamatória e imunomoduladora e piorar a função pulmonar."
        ],
        "gabarito": "Alternativa C — A recuperação de força, balanço nitrogenado positivo e a restauração das proteínas musculares fazem parte da fase anabólica.\n\nA fase anabólica, ou de recuperação, é definida exatamente por isso: catabolismo cedendo, balanço nitrogenado voltando a positivo e reconstituição da massa muscular.\n\n• a) Estão aumentados — são hormônios contrarreguladores liberados justamente pelo estresse.\n• b) A magnitude é proporcional à gravidade: quanto maior a lesão, maior a resposta.\n• d) É o contrário: a recuperação da massa magra é bem mais lenta que a perda, levando semanas a meses.\n• e) A laparoscopia reduz a agressão: menor resposta inflamatória e melhor função respiratória no pós-operatório.\n\nRevisar: Resposta endocrinometabólica ao trauma"
    },
    # 56
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Quais as alterações esperadas em paciente vítima de acidente automobilístico, com trauma torácico e contusão pulmonar, associado a trauma hepático grau III e esplênico grau IV, considerando a resposta endócrino-metabólica secundária ao trauma, especificamente na fase flow precoce?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Poliúria, com alta densidade urinária, excreção aumentada de potássio e retenção de sódio.",
            "B) Poliúria, com baixa densidade urinária, excreção aumentada de cloro e retenção de magnésio.",
            "C) Poliúria, com alta densidade urinária, excreção aumentada de sódio e retenção de potássio.",
            "D) Oligúria, com alta densidade urinária, excreção aumentada de potássio e hidrogênio e retenção de sódio.",
            "E) Oligúria, com baixa densidade urinária, retenção de potássio e de sódio."
        ],
        "gabarito": "Alternativa D — Oligúria, com alta densidade urinária, excreção aumentada de potássio e hidrogênio e retenção de sódio.\n\nO ADH retém água (oligúria, urina concentrada) e a aldosterona retém sódio às custas da excreção de potássio e hidrogênio. É o padrão renal clássico da resposta ao trauma.\n\n• a) O erro está em 'poliúria': a resposta ao trauma cursa com oligúria.\n• b) Poliúria e baixa densidade são o oposto do esperado.\n• c) Além da poliúria, inverte o manejo de sódio e potássio.\n• e) A oligúria está certa, mas a urina é concentrada e o potássio é excretado, não retido.\n\nRevisar: Resposta endocrinometabólica ao trauma"
    },
    # 57
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Paciente de 35 anos admitido após acidente automobilístico grave, com múltiplas fraturas, contusões e lacerações. Hemodinamicamente estável e consciente, com PA 110×70 mmHg, FC 100 bpm, FR 22 irpm e temperatura 38,5 ºC. Exames: leucocitose, glicemia 200 mg/dL, cortisol sérico elevado e insulina reduzida. Qual é o principal mecanismo responsável pela elevação da glicemia?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Hiperinsulinemia secundária ao estresse.",
            "B) Aumento da sensibilidade à insulina.",
            "C) Liberação de catecolaminas e cortisol.",
            "D) Supressão da produção hepática de glicose."
        ],
        "gabarito": "Alternativa C — Liberação de catecolaminas e cortisol.\n\nOs hormônios contrarreguladores aumentam glicogenólise e gliconeogênese, enquanto reduzem a secreção e o efeito da insulina. O próprio enunciado entrega a pista: cortisol elevado e insulina reduzida.\n\n• a) O enunciado informa insulina reduzida — o oposto de hiperinsulinemia.\n• b) No trauma há resistência à insulina, não aumento de sensibilidade.\n• d) A produção hepática de glicose está aumentada, não suprimida.\n\nRevisar: Resposta endocrinometabólica ao trauma"
    }
]

assert len(questions) == 57, f"Expected 57, got {len(questions)}"

# Write to src/bc_57q.ts
content = "export const bc57Questions = " + json.dumps(questions, ensure_ascii=False, indent=4) + ";\n"
with open("src/bc_57q.ts", "w", encoding="utf-8") as f:
    f.write(content)

print("Successfully generated src/bc_57q.ts with 57 questions!")
