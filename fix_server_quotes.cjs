const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

server = server.replace(
  '"Você é o "Batman da Bahia"',
  '`Você é o "Batman da Bahia"'
);

server = server.replace(
  'Responda em português.";',
  'Responda em português.`;'
);

fs.writeFileSync('server.ts', server);
