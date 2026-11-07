# Estudo PR1

Banco de questões da PR1 com revisão espaçada, caderno de erros, estatísticas e biblioteca de materiais do semestre.

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
    questions/*.json     banco de questões, um arquivo por disciplina  ← fonte da verdade
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

## Adicionar ou editar questões

Edite o JSON da disciplina em `src/data/questions/`. Cada questão:

```json
{
  "id": "far-1a2b3c4d",
  "subject": "farmacologia",
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

- `format`: `mcq` (objetiva) ou `open` (discursiva, sem `options`/`answerIndex`).
- `kind`: `multipla-escolha`, `verdadeiro-falso`, `associacao`, `caso-clinico` ou `discursiva`.
- As alternativas vão **sem** a letra; a letra vem da posição.
- O `id` é o prefixo da disciplina (`fis`, `far`, `pro`, `bc`, `iesc`) + um código único. **Nunca altere o `id` de uma questão publicada** — o progresso dos alunos aponta para ele.

Depois rode `npm run validate`: ele acusa id repetido, gabarito fora do intervalo, alternativas repetidas e questões duplicadas.

## Revisão espaçada

Cada resposta reagenda a questão (variante do SM-2, em dias): erro volta amanhã; acerto espaça 1 → 3 → ~8 dias e segue multiplicando; chute ou resposta parcial cresce devagar. Detalhes e testes em `src/app/core/srs.ts`.

## Sincronização

Sem login, o progresso fica no navegador. Com login Google, vai para `users/{uid}/sync/study-v2` no Firestore e é mesclado entre dispositivos (por questão, vence a alteração mais recente). Para o login funcionar num domínio novo, adicione-o em Firebase → Authentication → Domínios autorizados.
