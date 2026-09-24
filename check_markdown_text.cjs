const fs = require('fs');
const files = fs.readdirSync('src').filter(f => f.endsWith('.ts'));

for (const file of files) {
  const content = fs.readFileSync('src/' + file, 'utf8');
  if (content.match(/text:\s*`[^\`]*\*\*/)) {
    console.log("Found markdown in text in file:", file);
  }
}
