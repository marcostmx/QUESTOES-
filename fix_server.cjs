const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

server = server.replace(
  /{ role: 'user', parts: \[{ text: \\`Contexto da questão atual: \\\$\{context\}\\\\n\\\\nPergunta do usuário: \\\$\{message\}\\` }\] }/,
  "{ role: 'user', parts: [{ text: `Contexto da questão atual: ${context}\\n\\nPergunta do usuário: ${message}` }] }"
);

fs.writeFileSync('server.ts', server);
