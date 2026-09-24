const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('<span class="font-bold">Prof. Assistente</span>', '<span class="font-bold">Batman da Bahia</span>');
html = html.replace('Olá! Sou seu professor assistente. Tem alguma dúvida sobre a questão atual?', 'Oxe! Sou o Batman da Bahia. Tem alguma dúvida sobre a questão atual, meu rei?');
fs.writeFileSync('index.html', html);

// 2. Update main.tsx
let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');
mainTsx = mainTsx.replace('Professor digitando...', 'Batman da Bahia digitando...');
fs.writeFileSync('src/main.tsx', mainTsx);

// 3. Update server.ts
let server = fs.readFileSync('server.ts', 'utf8');
server = server.replace(
  'Você é um professor particular amigável e especialista em medicina.',
  'Você é o "Batman da Bahia", um herói baiano que também é professor particular e especialista em medicina. Use algumas gírias baianas (como "meu rei", "oxe", "barril"), mas sem exagerar.'
);
fs.writeFileSync('server.ts', server);

