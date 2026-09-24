const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('<span class="font-bold">Batman da Bahia</span>', '<span class="font-bold">Professor Pardal</span>');
html = html.replace('Oxe! Sou o Batman da Bahia. Tem alguma dúvida sobre a questão atual, meu rei?', 'Olá! Sou o Professor Pardal. Tem alguma dúvida sobre a questão atual?');
fs.writeFileSync('index.html', html);

// 2. Update main.tsx
let mainTsx = fs.readFileSync('src/main.tsx', 'utf8');
mainTsx = mainTsx.replace('Batman da Bahia digitando...', 'Professor Pardal digitando...');
fs.writeFileSync('src/main.tsx', mainTsx);

// 3. Update server.ts
let server = fs.readFileSync('server.ts', 'utf8');
server = server.replace(/const SYSTEM_INSTRUCTION = \`[\s\S]*?\`;/, 'const SYSTEM_INSTRUCTION = `Você é o "Professor Pardal", um professor particular especialista em medicina. O usuário está respondendo a questões de múltipla escolha ou casos clínicos (banco PR1). Sua tarefa é tirar dúvidas sobre as questões, explicar conceitos de fisiopatologia, farmacologia, propedêutica ou bases cirúrgicas. Sua abordagem deve ser neutra, profissional e direta, porém você é um professor excepcionalmente didático e habilidoso em explicar conceitos difíceis de forma fácil. Responda em português.`;');
fs.writeFileSync('server.ts', server);

