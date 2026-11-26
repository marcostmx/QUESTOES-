/**
 * Procedimentos passo a passo (lógica pura): a cada etapa o aluno escolhe o próximo passo
 * entre opções; erros explicam o porquê e custam pontos. Reaproveitável para todos os sistemas.
 */

export interface Errada { texto: string; porque: string }
export interface Etapa {
  pergunta: string;
  certa: string;
  erradas: Errada[];
  explicacao: string;
}
export interface Procedimento {
  id: string;
  sistema: 'cardiovascular' | 'respiratorio' | 'abdome' | 'neurologico' | 'renal' | 'trauma';
  titulo: string;
  contexto: string;
  etapas: Etapa[];
  fonte: string;
}

export const PENALIDADE = 8;

export class Execucao {
  i = 0;
  erros: { etapa: number; texto: string; porque: string }[] = [];
  /** erradas já tentadas na etapa atual */
  tentadas = new Set<string>();
  constructor(public p: Procedimento) {}
  get etapa() {
    return this.p.etapas[this.i];
  }
  get fim() {
    return this.i >= this.p.etapas.length;
  }
  escolher(texto: string): { ok: boolean; porque?: string } {
    const e = this.etapa;
    if (!e) return { ok: false };
    if (texto === e.certa) {
      this.i++;
      this.tentadas.clear();
      return { ok: true };
    }
    const w = e.erradas.find(x => x.texto === texto);
    if (!w || this.tentadas.has(texto)) return { ok: false, porque: w?.porque };
    this.tentadas.add(texto);
    this.erros.push({ etapa: this.i, texto, porque: w.porque });
    return { ok: false, porque: w.porque };
  }
  get nota() {
    return Math.max(0, 100 - this.erros.length * PENALIDADE);
  }
}

