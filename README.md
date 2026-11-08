# Estudo PR

Banco de questões da PR2 (prova atual) e da PR1 (já realizada), com revisão espaçada, caderno de erros, estatísticas e biblioteca de materiais do semestre.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run check      # tipos + testes + validação do banco de questões
npm run build && npm start   # versão de produção
```

## Estrutura

```
src/
  data/
    schema.ts            formato canônico de uma questão
    validate.ts          regras de validação (usadas pelos testes e pelo npm run validate)
    questions/<prova>/<disciplina>.json   banco de questões  ← fonte da verdade
                         (pr2/ = prova atual, pr1/ = prova já realizada)
    materials.json       arquivos da pasta do Drive exibidos na Biblioteca
  app/
    core/                lógica sem interface (testada)
      srs.ts             revisão espaçada
      study.ts           progresso do aluno, mescla entre dispositivos
      store.ts           estado global + persistência no navegador
      session.ts         filtros e sessões de estudo
      bank.ts            carregamento sob demanda das questões
      sync.ts            login Google e sincronização via Firestore
      text.ts            busca sem acento e Markdown seguro
    pages/               uma tela por arquivo
    question/            componente da questão e listas
    ui.tsx, styles.css   componentes e design system (claro/escuro)
  firebase.ts
server.ts                servidor Express (Vite em dev, estáticos em produção)
firestore.rules          regras de segurança do Firestore
```

## Provas

O app abre sempre na prova atual (a primeira de `EXAMS` em `src/data/schema.ts`). As outras ficam acessíveis pelo seletor PR2/PR1 no menu e aparecem como "Provas anteriores" na tela inicial. Revisão, caderno de erros, favoritos, busca e estatísticas mostram só a prova escolhida.

Os arquivos de origem de cada prova ficam em `content/<prova>/`: o arquivo original da prova (`questoes_pr2.json`) e um arquivo por lote de questões inéditas (`ineditas_<materia>_<tema>.json`). O banco da prova é regerado a partir de todos eles:

```bash
npx tsx scripts/import-exam.ts PR2 content/pr2/*.json
```

Para uma prova nova (ex.: PR3): acrescente-a no início de `EXAMS`, coloque os arquivos em `content/pr3/` e rode o mesmo comando com `PR3`.

O importador entende o formato `{ meta, questoes: [...] }` (campos `materia`, `tipo`, `origem`, `fonte`, `alternativas`, `gabarito`, `comentario`, `resposta_modelo`…). Reimportar mantém os IDs.

### Questões inéditas

Questões que não caíram em prova do professor usam `"origem": "inédita"` e `"fonte"` com o material exato em que se baseiam (arquivo, caso, item). O app mostra um aviso de "questão não original" nelas. Devem usar **apenas** o conteúdo dos materiais da disciplina e da prova em questão (conferir o plano/cronograma da disciplina), e cobrir só conteúdo de **alto rendimento para prova**: mecanismos centrais, diagnósticos diferenciais clássicos e o que os professores cobram — sem listas exaustivas, números decorativos ou detalhes de nicho.

## Adicionar ou editar questões

Edite o JSON em `src/data/questions/<prova>/`. Cada questão:

```json
{
  "id": "far-1a2b3c4d",
  "subject": "farmacologia",
  "exam": "PR2",
  "format": "mcq",
  "kind": "multipla-escolha",
  "topic": "opcional",
  "stem": "Enunciado…",
  "options": ["Texto da A", "Texto da B", "Texto da C", "Texto da D"],
  "answerIndex": 1,
  "explanation": "**Alternativa B** — gabarito comentado em Markdown.",
  "source": "opcional, ex.: PR1 2024.1"
}
```

- `format`:
  - `mcq`: uma correta (`options` + `answerIndex`);
  - `multi`: mais de uma correta (`options` + `answerIndices`);
  - `tf`: julgar itens (`statements` + `truth`, um booleano por item; `tfStyle: "check"` para "marque os corretos");
  - `open`: discursiva, sem alternativas.
- Opcionais: `topic`, `subtopic`, `image` (URL ou data URI), `origin` (`prova`, `slide`, `inedita`), `ref` (código original), `optionLabels` (letras fora do padrão).
- `kind`: `multipla-escolha`, `verdadeiro-falso`, `associacao`, `caso-clinico` ou `discursiva`.
- As alternativas vão **sem** a letra; a letra vem da posição.
- O `id` é o prefixo da disciplina (`fis`, `far`, `pro`, `bc`, `gis`, `iesc`) + um código único. **Nunca altere o `id` de uma questão publicada** — o progresso dos alunos aponta para ele.

Depois rode `npm run validate`: ele acusa id repetido, gabarito fora do intervalo, alternativas repetidas e questões duplicadas.

## Revisão espaçada

Cada resposta reagenda a questão (variante do SM-2, em dias): erro volta amanhã; acerto espaça 1 → 3 → ~8 dias e segue multiplicando; chute ou resposta parcial cresce devagar. Detalhes e testes em `src/app/core/srs.ts`.

## Sincronização

Sem login, o progresso fica no navegador. Com login Google, vai para `users/{uid}/sync/study-v2` no Firestore e é mesclado entre dispositivos (por questão, vence a alteração mais recente). Para o login funcionar num domínio novo, adicione-o em Firebase → Authentication → Domínios autorizados.
