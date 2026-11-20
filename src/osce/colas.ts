/* Revisão rápida por sistema, mostrada após a correção (base: Material de estudo OSCE v2). */
import type { Sistema } from './maneuvers';

export interface Cola { titulo: string; tabela?: string[][]; pontos: string[] }

export const REGRAS_GERAIS = {
  abertura: 'HIAE-CPD: Higiene • Identificar • Apresentar-se • Explicar • Consentimento • Privacidade/posição • Dor (perguntar) — e no fim, agradecer.',
  avaliador: 'O avaliador só informa o achado se a manobra foi feita corretamente; se errada, diz “sem achados” ou pede para repetir uma vez. Não dá pistas.',
  ouro: 'Um sinal isolado orienta o raciocínio — não substitui a integração clínica. Quase todo gabarito pede a limitação do achado: diga em voz alta.',
  responder: 'Responda de forma direta: hipótese → achados que a sustentam → mecanismo. Diga sempre o lado e o nível quando couber.',
  tempo: '1 minuto de leitura + 5 de execução; o caso pode ser consultado durante a estação. Responda apenas ao que foi pedido.',
};

export const COLAS: Partial<Record<Sistema, Cola>> = {
  cardiovascular: {
    titulo: 'as 8 valvopatias',
    tabela: [
      ['Lesão', 'Ciclo', 'Foco', 'Irradiação', 'Caráter'],
      ['EA', 'Sistólico', 'Aórtico', 'Pescoço/carótidas', 'Ejetivo'],
      ['IA', 'Diastólico', 'Aórtico/Erb', 'Borda esternal E → ápice', 'Regurgitativo/aspirativo'],
      ['EM', 'Diastólico', 'Mitral', 'Pouca/ápice', 'Ruflar'],
      ['IM', 'Sistólico', 'Mitral', 'Axila E', 'Regurgitativo'],
      ['ET', 'Diastólico', 'Tricúspide', 'Pouca', 'Ruflar'],
      ['IT', 'Sistólico', 'Tricúspide', 'Paraesternal D/epigástrio', 'Regurgitativo'],
      ['EP', 'Sistólico', 'Pulmonar', 'Infraclavicular E', 'Ejetivo'],
      ['IP', 'Diastólico', 'Pulmonar', 'Borda esternal E', 'Regurgitativo/aspirativo'],
    ],
    pontos: [
      'Regra mental: estenose semilunar = sistólico de ejeção; insuficiência AV = sistólico regurgitativo; estenose AV = diastólico (ruflar); insuficiência semilunar = diastólico regurgitativo.',
      'Mnemônico “SEMI-SIS / AV-DIAS”: válvula semilunar estreita → sistólico; válvula AV estreita → diastólico.',
      'Irradiação para a axila diferencia o sopro mitral do aórtico ejetivo.',
      'ET × IT: ambos aumentam na inspiração (Rivero-Carvallo); ET é ruflar diastólico, IT é holossistólico. Onda A proeminente não é esperada na FA.',
    ],
  },
  respiratorio: {
    titulo: 'os quatro pilares das síndromes',
    tabela: [
      ['Síndrome', 'Expansibilidade', 'FTV', 'Percussão', 'Ausculta'],
      ['Asma/obstrução', 'Pode diminuir', 'Normal ou ↓', 'Normal ou hiper', 'Sibilos; expiração prolongada'],
      ['Enfisema', '↓', '↓', 'Hipersonoridade', 'MV ↓; expiração prolongada'],
      ['Consolidação', '↓', '↑', 'Submacicez/macicez', 'Respiração brônquica; voz ↑; estertores finos'],
      ['Atelectasia', '↓', '↓/abolido', 'Submacicez/macicez', 'Som broncovesicular; voz ↓'],
      ['Derrame pleural', '↓', 'Abolido na área', 'Macicez', 'MV abolido; egofonia acima'],
      ['Pneumotórax', '↓', '↓', 'Hiper/timpânico', 'MV ↓; voz ↓'],
    ],
    pontos: [
      'Mnemônico “EXPANDE? VIBRA? SOA? OUVE?”: o tórax expande? o FTV aumentou ou diminuiu? a percussão ficou maciça ou hiperressonante? o que aconteceu com o MV e a voz?',
      'Só uma síndrome tem FTV aumentado: a consolidação.',
      'Compare sempre os dois lados; a intensidade dos achados depende do tamanho da lesão e do estágio.',
    ],
  },
  abdome: {
    titulo: 'sequência e sinais do abdome',
    pontos: [
      'Ordem: inspeção → ausculta → percussão → palpação (ausculta antes de tocar). Examinador à direita; área dolorosa por último.',
      'RHA: descreva como presentes, aumentados, diminuídos ou ausentes; só chame de ausentes após até 5 minutos de ausculta.',
      'Smith-Bates: some com a contração → intra-abdominal; persiste ou fica mais evidente → parede.',
      'Murphy positivo = parada inspiratória por dor no ponto cístico; não confirma colecistite sozinho.',
      'Ascite: piparote para grande volume; macicez móvel e semicírculo de Skoda (concavidade para cima) para volumes menores.',
      'Apendicite: McBurney, Blumberg, Rovsing, psoas (retrocecal) e obturador (pélvico) — nenhum isolado fecha o diagnóstico.',
    ],
  },
  'abdome-agudo': {
    titulo: 'abdome agudo perfurativo',
    pontos: [
      'Peritonite: dor parietal contínua que piora com o movimento → paciente imóvel; cólica visceral → paciente inquieto.',
      'Abdome em tábua = contração involuntária reflexa; Blumberg = descompressão brusca dolorosa.',
      'Jobert: timpanismo no lugar da macicez hepática (pneumoperitônio). RHA abolidos = íleo paralítico.',
      'Ausência de ar livre na radiografia não exclui perfuração.',
    ],
  },
  neurologico: {
    titulo: '1º × 2º neurônio e as vias medulares',
    tabela: [
      ['Característica', '1º neurônio (superior)', '2º neurônio (inferior)'],
      ['Tônus', 'Espasticidade', 'Hipotonia'],
      ['Reflexos profundos', 'Hiper-reflexia, clônus', 'Arreflexia'],
      ['Babinski', 'Presente', 'Ausente'],
      ['Fasciculações', 'Ausentes', 'Presentes'],
      ['Atrofia', 'Moderada e tardia', 'Precoce e intensa'],
    ],
    pontos: [
      'Mnemônico “o de cima é hiper; o de baixo é hipo”. Na fase aguda (choque) a lesão piramidal pode ser flácida e hiporreflexa — o Babinski já prova.',
      '“Só a dor atravessa a rua cedo”: o espinotalâmico cruza na medula (déficit contralateral); motor e cordão posterior cruzam no bulbo (déficit ipsilateral).',
      'Lesão medular: sinais de 1º neurônio abaixo do nível e de 2º neurônio no nível.',
      'Descreva qualquer alteração como etapa → achado → lado → grau.',
    ],
  },
  urinario: {
    titulo: 'sistema urinário',
    pontos: [
      'Hipotensão ortostática: queda ≥ 20 mmHg na sistólica ou ≥ 10 na diastólica ao ficar em pé.',
      'Giordano negativo afasta pielonefrite/hidronefrose aguda dolorosa; sem globo vesical afasta causa pós-renal baixa.',
      'AINE fecha a arteríola aferente; IECA abre a eferente → queda da pressão glomerular (“duas torneiras”).',
      'Uremia grave: atrito pericárdico e asterixis indicam diálise de urgência; Kussmaul = acidose metabólica.',
    ],
  },
  pele: {
    titulo: 'lesões elementares',
    pontos: [
      'Mancha = só alteração de cor, sem relevo. Digitopressão: vascular some; hemorrágica não.',
      'Vesícula ≤ 5 mm; bolha > 5 mm. Erosão (só epiderme) não deixa cicatriz; úlcera (até derme ou além) deixa.',
      'ABCDE: assimetria, bordas, cor, diâmetro > 6 mm (não 6 cm), evolução.',
      'Descrição completa: tipo, número, tamanho, cor, bordas, relevo, superfície, localização e distribuição.',
    ],
  },
  'cabeca-pescoco': {
    titulo: 'cabeça, pescoço e VIII par',
    pontos: [
      'Linfonodo: tamanho, consistência, mobilidade, sensibilidade, coalescência e sinais flogísticos. Supraclavicular E fixo e endurecido = alerta (Virchow).',
      'Reflexo fotomotor: aferência pelo II, eferência pelo III. “Os 4 rela 6, o resto é 3” (oblíquo superior IV, reto lateral VI).',
      'Weber lateraliza para o lado da perda condutiva ou para o lado bom na neurossensorial; Rinne negativo (óssea > aérea) = condutiva.',
      'Romberg com queda sempre para o mesmo lado após latência = lesão vestibular (cai para o lado lesionado).',
    ],
  },
  'dor-toracica': {
    titulo: 'dor torácica',
    pontos: [
      'Caracterize pelos eixos: início, localização, irradiação, duração, qualidade, fatores de melhora/piora, sintomas associados, evolução.',
      'Visceral: compressiva, mal localizada, com sintomas autonômicos. Parietal: bem localizada, piora com respiração ou posição.',
      'Pericardite: melhora sentado inclinado para frente; atrito pericárdico. Dissecção: dor súbita “rasgando” com assimetria de pulsos e PA.',
      'Pneumotórax hipertensivo: diagnóstico clínico — não esperar a radiografia para descomprimir.',
    ],
  },
};
