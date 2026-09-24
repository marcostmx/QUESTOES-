# scripts/build_bc360_6.py
# Questions 301 to 360 from PDF Banco de Questoes 1-360
import json

questions = [
    # 301
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Paciente admitido com queimadura por fogo em ambiente fechado, com escarros carbonáceos, queimadura de vibrissas nasais e rouquidão progressiva. A conduta prioritária e mandatória é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Hidratação vigorosa com fórmula de Parkland e observação da via aérea em enfermaria.",
            "B) Intubação orotraqueal precoce preventiva antes da instalação de edema de glote obstrutivo.",
            "C) Inalação com broncodilatador e corticoide a cada 20 minutos.",
            "D) Traqueostomia com anestesia local de rotina."
        ],
        "gabarito": "Alternativa B — Intubação orotraqueal precoce preventiva antes da instalação de edema de glote obstrutivo.\n\nSinais de lesão térmica por inalação em ambiente fechado alertam para edema supraglótico fulminante nas primeiras 12 a 24 horas; retardar a intubação torna a via aérea anatomicamente intransponível.\n\n• a) A via aérea precede a reposição volêmica no 'ABCDE' do trauma.\n• c) Inalações não previnem o colapso por queimadura de vias aéreas superiores.\n• d) Não indicada como conduta primária quando a laringoscopia orotraqueal é viável.\n\nRevisar: 09 — Manejo de vias aéreas"
    },
    # 302
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em relação aos cuidados com a extubação de pacientes de risco no pós-operatório imediato, o teste do escape do balonete ('cuff leak test') avalia:",
        "interactionType": "multiple-choice",
        "options": [
            "A) O nível de relaxamento muscular residual pós-cirúrgico.",
            "B) A presença de edema laríngeo peritubular demonstrado pela passagem audível de ar ao desinsuflar o balonete.",
            "C) O débito cardíaco por termodiluição retrógrada.",
            "D) A força diafragmática através da pressão inspiratória máxima."
        ],
        "gabarito": "Alternativa B — A presença de edema laríngeo peritubular demonstrado pela passagem audível de ar ao desinsuflar o balonete.\n\nAo desinsuflar o balonete e ocluir o tubo, se o ar vazar ao redor do tubo (audível ou medido pelo ventilador), há espaço periglótico livre; ausência de vazamento sugere edema e risco de estridor pós-extubação.\n\n• a) Avaliado por aceleromiografia (TOF - train of four).\n• c) Função hemodinâmica invasiva não relacionada ao teste do cuff.\n• d) Avaliado por manovacuometria (Pimax).\n\nRevisar: 09 — Manejo de vias aéreas"
    },
    # 303
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O procedimento cirúrgico programado realizado entre o segundo e o terceiro anéis traqueais para manutenção prolongada de via aérea artificial é a:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Cricotireoidostomia cirúrgica.",
            "B) Cricotireoidostomia por punção.",
            "C) Traqueostomia.",
            "D) Broncoscopia rígida com dilatação pneumática."
        ],
        "gabarito": "Alternativa C — Traqueostomia.\n\nAbertura cirúrgica eletiva da traqueia abaixo da cricoide (entre 2º e 3º anéis traqueais) indicada para ventilação mecânica prolongada, higiene brônquica e desmame ventilatório.\n\n• a) Feita na membrana cricotireóidea em caráter de emergência aguda.\n• b) Procedimento emergencial por punção transtraqueal temporária.\n• d) Procedimento endoscópico para estenoses ou corpos estranhos.\n\nRevisar: 09 — Manejo de vias aéreas"
    },
    # 304
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Paciente vítima de colisão automobilística em prancha rígida e colar cervical necessita de intubação. Durante a laringoscopia direta, um auxiliar treinado deve realizar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Tração contínua da cabeça em hiperextensão para melhorar o campo visual.",
            "B) Estabilização manual alinhada da cabeça e pescoço (MILS) sem permitir flexão ou extensão.",
            "C) Rotação cervical para a esquerda facilitando o posicionamento da lâmina de Macintosh.",
            "D) Compressão jugular bilateral para aumentar a pressão venosa central."
        ],
        "gabarito": "Alternativa B — Estabilização manual alinhada da cabeça e pescoço (MILS) sem permitir flexão ou extensão.\n\nAbre-se a frente do colar cervical enquanto o auxiliar estabiliza a cabeça apoiando as mãos na mastoide/occipital, prevenindo movimentação da coluna instável.\n\n• a) Hiperextensão pode seccionar a medula espinhal em fraturas instáveis.\n• c) Rotação de coluna traumatizada é terminantemente contraindicada.\n• d) Aumenta a pressão intracraniana e colapsa a perfusão cerebral.\n\nRevisar: 09 — Manejo de vias aéreas"
    },
    # 305
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A cânula traqueal de duplo lúmen (tubo de Carlens ou Robertshaw) é indicada principalmente em:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Ventilação pulmonar independente e isolamento seletivo de um pulmão em cirurgias torácicas ou hemorragia pulmonar maciça unilateral.",
            "B) Intubação em lactentes pré-termo com membrana hialina.",
            "C) Descompressão de pneumotórax hipertensivo em atendimento pré-hospitalar.",
            "D) Substituição do dreno torácico em selo d'água."
        ],
        "gabarito": "Alternativa A — Ventilação pulmonar independente e isolamento seletivo de um pulmão em cirurgias torácicas ou hemorragia pulmonar maciça unilateral.\n\nPossui dois lúmens e dois balonetes (um traqueal e um endobrônquico), permitindo ventilar apenas o pulmão dependente enquanto o outro é colabado para intervenção cirúrgica ou protegido de contaminação.\n\n• a) Contraindicado absoluto em neonatos pelo diâmetro robusto.\n• c) Trata-se de tubo endotraqueal especializado, não dreno de parede.\n• d) Não substitui dreno pleural.\n\nRevisar: 09 — Manejo de vias aéreas"
    },
    # 306
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A distância tireomentoniana (teste de Patil-Aldreti) menor que 6 cm em um adulto prevê:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Facilidade extrema na intubação endotraqueal.",
            "B) Maior probabilidade de laringoscopia e intubação difíceis devido à via aérea anteriorizada e pequeno espaço mandibular.",
            "C) Ausência de necessidade de pré-oxigenação.",
            "D) Indicação estrita de traqueostomia imediata antes da anestesia."
        ],
        "gabarito": "Alternativa B — Maior probabilidade de laringoscopia e intubação difíceis devido à via aérea anteriorizada e pequeno espaço mandibular.\n\nAferida da cartilagem tireoide à ponta do mento com o pescoço estendido. Menor que 6 cm indica retrognatismo e espaço restrito para deslocamento anterior da língua pelo laringoscópio.\n\n• a) Distâncias adequadas são superiores a 6,5 cm.\n• c) Todo paciente necessita de pré-oxigenação.\n• d) Preditor de dificuldade prepara dispositivos auxiliares (videolaringo, bougie), não traqueostomia direta.\n\nRevisar: 09 — Manejo de vias aéreas"
    },
    # 307
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A abertura bucal (distância interincisivos) mínima considerada preditora de intubação fácil com laringoscópio convencional no adulto é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Menor que 1,5 cm.",
            "B) Igual ou superior a 3 a 4 cm (aproximadamente três dedos transversos do paciente).",
            "C) Não há relação entre abertura bucal e dificuldade de intubação.",
            "D) Mais de 8 cm obrigatoriamente."
        ],
        "gabarito": "Alternativa B — Igual ou superior a 3 a 4 cm (aproximadamente três dedos transversos do paciente).\n\nAberturas bucais menores que 3 cm impedem a introdução simultânea da lâmina do laringoscópio e do tubo, caracterizando via aérea potencialmente difícil.\n\n• a) Abertura < 2 cm impede laringoscopia direta rígida.\n• c) É um dos parâmetros mais fáceis e reprodutíveis do exame físico pré-anestésico.\n• d) Distância excessiva e irreal para a média anatômica.\n\nRevisar: 09 — Manejo de vias aéreas"
    },
    # 308
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O videolaringoscópio destaca-se na abordagem da via aérea difícil por:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Proporcionar imagem indireta da glote através de câmera integrada na lâmina, sem exigir o alinhamento estrito dos eixos oral, faríngeo e laríngeo.",
            "B) Dispensar a sedação ou uso de qualquer relaxante muscular em pacientes agressivos.",
            "C) Ter lâmina flexível que progride até os brônquios segmentares.",
            "D) Eliminar totalmente o risco de vômito ou regurgitação."
        ],
        "gabarito": "Alternativa A — Proporcionar imagem indireta da glote através de câmera integrada na lâmina, sem exigir o alinhamento estrito dos eixos oral, faríngeo e laríngeo.\n\nPermite enxergar 'ao redor da curva' anatômica, transformando a maioria das intubações com Cormack-Lehane III em visões de grau I ou II na tela de vídeo.\n\n• b) O relaxamento e sedação são necessários para tolerância e abolição de reflexos.\n• c) Lâmina rígida metálica ou polimérica descartável.\n• d) Não impede regurgitação gástrica ativa.\n\nRevisar: 09 — Manejo de vias aéreas"
    },
    # 309
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O reflexo que deve estar idealmente presente e recuperado para garantir uma extubação segura após cirurgia com anestesia geral é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Reflexo óculo-cefálico de olhos de boneca.",
            "B) Reflexo cutâneo-plantar em extensão (Babinski positivo).",
            "C) Reflexo de tosse e deglutição espontâneos com ventilação espontânea regular.",
            "D) Reflexo de preensão palmar mantido."
        ],
        "gabarito": "Alternativa C — Reflexo de tosse e deglutição espontâneos com ventilação espontânea regular.\n\nO paciente deve demonstrar capacidade de proteger sua própria via aérea contra secreções e manter drive respiratório adequado com estabilidade hemodinâmica.\n\n• a) Sinal de tronco cerebral avaliado em coma profundo/morte encefálica.\n• b) Sinal de lesão da via piramidal, patológico.\n• d) Reflexo arcaico de recém-nascidos.\n\nRevisar: 09 — Manejo de vias aéreas"
    },
    # 310
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O 'espaço morto anatômico' corresponde ao volume de gás:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Que participa ativamente das trocas alveolares na hematose.",
            "B) Que preenche as vias aéreas de condução (fossas nasais, faringe, laringe, traqueia e brônquios) e não participa das trocas gasosas.",
            "C) Retido na cavidade gástrica após ventilação sob máscara facial.",
            "D) Localizado exclusivamente no interior do balonete traqueal."
        ],
        "gabarito": "Alternativa B — Que preenche as vias aéreas de condução (fossas nasais, faringe, laringe, traqueia e brônquios) e não participa das trocas gasosas.\n\nEquivale a cerca de 2 mL/kg (aproximadamente 150 mL em um adulto de 70 kg), sendo ar que entra e sai sem contato com a membrana alvéolo-capilar.\n\n• a) Esse é o volume alveolar efetivo.\n• c) Aerofagia gástrica decorrente de ventilação sob máscara inadequada.\n• d) Espaço interno isolado do cuff.\n\nRevisar: 09 — Manejo de vias aéreas"
    },
    # 311
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A pré-oxigenação com O2 a 100% sob máscara bem acoplada por 3 a 5 minutos antes da indução anestésica tem como objetivo fisiológico principal:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Promover acidose respiratória leve protetora.",
            "B) Desnitrogenar a capacidade residual funcional (CRF), criando uma reserva de oxigênio que retarda a dessaturação durante a apneia.",
            "C) Acelerar o metabolismo hepático dos fármacos de indução.",
            "D) Provocar hipocapnia intensa para deprimir o centro respiratório."
        ],
        "gabarito": "Alternativa B — Desnitrogenar a capacidade residual funcional (CRF), criando uma reserva de oxigênio que retarda a dessaturação durante a apneia.\n\nSubstitui o nitrogênio (que compõe ~78% do ar alveolar) por O2 puro, prolongando o tempo de apneia segura de 1-2 minutos para até 6-8 minutos em pacientes saudáveis.\n\n• a) Não visa induzir acidose metabólica ou respiratória.\n• c) O metabolismo de fármacos não depende de hiperóxia alveolar prévia.\n• d) Não objetiva hiperventilação hipocápnica.\n\nRevisar: 09 — Manejo de vias aéreas"
    },
    # 312
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O uso do balão autoinflável (AMBU) com bolsa reservatória e fluxo de oxigênio a 15 L/min oferece uma fração inspirada de oxigênio (FiO2) aproximada de:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 21% a 28%.",
            "B) 40% a 50%.",
            "C) Próxima a 85% a 100%.",
            "D) Exatamente 60% constante."
        ],
        "gabarito": "Alternativa C — Próxima a 85% a 100%.\n\nSem o reservatório de oxigênio acoplado, o AMBU aspira ar ambiente e fornece no máximo 40-50% de FiO2; a adição de bolsa reservatória e alto fluxo garante oxigênio a praticamente 100%.\n\n• a) FiO2 próxima ao ar ambiente (21%).\n• b) FiO2 do AMBU sem reservatório conectado.\n• d) Valor intermediário inadequado com reservatório inflado.\n\nRevisar: 09 — Manejo de vias aéreas"
    },
    # 313
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Durante a ventilação com bolsa-válvula-máscara (AMBU) por dois socorristas, a técnica recomendada para garantir a melhor vedação e abertura de via aérea é a:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Técnica em 'C' e 'E' bimanual (dois operadores: um mantém vedação com ambas as mãos em C-E e o outro insufla a bolsa).",
            "B) Pressão com punho cerrado sobre a fronte.",
            "C) Técnica de Sellick unidigital.",
            "D) Compressão esternal rítmica associada."
        ],
        "gabarito": "Alternativa A — Técnica em 'C' e 'E' bimanual (dois operadores: um mantém vedação com ambas as mãos em C-E e o outro insufla a bolsa).\n\nOs polegares e indicadores de ambas as mãos formam um 'C' pressionando a máscara na face, enquanto os 3º, 4º e 5º dedos formam um 'E' tracionando a mandíbula para cima.\n\n• b) Manobra inadequada que não veda a máscara.\n• c) Sellick serve para comprimir o esôfago, não para vedar a máscara facial.\n• d) Compressão torácica é manobra de RCP, não técnica de vedação de máscara.\n\nRevisar: 09 — Manejo de vias aéreas"
    },
    # 314
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A principal causa de obstrução de via aérea alta no paciente inconsciente em decúbito dorsal é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Edema agudo de laringe.",
            "B) Queda da base da língua contra a parede posterior da faringe por perda do tônus muscular.",
            "C) Impactação de corpos estranhos dentários.",
            "D) Laringoespasmo vagal reativo."
        ],
        "gabarito": "Alternativa B — Queda da base da língua contra a parede posterior da faringe por perda do tônus muscular.\n\nA musculatura genioglossa relaxa com a perda da consciência; pela gravidade em decúbito dorsal, a língua e epiglote colabam sobre a via aérea, revertida com a extensão cefálica ou jaw-thrust.\n\n• a) Edema requer estímulo inflamatório, alérgico ou térmico.\n• c) Corpos estranhos são causas ocasionais, não a causa primária universal.\n• d) Ocorre em plano anestésico superficial com irritação local, não é causa básica universal de flacidez.\n\nRevisar: 09 — Manejo de vias aéreas"
    },
    # 315
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O cateter peridural colocado para analgesia pós-operatória contínua aloja-se:",
        "interactionType": "multiple-choice",
        "options": [
            "A) No espaço subaracnóideo com saída livre de líquido cefalorraquidiano.",
            "B) No espaço peridural (entre o ligamento amarelo e a dura-máter).",
            "C) No interior do canal medular central (epêndima).",
            "D) No tecido celular subcutâneo adjacente à apófise espinhosa."
        ],
        "gabarito": "Alternativa B — No espaço peridural (entre o ligamento amarelo e a dura-máter).\n\nEspaço virtual repleto de tecido adiposo frouxo e plexo venoso de Batson que envolve a dura-máter, onde a dispersão de anestésicos locais bloqueia as raízes nervosas espinhais.\n\n• a) Esse é o espaço da raquianestesia.\n• c) Causaria lesão neurológica irreversível.\n• d) Não atinge raízes neurais, ineficaz para analgesia central.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 316
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A perda de resistência à injeção de ar ou soro fisiológico (técnica de Dogliotti ou Gutierrez) é o método clássico para localização do:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Espaço pleural parietal.",
            "B) Espaço peridural.",
            "C) Lúmen da veia subclávia.",
            "D) Espaço pré-peritoneal de Bogros."
        ],
        "gabarito": "Alternativa B — Espaço peridural.\n\nAo ultrapassar a alta resistência elástica e densa do ligamento amarelo com a agulha de Tuohy, o êmbolo da seringa avança subitamente sem resistência, confirmando o espaço peridural.\n\n• a) Pleura é identificada por manometria ou aspiração líquida.\n• c) Punção vascular utiliza refluxo de sangue venoso à aspiração.\n• d) Espaço dissecado em cirurgia de hérnia inguinal laparoscópica.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 317
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A cefaleia pós-punção dural (CPPD) é decorrente de:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Hipertensão intracraniana aguda reativa.",
            "B) Fístula liquórica através do orifício na dura-máter com tração de estruturas encefálicas e meníngeas sensíveis à dor.",
            "C) Infecção bacteriana fulminante por estreptococo.",
            "D) Isquemia cerebral de lobo frontal."
        ],
        "gabarito": "Alternativa B — Fístula liquórica através do orifício na dura-máter com tração de estruturas encefálicas e meníngeas sensíveis à dor.\n\nA perda de volume liquórico reduz a pressão intratecal e o 'coxim hidráulico' cerebral, tracionando seios venosos e nervos cranianos sensíveis (principalmente V, IX e X pares).\n\n• a) Ocorre hipotensão liquórica, não hipertensão.\n• c) Descreve meningite bacteriana pós-procedimento.\n• d) Não há déficit de perfusão isquêmico lobar focal.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 318
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A característica postural marcante da cefaleia pós-punção dural é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Piora clássica na posição ortostática (em pé ou sentado) e alívio quase imediato no decúbito dorsal horizontal.",
            "B) Piora dramática ao deitar sem travesseiro.",
            "C) Ausência total de variação postural.",
            "D) Aparecimento exclusivo durante o sono REM."
        ],
        "gabarito": "Alternativa A — Piora clássica na posição ortostática (em pé ou sentado) e alívio quase imediato no decúbito dorsal horizontal.\n\nEm ortostase a coluna de líquor desce pela fístula, acentuando a tração encefálica; o decúbito horizontal redistribui o líquor e abole a dor quase que instantaneamente.\n\n• b) É a posição que justamente alivia os sintomas.\n• c) A variação postural é o elemento diagnóstico primordial.\n• d) Não se correlaciona com fases do sono.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 319
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O tratamento padrão-ouro para cefaleia pós-punção dural refratária ao manejo clínico com hidratação e cafeína é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Punção lombar de alívio diária.",
            "B) Tampão sanguíneo peridural autólogo (blood patch peridural).",
            "C) Craniotomia descompressiva.",
            "D) Infusão contínua de heparina intravenosa."
        ],
        "gabarito": "Alternativa B — Tampão sanguíneo peridural autólogo (blood patch peridural).\n\nInjeta-se cerca de 15 a 20 mL de sangue estéril do próprio paciente no espaço peridural junto ao sítio da punção; o coágulo fecha o orifício dural e cessa a fístula com >90% de sucesso.\n\n• a) Agrava a perda liquórica e perpetua a cefaleia.\n• c) Cirurgia intracraniana mutilante e sem indicação.\n• d) A heparina aumentaria o risco de sangramento sem selar a fístula.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 320
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em relação àssepsia do campo para bloqueios anestésicos neuraxiais e punções centrais, a solução antisséptica de escolha com maior efeito residual e secagem rápida é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Solução fisiológica morna.",
            "B) Clorexidina alcoólica a 0,5% a 2%.",
            "C) Solução aquosa de permanganato de potássio.",
            "D) Sabão de coco neutro cirúrgico."
        ],
        "gabarito": "Alternativa B — Clorexidina alcoólica a 0,5% a 2%.\n\nCombina ação bactericida imediata do álcool com persistente efeito residual da clorexidina por até 6 horas, superior ao PVPI tópico.\n\n• a) Soro fisiológico não possui propriedade antisséptica.\n• c) Substância desprovida de uso cirúrgico hospitalar padrão.\n• d) Apenas agente tensoativo de limpeza física prévia.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 321
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Ao realizar uma punção liquórica ou raquianestesia, as camadas anatômicas transfixadas pela agulha da pele até o espaço subaracnóideo são, em ordem:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Pele, tecido subcutâneo, ligamento supraespinhoso, ligamento interespinhoso, ligamento amarelo, espaço peridural, dura-máter e aracnoide-máter.",
            "B) Pele, ligamento amarelo, dura-máter, ligamento supraespinhoso e pia-máter.",
            "C) Pele, tecido adiposo retroperitoneal, ligamento nucal e medula espinhal.",
            "D) Pele, aponeurose lombar, periósteo vertebral e plexo venoso epidural unicamente."
        ],
        "gabarito": "Alternativa A — Pele, tecido subcutâneo, ligamento supraespinhoso, ligamento interespinhoso, ligamento amarelo, espaço peridural, dura-máter e aracnoide-máter.\n\nA abordagem pela linha média cruza os três ligamentos antes de adentrar o espaço peridural e perfurar a dura-máter e aracnoide para alcançar o líquor.\n\n• b) Sequência anatômica desordenada e transfixação de pia-máter inadequada.\n• c) Estruturas sem relação anatômica lombar posterior.\n• d) Não reflete o trajeto interlaminar padrão.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 322
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O limite anatômico inferior usual de terminação da medula espinhal no adulto, que orienta a punção lombar nos espaços L3-L4 ou L4-L5 para evitar lesão medular, situa-se ao nível de:",
        "interactionType": "multiple-choice",
        "options": [
            "A) T10.",
            "B) L1 - L2 (cone medular).",
            "C) S2 - S3.",
            "D) C7 - T1."
        ],
        "gabarito": "Alternativa B — L1 - L2 (cone medular).\n\nA medula termina no cone medular entre L1 e L2; abaixo desse nível encontram-se apenas as raízes móveis da cauda equina banhadas em líquor, tornando a punção segura.\n\n• a) Nível torácico com parênquima medular volumoso.\n• c) Nível sacral do fundo de saco dural.\n• d) Transição cervicotorácica.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 323
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A linha imaginária que conecta as duas cristas ilíacas póstero-superiores (linha de Tuffier) cruza classicamente a coluna vertebral no nível de:",
        "interactionType": "multiple-choice",
        "options": [
            "A) T12.",
            "B) Espaço intervertebral L4-L5 (ou corpo de L4).",
            "C) S1.",
            "D) C2."
        ],
        "gabarito": "Alternativa B — Espaço intervertebral L4-L5 (ou corpo de L4).\n\nA linha de Tuffier serve como marco anatômico superficial para palpação no paciente sentado ou em decúbito lateral, permitindo eleger com segurança o interespaço L3-L4 ou L4-L5.\n\n• a) Muito alto, acima do cone medular.\n• c) Nível sacral.\n• d) Coluna cervical alta.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 324
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A anestesia local por infiltração com lidocaína associada à adrenalina apresenta como benefício primário:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Redução do tempo de latência e diminuição do tempo total de anestesia.",
            "B) Vasoconstrição local que reduz o sangramento operatório, prolonga a duração do bloqueio e retarda a absorção sistêmica do anestésico.",
            "C) Aumento imediato da absorção sistêmica para conferir analgesia central.",
            "D) Elevação acentuada do pH local reduzindo a dor da infiltração."
        ],
        "gabarito": "Alternativa B — Vasoconstrição local que reduz o sangramento operatório, prolonga a duração do bloqueio e retarda a absorção sistêmica do anestésico.\n\nA adrenalina atua em receptores alfa-1 promovendo vasoconstrição capilar, mantendo o anestésico concentrado no tecido e diminuindo o pico sérico tóxico.\n\n• a) Prolonga a duração do bloqueio, não diminui.\n• c) O objetivo da adrenalina é justamente impedir a rápida absorção sistêmica.\n• d) Soluções com adrenalina são mais ácidas (menor pH) para estabilizar a droga.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 325
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A infiltração de anestésicos locais com vasoconstritor (adrenalina) é tradicionalmente evitada ou contraindicada formalmente em extremidades terminais com circulação colateral precária, tais como:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Coxas e nádegas.",
            "B) Dedos das mãos e pés, ponta do nariz, pavilhão auricular e pênis.",
            "C) Parede abdominal anterior e dorso.",
            "D) Região escapular e braço proximal."
        ],
        "gabarito": "Alternativa B — Dedos das mãos e pés, ponta do nariz, pavilhão auricular e pênis.\n\nPor possuírem artérias terminais sem rede vascular rica colateral, o vasoespasmo induzido por adrenalina pode desencadear isquemia crítica sustentada e necrose tecidual.\n\n• a) Áreas amplas de circulação exuberante.\n• c) Rede vascular ricamente anastomosada.\n• d) Áreas proximais sem risco de isquemia terminal.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 326
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A dose máxima de segurança para infiltração local de lidocaína sem vasoconstritor em adultos é de aproximadamente:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 1 a 2 mg/kg.",
            "B) 4 a 5 mg/kg (máximo total cerca de 300 mg).",
            "C) 15 a 20 mg/kg.",
            "D) 50 mg/kg."
        ],
        "gabarito": "Alternativa B — 4 a 5 mg/kg (máximo total cerca de 300 mg).\n\nPara um adulto de 70 kg, 300 mg correspondem a 30 mL de solução de lidocaína a 1% sem adrenalina (ou 15 mL a 2%).\n\n• a) Subestima a dose terapêutica usual.\n• c) Faixa de extrema toxicidade com risco iminente de convulsão e colapso cardíaco.\n• d) Dose letal.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 327
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Quando se adiciona adrenalina à lidocaína, a dose máxima de segurança aceita eleva-se para aproximadamente:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 7 mg/kg (máximo total cerca de 500 mg).",
            "B) 2 mg/kg.",
            "C) 30 mg/kg.",
            "D) Não há limite toxicológico."
        ],
        "gabarito": "Alternativa A — 7 mg/kg (máximo total cerca de 500 mg).\n\nA vasoconstrição local retarda a taxa de absorção plasmática, permitindo doses maiores sem atingir os níveis séricos críticos de toxicidade no SNC e miocárdio.\n\n• b) Dose excessivamente restrita.\n• c) Faixa letal.\n• d) Há limites toxicológicos rígidos bem definidos.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 328
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Os sinais e sintomas precoces de toxicidade sistêmica por anestésicos locais (LAST) no sistema nervoso central incluem:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Parestesia perioral, gosto metálico na boca, zumbidos no ouvido (tinnitus), vertigem e fasciculações musculares.",
            "B) Dor lombar súbita com poliúria.",
            "C) Hiperglicemia osmolar não cetótica.",
            "D) Rash purpúrico generalizado e alopecia."
        ],
        "gabarito": "Alternativa A — Parestesia perioral, gosto metálico na boca, zumbidos no ouvido (tinnitus), vertigem e fasciculações musculares.\n\nA depressão seletiva inicial de vias inibitórias corticais leva à excitação prodrômica antes do colapso convulsivo generalizado e coma profundo.\n\n• b) Sem correlação neurológica central precoce.\n• c) Desordem metabólica endócrina desvinculada do canal de sódio.\n• d) Reações dermatológicas não compõem a síndrome LAST.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 329
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O tratamento farmacológico de resgate específico para colapso cardiovascular e toxicidade sistêmica grave induzida por anestésicos locais (LAST) é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Infusão de emulsão lipídica intravenosa a 20% (Intralipid).",
            "B) Gluconato de cálcio a 10% em bolus rápido.",
            "C) Diuréticos de alça em altas doses.",
            "D) Solução salina hipertônica a 7,5%."
        ],
        "gabarito": "Alternativa A — Infusão de emulsão lipídica intravenosa a 20% (Intralipid).\n\nFunciona como uma 'pia lipídica' (lipid sink) intravascular que captura as moléculas lipofílicas do anestésico (ex.: bupivacaína) do miocárdio e circulação, restaurando a homeostase cardíaca.\n\n• b) Trata hipercalemia ou hipocalcemia, não quela anestésicos locais.\n• c) Induz hipotensão e piora a depressão hemodinâmica.\n• d) Não neutraliza o anestésico nos tecidos excitáveis.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 330
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O curativo oclusivo aplicado sobre incisão cirúrgica limpa fechada por primeira intenção tem como finalidade principal nas primeiras 24 a 48 horas:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Proteger a ferida contra contaminação bacteriana exógena durante o período crítico de epitelização inicial.",
            "B) Manter as bordas da ferida abertas para drenagem contínua.",
            "C) Aquecer o tecido para induzir necrose fibrinoide.",
            "D) Acelerar a queda espontânea precoce dos pontos de sutura."
        ],
        "gabarito": "Alternativa A — Proteger a ferida contra contaminação bacteriana exógena durante o período crítico de epitelização inicial.\n\nNas primeiras 24-48 horas as células da camada basal epidérmica migram para vedar a incisão; após esse prazo, a ferida torna-se impermeável a patógenos exógenos.\n\n• b) O objetivo da sutura é aproximar e selar bordas, não mantê-las abertas.\n• c) Necrose tecidual é deletéria e deve ser prevenida.\n• d) Os pontos devem permanecer fixos até a formação de colágeno resistente.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 331
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A ferida cirúrgica mantida limpa e suturada por primeira intenção conclui sua epitelização básica tornando-se impermeável à entrada de água e bactérias externas habitualmente em:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 1 a 2 horas após a sutura.",
            "B) 24 a 48 horas de pós-operatório.",
            "C) 21 a 30 dias.",
            "D) Mais de 6 meses."
        ],
        "gabarito": "Alternativa B — 24 a 48 horas de pós-operatório.\n\nA camada epidérmica contínua restabelece a barreira cutânea em até 48 horas, momento em que o banho corporal habitual pode ser liberado sem curativo oclusivo em feridas limpas.\n\n• a) Tempo insuficiente para migração celular epidérmica pela incisão.\n• c) Corresponde à fase de síntese e maturação de colágeno.\n• d) Fase avançada de remodelamento cicatricial.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 332
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O debridamento cirúrgico de uma ferida traumática contaminada visa:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Remover tecidos desvitalizados, corpos estranhos e bactérias, transformando a ferida em um leito viável e vascularizado.",
            "B) Aumentar a área cruenta para retardar o fechamento por segunda intenção.",
            "C) Promover hemorragia mantida para lavar as bactérias por inundação.",
            "D) Permitir o uso exclusivo de fios de sutura multifilamentares de seda."
        ],
        "gabarito": "Alternativa A — Remover tecidos desvitalizados, corpos estranhos e bactérias, transformando a ferida em um leito viável e vascularizado.\n\nTecidos necróticos agem como barreira à migração celular e meio de cultura para proliferação anaeróbia; o desbridamento até sangramento sadio viabiliza a cicatrização.\n\n• b) O objetivo é acelerar a cicatrização sadia, não retardar propositalmente.\n• c) Hemorragia mantida forma hematomas que servem de foco infeccioso.\n• d) Fios multifilamentares em ferida contaminada são contraindicados.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 333
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A cicatrização por segunda intenção ocorre classicamente em:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Incisões cirúrgicas limpas com aposição perfeita de bordas imediatas.",
            "B) Feridas abertas com perda de substância tecidual, infecção ativa prévia ou deiscências, onde o leito cicatriza por granulação e contração miofibroblástica.",
            "C) Suturas intradérmicas com fio absorvível estéril.",
            "D) Fraturas ósseas fechadas reduzidas anatomicamente."
        ],
        "gabarito": "Alternativa B — Feridas abertas com perda de substância tecidual, infecção ativa prévia ou deiscências, onde o leito cicatriza por granulação e contração miofibroblástica.\n\nA ferida permanece aberta e é preenchida progressivamente do fundo até a superfície por tecido de granulação, com epitelização lenta a partir das bordas.\n\n• a) Descrição clássica de primeira intenção.\n• c) Exemplo clássico de fechamento primário por primeira intenção.\n• d) Consolidação óssea primária não é cicatrização cutânea por segunda intenção.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 334
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O tecido de granulação saudável em uma ferida aberta caracteriza-se macroscopicamente por ser:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Pálido, avascular, ressecado e recoberto por esfacelo aderente.",
            "B) Vermelho vivo brilhante, granular, úmido e sangrante facilmente ao menor toque.",
            "C) Cinzento escuro com odor fétido e enfisema subcutâneo.",
            "D) Endurecido, calcificado e intensamente queratinizado."
        ],
        "gabarito": "Alternativa B — Vermelho vivo brilhante, granular, úmido e sangrante facilmente ao menor toque.\n\nComposto por neoformação capilar rica (angiogênese exuberante), fibroblastos ativos e matriz rica em proteoglicanos, indicando leito vascularizado pronto para epitelizar ou receber enxerto.\n\n• a) Tecido hipoperfundido, isquêmico ou fibrótico.\n• c) Necrose tecidual infectada por anaeróbios (gangrena gasosa).\n• d) Pele hiperceratótica crônica sem granulação ativa.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 335
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A presença de esfacelo (tecido necrótico liquefativo ou fibrina amarelada) no leito de uma ferida crônica exige como prioridade:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Fechamento imediato com sutura sob alta tensão.",
            "B) Debridamento adequado (mecânico, químico, autolítico ou cirúrgico) para viabilizar a granulação tecidual.",
            "C) Aplicação de pó talco ressecante com gaze estéril seca.",
            "D) Cauterização extensa com ácido sulfúrico concentrado."
        ],
        "gabarito": "Alternativa B — Debridamento adequado (mecânico, químico, autolítico ou cirúrgico) para viabilizar a granulação tecidual.\n\nNenhuma ferida epiteliza sobre tecido necrótico/esfacelo; a limpeza do leito é a primeira etapa mandatória segundo o conceito internacional TIME (Tissue, Infection, Moisture, Edge).\n\n• a) Suturar sobre necrose causa abcesso fechado e deiscência imediata.\n• c) Talco forma granulomas de corpo estranho que perpetuam a inflamação.\n• d) Destruiria o tecido viável vizinho.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 336
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A terapia por pressão negativa (curativo a vácuo) tem como efeitos biológicos locais comprovados:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Estimulação da angiogênese, redução do edema intersticial, drenagem contínua de exsudato e contração mecânica das bordas da ferida.",
            "B) Aumento maciço da proliferação bacteriana anaeróbia no leito selado.",
            "C) Desidratação completa da matriz extracelular levando a necrose dérmica.",
            "D) Necrose isquêmica controlada de toda a derme residual."
        ],
        "gabarito": "Alternativa A — Estimulação da angiogênese, redução do edema intersticial, drenagem contínua de exsudato e contração mecânica das bordas da ferida.\n\nA macrodeformação aproxima as bordas e a microdeformação na interface esponja-célula ativa fatores de crescimento endotelial (VEGF), acelerando o tecido de granulação.\n\n• b) Pelo contrário, reduz a carga bacteriana através da remoção contínua do exsudato.\n• c) Mantém ambiente úmido equilibrado sem dessecação celular.\n• d) Não promove necrose dérmica.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 337
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O curativo com gaze impregnada com petrolato (ex.: Jelonet, Adaptic) é amplamente indicado em feridas cruentas e áreas doadoras de enxerto porque:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Aderem fortemente ao tecido recém-formado tracionando-o a cada troca.",
            "B) São não aderentes, permitindo trocas atraumáticas sem lesar a neoepitelização delicada.",
            "C) Realizam debridamento químico contínuo por liberação ácida.",
            "D) Impedem a passagem de exsudato para as camadas secundárias do curativo."
        ],
        "gabarito": "Alternativa B — São não aderentes, permitindo trocas atraumáticas sem lesar a neoepitelização delicada.\n\nA camada de emulsão graxa ou petrolato evita que o exsudato fibroso cole nos fios da gaze, permitindo retirar o curativo sem arrancar a delicada camada de queratinócitos neoformados.\n\n• a) Aderência e dor intensa são típicas de gaze comum seca, indesejadas nesse contexto.\n• c) Não possuem propriedades de debridamento enzimático ou ácido.\n• d) A trama é porosa e permite a drenagem do exsudato para a cobertura secundária.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 338
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O sulfadiazina de prata a 1% é o antimicrobiano tópico mais utilizado no manejo hospitalar de:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Queimaduras de segundo e terceiro graus para controle e prevenção de colonização bacteriana (especialmente Pseudomonas aeruginosa).",
            "B) Incisões limpas de hérnia inguinal após o 7º dia pós-operatório.",
            "C) Fissura anal crônica em cicatrização.",
            "D) Alopecia areata pós-radioterapia."
        ],
        "gabarito": "Alternativa A — Queimaduras de segundo e terceiro graus para controle e prevenção de colonização bacteriana (especialmente Pseudomonas aeruginosa).\n\nPossui amplo espectro bactericida com ação sobre gram-positivos e gram-negativos frequentes em queimaduras extensas, além de formar camada protetora maleável sobre a derme queimada.\n\n• b) Feridas cirúrgicas limpas fechadas não necessitam de cremes antimicrobianos tópicos.\n• c) Não é o tratamento padrão de fissuras anais.\n• d) Não possui aplicação em doenças autoimunes ou alopecias.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 339
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A remoção de suturas cirúrgicas em áreas de excelente vascularização e baixa tensão mecânica (como a face e pescoço) é comumente realizada com:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 1 a 2 dias.",
            "B) 3 a 5 dias (para evitar marcas dos pontos e cicatrizes inestéticas em trilho de trem).",
            "C) 15 a 21 dias.",
            "D) 60 dias ininterruptos."
        ],
        "gabarito": "Alternativa B — 3 a 5 dias (para evitar marcas dos pontos e cicatrizes inestéticas em trilho de trem).\n\nA face cicatriza rapidamente devido à exuberante irrigação capilar; manter os fios por mais de 5 dias induz epitelização dos orifícios da agulha com marcas transversais permanentes indesejáveis.\n\n• a) Precoce demais, risco de deiscência das bordas.\n• c) Prazo longo reservado a áreas de tensão extrema e articulações.\n• d) Fios cirúrgicos de pele nunca são mantidos por meses.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 340
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A remoção de pontos em áreas de alta tensão mecânica ou mobilidade articular (como dorso, joelhos e cotovelos) deve ser realizada idealmente com:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 48 horas.",
            "B) 3 a 5 dias.",
            "C) 12 a 14 dias (podendo postergar até 21 dias para prevenir deiscências).",
            "D) Não devem ser retirados, devendo aguardar extrusão espontânea de fios inabsorvíveis."
        ],
        "gabarito": "Alternativa C — 12 a 14 dias (podendo postergar até 21 dias para prevenir deiscências).\n\nA movimentação contínua e as forças de distensão nessas áreas exigem que a ferida atinja maior percentual de resistência colágena antes da retirada da sustentação dos pontos.\n\n• a) Causa deiscência traumática imediata.\n• b) Prazo curto exclusivo de face e pescoço.\n• d) Fios inabsorvíveis de pele devem sempre ser removidos para evitar infecção e granuloma de corpo estranho.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 341
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A cicatrização de feridas compreende quatro fases biológicas clássicas e sobrepostas, cuja sequência cronológica correta é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Remodelação, maturação, proliferação e hemóstase.",
            "B) Hemostasia, inflamatória, proliferativa e maturação/remodelamento.",
            "C) Proliferativa, exsudativa, necrótica e hemostática.",
            "D) Inflamatória, remodelação, granulação e angiogênese isolada."
        ],
        "gabarito": "Alternativa B — Hemostasia, inflamatória, proliferativa e maturação/remodelamento.\n\n• Hemostasia (minutos): plaquetas e tampão de fibrina.\n• Inflamatória (1 a 4 dias): neutrófilos e macrófagos.\n• Proliferativa (4 a 21 dias): fibroblastos, colágeno tipo III, angiogênese.\n• Remodelação (semanas a meses): substituição por colágeno tipo I.\n\n• a) Sequência invertida.\n• c) Fases patológicas inexistentes na fisiologia normal.\n• d) Sequência fora da ordem biológica temporal.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 342
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A célula chave predominante na fase proliferativa da cicatrização, responsável pela síntese de colágeno e componentes da matriz extracelular, é o:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Macrófago ativado.",
            "B) Neutrófilo polimorfonuclear.",
            "C) Fibroblasto.",
            "D) Plasmócito produtor de IgE."
        ],
        "gabarito": "Alternativa C — Fibroblasto.\n\nEstimulados por citocinas como TGF-beta e PDGF produzidas pelos macrófagos, os fibroblastos produzem colágeno, fibronectina e proteoglicanos que estruturam a nova matriz tecidual.\n\n• a) Célula-chave da fase inflamatória e orquestradora do processo.\n• b) Primeira célula a chegar à ferida (24-48h) com função de fagocitose inicial.\n• d) Célula de resposta imune humoral, não produtora da matriz de cicatrização.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 343
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O colágeno predominante na pele madura e na cicatriz final após o remodelamento é o:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Colágeno tipo III.",
            "B) Colágeno tipo I.",
            "C) Colágeno tipo IV.",
            "D) Colágeno tipo VII."
        ],
        "gabarito": "Alternativa B — Colágeno tipo I.\n\nNa fase inicial proliferativa deposita-se colágeno tipo III (imaturo, delgado); durante o remodelamento ele é degradado por colagenases e substituído por colágeno tipo I (espesso e com alta resistência tênsil, compondo 80-90% da pele normal).\n\n• a) Predomina na fase precoce da ferida e no tecido de granulação jovem.\n• c) Componente estrutural da lâmina basal subepitelial.\n• d) Forma fibrilas de ancoragem na junção dermoepidérmica.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 344
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A diferença essencial entre cicatriz hipertrófica e queloide é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) O queloide respeita estritamente as margens originais da ferida inicial.",
            "B) O queloide ultrapassa as margens da ferida original, invadindo tecido sadio adjacente, tem predisposição genética e não regride espontaneamente.",
            "C) A cicatriz hipertrófica nunca regride com o tempo e acomete apenas a população caucasiana.",
            "D) O queloide é composto exclusivamente por colágeno tipo IV acelular."
        ],
        "gabarito": "Alternativa B — O queloide ultrapassa as margens da ferida original, invadindo tecido sadio adjacente, tem predisposição genética e não regride espontaneamente.\n\nA cicatriz hipertrófica é elevada e tensa, mas limita-se estritamente aos limites da incisão cirúrgica inicial e tende a regredir ou clarear após meses a anos.\n\n• a) É a cicatriz hipertrófica que respeita as margens da ferida.\n• c) A cicatriz hipertrófica frequentemente melhora com o tempo e atinge qualquer etnia.\n• d) É composto por feixes espessos e desorganizados de colágeno tipos I e III.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 345
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Fatores sistêmicos clássicos associados ao retardo significativo da cicatrização de feridas e maior risco de deiscência incluem, EXCETO:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Diabetes mellitus descompensado e vasculopatia periférica.",
            "B) Uso crônico de corticosteroides e imunossupressores.",
            "C) Tabagismo e desnutrição proteico-calórica severa.",
            "D) Exercício físico leve aeróbico regular e hidratação adequada."
        ],
        "gabarito": "Alternativa D — Exercício físico leve aeróbico regular e hidratação adequada.\n\nA atividade física orientada e o estado de boa hidratação melhoram o fluxo sanguíneo tecidual periférico e a oxigenação celular, não prejudicando a cicatrização.\n\n• a) A hiperglicemia altera quimiotaxia leucocitária e a microangiopatia reduz perfusão de oxigênio.\n• b) Corticoides inibem macrófagos e suprimem a síntese de colágeno pelos fibroblastos.\n• c) O monóxido de carbono e a nicotina provocam vasoespasmo e hipóxia celular, enquanto a desnutrição impede a síntese proteica da matriz.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 346
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O seroma de ferida operatória consiste em:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Acúmulo de sangue coagulado sob alta pressão com risco de compressão mecânica.",
            "B) Coleção subcutânea líquida amarelo-citrina formada por linfa e exsudato em áreas de grande descolamento tecidual ou espaço morto.",
            "C) Infiltração purulenta difusa com necrose bacteriana da aponeurose.",
            "D) Extravasamento de fezes através da linha de incisão."
        ],
        "gabarito": "Alternativa B — Coleção subcutânea líquida amarelo-citrina formada por linfa e exsudato em áreas de grande descolamento tecidual ou espaço morto.\n\nComum após cirurgias como mastectomias, abdominoplastias e grandes hérnias com secção de vasos linfáticos e descolamento extenso de subcutâneo.\n\n• a) Esse é o hematoma operatório.\n• c) Descreve infecção de sítio cirúrgico profunda / fasceíte.\n• d) Configura fístula enterocutânea.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 347
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A conduta recomendada para seroma pós-operatório sintomático, volumoso e flutuante na ferida é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Reabertura ampla imediata de toda a fáscia aponeurótica no centro cirúrgico.",
            "B) Punção evacuadora com agulha e seringa calibrosa sob técnica asséptica estrita, seguida de curativo compressivo.",
            "C) Introdução diária de antibióticos tópicos no leito fechado.",
            "D) Aplicação contínua de compressas quentes úmidas sem evacuação."
        ],
        "gabarito": "Alternativa B — Punção evacuadora com agulha e seringa calibrosa sob técnica asséptica estrita, seguida de curativo compressivo.\n\nA punção alivia a tensão tecidual e o curativo compressivo aproxima as superfícies para obliterar o espaço morto remanescente.\n\n• a) Cirurgia desnecessária e agressiva; a aponeurose profunda está íntegra.\n• c) Pomadas tópicas não tratam líquido acumulado no subcutâneo profundo.\n• d) Calor úmido em coleção retida pode favorecer infecção secundária sem drenar o fluido.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 348
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Paciente no 4º dia pós-operatório de tireoidectomia total refere dor cervical súbita, dispneia progressiva, estridor inspiratório e nota-se tumefação volumosa e tensa sob a ferida. O diagnóstico e a conduta imediata são:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Seroma benigno; alta hospitalar com analgésicos orais.",
            "B) Hematoma cervical expansivo sufocante; abertura imediata da ferida no leito para descompressão e alívio da via aérea.",
            "C) Hipocalcemia aguda; infusão lenta de cloreto de potássio em veia periférica.",
            "D) Deiscência de aponeurose com hérnia laríngea exposta."
        ],
        "gabarito": "Alternativa B — Hematoma cervical expansivo sufocante; abertura imediata da ferida no leito para descompressão e alívio da via aérea.\n\nEmergência cirúrgica dramática: o sangue acumulado sob a fáscia cervical profunda colapsa a traqueia e drena para os tecidos do pescoço; a descompressão no próprio leito desfaz a obstrução e salva a vida do paciente antes do retorno ao bloco.\n\n• a) Seroma não expande bruscamente nem causa asfixia aguda.\n• c) Hipocalcemia cursa com parestesia e tetania (sinais de Chvostek e Trousseau), sem massa cervical tensa.\n• d) Não é entidade clínica compatível com o quadro descrito.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 349
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A infecção de sítio cirúrgico (ISC) incisional superficial envolve:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Apenas a pele e o tecido subcutâneo da incisão cirúrgica.",
            "B) Os planos musculares e fáscias profundas exclusivamente.",
            "C) Qualquer órgão ou cavidade anatômica manipulada na cirurgia.",
            "D) Os vasos linfáticos periféricos distantes do sítio operatório."
        ],
        "gabarito": "Alternativa A — Apenas a pele e o tecido subcutâneo da incisão cirúrgica.\n\nLimita-se ao plano dérmico e adiposo acima da fáscia de revestimento muscular, apresentando drenagem purulenta local ou sinais flogísticos (dor, calor, rubor, edema).\n\n• b) Classificada como infecção incisional profunda.\n• c) Classificada como infecção de sítio cirúrgico de órgão/espaço (ex.: abcesso intra-abdominal).\n• d) Apresenta-se como linfangite ou erisipela difusa.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 350
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Segundo critérios dos Centers for Disease Control and Prevention (CDC), uma infecção de sítio cirúrgico superficial é definida temporalmente como aquela que ocorre:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Até 24 horas após o procedimento.",
            "B) Até 30 dias após o procedimento cirúrgico.",
            "C) Somente após 90 dias ininterruptos.",
            "D) Exclusivamente durante a internação hospitalar."
        ],
        "gabarito": "Alternativa B — Até 30 dias após o procedimento cirúrgico.\n\nO período padrão de vigilância epidemiológica para infecções incisionais na ausência de implantes permanentes é de 30 dias após a data da cirurgia.\n\n• a) Nas primeiras 24 horas a febre costuma ser de origem atelectásica inflamatória reflexa.\n• c) Período reservado a procedimentos com colocação de implantes/próteses.\n• d) A maioria das ISC manifesta-se ambulatorialmente após a alta hospitalar.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 351
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em cirurgias com colocação de implantes ou próteses definitivas (ex.: prótese de quadril, prótese vascular, tela de hérnia), o período de vigilância epidemiológica para diagnóstico de infecção de sítio cirúrgico estende-se por até:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 15 dias.",
            "B) 30 dias.",
            "C) 90 dias (ou até 1 ano dependendo do critério de vigilância de implante).",
            "D) 5 anos incondicionalmente."
        ],
        "gabarito": "Alternativa C — 90 dias (ou até 1 ano dependendo do critério de vigilância de implante).\n\nCorpos estranhos e implantes requerem inóculos bacterianos muito menores e colonização de biofilme lento, manifestando infecção meses após a intervenção inicial.\n\n• a) Prazo curto que subestima infecções protéticas tardias.\n• b) Prazo padrão apenas para cirurgias sem implante.\n• d) Não há critérios de vigilância com 5 anos mantidos.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 352
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O patógeno mais comumente isolado em infecções de sítio cirúrgico de cirurgias limpas e de partes moles é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Escherichia coli.",
            "B) Staphylococcus aureus (sensível ou resistente à meticilina - MRSA).",
            "C) Pseudomonas aeruginosa.",
            "D) Clostridium perfringens."
        ],
        "gabarito": "Alternativa B — Staphylococcus aureus (sensível ou resistente à meticilina - MRSA).\n\nPrincipal colonizador da microbiota da pele e narinas humanas, sendo a fonte primária de contaminação exógena e endógena em incisões cirúrgicas limpas.\n\n• a) Bactéria entérica mais comum em cirurgias colorretais e biliares.\n• c) Mais frequente em queimados graves e feridas crônicas hospitalares expostas a umidade.\n• d) Agente da mionecrose clostridiana e gangrena gasosa traumática grave.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 353
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A profilaxia antimicrobiana cirúrgica parenteral profilática padrão em cirurgias limpas com uso de implante deve ser administrada:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 24 horas antes do início da cirurgia por via oral.",
            "B) No momento da indução anestésica (idealmente dentro de 30 a 60 minutos antes da incisão da pele).",
            "C) Somente após o término da cirurgia durante o fechamento da pele. ",
            "D) Diariamente por 14 dias no pós-operatório hospitalar."
        ],
        "gabarito": "Alternativa B — No momento da indução anestésica (idealmente dentro de 30 a 60 minutos antes da incisão da pele).\n\nGarante que o nível tecidual do antibiótico supere a concentração inibitória mínima (CIM) no exato instante em que o bisturi rompe a barreira cutânea.\n\n• a) Níveis séricos caem e selecionam flora resistente antes do ato.\n• c) Administrar após o corte da pele perde a janela preventiva e eleva as taxas de infecção.\n• d) Não reduz infecção de sítio cirúrgico e seleciona bactérias multirresistentes.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 354
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O antimicrobiano de escolha universal para profilaxia cirúrgica em procedimentos cirúrgicos gerais e ortopédicos limpos é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Cefazolina (cefalosporina de 1ª geração intravenosa).",
            "B) Ciprofloxacino oral.",
            "C) Meropenem em infusão estendida.",
            "D) Vancomicina combinada com gentamicina rotineira para todos os pacientes."
        ],
        "gabarito": "Alternativa A — Cefazolina (cefalosporina de 1ª geração intravenosa).\n\nPossui excelente atividade bactericida contra Staphylococcus aureus e estreptococos, boa penetração tecidual, meia-vida favorável de 2 horas e baixo custo.\n\n• b) Espectro inadequado para flora de pele e risco de resistência.\n• c) Carbapenêmico de amplo espectro de uso estritamente terapêutico em infecções graves.\n• d) A vancomicina é restrita a pacientes sabidamente colonizados por MRSA ou alérgicos graves a beta-lactâmicos.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 355
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em relação à profilaxia antimicrobiana cirúrgica, a duração padrão pós-operatória recomendada pelas diretrizes internacionais para a imensa maioria dos procedimentos é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Dose única na indução, mantida por no máximo 24 horas após o término da cirurgia.",
            "B) 7 dias completos com troca semanal de esquema.",
            "C) 30 dias ininterruptos com cobertura para fungos.",
            "D) Indeterminada, até a retirada de todos os drenos e pontos."
        ],
        "gabarito": "Alternativa A — Dose única na indução, mantida por no máximo 24 horas após o término da cirurgia.\n\nEm grande parte dos procedimentos a dose única é suficiente (com repique intraoperatório se a cirurgia durar mais de 2 meias-vidas da droga ou houver perda volêmica > 1.500 mL); prolongar além de 24h não confere proteção adicional.\n\n• b) Erro comum que induz infecção por Clostridioides difficile e resistência antimicrobiana.\n• c) Conduta errônea.\n• d) A presença de drenos não justifica manutenção indefinida de antibióticos profiláticos.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 356
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A tricotomia (remoção de pelos) pré-operatória, quando estritamente necessária, deve ser realizada:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Na véspera da cirurgia com lâmina de barbear convencional (gilete) no domicílio do paciente.",
            "B) Imediatamente antes da cirurgia (na sala operatória ou antessala), preferencialmente com tricotomizador elétrico (clipper) sem lesar a pele.",
            "C) 7 dias antes com cera depilatória a quente.",
            "D) A lâmina de barbear é o método padrão-ouro preferido em qualquer situação."
        ],
        "gabarito": "Alternativa B — Imediatamente antes da cirurgia (na sala operatória ou antessala), preferencialmente com tricotomizador elétrico (clipper) sem lesar a pele.\n\nA regra de ouro é: não raspar os pelos se não interferirem no campo cirúrgico; se indispensável, cortar rente com clipper elétrico na hora da cirurgia.\n\n• a) A tricotomia na véspera multiplica o risco de infecção por colonização das microfissuras da pele.\n• c) Pode provocar foliculite e dermatite bacteriana extensa.\n• d) A lâmina de barbear tradicional está formalmente proscrita em protocolos de cirurgia segura.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 357
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O uso de lâmina de barbear convencional (gilete) para tricotomia pré-operatória é desaconselhado porque:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Não remove pelos com espessura microscópica.",
            "B) Cria microfissuras e abrasões na epiderme que são colonizadas rapidamente por bactérias da microbiota cutânea, aumentando o risco de infecção de sítio cirúrgico.",
            "C) Diminui a aderência dos campos estéreis adesivos.",
            "D) Desativa a ação da clorexidina alcoólica por reação química."
        ],
        "gabarito": "Alternativa B — Cria microfissuras e abrasões na epiderme que são colonizadas rapidamente por bactérias da microbiota cutânea, aumentando o risco de infecção de sítio cirúrgico.\n\nEstudos clássicos mostram que o risco de infecção após raspagem com lâmina na véspera ultrapassa 5-8%, enquanto o uso de tricotomizador elétrico imediato mantém taxas abaixo de 1%.\n\n• a) A lâmina corta rente, mas o problema reside no microtrauma dérmico.\n• c) Não é o motivo biológico da proibição.\n• d) Não há inativação química da clorexidina pela lâmina metálica.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 358
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O método de esterilização física padrão para instrumentais cirúrgicos metálicos termo-resistentes em ambiente hospitalar é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Autoclave a vapor saturado sob pressão.",
            "B) Estufa seca de Pasteur a 100°C por 30 minutos.",
            "C) Imersão em álcool etílico a 70% por 10 minutos.",
            "D) Exposição à luz solar direta em ambiente aberto."
        ],
        "gabarito": "Alternativa A — Autoclave a vapor saturado sob pressão.\n\nO vapor sob pressão atinge temperaturas de 121°C a 134°C, desnaturando irreversivelmente proteínas e enzimas bacterianas, fúngicas, virais e esporos com alta eficácia, rapidez e sem resíduos tóxicos.\n\n• b) O calor seco em estufa exige temperaturas muito mais altas (160-180°C) e tempos prolongados de 1-2h.\n• c) O álcool é apenas desinfetante de nível intermediário, não esteriliza esporos.\n• d) Método ineficaz para esterilização cirúrgica.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 359
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A esterilização de materiais termossensíveis (como cabos de fibra óptica, ópticas laparoscópicas e materiais poliméricos delicados) é comumente realizada por:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Flambagem direta em bico de Bunsen.",
            "B) Gás óxido de etileno ou plasma de peróxido de hidrogênio (Sterrad).",
            "C) Fervura em água a 100°C por 5 minutos.",
            "D) Lavagem exclusiva com água oxigenada a 10 volumes."
        ],
        "gabarito": "Alternativa B — Gás óxido de etileno ou plasma de peróxido de hidrogênio (Sterrad).\n\nMétodos a baixa temperatura (< 55°C) que preservam a integridade óptica e eletrônica dos equipamentos sem fundir polímeros nem descalibrar lentes delicadas.\n\n• a) Destruiria o instrumental por combustão direta.\n• c) Fervura não atinge temperatura de esterilização e danifica componentes ópticos.\n• d) Não promove esterilização de alta segurança cirúrgica.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    },
    # 360
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A degermação das mãos e antebraços da equipe cirúrgica antes de calçar as luvas e aventais estéreis tem como objetivo:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Eliminar completamente toda a microbiota residente das camadas profundas dos folículos sebáceos.",
            "B) Remover a sujidade, a microbiota transitória e reduzir a carga bacteriana residente da pele, mantendo ação residual durante a cirurgia.",
            "C) Substituir o uso de luvas cirúrgicas durante pequenos atos operatórios.",
            "D) Promover esfoliação com sangramento capilar superficial obrigatório."
        ],
        "gabarito": "Alternativa B — Remover a sujidade, a microbiota transitória e reduzir a carga bacteriana residente da pele, mantendo ação residual durante a cirurgia.\n\nA esterilização absoluta da pele viva é biologicamente impossível; a escovação/antissepsia reduz a microbiota a níveis seguros para proteger o paciente caso haja microperfuração inadvertida da luva estéril.\n\n• a) A microbiota residente profunda não pode ser erradicada sem destruição da epiderme.\n• c) O uso de luvas estéreis é barreira física obrigatória e insubstituível.\n• d) Escovação agressiva que lesa a pele é contraindicada pois expõe camadas profundas colonizadas.\n\nRevisar: 10 — Anestesia local e feridas cirúrgicas"
    }
]

with open('src/bc_360_6.ts', 'w') as f:
    f.write('export const bc360Part6 = ' + json.dumps(questions, ensure_ascii=False, indent=4) + ';\n')

print(f"Generated {len(questions)} questions in src/bc_360_6.ts")
