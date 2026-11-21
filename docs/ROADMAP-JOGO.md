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

## Fila

1. [x] **Carreira e progressão**: XP por estação, questão e caso; níveis (Interno → R1 → R2 → R3 → Preceptor); conquistas; desafio do dia; sequência de dias. Tela "Carreira" no menu.
   - Feito: XP derivado do histórico (questões, OSCE, simulados, desafios), 9 níveis, 17 conquistas, desafio do dia, sequência de 14 dias, card na tela Hoje.
   - Também: aviso ao subir de nível ou desbloquear conquista (em qualquer tela) e XP no resultado da estação de OSCE.
2. [ ] **Paciente com fisiologia viva**: vitais que mudam com o tempo e com as intervenções (O₂, acesso venoso, volume, drogas), com o monitor 3D reagindo. Um primeiro caso: choque séptico ou asma grave.
3. [ ] **Plantão de pronto-socorro**: fila de pacientes chegando, triagem por cores (Manchester), escolha de quem atender, tempo de espera e piora clínica. Placar do plantão.
4. [ ] **Diagnóstico por pistas**: pedir exames (laboratório, imagem, ECG) com custo e tempo, montar diagnósticos diferenciais, confirmar e tratar. Laudos e imagens próprios (desenhados em canvas ou SVG).
5. [ ] **Minijogo de RCP**: compressões no ritmo (100–120/min), profundidade, troca a cada 2 min, ventilação 30:2, retorno da circulação.
6. [ ] **Megacode ACLS**: ritmos no monitor (FV, TV sem pulso, AESP, assistolia, bradi e taquiarritmias), choque, adrenalina e amiodarona no tempo certo, com algoritmo de apoio no modo treino.
7. [ ] **Procedimentos em minijogos**: punção venosa periférica, sondagem, sutura simples, gasometria arterial. Cada um com passos, materiais e erros comuns.
8. [ ] **Prescrição**: montar a prescrição do caso, com dose, via, intervalo, alergias e interações (usando o banco de farmacologia).
9. [ ] **Novos cenários 3D**: sala de emergência (box com carrinho de parada e desfibrilador), enfermaria, consultório de pediatria e de pré-natal.
10. [ ] **Mais estações OSCE**: pediatria, gineco-obstetrícia, saúde mental, comunicação de más notícias.
11. [ ] **Personagens e narrativa**: preceptores com personalidade, pacientes com história que volta em consultas futuras, falas com voz.
12. [ ] **Ambiente e áudio**: som ambiente de hospital, passos, portas, monitores; animações de entrada e saída do paciente.
13. [ ] **Ranking e modo desafio**: placar local, casos relâmpago com tempo, modo "sobrevivência" de questões.
14. [ ] **Qualidade e desempenho**: ajuste de qualidade gráfica (alto, médio, baixo), carregamento sob demanda do 3D, acessibilidade (contraste, legendas, teclado).

## Histórico

- 2026-11-20 · Sala de OSCE em alta fidelidade (materiais com reflexos, luz dos painéis de LED, oclusão de ambiente, mobiliário detalhado).
- 2026-11-21 · Carreira: tela com XP, níveis (Interno I → Professor titular), conquistas, desafio do dia e sequência; resumo na tela Hoje.
- 2026-11-21 · Carreira: aviso de nível e conquista; XP no resultado do OSCE. Item 1 concluído.
