# Roteiro do jogo de medicina (Estudo PR)

Objetivo: transformar o Estudo PR num jogo de medicina completo, com o OSCE 3D em primeira
pessoa como núcleo, somando mecânicas de gêneros que já existem na web: gestão de plantão,
simulação fisiológica em tempo real, diagnóstico por pistas, procedimentos em minijogos e
carreira com progressão. Só se aproveitam **ideias de mecânica**. Nada de nomes, personagens,
arte, sons ou fases de jogos existentes.

Este arquivo é a fila de trabalho das sessões automáticas. Cada sessão:

1. lê este arquivo e pega o **primeiro item `[ ]`** da fila (ou continua um `[~]`);
2. implementa uma fatia que funcione de ponta a ponta, mesmo que pequena;
3. roda `npm run check` (tsc, testes e validação), que precisa passar;
4. confere no navegador com o Playwright (Chromium já instalado), em desktop e em celular;
5. marca o item (`[x]` pronto, `[~]` em andamento, com uma nota do que falta) e registra no histórico;
6. faz commit e push na branch `questoes-pr2`. O workflow leva para a `main` e publica.

Regras fixas:
- Não quebrar o que existe: banco de questões, revisão espaçada, OSCE, estações e testes.
- Código em TypeScript e React, com Three.js puro no 3D. Textos da interface em português do Brasil.
- Mídia externa só com licença livre (CC0, CC BY, CC BY-SA ou domínio público), com crédito em `public/sons/CREDITOS.md` ou num arquivo equivalente.
- Não usar o emblema da Cruz Vermelha. Usar "H" ou cruz verde.
- O conteúdo médico precisa estar correto e de acordo com diretrizes atuais (AHA/ACLS, Manchester, SBC). Na dúvida, deixar mais simples, sem inventar.
- Celular é prioridade: tudo jogável por toque.
- Nunca commitar segredos. Nunca forçar push nem reescrever histórico.

## Prioridade atual: plataforma de OSCE + 4º período (produto por assinatura)

O foco do produto é a **prova de OSCE** e as **7 matérias do 4º período** (Propedêutica, Fisiopatologia,
Farmacologia, Bases Cirúrgicas, GIS2, HMP-IV e SOP3), vendido por **assinatura mensal no Mercado Pago**.
Os itens desta seção vêm antes dos sistemas do jogo abaixo. Configuração de vendas: `docs/VENDAS.md`.

