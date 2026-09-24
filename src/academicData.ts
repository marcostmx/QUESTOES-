import { AcademicDiscipline, SubjectId } from './types';

export const INITIAL_ACADEMIC_DISCIPLINES: AcademicDiscipline[] = [
  {
    id: 'fisiopatologia',
    name: 'Fisiopatologia',
    shortName: 'Fisiopato',
    color: 'emerald',
    iconSvg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`,
    description: 'Mecanismos de doença, alterações funcionais orgânicas, fisiopatologia respiratória, cardiovascular, renal e endócrina.',
    modules: [
      {
        id: 'fisio-m1',
        disciplineId: 'fisiopatologia',
        title: 'Módulo 1: Fisiopatologia Cardiovascular e Hemodinâmica',
        description: 'Insuficiência cardíaca, choque circulatório, hipertensão arterial sistêmica e aterogênese.',
        lessons: [
          {
            id: 'fisio-m1-a1',
            disciplineId: 'fisiopatologia',
            moduleId: 'fisio-m1',
            title: 'Aula 01: Insuficiência Cardíaca Congestiva (ICFEr vs ICFEp)',
            objectives: [
              'Diferenciar os mecanismos da disfunção sistólica versus diastólica ventricular.',
              'Compreender o papel do remodelamento cardíaco e ativação do sistema neuro-humoral (SRAA e SNS).',
              'Identificar os achados hemodinâmicos de congestão pulmonar e baixo débito.'
            ],
            materials: [],
            keyConcepts: [
              'Lei de Frank-Starling e curva de função ventricular',
              'Remodelamento ventricular e sobrecarga de pressão vs volume',
              'Mecanismos compensatórios neuro-humorais a longo prazo (efeito deletério)'
            ],
            highYieldExamPoints: [
              {
                point: 'Papel do peptídeo natriurético tipo B (BNP) no diagnóstico diferencial de dispneia aguda.',
                sourceExams: ['PR1 Fisiopatologia - 2024.1']
              }
            ],
            relatedQuestionIndices: [3, 13, 28, 32, 36]
          },
          {
            id: 'fisio-m1-a2',
            disciplineId: 'fisiopatologia',
            moduleId: 'fisio-m1',
            title: 'Aula 02: Choque Circulatório e Perfusão Tecidual',
            objectives: [
              'Classificar os tipos de choque (cardiogênico, hipovolêmico, distributivo e obstrutivo).',
              'Correlacionar Débito Cardíaco (DC), Resistência Vascular Sistêmica (RVS) e Pressão Venosa Central (PVC).',
              'Avaliar marcadores de hipoperfusão celular e acidose lática.'
            ],
            materials: [],
            keyConcepts: [
              'Equação da Oferta de Oxigênio (DO2) e Consumo de Oxigênio (VO2)',
              'Disfunção endotelial no choque séptico',
              'Microcirculação e índice de extração tecidual de O2'
            ],
            highYieldExamPoints: [
              {
                point: 'Diferenciação hemodinâmica clássica do choque séptico (hiperdinâmico: RVS baixa e DC alto) dos demais tipos.',
                sourceExams: ['PR1 Fisiopatologia - 2023.2', 'Lista de Casos Clínicos']
              }
            ],
            relatedQuestionIndices: [20, 43, 54, 56, 59]
          }
        ]
      },
      {
        id: 'fisio-m2',
        disciplineId: 'fisiopatologia',
        title: 'Módulo 2: Fisiopatologia Endócrina e Metabólica',
        description: 'Distúrbios glicêmicos, diabetes mellitus, síndrome metabólica e tireoidopatias.',
        lessons: [
          {
            id: 'fisio-m2-a1',
            disciplineId: 'fisiopatologia',
            moduleId: 'fisio-m2',
            title: 'Aula 03: Diabetes Mellitus (Resistência Insulínica vs Deficiência Absoluta)',
            objectives: [
              'Diferenciar a fisiopatologia autoimune do DM1 da resistência insulínica progressiva no DM2.',
              'Mapear a cascata de cetoacidose diabética (CAD) e estado hiperglicêmico hiperosmolar (EHH).',
              'Compreender os mecanismos de micro e macroangiopatia diabética.'
            ],
            materials: [],
            keyConcepts: [
              'Lipólise acelerada, cetogênese hepática e anion gap aumentado na CAD',
              'Insulino-resistência no tecido adiposo e muscular',
              'Glucotoxicidade e disfunção progressiva das células beta pancreáticas'
            ],
            highYieldExamPoints: [
              {
                point: 'Por que o paciente com DM2 geralmente não desenvolve CAD típica mesmo em hiperglicemias extremas (reserva residual de insulina bloqueia lipólise maciça).',
                sourceExams: ['PR1 Fisiopatologia - 2024.1']
              }
            ],
            relatedQuestionIndices: [8, 11, 21, 25, 30]
          }
        ]
      },
      {
        id: 'fisio-m-provas',
        disciplineId: 'fisiopatologia',
        title: 'Módulo Exclusivo: Compilado Provas Anteriores PR1/PR2 (SOP IV)',
        description: 'Questões autênticas transcritas fielmente do compilado oficial de provas anteriores, com gráficos de ECG de 12 derivações, análises fisiopatológicas e notas de banca examinadora.',
        lessons: [
          {
            id: 'fisio-m-provas-a1',
            disciplineId: 'fisiopatologia',
            moduleId: 'fisio-m-provas',
            title: 'Caderno de Provas PR1/PR2: Cardio, Respiratório, Neuro e Endócrino',
            objectives: [
              'Interpretar traçado de ECG de 12 derivações com IAMCSST de parede anterior e diferenciar de IAMSSST e angina.',
              'Correlacionar a fisiopatologia da atelectasia por reabsorção vs compressão vs cicatricial.',
              'Reconhecer mecanismos de crise asmática quase fatal, DPOC, IC congestiva biventricular e Fibrilação Atrial.',
              'Compreender os mecanismos de dor neuropática diabética, hematoma epidural no TCE e eixos adrenal/tireoidiano.'
            ],
            materials: [],
            keyConcepts: [
              'Supradesnivelamento do segmento ST em V1-V4 por oclusão de artéria descendente anterior',
              'Intervalo lúcido no hematoma epidural por laceração da artéria meníngea média',
              'Ausência de feedback negativo de cortisol elevando ACTH na Doença de Addison',
              'Alodinia e sensibilização central na neuropatia periférica do diabetes'
            ],
            highYieldExamPoints: [
              {
                point: 'Questões diretas do compilado oficial de PR1/PR2 de Medicina Estácio/IDOMED Juazeiro.',
                sourceExams: ['Compilado Provas Anteriores - PR1/PR2 SOP IV']
              }
            ],
            relatedQuestionIndices: [250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260]
          }
        ]
      }
    ]
  },
  {
    id: 'farmacologia',
    name: 'Farmacologia',
    shortName: 'Farmaco',
    color: 'indigo',
    iconSvg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>`,
    description: 'Farmacocinética, farmacodinâmica, sistema nervoso autônomo, antimicrobianos e fármacos cardiovasculares.',
    modules: [
      {
        id: 'farm-m1',
        disciplineId: 'farmacologia',
        title: 'Módulo 1: Farmacologia Autonômica',
        description: 'Agonistas e antagonistas adrenérgicos e colinérgicos.',
        lessons: [
          {
            id: 'farm-m1-a1',
            disciplineId: 'farmacologia',
            moduleId: 'farm-m1',
            title: 'Aula 01: Transmissão Colinérgica e Fármacos Parassimpatomiméticos',
            objectives: [
              'Reconhecer subtipos de receptores muscarínicos (M1-M5) e nicotínicos (Nm, Nn).',
              'Compreender inibidores da acetilcolinesterase reversíveis e irreversíveis (organofosforados).',
              'Identificar o antídoto e manejo da crise colinérgica (atropina + pralidoxima).'
            ],
            materials: [],
            keyConcepts: [
              'Síndrome colinérgica: miose, broncorreia, bradicardia, salivação excessiva',
              'Mecanismo de ação da atropina como antagonista competitivo muscarínico',
              'Reativação enzimática da AChE por oximas'
            ],
            highYieldExamPoints: [
              {
                point: 'Indicação clínica de atropina no bloqueio atrioventricular e intoxicação por defensivos agrícolas organofosforados.',
                sourceExams: ['PR1 Farmacologia Geral - 2024.1']
              }
            ],
            relatedQuestionIndices: [0, 1, 2, 3, 4]
          },
          {
            id: 'farm-m1-a2',
            disciplineId: 'farmacologia',
            moduleId: 'farm-m1',
            title: 'Aula 02: Transmissão Adrenérgica e Betabloqueadores',
            objectives: [
              'Classificar betabloqueadores em não cardiosseletivos, beta-1 seletivos e com ação vasodilatadora (alfa-1).',
              'Mapear efeitos adversos em pacientes asmáticos e diabéticos.',
              'Indicações na insuficiência cardíaca e hipertensão arterial.'
            ],
            materials: [],
            keyConcepts: [
              'Seletividade beta-1 (atenolol, metoprolol) vs não seletivos (propranolol)',
              'Atividade simpatomimética intrínseca (ASI)',
              'Carvedilol e nebivolol: mecanismos vasodilatadores adicionais'
            ],
            highYieldExamPoints: [
              {
                point: 'Contraindicação relativa de betabloqueador não seletivo em asmático e risco de mascaramento de sintomas de hipoglicemia.',
                sourceExams: ['PR1 Farmacologia Geral - 2023.2']
              }
            ],
            relatedQuestionIndices: [5, 6, 7, 8, 9]
          }
        ]
      }
    ]
  },
  {
    id: 'propedêutica',
    name: 'Propedêutica',
    shortName: 'Propedêutica',
    color: 'sky',
    iconSvg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`,
    description: 'Anamnese estruturada, exame físico geral, semiologia cardiovascular, respiratória, abdominal e neurológica.',
    modules: [
      {
        id: 'prop-m1',
        disciplineId: 'propedêutica',
        title: 'Módulo 1: Semiologia Cardiovascular e Ausculta Cardíaca',
        description: 'Bulhas cardíacas, sopros, manobras especiais e pulsos arteriais.',
        lessons: [
          {
            id: 'prop-m1-a1',
            disciplineId: 'propedêutica',
            moduleId: 'prop-m1',
            title: 'Aula 01: Bulhas Cardíacas, B3, B4 e Desdobramentos',
            objectives: [
              'Identificar o mecanismo formador de B1 (fechamento AV) e B2 (fechamento semilunares).',
              'Diferenciar desdobramento fisiológico de B2 de desdobramento fixo e paradoxal.',
              'Correlacionar B3 (sobrecarga de volume) e B4 (sobrecarga de pressão/perda de complacência).'
            ],
            materials: [],
            keyConcepts: [
              'Focos clássicos de ausculta: aórtico, pulmonar, tricúspide e mitral',
              'B3 patológica como marcador precoce de insuficiência ventricular esquerda',
              'Manobra de Rivero-Carvallo nos sopros à direita'
            ],
            highYieldExamPoints: [
              {
                point: 'Desdobramento fixo de B2 como sinal patognomônico de Comunicação Interatrial (CIA).',
                sourceExams: ['PR1 Propedêutica Médica - 2024.1']
              }
            ],
            relatedQuestionIndices: [5, 10, 22, 24, 34]
          }
        ]
      },
      {
        id: 'prop-m-provas',
        disciplineId: 'propedêutica',
        title: 'Módulo Exclusivo: Compilado Provas Anteriores PR1/PR2 (SOP IV)',
        description: 'Questões autênticas transcritas na íntegra do compilado de provas oficiais, incluindo casos clínicos de AVC, afasias, ELA, Parkinsonismo, tabela ABCDE de melanoma, sopros e frêmitos respiratórios.',
        lessons: [
          {
            id: 'prop-m-provas-a1',
            disciplineId: 'propedêutica',
            moduleId: 'prop-m-provas',
            title: 'Caderno de Provas PR1/PR2: Exame Físico Geral, Respiratório, Cardio, Neuro e Dermato',
            objectives: [
              'Dominar padrões respiratórios (Cheyne-Stokes, Biot, Kussmaul) e pulsos periféricos (martelo d\'água).',
              'Diferenciar afasia de Wernicke e Broca, manobras de Mingazzini e Barré e localização motora.',
              'Correlacionar a tríade da consolidação (FTV ↑, macicez, sopro tubário e broncofonia aumentada).',
              'Classificar lesões pigmentadas pela regra semiológica ABCDE do melanoma com a tabela comparativa.',
              'Avaliar o II par craniano (nervo óptico), utilidade do diapasão e diagnóstico diferencial de parkinsonismos e ELA.'
            ],
            materials: [],
            keyConcepts: [
              'Afasia sensorial de Wernicke com fala fluente e parafasias por lesão no giro temporal superior esquerdo',
              'Regra ABCDE: Assimetria, Bordas irregulares, Cor variegada, Diâmetro > 6mm e Evolução dinâmica',
              'Sinal de Romberg positivo e perda da sensibilidade vibratória indicando ataxia sensitiva',
              'Diferenciação semiológica de Paralisia Supranuclear Progressiva (quedas precoces + paralisia do olhar vertical) de Doença de Parkinson'
            ],
            highYieldExamPoints: [
              {
                point: 'Questões de múltipla escolha e discursivas fiéis ao caderno de provas de Propedêutica da Medicina Estácio/IDOMED.',
                sourceExams: ['Compilado Provas Anteriores - PR1/PR2 SOP IV']
              }
            ],
            relatedQuestionIndices: [95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118]
          }
        ]
      }
    ]
  },
  {
    id: 'bases cirúrgicas',
    name: 'Bases Cirúrgicas',
    shortName: 'Bases Cir.',
    color: 'rose',
    iconSvg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a3 3 0 11-4.242-4.242L10.758 10.758m1.363 1.363l2-2"></path></svg>`,
    description: 'Diérese, hemostasia, síntese cirúrgica, fios de sutura, paramentação, antissepsia e cicatrização de feridas.',
    modules: [
      {
        id: 'bc-m1',
        disciplineId: 'bases cirúrgicas',
        title: 'Módulo 1: Instrumentação, Diérese e Hemostasia',
        description: 'Tempos cirúrgicos fundamentais, empunhadura e classificação do instrumental.',
        lessons: [
          {
            id: 'bc-m1-a1',
            disciplineId: 'bases cirúrgicas',
            moduleId: 'bc-m1',
            title: 'Aula 01: Tempos Cirúrgicos e Instrumental Básico',
            objectives: [
              'Dominar os 4 tempos cirúrgicos clássicos: Diérese, Hemostasia, Exérese e Síntese.',
              'Diferenciar pinças de hemostasia (Halsted, Kelly, Rochester) curvas e retas.',
              'Identificar empunhaduras de bisturi (arco de violino vs caneta).'
            ],
            materials: [],
            keyConcepts: [
              'Ranhuras transversais completas (Rochester) vs parciais (Kelly)',
              'Bisturi cabo 3 (lâminas 10-15) e cabo 4 (lâminas 20-24)',
              'Hemostasia preventiva vs curativa'
            ],
            highYieldExamPoints: [
              {
                point: 'Diferença estrutural entre Kelly (ranhuras em metade da mandíbula) e Rochester (toda a extensão).',
                sourceExams: ['PR1 Bases Cirúrgicas - 2024.1']
              }
            ],
            relatedQuestionIndices: [0, 1, 2, 3, 4]
          },
          {
            id: 'bc-m1-a2',
            disciplineId: 'bases cirúrgicas',
            moduleId: 'bc-m1',
            title: 'Aula 02: Fios Cirúrgicos e Agulhas',
            objectives: [
              'Classificar os fios em absorvíveis (Catgut, Vicryl, PDS) e inabsorvíveis (Nylon, Seda, Prolene).',
              'Distinguir fios monofilamentares de multifilamentares e seu risco de infecção/capilaridade.',
              'Escolher o fio ideal para cada plano tecidual anatômico.'
            ],
            materials: [],
            keyConcepts: [
              'Monofilamentar: menor atrito e sem capilaridade, porém maior memória plástica',
              'Vicryl (Poliglactina 910): absorção por hidrólise',
              'Nylon: padrão ouro para síntese de pele em cirurgia ambulatorial'
            ],
            highYieldExamPoints: [
              {
                point: 'Por que fios multifilamentares são contraindicados em tecidos contaminados ou infectados (abrigam bactérias no trançado).',
                sourceExams: ['PR1 Bases Cirúrgicas - 2023.2']
              }
            ],
            relatedQuestionIndices: [5, 6, 7, 8, 9]
          }
        ]
      }
    ]
  },
  {
    id: 'iesc_iv',
    name: 'IESC IV',
    shortName: 'IESC IV',
    color: 'indigo',
    iconSvg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`,
    description: 'Atenção Primária, Atributos de Starfield, Previne Brasil, Método Clínico Centrado na Pessoa (MCCP), SOAP e CIAP-2.',
    modules: [
      {
        id: 'iesc-m1',
        disciplineId: 'iesc_iv',
        title: 'Bloco A: Atributos de Starfield e o Médico na ESF',
        description: 'Atributos essenciais (primeiro contato, longitudinalidade, integralidade, coordenação) e derivados (orientação familiar, comunitária e competência cultural), prevenção quaternária.',
        lessons: [
          {
            id: 'iesc-m1-a1',
            disciplineId: 'iesc_iv',
            moduleId: 'iesc-m1',
            title: 'Aula 01: Atributos Essenciais e Derivados de Barbara Starfield',
            objectives: [
              'Diferenciar a órbita interna (4 atributos essenciais) da órbita externa (3 atributos derivados).',
              'Distinguir longitudinalidade relacional de mera continuidade de prontuário eletrônico.',
              'Compreender o primeiro contato como filtro organizador e coordenação como roteador de cuidado.'
            ],
            materials: [],
            keyConcepts: [
              '4 Atributos Essenciais: Primeiro Contato, Longitudinalidade, Integralidade e Coordenação',
              '3 Atributos Derivados: Orientação Familiar, Orientação Comunitária e Competência Cultural',
              'Competência Cultural como ponte de adesão entre prescrição técnica e vida real'
            ],
            highYieldExamPoints: [
              {
                point: 'Diferença entre longitudinalidade (relação humana temporal e vínculo) e prontuário contínuo.',
                sourceExams: ['Guia de Estudos IESC IV - Estácio IDOMED']
              }
            ],
            relatedQuestionIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
          },
          {
            id: 'iesc-m1-a2',
            disciplineId: 'iesc_iv',
            moduleId: 'iesc-m1',
            title: 'Aula 02: O Médico na ESF e Prevenção Quaternária',
            objectives: [
              'Definir prevenção quaternária e proteção do paciente contra medicalização e iatrogenias.',
              'Identificar o impacto da APS na redução de hospitalizações por condições sensíveis (até 45%).'
            ],
            materials: [],
            keyConcepts: [
              'Prevenção Quaternária: evitar o sobrediagnóstico e a sobremedicalização',
              'Hospitalizações por Condições Sensíveis à Atenção Primária (redução de até 45%)'
            ],
            highYieldExamPoints: [
              {
                point: 'Prevenção quaternária foca em proteger o paciente de intervenções desnecessárias.',
                sourceExams: ['Guia de Estudos IESC IV - Estácio IDOMED']
              }
            ],
            relatedQuestionIndices: [10, 11]
          }
        ]
      },
      {
        id: 'iesc-m2',
        disciplineId: 'iesc_iv',
        title: 'Bloco B: Componentes de Qualidade (Previne Brasil)',
        description: 'Régua de classificação, boas práticas e prazos dos componentes C1 a C7 no e-SUS APS.',
        lessons: [
          {
            id: 'iesc-m2-a1',
            disciplineId: 'iesc_iv',
            moduleId: 'iesc-m2',
            title: 'Aula 03: Indicadores C1 a C7, Prazos e Boas Práticas',
            objectives: [
              'Dominar a régua universal de quatro faixas: Regular (<25%), Suficiente (25-50%), Bom (50-75%) e Ótimo (75-100%).',
              'Fixar prazos críticos: 1ª consulta RN até 30d (C2), 9 consultas até 2 anos (C2), 1ª consulta pré-natal até 12 sem (C3), dTpa a partir da 20ª sem (C3).',
              'Mapear exames específicos: Hemoglobina glicada (C4), vacina influenza em idosos (C6) e HPV em meninas de 9 a 14 anos (C7).'
            ],
            materials: [],
            keyConcepts: [
              'Régua percentual idêntica para todos os 7 componentes',
              'C2: 9 consultas e 9 registros antropométricos até 2 anos',
              'C3: Primeira consulta até 12 semanas e dTpa a partir da 20ª semana',
              'C4 & C5: Janela de 6 meses para consulta e PA; 12 meses para HbA1c e visitas'
            ],
            highYieldExamPoints: [
              {
                point: 'Classificação "Bom" corresponde sempre à faixa de 50% a 75%.',
                sourceExams: ['Guia de Estudos IESC IV - Estácio IDOMED']
              }
            ],
            relatedQuestionIndices: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
          }
        ]
      },
      {
        id: 'iesc-m3',
        disciplineId: 'iesc_iv',
        title: 'Bloco C: MCCP e a Consulta em 7 Passos',
        description: 'Método Clínico Centrado na Pessoa, ferramenta SIFE e os sete passos estruturados da consulta médica.',
        lessons: [
          {
            id: 'iesc-m3-a1',
            disciplineId: 'iesc_iv',
            moduleId: 'iesc-m3',
            title: 'Aula 04: MCCP, SIFE e as 7 Etapas da Consulta',
            objectives: [
              'Conhecer os 4 componentes do MCCP e os 7 passos da consulta.',
              'Aplicar a ferramenta SIFE (Sentimentos, Ideias, Funcionalidade, Expectativas) na exploração clínica.',
              'Transitar do modelo prescritivo para a tomada de decisão compartilhada.'
            ],
            materials: [],
            keyConcepts: [
              '4 Componentes do MCCP: Experiência da doença, Pessoa como um todo, Plano conjunto e Relação médico-pessoa',
              'SIFE: Sentimentos, Ideias, Funcionalidade ("o que mudou na rotina?"), Expectativas',
              '7 Passos: Preparação, Primeiros minutos, Exploração, Avaliação, Plano, Encerramento, Reflexão final',
              'Estrutura sem escuta vira checklist; escuta sem estrutura perde segurança clínica'
            ],
            highYieldExamPoints: [
              {
                point: 'O MCCP entra em todos os 7 passos da consulta, não apenas na etapa de exploração.',
                sourceExams: ['Guia de Estudos IESC IV - Estácio IDOMED']
              }
            ],
            relatedQuestionIndices: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33]
          }
        ]
      },
      {
        id: 'iesc-m4',
        disciplineId: 'iesc_iv',
        title: 'Bloco D: SOAP e CIAP-2',
        description: 'Prontuário Orientado por Problemas (POMR de Weed), seções do SOAP e codificação pela CIAP-2.',
        lessons: [
          {
            id: 'iesc-m4-a1',
            disciplineId: 'iesc_iv',
            moduleId: 'iesc-m4',
            title: 'Aula 05: Estrutura SOAP e Classificação CIAP-2',
            objectives: [
              'Identificar a estrutura do SOAP: Subjetivo, Objetivo, Avaliação e Plano.',
              'Diferenciar CIAP-2 (foco no episódio de cuidado na APS) da CID-10 (foco na doença).',
              'Compreender a codificação alfanumérica: Letra (capítulo/sistema) + Número (componente).'
            ],
            materials: [],
            keyConcepts: [
              'Lawrence Weed e o Prontuário Orientado por Problemas (POMR)',
              'Subjetivo traz a fala e vivência do paciente; Avaliação traz o raciocínio diagnóstico e CIAP-2',
              'CIAP-2: R05 = Respiratório (R) + Tosse (05 no Componente 1)',
              'Componente 7 da CIAP-2: Diagnósticos e Doenças'
            ],
            highYieldExamPoints: [
              {
                point: 'A codificação CIAP-2 entra na seção de Avaliação (A), nunca no Subjetivo (S).',
                sourceExams: ['Guia de Estudos IESC IV - Estácio IDOMED']
              }
            ],
            relatedQuestionIndices: [34, 35, 36, 37, 38, 39, 40, 41]
          }
        ]
      },
      {
        id: 'iesc-m5',
        disciplineId: 'iesc_iv',
        title: 'Bloco E: Casos Aplicados e Integração da Disciplina',
        description: 'Análise aprofundada dos casos Marcos, Dona Célia, Lucas e Ana Paula, e síntese transversal.',
        lessons: [
          {
            id: 'iesc-m5-a1',
            disciplineId: 'iesc_iv',
            moduleId: 'iesc-m5',
            title: 'Aula 06: Discussão de Casos e Síntese Transversal',
            objectives: [
              'Identificar a demanda explícita versus a necessidade real por trás da consulta em casos práticos.',
              'Reconhecer que a doença não chega sozinha ao consultório e integrar clínica, método e sistema.'
            ],
            materials: [],
            keyConcepts: [
              'Caso Marcos: medo da morte súbita após infarto de colega da mesma idade',
              'Caso Dona Célia: medo de dano renal por remédios e sobrecarga de cuidadora',
              'Caso Lucas: dor lombar com contexto ocupacional e sinais de alarme',
              'Caso Ana Paula: insônia, ambivalência emocional e respeito aos limites da paciente'
            ],
            highYieldExamPoints: [
              {
                point: 'A longitudinalidade une Starfield, Previne Brasil (janelas de consulta), MCCP (vínculo) e SOAP (evoluções).',
                sourceExams: ['Guia de Estudos IESC IV - Estácio IDOMED']
              }
            ],
            relatedQuestionIndices: [42, 43, 44, 45, 46, 47, 48, 49]
          }
        ]
      }
    ]
  }
];

const DISCIPLINES_KEY = 'pr1_academic_disciplines_v1';

export function getAcademicDisciplines(): AcademicDiscipline[] {
  try {
    const raw = localStorage.getItem(DISCIPLINES_KEY);
    if (raw) {
      const parsed: AcademicDiscipline[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure all default disciplines from INITIAL_ACADEMIC_DISCIPLINES are present
        const existingIds = new Set(parsed.map(d => d.id));
        let changed = false;
        for (const defaultDisc of INITIAL_ACADEMIC_DISCIPLINES) {
          if (!existingIds.has(defaultDisc.id)) {
            parsed.push(defaultDisc);
            changed = true;
          }
        }
        if (changed) {
          saveAcademicDisciplines(parsed);
        }
        return parsed;
      }
    }
  } catch {}
  return INITIAL_ACADEMIC_DISCIPLINES;
}

export function saveAcademicDisciplines(list: AcademicDiscipline[]) {
  try {
    localStorage.setItem(DISCIPLINES_KEY, JSON.stringify(list));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('pr1-disciplines-updated', { detail: { count: list.length } }));
    }
  } catch (e) {
    console.error('Erro ao salvar disciplinas acadêmicas:', e);
  }
}
