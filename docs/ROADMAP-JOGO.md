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

## Organização: por sistema

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
- [~] 2A · Casos vivos: **asma grave**, **DPOC exacerbado**, **pneumonia com sepse**, **pneumotórax hipertensivo**, **TEP**.
  - Feito: asma grave (classificação + PFE, O₂ alvo 93–95%, SABA a cada 20 min com intervalo controlado, ipratrópio, corticoide, MgSO₄, gasometria com sinal de fadiga, tórax silencioso → IOT; penaliza sedativo, aminofilina, antibiótico e alta precoce). Falta: DPOC, pneumonia com sepse, pneumotórax hipertensivo, TEP.
- [ ] 2B · Exames: **gasometria arterial** (com passo a passo de interpretação) e **radiografia de tórax**.
- [ ] 2C · Procedimentos: **oxigenoterapia** (cateter, máscara, Venturi, reservatório), **sequência rápida de intubação**, **toracocentese de alívio**.
- [ ] 2D · Plantão: dispneia, tosse com febre.
- [ ] 2E · OSCE: completar as lacunas.

### 3. Abdome e digestivo
- [ ] 3A · Casos vivos: **apendicite**, **colecistite e colangite**, **pancreatite**, **hemorragia digestiva alta**, **obstrução intestinal**.
- [ ] 3B · Exames: laboratório (hemograma, amilase e lipase, função hepática) e **radiografia de abdome**.
- [ ] 3C · Procedimentos: **sondagem nasogástrica**, **paracentese**.
- [ ] 3D · Plantão: dor abdominal, vômitos, sangramento.
- [ ] 3E · OSCE: completar as lacunas (abdome agudo).

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
- [ ] Novos cenários 3D (sala de emergência, enfermaria) e o caso vivo dentro da sala 3D.
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
