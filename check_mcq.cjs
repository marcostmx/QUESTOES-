const fs = require('fs');

const files = fs.readdirSync('src').filter(f => f.endsWith('.ts'));

let total = 0;
let failing = 0;

for (const file of files) {
  const content = fs.readFileSync('src/' + file, 'utf8');
  // very rudimentary regex
  const qs = content.split('type: "MÚLTIPLA ESCOLHA"');
  for (let i = 1; i < qs.length; i++) {
    total++;
    const block = qs[i].substring(0, 1000); // Look ahead
    const gabMatch = block.match(/gabarito:\s*`([^`]+)`/);
    if (gabMatch) {
      const gab = gabMatch[1];
      const match = gab.match(/Alternativa\s+([A-E])/i);
      if (!match) {
        console.log("File:", file, "\nFailed Gabarito:", gab.substring(0, 100), "\n---");
        failing++;
      }
    } else {
      console.log("File:", file, "No gabarito found closely");
    }
  }
}
console.log("Total MCQ:", total);
console.log("Failing Gabaritos:", failing);