### P. Produto e vendas
- [x] P1 · Assinatura mensal (Mercado Pago) com 7 dias grátis na primeira assinatura, plano grátis × Premium, página de planos, cadeados nas listas e bloqueio nas rotas.
- [x] P2 · Conteúdo protegido no servidor (/api/conteudo): questões (Premium recebe tudo; grátis, amostra de ~20% das inéditas; provas anteriores só Premium) e estações de OSCE (índice público em indice.json; caso, achados, comandos e checklist só pela API conforme o plano), com cache offline. Os casos vivos seguem no código (são lógica de jogo).
- [x] P3 · Página de vendas (#/conheca), termos e privacidade prontos para CNPJ (falta preencher razão social, CNPJ e contato em LegalPage.tsx).
- [x] P4 · Painel do administrador (#/admin, só ADMIN_EMAILS): assinantes ativos e em teste, receita mensal, novos e cancelamentos em 30 dias, conversão do grátis e lista das assinaturas.

### O. OSCE (núcleo do produto)
- [x] O1 · Trilha OSCE do 4º período: 10 módulos do básico ao complexo, domínio (duas notas ≥ 70%), revisão espaçada após 14 dias, próxima estação recomendada, data da prova com ritmo diário, cartão na Home.
- [ ] O2 · OSCE abdome agudo: completar as lacunas (antigo 3E).
- [ ] O3 · Neurológico: revisar e polir as 79 estações (antigo 4E).
- [ ] O6 · Treino em dupla com dois celulares conectados por código de sala: o examinando vê só o enunciado e o cronômetro; o avaliador vê caso, achados e checklist, marca os itens e a nota sai para os dois.
- [ ] O5 · Relatório de desempenho OSCE por competência (exame físico, comunicação, raciocínio) e evolução no tempo.
- [ ] O4 · Estações de comunicação e anamnese com roteiro de paciente-ator e correção por item.

### M. Matérias do 4º período
- [ ] M1 · Cobertura: mapear os temas de cada matéria × questões existentes e completar lacunas (mínimo de 150 por matéria; SOP3 e GIS2 estão baixas).
- [ ] M2 · Resumos por tema nas 7 matérias.
- [ ] M3 · Integração OSCE ↔ teoria: cada estação aponta resumos e questões do mesmo tema.
- [x] M4 · Flashcards do que o aluno errou (questões erradas e falhas do OSCE: manobra, posição, abertura/fechamento, PA, respostas faladas), com caixas de Leitner e filtro Questões/OSCE (#/flashcards).

## Organização do jogo: por sistema

O jogo avança **um sistema de cada vez**. Cada sistema tem as mesmas camadas, nesta ordem:

- **A · Caso vivo:** paciente com sinais vitais que mudam com o tempo e com as condutas (monitor, exames, drogas). No fim, um debriefing com acertos, erros e tempo de cada conduta.
- **B · Exames:** ECG, radiografia, laboratório e gasometria desenhados no próprio app, com laudo para interpretar.
- **C · Procedimento:** minijogo do procedimento típico do sistema.
- **D · Plantão:** os casos do sistema entram na fila do pronto-socorro, com triagem de Manchester.
- **E · OSCE:** completar as lacunas de estações do sistema.

A **base comum** (motor de caso vivo, tela de monitor, debriefing, fila do plantão) nasce junto com o primeiro sistema e é reaproveitada pelos outros.
Cada caso concluído dá XP e entra na Carreira.

Legenda: `[ ]` a fazer · `[~]` em andamento · `[x]` pronto.

### 0. Base (pronto)
- [x] Carreira: XP, níveis, conquistas, desafio do dia e sequência.
- [x] Sala de OSCE 3D em primeira pessoa, em alta fidelidade.

### 1. Cardiovascular (primeiro: mais conteúdo, e o monitor já existe)
- [x] 1A · Caso vivo: **IAM com supra de ST** (MOV, ECG em 10 min, AAS, anticoagulação, reperfusão no tempo, complicação com FV). Cria o motor de caso vivo e o debriefing.
  - Feito: motor (`src/casos/motor.ts`), monitor com traçado em tempo real, ECG de 12 derivações desenhado, 8 metas com prazo, condutas inadequadas, FV se a fibrinólise atrasar, debriefing, XP na Carreira. Tela "Casos clínicos" no menu.
- [x] 1B · Exames: **ECG de 12 derivações** desenhado (supra, infra, BAV, FA, flutter, TV, FV), com quiz de laudo.
  - Feito: gerador por padrão (`src/casos/ecgPadroes.ts`) com 18 padrões (sinusal, taqui/bradi, FA, flutter, TSV, TV, FV, BAV 1º, Mobitz I e II, BAVT, BRD, BRE, IAM anterior e inferior, hipercalemia, pericardite); tela Treino de ECG (quiz de 8 + atlas), XP e conquista "Leitor de ECG".
- [x] 1C · Procedimento: **RCP de alta qualidade** (ritmo 100–120/min, 30:2, troca a cada 2 min) e **desfibrilação**.
  - Feito: minijogo `#/rcp` (lógica em `src/casos/rcp.ts`): compressões por toque/espaço com régua de frequência, 30:2, metrônomo, pausas medidas, análise a cada ciclo, carregar/afastem-se/chocar, adrenalina após o 2º choque, retorno da circulação e debriefing com 5 metas.
- [x] 1A+ · Casos vivos: **Megacode ACLS** (FV/TV, AESP, assistolia), **bradicardia instável**, **taquicardia instável**, **edema agudo de pulmão**, **emergência hipertensiva**.
  - Feito: bradicardia instável (BAV total por betabloqueador; atropina, marca-passo transcutâneo com analgesia, dopamina, causas reversíveis). Taquicardia instável (TV monomórfica com pulso: cardioversão sincronizada 100 J com sedação; choque não sincronizado gera FV; K/Mg; amiodarona pós-reversão). Edema agudo de pulmão hipertensivo (sentar, VNI, nitrato SL/IV, furosemida; rebaixamento e parada se não tratar; penaliza soro, morfina e betabloqueador). Megacode ACLS em tempo real (FV refratária → AESP por hipercalemia → RCE; choques, adrenalina, amiodarona, pausas < 10 s, Hs e Ts, cuidados pós-PCR). Emergência hipertensiva com dissecção de aorta tipo A (betabloqueador antes do nitroprussiato, metas em 20 min, angio-TC, cirurgia; antitrombóticos punidos, fibrinólise leva a tamponamento).
- [x] 1D · Plantão: dor torácica, síncope, palpitação.
  - Feito: `#/plantao` (lógica em `src/casos/plantao.ts`): 10 pacientes chegam ao longo do turno, classificação de Manchester (5 cores), fila por prioridade, tempos-alvo, piora na espera, debriefing por paciente com link para o caso vivo correspondente. A base serve para os plantões dos outros sistemas e para o plantão misto.
- [x] 1E · OSCE: completar as lacunas (pulsos periféricos, sopros, dor torácica).
  - Feito: 5 estações novas (JOGO-CV-01 a 05: DAOP com ITB e Buerger, PVJ e refluxo hepatojugular, TVP, tamponamento com pulso paradoxal, pericardite com atrito) e 10 manobras novas; filtro "Estações do jogo" no lobby. Sopros e dor torácica já estavam cobertos (20 estações SIM-CV e 4 DT).

### 2. Respiratório
- [x] 2A · Casos vivos: **asma grave**, **DPOC exacerbado**, **pneumonia com sepse**, **pneumotórax hipertensivo**, **TEP**.
  - Feito: asma grave (classificação + PFE, O₂ alvo 93–95%, SABA a cada 20 min com intervalo controlado, ipratrópio, corticoide, MgSO₄, gasometria com sinal de fadiga, tórax silencioso → IOT; penaliza sedativo, aminofilina, antibiótico e alta precoce). Pneumotórax hipertensivo no trauma (diagnóstico clínico, descompressão no 4º–5º EIC do lado certo, drenagem, recidiva se o cateter obstruir; penaliza RX antes, lado errado e pressão positiva antes de descomprimir). DPOC exacerbada com acidose respiratória (O₂ controlado por Venturi, alvo 88–92%; O₂ em alto fluxo piora a hipercapnia; broncodilatadores, corticoide, antibiótico; VNI que corrige o pH; narcose e parada se não tratar). Pneumonia com choque séptico (pacote da 1ª hora: lactato, hemoculturas antes do ATB, ceftriaxona + azitromicina em até 1 h, 30 mL/kg, noradrenalina, CURB-65 e UTI; penaliza amido, dopamina e hidrocortisona sem vasopressor). TEP que evolui para alto risco (Wells, heparina antes da imagem, angio-TC se estável ou eco à beira-leito se instável, alteplase em até 15 min da hipotensão, noradrenalina, volume ≤ 500 mL; penaliza D-dímero desnecessário, 2 L de volume, trombólise na estável e tomografia em choque).
- [x] 2B · Exames: **gasometria arterial** (com passo a passo de interpretação) e **radiografia de tórax**.
  - Feito: `#/gasometria` (lógica em `src/casos/gaso.ts`): 9 gasometrias (CAD, diarreia, vômitos, opioide, DPOC crônico, ansiedade, acidose lática, mistos), passos de distúrbio primário, compensação (Winter e regras respiratórias agudas/crônicas), ânion gap, delta-delta e causa, com as contas na explicação. Radiografia de tórax `#/rx` (desenho esquemático em `src/casos/rx.ts`): 9 padrões (normal, pneumotórax, derrame, consolidação, congestão, cardiomegalia, hiperinsuflação, pneumoperitônio, alargamento do mediastino), quiz de 6 e atlas.
- [x] 2C · Procedimentos: **oxigenoterapia** (cateter, máscara, Venturi, reservatório), **sequência rápida de intubação**, **toracocentese de alívio**.
  - Feito: motor de procedimento passo a passo (`src/casos/procedimentos.ts`, rota `#/procedimento/<id>`, reaproveitável nos outros sistemas) com sequência rápida de intubação e drenagem torácica (escolher o próximo passo; erro explica o porquê e custa 8 pontos). Oxigenoterapia: 8 cenários de escolha de dispositivo e fluxo (cateter, Venturi no DPOC, reservatório no CO, sem O₂ no IAM normoxêmico, alto fluxo, VNI no EAP, FiO₂ por litro, fluxo mínimo da máscara).
- [x] 2D · Plantão: dispneia, tosse com febre.
  - Feito: plantão respiratório `#/plantao/respiratorio` (10 pacientes: asma grave e moderada, DPOC, pneumotórax, sepse, TEP, hemoptise, IVAS, tosse crônica, receita), ligado aos casos vivos. O plantão passou a aceitar fichas por sistema.
- [x] 2E · OSCE: completar as lacunas.
  - Feito: 5 estações (JOGO-RP-01 a 05: baqueteamento/Schamroth e estertores em velcro, posição da traqueia, pico de fluxo com plano de ação, inalador com espaçador, oximetria e armadilhas) e 6 manobras novas. O exame físico clássico já tinha 35 estações.

### 3. Abdome e digestivo
- [x] 3A · Casos vivos: **apendicite**, **colecistite e colangite**, **pancreatite**, **hemorragia digestiva alta**, **obstrução intestinal**.
  - Feito: HDA varicosa em cirrótico (2 acessos, terlipressina, ceftriaxona, transfusão restritiva, volume ≤ 2 L, IBP, EDA com ligadura só após estabilizar, Blatchford/Child; ressangramento e choque se não tratar; penaliza betabloqueador agudo, transfusão liberal e excesso de volume). Colangite aguda grave (Tokyo grau III: pêntade de Reynolds, hemoculturas, pip-tazo em até 1 h, volume, noradrenalina, USG, CPRE urgente; só antibiótico sem drenagem volta a piorar; penaliza colecistectomia na fase aguda). Apendicite aguda (anamnese e sinais, Alvarado, analgesia precoce, jejum, USG, antibiótico profilático e apendicectomia antes de perfurar às 4 h; penaliza segurar analgesia, alta com antiespasmódico e TC desnecessária). Relógio passa a mostrar horas. Pancreatite aguda biliar (lipase, BISAP, hidratação moderada × agressiva/WATERFALL, analgesia com opioide, USG, dieta oral precoce, colecistectomia na mesma internação; penaliza antibiótico profilático, TC precoce, jejum prolongado e CPRE sem colangite). Obstrução intestinal por bridas (SNG, hidratação e K, RX e TC com sinais de sofrimento, gastrografina que resolve em 8 h; sem descompressão estrangula às 6 h e exige cirurgia em até 4 h; penaliza procinético, laxante e cirurgia sem sinais de sofrimento).
- [x] 3B · Exames: laboratório (hemograma, amilase e lipase, função hepática) e **radiografia de abdome**.
  - Feito: `#/procedimento/exames-abdome` (10 interpretações: padrão hepatocelular × colestático, álcool, PBE com GASA, Child-Pugh, lipase × amilase, Gilbert, ureia na HDA, pneumoperitônio, volvo de sigmoide). O motor de procedimentos ganhou o tipo 'exame'. Radiografia de abdome desenhada pode entrar depois, como a de tórax.
- [x] 3C · Procedimentos: **sondagem nasogástrica**, **paracentese**.
  - Feito: sondagem nasogástrica (medida NEX, flexão e deglutição, sinais de via aérea, confirmação por RX/pH, fixação) e paracentese (sem corrigir coagulopatia de rotina, QIE guiado por US, técnica em Z, exames do líquido, albumina > 5 L, tratar PBE).
- [ ] 3D · Plantão: dor abdominal, vômitos, sangramento.
- [ ] 3E · OSCE: completar as lacunas (abdome agudo). → ver O2.

### 4. Neurológico
- [ ] 4A · Casos vivos: **AVC isquêmico** (janela de trombólise, NIHSS), **estado de mal epiléptico**, **rebaixamento de consciência** (Glasgow), **meningite**.
- [ ] 4B · Exames: **TC de crânio** esquemática, líquor.
- [ ] 4C · Procedimentos: **escala de Glasgow e NIHSS** jogáveis, **punção lombar**.
- [ ] 4D · Plantão: déficit focal, convulsão, cefaleia.
- [ ] 4E · OSCE: já é o sistema mais completo (79 estações); revisar e polir.

### 5. Renal, urinário e metabólico
- [ ] 5A · Casos vivos: **cetoacidose diabética**, **hipoglicemia**, **hipercalemia**, **lesão renal aguda**.
- [ ] 5B · Exames: eletrólitos e **ECG da hipercalemia** (reaproveita o 1B).
- [ ] 5C · Procedimento: **sondagem vesical**.
- [ ] 5D · Plantão: oligúria, alteração de consciência no diabético.
- [ ] 5E · OSCE: completar as lacunas (urinário).

### 6. Trauma, pele, cabeça e pescoço
- [ ] 6A · Casos vivos: **trauma pelo ABCDE** (ATLS), **choque hemorrágico**, **anafilaxia**.
- [ ] 6C · Procedimentos: **sutura simples**, **acesso venoso periférico**.
- [ ] 6E · OSCE: completar as lacunas (cabeça e pescoço, pele).

### 7. Transversal (entra ao longo do caminho)
- [ ] Plantão completo misturando os sistemas, com placar.
- [ ] Prescrição com dose, via, alergias e interações.
- [~] Novos cenários 3D (sala de emergência, enfermaria) e o caso vivo dentro da sala 3D.
  - Feito: sala de emergência 3D (`src/casos/Emergencia3D.ts`) para todos os casos vivos: paciente reage aos vitais (respiração, cianose, palidez, parada), monitor com o ritmo real, bipes e alarmes, estações clicáveis (paciente, monitor, exames, medicações, carrinho de parada, telefone) com marcadores e barra de estações, compressões na RCP e clarão/tranco no choque. Modo 2D continua disponível. Refeito: personagens humanos (tronco contínuo, articulações, rosto com olhos, sobrancelhas, nariz, orelhas e boca) no OSCE e na emergência; enfermeira que caminha até a estação em que o estudante age, contorna a maca e assume as compressões na parada; oclusão de ambiente (desktop); enquadramento próprio no celular. Falta: enfermaria, animações de procedimentos (acesso, IOT) e plantão dentro do 3D.
- [ ] Personagens, narrativa, som ambiente.
- [ ] Ranking, modos desafio, qualidade gráfica ajustável, acessibilidade.

## Histórico

- 2026-11-20 · Sala de OSCE em alta fidelidade (materiais com reflexos, luz dos painéis de LED, oclusão de ambiente, mobiliário detalhado).
- 2026-11-21 · Carreira: tela com XP, níveis (Interno I → Professor titular), conquistas, desafio do dia e sequência; resumo na tela Hoje.
- 2026-11-21 · Carreira: aviso de nível e conquista; XP no resultado do OSCE. Item 1 concluído.
- 2026-11-22 · 1A: caso vivo de IAM com supra de ST (motor de caso vivo, monitor, ECG de 12 derivações, debriefing, XP). Roteiro reorganizado por sistema.
- 2026-11-22 · 1B: Treino de ECG com 18 padrões de 12 derivações (quiz e atlas), XP na Carreira.
- 2026-11-22 · 1C: minijogo de RCP e desfibrilação (frequência, fração de compressão, pausas, choque seguro, adrenalina), XP na Carreira.
- 2026-11-22 · 1A+: caso vivo de bradicardia instável (BAV total), com ritmo de marca-passo no monitor.
- 2026-11-22 · 1A+: caso vivo de taquicardia instável (TV com pulso, cardioversão sincronizada); alarmes de TV e marca-passo no monitor.
- 2026-11-23 · 1A+: caso vivo de edema agudo de pulmão hipertensivo (VNI e vasodilatador).
- 2026-11-23 · 1A+: megacode ACLS (FV → AESP → RCE, Hs e Ts) em tempo real; casos podem definir a velocidade do relógio.
- 2026-11-23 · 1A+: emergência hipertensiva com dissecção de aorta. Casos vivos do Cardiovascular concluídos (6 casos).
- 2026-11-23 · 1D: plantão do pronto-socorro com classificação de risco (Manchester) e fila, ligado aos casos vivos.
- 2026-11-24 · 1E: 5 estações de OSCE cardiovascular novas e 10 manobras. **Sistema 1 (Cardiovascular) concluído.**
- 2026-11-24 · 2A: início do sistema Respiratório com o caso vivo de asma grave.
- 2026-11-24 · 2A: caso vivo de pneumotórax hipertensivo pós-trauma.
- 2026-11-24 · 2A: caso vivo de DPOC exacerbada com acidose respiratória (gasometria calculada pelo pCO₂).
- 2026-11-25 · 2A: caso vivo de pneumonia com choque séptico (pacote da 1ª hora).
- 2026-11-25 · 2A: caso vivo de TEP com evolução para alto risco. Casos vivos do Respiratório concluídos (5 casos).
- 2026-11-25 · 2B: treino de gasometria arterial passo a passo.
- 2026-11-25 · 2B: treino de radiografia de tórax (9 padrões esquemáticos, quiz e atlas).
- 2026-11-26 · 2C: motor de procedimentos passo a passo com SRI e drenagem torácica.
- 2026-11-26 · 2C: oxigenoterapia (dispositivo e fluxo por cenário).
- 2026-11-26 · 2D: plantão do pronto-socorro respiratório.
- 2026-11-26 · 2E: 5 estações de OSCE respiratório novas e 6 manobras. **Sistema 2 (Respiratório) concluído.**
- 2026-11-27 · 3A: início do sistema Abdome com o caso vivo de HDA varicosa.
- 2026-11-27 · 3A: caso vivo de colangite aguda grave (Tokyo 2018).
- 2026-11-27 · 3A: caso vivo de apendicite aguda (relógio de horas para casos longos).
- 2026-11-27 · 3A: caso vivo de pancreatite aguda biliar.
- 2026-11-28 · 3A: caso vivo de obstrução intestinal por bridas. Casos vivos do Abdome concluídos (5 casos).
- 2026-11-28 · 3B: interpretação de exames do abdome (laboratório e radiografia).
- 2026-11-28 · 3C: procedimentos de sondagem nasogástrica e paracentese.
- 2026-11-28 · Jogo 3D: os casos vivos passam a acontecer numa sala de emergência 3D interativa.
- 2026-11-28 · Flashcards gerados dos erros (questões e OSCE) com repetição espaçada.
- 2026-11-28 · Painel do administrador com assinantes, receita, cancelamentos e conversão.
- 2026-11-28 · Conteúdo protegido: questões e estações de OSCE vêm do servidor conforme o plano; página de vendas, termos e privacidade.
- 2026-11-28 · Trilha OSCE do 4º período (domínio, revisão espaçada, ritmo até a prova) e teste grátis de 7 dias.
- 2026-11-28 · Foco em OSCE + 4º período como produto pago: assinatura Mercado Pago, plano grátis × Premium, página de planos e menu com o OSCE em primeiro.
- 2026-11-28 · 3D refeito: personagens humanos, enfermeira da equipe com rotas e RCP, oclusão de ambiente e câmera para celular.
