import { bc57Questions } from './bc_57q';
import { bc360Part1 } from './bc_360_1';
import { bc360Part2 } from './bc_360_2';
import { bc360Part3 } from './bc_360_3';
import { bc360Part4 } from './bc_360_4';
import { bc360Part5 } from './bc_360_5';
import { bc360Part6 } from './bc_360_6';

const basesCirurgicasBase = [
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Assinale a alternativa em que todos os ambientes pertencem à mesma zona do centro cirúrgico:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Conforto médico, expurgo e secretaria.",
            "B) Expurgo, corredor periférico e área de transferência.",
            "C) Lavabo, sala cirúrgica e vestiário.",
            "D) Farmácia, sala de espera e SRPA."
        ],
        "gabarito": "Alternativa B — Expurgo, corredor periférico e área de transferência.\n\nOs três são ambientes da zona irrestrita. Nas demais alternativas há mistura de zonas, e basta um item fora do grupo para eliminar a opção inteira.\n\n• a) Expurgo é irrestrito; os outros dois são semirrestritos.\n• c) Mistura semirrestrito, restrito e irrestrito.\n• d) Sala de espera é irrestrita; os outros dois são semirrestritos.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Após o uso do bisturi ultrassônico, o cuidado específico exigido é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Trocar o gás inerte do reservatório.",
            "B) Reduzir a frequência do gerador para a faixa da rede elétrica.",
            "C) Aguardar o resfriamento da lâmina, que permanece quente e pode lesar por contato.",
            "D) Recolocar a placa dispersiva antes do próximo uso."
        ],
        "gabarito": "Alternativa C — Aguardar o resfriamento da lâmina, que permanece quente e pode lesar por contato.\n\nA lâmina retém calor após a ativação; encostá-la em alça intestinal ou em outra estrutura enquanto ainda está quente causa lesão térmica inadvertida.\n\n• a) Incorreta: Gás inerte é do plasma de argônio.\n• b) Incorreta: Não há esse ajuste.\n• d) Incorreta: O ultrassônico não utiliza placa dispersiva.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O efeito eletrolítico da corrente consiste em:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Movimento de íons com alteração do equilíbrio iônico, relevante em corrente contínua ou de baixa frequência.",
            "B) Conversão de energia elétrica em calor.",
            "C) Indução de corrente em condutor vizinho.",
            "D) Estimulação de nervos e músculos."
        ],
        "gabarito": "Alternativa A — Movimento de íons com alteração do equilíbrio iônico, relevante em corrente contínua ou de baixa frequência.\n\nÉ um efeito indesejado, evitado pelas altas frequências empregadas em cirurgia, assim como o farádico.\n\n• b) Incorreta: Esse é o efeito térmico, ou Joule.\n• c) Incorreta: Isso descreve o acoplamento capacitivo.\n• d) Incorreta: Esse é o efeito farádico.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A ação da aldosterona na resposta ao trauma consiste em:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Reduzir a reabsorção de água nos ductos coletores.",
            "B) Estimular diretamente a gliconeogênese hepática.",
            "C) Aumentar a retenção de sódio e água e aumentar a excreção de potássio.",
            "D) Aumentar a excreção de sódio e reter potássio."
        ],
        "gabarito": "Alternativa C — Aumentar a retenção de sódio e água e aumentar a excreção de potássio.\n\nA aldosterona fecha o circuito do SRAA: retém sódio e, com ele, água, ao custo da perda de potássio.\n\n• a) Incorreta: Isso seria o oposto da ação do ADH.\n• b) Incorreta: A gliconeogênese é estimulada sobretudo pelo cortisol e pelo glucagon.\n• d) Incorreta: Inverte completamente a ação do hormônio.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "São consideradas zonas perigosas do capote cirúrgico, que não devem ser tocadas com as mãos enluvadas:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Gola, mangas e face anterior do abdome.",
            "B) Mangas, punhos e face anterior do tórax.",
            "C) Gola, dorso e terço inferior.",
            "D) Apenas o dorso."
        ],
        "gabarito": "Alternativa C — Gola, dorso e terço inferior.\n\nEssas três regiões não são consideradas estéreis, seja por estarem fora do campo de visão, seja por proximidade com áreas de contaminação.\n\n• a) As mangas, acima do punho, fazem parte da área estéril.\n• b) A face anterior do tórax acima da cintura é área estéril de trabalho.\n• d) Incompleta — deixa de fora gola e terço inferior.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Quanto à angulação, as agulhas cirúrgicas classificam-se em:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Curvas (90º), oblíquas (45º) e retas (0º).",
            "B) Cilíndricas, triangulares e prismáticas.",
            "C) Traumáticas e atraumáticas.",
            "D) Curvas (180º), semirretas (<180º) e retas (0º)."
        ],
        "gabarito": "Alternativa D — Curvas (180º), semirretas (<180º) e retas (0º).\n\nA angulação descreve o arco da agulha; a secção transversal (cilíndrica, triangular, prismática) é a outra classificação, referente à ponta.\n\n• a) Não corresponde à classificação do material.\n• b) Essa é a classificação pela secção transversal.\n• c) Esse par se refere à presença ou não de fundo de agulha.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Ordenando as pinças hemostáticas da mais delicada para a mais robusta, obtém-se:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Halsted, Kelly, Rochester.",
            "B) Halsted, Rochester, Kelly.",
            "C) Rochester, Kelly, Halsted.",
            "D) Kelly, Halsted, Rochester."
        ],
        "gabarito": "Alternativa A — Halsted, Kelly, Rochester.\n\nHalsted é a 'mosquito', para vasos finos; Kelly é intermediária; Rochester é a mais grosseira, para pedículos espessos. Todas existem curvas e retas.\n\n• b) A Rochester é mais robusta que a Kelly.\n• c) Ordem invertida.\n• d) Halsted é mais delicada que a Kelly.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre o catgut simples e o catgut cromado, é correto afirmar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Ambos são absorvíveis de origem animal, e o cromado tem absorção mais lenta.",
            "B) Ambos são inabsorvíveis.",
            "C) O simples tem absorção mais lenta que o cromado.",
            "D) O cromado é sintético e o simples, natural."
        ],
        "gabarito": "Alternativa A — Ambos são absorvíveis de origem animal, e o cromado tem absorção mais lenta.\n\nO tratamento com sais de cromo retarda a degradação do colágeno, prolongando o suporte oferecido pelo fio.\n\n• b) Incorreta: Os dois são absorvíveis.\n• c) Incorreta: Inverte a relação entre os dois.\n• d) Incorreta: Os dois são de origem animal.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A citocina que estimula o fígado a produzir proteína C-reativa e fibrinogênio é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) IL-10.",
            "B) TNF-alfa, isoladamente.",
            "C) Interferon-gama.",
            "D) IL-6."
        ],
        "gabarito": "Alternativa D — IL-6.\n\nA IL-6 é a principal indutora da resposta hepática de fase aguda. IL-1 e TNF participam da amplificação inflamatória geral.\n\n• a) A IL-10 tem perfil anti-inflamatório.\n• b) O TNF amplifica a inflamação, mas não é o indutor principal da fase aguda.\n• c) Atua sobretudo na ativação de macrófagos.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A hiperglicemia de estresse em paciente não diabético decorre de:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Destruição das células beta pancreáticas pelo trauma.",
            "B) Aumento de catecolaminas, cortisol e glucagon somado à resistência periférica à insulina.",
            "C) Excesso de oferta de glicose na reposição volêmica, exclusivamente.",
            "D) Redução da gliconeogênese hepática."
        ],
        "gabarito": "Alternativa B — Aumento de catecolaminas, cortisol e glucagon somado à resistência periférica à insulina.\n\nOs hormônios contrarreguladores elevam glicogenólise e gliconeogênese, enquanto a captação periférica cai. A glicose é assim direcionada ao SNC e ao coração.\n\n• a) Não há destruição de ilhotas no trauma.\n• c) A palavra 'exclusivamente' torna a alternativa falsa: o fenômeno é multifatorial.\n• d) A gliconeogênese aumenta.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A sala de recuperação pós-anestésica (SRPA) pertence à zona:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Externa ao centro cirúrgico.",
            "B) Irrestrita, porque recebe familiares.",
            "C) Semirrestrita.",
            "D) Restrita, por abrigar pacientes anestesiados."
        ],
        "gabarito": "Alternativa C — Semirrestrita.\n\nA SRPA é ambiente da zona limpa, ao lado da recepção do paciente, da farmácia, da área de enfermagem e do conforto médico.\n\n• a) A SRPA integra o centro cirúrgico.\n• b) Familiares não circulam livremente na SRPA.\n• d) A zona restrita é composta pelas salas cirúrgicas.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A perda de massa muscular no paciente crítico é clinicamente relevante porque:",
        "interactionType": "multiple-choice",
        "options": [
            "A) É revertida espontaneamente em 48 horas após a alta da UTI.",
            "B) Não guarda relação com a gravidade do trauma.",
            "C) Reduz a demanda energética e favorece o desmame ventilatório.",
            "D) Associa-se a fraqueza adquirida e a recuperação funcional mais lenta."
        ],
        "gabarito": "Alternativa D — Associa-se a fraqueza adquirida e a recuperação funcional mais lenta.\n\nA proteólise consome justamente a musculatura de que o paciente precisa para respirar, mobilizar-se e reabilitar-se — daí o impacto funcional prolongado.\n\n• a) Incorreta: A recuperação da massa magra leva semanas a meses.\n• b) Incorreta: É mais intensa em sepse, grandes queimaduras e trauma extenso.\n• c) Incorreta: A perda muscular prejudica o desmame, não o favorece.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O edema observado após a ressuscitação volêmica do politraumatizado é explicado principalmente por:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Obstrução linfática por compressão tumoral.",
            "B) Hipoalbuminemia isolada de causa hepática.",
            "C) Retenção hidrossalina mediada por ADH e aldosterona somada ao volume infundido.",
            "D) Insuficiência cardíaca induzida pelas catecolaminas."
        ],
        "gabarito": "Alternativa C — Retenção hidrossalina mediada por ADH e aldosterona somada ao volume infundido.\n\nO organismo está programado para reter sódio e água; quando se soma a isso a reposição volêmica, o excedente extravasa para o interstício.\n\n• a) Incorreta: Sem relação com o quadro descrito.\n• b) Incorreta: Pode contribuir, mas não é a explicação principal nesse contexto.\n• d) Incorreta: As catecolaminas aumentam a contratilidade na fase inicial.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Homem de 28 anos, politraumatizado, chega taquicárdico, frio e com pressão limítrofe; apresenta oligúria nas primeiras horas e, nos dias seguintes, glicemia elevada e perda de massa muscular. Assinale a alternativa correta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A oligúria inicial indica sobrecarga hídrica e exige restrição de volume.",
            "B) A perda muscular decorre de imobilidade isolada, sem relação com o estado hormonal.",
            "C) As alterações são explicadas pela ativação simpática e pelo eixo HPA, com participação de ADH e SRAA.",
            "D) A hiperglicemia obriga o diagnóstico de diabetes mellitus prévio."
        ],
        "gabarito": "Alternativa C — As alterações são explicadas pela ativação simpática e pelo eixo HPA, com participação de ADH e SRAA.\n\nÉ o caso da aula: catecolaminas e cortisol explicam taquicardia, hiperglicemia e catabolismo; ADH e SRAA explicam a oligúria.\n\n• a) A oligúria aqui traduz hipovolemia e retenção hidrossalina, não sobrecarga.\n• b) O catabolismo proteico é hormonalmente mediado.\n• d) A hiperglicemia de estresse ocorre sem diabetes prévio.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A verificação de que o monitor multiparâmetro está conectado e funcionante é feita:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Antes da incisão cirúrgica.",
            "B) Antes da saída do paciente da sala.",
            "C) Somente na sala de recuperação.",
            "D) Antes da indução anestésica."
        ],
        "gabarito": "Alternativa D — Antes da indução anestésica.\n\nA checagem de equipamento anestésico e monitorização pertence ao sign in, porque precisa estar resolvida antes de o paciente ser induzido.\n\n• a) Incorreta: O time out foca equipe, procedimento, antibiótico e pontos críticos.\n• b) Incorreta: O sign out trata do que foi feito e do que sai da sala.\n• c) Incorreta: Tarde demais — a monitorização acompanha todo o ato anestésico.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "No século XIX, as infecções cirúrgicas e a febre puerperal causavam taxas aterrorizantes de mortalidade hospitalar. O nascimento da assepsia e antissepsia modernas está indissoluvelmente ligado aos pioneirismos de:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Robert Koch, ao demonstrar a erradicação bacteriana por meio do uso de sulfas endovenosas profiláticas em todos os pacientes operados.",
            "B) Ignaz Semmelweis, ao impor a lavagem obrigatória das mãos com solução de cal clorada em Viena, e Joseph Lister, ao introduzir a antissepsia com ácido carbólico (fenol) em curativos, mãos e instrumental cirúrgico.",
            "C) Louis Pasteur, ao operar pessoalmente gastrectomias totais sob fluxo laminar estéril na França.",
            "D) Edward Jenner, que demonstrou que a vacinação antivariólica impedia a infecção de feridas cirúrgicas traumáticas."
        ],
        "gabarito": "Alternativa B — Ignaz Semmelweis, ao impor a lavagem obrigatória das mãos com solução de cal clorada em Viena, e Joseph Lister, ao introduzir a antissepsia com ácido carbólico (fenol) em curativos, mãos e instrumental cirúrgico.\n\nEm 1847, em Viena, Ignaz Semmelweis percebeu que a febre puerperal era transmitida pelas mãos contaminadas de médicos e estudantes vindos diretamente de necropsias. Ao instituir a higienização com hipoclorito de cálcio (cal clorada), reduziu a mortalidade obstétrica de quase 20% para menos de 2%. Duas décadas depois (1867), em Glasgow, o cirurgião escocês Joseph Lister fundamentou-se na teoria dos germes de Pasteur e introduziu a pulverização e compressas de ácido fênico (ácido carbólico), inaugurando a antissepsia cirúrgica e reduzindo drasticamente as infecções de feridas e amputações.\n\n• a) Incorreta: Sulfas só surgiram na década de 1930 (Prontosil por Domagk).\n• c) Incorreta: Pasteur era químico e microbiologista, não cirurgião; fluxo laminar foi desenvolvido no século XX por Charnley.\n• d) Incorreta: Jenner desenvolveu a vacina contra a varíola (1796), sem relação com antissepsia de sítio cirúrgico.\n\nRevisar: 01 — História da cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O efeito de vaporização distingue-se por:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Depender de contato firme e potência baixa.",
            "B) Ser obtido apenas com energia bipolar.",
            "C) Produzir escara marrom-clara e carbonização superficial.",
            "D) Vaporizar o tecido sem produção de carvão, com explosão celular."
        ],
        "gabarito": "Alternativa D — Vaporizar o tecido sem produção de carvão, com explosão celular.\n\nO calor é tão intenso e tão rápido que o conteúdo celular passa direto à fase gasosa; não há tempo para a carbonização que caracteriza a coagulação.\n\n• a) Incorreta: A vaporização ocorre sem contato direto e com energia elevada.\n• b) Incorreta: Pode ser obtido com energia monopolar.\n• c) Incorreta: Escara e carbonização são da dessecação e da coagulação.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A transferência de energia para um condutor próximo, sem contato direto, através do isolamento do instrumento, define:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Falha de isolamento.",
            "B) Efeito farádico.",
            "C) Acoplamento direto.",
            "D) Acoplamento capacitivo."
        ],
        "gabarito": "Alternativa D — Acoplamento capacitivo.\n\nO acoplamento capacitivo é induzido eletricamente e dispensa contato — situação clássica do trocarte metálico dentro de cânula plástica. É o mecanismo de mais difícil percepção.\n\n• a) Exige defeito físico na capa isolante.\n• b) É a estimulação neuromuscular, evitada pela alta frequência.\n• c) Exige contato entre eletrodo e outro instrumento.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A separação de planos musculares feita com o dedo e com gaze montada, sem instrumento cortante, é chamada:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Diérese romba.",
            "B) Diérese cruenta.",
            "C) Exérese parcial.",
            "D) Hemostasia mecânica."
        ],
        "gabarito": "Alternativa A — Diérese romba.\n\nA diérese romba (ou divulsão) afasta as fibras respeitando os planos anatômicos, sem secção. A cruenta usa bisturi, tesoura ou energia.\n\n• b) Cruenta é a que emprega instrumento cortante.\n• c) Exérese é remoção de tecido.\n• d) Não há controle de sangramento nesse gesto.\n\nRevisar: 02 — Tempos fundamentais"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Assinale a alternativa que não corresponde a um postulado de Van Winkle e Hasting:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A perda de resistência do fio deve ser compensada pelo ganho de resistência da cicatriz.",
            "B) As alterações biológicas provocadas pelo fio no processo de cicatrização devem ser conhecidas.",
            "C) O fio deve ser sempre absorvível, monofilamentar e de origem sintética.",
            "D) O fio deve ser tão forte quanto o tecido que está sendo suturado."
        ],
        "gabarito": "Alternativa C — O fio deve ser sempre absorvível, monofilamentar e de origem sintética.\n\nOs três postulados tratam de resistência, compensação pela cicatriz e conhecimento da reação biológica. Nenhum prescreve um tipo único de fio.\n\n• a) É o segundo postulado — o mais cobrado.\n• b) É o terceiro postulado.\n• d) É o primeiro postulado.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em paciente portador de marca-passo submetido a eletrocirurgia, a preocupação principal é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A impossibilidade absoluta de uso de qualquer energia.",
            "B) A perda de eficácia do antisséptico usado no preparo.",
            "C) A interferência eletromagnética sobre o funcionamento do dispositivo.",
            "D) A absorção do calor pela bateria, com risco de explosão."
        ],
        "gabarito": "Alternativa C — A interferência eletromagnética sobre o funcionamento do dispositivo.\n\nA corrente de alta frequência pode ser interpretada pelo dispositivo como atividade elétrica cardíaca, alterando seu funcionamento. Por isso se prefere energia bipolar e se avaliam ajustes prévios.\n\n• a) Incorreta: O uso é possível com precauções.\n• b) Incorreta: Não há relação entre marca-passo e antissépticos.\n• d) Incorreta: Não é o mecanismo descrito.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Um acadêmico chega ao centro cirúrgico usando aliança, relógio de pulso e brincos. Essa conduta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) É permitida na zona irrestrita e na semirrestrita.",
            "B) Só é problema se os adornos forem metálicos.",
            "C) É aceitável desde que ele não entre em campo estéril.",
            "D) Contraria a NR 32, que veda o uso de adornos."
        ],
        "gabarito": "Alternativa D — Contraria a NR 32, que veda o uso de adornos.\n\nA vedação ao uso de adornos é norma de biossegurança e não depende de o profissional entrar ou não em campo: adornos abrigam microrganismos e dificultam a higienização das mãos.\n\n• a) A norma não abre essa exceção.\n• b) O material do adorno é irrelevante.\n• c) A regra não é condicionada à entrada em campo.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Os efeitos cardiovasculares da descarga simpática no trauma incluem:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Bradicardia e vasodilatação periférica.",
            "B) Aumento da frequência cardíaca, da contratilidade e vasoconstrição.",
            "C) Redução do débito cardíaco por depressão miocárdica direta.",
            "D) Vasodilatação esplâncnica seletiva."
        ],
        "gabarito": "Alternativa B — Aumento da frequência cardíaca, da contratilidade e vasoconstrição.\n\nÉ a tríade que se vê à beira do leito: taquicardia, extremidades frias e pressão sustentada às custas de vasoconstrição.\n\n• a) Incorreta: Descreve o oposto da resposta adrenérgica.\n• c) Incorreta: A contratilidade aumenta na fase inicial.\n• d) Incorreta: A vasoconstrição esplâncnica é o que ocorre, para redistribuir fluxo.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Paciente em pós-operatório de laparotomia evolui com íleo adinâmico, distensão e vômitos. O dispositivo indicado é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Gastrostomia percutânea de urgência.",
            "B) Sonda de Foley introduzida por via nasal.",
            "C) Sonda nasoenteral de silicone, para alimentação precoce.",
            "D) Sonda nasogástrica de plástico monolúmen, para drenagem e descompressão."
        ],
        "gabarito": "Alternativa D — Sonda nasogástrica de plástico monolúmen, para drenagem e descompressão.\n\nA descompressão gástrica aguda é a indicação clássica da sonda nasogástrica, tubo rígido e de lúmen único.\n\n• a) Procedimento para alimentação prolongada, não para descompressão aguda.\n• b) A Foley é sonda vesical — alternativa deliberadamente absurda.\n• c) A nasoenteral alimenta além do piloro; não resolve a distensão gástrica.\n\nRevisar: 08 — Sondas e cateteres"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A classificação do instrumental em comum e especial baseia-se em:",
        "interactionType": "multiple-choice",
        "options": [
            "A) O material de fabricação: aço inoxidável ou titânio.",
            "B) O emprego em qualquer instrumentação, contra o uso restrito a cirurgias específicas.",
            "C) O tamanho do instrumento.",
            "D) A posição na mesa: lado direito ou esquerdo do instrumentador."
        ],
        "gabarito": "Alternativa B — O emprego em qualquer instrumentação, contra o uso restrito a cirurgias específicas.\n\nComuns são os usados em toda instrumentação — diérese, hemostasia e síntese. Especiais atendem a cirurgias determinadas, como a Kocher, cubas e materiais próprios.\n\n• a) O material não define a classificação.\n• c) O tamanho diferencia calibres, não categorias.\n• d) A disposição na mesa segue os tempos operatórios.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O evento adverso mais comum associado à eletrocirurgia é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Queimadura.",
            "B) Interferência com marca-passo.",
            "C) Estimulação de tecidos excitáveis.",
            "D) Incêndio em sala cirúrgica."
        ],
        "gabarito": "Alternativa A — Queimadura.\n\nA queimadura, classicamente sob a placa dispersiva mal posicionada, é o evento adverso mais frequente — e o mais evitável.\n\n• b) Incorreta: Ocorre, mas é menos frequente.\n• c) Incorreta: Praticamente abolida pelas altas frequências.\n• d) Incorreta: É evento grave, porém raro.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Paciente de 70 anos com sequela de AVC, disfagia grave e previsão de alimentação enteral por tempo indeterminado. A via de escolha é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Sonda nasoenteral trocada a cada 30 dias.",
            "B) Gastrostomia, preferencialmente endoscópica.",
            "C) Nutrição parenteral total.",
            "D) Sonda nasogástrica de longa permanência."
        ],
        "gabarito": "Alternativa B — Gastrostomia, preferencialmente endoscópica.\n\nQuando a via oral está indisponível por tempo prolongado ou permanente, a gastrostomia substitui a sonda nasal, com menos desconforto e menos complicações locais. A via endoscópica é a preferencial.\n\n• a) Solução paliativa e desconfortável para prazo indeterminado.\n• c) O trato gastrointestinal está funcionante — a via enteral é preferida.\n• d) A nasogástrica é para descompressão, não para nutrição prolongada.\n\nRevisar: 08 — Sondas e cateteres"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "William Stewart Halsted (1852-1922), primeiro cirurgião-chefe do Hospital Johns Hopkins, estabeleceu as bases da cirurgia moderna ao transformar o ato operatório em uma ciência delicada e meticulosa. São contribuições históricas capitais de Halsted:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A introdução das luvas de borracha estéreis na rotina da equipe cirúrgica e a sistematização dos clássicos Princípios Fundamentais da técnica cirúrgica (manuseio atraumático, hemostasia meticulosa, preservação da vascularização e obliteração de espaços mortos).",
            "B) A preconização de incisões relâmpago sem hemostasia preventiva para evitar o ressecamento tecidual pelo ar ambiente.",
            "C) O banimento definitivo de suturas por planos anatômicos e a defesa de pontos em massa com grossos fios de aço trançado.",
            "D) A introdução do primeiro dreno a vácuo ativo e o desuso total de técnicas estéreis em laparotomias."
        ],
        "gabarito": "Alternativa A — A introdução das luvas de borracha estéreis na rotina da equipe cirúrgica e a sistematização dos clássicos Princípios Fundamentais da técnica cirúrgica (manuseio atraumático, hemostasia meticulosa, preservação da vascularização e obliteração de espaços mortos).\n\nEm 1889/1890, Halsted solicitou à Goodyear a fabricação de luvas finas de borracha para proteger a instrumentadora Caroline Hampton de dermatite por antissépticos; rapidamente o hospital percebeu que as luvas protegiam sobretudo a ferida operatória, consagrando a assepsia. Além disso, Halsted formulou os célebres Princípios de Halsted: manuseio delicado dos tecidos, hemostasia rigorosa, respeito ao suprimento sanguíneo, aposição tecidual precisa e sem tensão, assepsia estrita e fechamento anatômico de espaços mortos.\n\n• b) Incorreta: Halsted repudiava a velocidade circense; prezava a operação lenta, calma, anatômica e meticulosa.\n• c) Incorreta: Preconizava o uso de fios finos de seda (ou categute) com pontos separados e delicados, respeitando rigorosamente os planos anatômicos.\n• d) Incorreta: Halsted era o maior defensor da técnica estéril estrita (desenvolveu inclusive o gorro cirúrgico e aprimorou a paramentação).\n\nRevisar: 01 — História da cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Quanto à finalidade, as sondas classificam-se em:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Diagnósticas e terapêuticas.",
            "B) Rígidas e flexíveis.",
            "C) Monolúmen e multilúmen.",
            "D) Incruentas e cruentas."
        ],
        "gabarito": "Alternativa A — Diagnósticas e terapêuticas.\n\nFinalidade é diagnóstica ou terapêutica; incruenta e cruenta referem-se à via de acesso; rigidez e número de lúmens são atributos do material.\n\n• b) Incorreta: Refere-se ao material, não à finalidade.\n• c) Incorreta: Refere-se ao material, não à finalidade.\n• d) Incorreta: Essa é a classificação por via de acesso.\n\nRevisar: 08 — Sondas e cateteres"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O modo coagulação difere do modo corte porque utiliza:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Corrente contínua pura, sem alternância.",
            "B) Corrente interrompida (modulada) e alta tensão, com aquecimento mais lento.",
            "C) Corrente contínua e baixa tensão, com aquecimento mais rápido.",
            "D) Frequência mais baixa, próxima à da rede elétrica."
        ],
        "gabarito": "Alternativa B — Corrente interrompida (modulada) e alta tensão, com aquecimento mais lento.\n\nA entrega intermitente permite que o tecido esfrie parcialmente entre os pulsos: ele seca e se contrai em vez de explodir, e as proteínas se desnaturam.\n\n• a) A corrente eletrocirúrgica é alternada em ambos os modos.\n• c) Descreve o corte.\n• d) A frequência de trabalho é a mesma; muda a modulação.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre a numeração dos fios de sutura, é correto afirmar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A numeração indica a resistência tênsil, não o diâmetro.",
            "B) O fio 2-0 é mais fino que o 6-0.",
            "C) Quanto maior o número de zeros, maior o diâmetro do fio.",
            "D) Quanto maior o número de zeros, menor o diâmetro do fio."
        ],
        "gabarito": "Alternativa D — Quanto maior o número de zeros, menor o diâmetro do fio.\n\nA escala é decrescente em diâmetro à medida que os zeros aumentam: 2 > 0 > 3-0 > 6-0 > 12-0. O 3-0 é o calibre de uso mais comum no dia a dia.\n\n• a) A numeração se refere ao calibre.\n• b) O 6-0 é muito mais fino que o 2-0.\n• c) Inverte a lógica da escala.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O objetivo declarado do Protocolo de Cirurgia Segura é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Uniformizar a técnica operatória entre serviços.",
            "B) Substituir o prontuário pela lista de verificação.",
            "C) Definir a hierarquia da equipe dentro da sala cirúrgica.",
            "D) Padronizar ações preventivas no pré, trans e pós-operatório imediato, reduzindo incidentes, eventos adversos e mortalidade cirúrgica."
        ],
        "gabarito": "Alternativa D — Padronizar ações preventivas no pré, trans e pós-operatório imediato, reduzindo incidentes, eventos adversos e mortalidade cirúrgica.\n\nO protocolo é de segurança do paciente: ele padroniza checagens em três momentos para evitar erros previsíveis.\n\n• a) Não interfere na técnica cirúrgica em si.\n• b) A lista complementa o prontuário, não o substitui.\n• c) Não trata de hierarquia.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O uso de luvas cirúrgicas estéreis constitui medida de:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Desinfecção, por atuar sobre superfície inanimada.",
            "B) Esterilização, por eliminar toda forma de vida do campo.",
            "C) Antissepsia, por reduzir a microbiota das mãos.",
            "D) Assepsia, por impedir que agentes infecciosos alcancem um local que não os contém."
        ],
        "gabarito": "Alternativa D — Assepsia, por impedir que agentes infecciosos alcancem um local que não os contém.\n\nA luva estéril, por si só, não contém microrganismos; usá-la é erguer uma barreira — conceito de assepsia. Antissepsia é o que se faz sobre tecido vivo.\n\n• a) Desinfecção se aplica a objetos e superfícies, não ao ato de enluvar.\n• b) Esterilizada foi a luva; o ato de calçá-la é medida asséptica.\n• c) A redução da microbiota das mãos é obtida pela degermação, não pela luva.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A síntese é dita incompleta quando:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Apenas a pele é aproximada, sem sutura da aponeurose.",
            "B) A ferida é deixada aberta ou se mantém um dreno exteriorizado.",
            "C) A sutura é feita em plano único e contínuo.",
            "D) Se utiliza fio absorvível em vez de inabsorvível."
        ],
        "gabarito": "Alternativa B — A ferida é deixada aberta ou se mantém um dreno exteriorizado.\n\nSíntese completa fecha todos os planos; incompleta é aquela em que se deixa a ferida aberta ou se mantém comunicação com o exterior, como ocorre quando há dreno.\n\n• a) Descreve uma sutura tecnicamente inadequada, não o conceito de síntese incompleta.\n• c) Sutura contínua é técnica de execução, não classificação de completude.\n• d) O tipo de fio não define completude da síntese.\n\nRevisar: 02 — Tempos fundamentais"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Durante séculos, o desenvolvimento da cirurgia foi travado por uma tríade clássica de limitadores: Dor, Hemorragia e Infecção. A superação pioneira do primeiro pilar (a Dor) com a primeira demonstração pública incontestável de anestesia inalatória ocorreu em:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 16 de outubro de 1846, quando William T. G. Morton administrou éter sulfúrico no anfiteatro do Massachusetts General Hospital para a ressecção indolor de um tumor submandibular.",
            "B) 1789, durante a Revolução Francesa, com o uso maciço de clorofórmio nos hospitais de campanha de Napoleão Bonaparte.",
            "C) 1884, quando Sigmund Freud aplicou injeções intratecais de lidocaína em parturientes austríacas.",
            "D) 1928, com a síntese acidental do sevoflurano em laboratórios britânicos."
        ],
        "gabarito": "Alternativa A — 16 de outubro de 1846, quando William T. G. Morton administrou éter sulfúrico no anfiteatro do Massachusetts General Hospital para a ressecção indolor de um tumor submandibular.\n\nEm 16 de outubro de 1846, na cúpula hoje conhecida como \"Ether Dome\" em Boston, o dentista William Morton empregou um inalador com éter sulfúrico no paciente Gilbert Abbott, permitindo que o prestigiado cirurgião John Collins Warren ressecasse uma lesão vascular cervical sem que o paciente sentisse dor. Ao finalizar, Warren disse ao auditório: \"Gentlemen, this is no humbug!\". A data consagrou-se mundialmente como o Dia do Anestesiologista e encerrou a era em que a rapidez brutal era a única defesa contra a agonia do paciente.\n\n• b) Incorreta: O clorofórmio foi introduzido na prática anestésica por James Young Simpson em 1847 (após o éter).\n• c) Incorreta: A lidocaína foi sintetizada em 1943 por Nils Löfgren; Freud estudou efeitos psíquicos da cocaína, não raquianestesia com lidocaína.\n• d) Incorreta: Anestésicos halogenados modernos (halotano, sevoflurano) são avanços de meados e final do século XX.\n\nRevisar: 01 — História da cirurgia"
    },
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
        "gabarito": "Alternativa B — Afastar-se de equipamentos e pessoas e deixar a dobra se desfazer sozinha, como um lençol.\n\nDeixar o avental se desdobrar pelo próprio peso, longe de superfícies, evita que a face externa estéril toque qualquer coisa.\n\n• a) Incorreta: Sacudir dispersa partículas e aumenta o risco de contato.\n• c) Incorreta: A mesa está ocupada por instrumental estéril e não deve receber o avental.\n• d) Incorreta: A circulante não toca a face externa estéril.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "São aplicações típicas do plasma de argônio:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Dissecção profunda de planos musculares.",
            "B) Anastomose vascular de grandes vasos.",
            "C) Hemostasia superficial em cirurgia aberta e sangramento difuso de mucosas em endoscopia digestiva.",
            "D) Secção de estruturas ósseas."
        ],
        "gabarito": "Alternativa C — Hemostasia superficial em cirurgia aberta e sangramento difuso de mucosas em endoscopia digestiva.\n\nPor ser sem contato e superficial, o argônio é ideal onde há sangramento em lençol sobre grandes áreas, especialmente em mucosas.\n\n• a) Incorreta: A coagulação superficial não dissseca planos profundos.\n• b) Incorreta: Anastomose vascular exige sutura, não coagulação superficial.\n• d) Incorreta: Não é técnica de secção óssea.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O modo corte da eletrocirurgia caracteriza-se por:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Corrente contínua não modulada, baixa tensão, cerca de 100 ºC, com vaporização rápida do líquido intracelular.",
            "B) Corrente modulada, baixa tensão, com desidratação lenta do tecido.",
            "C) Corrente contínua, alta tensão, com carbonização superficial extensa.",
            "D) Corrente modulada, alta tensão, temperatura entre 60 e 100 ºC."
        ],
        "gabarito": "Alternativa A — Corrente contínua não modulada, baixa tensão, cerca de 100 ºC, com vaporização rápida do líquido intracelular.\n\nA entrega contínua de energia aquece a célula tão rápido que a água intracelular vaporiza e rompe a membrana, produzindo o corte com hemostasia discreta.\n\n• b) Mistura características dos dois modos.\n• c) Carbonização extensa é própria da coagulação.\n• d) Descreve o modo coagulação.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A fulguração distingue-se da dessecação porque:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Ocorre sem contato, com formação de faísca, e produz coagulação mais superficial e dispersa.",
            "B) Produz corte com hemostasia mínima.",
            "C) É justamente o que a diferencia da dessecação.",
            "D) Descreve a dessecação."
        ],
        "gabarito": "Alternativa A — Ocorre sem contato, com formação de faísca, e produz coagulação mais superficial e dispersa.\n\nNa fulguração o calor vem das faíscas que saltam do eletrodo, e não do efeito Joule direto. Por isso a coagulação atinge áreas maiores, de modo mais superficial.\n\n• b) Não é um efeito de corte.\n• c) É justamente o que a diferencia da dessecação.\n• d) Descreve a dessecação.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A ordem correta da paramentação é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Lavagem cirúrgica com secagem, avental cirúrgico, luvas estéreis, preparo do paciente.",
            "B) Avental, lavagem cirúrgica, luvas, preparo do paciente.",
            "C) Lavagem cirúrgica, luvas estéreis, avental, preparo do paciente.",
            "D) Luvas estéreis, lavagem cirúrgica, avental, preparo do paciente."
        ],
        "gabarito": "Alternativa A — Lavagem cirúrgica com secagem, avental cirúrgico, luvas estéreis, preparo do paciente.\n\nLava, seca, veste, calça e só então prepara o paciente. Calçar luvas antes do avental inviabiliza a manipulação correta do capote.\n\n• b) É impossível tocar o avental sem estar lavado.\n• c) Troca a ordem entre avental e luvas.\n• d) Inverte completamente a sequência.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Geradores modernos monitoram continuamente a qualidade do contato da placa dispersiva a fim de:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Aumentar automaticamente a potência quando o contato piora.",
            "B) Interromper a saída de energia caso a área de contato efetiva diminua.",
            "C) Registrar o tempo total de uso para manutenção.",
            "D) Alternar automaticamente entre monopolar e bipolar."
        ],
        "gabarito": "Alternativa B — Interromper a saída de energia caso a área de contato efetiva diminua.\n\nQueda da área efetiva significa aumento da densidade de corrente sob a placa — exatamente o mecanismo da queimadura. O gerador corta a energia antes que isso aconteça.\n\n• a) Incorreta: Aumentar a potência agravaria o risco.\n• c) Incorreta: Não é a função do sistema de monitorização de contato.\n• d) Incorreta: A escolha do circuito é do cirurgião.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A diferença fundamental entre a sonda de Nelaton e a de Foley é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A presença de balonete, que permite o cateterismo de demora na Foley.",
            "B) O calibre, sempre maior na Nelaton.",
            "C) A finalidade: a Nelaton é terapêutica e a Foley, diagnóstica.",
            "D) O material de fabricação."
        ],
        "gabarito": "Alternativa A — A presença de balonete, que permite o cateterismo de demora na Foley.\n\nSem balonete, a sonda não se fixa e serve apenas para o alívio pontual; com balonete, ela permanece na bexiga.\n\n• b) O calibre é variável em ambas.\n• c) Ambas podem ter finalidade diagnóstica ou terapêutica.\n• d) O material difere, mas não é o critério essencial.\n\nRevisar: 08 — Sondas e cateteres"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A presença de linha radiopaca na extremidade interna é característica marcante do dreno:",
        "interactionType": "multiple-choice",
        "options": [
            "A) De Penrose.",
            "B) De Blake.",
            "C) Porto-Vac.",
            "D) De tórax."
        ],
        "gabarito": "Alternativa D — De tórax.\n\nA linha radiopaca permite conferir o posicionamento do dreno na radiografia de tórax, checagem obrigatória após a drenagem.\n\n• a) Lâmina simples, sem marcação radiopaca.\n• b) Não é a sua característica definidora.\n• c) Não é a sua característica definidora.\n\nRevisar: 07 — Drenos"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A eletrocirurgia por plasma de argônio caracteriza-se por ser:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Bipolar, com contato direto e compressão.",
            "B) Monopolar, sem contato, usando gás inerte ionizado como condutor.",
            "C) Baseada em vibração mecânica de alta frequência.",
            "D) Produzida por emissão estimulada de radiação."
        ],
        "gabarito": "Alternativa B — Monopolar, sem contato, usando gás inerte ionizado como condutor.\n\nO argônio é inerte, inodoro e não tóxico; ionizado pela corrente, conduz a energia até o tecido e produz coagulação uniforme e superficial.\n\n• a) Descreve o selador vascular bipolar.\n• c) Descreve o bisturi ultrassônico.\n• d) Descreve o laser.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "As lâminas de bisturi nº 11 e nº 15 encaixam no cabo:",
        "interactionType": "multiple-choice",
        "options": [
            "A) nº 3 ou nº 4, indistintamente.",
            "B) nº 7, exclusivo para microcirurgia.",
            "C) nº 3.",
            "D) nº 4."
        ],
        "gabarito": "Alternativa C — nº 3.\n\nLâminas 11 e 15 são do cabo nº 3; as lâminas 21 e 22 são do cabo nº 4. É informação memorística e por isso muito cobrada.\n\n• a) Os encaixes não são intercambiáveis.\n• b) Não corresponde ao material da disciplina.\n• d) O cabo nº 4 recebe as lâminas 21 e 22.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A máscara cirúrgica torna-se obrigatória especialmente:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Ao entrar no vestiário.",
            "B) Na sala cirúrgica, sobretudo com o LAP de campos já aberto.",
            "C) Em toda a zona semirrestrita, sem exceção.",
            "D) Apenas para quem está paramentado de forma estéril."
        ],
        "gabarito": "Alternativa B — Na sala cirúrgica, sobretudo com o LAP de campos já aberto.\n\nCom o pacote de campos aberto há superfície estéril exposta; a máscara evita a contaminação por gotículas de quem circula na sala.\n\n• a) Incorreta: O vestiário é zona irrestrita.\n• c) Incorreta: A máscara é exigência da zona restrita, não de toda a zona limpa.\n• d) Incorreta: Todos que estão na sala usam máscara, paramentados ou não.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O dreno laminar de látex ou silicone, de luz colabada, que drena por capilaridade e é pouco eficiente em grandes volumes, é o:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Penrose.",
            "B) Porto-Vac.",
            "C) Pigtail.",
            "D) Blake."
        ],
        "gabarito": "Alternativa A — Penrose.\n\nO Penrose é o dreno de baixo custo e grande acessibilidade, clássico na drenagem de abscessos.\n\n• b) O Porto-Vac drena por sucção.\n• c) O pigtail é tubular, de silicone, com ponta enrolada.\n• d) O Blake é tubular, de silicone, e muito eficiente.\n\nRevisar: 07 — Drenos"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Para circular na zona semirrestrita, o acadêmico deve estar usando:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Apenas o jaleco branco sobre a roupa comum.",
            "B) Pijama cirúrgico, touca ou gorro e propés.",
            "C) Pijama cirúrgico, touca, propés e máscara cirúrgica obrigatoriamente.",
            "D) Avental estéril e luvas."
        ],
        "gabarito": "Alternativa B — Pijama cirúrgico, touca ou gorro e propés.\n\nA zona limpa exige pijama privativo, gorro e propés. A máscara torna-se obrigatória na zona restrita, sobretudo com o LAP de campos aberto.\n\n• a) Roupa comum só é aceita na zona irrestrita.\n• c) Acrescenta uma exigência que é da zona restrita.\n• d) Paramentação estéril é para quem entra em campo, não para circular.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "No circuito monopolar, o trajeto correto da corrente é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Gerador → eletrodo ativo → tecido do paciente → placa dispersiva → gerador.",
            "B) Gerador → placa dispersiva → eletrodo ativo → gerador.",
            "C) Gerador → eletrodo ativo → eletrodo de retorno no mesmo instrumento → gerador.",
            "D) Gerador → tecido → ar ambiente → gerador."
        ],
        "gabarito": "Alternativa A — Gerador → eletrodo ativo → tecido do paciente → placa dispersiva → gerador.\n\nA corrente percorre todo o corpo do paciente até encontrar o eletrodo de retorno. É essa travessia longa que cria o risco de lesão a distância.\n\n• b) Inverte o sentido do circuito.\n• c) Descreve o circuito bipolar.\n• d) O circuito precisa se fechar por um condutor.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Na disposição da mesa por tempos operatórios, os instrumentos do primeiro tempo ficam:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Sempre no canto esquerdo, independentemente do instrumentador.",
            "B) Misturados aos demais, para economizar espaço.",
            "C) Distantes, por serem usados apenas no início.",
            "D) Mais próximos da mão dominante de quem instrumenta."
        ],
        "gabarito": "Alternativa D — Mais próximos da mão dominante de quem instrumenta.\n\nColocar o instrumental do tempo que abre a cirurgia ao alcance da mão dominante reduz o tempo de resposta ao pedido do cirurgião.\n\n• a) Incorreta: A disposição depende da lateralidade do instrumentador.\n• b) Incorreta: A mistura é justamente o que a organização por tempos evita.\n• c) Incorreta: Serão os primeiros a ser solicitados.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O instrumento-símbolo do tempo de síntese é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) O afastador de Farabeuf.",
            "B) A pinça de Rochester.",
            "C) O porta-agulhas.",
            "D) A pinça anatômica."
        ],
        "gabarito": "Alternativa C — O porta-agulhas.\n\nO porta-agulhas conduz a agulha através dos tecidos durante a sutura. Assemelha-se à pinça hemostática, mas tem ramos curtos e serrilhados para fixar a agulha.\n\n• a) Afastador dinâmico, tempo de exposição.\n• b) Pinça hemostática robusta.\n• d) Instrumento de preensão atraumática.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A dispensa da placa dispersiva é característica da eletrocirurgia:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Monopolar.",
            "B) Bipolar.",
            "C) Por plasma de argônio.",
            "D) Em modo blend."
        ],
        "gabarito": "Alternativa B — Bipolar.\n\nNo circuito bipolar a corrente entra e sai pelos dois polos do próprio instrumento, percorrendo apenas o tecido preso entre eles.\n\n• a) A monopolar exige placa obrigatoriamente.\n• c) O plasma de argônio é técnica monopolar e exige placa.\n• d) Blend é forma de onda, aplicável ao circuito monopolar.\n\nRevisar: 09 — Energia em cirurgia"
    },
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
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A fase ebb da resposta endocrinometabólica ao trauma caracteriza-se por:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Pico das proteínas de fase aguda e da síntese hepática.",
            "B) Estado hipermetabólico e hipercatabólico, após a ressuscitação.",
            "C) Redução do metabolismo e do consumo de oxigênio nas primeiras horas, associada a choque e hipoperfusão.",
            "D) Balanço nitrogenado positivo e retomada do anabolismo."
        ],
        "gabarito": "Alternativa C — Redução do metabolismo e do consumo de oxigênio nas primeiras horas, associada a choque e hipoperfusão.\n\nEnquanto há hipoperfusão não há oferta de oxigênio para acelerar o metabolismo. A aceleração só vem depois, na fase flow.\n\n• a) Fenômeno da fase flow.\n• b) Descreve a fase flow.\n• d) Descreve a fase de recuperação.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O calibre externo das sondas é convencionado na unidade:",
        "interactionType": "multiple-choice",
        "options": [
            "A) French (Fr).",
            "B) Charrière quadrado.",
            "C) Milímetro.",
            "D) Gauge."
        ],
        "gabarito": "Alternativa A — French (Fr).\n\nO French expressa o diâmetro externo; cada unidade corresponde a um terço de milímetro.\n\n• b) Unidade inexistente.\n• c) Não é a convenção usada para sondas.\n• d) Gauge é usado para agulhas e cateteres venosos.\n\nRevisar: 08 — Sondas e cateteres"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre a distinção entre eletrocautério e eletrocirurgia, é correto afirmar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Os termos são sinônimos e descrevem o mesmo princípio físico.",
            "B) No eletrocautério a corrente atravessa o paciente e o calor é gerado pela resistência tecidual.",
            "C) Na eletrocirurgia o calor é produzido em um filamento do aparelho e transmitido por contato.",
            "D) No eletrocautério a corrente aquece um filamento e não atravessa o corpo do paciente."
        ],
        "gabarito": "Alternativa D — No eletrocautério a corrente aquece um filamento e não atravessa o corpo do paciente.\n\nNo eletrocautério a corrente fica confinada ao aparelho; o tecido recebe apenas calor por contato. Na eletrocirurgia, a corrente passa pelo tecido, que aquece por efeito Joule.\n\n• a) São princípios físicos distintos — o aparelho do centro cirúrgico é de eletrocirurgia.\n• b) Descreve a eletrocirurgia.\n• c) Descreve o eletrocautério.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Assinale a alternativa em que o instrumento não pertence ao grupo indicado:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Diérese: cabo de bisturi, tesoura, porta-agulhas.",
            "B) Hemostasia: Halsted, Kelly, Rochester.",
            "C) Exposição: Farabeuf, Doyen, maleáveis.",
            "D) Preensão: Allis, Babcock, dente de rato."
        ],
        "gabarito": "Alternativa A — Diérese: cabo de bisturi, tesoura, porta-agulhas.\n\nO porta-agulhas é instrumento de síntese. Cabo de bisturi e tesoura, sim, são de diérese.\n\n• b) Incorreta: Grupo correto.\n• c) Incorreta: Grupo correto.\n• d) Incorreta: Grupo correto.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
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
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Qual é a finalidade específica da lavagem cirúrgica das mãos?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Substituir o uso de luvas em procedimentos rápidos.",
            "B) Remover apenas resíduos visíveis de sujidade.",
            "C) Esterilizar a pele das mãos e dos antebraços.",
            "D) Eliminar a microbiota transitória e reduzir a microbiota residente."
        ],
        "gabarito": "Alternativa D — Eliminar a microbiota transitória e reduzir a microbiota residente.\n\nA pele não pode ser esterilizada. O que se busca é remover a microbiota transitória, adquirida pelo contato, e reduzir a residente, que habita folículos e glândulas.\n\n• a) Incorreta: A lavagem não substitui a barreira física da luva.\n• b) Incorreta: A remoção de sujidade é apenas parte do objetivo.\n• c) Incorreta: Pele viva não é esterilizável.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Na disposição clássica da equipe em campo, o instrumentador posiciona-se:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Aos pés do paciente, junto ao anestesiologista.",
            "B) Atrás do primeiro auxiliar, fora do campo estéril.",
            "C) Ao lado direito do cirurgião, sempre.",
            "D) Na diagonal em relação ao cirurgião, com a mesa de instrumentação ao seu alcance."
        ],
        "gabarito": "Alternativa D — Na diagonal em relação ao cirurgião, com a mesa de instrumentação ao seu alcance.\n\nA posição diagonal permite ao instrumentador ver o campo e alcançar a mesa sem cruzar o eixo de trabalho do cirurgião.\n\n• a) Incorreta: Os pés da mesa são território do anestesiologista e do circulante, não do instrumentador.\n• b) Incorreta: O instrumentador está paramentado e dentro do campo estéril.\n• c) Incorreta: O lado depende da cirurgia e da lateralidade, não é fixo.\n\nRevisar: 03 e 05 — Centro cirúrgico e instrumental"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A apresentação de cada membro da equipe por nome e função é realizada:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Apenas quando há profissionais novos na equipe.",
            "B) No sign in, antes da indução anestésica.",
            "C) No time out, antes da incisão cirúrgica.",
            "D) No sign out, antes da saída do paciente."
        ],
        "gabarito": "Alternativa C — No time out, antes da incisão cirúrgica.\n\nA apresentação nominal abre o time out. Seu objetivo é permitir que qualquer membro se sinta autorizado a falar caso perceba um risco.\n\n• a) A checagem é sistemática, independentemente da composição da equipe.\n• b) O sign in concentra checagens sobre paciente e anestesia.\n• d) O sign out é o balanço final do que foi feito.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "São características atribuídas ao fio ideal, exceto:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Ter baixo custo.",
            "B) Resistência tênsil equivalente à dos tecidos.",
            "C) Ser fino, regular e flexível.",
            "D) Provocar reação tecidual intensa, que acelera a cicatrização."
        ],
        "gabarito": "Alternativa D — Provocar reação tecidual intensa, que acelera a cicatrização.\n\nO fio ideal provoca pouca reação tecidual. Reação intensa significa inflamação prolongada, granuloma e pior cicatrização.\n\n• a) Incorreta: Característica do fio ideal.\n• b) Incorreta: Característica do fio ideal.\n• c) Incorreta: Características do fio ideal.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Durante uma gastrectomia, identifique o tempo operatório de cada passo: (1) abertura da aponeurose; (2) clipagem da artéria gástrica esquerda antes da secção; (3) retirada da peça; (4) confecção da anastomose.",
        "interactionType": "multiple-choice",
        "options": [
            "A) Exérese, hemostasia preventiva, diérese, síntese.",
            "B) Diérese, hemostasia curativa, exérese, síntese.",
            "C) Diérese, hemostasia preventiva, exérese, síntese.",
            "D) Diérese, hemostasia preventiva, síntese, exérese."
        ],
        "gabarito": "Alternativa C — Diérese, hemostasia preventiva, exérese, síntese.\n\nO clipe é aplicado antes da secção do vaso — hemostasia preventiva —, e a anastomose é a reconstrução do trânsito, portanto síntese.\n\n• a) A abertura da aponeurose é diérese, e vem primeiro.\n• b) A hemostasia aqui é preventiva, não curativa.\n• d) Inverte a ordem de exérese e síntese.\n\nRevisar: 02 — Tempos fundamentais"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O cirurgião solicita, em sequência: (1) instrumento para incisar pele com lâmina grande; (2) pinça para segurar a borda da aponeurose; (3) pinça hemostática delicada para vaso subcutâneo; (4) instrumento para suturar. A sequência é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Cabo nº 3 com lâmina 21, pinça de Babcock, Rochester, pinça de Allis.",
            "B) Cabo nº 4 com lâmina 15, pinça anatômica, Kelly, porta-agulhas.",
            "C) Cabo nº 3 com lâmina 11, Kocher, Halsted, tesoura de Metzenbaum.",
            "D) Cabo nº 4 com lâmina 21, pinça dente de rato, Halsted, porta-agulhas."
        ],
        "gabarito": "Alternativa D — Cabo nº 4 com lâmina 21, pinça dente de rato, Halsted, porta-agulhas.\n\nLâmina grande (21) exige cabo nº 4; aponeurose pede preensão firme (dente de rato); vaso fino pede Halsted; suturar exige porta-agulhas.\n\n• a) A lâmina 21 não encaixa no cabo nº 3, e Allis não sutura.\n• b) A 15 não é lâmina grande, e a pinça anatômica escorrega na aponeurose.\n• c) A lâmina 11 é puntiforme, e a tesoura não realiza síntese.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre a sonda nasoenteral, é correto afirmar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Dispensa confirmação radiográfica quando o paciente tolera a passagem sem tosse.",
            "B) É um tubo de plástico monolúmen rígido, indicado para descompressão gástrica.",
            "C) É de silicone, possui fio-guia metálico removível e esferas metálicas na ponta, e destina-se à alimentação.",
            "D) Deve ser posicionada no estômago e nunca ultrapassar o piloro."
        ],
        "gabarito": "Alternativa C — É de silicone, possui fio-guia metálico removível e esferas metálicas na ponta, e destina-se à alimentação.\n\nAs esferas metálicas são radiopacas e permitem conferir na radiografia a migração da ponta para o duodeno, que ocorre pelo peristaltismo.\n\n• a) A ausência de tosse não exclui posicionamento traqueal ou inadequado.\n• b) Essa descrição é da sonda nasogástrica.\n• d) O objetivo é justamente a migração pós-pilórica.\n\nRevisar: 08 — Sondas e cateteres"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Analise as afirmativas sobre os tempos operatórios:\nI. A hemostasia ocorre uma única vez, logo após a incisão da pele.\nII. A exérese é o tempo que define o objetivo terapêutico da operação.\nIII. A diérese pode ser realizada com eletrocirurgia.\nIV. A síntese pode ser feita com fios, grampos, clipes ou adesivos.",
        "interactionType": "multiple-choice",
        "options": [
            "A) Apenas I está incorreta.",
            "B) Apenas II e III estão corretas.",
            "C) Apenas I e IV estão incorretas.",
            "D) Todas estão corretas."
        ],
        "gabarito": "Alternativa A — Apenas I está incorreta.\n\nA hemostasia se repete a cada plano aberto — não é um evento único. As demais afirmativas estão corretas.\n\n• b) Ignora que IV também é verdadeira.\n• c) IV está correta: a síntese admite vários materiais.\n• d) I é falsa.\n\nRevisar: 02 — Tempos fundamentais"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "São sítios de sondagem citados no material:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Intraóssea, subdural e epidural.",
            "B) Traqueal, esofágica, gástrica, enteral, retal e vesical.",
            "C) Arterial, venosa central e periférica.",
            "D) Pleural, pericárdica e peritoneal."
        ],
        "gabarito": "Alternativa B — Traqueal, esofágica, gástrica, enteral, retal e vesical.\n\nA classificação por sítio segue as luzes orgânicas acessíveis. Cavidades serosas são território dos drenos, e acessos vasculares, dos cateteres.\n\n• a) Incorreta: Não corresponde à classificação apresentada.\n• c) Incorreta: Descreve acessos vasculares.\n• d) Incorreta: Descreve cavidades drenadas, não sondadas.\n\nRevisar: 08 — Sondas e cateteres"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "No Renascimento, o médico Andreas Vesalius (1514-1564) deflagrou uma verdadeira revolução epistemológica na medicina com a publicação de De Humani Corporis Fabrica (1543). O marco transformador dessa obra para a cirurgia consistiu em:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Propor a teoria microbiana das infecções hospitalares e instituir o uso de autoclaves para esterilização a vapor.",
            "B) Romper com os dogmas anatômicos de Galeno por meio da dissecção sistemática de cadáveres humanos realizada pelo próprio professor, fundando a anatomia científica moderna.",
            "C) Criar a primeira técnica de sutura mecânica laparoscópica para anastomoses gastrintestinais.",
            "D) Descobrir os primeiros antibióticos tópicos a partir de extratos botânicos renascentistas."
        ],
        "gabarito": "Alternativa B — Romper com os dogmas anatômicos de Galeno por meio da dissecção sistemática de cadáveres humanos realizada pelo próprio professor, fundando a anatomia científica moderna.\n\nVesalius, professor na Universidade de Pádua, quebrou a tradição medieval em que o mestre lia textos de Galeno do alto da cátedra enquanto um barbeiro cortava o corpo. Ele próprio desceu e executou as dissecções em cadáveres humanos, corrigindo mais de 200 equívocos galênicos e documentando a anatomia real com gravuras de alta precisão artística e científica. Esse conhecimento topográfico verdadeiro forneceu o alicerce indispensável para a evolução da cirurgia.\n\n• a) Incorreta: A teoria dos germes e esterilização a vapor pertencem ao final do século XIX (Pasteur e Chamberland).\n• c) Incorreta: Suturas mecânicas surgiram no século XX (Hültl, Petz, Steichen).\n• d) Incorreta: Antibióticos são conquistas do século XX.\n\nRevisar: 01 — História da cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Ao calçar as luvas estéreis, a regra fundamental é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A mão nua pode tocar qualquer parte da primeira luva, desde que rapidamente.",
            "B) A mão enluvada deve tocar preferencialmente a parte interna da segunda luva.",
            "C) Não há restrição, desde que as mãos tenham sido degermadas.",
            "D) A mão nua só toca a parte interna da luva e a mão enluvada só toca a parte externa."
        ],
        "gabarito": "Alternativa D — A mão nua só toca a parte interna da luva e a mão enluvada só toca a parte externa.\n\nÉ a lógica que preserva a esterilidade da face que ficará em contato com o paciente. Cada superfície só é tocada por aquilo que tem o mesmo status.\n\n• a) O tempo de contato não altera a contaminação.\n• b) Inverte a regra: a mão enluvada desliza pela face externa.\n• c) A degermação reduz, mas não esteriliza a pele.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "As pinças hemostáticas Halsted, Kelly e Rochester:",
        "interactionType": "multiple-choice",
        "options": [
            "A) São todas desprovidas de cremalheira.",
            "B) Diferem apenas na cor do cabo.",
            "C) Existem apenas em versão reta.",
            "D) Existem em versões curva e reta."
        ],
        "gabarito": "Alternativa D — Existem em versões curva e reta.\n\nAs três existem curvas e retas; a escolha entre elas depende do calibre do vaso e da profundidade do campo.\n\n• a) Incorreta: A cremalheira é justamente o que mantém a pinça travada sobre o vaso.\n• b) Incorreta: Diferem em tamanho e delicadeza.\n• c) Incorreta: A versão curva é de uso corrente.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A pinça de preensão lisa, atraumática, usada para manipular tecidos delicados sem perfurá-los, é a:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Pinça de Allis.",
            "B) Pinça dente de rato.",
            "C) Pinça anatômica.",
            "D) Pinça de Kocher."
        ],
        "gabarito": "Alternativa C — Pinça anatômica.\n\nA pinça anatômica tem ranhuras transversais e nenhum dente, o que permite segurar sem transfixar — apropriada a tecidos delicados.\n\n• a) Incorreta: Prende com firmeza, mas traumatiza mais.\n• b) Incorreta: Tem dentes e traumatiza; é para pele e aponeurose.\n• d) Incorreta: Robusta e com dente na ponta.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Assinale a associação incorreta entre tempo operatório e instrumento:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Síntese — fios de sutura.",
            "B) Diérese — cabo de bisturi e tesoura.",
            "C) Preensão — pinça de Allis e pinça anatômica.",
            "D) Hemostasia — porta-agulhas de Mayo-Hegar."
        ],
        "gabarito": "Alternativa D — Hemostasia — porta-agulhas de Mayo-Hegar.\n\nO porta-agulhas é o instrumento-símbolo da síntese. As pinças hemostáticas são Halsted, Kelly e Rochester.\n\n• a) Associação correta.\n• b) Associação correta.\n• c) Associação correta.\n\nRevisar: 02 — Tempos fundamentais e 05 — Instrumental"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre a vestimenta do avental cirúrgico, assinale a alternativa incorreta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) O avental deve ser suspenso em bloco, pela borda interna.",
            "B) O próprio profissional paramentado deve amarrar as alças laterais.",
            "C) Depois de vestido, a face interna do avental, em contato com o pijama, está contaminada.",
            "D) O avental a ser usado é o que está no topo da pilha do LAP naquele momento."
        ],
        "gabarito": "Alternativa B — O próprio profissional paramentado deve amarrar as alças laterais.\n\nAs alças laterais são amarradas pela circulante ou por alguém não paramentado, com o cuidado de não tocar a face externa estéril.\n\n• a) Conduta correta — evita que ele se abra e toque superfícies.\n• c) Conduta correta — por isso essa face não deve mais ser tocada.\n• d) Conduta correta — não se escolhe o avental.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A agulha de secção transversal cilíndrica está indicada para:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Qualquer tecido, por ser universal.",
            "B) Pele e aponeurose.",
            "C) Vísceras, vasos e tecidos delicados.",
            "D) Tecidos fibróticos e cicatriciais."
        ],
        "gabarito": "Alternativa C — Vísceras, vasos e tecidos delicados.\n\nA agulha cilíndrica não corta: ela afasta as fibras ao transfixar, o que minimiza a lesão em tecidos friáveis. A triangular corta e é reservada a tecidos resistentes.\n\n• a) Não existe agulha universal — a escolha segue o tecido.\n• b) Pele e aponeurose pedem agulha triangular ou prismática.\n• d) Tecido fibrótico exige ponta cortante.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A pinça indicada para preensão delicada de víscera oca, com mínimo trauma da parede, é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Pinça de Allis.",
            "B) Pinça de Babcock.",
            "C) Pinça de Kocher.",
            "D) Pinça dente de rato."
        ],
        "gabarito": "Alternativa B — Pinça de Babcock.\n\nA Babcock tem ramos fenestrados e atraumáticos, desenhados justamente para segurar alça intestinal sem esmagar a parede.\n\n• a) A Allis prende com firmeza, mas traumatiza mais.\n• c) A Kocher tem dente e é francamente traumática.\n• d) Dente de rato é para pele e aponeurose.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A utilização de correntes de alta frequência em eletrocirurgia tem como principal justificativa:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Reduzir o consumo de energia do gerador.",
            "B) Evitar o efeito farádico, isto é, a estimulação de tecidos excitáveis.",
            "C) Aumentar a profundidade da necrose térmica.",
            "D) Permitir o uso de corrente contínua no lugar da alternada."
        ],
        "gabarito": "Alternativa B — Evitar o efeito farádico, isto é, a estimulação de tecidos excitáveis.\n\nAcima de cerca de 100 kHz a corrente deixa de despolarizar nervo e músculo. Por isso o gerador converte os 50–60 Hz da rede em centenas de milhares de hertz.\n\n• a) O consumo não é o critério.\n• c) Necrose profunda é efeito adverso, não objetivo.\n• d) A eletrocirurgia utiliza corrente alternada de alta frequência.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A exérese pode ter como objeto:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Somente tecidos superficiais, acima da aponeurose.",
            "B) Exclusivamente tumores malignos.",
            "C) Tumores, órgãos comprometidos, tecido necrótico e corpos estranhos.",
            "D) Apenas estruturas previamente identificadas em exame de imagem."
        ],
        "gabarito": "Alternativa C — Tumores, órgãos comprometidos, tecido necrótico e corpos estranhos.\n\nA exérese é a remoção de qualquer estrutura patológica ou indesejada — é o tempo que carrega o propósito terapêutico da operação.\n\n• a) Incorreta: Não há restrição de profundidade.\n• b) Incorreta: A palavra 'exclusivamente' restringe indevidamente.\n• d) Incorreta: Muitos achados são intraoperatórios.\n\nRevisar: 02 — Tempos fundamentais"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Entre as medidas do checklist de segurança em eletrocirurgia, consta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Utilizar sempre a potência máxima disponível, para reduzir o tempo de aplicação.",
            "B) Utilizar a menor potência capaz de produzir o efeito desejado e manter o eletrodo em coldre quando não estiver em uso.",
            "C) Manter o eletrodo ativo apoiado sobre o campo, ao alcance da mão.",
            "D) Ativar o eletrodo imediatamente após a aplicação do antisséptico, para ganhar tempo."
        ],
        "gabarito": "Alternativa B — Utilizar a menor potência capaz de produzir o efeito desejado e manter o eletrodo em coldre quando não estiver em uso.\n\nMenor potência significa menos propagação térmica; o coldre evita ativação acidental sobre o paciente ou sobre campos.\n\n• a) Incorreta: Potência máxima aumenta dano tecidual e risco.\n• c) Incorreta: O eletrodo solto sobre o campo é causa clássica de queimadura e de incêndio.\n• d) Incorreta: É preciso aguardar a secagem completa do antisséptico alcoólico.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Ao enxaguar as mãos após a escovação cirúrgica, é correto:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Fechar a torneira com a mão dominante.",
            "B) Enxaguar do cotovelo em direção às mãos.",
            "C) Apoiá-se na pia para maior estabilidade.",
            "D) Remover toda a espuma sem tocar a pia ou a torneira."
        ],
        "gabarito": "Alternativa D — Remover toda a espuma sem tocar a pia ou a torneira.\n\nQualquer contato com a pia ou a torneira recontamina as mãos já escovadas. O enxágue segue das mãos para os cotovelos, e não o inverso.\n\n• a) Incorreta: A torneira deve ser acionada por pedal, joelho ou sensor.\n• b) Incorreta: Levaria água do antebraço, menos limpo, para as mãos.\n• c) Incorreta: Contato com a pia contamina.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A finalidade do grupo de instrumentos de preensão é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Segurar, suspender vísceras e manipular tecidos.",
            "B) Ocluir vasos até a ligadura definitiva.",
            "C) Manter a cavidade aberta durante o procedimento.",
            "D) Separar planos anatômicos por secção."
        ],
        "gabarito": "Alternativa A — Segurar, suspender vísceras e manipular tecidos.\n\nPreender é fixar o tecido para que ele possa ser tracionado, exposto ou trabalhado — função distinta de cortar, ocluir ou afastar.\n\n• b) Incorreta: Essa é a função das pinças hemostáticas.\n• c) Incorreta: Essa é a função dos afastadores.\n• d) Incorreta: Essa é a função da diérese.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Paciente em pós-operatório de mastectomia necessita de drenagem do espaço subcutâneo com aspiração contínua e de baixo custo. O dreno mais apropriado é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Pigtail.",
            "B) Dreno de tórax.",
            "C) Penrose.",
            "D) Porto-Vac."
        ],
        "gabarito": "Alternativa D — Porto-Vac.\n\nO subcutâneo amplo descolado exige sucção para colabar o espaço morto — indicação clássica do Porto-Vac, que ainda tem custo acessível.\n\n• a) Alto custo e indicado para drenagens percutâneas profundas.\n• b) Destinado à cavidade pleural.\n• c) Não gera sucção e é ineficiente em volumes maiores.\n\nRevisar: 07 — Drenos"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A razão pela qual as lesões térmicas a distância são mais perigosas na laparoscopia do que na cirurgia aberta é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Boa parte do instrumento permanece fora do campo de visão da câmera, e a lesão pode se manifestar apenas dias depois.",
            "B) O pneumoperitônio conduz melhor a eletricidade.",
            "C) Os instrumentos laparoscópicos não possuem isolamento.",
            "D) A energia utilizada é sempre maior em laparoscopia."
        ],
        "gabarito": "Alternativa A — Boa parte do instrumento permanece fora do campo de visão da câmera, e a lesão pode se manifestar apenas dias depois.\n\nNa cirurgia aberta o cirurgião percebe o calor irradiando, o contato entre instrumentos, a fumaça se formando e a lesão adjacente. Na laparoscopia, nada disso é visível.\n\n• b) Incorreta: O CO₂ não é o fator determinante.\n• c) Incorreta: Eles possuem isolamento — o problema é a falha microscópica dele.\n• d) Incorreta: A potência não é necessariamente maior.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A alternativa cruenta à sondagem vesical por via uretral é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Traqueostomia.",
            "B) Punção suprapúbica (cistostomia).",
            "C) Sonda nasoenteral.",
            "D) Gastrostomia."
        ],
        "gabarito": "Alternativa B — Punção suprapúbica (cistostomia).\n\nOs pares incruento × cruento são: sondagem gástrica × gastrostomia; sondagem vesical uretral × cistostomia; intubação × traqueostomia.\n\n• a) É a via cruenta da intubação.\n• c) É via incruenta, e do trato digestivo.\n• d) É a via cruenta da sondagem gástrica.\n\nRevisar: 08 — Sondas e cateteres"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O fio classicamente empregado em sutura vascular e cardíaca, por ser sintético, monofilamentar e inabsorvível, é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Catgut cromado.",
            "B) Seda.",
            "C) Prolene.",
            "D) Vicryl."
        ],
        "gabarito": "Alternativa C — Prolene.\n\nO polipropileno desliza bem através do tecido vascular, não é absorvido e provoca reação tecidual mínima — exatamente o que uma anastomose vascular exige.\n\n• a) Absorvível de origem animal, com reação tecidual importante.\n• b) Inabsorvível, mas natural e multifilamentar.\n• d) Absorvível — inaceitável em anastomose vascular.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A oligúria observada nas primeiras horas após trauma grave é explicada principalmente por:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Aumento do ADH e ativação do sistema renina-angiotensina-aldosterona.",
            "B) Queda do cortisol circulante.",
            "C) Inibição do sistema nervoso simpático.",
            "D) Necrose tubular aguda estabelecida já na admissão."
        ],
        "gabarito": "Alternativa A — Aumento do ADH e ativação do sistema renina-angiotensina-aldosterona.\n\nHipovolemia e hipotensão elevam o ADH, que reabsorve água, e ativam o SRAA, que retém sódio e água e eleva a resistência vascular.\n\n• b) O cortisol aumenta no trauma.\n• c) O simpático é ativado, não inibido.\n• d) É complicação possível, mas não a explicação fisiológica inicial.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
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
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Qual dreno associa os mecanismos de capilaridade e sucção?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Dreno de tórax.",
            "B) Blake.",
            "C) Pigtail.",
            "D) Penrose."
        ],
        "gabarito": "Alternativa B — Blake.\n\nAs valas longitudinais do Blake drenam por capilaridade e podem ser acopladas a sistema de sucção — por isso ele é o 'híbrido' e a alternativa mais cobrada.\n\n• a) Apenas gravidade.\n• c) Apenas gravidade.\n• d) Apenas capilaridade.\n\nRevisar: 07 — Drenos"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A elasticidade do fio é clinicamente importante porque:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Aumenta a resistência do fio à infecção.",
            "B) Permite manter a tensão da sutura em áreas sujeitas a variação de volume, como no edema.",
            "C) Reduz o tempo de absorção do material.",
            "D) Impede a formação de cicatriz hipertrófica."
        ],
        "gabarito": "Alternativa B — Permite manter a tensão da sutura em áreas sujeitas a variação de volume, como no edema.\n\nO fio elástico acompanha o aumento de volume do tecido edemaciado e retorna depois, em vez de cortar a borda da ferida ou afrouxar.\n\n• a) A resistência à infecção depende da configuração do filamento.\n• c) A absorção depende da composição, não da elasticidade.\n• d) Não há essa relação.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Ao vestir o avental, o profissional insere os braços nas mangas sem tocar a face externa porque:",
        "interactionType": "multiple-choice",
        "options": [
            "A) O tecido externo é mais caro e se desgasta com o toque.",
            "B) O contato com a face externa dificulta o fechamento das alças.",
            "C) A face externa ficará em contato com o paciente e deve permanecer estéril.",
            "D) A face externa é impermeável e a fricção a danifica."
        ],
        "gabarito": "Alternativa C — A face externa ficará em contato com o paciente e deve permanecer estéril.\n\nÉ a face externa que entrará em contato com o campo e com o paciente. As mãos, ainda que degermadas, não são estéreis.\n\n• a) Incorreta: Custo não é o critério.\n• b) Incorreta: As alças não têm relação com isso.\n• d) Incorreta: Não é uma questão de resistência do material.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "São exemplos de agentes antissépticos usados no preparo da pele do paciente:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Álcool 70%, clorexidina e PVPI.",
            "B) Hipoclorito a 1% e formaldeído.",
            "C) Peróxido de hidrogênio a 30% e fenol puro.",
            "D) Glutaraldeído, óxido de etileno e vapor sob pressão."
        ],
        "gabarito": "Alternativa A — Álcool 70%, clorexidina e PVPI.\n\nSão os três antissépticos citados no material, todos compatíveis com tecido vivo.\n\n• b) Incorreta: Agentes de desinfecção de superfícies, agressivos à pele.\n• c) Incorreta: Concentrações incompatíveis com uso em tecido vivo.\n• d) Incorreta: São agentes de esterilização e desinfecção de artigos, não de pele.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre os dispositivos ultrassônicos, é correto afirmar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Atuam por vibração mecânica em alta frequência, sem que corrente elétrica atravesse o paciente.",
            "B) Exigem placa dispersiva para fechar o circuito.",
            "C) Não geram calor suficiente para causar lesão térmica.",
            "D) Passam corrente elétrica pelo tecido do paciente, como a eletrocirurgia monopolar."
        ],
        "gabarito": "Alternativa A — Atuam por vibração mecânica em alta frequência, sem que corrente elétrica atravesse o paciente.\n\nA lâmina vibra em frequência ultrassônica e o atrito desnatura proteínas, cortando e coagulando ao mesmo tempo, com temperaturas em geral menores e menos fumaça.\n\n• b) Não há circuito elétrico a fechar.\n• c) A lâmina permanece quente após o uso e pode causar lesão por contato inadvertido.\n• d) Não há corrente elétrica dentro do paciente.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A confirmação de que os exames de imagem necessários estão acessíveis na sala ocorre:",
        "interactionType": "multiple-choice",
        "options": [
            "A) No time out.",
            "B) No sign out.",
            "C) Não faz parte da lista de verificação.",
            "D) No sign in."
        ],
        "gabarito": "Alternativa A — No time out.\n\nÉ item do time out, ao lado da revisão dos pontos críticos do plano operatório — ambos preparam a equipe para a incisão.\n\n• b) Incorreta: No sign out se confere procedimento realizado, contagem e amostras.\n• c) Incorreta: Consta expressamente da lista.\n• d) Incorreta: O sign in concentra identificação, consentimento, sítio e segurança anestésica.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Comparando custo e acessibilidade, os drenos de alto custo e menor disponibilidade são:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Dreno de tórax e Porto-Vac.",
            "B) Penrose e dreno de tórax.",
            "C) Blake e pigtail.",
            "D) Porto-Vac e Penrose."
        ],
        "gabarito": "Alternativa C — Blake e pigtail.\n\nAmbos são de silicone e de tecnologia mais elaborada. Penrose e dreno de tórax são de baixo custo e grande acessibilidade; o Porto-Vac é intermediário.\n\n• a) Incorreta: Ambos são de custo baixo a intermediário.\n• b) Incorreta: Ambos são de baixo custo e grande acessibilidade.\n• d) Incorreta: Ambos são de custo baixo a intermediário.\n\nRevisar: 07 — Drenos"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A gastrostomia pode ser realizada por via:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Endoscópica apenas em pacientes pediátricos.",
            "B) Endoscópica, cirúrgica ou percutânea, sendo a endoscópica a preferencial.",
            "C) Exclusivamente cirúrgica aberta.",
            "D) Exclusivamente por punção às cegas."
        ],
        "gabarito": "Alternativa B — Endoscópica, cirúrgica ou percutânea, sendo a endoscópica a preferencial.\n\nA gastrostomia endoscópica percutânea é a via preferencial por ser menos invasiva, mais rápida e dispensar laparotomia.\n\n• a) Incorreta: Não há essa restrição etária.\n• c) Incorreta: A via aberta é reservada a casos selecionados.\n• d) Incorreta: A punção às cegas não é técnica aceita.\n\nRevisar: 08 — Sondas e cateteres"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O efeito em que o eletrodo permanece em contato com o tecido, sem faiscamento, produzindo desidratação e desnaturação proteica com efeito previsível, é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Corte puro.",
            "B) Fulguração.",
            "C) Vaporização.",
            "D) Dessecação."
        ],
        "gabarito": "Alternativa D — Dessecação.\n\nDessecação é contato sem faísca: a corrente aquece o tecido pela resistência dele próprio, formando escara marrom-clara superficial, com baixa potência.\n\n• a) No corte há faiscamento e camada de vapor separando eletrodo e tecido.\n• b) Fulguração ocorre à distância, com arco elétrico.\n• c) Na vaporização não há contato e as células explodem sem carbonizar.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "São meios utilizáveis no tempo de síntese, exceto:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Fios de sutura.",
            "B) Grampos e clipes.",
            "C) Adesivos teciduais.",
            "D) Pinça de Rochester."
        ],
        "gabarito": "Alternativa D — Pinça de Rochester.\n\nA Rochester é pinça hemostática — atua no segundo tempo, não na reconstrução dos planos.\n\n• a) Incorreta: Meio de síntese.\n• b) Incorreta: Meios de síntese.\n• c) Incorreta: Meio de síntese.\n\nRevisar: 02 — Tempos fundamentais"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O conceito de densidade de corrente explica por que:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A corrente alternada é mais segura que a contínua.",
            "B) A frequência precisa ser convertida pelo gerador.",
            "C) O modo blend combina duas formas de onda.",
            "D) A ponta do eletrodo corta e a placa dispersiva não aquece."
        ],
        "gabarito": "Alternativa D — A ponta do eletrodo corta e a placa dispersiva não aquece.\n\nA mesma corrente concentrada em área minúscula produz calor intenso; distribuída em área ampla, praticamente não aquece. É o princípio de segurança de toda a eletrocirurgia monopolar.\n\n• a) Incorreta: A segurança da alta frequência se explica pelo efeito farádico, não pela densidade.\n• b) Incorreta: A conversão de frequência se justifica pela estimulação neuromuscular.\n• c) Incorreta: O blend é escolha de forma de onda.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Quanto ao formato, os drenos classificam-se em:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Retos, curvos e angulados.",
            "B) Simples, compostos e mistos.",
            "C) Ativos, passivos e semiativos.",
            "D) Filiformes, laminares e tubulares."
        ],
        "gabarito": "Alternativa D — Filiformes, laminares e tubulares.\n\nA classificação de formato é morfológica. Ativo e espontâneo, por sua vez, referem-se ao mecanismo de drenagem, não ao formato.\n\n• a) Incorreta: Não é a classificação do material.\n• b) Incorreta: Não é a classificação do material.\n• c) Incorreta: Essa é a classificação por mecanismo — e não existe 'semiativo'.\n\nRevisar: 07 — Drenos"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A zona do centro cirúrgico em que a circulação é livre e não se exige uniforme privativo é composta por:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Vestiários, sala de espera, área de transferência, expurgo e corredor periférico.",
            "B) Sala de recuperação pós-anestésica, farmácia e conforto médico.",
            "C) Secretaria, área de enfermagem e sala de prescrição.",
            "D) Salas cirúrgicas e lavabos."
        ],
        "gabarito": "Alternativa A — Vestiários, sala de espera, área de transferência, expurgo e corredor periférico.\n\nA zona irrestrita, ou de proteção, é a interface do centro cirúrgico com o resto do hospital. O critério é a livre circulação, e não o grau de limpeza — por isso o expurgo está aqui.\n\n• b) Todos são ambientes da zona semirrestrita.\n• c) Todos são ambientes da zona semirrestrita.\n• d) Sala cirúrgica é restrita; lavabo é semirrestrito.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A escolha entre fio absorvível e inabsorvível considera, principalmente:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A cor do fio e a visibilidade no campo.",
            "B) O custo e a disponibilidade no serviço.",
            "C) O tempo de cicatrização, a tensão suportada pelo tecido e a necessidade temporária ou permanente de suporte mecânico.",
            "D) A preferência estética do cirurgião."
        ],
        "gabarito": "Alternativa C — O tempo de cicatrização, a tensão suportada pelo tecido e a necessidade temporária ou permanente de suporte mecânico.\n\nA pergunta prática é: por quanto tempo esse tecido precisa de suporte? Se a cicatriz assume a carga em poucas semanas, o absorvível basta; se a estrutura exige sustentação permanente, usa-se inabsorvível.\n\n• a) Incorreta: A cor auxilia a visualização, mas não define absorção.\n• b) Incorreta: São fatores logísticos, não o critério técnico principal.\n• d) Incorreta: Não é critério técnico.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Ao entrar no centro cirúrgico, espera-se que o acadêmico:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Aguarde ser apresentado pelo preceptor antes de qualquer interação.",
            "B) Cumprimente apenas o cirurgião responsável pelo caso.",
            "C) Apresente-se por nome e função a todos os profissionais da sala.",
            "D) Evite falar, para não interferir na dinâmica da equipe."
        ],
        "gabarito": "Alternativa C — Apresente-se por nome e função a todos os profissionais da sala.\n\nCordialidade com toda a equipe e apresentação por nome e função é a primeira regra de convivência no centro cirúrgico — e a mesma lógica sustenta a apresentação nominal do time out.\n\n• a) Incorreta: A iniciativa de se apresentar é do próprio acadêmico.\n• b) Incorreta: A cordialidade se estende a todos os profissionais, sem hierarquia.\n• d) Incorreta: O silêncio absoluto não é o esperado; o que se evita é a conversa desnecessária.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O dreno cuja extremidade interna se enrola sobre si mesma, o que reduz o risco de deslocamento, é o:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Pigtail.",
            "B) Tórax.",
            "C) Blake.",
            "D) Penrose bifurcado."
        ],
        "gabarito": "Alternativa A — Pigtail.\n\nO nome vem justamente do formato em rabo de porco. É de silicone, drena por gravidade, tem alto custo e baixa acessibilidade, e é típico das drenagens percutâneas guiadas por imagem.\n\n• b) Tem extremidade fenestrada e reta.\n• c) Tem valas longitudinais, não ponta enrolada.\n• d) A bifurcação é da extremidade interna, mas não se enrola.\n\nRevisar: 07 — Drenos"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "São misturas ou condições combustíveis que aumentam o risco de incêndio em sala cirúrgica, exceto:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Gases intestinais durante cirurgia abdominal.",
            "B) Uso de instrumental de aço inoxidável.",
            "C) Antisséptico alcoólico ainda úmido sobre a pele.",
            "D) Atmosfera enriquecida com oxigênio."
        ],
        "gabarito": "Alternativa B — Uso de instrumental de aço inoxidável.\n\nO aço inoxidável é inerte e não participa da combustão. Álcool úmido, oxigênio e gases intestinais, sim, são combustíveis ou comburentes.\n\n• a) Incorreta: É risco reconhecido.\n• c) Incorreta: É risco reconhecido — daí a espera pela secagem completa.\n• d) Incorreta: É risco reconhecido.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em ferida contaminada, deve-se preferir fio monofilamentar porque ele apresenta menor área de contato com o tecido e menor potencial de abrigar microrganismos.",
        "interactionType": "multiple-choice",
        "options": [
            "A) As duas asserções são verdadeiras, mas a segunda não justifica a primeira.",
            "B) A primeira é verdadeira e a segunda é falsa.",
            "C) As duas asserções são falsas.",
            "D) As duas asserções são verdadeiras e a segunda justifica a primeira."
        ],
        "gabarito": "Alternativa D — As duas asserções são verdadeiras e a segunda justifica a primeira.\n\nA recomendação decorre diretamente da estrutura do fio: sem interstícios entre filamentos, não há nicho para colonização bacteriana.\n\n• a) Há, sim, relação causal direta entre as duas proposições.\n• b) A segunda asserção é verdadeira.\n• c) Ambas são verdadeiras.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O fio monofilamentar, comparado ao multifilamentar, apresenta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Menor atrito, maior resistência à infecção e mais memória.",
            "B) Menor atrito, maior potencial de infecção e menos memória.",
            "C) Maior maleabilidade, menos memória e menor risco infeccioso.",
            "D) Maior atrito, maior potencial de infecção e mais memória."
        ],
        "gabarito": "Alternativa A — Menor atrito, maior resistência à infecção e mais memória.\n\nA superfície lisa reduz atrito e não oferece interstícios para bactérias; em troca, o fio é menos maleável e tem mais memória, exigindo mais nós.\n\n• b) Confunde o perfil infeccioso e a memória.\n• c) Maleabilidade e pouca memória são do multifilamentar.\n• d) Descreve o multifilamentar quanto a atrito e infecção.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Ao calçar a segunda luva, o acadêmico percebe que dois dedos entraram trocados. A conduta correta é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Terminar de calçar as duas luvas e só então corrigir a posição dos dedos.",
            "B) Solicitar que a circulante ajuste os dedos com as mãos desnudas.",
            "C) Corrigir imediatamente, antes de terminar o calçamento.",
            "D) Retirar as duas luvas e reiniciar todo o processo de paramentação."
        ],
        "gabarito": "Alternativa A — Terminar de calçar as duas luvas e só então corrigir a posição dos dedos.\n\nA correção só é feita quando as duas mãos já estão enluvadas, porque aí o ajuste é feito por superfícies estéreis tocando superfícies estéreis.\n\n• b) Mão desnuda jamais toca a face externa da luva.\n• c) Corrigir com uma mão ainda nua contamina a face externa.\n• d) Medida desproporcional — não houve quebra de técnica.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A medida da sonda nasoenteral antes da passagem é feita:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Da comissura labial ao umbigo.",
            "B) Do mento ao rebordo costal direito.",
            "C) Da ponta do nariz ao apêndice xifoide, diretamente.",
            "D) Da ponta do nariz ao lóbulo da orelha e daí ao apêndice xifoide."
        ],
        "gabarito": "Alternativa D — Da ponta do nariz ao lóbulo da orelha e daí ao apêndice xifoide.\n\nA medida em dois segmentos estima o trajeto nasofaríngeo somado ao esofágico. O ponto é marcado com esparadrapo antes da introdução.\n\n• a) Não corresponde ao trajeto anatômico da sonda.\n• b) Não corresponde ao trajeto anatômico da sonda.\n• c) Subestima o trajeto, por ignorar a curva nasofaríngea.\n\nRevisar: 08 — Sondas e cateteres"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre a pinça de Kocher, é correto afirmar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) É uma pinça hemostática delicada, de escolha para vasos de pequeno calibre.",
            "B) É um afastador autoestático de parede abdominal.",
            "C) É robusta e possui dente na ponta, adequada à preensão firme de tecidos resistentes como a aponeurose.",
            "D) É sinônimo de pinça de Babcock."
        ],
        "gabarito": "Alternativa C — É robusta e possui dente na ponta, adequada à preensão firme de tecidos resistentes como a aponeurose.\n\nA Kocher está entre os instrumentais especiais; o dente garante preensão segura em tecido resistente e contraindica seu uso em vísceras.\n\n• a) A hemostática delicada é a Halsted.\n• b) Autoestáticos são Gosset, Balfour, Finochietto e Adson.\n• d) A Babcock é atraumática, o oposto da Kocher.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Entre os materiais usados na confecção de drenos, aquele considerado mais inerte, por provocar menor reação inflamatória, é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) PVC.",
            "B) Plástico comum.",
            "C) Silicone.",
            "D) Látex."
        ],
        "gabarito": "Alternativa C — Silicone.\n\nO silicone tem a melhor biocompatibilidade do grupo, o que permite permanência mais prolongada com menos reação local.\n\n• a) Menos inerte que o silicone.\n• b) Menos inerte que o silicone.\n• d) O látex é o mais reativo e ainda envolve risco de alergia.\n\nRevisar: 07 — Drenos"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O lavabo cirúrgico pertence à zona:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Semirrestrita.",
            "B) Restrita.",
            "C) Externa ao centro cirúrgico.",
            "D) Irrestrita."
        ],
        "gabarito": "Alternativa A — Semirrestrita.\n\nO lavabo é ambiente da zona limpa: exige pijama, gorro e propés, mas não é a sala cirúrgica propriamente.\n\n• b) Incorreta: A zona restrita é composta pelas salas cirúrgicas.\n• c) Incorreta: Integra o centro cirúrgico.\n• d) Incorreta: A zona irrestrita comporta vestiários, espera, transferência, expurgo e corredor periférico.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A escara marrom-clara e superficial que impede a hemorragia é o produto visível:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Da coagulação.",
            "B) Da vaporização.",
            "C) Do efeito farádico.",
            "D) Do corte puro."
        ],
        "gabarito": "Alternativa A — Da coagulação.\n\nA capa superficial resulta da desidratação e da desnaturação proteica, e é ela que ocluí mecanicamente o vaso.\n\n• b) Incorreta: A vaporização não produz carvão.\n• c) Incorreta: O efeito farádico é estimulação neuromuscular.\n• d) Incorreta: O corte deixa cavidade limpa, com hemostasia discreta.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Durante laparoscopia, o eletrodo ativo é acionado enquanto encosta em uma pinça metálica de preensão; no 4º dia surge peritonite por perfuração de alça. O mecanismo foi:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Acoplamento capacitivo.",
            "B) Falha de isolamento.",
            "C) Acoplamento direto.",
            "D) Queimadura sob a placa dispersiva."
        ],
        "gabarito": "Alternativa C — Acoplamento direto.\n\nO acoplamento direto é exatamente o contato do eletrodo ativo com outro instrumento metálico, que passa a conduzir corrente para uma estrutura vizinha fora do campo de visão.\n\n• a) O acoplamento capacitivo ocorre por indução, sem contato.\n• b) A falha de isolamento pressupõe defeito na capa isolante, não mencionado.\n• d) A queimadura de placa ocorre na pele, não em alça intestinal.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A lâmina pequena e de gume curvo, indicada para incisões delicadas e cirurgia de pele, é a de número:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 11.",
            "B) 15.",
            "C) 21.",
            "D) 22."
        ],
        "gabarito": "Alternativa B — 15.\n\nA lâmina 15 tem barriga curva curta, que permite incisões precisas e controladas; encaixa no cabo nº 3.\n\n• a) Incorreta: A 11 é pontiaguda, para incisões puntiformes.\n• c) Incorreta: Lâmina grande, do cabo nº 4.\n• d) Incorreta: Lâmina grande, do cabo nº 4.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Um dreno colocado junto a uma anastomose intestinal, sem que haja coleção a drenar, para detectar precocemente fístula ou sangramento, tem indicação:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Terapêutica.",
            "B) Profilática.",
            "C) Diagnóstica exclusiva.",
            "D) Paliativa."
        ],
        "gabarito": "Alternativa B — Profilática.\n\nDrenagem profilática antecipa uma complicação possível; terapêutica trata coleção já existente.\n\n• a) Terapêutica pressupõe coleção presente.\n• c) A finalidade não é obter material para diagnóstico, e sim vigiar a anastomose.\n• d) Não se trata de controle de sintomas em doença incurável.\n\nRevisar: 07 — Drenos"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Classifique o Vicryl quanto a degradação, origem e configuração física:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Inabsorvível, natural, multifilamentar.",
            "B) Absorvível, sintético, multifilamentar.",
            "C) Absorvível, natural, monofilamentar.",
            "D) Inabsorvível, sintético, monofilamentar."
        ],
        "gabarito": "Alternativa B — Absorvível, sintético, multifilamentar.\n\nO Vicryl é o absorvível sintético trançado de uso mais difundido. O Monocryl é o absorvível sintético monofilamentar.\n\n• a) Esse perfil corresponde à seda.\n• c) Os absorvíveis naturais são os catguts.\n• d) Esse perfil corresponde ao Prolene.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O modo blend corresponde a:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A alternância automática entre eletrocirurgia e ultrassom.",
            "B) Uma potência intermediária entre corte e coagulação.",
            "C) Uma combinação, em proporções variáveis, das duas formas de onda.",
            "D) O uso simultâneo de energia monopolar e bipolar."
        ],
        "gabarito": "Alternativa C — Uma combinação, em proporções variáveis, das duas formas de onda.\n\nO blend não regula 'quanto', e sim 'como' a energia é entregue: aumenta a capacidade da corrente de corte de coagular e da corrente de coagulação de dissecar.\n\n• a) São tecnologias independentes.\n• b) Erro conceitual clássico — não é ajuste de potência.\n• d) Não há mistura de circuitos.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A sequência canônica dos tempos fundamentais da técnica operatória, conforme o material da disciplina, é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Diérese, exérese, síntese e hemostasia.",
            "B) Hemostasia, diérese, síntese e exérese.",
            "C) Diérese, hemostasia, exérese e síntese.",
            "D) Exérese, diérese, hemostasia e síntese."
        ],
        "gabarito": "Alternativa C — Diérese, hemostasia, exérese e síntese.\n\nAbre-se o plano (diérese), controla-se o sangramento (hemostasia), retira-se o que está doente (exérese) e reconstrói-se (síntese).\n\n• a) A hemostasia não é o último tempo: ela acompanha toda a operação.\n• b) Não se controla sangramento antes de abrir.\n• d) A exérese exige acesso prévio.\n\nRevisar: 02 — Tempos fundamentais"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Durante a escovação cirúrgica, o material da disciplina destaca a necessidade de escovar especificamente:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A face dorsal das mãos, dispensando o antebraço.",
            "B) Apenas a face palmar, por ser a de maior contato.",
            "C) As laterais do 1º e do 5º quirodáctilos e as laterais do antebraço até o cotovelo.",
            "D) Somente os espaços interdigitais."
        ],
        "gabarito": "Alternativa C — As laterais do 1º e do 5º quirodáctilos e as laterais do antebraço até o cotovelo.\n\nSão justamente as regiões que a escovação apressada esquece: as bordas laterais dos dedos extremos e as laterais do antebraço.\n\n• a) Incorreta: O antebraço até o cotovelo é obrigatório.\n• b) Incorreta: A escovação é circunferencial, não apenas palmar.\n• d) Incorreta: Os interdigitais são um dos passos, não o único.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Na Antiguidade Greco-Romana, a medicina e a cirurgia tiveram figuras seminais cujas concepções influenciaram o pensamento médico ocidental por séculos. A respeito desse período, assinale a alternativa correta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Hipócrates defendia que as afecções cirúrgicas decorriam de possessões demoníacas, recusando a drenagem mecânica de coleções purulentas ou fraturas.",
            "B) Galeno obteve vasta experiência no tratamento de gladiadores em Pérgamo e realizou dissecções sistemáticas em cadáveres humanos adultos, o que conferiu precisão incontestável à sua anatomia macroscópica.",
            "C) Os ensinamentos anatômicos e fisiológicos de Galeno, baseados fundamentalmente na dissecção de animais (como macacos e porcos), foram perpetuados de forma dogmática e inquestionável por mais de mil anos durante a Idade Média.",
            "D) O Corpus Hippocraticum desconsiderava procedimentos cirúrgicos, limitando-se a conceitos teóricos de fitoterapia e astrologia."
        ],
        "gabarito": "Alternativa C — Os ensinamentos anatômicos e fisiológicos de Galeno, baseados fundamentalmente na dissecção de animais (como macacos e porcos), foram perpetuados de forma dogmática e inquestionável por mais de mil anos durante a Idade Média.\n\nCláudio Galeno (século II d.C.) sistematizou a medicina greco-romana e teve grande impacto prático tratando gladiadores. Entretanto, diante da proibição legal de dissecar corpos humanos em Roma, transferiu achados animais para a anatomia humana. Durante a Idade Média, seus textos converteram-se em dogmas eclesiásticos e universitários intocáveis, congelando o avanço anatômico até o Renascimento.\n\n• a) Incorreta: Hipócrates adotava abordagem estritamente naturalista e racional, descrevendo drenagem de empiema torácico, redução de luxações e o princípio \"Primum non nocere\".\n• b) Incorreta: As leis romanas proibiam a dissecção de humanos; Galeno dissecou animais, cometendo erros anatômicos transmitidos por séculos (ex.: fendas invisíveis no septo cardíaco interventricular).\n• d) Incorreta: O Corpus Hippocraticum possui livros inteiramente dedicados à técnica operatória, como os tratados sobre feridas da cabeça, fraturas, articulações e hemorroidas.\n\nRevisar: 01 — História da cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre o laser em cirurgia, é correto afirmar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Depende de placa dispersiva para fechar o circuito.",
            "B) Atua por compressão mecânica associada à energia bipolar.",
            "C) A luz é policromática e difusa, o que amplia a área tratada.",
            "D) É monocromático, coerente e direcional, com pouca dispersão lateral e sem fuga de corrente."
        ],
        "gabarito": "Alternativa D — É monocromático, coerente e direcional, com pouca dispersão lateral e sem fuga de corrente.\n\nA energia é gerada quando elétrons saltam de níveis mais altos para mais baixos; ao atingir o tecido, induz vibração molecular. A precisão é alta e o custo também.\n\n• a) Incorreta: Não há corrente elétrica atravessando o paciente.\n• b) Incorreta: Descreve o selador vascular bipolar.\n• c) Incorreta: A monocromaticidade é justamente a característica do laser.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Ambroise Paré (1510-1590) é consagrado como uma das figuras mais extraordinárias da cirurgia ocidental, sendo chamado de \"Pai da Cirurgia Moderna\". Dentre suas contribuições mais marcantes, destacam-se:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A invenção da circulação extracorpórea e a introdução dos primeiros fios de sutura absorvíveis sintéticos.",
            "B) A abolição do uso de óleo de sabugueiro fervente no tratamento de ferimentos por arma de fogo e o restabelecimento da ligadura vascular com fios para hemostasia em amputações.",
            "C) A descoberta das luvas cirúrgicas de látex e o isolamento do bacilo tetânico em feridas de guerra.",
            "D) A criação da anestesia local com cocaína para cirurgias oftalmológicas de campanha."
        ],
        "gabarito": "Alternativa B — A abolição do uso de óleo de sabugueiro fervente no tratamento de ferimentos por arma de fogo e o restabelecimento da ligadura vascular com fios para hemostasia em amputações.\n\nCirurgião militar francês, Paré combateu a doutrina de Giovanni da Vigo de que feridas por arma de fogo eram \"envenenadas\" pela pólvora e exigiam óleo fervente. Na batalha de Turim (1537), após acabar o óleo, aplicou uma pomada de gema de ovo, óleo de rosas e terebintina, constatando no dia seguinte feridas sem dor intensa e sem necrose química. Nas amputações, abandonou a cauterização brutal com ferro em brasa, resgatando e aprimorando a ligadura de artérias e veias com fio. Ficou imortalizado por seu lema: \"Je le pansay, Dieu le guarist\" (Eu o curei com curativos, Deus o sarou).\n\n• a) Incorreta: Circulação extracorpórea (Gibbon) e fios sintéticos absorvíveis (poliglactina, polidioxanona) são do século XX.\n• c) Incorreta: Luvas cirúrgicas foram introduzidas por Halsted em 1889/1890.\n• d) Incorreta: Anestesia tópica com cocaína foi introduzida por Carl Koller em 1884.\n\nRevisar: 01 — História da cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O calibre de fio mais empregado na prática cirúrgica do dia a dia é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 12-0.",
            "B) 2.",
            "C) 10-0.",
            "D) 3-0."
        ],
        "gabarito": "Alternativa D — 3-0.\n\nO 3-0 equilibra resistência e delicadeza, servindo à maioria dos planos de espessura média. Calibres muito finos são de microcirurgia; muito grossos, de tecidos sob grande tensão.\n\n• a) Incorreta: Calibre de microcirurgia.\n• b) Incorreta: Muito grosso, reservado a tecidos sob grande tensão.\n• c) Incorreta: Calibre de microcirurgia.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Define-se corrente elétrica como:",
        "interactionType": "multiple-choice",
        "options": [
            "A) O fluxo de cargas elétricas que se movem por um condutor.",
            "B) A oposição do tecido à passagem de elétrons.",
            "C) O número de ciclos completados por segundo.",
            "D) A diferença de potencial entre dois pontos."
        ],
        "gabarito": "Alternativa A — O fluxo de cargas elétricas que se movem por um condutor.\n\nCorrente é fluxo de elétrons. Tensão é a força que os movimenta, resistência é o que se opõe a eles e frequência é a contagem de ciclos por segundo.\n\n• b) Incorreta: Essa é a definição de resistência ou impedância.\n• c) Incorreta: Essa é a definição de frequência.\n• d) Incorreta: Essa é a definição de tensão.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A drenagem espontânea ocorre por:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Capilaridade ou gravidade, sem força externa.",
            "B) Pressão positiva aplicada na cavidade.",
            "C) Irrigação combinada com aspiração.",
            "D) Sucção contínua gerada por vácuo."
        ],
        "gabarito": "Alternativa A — Capilaridade ou gravidade, sem força externa.\n\nNa drenagem espontânea o líquido sai por conta própria: sobe pelo material, no caso da capilaridade, ou desce pela diferença de altura, no caso da gravidade.\n\n• b) Incorreta: Não é mecanismo de drenagem.\n• c) Incorreta: Descreve um sistema combinado, não a drenagem espontânea pura.\n• d) Incorreta: Descreve a drenagem ativa.\n\nRevisar: 07 — Drenos"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A pinça de preensão que traumatiza a pele e a aponeurose de forma controlada, garantindo firmeza na apreensão, é a:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Pinça anatômica.",
            "B) Pinça dente de rato.",
            "C) Pinça de Babcock.",
            "D) Válvula de Doyen."
        ],
        "gabarito": "Alternativa B — Pinça dente de rato.\n\nO dente de rato prende com segurança tecidos que escorregariam de uma pinça lisa. O trauma é aceitável em pele e aponeurose, mas proibitivo em vísceras.\n\n• a) A anatômica é lisa e atraumática — escorrega na pele.\n• c) Instrumento atraumático, para víscera oca.\n• d) Não é pinça de preensão, e sim afastador.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "São afastadores dinâmicos, que exigem um auxiliar segurando:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Adson, Gosset e Farabeuf.",
            "B) Balfour, Doyen e Finochietto.",
            "C) Gosset, Balfour e Finochietto.",
            "D) Farabeuf, válvula de Doyen e afastadores maleáveis."
        ],
        "gabarito": "Alternativa D — Farabeuf, válvula de Doyen e afastadores maleáveis.\n\nDinâmico é o afastador que precisa de alguém segurando; autoestático é o que se mantém aberto sozinho por cremalheira.\n\n• a) Adson e Gosset são autoestáticos.\n• b) Balfour e Finochietto são autoestáticos.\n• c) Todos os três são autoestáticos.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A fumaça cirúrgica gerada pela vaporização tecidual contém:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Somente resíduos do antisséptico usado no preparo.",
            "B) Gases anestésicos exalados pelo paciente.",
            "C) Apenas vapor d'água, sem risco ocupacional.",
            "D) Partículas ultrafinas inaláveis, compostos químicos voláteis e material biológico, inclusive viável."
        ],
        "gabarito": "Alternativa D — Partículas ultrafinas inaláveis, compostos químicos voláteis e material biológico, inclusive viável.\n\nTrata-se de exposição ocupacional de toda a equipe, e é por isso que se recomenda o uso de sistemas de aspiração da fumaça.\n\n• a) Incorreta: A fumaça vem da vaporização tecidual.\n• b) Incorreta: Gases anestésicos circulam no sistema ventilatório, não na fumaça do eletrodo.\n• c) Incorreta: A composição vai muito além de vapor d'água.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre o número de tempos fundamentais, é correto afirmar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A síntese e a hemostasia são considerados um único tempo.",
            "B) A ementa cita três tempos e o material de aula descreve quatro, acrescentando a exérese.",
            "C) Todos os autores concordam que são exatamente cinco tempos.",
            "D) A exérese foi excluída da classificação moderna."
        ],
        "gabarito": "Alternativa B — A ementa cita três tempos e o material de aula descreve quatro, acrescentando a exérese.\n\nA divergência é real e vale conhecer: a ementa lista diérese, hemostasia e síntese; o material de aula insere a exérese como terceiro tempo, por ser o que define o objetivo terapêutico.\n\n• a) Incorreta: São tempos distintos, com objetivos diferentes.\n• c) Incorreta: Não há classificação de cinco tempos no material.\n• d) Incorreta: A exérese consta como terceiro tempo no material de aula.\n\nRevisar: 02 — Tempos fundamentais"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "São efeitos metabólicos da ativação simpática no trauma:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Aumento da glicogenólise, da gliconeogênese e da lipólise, com redução da secreção e do efeito da insulina.",
            "B) Redução da glicemia por aumento da captação periférica.",
            "C) Inibição da lipólise e acúmulo de triglicerídeos.",
            "D) Aumento isolado da síntese proteica muscular."
        ],
        "gabarito": "Alternativa A — Aumento da glicogenólise, da gliconeogênese e da lipólise, com redução da secreção e do efeito da insulina.\n\nAs catecolaminas mobilizam substrato energético por todas as vias disponíveis e, ao mesmo tempo, freiam a insulina, mantendo a glicose disponível na circulação.\n\n• b) Incorreta: A glicemia sobe, e a captação periférica cai.\n• c) Incorreta: A lipólise é ativada.\n• d) Incorreta: Há proteólise, não síntese.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A diferença entre corrente contínua e corrente alternada é que, na alternada:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Os elétrons se movem sempre na mesma direção.",
            "B) A corrente muda de sentido periodicamente.",
            "C) Não há movimento de cargas.",
            "D) A tensão é sempre nula."
        ],
        "gabarito": "Alternativa B — A corrente muda de sentido periodicamente.\n\nA alternância de sentido é o que permite definir ciclos e, portanto, frequência — parâmetro central na eletrocirurgia.\n\n• a) Incorreta: Essa é a corrente contínua.\n• c) Incorreta: Sem movimento de cargas não há corrente.\n• d) Incorreta: Tensão nula significa ausência de corrente.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sonda é definida como o dispositivo instalado:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Na cavidade peritoneal, para retirada de coleções.",
            "B) No tecido subcutâneo, para monitorização de pressão.",
            "C) No interior de um vaso sanguíneo, para infusão de fluidos.",
            "D) Na luz de um órgão, para drenar seu conteúdo ou administrar algo dentro dele."
        ],
        "gabarito": "Alternativa D — Na luz de um órgão, para drenar seu conteúdo ou administrar algo dentro dele.\n\nA sonda ocupa a luz natural ou cirurgicamente criada de um órgão. O que atua em cavidade, e não em luz de órgão, é o dreno.\n\n• a) Incorreta: Descreve o dreno de cavidade.\n• b) Incorreta: Não corresponde à definição.\n• c) Incorreta: Descreve o cateter vascular.\n\nRevisar: 08 — Sondas e cateteres"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A fase de recuperação da resposta ao trauma caracteriza-se por:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Queda abrupta do consumo de oxigênio.",
            "B) Pico das catecolaminas circulantes.",
            "C) Aprofundamento do catabolismo e balanço nitrogenado cada vez mais negativo.",
            "D) Redução progressiva do catabolismo e retorno ao anabolismo."
        ],
        "gabarito": "Alternativa D — Redução progressiva do catabolismo e retorno ao anabolismo.\n\nSe a evolução é favorável, a intensidade hormonal cede, o balanço nitrogenado se recompõe e o organismo volta a construir tecido.\n\n• a) Incorreta: Descreve a fase ebb.\n• b) Incorreta: O pico ocorre nas fases iniciais.\n• c) Incorreta: Descreve a persistência da fase flow.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A unidade eletrocirúrgica converte a frequência da rede elétrica em:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 50 a 60 Hz.",
            "B) 500 a 3.000 Hz.",
            "C) 500.000 a 3.000.000 Hz.",
            "D) 5 a 10 Hz."
        ],
        "gabarito": "Alternativa C — 500.000 a 3.000.000 Hz.\n\nA conversão para a faixa de centenas de milhares a milhões de hertz é o que torna a corrente segura para atravessar o paciente. A eletrocirurgia opera tipicamente entre 300 kHz e 5 MHz.\n\n• a) Essa é a frequência da rede, e é justamente a faixa perigosa.\n• b) Ainda dentro da faixa que estimula tecidos excitáveis.\n• d) Faixa incompatível com uso cirúrgico.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "São fatores que modulam a intensidade da resposta endocrinometabólica ao trauma, exceto:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Duração da hipoperfusão e presença de infecção.",
            "B) Magnitude e localização da lesão.",
            "C) Dor, ansiedade e temperatura corporal.",
            "D) Tipo sanguíneo do paciente."
        ],
        "gabarito": "Alternativa D — Tipo sanguíneo do paciente.\n\nModulam a resposta: extensão e local da lesão, choque e sua duração, dor, ansiedade, temperatura, anestesia, cirurgia, ventilação mecânica, infecção, idade, estado nutricional, doenças prévias e a adequação da ressuscitação.\n\n• a) São fatores moduladores.\n• b) É fator modulador.\n• c) São fatores moduladores.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Antes de o paciente sair da sala cirúrgica, a enfermagem confirma verbalmente, exceto:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A contagem de instrumentos, compressas e agulhas.",
            "B) A identificação das amostras obtidas e o nome do paciente.",
            "C) A demarcação do sítio cirúrgico e o consentimento informado.",
            "D) O nome do procedimento realizado."
        ],
        "gabarito": "Alternativa C — A demarcação do sítio cirúrgico e o consentimento informado.\n\nDemarcação do sítio e consentimento são checados no sign in, antes da anestesia. O sign out cuida do que foi feito e do que sai da sala.\n\n• a) Item do sign out.\n• b) Item do sign out.\n• d) Item do sign out.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "As alterações do sódio e da osmolaridade no paciente traumatizado sofrem influência de:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Apenas da concentração de albumina.",
            "B) ADH, fluidos administrados e função renal.",
            "C) Somente do volume de dieta enteral ofertado.",
            "D) Exclusivamente da temperatura ambiente."
        ],
        "gabarito": "Alternativa B — ADH, fluidos administrados e função renal.\n\nA retenção de água mediada pelo ADH, o tipo e o volume de solução infundida e a capacidade renal de manejar o sódio atuam simultaneamente.\n\n• a) Incorreta: A albumina influencia a pressão oncótica, não isoladamente a natremia.\n• c) Incorreta: A dieta é apenas um dos componentes.\n• d) Incorreta: Não é fator determinante.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O efeito da corrente elétrica desejado na eletrocirurgia, responsável pelo corte e pela coagulação, é o:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Térmico (efeito Joule).",
            "B) Eletrolítico.",
            "C) Capacitivo.",
            "D) Farádico."
        ],
        "gabarito": "Alternativa A — Térmico (efeito Joule).\n\nA corrente que atravessa um tecido com resistência converte energia elétrica em calor. É esse calor que vaporiza ou desnatura as proteínas.\n\n• b) Eletrolítico é o deslocamento iônico, evitado pelas altas frequências.\n• c) Acoplamento capacitivo é um mecanismo de lesão, não um efeito primário da corrente.\n• d) Farádico é a estimulação de nervo e músculo — indesejado.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A grandeza que expressa a oposição do tecido à passagem da corrente e é responsável pela conversão de energia elétrica em calor é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Tensão.",
            "B) Frequência.",
            "C) Resistência ou impedância.",
            "D) Ciclo."
        ],
        "gabarito": "Alternativa C — Resistência ou impedância.\n\nSem resistência não há aquecimento: é ela que dissipa a energia elétrica em forma de calor, o efeito Joule.\n\n• a) Incorreta: Tensão é a força que movimenta os elétrons.\n• b) Incorreta: Frequência é o número de ciclos por segundo.\n• d) Incorreta: Ciclo é o tempo de uma alternância completa.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O dreno Porto-Vac é considerado inadequado para a cavidade abdominal porque:",
        "interactionType": "multiple-choice",
        "options": [
            "A) É feito de látex, material muito reativo.",
            "B) Seu custo é proibitivo para uso rotineiro.",
            "C) Sua sucção potente pode lesar vísceras.",
            "D) Não possui fenestrações em sua extremidade interna."
        ],
        "gabarito": "Alternativa C — Sua sucção potente pode lesar vísceras.\n\nA pressão negativa gerada pela sanfona é alta e pode aspirar e lesar alça intestinal. O Porto-Vac é dreno de subcutâneo.\n\n• a) Ele é de plástico.\n• b) O custo dele é relativamente baixo.\n• d) Ele tem fenestrações, sim.\n\nRevisar: 07 — Drenos"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Os aminoácidos mobilizados na resposta ao trauma provêm principalmente:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Da lipólise do tecido adiposo visceral.",
            "B) Da dieta enteral instituída precocemente.",
            "C) Da proteólise do músculo esquelético.",
            "D) Da degradação das proteínas plasmáticas hepáticas."
        ],
        "gabarito": "Alternativa C — Da proteólise do músculo esquelético.\n\nA proteólise muscular sustenta a síntese de proteínas de fase aguda, a imunidade e a gliconeogênese — com o custo da perda de massa magra e do balanço nitrogenado negativo.\n\n• a) A lipólise fornece ácidos graxos e glicerol, não aminoácidos.\n• b) A oferta dietética não supre a demanda do estado hipercatabólico.\n• d) O fígado aumenta a síntese de proteínas de fase aguda, não a degradação.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A elevação do lactato no politraumatizado deve ser interpretada como:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Possível reflexo de hipoperfusão e de alterações metabólicas, sempre lido no contexto clínico.",
            "B) Achado sem valor prognóstico.",
            "C) Sinal inequívoco de insuficiência hepática.",
            "D) Marcador exclusivo de sepse."
        ],
        "gabarito": "Alternativa A — Possível reflexo de hipoperfusão e de alterações metabólicas, sempre lido no contexto clínico.\n\nO lactato tem múltiplas origens no trauma; isolado, não fecha diagnóstico, mas sua tendência ao longo do tempo é um dos melhores indicadores de resposta à ressuscitação.\n\n• b) Incorreta: Tem valor prognóstico reconhecido.\n• c) Incorreta: A disfunção hepática é uma das causas possíveis, não a única.\n• d) Incorreta: Não é exclusivo de sepse.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Um acadêmico deseja realizar a sutura de pele ao final do procedimento. A conduta adequada é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Iniciar a sutura assim que o cirurgião se afastar, demonstrando proatividade.",
            "B) Solicitar a oportunidade apenas depois de demonstrar que conhece o caso e a técnica.",
            "C) Pedir ao instrumentador que entregue o porta-agulhas diretamente.",
            "D) Aguardar em silêncio, pois acadêmicos não devem executar procedimentos."
        ],
        "gabarito": "Alternativa B — Solicitar a oportunidade apenas depois de demonstrar que conhece o caso e a técnica.\n\nA regra do material é explícita: antes de pedir para realizar um procedimento, mostre que conhece o paciente e o passo técnico. Proatividade sem preparo é risco, não iniciativa.\n\n• a) Incorreta: Executar sem autorização é quebra de conduta e de segurança.\n• c) Incorreta: O material é entregue sob coordenação do cirurgião responsável.\n• d) Incorreta: A participação supervisionada é parte legítima do aprendizado.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Na retirada das luvas ao final do procedimento, a sequência correta prevê que:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A mão desnuda puxe a luva restante pela face externa, próximo aos dedos.",
            "B) A mão desnuda toque apenas a parte interna da luva remanescente.",
            "C) A primeira luva seja retirada puxando-se pela ponta dos dedos com a outra mão enluvada.",
            "D) Ambas as luvas sejam retiradas simultaneamente pelos punhos."
        ],
        "gabarito": "Alternativa B — A mão desnuda toque apenas a parte interna da luva remanescente.\n\nDobra-se o punho de uma luva, retira-se a outra sem que toque a pele e, com a mão já desnuda, remove-se a luva restante tocando somente sua face interna.\n\n• a) A face externa está contaminada e não pode tocar a pele.\n• c) Puxar pelos dedos favorece o contato da luva contaminada com a pele.\n• d) A retirada simultânea impede o controle das superfícies.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Segundo a definição do material, drenos são:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Próteses de silicone implantadas em definitivo.",
            "B) Dispositivos rígidos usados para manter a cavidade aberta.",
            "C) Tubos ou lâminas de material maleável, de lúmen único ou múltiplo, destinados à retirada de secreções de uma cavidade.",
            "D) Cateteres destinados exclusivamente à administração de medicamentos intracavitários."
        ],
        "gabarito": "Alternativa C — Tubos ou lâminas de material maleável, de lúmen único ou múltiplo, destinados à retirada de secreções de uma cavidade.\n\nA definição contempla material maleável, calibre e tamanho variáveis, lúmen único ou múltiplo, e admite associação com irrigação combinada.\n\n• a) Incorreta: Drenos são temporários.\n• b) Incorreta: Manter cavidade aberta é função de afastador.\n• d) Incorreta: Administrar medicamento é função de cateter, não a definição de dreno.\n\nRevisar: 07 — Drenos"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Quanto ao suporte nutricional no paciente traumatizado grave, é correto afirmar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A via parenteral é preferida sempre que houver hipermetabolismo.",
            "B) A via enteral é preferida quando o trato gastrointestinal está funcionante.",
            "C) A oferta calórica deve ser a maior possível, para conter o catabolismo.",
            "D) O controle glicêmico deve priorizar valores baixos, aceitando episódios de hipoglicemia."
        ],
        "gabarito": "Alternativa B — A via enteral é preferida quando o trato gastrointestinal está funcionante.\n\nCom o trato funcionante, a via enteral é a preferida. Evita-se tanto a subalimentação quanto o excesso calórico, e o controle glicêmico deve evitar hiperglicemia importante e, sobretudo, hipoglicemia.\n\n• a) A parenteral é reservada a quando a via enteral é inviável.\n• c) O excesso calórico é prejudicial.\n• d) A hipoglicemia é o desfecho que mais se busca evitar.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em uma toracotomia, o afastador autoestático classicamente utilizado para manter os arcos costais afastados é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Finochietto.",
            "B) Válvula de Doyen.",
            "C) Gosset.",
            "D) Balfour."
        ],
        "gabarito": "Alternativa A — Finochietto.\n\nO Finochietto é o afastador de tórax; Gosset e Balfour são de parede abdominal, e a válvula de Doyen é dinâmica.\n\n• b) É dinâmica, e usada para afastar vísceras.\n• c) Afastador abdominal.\n• d) Afastador abdominal, com valva suprapúbica.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A propriedade do fio definida como a tendência a manter a posição anterior, dificultando a confecção e a manutenção dos nós, é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Memória.",
            "B) Tensão do nó.",
            "C) Elasticidade.",
            "D) Resistência tênsil."
        ],
        "gabarito": "Alternativa A — Memória.\n\nMemória é o quanto o fio 'lembra' o formato do enovelamento. Fios de alta memória, como o náilon, exigem mais laçadas por nó.\n\n• b) Tensão do nó é a força necessária para que ele deslize.\n• c) Elasticidade é o retorno à posição após estiramento.\n• d) Resistência tênsil é a força suportada até o rompimento.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre o posicionamento da placa dispersiva, é correto afirmar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Quanto menor a área de contato efetiva, menor o risco de queimadura.",
            "B) Pode ser posicionada sobre cicatrizes, desde que planas.",
            "C) Deve ser colocada sobre proeminência óssea, para melhor fixação.",
            "D) Deve ter grande área de contato, sobre massa muscular, com a pele limpa, seca e sem pelos, próxima ao campo operatório."
        ],
        "gabarito": "Alternativa D — Deve ter grande área de contato, sobre massa muscular, com a pele limpa, seca e sem pelos, próxima ao campo operatório.\n\nGrande área significa baixa densidade de corrente e, portanto, pouco aquecimento. Geradores modernos ainda monitoram a qualidade do contato e interrompem a saída se ela cai.\n\n• a) Inverte a relação: menor área efetiva significa maior densidade e maior risco.\n• b) Tecido cicatricial e fibrótico deve ser evitado.\n• c) Proeminências ósseas são local a evitar.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Quem não realizou a lavagem cirúrgica das mãos:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Não deve tocar nos aventais estéreis dispostos no LAP.",
            "B) Pode escolher o avental de melhor tamanho na pilha.",
            "C) Pode ajudar a abrir o avental de quem está paramentado.",
            "D) Pode manusear os aventais desde que use luvas de procedimento."
        ],
        "gabarito": "Alternativa A — Não deve tocar nos aventais estéreis dispostos no LAP.\n\nOs aventais do LAP são estéreis; tocá-los sem estar lavado os contamina, inclusive os que estão abaixo na pilha.\n\n• b) Incorreta: Nem mesmo o profissional lavado escolhe: usa-se o de cima.\n• c) Incorreta: A abertura do avental é feita pelo próprio profissional paramentado.\n• d) Incorreta: Luva de procedimento não é estéril.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A confirmação de que o antimicrobiano profilático foi administrado nos últimos 60 minutos pertence a qual momento da Lista de Verificação?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Antes da incisão cirúrgica.",
            "B) Antes da saída do paciente da sala.",
            "C) Na visita pré-anestésica do dia anterior.",
            "D) Antes da indução anestésica."
        ],
        "gabarito": "Alternativa A — Antes da incisão cirúrgica.\n\nÉ item do time out, junto com a apresentação nominal da equipe, a confirmação de paciente/procedimento/local e a revisão dos pontos críticos do plano.\n\n• b) Esse momento é o da contagem de materiais e identificação de amostras.\n• c) A janela de 60 minutos é imediatamente pré-incisional.\n• d) Nesse momento se confirma identificação, consentimento, sítio demarcado, monitor e riscos anestésicos.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A via oral é preferida à nasal para a sondagem gástrica quando:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Há necessidade de alimentação, e não de drenagem.",
            "B) O paciente está consciente e colaborativo.",
            "C) O paciente permanecerá inconsciente ou apresenta trauma de face.",
            "D) A sonda será mantida por mais de sete dias."
        ],
        "gabarito": "Alternativa C — O paciente permanecerá inconsciente ou apresenta trauma de face.\n\nEm trauma de face há risco de trajeto falso, e no paciente inconsciente a via oral evita lesão e desconforto nasal prolongado.\n\n• a) Incorreta: Alimentação prolongada indica outra sonda, não outra via.\n• b) Incorreta: No paciente desperto a via nasal é mais bem tolerada.\n• d) Incorreta: A permanência prolongada não é o critério para a via oral.\n\nRevisar: 08 — Sondas e cateteres"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Em uma herniorrafia, o cirurgião pinça e liga a veia epigástrica superficial antes de secioná-la. Esse gesto configura:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Diérese cruenta.",
            "B) Síntese incompleta.",
            "C) Hemostasia curativa.",
            "D) Hemostasia preventiva."
        ],
        "gabarito": "Alternativa D — Hemostasia preventiva.\n\nA hemostasia é preventiva quando o vaso é controlado antes da secção; é curativa quando se atua sobre um vaso que já está sangrando.\n\n• a) Diérese é a abertura de planos, não o controle vascular.\n• b) Síntese é o fechamento, que sequer começou.\n• c) Só seria curativa se o vaso já tivesse sangrado.\n\nRevisar: 02 — Tempos fundamentais"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre o tubo orotraqueal e a traqueostomia, é correto afirmar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A traqueostomia está indicada apenas em obstrução tumoral da laringe.",
            "B) Apenas o tubo orotraqueal possui balonete.",
            "C) Ambos possuem balonete distal para proteção da via aérea.",
            "D) A traqueostomia é a via incruenta e o tubo orotraqueal, a cruenta."
        ],
        "gabarito": "Alternativa C — Ambos possuem balonete distal para proteção da via aérea.\n\nOs dois dispositivos têm cuff. A diferença está na via: o tubo é introduzido pela boca ou nariz, e a cânula de traqueostomia, por incisão cervical.\n\n• a) Também se indica em ventilação mecânica prolongada e obstrução de via aérea superior de outras causas.\n• b) A cânula de traqueostomia também tem balonete.\n• d) Inverte as vias: a traqueostomia é a cruenta.\n\nRevisar: 08 — Sondas e cateteres"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre os materiais das sondas, é correto afirmar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Podem ser de plástico, látex, silicone, teflon ou polietileno, com flexibilidade variável.",
            "B) São sempre semirrígidas e de lúmen único.",
            "C) O material define a finalidade diagnóstica ou terapêutica.",
            "D) São fabricadas exclusivamente em látex."
        ],
        "gabarito": "Alternativa A — Podem ser de plástico, látex, silicone, teflon ou polietileno, com flexibilidade variável.\n\nA variedade de materiais permite ajustar rigidez, biocompatibilidade e tempo de permanência à necessidade clínica.\n\n• b) Incorreta: Há sondas flexíveis e multilúmen.\n• c) Incorreta: A finalidade depende do uso, não do material.\n• d) Incorreta: O látex é apenas um dos materiais.\n\nRevisar: 08 — Sondas e cateteres"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A disposição da mesa de instrumentação é organizada segundo:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Os tempos operatórios, com os instrumentos de cada tempo agrupados.",
            "B) O tamanho, do menor para o maior.",
            "C) A frequência de esterilização de cada peça.",
            "D) A ordem alfabética dos instrumentos."
        ],
        "gabarito": "Alternativa A — Os tempos operatórios, com os instrumentos de cada tempo agrupados.\n\nAgrupar por tempo operatório permite ao instrumentador antecipar o instrumento seguinte sem precisar procurar, o que reduz o tempo cirúrgico.\n\n• b) O tamanho é irrelevante para a organização.\n• c) Todos os instrumentos do campo estão estéreis.\n• d) Não há critério alfabético.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre o metabolismo lipídico no trauma, é correto afirmar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Os ácidos graxos liberados não podem ser usados como combustível.",
            "B) O glicerol é excretado sem participação metabólica.",
            "C) Há inibição da lipólise para preservar as reservas.",
            "D) Há ativação da lipólise, com liberação de ácidos graxos livres e glicerol."
        ],
        "gabarito": "Alternativa D — Há ativação da lipólise, com liberação de ácidos graxos livres e glicerol.\n\nOs ácidos graxos servem de combustível a vários tecidos e o glicerol entra como substrato da gliconeogênese — dupla contribuição energética.\n\n• a) Incorreta: São combustível preferencial de vários tecidos nessa fase.\n• b) Incorreta: O glicerol é substrato gliconeogênico.\n• c) Incorreta: A lipólise é ativada, não inibida.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Comparando monopolar e bipolar, assinale a alternativa incorreta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A monopolar oferece corte excelente; a bipolar, corte limitado.",
            "B) A bipolar tem maior precisão e menor risco de lesão a distância.",
            "C) A monopolar é preferida em hemostasia fina de estruturas delicadas.",
            "D) A bipolar é adequada a neurocirurgia e a cirurgia de estruturas nobres."
        ],
        "gabarito": "Alternativa C — A monopolar é preferida em hemostasia fina de estruturas delicadas.\n\nHemostasia fina em estrutura delicada é a indicação típica da bipolar, cujo trajeto curto e focal poupa o tecido vizinho.\n\n• a) Afirmação correta.\n• b) Afirmação correta.\n• d) Afirmação correta.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Qual item não pertence à checagem realizada antes da indução anestésica?",
        "interactionType": "multiple-choice",
        "options": [
            "A) Confirmação do consentimento para cirurgia e anestesia.",
            "B) Contagem de instrumentos, compressas e agulhas.",
            "C) Revisão do risco de perda sanguínea e de via aérea difícil com o anestesiologista.",
            "D) Confirmação da identificação do paciente com ele próprio, sempre que possível."
        ],
        "gabarito": "Alternativa B — Contagem de instrumentos, compressas e agulhas.\n\nA contagem de materiais é feita no sign out, antes de o paciente deixar a sala, e é confirmada verbalmente pela enfermagem.\n\n• a) Pertence ao sign in.\n• c) Pertence ao sign in.\n• d) Pertence ao sign in.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre a demarcação do sítio cirúrgico, é correto afirmar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) É conferida visualmente antes da indução anestésica e reconfirmada antes da incisão.",
            "B) É realizada exclusivamente após a indução anestésica.",
            "C) Cabe apenas à enfermagem, no sign out.",
            "D) É dispensável quando o procedimento é bilateral."
        ],
        "gabarito": "Alternativa A — É conferida visualmente antes da indução anestésica e reconfirmada antes da incisão.\n\nA conferência do sítio aparece nos dois primeiros momentos da lista: no sign in, com o paciente ainda desperto quando possível, e de novo no time out.\n\n• b) O ideal é fazê-la com o paciente capaz de confirmar.\n• c) A enfermagem confirma materiais e amostras no sign out.\n• d) Procedimentos em estruturas pareadas são justamente os de maior risco de lateralidade trocada.\n\nRevisar: 03 — Centro cirúrgico e cirurgia segura"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A lâmina pontiaguda, adequada a incisões puntiformes como a drenagem de abscessos, é a de número:",
        "interactionType": "multiple-choice",
        "options": [
            "A) 22.",
            "B) 21.",
            "C) 15.",
            "D) 11."
        ],
        "gabarito": "Alternativa D — 11.\n\nA lâmina 11 tem ponta triangular e permite a punção seguida de incisão. A 15 é pequena e curva, para cirurgia delicada e pele.\n\n• a) Lâmina grande, para incisões amplas, no cabo nº 4.\n• b) Lâmina grande, no cabo nº 4.\n• c) A 15 é curva e usada em incisões delicadas.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Analise:\nI. O catgut cromado é absorvível e de origem animal.\nII. O Mononylon é sintético, inabsorvível e monofilamentar.\nIII. A seda é inabsorvível, natural e multifilamentar.\nIV. O Dexon é inabsorvível e monofilamentar.",
        "interactionType": "multiple-choice",
        "options": [
            "A) Apenas I e II estão corretas.",
            "B) Apenas I, II e III estão corretas.",
            "C) Apenas III e IV estão corretas.",
            "D) Todas estão corretas."
        ],
        "gabarito": "Alternativa B — Apenas I, II e III estão corretas.\n\nO Dexon é absorvível e multifilamentar, o que torna IV falsa. As demais classificações estão corretas.\n\n• a) Desconsidera III, que é verdadeira.\n• c) I e II também são verdadeiras, e IV é falsa.\n• d) IV é falsa.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Após concluir a lavagem cirúrgica, o profissional deve:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Secar as mãos na própria roupa privativa antes de vestir o avental.",
            "B) Manter as mãos abaixadas para que a água escorra em direção aos dedos.",
            "C) Manter as mãos acima da cabeça até chegar à mesa.",
            "D) Manter as mãos no próprio campo de visão, sem abaixá-las nem elevá-las em excesso."
        ],
        "gabarito": "Alternativa D — Manter as mãos no próprio campo de visão, sem abaixá-las nem elevá-las em excesso.\n\nManter as mãos no campo de visão evita tanto o escorrimento de água contaminada dos antebraços para as mãos quanto o contato inadvertido com superfícies.\n\n• a) A secagem é feita com a compressa estéril do LAP.\n• b) Abaixar as mãos leva água do antebraço para os dedos.\n• c) Elevação excessiva também é incorreta e desnecessária.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "São exemplos de fios inabsorvíveis de origem natural:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Prolene, mononylon e aço.",
            "B) Seda, linho e algodão.",
            "C) Vicryl, Dexon e Monocryl.",
            "D) Catgut simples e catgut cromado."
        ],
        "gabarito": "Alternativa B — Seda, linho e algodão.\n\nSeda, linho e algodão permanecem no organismo até serem removidos e são de origem natural — daí a maior reação tecidual em comparação com os sintéticos.\n\n• a) Incorreta: São inabsorvíveis, mas sintéticos.\n• c) Incorreta: São absorvíveis sintéticos.\n• d) Incorreta: São absorvíveis de origem animal.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A hemostasia pode ser classificada, quanto à duração do efeito, em:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Temporária e definitiva.",
            "B) Completa e incompleta.",
            "C) Primária e terciária.",
            "D) Cruenta e romba."
        ],
        "gabarito": "Alternativa A — Temporária e definitiva.\n\nAlém do par preventiva/curativa, a hemostasia se classifica em temporária — como o clampeamento ou o torniquete — e definitiva, como a ligadura e a selagem.\n\n• b) Incorreta: Esse par classifica a síntese.\n• c) Incorreta: Classificação inexistente no material.\n• d) Incorreta: Esse par classifica a diérese.\n\nRevisar: 02 — Tempos fundamentais"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Compressas, gazes e cubas são classificadas no material como pertencentes ao grupo:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Dos instrumentos de diérese.",
            "B) Dos instrumentos especiais.",
            "C) Dos afastadores.",
            "D) Dos instrumentos de síntese."
        ],
        "gabarito": "Alternativa B — Dos instrumentos especiais.\n\nO grupo dos especiais reúne, além da Kocher, os materiais de apoio de cada cirurgia: compressas, gazes, cubas e materiais específicos.\n\n• a) Incorreta: Diérese reúne cabos, lâminas e tesouras.\n• c) Incorreta: Afastadores são instrumentos de exposição.\n• d) Incorreta: Síntese reúne porta-agulhas e fios.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A elevação da ureia em paciente politraumatizado deve ser interpretada considerando que:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Pode decorrer do catabolismo proteico e de alterações da perfusão renal.",
            "B) É sempre artefato laboratorial em vigência de hemólise.",
            "C) Só ocorre após a introdução de dieta hiperproteica.",
            "D) Indica necessariamente lesão renal aguda estabelecida."
        ],
        "gabarito": "Alternativa A — Pode decorrer do catabolismo proteico e de alterações da perfusão renal.\n\nNesse contexto a ureia tem dupla origem: o aumento da oferta de nitrogênio pela proteólise e a redução da perfusão renal.\n\n• b) Afirmação sem fundamento.\n• c) A elevação ocorre mesmo sem oferta proteica adicional.\n• d) O uso de 'necessariamente' ignora a via catabólica.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Assinale a associação correta entre tecnologia e mecanismo:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Plasma de argônio — energia bipolar associada à compressão mecânica do vaso.",
            "B) LigaSure — energia bipolar controlada associada à compressão, desnaturando colágeno e elastina.",
            "C) Laser — vibração mecânica de alta frequência.",
            "D) LigaSure — energia monopolar sem contato, usando gás inerte como condutor."
        ],
        "gabarito": "Alternativa B — LigaSure — energia bipolar controlada associada à compressão, desnaturando colágeno e elastina.\n\nO selador vascular bipolar entrega de 50 a 100 ºC com a pinça analisando a impedância do tecido, funde a parede do vaso e depois dispara a lâmina de corte.\n\n• a) Essa descrição é do LigaSure.\n• c) Laser é luz por emissão estimulada de radiação; vibração é o ultrassônico.\n• d) Essa descrição é do plasma de argônio.\n\nRevisar: 09 — Energia em cirurgia"
    },
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
        "gabarito": "Alternativa B — Associa a ação antisséptica à remoção mecânica de sujidade e de parte da microbiota.\n\nNa degermação há fricção: o componente mecânico soma-se ao químico, removendo sujidade, oleosidade e microbiota transitória.\n\n• a) Incorreta: Pode ser feita com clorexidina ou PVPI degermante, não apenas álcool.\n• c) Incorreta: Atua sobre tecido vivo.\n• d) Incorreta: A destruição de esporos é atributo da esterilização.\n\nRevisar: 04 — Assepsia, antissepsia e paramentação"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A coagulação clínica, tal como obtida no campo operatório, resulta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Da vaporização isolada.",
            "B) Do efeito simultâneo de fulguração e dessecação.",
            "C) Do corte em baixa potência.",
            "D) Do efeito eletrolítico sobre as proteínas."
        ],
        "gabarito": "Alternativa B — Do efeito simultâneo de fulguração e dessecação.\n\nNa prática os dois efeitos coexistem: parte da energia chega por contato e parte por arco, formando a capa marrom-clara que impede a hemorragia.\n\n• a) A vaporização não produz coágulo — as células explodem sem carbonização.\n• c) Corte em baixa potência não é sinônimo de coagulação.\n• d) O efeito eletrolítico é evitado nas altas frequências.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "O afastador autoestático dotado de valva suprapúbica, usado em laparotomias infraumbilicais, é o:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Adson.",
            "B) Gosset.",
            "C) Balfour.",
            "D) Finochietto."
        ],
        "gabarito": "Alternativa C — Balfour.\n\nO Balfour reúne as duas valvas laterais e uma valva central que afasta a bexiga e o conteúdo pélvico. O Gosset tem apenas as valvas laterais.\n\n• a) Incorreta: Afastador autoestático pequeno, de uso em superfície.\n• b) Incorreta: Autoestático abdominal, mas sem valva suprapúbica.\n• d) Incorreta: Afastador de tórax.\n\nRevisar: 05 — Instrumental cirúrgico básico"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A sequência hormonal do eixo hipotálamo-hipófise-adrenal no trauma é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Cortisol → CRH → ACTH.",
            "B) ADH → ACTH → aldosterona.",
            "C) ACTH → CRH → cortisol.",
            "D) CRH → ACTH → cortisol."
        ],
        "gabarito": "Alternativa D — CRH → ACTH → cortisol.\n\nO hipotálamo libera CRH, que estimula a hipófise a liberar ACTH, que por sua vez estimula o córtex adrenal a produzir cortisol.\n\n• a) Inverte a direção do eixo.\n• b) Mistura eixos distintos.\n• c) Inverte hipotálamo e hipófise.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A propriedade definida como a força necessária para que o nó deslize é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Elasticidade.",
            "B) Tensão do nó.",
            "C) Resistência tênsil.",
            "D) Memória."
        ],
        "gabarito": "Alternativa B — Tensão do nó.\n\nTensão do nó mede a segurança do laço: quanto menor, maior o risco de o nó afrouxar e a sutura se soltar.\n\n• a) Incorreta: Elasticidade é o retorno após estiramento.\n• c) Incorreta: Resistência tênsil é a força até o rompimento do fio.\n• d) Incorreta: Memória é a tendência a retornar ao formato original.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A história da cirurgia inicia-se na pré-história com procedimentos empíricos e mágico-religiosos. Sobre as práticas cirúrgicas primitivas e os primeiros registros documentados da Antiguidade, assinale a alternativa correta:",
        "interactionType": "multiple-choice",
        "options": [
            "A) A trepanação craniana realizada no período Neolítico era invariavelmente fatal, não havendo evidências arqueológicas de consolidação ou regeneração óssea nos crânios fósseis.",
            "B) O Papiro de Edwin Smith (c. 1600 a.C.) é considerado o primeiro tratado cirúrgico racional da história, descrevendo casos de trauma de forma sistemática, com exame físico, diagnóstico, prognóstico e técnicas de sutura e aproximação de feridas.",
            "C) O Código de Hamurabi não continha nenhuma menção à prática cirúrgica, restringindo-se exclusivamente a questões agrárias e comerciais.",
            "D) Na Antiguidade Oriental e Egípcia, a hemostasia era desconhecida, inexistindo registros do uso de compressão direta ou ferro aquecido para conter sangramentos."
        ],
        "gabarito": "Alternativa B — O Papiro de Edwin Smith (c. 1600 a.C.) é considerado o primeiro tratado cirúrgico racional da história, descrevendo casos de trauma de forma sistemática, com exame físico, diagnóstico, prognóstico e técnicas de sutura e aproximação de feridas.\n\nO Papiro de Edwin Smith marca a transição da medicina mágica para a observação empírica e racional. Descreve 48 casos sistemáticos de lesões traumáticas, categorizando-os segundo o prognóstico objetivo e detalhando suturas com fios de linho, talas e cauterização.\n\n• a) Incorreta: Diversos crânios neolíticos exibem bordas arredondadas e formação de calo ósseo liso, provando que os indivíduos sobreviveram por meses ou anos após a trepanação.\n• c) Incorreta: O Código de Hamurabi (Babilônia, c. 1750 a.C.) continha leis específicas que regulamentavam a prática cirúrgica, fixando honorários e punições severas (como amputação das mãos do cirurgião em caso de insucesso em nobres).\n• d) Incorreta: Tanto o tamponamento com tecidos quanto a cauterização por calor já eram amplamente praticados na Antiguidade.\n\nRevisar: 01 — História da cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "No efeito de corte, a relação entre eletrodo e tecido caracteriza-se por:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Compressão mecânica do tecido entre dois polos.",
            "B) Contato direto e permanente, sem faiscamento.",
            "C) Separação por uma fina camada de vapor, com faiscamento.",
            "D) Distância de vários centímetros, com arco visível."
        ],
        "gabarito": "Alternativa C — Separação por uma fina camada de vapor, com faiscamento.\n\nO vapor gerado pela vaporização celular mantém o eletrodo ligeiramente afastado, e é através dessa camada que a energia continua sendo transmitida.\n\n• a) Incorreta: Compressão entre dois polos descreve o selador vascular bipolar.\n• b) Incorreta: Contato sem faísca descreve a dessecação.\n• d) Incorreta: Arco a vários centímetros descreve a fulguração.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A função da agulha cirúrgica é:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Transfixar os tecidos e conduzir o fio pelo espaço criado.",
            "B) Cortar o tecido para facilitar a passagem do fio.",
            "C) Substituir o porta-agulhas em suturas superficiais.",
            "D) Aproximar as bordas da ferida por pressão."
        ],
        "gabarito": "Alternativa A — Transfixar os tecidos e conduzir o fio pelo espaço criado.\n\nA agulha abre o trajeto e leva o fio consigo; o formato da ponta define quanto de lesão ela produz nessa passagem.\n\n• b) Incorreta: Cortar é efeito colateral da agulha triangular, não a sua função.\n• c) Incorreta: O porta-agulhas conduz a agulha; são instrumentos complementares.\n• d) Incorreta: A aproximação é feita pelo fio, ao ser atado.\n\nRevisar: 06 — Fios e agulhas cirúrgicas"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Os objetivos imediatos da resposta orgânica ao trauma são:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Suprimir a resposta inflamatória para evitar dano tecidual.",
            "B) Promover ganho de massa magra e reserva energética.",
            "C) Manter a perfusão de órgãos vitais, a disponibilidade de glicose e o volume circulante.",
            "D) Reduzir a temperatura corporal para poupar energia."
        ],
        "gabarito": "Alternativa C — Manter a perfusão de órgãos vitais, a disponibilidade de glicose e o volume circulante.\n\nO organismo prioriza cérebro e coração em detrimento de processos anabólicos — é uma resposta de sobrevivência de curto prazo.\n\n• a) Incorreta: A resposta inflamatória é parte integrante do processo.\n• b) Incorreta: O estado é catabólico, não anabólico.\n• d) Incorreta: Não é um objetivo da resposta.\n\nRevisar: 10 — Resposta endocrinometabólica ao trauma"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A cistostomia (punção suprapúbica) está indicada especialmente quando há:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Necessidade de coleta de urina para exame simples.",
            "B) Bexiga neurogênica com resíduo pós-miccional mínimo.",
            "C) Infecção urinária de repetição.",
            "D) Estenose de uretra ou tumor prostático que impedem a passagem uretral."
        ],
        "gabarito": "Alternativa D — Estenose de uretra ou tumor prostático que impedem a passagem uretral.\n\nQuando o trajeto uretral está obstruído, a via cruenta suprapúbica é a alternativa para esvaziar a bexiga.\n\n• a) Incorreta: Coleta simples se faz por cateterismo de alívio.\n• b) Incorreta: Resíduo mínimo não indica derivação cirúrgica.\n• c) Incorreta: Não é indicação de acesso cirúrgico.\n\nRevisar: 08 — Sondas e cateteres"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "Sobre o selador vascular bipolar, é incorreto afirmar:",
        "interactionType": "multiple-choice",
        "options": [
            "A) Desnatura colágeno e elastina, fundindo a parede do vaso.",
            "B) Analisa a impedância do tecido durante a aplicação.",
            "C) Entrega energia na faixa de 50 a 100 ºC.",
            "D) Sela vasos de qualquer calibre, sem limite definido pelo fabricante."
        ],
        "gabarito": "Alternativa D — Sela vasos de qualquer calibre, sem limite definido pelo fabricante.\n\nCada dispositivo tem um calibre máximo validado pelo fabricante; ultrapassá-lo compromete a selagem e pode resultar em sangramento.\n\n• a) Afirmação correta.\n• b) Afirmação correta.\n• c) Afirmação correta.\n\nRevisar: 09 — Energia em cirurgia"
    },
    {
        "type": "MÚLTIPLA ESCOLHA",
        "text": "A extremidade interna simples ou bifurcada é característica descrita para o dreno:",
        "interactionType": "multiple-choice",
        "options": [
            "A) De Blake.",
            "B) De Penrose.",
            "C) De tórax.",
            "D) Pigtail."
        ],
        "gabarito": "Alternativa B — De Penrose.\n\nO Penrose pode ter a extremidade interna simples ou bifurcada, o que amplia a superfície de captação por capilaridade.\n\n• a) Incorreta: Tem valas longitudinais que se afunilam em um tubo.\n• c) Incorreta: Tem extremidade fenestrada e linha radiopaca.\n• d) Incorreta: Tem extremidade fenestrada e enrolada.\n\nRevisar: 07 — Drenos"
    }
];

export const basesCirurgicas = [
    ...bc57Questions,
    ...basesCirurgicasBase,
    ...bc360Part1,
    ...bc360Part2,
    ...bc360Part3,
    ...bc360Part4,
    ...bc360Part5,
    ...bc360Part6
];