export const PROCEDIMENTOS: Procedimento[] = [
  {
    id: 'sri', sistema: 'respiratorio', titulo: 'Sequência rápida de intubação',
    contexto: 'Homem de 70 kg, Glasgow 7 após AVC hemorrágico, vomitou há pouco. PA 108/64, FC 96, SpO₂ 93% com máscara. Você vai intubá-lo.',
    fonte: 'Manual de via aérea de emergência; ATLS; diretrizes de SRI',
    etapas: [
      {
        pergunta: 'Por onde começar?', certa: 'Preparar o material (SOAP-ME): aspirador, O₂, via aérea com plano B, posição, monitorização, medicações',
        erradas: [
          { texto: 'Aplicar o indutor e o bloqueador para não perder tempo', porque: 'Sem material testado e plano B, uma via aérea difícil vira catástrofe.' },
          { texto: 'Ventilar com bolsa-valva-máscara em alto volume até a SpO₂ chegar a 100%', porque: 'Ventilação vigorosa insufla o estômago e aumenta o risco de broncoaspiração (ele já vomitou).' },
        ],
        explicacao: 'Teste o laringoscópio e o balonete, deixe bougie e dispositivo supraglótico à mão e o aspirador ligado.',
      },
      {
        pergunta: 'Material pronto. E agora?', certa: 'Pré-oxigenar com O₂ a 100% por 3 min (máscara com reservatório ou VNI) + cateter nasal 15 L/min',
        erradas: [
          { texto: 'Pré-oxigenar só se a SpO₂ cair abaixo de 90%', porque: 'A pré-oxigenação desnitrogena o pulmão e dá minutos de apneia segura: é para todos.' },
          { texto: 'Sedar com midazolam e esperar o paciente relaxar', porque: 'Na SRI, indutor e bloqueador são dados em sequência rápida, sem fases intermediárias.' },
        ],
        explicacao: 'O cateter nasal em alto fluxo mantém oxigenação apneica durante a laringoscopia.',
      },
      {
        pergunta: 'Posição do paciente:', certa: 'Coxim occipital ("posição olfativa"): meato acústico alinhado ao esterno; cabeceira elevada a 20–30°',
        erradas: [
          { texto: 'Hiperextensão máxima do pescoço com coxim sob os ombros', porque: 'Coxim sob os ombros é para crianças pequenas; no adulto piora a visão da glote.' },
          { texto: 'Trendelenburg para melhorar a PA', porque: 'Trendelenburg favorece a regurgitação e piora a mecânica respiratória.' },
        ],
        explicacao: 'A cabeceira elevada também reduz a regurgitação e melhora a pré-oxigenação.',
      },
      {
        pergunta: 'Qual o indutor para este paciente?', certa: 'Etomidato 0,3 mg/kg (~20 mg) ou cetamina 1–2 mg/kg',
        erradas: [
          { texto: 'Propofol 2,5 mg/kg em bolus', porque: 'Propofol em dose plena causa hipotensão importante; no paciente neurológico, hipotensão piora o prognóstico.' },
          { texto: 'Etomidato 3 mg/kg', porque: 'Dose dez vezes maior que a correta (0,3 mg/kg).' },
          { texto: 'Midazolam 1 mg', porque: 'Dose muito baixa e início lento: não serve para a indução da SRI.' },
        ],
        explicacao: 'Etomidato e cetamina são hemodinamicamente estáveis.',
      },
      {
        pergunta: 'Logo após o indutor:', certa: 'Bloqueador neuromuscular: rocurônio 1,2 mg/kg (ou succinilcolina 1,5 mg/kg)',
        erradas: [
          { texto: 'Dar o bloqueador antes do indutor, para ganhar tempo', porque: 'Paralisia com o paciente consciente: experiência terrível e inaceitável.' },
          { texto: 'Esperar 5 minutos para o indutor agir antes do bloqueador', porque: 'Na SRI os dois são dados em sequência imediata para encurtar a apneia.' },
        ],
        explicacao: 'Succinilcolina é contraindicada em hipercalemia, queimados/esmagamento após 24–72 h e doenças neuromusculares.',
      },
      {
        pergunta: 'Enquanto o bloqueador age (45–60 s):', certa: 'Não ventilar com pressão positiva (salvo se a SpO₂ cair); manter o O₂ nasal',
        erradas: [
          { texto: 'Ventilar vigorosamente com a bolsa para "encher o pulmão"', porque: 'Aumenta a insuflação gástrica e o risco de aspiração.' },
          { texto: 'Aplicar pressão cricoide forte durante toda a intubação', porque: 'A manobra de Sellick não tem benefício comprovado e pode piorar a visão da glote.' },
        ],
        explicacao: 'Se dessaturar, ventile com baixos volumes e baixa pressão.',
      },
      {
        pergunta: 'Paciente paralisado:', certa: 'Laringoscopia, passar o tubo (7,5–8,0) pelas cordas vocais e insuflar o balonete',
        erradas: [
          { texto: 'Tentar por 2 minutos seguidos até conseguir', porque: 'Tentativas prolongadas causam hipoxemia: interrompa, reoxigene e mude a estratégia (bougie, videolaringoscópio).' },
          { texto: 'Passar o tubo às cegas pelo nariz', porque: 'Intubação nasotraqueal às cegas não faz parte da SRI.' },
        ],
        explicacao: 'Use o bougie se a glote não for bem visualizada.',
      },
      {
        pergunta: 'Como confirmar a posição do tubo?', certa: 'Capnografia com curva sustentada em 5–6 ciclos + ausculta e expansibilidade',
        erradas: [
          { texto: 'Só pela ausculta dos pulmões', porque: 'A ausculta isolada pode falhar; a capnografia em forma de onda é o padrão-ouro.' },
          { texto: 'Esperar a radiografia de tórax', porque: 'A RX mostra a altura do tubo, mas não exclui intubação esofágica.' },
        ],
        explicacao: 'Sem curva de CO₂ = tubo no esôfago até prova em contrário.',
      },
      {
        pergunta: 'Tubo confirmado. Para terminar:', certa: 'Fixar (~21–23 cm na rima labial), iniciar sedoanalgesia contínua, ajustar o ventilador e pedir RX',
        erradas: [
          { texto: 'Suspender a sedação: o bloqueador ainda age', porque: 'O rocurônio dura 45–60 min e o etomidato só minutos: sem sedação, o paciente fica paralisado e acordado.' },
          { texto: 'Desinsuflar o balonete para reduzir lesão de traqueia', porque: 'Sem balonete, há escape e risco de aspiração. Mantenha a pressão do balonete entre 20 e 30 cmH₂O.' },
        ],
        explicacao: 'Ventilação protetora: volume corrente de 6–8 mL/kg do peso predito.',
      },
    ],
  },
  {
    id: 'drenagem', sistema: 'respiratorio', titulo: 'Drenagem torácica (toracostomia)',
    contexto: 'Homem de 35 anos após trauma fechado, com hemopneumotórax à direita confirmado no E-FAST e na radiografia. Estável após o volume.',
    fonte: 'ATLS 10ª ed.',
    etapas: [
      {
        pergunta: 'Antes de começar:', certa: 'Confirmar a indicação e o lado, explicar, separar o material e usar paramentação estéril',
        erradas: [{ texto: 'Começar pelo lado mais acessível', porque: 'Drenar o lado errado é um erro grave: confira o lado no exame e na imagem.' }],
        explicacao: 'Dreno 28–32 Fr para hemotórax no adulto.',
      },
      {
        pergunta: 'Posição e local da inserção:', certa: '5º espaço intercostal, entre as linhas axilares anterior e média (triângulo de segurança), braço atrás da cabeça',
        erradas: [
          { texto: '2º espaço intercostal na linha hemiclavicular', porque: 'Esse é o local de punção de alívio em crianças; para dreno no adulto use o triângulo de segurança.' },
          { texto: '8º espaço intercostal na linha axilar posterior', porque: 'Baixo demais: risco de lesar o diafragma, o fígado ou o baço.' },
        ],
        explicacao: 'Triângulo de segurança: borda do grande dorsal, borda do peitoral maior e linha do 5º EIC.',
      },
      {
        pergunta: 'Após a antissepsia e os campos:', certa: 'Anestesia local em pele, periósteo e pleura, aspirando antes de injetar',
        erradas: [{ texto: 'Dispensar a anestesia: o paciente está sedado', porque: 'A pleura parietal é muito sensível; anestesia local e analgesia sempre.' }],
        explicacao: 'Aspirar ar ou sangue com a agulha confirma que você chegou ao espaço pleural.',
      },
      {
        pergunta: 'Acesso ao espaço pleural:', certa: 'Incisão de 2–3 cm e dissecção romba sobre a borda SUPERIOR da costela inferior',
        erradas: [
          { texto: 'Dissecar pela borda inferior da costela de cima', porque: 'O feixe vasculonervoso intercostal corre na borda inferior de cada costela.' },
          { texto: 'Usar o trocater pontiagudo para atravessar a parede', porque: 'O trocater pode lesar pulmão, coração e grandes vasos; a técnica é romba.' },
        ],
        explicacao: 'Perfure a pleura com a pinça romba fechada e abra-a.',
      },
      {
        pergunta: 'Pleura aberta:', certa: 'Explorar com o dedo para afastar aderências e confirmar a cavidade',
        erradas: [{ texto: 'Introduzir o dreno direto, sem explorar', porque: 'Aderências podem desviar o dreno para dentro do pulmão.' }],
        explicacao: 'Saída de ar e sangue confirma a cavidade.',
      },
      {
        pergunta: 'Inserção do dreno:', certa: 'Introduzir guiado pela pinça, posterior e superiormente, com todos os orifícios dentro do tórax',
        erradas: [{ texto: 'Deixar o último orifício fora da pele', porque: 'Orifício fora do tórax causa enfisema subcutâneo e escape de ar.' }],
        explicacao: 'Meça antes: os orifícios devem ficar todos dentro da cavidade.',
      },
      {
        pergunta: 'Conexão:', certa: 'Conectar ao selo d\'água (extremidade ~2 cm abaixo do nível) e observar oscilação e borbulhamento',
        erradas: [
          { texto: 'Clampear o dreno para o transporte', porque: 'Clampear com fuga aérea pode recriar um pneumotórax hipertensivo.' },
          { texto: 'Deixar o frasco acima do nível do tórax', porque: 'O conteúdo pode refluir para o tórax: o frasco fica sempre abaixo.' },
        ],
        explicacao: 'Drenagem imediata ≥ 1.500 mL de sangue ou > 200 mL/h por 2–4 h: toracotomia.',
      },
      {
        pergunta: 'Para concluir:', certa: 'Fixar com sutura, fazer o curativo, pedir RX de controle e anotar o débito',
        erradas: [{ texto: 'Dispensar a radiografia: o dreno está borbulhando', porque: 'A RX confirma a posição do dreno e a expansão pulmonar.' }],
        explicacao: 'Reavalie o paciente: expansibilidade, ausculta e sinais vitais.',
      },
    ],
  },
  {
    id: 'oxigenio', sistema: 'respiratorio', titulo: 'Oxigenoterapia: dispositivo e fluxo',
    contexto: 'Oito pacientes no pronto-socorro precisam (ou não) de oxigênio. Escolha o dispositivo e o fluxo certos para cada um.',
    fonte: 'BTS Guideline for oxygen use; GOLD; AHA',
    etapas: [
      {
        pergunta: 'Pneumonia leve, sem doença pulmonar prévia, SpO₂ 91% em ar ambiente.', certa: 'Cateter nasal a 2–4 L/min, alvo SpO₂ 94–98%',
        erradas: [
          { texto: 'Máscara com reservatório a 15 L/min', porque: 'Hipoxemia leve não exige FiO₂ tão alta; hiperóxia não traz benefício.' },
          { texto: 'Máscara de Venturi a 50% de saída', porque: 'Venturi é para controle fino da FiO₂ (ex.: retentor de CO₂); aqui basta o cateter.' },
        ],
        explicacao: 'Alvo de 94–98% para a maioria dos pacientes agudos.',
      },
      {
        pergunta: 'DPOC grave, retentor de CO₂, SpO₂ 84%.', certa: 'Máscara de Venturi 24–28%, alvo SpO₂ 88–92%',
        erradas: [
          { texto: 'Máscara com reservatório a 15 L/min', porque: 'Excesso de O₂ eleva o pCO₂ e pode causar narcose no retentor.' },
          { texto: 'Nada de oxigênio, para não suprimir o drive', porque: 'Hipoxemia mata: dê O₂ controlado, com alvo de 88–92%.' },
        ],
        explicacao: 'Gasometria em 30–60 min para checar o pCO₂.',
      },
      {
        pergunta: 'Intoxicação por monóxido de carbono, SpO₂ "100%" no oxímetro.', certa: 'Máscara com reservatório a 15 L/min (O₂ a 100%)',
        erradas: [
          { texto: 'Sem O₂: a saturação está normal', porque: 'O oxímetro comum não diferencia carboxi-hemoglobina: a SpO₂ é falsamente normal.' },
          { texto: 'Cateter nasal a 2 L/min', porque: 'O₂ a 100% reduz a meia-vida da carboxi-hemoglobina; o cateter não atinge isso.' },
        ],
        explicacao: 'Dose a carboxi-hemoglobina na gasometria; considere câmara hiperbárica nos casos graves.',
      },
      {
        pergunta: 'Dor torácica com IAM confirmado, SpO₂ 97% em ar.', certa: 'Não precisa de oxigênio; só monitorizar',
        erradas: [
          { texto: 'Cateter nasal a 3 L/min de rotina', porque: 'Sem hipoxemia (SpO₂ < 90%), o O₂ não traz benefício no IAM.' },
          { texto: 'Máscara com reservatório para "proteger o miocárdio"', porque: 'Hiperóxia pode causar vasoconstrição coronariana.' },
        ],
        explicacao: 'O₂ no IAM só se SpO₂ < 90%.',
      },
      {
        pergunta: 'Pneumonia grave, SpO₂ 86% já com máscara com reservatório, FR 32, consciente, sem hipercapnia.', certa: 'Cateter nasal de alto fluxo (40–60 L/min, FiO₂ titulada)',
        erradas: [
          { texto: 'Cateter nasal comum a 12 L/min', porque: 'Acima de 5–6 L/min o cateter comum resseca a mucosa e não aumenta a FiO₂ de forma útil.' },
          { texto: 'Intubar já, sem tentar outra estratégia', porque: 'Na insuficiência hipoxêmica consciente, o alto fluxo pode evitar a intubação; reavalie em 1–2 h.' },
        ],
        explicacao: 'Use o índice ROX para prever falha do alto fluxo.',
      },
      {
        pergunta: 'Edema agudo de pulmão hipertensivo, SpO₂ 85%, fala frases curtas.', certa: 'VNI com CPAP/BiPAP',
        erradas: [
          { texto: 'Cateter nasal a 2 L/min e aguardar o diurético', porque: 'O EAP precisa de pressão positiva: a VNI melhora a oxigenação e reduz a pós-carga.' },
          { texto: 'Máscara simples a 3 L/min', porque: 'Fluxo baixo demais na máscara simples (mínimo 5 L/min) e oxigenação insuficiente.' },
        ],
        explicacao: 'Associe nitrato em dose alta.',
      },
      {
        pergunta: 'Quanto cada 1 L/min no cateter nasal aumenta a FiO₂, aproximadamente?', certa: 'Cerca de 3–4% (1 L ≈ 24%, 4 L ≈ 36%)',
        erradas: [
          { texto: 'Cerca de 10% (4 L ≈ 60%)', porque: 'Superestima: o cateter chega a no máximo ~40–44%.' },
          { texto: 'Chega a 100% com 6 L/min', porque: 'O cateter mistura O₂ com ar ambiente: nunca chega perto de 100%.' },
        ],
        explicacao: 'A FiO₂ real depende do padrão respiratório (por isso Venturi quando precisa de precisão).',
      },
      {
        pergunta: 'Qual o fluxo mínimo da máscara simples (sem reservatório)?', certa: '5 L/min, para não reinalar CO₂',
        erradas: [
          { texto: '1–2 L/min já basta', porque: 'Com fluxo baixo o paciente reinala o CO₂ exalado dentro da máscara.' },
          { texto: 'Não há mínimo: ajustar pela SpO₂', porque: 'Há mínimo: abaixo de 5 L/min ocorre reinalação.' },
        ],
        explicacao: 'Máscara simples: 5–10 L/min, FiO₂ ~40–60%.',
      },
    ],
  },
];

export const procPorId = (id: string) => PROCEDIMENTOS.find(p => p.id === id);
